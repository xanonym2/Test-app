// VDG-Z01-P06 — système enseigné : l'équipement, l'usure, le portage.
// Contient aussi le combat narratif (VDG-017), déclenché depuis le poste.

export const storyletsPoste = [
  {
    id: 'VDG-016',
    titre_travail: 'poste-equipement',
    titre_affiche: 'Le Vieux Poste',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P06' },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 8,
    poids: 100,
    duree_segments: 0,
    etat_local_initial: { rateliers: false, plancher: false, ecoute: false, bruit: 0 },
    texte: {
      base: `Un corps de garde en pierre sèche, un toit d’ardoise à moitié tombé, une porte qui tient encore sur un gond.

Dedans : quatre paillasses vides, un âtre froid, deux râteliers au mur. Sur le sol, la poussière est marquée par des roues étroites — des chariots chargés, sortis en file, pas en panique. Il y a huit jours ou dix.

Ils sont partis en emportant l’essentiel et en laissant le reste. C’est le reste qui t’intéresse.`,
      variantes: [
        {
          si: [{ local: 'rateliers', valeur: true }],
          ajout: `Les râteliers sont vides à présent. Tu as pris ce qui pouvait servir.`,
        },
        {
          si: [{ local: 'bruit', min: 2 }],
          ajout: `Dehors, du côté du mur nord, un caillou a roulé. Puis plus rien du tout, ce qui est pire.`,
        },
        {
          si: [{ flag: 'sait_reserve_poste' }, { local: 'plancher', valeur: false }],
          ajout: `Trois pas de l’âtre, mur nord. C’est ce qu’on t’a dit.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'quelqu_un_dehors',
        unique: true,
        si: [{ local: 'bruit', min: 3 }],
        alors: [{ local: 'traque', '=': true }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Rester dans l’encadrement et écouter le dehors avant d’entrer',
        observation: true,
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu ne rentres pas tout de suite. Tu comptes jusqu’à cent en respirant par le nez.

Le vent dans l’ardoise cassée. Un merle. Rien qui marche.

Ce que tu vois, en revanche, depuis le seuil : le mur nord a une fenêtre étroite sans volet, à hauteur de poitrine, et le sol est mou en dessous. Par là, on entre et on sort sans passer par la porte.`,
            effets: [
              { local: 'ecoute', '=': true },
              { flag: 'connait_fenetre_poste' },
              { xp: 10 },
              { fatigue: 2 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Décrocher ce qui reste aux râteliers',
        cout: { segments: 1 },
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 60,
            texte: `Une lame longue de garnison, sans fourreau, la garde piquée mais le fil encore droit. Un épieu à hampe de frêne. Une pierre à aiguiser dans une boîte de bois.

Tu soupèses la lame. Elle pèse ce que pèse une lame : beaucoup plus qu’un couteau, et il faudra la porter toute la journée, tous les jours.`,
            effets: [
              { objet: 'lame_de_garnison', quantite: 1, suffixe: 'de_garnison', usure: 66 },
              { objet: 'epieu', quantite: 1, usure: 74 },
              { objet: 'pierre_a_aiguiser', quantite: 1 },
              { local: 'rateliers', '=': true },
              { local: 'bruit', '=': { increment: 1 } },
              { xp: 12 },
              { fatigue: 3 },
            ],
          },
          {
            probabilite: 40,
            texte: `Le premier râtelier est vide. Le second tient une lame longue rouillée sur toute sa largeur, et un épieu dont la hampe a travaillé.

En les décrochant, tu fais tomber le râtelier entier. Le fracas dure trois secondes et s’entend de très loin.`,
            effets: [
              { objet: 'lame_de_garnison', quantite: 1, prefixe: 'rouille', usure: 42 },
              { objet: 'epieu', quantite: 1, prefixe: 'fendu', usure: 38 },
              { local: 'rateliers', '=': true },
              { local: 'bruit', '=': { increment: 2 } },
              { xp: 8 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Lever les lames du plancher, mur nord, trois pas de l’âtre',
        cout: { segments: 1 },
        apparait_si: [{ flag: 'sait_reserve_poste' }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `La troisième lame se lève sans forcer : elle n’était pas clouée, seulement posée juste.

Dessous, dans un creux tapissé de toile huilée : un sac de toile en bon état, deux pots d’onguent, un nécessaire de réparation complet, et une poignée de flèches à empennage de corbeau, roulées ensemble.

Quelqu’un a rangé ça pour lui-même, en pensant revenir.`,
            effets: [
              { objet: 'sac_de_toile', quantite: 1, suffixe: 'de_bonne_facture', usure: 92 },
              { objet: 'onguent', quantite: 2 },
              { objet: 'necessaire_de_reparation', quantite: 1, usure: 90 },
              { objet: 'fleche', quantite: 6 },
              { local: 'plancher', '=': true },
              { xp: 24 },
              { fatigue: 4 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Passer un moment à remettre en état ce que tu portes',
        cout: { segments: 2 },
        apparait_si: [{ objet: 'necessaire_de_reparation', min: 1 }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu t’assieds sur une paillasse, tu sors le fil poissé et les alènes, et tu travailles jusqu’à ce que la lumière baisse.

La corde de l’arc reprend sa tension. Le manche du couteau cesse de tourner dans la main. Ce n’est pas du neuf. C’est ce qui empêche le vieux de casser au mauvais moment.`,
            effets: [
              { usure: 'arc_de_chasse', valeur: 20 },
              { usure: 'couteau_de_chasse', valeur: 18 },
              { usure: 'necessaire_de_reparation', valeur: -25 },
              { fatigue: 6 },
              { xp: 14 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Sortir voir ce qui a fait rouler le caillou',
        cout: { segments: 1 },
        apparait_si: [{ local: 'bruit', min: 2 }],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu sors par la porte, à découvert, l’arc bas.

Il est à quinze pas du mur nord, immobile depuis un moment déjà. Épaules hautes, cuir bouilli, une hache courte tenue le long de la cuisse.

Il ne crie pas. Il ne recule pas. Il tourne la tête vers toi et il commence à marcher.`,
            effets: [{ declenche: 'VDG-017' }, { xp: 6 }],
            sortie: true,
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Quitter le poste',
        cout: { segments: 1 },
        sortie: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'bruit', max: 1 }],
            texte: `Tu sors, tu remets la porte contre son gond, et tu t’éloignes par le sud.`,
            effets: [{ fatigue: 2 }],
          },
          {
            probabilite: 100,
            condition_texte: [{ local: 'bruit', min: 2 }],
            texte: `Tu sors par la porte et tu t’arrêtes net.

Il est à quinze pas du mur nord, immobile. Épaules hautes, cuir bouilli, une hache courte le long de la cuisse. Il t’a entendu bien avant que tu ne sortes.

Il commence à marcher.`,
            effets: [{ declenche: 'VDG-017' }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-017',
    titre_travail: 'combat-eclaireur',
    titre_affiche: 'Devant le mur nord',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 10,
    poids: 100,
    duree_segments: 0,
    deterministe: true,
    // Dégâts déterministes. Ce que le joueur ignore : combien ils sont.
    etat_local_initial: {
      sante_ennemi: 14,
      distance: 'loin',
      tours: 0,
      su: false,
      second_engage: false,
      fini: false,
    },
    effets_entree: [
      { local_aleatoire: { nom: 'nombre', valeurs: ['un', 'deux'], poids: [55, 45] } },
    ],
    texte: {
      base: `Quinze pas. Il marche sans se presser, la hache le long de la cuisse, et il ne regarde pas tes mains : il regarde tes pieds.

Tu ne sais pas ce qu’il y a derrière lui.`,
      variantes: [
        {
          si: [{ local: 'distance', valeur: 'contact' }],
          remplace: `Il est sur toi. À cette distance l’arc ne vaut plus rien et tout se joue sur une demi-seconde de retard.

Son souffle sent le cuir mouillé.`,
        },
        {
          si: [{ local: 'su', valeur: true }, { local: 'nombre', valeur: 'deux' }],
          ajout: `Il y en a un second, plus bas, dans les genêts. Il ne bouge pas encore.`,
        },
        {
          si: [{ local: 'su', valeur: true }, { local: 'nombre', valeur: 'un' }],
          ajout: `Il est seul. Tu en es sûr, maintenant, et ça change tout.`,
        },
        {
          si: [{ local: 'sante_ennemi', max: 5 }, { local: 'fini', valeur: false }],
          ajout: `Il tient son bras gauche contre lui. Il ne l’a pas fait exprès.`,
        },
        {
          // Dernière variante : elle l'emporte sur les précédentes une fois
          // le combat terminé, sinon la scène rejouerait son texte d'entrée.
          si: [{ local: 'fini', valeur: true }],
          remplace: `Le vent est revenu. Tu l’entends de nouveau, ce qui veut dire que tu avais cessé de l’entendre.

Devant le mur nord, le corps, le cuir bouilli, la hache courte tombée à plat. Les genêts ne bougent pas.`,
        },
      ],
    },
    regles_locales: [
      {
        id: 'le_second_arrive',
        unique: true,
        si: [{ local: 'sante_ennemi', max: 0 }, { local: 'nombre', valeur: 'deux' }, { local: 'second_engage', valeur: false }],
        alors: [
          { local: 'second_engage', '=': true },
          { local: 'sante_ennemi', '=': 10 },
          { local: 'distance', '=': 'contact' },
          { local: 'su', '=': true },
          {
            texte_force: `Le premier tombe sur les genoux, puis sur la face, et ne se relève pas.

Le second sort des genêts en courant. Il ne crie pas non plus. Il a vu ce que tu venais de faire et il vient quand même.

Il est déjà sur toi.`,
          },
        ],
      },
      {
        id: 'termine',
        unique: true,
        si: [
          { local: 'sante_ennemi', max: 0 },
          { ou: [{ local: 'nombre', valeur: 'un' }, { local: 'second_engage', valeur: true }] },
        ],
        alors: [
          { local: 'fini', '=': true },
          { xp: 30 },
          {
            texte_force: `C’est fini. Ça a duré moins longtemps que le temps qu’il t’a fallu pour décider de sortir.

Tu restes debout, la respiration en morceaux, et tu écoutes les genêts pendant une longue minute. Rien ne bouge.

Le corps est là, à tes pieds. Le cuir bouilli, la hache courte, une besace en travers du dos.`,
          },
        ],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Le laisser venir et regarder derrière lui',
        observation: true,
        apparait_si: [{ local: 'fini', valeur: false }, { local: 'su', valeur: false }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu ne bouges pas. Tu le laisses avancer de six pas et tu regardes par-dessus son épaule, dans les genêts, là où le vert est plus sombre.

Tu sais ce que ça te coûte : six pas.`,
            effets: [
              { local: 'su', '=': true },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Tirer, puis tirer encore',
        apparait_si: [
          { local: 'fini', valeur: false },
          { local: 'distance', valeur: 'loin' },
          { objet: 'arc_de_chasse' },
          { objet: 'fleche', min: 1 },
        ],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ stat: 'adresse', min: 4 }],
            texte: `Première flèche dans la cuisse. Il ne s’arrête pas, il change juste de jambe d’appui.

Deuxième au-dessus de la ceinture, appuyée. Là il s’arrête.

Il reprend sa marche trois secondes plus tard, et ces trois secondes ne reviendront pas.`,
            effets: [
              { objet: 'fleche', quantite: -2 },
              { local: 'sante_ennemi', '=': { increment: -9 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { usure: 'arc_de_chasse', valeur: -5 },
              { xp: 8 },
            ],
          },
          {
            probabilite: 100,
            texte: `Première flèche haute, elle lui passe au-dessus de l’épaule.

Deuxième dans le flanc, mal placée, à moitié dans le cuir. Il l’arrache en marchant.`,
            effets: [
              { objet: 'fleche', quantite: -2 },
              { local: 'sante_ennemi', '=': { increment: -5 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { usure: 'arc_de_chasse', valeur: -5 },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Tenir l’épieu à l’allonge et lui laisser venir dessus',
        apparait_si: [{ local: 'fini', valeur: false }, { local: 'distance', valeur: 'contact' }, { objet: 'epieu' }],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu cales le talon de la hampe contre la pierre et tu tiens.

Il entre dedans. Pas par bêtise : parce qu’il a calculé qu’il pouvait le faire et arriver quand même à toi.

La pointe entre de quatre pouces. Sa hache t’arrive dans l’épaule à plat, et la hampe casse.`,
            effets: [
              { local: 'sante_ennemi', '=': { increment: -8 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { sante_heros: -7 },
              { usure: 'epieu', valeur: -45 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Rentrer dans sa garde, tout de suite, sans attendre',
        apparait_si: [{ local: 'fini', valeur: false }, { local: 'distance', valeur: 'contact' }],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ stat: 'vigueur', min: 4 }],
            texte: `Tu pars en avant au lieu de reculer, ce à quoi il ne s’attendait pas.

Tu lui prends le poignet de la hache à deux mains et tu le mets dans le mur. Deux fois. La troisième, tu as le couteau.`,
            effets: [
              { local: 'sante_ennemi', '=': { increment: -11 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { sante_heros: -5 },
              { usure: 'couteau_de_chasse', valeur: -10 },
              { xp: 12 },
            ],
          },
          {
            probabilite: 100,
            texte: `Tu pars en avant. Il l’avait prévu.

Le manche de la hache te prend en travers des côtes et tu finis à genoux. Tu lui ouvres la jambe en te relevant, parce que c’est ce qui passait à portée.`,
            effets: [
              { local: 'sante_ennemi', '=': { increment: -6 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { sante_heros: -11 },
              { etat: 'blesse_leger' },
              { usure: 'couteau_de_chasse', valeur: -10 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Repasser par la fenêtre du mur nord et tirer la porte',
        apparait_si: [
          { local: 'fini', valeur: false },
          { local: 'distance', valeur: 'loin' },
          { flag: 'connait_fenetre_poste' },
        ],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu recules jusqu’à la fenêtre étroite et tu passes dedans à reculons, l’épaule d’abord.

Il arrive au moment où tu tires la porte du corps de garde. Il tape trois fois. Puis il arrête — et le silence est bien pire que les coups.

Tu restes le dos contre le bois jusqu’à ce que la nuit tombe. Le poste n’est plus à toi.`,
            effets: [
              { lieu_bloque: { id: 'VDG-Z01-P06', duree_jours: 2 } },
              { segments: -2 },
              { fatigue: 12 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Rompre par le sud, en abandonnant ce qui te ralentit',
        apparait_si: [{ local: 'fini', valeur: false }],
        sortie: true,
        issues: [
          {
            probabilite: 60,
            texte: `Tu jettes ce que tu as de plus lourd et tu pars plein sud, dans la pente.

Il te suit sur trois cents pas et il s’arrête. Les éclaireurs ne s’éloignent pas de ce qu’ils éclairent.

Tu arrives en bas les jambes en coton, sans ce que tu venais de ramasser.`,
            effets: [
              { objet: 'epieu', quantite: -1 },
              { objet: 'lame_de_garnison', quantite: -1 },
              { lieu_bloque: { id: 'VDG-Z01-P06', duree_jours: 2 } },
              { fatigue: 20 },
              { xp: 8 },
            ],
          },
          {
            probabilite: 40,
            texte: `Tu jettes ce que tu as de plus lourd et tu pars plein sud.

Il te suit plus longtemps que tu ne l’aurais cru. Sur le dernier replat, tu mets le pied dans un trou et tu descends les vingt derniers pieds sur le flanc.

Quand tu te relèves, il n’est plus là. Ta jambe, elle, est encore là, et elle te le fait savoir.`,
            effets: [
              { objet: 'epieu', quantite: -1 },
              { objet: 'lame_de_garnison', quantite: -1 },
              { lieu_bloque: { id: 'VDG-Z01-P06', duree_jours: 2 } },
              { sante_heros: -8 },
              { etat: 'blesse_jambe' },
              { fatigue: 20 },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'I',
        libelle: 'Reculer d’un pas et le laisser se découvrir',
        apparait_si: [{ local: 'fini', valeur: false }],
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu recules d’un pas, l’arme basse, et tu ne fais rien d’autre.

Il avance, et pour avancer il faut bien qu’il ouvre quelque chose. Tu prends ce qui passe : le dessus du genou, en remontant.

Il te le rend sur l’avant-bras que tu as levé trop tard.`,
            effets: [
              { local: 'sante_ennemi', '=': { increment: -5 } },
              { local: 'distance', '=': 'contact' },
              { local: 'tours', '=': { increment: 1 } },
              { sante_heros: -3 },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'G',
        libelle: 'Fouiller le corps',
        apparait_si: [{ local: 'fini', valeur: true }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `La besace contient de la viande séchée qui n’est pas de chez vous, une gourde en peau, et une bande de toile enroulée autour d’un galet plat gravé de traits.

Pas une pièce. Pas un bijou. Rien qui vienne du val — et il en sort, pourtant.

La hache courte est bonne. Le manche est court pour ta main, mais le fer tient.`,
            effets: [
              { objet: 'hachette', quantite: 1, prefixe: 'solide', usure: 78 },
              { objet: 'lard_sale', quantite: 2 },
              { objet: 'eau_claire', quantite: 1 },
              { flag: 'fouille_eclaireur' },
              { xp: 14 },
              { fatigue: 3 },
            ],
          },
        ],
      },
      {
        id: 'H',
        libelle: 'Récupérer tes flèches',
        apparait_si: [{ local: 'fini', valeur: true }],
        epuisable: true,
        sortie: false,
        issues: [
          {
            probabilite: 55,
            texte: `Deux sont récupérables. La troisième s’est ouverte en éventail contre une côte.`,
            effets: [{ objet: 'fleche', quantite: 2 }, { xp: 4 }, { fatigue: 2 }],
          },
          {
            probabilite: 45,
            texte: `Une seule ressort entière. Tu la nettoies sur l’herbe et tu la remets au carquois.`,
            effets: [{ objet: 'fleche', quantite: 1 }, { xp: 3 }, { fatigue: 2 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'T’éloigner du mur nord',
        apparait_si: [{ local: 'fini', valeur: true }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu ramasses ton arc et tu t’en vas sans courir, parce que courir maintenant serait ridicule.

Tu te retournes deux fois avant le premier tournant.`,
            effets: [{ fatigue: 6 }],
          },
        ],
      },
    ],
  },

  {
    id: 'VDG-018',
    titre_travail: 'poste-retour',
    titre_affiche: 'Le Vieux Poste',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P06' },
    conditions: { requis: [{ storylet_vu: 'VDG-016' }], interdit: [] },
    unique: false,
    max_vues: 3,
    priorite: 4,
    poids: 14,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      base: `Le corps de garde, l’âtre froid, les quatre paillasses. Un toit à moitié tombé, mais un toit.`,
      variantes: [
        { si: [{ flag: 'fouille_eclaireur' }], ajout: `Le sol devant le mur nord a été gratté par quelque chose. Le corps n’y est plus.` },
        { si: [{ segment: { min: 5 } }], ajout: `Il fait presque noir dedans. On y dormirait mieux qu’à découvert.` },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Faire du feu dans l’âtre et passer la nuit ici',
        cout: { segments: 3 },
        apparait_si: [{ segment: { min: 5 } }],
        sortie: true,
        issues: [
          {
            probabilite: 100,
            texte: `Tu casses une paillasse pour le bois, tu allumes petit, et tu dors avec la lame à portée de main.

Le toit tient. La pierre garde un peu de chaleur. Tu te réveilles avant l’aube, d’un coup, sans savoir pourquoi — et il n’y a rien.`,
            effets: [{ fatigue: -45 }, { faim: 14 }, { sante_heros: 8 }, { xp: 6 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Reprendre l’entretien de ce que tu portes',
        cout: { segments: 2 },
        apparait_si: [{ objet: 'necessaire_de_reparation', min: 1 }],
        sortie: false,
        issues: [
          {
            probabilite: 70,
            texte: `Tu poses tout par terre, dans l’ordre, et tu reprends ce qui peut l’être. La pierre à aiguiser mord bien.`,
            effets: [
              { usure: 'lame_de_garnison', valeur: 22 },
              { usure: 'arc_de_chasse', valeur: 15 },
              { usure: 'necessaire_de_reparation', valeur: -20 },
              { fatigue: 6 },
              { xp: 8 },
            ],
          },
          {
            probabilite: 30,
            texte: `Tu forces sur une alène et elle casse net dans le cuir. Tu passes le reste du temps à réparer ta réparation.`,
            effets: [
              { usure: 'arc_de_chasse', valeur: 8 },
              { usure: 'necessaire_de_reparation', valeur: -35 },
              { fatigue: 7 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Trier ce que tu portes et laisser le reste sur une paillasse',
        cout: { segments: 1 },
        sortie: false,
        issues: [
          {
            probabilite: 100,
            texte: `Tu étales tout et tu regardes ce que tu traînes depuis deux jours sans t’en servir.

Tu laisses ce qui pèse et ne sert pas. Ça fait moins d’épaules à la fin de la journée.`,
            effets: [{ objet: 'navets', quantite: -2 }, { objet: 'pieces', quantite: -4 }, { fatigue: -6 }, { xp: 6 }],
          },
        ],
      },
      {
        id: 'Z',
        libelle: 'Repartir',
        cout: { segments: 1 },
        sortie: true,
        issues: [{ probabilite: 100, texte: `Tu remets la porte contre son gond.`, effets: [{ fatigue: 2 }] }],
      },
    ],
  },
];
