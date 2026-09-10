// Assemblage du catalogue. Le moteur reçoit CET objet et rien d'autre.
// Aucun texte narratif ne vit ailleurs que dans /content.

import { objets, objetsDepart } from './objets.js';
import { modificateurs } from './modificateurs.js';
import { creatures } from './creatures.js';
import { pnjs } from './pnjs.js';
import { competences } from './competences.js';
import { zones, points, liaisons, depart } from './zones.js';
import { systeme } from './systeme.js';

import { storyletsCrete } from './storylets/crete.js';
import { storyletsFerme } from './storylets/ferme.js';
import { storyletsSource } from './storylets/source.js';
import { storyletsLayon } from './storylets/layon.js';
import { storyletsCamp } from './storylets/camp.js';
import { storyletsPoste } from './storylets/poste.js';
import { storyletsGlobaux } from './storylets/global.js';

const tousLesStorylets = [
  ...storyletsCrete,
  ...storyletsFerme,
  ...storyletsSource,
  ...storyletsLayon,
  ...storyletsCamp,
  ...storyletsPoste,
  ...storyletsGlobaux,
];

export const storylets = Object.fromEntries(tousLesStorylets.map((s) => [s.id, s]));

export const catalogue = {
  zones,
  points,
  liaisons,
  storylets,
  objets,
  modificateurs,
  creatures,
  pnjs,
  competences,
  systeme,
};

export const departContenu = depart;
export { objetsDepart };
