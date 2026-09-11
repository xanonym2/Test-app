// P05 — Le Camp des fuyards. Système enseigné : l'information sociale et le recrutement.

export const storylets = {
  "ST-P05-01": {
    id: "ST-P05-01",
    titre_travail: "Camp — écouter",
    lieu: { type: "point_interet", cible: "P05" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { lu: false },
    texte: {
      arrivee:
        "Le camp tient dans un pli, sous les aulnes. Sept feux, dont trois froids : ils sont partis de nuit, et personne ne fait cuire. Au bord de la piste, un homme fend du bois beaucoup trop vite pour ce qu'il y a à fendre. Plus loin, une femme lave des pieds dans une bassine et recoud ce qui peut l'être. Une charrette vide attend en travers, timon vers l'ouest.",
      base:
        "Le camp a encore perdu deux feux. L'homme fend toujours son bois. La femme n'a plus de linge propre pour les pieds. La charrette n'a pas bougé, timon vers l'ouest.",
      variantes: [
        {
          si: [["meteo", "pluie"]],
          ajout:
            "La pluie tombe dans les feux. Personne ne se lève pour les couvrir.",
        },
        {
          si: [["objet", "OBJ-06"]],
          ajout:
            "La viande dans le sac pèse d'un coup. Des yeux la suivent depuis le deuxième feu.",
        },
      ],
    },
    regles_locales: [{ si: [], alors: [{ flag: "f_camp_atteint" }] }],
    options: [
      {
        id: "A",
        libelle: "Faire le tour du camp avant d'ouvrir la bouche",
        cout: { segments: 1 },
        apparait_si: [["!local", "lu"]],
        observation: true,
        issues: [
          {
            si: [],
            texte:
              "Les traces entrent toutes par l'est et aucune ne ressort. Des pieds d'enfants, des pieds nus, deux chevaux ferrés au milieu. Les bâches sont tendues sur des piquets enfoncés au maillet : ils comptaient rester.",
            effets: [{ local: "lu", "=": true }, { xp: 10 }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Prendre un rondin et fendre à côté de l'homme",
        cout: { segments: 1 },
        issues: [
          {
            si: [["competence", "C05"], ["confiance<=", "PNJ-01", 0]],
            texte:
              "Deux rondins, et c'est lui qui demande où l'on va. Il tenait une porte, quelque part au nord ; elle n'a pas tenu. Il écoute la réponse jusqu'au bout, puis il pose sa hache du bon côté du tas.",
            effets: [{ confiance: { pnj: "PNJ-01", valeur: 2 } }, { xp: 10 }],
          },
          {
            si: [["confiance<=", "PNJ-01", 0]],
            texte:
              "Il laisse faire deux rondins avant de parler. Il tenait une porte, quelque part au nord ; elle n'a pas tenu longtemps. Depuis, il ne dort pas si quelqu'un ne regarde pas la piste.",
            effets: [{ confiance: { pnj: "PNJ-01", valeur: 1 } }, { xp: 5 }],
          },
          {
            si: [],
            texte:
              "Il a dit ce qu'il avait à dire. Le tas monte, le bois est déjà sec, et personne n'en brûlera autant.",
            effets: [{ fatigue: 5 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Tenir la bassine pendant qu'elle recoud",
        cout: { segments: 1 },
        issues: [
          {
            si: [["confiance<=", "PNJ-02", 0]],
            texte:
              "Elle travaille vite et ne lève pas les yeux. Elle demande d'où on vient, écoute jusqu'au bout, et dit que ses collets du ruisseau donnent deux oiseaux par jour, pas plus. Elle sait compter ce qui manque.",
            effets: [{ confiance: { pnj: "PNJ-02", valeur: 1 } }, { xp: 5 }],
          },
          {
            si: [],
            texte:
              "L'eau de la bassine est devenue brune. Elle la change, s'agenouille devant le suivant, et ne demande plus rien.",
            effets: [{ fatigue: 5 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Aider le colporteur à caler ses roues",
        cout: { segments: 1 },
        issues: [
          {
            si: [["confiance<=", "PNJ-03", 0]],
            texte:
              "La charrette est vide et il ne dira pas ce qu'il a déchargé. Il vient de l'est par la route basse, et il y repassera. Il vend ce qu'il entend, et il n'entend rien pour rien.",
            effets: [{ confiance: { pnj: "PNJ-03", valeur: 1 } }, { xp: 5 }],
          },
          {
            si: [],
            texte:
              "Les roues sont calées. Il s'assoit sur le timon, dos à l'ouest, et attend qu'on ait quelque chose dans les mains.",
            effets: [{ fatigue: 4 }],
          },
        ],
      },
      {
        id: "E",
        libelle: "Poser le sac près d'un feu froid",
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Personne ne demande qui on est. On fait de la place, c'est tout. Les cendres du feu froid sont encore tièdes en dessous.",
            effets: [{ flag: "f_camp_atteint" }, { xp: 25 }],
          },
        ],
      },
    ],
  },

  "ST-P05-02": {
    id: "ST-P05-02",
    titre_travail: "Camp — partir à deux",
    lieu: { type: "point_interet", cible: "P05" },
    conditions: {
      requis: [["flag", "f_camp_atteint"]],
      interdit: [["flag", "f_camp_ferme"]],
    },
    unique: true,
    priorite: 7,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { pese: false, dit: false },
    texte: {
      arrivee:
        "Les deux ont compris avant qu'on demande. L'homme a posé sa hache et s'est mis debout dans le passage : il ira devant, et il mangera ce qu'on mange. La femme a roulé son fil ; elle sait tenir une ligne de collets, et elle ne se battra pas au milieu d'un chemin. Le camp n'en laissera partir qu'un. Celui qui reste tient le reste.",
      base:
        "L'homme est toujours debout dans le passage. La femme a gardé son fil roulé dans la main. Le camp n'en laissera partir qu'un.",
      variantes: [
        {
          si: [["local", "pese"]],
          ajout:
            "L'un n'a pas de sac. L'autre en a un plein et le soulève sans forcer.",
        },
        {
          si: [["etat", "blesse_jambe"]],
          ajout:
            "Tous les deux regardent la jambe avant de regarder le visage. Aucun des deux n'en parle.",
        },
      ],
    },
    options: [
      {
        id: "A",
        libelle: "Regarder encore, sans répondre",
        cout: { segments: 1 },
        epuisable: true,
        observation: true,
        issues: [
          {
            si: [],
            texte:
              "L'homme porte tout sur lui et n'a rien derrière. La femme range, roule, attache, et son sac tient debout tout seul. Ni l'un ni l'autre ne demande où on va, ni pourquoi.",
            effets: [{ local: "pese", "=": true }, { xp: 10 }],
          },
        ],
      },
      {
        id: "M",
        libelle: "Dire devant tout le monde où l'on va",
        cout: { segments: 1 },
        apparait_si: [["competence", "C05"]],
        epuisable: true,
        issues: [
          {
            si: [],
            texte:
              "On parle assez fort pour que le pli entende. Personne ne coupe. À la fin, l'homme a avancé d'un pas vers la piste et la femme a fermé son sac. Les deux attendent le nom qui sortira.",
            effets: [
              { local: "dit", "=": true },
              { confiance: { pnj: "PNJ-01", valeur: 1 } },
              { confiance: { pnj: "PNJ-02", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Tendre l'avant-bras à l'homme et le laisser passer devant",
        cout: { segments: 1 },
        apparait_si: [["!flag", "f_recrue_prise"]],
        sortie: true,
        issues: [
          {
            si: [["competence", "C05"]],
            texte:
              "Il ne demande pas où l'on va : il l'a déjà entendu. Il prend l'avant-bras, ramasse sa hache et se met devant avant qu'on ait à le dire. Il ne regarde plus derrière lui une seule fois.",
            effets: [
              { compagnon: "PNJ-01" },
              { flag: "f_recrue_prise" },
              { confiance: { pnj: "PNJ-01", valeur: 2 } },
              { journal: "recrue_devant", majeure: true },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Il prend l'avant-bras, pas la main. Il ramasse sa hache et se met à deux pas devant sans qu'on le lui demande. Derrière, la femme s'agenouille devant les pieds suivants.",
            effets: [
              { compagnon: "PNJ-01" },
              { flag: "f_recrue_prise" },
              { confiance: { pnj: "PNJ-01", valeur: 1 } },
              { journal: "recrue_devant", majeure: true },
              { xp: 25 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Prendre le sac de la femme et l'attendre",
        cout: { segments: 1 },
        apparait_si: [["!flag", "f_recrue_prise"]],
        sortie: true,
        issues: [
          {
            si: [["competence", "C05"]],
            texte:
              "Elle ne discute pas le partage du sac : elle en reprend la moitié d'office. Elle dit ce qu'elle surveillera, les bas-côtés et le vent, et elle se met à trois pas en arrière sans qu'on le demande.",
            effets: [
              { compagnon: "PNJ-02" },
              { flag: "f_recrue_prise" },
              { confiance: { pnj: "PNJ-02", valeur: 2 } },
              { journal: "recrue_arriere", majeure: true },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Elle laisse porter le sac trois pas, puis en reprend la moitié. Elle marche derrière, à trois pas, et regarde les bas-côtés plutôt que le chemin. L'homme se rassoit près de sa hache.",
            effets: [
              { compagnon: "PNJ-02" },
              { flag: "f_recrue_prise" },
              { confiance: { pnj: "PNJ-02", valeur: 1 } },
              { journal: "recrue_arriere", majeure: true },
              { xp: 25 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Reprendre son sac et sortir du camp seul",
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Personne ne retient personne. L'homme se rassoit, la femme remet le fil dans sa poche. Le passage se referme derrière, et le bruit du camp s'arrête net au deuxième aulne.",
            effets: [
              { flag: "f_camp_seul" },
              { journal: "camp_seul" },
              { xp: 10 },
            ],
          },
        ],
      },
    ],
  },

  "ST-P05-03": {
    id: "ST-P05-03",
    titre_travail: "Camp — le colporteur",
    lieu: { type: "point_interet", cible: "P05" },
    conditions: { requis: [["flag", "f_camp_atteint"]], interdit: [] },
    unique: true,
    priorite: 6,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { ecoute: false },
    texte: {
      arrivee:
        "Le colporteur a fini de caler ses roues. Il s'assoit sur le timon, dos à l'ouest, et regarde ce qu'on porte plutôt que le visage. Il a fait la route basse trois fois depuis le printemps, chargé à l'aller, vide au retour. Ce qu'il sait vaut mieux que ce qu'il transporte, et rien ne se donne.",
      base:
        "Le colporteur est toujours sur son timon. Il regarde ce qu'on porte, puis les mains, puis la piste.",
      variantes: [
        {
          si: [["flag", "f_indice_3"]],
          ajout:
            "Dès qu'on parle des soldats, il change de sujet. Il a d'autres choses à vendre.",
        },
        {
          si: [["objet", "OBJ-15"]],
          ajout:
            "Il a repéré les vivres sèches au premier coup d'œil, et il ne les regarde plus.",
        },
      ],
    },
    options: [
      {
        id: "A",
        libelle: "Écouter de loin ce qu'il raconte aux autres",
        cout: { segments: 1 },
        epuisable: true,
        observation: true,
        issues: [
          {
            si: [["competence", "C02"]],
            texte:
              "On s'assoit dos à la charrette, dans son angle mort, et il parle comme si personne n'écoutait. Le gué du nord est tenu. La route basse ne l'est plus. Il compte repartir avant l'aube, et il cherche quelqu'un pour l'ouest.",
            effets: [{ local: "ecoute", "=": true }, { xp: 15 }],
          },
          {
            si: [],
            texte:
              "De loin, on attrape des bouts : le prix du sel, un pont qui tient encore, un gué qu'on ne passe plus. Il raconte la même histoire deux fois, mot pour mot, et s'arrête au même endroit les deux fois.",
            effets: [{ xp: 10 }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Poser des vivres sèches sur le timon",
        cout: { segments: 1, objet: { "OBJ-15": 1 } },
        requiert: [["objet", "OBJ-15"]],
        sortie: true,
        issues: [
          {
            si: [["!flag", "f_indice_3"]],
            texte:
              "Il fait glisser le paquet sous sa cuisse sans le regarder. Puis : la garnison de la vallée est partie vers l'est deux jours avant l'attaque, colonne entière, et elle n'est pas revenue. Un capitaine Vairon avait signé l'ordre de marche. « Du beau travail d'officier », dit-il.",
            effets: [
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_3" },
              { pnj_statut: { id: "PNJ-V1", valeur: "cite" } },
              { journal: "charretier_garnison" },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Sur les soldats, il a déjà tout dit. Il donne autre chose : le vieux poste au-dessus du layon n'a jamais été vidé. Le toit est tombé dedans, alors personne n'y monte.",
            effets: [{ debloque_point: "P06" }, { xp: 15 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Compter trois flèches dans sa main",
        cout: { segments: 1, objet: { "OBJ-02": 3 } },
        requiert: [["objet>=", "OBJ-02", 3]],
        sortie: true,
        issues: [
          {
            si: [["!flag", "f_indice_3"]],
            texte:
              "Il fait tourner les pointes contre l'ongle avant d'accepter. Puis : la garnison de la vallée est partie vers l'est deux jours avant l'attaque, colonne entière, et elle n'est pas revenue. L'ordre portait le nom d'un capitaine Vairon. Il rit : les officiers comptent mal.",
            effets: [
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_3" },
              { pnj_statut: { id: "PNJ-V1", valeur: "cite" } },
              { journal: "charretier_garnison" },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Il range les flèches dans sa botte. Sur les soldats, il a déjà tout dit. Il donne le vieux poste, au-dessus du layon : le toit est tombé dedans, alors personne n'y monte, alors rien n'en est sorti.",
            effets: [{ debloque_point: "P06" }, { xp: 15 }],
          },
        ],
      },
      {
        id: "N",
        libelle: "Le faire parler devant les autres hommes du camp",
        cout: { segments: 1 },
        apparait_si: [["competence", "C05"]],
        sortie: true,
        issues: [
          {
            si: [["!flag", "f_indice_3"]],
            texte:
              "On pose la question devant trois hommes qui l'écoutent. Il ne peut plus dire qu'il ne sait rien. La garnison de la vallée est partie vers l'est deux jours avant l'attaque, colonne entière, sur un ordre signé d'un capitaine Vairon. Elle n'est pas revenue.",
            effets: [
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_3" },
              { pnj_statut: { id: "PNJ-V1", valeur: "cite" } },
              { journal: "charretier_garnison" },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Devant les autres, il lâche autre chose : le vieux poste au-dessus du layon n'a jamais été vidé. Le toit est tombé dedans, alors personne n'y monte, alors rien n'en est sorti.",
            effets: [{ debloque_point: "P06" }, { xp: 15 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Décharger et recharger sa charrette jusqu'au soir",
        cout: { segments: 2 },
        apparait_si: [["!competence", "C05"]],
        sortie: true,
        issues: [
          {
            si: [["!flag", "f_indice_3"]],
            texte:
              "La charrette n'est pas vide : elle est pleine de choses qui ne valent rien. À la dernière caisse, il parle. La garnison de la vallée est partie vers l'est deux jours avant l'attaque, colonne entière, sur un ordre signé d'un capitaine Vairon. Elle n'est pas revenue.",
            effets: [
              { fatigue: 18 },
              { connaissance_sortilege: "+1" },
              { flag: "f_indice_3" },
              { pnj_statut: { id: "PNJ-V1", valeur: "cite" } },
              { journal: "charretier_garnison" },
              { xp: 25 },
            ],
          },
          {
            si: [],
            texte:
              "Il fait recommencer deux fois le même rang de caisses. À la nuit, il paye en paroles : le vieux poste au-dessus du layon n'a pas été vidé, le toit est tombé dedans, personne n'y monte.",
            effets: [{ fatigue: 18 }, { debloque_point: "P06" }, { xp: 15 }],
          },
        ],
      },
      {
        id: "E",
        libelle: "Le laisser sur son timon",
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Il ne rappelle pas. Il reste assis, dos à l'ouest, et regarde les mains du suivant.",
            effets: [{ xp: 5 }],
          },
        ],
      },
    ],
  },

  "ST-P05-04": {
    id: "ST-P05-04",
    titre_travail: "Camp — ce qui reste",
    lieu: { type: "point_interet", cible: "P05" },
    conditions: { requis: [["jour>=", 5]], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { compte: false, fouille: 0, aide: false },
    texte: {
      arrivee:
        "Il reste deux feux. Les bâches sont pliées, les piquets arrachés, et les trous sont encore là. La charrette est partie dans la nuit : les ornières sont fraîches et vont vers l'ouest. Un chien est resté assis à l'endroit exact où elle était. Le passage est libre : plus personne ne se tient dedans.",
      base:
        "Il reste un feu. Les trous de piquets se remplissent. Le chien n'a pas bougé de sa place.",
      variantes: [
        {
          si: [["stat_partie>=", "eau_partagee", 1]],
          ajout:
            "Une femme s'écarte pour laisser passer. À la source, quelqu'un a raconté qu'un chasseur avait donné son eau.",
        },
        {
          si: [["compagnons>=", 1]],
          ajout:
            "L'autre regarde les ornières fraîches, compte quelque chose dans sa tête, et ne le dit pas.",
        },
      ],
    },
    regles_locales: [{ si: [], alors: [{ flag: "f_camp_ferme" }] }],
    options: [
      {
        id: "A",
        libelle: "Lire les ornières et compter les départs",
        cout: { segments: 1 },
        apparait_si: [["!local", "compte"]],
        observation: true,
        issues: [
          {
            si: [],
            texte:
              "Trois attelages, tous vers l'ouest, tous dans la nuit. Les pieds nus, eux, sont montés vers le nord, en désordre, par petits paquets. Personne n'a repris la route basse. La hache n'a pas laissé de trace : elle est partie avec son homme.",
            effets: [{ local: "compte", "=": true }, { xp: 10 }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Plier ce qui reste des bâches avec eux",
        cout: { segments: 2 },
        issues: [
          {
            si: [["!local", "aide"]],
            texte:
              "On plie à deux, on charge sur des dos qui n'en peuvent plus. Ils laissent prendre les cordes et les piquets cassés : ça ne se porte pas si loin, disent-ils, et ils partent avec le reste.",
            effets: [
              { local: "aide", "=": true },
              { fatigue: 12 },
              { objet: "OBJ-13", quantite: 1 },
              { xp: 15 },
            ],
          },
          {
            si: [],
            texte:
              "Il n'y a plus grand-chose à plier. On tient une toile pendant qu'une vieille coupe les liens, et c'est fini avant d'avoir commencé.",
            effets: [{ fatigue: 8 }, { xp: 5 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Fouiller les trous de piquets et les cendres",
        cout: { segments: 1 },
        issues: [
          {
            si: [["local>=", "fouille", 2]],
            texte:
              "Les cendres sont froides jusqu'au fond. Des os de volaille, un soulier d'enfant sans semelle, et la terre retournée trois fois avant nous.",
            effets: [{ local: "fouille", "+=": 1 }, { fatigue: 5 }],
          },
          {
            probabilite: 60,
            reussite: true,
            si: [["local<=", "fouille", 1]],
            texte:
              "Sous une bâche roulée, oubliée ou laissée : un paquet de vivres sèches, serré dans du tissu, encore bon. Personne ne vient le réclamer.",
            effets: [
              { local: "fouille", "+=": 1 },
              { objet: "OBJ-15", quantite: 1 },
              { xp: 10 },
            ],
          },
          {
            probabilite: 40,
            si: [["local<=", "fouille", 1]],
            texte:
              "Rien que de la cendre, des arêtes de piquets et une chaussure d'enfant sans semelle, posée droite, comme si on avait pensé revenir la chercher.",
            effets: [{ local: "fouille", "+=": 1 }, { fatigue: 5 }, { xp: 5 }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Reprendre la piste de l'ouest",
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            si: [],
            texte:
              "Les ornières tiennent bien le pied, tant qu'elles sont fraîches. Derrière, le chien s'est levé et a suivi jusqu'aux aulnes, puis il est retourné s'asseoir à sa place.",
            effets: [
              { flag: "f_camp_ferme" },
              { journal: "camp_defait" },
              { xp: 20 },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  recrue_devant: "Un homme du camp a pris la tête de la marche, et la hache avec.",
  recrue_arriere: "Une femme du camp l'a suivi, trois pas en arrière, à regarder les bas-côtés.",
  camp_seul: "Il est ressorti du camp des fuyards comme il y était entré : seul.",
  charretier_garnison: "Un colporteur lui a vendu le départ de la garnison vers l'est, et le nom du capitaine Vairon.",
  camp_defait: "Le camp des fuyards s'était défait avant qu'il reparte.",
};
