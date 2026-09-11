// Assemblage du contenu et injection dans le moteur.
// Le moteur ne connaît que des identifiants ; tout ce qui est affiché part d'ici.
import { setDb } from '../engine/db.js';

import { meta as metaBase } from './meta.js';
import { points } from './points.js';
import { objets } from './objets.js';
import { modificateurs } from './modificateurs.js';
import { creatures } from './creatures.js';
import { pnj } from './pnj.js';
import { competences } from './competences.js';
import { badges } from './badges.js';
import { departs } from './departs.js';
import { mutateurs } from './mutateurs.js';
import { meteo } from './meteo.js';
import { pression } from './pression.js';
import { voyage } from './voyage.js';
import { libelles } from './libelles.js';

import * as ouverture from './storylets/ouverture.js';
import * as p01 from './storylets/p01.js';
import * as p02 from './storylets/p02.js';
import * as p03 from './storylets/p03.js';
import * as p04 from './storylets/p04.js';
import * as p05 from './storylets/p05.js';
import * as p06 from './storylets/p06.js';
import * as combat from './storylets/combat.js';
import * as evenements from './storylets/evenements.js';

const modules = [ouverture, p01, p02, p03, p04, p05, p06, combat, evenements];

export const storylets = Object.assign({}, ...modules.map((m) => m.storylets ?? {}));
export const journal = Object.assign({}, ...modules.map((m) => m.journal ?? {}));
const finsStorylets = Object.assign({}, ...modules.map((m) => m.fins ?? {}));

export const meta = { ...metaBase, fins: { ...(metaBase.fins ?? {}), ...finsStorylets } };

export const db = {
  meta, points, storylets, objets, modificateurs, creatures, pnj,
  competences, badges, departs, mutateurs, meteo, pression, voyage,
  libelles, journal,
};

setDb(db);

export default db;
