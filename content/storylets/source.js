// VDG-Z01-P03 — système enseigné : la survie et le partage.

export const storyletsSource = [
  {
    id: 'VDG-006',
    titre_travail: 'source-partage',
    titre_affiche: 'La Source',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P03' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { bu: false, rempli: false, parle: false, donne: false },
    texte: {
      base: `L’eau sort de la roche par une fente large comme deux doigts et tombe dans une vasque que personne n’a creusée. Le bruit couvre tout le reste, ce qui est reposant et dangereux à parts égales.

Une femme est accroupie de l’autre côté de la vasque. Elle a un enfant contre elle, un manteau d’homme sur les épaules, et elle te regarde depuis un moment déjà — tu comprends qu’elle t’a vu bien avant que tu ne la voies.

Elle a une outre. Elle est plate.`,
      variantes: [
        {
          si: [{ local: 'parle', valeur: true }],
          ajout: `Elle dit s’appeler Wenna. L’enfant ne dit rien du tout.`,
        },
        {
          si: [{ local: 'donne', valeur: true }],
          ajout: `L’enfant boit à petites gorgées, sans lâcher ton poignet.`,
        },
        {
          si: [{ local: 'bu', valeur: true }, { local: 'rempli', valeur: true }],
          ajout: `Tu as ce que tu es venu chercher. Reste ce que tu fais maintenant.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'presentation',
        unique: true,
        si: [{ local: 'parle', valeur: true }],
        alors: [{ pnj_statut: { id: 'wenna', valeur: 'vivant_allie' } }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Boire à la fente, longuement',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Elle est si froide qu’elle te fait mal aux dents et au front. Tu bois jusqu’à ce que ton ventre proteste, puis tu t’essuies la bouche sur ta manche.

De l’autre côté de la vasque, la femme n’a pas bougé.`,
            effets: [{ faim: -8 }, { fatigue: -6 }, { local: 'bu', '=': true }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Remplir ton outre',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'outre' }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu tiens l’outre sous la fente. Ça prend le temps que ça prend, et pendant ce temps tu as les deux mains occupées, ce qui n’est pas rien.`,
            effets: [
              { objet: 'eau_claire', quantite: 2 },
              { local: 'rempli', '=': true },
              { xp: 4 },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Traverser la vasque et lui adresser la parole',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            condition_texte: [{ stat: 'sang_froid', min: 3 }],
            texte: `Tu contournes la vasque lentement, les mains vides et visibles, et tu t’accroupis à trois pas.

Elle s’appelle Wenna. Elle vient du bas du val. Elle est partie quand la grange des Mareuil a pris, avec ce qu’elle avait dans les bras — ce qui veut dire l’enfant, et rien d’autre.

Elle te demande s’il reste quelqu’un là-bas. Tu réponds la vérité et elle hoche la tête comme si elle le savait déjà.`,
            effets: [
              { local: 'parle', '=': true },
              { confiance: { pnj: 'wenna', valeur: 1 } },
              { xp: 10 },
              { fatigue: 2 },
            ],
          },
          {
            probabilite: 40,
            texte: `Tu contournes la vasque et elle se lève d’un bond, l’enfant derrière elle, une pierre dans la main droite.

Tu restes immobile pendant ce qui te paraît très long. Elle finit par se rasseoir, la pierre toujours dans la main.

Elle s’appelle Wenna. C’est tout ce que tu obtiens.`,
            effets: [
              { local: 'parle', '=': true },
              { confiance: { pnj: 'wenna', valeur: -1 } },
              { xp: 6 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Lui tendre ton outre',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'eau_claire', min: 1 }, { local: 'parle', valeur: true }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Elle la prend sans rien dire et fait boire l’enfant d’abord. Elle-même boit peu, et te la rend plus tôt qu’elle n’aurait pu.

Avant que tu ne partes, elle te dit qu’il y a des gens à deux collines d’ici, vers l’ouest, qui font du feu la nuit. Elle dit aussi qu’un homme y est arrivé avant-hier avec un bras en écharpe et des choses à raconter.

Elle dit ça comme on paie une dette.`,
            effets: [
              { objet: 'eau_claire', quantite: -1 },
              { local: 'donne', '=': true },
              { confiance: { pnj: 'wenna', valeur: 3 } },
              { point_decouvert: ['VDG-Z01-P05'] },
              { xp: 14 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Lui donner de quoi manger et repartir aussitôt',
        cout: { segments: 1 },
        apparait_si: [
          { local: 'parle', valeur: true },
          { ou: [{ objet: 'lard_sale', min: 1 }, { objet: 'pain_dur', min: 1 }, { objet: 'gibier_du_jour', min: 1 }] },
        ],
        epuisable: true,
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'gibier_du_jour', min: 1 }],
            texte: `Tu poses le lièvre sur la pierre plate, tu recules, et tu t’en vas avant qu’elle ait fini de comprendre.

Tu l’entends dire quelque chose dans ton dos. Tu ne te retournes pas, parce que tu ne veux pas voir sa figure.`,
            effets: [
              { objet: 'gibier_du_jour', quantite: -1 },
              { confiance: { pnj: 'wenna', valeur: 4 } },
              { pnj_statut: { id: 'wenna', valeur: 'vivant_allie' } },
              { xp: 16 },
            ],
          },
          {
            probabilite: 100,
            texte: `Tu poses ce que tu peux sur la pierre plate, tu recules, et tu t’en vas avant qu’elle ait fini de comprendre.

Tu l’entends dire quelque chose dans ton dos. Tu ne te retournes pas.`,
            effets: [
              { objet: 'pain_dur', quantite: -1 },
              { confiance: { pnj: 'wenna', valeur: 2 } },
              { pnj_statut: { id: 'wenna', valeur: 'vivant_allie' } },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Remonter le sentier',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'parle', valeur: true }],
            texte: `Tu remontes. Le bruit de l’eau efface le reste en trois pas.`,
            effets: [{ fatigue: 1 }],
          },
          {
            probabilite: 100,
            texte: `Tu remontes sans avoir dit un mot. Elle te suit des yeux jusqu’au tournant — tu le sens dans le dos.`,
            effets: [{ fatigue: 1 }, { pnj_statut: { id: 'wenna', valeur: 'non_rencontre' } }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-007',
    titre_travail: 'source-retour',
    titre_affiche: 'La Source',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P03' },
    conditions: { requis: [{ storylet_vu: 'VDG-006' }], interdit: [] },
    unique: false,
    max_vues: 4,
    priorite: 4,
    poids: 14,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `La vasque, la fente, le bruit. Personne d’autre.`,
      variantes: [
        {
          si: [{ confiance: { pnj: 'wenna', min: 3 } }],
          ajout: `Sur la pierre plate, quelqu’un a laissé trois cailloux empilés. Ce n’est pas le vent qui a fait ça.`,
        },
        { si: [{ segment: { min: 6 } }], ajout: `De nuit, l’eau est noire et le bruit paraît plus fort.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Boire et remplir',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu bois. Tu remplis. Tu te redresses en écoutant derrière toi.`,
            effets: [{ objet: 'eau_claire', quantite: 2 }, { faim: -6 }, { fatigue: -4 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Se laver et refaire ses pansements',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ etat: 'blesse_leger' }, { objet: 'bandage_de_toile', min: 1 }] }],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `L’eau glacée sur une plaie ouverte, c’est une douleur propre. Tu serres la toile et tu noues avec les dents.`,
            effets: [
              { objet: 'bandage_de_toile', quantite: -1 },
              { sante_heros: 7 },
              { etat: 'blesse_leger', retire: true },
              { fatigue: 3 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Tendre un collet dans les fougères, en amont',
        cout: { segments: 2 },
        apparait_si: [{ objet: 'corde', min: 1 }],
        sortie: false,
        issues: [
          {
            probabilite: 45,
            texte: `Tu poses le collet sur une coulée bien marquée et tu attends, accroupi, jusqu’à ce que tes cuisses hurlent.

Ça prend. Tu tues proprement, tu saignes, tu écorches.`,
            effets: [
              { objet: 'gibier_du_jour', quantite: 1 },
              { objet: 'peau_de_lievre', quantite: 1 },
              { usure: 'corde', valeur: -15 },
              { fatigue: 8 },
              { xp: 10 },
            ],
          },
          {
            probabilite: 55,
            texte: `Tu poses le collet, tu attends, et rien ne vient. Quand tu le relèves, le fil a pris dans une racine et s’est ouvert sur trois pouces.

Tu as perdu deux heures de jour.`,
            effets: [{ usure: 'corde', valeur: -25 }, { fatigue: 8 }, { faim: 6 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Remonter le sentier',
        cout: { segments: 1 },
        sortie: true,
        issues: [{ probabilite: 100, texte: `Tu remontes.`, effets: [{ fatigue: 1 }] }],
      },
    ],
  },
];
