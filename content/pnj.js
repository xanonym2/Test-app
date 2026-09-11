// PNJ — 4 fiches complètes + 3 entrées minimales (CONTRAT §8).
// PNJ-01 et PNJ-02 sont exclusifs : somme de stats égale (10), rôles et
// apports hors combat nettement distincts.

export const pnj = {
  "PNJ-01": {
    id: "PNJ-01",
    nom: "Garin",
    role: "melee",
    stats: { vigueur: 4, adresse: 2, perception: 2, sangfroid: 2 },
    competences: [],
    niveau: 1,
    niveau_max: 5,
    montee: ["vigueur", "sangfroid"],
    equipement: ["OBJ-07", "OBJ-10"],
    confiance_initiale: 0,
    apport_hors_combat: "Il prend la moitié de la charge et force les passages qu'on ne franchit pas seul.",
    description: "Bûcheron avant la guerre, il a tenu la palissade du village pendant deux hivers. Il parle peu et ne discute jamais une décision claire.",
    recrutable: true,
    exclusif_avec: "PNJ-02",
  },

  "PNJ-02": {
    id: "PNJ-02",
    nom: "Alix",
    role: "distance",
    stats: { vigueur: 1, adresse: 4, perception: 3, sangfroid: 2 },
    competences: [],
    niveau: 1,
    niveau_max: 5,
    montee: ["adresse", "perception"],
    equipement: ["OBJ-01", "OBJ-02"],
    confiance_initiale: 0,
    apport_hors_combat: "Elle recoud les plaies et trouve à manger là où le terrain paraît vide.",
    description: "Braconnière, elle connaît les bois mieux que les routes. Elle pose ses questions avant de suivre qui que ce soit.",
    recrutable: true,
    exclusif_avec: "PNJ-01",
  },

  "PNJ-03": {
    id: "PNJ-03",
    nom: "Firmin",
    role: "soutien",
    stats: { vigueur: 2, adresse: 2, perception: 3, sangfroid: 3 },
    competences: [],
    niveau: 1,
    niveau_max: 5,
    montee: ["perception", "sangfroid"],
    equipement: ["OBJ-03"],
    confiance_initiale: 0,
    apport_hors_combat: "Il sait qui est passé sur les routes, dans quel sens et quel jour.",
    description: "Colporteur, il faisait la tournée des fermes du secteur avant l'attaque. Il ne donne rien sans contrepartie.",
    recrutable: false,
  },

  "PNJ-04": {
    id: "PNJ-04",
    nom: "Perrin",
    role: "soutien",
    stats: { vigueur: 2, adresse: 2, perception: 1, sangfroid: 1 },
    competences: [],
    niveau: 1,
    niveau_max: 3,
    montee: ["vigueur", "adresse"],
    equipement: ["OBJ-03"],
    confiance_initiale: 25,
    apport_hors_combat: "Il fait le guet pendant que tu travailles et il court plus vite que toi.",
    description: "Seize ans, apprenti à la forge de ton frère. Il te suit parce qu'il n'a plus personne d'autre.",
    recrutable: false,
    fragile: true,
    depart: "D03",
  },

  "PNJ-F1": {
    id: "PNJ-F1",
    nom: "Mathieu",
    minimal: true,
    statut_initial: "disparu",
    note: "Ton frère, vingt ans, forgeron du village. Personne ne l'a vu depuis l'attaque.",
  },

  "PNJ-F2": {
    id: "PNJ-F2",
    nom: "Joé",
    minimal: true,
    statut_initial: "disparu",
    note: "Ton frère aîné, vingt-huit ans. Parti avant l'attaque, sans nouvelles depuis.",
  },

  "PNJ-V1": {
    id: "PNJ-V1",
    nom: "capitaine Vairon",
    minimal: true,
    statut_initial: "inconnu",
    note: "Officier de la Couronne. Son nom revient dès qu'on parle des ordres donnés à la garnison.",
  },
};
