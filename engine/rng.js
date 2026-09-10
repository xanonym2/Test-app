// Générateur pseudo-aléatoire déterministe.
// La graine et le compteur de tirages vivent dans l'état sauvegardé : rejouer
// une partie chargée depuis le disque produit exactement la même suite.

function melange(a) {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function creerGraine() {
  return (Math.random() * 0xffffffff) >>> 0;
}

/** Tire un flottant [0,1[ et fait avancer le compteur porté par l'état. */
export function tirer(etat) {
  etat.systeme.tirages = (etat.systeme.tirages || 0) + 1;
  return melange((etat.graine | 0) + etat.systeme.tirages * 2654435761);
}

/** Tire un entier dans [min, max] inclus. */
export function tirerEntier(etat, min, max) {
  return min + Math.floor(tirer(etat) * (max - min + 1));
}

/** Vrai avec `pourcentage` chances sur 100. */
export function reussit(etat, pourcentage) {
  return tirer(etat) * 100 < pourcentage;
}

/** Choisit une entrée pondérée : [{ poids }, ...]. */
export function choisirPondere(etat, entrees, poidsDe = (e) => e.poids ?? 1) {
  const total = entrees.reduce((s, e) => s + Math.max(0, poidsDe(e)), 0);
  if (total <= 0) return entrees[0] ?? null;
  let curseur = tirer(etat) * total;
  for (const entree of entrees) {
    curseur -= Math.max(0, poidsDe(entree));
    if (curseur < 0) return entree;
  }
  return entrees[entrees.length - 1];
}
