// Storylets de zone : ils se déclenchent partout, selon l'état du héros.
// Priorité haute quand le corps parle, basse quand c'est l'ambiance.

export const storyletsGlobaux = [
  {
    id: 'VDG-019',
    titre_travail: 'faim',
    titre_affiche: 'Le ventre',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    conditions: { requis: [{ faim: { min: 70 } }], interdit: [] },
    unique: false,
    max_vues: 8,
    priorite: 7,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Ça a commencé ce matin par une gêne. Maintenant c’est une main qui serre, et ça te rend bête : tu relis deux fois le même bout de sentier avant de comprendre où tu es.`,
      variantes: [
        { si: [{ etat: 'affame' }], ajout: `Tes mains tremblent quand tu les tiens devant toi. Ce n’est pas le froid.` },
        { si: [{ objet: 'eau_claire', min: 1 }], ajout: `Il te reste de l’eau. Ça ne nourrit pas, mais ça repousse.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Manger ce que tu portes de plus périssable',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ objet: 'gibier_du_jour', min: 1 }, { objet: 'navets', min: 1 }] }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'gibier_du_jour', min: 1 }],
            texte: `Tu fais un feu bas et tu manges le lièvre presque cru, assis sur tes talons, en surveillant les deux côtés du chemin.

Tu te sens un homme différent en te relevant.`,
            effets: [{ objet: 'gibier_du_jour', quantite: -1 }, { faim: -32 }, { sante_heros: 4 }, { fatigue: 4 }, { xp: 4 }],
          },
          {
            probabilite: 100,
            texte: `Des navets crus, terreux, qui craquent sous la dent. Ça remplit sans nourrir.`,
            effets: [{ objet: 'navets', quantite: -2 }, { faim: -18 }, { fatigue: 2 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Entamer les réserves de garde',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ objet: 'lard_sale', min: 1 }, { objet: 'pain_dur', min: 1 }] }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu manges debout, en marchant, à petites bouchées, et tu comptes ce qu’il te reste après. Deux fois.`,
            effets: [
              { objet: 'lard_sale', quantite: -1 },
              { objet: 'pain_dur', quantite: -1 },
              { faim: -28 },
              { fatigue: -2 },
              { xp: 3 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Boire pour tromper le ventre',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'eau_claire', min: 1 }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu bois l’outre entière. Pendant une heure, ça marche.`,
            effets: [{ objet: 'eau_claire', quantite: -1 }, { faim: -10 }, { fatigue: 3 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Serrer ta ceinture d’un cran et continuer',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu serres d’un cran et tu remarches. Tu as fait des chasses plus longues que ça sans manger. C’était il y a longtemps.`,
            effets: [{ faim: 4 }, { fatigue: 6 }, { xp: 4 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-020',
    titre_travail: 'nuit-dehors',
    titre_affiche: 'La nuit',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    conditions: { requis: [{ segment: { min: 6 } }, { fatigue: { min: 55 } }], interdit: [] },
    unique: false,
    max_vues: 6,
    priorite: 7,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { abri: false },
    texte: {
      base: `Le jour est tombé pendant que tu marchais et tu ne t’en es aperçu qu’en butant deux fois sur la même racine.

Continuer de nuit, c’est marcher au son. Rester, c’est choisir un endroit et s’y tenir jusqu’à l’aube.`,
      variantes: [
        { si: [{ objet: 'couverture', min: 1 }], ajout: `Tu as de la laine. Ça change complètement une nuit dehors.` },
        { si: [{ etat: 'blesse_leger' }], ajout: `La plaie te tire à chaque pas. Elle ne se refermera pas en marchant.` },
        { si: [{ local: 'abri', valeur: true }], ajout: `Tu sais où tu dors : le surplomb sec, le creux à l’abri du vent, le bois mort resté debout.` },
      ],
    },
    options: [
      {
        id: 'R',
        libelle: 'Faire le tour du replat avant de choisir ton coin',
        cout: { segments: 1 },
        observation: true,
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Tu fais deux cents pas en cercle, à tâtons, en touchant la roche.

Tu trouves un surplomb sec, du bois mort resté debout — donc encore sain — et un creux où le vent ne descend pas. Ça vaut le quart d’heure que ça t’a pris.`,
            effets: [{ local: 'abri', '=': true }, { fatigue: 3 }, { xp: 8 }],
          },
          {
            probabilite: 40,
            texte: `Tu fais le tour à tâtons et tu ne trouves rien de mieux que ce que tu avais sous les pieds : de la pente, des cailloux, et du vent qui passe partout.`,
            effets: [{ fatigue: 4 }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'A',
        libelle: 'Faire un feu et dormir près de la braise',
        cout: { segments: 2 },
        apparait_si: [{ objet: 'silex', min: 1 }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'abri', valeur: true }],
            texte: `Tu montes un feu bas dans le creux repéré, dos à la roche, et tu dors par tranches d’une heure.

Le bois sec prend du premier coup. Personne ne vient.`,
            effets: [{ fatigue: -48 }, { faim: 14 }, { sante_heros: 8 }, { xp: 8 }],
          },
          {
            probabilite: 70,
            texte: `Tu montes un feu bas dans un creux, dos à la roche, et tu dors par tranches d’une heure.

Personne ne vient. Au matin, tu as froid d’un côté et chaud de l’autre, et tu tiens debout.`,
            effets: [{ fatigue: -42 }, { faim: 14 }, { sante_heros: 6 }, { xp: 6 }],
          },
          {
            probabilite: 30,
            texte: `Le bois est humide. Tu passes une heure à souffler sur de la fumée avant d’obtenir trois flammes qui meurent à l’aube.

Tu dors mal et tu te réveilles gelé jusqu’aux os.`,
            effets: [{ fatigue: -22 }, { faim: 14 }, { sante_heros: -3 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Te caler sous un couvert et attendre le jour sans feu',
        cout: { segments: 2 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'couverture', min: 1 }],
            texte: `Tu te roules dans la laine sous un surplomb, l’arc contre toi.

Tu dors d’un sommeil de bête, sans rien entendre.`,
            effets: [{ fatigue: -34 }, { faim: 12 }, { sante_heros: 3 }, { xp: 5 }],
          },
          {
            probabilite: 100,
            texte: `Tu te cales entre deux racines, les genoux contre la poitrine.

Tu ne dors pas vraiment. Tu passes la nuit à écouter des choses qui ne sont probablement pas là.`,
            effets: [{ fatigue: -18 }, { faim: 12 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Continuer à marcher dans le noir',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 55,
            texte: `Tu avances au son et au souvenir du terrain. Ça marche mieux que tu ne l’aurais cru, et tu gagnes du chemin pendant que tout dort.`,
            effets: [{ fatigue: 14 }, { xp: 8 }],
          },
          {
            probabilite: 45,
            texte: `Tu avances au son, et le son ment. Une pente que tu croyais douce ne l’est pas.

Tu descends sur le flanc dans les cailloux et tu perds ce que tu tenais en main.`,
            effets: [{ fatigue: 16 }, { sante_heros: -7 }, { objet: 'fleche', quantite: -3 }, { xp: 5 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-021',
    titre_travail: 'portage',
    titre_affiche: 'Les épaules',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    conditions: { requis: [{ surcharge: { min: 15 } }], interdit: [] },
    unique: false,
    max_vues: 5,
    priorite: 6,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Tu t’arrêtes au milieu d’une montée sans avoir décidé de t’arrêter.

Les sangles te scient les épaules, le bas du dos a chauffé, et tu as pris l’habitude de compter les pas jusqu’à la prochaine pause. C’est mauvais signe : un homme qui compte ses pas ne regarde plus autour de lui.`,
      variantes: [
        { si: [{ objet: 'sac_de_toile', min: 1 }], ajout: `Le sac est bien fait, mais un bon sac ne rend pas les choses plus légères.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Poser ce qui pèse le plus et repartir léger',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'epieu', min: 1 }],
            texte: `Tu appuies l’épieu contre un tronc, la pointe en l’air, bien visible pour celui qui passera.

Tes épaules te remercient dans les cinquante pas.`,
            effets: [{ objet: 'epieu', quantite: -1 }, { fatigue: -12 }, { xp: 4 }],
          },
          {
            probabilite: 100,
            texte: `Tu tries à même le sol et tu laisses ce qui ne se mange pas et ne coupe pas.

Tes épaules te remercient dans les cinquante pas.`,
            effets: [
              { objet: 'navets', quantite: -3 },
              { objet: 'peau_de_lievre', quantite: -1 },
              { objet: 'pieces', quantite: -8 },
              { fatigue: -10 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Redistribuer la charge et resangler',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 65,
            texte: `Tu défais tout, tu remets le lourd en haut et contre le dos, le reste autour. Un vieux geste de soldat.

Ça ne change pas le poids. Ça change qui le porte : les jambes au lieu des épaules.`,
            effets: [{ fatigue: -8 }, { xp: 6 }],
          },
          {
            probabilite: 35,
            texte: `Tu défais tout et tu passes un quart d’heure à te battre avec des sangles trop courtes.

Tu repars mal chargé, avec un angle du sac qui te rentre dans le rein à chaque pas.`,
            effets: [{ fatigue: 6 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Tout garder et avancer plus lentement',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu remontes les sangles d’un cran et tu repars au rythme d’un homme chargé. Tu arriveras. Plus tard, et moins frais.`,
            effets: [{ fatigue: 10 }, { xp: 3 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-022',
    titre_travail: 'chasse',
    titre_affiche: 'Une coulée',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    conditions: {
      requis: [{ objet: 'arc_de_chasse' }, { objet: 'fleche', min: 1 }, { segment: { max: 5 } }],
      interdit: [{ etat: 'epuise' }],
    },
    unique: false,
    max_vues: 6,
    priorite: 5,
    poids: 22,
    duree_segments: 0,
    etat_local_initial: { poste: false },
    texte: {
      base: `Tu la vois avant de la comprendre : une coulée dans l’herbe haute, entretenue, avec de la terre à nu tous les trois pas et des crottes fraîches en tas serrés.

Ce que tu sais faire depuis que tu as douze ans t’est resté entier.`,
      variantes: [
        { si: [{ local: 'poste', valeur: true }], ajout: `Tu es en place depuis un moment. Tes mollets commencent à protester.` },
        { si: [{ etat: 'affame' }], ajout: `La faim rend les mains bavardes. Tu le sais et ça n’aide pas.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Te poster sous le vent et attendre',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu te mets à genoux dans les fougères, sous le vent, et tu deviens une souche.

Le temps passe autrement quand on chasse. Ce n’est pas de l’attente.`,
            effets: [{ local: 'poste', '=': true }, { fatigue: 4 }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Tirer',
        cout: { segments: 1 },
        apparait_si: [{ local: 'poste', valeur: true }],
        sortie: true,
        issues: [
          {
            probabilite: 60,
            condition_texte: [{ stat: 'adresse', min: 4 }],
            texte: `Un lièvre sort à douze pas, s’arrête pour la seule raison qui tue les lièvres, et tu lâches.

Tu le saignes et tu l’écorches sur place, proprement, sans presque regarder tes mains.`,
            effets: [
              { objet: 'gibier_du_jour', quantite: 1 },
              { objet: 'peau_de_lievre', quantite: 1 },
              { objet: 'fleche', quantite: -1 },
              { usure: 'arc_de_chasse', valeur: -4 },
              { fatigue: 6 },
              { xp: 12 },
            ],
          },
          {
            probabilite: 40,
            texte: `Un lièvre sort à douze pas. Tu lâches trop tôt, la flèche entre dans la terre à un pouce de son flanc, et il n’est plus là.

Tu retrouves la flèche. La pointe est tordue.`,
            effets: [
              { objet: 'fleche', quantite: -1 },
              { usure: 'arc_de_chasse', valeur: -4 },
              { fatigue: 6 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Suivre la coulée jusqu’à la remise',
        cout: { segments: 2 },
        sortie: false,
        issues: [
          {
            probabilite: 50,
            texte: `Tu remontes la coulée à quatre pattes sur les derniers pas. Elle finit dans un fourré de ronces où tout un peuple vit sa vie.

Tu prends deux prises dans le même quart d’heure.`,
            effets: [
              { objet: 'gibier_du_jour', quantite: 2 },
              { objet: 'fleche', quantite: -2 },
              { usure: 'arc_de_chasse', valeur: -6 },
              { fatigue: 12 },
              { xp: 16 },
            ],
          },
          {
            probabilite: 50,
            texte: `Tu remontes la coulée jusqu’à un fourré vide depuis des semaines. La terre à nu était vieille ; tu l’as lue trop vite.

Tu as marché une heure pour rien et tu t’es griffé les avant-bras jusqu’au sang.`,
            effets: [{ fatigue: 12 }, { faim: 6 }, { sante_heros: -2 }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Laisser courir et reprendre ta route',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu enjambes la coulée et tu continues. Il y a des jours où on ne peut pas se permettre d’être un chasseur.`,
            effets: [{ fatigue: 2 }, { xp: 2 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-023',
    titre_travail: 'rencontre-route',
    titre_affiche: 'Sur le chemin',
    lieu: { type: 'zone', cible: 'VDG-Z01' },
    conditions: { requis: [{ jour: { min: 1 } }], interdit: [{ position: 'VDG-Z01-P07' }] },
    unique: false,
    max_vues: 3,
    priorite: 5,
    poids: 14,
    duree_segments: 0,
    etat_local_initial: { approche: false },
    texte: {
      base: `Il est assis en travers du chemin, sur une pierre, et il ne se lève pas en te voyant.

Un homme d’une quarantaine d’années, la bouche ouverte sur sa respiration, une besace vide entre les pieds. Il tient un couteau de cuisine à plat sur sa cuisse, comme on tient un objet dont on ne sait pas quoi faire.

Il te regarde arriver sans bouger la tête. Juste les yeux.`,
      variantes: [
        { si: [{ local: 'approche', valeur: true }], ajout: `De près, il sent la fièvre et il a du sang séché sous l’ongle du pouce.` },
        { si: [{ objet: 'lard_sale', min: 1 }], ajout: `Ton sac fait du bruit quand tu marches. Il l’a entendu avant de te voir.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'T’arrêter à dix pas et lui parler d’abord',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Tu t’arrêtes à dix pas et tu parles le premier, de choses sans importance : le temps, la pente, la distance jusqu’au prochain point d’eau.

Au bout d’un moment il repose le couteau sur la pierre à côté de lui. Il dit qu’il vient du bas du val et qu’il n’a rien.

Il ne demande rien non plus. C’est ce qui te met mal à l’aise.`,
            effets: [{ local: 'approche', '=': true }, { xp: 10 }, { fatigue: 2 }],
          },
          {
            probabilite: 40,
            texte: `Tu t’arrêtes à dix pas et tu parles. Il ne répond pas une seule fois.

Il reste exactement comme il est, le couteau à plat sur la cuisse, à te regarder avec les yeux seulement.

Tu as connu des chiens comme ça. On ne leur tourne pas le dos.`,
            effets: [{ local: 'approche', '=': true }, { xp: 6 }, { fatigue: 3 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Poser de quoi manger sur la pierre et reculer',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ objet: 'pain_dur', min: 1 }, { objet: 'lard_sale', min: 1 }] }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu poses ce que tu peux à mi-distance et tu recules de trois pas.

Il met un temps invraisemblable à se lever. Il prend, il mange debout sans te quitter des yeux, et quand il a fini il dit une seule phrase : que les feux, à l’ouest, ce sont des gens bien.

Puis il se rassied sur sa pierre.`,
            effets: [
              { objet: 'pain_dur', quantite: -1 },
              { point_decouvert: ['VDG-Z01-P05'] },
              { reputation: { faction: 'marchands', valeur: 1 } },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Passer au large, arc en main, sans le quitter des yeux',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 75,
            texte: `Tu sors du chemin et tu fais le tour par la pente, l’arc à demi bandé, la tête tournée vers lui pendant toute la manœuvre.

Il ne bouge pas. Tu reprends le chemin cinquante pas plus loin, et le creux entre tes omoplates met un moment à se détendre.`,
            effets: [{ fatigue: 5 }, { xp: 6 }],
          },
          {
            probabilite: 25,
            texte: `Tu sors du chemin. Il se lève au moment exact où tu es le plus mal placé, dans la pente, un pied plus bas que l’autre.

Il ne court pas sur toi : il court sur ce que tu portes. Tu le repousses du coude et de l’épaule, il tombe, et il reste par terre à te regarder partir.

Il te manque une chose dans le sac, et tu ne t’en apercevras que plus tard.`,
            effets: [
              { objet: 'lard_sale', quantite: -1 },
              { objet: 'pain_dur', quantite: -1 },
              { sante_heros: -4 },
              { fatigue: 8 },
              { pnj_statut: { id: 'tesse', valeur: 'non_rencontre' } },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Faire demi-tour et prendre l’autre chemin',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu tournes les talons avant qu’il n’ait décidé quoi que ce soit. Ça coûte du temps et rien d’autre, ce qui est un bon prix.`,
            effets: [{ fatigue: 4 }, { xp: 3 }],
          },
        ],
      },
    ],
  },
];
