// VDG-Z01-P01 — système enseigné : observation, coût du temps, ouverture de la carte.

export const storyletsCrete = [
  {
    id: 'VDG-001',
    titre_travail: 'crete-ouverture',
    titre_affiche: 'La Crête',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P01' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 10,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { observations: 0, souffle: false },
    effets_entree: [
      { point_decouvert: ['VDG-Z01-P02', 'VDG-Z01-P04'] },
      { fatigue: 6 },
    ],
    texte: {
      base: `Tu montes les vingt derniers pas au pas de course et l’air froid te rentre dans la gorge. Le lièvre bat contre ta hanche à chaque foulée.

Depuis la crête, Val-de-Garde tient dans le creux de ta main. La fumée ne monte pas droit : elle rampe le long des toits, s’étale, se couche sur le verger. Le clocher de bois est encore debout. La grange des Mareuil, non.

Il y a des silhouettes entre les maisons. Elles ne courent pas.`,
      variantes: [
        {
          si: [{ local: 'observations', min: 2 }],
          ajout: `Tes cuisses tremblent. Tu n’as pas mangé depuis l’aube et le vent tourne.`,
        },
        {
          si: [{ local: 'souffle', valeur: true }],
          ajout: `En bas, quelque chose a changé de place. Tu ne saurais pas dire quoi.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'assez_vu',
        unique: true,
        si: [{ local: 'observations', min: 3 }],
        alors: [{ local: 'assez_vu', '=': true }, { xp: 6 }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Détailler le village, maison par maison',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu comptes. Onze silhouettes larges, épaules hautes, qui vont d’une porte à l’autre sans se presser. Deux restent au carrefour et ne bougent pas du tout : ils regardent la route de l’est.

Une charrette est renversée devant chez le tonnelier. Personne ne s’en occupe.

Tu cherches les tiens dans le tas de couleurs qui ne bouge plus devant le puits. Tu ne les trouves pas. Tu ne sais pas si c’est une bonne chose.`,
            effets: [
              { local: 'observations', '=': { increment: 1 } },
              { flag: 'vu_le_village' },
              { xp: 10 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Suivre du regard les chemins qui partent du val',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ stat: 'perception', min: 4 }],
            texte: `Tu poses le regard là où l’œil ne va pas seul : au ras des haies.

Le chemin de la ferme Mareuil est net, plus clair que la terre autour — quelqu’un l’a pris récemment, et souvent. Plus haut, la trace d’eau qui suinte de la roche fait un trait sombre dans l’herbe jaune. Et au nord-ouest, un mur bas, trop droit pour être un mur de pierre sèche : bâti par des gens qui savaient bâtir.`,
            effets: [
              { point_decouvert: ['VDG-Z01-P03', 'VDG-Z01-P06'] },
              { local: 'observations', '=': { increment: 1 } },
              { xp: 12 },
              { fatigue: 3 },
            ],
          },
          {
            probabilite: 100,
            texte: `Tu suis les chemins jusqu’à ce que les yeux te brûlent. Le sentier de la ferme, tu le connais. Le reste se perd dans les taillis.

Tu retiens quand même une chose : le filet d’eau qui descend de la roche, à mi-pente. Il n’a jamais tari, même l’été où tout a tari.`,
            effets: [
              { point_decouvert: ['VDG-Z01-P03'] },
              { local: 'observations', '=': { increment: 1 } },
              { xp: 6 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Regarder longuement vers l’ouest, dos au village',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Te détourner coûte plus que tu ne l’aurais cru.

L’ouest est calme. Des collines pelées, un pli de vallée, et au fond, très loin, un trait de fumée. Fin, vertical, ancien : le genre de fumée qui reste quand le feu s’est déjà couché.

C’est loin. C’est plus loin que la marche, plus loin que le poste. Ça n’a pas de sens — ils viennent de l’est, ils sont ici depuis ce matin. Sauf qu’ils déferlent, et qu’une vague qui déferle mouille aussi ce qui est devant.

Plus près, à deux collines d’ici, trois points orange qui tremblent. Des feux petits, entretenus bas. Des gens qui ont peur qu’on les voie.`,
            effets: [
              { point_decouvert: ['VDG-Z01-P05'] },
              { flag: 'indice_fumee_ouest' },
              { local: 'observations', '=': { increment: 1 } },
              { xp: 12 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Ne plus bouger du tout et écouter',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 55,
            texte: `Le vent, l’herbe, ton propre sang dans tes oreilles. Rien d’autre. En bas, ça continue sans un cri — c’est ça, le pire.`,
            effets: [{ local: 'souffle', '=': true }, { fatigue: 2 }, { xp: 3 }],
          },
          {
            probabilite: 45,
            texte: `Un choc sourd, régulier. Trois coups, une pause, trois coups. Du bois qu’on enfonce, méthodique, sans colère.

Puis un son plus court, plus haut, qui s’arrête net. Tu serres l’arc jusqu’à ce que la corde te scie les doigts.`,
            effets: [
              { local: 'souffle', '=': true },
              { fatigue: 4 },
              { xp: 5 },
              { flag: 'entendu_le_val' },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Descendre par la pente ouverte',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu descends vite, à découvert, la main sur la corde de l’arc. Personne ne lève la tête vers toi. Ça ne prouve rien.

En bas, tes jambes se remettent à t’appartenir.`,
            effets: [{ fatigue: 3 }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Descendre par le fourré, plus bas, plus lentement',
        cout: { segments: 2 },
        apparait_si: [{ local: 'observations', min: 1 }],
        sortie: true,
        issues: [
          {
            probabilite: 65,
            texte: `Les ronces te prennent la manche et te la rendent en morceaux. Tu avances plié en deux, très lentement.

À mi-pente, tu tombes sur un collet tendu il y a longtemps — le fil est encore bon. Tu l’enroules autour de ton poignet et tu continues.`,
            effets: [
              { objet: 'corde', quantite: 1, prefixe: 'grossier', usure: 55 },
              { fatigue: 5 },
              { xp: 8 },
            ],
          },
          {
            probabilite: 35,
            texte: `Les ronces te prennent la manche et te la rendent en morceaux. Tu avances plié en deux, très lentement.

Une branche morte cède sous ton pied. Tu te rattrapes mal, la cheville tourne, l’épaule racle l’écorce. Rien de cassé. Juste ce qui va te lancer pendant deux jours.`,
            effets: [{ sante_heros: -4 }, { fatigue: 7 }, { xp: 4 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-002',
    titre_travail: 'crete-retour',
    titre_affiche: 'La Crête',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P01' },
    conditions: { requis: [{ storylet_vu: 'VDG-001' }], interdit: [] },
    unique: false,
    max_vues: 3,
    priorite: 4,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `La crête n’a pas changé. Toi si, un peu.`,
      variantes: [
        {
          si: [{ jour: { min: 2 } }],
          ajout: `La fumée est plus basse qu’hier. Elle ne monte presque plus.`,
        },
        {
          si: [{ segment: { min: 5 } }],
          ajout: `À cette heure, le val est une tache noire avec trois braises dedans.`,
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Regarder ce qui a bougé en bas',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Les silhouettes sont moins nombreuses. Elles ne fouillent pas les maisons : elles y entrent, elles en ressortent, elles passent à la suivante.`,
            effets: [{ xp: 4 }, { fatigue: 3 }, { flag: 'vu_le_village' }],
          },
          {
            probabilite: 40,
            texte: `Rien ne bouge. Un chien traverse la place et personne ne le chasse. Tu restes plus longtemps que nécessaire.`,
            effets: [{ xp: 2 }, { fatigue: 4 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'S’asseoir dos à la pierre et souffler',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu t’assieds. Le vent te sèche la sueur et te fait claquer des dents. Tu te relèves avant d’avoir eu chaud.`,
            effets: [{ fatigue: -10 }, { faim: 3 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Redescendre',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu redescends sans te retourner.`,
            effets: [{ fatigue: 2 }],
          },
        ],
      },
    ],
  },
];
