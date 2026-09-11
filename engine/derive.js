// Valeurs dérivées.
//
// Règle non négociable n°3 : on ne stocke jamais ce qui se calcule.
// Santé max, capacité de port, poids porté, portée d'observation, paliers
// d'usure : tout est recalculé à la volée à partir de l'état de base.

import { OBJETS } from '../content/objets';

export function santeMax(etat) {
  return 20 + etat.heros.stats.vigueur * 5;
}

export function capacitePort(etat) {
  return 10 + etat.heros.stats.vigueur * 4;
}

export function porteeObservation(etat) {
  return etat.heros.stats.perception;
}

export function xpProchainNiveau(niveau) {
  return [0, 30, 80, 160, 280, Infinity][niveau] ?? Infinity;
}

// --- Inventaire -------------------------------------------------------------

export function ligneObjet(etat, id) {
  return etat.inventaire.objets.find((o) => o.id === id) || null;
}

export function quantiteObjet(etat, id) {
  const l = ligneObjet(etat, id);
  return l ? l.quantite : 0;
}

export function usureObjet(etat, id) {
  const l = ligneObjet(etat, id);
  return l ? l.usure : 0;
}

export function defObjet(id) {
  return OBJETS[id] || { id, nom: id, poids: 0, categorie: 'divers' };
}

// Un objet porté = { id, quantite, usure, prefixe?, suffixe? }
export function nomAffiche(ligne) {
  const base = defObjet(ligne.id).nom;
  const prefixe = ligne.prefixe ? `${ligne.prefixe} ` : '';
  const suffixe = ligne.suffixe ? ` ${ligne.suffixe}` : '';
  return `${prefixe}${base}${suffixe}`;
}

export function poidsPorte(etat) {
  return etat.inventaire.objets.reduce(
    (total, l) => total + defObjet(l.id).poids * l.quantite,
    0
  );
}

export function surcharge(etat) {
  return Math.max(0, poidsPorte(etat) - capacitePort(etat));
}

// L'efficacité chute par paliers, jamais linéairement.
export const PALIERS_USURE = [
  { min: 85, cle: 'neuf', nom: 'comme neuf', facteur: 1 },
  { min: 60, cle: 'bon', nom: 'en bon état', facteur: 1 },
  { min: 40, cle: 'marque', nom: 'marqué', facteur: 0.85 },
  { min: 20, cle: 'fatigue', nom: 'fatigué', facteur: 0.6 },
  { min: 1, cle: 'hs', nom: 'à bout', facteur: 0.35 },
  { min: -1, cle: 'casse', nom: 'hors d’usage', facteur: 0 },
];

export function palierUsure(valeur) {
  return PALIERS_USURE.find((p) => valeur >= p.min) || PALIERS_USURE[PALIERS_USURE.length - 1];
}

// --- États ------------------------------------------------------------------

export const SEUIL_FAIM = 65;
export const SEUIL_FATIGUE = 70;

export function etatsActifs(etat) {
  const actifs = Object.keys(etat.heros.etats).filter((k) => etat.heros.etats[k]);
  if (etat.heros.faim >= SEUIL_FAIM && !actifs.includes('affame')) actifs.push('affame');
  if (etat.heros.fatigue >= SEUIL_FATIGUE && !actifs.includes('epuise')) actifs.push('epuise');
  return actifs;
}

// Le registre de prose : ce qui colore l'écriture (§4.4 du brief).
// Un seul registre à la fois, du plus contraignant au plus large.
export function registreProse(etat) {
  const actifs = etatsActifs(etat);
  if (actifs.includes('epuise')) return 'epuise';
  if (actifs.includes('blesse_jambe') || actifs.includes('blesse_leger')) return 'blesse';
  if (actifs.includes('affame')) return 'affame';
  if (etat.heros.fatigue <= 30 && etat.heros.faim <= 30) return 'repose';
  return 'neutre';
}
