// Moteur de storylets. Un storylet est une machine à états LOCALE :
//   entrée → texte + options filtrées → choix unique → issue (probabilité)
//   → effets → l'état local change → nouvelles options → ... → sortie
//
// Ce fichier ne contient AUCUN texte narratif : tout vient de /content.

import { evaluer, evaluerAtome, evaluerBloc } from './conditions.js';
import { appliquerEffets } from './effets.js';
import { avancerSegments } from './temps.js';
import { choisirPondere, choisirIssue } from './tirage.js';

/* ------------------------------------------------------------------ */
/* Sélection                                                           */
/* ------------------------------------------------------------------ */

function lieuCorrespond(storylet, etat, catalogue) {
  const lieu = storylet.lieu ?? { type: 'partout' };
  const position = etat.geo.position;
  const point = catalogue.points[position];
  switch (lieu.type) {
    case 'declenche_uniquement':
      return false;
    case 'partout':
      return true;
    case 'point_interet':
      return [].concat(lieu.cible).includes(position);
    case 'zone':
      return point ? [].concat(lieu.cible).includes(point.zone) : false;
    case 'territoire':
      return point ? [].concat(lieu.cible).includes(point.territoire) : false;
    case 'type_lieu':
      return point ? [].concat(lieu.cible).includes(point.type_lieu) : false;
    default:
      return false;
  }
}

export function storyletsEligibles(etat, catalogue, { ignorerLieu = false } = {}) {
  const ctx = { etat, local: {}, catalogueObjets: catalogue.objets };
  return Object.values(catalogue.storylets).filter((storylet) => {
    if (!ignorerLieu && !lieuCorrespond(storylet, etat, catalogue)) return false;
    const vus = etat.systeme.storylets_vus[storylet.id] ?? 0;
    if (storylet.unique && vus > 0) return false;
    if (storylet.max_vues && vus >= storylet.max_vues) return false;
    if (etat.geo.lieux_bloques.some((l) => l.id === etat.geo.position)) return false;
    return evaluerBloc(storylet.conditions, ctx);
  });
}

/** Le meilleur storylet ici : priorité la plus haute, puis tirage pondéré. */
export function choisirStorylet(etat, catalogue) {
  const eligibles = storyletsEligibles(etat, catalogue);
  if (!eligibles.length) return null;
  const prioriteMax = Math.max(...eligibles.map((s) => s.priorite ?? 5));
  const tier = eligibles.filter((s) => (s.priorite ?? 5) === prioriteMax);
  return choisirPondere(etat, tier, (s) => {
    const vus = etat.systeme.storylets_vus[s.id] ?? 0;
    return (s.poids ?? 10) / (1 + vus); // anti-répétition
  });
}

/* ------------------------------------------------------------------ */
/* Cycle de vie d'une scène                                            */
/* ------------------------------------------------------------------ */

export function demarrerScene(etat, storyletId, catalogue) {
  const storylet = catalogue.storylets[storyletId];
  if (!storylet) return etat;

  etat.systeme.scene = {
    id: storylet.id,
    local: { ...(storylet.etat_local_initial ?? {}) },
    tour: 0,
    journal: [],
    options_epuisees: [],
    regles_declenchees: [],
    texte_force: null,
    dernier_texte: null,
    terminee: false,
  };

  if (storylet.duree_segments) {
    avancerSegments(etat, storylet.duree_segments, catalogue.objets)
      .forEach((b) => etat.systeme.scene.journal.push({ type: 'systeme', texte: b.texte }));
  }
  if (storylet.effets_entree) {
    const r = appliquerEffets(etat, storylet.effets_entree, {
      local: etat.systeme.scene.local,
      catalogueObjets: catalogue.objets,
    });
    r.journal.forEach((t) => etat.systeme.scene.journal.push({ type: 'systeme', texte: t }));
  }

  rafraichirScene(etat, catalogue, { premierTour: true });
  return etat;
}

/** Applique les règles locales puis recompose le texte visible. */
function rafraichirScene(etat, catalogue, { premierTour = false } = {}) {
  const scene = etat.systeme.scene;
  if (!scene) return;
  const storylet = catalogue.storylets[scene.id];
  const ctx = { etat, local: scene.local, catalogueObjets: catalogue.objets };

  scene.texte_force = null;
  for (const [index, regle] of (storylet.regles_locales ?? []).entries()) {
    const cle = regle.id ?? `r${index}`;
    if (regle.unique && scene.regles_declenchees.includes(cle)) continue;
    if (!evaluer(regle.si, ctx)) continue;
    if (regle.unique) scene.regles_declenchees.push(cle);
    for (const action of regle.alors ?? []) {
      if (action.texte_force !== undefined) {
        scene.texte_force = action.texte_force;
      } else {
        appliquerEffets(etat, [action], { local: scene.local, catalogueObjets: catalogue.objets });
      }
    }
  }

  const texte = composerTexte(storylet, ctx, scene);
  if (texte && (premierTour || texte !== scene.dernier_texte)) {
    scene.journal.push({ type: 'scene', texte });
    scene.dernier_texte = texte;
  }
}

function composerTexte(storylet, ctx, scene) {
  if (scene.texte_force) return scene.texte_force;
  const bloc = storylet.texte ?? {};
  let base = bloc.base ?? '';
  const ajouts = [];
  for (const variante of bloc.variantes ?? []) {
    if (!evaluer(variante.si, ctx)) continue;
    if (variante.remplace !== undefined) base = variante.remplace;
    if (variante.ajout !== undefined) ajouts.push(variante.ajout);
  }
  return [base, ...ajouts].filter(Boolean).join('\n\n');
}

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

