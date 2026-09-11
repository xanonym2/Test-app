// Sauvegarde versionnée. Règle non négociable n°2 : versionner dès le jour 1.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERSION_SAUVEGARDE } from './schema.js';

const CLE = 'vdg:partie';
const CLE_REGLAGES = 'vdg:reglages';

// Chaîne de migrations : migrations[n] transforme une sauvegarde v(n) en v(n+1).
const migrations = {
  // 1: (etat) => { ...etat, nouveauChamp: valeur }
};

export function migrer(paquet) {
  let { version, etat } = paquet;
  while (version < VERSION_SAUVEGARDE) {
    const m = migrations[version];
    if (!m) return null; // migration manquante : sauvegarde inutilisable
    etat = m(etat);
    version += 1;
  }
  return etat;
}

export async function sauvegarder(etat) {
  try {
    const paquet = { version: VERSION_SAUVEGARDE, horodatage: Date.now(), etat };
    await AsyncStorage.setItem(CLE, JSON.stringify(paquet));
    return true;
  } catch (e) {
    return false;
  }
}

export async function charger() {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    if (!brut) return null;
    const paquet = JSON.parse(brut);
    if (typeof paquet.version !== 'number') return null;
    if (paquet.version > VERSION_SAUVEGARDE) return null; // sauvegarde plus récente que le binaire
    return migrer(paquet);
  } catch (e) {
    return null;
  }
}

export async function effacer() {
  try { await AsyncStorage.removeItem(CLE); return true; } catch (e) { return false; }
}

export async function existeSauvegarde() {
  try { return (await AsyncStorage.getItem(CLE)) !== null; } catch (e) { return false; }
}

// Réglages hors partie (ne persiste aucune progression de jeu).
export async function lireReglages() {
  try {
    const brut = await AsyncStorage.getItem(CLE_REGLAGES);
    return brut ? JSON.parse(brut) : {};
  } catch (e) { return {}; }
}

export async function ecrireReglages(r) {
  try { await AsyncStorage.setItem(CLE_REGLAGES, JSON.stringify(r)); return true; }
  catch (e) { return false; }
}
