import { p } from './_p';

export const CAMP = {
  // ---------------------------------------------------------------------------
  'VDG-501': {
    id: 'VDG-501',
    options_persistantes: true,
    titre_travail: 'Le Camp des fuyards — information sociale, recrutement',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P05' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      tour: false,
      garic: false,
      perrine: false,
      vairon: false,
      partage: false,
    },
    texte: {
      arrivee: p(
        'Le repli est une combe étroite entre deux épaulements, fermée au nord par une barre de rochers, avec un couvert de charmes assez haut pour que la fumée se dilue avant de sortir. C’est un bon endroit. Personne ne l’a choisi : ils se sont arrêtés là parce que c’est là que les jambes se sont arrêtées.',
        'Ils sont trente-cinq, peut-être quarante. Trois feux bas, entretenus comme il faut, avec du bois mort fendu fin.',
        'La première chose qui frappe, c’est le silence. Pas un silence de peur — un silence de gens qui n’ont rien à se dire. Un enfant pleure quelque part sur la gauche, régulièrement, sans conviction, et personne ne va le voir.',
        'La deuxième chose, c’est ce qu’ils portent. Une femme a une pendule sous le bras, en bois verni, avec le balancier qui pend. Un vieux tient une cage à oiseaux vide. Deux autres ont des couvertures, des vraies, et des chaussures. On emporte ce qu’on a dans la main quand la main décide.',
        'Personne ne vous demande rien en arrivant. Trois ou quatre lèvent la tête, vous identifient comme n’étant pas une menace, et retournent au feu.',
        'Vous reconnaissez quatre visages sur quarante. Vous n’êtes pas sûr des noms.'
      ),
      base: p(
        'Le camp, dans le repli. Trois feux bas sous les charmes, des gens assis, et le bruit de fond que font quarante personnes qui ne parlent pas.'
      ),
      variantes: [
        {
          si: [{ flag: 'renn_compagnon' }],
          tour: 0,
          ajout:
            'Renn entre devant vous, à la béquille, et trois personnes se lèvent d’un coup. On le connaît ici : c’est lui qui monte le sel deux fois par mois. Il serre des mains en s’appuyant sur votre épaule et il vous présente à chacune, ce dont vous n’aviez pas besoin et qui change tout.',
        },
        {
          si: [{ flag: 'abeline_trouvee' }],
          ajout:
            'La femme à la pendule vous demande, sans préambule, si vous êtes passé par la ferme haute. Vous dites qu’Abeline est vivante. Elle répète le mot à la cantonade, deux fois, et quelqu’un d’autre le répète plus loin.',
        },
        {
          si: [{ local: 'garic', '=': true }],
          ajout:
            'Le sergent est resté à l’écart du feu, adossé au rocher, l’épée courte posée à plat sur les cuisses. Il n’y touche pas. Il la garde là comme on garde un chien qu’on n’aime plus.',
        },
        {
          si: [{ local: 'partage', '=': true }],
          ajout:
            'Depuis que vous avez posé ce que vous portiez près du feu du milieu, deux femmes vous parlent sans que vous ayez rien demandé.',
        },
        {
          registre: 'affame',
          ajout:
            'Il y a une marmite sur le feu du milieu et ça sent l’orge. Vous vous entendez évaluer la quantité et le nombre de parts, et vous vous arrêtez sur cette pensée avec dégoût.',
        },
        {
          si: [{ segment: [6] }],
          ajout:
            'La nuit est complète. Les feux sont réduits à des braises couvertes de cendre, exprès. Des gens sont couchés partout, à même la terre, par grappes, pour la chaleur.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Faire le tour des feux. Regarder qui est là.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous faites le tour lentement, sans vous arrêter longtemps nulle part, et vous comptez comme vous comptez toujours.',
              'Quarante et un. Dix-neuf femmes, quatorze enfants ou vieillards, huit hommes en état de marcher vite. Aucun cheval. Deux chiens.',
              'Un seul blessé grave, sous une bâche, qu’on a porté sur cinq lieues et qui ne passera pas la nuit.',
              'Ils viennent de trois endroits différents : le village, le hameau du bas, et une famille de la route du comptoir. Les trois groupes ne se mélangent pas. Ils sont autour de trois feux et il y a trois feux pour cette raison-là.',
              'Personne ne parle de partir. Ils sont assis depuis assez longtemps pour que s’asseoir soit devenu la décision.'
            ),
            effets: [{ local: 'tour', '=': true }, { flag: 'camp_evalue' }, { xp: 8 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Aller voir l’homme adossé au rocher.',
        cout: { fatigue: 2 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Il vous regarde venir de loin et il ne se lève pas.',
              'Cuir clouté sous la casaque, les brassards réglementaires, les lanières trop longues d’un cran. La quarantaine, une barbe de huit jours exactement, et cette façon de s’asseoir dos au rocher qui n’est pas du confort.',
              '« Garic », il dit. « Sergent. »',
              'Il attend de voir si vous allez demander « de quelle compagnie », et vous ne demandez pas, parce que vous savez ce que ça coûte à un homme de répondre « d’aucune » deux fois dans la même journée.',
              'Ça, il le remarque.',
              '« Vous avez servi », il dit. Ce n’est pas une question. « La façon dont vous êtes entré dans le camp. Vous avez regardé les sorties avant les gens. »'
            ),
            effets: [
              { local: 'garic', '=': true },
              { pnj_statut: { id: 'garic', valeur: 'vivant_allie' } },
              { confiance: { pnj: 'garic', valeur: 1 } },
              { carnet: 'garic' },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Lui demander ce qu’il fait ici, seul.',
        cout: { fatigue: 2 },
        epuisable: true,
        apparait_si: [{ local: 'garic', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Il met du temps. Il ramasse une brindille, la casse en morceaux réguliers, et il jette les morceaux un par un.',
              '« On était quarante à la garnison du bas. Le poste de la vallée, celui du gué. »',
              '« Il y a six jours, on a reçu l’ordre de redescendre vers l’est. Tout le monde. Relève de la ligne du fleuve, trois compagnies à réarticuler, on connaît. On a plié en une nuit et on est partis à l’aube. »',
              '« Moi j’avais la jambe. » Il montre son mollet, sans intérêt. « Une saleté d’abcès. Le chirurgien m’a laissé au village avec deux autres, le temps que ça perce. »',
              '« Les deux autres étaient en bas ce matin. »',
              'Il casse le dernier morceau de brindille.',
              '« Quarante hommes à trois heures d’ici. Ils ont marché vers l’est pendant six jours pendant que ça montait par l’est. » Il a un mouvement d’épaule qui ne veut rien dire. « C’est comme ça que c’est commandé. Ça a toujours été comme ça que c’est commandé. »'
            ),
            effets: [
              { local: 'vairon', '=': true },
              { flag: 'indice_garnison' },
              { carnet: 'garnison_est' },
              { confiance: { pnj: 'garic', valeur: 2 } },
              { xp: 14 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Écouter la jeune fille qui récite au feu de droite.',
        cout: { fatigue: 1 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Elle a seize ans, un tablier de comptoir sous une couverture d’homme, et elle parle depuis un moment à deux femmes qui ne l’écoutent plus.',
              'Elle ne raconte pas : elle récite. Les heures, les noms, l’ordre exact des choses. C’est ce qu’elle sait faire — elle tenait les registres du comptoir de la route basse, elle dit, et son maître disait qu’elle avait une tête à ne rien perdre.',
              '« Perrine », elle dit quand vous vous asseyez. Et elle recommence depuis le début, pour vous, parce que quelqu’un écoute.',
              'Le chariot de sel qui n’est pas arrivé avant-hier. Le passage de la colonne, jeudi, vers l’est, avec les mulets et les deux chariots de la solde. Le nom du sergent qui a signé le reçu du fourrage : Brial. Le nom du capitaine sur l’ordre de mouvement, parce qu’elle a recopié l’en-tête : Vairon.',
              '« Capitaine Vairon », elle répète, contente d’avoir le nom juste. « Avec deux traits sous le nom, c’est comme ça qu’on fait pour un capitaine. »',
              'Puis elle passe à la liste des chevaux du comptoir, par couleur.'
            ),
            effets: [
              { local: 'perrine', '=': true },
              { pnj_statut: { id: 'perrine', valeur: 'vivant_allie' } },
              { carnet: 'perrine' },
              { carnet: 'vairon' },
              { flag: 'nom_vairon' },
              { confiance: { pnj: 'perrine', valeur: 2 } },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Poser ce que vous portez près du feu du milieu.',
        cout: { segments: 0 },
        epuisable: true,
        apparait_si: [
          { ou: [{ objet: 'viande_seche', '>=': 2 }, { objet: 'racines', '>=': 2 }, { objet: 'lievre', '>=': 1 }] },
        ],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous posez ce que vous avez sur la pierre plate qui sert de table, à côté de la marmite, sans rien dire et sans attendre qu’on vous remercie — c’est la seule façon de le faire sans humilier personne.',
              'Une femme met la main dessus et commence à découper en parts égales avant même de lever les yeux. Elle compte quarante et une parts. Elle le fait vite et bien, et vous comprenez qu’elle le fait depuis ce matin avec tout ce qui arrive.',
              'Elle vous en tend une. Vous la refusez. Elle la repose sur la pierre sans insister et elle dit : « Alors elle sera là si vous revenez. »',
              'Le camp vous regarde autrement pendant l’heure qui suit.'
            ),
            effets: [
              { retire_objet: 'viande_seche', quantite: 2 },
              { local: 'partage', '=': true },
              { flag: 'a_partage_camp' },
              { reputation: { faction: 'couronne', valeur: 2 } },
              { confiance: { pnj: 'garic', valeur: 1 } },
              { confiance: { pnj: 'perrine', valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Dire à Garic ce que vous comptez faire, et attendre.',
        cout: { fatigue: 2 },
        epuisable: true,
        apparait_si: [{ local: 'garic', '=': true }, { confiance: 'garic', '>=': 3 }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ stat: 'sang_froid', '>=': 4 }],
            texte: p(
              'Vous ne lui proposez pas de venir. Vous lui dites ce que vous allez faire, dans l’ordre, avec les heures : le col avant les premiers froids, la route haute et pas la route basse, et ce qu’il faudra d’eau pour quarante personnes sur deux jours.',
              'Il écoute sans interrompre. À un moment il vous corrige sur une distance et il a raison.',
              'Quand vous avez fini, il reste un silence, et puis il ramasse l’épée courte sur ses cuisses et il se met debout.',
              '« Vous avez compté les hommes en état de marcher ? »',
              '« Huit. »',
              '« Neuf », il dit.'
            ),
            effets: [
              { flag: 'garic_compagnon' },
              { confiance: { pnj: 'garic', valeur: 3 } },
              { carnet: 'col_ouest' },
              { xp: 18 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous lui dites ce que vous comptez faire. Ça sort moins bien que dans votre tête : il y a des trous dans l’ordre des choses, et vous entendez vous-même les trous en parlant.',
              'Il écoute jusqu’au bout, ce qui est une politesse.',
              '« Peut-être », il dit. « Revenez me dire ça quand vous saurez par où. »',
              'Il repose l’épée à plat sur ses cuisses.'
            ),
            effets: [{ confiance: { pnj: 'garic', valeur: 1 } }, { xp: 5 }],
          },
        ],
      },
      {
        id: 'G',
        libelle: 'Demander si quelqu’un a vu vos frères.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        apparait_si: [{ ou: [{ carnet: 'mathieu' }, { carnet: 'joe' }] }],
        issues: [
          {
            probabilite: 60,
            texte: p(
              'Vous faites les trois feux. Vous donnez les deux noms à chaque fois, dans le même ordre, et vous ajoutez « le forgeron » pour le second parce que tout le monde connaît la forge.',
              'On vous répond avec beaucoup de douceur et aucune information. Une femme dit qu’elle a vu « quelqu’un de la forge » courir vers le haut du village. Elle ne peut pas dire qui, ni à quelle heure, et à la troisième question elle n’est plus sûre d’avoir vu quoi que ce soit.',
              'Un homme dit que le Bas-Pré a été pris en premier et qu’il n’y a pas eu d’avertissement. Il le dit trois fois. C’est la seule chose qu’il dit de la soirée.',
              'Vous notez ce que vous avez, c’est-à-dire presque rien, et vous vous apercevez que vous avez la main qui tremble en écrivant.'
            ),
            effets: [{ carnet: 'mathieu' }, { carnet: 'joe' }, { fatigue: 4 }, { xp: 6 }],
          },
          {
            probabilite: 40,
            texte: p(
              'Au deuxième feu, un garçon de treize ans lève la tête au nom de Mathieu.',
              '« Il a ouvert la forge », il dit. « Il a ouvert la porte en grand et il est resté sur le seuil avec le maillet. »',
              'Vous lui demandez ce qui s’est passé ensuite. Il dit qu’il courait, qu’il ne s’est pas retourné, et qu’il est désolé. Il le répète plusieurs fois, qu’il est désolé, et sa mère le prend contre elle.',
              'La forge est en haut du village. Le haut du village ne brûlait pas quand vous avez regardé de la crête.'
            ),
            effets: [
              { carnet: 'mathieu' },
              { flag: 'piste_mathieu' },
              { fatigue: 3 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter le camp.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ flag: 'garic_compagnon' }],
            texte: p(
              'Garic passe la bandoulière de son épée et dit deux mots à un homme du feu de gauche, qui hoche la tête sans enthousiasme.',
              'Vous sortez du repli par le haut. Derrière vous, les trois feux sont trois points orange dans le noir des charmes, et ils sont encore trop nombreux pour un camp qui veut qu’on l’oublie.',
              'Vous le direz demain. Ce soir, ils ont froid.'
            ),
            effets: [{ flag: 'camp_quitte' }, { decouvre: 'VDG-Z01-P07' }, { carnet: 'col_ouest' }],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous sortez du repli par le haut, entre les deux épaulements.',
              'Personne ne vous demande où vous allez. C’est la deuxième fois aujourd’hui que quarante personnes vous regardent partir sans rien dire, et vous commencez à comprendre ce que ça veut dire : ils attendent que quelqu’un décide, et ils ne sont plus sûrs que ce soit encore possible.'
            ),
            effets: [{ flag: 'camp_quitte' }, { decouvre: 'VDG-Z01-P07' }, { carnet: 'col_ouest' }],
          },
        ],
      },
    ],
  },
};
