// Vérifie mécaniquement les règles de contenu non négociables.
// Ne montre jamais le texte : uniquement des identifiants et des compteurs.

import { catalogue } from '../content/index.js';
import { objets } from '../content/objets.js';

const erreurs = [];
const avertissements = [];
const storylets = Object.values(catalogue.storylets);

const idsObjets = new Set(Object.keys(objets));
const idsPoints = new Set(Object.keys(catalogue.points));
const idsPnjs = new Set(Object.keys(catalogue.pnjs));
const idsStorylets = new Set(Object.keys(catalogue.storylets));
const idsPrefixes = new Set(Object.keys(catalogue.modificateurs.prefixes));
const idsSuffixes = new Set(Object.keys(catalogue.modificateurs.suffixes));

function parcourirEffets(liste, visite) {
  for (const e of liste ?? []) visite(e);
}

function tousLesEffetsDe(storylet) {
  const out = [];
  parcourirEffets(storylet.effets_entree, (e) => out.push(e));
  for (const regle of storylet.regles_locales ?? []) parcourirEffets(regle.alors, (e) => out.push(e));
  for (const option of storylet.options ?? []) {
    for (const issue of option.issues ?? []) parcourirEffets(issue.effets, (e) => out.push(e));
    for (const c of option.cout?.objets ?? []) out.push({ objet: c.id });
  }
  return out;
}

for (const s of storylets) {
  const p = `[${s.id}]`;

  // 5. Une sortie est toujours disponible (au moins une option de sortie inconditionnelle).
  const sorties = (s.options ?? []).filter((o) => o.sortie || (o.issues ?? []).some((i) => i.sortie));
  const sortieInconditionnelle = sorties.some((o) => !o.apparait_si && !o.epuisable);
  if (!sorties.length) erreurs.push(`${p} aucune option de sortie`);
  else if (!sortieInconditionnelle) avertissements.push(`${p} sorties toutes conditionnelles (vérifié en simulation)`);

  // 6. 3 à 5 options par tour (on contrôle le total déclaré, hors combat multi-phases).
  const n = (s.options ?? []).length;
  if (n < 3) erreurs.push(`${p} ${n} option(s) déclarée(s), minimum 3`);
  if (n > 8) avertissements.push(`${p} ${n} options déclarées, vérifier le nombre visible par tour`);

  // 3. Toute option risquée (qui coûte de la santé ou un état) a au moins deux issues.
  for (const o of s.options ?? []) {
    const issues = o.issues ?? [];
    if (!issues.length) erreurs.push(`${p} option ${o.id} sans issue`);
    const risquee = issues.some((i) =>
      (i.effets ?? []).some((e) => (e.sante_heros ?? 0) < 0 || (e.etat !== undefined && !e.retire))
    );
    if (risquee && issues.length < 2 && !o.sortie && !s.deterministe) {
      avertissements.push(`${p} option ${o.id} risquée avec une seule issue`);
    }
    // 7. Une option d'observation coûtant du temps là où il y a du risque.
    if (o.cout && o.cout.segments === undefined && !o.sortie) {
      avertissements.push(`${p} option ${o.id} a un coût sans segments`);
    }
  }
  const aDuRisque = (s.options ?? []).some((o) =>
    (o.issues ?? []).some((i) => (i.effets ?? []).some((e) => (e.sante_heros ?? 0) < 0))
  );
  // Une option d'observation est marquée explicitement et doit coûter quelque chose :
  // du temps hors combat, du terrain en combat.
  const aObservation = (s.options ?? []).some(
    (o) =>
      o.observation === true &&
      !o.sortie &&
      (o.cout?.segments >= 1 || s.deterministe) &&
      (o.issues ?? []).every((i) => !(i.effets ?? []).some((e) => (e.sante_heros ?? 0) < 0))
  );
  if (aDuRisque && !aObservation) erreurs.push(`${p} du risque mais aucune option d'observation sûre`);

  // 4. Un storylet qui ne modifie rien n'a pas sa place.
  const effets = tousLesEffetsDe(s);
  if (!effets.length) erreurs.push(`${p} ne modifie aucun état`);

  // 1. Identifiants stables : toute référence doit exister.
  for (const e of effets) {
    if (e.objet && !idsObjets.has(e.objet)) erreurs.push(`${p} objet inconnu : ${e.objet}`);
    // `{ objet, usure }` fixe l'usure initiale d'un objet donné ; `{ usure: id }` la modifie.
    if (typeof e.usure === 'string' && !idsObjets.has(e.usure)) erreurs.push(`${p} usure sur objet inconnu : ${e.usure}`);
    if (e.prefixe && !idsPrefixes.has(e.prefixe)) erreurs.push(`${p} préfixe inconnu : ${e.prefixe}`);
    if (e.suffixe && !idsSuffixes.has(e.suffixe)) erreurs.push(`${p} suffixe inconnu : ${e.suffixe}`);
    if (e.declenche && !idsStorylets.has(e.declenche)) erreurs.push(`${p} déclenche un storylet inconnu : ${e.declenche}`);
    if (e.confiance && !idsPnjs.has(e.confiance.pnj)) erreurs.push(`${p} PNJ inconnu : ${e.confiance.pnj}`);
    if (e.pnj_statut && !idsPnjs.has(e.pnj_statut.id)) erreurs.push(`${p} PNJ inconnu : ${e.pnj_statut.id}`);
    if (e.point_decouvert) {
      for (const id of [].concat(e.point_decouvert)) {
        if (!idsPoints.has(id)) erreurs.push(`${p} point inconnu : ${id}`);
      }
    }
    if (e.deplace && !idsPoints.has(e.deplace)) erreurs.push(`${p} destination inconnue : ${e.deplace}`);
    if (e.lieu_bloque && !idsPoints.has(e.lieu_bloque.id)) erreurs.push(`${p} lieu bloqué inconnu : ${e.lieu_bloque.id}`);
    if (e.differe?.charge && !idsStorylets.has(e.differe.charge)) erreurs.push(`${p} différé sur storylet inconnu`);
    // 8. Un différé se résout sur un lieu ou un événement, jamais sur un délai seul.
    if (e.differe) {
      const r = e.differe.resolution ?? {};
      if (!r.lieu && !r.evenement && !r.si) erreurs.push(`${p} différé sans lieu ni événement de résolution`);
      if (r.lieu && !idsPoints.has(r.lieu)) erreurs.push(`${p} différé résolu sur un lieu inconnu`);
    }
  }

  // Le lieu ciblé doit exister.
  const lieu = s.lieu ?? { type: 'partout' };
  if (lieu.type === 'point_interet') {
    for (const cible of [].concat(lieu.cible)) {
      if (!idsPoints.has(cible)) erreurs.push(`${p} lieu inconnu : ${cible}`);
    }
  }
  if (lieu.type === 'zone') {
    for (const cible of [].concat(lieu.cible)) {
      if (!catalogue.zones[cible]) erreurs.push(`${p} zone inconnue : ${cible}`);
    }
  }
}

