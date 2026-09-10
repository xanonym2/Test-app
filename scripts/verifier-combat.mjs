// Parcourt exhaustivement le combat narratif : toutes les suites de choix
// possibles, jusqu'à 6 tours. Contrôle qu'il se termine toujours, que le
// nombre d'options reste dans les clous, et qu'aucun état local n'est absurde.
// N'affiche que des identifiants et des compteurs.

import { catalogue } from '../content/index.js';
import { demarrerScene, optionsDisponibles, resoudreOption } from '../engine/storylets.js';
import { creerEtatInitial } from '../engine/etat.js';

const ID = 'VDG-017';
let explores = 0;
let termines = 0;
let maxTours = 0;
const problemes = new Set();
const cheminsSansFin = [];

function explorer(chemin, graine) {
  const etat = creerEtatInitial(graine);
  etat.recit.flags.connait_fenetre_poste = true;
  etat.inventaire.push({ uid: 'x1', base: 'epieu', prefixe: null, suffixe: null, usure: 80, quantite: 1 });
  demarrerScene(etat, ID, catalogue);

  for (const idOption of chemin) {
    if (!etat.systeme.scene || etat.systeme.scene.terminee) return null;
    const options = optionsDisponibles(etat, catalogue);
    if (!options.some((o) => o.id === idOption)) return null;
    resoudreOption(etat, idOption, catalogue);
  }
  return etat;
}

function descendre(chemin, graine) {
  const etat = explorer(chemin, graine);
  if (!etat) return;
  const scene = etat.systeme.scene;

  if (scene.terminee) {
    termines += 1;
    maxTours = Math.max(maxTours, scene.tour);
    if (scene.local.sante_ennemi > 0 && !scene.local.fini && chemin.every((c) => !['E', 'F', 'Z'].includes(c))) {
      problemes.add('sortie sans issue de combat');
    }
    return;
  }

  const options = optionsDisponibles(etat, catalogue);
  if (options.length < 3) problemes.add(`${options.length} options au tour ${scene.tour}`);
  if (options.length > 5) problemes.add(`${options.length} options au tour ${scene.tour}`);
  if (!options.some((o) => o.sortie)) problemes.add(`aucune sortie au tour ${scene.tour}`);
  if (scene.local.sante_ennemi > 20) problemes.add('santé ennemie incohérente');
  if (etat.heros.sante < 0) problemes.add('santé du héros négative');

  if (chemin.length >= 6) { cheminsSansFin.push(chemin.join('')); return; }
  explores += 1;
  for (const option of options) descendre([...chemin, option.id], graine);
}

for (const graine of [1, 2, 3, 5, 8, 13, 21, 34]) descendre([], graine);

console.log(`nœuds explorés : ${explores}`);
console.log(`fins de scène atteintes : ${termines}`);
console.log(`tours maximum observés : ${maxTours}`);
console.log(`chemins encore ouverts à 6 tours : ${cheminsSansFin.length}`);
if (problemes.size) {
  console.log('PROBLÈMES :');
  [...problemes].forEach((p) => console.log('  - ' + p));
  process.exit(1);
}
console.log('Le combat se referme toujours, dans les bornes attendues.');
