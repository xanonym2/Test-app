// VDG-Z01-P05 — système enseigné : l'information sociale et le recrutement.
// Point de convergence de la zone, et sortie vers l'ouest.

export const storyletsCamp = [
  {
    id: 'VDG-012',
    titre_travail: 'camp-arrivee',
    titre_affiche: 'Le Camp des fuyards',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P05' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { compte: 0, brune: false, tesse: false, feu: false },
    texte: {
      base: `Trois feux bas dans une combe, entourés de pierres pour qu’on ne les voie pas de loin. Une trentaine de personnes, peut-être. Des bâches tendues sur des perches, un cheval sans charrette, et une odeur de laine mouillée qui couvre tout.

Personne ne vient te demander qui tu es. Deux ou trois lèvent la tête, voient l’arc, voient que tu es seul, et retournent à leurs mains.

Près du feu du milieu, une femme entretient la flamme avec une régularité de métier. Elle a une arbalète en travers des genoux et aucun carreau à la ceinture.`,
      variantes: [
        {
          si: [{ local: 'brune', valeur: true }],
          ajout: `Elle s’appelle Brune. Elle n’a pas proposé de te serrer la main.`,
        },
        {
          si: [{ local: 'tesse', valeur: true }],
          ajout: `La petite est revenue s’asseoir à trois pas de toi. Elle ne dit toujours rien.`,
        },
        {
          si: [{ local: 'compte', min: 2 }],
          ajout: `Tu commences à voir comment ce camp tient : mal, et par habitude.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'connu_du_camp',
        unique: true,
        si: [{ local: 'compte', min: 2 }],
        alors: [{ flag: 'connu_du_camp' }, { xp: 8 }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'S’asseoir au feu du milieu et écouter sans parler',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu t’assieds à la distance qu’il faut : assez près pour avoir chaud, assez loin pour ne rien demander.

Ça parle par bribes. Des noms de hameaux. Qui a vu quoi et de quel côté. Une femme répète depuis un moment que les hommes de la Couronne sont passés il y a huit jours, en colonne, vers l’est, avec les chariots et les tentes — tout le poste vidé d’un coup.

Un autre lui répond que c’est toujours pareil, qu’un capitaine s’appelle Vairon ou autrement, que ça monte à cheval et que ça décide en dépit du bon sens. Ça fait rire deux personnes.

Personne ne trouve ça étrange. Un mauvais commandement, ça n’étonne plus personne ici.`,
            effets: [
              { flag: 'indice_garnison_est' },
              { pnj_statut: { id: 'vairon', valeur: 'non_rencontre' } },
              { local: 'compte', '=': { increment: 1 } },
              { local: 'feu', '=': true },
              { fatigue: -6 },
              { xp: 14 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Aller parler à la femme à l’arbalète',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 65,
            condition_texte: [{ stat: 'sang_froid', min: 3 }],
            texte: `Tu t’accroupis à côté d’elle sans rien dire pendant un moment, ce qui est apparemment la bonne façon de faire.

Elle s’appelle Brune. Elle tenait la garde du pont, en bas, avant. Son arbalète est bonne ; elle n’a plus un seul carreau depuis avant-hier et elle le dit sans y mettre de drame.

Elle te demande ce que tu as vu depuis la crête. Tu lui dis. Elle écoute vraiment — c’est rare et ça se remarque.`,
            effets: [
              { local: 'brune', '=': true },
              { local: 'compte', '=': { increment: 1 } },
              { confiance: { pnj: 'brune', valeur: 2 } },
              { pnj_statut: { id: 'brune', valeur: 'vivant_allie' } },
              { xp: 12 },
            ],
          },
          {
            probabilite: 35,
            texte: `Tu t’approches trop vite. Elle relève l’arbalète de deux pouces — un geste d’habitude, pas de menace, mais tu t’arrêtes quand même.

Elle s’appelle Brune. Elle répond par phrases courtes et elle regarde ton arc plus souvent que ta figure.`,
            effets: [
              { local: 'brune', '=': true },
              { local: 'compte', '=': { increment: 1 } },
              { confiance: { pnj: 'brune', valeur: -1 } },
              { pnj_statut: { id: 'brune', valeur: 'vivant_allie' } },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Suivre des yeux l’enfant qui tourne autour des bâches',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Une gamine de huit ou neuf ans fait le tour du camp dans le même sens, sans arrêt, en touchant chaque perche de la main.

Quelqu’un te dit qu’elle s’appelle Tesse, qu’elle n’a pas parlé depuis le val, et qu’on la laisse tourner parce que quand on l’arrête, c’est pire.

Elle passe devant toi, s’arrête net, regarde le lièvre — ou l’endroit où il était accroché ce matin — et repart.`,
            effets: [
              { local: 'tesse', '=': true },
              { local: 'compte', '=': { increment: 1 } },
              { pnj_statut: { id: 'tesse', valeur: 'vivant_allie' } },
              { xp: 8 },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Demander où va ce camp',
        cout: { segments: 1 },
        apparait_si: [{ local: 'compte', min: 1 }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `La réponse met un moment à venir, parce que personne ne se l’était formulée à voix haute.

À l’ouest. Par la passe, entre les deux épaules de roche, deux demi-journées de marche. Après, il y a la vallée basse, et des gens, et peut-être des murs.

Ils partent quand ils seront assez pour partir. C’est-à-dire jamais, si personne ne décide.`,
            effets: [
              { point_decouvert: ['VDG-Z01-P07'] },
              { flag: 'sait_la_passe' },
              { local: 'compte', '=': { increment: 1 } },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'S’écarter des feux',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu remontes hors du cercle de lumière. Le froid revient tout de suite.`,
            effets: [{ fatigue: 2 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-013',
    titre_travail: 'camp-recrutement',
    titre_affiche: 'Le Camp des fuyards',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P05' },
    conditions: {
      requis: [{ storylet_vu: 'VDG-012' }, { flag: 'sait_la_passe' }],
      interdit: [{ flag: 'compagnie_formee' }],
    },
    unique: true,
    priorite: 7,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { appuis: 0, dit_devant_tous: false },
    texte: {
      base: `Rien ne bouge dans ce camp. Les feux sont entretenus, les bâches retendues, l’eau montée — et personne ne fait le pas suivant.

Si tu veux qu’ils partent, il va falloir que quelqu’un le dise, et le dise devant les autres.`,
      variantes: [
        {
          si: [{ local: 'appuis', min: 1 }],
          ajout: `Tu as au moins une voix derrière toi. Ça change la nature de ce que tu vas dire.`,
        },
        {
          si: [{ local: 'appuis', min: 2 }],
          ajout: `Deux personnes attendent maintenant que tu parles. Le silence autour du feu s’est un peu resserré.`,
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'En parler d’abord à Brune, à l’écart',
        cout: { segments: 1 },
        apparait_si: [{ pnj_statut: { id: 'brune', valeur: 'vivant_allie' } }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ confiance: { pnj: 'brune', min: 2 } }],
            texte: `Elle t’écoute jusqu’au bout, puis elle dit deux choses.

La première : elle marchera, parce que rester ici c’est attendre, et qu’elle a déjà donné dans l’attente.

La seconde : sans carreaux, elle ne vaut rien d’autre qu’une paire de bras, et elle veut que tu le saches avant de compter sur elle.`,
            effets: [
              { local: 'appuis', '=': { increment: 1 } },
              { confiance: { pnj: 'brune', valeur: 2 } },
              { xp: 12 },
            ],
          },
          {
            probabilite: 100,
            texte: `Elle t’écoute en tendant la corde de son arbalète pour rien, juste pour occuper ses mains.

Elle dit qu’elle ne te connaît pas. Que le dernier qui a voulu emmener tout le monde quelque part l’a fait au mauvais moment. Que si tu veux qu’elle marche, il faudra d’abord que tu portes quelque chose de plus lourd que ta parole.`,
            effets: [
              { confiance: { pnj: 'brune', valeur: 1 } },
              { fatigue: 2 },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Poser devant le feu ce que tu portes de nourriture',
        cout: { segments: 1 },
        apparait_si: [
          { ou: [{ objet: 'lard_sale', min: 1 }, { objet: 'gibier_du_jour', min: 1 }, { objet: 'navets', min: 2 }] },
        ],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu poses ce que tu as sur la pierre plate, à côté du feu du milieu, et tu te rassieds sans commentaire.

Ça ne fait pas un repas pour trente. Ça fait une bouchée pour quinze, et un silence de quelques secondes qui vaut plus que la bouchée.

La femme au manteau trop grand te regarde autrement, ensuite.`,
            effets: [
              { objet: 'lard_sale', quantite: -1 },
              { objet: 'navets', quantite: -2 },
              { local: 'appuis', '=': { increment: 1 } },
              { confiance: { pnj: 'brune', valeur: 1 } },
              { reputation: { faction: 'marchands', valeur: 2 } },
              { xp: 14 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Dire devant tout le monde ce que tu as vu depuis la crête',
        cout: { segments: 1 },
        apparait_si: [{ flag: 'vu_le_village' }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 70,
            condition_texte: [{ local: 'appuis', min: 1 }],
            texte: `Tu parles debout, sans lever la voix, et tu ne racontes que ce que tu as vu de tes yeux : le nombre, la façon dont ils vont d’une porte à l’autre, les deux qui regardent la route de l’est sans bouger.

Tu ne dis pas ce qu’il faut faire. Tu dis ce qu’il y a.

Quand tu te rassieds, deux hommes se lèvent pour aller rouler les bâches. Personne ne leur a rien demandé.`,
            effets: [
              { local: 'dit_devant_tous', '=': true },
              { flag: 'compagnie_formee' },
              { confiance: { pnj: 'brune', valeur: 2 } },
              { reputation: { faction: 'couronne', valeur: 1 } },
              { xp: 26 },
            ],
          },
          {
            probabilite: 30,
            texte: `Tu parles debout et ta voix ne porte pas comme tu l’aurais voulu.

Un homme te coupe pour demander qui tu es. Un autre dit qu’il a vu autre chose, et il raconte autre chose, et au bout d’un moment plus personne ne t’écoute.

Tu te rassieds. Le feu continue.`,
            effets: [
              { fatigue: 6 },
              { confiance: { pnj: 'brune', valeur: -1 } },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Aller rouler les bâches toi-même, sans rien dire à personne',
        cout: { segments: 2 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu commences par la bâche la plus à l’ouest. Tu la démontes, tu roules la toile, tu ranges les perches en fagot.

Au bout d’un moment, un gamin vient tenir l’autre bout. Puis son père. Puis la femme au manteau trop grand se met aux cordes du côté opposé, en silence.

À la fin, il ne reste que trois bâches debout et personne n’a prononcé le mot « partir ».`,
            effets: [
              { local: 'appuis', '=': { increment: 2 } },
              { flag: 'compagnie_formee' },
              { fatigue: 18 },
              { xp: 22 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Laisser ce camp décider seul',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu t’écartes du feu. Ce n’est pas ton camp, ce ne sont pas tes morts, et tu marches plus vite seul.

Ce sont trois raisons. Aucune ne t’empêche d’y repenser.`,
            effets: [{ flag: 'camp_laisse' }, { fatigue: 2 }, { xp: 6 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-014',
    titre_travail: 'camp-nuit',
    titre_affiche: 'Le Camp des fuyards',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P05' },
    conditions: { requis: [{ storylet_vu: 'VDG-012' }], interdit: [] },
    unique: false,
    max_vues: 4,
    priorite: 5,
    poids: 16,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Les trois feux, les pierres autour, la laine mouillée.`,
      variantes: [
        { si: [{ segment: { min: 5 } }], ajout: `À cette heure, on se serre. Il y a de la place pour un de plus, si tu la prends sans la demander.` },
        { si: [{ flag: 'compagnie_formee' }], ajout: `Les bâches sont roulées. Le camp attend le matin, maintenant, au lieu d’attendre rien.` },
        { si: [{ pnj_statut: { id: 'tesse', valeur: 'vivant_allie' } }], ajout: `La gamine fait toujours son tour, dans le même sens.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Dormir près du feu',
        cout: { segments: 2 },
        sortie: true,
        issues: [
          {
            probabilite: 75,
            texte: `Tu dors d’un bloc, sans rêver, le dos contre une pierre chaude.

Quand tu te réveilles, quelqu’un a posé une couverture sur toi et est reparti sans le dire.`,
            effets: [{ fatigue: -40 }, { faim: 10 }, { sante_heros: 6 }, { xp: 4 }],
          },
          {
            probabilite: 25,
            texte: `Tu dors mal. Un enfant tousse toute la nuit à trois pas de toi, et chaque fois que tu t’endors, ça recommence.

Au matin, tu as les yeux qui grattent et une humeur de chien.`,
            effets: [{ fatigue: -22 }, { faim: 10 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Écouter ce qui se dit d’un feu à l’autre',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 50,
            texte: `Une femme raconte qu’en bas, dans le val, ils n’ont pas ouvert le grenier à grain. Elle le répète trois fois, comme si c’était ça qui l’empêchait de dormir, et pas le reste.

Personne ne lui répond.`,
            effets: [{ fatigue: 3 }, { xp: 6 }],
          },
          {
            probabilite: 50,
            texte: `Deux hommes se disputent à voix basse pour savoir si la passe est encore ouverte à cette saison. Aucun des deux n’y est jamais monté.

Tu apprends surtout que ce camp ne sait rien de ce qui l’attend.`,
            effets: [{ fatigue: 3 }, { xp: 4 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Échanger une partie de ce que tu portes',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'pieces', min: 6 }],
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Un homme te cède un sac de toile solide et une poignée de bandes propres contre tes pièces. Il compte deux fois et il a raison de compter.`,
            effets: [
              { objet: 'pieces', quantite: -6 },
              { objet: 'sac_de_toile', quantite: 1, usure: 85 },
              { objet: 'bandage_de_toile', quantite: 2 },
              { xp: 6 },
            ],
          },
          {
            probabilite: 40,
            texte: `Personne n’a rien à vendre. On te propose du pain dur contre du cuivre, à un prix qui n’a plus de sens depuis ce matin.

Tu prends quand même. Le cuivre ne se mange pas.`,
            effets: [
              { objet: 'pieces', quantite: -6 },
              { objet: 'pain_dur', quantite: 2 },
              { xp: 3 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Sortir du cercle de lumière',
        cout: { segments: 1 },
        sortie: true,
        issues: [{ probabilite: 100, texte: `Tu t’écartes. Le froid, tout de suite.`, effets: [{ fatigue: 2 }] }],
      },
    ],
  },

  {
    id: 'VDG-015',
    titre_travail: 'passe-ouest',
    titre_affiche: 'La Passe de l’Ouest',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P07' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 10,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `La passe est un couloir de roche entre deux épaules de montagne, assez large pour trois hommes de front, assez long pour qu’on n’en voie pas le bout.

Le vent y monte de l’autre côté. Il sent la pierre mouillée et quelque chose d’autre, de plus vert, qui ne vient pas d’ici.

Derrière toi, le val a disparu depuis deux tournants.`,
      variantes: [
        { si: [{ flag: 'compagnie_formee' }], ajout: `Tu n’es pas seul dans ce couloir. Ça avance lentement, ça tousse, ça traîne des perches — et ça avance.` },
        { si: [{ flag: 'camp_laisse' }], ajout: `Tu es seul dans ce couloir. C’est plus rapide. C’est plus silencieux aussi.` },
        { si: [{ flag: 'indice_fumee_ouest' }, { flag: 'indice_rien_pris' }, { flag: 'indice_garnison_est' }], ajout: `Trois choses te reviennent en marchant, et refusent de se ranger : une fumée trop à l’ouest, un grenier que personne n’a ouvert, une colonne partie vers l’est huit jours trop tôt.

Chacune a son explication. Tu les as entendues, ces explications. Elles tiennent, prises une par une.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Monter jusqu’au dernier tournant et regarder ce qu’il y a de l’autre côté',
        cout: { segments: 2 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu montes le dernier raidillon à quatre pattes sur les vingt derniers pieds.

De l’autre côté : une vallée large, verte, avec une rivière qui fait trois boucles et de la fumée de cheminée — de la vraie, celle qui monte droit d’un toit qu’on habite.

Tu t’assieds sur la roche et tu restes là un moment.

Tu as ton arc, ton couteau, ton outre, et ce que tu as ramassé en trois jours. Tes parents sont morts. Tes frères sont quelque part, ou ne sont nulle part.

Le vent tourne, et pour la première fois depuis la crête, tu penses à demain plutôt qu’à ce matin.`,
            effets: [{ acte: 2 }, { xp: 40 }, { fin: 'passe_franchie' }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'T’arrêter dans le couloir de roche et regarder derrière toi',
        cout: { segments: 1 },
        observation: true,
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu te retournes une fois, à l’endroit exact où la paroi s’ouvre encore assez pour laisser voir l’est.

Il n’y a plus de fumée. Ni au-dessus du val, ni ailleurs. Le ciel est propre d’un bout à l’autre et c’est ça, maintenant, qui ne va pas.

Un feu qui s’éteint tout seul, ça met trois jours. Celui-là en a mis un.`,
            effets: [{ flag: 'regard_arriere' }, { xp: 12 }, { fatigue: 3 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Redescendre : il te reste quelque chose à faire de ce côté-ci',
        cout: { segments: 2 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu fais demi-tour dans le couloir de roche. Le vent te pousse dans le dos, maintenant, ce qui n’aide pas.`,
            effets: [{ deplace: 'VDG-Z01-P05' }, { fatigue: 8 }, { xp: 4 }],
          },
        ],
      },
    ],
  },
];
