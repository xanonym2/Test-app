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
    description: "Une mauvaise chute sur le dévers : tu commences blessé, avec moins de santé et des gestes moins sûrs. En échange tu portes une lame longue, qui vaut bien mieux que ton couteau.",
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
};
