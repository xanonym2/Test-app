import { p } from './_p';

// Vignettes de trajet (§5.5). Aller d'un point à l'autre n'est jamais
// instantané : on traverse quelque chose, et ça coûte.
const vignette = (id, cible, titre, texte, variantes = [], effets = []) => ({
  id,
  titre_travail: titre,
  lieu: { type: 'voyage', cible },
  unique: false,
  priorite: 5,
  poids: 10,
  etat_local_initial: {},
  texte: { base: texte, variantes },
  options: [
    {
      id: 'S',
      libelle: 'Continuer.',
      sortie: true,
      cout: {},
      issues: [{ probabilite: 100, texte: '', effets }],
    },
  ],
});

const VARIANTES_COMMUNES = [
  {
    registre: 'epuise',
    ajout:
      'Vous marchez en regardant trois pas devant vous et pas plus loin. C’est comme ça qu’on se fait surprendre, et c’est tout ce que les jambes acceptent.',
  },
  {
    registre: 'affame',
    ajout:
      'Vous vous arrêtez deux fois pour arracher des feuilles d’oseille sauvage le long du talus. C’est acide, ça ne nourrit pas, et vous en mâchez quand même.',
  },
  {
    si: [{ meteo: 'pluie' }],
    ajout:
      'Il pleut. Au bout d’un quart d’heure, l’eau passe au col et descend entre les omoplates, et c’est à ce moment-là qu’on cesse d’y penser.',
  },
  {
    si: [{ segment: [6] }],
    ajout:
      'Il fait nuit. Vous avancez à l’oreille et au souvenir, une main tendue à hauteur de visage pour les branches.',
  },
  {
    si: [{ surcharge: true }],
    ajout:
      'Les sangles travaillent à chaque pas et vous changez d’épaule tous les cent mètres. Vous regardez vos pieds au lieu de regarder devant.',
  },
  {
    si: [{ flag: 'derobe_ruisseau' }],
    ajout:
      'Vous avez encore les jambes froides jusqu’aux genoux. Le cuir des chaussures ne sèche pas en marchant, il sèche en craquant, plus tard, et plus dur.',
  },
  {
    si: [{ flag: 'nuit_au_poste' }],
    ajout:
      'Vous marchez mieux que les jours précédents. Une nuit entière sous un demi-toit, et le corps s’en souvient pendant des heures.',
  },
  {
    si: [{ flag: 'renn_abandonne' }, { non: { flag: 'renn_mort' } }],
    ajout:
      'Le bras droit qui bouge lentement, à intervalles réguliers. Ça revient dans les montées, quand la tête n’a rien d’autre à faire.',
  },
];

