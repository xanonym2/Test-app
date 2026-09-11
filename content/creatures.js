// Créatures — 6 fiches. Voir CONTRAT.md §7.
// `note` : ce qu'un chasseur remarque et qui sert à décider. Pas d'ambiance.

export const creatures = {
  "CRE-01": {
    id: "CRE-01",
    nom: "Guerrier orc",
    type: "orc",
    pv: 32,
    degats: 11,
    note: "Il frappe de haut et découvre son flanc gauche à chaque coup porté.",
  },

  "CRE-02": {
    id: "CRE-02",
    nom: "Éclaireur orc",
    type: "orc",
    pv: 22,
    degats: 7,
    note: "Il court plus vite qu'un homme et lance un appel bref dès qu'il vous voit.",
  },

  "CRE-03": {
    id: "CRE-03",
    nom: "Rôdeur affamé",
    type: "humain",
    pv: 16,
    degats: 5,
    note: "Ses mains tremblent et il recule dès qu'on lui montre une lame.",
  },

  "CRE-04": {
    id: "CRE-04",
    nom: "Soldat déserteur",
    type: "humain",
    pv: 26,
    degats: 9,
    note: "Il garde la discipline de l'armée : il attend l'ouverture au lieu de charger.",
  },

  "CRE-05": {
    id: "CRE-05",
    nom: "Loup maigre",
    type: "bete",
    pv: 15,
    degats: 5,
    note: "Il tourne avant de mordre et ne vient jamais de face.",
  },

  "CRE-06": {
    id: "CRE-06",
    nom: "Ours de dévers",
    type: "bete",
    pv: 34,
    degats: 12,
    note: "Il charge droit et tourne mal : un tronc ou un rocher suffit à le semer.",
  },
};
