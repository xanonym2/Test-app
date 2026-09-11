export const storylets = {
  "ST-P02-01": {
    id: "ST-P02-01",
    titre_travail: "Ferme — fouille",
    lieu: { type: "point_interet", cible: "P02" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      fouille: 0,
      maison_faite: false,
      reserve_faite: false,
      trappe: false,
      cave_faite: false,
      epuise_lieu: false,
    },
    texte: {
      arrivee:
        "La porte de la maison pend par un gond. Elle bat quand le vent tourne, et personne ne vient la fermer. Dans l'enclos, les brebis sont mortes depuis deux jours au moins. La réserve tient encore debout, porte close, le bois gonflé par l'humidité.",
      base:
        "La porte bat toujours. Personne n'est passé après moi : mes traces sont seules dans la poussière du seuil.",
      variantes: [
        {
          si: [["etat", "affame"]],
          ajout:
            "La réserve sent le grain sec. C'est la première chose que je remarque. Le reste vient après.",
        },
        {
          si: [["etat", "blesse_leger"]],
          ajout:
            "De la barrière à la maison il y a vingt pas. Je les compte.",
        },
        {
          si: [["fatigue>=", 70]],
          remplace:
            "La porte bat. Les brebis sont mortes dans l'enclos. La réserve est fermée. Je ne vois pas plus loin que ça.",
        },
      ],
    },
    regles_locales: [
      {
        si: [["local>=", "fouille", 3]],
        alors: [{ local: "epuise_lieu", "=": true }],
      },
    ],
    options: [
      {
        id: "A",
        libelle: "Fouiller la maison, pièce par pièce",
        cout: { segments: 1, fatigue: 6 },
        apparait_si: [["!local", "maison_faite"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Le lit est fait. La huche est vide, retournée. Dans le tiroir de l'établi, une serpe à manche court, la lame encore grasse : je la prends. Sous la huche, deux sacs de galettes sèches, rangés là par quelqu'un qui comptait revenir.",
            effets: [
              { objet: "OBJ-03", tire: true },
              { objet: "OBJ-15", quantite: 2 },
              { local: "maison_faite", "=": true },
              { local: "fouille", "+=": 1 },
              { flag: "f_ferme_fouillee" },
              { xp: 25 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Forcer la porte gonflée de la réserve",
        cout: { segments: 1, fatigue: 8, usure_arme: 4 },
        apparait_si: [["!local", "reserve_faite"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["objet", "OBJ-14"]],
            texte:
              "Le croc prend sous le battant. Le bois cède d'un coup, proprement. Dedans : des galettes sèches en sacs, une caisse de clous et de lanières de cuir. J'emporte ce que je peux porter.",
            effets: [
              { objet: "OBJ-15", quantite: 3 },
              { objet: "OBJ-13", quantite: 1 },
              { local: "reserve_faite", "=": true },
              { local: "fouille", "+=": 1 },
              { flag: "f_ferme_fouillee" },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "J'attaque le battant à l'épaule. Le bois ne cède qu'au quatrième essai et ma lame accroche dans la fente. Dedans : des galettes sèches, une caisse de clous et de lanières. Le reste a moisi contre le mur.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { objet: "OBJ-13", quantite: 1 },
              { local: "reserve_faite", "=": true },
              { local: "fouille", "+=": 1 },
              { flag: "f_ferme_fouillee" },
              { fatigue: 6 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Lire le sol devant le seuil",
        cout: { segments: 1 },
        apparait_si: [["!local", "trappe"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "La poussière du seuil garde les passages. Des sabots de brebis en pagaille, tous partis du même côté. Le reste est piétiné, illisible. Une planche sonne creux sous mon talon : il y a une cave là-dessous.",
            effets: [
              { local: "trappe", "=": true },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Soulever la planche et descendre à la cave",
        cout: { segments: 1, fatigue: 5 },
        apparait_si: [["local", "trappe"], ["!local", "cave_faite"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Trois marches, de la terre battue, une odeur de navet. Contre le mur, un croc de charpentier avec sa corde, du genre qui sert à monter sur un toit. À côté, un pot de baume bouché à la cire. Personne n'est descendu ici.",
            effets: [
              { objet: "OBJ-14", tire: true },
              { objet: "OBJ-12", quantite: 1 },
              { local: "cave_faite", "=": true },
              { local: "fouille", "+=": 1 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Laisser la ferme et reprendre la route",
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
              "Je remets la porte contre son chambranle. Elle rebat dès que j'ai le dos tourné.",
            effets: [],
          },
        ],
      },
    ],
  },

  "ST-P02-02": {
    id: "ST-P02-02",
    titre_travail: "Ferme — l'enclos",
    lieu: { type: "point_interet", cible: "P02" },
    conditions: { requis: [["flag", "f_ferme_fouillee"]], interdit: [] },
    unique: true,
    priorite: 7,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { plaies: false, rien_pris: false },
    texte: {
      arrivee:
        "Les brebis sont contre la barrière du fond, toutes du même côté, la gorge ouverte. Neuf bêtes. La laine leur est restée sur le dos. Une meute affamée tue plus qu'elle ne mange ; j'ai déjà vu ça deux fois.",
      base:
        "Les bêtes sont toujours là, contre la barrière. L'odeur a tourné depuis.",
      variantes: [
        {
          si: [["etat", "affame"]],
          ajout:
            "Neuf bêtes de viande devant moi, et deux jours de chaleur dessus. Je regarde ça plus longtemps qu'il ne faudrait.",
        },
        {
          si: [["meteo", "pluie"]],
          ajout: "La pluie a lavé les toisons. Le sang est parti, pas les plaies.",
        },
        {
          si: [["fatigue>=", 70]],
          ajout: "Je m'appuie à la barrière avant de me baisser.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Retourner une bête et regarder la plaie",
        cout: { segments: 1 },
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "La plaie prend toute la gorge, d'une oreille à l'autre. Les bords sont écrasés, pas déchirés. Je connais la dent du loup, celle du lynx, celle du chien de ferme. Celle-là, non. Et les neuf carcasses sont entières : rien n'a été mangé.",
            effets: [
              { local: "plaies", "=": true },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Faire le tour de ce qui aurait dû disparaître",
        cout: { segments: 1 },
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Le sel est sur l'étagère. Les toisons sont restées sur les bêtes. Les outils sont au mur, le grain dans ses sacs. Ils ont tué et ils n'ont rien pris. Des bêtes ne prennent rien : voilà la réponse, et elle tient debout.",
            effets: [
              { local: "rien_pris", "=": true },
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_2" },
              { journal: "ferme_rien_pris" },
              { xp: 25 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Prélever de la viande sur une bête du dessous",
        cout: { segments: 1, fatigue: 5 },
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["competence", "C06"]], valeur: 25 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Celle du dessous est restée à l'ombre, à même la terre froide. La chair tient encore. J'en lève ce que je peux porter et je laisse le reste aux mouches.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { xp: 10 },
            ],
          },
          {
            probabilite: 40,
            si: [],
            texte:
              "La chaleur a travaillé sous la laine. Ça sent le doux, puis l'aigre. Je jette tout. Je me suis baissé longtemps pour rien et j'ai les mains à laver.",
            effets: [
              { fatigue: 6 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Refermer la barrière et quitter l'enclos",
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
              "Je remets le piquet dans sa boucle. Ça ne sert plus à rien, et je le fais quand même.",
            effets: [],
          },
        ],
      },
    ],
  },

  "ST-P02-03": {
    id: "ST-P02-03",
    titre_travail: "Ferme — ce qui revient",
    lieu: { type: "point_interet", cible: "P02" },
    conditions: { requis: [["vu", "ST-P02-01"]], interdit: [] },
    unique: true,
    priorite: 6,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { alerte: 0, lu: false },
    texte: {
      arrivee:
        "Le vent tourne : odeur de fauve, forte, fraîche. Ça vient du pré, derrière la haie, et ça ne cherche pas à se taire. La grange a une fente à hauteur d'œil et l'échelle du grenier tient encore. La barrière du fond est basse, mais il y a les ronces derrière.",
      base:
        "Ça revient. Même odeur, même heure. L'échelle du grenier n'a pas bougé.",
      variantes: [
        {
          si: [["meteo", "pluie"]],
          ajout:
            "La pluie tasse l'odeur et couvre le pas. Je saurai moins vite d'où ça sort.",
        },
        {
          si: [["etat", "blesse_leger"]],
          ajout:
            "L'échelle me paraît haute, et les ronces derrière la barrière, plus épaisses.",
        },
        {
          si: [["competence", "C01"]],
          ajout:
            "De la fente à l'angle de la haie, il y a juste la bonne distance. Elle repassera de profil.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Guetter par la fente de la grange",
        cout: { segments: 1 },
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["competence", "C06"]], valeur: 20 }],
        issues: [
          {
            probabilite: 65,
            reussite: true,
            si: [],
            texte:
              "Une seule bête. Haute au garrot, le poil collé, et elle traîne l'arrière-main. Elle fait le tour de l'enclos et revient toujours au même angle de haie. Elle a faim et elle mange mal.",
            effets: [
              { local: "lu", "=": true },
              { local: "alerte", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            probabilite: 35,
            si: [],
            texte:
              "Elle passe derrière le tas de fumier au mauvais moment. Je ne prends qu'un dos et une allure. Quand je me redresse, elle a changé d'angle et je ne sais plus de quel côté elle tourne.",
            effets: [
              { local: "alerte", "+=": 1 },
              { fatigue: 4 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Sortir dans la cour et l'attendre de face",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je me place dos à la réserve, l'arme prête, le vent de mon côté. Elle passe la haie et elle me voit.",
            effets: [{ declenche: "ST-CBT-01" }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Monter au grenier et laisser passer",
        cout: { segments: 2, fatigue: 10 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "L'échelle grince sous moi. En haut je m'assois dans le foin et je ne bouge plus. Elle tourne dans la cour un long moment. Quand je redescends, le jour a baissé et j'ai les jambes raides.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { journal: "ferme_bete_evitee" },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Jeter la viande par-dessus la haie",
        cout: { segments: 1, objet: { "OBJ-06": 1 } },
        requiert: [["objet", "OBJ-06"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je lance la pièce loin, de l'autre côté de la haie, et je pars du côté du vent. Elle y va. Elle ne lève même pas la tête quand je passe la barrière.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { journal: "ferme_bete_evitee" },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Tirer par la fente avant qu'elle passe la haie",
        cout: { segments: 1, objet: { "OBJ-02": 1 } },
        apparait_si: [["competence", "C01"]],
        requiert: [["equipe_famille", "arc"], ["objet", "OBJ-02"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["local", "lu"]], valeur: 15 }],
        issues: [
          {
            probabilite: 70,
            reussite: true,
            si: [],
            texte:
              "Elle s'arrête à l'angle de la haie, de profil, le temps qu'il faut. La flèche entre derrière l'épaule. Elle fait trois pas et se couche dans l'herbe. Je ne sors pas tout de suite.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 25 },
            ],
          },
          {
            probabilite: 30,
            si: [],
            texte:
              "Le trait part trop tôt et prend le gras de l'épaule. Le bois casse contre la haie. Elle se retourne vers la grange et elle vient droit sur la porte.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { declenche: "ST-CBT-01" },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Passer la barrière basse et couper par les ronces",
        cout: { segments: 1, fatigue: 8 },
        epuisable: false,
        observation: false,
        deplacement: true,
        sortie: true,
        issues: [
          {
            si: [["competence", "C04"]],
            reussite: true,
            texte:
              "Je passe dans les ronces sans ralentir. De l'autre côté je m'assois, je tire les épines une par une et je serre ce qui saigne avec une lanière. Ça prend le reste du jour. Après, ça tient.",
            effets: [
              { sante_heros: -2 },
              { segments: 1 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            si: [],
            reussite: true,
            texte:
              "Je passe la barrière sans bruit. Les ronces sont plus hautes qu'elles n'en avaient l'air : elles prennent les bras, le dos, la nuque. Je sors de là griffé jusqu'au sang, mais je sors.",
            effets: [
              { etat: "blesse_leger" },
              { sante_heros: -4 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  ferme_rien_pris:
    "À la ferme, les bêtes avaient été tuées et le sel était resté sur l'étagère.",
  ferme_bete_evitee:
    "Quelque chose rôdait autour de la ferme ; je l'ai laissé passer sans me montrer.",
};
