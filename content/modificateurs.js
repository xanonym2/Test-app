// Modificateurs — 4 préfixes, 4 suffixes. Voir CONTRAT.md §6.
// Nom affiché d'une instance : « <préfixe> <nom de base> <suffixe> ».
// Les préfixes choisis restent identiques au masculin et au féminin.

export const modificateurs = {
  // --- Préfixes péjoratifs ---
  "MOD-P1": {
    id: "MOD-P1",
    type: "prefixe",
    nom: "Piètre",
    poids: 14,
    categories: ["arme"],
    degats: -2,
    protection: 0,
    poids_facteur: 1.0,
    note: "Monté à la hâte, avec du bois qui n'a pas assez séché.",
  },

  "MOD-P2": {
    id: "MOD-P2",
    type: "prefixe",
    nom: "Sale",
    poids: 12,
    categories: ["arme", "protection"],
    degats: -1,
    protection: -2,
    poids_facteur: 1.0,
    note: "Rouille et crasse séchée : rien n'a été entretenu depuis longtemps.",
  },

  // --- Préfixes mélioratifs ---
  "MOD-P3": {
    id: "MOD-P3",
    type: "prefixe",
    nom: "Solide",
    poids: 8,
    categories: ["arme", "protection"],
    degats: 1,
    protection: 2,
    poids_facteur: 1.1,
    note: "Renforcé aux points de casse, plus lourd d'autant.",
  },

  "MOD-P4": {
    id: "MOD-P4",
    type: "prefixe",
    nom: "Souple",
    poids: 6,
    categories: ["arme", "protection", "divers"],
    degats: 1,
    protection: 1,
    poids_facteur: 0.85,
    note: "Bien équilibré, léger en main, sans rien qui accroche.",
  },

  // --- Suffixes : d'où vient l'objet ---
  "MOD-S1": {
    id: "MOD-S1",
    type: "suffixe",
    nom: "de garnison",
    poids: 10,
    categories: ["arme", "protection"],
    degats: 1,
    protection: 1,
    poids_facteur: 1.0,
    note: "Poinçon de la Couronne sous la garde : du matériel de troupe, entretenu par obligation.",
  },

  "MOD-S2": {
    id: "MOD-S2",
    type: "suffixe",
    nom: "de déserteur",
    poids: 8,
    categories: ["arme", "protection"],
    degats: 1,
    protection: 0,
    poids_facteur: 0.95,
    note: "Les marques d'unité ont été limées pour qu'on ne remonte pas jusqu'à lui.",
  },

  "MOD-S3": {
    id: "MOD-S3",
    type: "suffixe",
    nom: "de braconnier",
    poids: 9,
    categories: ["arme", "divers"],
    degats: 1,
    protection: 0,
    poids_facteur: 0.9,
    note: "Graissé, silencieux, allégé partout où l'on pouvait retirer de la matière.",
  },

  "MOD-S4": {
    id: "MOD-S4",
    type: "suffixe",
    nom: "de colporteur",
    poids: 7,
    categories: ["arme", "protection", "divers"],
    degats: 0,
    protection: 1,
    poids_facteur: 0.95,
    note: "Acheté sur une route et réparé trois fois : ça sert encore, ça ne vaut plus grand-chose.",
  },
};
