// P01 — La Crête.
// Le val ne se lit pas d'un coup : chaque couche coûte du jour et rend plus loin.

export const storylets = {
  "ST-P01-01": {
    id: "ST-P01-01",
    titre_travail: "La crête, première lecture",
    lieu: { type: "point_interet", cible: "P01" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { couche: 0 },
    texte: {
      arrivee: [
        "La crête tient tout le val. D'ici, je vois jusqu'aux hêtres de l'ouest.",
        "Le vent vient du nord. Derrière le bloc de pierre, il ne passe pas.",
        "Au col, la terre est molle. Des pas dedans. De cette nuit.",
        "Le val, lui, ne se lit pas d'un coup. Il faut rester, et regarder longtemps.",
      ].join("\n\n"),
      base: "Le bloc de pierre, le col, le val en dessous. Le vent tient toujours le nord.",
      variantes: [
        {
          si: [["local>=", "couche", 1]],
          ajout: "J'ai le nord et le sud. Le milieu du val reste en bloc. Il faut y remettre du temps.",
        },
        {
          si: [["local>=", "couche", 3]],
          ajout: "La crête a donné tout ce qu'elle avait. Le reste, il faudra le marcher.",
        },
      ],
    },
    regles_locales: [
      {
        si: [["local>=", "couche", 3]],
        alors: [{ local: "val_lu", "=": true }],
      },
    ],
    options: [
      {
        id: "A",
        libelle: "Reprendre le val morceau par morceau, de gauche à droite",
        cout: { segments: 1 },
        apparait_si: [["!local", "val_lu"], ["tour<=", 3]],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["local<=", "couche", 0]],
            reussite: true,
            texte: "Les grandes choses d'abord. Au nord, un toit de ferme et une grange encore debout. Au sud, une ligne de saules qui descend le versant : il y a de l'eau dessous. Le reste se noie dans le gris.",
            effets: [
              { local: "couche", "+=": 1 },
              { debloque_point: "P02" },
              { debloque_point: "P03" },
            ],
          },
          {
            si: [["local=", "couche", 1]],
            reussite: true,
            texte: "Je reste. Les yeux s'habituent. À l'est, sur l'épaule de la colline, un mur droit. Trop droit pour du rocher : le vieux poste. Et entre les deux versants, une coupe étroite dans les arbres. Un layon. Il monte raide.",
            effets: [
              { local: "couche", "+=": 1 },
              { debloque_point: "P06" },
              { debloque_point: "P04" },
            ],
          },
          {
            si: [["local=", "couche", 2]],
            reussite: true,
            texte: "Sous les hêtres, une fumée basse et plate. Du bois mouillé, du monde. Il y a un camp là-dedans.\n\nPlus loin, bien à l'ouest du layon, deux silhouettes courtes sur la crête d'en face. Des orcs. Là où il ne devrait pas encore y en avoir. Ils déferlent, voilà tout.",
            effets: [
              { local: "couche", "+=": 1 },
              { debloque_point: "P05" },
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_1" },
              { journal: "p01_orcs_ouest", majeure: false },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Lire les pas dans la terre molle du col",
        cout: { segments: 1 },
        apparait_si: [["tour<=", 3]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Des semelles, pas des pieds nus. Trois hommes, une femme, un enfant qui traîne le pied gauche. Ils portaient lourd. Ils sont passés avant le jour et ils allaient à l'ouest. Aucun n'est revenu par là.",
            effets: [{ flag: "f_crete_traces" }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Manger un morceau derrière le bloc, à l'abri du vent",
        cout: { objet: { "OBJ-06": 1 } },
        requiert: [["objet", "OBJ-06"]],
        apparait_si: [["tour<=", 3]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Dos à la pierre, le vent passe au-dessus. La viande est froide. Elle passe quand même.",
            effets: [{ faim: -40 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Quitter le bloc et descendre de la crête",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Je descends par le versant sec. Ce que j'ai vu, je l'ai vu. Le reste, il faudra le marcher.",
            effets: [{ xp: 25 }],
          },
        ],
      },
    ],
  },

  "ST-P01-02": {
    id: "ST-P01-02",
    titre_travail: "La crête, retours",
    lieu: { type: "point_interet", cible: "P01" },
    conditions: { requis: [["vu", "ST-P01-01"]], interdit: [] },
    unique: false,
    priorite: 4,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee: "Je remonte au bloc. Le vent n'a pas tourné : toujours le nord. D'ici, le val se tient d'un seul regard, et je sais enfin par où on y entre.",
      base: "Le bloc, le col, le val. Les fumées du village sont plus basses qu'avant.",
      variantes: [
        {
          si: [["!flag", "f_indice_1"]],
          ajout: "Il reste une bande de crête, en face, que je n'ai jamais prise le temps de suivre.",
        },
        {
          si: [["fatigue>=", 60]],
          ajout: "La montée m'a coûté plus que la dernière fois.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Suivre la crête d'en face, du layon jusqu'au bout",
        cout: { segments: 1 },
        apparait_si: [["!flag", "f_indice_1"]],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Deux silhouettes courtes passent la ligne de crête, bien à l'ouest du layon. Des orcs. Ils ne devraient pas être déjà si loin de chez eux. Ils déferlent, voilà tout.",
            effets: [
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_1" },
              { journal: "p01_orcs_ouest", majeure: false },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Reprendre mes directions et souffler, dos à la pierre",
        cout: { segments: 1 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Ferme au nord, saules au sud, layon au milieu, poste à l'est. Je me répète l'ordre jusqu'à ce qu'il tienne tout seul. Les jambes redescendent.",
            effets: [{ fatigue: -12 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Manger un morceau derrière le bloc, à l'abri du vent",
        cout: { objet: { "OBJ-06": 1 } },
        requiert: [["objet", "OBJ-06"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Dos à la pierre, le vent passe au-dessus. Je mange vite, les yeux sur le val.",
            effets: [{ faim: -40 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Redescendre par le versant sec",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte: "Je laisse la crête derrière moi. Le val ne changera pas de forme d'ici ce soir.",
            effets: [{ xp: 10 }],
          },
        ],
      },
    ],
  },
};

export const journal = {
  p01_orcs_ouest:
    "Depuis la crête, j'ai vu des orcs bien plus à l'ouest qu'il n'aurait dû y en avoir.",
};
