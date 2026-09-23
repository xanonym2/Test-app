// Chaîne de migrations de sauvegarde, isolée du stockage.
// Séparée de save.js pour une seule raison : save.js importe AsyncStorage, que
// Node ne sait pas charger. Une migration qu'on ne peut pas tester est une
// migration qui casse en silence.
import { VERSION_SAUVEGARDE } from './schema.js';

// migrations[n] transforme une sauvegarde v(n) en v(n+1).
export const migrations = {
  // v1 -> v2 : la soif devient un état dérivé du temps depuis le dernier verre.
  // Une partie reprise repart désaltérée plutôt que subitement assoiffée.
  1: (etat) => ({ ...etat, heros: { ...etat.heros, segments_sans_boire: 0 } }),
};

// Retourne l'état migré, ou null si la chaîne est trouée.
export function migrer(paquet) {
  let { version, etat } = paquet;
  if (typeof version !== 'number') return null;
  if (version > VERSION_SAUVEGARDE) return null; // sauvegarde plus récente que le binaire
  while (version < VERSION_SAUVEGARDE) {
    const m = migrations[version];
    if (!m) return null;
    etat = m(etat);
    version += 1;
  }
  return etat;
}

// Vrai si chaque version antérieure a bien sa migration.
export function chaineComplete() {
  for (let v = 1; v < VERSION_SAUVEGARDE; v++) if (!migrations[v]) return false;
  return true;
}
