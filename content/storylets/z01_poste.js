import { p } from './_p';

export const POSTE = {
  // ---------------------------------------------------------------------------
  'VDG-601': {
    id: 'VDG-601',
    options_persistantes: true,
    titre_travail: 'Le Vieux Poste — équipement, usure, portage',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P06' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { bas: false, haut: false, ratelier: false, repare: false, pese: false },
    texte: {
      arrivee: p(
        'La tour tient encore parce qu’elle a été bâtie carrée et courte : quatre murs de moellons hourdés à la chaux, trois toises de haut, une porte basse au nord et deux archères par face.',
        'Le toit est tombé d’un seul côté, l’est, et les poutres du plancher haut pendent dans le vide. Un sureau a poussé dans l’angle sud-ouest, dedans, et il est plus vieux que la paix.',
        'La salle du bas sent le renard et le salpêtre. Le sol est couvert de fientes, de plumes de pigeon, de plâtre tombé, et d’une couche de feuilles que le vent a poussées par la porte pendant huit ans.',
        'Contre le mur ouest, un râtelier d’armes est toujours en place, à cinq logements, vide. Quelqu’un a compté en partant.',
        'Sous le râtelier, en revanche, il y a un coffre de troupe. Il a été laissé ouvert, le couvercle rabattu contre le mur. Ce qu’il y avait dedans a été trié : ce qui valait quelque chose est parti, ce qui ne valait rien est resté.',
        'Ce qui ne valait rien pour une compagnie en marche vaut beaucoup pour un homme qui n’a qu’un arc.'
      ),
      base: p(
        'La tour, le sureau dans l’angle, le râtelier vide, le coffre ouvert sous le râtelier. Les pigeons rentrent par le côté effondré et repartent quand vous bougez.'
      ),
      variantes: [
        {
          si: [{ local: 'haut', '=': true }],
          ajout:
            'De la plate-forme, tout à l’heure, vous avez vu le versant jusqu’au col. Ça change la façon dont on regarde une pièce : on sait où elle est.',
        },
        {
          si: [{ surcharge: true }],
          ajout:
            'Vous portez trop. Ça ne se voit pas, ça s’entend : les sangles travaillent à chaque pas, le souffle se prend deux fois plus haut, et vous posez le pied à plat au lieu de le dérouler. Un homme chargé comme ça ne court pas. Il choisit de ne pas avoir à courir.',
        },
        {
          si: [{ usure: 'arc_de_chasse', '<=': 40 }],
          ajout:
            'L’arc accroche au départ. Vous le sentez dans la paume avant de l’entendre — un temps mort entre le lâcher et le claquement, comme si la corde décidait.',
        },
        {
          si: [{ meteo: 'pluie' }],
          ajout:
            'La pluie entre par le côté effondré et fait une flaque au milieu de la salle. Le reste est sec. On comprend pourquoi le coffre est du côté ouest.',
        },
        {
          registre: 'blesse',
          ajout:
            'Il faut se baisser pour passer la porte, et se baisser coûte, maintenant. Vous le faites en deux temps, une main au montant.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Vider le coffre de troupe.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous videz le coffre par terre et vous faites deux tas, celui qui part et celui qui reste, comme on vous l’a appris.',
              'Une veste de cuir bouilli, cousue double aux épaules, tachée au flanc gauche d’une auréole brune qui a traversé. Elle a une entaille de trois doigts sous l’aisselle droite, recousue au gros fil par quelqu’un qui n’était pas tailleur.',
              'Une paire de brassards cloutés, réglementaires, lanières trop longues d’un cran.',
              'Onze flèches de troupe dans un carquois de toile. Les hampes sont plus lourdes que les vôtres et les empennes sont mangées aux mites sur trois d’entre elles.',
              'Deux jetons de plomb frappés d’une tour.',
              'Et, roulé au fond, un feuillet plié en quatre selon le pliage militaire, que personne n’a jugé utile d’emporter.'
            ),
            effets: [
              { local: 'bas', '=': true },
              { objet: 'veste_cuir', quantite: 1, usure: 50, suffixe: 'de récupération' },
              { objet: 'brassards', quantite: 1, usure: 62 },
              { objet: 'fleche', quantite: 8, usure: 55 },
              { objet: 'jeton_garnison', quantite: 1 },
              { objet: 'lettre_pliee', quantite: 1 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Déplier le feuillet.',
        cout: { fatigue: 1 },
        epuisable: true,
        apparait_si: [{ objet: 'lettre_pliee', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Le papier est épais, plié en quatre, et il s’ouvre en craquant aux pliures.',
              'Vous lisez mal. Vous lisez quand même : on vous a appris les chiffres et les noms de lieux à l’armée, parce qu’un homme qui ne sait pas lire un ordre de marche se perd.',
              'C’est un état de mouvement. Une colonne de dates, une colonne de lieux, une colonne de nombres. La dernière ligne est plus fraîche que les autres, écrite d’une autre main, plus penchée.',
              'Vous reconnaissez le mot « gué », le mot « est », et un nombre : quarante.',
              'En bas à droite, une signature, et sous la signature deux traits.',
              'Vous ne savez pas lire la signature. Vous savez maintenant qu’un capitaine signe avec deux traits dessous.'
            ),
            effets: [{ flag: 'ordre_lu' }, { carnet: 'garnison_est' }, { xp: 10 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Monter sur ce qui reste du plancher haut.',
        cout: { segments: 1, fatigue: 6 },
        epuisable: true,
        issues: [
          {
            probabilite: 70,
            condition_texte: [{ stat: 'adresse', '>=': 4 }],
            texte: p(
              'L’échelle a disparu. Il reste la saignée des marches dans le mur nord, un boulin sur deux, et les poutres du plancher haut qui tiennent encore du côté ouest.',
              'Vous montez par les boulins, trois points d’appui à chaque instant, en testant chaque pierre du pied avant d’y mettre le poids. Deux se descellent. Vous les sentez venir.',
              'En haut, il reste quatre pieds de plancher le long du mur ouest, et l’arase.',
              'On voit loin. Le versant nord jusqu’au vallon, le layon comme un trait, le repli du camp — trois fils de fumée que personne ne verra depuis la vallée mais que vous, vous voyez.',
              'Et à l’ouest, la montée du col : la route qui sort du bois en trois lacets, le replat, et la brèche entre les deux sommets. C’est par là qu’on sort.',
              'Vous restez un moment à regarder ça. On respire mieux en hauteur, c’est une chose connue et fausse, et qui marche quand même.'
            ),
            effets: [
              { local: 'haut', '=': true },
              { carnet: 'route_ouest' },
              { carnet: 'col_ouest' },
              { flag: 'col_repere' },
              { decouvre: 'VDG-Z01-P07' },
              { decouvre: 'VDG-Z01-P05' },
              { xp: 14 },
            ],
          },
          {
            probabilite: 30,
            texte: p(
              'Vous montez par les boulins, trois points d’appui à chaque instant.',
              'Au quatrième, la pierre part. Pas sous la main : sous le pied, ce qui est pire. Vous faites toute la hauteur d’un coup et vous atterrissez sur le tas de feuilles et de plâtre, sur le côté, l’épaule la première.',
              'Vous restez sans air un moment. Les pigeons ressortent tous ensemble par le toit effondré, ce qui fait un bruit énorme dans une salle de pierre.',
              'Rien de cassé. L’épaule va être noire demain et le bras gauche ne monte plus au-dessus de l’horizontale.',
              'La tour fait trois toises. Elle en fera trois toises demain aussi.'
            ),
            effets: [
              { sante_heros: -7 },
              { etat: 'blesse_leger' },
              { fatigue: 6 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Remettre l’équipement en état avec ce que vous avez.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        apparait_si: [
          { ou: [{ objet: 'cuir_brut', '>=': 1 }, { objet: 'pierre_aiguiser', '>=': 1 }] },
        ],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'cuir_brut', '>=': 1 }, { objet: 'pierre_aiguiser', '>=': 1 }],
            texte: p(
              'Vous vous asseyez sur le coffre retourné, dos au mur ouest, là où il fait sec, et vous y passez l’heure qu’il faut.',
              'La couture sous l’aisselle de la veste, d’abord : vous découdez le gros fil de l’autre et vous refaites une couture à plat, en sellier, avec une lanière de cuir brut refendue à la largeur du petit doigt. C’est plus long et ça ne lâchera pas.',
              'Les lanières des brassards, raccourcies d’un cran, brûlées au bout pour qu’elles ne s’effilochent pas.',
              'La lame ensuite, sur la pierre creuse, à l’eau, en poussant toujours dans le même sens. Le son change quand c’est fini : il devient plus clair et plus court.',
              'Vous passez le pouce en travers du fil, à plat, jamais dans le sens. Il accroche la corne.',
              'Le matériel ne parle pas. Il fait juste moins de bruit quand il va bien.'
            ),
            effets: [
              { retire_objet: 'cuir_brut', quantite: 1 },
              { usure: 'veste_cuir', valeur: 25 },
              { usure: 'brassards', valeur: 15 },
              { usure: 'couteau_depouille', valeur: 20 },
              { usure: 'hachette', valeur: 15 },
              { usure: 'pierre_aiguiser', valeur: -15 },
              { local: 'repare', '=': true },
              { xp: 12 },
            ],
          },
          {
            probabilite: 100,
            condition_texte: [{ objet: 'pierre_aiguiser', '>=': 1 }],
            texte: p(
              'Vous vous asseyez sur le coffre retourné et vous sortez la pierre creuse.',
              'À l’eau, en poussant toujours dans le même sens, vingt passes par face. Le son change quand c’est fini : plus clair, plus court.',
              'Le fil accroche la corne du pouce. Ça, c’est fait.',
              'Pour le cuir, il faudrait des lanières, et vous n’en avez pas.'
            ),
            effets: [
              { usure: 'couteau_depouille', valeur: 20 },
              { usure: 'hachette', valeur: 15 },
              { usure: 'pierre_aiguiser', valeur: -10 },
              { local: 'repare', '=': true },
              { xp: 6 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous refendez une lanière de cuir brut au couteau et vous reprenez ce qui lâche : la couture de l’aisselle, les lanières trop longues, la sangle du carquois qui a commencé à se déchirer au niveau de l’œillet.',
              'Vous travaillez au jugé, sans pierre pour finir les bords. Ça tiendra, et ça se verra que ça a été fait à la main dans une tour.'
            ),
            effets: [
              { retire_objet: 'cuir_brut', quantite: 1 },
              { usure: 'veste_cuir', valeur: 18 },
              { usure: 'brassards', valeur: 12 },
              { local: 'repare', '=': true },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Tout charger et faire trente pas dehors.',
        cout: { segments: 1, fatigue: 5 },
        epuisable: true,
        apparait_si: [{ local: 'bas', '=': true }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ surcharge: true }],
            texte: p(
              'Vous passez tout : la veste, les brassards, les deux carquois, la corde en bandoulière, le reste réparti comme vous pouvez.',
              'Debout, ça va. Ça va toujours debout.',
              'Vous sortez et vous remontez le talus jusqu’au sureau, trente pas, pas plus.',
              'Au dixième, la sangle du carquois vous scie l’épaule droite et vous changez de côté. Au vingtième, vous vous apercevez que vous ne regardez plus que vos pieds. Au trentième, vous êtes essoufflé, et vous n’avez fait que trente pas sur une pente que vous montiez en sifflant à quinze ans.',
              'Vous vous retournez pour redescendre, et le poids vous emmène d’un demi-pas de trop.',
              'Il va falloir choisir. Un homme qui porte tout ce qu’il trouve arrive quelque part très bien équipé et incapable de s’en servir.'
            ),
            effets: [
              { local: 'pese', '=': true },
              { fatigue: 6 },
              { flag: 'lecon_portage' },
              { xp: 8 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous passez tout, vous sortez, et vous remontez le talus jusqu’au sureau.',
              'Trente pas. Le souffle tient, les sangles ne travaillent pas, et vous arrivez en haut en regardant devant vous et non vos pieds.',
              'Vous redescendez en retenant l’allure au lieu de la subir. C’est à ça qu’on mesure une charge : pas à ce qu’on soulève, à ce qu’on peut encore arrêter.'
            ),
            effets: [
              { local: 'pese', '=': true },
              { fatigue: 2 },
              { flag: 'lecon_portage' },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter le poste.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous sortez par la porte basse, en vous baissant, et le jour de dehors vous paraît violent pendant quelques secondes.',
              'Derrière vous, la salle retombe au silence des pigeons. Le râtelier est toujours vide et il le restera.'
            ),
            effets: [],
          },
        ],
      },
    ],
  },
};
