import { p } from './_p';

export const CRETE = {
  // ---------------------------------------------------------------------------
  'VDG-101': {
    id: 'VDG-101',
    options_persistantes: true,
    titre_travail: 'La Crête — observation, temps, carte',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P01' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { obs: 0, compte: false, routes: false, hauteurs: false },
    texte: {
      arrivee: p(
        'La crête est un dos de roche nue, large de six pas, que le vent a décapé jusqu’à l’os. Rien n’y pousse qu’un genévrier rampant et des touffes de fétuque grise, couchées toutes du même côté.',
        'C’est ici qu’était le poste, du temps où le nom du village voulait dire quelque chose. Il en reste quatre assises de pierre sèche en demi-cercle, à hauteur de genou, et un creux rectangulaire que l’herbe a rempli. Les chasseurs s’y arrêtent pour souffler. Vous vous y êtes arrêté deux cents fois.',
        'De là-haut, la vallée tient tout entière dans un seul regard, et c’est précisément pour ça qu’on l’avait bâti là.',
        'Val-de-Garde brûle.',
        'Pas comme un feu de maison — un feu de maison fait une flamme et beaucoup de bruit. Ça, c’est plus lent et plus large : quatorze, quinze foyers distincts qui se rejoignent par le bas, une nappe de fumée brune qui court au ras des toits avant de se décider à monter. Le vent du col la couche vers l’est et l’étire sur toute la longueur du ruisseau.',
        'À cette distance, il n’y a aucun son. Le vent prend tout. C’est ce qu’il y a de plus difficile à supporter : voir ça, et l’entendre comme on entend une image.'
      ),
      base: p(
        'La crête, encore. La pierre, le genévrier rampant, les quatre assises du vieux poste.',
        'En bas, la fumée a changé de forme. Elle ne monte plus droit : elle rampe, plus grise, plus basse. Ce qui devait prendre a pris.'
      ),
      variantes: [
        {
          si: [{ flag: 'vu_de_pres' }],
          tour: 0,
          ajout:
            'Vous avez la joue et la paume écorchées par le muret. De si haut, la ruelle où vous étiez accroupi il y a une heure tient dans l’ongle du pouce.',
        },
        {
          si: [{ meteo: 'brume' }],
          ajout:
            'La brume monte du fond et se mélange à la fumée sans qu’on puisse dire où l’une finit. Ce qui est en dessous de la ligne des peupliers a disparu.',
        },
        {
          si: [{ meteo: 'pluie' }],
          ajout:
            'Il pleut, et la pluie rabat la fumée sur le village au lieu de l’emporter. L’odeur monte jusqu’ici, mouillée, plus lourde.',
        },
        {
          registre: 'epuise',
          ajout:
            'Vous vous asseyez sur l’assise de pierre sans l’avoir décidé. Les jambes lâchent avant la tête, toujours.',
        },
        {
          si: [{ local: 'compte', '=': true }],
          ajout: 'Vous avez arrêté de compter. Vous connaissez le chiffre, maintenant.',
        },
        {
          si: [{ segment: [5, 6] }],
          ajout:
            'Le jour tombe. Les foyers se voient mieux et le reste se voit moins : la vallée se réduit à quinze points orange dans du noir.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Prendre la vallée d’un seul regard.',
        cout: { fatigue: 1 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous faites ce que font les yeux quand on les laisse faire : vous prenez l’ensemble.',
              'Le village brûle par le bas et par le milieu. Le haut, où est la forge, ne brûle pas encore — les toits sont gris, intacts, et c’est pire, parce que ça veut dire qu’il reste quelque chose à brûler.',
              'Le pré communal est vide. Le char à foin est toujours devant chez Sarre, timon en l’air, et il y a des choses par terre autour, immobiles, qui n’y étaient pas ce matin.',
              'Sur la route, à la sortie ouest, une file sombre s’étire sur une centaine de pas. Elle avance.'
            ),
            effets: [{ local: 'obs', '=': 1 }, { xp: 4 }, { carnet: 'val_de_garde' }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Reprendre la file, lentement, du premier au dernier.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        apparait_si: [{ local: 'obs', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous couchez sur la pierre pour stabiliser la tête et vous remontez la file du dernier vers le premier, en marquant chaque silhouette du doigt contre le genévrier.',
              'Trente-deux. Peut-être trente-quatre : deux se confondent au niveau du tournant.',
              'Ils marchent en colonne par deux, avec un intervalle régulier, et trois qui vont et viennent le long de la file sans jamais s’arrêter. Ce n’est pas une bande. Une bande, ça s’étale et ça traîne.',
              'Et surtout : ils vont vers l’ouest.',
              'Vous restez un moment sur ce mot. L’ouest, c’est le col, le comptoir, la Couronne. Les Terres Noires sont derrière eux, à quinze jours de marche dans l’autre sens. On ne vient pas de si loin pour continuer.',
              'Ils déferlent, sans doute. C’est ce que font les vagues : elles vont plus loin que prévu.'
            ),
            effets: [
              { local: 'obs', '=': 2 },
              { flag: 'indice_ouest' },
              { carnet: 'orcs_a_louest' },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Compter ce qui ne bouge plus.',
        cout: { segments: 1, fatigue: 6 },
        epuisable: true,
        apparait_si: [{ local: 'obs', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous savez que c’est inutile et vous le faites quand même, parce qu’un chiffre est une chose qu’on peut tenir.',
              'Onze dans le pré, dispersés sur une bande de cinquante pas, dans le sens de la fuite. Quatre devant le char à foin. Deux sur le seuil de la maison des Mardier, l’un sur l’autre.',
              'Au Bas-Pré, l’herbe fauchée est en andains réguliers jusqu’aux trois quarts de la parcelle. Après, ça s’arrête au milieu d’une passe.',
              'Vous ne reconnaissez personne. À cette distance, un homme couché est une tache claire sur du vert, et rien d’autre. Vous êtes obligé de vous le répéter deux fois.'
            ),
            effets: [
              { local: 'compte', '=': true },
              { flag: 'a_compte' },
              { carnet: 'joe' },
              { fatigue: 3 },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Se retourner. Regarder les hauteurs et les chemins.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ stat: 'perception', '>=': 4 }],
            texte: p(
              'Vous tournez le dos à la vallée. C’est plus facile que vous ne l’auriez cru, et vous n’avez pas envie de savoir ce que ça dit de vous.',
              'Derrière la crête, le versant nord descend en terrasses jusqu’au vallon. Vous connaissez ce pays comme votre main, mais vous ne l’aviez jamais regardé pour y survivre.',
              'La ferme haute des Abeline, à une heure : les bâtiments bas, le toit de la grange, le mur d’enclos. Pas de fumée à sa cheminée, et il devrait y en avoir.',
              'Le fond du vallon, sous les aulnes : la source coule toute l’année, même en août. Deux jours de marche avant la suivante si on prend l’ouest.',
              'Le layon des bûcherons, tiré droit dans le taillis sur presque un quart de lieue. Un chemin où l’on va vite et où l’on se voit de loin.',
              'Plus haut, sur l’épaule est, la tour du vieux poste. Et dans le repli au nord-ouest, au ras du couvert, trois filets de fumée pâle qui ne sont pas des incendies : des feux qu’on entretient bas, exprès.',
              'Il y a des vivants à deux heures de marche.'
            ),
            effets: [
              { local: 'hauteurs', '=': true },
              { decouvre: 'VDG-Z01-P02' },
              { decouvre: 'VDG-Z01-P03' },
              { decouvre: 'VDG-Z01-P04' },
              { decouvre: 'VDG-Z01-P05' },
              { decouvre: 'VDG-Z01-P06' },
              { carnet: 'eau' },
              { carnet: 'vieux_poste' },
              { flag: 'carte_ouverte' },
              { xp: 12 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous tournez le dos à la vallée. C’est plus facile que vous ne l’auriez cru, et vous n’avez pas envie de savoir ce que ça dit de vous.',
              'Le versant nord descend en terrasses jusqu’au vallon. La ferme haute des Abeline, à une heure, bâtiments bas et mur d’enclos. Le fond du vallon sous les aulnes, où la source coule toute l’année. Le layon des bûcherons, droit, rapide, découvert. Et sur l’épaule est, la tour du vieux poste.',
              'Le reste, vous ne le distinguez pas bien : la lumière est mauvaise de ce côté et vos yeux ont regardé trop longtemps du feu.'
            ),
            effets: [
              { local: 'hauteurs', '=': true },
              { decouvre: 'VDG-Z01-P02' },
              { decouvre: 'VDG-Z01-P03' },
              { decouvre: 'VDG-Z01-P04' },
              { decouvre: 'VDG-Z01-P06' },
              { carnet: 'eau' },
              { carnet: 'vieux_poste' },
              { flag: 'carte_ouverte' },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Fouiller le creux du vieux poste.',
        cout: { fatigue: 3 },
        epuisable: true,
        unique_global: true,
        issues: [
          {
            probabilite: 60,
            texte: p(
              'Le creux rectangulaire est plein d’herbe et de terre tassée. C’était la cave à vivres — une chambre de deux pas sur trois, voûtée, dont il ne reste que le fond.',
              'Vous grattez le long du mur nord avec le couteau, là où l’eau ne va pas. Sous une pierre plate : un rouleau de corde de chanvre, raide, gris de poussière, et une boîte à amadou en fer-blanc dont le couvercle est soudé par la rouille. Elle s’ouvre au troisième coup de manche.',
              'Le silex est dedans. La mèche aussi, sèche.',
              'Quelqu’un a laissé ça ici en partant, il y a des années, en se disant qu’il reviendrait.'
            ),
            effets: [
              { objet: 'corde', quantite: 1, usure: 55 },
              { objet: 'amadou', quantite: 1, usure: 70 },
              { xp: 6 },
            ],
          },
          {
            probabilite: 40,
            texte: p(
              'Vous grattez le long des murs, dans les angles, sous les pierres plates. Vous y passez plus de temps que vous n’en aviez l’intention.',
              'De la terre, des racines de fétuque, un tesson de cruche, et l’os long d’un mouton qu’un renard a traîné là.',
              'Vos ongles saignent aux deux index. Le soleil a bougé.'
            ),
            effets: [{ fatigue: 4 }, { xp: 2 }],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter la crête.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ flag: 'carte_ouverte' }],
            texte: p(
              'Vous vous relevez. Les genoux protestent : la pierre est dure et vous y êtes resté plus longtemps que vous ne le croyiez.',
              'Il faut redescendre du côté nord. Pas vers le village — vers le reste.'
            ),
            effets: [],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous vous relevez, et vous vous rendez compte que vous n’avez regardé que dans une seule direction depuis que vous êtes monté.',
              'Vous vous forcez à faire un tour complet sur vous-même, une fois. La ferme haute. Le fond du vallon. Le layon. La tour, sur l’épaule est.',
              'Quatre endroits où aller. C’est déjà quatre de plus que rien.'
            ),
            effets: [
              { decouvre: 'VDG-Z01-P02' },
              { decouvre: 'VDG-Z01-P03' },
              { decouvre: 'VDG-Z01-P04' },
              { decouvre: 'VDG-Z01-P06' },
              { carnet: 'eau' },
              { flag: 'carte_ouverte' },
            ],
          },
        ],
      },
    ],
  },
};