export function optionsDisponibles(etat, catalogue) {
  const scene = etat.systeme.scene;
  if (!scene || scene.terminee) return [];
  const storylet = catalogue.storylets[scene.id];
  const ctx = { etat, local: scene.local, catalogueObjets: catalogue.objets };

  const options = (storylet.options ?? []).filter((option) => {
    if (option.epuisable && scene.options_epuisees.includes(option.id)) return false;
    if (option.apparait_si && !evaluer(option.apparait_si, ctx)) return false;
    if (option.disparait_si && evaluer(option.disparait_si, ctx)) return false;
    return true;
  });

  // Règle non négociable : une sortie est toujours disponible.
  if (!options.some((o) => o.sortie)) {
    options.push(catalogue.systeme.sortie_secours);
  }

  // Règle non négociable : 3 à 5 options par tour. Quand un storylet s'épuise,
  // on complète avec des actions de repli — définies dans le contenu, pas ici.
  for (const repli of catalogue.systeme.options_repli ?? []) {
    if (options.length >= 3) break;
    if (options.some((o) => o.id === repli.id)) continue;
    if (repli.apparait_si && !evaluer(repli.apparait_si, ctx)) continue;
    options.push(repli);
  }

  if (options.length <= 5) return options;

  // Plafond à 5, sans jamais amputer la sortie : on coupe dans les options
  // ordinaires, en gardant l'ordre déclaré par le contenu.
  const sorties = options.filter((o) => o.sortie);
  const ordinaires = options.filter((o) => !o.sortie);
  const gardees = [...ordinaires.slice(0, Math.max(1, 5 - sorties.length)), ...sorties];
  return options.filter((o) => gardees.includes(o)).slice(0, 5);
}

/* ------------------------------------------------------------------ */
/* Résolution                                                          */
/* ------------------------------------------------------------------ */

export function resoudreOption(etat, optionId, catalogue) {
  const scene = etat.systeme.scene;
  if (!scene || scene.terminee) return etat;
  let option = optionsDisponibles(etat, catalogue).find((o) => o.id === optionId);
  if (!option) return etat;

  const ctx = { etat, local: scene.local, catalogueObjets: catalogue.objets };
  scene.journal.push({ type: 'choix', texte: option.libelle });

  if (option.cout?.segments) {
    avancerSegments(etat, option.cout.segments, catalogue.objets)
      .forEach((b) => scene.journal.push({ type: 'systeme', texte: b.texte }));
  }
  if (option.cout?.objets) {
    appliquerEffets(
      etat,
      option.cout.objets.map((o) => ({ objet: o.id, quantite: -(o.quantite ?? 1) })),
      { local: scene.local, catalogueObjets: catalogue.objets }
    );
  }

  const issue = choisirIssue(etat, option.issues ?? [], ctx);
  if (issue) {
    if (issue.texte) scene.journal.push({ type: 'issue', texte: issue.texte });
    const resultat = appliquerEffets(etat, issue.effets, {
      local: scene.local,
      catalogueObjets: catalogue.objets,
    });
    resultat.journal.forEach((t) => scene.journal.push({ type: 'systeme', texte: t }));
    resultat.montees.forEach((m) =>
      scene.journal.push({
        type: 'systeme',
        texte: catalogue.systeme.texte_montee(m),
      })
    );
    for (const id of resultat.declenche) etat.systeme.file_declenchee.push(id);
    if (issue.sortie) option = { ...option, sortie: true };
  }

  if (option.epuisable) scene.options_epuisees.push(option.id);
  scene.tour += 1;

  if (option.sortie || issue?.sortie) {
    terminerScene(etat, catalogue);
  } else {
    rafraichirScene(etat, catalogue);
  }
  return etat;
}

export function terminerScene(etat, catalogue) {
  const scene = etat.systeme.scene;
  if (!scene) return;
  scene.terminee = true;
  etat.systeme.storylets_vus[scene.id] = (etat.systeme.storylets_vus[scene.id] ?? 0) + 1;
  etat.systeme.journal.push({
    jour: etat.temps.jour,
    segment: etat.temps.segment,
    storylet: scene.id,
    entrees: scene.journal,
  });
  if (etat.systeme.journal.length > 40) etat.systeme.journal.shift();
}

/* ------------------------------------------------------------------ */
/* Différés                                                            */
/* ------------------------------------------------------------------ */

/**
 * Un différé se résout sur un LIEU ou un ÉVÉNEMENT, jamais sur un simple délai.
 * @returns l'id du storylet à jouer, ou null.
 */
export function differeAResoudre(etat, catalogue, declencheur = {}) {
  const ctx = { etat, local: {}, catalogueObjets: catalogue.objets };
  for (const differe of etat.systeme.differes) {
    const res = differe.resolution ?? {};
    if (res.lieu && res.lieu !== (declencheur.lieu ?? etat.geo.position)) continue;
    if (res.evenement && res.evenement !== declencheur.evenement) continue;
    if (res.si && !evaluer(res.si, ctx)) continue;
    if (res.jour_min && etat.temps.jour < differe.cree_jour + res.jour_min) continue;
    return differe;
  }
  return null;
}

export function consommerDiffere(etat, evenement) {
  etat.systeme.differes = etat.systeme.differes.filter((d) => d.evenement !== evenement);
}
