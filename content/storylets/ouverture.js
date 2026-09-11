// Ouverture — Val-de-Garde.
// ST-OUV-01 : la vie ordinaire, un seul tour, un seul choix qui compte.
// ST-OUV-02 : le retour. Un seul geste possible, puis l'ouest.

export const storylets = {
  "ST-OUV-01": {
    id: "ST-OUV-01",
    titre_travail: "Le col, avant",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee: [
        "Le col domine Val-de-Garde. Quatre routes en partent. Celle du roi, celle des marchands, celle des mages. La quatrième descend chez les orcs : personne ne la prend. La guerre s'est finie il y a huit ans. La paix tient.",
        "Le poste de garde est vide depuis longtemps. Plus bas, la forge de Mathieu fume : il travaille tard.",
        "Je rentre avec un lièvre. Le jour baisse. Mes collets sont sur le versant nord. Deux de mes flèches sont restées dans le pin mort, au-dessus du sentier.",
      ].join("\n\n"),
      base: "Le col domine Val-de-Garde. En bas, la forge fume. Le jour baisse.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Descendre droit par le sentier, le lièvre sur l'épaule",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Le sentier est sec, je descends vite. À mi-pente, le vent tourne. Ça sent le brûlé, et ce n'est pas la forge.",
            effets: [{ fatigue: -6 }, { declenche: "ST-OUV-02" }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Relever les collets du versant nord avant de rentrer",
        cout: { segments: 1, fatigue: 8 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Un collet a pris. Je le démonte, je remets le fil en place. Ça prend du temps. Quand je me relève, il fait nuit et ça sent le brûlé jusqu'ici.",
            effets: [{ objet: "OBJ-06", quantite: 1 }, { declenche: "ST-OUV-02" }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Récupérer mes deux flèches dans le pin mort",
        cout: { segments: 1 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Les hampes ont tenu, les pointes sont bonnes. Je les essuie contre ma manche. En bas, il y a plus de lumière qu'il ne devrait y en avoir à cette heure.",
            effets: [{ objet: "OBJ-02", quantite: 2 }, { declenche: "ST-OUV-02" }],
          },
        ],
      },
    ],
  },

  "ST-OUV-02": {
    id: "ST-OUV-02",
    titre_travail: "Le village",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee: [
        "Le feu a pris par le bas. La forge brûle toute seule, le toit tombé dedans.",
        "Ils avancent maison par maison. Vingt, peut-être plus. Les maisons du haut tiennent encore. Celle de Joé est ouverte.",
        "Le vent pousse la fumée vers le nord. Elle couvre le fond du village. Sur la route de l'ouest, des gens courent vers les hêtres. Deux orcs les suivent.",
        "J'ai mon arc. Ça ne suffit pas.",
      ].join("\n\n"),
      base: "Le feu a pris par le bas. Ils avancent maison par maison. Sur la route de l'ouest, des gens courent vers les hêtres.",
      variantes: [
        {
          si: [["etat", "blesse_leger"]],
          ajout: "La plaie se rouvre à chaque appui. Je n'ai pas deux courses dans les jambes.",
        },
        {
          si: [["objet<=", "OBJ-02", 2]],
          ajout: "Je compte ce qui reste au carquois du bout des doigts. C'est vite fait.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Traverser la fumée jusqu'à la forge",
        cout: { fatigue: 14 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Le marteau est par terre, devant l'enclume. La porte de derrière est ouverte. Pas de sang. Personne. Mathieu n'est pas là. La chaleur me chasse avant que je puisse crier son nom. Je ressors par le jardin. Le bois de l'ouest commence là.",
            effets: [
              { sante_heros: -6 },
              { pnj_statut: { id: "PNJ-F1", valeur: "disparu" } },
              { flag: "f_ouv_forge" },
              { debloque_point: "P01" },
              { xp: 30 },
              { journal: "ouv_forge", majeure: true },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Monter aux maisons du haut, chez Joé",
        cout: { segments: 1, fatigue: 10 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "La porte bat. Le feu n'est pas monté jusqu'ici. Le lit est défait, le coffre ouvert, son arbalète n'y est plus. Joé est parti avec. Je ne sais pas quand. En bas, ça monte vers moi. Je sors par-derrière. Les hêtres sont à cinquante pas.",
            effets: [
              { pnj_statut: { id: "PNJ-F2", valeur: "disparu" } },
              { flag: "f_ouv_maison" },
              { debloque_point: "P01" },
              { xp: 30 },
              { journal: "ouv_maison", majeure: true },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Tirer du talus sur les deux qui suivent la route",
        cout: { objet: { "OBJ-02": 3 }, fatigue: 8 },
        requiert: [["objet>=", "OBJ-02", 3]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "adresse", 4]], valeur: 15 }],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            texte: "Le deuxième trait le prend sous le bras. Il tombe assis et ne se relève pas. L'autre se jette derrière le muret. Sur la route, les gens gagnent les hêtres. Je lâche le talus et je file sous les arbres.",
            effets: [
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { flag: "f_ouv_fleches" },
              { debloque_point: "P01" },
              { xp: 30 },
              { journal: "ouv_fleches", majeure: true },
            ],
          },
          {
            probabilite: 45,
            si: [],
            texte: "Trop loin, et le vent porte de travers. Les traits passent court. Les deux se retournent vers le talus et viennent. Je pars en glissant sur la pente, un pieu de clôture m'ouvre la cuisse. Je file sous les arbres.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { etat: "blesse_leger" },
              { flag: "f_ouv_fleches" },
              { debloque_point: "P01" },
              { xp: 30 },
              { journal: "ouv_fleches", majeure: true },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Prendre la haie et gagner les hêtres tout de suite",
        cout: { fatigue: 12 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Je longe la haie, je passe la clôture, j'entre dans les hêtres. Personne ne me suit. Derrière moi, ça craque et ça tombe. Je ne me retourne pas. La pente monte vers la crête.",
            effets: [
              { flag: "f_ouv_ouest" },
              { debloque_point: "P01" },
              { xp: 30 },
              { journal: "ouv_ouest", majeure: true },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  ouv_forge:
    "La forge était vide et le marteau par terre. Mathieu n'y était pas.",
  ouv_maison:
    "Le coffre de Joé était ouvert et son arbalète n'y était plus. Il était parti avant moi.",
  ouv_fleches:
    "J'ai tiré du talus sur ceux qui suivaient la route, pour que les autres atteignent les hêtres.",
  ouv_ouest:
    "Je suis parti sans rien tenter. Val-de-Garde brûlait derrière moi.",
};