export const VOYAGES = {
  'VOY-P01': vignette(
    'VOY-P01',
    'VDG-Z01-P01',
    'Trajet — vers la crête',
    p(
      'La montée vers la crête se fait par la pierraille, en zigzag, dans des éboulis de calcaire qui roulent sous le pied à chaque pas et qu’on finit par prendre en biais.',
      'Le genévrier rampant accroche les chevilles. Plus haut, il n’y a plus que la fétuque grise, couchée, et le vent qui prend l’oreille du même côté pendant toute la montée.'
    ),
    VARIANTES_COMMUNES
  ),
  'VOY-P02': vignette(
    'VOY-P02',
    'VDG-Z01-P02',
    'Trajet — vers la ferme haute',
    p(
      'Le chemin de la ferme suit les terrasses, entre deux murets de pierre sèche montés à la main par des gens morts depuis longtemps. Les pierres du haut ont été remises en place chaque printemps ; on voit lesquelles.',
      'Il y a des mûres sur tout le parcours, encore rouges pour la plupart. Vous en mangez deux ou trois en passant, sans vous arrêter, par vieille habitude de ce chemin-là.'
    ),
    [
      ...VARIANTES_COMMUNES,
      {
        si: [{ flag: 'chevres_liberees' }],
        ajout:
          'Trois des chèvres ont pris le chemin avant vous. Elles broutent le talus à cent pas de la ferme et elles ne vous suivent pas.',
      },
    ]
  ),
  'VOY-P03': vignette(
    'VOY-P03',
    'VDG-Z01-P03',
    'Trajet — vers le vallon',
    p(
      'La descente au vallon passe par un pierrier puis par le couvert. Le changement est net : la lumière tombe d’un coup, la température aussi, et l’air devient épais et vert.',
      'Les aulnes annoncent l’eau bien avant qu’on l’entende. Ils ne poussent nulle part ailleurs et c’est pour ça qu’un chasseur les connaît.'
    ),
    [
      ...VARIANTES_COMMUNES,
      {
        si: [{ non: { outre_pleine: true } }],
        ajout: 'L’outre vide bat la hanche à contretemps. On l’entend, une outre vide.',
      },
    ]
  ),
  'VOY-P04': vignette(
    'VOY-P04',
    'VDG-Z01-P04',
    'Trajet — vers le layon',
    p(
      'Pour rejoindre le layon, il faut traverser une coupe de taillis de trois ans : des rejets de châtaignier à hauteur de poitrine, serrés, qu’on écarte à l’avant-bras et qui se referment derrière.',
      'On n’y voit rien à dix pas et on y fait un bruit continu de froissement. C’est le genre d’endroit qu’on traverse vite et qu’on n’aime pas.'
    ),
    VARIANTES_COMMUNES
  ),
  'VOY-P05': vignette(
    'VOY-P05',
    'VDG-Z01-P05',
    'Trajet — vers le repli',
    p(
      'Deux heures en longeant le couvert, sans jamais en sortir, sur un versant qui monte doucement vers le nord-ouest.',
      'À mi-chemin, on croise un chemin de vaches abandonné : deux ornières parallèles et de l’herbe entre les deux, comme partout où plus rien ne passe.',
      'La fumée des feux bas se sent une demi-lieue avant le repli, quand le vent la rabat. De loin, ça sent la maison.'
    ),
    [
      ...VARIANTES_COMMUNES,
      {
        si: [{ flag: 'renn_compagnon' }],
        ajout:
          'Renn marche à la béquille et il parle sans arrêt, de la route, des péages, du prix du sel à Trois-Gués. Vous comprenez au bout d’une heure qu’il parle pour ne pas compter ses pas.',
      },
    ]
  ),
  'VOY-P06': vignette(
    'VOY-P06',
    'VDG-Z01-P06',
    'Trajet — vers le vieux poste',
    p(
      'L’épaule est se monte par un sentier de moutons qui n’a pas servi depuis des années. Il est encore là : un sentier ne disparaît pas, il maigrit.',
      'Le dernier tiers est à découvert, sur l’arête, et on y est visible de toute la vallée pendant un quart d’heure. Il n’y a pas d’autre passage.'
    ),
    VARIANTES_COMMUNES
  ),
};

// --- Conséquence différée qui ne se déclenche pas (§5.8) --------------------
// Même quand rien n'arrive, l'événement différé a son moment à lui.
export const DIFFERES = {
  'VDG-DIF-01': {
    id: 'VDG-DIF-01',
    titre_travail: 'Ce qui n’est pas venu',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 11,
    poids: 1,
    etat_local_initial: {},
    texte: {
      base: p(
        'Vous vous arrêtez au milieu du sous-bois, sans raison, la main sur une tige de châtaignier.',
        'Depuis que vous avez traversé le layon à découvert, vous marchez en écoutant derrière vous. Pas consciemment : vous vous en apercevez maintenant, parce que vous venez de vous arrêter pour la troisième fois en une heure.',
        'Vous remontez de cinquante pas sur vos propres traces et vous regardez le sol.',
        'Vos empreintes, en sens inverse. Une fouine. Rien d’autre.',
        'Personne ne vous suit. Vous restez quand même là un long moment, à regarder un chemin vide, et quand vous repartez, vous continuez d’écouter.'
      ),
    },
    options: [
      {
        id: 'S',
        libelle: 'Repartir.',
        sortie: true,
        cout: { fatigue: 2 },
        issues: [{ probabilite: 100, texte: '', effets: [{ xp: 4 }] }],
      },
    ],
  },
};

