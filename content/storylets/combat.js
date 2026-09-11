// Combat narratif. Déclenché depuis ailleurs. L'adversaire arrive par
// la variable locale "ennemi" (CRE-01..CRE-06), valeur par défaut ci-dessous.

export const storylets = {
  "ST-CBT-01": {
    id: "ST-CBT-01",
    titre_travail: "Combat — le sol nu, le tronc, l'éboulis",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: false,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      ennemi: "CRE-05",
      lu: 0,
      touche: 0,
      garde: 0,
      couvert: 0,
    },
    regles_locales: [
      { si: [["tour>=", 4]], alors: [{ local: "presse", "=": true }] },
    ],
    texte: {
      arrivee:
        "Vingt pas de sol nu, et rien pour tricher. À gauche un tronc couché, gros, l'écorce partie. À droite l'éboulis : des cailloux plats qui glissent sous le pied, et qui s'entendent dès qu'on y met le poids. Derrière l'éboulis, un fourré d'épines assez épais pour qu'on n'y passe pas vite. L'autre est au bout du sol nu.",
      base:
        "Le tronc couché à gauche, l'éboulis à droite, les épines derrière. Vingt pas de sol nu entre eux deux.",
      variantes: [
        {
          si: [["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]]],
          ajout:
            "Un orc. Il ne court pas. Il avance du même pas et il regarde où il pose les pieds. Rien à lui crier qu'il comprenne.",
        },
        {
          si: [["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]]],
          ajout:
            "Un homme. Il tient sa lame trop haut et il souffle fort. Il a marché longtemps avant d'arriver là.",
        },
        {
          si: [["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]]],
          ajout:
            "Une bête. Le garrot bas, elle tourne pour garder le vent sur elle. On lui compte les côtes.",
        },
      ],
    },
    options: [
      {
        id: "OBS",
        libelle: "Rester derrière le tronc et le regarder venir",
        observation: true,
        apparait_si: [["!local", "lu"]],
        cout: { fatigue: 4 },
        issues: [
          {
            si: [["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]]],
            texte:
              "Le bouclier reste bas, à hauteur de hanche. Il pose toujours le pied droit en premier et la jambe ne plie pas bien. Tant qu'il avance comme ça, le côté gauche est ouvert.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]]],
            texte:
              "L'homme souffle par la bouche. La pointe tremble. Il regarde derrière lui deux fois en vingt pas. Il ne tiendra pas un échange long, et il le sait avant lui.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]]],
            texte:
              "Elle tourne pour garder le vent. Une patte avant se pose à plat, sans appui : quelque chose y a mordu avant lui. Elle viendra du côté sain.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il laisse venir et prend le temps qu'il faut. Il sait par où entrer, maintenant.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "TIR",
        libelle: "Tirer pendant qu'il reste du sol nu",
        apparait_si: [["local<=", "garde", 0]],
        requiert: [["equipe_famille", "arc"], ["objet", "OBJ-02"]],
        cout: { objet: { "OBJ-02": 1 }, fatigue: 3 },
        issues: [
          {
            si: [["local>=", "touche", 1]],
            texte:
              "La deuxième part plus bas. Elle porte. Le pas se casse. L'autre continue, mais il faut maintenant qu'il y mette de la volonté.",
            effets: [
              { local: "garde", "+=": 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 5 },
            ],
          },
          {
            si: [],
            texte:
              "Il tire au moment où le pied se pose. La flèche entre et reste dedans. L'autre encaisse et avance quand même, un peu plus court.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "+=": 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "FORCE",
        libelle: "Traverser l'éboulis et entrer dedans",
        cout: { fatigue: 12, usure_arme: 5 },
        issues: [
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]],
            ],
            sortie: true,
            texte:
              "Il traverse en trois pas et entre sous la garde. Le coup passe. L'orc tombe en avant, sans un mot, comme ils tombent tous.",
            effets: [
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]],
            ],
            sortie: true,
            texte:
              "Il traverse et frappe avant que la lame redescende. L'homme lâche tout et s'assoit contre le tronc. Il ne se relève pas.",
            effets: [
              { stat_partie: { compteur: "humains_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["local>=", "touche", 1]],
            sortie: true,
            texte:
              "Il traverse l'éboulis en criant. Elle charge quand même. Le coup passe en travers du garrot. Elle va deux pas plus loin et s'arrête là.",
            effets: [
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [],
            texte:
              "Les cailloux plats partent sous lui à mi-chemin. Il arrive mal, frappe quand même, et prend l'échange dans les côtes. Ils sont au contact, maintenant.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { sante_heros: -8 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "COUVERT",
        libelle: "Rompre et remettre le tronc entre eux",
        apparait_si: [["!local", "couvert"]],
        cout: { fatigue: 5 },
        issues: [
          {
            si: [["local>=", "garde", 2]],
            texte:
              "Il rompt vers le tronc. L'autre suit de trop près et le touche à l'épaule avant qu'il passe derrière le bois. Le tronc tient. La distance est refaite.",
            effets: [
              { sante_heros: -5 },
              { local: "couvert", "=": true },
              { local: "garde", "=": 0 },
            ],
          },
          {
            si: [],
            texte:
              "Il recule derrière le tronc couché et pose l'épaule contre l'écorce partie. L'autre s'arrête au bord du sol nu. On recommence de loin.",
            effets: [
              { local: "couvert", "=": true },
              { local: "garde", "=": 0 },
            ],
          },
        ],
      },
      {
        id: "FLANC",
        libelle: "Prendre le côté qu'il ne couvre pas",
        apparait_si: [["local", "lu"]],
        cout: { fatigue: 8, usure_arme: 3 },
        issues: [
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]],
            ],
            sortie: true,
            texte:
              "Il passe par la gauche, du côté qui ne suit pas. Le bouclier part trop tard. L'orc tombe sur l'éboulis et les cailloux descendent avec lui.",
            effets: [
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]],
            ],
            sortie: true,
            texte:
              "Il entre du côté où l'homme regarde derrière lui. C'est fini avant que la lame redescende.",
            effets: [
              { stat_partie: { compteur: "humains_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["local>=", "touche", 1]],
            sortie: true,
            texte:
              "Il vient par la patte qui ne porte pas. Elle se retourne sur le mauvais appui et s'ouvre. Un coup suffit.",
            effets: [
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [],
            texte:
              "Il prend le côté ouvert et touche. Pas assez profond. L'autre ferme la distance et ils se retrouvent nez à nez.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { sante_heros: -3 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "EPINES",
        libelle: "Reculer dans les épines sans se retourner",
        apparait_si: [["local", "couvert"]],
        sortie: true,
        cout: { segments: 1, fatigue: 6 },
        issues: [
          {
            si: [["local", "presse"]],
            texte:
              "Il entre à reculons. Ça tient, ça déchire, ça ne laisse pas passer vite. Il ressort de l'autre côté les avant-bras ouverts.",
            effets: [
              { etat: "blesse_leger" },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il glisse dans le fourré et se laisse tomber à plat. Les épines referment le passage derrière lui. Il compte jusqu'à cent avant de bouger.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "JETER",
        libelle: "Jeter la chasse du jour sur l'éboulis",
        apparait_si: [
          ["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]],
          ["local>=", "garde", 1],
        ],
        requiert: [["objet", "OBJ-06"]],
        sortie: true,
        cout: { objet: { "OBJ-06": 1 } },
        issues: [
          {
            si: [],
            texte:
              "Il sort la viande du sac et la lance sur les cailloux plats. Elle s'arrête dessus et ne lève plus la tête. Il part par le fourré pendant qu'elle mange.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "RECULER",
        libelle: "Reculer à découvert sans le quitter des yeux",
        sortie: true,
        cout: { fatigue: 8 },
        issues: [
          {
            si: [["local>=", "garde", 2]],
            texte:
              "Il recule sans se retourner, le fer devant. L'autre le suit sur dix pas et place un coup avant de le laisser aller. Ça saigne, mais ça marche.",
            effets: [
              { sante_heros: -6 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
            ],
          },
          {
            si: [["local", "presse"]],
            texte:
              "Il recule. Les jambes ont pris. L'autre le laisse partir plus par choix que par fatigue.",
            effets: [
              { sante_heros: -4 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
            ],
          },
          {
            si: [],
            texte:
              "Il recule à découvert, face à l'autre, sans presser. Vingt pas, puis la lisière. Personne n'a bougé le premier.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {};
