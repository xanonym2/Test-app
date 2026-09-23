// Générateur pseudo-aléatoire déterministe (mulberry32).
// Sérialisable : l'état du RNG tient dans un entier, donc une sauvegarde
// reprise redonne exactement la même suite de tirages.

export function creerSeed() {
  return (Math.floor(Math.random() * 0xffffffff) >>> 0);
}

export function suivant(etat) {
  let a = (etat + 0x6d2b79f5) >>> 0;
  let t = a;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  const valeur = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  return { etat: a, valeur };
}

// Tire un entier dans [0, max[
export function entier(etat, max) {
  const r = suivant(etat);
  return { etat: r.etat, valeur: Math.floor(r.valeur * max) };
}

// Tire vrai avec une probabilité en pourcentage (0-100)
export function pourcent(etat, p) {
  const r = suivant(etat);
  return { etat: r.etat, valeur: r.valeur * 100 < p };
}

// Tire un élément d'une liste
export function choix(etat, liste) {
  const r = entier(etat, liste.length);
  return { etat: r.etat, valeur: liste[r.valeur] };
}

// Tire un élément pondéré : [{ poids: n, ... }]
export function choixPondere(etat, liste) {
  const total = liste.reduce((s, e) => s + (e.poids ?? 1), 0);
  if (total <= 0) return { etat, valeur: liste[0] };
  const r = suivant(etat);
  let seuil = r.valeur * total;
  for (const e of liste) {
    seuil -= e.poids ?? 1;
    if (seuil < 0) return { etat: r.etat, valeur: e };
  }
  return { etat: r.etat, valeur: liste[liste.length - 1] };
}

// Mélange (Fisher-Yates) sans muter l'entrée
export function melange(etat, liste) {
  const out = liste.slice();
  let e = etat;
  for (let i = out.length - 1; i > 0; i--) {
    const r = entier(e, i + 1);
    e = r.etat;
    const j = r.valeur;
    [out[i], out[j]] = [out[j], out[i]];
  }
  return { etat: e, valeur: out };
}
