// MVP 1 — La razzia (SPEC_CONTENU §5) et l'après (§5.9).
// Texte validé, porté tel quel.
//
// Motif à moyeu : ST-VDG-10 redécrit la situation à chaque retour et propose
// ce qui reste atteignable. Chaque chaîne est un storylet unique qui rend la
// main au moyeu. L'horloge est le compteur razzia_temps : chaque beat de
// chaîne coûte 1, le retour au moyeu est gratuit.
//
//   0-3  la ligne tient
//   4    la ligne cède
//   5-6  ils fouillent, ils avancent vers le bas du village
//   7    ils se retirent — fin de scène, quoi qu'ait fait le joueur
//
// Personne ne meurt pendant la razzia (SPEC_DESIGN §4.5). Aucun texte ne
// laisse croire au joueur qu'il a sauvé le village : les orcs se retirent
// d'eux-mêmes.

export const storylets = {
  // ----------------------------------------------------------------- MOYEU
  "ST-VDG-10": {
    id: "ST-VDG-10",
    titre_travail: "Razzia — le moyeu",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: false,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Ils ne sont pas venus pour prendre le village. Ils le traversent.\n\nLa rangée de maisons basses n'existe plus. Du côté du puits, une dizaine d'entre eux poussent vers la place. Une vingtaine d'hommes sont déjà tombés — il en reste une poignée qui tient la ligne, et qui tient pour rien d'autre que gagner du temps.\n\nLa forge est fermée. Quelqu'un a barré la porte de l'intérieur.\n\nÇa ne tiendra pas longtemps.",
      base:
        "La ligne tient encore. Tu as peut-être le temps de deux choses. Peut-être.",
      variantes: [
        {
          si: [["stat_partie>=", "razzia_temps", 4]],
          remplace:
            "La ligne a cédé. Ils sont sur la place maintenant, et ils ne se pressent pas. L'un d'eux retourne une charrette d'un coup d'épaule, pour voir ce qu'il y a dessous.\n\nCe que tu n'as pas fait, tu ne le feras plus.",
        },
        {
          si: [["stat_partie>=", "razzia_temps", 7]],
          remplace:
            "Ils s'en vont comme ils sont venus, sans se presser, sans se retourner. Personne ne les poursuit.\n\nIl n'y a plus personne pour les poursuivre.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Rejoindre la ligne, du côté du puits",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_a"],
          ["non", [["stat_partie>=", "razzia_temps", 4]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu remontes la rue vers le bruit.",
            effets: [{ declenche: "ST-VDG-11" }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Atteindre la forge",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_b"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "La porte barrée est à trois rues d'ici.",
            effets: [{ declenche: "ST-VDG-12" }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Monter au toit des Ancel",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_c"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu coupes par les jardins, vers le haut du village.",
            effets: [{ declenche: "ST-VDG-13" }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Descendre à la réserve du bas",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_d"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Le cellier commun est à l'écart de la poussée.",
            effets: [{ declenche: "ST-VDG-14" }],
          },
        ],
      },
      {
        id: "E",
        libelle: "Prendre la route maintenant",
        cout: {},
        apparait_si: [["non", [["stat_partie>=", "razzia_temps", 7]]]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [["non", [["stat_partie>=", "razzia_temps", 3]]]],
            texte:
              "Tu prends la route du nord pendant qu'ils sont encore sur la place. Tu es le premier sur le chemin. Les patrouilles de la Couronne sont encore à leur poste — pour quelques heures.",
            effets: [
              { flag: "f_vdg_route_tete" },
              { journal: "vdg_parti_tot", majeure: true },
              { declenche: "ST-VDG-20" },
            ],
          },
          {
            si: [],
            texte:
              "Tu pars au milieu des autres. Il y a déjà du monde sur le chemin.",
            effets: [
              { flag: "f_vdg_route_flot" },
              { journal: "vdg_parti_tard", majeure: true },
              { declenche: "ST-VDG-20" },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Les regarder s'en aller",
        cout: {},
        apparait_si: [["stat_partie>=", "razzia_temps", 7]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu restes où tu es jusqu'à ce que le dernier ait passé la haie du bas. Personne ne bouge avant longtemps.",
            effets: [
              { flag: "f_vdg_route_flot" },
              { declenche: "ST-VDG-20" },
            ],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------- CHAÎNE A — la ligne
  // La bascule tactique n'existe pas encore : la chaîne reste narrative.
  "ST-VDG-11": {
    id: "ST-VDG-11",
    titre_travail: "Razzia — rejoindre la ligne",
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
        "Ils sont sept, épaule contre épaule, en travers de la rue. Devant eux, les orcs ne chargent pas : ils cognent, ils reculent d'un pas, ils recommencent. Méthodiques.",
      base:
        "Sept hommes en travers de la rue. En face, ils cognent et reculent d'un pas, méthodiques.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Tirer depuis le toit du puits",
        cout: { objet: { "OBJ-02": 3 } },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "adresse", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Trois flèches, trois corps. La ligne reprend un pas. Un des hommes lève la tête vers toi et ne dit rien.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 3 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { stat_partie: { compteur: "survivants", valeur: 2 } },
              { xp: 30 },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Deux touchent. La troisième se perd. Ils t'ont vu.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 2 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { flag: "f_vdg_repere" },
              { xp: 25 },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Prendre place dans la ligne",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 50,
            reussite: true,
            si: [],
            texte:
              "Tu te glisses entre deux hommes que tu connais depuis l'enfance. Personne ne te demande ce que tu fais là. Vous tenez quatre échanges. Au cinquième, la ligne s'ouvre, et des mains te tirent en arrière.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 2 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { flag: "f_vdg_ligne_tenue" },
              { sante_heros: -6 },
              { xp: 35 },
              { journal: "vdg_ligne", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 50,
            partielle: true,
            si: [],
            texte:
              "Tu prends ta place. Ça tient le temps de trois coups. Le quatrième te jette contre un mur, et quand tu te relèves la rue est vide derrière toi.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 1 } },
              { flag: "f_vdg_ligne_tenue" },
              { etat: "blesse_leger" },
              { sante_heros: -10 },
              { xp: 25 },
              { journal: "vdg_ligne", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Leur crier de reculer vers la forge",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            texte:
              "Trois d'entre eux entendent. Les autres ne bougent pas. Les trois passent la porte de la forge avant que ça cède.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 3 } },
              { xp: 25 },
              { journal: "vdg_crie", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            texte:
              "Un seul se retourne. Il meurt en se retournant. Les autres n'ont rien entendu du tout.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 15 },
              { journal: "vdg_crie", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Renoncer et redescendre",
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
              "Tu regardes la rue une seconde de trop, puis tu tournes les talons.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------- CHAÎNE B — la forge
  "ST-VDG-12": {
    id: "ST-VDG-12",
    titre_travail: "Razzia — atteindre la forge",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { etape: 0 },
    texte: {
      arrivee:
        "Entre toi et la forge, il y a la rue, ou les jardins, ou les toits bas des remises.",
      base:
        "Entre toi et la forge, il y a la rue, ou les jardins, ou les toits bas des remises.",
      variantes: [
        {
          si: [["local>=", "etape", 1]],
          remplace:
            "Un orc est à l'angle de la maison Ancel, dos tourné. Il n'a rien vu. La forge est à vingt pas derrière lui.",
        },
        {
          si: [["local>=", "etape", 2]],
          remplace:
            "Tu frappes trois coups. Quelque chose racle de l'autre côté, puis la voix de Mathias, très bas, tout près du bois :\n\n« Ils sont vingt là-dedans. Femmes, gosses. Ils n'ont pas fait un bruit depuis que j'ai barré. Les orcs passent devant sans regarder. »\n\nUn silence.\n\n« Ne l'ouvre pas. »",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Par la rue, vite",
        cout: {},
        apparait_si: [["local<=", "etape", 0]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            texte: "Tu cours. Personne ne te voit.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            texte: "On te voit. On ne te suit pas encore.",
            effets: [
              { local: "etape", "=": 1 },
              { flag: "f_vdg_repere" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Par les jardins, derrière les haies",
        cout: {},
        apparait_si: [["local<=", "etape", 0]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Les haies te cachent jusqu'au mur de la forge.",
            effets: [
              { local: "etape", "=": 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Par les toits bas des remises",
        cout: { fatigue: 6 },
        apparait_si: [["local<=", "etape", 0]],
        requiert: [["!etat", "blesse_jambe"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "adresse", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Tu passes au-dessus de tout. Tu vois le village entier depuis là-haut, et tu voudrais ne pas l'avoir vu.",
            effets: [
              { local: "etape", "=": 2 },
              { flag: "f_vdg_vue_haute" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte: "Une tuile cède. Tu tombes mal.",
            effets: [
              { local: "etape", "=": 1 },
              { etat: "blesse_leger" },
              { sante_heros: -6 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Le frapper maintenant",
        cout: { usure_arme: 5 },
        apparait_si: [["local=", "etape", 1]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Il tombe sans un bruit. Tu ne savais pas que tu pouvais encore faire ça.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 25 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il tombe, mais pas assez vite. Un autre a tourné la tête.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { flag: "f_vdg_repere" },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Attendre qu'il passe",
        cout: {},
        apparait_si: [["local=", "etape", 1]],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte: "Il s'éloigne vers la place. Tu traverses.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il ne passe pas. Il appelle. Un second arrive. Tu attends encore, plaqué au mur, et tu les laisses s'écarter tous les deux.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Prendre ce qui est dehors, sous l'appentis",
        cout: {},
        apparait_si: [["local>=", "etape", 2]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "L'appentis n'est pas barré. Pointes, lame de rechange, corde. Tu remplis ce que tu peux.",
            effets: [
              { objet: "OBJ-02", quantite: 4 },
              { objet: "OBJ-07", tire: true },
              { objet: "OBJ-14", quantite: 1 },
              { objet: "OBJ-13", quantite: 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_b" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "G",
        libelle: "Rester une minute, à travers la porte",
        cout: {},
        apparait_si: [["local>=", "etape", 2]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Vous parlez à travers la porte, sans vous voir. Il te dit où il ira quand ce sera fini. Tu lui dis où tu seras.",
            effets: [
              { flag: "f_vdg_rdv_mathias" },
              { confiance: { pnj: "PNJ-F1", valeur: 2 } },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 25 },
              { journal: "vdg_porte", majeure: true },
              { flag: "f_vdg_chaine_b" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Repartir tout de suite",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [["local>=", "etape", 2]],
            texte:
              "Tu ne réponds rien. Il n'attend pas de réponse.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
          {
            reussite: true,
            si: [],
            texte:
              "Tu recules d'une rue. La forge attendra, ou elle n'attendra pas.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------- CHAÎNE C — le toit
  "ST-VDG-13": {
    id: "ST-VDG-13",
    titre_travail: "Razzia — le toit des Ancel",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { trouve: false },
    texte: {
      arrivee:
        "L'échelle est encore contre le mur. Le chaume est à moitié posé, la botte défaite, les liens en travers.\n\nIl n'y a personne sur le toit. Il n'y a personne en bas.",
      base:
        "L'échelle contre le mur, le chaume à moitié posé. Personne en haut, personne en bas.",
      variantes: [
        {
          si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
          remplace:
            "Tu ne sais pas où il est. Il pouvait être n'importe où.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Chercher chez lui",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "La porte est ouverte, la maison vide, le lit fait. Il n'y est pas venu de la matinée.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Demander à quelqu'un qui court",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Une femme qui court te crie qu'elle l'a vu sur un toit, du côté des Ancel.",
            effets: [
              { local: "trouve", "=": true },
              { flag: "f_vdg_jonas_situe" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte: "Personne ne s'arrête.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Monter voir depuis le toit",
        cout: { fatigue: 5 },
        apparait_si: [
          ["ou", [["flag", "f_vdg_jonas_situe"]], [["local", "trouve"]]],
        ],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "perception", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "De là-haut, tu vois toute la rue. Et tu vois trois orcs, en bas, qui ne cassent rien et ne fouillent rien. Ils avancent vite, tous les trois dans la même direction, vers le sud. Ils suivent quelque chose.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { flag: "f_indice_poursuite" },
              { connaissance_sortilege: "+1" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 35 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Tu montes, tu regardes, tu ne comprends pas ce que tu vois. Trois d'entre eux partent vers le sud sans rien détruire.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 20 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Lire le sol au pied de l'échelle",
        cout: {},
        apparait_si: [
          ["ou", [["flag", "f_vdg_jonas_situe"]], [["local", "trouve"]]],
        ],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Des traces de pas, les siennes, qui partent en courant. Et d'autres par-dessus, plus larges. Beaucoup plus larges. Elles ne vont pas vers la place : elles vont au sud, hors du village.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Crier son nom",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Rien. Rien du tout.",
            effets: [
              { flag: "f_vdg_repere" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Redescendre vers le reste du village",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu laisses l'échelle où elle est.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------- CHAÎNE D — la réserve
  "ST-VDG-14": {
    id: "ST-VDG-14",
    titre_travail: "Razzia — la réserve du bas",
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
        "Le cellier commun est au bas du village, à l'écart de la poussée. Personne n'y est allé. Personne n'y pense.",
      base:
        "Le cellier commun, au bas du village. Personne n'y pense.",
      variantes: [
        {
          si: [["surcharge"]],
          ajout: "Le sac tire déjà sur les épaules. Il faudra choisir.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Charger ce que tu peux porter",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Grain, lard, deux outres. Le sac pèse trop et tu le prends quand même.",
            effets: [
              { objet: "OBJ-15", quantite: 4 },
              { objet: "OBJ-05", quantite: 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Tu prends trop. Tu devras jeter la moitié sur la route.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { objet: "OBJ-05", quantite: 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 15 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Charger, et prévenir les familles cachées",
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
              "Tu cries à deux familles cachées derrière le cellier de prendre ce qu'elles peuvent et de filer par le bas. Elles t'écoutent.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 4 } },
              { xp: 30 },
              { journal: "vdg_prevenu", majeure: true },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Chercher un chariot derrière le cellier",
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
              "Il y en a un, la ridelle cassée, mais il roule. Il ne passera pas partout.",
            effets: [
              { objet: "OBJ-15", quantite: 6 },
              { objet: "OBJ-05", quantite: 2 },
              { objet: "OBJ-13", quantite: 2 },
              { flag: "f_vdg_chariot" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Remonter sans rien prendre",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu refermes la porte du cellier derrière toi.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------- L'APRÈS
  // Scène courte, sans choix, qui clôt la tranche. Le message de permadeath
  // s'affiche après, sur l'écran de transition — jamais pendant la scène.
  "ST-VDG-20": {
    id: "ST-VDG-20",
    titre_travail: "Razzia — après",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La porte de la forge s'ouvre en fin d'après-midi. Ils sortent un par un, vingt, peut-être plus. Personne n'a rien.\n\nLes hommes de la ligne sont tous morts. On les compte avant la nuit.\n\nL'échelle est toujours contre le mur des Ancel, le chaume à moitié posé. Jonas n'est ni parmi les morts, ni parmi les vivants.",
      base:
        "Ils sortent de la forge. Les hommes de la ligne sont tous morts. Jonas n'est nulle part.",
      variantes: [
        {
          si: [["flag", "f_vdg_piste_jonas"]],
          ajout:
            "Tu sais dans quelle direction ils sont partis. C'est tout ce que tu sais.",
        },
        {
          si: [["flag", "f_vdg_rdv_mathias"]],
          ajout:
            "Mathias est déjà là où il avait dit qu'il serait.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "Z",
        libelle: "Écouter ce que dit Mathias",
        cout: { segments: 1 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« Personne ne viendra le dire à leur place. » Il pose la masse contre le mur et la reprend aussitôt, parce qu'il ne sait pas quoi faire de ses mains. « Je ne suis pas soldat. Je viens quand même. »",
            effets: [
              { compagnon: "PNJ-F1" },
              { pnj_statut: { id: "PNJ-F2", valeur: "disparu" } },
              { flag: "f_vdg_frappe" },
              { acte: 2 },
              { xp: 40 },
              { journal: "vdg_mission", majeure: true },
              { fin: "FIN-T1" },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  vdg_ligne: "Il a pris place dans la ligne, entre deux hommes qu'il connaissait depuis l'enfance.",
  vdg_crie: "Il a crié aux derniers de reculer vers la forge.",
  vdg_porte: "Il est resté une minute à parler à son frère à travers la porte barrée.",
  vdg_prevenu: "Il a prévenu deux familles cachées derrière le cellier avant de charger.",
  vdg_parti_tot: "Il a pris la route pendant qu'ils étaient encore sur la place.",
  vdg_parti_tard: "Il est parti au milieu des autres, quand le chemin était déjà plein.",
  vdg_mission: "Personne ne restait pour prévenir la Couronne. Il est parti le faire.",
};

export const fins = {
  "FIN-T1": {
    id: "FIN-T1",
    nom: "Fin de la tranche",
    description:
      "Val-de-Garde a été traversé, pas pris. La route du nord commence ici, et il faut prévenir la Couronne avant que quelqu'un d'autre ne s'en charge. Ce qui est arrivé à Jonas attendra la suite.",
  },
};
