// Sauvegarde locale, versionnée dès le premier jour.
// Écriture après chaque décision validée : quitter et revenir rend exactement
// le même écran.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { migrer } from './state';

const CLE = 'vdg:sauvegarde:v1';

export async function ecrire(etat) {
  try {
    await AsyncStorage.setItem(CLE, JSON.stringify(etat));
    return true;
  } catch (e) {
    return false;
  }
}

export async function lire() {
  try {
    const brut = await AsyncStorage.getItem(CLE);
    if (!brut) return null;
    return migrer(JSON.parse(brut));
  } catch (e) {
    return null;
  }
}

export async function effacer() {
  try {
    await AsyncStorage.removeItem(CLE);
    return true;
  } catch (e) {
    return false;
  }
}
