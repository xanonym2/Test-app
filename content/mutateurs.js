// Mutateurs — 6, en 3 groupes (CONTRAT §12).
// 1 à 2 tirés au départ, jamais deux du même groupe.
// description : une phrase concrète.

export const mutateurs = {
  "M01": {
    id: "M01",
    nom: "Hiver rude",
    groupe: "climat",
    description: "Le gel revient sans arrêt : dormir dehors et rester immobile coûtent plus cher.",
    effets: [
      { flag: "f_mut_hiver" },
    ],
    meteo_poids: { gel: 3, couvert: 2 },
  },

  "M02": {
    id: "M02",
    nom: "Saison humide",
    groupe: "climat",
    description: "Il pleut ou la brume tombe presque tous les jours : on voit moins loin et les traces filent.",
    effets: [
      { flag: "f_mut_humide" },
    ],
    meteo_poids: { pluie: 3, brume: 3 },
  },

  "M03": {
    id: "M03",
    nom: "La Couronne tient la frontière",
    groupe: "faction",
    description: "Les patrouilles passent encore dans le secteur et on te traite comme un des leurs.",
    effets: [
      { reputation: { faction: "couronne", valeur: 10 } },
    ],
  },

  "M04": {
    id: "M04",
    nom: "Les orcs pressent",
    groupe: "faction",
    description: "Ils avancent plus vite que prévu : tout ce qui devait arriver arrive un jour plus tôt.",
    effets: [
      { flag: "f_mut_orcs" },
    ],
    pression_decalage_jours: -1,
  },

  "M05": {
    id: "M05",
    nom: "Route coupée",
    groupe: "route",
    description: "Un pan de dévers est descendu sur le sentier : le passage reste fermé trois jours.",
    effets: [
      { lieu_bloque: { id: "P04", duree_jours: 3 } },
    ],
  },

  "M06": {
    id: "M06",
    nom: "Passage dégagé",
    groupe: "route",
    description: "Tu as déjà fait ce chemin cette saison : un lieu de plus est marqué sur ta carte au départ.",
    effets: [
      { debloque_point: "P06" },
    ],
  },
};
