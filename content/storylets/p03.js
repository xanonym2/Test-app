export const storylets = {
  "ST-P03-01": {
    id: "ST-P03-01",
    titre_travail: "Source — boire, remplir, souffler",
    lieu: { type: "point_interet", cible: "P03" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { bu: false, repose: false },
    texte: {
      arrivee:
        "L'eau sort de la roche au fond d'un creux, entre deux frênes. Elle tombe dans une cuvette de pierre large comme un bouclier, puis repart sous les cailloux. Elle est froide à faire mal aux dents. Au-dessus du creux, une dalle plate prend le soleil, hors du vent.",
      base:
        "Le creux n'a pas changé. L'eau sort, tombe, repart sous les cailloux. La dalle est sèche.",
      variantes: [
        {
          si: [["competence", "C01"]],
          ajout:
            "Les coulées descendent toutes au même point de la berge. Ça vient boire ici tous les soirs.",
        },
        {
          si: [["etat", "blesse_leger"]],
          ajout:
            "La descente au creux se fait de côté, une main sur la roche.",
        },
        {
          si: [["fatigue>=", 70]],
          remplace:
            "L'eau sort de la roche. Elle est froide. Il y a une dalle plate au-dessus, au soleil. Je ne cherche pas plus loin.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Boire au filet, à genoux dans la mousse",
        cout: {},
        apparait_si: [["!local", "bu"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je bois jusqu'à ne plus pouvoir. L'eau a le goût de la pierre. Je reste à genoux le temps que le froid passe des mains aux bras.",
            effets: [
              { fatigue: -8 },
              { retire_etat: "assoiffe" },
              { local: "bu", "=": true },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Remplir la gourde à la cuvette",
        cout: { segments: 1 },
        requiert: [["objet", "OBJ-04"]],
        apparait_si: [["objet<=", "OBJ-05", 2]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["objet<=", "OBJ-05", 0]],
            texte:
              "La gourde sonne creux. Je la tiens sous le filet jusqu'à ce que ça déborde sur mes doigts. Trois parts, pas une de plus : le cuir ne tient que ça. Le bouchon a gonflé, il rentre mal.",
            effets: [
              { objet: "OBJ-05", quantite: 3 },
              { xp: 10 },
            ],
          },
          {
            si: [["objet<=", "OBJ-05", 1]],
            texte:
              "J'ajoute ce qui manque. La gourde est pleine au col. Le reste de l'eau repart sous les cailloux, et je n'ai rien d'autre pour l'emporter.",
            effets: [{ objet: "OBJ-05", quantite: 2 }],
          },
          {
            si: [],
            texte:
              "Il reste une place, je la remplis. Ensuite l'eau déborde et coule sur mes doigts : la gourde ne prend pas plus, et le creux ne me suit pas.",
            effets: [{ objet: "OBJ-05", quantite: 1 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "S'asseoir sur la dalle et ne rien faire",
        cout: { segments: 2 },
        apparait_si: [["!local", "repose"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je m'allonge sur la pierre chaude, le sac sous la nuque. Le bruit de l'eau couvre le reste. Quand je rouvre les yeux, l'ombre des frênes a tourné d'une main.",
            effets: [
              { fatigue: -35 },
              { local: "repose", "=": true },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Manger ici, à l'abri du vent",
        cout: { segments: 1 },
        apparait_si: [["ou", [["objet", "OBJ-06"]], [["objet", "OBJ-15"]]]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["objet", "OBJ-06"]],
            texte:
              "La viande du jour ne passera pas deux jours de plus. Je la mange ici, avec de l'eau froide par-dessus. C'est le bon moment, c'est tout ce qu'il y a à en dire.",
            effets: [
              { objet: "OBJ-06", quantite: -1 },
              { faim: -40 },
            ],
          },
          {
            si: [],
            texte:
              "Galettes sèches et eau froide. Ça tient le ventre. Ça ne fait pas plaisir.",
            effets: [
              { objet: "OBJ-15", quantite: -1 },
              { faim: -25 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Attendre à l'affût, à plat ventre sous les frênes",
        cout: { segments: 2, objet: { "OBJ-02": 1 } },
        apparait_si: [["competence", "C01"]],
        requiert: [["equipe_famille", "arc"], ["objet", "OBJ-02"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je me couche en amont des coulées, sous le vent, et je ne bouge plus. Un chevreuil descend boire avant l'ombre. Un seul trait, de près. Il ne repart pas.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { fatigue: 6 },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "G",
        libelle: "Laver la plaie à l'eau froide et la resserrer",
        cout: { segments: 1 },
        apparait_si: [["competence", "C04"], ["etat", "blesse_leger"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "L'eau est assez froide pour endormir la peau. Je lave, je retire ce qui traîne dedans, je serre avec une lanière propre. Ça se rouvrira si je force. Pour aujourd'hui, ça tient.",
            effets: [
              { retire_etat: "blesse_leger" },
              { sante_heros: 6 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Remonter du creux et reprendre la route",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: true,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je remonte par les racines des frênes. En haut, le vent reprend tout de suite.",
            effets: [],
          },
        ],
      },
    ],
  },

  "ST-P03-02": {
    id: "ST-P03-02",
    titre_travail: "Source — l'outre fendue",
    lieu: { type: "point_interet", cible: "P03" },
    conditions: { requis: [["vu", "ST-P03-01"]], interdit: [] },
    unique: true,
    priorite: 7,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { parle: false },
    texte: {
      arrivee:
        "Il remonte le sentier avec une outre fendue sur le côté. Elle tient l'eau si on la porte droite, pas plus. Le filet de la source coule au rythme qu'il veut, et le jour baisse. Il ne demande pas la gourde : il demande ce qu'il y a dedans, une part, pour quelqu'un qui l'attend plus haut et qui ne marche plus.",
      base:
        "Il est encore là, l'outre fendue posée sur les genoux. Il attend une réponse.",
      variantes: [
        {
          si: [["objet<=", "OBJ-05", 1]],
          ajout:
            "Ma gourde sonne creux quand je bouge. Il l'entend aussi bien que moi.",
        },
        {
          si: [["fatigue>=", 70]],
          ajout:
            "Redescendre au creux, c'est trente pas de pierre. Trente de plus pour remonter.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Verser une part dans son outre fendue",
        cout: {},
        requiert: [["objet", "OBJ-05"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Il tient l'outre droite, les deux mains dessus, pendant que je verse. Il ne dit rien tant que ça coule. Puis il repart vers le haut, à petits pas, sans quitter la fente des yeux.",
            effets: [
              { objet: "OBJ-05", quantite: -1 },
              { confiance: { pnj: "PNJ-03", valeur: 2 } },
              { pnj_statut: { id: "PNJ-03", valeur: "vivant_allie" } },
              { stat_partie: { compteur: "eau_partagee", valeur: 1 } },
              { flag: "f_source_partage" },
              { journal: "source_partage", majeure: true },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Redescendre au creux et remplir pour lui",
        cout: { segments: 1, fatigue: 8 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "La descente est courte, la remontée moins. Le filet prend son temps et je le regarde prendre son temps. Quand je reviens, l'ombre a gagné tout le sentier et il a déjà l'outre droite entre les mains.",
            effets: [
              { confiance: { pnj: "PNJ-03", valeur: 3 } },
              { pnj_statut: { id: "PNJ-03", valeur: "vivant_allie" } },
              { stat_partie: { compteur: "eau_partagee", valeur: 1 } },
              { flag: "f_source_partage" },
              { journal: "source_partage", majeure: true },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Lui demander ce qu'il y a plus haut",
        cout: {},
        apparait_si: [["!local", "parle"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Il répond court. Une femme, une jambe prise sous une pierre depuis avant-hier, et deux jours de marche jusqu'à un toit. Il ne demande rien de plus que l'eau. Il attend.",
            effets: [
              { local: "parle", "=": true },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Dire non et remonter le sentier",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: true,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je dis non. Il hoche la tête, une fois. Il ne discute pas. Il s'assoit sur le talus, l'outre sur les genoux, et il regarde le creux en bas.",
            effets: [
              { confiance: { pnj: "PNJ-03", valeur: -2 } },
              { flag: "f_source_refus" },
              { journal: "source_refus", majeure: true },
              { xp: 10 },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  source_partage:
    "À la source, j'ai donné de mon eau à un homme dont l'outre était fendue.",
  source_refus:
    "À la source, un homme a demandé de l'eau et je la lui ai refusée.",
};
