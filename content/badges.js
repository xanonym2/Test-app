// Badges — 10 fiches. Voir CONTRAT.md §10.
// `test` est une fonction pure : elle ne lit que E.stats_partie, E.recit,
// E.geo, E.compagnons, E.heros et E.temps. Elle n'écrit rien.

export const badges = {
  "B01": {
    id: "B01",
    nom: "Toute la vallée",
    description: "Tu as posé le pied sur chacun des lieux que la crête t'a montrés.",
    test: (E) => E.stats_partie.points_visites >= 5,
  },

  "B02": {
    id: "B02",
    nom: "Le compte n'y est pas",
    description: "Tu as réuni les trois choses qui ne collent pas avec la version officielle.",
    test: (E) => E.stats_partie.indices_trouves >= 3 || E.recit.connaissance_sortilege >= 3,
  },

  "B03": {
    id: "B03",
    nom: "Main lourde",
    description: "Tu as gagné plusieurs affrontements au lieu de les contourner.",
    test: (E) => E.stats_partie.combats_gagnes >= 2,
  },

  "B04": {
    id: "B04",
    nom: "Passé sans bruit",
    description: "Tu as traversé la région sans tuer un seul être pensant.",
    test: (E) =>
      E.stats_partie.combats_evites >= 2 &&
      E.stats_partie.orcs_vaincus === 0 &&
      E.stats_partie.humains_vaincus === 0,
  },

  "B05": {
    id: "B05",
    nom: "L'eau partagée",
    description: "Tu as donné de ton eau à quelqu'un qui en manquait plus que toi.",
    test: (E) => E.stats_partie.eau_partagee >= 1,
  },

  "B06": {
    id: "B06",
    nom: "Épaule contre épaule",
    description: "Tu es parti avec ton compagnon vivant et debout.",
    test: (E) =>
      E.compagnons.some((c) => c.statut === "actif") &&
      E.stats_partie.compagnons_perdus === 0,
  },

  "B07": {
    id: "B07",
    nom: "Sans traîner",
    description: "Tu as quitté la région avant la fin de la semaine.",
    test: (E) => E.temps.jour <= 6 && E.stats_partie.points_visites >= 2,
  },

  "B08": {
    id: "B08",
    nom: "Rien de cassé",
    description: "Tu as tenu jusqu'au bout sans jamais être gravement touché.",
    test: (E) =>
      !(E.heros.etats ?? []).includes("blesse_grave") &&
      E.stats_partie.degats_subis <= 25 &&
      E.stats_partie.points_visites >= 3,
  },

  "B09": {
    id: "B09",
    nom: "Remis en état",
    description: "Tu as réparé ton matériel plutôt que de le laisser derrière toi.",
    test: (E) => E.stats_partie.objets_repares >= 2,
  },

  "B10": {
    id: "B10",
    nom: "Nuits sans toit",
    description: "Tu as dormi dehors plusieurs fois sans y laisser tes forces.",
    test: (E) => E.stats_partie.nuits_a_decouvert >= 3 && E.heros.sante > 0,
  },
};
