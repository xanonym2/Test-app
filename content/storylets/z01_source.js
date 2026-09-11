import { p } from './_p';

export const SOURCE = {
  // ---------------------------------------------------------------------------
  'VDG-301': {
    id: 'VDG-301',
    options_persistantes: true,
    titre_travail: 'La Source — survie, partage, respiration',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P03' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { bu: false, rempli: false, assis: false, feu: false },
    texte: {
      arrivee: p(
        'On l’entend avant de la voir, et on la sent avant de l’entendre : l’air devient plus frais de cinq pas, d’un coup, comme quand on entre dans une cave.',
        'La source sort au pied d’une dalle de calcaire, sous trois aulnes dont les racines pendent à nu au-dessus du vide qu’elle a creusé. Elle ne jaillit pas. Elle sourd, sans bruit, et c’est la chute d’un pied plus bas, sur les galets, qui fait tout le son du vallon.',
        'Le bassin tient dans deux bras. Le fond est de sable clair et il bouge en permanence, par petites bouffées, là où l’eau entre. Il y a du cresson sur toute la rive gauche, épais, vert cru, et des traces partout dans la boue de la rive droite : chevreuil, sanglier, blaireau, et des poules d’eau qui sont parties à votre arrivée.',
        'Tout ce qui vit à deux heures d’ici vient boire à cet endroit. C’est la seule eau qui tienne l’été entre la vallée et le col — deux jours de marche avant la suivante si on prend l’ouest, et il n’y a rien entre les deux.',
        'La mousse sur la dalle est du même vert qu’il y a vingt ans, quand on venait s’y baigner en juillet à six ou sept, et que l’eau était trop froide pour qu’on y reste.',
        'Elle est toujours trop froide. C’est étrangement bon de trouver quelque chose d’inchangé.'
      ),
      base: p(
        'La source, sous les aulnes. L’eau sourd sans bruit et tombe sur les galets un pied plus bas. Le cresson, le sable clair, le froid qui monte de la dalle.',
        'Rien n’a bougé ici. Rien ne bougera.'
      ),
      variantes: [
        {
          si: [{ local: 'bu', '=': true }],
          ajout:
            'Vous avez encore le goût de pierre dans la bouche. L’eau d’ici a toujours eu ce goût-là, et on ne s’en rend compte qu’ailleurs.',
        },
        {
          si: [{ local: 'feu', '=': true }],
          ajout:
            'Le feu est bas, au ras des galets, entre deux pierres plates. Il ne fume presque pas : le bois d’aulne mort est sec et les braises tiennent toutes seules.',
        },
        {
          registre: 'blesse',
          ajout:
            'Chaque fois que vous vous accroupissez, la blessure se rappelle à vous d’un coup sec, puis se tait. L’eau froide, là-dessus, ferait du bien ou ferait très mal.',
        },
        {
          registre: 'epuise',
          remplace: p(
            'L’eau. Le froid. Les aulnes.',
            'Vous vous asseyez sur la dalle sans avoir cherché où vous asseoir. Le vallon se réduit à trois choses : le bruit des galets, la fraîcheur sur les avant-bras, et le poids de vos propres jambes.',
            'Il faudrait boire. Vous y arriverez dans un instant.'
          ),
        },
        {
          si: [{ meteo: 'pluie' }],
          ajout:
            'Il pleut à travers les aulnes, par gouttes lourdes et espacées qui font des ronds sur le bassin. Les feuilles renvoient un bruit différent de celui des galets.',
        },
        {
          si: [{ segment: [5, 6] }],
          ajout:
            'La lumière est partie du vallon avant d’être partie du ciel. Sous les aulnes, on distingue l’eau à sa seule brillance.',
        },
      ],
    },
    options: [
      {
        id: 'A',
        libelle: 'Boire. Longtemps.',
        cout: { fatigue: -3 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous couchez sur le ventre à plat sur la dalle, les deux mains dans le sable, et vous buvez directement au point où elle sort.',
              'Elle est si froide qu’elle fait mal aux dents de devant et qu’il faut s’arrêter deux fois. Elle a un goût de pierre mouillée et, tout au fond, quelque chose de métallique.',
              'Vous buvez plus que vous n’avez soif, par principe, parce qu’un homme qui boit son content à une source en emporte l’équivalent d’une demi-outre dans le ventre.',
              'Quand vous relevez la tête, vous avez les avant-bras engourdis jusqu’au coude et le souffle court, et vous restez une minute le front contre la mousse.'
            ),
            effets: [
              { local: 'bu', '=': true },
              { fatigue: -8 },
              { faim: -4 },
              { carnet: 'eau' },
              { xp: 3 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Remplir l’outre.',
        cout: { fatigue: 1 },
        epuisable: true,
        apparait_si: [{ objet: 'outre', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous débouchez l’outre et vous la tenez sous la chute, à l’endroit où l’eau tombe le plus dru. Elle se remplit par à-coups, en glougloutant, et il faut la secouer pour chasser l’air.',
              'Pleine, elle pèse. Beaucoup plus qu’on ne s’y attend à chaque fois — trois bonnes livres qui vont vous battre la hanche pendant des heures.',
              'Vous la pesez une seconde dans la main avant de passer la bandoulière. Trois livres, c’est deux jours. C’est le prix, et c’est bon marché.'
            ),
            effets: [
              { local: 'rempli', '=': true },
              { outre: true },
              { carnet: 'eau' },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Défaire la chaussure. Mettre les pieds dans le bassin.',
        cout: { segments: 1, fatigue: -8 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous délacez, vous décollez le bas de laine — ce geste-là, tous les jours, et il n’est jamais agréable — et vous mettez les deux pieds dans le sable du fond.',
              'La première seconde est insupportable. La dixième est la meilleure chose qui vous soit arrivée aujourd’hui.',
              'Vous restez assis sur la dalle, les mains en arrière, la tête renversée. Au-dessus, les feuilles d’aulne bougent d’une seule pièce et laissent passer des morceaux de ciel.',
              'Une poule d’eau revient sur la rive gauche, vous voit, ne s’en va pas.',
              'Pendant un moment qui dure peut-être un quart d’heure, il n’y a rien d’autre que ça. Pas d’oubli — on n’oublie pas —, mais quelque chose qui se desserre, à l’endroit des côtes, et qui vous laisse respirer plus bas.'
            ),
            effets: [
              { local: 'assis', '=': true },
              { fatigue: -14 },
              { sante_heros: 2 },
              { flag: 'souffle' },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Laver la plaie à l’eau froide.',
        cout: { fatigue: 2 },
        epuisable: true,
        apparait_si: [
          { ou: [{ etat: 'blesse_leger' }, { etat: 'blesse_jambe' }] },
        ],
        issues: [
          {
            probabilite: 70,
            condition_texte: [{ objet: 'bandes_toile', '>=': 1 }],
            texte: p(
              'Vous rincez, à pleines mains, jusqu’à ce que l’eau qui repart soit claire. Ça brûle d’abord, puis ça ne sent plus rien du tout, ce qui est le vrai bénéfice du froid.',
              'Vous laissez sécher à l’air le temps de compter cent, puis vous serrez une bande de toile propre par-dessus, deux tours, le nœud sur le côté et pas sur la plaie.',
              'Ça tiendra. Ça tient toujours mieux quand on a pris le temps.'
            ),
            effets: [
              { retire_objet: 'bandes_toile', quantite: 1 },
              { sante_heros: 6 },
              { etat: 'blesse_leger', valeur: false },
              { xp: 5 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous rincez à pleines mains jusqu’à ce que l’eau qui repart soit claire.',
              'Sans toile propre, il n’y a rien à mettre dessus. Vous laissez sécher à l’air, ce qui vaut mieux qu’un chiffon sale, et vous rabattez la manche.',
              'C’est moins bien fait que ça ne devrait l’être.'
            ),
            effets: [{ sante_heros: 3 }, { xp: 3 }],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Faire un feu bas et cuire.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        apparait_si: [
          { objet: 'amadou', '>=': 1 },
          { ou: [{ objet: 'lievre', '>=': 1 }, { objet: 'racines', '>=': 1 }] },
        ],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'lievre', '>=': 1 }],
            texte: p(
              'Vous montez le feu entre deux pierres plates, au ras des galets, avec du bois d’aulne mort qui ne fume pas. Le vallon est encaissé : ce qui monte d’ici se dilue dans les branches avant d’arriver en haut.',
              'Vous dépouillez le lièvre sur la dalle, proprement, en tirant la peau d’un seul mouvement à partir des pattes arrière. La peau part comme un gant. Vous la mettez de côté, et le boyau aussi, qui vaut une corde d’arc.',
              'Il cuit vingt minutes sur une baguette de coudrier, en gouttant dans les braises et en faisant ce bruit-là.',
              'Vous mangez avec les doigts, en vous brûlant, le dos contre la dalle froide. C’est le premier vrai repas depuis avant-hier soir et il vous faut un moment pour vous en apercevoir.'
            ),
            effets: [
              { retire_objet: 'lievre', quantite: 1 },
              { local: 'feu', '=': true },
              { faim: -38 },
              { fatigue: -6 },
              { sante_heros: 3 },
              { objet: 'boyau', quantite: 1 },
              { objet: 'cuir_brut', quantite: 1 },
              { xp: 8 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous montez un petit feu entre deux pierres et vous enfouissez les racines sous les braises, à même la cendre chaude.',
              'Elles sortent noires, terreuses, brûlantes dessus et crues au cœur. Ça remplit sans nourrir, mais ça remplit, et le fait de mâcher quelque chose de chaud fait plus de bien que ce que ça apporte.'
            ),
            effets: [
              { retire_objet: 'racines', quantite: 1 },
              { local: 'feu', '=': true },
              { faim: -14 },
              { fatigue: -4 },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Refaire la corde de l’arc pendant que tout est calme.',
        cout: { fatigue: 2 },
        epuisable: true,
        apparait_si: [{ objet: 'boyau', '>=': 1 }, { usure: 'arc_de_chasse', '<=': 70 }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous décordez, vous roulez l’ancienne corde et vous la gardez quand même — une corde fatiguée reste une corde.',
              'La neuve se toronne à trois brins, en tirant fort et régulier, les pieds calés contre la dalle. Il faut y passer un moment et il faut le passer bien : une boucle mal serrée à l’encoche haute, et c’est l’arc qui saute à la place de la flèche.',
              'Vous la cirez avec ce qui reste de graisse dans le pot, vous bandez trois fois à vide, et vous écoutez le départ.',
              'Il est sec. Il ne siffle plus.'
            ),
            effets: [
              { retire_objet: 'boyau', quantite: 1 },
              { usure: 'arc_de_chasse', valeur: 30 },
              { flag: 'corde_refaite' },
              { xp: 8 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Reprendre la marche.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'rempli', '=': true }],
            texte: p(
              'Vous relacez, vous passez la bandoulière de l’outre par-dessus la tête et vous la faites glisser dans le dos.',
              'Vous remontez le vallon. Le bruit des galets baisse derrière vous par paliers, comme si quelqu’un le retirait morceau par morceau, et puis il n’y a plus que le vent dans les hauts.'
            ),
            effets: [],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous relacez et vous remontez le vallon.',
              'À vingt pas, vous vous arrêtez. L’outre est légère contre la hanche, et une outre légère, ça ne se sent pas — c’est bien le problème.',
              'Vous hésitez, et vous continuez. Il fera frais cette nuit et on ne boit pas beaucoup quand il fait frais.',
              'C’est le genre de raisonnement qu’on tient quand on n’a pas encore eu soif.'
            ),
            effets: [{ flag: 'parti_sans_eau' }],
          },
        ],
      },
    ],
  },
};