// --- Sortie de zone ---------------------------------------------------------
export const SORTIE = {
  'VDG-900': {
    id: 'VDG-900',
    titre_travail: 'Vers l’ouest',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P07' },
    unique: true,
    priorite: 9,
    poids: 1,
    etat_local_initial: {},
    texte: {
      base: p(
        'Vous arrivez au replat, là où la route sort du bois en trois lacets avant la brèche.',
        'D’ici, la vallée est derrière et en dessous. La fumée ne monte plus : elle stagne au fond, à plat, comme de l’eau sale dans une bassine, et elle y restera trois jours.',
        'Devant, l’ouest. La route descend, s’amenuise, et disparaît dans un pays que vous ne connaissez que par ce qu’on en dit : trois jours jusqu’au premier comptoir, six jusqu’à la première ville, et entre les deux, rien qui vous appartienne.',
        'Vous avez un arc, un couteau, une outre, et ce que vous avez ramassé en deux jours sur les hauteurs d’un village qui n’existe plus.',
        'Vous vous retournez une fois. On se retourne toujours une fois.',
        'Puis vous prenez le premier lacet.'
      ),
      variantes: [
        {
          si: [{ flag: 'garic_compagnon' }],
          ajout:
            'Garic monte le replat trente pas derrière vous et il s’arrête à la même hauteur, du même côté, comme s’il y avait une place pour ça.',
        },
        {
          si: [{ flag: 'renn_compagnon' }],
          ajout:
            'Renn est assis sur la borne du replat, la jambe droite allongée, et il attend que vous ayez fini de regarder en arrière. Il ne dit rien. Il connaît la route et il sait combien de fois on se retourne.',
        },
        {
          si: [{ flag: 'indice_ouest' }, { flag: 'indice_rien_pris' }, { flag: 'indice_garnison' }],
          ajout:
            'Trois choses tournent dans votre tête depuis hier et refusent de se mettre en ligne. Ils sont venus beaucoup trop loin à l’ouest. Ils n’ont rien pris. Et quarante hommes sont partis vers l’est six jours avant, sur un ordre signé de deux traits.',
        },
        {
          si: [{ flag: 'renn_mort' }],
          ajout:
            'Une chaussure dans un trou, au milieu d’un layon droit. Vous emportez ça aussi, et ça ne pèse rien du tout, ce qui est le problème.',
        },
        {
          si: [{ flag: 'abeline_enterre' }],
          ajout:
            'Vous avez rangé la bêche exactement là où elle était. Vous ne savez pas pourquoi c’est ce détail-là qui vous revient ici, au replat, devant trois jours de route.',
        },
        {
          si: [{ flag: 'ferme_laissee' }],
          ajout:
            'Il y a une bêche contre un mur de fournil, à deux heures d’ici, et un homme sur le sol d’une cuisine. Vous aviez raison : il y avait plus urgent. Vous emportez la cour avec vous quand même.',
        },
        {
          si: [{ flag: 'corde_refaite' }],
          ajout:
            'L’arc est bon. Corde neuve, torons réguliers, départ sec. C’est peu de chose et c’est la seule chose sur laquelle vous puissiez compter à cette heure-ci.',
        },
        {
          si: [{ flag: 'corde_fatiguee' }, { non: { flag: 'corde_refaite' } }],
          ajout:
            'La corde peluche toujours à une paume de l’encoche haute. Vous vous étiez dit : ce soir. Il y a eu des soirs depuis.',
        },
        {
          si: [{ flag: 'souffle' }],
          ajout:
            'Les pieds dans le sable froid, la tête renversée, une poule d’eau qui revient et ne s’en va pas. Vous vous accrochez à ce quart d’heure-là comme à une preuve.',
        },
        {
          si: [{ flag: 'chevres_liberees' }],
          ajout:
            'Quelque part derrière vous, six chèvres descendent un talus en mangeant tout ce qu’elles trouvent. C’est complètement dérisoire. Vous y repensez et ça tient chaud.',
        },
      ],
    },
    options: [
      {
        id: 'S',
        libelle: 'Prendre la route.',
        sortie: true,
        cout: { segments: 1 },
        issues: [
          {
            probabilite: 100,
            texte: p('— Fin du MVP —'),
            effets: [{ flag: 'fin_mvp' }, { acte: 2 }, { xp: 20 }],
          },
        ],
      },
    ],
  },
};
