// VDG-Z01-P02 — système enseigné : la fouille et la scène à états locaux.

export const storyletsFerme = [
  {
    id: 'VDG-003',
    titre_travail: 'ferme-fouille',
    titre_affiche: 'La Ferme',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P02' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { cour: false, grange: false, cellier: false, bruit: 0, prevenu: false },
    texte: {
      base: `La barrière est ouverte. Pas défoncée : ouverte, et le loquet remis dans son cran.

Dans la cour, le vieux Mareuil est couché sur le côté, la joue dans la terre battue, une main encore fermée sur le manche d’une fourche. Sa bourse pend à sa ceinture. Elle est pleine.

La porte de la maison bat toute seule. Personne ne l’a fermée.`,
      variantes: [
        {
          si: [{ local: 'bruit', min: 2 }],
          ajout: `Dans la grange, derrière toi, quelque chose s’est déplacé de tout son poids.`,
        },
        {
          si: [{ local: 'prevenu', valeur: true }],
          ajout: `Tu gardes maintenant la grange dans le coin de l’œil, tout le temps.`,
        },
        {
          si: [{ local: 'cour', valeur: true }, { local: 'cellier', valeur: true }],
          ajout: `Tu as fait le tour de ce qui se ramasse à découvert.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'trop_de_bruit',
        unique: true,
        si: [{ local: 'bruit', min: 3 }],
        alors: [{ local: 'prevenu', '=': true }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Rester sur le seuil et regarder la cour avant d’y entrer',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu ne bouges pas pendant le temps qu’il faut à une ombre pour glisser d’un pouce.

Ce que tu vois : trois corps, deux dans la cour, un contre le mur du fournil. Aucun n’a été retourné. La bourse du vieux est pleine. Les anneaux sont aux doigts. Le grenier à grain n’a pas été ouvert — le cadenas est intact, et il aurait suffi d’un coup de talon.

Ils sont entrés, ils ont tué, ils sont repartis. Ils n’ont rien pris.

Des bêtes ne prennent rien. Ça se tient. Ça ne t’empêche pas d’y revenir en pensée.

Ce que tu vois aussi : la porte de la grange est calée de l’intérieur.`,
            effets: [
              { flag: 'indice_rien_pris' },
              { local: 'prevenu', '=': true },
              { xp: 12 },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Fouiller la cour et le fournil',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 70,
            texte: `Tu prends la bourse du vieux. Elle est lourde et tiède du soleil. Tu la mets dans ta poche sans la regarder.

Dans le fournil, une planche de lard pendue à un croc, et du pain de la semaine, dur comme du bois. Tu prends les deux.`,
            effets: [
              { objet: 'pieces', quantite: 14 },
              { objet: 'lard_sale', quantite: 2 },
              { objet: 'pain_dur', quantite: 2 },
              { local: 'cour', '=': true },
              { local: 'bruit', '=': { increment: 1 } },
              { xp: 8 },
              { fatigue: 4 },
            ],
          },
          {
            probabilite: 30,
            texte: `Tu prends la bourse du vieux. En te relevant, ta hanche accroche la fourche et tout part en avant : le manche claque contre la pierre de l’auge, une, deux, trois fois.

Le bruit dure longtemps dans une cour vide.

Dans le fournil il reste du pain dur. Le reste a déjà été emporté, ou n’a jamais existé.`,
            effets: [
              { objet: 'pieces', quantite: 14 },
              { objet: 'pain_dur', quantite: 2 },
              { local: 'cour', '=': true },
              { local: 'bruit', '=': { increment: 2 } },
              { xp: 6 },
              { fatigue: 4 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Descendre au cellier, sous la maison',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Six marches, et l’air change : terre froide, pomme, vinaigre.

Il reste des navets dans un panier d’osier, une fiole d’huile bouchée à la cire, et sur l’établi, un nécessaire de réparation — alènes, fil poissé, morceaux de cuir. Tout ce qu’il faut pour retenir des choses qui s’en vont.`,
            effets: [
              { objet: 'navets', quantite: 3 },
              { objet: 'huile', quantite: 1 },
              { objet: 'necessaire_de_reparation', quantite: 1, usure: 80 },
              { local: 'cellier', '=': true },
              { xp: 10 },
              { fatigue: 4 },
            ],
          },
          {
            probabilite: 40,
            texte: `Six marches dans le noir. La troisième est pourrie et ton pied passe au travers.

Tu te récupères sur les mains, le tibia raclé sur toute sa longueur. En bas il ne reste presque rien : des navets terreux, une fiole d’huile. Tu remontes en boitant un peu.`,
            effets: [
              { objet: 'navets', quantite: 3 },
              { objet: 'huile', quantite: 1 },
              { sante_heros: -5 },
              { local: 'cellier', '=': true },
              { local: 'bruit', '=': { increment: 1 } },
              { xp: 6 },
              { fatigue: 5 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Ouvrir la grange',
        cout: { segments: 1 },
        apparait_si: [{ ou: [{ local: 'cour', valeur: true }, { local: 'prevenu', valeur: true }] }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu passes la lame dans l’interstice et tu fais sauter la cale.

La porte s’ouvre de dix pouces et l’odeur sort d’un coup : chien mouillé, paille aigre, viande.`,
            effets: [
              { local: 'grange', '=': true },
              { declenche: 'VDG-005' },
              { xp: 4 },
            ],
            sortie: true,
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Traîner le vieux à l’ombre du mur',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Il est plus lourd que tu ne l’aurais cru et il ne t’aide pas. Tu le poses contre le mur du fournil, la fourche à côté de lui, parce que ça t’a semblé être ce qu’il fallait faire.

Tu n’es pas plus riche. Tu respires un peu mieux.`,
            effets: [
              { xp: 6 },
              { fatigue: 6 },
              { flag: 'a_couche_le_vieux' },
              { local: 'bruit', '=': { increment: 1 } },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Quitter la ferme',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu refermes la barrière derrière toi. Le loquet retombe dans son cran, exactement comme tu l’as trouvé.`,
            effets: [{ fatigue: 1 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-005',
    titre_travail: 'ferme-grange',
    titre_affiche: 'La Grange',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 9,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { compte: 0, recule: false },
    texte: {
      base: `Ils sont trois. C’étaient des chiens de ferme il y a deux jours : le collier est encore là, sur celui du milieu.

Ils ne grognent pas. Ils te regardent, la tête basse, et ils se placent — un devant, deux qui s’écartent lentement vers tes flancs. Personne ne leur a appris ça. C’est revenu tout seul.

Derrière eux, dans la paille, ce qu’ils mangeaient.`,
      variantes: [
        {
          si: [{ local: 'recule', valeur: true }],
          ajout: `Tu as reculé d’un pas. Ils ont avancé de deux.`,
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Tenir la porte ouverte de dix pouces et ne pas entrer',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu restes dans l’encadrement, l’épaule contre le bois. Ils ne peuvent te venir dessus qu’un par un.

Le premier essaie. Tu le vois décider avant qu’il ne bouge.`,
            effets: [{ local: 'compte', '=': { increment: 1 } }, { xp: 6 }, { fatigue: 3 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Tirer sur celui du milieu',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'arc_de_chasse' }, { objet: 'fleche', min: 1 }],
        sortie: false,
        issues: [
          {
            probabilite: 65,
            condition_texte: [{ stat: 'adresse', min: 4 }],
            texte: `À cette distance tu ne peux pas manquer, et tu ne manques pas. Il tombe sans un bruit et les deux autres reculent de trois pas — pas de peur : de recalcul.

Tu récupères ta flèche. Elle est utilisable une fois de plus, peut-être deux.`,
            effets: [
              { objet: 'fleche', quantite: -1 },
              { local: 'compte', '=': { increment: 2 } },
              { xp: 12 },
              { usure: 'arc_de_chasse', valeur: -3 },
            ],
          },
          {
            probabilite: 35,
            texte: `Tu tires trop vite. La flèche prend le chien à l’épaule et l’ouvre sans l’arrêter.

Il hurle — le premier vrai bruit depuis que tu es entré dans cette cour — et les trois viennent d’un coup.`,
            effets: [
              { objet: 'fleche', quantite: -1 },
              { sante_heros: -6 },
              { local: 'compte', '=': { increment: 1 } },
              { xp: 6 },
              { usure: 'arc_de_chasse', valeur: -3 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Leur jeter le lièvre et refermer',
        cout: { segments: 1 },
        apparait_si: [{ objet: 'gibier_du_jour', min: 1 }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu le lances au fond de la grange. Le bruit mou qu’il fait en tombant les retourne tous les trois d’un seul mouvement.

Tu tires la porte, tu remets la cale, tu t’adosses au bois. De l’autre côté, ça se dispute pour ta journée de chasse.

Tu as encore tes deux mains. C’était le prix.`,
            effets: [
              { objet: 'gibier_du_jour', quantite: -1 },
              { xp: 10 },
              { flag: 'grange_scellee' },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Entrer, couteau bas, et prendre la paille au fond',
        cout: { segments: 1 },
        apparait_si: [{ local: 'compte', min: 1 }],
        sortie: true,
        issues: [
          {
            probabilite: 55,
            texte: `Tu entres. Ça dure moins longtemps que ça n’en a l’air.

Le premier te prend l’avant-bras et tu le laisses le prendre, parce que ça te donne son cou. Les deux autres décident que le fond de la grange n’était pas si important.

Dans la paille, sous une bâche : une hachette de bûcheron, une couverture, une lanterne dont le verre tient encore.`,
            effets: [
              { sante_heros: -8 },
              { etat: 'blesse_leger' },
              { objet: 'hachette', quantite: 1, usure: 68 },
              { objet: 'couverture', quantite: 1, usure: 70 },
              { objet: 'lanterne', quantite: 1, prefixe: 'noirci', usure: 55 },
              { usure: 'couteau_de_chasse', valeur: -8 },
              { xp: 20 },
            ],
          },
          {
            probabilite: 45,
            texte: `Tu entres. Ça dure plus longtemps que ça n’en a l’air.

Ils te mettent au sol et tu passes un temps considérable à protéger ta gorge avec un coude. Quand tu te relèves, deux ont fui par la trappe à foin et le troisième ne se relèvera pas.

Tu saignes de six endroits. Sous la bâche, au fond : une hachette et une couverture. Tu prends, tu sors, tu ne regardes pas ce qu’il y avait d’autre.`,
            effets: [
              { sante_heros: -14 },
              { etat: 'blesse_leger' },
              { objet: 'hachette', quantite: 1, usure: 68 },
              { objet: 'couverture', quantite: 1, usure: 70 },
              { usure: 'couteau_de_chasse', valeur: -12 },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Repousser la porte et remettre la cale',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu remets la cale d’un coup de talon et tu t’écartes.

Ce qu’il y avait au fond de cette grange y restera. C’est peut-être mieux.`,
            effets: [{ flag: 'grange_scellee' }, { fatigue: 2 }, { xp: 4 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-004',
    titre_travail: 'ferme-retour',
    titre_affiche: 'La Ferme',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P02' },
    conditions: { requis: [{ storylet_vu: 'VDG-003' }], interdit: [] },
    unique: false,
    max_vues: 2,
    priorite: 4,
    poids: 12,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `La cour est comme tu l’as laissée. C’est ça qui est difficile.`,
      variantes: [
        {
          si: [{ flag: 'a_couche_le_vieux' }],
          ajout: `Le vieux est toujours contre le mur du fournil, la fourche à côté de lui.`,
        },
        {
          si: [{ flag: 'grange_scellee' }],
          ajout: `Derrière la porte de la grange, plus rien ne bouge depuis un moment.`,
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Repasser dans les mêmes coins, plus lentement',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 50,
            texte: `Sous le banc du fournil, une bande de toile propre, roulée serré, que quelqu’un gardait là pour les mauvais jours.`,
            effets: [{ objet: 'bandage_de_toile', quantite: 2 }, { xp: 5 }, { fatigue: 4 }],
          },
          {
            probabilite: 50,
            texte: `Rien. Tu retournes les mêmes paniers vides, tu soulèves les mêmes planches. Tu perds une heure à refuser de le croire.`,
            effets: [{ xp: 2 }, { fatigue: 5 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Casser du bois et faire du feu dans le fournil',
        cout: { segments: 2 },
        apparait_si: [{ objet: 'silex' }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Le four tire encore. Tu fais chauffer ce que tu portes, tu manges assis par terre, le dos contre la pierre tiède.

Pendant une heure, tu n’es nulle part.`,
            effets: [{ faim: -25 }, { fatigue: -14 }, { sante_heros: 4 }, { xp: 5 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Reprendre la route',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          { probabilite: 100, texte: `Tu refermes la barrière. Encore.`, effets: [{ fatigue: 1 }] },
        ],
      },
    ],
  },
];
