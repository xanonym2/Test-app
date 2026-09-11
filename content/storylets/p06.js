// P06 — Le Vieux Poste. Système enseigné : équipement, usure, portage.

export const storylets = {
  "ST-P06-01": {
    id: "ST-P06-01",
    titre_travail: "Poste — le ratelier sous la poutre",
    lieu: { type: "point_interet", cible: "P06" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { pris: 0, lu: 0 },
    texte: {
      arrivee:
        "Le vieux poste tient encore debout d'un côté. La porte a sauté il y a longtemps, les gonds sont mangés. Dans la salle basse, une poutre du toit est tombée en travers du râtelier d'armes : on voit les manches dessous. Une cotte de mailles pend à son crochet, noire mais entière. Une pique est restée contre le montant de la porte, posée là un jour par quelqu'un qui n'est pas revenu la prendre. La poussière du sol n'a pas été remuée depuis des semaines.",
      base:
        "La poutre pèse toujours sur le râtelier. La cotte au crochet, la pique contre la porte. La poussière garde les traces qu'il vient d'y faire.",
      variantes: [
        {
          si: [["surcharge"]],
          ajout:
            "Les sangles mordent déjà. Il marche à petits pas dans la salle et il pose le pied bien à plat pour ne pas partir en avant.",
        },
        {
          si: [["usure<=", "OBJ-01", 40]],
          ajout:
            "La corde de l'arc a bu l'humidité. Elle siffle mal depuis deux jours et elle rend moins que ce qu'il lui donne.",
        },
      ],
    },
    options: [
      {
        id: "OBS",
        libelle: "Lire la poussière et le mur avant de toucher",
        observation: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["!local", "lu"]],
            texte:
              "La poussière dit tout. Personne n'est monté ici depuis des semaines. La poutre porte sur le montant de droite : en poussant de là, elle bascule au lieu de tomber. Les lanières de la cotte ont tenu, le cuir est resté gras. La pique est trop longue pour les sentes, elle prendra dans les branches.",
            effets: [
              { local: "lu", "=": true },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte: "Rien de plus que tout à l'heure. Il a vu ce qu'il y avait à voir.",
            effets: [],
          },
        ],
      },
      {
        id: "LOURDE",
        libelle: "Forcer la poutre pour dégager le râtelier",
        apparait_si: [["!local", "pris_lourde"]],
        cout: { segments: 1, fatigue: 10 },
        issues: [
          {
            si: [["local", "lu"]],
            texte:
              "Il pousse au montant de droite. La poutre bascule et racle le mur. Sous le râtelier, une arme lourde, le manche encore bon. Il la sort par la garde et la soupèse. Ça se sent tout de suite dans les épaules.",
            effets: [
              { objet: "OBJ-08", tire: true },
              { local: "pris_lourde", "=": true },
              { local: "pris", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il force au mauvais endroit. La poutre part d'un coup et lui prend la main contre le bois. Il dégage quand même l'arme lourde du râtelier. Le manche est bon. Le poignet chauffe.",
            effets: [
              { objet: "OBJ-08", tire: true },
              { sante_heros: -4 },
              { local: "pris_lourde", "=": true },
              { local: "pris", "+=": 1 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "COTTE",
        libelle: "Décrocher la cotte de mailles du mur",
        apparait_si: [["!local", "pris_cotte"]],
        cout: { segments: 1 },
        issues: [
          {
            si: [],
            texte:
              "Le crochet cède sans bruit. La cotte tombe sur son bras d'un seul bloc, plus lourde que tout ce qu'il a porté cette semaine. Les lanières tiennent encore. Il la roule et la sangle sur le sac.",
            effets: [
              { objet: "OBJ-11", tire: true },
              { local: "pris_cotte", "=": true },
              { local: "pris", "+=": 1 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "PIQUE",
        libelle: "Prendre la pique restée contre la porte",
        apparait_si: [["!local", "pris_pique"]],
        issues: [
          {
            si: [],
            texte:
              "Il prend la pique. Le fer est piqué mais droit, le bois n'a pas joué. Elle dépasse d'une tête au-dessus de lui.",
            effets: [
              { objet: "OBJ-09", tire: true },
              { local: "pris_pique", "=": true },
              { local: "pris", "+=": 1 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "TRIER",
        libelle: "Vider le sac par terre et refaire le chargement",
        apparait_si: [["local>=", "pris", 1]],
        cout: { segments: 1 },
        issues: [
          {
            si: [["objet", "OBJ-11"]],
            texte:
              "Il défait les sangles et pose la cotte contre le mur, là où elle a passé toutes ces années. On marche mieux sans. C'est tout ce qu'on peut en dire.",
            effets: [{ objet: "OBJ-11", quantite: -1 }],
          },
          {
            si: [["objet", "OBJ-08"]],
            texte:
              "Il laisse l'arme lourde sur les dalles, la lame contre la pierre. Le sac remonte de deux doigts sur les épaules.",
            effets: [{ objet: "OBJ-08", quantite: -1 }],
          },
          {
            si: [["objet", "OBJ-09"]],
            texte:
              "Il rappuie la pique contre le montant de la porte. Elle y était très bien.",
            effets: [{ objet: "OBJ-09", quantite: -1 }],
          },
          {
            si: [],
            texte:
              "Il vide tout par terre et regarde. Il n'y a rien là-dedans qu'il puisse laisser.",
            effets: [],
          },
        ],
      },
      {
        id: "SORTIR",
        libelle: "Ressortir par la porte et reprendre la sente",
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Il ressort par où il est entré. Le poste reste debout d'un côté, comme il l'était.",
            effets: [
              { xp: 25 },
              { journal: "p06_arsenal" },
            ],
          },
        ],
      },
    ],
  },

  "ST-P06-02": {
    id: "ST-P06-02",
    titre_travail: "Poste — l'atelier et la meule",
    lieu: { type: "point_interet", cible: "P06" },
    conditions: { requis: [["vu", "ST-P06-01"]], interdit: [] },
    unique: true,
    priorite: 7,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "L'atelier est au fond, deux marches plus bas. L'établi tient encore. La meule est là, la manivelle prise dans la rouille, mais elle tourne si on force. Au mur, les crochets des outils sont vides. Les tiroirs de l'établi ont gonflé et ne ferment plus.",
      base:
        "L'établi et la meule. La manivelle tourne si on force. Les tiroirs bâillent.",
      variantes: [
        {
          si: [["usure>=", "OBJ-01", 70]],
          ajout:
            "L'arc n'a rien à demander. La corde est bonne, le bois n'a pas bougé. C'est le reste qui travaille.",
        },
        {
          si: [["usure<=", "OBJ-03", 40]],
          ajout:
            "La lame accroche à la sortie du fourreau. Elle a mordu quelque chose de dur, et ça se voit depuis.",
        },
      ],
    },
    options: [
      {
        id: "MEULE",
        libelle: "Passer l'arme sur la meule",
        cout: { segments: 1, objet: { "OBJ-13": 1 } },
        requiert: [["objet", "OBJ-13"]],
        issues: [
          {
            si: [],
            texte:
              "La manivelle grince et part. Il passe l'arme à plat, lentement, en mouillant la pierre. Le fil revient. Le reste du temps part à recoller ce qui bougeait.",
            effets: [
              { usure: "arme_equipee", valeur: 35 },
              { xp: 10 },
              { journal: "p06_reparation" },
            ],
          },
        ],
      },
      {
        id: "ARC",
        libelle: "Détendre l'arc et refaire la corde",
        cout: { segments: 1, objet: { "OBJ-13": 1 } },
        requiert: [["objet", "OBJ-13"], ["objet", "OBJ-01"]],
        issues: [
          {
            si: [],
            texte:
              "Il détend l'arc et tresse une corde neuve avec le fil poissé. Il la cire au doigt, puis rebande. Le bois reprend sa forme et le départ redevient sec.",
            effets: [
              { usure: "OBJ-01", valeur: 30 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "TIROIRS",
        libelle: "Ouvrir les tiroirs de l'établi",
        epuisable: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [],
            texte:
              "Les tiroirs sortent de travers. Dedans : des chutes de cuir, une bobine de fil poissé, un bloc de colle sèche. De quoi refaire deux ou trois fois ce qui lâchera.",
            effets: [
              { objet: "OBJ-13", quantite: 2 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "SORTIR",
        libelle: "Remonter les deux marches",
        sortie: true,
        issues: [
          {
            si: [],
            texte: "Il remonte les deux marches et laisse l'atelier ouvert derrière lui.",
            effets: [{ xp: 15 }],
          },
        ],
      },
    ],
  },

  "ST-P06-03": {
    id: "ST-P06-03",
    titre_travail: "Poste — la salle de garde",
    lieu: { type: "point_interet", cible: "P06" },
    conditions: { requis: [["vu", "ST-P06-01"]], interdit: [] },
    unique: true,
    priorite: 6,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La salle de garde est à l'étage. L'escalier tient d'un côté, celui du mur. En haut, une paillasse crevée, une table, et le tableau des tours encore cloué au bois. La meurtrière donne plein est, sur la vallée.",
      base:
        "Le tableau des tours au mur, la paillasse par terre, la meurtrière sur l'est.",
      variantes: [
        {
          si: [["etat", "affame"]],
          ajout:
            "Un coin de toile dépasse sous la paillasse. Un sac roulé serré. On ne roule pas un sac comme ça pour y mettre du linge.",
        },
        {
          si: [["surcharge"]],
          ajout:
            "Il pose son chargement au bas des marches. L'escalier ne tiendrait pas les deux.",
        },
      ],
    },
    options: [
      {
        id: "TABLEAU",
        libelle: "Lire le tableau des tours",
        observation: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["!flag", "f_indice_3"]],
            texte:
              "Les dernières lignes sont nettes. La moitié du poste partie vers l'est, trois semaines avant l'attaque. En dessous, l'ordre recopié d'une main pressée, et le nom au bas, capitaine Vairon. Les tours vides n'ont été redonnées à personne. Des ordres pareils, il en a vu passer. Ça se décide loin et ça se paie ici.",
            effets: [
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_3" },
              { pnj_statut: { id: "PNJ-V1", valeur: "cite" } },
              { journal: "p06_tableau", majeure: true },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte: "Il relit les mêmes lignes. Elles ne disent pas autre chose.",
            effets: [],
          },
        ],
      },
      {
        id: "PAILLASSE",
        libelle: "Retourner la paillasse",
        epuisable: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [],
            texte:
              "Sous la paillasse, un sac de toile roulé serré. Du pain dur et des lanières de viande séchée, gardées au sel et au sec. Ça se mange encore.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "MEURTRIERE",
        libelle: "Regarder la vallée par la meurtrière",
        observation: true,
        cout: { segments: 1 },
        issues: [
          {
            si: [["meteo", "brume"]],
            texte:
              "La vallée est bouchée. Il ne voit même pas le premier coude de la route.",
            effets: [],
          },
          {
            si: [],
            texte:
              "La route de l'est se suit jusqu'au coude, puis elle passe derrière l'épaule de la colline. Rien ne bouge dessus. Le vent monte droit par la fente et il est propre.",
            effets: [{ xp: 10 }],
          },
        ],
      },
      {
        id: "SORTIR",
        libelle: "Redescendre et sortir du poste",
        sortie: true,
        issues: [
          {
            si: [],
            texte: "Il redescend en s'appuyant au mur qui tient.",
            effets: [{ xp: 10 }],
          },
        ],
      },
    ],
  },
};

export const journal = {
  p06_arsenal: "Au vieux poste, il a pris sur les murs ce que la Couronne y avait laissé.",
  p06_reparation: "Il a remis son arme en état sur la meule du vieux poste.",
  p06_tableau: "Le tableau des tours du vieux poste donnait la moitié de la garnison partie vers l'est, trois semaines avant l'attaque.",
};
