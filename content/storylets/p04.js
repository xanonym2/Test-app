// P04 — Le Layon. Système enseigné : le risque, l'échec, la confiance.

export const storylets = {
  "ST-P04-01": {
    id: "ST-P04-01",
    titre_travail: "Layon — la coulée",
    lieu: { type: "point_interet", cible: "P04" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { lu: false, bu: false },
    texte: {
      arrivee:
        "Le layon monte droit, puis la pente a lâché. La terre est partie sur vingt pas, jusqu'au lit du ruisseau ; en bas, il est à sec, plein de pierres claires. Le dévers est de l'argile dure comme une tuile, et rien n'y tient. Un hêtre mort est tombé en travers ; le vent remonte le layon et le fait bouger par rafales.",
      base:
        "La coulée n'a pas bougé. Argile dure, le hêtre mort en travers, le vent qui remonte par rafales. En bas, les pierres claires du ruisseau à sec.",
      variantes: [
        {
          si: [["meteo", "pluie"]],
          ajout:
            "La pluie a mouillé l'argile. Cette terre-là ne boit pas : elle garde l'eau en surface et devient du savon.",
        },
        {
          si: [["etat", "assoiffe"]],
          ajout:
            "La gorge colle depuis le matin. Les mains suivent moins bien quand on n'a pas bu.",
        },
        {
          si: [["local", "lu"]],
          ajout:
            "Sous la souche arrachée, l'eau d'avant a creusé un boyau. Étroit. Il ressort plus haut, derrière la coulée.",
        },
      ],
    },
    options: [
      {
        id: "A",
        libelle: "Attendre sous le couvert et compter les rafales",
        cout: { segments: 1 },
        apparait_si: [["!local", "lu"]],
        observation: true,
        issues: [
          {
            si: [],
            reussite: true,
            texte:
              "Les rafales viennent par trois, puis le vent retombe le temps de dix pas. Le hêtre est sec, sans champignon en console : ce bois-là porte encore. Sous la souche arrachée, un boyau étroit traverse la coulée par-dessous.",
            effets: [{ local: "lu", "=": true }, { xp: 5 }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Boire une gorgée avant de s'engager",
        cout: { objet: { "OBJ-05": 1 } },
        apparait_si: [["etat", "assoiffe"], ["!local", "bu"]],
        requiert: [["objet", "OBJ-05"]],
        issues: [
          {
            si: [],
            texte:
              "L'eau est tiède et a le goût de l'outre. La gorge se desserre, les doigts se rouvrent. En bas, les pierres du ruisseau sont blanches de soleil : il n'y a rien à reprendre ici.",
            effets: [
              { retire_etat: "assoiffe" },
              { fatigue: -8 },
              { local: "bu", "=": true },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Traverser le dévers en biais, à plat sur l'argile",
        cout: { segments: 1 },
        modif_proba: [
          { si: [["stat>=", "adresse", 4]], valeur: 15 },
          { si: [["objet", "OBJ-14"]], valeur: 20 },
          { si: [["local", "bu"]], valeur: 8 },
          { si: [["etat", "assoiffe"]], valeur: -12 },
          { si: [["etat", "epuise"]], valeur: -10 },
          { si: [["etat", "blesse_jambe"]], valeur: -15 },
          { si: [["surcharge"]], valeur: -15 },
          { si: [["meteo", "pluie"]], valeur: -15 },
        ],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            sortie: true,
            texte:
              "Le pied cherche, trouve un durillon de racine, puis un autre. L'argile tient là où elle est grise. De l'autre côté, les jambes tremblent un peu et mettent un moment à s'arrêter.",
            effets: [
              { flag: "f_layon_reussi" },
              { fatigue: 6 },
              { xp: 30 },
              { journal: "layon_passe" },
            ],
          },
          {
            probabilite: 30,
            si: [],
            sortie: true,
            texte:
              "Le talon part. La main attrape le hêtre mort au passage et le corps suit. Le carquois se vide à moitié dans la pente ; les flèches rebondissent jusqu'aux pierres claires, en bas.",
            effets: [
              { objet: "OBJ-02", quantite: -3 },
              { sante_heros: -4 },
              { fatigue: 10 },
              { flag: "f_layon_reussi" },
              { xp: 20 },
            ],
          },
          {
            probabilite: 15,
            si: [],
            sortie: true,
            texte:
              "L'argile part d'un bloc, en plaque. La descente est courte et sèche. Le genou tape une pierre claire en bas, et la jambe ne veut plus porter du même côté.",
            effets: [
              { etat: "blesse_jambe" },
              { sante_heros: -12 },
              { fatigue: 12 },
              { flag: "f_layon_rate" },
              { xp: 10 },
              { journal: "layon_chute" },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Passer sur le hêtre mort, entre deux rafales",
        cout: { segments: 1 },
        modif_proba: [
          { si: [["local", "lu"]], valeur: 20 },
          { si: [["stat>=", "adresse", 4]], valeur: 12 },
          { si: [["objet", "OBJ-14"]], valeur: 10 },
          { si: [["etat", "epuise"]], valeur: -10 },
          { si: [["etat", "blesse_jambe"]], valeur: -20 },
          { si: [["surcharge"]], valeur: -20 },
        ],
        issues: [
          {
            probabilite: 50,
            reussite: true,
            si: [],
            sortie: true,
            texte:
              "Le bois crisse sans plier. Trois pas, la rafale arrive dans le dos, on ne bouge plus, puis trois pas encore. Le tronc rend l'autre berge à hauteur d'homme.",
            effets: [
              { flag: "f_layon_reussi" },
              { fatigue: 5 },
              { xp: 30 },
              { journal: "layon_passe" },
            ],
          },
          {
            probabilite: 35,
            si: [],
            sortie: true,
            texte:
              "Au milieu, une branche morte cède sous le pied. La poitrine tombe sur le tronc et coupe le souffle. L'arc cogne le bois, deux fois, avant que la main le rattrape.",
            effets: [
              { sante_heros: -6 },
              { usure: "arme_equipee", valeur: -10 },
              { fatigue: 10 },
              { flag: "f_layon_reussi" },
              { xp: 20 },
            ],
          },
          {
            probabilite: 15,
            si: [],
            sortie: true,
            texte:
              "La rafale vient avant son tour. Le tronc roule d'un quart et la jambe passe entre deux branches. Le reste du corps continue. En bas, les pierres claires ne pardonnent pas.",
            effets: [
              { etat: "blesse_jambe" },
              { sante_heros: -14 },
              { fatigue: 12 },
              { flag: "f_layon_rate" },
              { xp: 10 },
              { journal: "layon_chute" },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Se glisser dans le boyau, sous la souche",
        cout: { segments: 2 },
        apparait_si: [["local", "lu"]],
        sortie: true,
        issues: [
          {
            si: [["surcharge"]],
            texte:
              "Le sac accroche dès l'entrée. Il faut le pousser devant, ramper derrière, le reprendre à chaque coude. On ressort plus haut, plein de terre, les bras morts.",
            effets: [
              { fatigue: 22 },
              { usure: "arme_equipee", valeur: -5 },
              { flag: "f_layon_evite" },
              { xp: 15 },
            ],
          },
          {
            si: [],
            texte:
              "Le boyau est froid et sent la racine coupée. À plat ventre sur toute la longueur, coudes et genoux. Il ressort derrière la coulée, là où le layon redevient un layon.",
            effets: [
              { fatigue: 15 },
              { flag: "f_layon_evite" },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Redescendre et contourner par le bas",
        cout: { segments: 2 },
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Le détour repasse par le fond du vallon, sur les pierres claires, puis remonte de l'autre côté. Deux fois plus long. La pente ouverte reste derrière, intacte.",
            effets: [
              { flag: "f_layon_evite" },
              { fatigue: 10 },
              { xp: 5 },
            ],
          },
        ],
      },
    ],
  },

  "ST-P04-02": {
    id: "ST-P04-02",
    titre_travail: "Layon — après la coulée",
    lieu: { type: "point_interet", cible: "P04" },
    conditions: {
      requis: [
        [
          "ou",
          [["flag", "f_layon_reussi"]],
          [["flag", "f_layon_rate"]],
          [["flag", "f_layon_evite"]],
        ],
      ],
      interdit: [],
    },
    unique: true,
    priorite: 7,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { vu_jambe: false, trace_lue: false },
    texte: {
      arrivee:
        "Passé la coulée, le layon redevient plat. Dans la poussière, des pieds nus et un bâton traîné : un groupe est monté vers le nord, il y a moins d'un jour. Ils marchaient serré et lentement, et ils se sont arrêtés souvent. Une outre crevée a été jetée au bord, encore humide à l'intérieur.",
      base:
        "Le layon est plat, ici. Les pieds nus vont toujours vers le nord. L'outre crevée sèche au bord du passage.",
      variantes: [
        {
          si: [["etat", "blesse_jambe"]],
          ajout:
            "La jambe chauffe. Elle porte, mais elle ne portera pas jusqu'au soir de cette façon.",
        },
        {
          si: [["compagnons>=", 1]],
          ajout:
            "L'autre attend deux pas en arrière, sans rien dire, et regarde la pente qu'on vient de quitter.",
        },
      ],
    },
    options: [
      {
        id: "A",
        libelle: "Ouvrir la botte et regarder la jambe",
        cout: { segments: 1 },
        apparait_si: [["etat", "blesse_jambe"], ["!local", "vu_jambe"]],
        observation: true,
        issues: [
          {
            si: [],
            texte:
              "Le genou est ouvert sur le côté, propre, et gonfle déjà. Rien n'est cassé : le pied tourne encore dans les deux sens. Mais la peau est sale et l'argile est entrée dedans.",
            effets: [{ local: "vu_jambe", "=": true }, { xp: 5 }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Laver la plaie, serrer, refaire le laçage",
        cout: { segments: 1, objet: { "OBJ-12": 1 } },
        apparait_si: [["etat", "blesse_jambe"]],
        requiert: [["objet", "OBJ-12"]],
        issues: [
          {
            si: [],
            texte:
              "La terre sort mal et ça prend du temps. Une fois la botte relacée par-dessus, serrée haut, le genou reste raide mais il tient. C'était ce qui restait pour ce genre de chose.",
            effets: [
              { retire_etat: "blesse_jambe" },
              { sante_heros: 10 },
              { fatigue: 5 },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Dire ce qu'on a mal lu dans la pente",
        cout: { segments: 1 },
        apparait_si: [["compagnons>=", 1]],
        epuisable: true,
        issues: [
          {
            si: [["compagnon", "PNJ-01"]],
            texte:
              "Il écoute jusqu'au bout sans couper. Puis il montre le hêtre mort : lui serait passé par là, et tant pis pour le bruit. Il le dit sans reproche, comme on tend un outil.",
            effets: [{ confiance: { pnj: "PNJ-01", valeur: 1 } }, { xp: 10 }],
          },
          {
            si: [["compagnon", "PNJ-02"]],
            texte:
              "Elle écoute, puis explique comment on sonde une argile pareille : une perche, plantée trois fois, et on regarde jusqu'où elle entre. Elle ne dit pas qu'on aurait dû le savoir.",
            effets: [{ confiance: { pnj: "PNJ-02", valeur: 1 } }, { xp: 10 }],
          },
          {
            si: [["compagnon", "PNJ-04"]],
            texte:
              "L'aveu passe mal, puis il passe. On repart avec un accord sans mot : celui qui voit le premier parle le premier, même pour dire qu'il n'est pas sûr.",
            effets: [{ confiance: { pnj: "PNJ-04", valeur: 1 } }, { xp: 10 }],
          },
          {
            si: [],
            texte:
              "L'autre écoute et ne répond pas tout de suite. Puis la main se tend vers le sac : on portera à deux pour la montée suivante.",
            effets: [{ xp: 10 }],
          },
        ],
      },
      {
        id: "F",
        libelle: "Remonter la trace sur cent pas et revenir",
        cout: { segments: 1 },
        apparait_si: [["!etat", "blesse_jambe"]],
        observation: true,
        issues: [
          {
            si: [["local", "trace_lue"]],
            texte:
              "La trace n'a rien appris de plus. Elle monte, elle s'arrête, elle repart. Les empreintes du dessus sont encore nettes : ils n'ont pas pressé le pas.",
            effets: [{ fatigue: 5 }],
          },
          {
            si: [],
            texte:
              "Ils s'arrêtent tous les cinquante pas. La couture de l'outre a lâché à l'épaule, et la lanière a été coupée court : on l'a prise pour attacher quelque chose, ou quelqu'un. Ils portent un blessé et ils vont lentement. Une demi-journée devant, pas plus.",
            effets: [{ local: "trace_lue", "=": true }, { xp: 10 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "S'asseoir contre la souche et souffler",
        cout: { segments: 2 },
        epuisable: true,
        issues: [
          {
            si: [],
            texte:
              "Le dos contre la souche, la jambe tendue devant. Les fourmis montent et redescendent le long du bois mort, toujours par le même côté. En se relevant, le corps a repris de quoi marcher encore un peu.",
            effets: [{ fatigue: -20 }, { sante_heros: 3 }, { xp: 10 }],
          },
        ],
      },
      {
        id: "E",
        libelle: "Reprendre la trace des pieds nus sans s'asseoir",
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            si: [["etat", "blesse_jambe"]],
            texte:
              "Les cent premiers pas vont. Après, chaque appui se paye et la jambe se met à chercher ses propres chemins. Elle demandera son dû plus tard, et elle le prendra.",
            effets: [
              { differe: { evenement: "ST-EVT-01", resolution: "jambe", dans_jours: 1 } },
              { fatigue: 12 },
              { flag: "f_layon_force" },
              { xp: 20 },
              { journal: "layon_force" },
            ],
          },
          {
            si: [],
            texte:
              "La trace se lit sans effort : ils n'ont rien fait pour l'effacer. Elle monte vers le nord, franche, et elle ne s'arrête pas avant le pli où la fumée tient.",
            effets: [{ fatigue: 6 }, { xp: 15 }],
          },
        ],
      },
    ],
  },
};

export const journal = {
  layon_passe: "Il a franchi la coulée du layon par ses propres moyens.",
  layon_chute: "L'argile du layon a lâché sous lui ; il est tombé jusqu'aux pierres du ruisseau.",
  layon_force: "Il est reparti sur une jambe qui ne portait plus, sans attendre.",
};
