// Inventaire : objets portés, usure 0-100, modificateurs (préfixe/suffixe).
// Le moteur ne connaît que des identifiants ; les noms viennent du contenu.

export const PALIERS_USURE = [
  { min: 80, cle: 'intact', rendement: 1.0 },
  { min: 55, cle: 'marque', rendement: 0.9 },
  { min: 30, cle: 'abime', rendement: 0.7 },
  { min: 10, cle: 'au_bord', rendement: 0.45 },
  { min: 0, cle: 'hors_service', rendement: 0.0 },
];

/** L'efficacité chute par paliers, jamais linéairement. */
export function palierUsure(usure) {
  return PALIERS_USURE.find((p) => usure >= p.min) ?? PALIERS_USURE[PALIERS_USURE.length - 1];
}

export function ajouterObjet(etat, { base, quantite = 1, prefixe = null, suffixe = null, usure = 100 }) {
  const modele = { base, prefixe, suffixe };
  const empilable = usure >= 100 && !prefixe && !suffixe;

  if (empilable) {
    const existant = etat.inventaire.find(
      (o) => o.base === base && !o.prefixe && !o.suffixe && o.usure >= 100
    );
    if (existant) {
      existant.quantite = (existant.quantite ?? 1) + quantite;
      return existant;
    }
  }
  const objet = {
    uid: `o${(etat.systeme.compteur_objets = (etat.systeme.compteur_objets || 0) + 1)}`,
    ...modele,
    usure,
    quantite,
  };
  etat.inventaire.push(objet);
  return objet;
}

export function retirerObjet(etat, base, quantite = 1) {
  let reste = quantite;
  // On retire d'abord les exemplaires les plus abîmés.
  const candidats = etat.inventaire
    .filter((o) => o.base === base)
    .sort((a, b) => a.usure - b.usure);
  for (const objet of candidats) {
    if (reste <= 0) break;
    const pris = Math.min(objet.quantite ?? 1, reste);
    objet.quantite = (objet.quantite ?? 1) - pris;
    reste -= pris;
  }
  etat.inventaire = etat.inventaire.filter((o) => (o.quantite ?? 1) > 0);
  return quantite - reste;
}

export function quantite(etat, base) {
  return etat.inventaire
    .filter((o) => o.base === base)
    .reduce((s, o) => s + (o.quantite ?? 1), 0);
}

export function userObjet(etat, base, delta) {
  // On use l'exemplaire le plus sain : c'est celui qu'on utilise réellement.
  const candidats = etat.inventaire.filter((o) => o.base === base).sort((a, b) => b.usure - a.usure);
  const objet = candidats[0];
  if (!objet) return null;
  objet.usure = Math.max(0, Math.min(100, objet.usure + delta));
  return objet;
}

/** Nom affiché : préfixe + base + suffixe, résolus dans le contenu. */
export function nomObjet(objet, catalogueObjets, catalogueModificateurs) {
  const modele = catalogueObjets[objet.base];
  if (!modele) return objet.base;
  const prefixe = objet.prefixe ? catalogueModificateurs.prefixes[objet.prefixe] : null;
  const suffixe = objet.suffixe ? catalogueModificateurs.suffixes[objet.suffixe] : null;
  return [prefixe?.libelle, modele.nom, suffixe?.libelle].filter(Boolean).join(' ');
}

/** Rendement final : palier d'usure × modificateurs. */
export function rendement(objet, catalogueModificateurs) {
  let valeur = palierUsure(objet.usure).rendement;
  const prefixe = objet.prefixe ? catalogueModificateurs.prefixes[objet.prefixe] : null;
  const suffixe = objet.suffixe ? catalogueModificateurs.suffixes[objet.suffixe] : null;
  valeur *= prefixe?.rendement ?? 1;
  valeur *= suffixe?.rendement ?? 1;
  return valeur;
}
