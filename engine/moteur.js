// Le moteur : sélection des storylets, résolution d'un tour, machine à états
// locale. Aucun texte narratif ne vit ici — il n'y en a pas une ligne.

import { blocVraie, clauseVraie, conditionsVraies } from './conditions';
import { appliquerEffets } from './effets';
import { STORYLETS } from '../content/storylets';
import { quantiteObjet, registreProse, santeMax } from './derive';
import { avancer } from './temps';

const clone = (o) => JSON.parse(JSON.stringify(o));

// --- Sélection --------------------------------------------------------------

function lieuCorrespond(storylet, etat, lieuId) {
  const l = storylet.lieu || { type: 'partout' };
  switch (l.type) {
    case 'point_interet':
      return l.cible === lieuId;
    case 'zone':
      return (POINTS_PAR_ZONE[l.cible] || []).includes(lieuId);
    case 'voyage':
      return `VOYAGE:${l.cible}` === lieuId;
    case 'partout':
      return true;
    case 'declenche_uniquement':
      return false;
    default:
      return false;
  }
}

// Rempli à la volée pour éviter un import circulaire avec le contenu.
const POINTS_PAR_ZONE = {};
export function enregistrerZones(zones) {
  for (const zone of zones) POINTS_PAR_ZONE[zone.id] = zone.points.map((p) => p.id);
}

export function storyletsDisponibles(etat, lieuId = etat.geo.position) {
  return Object.values(STORYLETS).filter((s) => {
    if (!lieuCorrespond(s, etat, lieuId)) return false;
    if (s.unique && etat.systeme.storylets_vus[s.id]) return false;
    if (!blocVraie(s.conditions, etat, null)) return false;
    return true;
  });
}

export function choisirStorylet(etat, lieuId = etat.geo.position) {
  const candidats = storyletsDisponibles(etat, lieuId);
  if (candidats.length === 0) return null;
  const prioriteMax = Math.max(...candidats.map((s) => s.priorite ?? 0));
  const tete = candidats.filter((s) => (s.priorite ?? 0) === prioriteMax);
  const total = tete.reduce((sum, s) => sum + (s.poids ?? 1), 0);
  let tirage = Math.random() * total;
  for (const s of tete) {
    tirage -= s.poids ?? 1;
    if (tirage <= 0) return s;
  }
  return tete[0];
}

// Reste-t-il quelque chose à faire ici ? Un lieu dont toutes les options
// durables sont épuisées ne doit plus proposer d'y rester : on tournerait en
// rond dans une scène qui n'offre plus que sa sortie.
export function resteAFaire(etat, lieuId = etat.geo.position) {
  const storylet = choisirStorylet(etat, lieuId);
  if (!storylet) return null;
  const local = clone(storylet.etat_local_initial || {});
  const persistantes = Boolean(storylet.options_persistantes);
  const utile = (storylet.options || []).some((o) => {
    if (o.sortie) return false;
    if (persistantes && o.epuisable && etat.systeme.options_epuisees[`${storylet.id}:${o.id}`]) {
      return false;
    }
    if (!conditionsVraies(o.apparait_si, etat, local)) return false;
    if (o.cout?.objet && quantiteObjet(etat, o.cout.objet) < (o.cout.quantite ?? 1)) return false;
    return true;
  });
  return utile ? storylet : null;
}

// --- Entrée dans une scène --------------------------------------------------

export function entrerStorylet(etatSource, storyletId) {
  const etat = clone(etatSource);
  const storylet = STORYLETS[storyletId];
  if (!storylet) return etat;

  const cible = storylet.lieu?.type === 'point_interet' ? storylet.lieu.cible : null;
  const premiereVisite = cible
    ? (etat.geo.points_visites[cible] ?? 0) === 0
    : !etat.systeme.storylets_vus[storyletId];

  if (cible) {
    etat.geo.position = cible;
    etat.geo.points_decouverts[cible] = true;
    etat.geo.points_visites[cible] = (etat.geo.points_visites[cible] ?? 0) + 1;
  }
  etat.systeme.storylets_vus[storyletId] = true;

  etat.scene = {
    storylet_id: storyletId,
    local: clone(storylet.etat_local_initial || {}),
    tour: 0,
    premiere_visite: premiereVisite,
    options_utilisees: {},
    terminee: false,
    texte_force: null,
  };
  etat.systeme.journal = [];

  if (storylet.effets_entree) {
    appliquerEffets(etat, storylet.effets_entree, { local: etat.scene.local });
  }

  appliquerReglesLocales(etat, storylet);
  etat.systeme.journal.push({ type: 'recit', texte: texteDuTour(etat, storylet) });
  return etat;
}

// --- Texte ------------------------------------------------------------------

function texteDuTour(etat, storylet) {
  if (etat.scene.texte_force) {
    const force = etat.scene.texte_force;
    etat.scene.texte_force = null;
    return force;
  }

  const t = storylet.texte || {};
  let base = etat.scene.premiere_visite && etat.scene.tour === 0 && t.arrivee ? t.arrivee : t.base;
  if (!base) base = t.arrivee || '';

  const ajouts = [];
  for (const v of t.variantes || []) {
    if (v.tour !== undefined && v.tour !== etat.scene.tour) continue;
    if (!conditionsVraies(v.si, etat, etat.scene.local)) continue;
    if (v.registre && v.registre !== registreProse(etat)) continue;
    if (v.remplace) base = v.remplace;
    if (v.ajout) ajouts.push(v.ajout);
  }
  return [base, ...ajouts].filter(Boolean).join('\n\n');
}

