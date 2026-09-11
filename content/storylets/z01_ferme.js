import { p } from './_p';

export const FERME = {
  // ---------------------------------------------------------------------------
  'VDG-201': {
    id: 'VDG-201',
    options_persistantes: true,
    titre_travail: 'La Ferme — fouille, ressources, scène à états',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P02' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      tour_fait: false,
      logis: false,
      grange: false,
      trappe_vue: false,
      cave: false,
      pot: false,
    },
    texte: {
      arrivee: p(
        'La ferme haute est bâtie en L contre la pente, dos au nord, comme toutes les fermes d’ici. Murs de pierre sèche montés à la main sur une hauteur d’homme et demi, toit de bardeau de mélèze, une grange au bout du bras court.',
        'La porte du logis est ouverte. Elle n’est pas défoncée : elle est ouverte, en grand, et elle bat d’un doigt à chaque souffle de vent en raclant la pierre du seuil. Ce raclement est le seul bruit de la cour.',
        'Il y a du linge sur la corde. Deux chemises et un drap, secs, raidis par le soleil. Personne n’a décroché ce linge.',
        'Dans l’enclos, la barrière est en place, fermée, et les six chèvres sont là. Elles viennent contre les perches quand vous approchez, toutes ensemble, et elles bêlent — ce bêlement long et cassé des bêtes qui n’ont pas été traites. Leurs pis sont durs et luisants.',
        'Rien ne fume dans la cheminée. Rien ne brûle nulle part. La ferme est entière.'
      ),
      base: p(
        'La cour, le linge raide sur la corde, la porte qui racle. Les chèvres se sont tues et vous regardent depuis le fond de l’enclos.'
      ),
      variantes: [
        {
          si: [{ local: 'logis', '=': true }, { non: { local: 'cave', '=': true } }],
          ajout:
            'Par la porte ouverte, on voit le coin de la table et le banc renversé. Vous savez maintenant ce qu’il y a derrière, et vous évitez de regarder de ce côté.',
        },
        {
          si: [{ local: 'grange', '=': true }],
          ajout:
            'La grange est restée ouverte derrière vous. L’odeur de foin sec sort par la porte et se mélange à celle de la cour.',
        },
        {
          si: [{ local: 'cave', '=': true }],
          ajout:
            'La trappe du cellier est relevée, appuyée contre le mur. En bas, la lampe à graisse qu’elle a rallumée fait un rond jaune sur la terre battue.',
        },
        {
          si: [{ meteo: 'vent' }],
          ajout:
            'Le vent force. La porte ne racle plus, elle claque, et les chèvres sursautent à chaque fois.',
        },
        {
          registre: 'affame',
          ajout:
            'Il y a des pommes sur l’étagère du fournil, dehors, alignées sur la planche pour l’hiver. Vous les avez vues en entrant dans la cour, avant tout le reste.',
        },
        {
          si: [{ segment: [6] }],
          ajout:
            'La nuit est tombée sur la cour. Les bâtiments sont deux masses plus noires que le reste, et le linge blanc bouge sur la corde.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Faire le tour par l’extérieur avant d’entrer.',
        cout: { fatigue: 2 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous longez le mur de l’enclos, puis le pignon nord, en lisant le sol.',
              'Ils sont venus par le chemin bas, à huit ou dix. Empreintes larges, semelles cloutées en bordure, un pas long et régulier. Ils sont entrés dans la cour, ils ont fait ce qu’ils avaient à faire, et ils sont repartis par où ils étaient venus.',
              'Personne n’est allé à la grange : le foin répandu devant la porte n’est marqué que par des pattes de poules.',
              'Personne n’est allé à l’enclos non plus. La barrière est fermée à la cheville de bois, du bon côté.',
              'Ils sont restés dans la cour et dans le logis. Un quart d’heure, pas plus.'
            ),
            effets: [{ local: 'tour_fait', '=': true }, { xp: 8 }, { flag: 'ferme_traces_lues' }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Entrer dans le logis.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Le seuil, la pièce unique, le sol de terre battue tassée par quarante ans de pas.',
              'Le banc est renversé. La table ne l’est pas : il y a dessus une écuelle, un couteau à pain et la moitié d’une miche, la mie encore souple au centre.',
              'Le père Abeline est entre la table et l’âtre, sur le dos. Il n’a pas d’arme près de la main et il n’en a jamais eu. Vous le retournez sur le côté et vous lui mettez la couverture du banc sur la tête, ce qui ne sert à rien, ce qui est tout ce que vous savez faire.',
              'Sur la crédence, le pot de terre est à sa place, couvercle posé dessus. Les outils sont au mur, sur leurs chevilles, dans l’ordre. La marmite de cuivre pend à sa crémaillère.',
              'Il n’y a pas un tiroir ouvert dans cette maison.'
            ),
            effets: [
              { local: 'logis', '=': true },
              { objet: 'pain_dur', quantite: 1 },
              { flag: 'logis_visite' },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Soulever le couvercle du pot de terre.',
        cout: { fatigue: 1 },
        epuisable: true,
        apparait_si: [{ local: 'logis', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous soulevez le couvercle parce qu’il faut bien vérifier, et vous savez déjà ce que vous allez trouver.',
              'Quarante-trois pièces de billon et deux d’argent, dans un bas de laine noué. Le compte d’une année de fromages. C’est plus d’argent que vous n’en avez jamais tenu d’un coup.',
              'Vous reposez le couvercle exactement comme il était.',
              'Des hommes sont entrés dans cette maison, ont tué celui qui y vivait, et sont repartis en laissant l’argent sur la crédence, le cuivre à la crémaillère et six chèvres dans l’enclos.',
              'Des bêtes, dit-on. Des bêtes ne volent pas, c’est vrai. Des bêtes n’ouvrent pas les portes sans les défoncer non plus.'
            ),
            effets: [
              { local: 'pot', '=': true },
              { flag: 'indice_rien_pris' },
              { carnet: 'rien_pris' },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Ouvrir la grange.',
        cout: { fatigue: 3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'La grande porte coulisse sur son rail avec un bruit de bois sec. Il fait chaud là-dedans, et l’air est plein de poussière de foin qui se voit dans la raie de lumière.',
              'Le fenil est plein aux trois quarts. Les gerbes de l’année sont entassées contre le mur du fond, liées, dans l’ordre. La charrette est sous l’auvent intérieur, les brancards calés sur une bûche.',
              'Sur l’établi : une pierre à aiguiser creusée en son milieu, un rouleau de cuir brut, une hachette au manche refait au fil de fer.',
              'Vous prenez ce dont vous avez besoin, et vous vous surprenez à le faire vite, comme un homme qui vole.'
            ),
            effets: [
              { local: 'grange', '=': true },
              { objet: 'hachette', quantite: 1, usure: 60 },
              { objet: 'pierre_aiguiser', quantite: 1, usure: 70 },
              { objet: 'cuir_brut', quantite: 2 },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Écouter, dans le logis. Juste écouter.',
        cout: { fatigue: 1 },
        epuisable: true,
        apparait_si: [{ local: 'logis', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous immobilisez au milieu de la pièce et vous laissez tomber le bruit.',
              'La porte qui racle. Les chèvres, dehors, qui ont repris. Une mouche contre le papier huilé de la fenêtre.',
              'Et sous vos pieds, à travers la terre battue, trois coups. Pas des coups au hasard : trois coups, espacés, puis rien. Puis trois coups.',
              'Le tapis de chanvre à côté de l’âtre ne couvre pas un sol plat. Vous le tirez. En dessous, la trappe du cellier, et sur la trappe, la huche à farine qu’on a poussée dessus par-dessous — ce qui ne se fait pas, sauf si on veut que ça ne s’ouvre pas.'
            ),
            effets: [{ local: 'trappe_vue', '=': true }, { xp: 8 }],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Dégager la trappe et l’ouvrir.',
        cout: { segments: 1, fatigue: 5 },
        epuisable: true,
        apparait_si: [{ local: 'trappe_vue', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'La huche est lourde et elle ne glisse pas : il faut la soulever d’un côté, la faire pivoter, et recommencer. Vous y mettez trois bonnes minutes et vous vous relevez avec les reins qui tirent.',
              'Vous frappez trois coups sur le bois, en réponse. En bas, plus rien du tout.',
              'Vous relevez la trappe.',
              'Il y a une femme au pied de l’échelle, debout, un tranchoir à fromage tenu à deux mains, la pointe vers le haut. Elle a soixante ans peut-être, un fichu noué de travers, et elle ne baisse pas le bras tout de suite.',
              'Elle vous regarde longtemps avant de vous reconnaître. Puis elle dit votre nom, avec un point d’interrogation, et le bras descend.',
              'C’est Abeline. Elle est là-dedans depuis le matin. Elle a entendu tout ce qui s’est passé au-dessus de sa tête, et elle n’est pas encore montée voir.'
            ),
            effets: [
              { local: 'cave', '=': true },
              { pnj_statut: { id: 'abeline', valeur: 'vivant_allie' } },
              { confiance: { pnj: 'abeline', valeur: 2 } },
              { carnet: 'abeline' },
              { flag: 'abeline_trouvee' },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: 'G',
        libelle: 'Prendre ce qu’elle vous donne, dans le cellier.',
        cout: { segments: 1 },
        epuisable: true,
        apparait_si: [{ local: 'cave', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Elle descend l’échelle devant vous et elle commence à remplir vos bras sans rien demander, en nommant chaque chose à voix haute comme on fait l’inventaire : lard, là ; lanières, là ; le pot d’onguent de l’hiver dernier, il est bon, il pique mais il est bon ; la toile propre, prenez-en, prenez-en plus que ça.',
              'Elle parle sans arrêt et sans une seule fois s’interrompre. C’est comme ça qu’elle tient debout, et vous la laissez faire.',
              'À un moment elle dit : « Il était à table. » Puis elle continue sur les racines et l’endroit où elles sont rangées.',
              'Elle ne montera pas. Elle vous dira plus tard qu’elle est montée.'
            ),
            effets: [
              { objet: 'viande_seche', quantite: 3 },
              { objet: 'onguent', quantite: 1 },
              { objet: 'bandes_toile', quantite: 2 },
              { objet: 'racines', quantite: 2 },
              { confiance: { pnj: 'abeline', valeur: 1 } },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'H',
        libelle: 'Traire les chèvres avant de partir.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous n’êtes pas bon à ça et elles le sentent. La première vous met un coup de patte dans le seau, la deuxième se laisse faire, les quatre autres attendent leur tour contre la perche parce que c’est l’heure et qu’elles savent compter les heures mieux que les hommes.',
              'Le lait est tiède et il sent l’étable. Vous en buvez deux gorgées à même le seau.',
              'Ensuite vous ouvrez la barrière et vous la calez avec une pierre pour qu’elle ne se referme pas. Elles ne bougent pas. Elles vous regardent partir depuis le milieu de l’enclos, et c’est seulement au bout du chemin qu’on entend la première sortir.'
            ),
            effets: [
              { faim: -20 },
              { fatigue: 2 },
              { flag: 'chevres_liberees' },
              { reputation: { faction: 'couronne', valeur: 1 } },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter la ferme.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'cave', '=': true }],
            texte: p(
              'Vous lui dites où sont les autres — le repli au nord-ouest, les feux bas, à deux heures en longeant le couvert. Elle dit qu’elle connaît. Elle dit qu’elle fermera avant de partir.',
              'Vous traversez la cour. Le linge est toujours sur la corde et il y sera encore demain.'
            ),
            effets: [{ confiance: { pnj: 'abeline', valeur: 1 } }],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous traversez la cour et vous repoussez la porte du logis derrière vous, à fond, jusqu’à ce que le loquet tombe.',
              'Elle ne raclera plus.'
            ),
            effets: [],
          },
        ],
      },
    ],
  },
};
