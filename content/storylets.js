// Index du contenu narratif. Le moteur ne connaît que cette table.

import { PROLOGUE } from './storylets/prologue';
import { CRETE } from './storylets/z01_crete';
import { FERME } from './storylets/z01_ferme';
import { SOURCE } from './storylets/z01_source';
import { LAYON } from './storylets/z01_layon';
import { CAMP } from './storylets/z01_camp';
import { POSTE } from './storylets/z01_poste';
import { SECONDAIRES } from './storylets/z01_secondaires';
import { COMBAT } from './storylets/combat';
import { VOYAGES, DIFFERES, SORTIE } from './storylets/voyages';

export const STORYLETS = {
  ...PROLOGUE,
  ...CRETE,
  ...FERME,
  ...SOURCE,
  ...LAYON,
  ...CAMP,
  ...POSTE,
  ...SECONDAIRES,
  ...COMBAT,
  ...VOYAGES,
  ...DIFFERES,
  ...SORTIE,
};

export const DEPART = 'PRO-001';
