// Évènements de fond, nuit à découvert, et convergence finale.

export const storylets = {
  "ST-EVT-01": {
    id: "ST-EVT-01",
    titre_travail: "Fond — la fumée qui reste basse",
    lieu: { type: "partout" },
    conditions: { requis: [["jour>=", 3]], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Les corbeaux descendent tous vers le même repli, au nord, et ils ne remontent pas. La fumée reste basse sur la ligne des arbres ; elle ne monte pas droit, le vent la couche de ce côté-ci. Dans le ruisseau, l'eau charrie des flocons noirs. Ça vient de loin et ça descend depuis un moment.",
      base:
        "Les corbeaux au nord, la fumée couchée sur les arbres, la suie qui descend dans le ruisseau.",
      variantes: [
        {
          si: [["meteo", "brume"]],
          ajout:
            "La brume tient au ras du sol. Du talus, on ne verra pas plus loin qu'ici.",
        },
        {
          si: [["compagnons>=", 1]],
          ajout:
            "L'autre s'est arrêté aussi et compte les oiseaux. Personne ne dit rien.",
        },
      ],
    },
    options: [
      {
        id: "TALUS",
        libelle: "Monter sur le talus pour voir d'où vient la fumée",
        observation: true,
        sortie: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["meteo", "brume"]],
            texte:
              "Il monte quand même. En haut, la brume rend tout gris à trente pas. Il redescend pour rien.",
            effets: [{ fatigue: 5 }],
          },
          {
            si: [["competence", "C09"]],
            texte:
              "Trois fumées, pas une. Elles ne suivent pas la route mais les fermes, l'une après l'autre, vers le nord. La plus proche ne fume presque plus : elle a brûlé la première. Ce qui les a faites est monté la vallée, il n'est pas descendu.",
            effets: [
              { journal: "evt_fumee", majeure: true },
              { xp: 20 },
            ],
          },
          {
            si: [],
            texte:
              "Trois fumées, pas une. Elles ne sont pas alignées sur la route mais sur les fermes, l'une après l'autre, vers le nord. La plus proche ne fume presque plus.",
            effets: [
              { journal: "evt_fumee", majeure: true },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "CORBEAUX",
        libelle: "Suivre les corbeaux jusqu'au repli",
        sortie: true,
        cout: { segments: 1, fatigue: 8 },
        issues: [
          {
            si: [["stat>=", "perception", 4]],
            texte:
              "Un cerf mort dans le creux, tombé depuis la veille. Les oiseaux n'ont eu que le ventre. Le cuissot du dessous est propre et encore froid de la terre. Il en prend ce qu'il peut porter.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il arrive trop tard. Ce qu'il y avait à prendre est parti, et il reste la peau et l'odeur. Le repli sent le brûlé, lui aussi.",
            effets: [{ xp: 5 }],
          },
        ],
      },
      {
        id: "OUTRE",
        libelle: "Remonter le ruisseau plus haut que la suie",
        sortie: true,
        requiert: [["objet", "OBJ-04"]],
        cout: { segments: 1 },
        issues: [
          {
            si: [["objet>=", "OBJ-05", 3]],
            texte:
              "Il remonte jusqu'au-dessus des flocons noirs. L'eau est claire là-haut. Il n'a plus rien pour l'emporter.",
            effets: [],
          },
          {
            si: [],
            texte:
              "Il remonte jusqu'à ce que l'eau redevienne claire, et il remplit là. Plus bas, elle a un goût qui reste au fond de la gorge.",
            effets: [
              { objet: "OBJ-05", quantite: 1 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "PASSER",
        libelle: "Ne rien changer et continuer",
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Il repart. Derrière lui, la suie descend toujours dans le ruisseau, du même pas que l'eau.",
            effets: [
              { fatigue: 6 },
              { xp: 5 },
            ],
          },
        ],
      },
    ],
  },

  "ST-EVT-02": {
    id: "ST-EVT-02",
    titre_travail: "Nuit — le dévers et le sapin mort",
    lieu: { type: "partout" },
    conditions: { requis: [["segment>=", 5]], interdit: [] },
    unique: false,
    priorite: 3,
    poids: 10,
    duree_segments: 2,
    etat_local_initial: { feu: 0 },
    texte: {
      arrivee:
        "La roche du dévers a pris le soleil toute la journée. Elle en rend encore un peu au creux, à hauteur d'épaule. Trois pas plus loin, un sapin mort : les branches basses sont sèches et cassent net. Le vent descend de la vallée et il ne tombera pas avant le jour.",
      base:
        "La roche garde un peu de chaleur au creux. Le sapin mort donne ses branches basses. Le vent descend toujours.",
      variantes: [
        {
          si: [["meteo", "gel"]],
          ajout:
            "Le givre prend déjà sur la pierre. Les doigts ne tiendront pas longtemps dehors.",
        },
        {
          si: [["meteo", "pluie"]],
          ajout:
            "La pluie entre en biais sous le dévers. Le bois mort boit tout ce qui tombe.",
        },
        {
          si: [["local", "feu"]],
          ajout:
            "Le feu tient bas entre deux pierres. Il éclaire trois pas et pas un de plus.",
        },
      ],
    },
    options: [
      {
        id: "DORMIR",
        libelle: "Dormir au creux de la roche",
        sortie: true,
        cout: { segments: 2 },
        issues: [
          {
            si: [["meteo", "gel"]],
            texte:
              "Il dort par morceaux, le dos à la pierre, en remontant les genoux. Le froid passe par le sol et le réveille trois fois. Au jour, les mains sont lentes à revenir.",
            effets: [
              { fatigue: -25 },
              { sante_heros: -5 },
              { stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            si: [["meteo", "pluie"]],
            texte:
              "Il dort en chien de fusil, l'épaule au sec et le reste non. L'eau finit par trouver le col. Il se relève raide et trempé, mais il a dormi.",
            effets: [
              { fatigue: -25 },
              { stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            si: [["local", "feu"]],
            texte:
              "La pierre devant et le feu derrière, il dort d'un bloc jusqu'à ce que les braises baissent. C'est la meilleure nuit depuis le village.",
            effets: [
              { fatigue: -45 },
              { stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il se cale au creux, la roche encore tiède dans le dos. Le vent passe au-dessus sans le prendre. Il dort jusqu'à ce que la lumière change.",
            effets: [
              { fatigue: -40 },
              { stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "FEU",
        libelle: "Casser les branches basses et faire du feu",
        apparait_si: [["!local", "feu"]],
        cout: { segments: 1 },
        issues: [
          {
            si: [["meteo", "pluie"]],
            texte:
              "Les branches cassent net mais elles ont bu. Ça fume, ça pique les yeux, ça ne prend pas. Il y laisse un bon moment et ses mains.",
            effets: [{ fatigue: 8 }],
          },
          {
            si: [],
            texte:
              "Les branches basses partent d'un coup de talon. Il monte le feu bas, entre deux pierres, pour qu'on ne le voie pas de la vallée.",
            effets: [
              { local: "feu", "=": true },
              { fatigue: -10 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "MANGER",
        libelle: "Manger la chasse du jour",
        requiert: [["objet", "OBJ-06"]],
        cout: { objet: { "OBJ-06": 1 } },
        issues: [
          {
            si: [["local", "feu"]],
            texte:
              "Il la passe sur les braises jusqu'à ce que ça grésille. Mangée chaude, elle tient au corps bien plus longtemps.",
            effets: [
              { faim: -45 },
              { xp: 5 },
            ],
          },
          {
            si: [],
            texte:
              "Il mange froid, assis sur les talons, en regardant la vallée. C'est meilleur que rien et ça ne se garde pas.",
            effets: [
              { faim: -40 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "VEILLER",
        libelle: "Veiller adossé et repartir au premier jour",
        sortie: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [],
            texte:
              "Il reste adossé, le dos à la roche, les yeux sur le bas de la pente. Il somnole par à-coups. Au premier gris, il est déjà debout.",
            effets: [
              { fatigue: -10 },
              { stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
    ],
  },

  "ST-FIN-01": {
    id: "ST-FIN-01",
    titre_travail: "Convergence — partir vers l'ouest",
    lieu: { type: "partout" },
    conditions: {
      requis: [["ou", [["jour>=", 8]], [["flag", "f_pret_a_partir"]]]],
      interdit: [],
    },
    unique: true,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La route basse part vers l'ouest, entre les haies. C'est celle des charrettes : large, et elle se voit de loin. À côté, le bois descend jusqu'au gué ; plus long, mais on n'y croise personne. Derrière, la crête, d'où l'on voit encore la vallée. Il faut partir aujourd'hui.",
      base:
        "La route basse entre les haies, le bois qui descend au gué, la crête derrière. Il faut partir aujourd'hui.",
      variantes: [
        {
          si: [["compagnons>=", 1]],
          ajout:
            "Les autres ont fait leur paquet sans qu'on le leur demande. Ils attendent de savoir par où.",
        },
        {
          si: [
            [
              "ou",
              [["sante<=", 25]],
              [["etat", "blesse_grave"]],
              [["etat", "epuise"]],
            ],
          ],
          ajout:
            "Il tient debout, mais il compte les pas d'avance maintenant. Le gué est loin.",
        },
      ],
    },
    options: [
      {
        id: "ROUTE",
        libelle: "Prendre la route basse, celle des charrettes",
        sortie: true,
        deplacement: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["savoir>=", 2], ["compagnons>=", 1]],
            texte:
              "Ils prennent la route large et ils marchent au milieu, sans se cacher. Il y a des choses qu'il veut dire à quelqu'un qui porte des couleurs, et on ne trouve ces gens-là que sur les routes.",
            effets: [
              { journal: "fin_rapport", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-RAPPORT" },
            ],
          },
          {
            si: [["compagnons>=", 1]],
            texte:
              "Ils partent par la route large, à découvert, parce qu'on va plus vite à plusieurs quand on ne se cache pas. Personne ne se retourne au premier tournant.",
            effets: [
              { journal: "fin_compagnie", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-COMPAGNIE" },
            ],
          },
          {
            si: [["savoir>=", 2]],
            texte:
              "Il prend la route large. Il a trois choses en tête qui ne s'emboîtent pas, et il les tourne dans le même ordre à chaque tournant.",
            effets: [
              { journal: "fin_savoir", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SAVOIR" },
            ],
          },
          {
            si: [],
            texte:
              "Il prend la route large et il marche jusqu'au soir. Les haies défilent. Derrière, la vallée passe sous la ligne des collines et n'en ressort plus.",
            effets: [
              { journal: "fin_seul", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SEUL" },
            ],
          },
        ],
      },
      {
        id: "BOIS",
        libelle: "Descendre par le bois jusqu'au gué",
        deplacement: true,
        cout: { segments: 2, fatigue: 10 },
        issues: [
          {
            si: [
              [
                "ou",
                [["sante<=", 25]],
                [["etat", "blesse_grave"]],
                [["etat", "epuise"]],
              ],
            ],
            texte:
              "Le bois est long et il descend mal. Il arrive au gué bien après ce qu'il avait prévu, et il s'assoit dans l'eau froide sans avoir décidé de s'asseoir.",
            effets: [
              { journal: "fin_entame", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-ENTAME" },
            ],
          },
          {
            si: [["savoir>=", 2]],
            texte:
              "Il descend par le bois, hors des routes. Ce qu'il emporte ne se raconte pas encore, et ça vaut mieux tant qu'il ne sait pas à qui.",
            effets: [
              { journal: "fin_savoir", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SAVOIR" },
            ],
          },
          {
            si: [["compagnons>=", 1]],
            texte:
              "Ils passent par le bois, en file, sans parler. Au gué, ils se déchaussent et traversent à froid. De l'autre côté, la berge remonte et le pays change.",
            effets: [
              { journal: "fin_compagnie", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-COMPAGNIE" },
            ],
          },
          {
            si: [],
            texte:
              "Il passe par le bois, seul, et il traverse au gué. L'eau lui monte aux cuisses. Sur l'autre rive, il ne connaît plus les arbres par leur nom.",
            effets: [
              { journal: "fin_seul", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SEUL" },
            ],
          },
        ],
      },
      {
        id: "CRETE",
        libelle: "Monter une dernière fois sur la crête",
        observation: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["savoir>=", 2]],
            texte:
              "De là-haut, la vallée tient dans une main. Il regarde les fermes une par une, dans l'ordre où elles ont brûlé, et il retient l'ordre. Puis il descend du bon côté.",
            effets: [
              { journal: "fin_savoir", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SAVOIR" },
            ],
          },
          {
            si: [["compagnons>=", 1]],
            texte:
              "Ils montent ensemble. On voit tout et il n'y a rien à voir : pas de fumée neuve, pas de route prise. Ils redescendent vers l'ouest sans en reparler.",
            effets: [
              { journal: "fin_compagnie", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-COMPAGNIE" },
            ],
          },
          {
            si: [],
            texte:
              "Il monte, il regarde, et il ne comprend pas plus qu'hier. La vallée est en bas, entière, et vide. Il redescend par l'autre versant.",
            effets: [
              { journal: "fin_seul", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-SEUL" },
            ],
          },
        ],
      },
      {
        id: "ENSEMBLE",
        libelle: "Attendre le jour et partir avec eux",
        apparait_si: [["compagnons>=", 1]],
        cout: { segments: 1 },
        issues: [
          {
            si: [["savoir>=", 2]],
            texte:
              "Ils attendent le jour pour partir en ordre. Il leur dit ce qu'il a vu, dans l'ordre, sans rien arranger. Ils l'écoutent jusqu'au bout, puis ils chargent.",
            effets: [
              { journal: "fin_rapport", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-RAPPORT" },
            ],
          },
          {
            si: [],
            texte:
              "Ils attendent le jour, chargent proprement et partent au pas de celui qui va le moins vite. On tient plus longtemps comme ça.",
            effets: [
              { journal: "fin_compagnie", majeure: true },
              { xp: 40 },
              { fin: "FIN-OUEST-COMPAGNIE" },
            ],
          },
        ],
      },
      {
        id: "TOUT_DE_SUITE",
        libelle: "Partir tout de suite, sans rien reprendre",
        sortie: true,
        deplacement: true,
        issues: [
          {
            si: [
              [
                "ou",
                [["sante<=", 25]],
                [["etat", "blesse_grave"]],
                [["etat", "epuise"]],
              ],
            ],
            texte:
              "Il part sans refaire son sac. Au bout d'une heure, il s'appuie aux haies. Au bout de deux, il marche parce qu'il a commencé et pas pour autre chose.",
            effets: [
              { journal: "fin_entame", majeure: true },
              { xp: 30 },
              { fin: "FIN-OUEST-ENTAME" },
            ],
          },
          {
            si: [],
            texte:
              "Il part comme il est, tout de suite, et il ne se retourne pas une seule fois. C'est le seul moyen qu'il ait trouvé de le faire.",
            effets: [
              { journal: "fin_seul", majeure: true },
              { xp: 30 },
              { fin: "FIN-OUEST-SEUL" },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  evt_fumee: "Depuis le talus, il a compté trois fumées au nord, sur les fermes et pas sur la route.",
  fin_seul: "Il est parti vers l'ouest seul, avec ce qu'il portait.",
  fin_compagnie: "Il est parti vers l'ouest, et il n'est pas parti seul.",
  fin_savoir: "Il est parti vers l'ouest en emportant ce qu'il avait compris de la vallée.",
  fin_rapport: "Il est parti vers l'ouest décidé à raconter ce qu'il avait vu à quelqu'un qui compte.",
  fin_entame: "Il est parti vers l'ouest au bout de ses forces.",
};

export const fins = {
  "FIN-OUEST-SEUL": {
    id: "FIN-OUEST-SEUL",
    nom: "La ligne des collines",
    description:
      "Il a passé la ligne des collines avant le soir. De l'autre côté, personne ne l'attendait et personne ne lui a demandé d'où il venait. Ce qu'il a vu dans la vallée, il le garde, faute de savoir quoi en faire.",
  },
  "FIN-OUEST-COMPAGNIE": {
    id: "FIN-OUEST-COMPAGNIE",
    nom: "Le pas du plus lent",
    description:
      "Ils ont marché ensemble jusqu'au premier bourg et on leur a donné un toit pour la nuit. Au matin, chacun savait où il allait, ce qui n'était pas le cas la veille. Personne n'a parlé de revenir, personne n'a dit le contraire.",
  },
  "FIN-OUEST-SAVOIR": {
    id: "FIN-OUEST-SAVOIR",
    nom: "Trois choses qui ne s'emboîtent pas",
    description:
      "Il est parti avec trois choses qui ne tiennent pas ensemble, et il les a retournées tout le long de la route. Il ne sait pas encore ce qu'elles font mises bout à bout. Il sait où regarder la prochaine fois.",
  },
  "FIN-OUEST-RAPPORT": {
    id: "FIN-OUEST-RAPPORT",
    nom: "Un nom noté sur un registre",
    description:
      "Ils ont trouvé un officier de la Couronne à deux jours de marche. L'homme a écouté jusqu'au bout, a noté un nom, et a dit qu'on verrait. Ce qu'il est advenu de ce papier, personne de Val-de-Garde ne l'a su.",
  },
  "FIN-OUEST-ENTAME": {
    id: "FIN-OUEST-ENTAME",
    nom: "Le gué et pas plus loin",
    description:
      "Il a tenu jusqu'au gué et pas beaucoup plus loin. Des charretiers l'ont chargé à l'aube et l'ont laissé au premier village avec de l'eau. Il s'est remis plus lentement qu'il n'aurait voulu, et la vallée a continué sans lui.",
  },
};
