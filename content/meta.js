// Méta — paramètres de partie (CONTRAT §16).
// meta.fins ne contient ici que FIN-MORT : les fins de ST-FIN-01 sont
// fournies ailleurs et fusionnées à l'assemblage.

export const meta = {
  titre: "Val-de-Garde",
  point_depart: "P01",
  points_initiaux: ["P01"],
  storylet_ouverture: "ST-OUV-01",
  // Phrase neutre : le joueur rentre sans rien avoir vu de notable.
  transition_repos: "Tu rentres sans avoir croisé quoi que ce soit qui mérite qu'on s'arrête.",
  inventaire_initial: [
    { base: "OBJ-01", usure: 75 },
    { base: "OBJ-02", quantite: 9 },
    { base: "OBJ-03", usure: 80 },
    { base: "OBJ-04" },
    { base: "OBJ-05", quantite: 1 },
    { base: "OBJ-06", quantite: 1 },
  ],
  fins: {
    "FIN-MORT": {
      id: "FIN-MORT",
      nom: "Tu n'es pas allé plus loin",
      description: "Tu t'arrêtes là, à quelques heures de marche de la frontière. Ce que tu avais compris s'arrête avec toi. Ceux qui attendaient une réponse n'en auront pas.",
    },
  },
};
