// Départs — 3 (CONTRAT §11). Les effets sont imposés.
// description : deux phrases, ce que le choix change concrètement.

export const departs = {
  "D01": {
    id: "D01",
    nom: "Parti chasser loin",
    description: "Tu rentres avec de la viande pour plusieurs jours, de quoi tenir sans chercher à manger tout de suite. Tu arrives aussi plus tard : deux moments de la journée sont déjà passés quand tu reviens.",
    inventaire: [
      { base: "OBJ-06", quantite: 2 },
    ],
    effets: [
      { segments: 2 },
    ],
    storylet_ouverture: "ST-OUV-01",
  },

  "D02": {
    id: "D02",
    nom: "Rentré blessé",
    description: "Une mauvaise chute sur le talus : tu commences blessé, avec moins de santé et des gestes moins sûrs. En échange tu portes une lame longue, qui vaut bien mieux que ton couteau.",
    inventaire: [
      { base: "OBJ-07", usure: 70 },
    ],
    effets: [
      { etat: "blesse_leger" },
      { sante_heros: -8 },
    ],
    storylet_ouverture: "ST-OUV-01",
  },

  "D03": {
    id: "D03",
    nom: "Accompagné du gamin",
    description: "Un garçon du village part avec toi : une paire d'yeux en plus, un guetteur, quelqu'un qui court vite. Il est jeune et fragile, et il peut mourir dès les premières heures si tu l'exposes.",
    inventaire: [],
    effets: [
      { compagnon: "PNJ-04" },
    ],
    storylet_ouverture: "ST-OUV-01",
  },

  // D04 — MVP 1. Inventaire de la v3, neuf flèches : il en manque trois pour
  // une bonne journée, et c'est voulu (mission étape 2).
  "D04": {
    id: "D04",
    nom: "La razzia",
    hors_tirage: true,
    description: "Le dernier matin ordinaire à Val-de-Garde, puis ce qui lui arrive. Tu pars chasser avec neuf flèches — il en faudrait douze — et tu choisis ce que tu sauves quand tu reviens.",
    inventaire: [],
    effets: [
      { stat_partie: { compteur: "vdg_matinee", valeur: 3 } },
    ],
    storylet_ouverture: "ST-VDG-01",
  },
};