// Chaque point d'intérêt doit avoir au moins un storylet d'entrée.
for (const id of idsPoints) {
  const couvert = storylets.some(
    (s) => s.lieu?.type === 'point_interet' && [].concat(s.lieu.cible).includes(id)
  );
  if (!couvert) avertissements.push(`point sans storylet dédié : ${id}`);
}

// Le graphe doit être connexe depuis le départ.
const vus = new Set(['VDG-Z01-P01']);
let change = true;
while (change) {
  change = false;
  for (const l of catalogue.liaisons) {
    if (vus.has(l.a) && !vus.has(l.b)) { vus.add(l.b); change = true; }
    if (vus.has(l.b) && !vus.has(l.a)) { vus.add(l.a); change = true; }
  }
}
for (const id of idsPoints) if (!vus.has(id)) erreurs.push(`point inatteignable : ${id}`);

console.log(`storylets : ${storylets.length}`);
console.log(`objets de base : ${idsObjets.size}`);
console.log(`préfixes/suffixes : ${idsPrefixes.size}/${idsSuffixes.size}`);
console.log(`créatures : ${Object.keys(catalogue.creatures).length}`);
console.log(`PNJ : ${idsPnjs.size}`);
console.log(`points d'intérêt : ${idsPoints.size}`);
console.log('');
if (avertissements.length) {
  console.log(`AVERTISSEMENTS (${avertissements.length})`);
  avertissements.forEach((a) => console.log('  - ' + a));
}
if (erreurs.length) {
  console.log(`ERREURS (${erreurs.length})`);
  erreurs.forEach((e) => console.log('  - ' + e));
  process.exit(1);
}
console.log('Toutes les règles de contenu vérifiables sont respectées.');
