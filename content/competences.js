// Compétences — 9 fiches, 4 groupes. Voir CONTRAT.md §9.
// Choisir une compétence ferme son groupe pour toute la partie.

export const competences = {
  "C01": {
    id: "C01",
    nom: "Main sûre à l'arc",
    groupe: "G1",
    niveau_min: 2,
    type: "passif",
    description: "Vous tirez d'aplomb même le souffle court et la main froide. Les tirs longs ou de biais restent tentables là où un autre baisserait l'arc.",
    effet_resume: "Ouvre et fiabilise les options de tir et de chasse.",
  },

  "C02": {
    id: "C02",
    nom: "Pas silencieux",
    groupe: "G1",
    niveau_min: 2,
    type: "passif",
    description: "Vous posez le pied où le sol ne parle pas et lisez le vent avant d'avancer. Approcher sans être vu, ou décrocher sans être suivi, devient une vraie option.",
    effet_resume: "Ouvre des options d'approche et de retrait discrets.",
  },

  "C03": {
    id: "C03",
    nom: "Garde ferme",
    groupe: "G2",
    niveau_min: 4,
    type: "passif",
    description: "Vous tenez votre distance de bras et frappez quand l'autre s'ouvre. Un corps à corps engagé tourne plus vite en votre faveur.",
    effet_resume: "Meilleures issues au corps à corps.",
  },

  "C04": {
    id: "C04",
    nom: "Soins de fortune",
    groupe: "G2",
    niveau_min: 4,
    type: "activable",
    description: "Vous nettoyez, recousez et serrez une plaie avec ce que vous avez sur vous. Cela se fait au calme, jamais pendant un affrontement.",
    effet_resume: "Referme une blessure légère sans consommer de baume.",
  },

  "C05": {
    id: "C05",
    nom: "Meneur d'hommes",
    groupe: "G3",
    niveau_min: 6,
    type: "passif",
    description: "Vous dites clairement quoi faire et on vous suit sans discuter. Vos compagnons vous accordent leur confiance plus vite et tiennent mieux quand ça tourne mal.",
    effet_resume: "Confiance des compagnons plus haute, appui plus efficace.",
  },

  "C06": {
    id: "C06",
    nom: "Lecture de piste",
    groupe: "G3",
    niveau_min: 6,
    type: "passif",
    description: "Vous datez une trace, lisez le sens de la marche et comptez les passages. Le terrain vous dit qui est passé et depuis combien de temps.",
    effet_resume: "Ouvre des options de pistage et de repérage du terrain.",
  },

  "C07": {
    id: "C07",
    nom: "Coup décisif",
    groupe: "G4",
    niveau_min: 8,
    type: "activable",
    description: "Vous laissez passer les premiers échanges et mettez tout dans le suivant. Un adversaire déjà entamé tombe sans pouvoir répondre.",
    effet_resume: "Achève un adversaire affaibli, une fois par affrontement.",
  },

  "C08": {
    id: "C08",
    nom: "Dos solide",
    groupe: "G4",
    niveau_min: 8,
    type: "passif",
    description: "Vous répartissez la charge et marchez sans vous plaindre. Vous emportez plus et vous arrivez moins entamé au bout de la journée.",
    effet_resume: "Charge portée plus élevée, marche moins coûteuse.",
  },

  "C09": {
    id: "C09",
    nom: "Mémoire des détails",
    groupe: "G4",
    niveau_min: 8,
    type: "passif",
    description: "Vous rapprochez ce que vous avez vu de ce qu'on vous a raconté. Ce qui ne colle pas vous saute aux yeux et vous savez quoi demander.",
    effet_resume: "Ouvre des lectures et des questions inaccessibles autrement.",
  },
};
