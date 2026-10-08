// Compétences — 9 fiches, 4 groupes. Voir CONTRAT.md §9.
// Choisir une compétence ferme son groupe pour toute la partie.

export const competences = {
  "C01": {
    id: "C01",
    nom: "Main sûre à l'arc",
    groupe: "G1",
    niveau_min: 2,
    type: "passif",
    description: "Tu tires d'aplomb même le souffle court et la main froide. Les tirs longs ou de biais restent tentables là où un autre baisserait l'arc.",
    effet_resume: "Ouvre et fiabilise les options de tir et de chasse.",
  },

  "C02": {
    id: "C02",
    nom: "Pas silencieux",
    groupe: "G1",
    niveau_min: 2,
    type: "passif",
    description: "Tu poses le pied où le sol ne parle pas et tu lis le vent avant d'avancer. Approcher sans être vu, ou décrocher sans être suivi, devient une vraie option.",
    effet_resume: "Ouvre des options d'approche et de retrait discrets.",
  },

  "C03": {
    id: "C03",
    nom: "Garde ferme",
    groupe: "G2",
    niveau_min: 4,
    type: "passif",
    description: "Tu tiens ta distance de bras et tu frappes quand l'autre s'ouvre. Un corps à corps engagé tourne plus vite en ta faveur.",
    effet_resume: "Meilleures issues au corps à corps.",
  },

  "C04": {
    id: "C04",
    nom: "Soins de fortune",
    groupe: "G2",
    niveau_min: 4,
    type: "activable",
    description: "Tu nettoies, tu recouds et tu serres une plaie avec ce que tu as sur toi. Cela se fait au calme, jamais pendant un affrontement.",
    effet_resume: "Referme une blessure légère sans consommer de baume.",
  },

  "C05": {
    id: "C05",
    nom: "Meneur d'hommes",
    groupe: "G3",
    niveau_min: 6,
    type: "passif",
    description: "Tu dis clairement quoi faire et on te suit sans discuter. Tes compagnons t'accordent leur confiance plus vite et tiennent mieux quand ça tourne mal.",
    effet_resume: "Confiance des compagnons plus haute, appui plus efficace.",
  },

  "C06": {
    id: "C06",
    nom: "Lecture de piste",
    groupe: "G3",
    niveau_min: 6,
    type: "passif",
    description: "Tu dates une trace, tu lis le sens de la marche et tu comptes les passages. Le terrain te dit qui est passé et depuis combien de temps.",
    effet_resume: "Ouvre des options de pistage et de repérage du terrain.",
  },

  "C07": {
    id: "C07",
    nom: "Coup décisif",
    groupe: "G4",
    niveau_min: 8,
    type: "activable",
    description: "Tu laisses passer les premiers échanges et tu mets tout dans le suivant. Un adversaire déjà entamé tombe sans pouvoir répondre.",
    effet_resume: "Achève un adversaire affaibli, une fois par affrontement.",
  },

  "C08": {
    id: "C08",
    nom: "Dos solide",
    groupe: "G4",
    niveau_min: 8,
    type: "passif",
    description: "Tu répartis la charge et tu marches sans te plaindre. Tu emportes plus et tu arrives moins entamé au bout de la journée.",
    effet_resume: "Charge portée plus élevée, marche moins coûteuse.",
  },

  "C09": {
    id: "C09",
    nom: "Mémoire des détails",
    groupe: "G4",
    niveau_min: 8,
    type: "passif",
    description: "Tu rapproches ce que tu as vu de ce qu'on t'a raconté. Ce qui ne colle pas te saute aux yeux et tu sais quoi demander.",
    effet_resume: "Ouvre des lectures et des questions inaccessibles autrement.",
  },
};
