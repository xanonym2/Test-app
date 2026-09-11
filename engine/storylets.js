// Sélection, assemblage de texte et résolution des storylets.
import { evaluerConditions, evaluerCondition, storyletDisponible } from './conditions.js';
import { appliquerEffets } from './effects.js';
import { avancerSegments } from './time.js';
import { choixPondere } from './rng.js';
import { facteurDeplacement } from './derive.js';
import { getDb } from './db.js';

export function correspondLieu(E, s, pointId) {
  const l = s.lieu ?? { type: 'partout' };
  switch (l.type) {
    case 'point_interet': return l.cible === pointId;
    case 'zone': return getDb().points[pointId]?.zone === l.cible;
    case 'type_lieu': return getDb().points[pointId]?.type_lieu === l.cible;
    case 'territoire': return getDb().points[pointId]?.territoire === l.cible;
    case 'partout': return true;
    case 'declenche_uniquement': return false;
    default: return false;
  }
}

// Retourne le storylet à jouer au point donné, ou null.
export function choisirStorylet(E, pointId) {
  const db = getDb();
  const candidats = Object.values(db.storylets).filter(
    (s) => correspondLieu(E, s, pointId) && storyletDisponible(E, s)
  );
  if (!candidats.length) return null;
  const prioMax = Math.max(...candidats.map((s) => s.priorite ?? 5));
  const meilleurs = candidats.filter((s) => (s.priorite ?? 5) === prioMax);
  if (meilleurs.length === 1) return meilleurs[0];
  const c = choixPondere(E.systeme.rng, meilleurs.map((s) => ({ ...s, poids: s.poids ?? 10 })));
  E.systeme.rng = c.etat;
  return db.storylets[c.valeur.id];
}

export function ouvrirStorylet(E, storyletId, opts = {}) {
  const s = getDb().storylets[storyletId];
  if (!s) return E;
  E.systeme.storylet_courant = storyletId;
  E.systeme.tour = 1;
  E.systeme.etat_local = { ...(s.etat_local_initial ?? {}), ...(opts.local ?? {}) };
  E.systeme.options_epuisees = [];
  E.systeme.premiere_vue = !E.systeme.storylets_vus[storyletId];
  E.systeme.storylets_vus[storyletId] = (E.systeme.storylets_vus[storyletId] ?? 0) + 1;
  E.stats_partie.storylets_joues += 1;
  return E;
}

// Applique les règles locales (déclenchées à chaque affichage).
export function appliquerReglesLocales(E, s) {
  let texteForce = null;
  for (const r of s.regles_locales ?? []) {
    if (evaluerConditions(E, r.si, E.systeme.etat_local, { tour: E.systeme.tour })) {
      for (const a of r.alors ?? []) {
        if (a.texte_force) { texteForce = a.texte_force; continue; }
        appliquerEffets(E, [a], { local: E.systeme.etat_local });
      }
    }
  }
  return texteForce;
}

// Compose le texte affiché : base (ou arrivée) + variantes.
export function composerTexte(E, s) {
  const L = E.systeme.etat_local;
  const ctx = { tour: E.systeme.tour };
  const forceLocal = appliquerReglesLocales(E, s);

  let corps = s.texte?.base ?? '';
  if (E.systeme.premiere_vue && s.texte?.arrivee) corps = s.texte.arrivee;
  if (forceLocal) corps = forceLocal;

  const ajouts = [];
  for (const v of s.texte?.variantes ?? []) {
    if (!evaluerConditions(E, v.si, L, ctx)) continue;
    if (v.remplace) corps = v.remplace;
    else if (v.ajout) ajouts.push(v.ajout);
  }
  return [corps, ...ajouts].filter(Boolean).join('\n\n');
}

export function optionsVisibles(E, s) {
  const L = E.systeme.etat_local;
  const ctx = { tour: E.systeme.tour };
  return (s.options ?? [])
    .filter((o) => !(o.epuisable && E.systeme.options_epuisees.includes(o.id)))
    .filter((o) => evaluerConditions(E, o.apparait_si, L, ctx))
    .map((o) => {
      let indisponible = !!(o.requiert && !evaluerConditions(E, o.requiert, L, ctx));
      let manque = null;
      for (const [id, q] of Object.entries(o.cout?.objet ?? {})) {
        const possede = E.inventaire
          .filter((i) => i.base === id)
          .reduce((s2, i) => s2 + (i.quantite ?? 1), 0);
        if (possede < q) { indisponible = true; manque = id; }
      }
      return { ...o, indisponible, manque };
    });
}

function bonusProbabilite(E, o) {
  const L = E.systeme.etat_local;
  let b = 0;
  for (const m of o.modif_proba ?? []) {
    if (evaluerConditions(E, m.si, L, { tour: E.systeme.tour })) b += m.valeur;
  }
  return b;
}

function choisirIssue(E, o) {
  const L = E.systeme.etat_local;
  const ctx = { tour: E.systeme.tour };
  const eligibles = (o.issues ?? []).filter((i) => evaluerConditions(E, i.si, L, ctx));
  if (!eligibles.length) return null;
  if (eligibles.length === 1) return eligibles[0];
  if (eligibles.every((i) => i.probabilite === undefined)) return eligibles[0];

  const bonus = bonusProbabilite(E, o);
  const pond = eligibles.map((i) => {
    let p = i.probabilite ?? 0;
    if (i.reussite) p += bonus;
    return { issue: i, poids: Math.max(0, p) };
  });
  const c = choixPondere(E.systeme.rng, pond);
  E.systeme.rng = c.etat;
  return c.valeur.issue;
}

// Valide un choix. Retourne { texte, traces, fin, sortie, declenchements }.
export function resoudreOption(E, optionId) {
  const db = getDb();
  const s = db.storylets[E.systeme.storylet_courant];
  const o = (s.options ?? []).find((x) => x.id === optionId);
  if (!o) return null;

  // Coûts payés d'abord.
  const cout = o.cout ?? {};
  if (cout.objet) {
    for (const [id, q] of Object.entries(cout.objet)) {
      appliquerEffets(E, [{ objet: id, quantite: -q }]);
    }
  }
  if (cout.fatigue) appliquerEffets(E, [{ fatigue: cout.fatigue }]);
  if (cout.usure_arme) appliquerEffets(E, [{ usure: 'arme_equipee', valeur: -cout.usure_arme }]);

  const issue = choisirIssue(E, o);
  const res = appliquerEffets(E, issue?.effets ?? [], { local: E.systeme.etat_local });

  if (o.epuisable) E.systeme.options_epuisees.push(o.id);
  if (o.observation) E.stats_partie.observations += 1;

  if (cout.segments) {
    const seg = Math.max(1, Math.round(cout.segments * (o.deplacement ? facteurDeplacement(E) : 1)));
    avancerSegments(E, seg);
  }

  E.systeme.tour += 1;
  if (E.heros.sante <= 0 && !E.fin) E.fin = { id: 'FIN-MORT', jour: E.temps.jour, segment: E.temps.segment };

  return {
    texte: issue?.texte ?? null,
    traces: res.traces,
    declenchements: res.declenchements,
    sortie: !!o.sortie || !!issue?.sortie,
    fin: E.fin,
  };
}

export { storyletDisponible, evaluerConditions, evaluerCondition };
