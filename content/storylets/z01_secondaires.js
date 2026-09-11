import { p } from './_p';

// Scènes secondaires : la nuit, les retours, les échos. C'est ici que le
// rythme respire entre deux points tendus, et que le monde montre qu'il se
// souvient de ce qu'on a fait.
export const SECONDAIRES = {
  // --- Bivouac et bilan de fin de journée ------------------------------------
  'VDG-102': {
    id: 'VDG-102',
    titre_travail: 'Le bivouac — bilan de fin de journée',
    lieu: { type: 'declenche_uniquement' },
    unique: false,
    priorite: 9,
    poids: 10,
    etat_local_initial: { installe: false },
    texte: {
      base: p(
        'La nuit est tombée pour de bon. Il n’y a plus de crépuscule à cette saison : il y a une demi-heure de gris, et puis il n’y a plus rien.',
        'Vous cherchez un creux. Pas un abri — un creux : une place où le vent passe au-dessus, où le sol est sec, et d’où l’on voit venir par un seul côté.',
        'Vous vous asseyez, le dos contre la pente, et vous faites ce que font tous les hommes qui dorment dehors : vous refaites la journée dans l’ordre, en comptant ce qu’elle a coûté.'
      ),
      variantes: [
        {
          si: [{ meteo: 'pluie' }],
          ajout:
            'Il pleut, et la seule chose qui compte devient l’angle : trouver de quoi mettre le dos au sec, tant pis pour les jambes. Les jambes sèchent en marchant.',
        },
        {
          si: [{ meteo: 'froid' }],
          ajout:
            'Le froid est sec et il tombe droit. À cette température, un homme qui dort mal se réveille moins reposé qu’il ne s’est couché.',
        },
        {
          si: [{ objet: 'couverture', '>=': 1 }],
          ajout:
            'La couverture grise sent l’étable et le suint. Vous vous en enroulez une épaule et vous glissez le reste sous la hanche, ce qui vaut mieux que par-dessus : c’est le sol qui prend la chaleur, pas l’air.',
        },
        {
          si: [{ non: { objet: 'couverture', '>=': 1 } }],
          ajout:
            'Rien pour se couvrir. Vous ramassez des feuilles mortes à pleines brassées et vous vous en faites un matelas, puis un tas par-dessus les jambes. Ça marche mal et ça marche un peu.',
        },
        {
          registre: 'affame',
          ajout:
            'Le ventre travaille dans le noir, de manière continue et bête, et il vous empêche de fixer une pensée plus de quelques secondes.',
        },
        {
          si: [{ flag: 'a_compte' }],
          ajout:
            'Onze dans le pré. Quatre devant le char. Deux sur le seuil. Le chiffre revient tout seul dès qu’on arrête de penser à autre chose, et c’est la nuit qu’on arrête.',
        },
        {
          si: [{ flag: 'eau_partagee' }],
          ajout:
            'Vous repensez à l’outre, et vous n’arrivez pas à décider si c’était intelligent. Vous décidez que ce n’était pas la question.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Faire du feu, petit, et le tenir.',
        cout: { segments: 1, fatigue: 4 },
        apparait_si: [{ objet: 'amadou', '>=': 1 }],
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Un feu de la taille des deux mains, dans un trou de deux doigts de profond, avec un muret de trois pierres du côté du vent.',
              'C’est assez pour sécher, pas assez pour se voir à deux cents pas. Vous l’alimentez brindille par brindille pendant une heure, et vous dormez à côté des braises quand elles sont couvertes de cendre.',
              'Vous vous réveillez trois fois. La troisième, il fait gris et les merles ont commencé.'
            ),
            effets: [
              { local: 'installe', '=': true },
              { fatigue: -58 },
              { sante_heros: 6 },
              { faim: 8 },
              { usure: 'amadou', valeur: -12 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Dormir à froid, sans rien allumer.',
        cout: { segments: 1, fatigue: -18 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'couverture', '>=': 1 }],
            texte: p(
              'Pas de feu. C’est le choix d’un homme qui préfère avoir froid qu’être vu, et c’est le bon la plupart du temps.',
              'Vous dormez par tranches de deux heures, comme à la guerre, en vous réveillant à chaque changement de bruit. Vers le milieu de la nuit, un chevreuil aboie trois fois de l’autre côté du vallon et vous restez éveillé une heure pour rien.'
            ),
            effets: [{ fatigue: -46 }, { faim: 4 }, { xp: 3 }],
          },
          {
            probabilite: 100,
            texte: p(
              'Pas de feu, et rien sur le dos. Vous vous roulez en boule contre la pente, les mains sous les aisselles, les genoux remontés.',
              'Ça ne s’appelle pas dormir. Ça s’appelle attendre le jour en fermant les yeux par moments.',
              'Au matin, vous mettez un quart d’heure à pouvoir refermer complètement les doigts.'
            ),
            effets: [
              { fatigue: -26 },
              { faim: 6 },
              { sante_heros: -3 },
              { xp: 2 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Manger avant de dormir.',
        cout: { fatigue: 0 },
        epuisable: true,
        apparait_si: [
          { ou: [{ objet: 'viande_seche', '>=': 1 }, { objet: 'pain_dur', '>=': 1 }, { objet: 'racines', '>=': 1 }] },
        ],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'viande_seche', '>=': 1 }],
            texte: p(
              'Une lanière, coupée en trois, mâchée longtemps. Le sel donne soif et c’est le défaut de tout ce qui se garde.',
              'Vous en gardez deux morceaux pour demain. On mange toujours moins que ce qu’on a, sinon on n’a plus rien le jour où il faut.'
            ),
            effets: [{ retire_objet: 'viande_seche', quantite: 1 }, { faim: -18 }],
          },
          {
            probabilite: 100,
            texte: p(
              'Ce qu’il reste : du pain dur trempé dans l’eau de l’outre, ou des racines mâchées crues.',
              'Ça remplit la bouche, surtout. Mais le fait de mastiquer quelque chose avant de dormir change la nuit.'
            ),
            effets: [{ faim: -12 }, { retire_objet: 'pain_dur', quantite: 1 }],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Laisser venir le matin.',
        sortie: true,
        cout: { segments: 1 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Le jour se lève par le haut, comme toujours ici : la crête d’en face s’allume une demi-heure avant le fond.',
              'Vous êtes raide sur tout le côté droit. Vous vous levez en deux temps, vous pissez contre un arbre, et vous repartez.'
            ),
            effets: [{ xp: 2 }],
          },
        ],
      },
    ],
  },

  // --- La Ferme : ce qui reste à faire ---------------------------------------
  'VDG-202': {
    id: 'VDG-202',
    titre_travail: 'La Ferme — ce qui reste à faire',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P02' },
    unique: true,
    priorite: 9,
    poids: 10,
    conditions: { requis: [{ flag: 'logis_visite' }], interdit: [{ flag: 'abeline_enterre' }] },
    etat_local_initial: {},
    texte: {
      base: p(
        'Vous ressortez dans la cour et vous vous arrêtez au milieu, sans raison précise, en regardant le linge sur la corde.',
        'Il y a une chose à faire et vous le savez depuis que vous êtes entré dans le logis.',
        'Le sol de la cour est de la caillasse tassée : il faudrait une pioche et une demi-journée. Derrière la grange, en revanche, il y a le carré de pommes de terre, retourné le mois dernier, de la terre meuble sur deux pieds de profondeur.',
        'Il y a une bêche contre le mur du fournil. Elle est là où elle est toujours.'
      ),
      variantes: [
        {
          si: [{ flag: 'abeline_trouvee' }],
          ajout:
            'Elle vous regarde depuis la trappe, à mi-échelle, la tête à hauteur du sol. Elle ne dit rien et elle ne monte pas.',
        },
        {
          registre: 'epuise',
          ajout:
            'Vous avez les bras en coton et le dos qui tire depuis le layon. Une heure de bêche, dans cet état, c’est trois heures.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Prendre la bêche. Faire ce qu’il y a à faire.',
        cout: { segments: 2, fatigue: 18 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'La terre du carré est facile sur le premier pied et dure en dessous, avec des cailloux plats qu’il faut sortir à la main.',
              'Vous creusez pendant une heure et demie sans lever la tête. À un moment, vous vous apercevez que vous comptez les pelletées et vous arrêtez de compter.',
              'Le transporter est le pire. On ne porte pas quelqu’un qu’on a connu comme on porte une charge : on s’y prend mal, exprès, et ça prend plus de temps.',
              'Vous le mettez au fond, vous refermez, vous tassez au plat de la bêche. Vous ne mettez pas de pierre : une pierre dans un champ, ça se déplace.',
              'Vous restez debout un moment. Vous ne savez aucune prière. Vous dites qu’il était à table, parce que c’est vrai et qu’il n’y a rien d’autre.',
              'Puis vous rangez la bêche contre le mur du fournil, exactement là où elle était.'
            ),
            effets: [
              { flag: 'abeline_enterre' },
              { fatigue: 14 },
              { confiance: { pnj: 'abeline', valeur: 3 } },
              { reputation: { faction: 'couronne', valeur: 1 } },
              { sante_heros: -2 },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Laisser. Il y a plus urgent.',
        sortie: true,
        cout: {},
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous regardez la bêche contre le mur du fournil et vous passez devant.',
              'Vous avez raison : il y a plus urgent, la lumière baisse, et un homme mort n’attend rien de personne.',
              'Vous emportez quand même la cour avec vous pendant un bon bout de chemin.'
            ),
            effets: [{ flag: 'ferme_laissee' }],
          },
        ],
      },
    ],
  },

  // --- La Source : la meute --------------------------------------------------
  'VDG-302': {
    id: 'VDG-302',
    titre_travail: 'La Source — la meute',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P03' },
    unique: true,
    priorite: 9,
    poids: 10,
    conditions: { requis: [{ visite: 'VDG-Z01-P03', '>=': 1 }] },
    etat_local_initial: { compte: false, recule: false },
    texte: {
      base: p(
        'Vous arrivez au vallon par le pierrier, comme la première fois, et vous vous arrêtez à vingt pas de la dalle.',
        'Il y a des chiens à la source.',
        'Cinq. Ils boivent à tour de rôle, deux à la fois, pendant que les autres restent debout. Ce détail-là est celui qui compte : des chiens de ferme ne font pas ça. Des chiens de ferme boivent tous en même temps et se marchent dessus.',
        'Le plus grand est un molosse de troupeau, gris, avec un collier de cuir clouté encore au cou — un collier de chien à qui l’on donnait un nom. Il a maigri au point qu’on lui compte les côtes et il a du sang sec sur le poitrail, qui n’est pas le sien.',
        'Trois jours. Il a fallu trois jours pour qu’ils cessent d’être à quelqu’un.',
        'Le vent monte du ruisseau et va vers eux.'
      ),
      variantes: [
        {
          si: [{ local: 'compte', '=': true }],
          ajout:
            'Deux seulement tiennent vraiment debout : le gris et un fauve plus petit. Les trois autres suivent le mouvement à un temps de retard et regardent le gris avant de bouger.',
        },
        {
          si: [{ objet: 'lievre', '>=': 1 }],
          ajout: 'Le lièvre pend à votre ceinture. Ils l’ont senti avant de vous voir.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Les regarder avant de décider.',
        cout: { fatigue: 1 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous restez où vous êtes, les bras le long du corps, et vous prenez la meute par le détail.',
              'Le gris commande et il est le seul à vous avoir vu. Le fauve le regarde toutes les trois secondes. Les trois autres ont la queue basse et les oreilles mobiles : ils suivent, ils ne décident pas.',
              'Une meute qui a un chef et quatre suiveurs se défait si le chef renonce. Une meute de cinq égaux ne renonce jamais.',
              'Le gris ne grogne pas. Il a la gueule fermée et le poil couché. Un chien qui va charger montre les dents ; celui-là évalue.'
            ),
            effets: [{ local: 'compte', '=': true }, { xp: 8 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Jeter le lièvre sur la rive droite et reculer.',
        cout: { objet: 'lievre', quantite: 1, segments: 1, fatigue: 3 },
        sortie: true,
        apparait_si: [{ objet: 'lievre', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous décrochez le lièvre et vous le lancez par-dessus le bassin, sur la boue de la rive droite, aussi loin que le bras porte.',
              'Les quatre partent dessus. Le gris ne bouge pas : il vous regarde reculer, et il attend d’être seul à vous voir pour aller prendre sa part.',
              'Vous remontez le pierrier à reculons sur trente pas, puis vous vous retournez.',
              'C’était votre dîner. C’était aussi moins cher que le reste.'
            ),
            effets: [{ flag: 'meute_evitee' }, { xp: 10 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Tirer sur le gris.',
        cout: { objet: 'fleche', quantite: 1, fatigue: 4 },
        apparait_si: [{ objet: 'arc_de_chasse', '>=': 1 }],
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'compte', '=': true }, { usure: 'arc_de_chasse', '>=': 55 }],
            texte: p(
              'Vous savez où viser parce que vous avez regardé : pas la masse, le point derrière l’épaule, à la hauteur du coude.',
              'La flèche part et le gris tombe sur place, sans un bruit, les quatre pattes d’un coup.',
              'Les autres reculent d’un même mouvement. Le fauve avance de deux pas, s’arrête, regarde le gris par terre, et cherche quelqu’un à regarder.',
              'Il n’y a plus personne à regarder.',
              'Ils s’en vont par la rive gauche, en se retournant, et le dernier emporte un morceau de cresson dans la gueule sans savoir pourquoi.'
            ),
            effets: [
              { usure: 'arc_de_chasse', valeur: -3 },
              { flag: 'meute_dispersee' },
              { xp: 20 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous tirez sans avoir pris le temps de regarder, et la flèche prend le gris trop en arrière, dans le ventre.',
              'Il hurle. C’est un son que vous connaissez, celui d’un chien qu’on a blessé, et les quatre autres arrivent avant que vous ayez encoché la deuxième.',
              'Ils tournent. Vous reculez dans le pierrier en leur faisant face, le couteau dans la main gauche, et vous prenez deux morsures à l’avant-bras avant d’atteindre le gros bloc de calcaire où l’on ne peut vous prendre que de face.',
              'Ils abandonnent au bout d’un quart d’heure. Ils repartent vers la source, où le gris a fini de crier.'
            ),
            effets: [
              { usure: 'arc_de_chasse', valeur: -3 },
              { sante_heros: -11 },
              { etat: 'blesse_leger' },
              { fatigue: 12 },
              { flag: 'morsures' },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Remonter le pierrier sans leur tourner le dos.',
        sortie: true,
        cout: { segments: 1, fatigue: 5 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous reculez. Pas vite, pas droit : en biais, en gardant le buste de face et les mains visibles, un pas après l’autre, sur trente pas.',
              'Le gris vous suit du regard jusqu’au haut du pierrier et ne fait pas un mouvement.',
              'Vous n’aurez pas bu. La source est à eux ce soir, et ce sera peut-être à refaire demain.'
            ),
            effets: [{ flag: 'source_cedee' }, { xp: 6 }],
          },
        ],
      },
    ],
  },

  // --- Le Layon : l'écho ------------------------------------------------------
  'VDG-402': {
    id: 'VDG-402',
    titre_travail: 'Le Layon — ce qu’on retrouve',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P04' },
    unique: true,
    priorite: 9,
    poids: 10,
    conditions: { requis: [{ flag: 'sorti_du_layon' }, { visite: 'VDG-Z01-P04', '>=': 1 }] },
    etat_local_initial: {},
    texte: {
      base: p(
        'Le layon n’a pas changé. Les deux ornières, les souches, la marne jaune, la percée droite jusqu’au point où elle se ferme.',
        'Le chariot est toujours couché dans l’ornière de droite.'
      ),
      variantes: [
        {
          si: [{ flag: 'renn_abandonne' }],
          remplace: p(
            'Le layon n’a pas changé. Les deux ornières, les souches, la marne jaune.',
            'Le chariot est toujours couché dans l’ornière de droite, et l’essieu est toujours en travers de l’ornière.',
            'Il n’y a plus personne dessous.',
            'La marne est retournée sur trois pieds de large autour de l’essieu, en demi-cercle, par quelqu’un qui a gratté avec les mains. Il y a du sang dans la terre, pas beaucoup, et une chaussure restée dans le trou.',
            'Les traces qui repartent ne vont pas vers le camp. Elles vont vers le sud, vers la clairière de coupe, et elles sont doublées d’un deuxième jeu d’empreintes, plus larges, à côté.',
            'Vous restez un long moment à quarante pas, dans le châtaignier, à regarder une chaussure dans un trou.'
          ),
        },
        {
          si: [{ flag: 'renn_degage' }],
          ajout:
            'Il a été vidé de tout ce qui se porte. Le sel est resté : personne n’emporte du sel répandu. Il fait un tas blanc sur la marne et il fera un tas blanc jusqu’à la première grosse pluie.',
        },
        {
          si: [{ flag: 'layon_lu' }],
          ajout:
            'Le côté est du taillis s’est remis à parler. Deux mésanges, un troglodyte. Ce qui s’était tu la dernière fois n’est plus là.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Suivre les traces vers le sud.',
        cout: { segments: 1, fatigue: 6 },
        epuisable: true,
        apparait_si: [{ flag: 'renn_abandonne' }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous les suivez sur deux cents pas, jusqu’à l’entrée de la clairière de coupe.',
              'Là, elles se mélangent à beaucoup d’autres, et beaucoup d’autres veut dire une quinzaine, et la quinzaine est repartie vers l’ouest en colonne.',
              'Ce qui a été traîné jusque-là ne l’a pas été loin. Vous ne cherchez pas plus.',
              'Vous vous asseyez sur une souche au bord de la coupe et vous restez assis plus longtemps que vous ne l’auriez voulu.'
            ),
            effets: [
              { pnj_statut: { id: 'renn', valeur: 'mort' } },
              { flag: 'renn_mort' },
              { carnet: 'orcs_a_louest' },
              { fatigue: 4 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Reprendre ce qui reste dans le chariot.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'La caisse de quincaillerie a été retournée mais pas vidée : les clous ne valent rien pour qui marche vite.',
              'Vous prenez la lime, deux poignées de clous, et le reste de la toile écrue, qui fait des bandes propres une fois déchirée dans le sens du fil.',
              'Vous remplissez une poignée de sel dans un coin de toile noué. Le sel garde la viande, et la viande, c’est des jours.'
            ),
            effets: [
              { objet: 'bandes_toile', quantite: 2 },
              { objet: 'cuir_brut', quantite: 1 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Repartir.',
        sortie: true,
        cout: {},
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous remontez dans le couvert et vous laissez la percée derrière vous.',
              'Un chariot couché reste couché. Personne ne viendra le relever.'
            ),
            effets: [],
          },
        ],
      },
    ],
  },

  // --- Le Camp : la nuit ------------------------------------------------------
  'VDG-502': {
    id: 'VDG-502',
    titre_travail: 'Le Camp — la nuit sous la bâche',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P05' },
    unique: true,
    priorite: 10,
    poids: 10,
    conditions: { requis: [{ visite: 'VDG-Z01-P05', '>=': 1 }, { segment: [5, 6] }] },
    etat_local_initial: {},
    texte: {
      base: p(
        'Les feux sont couverts pour la nuit. Quarante et une personnes respirent dans le noir sous les charmes, et ça fait un bruit continu, bas, qu’on n’entend que quand on y prête attention.',
        'Sous la bâche, à l’écart, le blessé grave a changé de rythme.',
        'Vous ne le connaissez pas. C’est un homme du hameau du bas, la quarantaine, qu’on a porté sur cinq lieues à quatre sur une échelle de grenier.',
        'Il ne respire plus de la même façon depuis une heure : deux temps courts, un long, et un silence qui s’allonge à chaque fois.',
        'Une femme est assise à côté de lui. Elle ne fait rien. Elle est juste assise et elle lui tient le poignet, pas la main : le poignet, avec deux doigts, comme on prend un pouls.'
      ),
      variantes: [
        {
          si: [{ objet: 'onguent', '>=': 1 }],
          ajout:
            'Vous avez un pot d’onguent dans le sac. Il est bon pour ce qui se referme. Ce qui est sous cette bâche ne se referme pas.',
        },
        {
          si: [{ flag: 'garic_compagnon' }],
          ajout:
            'Garic est debout à dix pas, hors du cercle, dos tourné. Il ne dort pas et il ne s’approche pas.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'S’asseoir de l’autre côté et rester.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous asseyez en tailleur de l’autre côté de l’échelle de grenier. La femme ne lève pas les yeux et ne retire pas ses deux doigts.',
              'Ça dure une heure et demie.',
              'Vers le milieu, l’homme dit trois mots qui ne vont pas ensemble, sur un ton de conversation ordinaire, comme s’il répondait à quelqu’un. La femme lui répond « oui » sans changer de voix.',
              'Et puis les silences finissent par ne plus se refermer.',
              'Elle garde les doigts sur le poignet encore un long moment après. Ensuite elle les retire, elle rabat la bâche, et elle dit : « Il faudra le faire demain avant qu’il fasse chaud. »',
              'Elle se lève. Elle va se coucher contre les autres. Personne dans le camp ne s’est réveillé.'
            ),
            effets: [
              { flag: 'veillee' },
              { fatigue: 6 },
              { reputation: { faction: 'couronne', valeur: 1 } },
              { confiance: { pnj: 'garic', valeur: 1 } },
              { confiance: { pnj: 'perrine', valeur: 1 } },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Aller dormir.',
        sortie: true,
        cout: { segments: 1, fatigue: -12 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous couchez à la lisière du cercle, la tête sur le sac, le dos au couvert.',
              'Vous entendez la respiration sous la bâche depuis l’endroit où vous êtes. Deux temps courts, un long, un silence.',
              'À un moment, il n’y a plus que le silence, et vous mettez un long moment à être sûr que c’est bien ça.',
              'Personne ne se lève. Le camp dort. Il faut bien dormir.'
            ),
            effets: [{ fatigue: -40 }, { faim: 5 }, { xp: 4 }],
          },
        ],
      },
    ],
  },

  // --- Le Vieux Poste : dormir sous le toit qui reste ------------------------
  'VDG-602': {
    id: 'VDG-602',
    titre_travail: 'Le Vieux Poste — la pluie sur les moellons',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P06' },
    unique: true,
    priorite: 9,
    poids: 10,
    conditions: {
      requis: [{ visite: 'VDG-Z01-P06', '>=': 1 }, { ou: [{ meteo: 'pluie' }, { segment: [5, 6] }] }],
    },
    etat_local_initial: {},
    texte: {
      base: p(
        'Le côté ouest de la salle est sec, et c’est pour ça que le coffre y était.',
        'Vous vous installez dans l’angle, sous les quatre pieds de plancher qui tiennent encore, avec le mur dans le dos et la porte basse dans le champ de vision. Le sureau fait un rideau devant l’archère nord.',
        'La pluie tape sur les moellons à l’extérieur et sur le plâtre à l’intérieur, avec deux sons différents, et il finit par y avoir une sorte d’ordre là-dedans.',
        'Les pigeons se sont rangés sur les poutres et ils ne bougent plus. Ils ont dû faire ça huit cents fois.'
      ),
      variantes: [
        {
          si: [{ non: { meteo: 'pluie' } }],
          remplace: p(
            'La nuit prend la salle par le côté effondré. Le carré de ciel au-dessus des poutres passe du gris au bleu noir, puis il y a des étoiles dedans, ce qui est absurde dans une pièce.',
            'Vous vous installez dans l’angle ouest, le mur dans le dos, la porte basse dans le champ de vision.',
            'Les pigeons se sont rangés sur les poutres. On les entend se déplacer d’un pas de temps en temps.'
          ),
        },
        {
          si: [{ flag: 'ordre_lu' }],
          ajout:
            'Le feuillet est dans votre poche de poitrine. Vous le sortez deux fois dans la soirée pour regarder les deux traits sous la signature, et vous ne comprenez pas davantage la deuxième fois.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Dormir ici.',
        cout: { segments: 1 },
        sortie: true,
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Quatre murs, un toit à moitié, et personne qui puisse entrer autrement que par une porte où il faut se baisser. C’est la meilleure nuit que vous passerez cette semaine et vous le savez en vous couchant.',
              'Vous dormez d’une traite. Ça ne vous était pas arrivé depuis avant-hier.',
              'Au matin, le sureau est plein de gouttes et il y a un merle dedans qui vous fait sursauter.'
            ),
            effets: [
              { fatigue: -62 },
              { sante_heros: 10 },
              { faim: 8 },
              { flag: 'nuit_au_poste' },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Repartir malgré tout.',
        sortie: true,
        cout: { segments: 1, fatigue: 8 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous ressortez par la porte basse. La pente est trempée et le sentier de moutons est devenu une rigole.',
              'Quatre murs et un demi-toit, et vous partez. Il y a des raisons. Vous vous les récitez pendant le premier quart d’heure, puis vous arrêtez.'
            ),
            effets: [{ fatigue: 6 }],
          },
        ],
      },
    ],
  },

  // --- Rencontre de zone : les corbeaux --------------------------------------
  'VDG-700': {
    id: 'VDG-700',
    titre_travail: 'Les corbeaux',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    unique: true,
    priorite: 8,
    poids: 3,
    conditions: { requis: [{ flag: 'carte_ouverte' }] },
    etat_local_initial: {},
    texte: {
      base: p(
        'Les corbeaux vous préviennent avant que vous ne voyiez quoi que ce soit.',
        'Ils sont une douzaine, dans un frêne mort, et ils ne partent pas quand vous approchez — ils montent de deux branches et attendent. Un corbeau qui ne s’envole pas est un corbeau qui a quelque chose à garder.',
        'C’est à quinze pas du sentier, dans les fougères. Un homme, à plat ventre, avec un ballot encore sanglé sur le dos.',
        'Il courait dans le bon sens : vers l’ouest.',
        'Le ballot n’a pas été ouvert.'
      ),
      variantes: [
        {
          si: [{ flag: 'indice_rien_pris' }],
          ajout:
            'Ce détail-là ne vous surprend plus. C’est ce qui est inquiétant : il a cessé de vous surprendre en une seule journée.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Ouvrir le ballot.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Deux couvertures, une écuelle d’étain, un couteau de table, un rouleau de corde neuve, et un sac de pain de seigle pour quatre jours.',
              'Tout ce qu’un homme prend quand il a eu dix minutes pour choisir, et rien de ce qu’il faut vraiment.',
              'Vous prenez ce qui sert. Vous laissez l’écuelle.',
              'Les corbeaux descendent d’une branche pendant que vous refermez.'
            ),
            effets: [
              { objet: 'corde', quantite: 1, usure: 85, prefixe: 'neuf' },
              { objet: 'pain_dur', quantite: 2 },
              { objet: 'couverture', quantite: 1, usure: 60 },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Regarder comment il est tombé.',
        cout: { fatigue: 2 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Par-derrière, entre les omoplates, de haut en bas. Il a été pris en pleine course par quelque chose de lourd lancé depuis une hauteur.',
              'Vous remontez ses traces sur quarante pas. Il venait de la vallée, il a quitté le sentier pour couper, et il a traversé une clairière.',
              'La clairière a un talus.',
              'Vous n’allez pas voir sur le talus. Vous contournez très largement, et vous mettez une demi-heure de plus.'
            ),
            effets: [{ flag: 'talus_evite' }, { fatigue: 3 }, { xp: 10 }],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Passer au large.',
        sortie: true,
        cout: { segments: 1 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous reprenez le sentier et vous ne vous arrêtez pas.',
              'Derrière vous, les corbeaux redescendent branche par branche, sans se presser, comme des gens qui reprennent une conversation interrompue.'
            ),
            effets: [{ xp: 3 }],
          },
        ],
      },
    ],
  },
};
