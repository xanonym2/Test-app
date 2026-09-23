// Sauvegarde versionnée. Règle non négociable n°2 : versionner dès le jour 1.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VERSION_SAUVEGARDE } from './schema.js';
import { migrer } from './migrations.js';

const CLE = 'vdg:partie';
const CLE_REGLAGES = 'vdg:reglages';

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
