import { p } from './_p';

export const PROLOGUE = {
  // ---------------------------------------------------------------------------
  'PRO-001': {
    id: 'PRO-001',
    titre_travail: 'L’affût',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 10,
    poids: 1,
    duree_segments: 0,
    etat_local_initial: { sorti: false, decale: false, pierre: false, observe: 0 },
    texte: {
      arrivee: p(
        'Le lièvre est sorti trois fois depuis l’aube, et trois fois il est rentré.',
        'Vous êtes à plat ventre derrière un genévrier, sur la pente sèche qui domine la coulée. Le sol sent la résine chauffée et la pierre. Sous votre coude gauche, une racine de buis vous entre dans l’os depuis assez longtemps pour que vous ayez cessé d’y penser.',
        'En bas, le taillis : noisetiers serrés, trois trembles plus hauts que le reste, et la trouée d’herbe rase où la coulée débouche. C’est là qu’il sort. Toujours au même endroit, à deux pas du couvert, l’oreille droite tournée vers la pente.',
        'Le vent vient de trois quarts, du col. Il vous prend l’épaule et file vers le bas. Tant qu’il tient, le lièvre ne vous sent pas. Il tombera vers midi, comme tous les jours de cette semaine.',
        'L’arc est en travers de vos avant-bras, flèche encochée, corde relâchée. Neuf flèches. Vous en avez laissé une avant-hier dans les ronces, et vous ne l’avez pas cherchée longtemps.'
      ),
      base: p(
        'Le genévrier vous couvre toujours. En bas, la trouée est vide, l’herbe couchée du même côté qu’il y a une heure.',
        'Le vent tient.'
      ),
      variantes: [
        {
          si: [{ meteo: 'vent' }],
          ajout:
            'Les trembles bougent trop. Par rafales comme celles-là, un animal n’entend plus rien et ne se fie qu’à son nez — ce qui joue pour vous, tant que ça souffle du col.',
        },
        {
          si: [{ meteo: 'brume' }],
          ajout:
            'La brume est montée du fond en une demi-heure. Elle efface les trembles et laisse la trouée, comme une pièce éclairée dans une maison sombre.',
        },
        {
          si: [{ local: 'decale', '=': true }],
          ajout:
            'De votre nouvelle place, vous voyez l’entrée de la coulée en entier, et le petit tas de crottes noires à l’endroit où il s’arrête. Vingt pas de moins. C’est toute la différence.',
        },
        {
          si: [{ local: 'pierre', '=': true }],
          ajout:
            'Le bois s’est tu quand la pierre a roulé. Il reprend, mais pas au même volume : le rouge-gorge s’est déplacé de deux arbres et chante plus court.',
        },
        {
          si: [{ local: 'observe', '>=': 1 }],
          ajout:
            'Tout est en place. Les mésanges travaillent le noisetier, une pie descend vers le fond, un pic tape par intervalles réguliers sur du bois mort. Un bois qui parle autant est un bois où rien n’est entré.',
        },
        {
          si: [{ local: 'sorti', '=': true }],
          remplace: p(
            'Il est là.',
            'Sorti sans bruit, à l’endroit exact. Le pelage d’été, roux cendré, une oreille pliée par une vieille déchirure. Il se met sur les pattes arrière, tient la pose le temps de trois respirations, puis se remet à quatre pattes et commence à tondre l’herbe rase.',
            'Vous avez le temps de bander. Pas celui de faire deux gestes.'
          ),
        },
      ],
    },
    regles_locales: [
      {
        si: [{ local: 'observe', '>=': 2 }],
        alors: [{ local: 'lecture_fine', '=': true }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Attendre. Ne rien faire d’autre.',
        cout: { fatigue: 2 },
        apparait_si: [{ non: { local: 'sorti', '=': true } }],
        issues: [
          {
            probabilite: 55,
            condition_texte: [{ local: 'decale', '=': true }],
            texte: p(
              'Un quart d’heure. Le soleil monte d’un doigt au-dessus des trembles et la pente commence à chauffer dans votre dos.',
              'Puis l’herbe bouge à l’entrée de la coulée, et il sort.'
            ),
            effets: [{ local: 'sorti', '=': true }],
          },
          {
            probabilite: 35,
            texte: p(
              'Un quart d’heure. Le soleil monte d’un doigt au-dessus des trembles et la pente commence à chauffer dans votre dos.',
              'Puis l’herbe bouge à l’entrée de la coulée, et il sort.'
            ),
            effets: [{ local: 'sorti', '=': true }],
          },
          {
            probabilite: 45,
            texte: p(
              'Rien. Une couleuvre passe à trois pas de votre main, décide que vous n’êtes pas un problème, et continue vers la pierraille.',
              'Vous changez de coude. La racine de buis a fini par laisser une marque.'
            ),
            effets: [{ fatigue: 1 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Descendre de vingt pas, garder le vent sur l’épaule.',
        cout: { fatigue: 3 },
        epuisable: true,
        apparait_si: [
          { non: { local: 'decale', '=': true } },
          { non: { local: 'sorti', '=': true } },
        ],
        issues: [
          {
            probabilite: 70,
            texte: p(
              'Vous descendez sur les avant-bras et la pointe des pieds, en posant chaque main avant d’y mettre du poids. Le genévrier suivant est plus maigre mais il est bien placé, juste au-dessus du coude que fait la coulée.',
              'Rien n’a bougé en bas. Le vent tient toujours sa direction.'
            ),
            effets: [{ local: 'decale', '=': true }, { xp: 2 }],
          },
          {
            probabilite: 30,
            texte: p(
              'À mi-chemin, une pierre plate part sous votre genou et descend la pente en trois rebonds secs.',
              'Le bois s’arrête net. Ça ne dure pas — deux, trois secondes — mais dans ce silence-là, vous entendez votre propre souffle et vous le trouvez trop fort.',
              'Vous finissez la descente. Le poste est meilleur. Le bois, lui, a retenu quelque chose.'
            ),
            effets: [
              { local: 'decale', '=': true },
              { local: 'pierre', '=': true },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Regarder le bois, pas la trouée.',
        cout: { fatigue: 1 },
        apparait_si: [{ local: 'observe', '<=': 1 }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'observe', '=': 0 }],
            texte: p(
              'Vous décollez les yeux de l’herbe rase et vous prenez le reste, lentement, par bandes horizontales, comme on lit.',
              'Mésanges dans le noisetier, en bande, qui travaillent les branches basses sans se presser. Un pic quelque part à droite, sur du bois mort — le son est creux. Une pie descend vers le fond du vallon en trois vols courts. À la lisière, une coulée de chevreuil croise la vôtre, fraîche de la nuit, deux doigts de profondeur dans la terre meuble.',
              'Rien ne manque.'
            ),
            effets: [{ local: 'observe', '=': 1 }, { xp: 2 }],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous reprenez le même balayage, mais plus lentement, et cette fois vous vous arrêtez sur ce qui ne bouge pas.',
              'Le tremble du milieu a perdu son écorce sur une hauteur d’homme, côté sud : un cerf s’y est frotté au printemps et le bois a séché gris. Sous le noisetier le plus épais, il y a un creux d’herbe couchée, de la taille d’un chien, avec des poils clairs pris dans les tiges.',
              'Le vent, lui, a commencé à hésiter. Pas encore à tourner. À hésiter.'
            ),
            effets: [{ local: 'observe', '=': 2 }, { fatigue: 1 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Bander et lâcher.',
        cout: { objet: 'fleche', quantite: 1 },
        apparait_si: [{ local: 'sorti', '=': true }],
        issues: [
          {
            probabilite: 80,
            condition_texte: [{ local: 'decale', '=': true }],
            texte: p(
              'Vous montez la corde jusqu’à la commissure. L’arc gémit une fois, court, dans le bois de la poignée. Vous ne visez pas : vous regardez l’endroit où il sera quand la flèche y arrivera.',
              'Le départ claque. Le lièvre fait un bond vertical, retombe sur le flanc, et ne recommence pas.',
              'Vous restez immobile encore dix secondes, par habitude, avant de vous lever. Un homme qui se lève tout de suite après son tir finit par en rater beaucoup.'
            ),
            effets: [
              { objet: 'lievre', quantite: 1 },
              { usure: 'arc_de_chasse', valeur: -2 },
              { xp: 8 },
              { flag: 'chasse_du_jour' },
            ],
          },
          {
            probabilite: 55,
            texte: p(
              'Vous montez la corde jusqu’à la commissure. La distance est un peu longue, et vous le savez avant même de lâcher.',
              'Le départ claque. Le lièvre est déjà parti quand la flèche arrive — elle passe derrière lui et se plante dans la terre au pied des noisetiers.',
              'Il ne ressortira pas aujourd’hui.'
            ),
            effets: [{ usure: 'arc_de_chasse', valeur: -2 }, { local: 'sorti', '=': false }, { xp: 2 }],
          },
          {
            probabilite: 45,
            texte: p(
              'Vous montez la corde, vous laissez filer, et la flèche part bas.',
              'Elle le prend en arrière des côtes. Il part quand même, en ligne, vers le taillis — vous le suivez à la trace sur trente pas, des gouttes rondes et espacées sur les feuilles mortes, puis plus rien.',
              'Vous cherchez un quart d’heure. Il faut savoir s’arrêter. Vous récupérez la flèche, pliée juste sous la pointe, et vous ne la remettez pas au carquois.'
            ),
            effets: [{ fatigue: 4 }, { xp: 3 }, { flag: 'tir_manque_prologue' }],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Décrocher. Reprendre le sentier vers le bas.',
        sortie: true,
        cout: { segments: 1 },
        declenche: 'PRO-002',
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous roulez sur le dos, vous détendez les jambes une par une, et vous restez une seconde à regarder le ciel entre les branches du genévrier.',
              'Puis vous vous levez, vous décrochez la corde de l’encoche haute pour ne pas la fatiguer, et vous reprenez le sentier.'
            ),
            effets: [],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'PRO-002': {
    id: 'PRO-002',
    titre_travail: 'La descente',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 10,
    poids: 1,
    etat_local_initial: { assis: false, regarde: false },
    texte: {
      arrivee: p(
        'Le sentier descend en lacets sous les hêtres, dans cette lumière verte et sale de fin de matinée qui fait paraître tout le monde malade.',
        'À mi-pente il sort du couvert, et la vallée s’ouvre d’un coup, en entier.',
        'Val-de-Garde tient dans le creux, de biais, le long du ruisseau. Soixante toits de bardeau gris, la tache plus claire du pré communal, la ligne de peupliers qui marque la route. Neuf cheminées fument : celles qui cuisent. Les autres attendront ce soir.',
        'On entend la forge. De là-haut, ce n’est pas un bruit de marteau, c’est un bruit de temps qui passe : trois coups, une pause, trois coups. Mathieu redresse un soc. Il fait ça depuis le printemps parce que le nôtre a mordu une pierre et qu’il refuse d’admettre qu’il est fini.',
        'Plus bas, dans le Bas-Pré, six silhouettes avancent en échelons. Joé est la deuxième en partant de la gauche — il fauche large et il se relève trop souvent, et il vous dira ce soir que son dos le tient, et vous lui direz qu’il fauche mal.'
      ),
      base: p(
        'Le sentier continue de descendre. Les hêtres s’espacent, les premiers murets de pierre sèche apparaissent, et la forge bat toujours son rythme de trois.'
      ),
      variantes: [
        {
          si: [{ objet: 'lievre', '>=': 1 }],
          ajout:
            'Le lièvre pend à votre ceinture et vous tape la cuisse à chaque pas. Vous le passerez à Mathieu en arrivant : il le videra proprement, il le fait mieux que vous, et il ne manquera pas de le dire.',
        },
        {
          si: [{ flag: 'tir_manque_prologue' }],
          ajout:
            'Vous redescendez les mains vides, ce qui arrive. Il reste des lanières dans le coffre et, de toute façon, le lièvre sera là demain.',
        },
        {
          si: [{ local: 'assis', '=': true }],
          ajout:
            'Vous êtes resté assis plus longtemps que prévu sur le muret. C’est ce qu’on fait quand il n’y a rien qui presse, et il n’y a rien qui presse.',
        },
        {
          registre: 'affame',
          ajout:
            'Vous pensez au pain. Pas à un pain précis : à l’idée du pain, qui prend de la place depuis une heure et qui en prend de plus en plus.',
        },
        {
          si: [{ meteo: 'pluie' }],
          ajout:
            'Il tombe une pluie fine qui ne mouille pas tout de suite et qui finit par tout traverser. En bas, personne n’a quitté le pré : on ne s’arrête pas de faucher pour ça.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'S’asseoir sur le muret. Manger un morceau.',
        cout: { fatigue: -6 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous asseyez sur le muret de la parcelle haute, dos à la pente, les jambes dans le vide du côté de la vallée. La pierre a gardé le soleil de la matinée.',
              'Vous sortez une lanière de viande séchée et vous la mâchez longtemps, parce qu’il n’y a pas d’autre façon de la manger.',
              'En bas, la faux de Joé accroche quelque chose et il s’arrête pour l’affûter. Le son du fil sur la pierre monte jusqu’ici, fin, régulier. Quelqu’un rit dans le pré, on ne sait pas pourquoi.',
              'Vous restez assis un moment de plus qu’il n’en faut.'
            ),
            effets: [
              { fatigue: -4 },
              { faim: -12 },
              { local: 'assis', '=': true },
              { carnet: 'joe' },
              { flag: 'matin_ordinaire' },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Regarder le village en détail, comme on compte un troupeau.',
        cout: { fatigue: 1 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vieille habitude, mauvaise habitude. Vous comptez.',
              'Neuf cheminées. Six faucheurs au Bas-Pré, deux femmes qui ramassent derrière. Le char à foin est sorti, timon en l’air, devant chez Sarre. Les chèvres sont sur la pente d’en face, donc c’est le petit des Mardier qui les garde ce matin, et il est assis au lieu d’être debout.',
              'La route est vide dans les deux sens. Elle l’est presque toujours : le comptoir est à trois jours, et ce qui monte jusqu’ici monte deux fois par mois.',
              'Rien ne cloche. Vous vous en rendez compte à l’instant où vous cherchez quelque chose qui cloche, et vous vous trouvez ridicule.'
            ),
            effets: [
              { local: 'regarde', '=': true },
              { carnet: 'val_de_garde' },
              { xp: 3 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Vérifier la corde de l’arc avant de rentrer.',
        cout: { fatigue: 1 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ usure: 'arc_de_chasse', '<=': 65 }],
            texte: p(
              'Vous passez le pouce sur la corde, du milieu vers les encoches, et vous sentez ce que vous cherchiez : deux endroits où le boyau a peluché, à une paume de l’encoche haute.',
              'Elle tiendra encore. Elle siffle un peu au départ, et c’est le genre de détail qui finit par coûter une bête.',
              'Il y a un écheveau de boyau à la maison. Ce soir.'
            ),
            effets: [{ flag: 'corde_fatiguee' }, { xp: 2 }],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous passez le pouce sur la corde, du milieu vers les encoches. Elle est sèche, régulière, sans peluche. Le lissage à la cire de la semaine dernière tient bien.',
              'Vous la décrochez quand même de l’encoche haute pour la fin de la descente. Un arc qu’on laisse bandé toute la journée devient un arc mou, et un arc mou ne pardonne rien.'
            ),
            effets: [{ usure: 'arc_de_chasse', valeur: 3 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Rentrer.',
        sortie: true,
        cout: { segments: 1 },
        declenche: 'PRO-003',
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous reprenez la descente. Encore deux lacets, le passage étroit entre les deux blocs, et ensuite c’est le chemin creux jusqu’aux premières maisons.',
              'Vous connaissez ce chemin à ne pas avoir besoin de le regarder.'
            ),
            effets: [{ carnet: 'mathieu' }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  'PRO-003': {
    id: 'PRO-003',
    titre_travail: 'Ce qui monte de la vallée',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 10,
    poids: 1,
    etat_local_initial: {},
    texte: {
      arrivee: p(
        'Vous vous arrêtez parce que l’odeur a changé.',
        'De la fumée, à cette heure, il y en a toujours. Mais celle qu’on respire ici n’est pas du hêtre ni du chêne. Elle est grasse, elle pique au fond de la gorge, et il y a dedans de la paille, de la laine mouillée et quelque chose d’autre que vous avez déjà senti une fois, il y a huit ans, et que vous n’avez jamais nommé.',
        'Vous faites trois pas de côté pour sortir du couvert.',
        'Ce ne sont pas neuf colonnes de cheminée. C’est une seule masse, épaisse, brune par en dessous, qui monte tout droit sur cinquante pieds avant que le vent du col ne la couche vers l’est. Elle vient du bas du village, du côté du moulin, et elle est déjà plus large que le village.',
        'La forge s’est tue.',
        'Vous ne l’aviez pas remarqué. Vous ne savez pas depuis combien de temps.'
      ),
      base: p('La fumée monte toujours. Elle ne fait que grossir.'),
    },
    options: [
      {
        id: 'A',
        libelle: 'Descendre en courant par le chemin creux.',
        cout: { segments: 1, fatigue: 14 },
        sortie: true,
        declenche: 'VDG-101',
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous courez. L’arc dans la main gauche, le carquois qui bat, les pieds qui trouvent seuls les bonnes pierres parce qu’ils les connaissent.',
              'Le chemin creux vous prend entre ses deux talus et vous rend sourd — il n’y a plus que votre souffle et le raclement de vos semelles. Vous en sortez à cent pas des premières maisons, et vous vous jetez derrière le muret sans avoir décidé de le faire.',
              'La grange des Mardier brûle par le toit. Devant, dans la ruelle, il y en a quatre qui remontent vers le haut du village, en file, sans se presser du tout. Des plaques de cuir lacées, des armes à deux mains portées sur l’épaule. Le dernier tient une hampe noire, droite, sans étoffe au bout.',
              'Ils ne fouillent pas les maisons. Ils passent devant les portes ouvertes.',
              'Vous restez derrière ce muret le temps qu’ils tournent. Puis vous reculez, à quatre pattes d’abord, et vous remontez vers le bois par la haie, en vous détestant à chaque pas.'
            ),
            effets: [
              { fatigue: 10 },
              { flag: 'vu_de_pres' },
              { carnet: 'enseigne' },
              { carnet: 'val_de_garde' },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Remonter sur la crête. Voir avant de descendre.',
        cout: { segments: 1, fatigue: 6 },
        sortie: true,
        declenche: 'VDG-101',
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous remontez. C’est ce qu’on vous a appris à faire il y a huit ans et ce que vous n’avez jamais eu à faire depuis : gagner de la hauteur avant de décider quoi que ce soit.',
              'Vos jambes savent le chemin. Votre tête, elle, tourne à vide et répète les mêmes deux noms dans le désordre.'
            ),
            effets: [{ flag: 'monte_directement' }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Couper par le bois, sous le couvert, jusqu’au-dessus du village.',
        cout: { segments: 2, fatigue: 9 },
        sortie: true,
        declenche: 'VDG-101',
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous quittez le sentier et vous entrez dans le taillis, là où personne ne passe parce que c’est plus long.',
              'Vous mettez une heure à faire ce qui en prend un quart. Les ronces prennent la manche, une branche de noisetier vous ouvre la joue, et vous continuez sans vous arrêter.',
              'À mi-parcours, vous traversez la coulée du haut — celle par où descendent les chevreuils. Elle est défoncée. Pas par des sabots : par des pieds, larges, ferrés, qui ont marché en file et dans le même sens. La terre est retournée jusqu’au fond humide, et les bords ne se sont pas encore effondrés.',
              'Ça date de ce matin. Et ça descendait vers la vallée par l’est.'
            ),
            effets: [
              { fatigue: 4 },
              { sante_heros: -1 },
              { flag: 'trace_est' },
              { xp: 8 },
            ],
          },
        ],
      },
    ],
  },
};
