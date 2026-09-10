// Sauvegarde locale versionnée. Aucune dépendance réseau.
//
// Règle non négociable n°2 : la sauvegarde est versionnée dès le jour 1 et
// possède un mécanisme de migration. Toute évolution du modèle d'état ajoute
// une entrée dans MIGRATIONS ; on ne relit jamais une sauvegarde à l'aveugle.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERSION_SAUVEGARDE } from './etat.js';

const CLE = 'vdg:sauvegarde:1';

/**
 * Chaque migration prend un état en version N et renvoie un état en version N+1.
 * Exemple pour plus tard :
 *   2: (etat) => ({ ...etat, heros: { ...etat.heros, soif: 0 }, version_sauvegarde: 2 })
 */
export const MIGRATIONS = {};

export function migrer(etat) {
  let courant = etat;
  let version = courant.version_sauvegarde ?? 0;
  while (version < VERSION_SAUVEGARDE) {
    const migration = MIGRATIONS[version + 1];
    if (!migration) {
      // Pas de chemin de migration : on refuse plutôt que de corrompre la partie.
      return { ok: false, raison: 'migration_absente', version };
    }
    courant = migration(courant);
    version = courant.version_sauvegarde ?? version + 1;
  }
  if (version > VERSION_SAUVEGARDE) {
    return { ok: false, raison: 'sauvegarde_plus_recente', version };
  }
  return { ok: true, etat: courant };
}

export async function sauvegarder(etat) {
  try {
    await AsyncStorage.setItem(CLE, JSON.stringify(etat));
    return true;
  } catch (erreur) {
    return false;
  }
}

export async function charger() {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    if (!brut) return { ok: false, raison: 'aucune' };
    const parse = JSON.parse(brut);
    return migrer(parse);
  } catch (erreur) {
    return { ok: false, raison: 'illisible' };
  }
}

export async function effacer() {
  try {
    await AsyncStorage.removeItem(CLE);
    return true;
  } catch (erreur) {
    return false;
  }
}

export async function existeSauvegarde() {
  try {
    return (await AsyncStorage.getItem(CLE)) !== null;
  } catch (erreur) {
    return false;
  }
}
