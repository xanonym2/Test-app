// Orchestration : création de partie, déplacement, entrée en scène.
import { getDb } from './db.js';
import { creerSeed, entier, melange } from './rng.js';
import { santeMax, facteurDeplacement } from './derive.js';
import { STATS_PARTIE_INITIALES, VERSION_SAUVEGARDE } from './schema.js';
import { appliquerEffets } from './effects.js';
import { avancerSegments, tirerMeteo, libererLieux } from './time.js';
import { ouvrirStorylet, choisirStorylet } from './storylets.js';
import { creerObjet, ajouterObjet } from './items.js';

export function etatVierge(seed) {
  const stats = { vigueur: 2, adresse: 3, perception: 3, sangfroid: 2 };
  return {
    version: VERSION_SAUVEGARDE,
    partie: { depart: null, mutateurs: [], debut: Date.now() },
    heros: {
      niveau: 1,
      xp: 0,
      stats,
      points_stat: 0,
      competences: [],
      competence_a_choisir: 0,
      groupes_fermes: [],
      sante: santeMax(stats),
      fatigue: 10,
      faim: 15,
      etats: [],
    },
    inventaire: [],
    equipement: { arme: null, arme_secondaire: null, protection: null },
    compagnons: [],
    temps: { jour: 1, segment: 2, meteo: 'clair' },
    geo: { position: null, zones_decouvertes: [], points_decouverts: [], points_visites: {}, lieux_bloques: {} },
    social: {
      reputation: { couronne: 0, terres_noires: 0, ordre: 0, marchands: 0 },
      confiance: {},
      pnj_statut: {},
    },
    recit: { acte: 1, connaissance_sortilege: 0, flags: {} },
    stats_partie: { ...STATS_PARTIE_INITIALES },
    journal: [],
    systeme: {
      rng: seed,
      uid_suivant: 1,
      differes: [],
      storylets_vus: {},
      etat_local: {},
      storylet_courant: null,
      tour: 1,
      options_epuisees: [],
      premiere_vue: true,
      fil: [],
    },
    fin: null,
  };
}

// Tirage des mutateurs : 1 ou 2, jamais deux du même groupe.
export function tirerMutateurs(E, nombre = 2) {
  const db = getDb();
  const dispo = Object.values(db.mutateurs);
  const m = melange(E.systeme.rng, dispo);
  E.systeme.rng = m.etat;
  const pris = [];
  const groupes = [];
  for (const mut of m.valeur) {
    if (pris.length >= nombre) break;
    if (mut.groupe && groupes.includes(mut.groupe)) continue;
    pris.push(mut.id);
    if (mut.groupe) groupes.push(mut.groupe);
  }
  return pris;
}

export function tirerDepart(E) {
  const db = getDb();
  const liste = Object.values(db.departs);
  const r = entier(E.systeme.rng, liste.length);
  E.systeme.rng = r.etat;
  return liste[r.valeur].id;
}

export function nouvellePartie({ depart = null, mutateurs = null, seed = null } = {}) {
  const db = getDb();
  const E = etatVierge(seed ?? creerSeed());

  E.partie.depart = depart ?? tirerDepart(E);
  E.partie.mutateurs = mutateurs ?? tirerMutateurs(E, 1 + (entier(E.systeme.rng, 2).valeur));

  const d = db.departs[E.partie.depart];
  // Équipement de départ commun, puis variation propre au départ.
  for (const o of [...(db.meta.inventaire_initial ?? []), ...(d.inventaire ?? [])]) {
    ajouterObjet(E, creerObjet(E, o.base, { quantite: o.quantite ?? 1, usure: o.usure }));
  }
  const arme = E.inventaire.find((i) => i.categorie === 'arme');
  if (arme) E.equipement.arme = arme.uid;

  if (d.effets) appliquerEffets(E, d.effets);
  for (const mid of E.partie.mutateurs) {
    const mut = db.mutateurs[mid];
    if (mut?.effets) appliquerEffets(E, mut.effets);
  }

  E.temps.meteo = tirerMeteo(E);
  E.geo.position = db.meta.point_depart;
  E.geo.points_decouverts = [...(db.meta.points_initiaux ?? [])];

  ouvrirStorylet(E, d.storylet_ouverture ?? db.meta.storylet_ouverture);
  return E;
}

// Coût en segments entre deux points (graphe non orienté).
export function coutVoyage(E, de, vers) {
  const db = getDb();
  if (de === vers) return 0;
  const base = db.points[de]?.voisins?.[vers] ?? db.points[vers]?.voisins?.[de] ?? 2;
  return Math.max(1, Math.round(base * facteurDeplacement(E)));
}

export function pointsAccessibles(E) {
  const db = getDb();
  return E.geo.points_decouverts
    .filter((p) => p !== E.geo.position)
    .map((p) => ({
      id: p,
      cout: coutVoyage(E, E.geo.position, p),
      bloque: !!E.geo.lieux_bloques[p],
      visite: (E.geo.points_visites[p] ?? 0) > 0,
      point: db.points[p],
    }));
}

export function voyager(E, pointId) {
  if (E.geo.lieux_bloques[pointId]) return { ok: false, raison: 'bloque' };
  const cout = coutVoyage(E, E.geo.position, pointId);
  const evenements = avancerSegments(E, cout);
  E.geo.position = pointId;
  libererLieux(E);
  E.geo.points_visites[pointId] = (E.geo.points_visites[pointId] ?? 0) + 1;
  if (E.geo.points_visites[pointId] === 1) E.stats_partie.points_visites += 1;

  const declenche = evenements.find((e) => e.type === 'declenche');
  const s = declenche ? getDb().storylets[declenche.storylet] : choisirStorylet(E, pointId);
  if (s) ouvrirStorylet(E, s.id, { local: declenche?.resolution ? { resolution: declenche.resolution } : {} });
  return { ok: true, cout, evenements, storylet: s?.id ?? null };
}

// Rejoue une scène au point courant (après une sortie de storylet).
export function rafraichirScene(E) {
  // Arriver ici pour la première fois compte comme une visite, même quand on
  // n'y est pas venu par la carte (fuite, déclenchement, ouverture).
  if ((E.geo.points_visites[E.geo.position] ?? 0) === 0) {
    E.geo.points_visites[E.geo.position] = 1;
    E.stats_partie.points_visites += 1;
  }
  const s = choisirStorylet(E, E.geo.position);
  if (s) ouvrirStorylet(E, s.id);
  else E.systeme.storylet_courant = null;
  return s?.id ?? null;
}

export function forcerStorylet(E, id, local) {
  ouvrirStorylet(E, id, { local });
  return id;
}

export function partieTerminee(E) {
  return !!E.fin || E.heros.sante <= 0;
}
