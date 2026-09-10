// VDG-Z01-P04 — système enseigné : le risque, l'échec, la confiance, les différés.
// L'issue d'un différé est FIGÉE au moment du choix ; seule sa révélation est repoussée,
// et elle se résout sur un lieu, jamais sur un simple délai.

export const storyletsLayon = [
  {
    id: 'VDG-008',
    titre_travail: 'layon-piege',
    titre_affiche: 'Le Layon',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P04' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { examine: false, degage: false, promis: false, tours: 0 },
    texte: {
      base: `Le layon passe sous les noisetiers, si étroit que les branches te touchent les deux épaules en même temps. C’est le chemin rapide. C’est aussi celui où l’on ne voit rien venir.

À trente pas, un homme est assis dans les feuilles, le dos contre un tronc, la jambe droite prise sous un tronc mort de la taille d’un veau.

Il ne crie pas. Il t’a entendu arriver et il attend de savoir ce que tu es.`,
      variantes: [
        {
          si: [{ local: 'examine', valeur: true }],
          ajout: `Le tronc n’est pas tombé tout seul. La cassure est trop nette et il y a une entaille de hache à hauteur d’homme, ancienne d’une saison au plus.`,
        },
        {
          si: [{ local: 'degage', valeur: true }],
          ajout: `Il a la jambe libre. Elle part de travers sous le genou et il ne peut pas la regarder.`,
        },
        {
          si: [{ local: 'promis', valeur: true }],
          ajout: `Il tient ta manche. Il répète le nom du camp comme s’il avait peur que tu l’oublies en route.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'il_se_nomme',
        unique: true,
        si: [{ ou: [{ local: 'examine', valeur: true }, { local: 'degage', valeur: true }] }],
        alors: [{ pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Rester à distance et regarder le tronc, les feuilles, les alentours',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu ne t’approches pas tout de suite. Tu fais le tour par les fougères et tu regardes.

Le tronc mort a été entaillé à la hache, il y a des mois, à hauteur d’homme. Quelqu’un a préparé ça pour un sanglier, ou pour un homme, et l’a laissé là quand il est parti.

L’homme a de la boue jusqu’au ventre et pas d’arme visible. Il porte une besace de cuir raide, du genre qu’on fait faire et qu’on garde vingt ans.

Il dit s’appeler Orcal. Il dit qu’il est là depuis la nuit.`,
            effets: [
              { local: 'examine', '=': true },
              { confiance: { pnj: 'orcal', valeur: 1 } },
              { xp: 12 },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Soulever le tronc à mains nues',
        cout: { segments: 1 },
        apparait_si: [{ local: 'degage', valeur: false }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 55,
            condition_texte: [{ stat: 'vigueur', min: 4 }],
            texte: `Tu cales tes talons, tu prends sous l’écorce, et tu montes avec le dos droit.

Le tronc se lève de six pouces. Ça suffit. Il se traîne en arrière sur les coudes et le tronc retombe dans le trou que sa jambe avait creusé.

Tu restes plié en deux un moment, à souffler comme un forgeron.`,
            effets: [
              { local: 'degage', '=': true },
              { fatigue: 14 },
              { confiance: { pnj: 'orcal', valeur: 2 } },
              { xp: 16 },
            ],
          },
          {
            probabilite: 45,
            texte: `Tu cales tes talons et tu montes. Le tronc bouge de deux pouces, puis ton pied ripe sur les feuilles mouillées.

Tout redescend. Sur sa jambe, et sur ta main gauche que tu retires trop tard.

Il ne crie toujours pas. Il ferme juste les yeux très fort.`,
            effets: [
              { sante_heros: -6 },
              { fatigue: 12 },
              { confiance: { pnj: 'orcal', valeur: -1 } },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Faire levier avec une branche épaisse',
        cout: { segments: 2 },
        apparait_si: [{ local: 'degage', valeur: false }, { local: 'examine', valeur: true }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 80,
            texte: `Tu passes un moment à chercher la bonne branche, puis à caler une pierre dessous. Ce n’est pas de la force, c’est de la patience.

Le tronc monte lentement, très haut, et tu tiens jusqu’à ce qu’il soit sorti.

Sa jambe part de travers sous le genou. Il regarde ailleurs pendant que tu la remets droite.`,
            effets: [
              { local: 'degage', '=': true },
              { fatigue: 8 },
              { confiance: { pnj: 'orcal', valeur: 3 } },
              { xp: 20 },
            ],
          },
          {
            probabilite: 20,
            texte: `La branche que tu as choisie a l’air saine. Elle ne l’est pas.

Elle éclate en pleine charge et l’extrémité te remonte le long du tibia comme un coup de fouet. Le tronc, lui, n’a pas bougé d’un pouce.`,
            effets: [
              { sante_heros: -8 },
              { etat: 'blesse_jambe' },
              { fatigue: 10 },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Le charger sur ton dos et l’emmener',
        cout: { segments: 2 },
        apparait_si: [{ local: 'degage', valeur: true }],
        sortie: true,
        issues: [
          {
            probabilite: 60,
            condition_texte: [{ stat: 'vigueur', min: 4 }],
            texte: `Tu le prends sur le dos. Il pèse le poids d’un homme qui ne s’aide pas.

Tu marches jusqu’à ce que tes cuisses tremblent, tu le poses, tu recommences. À la fin tu ne penses plus du tout : tu comptes tes pas par séries de vingt.

Il te met sa besace dans les mains avant même que tu ne la demandes. Il dit qu’il n’en aura plus l’usage et que toi si.`,
            effets: [
              { objet: 'necessaire_de_reparation', quantite: 1, usure: 60 },
              { objet: 'onguent', quantite: 1 },
              { confiance: { pnj: 'orcal', valeur: 4 } },
              { pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } },
              { flag: 'orcal_porte' },
              { fatigue: 26 },
              { sante_heros: -4 },
              { xp: 26 },
            ],
          },
          {
            probabilite: 40,
            texte: `Tu le prends sur le dos et tu tiens deux cents pas.

Au deux cent unième, ton genou lâche et vous tombez tous les deux dans les fougères. Il te dit d’arrêter. Tu recommences quand même. Il te le redit.

Vous finissez par avancer autrement : lui appuyé sur toi, un bras par-dessus ton épaule, à la vitesse d’un vieillard. Ça marche. Ça coûte le reste du jour.`,
            effets: [
              { objet: 'onguent', quantite: 1 },
              { confiance: { pnj: 'orcal', valeur: 3 } },
              { pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } },
              { flag: 'orcal_porte' },
              { segments: -2 },
              { fatigue: 30 },
              { etat: 'blesse_leger' },
              { xp: 22 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Lui dire que tu enverras quelqu’un du camp',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ local: 'examine', valeur: true }, { local: 'degage', valeur: true }] }],
        sortie: true,
        issues: [
          {
            probabilite: 50,
            texte: `Tu lui laisses de l’eau à portée de main et tu lui dis que tu monteras au camp, que tu diras où il est, qu’ils viendront avec de quoi le porter.

Il te regarde en face pendant tout le temps que tu parles. Puis il hoche la tête une fois, et il te lâche la manche.

Tu pars. Ce qui est fait est fait ; ce qui arrivera après ne dépend déjà plus de toi.`,
            effets: [
              { local: 'promis', '=': true },
              { objet: 'eau_claire', quantite: -1 },
              { confiance: { pnj: 'orcal', valeur: 1 } },
              { differe: {
                  evenement: 'promesse_orcal',
                  charge: 'VDG-010',
                  resolution: { lieu: 'VDG-Z01-P05' },
                } },
              { flag: 'promesse_faite' },
              { xp: 10 },
            ],
          },
          {
            probabilite: 50,
            texte: `Tu lui laisses de l’eau à portée de main et tu lui dis que tu monteras au camp, que tu diras où il est, qu’ils viendront avec de quoi le porter.

Il te regarde en face pendant tout le temps que tu parles. Puis il hoche la tête une fois, et il te lâche la manche.

Tu pars. Ce qui est fait est fait ; ce qui arrivera après ne dépend déjà plus de toi.`,
            effets: [
              { local: 'promis', '=': true },
              { objet: 'eau_claire', quantite: -1 },
              { confiance: { pnj: 'orcal', valeur: 1 } },
              { differe: {
                  evenement: 'promesse_orcal',
                  charge: 'VDG-011',
                  resolution: { lieu: 'VDG-Z01-P05' },
                } },
              { flag: 'promesse_faite' },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Contourner par les fougères et continuer ton chemin',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu passes au large, dans les fougères, sans le quitter des yeux.

Il ne t’appelle pas. C’est ce qui reste, après.`,
            effets: [
              { pnj_statut: { id: 'orcal', valeur: 'vivant_hostile' } },
              { confiance: { pnj: 'orcal', valeur: -3 } },
              { flag: 'layon_abandonne' },
              { fatigue: 3 },
              { xp: 4 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-010',
    titre_travail: 'differe-promesse-tenue',
    titre_affiche: 'Le Camp des fuyards',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 9,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Tu n’as pas eu à chercher longtemps quelqu’un à qui parler : une femme au manteau trop grand écoute ta description du layon, du tronc, du noisetier fendu, et elle part en appeler deux autres avant que tu aies fini ta phrase.

Ils reviennent à la nuit, avec lui, sur une porte de grange arrachée. Il est gris et il transpire, mais il parle.

Il te fait signe d’approcher et il te dit une chose qu’il a mise de côté pour toi.`,
    },
    options: [
      {
        id: 'A',
        libelle: 'S’accroupir près de la porte de grange et écouter',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Il dit qu’il tenait le vieux poste, avant, quand la Couronne y mettait encore quatre hommes. Il dit que le mur nord a une réserve sous le plancher, à trois pas de l’âtre, et que personne ne l’a jamais trouvée parce qu’il n’y avait rien à trouver — jusqu’à ce qu’il y range ses affaires, l’hiver dernier.

Il dit aussi que sa jambe est finie et qu’il aurait préféré que ce soit le tronc qui parte, pas lui.

Puis il ferme les yeux. Il respire. C’est déjà beaucoup.`,
            effets: [
              { flag: 'sait_reserve_poste' },
              { confiance: { pnj: 'orcal', valeur: 4 } },
              { pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } },
              { differe_resolu: 'promesse_orcal' },
              { xp: 24 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Demander qui est allé le chercher',
        cout: { segments: 1 },
        observation: true,
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Trois personnes, dont la femme au manteau trop grand. Elle est descendue la première et elle n’a pas discuté.

On te dit son nom sans que tu l’aies demandé, de la façon dont on te dit une chose qu’il vaut mieux savoir ici.`,
            effets: [{ confiance: { pnj: 'brune', valeur: 1 } }, { xp: 6 }, { fatigue: 2 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Le laisser dormir et t’écarter du feu',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu t’écartes. Il y a des gens autour de lui, maintenant, et c’est tout ce que tu voulais.`,
            effets: [
              { confiance: { pnj: 'orcal', valeur: 2 } },
              { pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } },
              { differe_resolu: 'promesse_orcal' },
              { xp: 12 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-011',
    titre_travail: 'differe-promesse-trop-tard',
    titre_affiche: 'Le Camp des fuyards',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 9,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Tu trouves quelqu’un à qui parler et tu racontes : le layon, le tronc, le noisetier fendu. Une femme au manteau trop grand t’écoute jusqu’au bout.

Ils partent à trois. Ils reviennent à deux, avec une besace de cuir raide et rien d’autre.

Ils disent que le tronc était toujours là. Que l’homme, non. Qu’il y avait des traces larges, à quatre pas, et de la terre remuée sur dix toises.

Personne ne te reproche rien. Personne ne te regarde non plus.`,
    },
    options: [
      {
        id: 'A',
        libelle: 'Prendre la besace qu’on te tend',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Dedans : un nécessaire de réparation bien tenu, un pot d’onguent, et un jeton de garnison en laiton, percé, du genre qu’on garde quand on n’a plus le droit de le porter.

Tu refermes la besace. Tu la gardes.`,
            effets: [
              { objet: 'necessaire_de_reparation', quantite: 1, usure: 60 },
              { objet: 'onguent', quantite: 1 },
              { objet: 'medaillon_de_garnison', quantite: 1 },
              { pnj_statut: { id: 'orcal', valeur: 'mort' } },
              { differe_resolu: 'promesse_orcal' },
              { flag: 'orcal_perdu' },
              { xp: 18 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Demander à voir l’endroit où ils l’ont trouvée',
        cout: { segments: 1 },
        observation: true,
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `On te décrit le layon comme tu le connais : le tronc, le noisetier fendu, le trou dans les feuilles.

Et une chose que tu n’avais pas vue : la besace n’était pas sous le tronc. Elle était à vingt pas de là, posée à plat sur une souche, bien en évidence.

Personne ne sait quoi en penser. On passe à autre chose.`,
            effets: [{ flag: 'besace_posee' }, { xp: 10 }, { fatigue: 2 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Dire que ce n’est pas à toi',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu dis que ce n’est pas à toi. La femme au manteau trop grand te regarde un instant de trop, puis referme la besace et l’emporte.

Deux personnes dans ce camp savent maintenant que tu as tenu parole. Ce n’est pas rien, ici.`,
            effets: [
              { pnj_statut: { id: 'orcal', valeur: 'mort' } },
              { confiance: { pnj: 'brune', valeur: 2 } },
              { differe_resolu: 'promesse_orcal' },
              { flag: 'orcal_perdu' },
              { xp: 14 },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-009',
    titre_travail: 'layon-retour',
    titre_affiche: 'Le Layon',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P04' },
    conditions: { requis: [{ storylet_vu: 'VDG-008' }], interdit: [] },
    unique: false,
    max_vues: 3,
    priorite: 4,
    poids: 12,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Le layon, les noisetiers, les branches sur les deux épaules.`,
      variantes: [
        {
          si: [{ flag: 'layon_abandonne' }],
          ajout: `Le tronc mort est toujours en travers. Il n’y a plus personne dessous. Il y a de la terre remuée sur dix toises.`,
        },
        {
          si: [{ pnj_statut: { id: 'orcal', valeur: 'vivant_allie' } }],
          ajout: `Le trou que sa jambe a creusé sous le tronc est encore net dans les feuilles.`,
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Traverser vite, sans s’arrêter',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu passes en trois minutes ce qui t’en avait coûté trente.`,
            effets: [{ fatigue: 3 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Chercher d’autres entailles de hache sur les troncs',
        cout: { segments: 2 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Tu en trouves quatre autres, toutes à hauteur d’homme, toutes de la même saison. Quelqu’un a préparé ce layon comme on prépare une ligne de collets — sauf qu’un layon, ça ne prend pas des lièvres.

Sous la quatrième, calé dans une fourche, un épieu à hampe courte que la pluie a noirci.`,
            effets: [
              { objet: 'epieu', quantite: 1, prefixe: 'noirci', usure: 58 },
              { fatigue: 6 },
              { xp: 12 },
            ],
          },
          {
            probabilite: 40,
            texte: `Tu passes deux heures le nez sur des écorces. Tu ne trouves rien qu’un vieux nid et une entaille qui pourrait être un coup de sabot.

Le jour a baissé pendant que tu regardais en l’air.`,
            effets: [{ fatigue: 8 }, { faim: 5 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Ressortir par où tu es entré',
        cout: { segments: 1 },
        sortie: true,
        issues: [{ probabilite: 100, texte: `Tu ressors sous le ciel ouvert.`, effets: [{ fatigue: 2 }] }],
      },
    ],
  },
];
