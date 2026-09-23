// MVP 1 — L'ouverture, cinq beats (SPEC_CONTENU §4).
// Le texte a été validé beat par beat : il est porté dans le schéma, pas
// réécrit. Les coupes imposées par les plafonds de longueur sont signalées
// dans docs/lots/MVP1.md.
//
// L'état traverse les storylets par des compteurs et des drapeaux :
//   vdg_matinee   3 entière · 2 presque entière · 1 entamée
//   vdg_voix      nombre de voix entendues à la traversée
//   f_vdg_jonas_situe    on sait où est Jonas
//   f_vdg_dette_mathias  on lui a demandé des pointes la veille au soir
// Les flèches sont un vrai objet : OBJ-02.

export const storylets = {
  // ---------------------------------------------------------------- BEAT 1
  "ST-VDG-01": {
    id: "ST-VDG-01",
    titre_travail: "Ouverture — le seuil",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Le jour se lève sur Val-de-Garde.\n\nDe la porte, on voit la tour de guet plantée en haut du versant. Sa cloche est immobile. Elle n'a pas sonné depuis huit ans — depuis que la Couronne a signé la paix avec les Terres Noires.\n\nTu avais dix-sept ans et une lance. Maintenant tu as un arc, et les bois sont à toi.\n\nNeuf flèches dans le carquois. Il en faut douze pour une bonne journée.",
      base:
        "Neuf flèches dans le carquois. Il en faut douze pour une bonne journée.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Tailler des pointes toi-même, sur le seuil",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu t'installes sur le seuil. Trois pointes, trois hampes, trois empennages. Le soleil est déjà haut quand tu ranges le couteau.",
            effets: [
              { objet: "OBJ-02", quantite: 3 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -2 } },
              { fatigue: 4 },
              { xp: 10 },
              { journal: "vdg_pointes", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "En demander à Mathias en passant",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Il en a toujours d'avance. Tu passeras les prendre à la forge.",
            effets: [
              { objet: "OBJ-02", quantite: 3 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -1 } },
              { flag: "f_vdg_dette_mathias" },
              { xp: 10 },
              { journal: "vdg_demande", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il en a deux seulement. Le reste est commandé.",
            effets: [
              { objet: "OBJ-02", quantite: 2 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -1 } },
              { flag: "f_vdg_dette_mathias" },
              { xp: 10 },
              { journal: "vdg_demande", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Partir avec ce que tu as",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Neuf, c'est neuf. Tu as chassé avec moins.",
            effets: [
              { xp: 10 },
              { journal: "vdg_parti_court", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 2
  "ST-VDG-02": {
    id: "ST-VDG-02",
    titre_travail: "Ouverture — la forge",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La forge est ouverte des deux côtés, comme toujours. Mathias frappe une lame qui n'a rien d'une lame : un soc de charrue, qu'un paysan des Bois lui a apporté tordu.\n\nIl a vingt ans et les avant-bras d'un homme qui en a trente.",
      base:
        "Mathias frappe le soc tordu. Il a vingt ans et les avant-bras d'un homme qui en a trente.",
      variantes: [
        {
          si: [["flag", "f_vdg_dette_mathias"]],
          ajout:
            "« Je t'avais dit avant-hier. Tu me le dis toujours le matin même. »",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Lui demander où est Jonas",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Mathias ne lève pas les yeux du soc. « Au toit des Ancel. Il a dit qu'il finissait avant midi. » Un temps. « Il ne finira pas avant midi. »",
            effets: [
              { flag: "f_vdg_jonas_situe" },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Lui demander des nouvelles du village",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« La garnison a eu deux hommes en moins ce mois-ci. Personne n'est venu les remplacer. » Il repose le marteau. « Ça fait trois mois. »",
            effets: [
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Lui proposer de venir",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« Avec quoi ? Ma masse ? » Il rit. « Ramène quelque chose, je le ferai cuire. »",
            effets: [
              { confiance: { pnj: "PNJ-F1", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Le laisser travailler et sortir",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu prends tes pointes, tu ne dis rien. Il hoche la tête sans s'arrêter. C'est comme ça entre vous, et ça suffit.",
            effets: [{ declenche: "ST-VDG-03" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 3
  // La traversée. Le nombre de voix qu'on peut entendre dépend de ce qui
  // reste de matinée : trois si elle est entière, deux si elle est entamée
  // par la forge, une si on a taillé ses pointes.
  "ST-VDG-03": {
    id: "ST-VDG-03",
    titre_travail: "Ouverture — la traversée",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { arme: false, restantes: 0 },
    texte: {
      arrivee:
        "Il faut passer par la place pour sortir du village. Trois chemins y mènent, et on n'a pas le temps de les prendre tous.",
      base:
        "La place, la route du sud, l'autel. On n'a pas le temps de tout prendre.",
      variantes: [
        {
          si: [["local<=", "restantes", 0]],
          ajout: "Le soleil monte. Les bois n'attendront pas.",
        },
      ],
    },
    regles_locales: [
      {
        si: [["!local", "arme"], ["stat_partie>=", "vdg_matinee", 3]],
        alors: [{ local: "restantes", "=": 3 }, { local: "arme", "=": true }],
      },
      {
        si: [["!local", "arme"], ["stat_partie>=", "vdg_matinee", 2]],
        alors: [{ local: "restantes", "=": 2 }, { local: "arme", "=": true }],
      },
      {
        si: [["!local", "arme"]],
        alors: [{ local: "restantes", "=": 1 }, { local: "arme", "=": true }],
      },
    ],
    options: [
      {
        id: "A",
        libelle: "Par la place, devant le puits",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Un soldat de la Couronne, adossé au puits, à personne en particulier : « La relève devait être là au printemps. On est en été. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Par la route du sud, où l'on décharge",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Un marchand décharge, et il compte deux fois. « Le sel a pris un tiers depuis les foins. Personne ne sait pourquoi. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Par l'autel, le long de l'abri effondré",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Une vieille femme balaie devant l'abri effondré. « Les frères ne sont pas passés ce mois-ci. Ni le mois d'avant. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Monter aux bois",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Jonas descend d'une échelle, une botte de chaume sous le bras. Il te voit, lève le menton.\n\n« Tu montes ? »\n\n« Je monte. »\n\nIl est déjà reparti vers le toit.",
            effets: [
              { xp: 10 },
              { declenche: "ST-VDG-04" },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 4
  // La chasse. Premier vrai storylet : il enseigne l'observation, la
  // distance et le coût d'une flèche sans jamais les nommer.
  "ST-VDG-04": {
    id: "ST-VDG-04",
    titre_travail: "Ouverture — la chasse",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { distance: 0, alerte: false, sang: false, lu: false },
    texte: {
      arrivee:
        "Les bois commencent à deux cents pas des dernières maisons. Le sol monte, puis s'aplatit.\n\nUn chevreuil est là, en contrebas, le long du ruisseau. Il n'a pas bougé la tête. Le vent vient vers toi — il ne t'a ni vu ni senti.",
      base:
        "Le chevreuil est toujours le long du ruisseau. Le vent tient.",
      variantes: [
        {
          si: [["local>=", "distance", 1]],
          ajout: "Tu es à vingt pas plus bas. D'ici, une flèche porte droit.",
        },
        {
          si: [["local", "sang"]],
          remplace:
            "La trace monte vers les fourrés. Facile à suivre. Trop facile.\n\nÀ dix pas du sang, dans la terre molle, il y a d'autres empreintes. Larges. Elles suivent la même piste que toi.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Le regarder un moment",
        cout: { segments: 1 },
        apparait_si: [["!local", "sang"], ["!local", "lu"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Il est jeune, l'arrière-train maigre. Il boite légèrement de l'antérieur gauche. Il ne courra pas vite.",
            effets: [
              { local: "lu", "=": true },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Descendre en s'abritant derrière la berge",
        cout: { segments: 1, fatigue: 6 },
        apparait_si: [["!local", "sang"], ["local<=", "distance", 0]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [
          { si: [["stat>=", "adresse", 3]], valeur: 15 },
          { si: [["local", "lu"]], valeur: 10 },
        ],
        issues: [
          {
            probabilite: 65,
            reussite: true,
            si: [],
            texte: "Tu descends de vingt pas. Il n'a rien entendu.",
            effets: [{ local: "distance", "=": 1 }],
          },
          {
            probabilite: 35,
            partielle: true,
            si: [],
            texte:
              "Une pierre part. Il relève la tête, immobile. Tu ne respires plus.",
            effets: [
              { local: "distance", "=": 1 },
              { local: "alerte", "=": true },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Tirer",
        cout: { objet: { "OBJ-02": 1 } },
        apparait_si: [["!local", "sang"]],
        requiert: [["equipe_famille", "arc"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [
          { si: [["local>=", "distance", 1]], valeur: 25 },
          { si: [["stat>=", "adresse", 3]], valeur: 10 },
          { si: [["local", "alerte"]], valeur: -15 },
        ],
        issues: [
          {
            probabilite: 45,
            reussite: true,
            si: [],
            sortie: true,
            texte:
              "La flèche descend en courbe et le prend au flanc. Il fait trois bonds et tombe.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 25 },
              { declenche: "ST-VDG-05" },
            ],
          },
          {
            probabilite: 35,
            partielle: true,
            si: [],
            texte:
              "Tu touches trop bas. Il part en boitant, laissant une trace de sang dans les fougères.",
            effets: [
              { local: "sang", "=": true },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            probabilite: 20,
            si: [],
            sortie: true,
            texte:
              "La flèche se plante dans la berge. Il est parti avant que tu aies rangé ta main.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 5 },
              { declenche: "ST-VDG-05" },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Examiner les empreintes",
        cout: { segments: 1 },
        apparait_si: [["local", "sang"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Quatre doigts, des griffes qui mordent profond. Plus lourd qu'un chien, plus large qu'un loup. Tu n'as jamais vu ça de près, et tu ne tiens pas à commencer aujourd'hui.",
            effets: [
              { flag: "f_vdg_empreintes_lues" },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Continuer la piste dans les fourrés",
        cout: { segments: 1, fatigue: 8 },
        apparait_si: [["local", "sang"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["flag", "f_vdg_empreintes_lues"]], valeur: 20 }],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            sortie: true,
            texte: "Tu trouves le chevreuil avant l'autre chose.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { xp: 25 },
              { declenche: "ST-VDG-05" },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            sortie: true,
            texte:
              "Tu le trouves déjà entamé. Tu prends ce qui reste et tu ne t'attardes pas.",
            effets: [
              { objet: "OBJ-15", quantite: 1 },
              { xp: 15 },
              { declenche: "ST-VDG-05" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Redescendre vers le village",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu redescends vers le village les mains vides, et tu ne le regrettes qu'à moitié.",
            effets: [{ declenche: "ST-VDG-05" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 5
  // La cloche. Aucun choix : c'est une transition, pas un beat de décision.
  // La cloche a été posée à la deuxième phrase du beat 1 comme un détail de
  // décor. Elle sonne ici sans qu'un mot d'explication soit nécessaire.
  "ST-VDG-05": {
    id: "ST-VDG-05",
    titre_travail: "Ouverture — la cloche",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Tu es à mi-pente quand le son arrive.\n\nUn coup. Puis un autre. Puis sans s'arrêter.\n\nTu connais cette cloche. Tu ne l'as jamais entendue.",
      base:
        "La cloche sonne sans s'arrêter.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "Z",
        libelle: "Descendre en courant",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu laisses le sentier et tu coupes droit dans la pente. Le carquois bat contre ton dos.",
            effets: [
              { acte: 2 },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  vdg_pointes: "Il a pris la matinée pour tailler trois pointes de plus.",
  vdg_demande: "Il a compté sur son frère pour les trois pointes qui manquaient.",
  vdg_parti_court: "Il est parti chasser avec neuf flèches, en sachant qu'il en manquait trois.",
};
