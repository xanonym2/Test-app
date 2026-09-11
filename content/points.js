// Carte — 6 points d'intérêt (CONTRAT §3 et §15).
// Le graphe de voisins est symétrique : chaque lien est déclaré des deux côtés.
// note_carte : une ligne, ce que le héros sait du lieu avant d'y aller.

export const points = {
  "P01": {
    id: "P01",
    nom: "La Crête",
    nom_court: "Crête",
    zone: "Z01",
    type_lieu: "hauteur",
    territoire: "frontiere",
    voisins: { P02: 1, P03: 1, P04: 2, P05: 2, P06: 2 },
    note_carte: "Le seul point haut du secteur : on y voit toute la vallée et on sait où aller ensuite.",
  },

  "P02": {
    id: "P02",
    nom: "La Ferme",
    nom_court: "Ferme",
    zone: "Z01",
    type_lieu: "ferme",
    territoire: "vallee",
    voisins: { P01: 1, P03: 1, P06: 1 },
    note_carte: "Une ferme isolée, vidée de ses gens : il peut rester des vivres et des outils à prendre.",
  },

  "P03": {
    id: "P03",
    nom: "La Source",
    nom_court: "Source",
    zone: "Z01",
    type_lieu: "point_eau",
    territoire: "vallee",
    voisins: { P01: 1, P02: 1, P04: 1 },
    note_carte: "La source ne tarit jamais : le seul endroit du secteur où boire et remplir une gourde.",
  },

  "P04": {
    id: "P04",
    nom: "Le Layon",
    nom_court: "Layon",
    zone: "Z01",
    type_lieu: "sentier",
    territoire: "bois",
    voisins: { P01: 2, P03: 1, P05: 1 },
    note_carte: "Un sentier de débardage qui coupe par le dévers : c'est plus court, et le sol lâche.",
  },

  "P05": {
    id: "P05",
    nom: "Le Camp des fuyards",
    nom_court: "Camp",
    zone: "Z01",
    type_lieu: "camp",
    territoire: "bois",
    voisins: { P01: 2, P04: 1, P06: 1 },
    note_carte: "Des gens du village s'y sont regroupés : c'est là qu'on apprend qui a vu quoi.",
  },

  "P06": {
    id: "P06",
    nom: "Le Vieux Poste",
    nom_court: "Vieux Poste",
    zone: "Z01",
    type_lieu: "ruine",
    territoire: "frontiere",
    voisins: { P01: 2, P02: 1, P05: 1 },
    note_carte: "Le poste de garde que plus personne ne tient : il y reste du matériel, si on peut le porter.",
  },
};
