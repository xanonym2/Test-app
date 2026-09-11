// Application des effets. Chaque effet est un objet ; un tableau d'effets
// s'applique dans l'ordre. Le moteur ne produit aucun texte : il renvoie des
// « traces » (clé + valeur) que l'interface traduit.
import { ajouterObjet, retirerObjet, creerObjet, tirerObjet, userObjet, userUid } from './items.js';
import { avancerSegments, programmerDiffere } from './time.js';
import { santeMax, niveauPourXp } from './derive.js';
import { NIVEAU_MAX, NIVEAUX_COMPETENCE } from './schema.js';
import { getDb } from './db.js';

function bornes(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function appliquerEffets(E, effets, ctx = {}) {
  const traces = [];
  const declenchements = [];
  for (const ef of effets ?? []) {
    const t = appliquerEffet(E, ef, ctx, declenchements);
    if (t) traces.push(...(Array.isArray(t) ? t : [t]));
  }
  return { traces, declenchements };
}

function appliquerEffet(E, ef, ctx, declenchements) {
  const db = getDb();

  if (ef.objet !== undefined) {
    const q = ef.quantite ?? 1;
    if (q > 0) {
      for (let i = 0; i < (db.objets[ef.objet]?.empilable ? 1 : q); i++) {
        const item = ef.tire
          ? tirerObjet(E, ef.objet, ef.tire === true ? {} : ef.tire)
          : creerObjet(E, ef.objet, { usure: ef.usure, prefixe: ef.prefixe, suffixe: ef.suffixe });
        if (item && db.objets[ef.objet]?.empilable) item.quantite = q;
        ajouterObjet(E, item);
      }
      E.stats_partie.objets_ramasses += q;
      return { cle: 'objet_gagne', id: ef.objet, valeur: q };
    }
    const retire = retirerObjet(E, ef.objet, -q);
    return { cle: 'objet_perdu', id: ef.objet, valeur: retire };
  }

  if (ef.usure !== undefined) {
    if (ef.uid) userUid(E, ef.uid, ef.valeur);
    else if (ef.usure === 'arme_equipee') {
      const uid = E.equipement.arme;
      if (uid) userUid(E, uid, ef.valeur);
    } else userObjet(E, ef.usure, ef.valeur);
    if (ef.valeur > 0) E.stats_partie.objets_repares += 1;
    return { cle: 'usure', id: ef.usure, valeur: ef.valeur };
  }

  if (ef.sante_heros !== undefined) {
    const max = santeMax(E.heros.stats);
    const avant = E.heros.sante;
    E.heros.sante = bornes(E.heros.sante + ef.sante_heros, 0, max);
    if (ef.sante_heros < 0) E.stats_partie.degats_subis += avant - E.heros.sante;
    return { cle: 'sante', valeur: E.heros.sante - avant };
  }

  if (ef.fatigue !== undefined) {
    E.heros.fatigue = bornes(E.heros.fatigue + ef.fatigue, 0, 100);
    return { cle: 'fatigue', valeur: ef.fatigue };
  }

  if (ef.faim !== undefined) {
    E.heros.faim = bornes(E.heros.faim + ef.faim, 0, 100);
    if (ef.faim < 0) E.stats_partie.repas_pris += 1;
    return { cle: 'faim', valeur: ef.faim };
  }

  if (ef.etat !== undefined) {
    if (!E.heros.etats.includes(ef.etat)) E.heros.etats.push(ef.etat);
    return { cle: 'etat_gagne', id: ef.etat };
  }

  if (ef.retire_etat !== undefined) {
    E.heros.etats = E.heros.etats.filter((x) => x !== ef.retire_etat);
    return { cle: 'etat_perdu', id: ef.retire_etat };
  }

  if (ef.xp !== undefined) {
    E.heros.xp += ef.xp;
    E.stats_partie.xp_gagnee += ef.xp;
    const nv = niveauPourXp(E.heros.xp);
    const traces = [{ cle: 'xp', valeur: ef.xp }];
    while (E.heros.niveau < nv && E.heros.niveau < NIVEAU_MAX) {
      E.heros.niveau += 1;
      E.heros.points_stat += 1;
      if (NIVEAUX_COMPETENCE.includes(E.heros.niveau)) E.heros.competence_a_choisir += 1;
      E.heros.sante = Math.min(santeMax(E.heros.stats), E.heros.sante + 5);
      traces.push({ cle: 'niveau', valeur: E.heros.niveau });
    }
    return traces;
  }

  if (ef.reputation !== undefined) {
    const { faction, valeur } = ef.reputation;
    E.social.reputation[faction] = bornes((E.social.reputation[faction] ?? 0) + valeur, -50, 50);
    return { cle: 'reputation', id: faction, valeur };
  }

  if (ef.confiance !== undefined) {
    const { pnj, valeur } = ef.confiance;
    E.social.confiance[pnj] = bornes((E.social.confiance[pnj] ?? 0) + valeur, -5, 5);
    const comp = E.compagnons.find((c) => c.id === pnj);
    if (comp) comp.confiance = E.social.confiance[pnj];
    return { cle: 'confiance', id: pnj, valeur };
  }

  if (ef.pnj_statut !== undefined) {
    const { id, valeur } = ef.pnj_statut;
    E.social.pnj_statut[id] = valeur;
    if (valeur === 'mort') {
      E.stats_partie.pnj_morts += 1;
      const c = E.compagnons.find((x) => x.id === id);
      if (c && c.statut === 'actif') { c.statut = 'mort'; E.stats_partie.compagnons_perdus += 1; }
    }
    return { cle: 'pnj_statut', id, valeur };
  }

  if (ef.compagnon !== undefined) {
    const modele = db.pnj[ef.compagnon];
    if (modele && !E.compagnons.some((c) => c.id === ef.compagnon)) {
      E.compagnons.push({
        id: ef.compagnon,
        niveau: modele.niveau ?? 1,
        xp: 0,
        stats: { ...modele.stats },
        competences: [...(modele.competences ?? [])],
        sante: santeMax(modele.stats),
        role: modele.role,
        confiance: E.social.confiance[ef.compagnon] ?? modele.confiance_initiale ?? 0,
        statut: 'actif',
        equipement: [...(modele.equipement ?? [])],
      });
      E.social.pnj_statut[ef.compagnon] = 'vivant_allie';
      E.stats_partie.compagnons_recrutes += 1;
    }
    return { cle: 'compagnon', id: ef.compagnon };
  }

  if (ef.retire_compagnon !== undefined) {
    const c = E.compagnons.find((x) => x.id === ef.retire_compagnon);
    if (c) { c.statut = ef.statut ?? 'parti'; E.stats_partie.compagnons_perdus += 1; }
    return { cle: 'compagnon_perdu', id: ef.retire_compagnon };
  }

  if (ef.sante_compagnon !== undefined) {
    const { id, valeur } = ef.sante_compagnon;
    const c = E.compagnons.find((x) => x.id === id);
    if (c) {
      c.sante = bornes(c.sante + valeur, 0, santeMax(c.stats));
      if (c.sante === 0) { c.statut = 'mort'; E.social.pnj_statut[id] = 'mort'; E.stats_partie.compagnons_perdus += 1; }
    }
    return { cle: 'sante_compagnon', id, valeur };
  }

  if (ef.connaissance_sortilege !== undefined) {
    const v = typeof ef.connaissance_sortilege === 'string'
      ? parseInt(ef.connaissance_sortilege, 10)
      : ef.connaissance_sortilege;
    E.recit.connaissance_sortilege = bornes(E.recit.connaissance_sortilege + v, 0, 5);
    E.stats_partie.indices_trouves += Math.max(0, v);
    return { cle: 'savoir', valeur: v };
  }

  if (ef.flag !== undefined) {
    E.recit.flags[ef.flag] = true;
    return { cle: 'flag', id: ef.flag };
  }
  if (ef.retire_flag !== undefined) {
    delete E.recit.flags[ef.retire_flag];
    return { cle: 'flag_retire', id: ef.retire_flag };
  }

  if (ef.stat_partie !== undefined) {
    const { compteur, valeur } = ef.stat_partie;
    E.stats_partie[compteur] = (E.stats_partie[compteur] ?? 0) + valeur;
    return { cle: 'stat_partie', id: compteur, valeur };
  }

  if (ef.local !== undefined) {
    const cible = ctx.local ?? E.systeme.etat_local;
    const v = ef['='] !== undefined ? ef['='] : (ef['+='] !== undefined ? (cible[ef.local] ?? 0) + ef['+='] : true);
    cible[ef.local] = v;
    return null;
  }

  if (ef.segments !== undefined) {
    if (ef.segments > 0) avancerSegments(E, ef.segments);
    return { cle: 'segments', valeur: ef.segments };
  }

  if (ef.lieu_bloque !== undefined) {
    E.geo.lieux_bloques[ef.lieu_bloque.id] = {
      jusqu_au: E.temps.jour + (ef.lieu_bloque.duree_jours ?? 1),
    };
    return { cle: 'lieu_bloque', id: ef.lieu_bloque.id };
  }

  if (ef.debloque_point !== undefined) {
    if (!E.geo.points_decouverts.includes(ef.debloque_point)) {
      E.geo.points_decouverts.push(ef.debloque_point);
    }
    delete E.geo.lieux_bloques[ef.debloque_point];
    return { cle: 'point_decouvert', id: ef.debloque_point };
  }

  if (ef.differe !== undefined) {
    programmerDiffere(E, ef.differe);
    return null;
  }

  if (ef.declenche !== undefined) {
    declenchements.push(ef.declenche);
    return null;
  }

  if (ef.journal !== undefined) {
    E.journal.push({ jour: E.temps.jour, cle: ef.journal });
    if (ef.majeure) E.stats_partie.decisions_majeures += 1;
    return null;
  }

  if (ef.fin !== undefined) {
    E.fin = { id: ef.fin, jour: E.temps.jour, segment: E.temps.segment };
    return { cle: 'fin', id: ef.fin };
  }

  if (ef.competence_offerte !== undefined) {
    E.heros.competence_a_choisir += ef.competence_offerte;
    return { cle: 'competence_offerte', valeur: ef.competence_offerte };
  }

  if (ef.point_stat !== undefined) {
    E.heros.points_stat += ef.point_stat;
    return { cle: 'point_stat', valeur: ef.point_stat };
  }

  if (ef.acte !== undefined) {
    E.recit.acte = Math.max(E.recit.acte, ef.acte);
    return null;
  }

  return null;
}