function appliquerReglesLocales(etat, storylet) {
  for (const regle of storylet.regles_locales || []) {
    if (!conditionsVraies(regle.si, etat, etat.scene.local)) continue;
    for (const action of regle.alors || []) {
      if ('texte_force' in action) {
        etat.scene.texte_force = action.texte_force;
      } else {
        appliquerEffets(etat, [action], { local: etat.scene.local });
      }
    }
  }
}

// --- Options ----------------------------------------------------------------

export function optionsVisibles(etat) {
  if (!etat.scene) return [];
  const storylet = STORYLETS[etat.scene.storylet_id];
  if (!storylet) return [];

  const persistantes = Boolean(storylet.options_persistantes);
  return (storylet.options || [])
    .filter((o) => {
      if (o.epuisable && etat.scene.options_utilisees[o.id]) return false;
      if (persistantes && etat.systeme.options_epuisees[`${storylet.id}:${o.id}`]) return false;
      if (!conditionsVraies(o.apparait_si, etat, etat.scene.local)) return false;
      if (o.cout?.objet && quantiteObjet(etat, o.cout.objet) < (o.cout.quantite ?? 1)) return false;
      return true;
    })
    .map((o) => ({
      id: o.id,
      libelle: o.libelle,
      cout: o.cout || {},
      sortie: Boolean(o.sortie),
      note: o.note || null,
    }));
}

// --- Résolution d'un choix --------------------------------------------------

function tirerIssue(etat, option) {
  const eligibles = (option.issues || []).filter((i) =>
    conditionsVraies(i.condition_texte, etat, etat.scene.local)
  );
  const pool = eligibles.length > 0 ? eligibles : option.issues || [];
  if (pool.length === 0) return null;
  if (pool.length === 1) return pool[0];

  const total = pool.reduce((s, i) => s + (i.probabilite ?? 0), 0);
  if (total <= 0) return pool[0];
  let tirage = Math.random() * total;
  for (const issue of pool) {
    tirage -= issue.probabilite ?? 0;
    if (tirage <= 0) return issue;
  }
  return pool[pool.length - 1];
}

export function choisirOption(etatSource, optionId) {
  const etat = clone(etatSource);
  if (!etat.scene) return etat;
  const storylet = STORYLETS[etat.scene.storylet_id];
  const option = (storylet.options || []).find((o) => o.id === optionId);
  if (!option) return etat;

  etat.scene.options_utilisees[optionId] = true;
  if (storylet.options_persistantes && option.epuisable) {
    etat.systeme.options_epuisees[`${storylet.id}:${optionId}`] = true;
  }
  etat.systeme.journal.push({ type: 'choix', texte: option.libelle });

  // Coûts d'abord : le temps passe même si l'action échoue.
  if (option.cout?.segments) avancer(etat, option.cout.segments);
  if (option.cout?.fatigue) {
    etat.heros.fatigue = Math.max(0, Math.min(100, etat.heros.fatigue + option.cout.fatigue));
  }
  if (option.cout?.objet) {
    appliquerEffets(etat, [{ retire_objet: option.cout.objet, quantite: option.cout.quantite ?? 1 }]);
  }

  const contexte = { local: etat.scene.local };
  const issue = tirerIssue(etat, option);
  if (issue) {
    appliquerEffets(etat, issue.effets, contexte);
    etat.systeme.journal.push({ type: 'issue', texte: issue.texte });
  }

  etat.scene.tour += 1;

  if (option.sortie || issue?.sortie) {
    return terminerScene(etat, contexte.declenche || option.declenche || issue?.declenche);
  }

  appliquerReglesLocales(etat, storylet);
  if (etat.scene.terminee) return terminerScene(etat, null);

  etat.systeme.journal.push({ type: 'recit', texte: texteDuTour(etat, storylet) });

  // Une sortie doit toujours rester disponible (règle de contenu n°5).
  if (!optionsVisibles(etat).some((o) => o.sortie)) {
    return terminerScene(etat, contexte.declenche || null);
  }
  return etat;
}

function terminerScene(etat, enchaine) {
  const apres = etat.scene?.apres || null;
  etat.scene = null;
  if (etat.heros.sante <= 0) {
    etat.recit.flags.mort = true;
    return etat;
  }
  // Une conséquence différée arrivée à échéance a son propre moment (§5.8).
  const du = etat.systeme.differes.find(
    (d) =>
      !d.resolu &&
      ((d.sur_lieu && d.sur_lieu === etat.geo.position) ||
        (d.sur_flag && etat.recit.flags[d.sur_flag]))
  );
  if (du) {
    du.resolu = true;
    return entrerStorylet(etat, du.issue ? du.resolution : du.resolution_alternative || du.resolution);
  }
  const suite = enchaine || apres;
  if (suite && STORYLETS[suite]) {
    const etatSuite = entrerStorylet(etat, suite);
    if (apres && suite === enchaine) etatSuite.scene.apres = apres;
    return etatSuite;
  }
  return etat;
}

// --- Voyage -----------------------------------------------------------------

export function voyager(etatSource, cibleId, coutSegments = 1) {
  let etat = clone(etatSource);
  avancer(etat, coutSegments);
  etat.heros.fatigue = Math.min(100, etat.heros.fatigue + 4);

  const vignette = choisirStorylet(etat, `VOYAGE:${cibleId}`);
  etat.geo.position = cibleId;
  const suivant = choisirStorylet(etat, cibleId);
  if (vignette) {
    etat = entrerStorylet(etat, vignette.id);
    etat.scene.apres = suivant ? suivant.id : null;
    return etat;
  }
  return suivant ? entrerStorylet(etat, suivant.id) : etat;
}

export function reprendreLieu(etatSource) {
  const etat = clone(etatSource);
  const suivant = choisirStorylet(etat, etat.geo.position);
  return suivant ? entrerStorylet(etat, suivant.id) : etat;
}

export { santeMax, clauseVraie };
