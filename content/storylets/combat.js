import { p } from './_p';

// Combat narratif. Dégâts déterministes : ce qu'une option fait, elle le fait.
// L'incertitude porte uniquement sur ce que le héros ignore de l'adversaire —
// et l'observation est ce qui l'achète, contre du temps.
export const COMBAT = {
  'VDG-CBT-01': {
    id: 'VDG-CBT-01',
    titre_travail: 'Combat narratif — l’éclaireur',
    lieu: { type: 'declenche_uniquement' },
    unique: true,
    priorite: 12,
    poids: 1,
    etat_local_initial: {
      observe: 0,
      vu: false,
      couvert: false,
      blesse: false,
      abattu: false,
      contact: false,
    },
    texte: {
      arrivee: p(
        'Vous vous arrêtez parce que vos jambes se sont arrêtées avant vous.',
        'Le sentier débouche sur une coupe de l’an dernier : un demi-arpent rasé, hérissé de souches, où les rejets de châtaignier montent à hauteur de cuisse. Le soleil y tape en plein et il est derrière vous, bas, à cette heure où l’ombre d’un homme fait trois fois sa taille.',
        'Sur la gauche, l’empilement de grumes : quinze troncs de six pieds, cerclés de deux chaînes, hauts comme un mur d’enclos. Devant, en travers de la coupe, un châtaignier mère qu’on a laissé tomber et qu’on n’a jamais débité — il fait un dos, et derrière ce dos on ne voit rien.',
        'Sur la droite, la coupe descend vers le ruisseau. On l’entend d’ici. La pente est raide et couverte de feuilles mortes, ce qui veut dire qu’on ne la descend pas sans bruit, et qu’on la descend vite.',
        'Le vent vient du ruisseau. Il monte vers vous. C’est la seule bonne nouvelle de cette clairière.',
        'Et à quarante pas, au milieu des rejets, il y en a un.',
        'Debout, immobile, le dos aux trois quarts tourné. Un éclaireur : pas de plaques, pas d’arme à deux mains, un javelot court dans la main gauche et un sac de toile en bandoulière. Il regarde la ligne de crête, à l’est, et il ne bouge pas depuis un moment.',
        'Il ne vous a pas vu. Le vent vous couvre.'
      ),
      base: p('La coupe, les souches, l’empilement de grumes. Le vent monte toujours du ruisseau.'),
      variantes: [
        {
          si: [{ local: 'couvert', '=': true }, { non: { local: 'vu', '=': true } }],
          ajout:
            'Vous êtes contre les grumes, dans leur ombre, l’écorce fraîche contre l’épaule. Il y a un jour de quatre doigts entre deux troncs et il donne exactement sur lui.',
        },
        {
          si: [{ local: 'observe', '>=': 1 }, { non: { local: 'contact', '=': true } }],
          ajout:
            'Il porte le poids sur la jambe gauche. La droite le gêne — pas une blessure : une fatigue, celle qu’on prend après des jours de marche. Le sac de toile est plat. Il n’a rien dedans.',
        },
        {
          si: [{ local: 'vu', '=': true }, { non: { local: 'contact', '=': true } }],
          remplace: p(
            'Il s’est retourné.',
            'Il ne crie pas. Il ne lève pas le javelot. Il vous regarde, il évalue la distance, et il commence à venir — au trot, droit, sans se presser, en contournant les souches par le bon côté.',
            'Vous avez le temps d’un geste. Peut-être deux.'
          ),
        },
        {
          si: [{ local: 'contact', '=': true }, { non: { local: 'abattu', '=': true } }],
          remplace: p(
            'Il est sur vous.',
            'De près il sent la fumée froide et la graisse rance. Il a le javelot à mi-hampe, main basse, et il frappe par en dessous — trois fois de suite au même endroit, sans variation, parce que ça n’a jamais eu besoin de varier.',
            'Vous êtes dos aux grumes. Il n’y a plus d’angle.'
          ),
        },
        {
          si: [{ local: 'blesse', '=': true }, { non: { local: 'abattu', '=': true } }],
          ajout:
            'La flèche est entrée sous l’omoplate et ressort de quatre doigts par-devant. Il ne s’en occupe pas. Ce n’est pas du courage : il n’a pas encore compris.',
        },
        {
          si: [{ meteo: 'brume' }],
          ajout: 'La brume monte du ruisseau avec le vent et prend la coupe par le bas.',
        },
      ],
    },
    regles_locales: [
      { si: [{ local: 'abattu', '=': true }], alors: [{ local: 'fin', '=': true }] },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Ne pas bouger. Le regarder.',
        cout: { fatigue: 1 },
        apparait_si: [{ non: { local: 'vu', '=': true } }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'observe', '=': 0 }],
            texte: p(
              'Vous ne bougez pas. Vous baissez les yeux de deux doigts, parce qu’un regard direct se sent, et vous le prenez par le bord de la vision.',
              'Il regarde la crête est. Toujours la même direction, jamais ailleurs. Il attend quelque chose de ce côté-là, ou il vérifie que ça ne vient pas.',
              'Il est seul. Vous en êtes sûr au bout d’une minute : un homme qui a du monde derrière lui se retourne, ne serait-ce qu’une fois.'
            ),
            effets: [{ local: 'observe', '=': 1 }, { xp: 5 }],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous restez encore. C’est ce qu’il y a de plus cher et de plus difficile.',
              'La jambe droite le gêne : il la décharge toutes les vingt respirations, de deux doigts, et il remet le poids dessus. Ses bandes de pied sont grises et boueuses jusqu’au mollet — il a passé un cours d’eau, il y a longtemps, et il n’a pas séché depuis.',
              'Le sac de toile est plat contre son flanc. Il pend droit. Il n’a rien dedans.',
              'Un homme qui marche depuis des jours dans un pays plein de granges ouvertes et qui a un sac vide ne fait pas ce qu’on croit qu’il fait.',
              'Le soleil descend. Dans un moment, votre ombre va toucher les rejets devant vous.'
            ),
            effets: [
              { local: 'observe', '=': 2 },
              { flag: 'eclaireur_lu' },
              { carnet: 'rien_pris' },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Gagner l’ombre de l’empilement de grumes.',
        cout: { fatigue: 3 },
        epuisable: true,
        apparait_si: [{ non: { local: 'vu', '=': true } }, { non: { local: 'couvert', '=': true } }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'observe', '>=': 1 }],
            texte: p(
              'Vous attendez qu’il décharge la jambe droite — il le fait toutes les vingt respirations et vous avez compté deux cycles — et vous faites les douze pas pendant ce temps-là, pliés, en posant le pied entre les rejets et jamais dessus.',
              'L’écorce des grumes est fraîche contre l’épaule. Vous êtes dans leur ombre, et votre ombre à vous est dedans.',
              'Il n’a rien vu.'
            ),
            effets: [{ local: 'couvert', '=': true }, { xp: 8 }],
          },
          {
            probabilite: 65,
            texte: p(
              'Vous faites les douze pas pliés en deux, en posant le pied entre les rejets.',
              'Au huitième, une souche pourrie cède sous le talon avec un bruit mou. Vous vous immobilisez au milieu du pas, le poids sur une jambe, et vous restez comme ça plus longtemps que la jambe ne peut le supporter.',
              'Il ne se retourne pas.',
              'Vous finissez le trajet et vous vous collez à l’écorce, la cuisse en feu.'
            ),
            effets: [{ local: 'couvert', '=': true }, { fatigue: 4 }, { xp: 5 }],
          },
          {
            probabilite: 35,
            texte: p(
              'Vous faites six pas, et au sixième une souche pourrie cède sous le talon.',
              'Il se retourne sur le bruit. Pas vite : complètement. Toute la tête, tout le buste, et les yeux qui trouvent immédiatement l’endroit où vous êtes parce qu’il savait déjà que le bruit venait de là.',
              'Vous êtes debout au milieu d’une coupe rase, à trente-cinq pas, avec le soleil qui vous jette une ombre de dix pieds en travers des rejets.'
            ),
            effets: [{ local: 'vu', '=': true }, { fatigue: 3 }],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Bander et lâcher par le jour entre deux troncs.',
        cout: { objet: 'fleche', quantite: 1, fatigue: 2 },
        apparait_si: [
          { objet: 'arc_de_chasse', '>=': 1 },
          { non: { local: 'contact', '=': true } },
          { non: { local: 'abattu', '=': true } },
        ],
        issues: [
          {
            probabilite: 100,
            condition_texte: [
              { local: 'couvert', '=': true },
              { usure: 'arc_de_chasse', '>=': 55 },
            ],
            texte: p(
              'Le jour entre les deux troncs fait quatre doigts. Vous posez la flèche dedans, vous montez la corde à la commissure, et vous attendez qu’il redonne le flanc.',
              'Le départ est sec. L’arc ne dit rien.',
              'La flèche entre sous l’omoplate droite et ressort de quatre doigts par-devant. Il fait un pas de côté, très ordinaire, comme un homme qui se rattrape sur une pierre — et il se retourne.',
              'Il vous voit. Il vient.',
              'Il ne crie toujours pas. C’est ce qui est le plus difficile à supporter chez eux : ils ne préviennent personne.'
            ),
            effets: [
              { local: 'blesse', '=': true },
              { local: 'vu', '=': true },
              { usure: 'arc_de_chasse', valeur: -3 },
              { xp: 10 },
            ],
          },
          {
            probabilite: 100,
            condition_texte: [{ usure: 'arc_de_chasse', '<=': 40 }],
            texte: p(
              'Vous montez la corde et vous sentez tout de suite que quelque chose ne va pas : il y a un temps mort entre le doigt qui lâche et le claquement, un dixième de rien, l’épaisseur d’un cheveu.',
              'La corde siffle au départ. La flèche part haute et à gauche et se plante dans un tronc de l’empilement, à une paume de sa tête.',
              'Il se retourne sur le sifflement — sur le sifflement, pas sur l’impact — et il regarde exactement dans la bonne direction.',
              'Une corde peluchée, ça fait ce bruit-là. Vous le saviez.'
            ),
            effets: [
              { local: 'vu', '=': true },
              { usure: 'arc_de_chasse', valeur: -5 },
              { xp: 3 },
            ],
          },
          {
            probabilite: 100,
            condition_texte: [{ local: 'blesse', '=': true }],
            texte: p(
              'Il est à quinze pas quand vous lâchez la deuxième.',
              'Elle le prend à la base du cou, de bas en haut, et cette fois il s’arrête net au milieu d’un pas. Il reste debout trois secondes entières, le javelot toujours en main, avec une expression qui n’est pas de la douleur mais du calcul interrompu.',
              'Puis il tombe en avant, sur les rejets, et les rejets le tiennent à moitié.',
              'Il ne bouge plus. Vous attendez quand même, l’arc bandé, jusqu’à ce que vos bras tremblent.'
            ),
            effets: [
              { local: 'abattu', '=': true },
              { usure: 'arc_de_chasse', valeur: -3 },
              { sante_heros: -2 },
              { xp: 25 },
              { flag: 'eclaireur_abattu' },
            ],
          },
          {
            probabilite: 70,
            texte: p(
              'Vous tirez à découvert, debout, à trente-cinq pas, dans un soleil bas.',
              'La flèche le prend dans le flanc, haut, et s’arrête sur quelque chose de dur. Il l’arrache en marchant, sans s’arrêter, et il la jette.',
              'Il vient plus vite maintenant.'
            ),
            effets: [
              { local: 'blesse', '=': true },
              { local: 'vu', '=': true },
              { usure: 'arc_de_chasse', valeur: -3 },
              { xp: 6 },
            ],
          },
          {
            probabilite: 30,
            texte: p(
              'Vous tirez trop vite. La flèche passe au-dessus de son épaule et disparaît dans les rejets, de l’autre côté de la coupe.',
              'Il ne s’est même pas baissé.'
            ),
            effets: [{ local: 'vu', '=': true }, { usure: 'arc_de_chasse', valeur: -3 }],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'L’attendre derrière le châtaignier couché, arme courte en main.',
        cout: { fatigue: 5 },
        epuisable: true,
        apparait_si: [{ local: 'vu', '=': true }, { non: { local: 'contact', '=': true } }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ objet: 'hachette', '>=': 1 }],
            texte: p(
              'Vous laissez tomber l’arc et vous vous mettez derrière le tronc couché, accroupi, la hachette à deux mains contre la poitrine.',
              'Le dos du châtaignier fait deux pieds. Il ne peut pas frapper de haut par-dessus, et il ne peut pas frapper par en dessous parce qu’il n’y a pas de dessous.',
              'Il arrive. Il fait ce que vous espériez : il monte sur le tronc, parce que c’est plus court.',
              'Un homme sur un tronc rond n’a qu’un appui et il le sait trop tard.',
              'Vous frappez le tendon derrière la cheville gauche, au ras du bois, et il descend du mauvais côté. Il tombe sur l’épaule, de votre côté du tronc, et vous êtes déjà debout.',
              'Ce qui suit est bref et sans rien qui mérite d’être raconté.'
            ),
            effets: [
              { local: 'abattu', '=': true },
              { usure: 'hachette', valeur: -12 },
              { sante_heros: -6 },
              { etat: 'blesse_leger' },
              { xp: 25 },
              { flag: 'eclaireur_abattu' },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous laissez tomber l’arc et vous vous mettez derrière le tronc couché, le couteau à dépouiller dans la main droite, lame en dessous.',
              'C’est une lame de six pouces faite pour séparer une peau d’un muscle. Contre un javelot, elle ne vaut que ce que vaut la distance qu’elle vous fait gagner, c’est-à-dire rien.',
              'Il monte sur le tronc. Vous le prenez dans les jambes et vous tombez tous les deux du même côté.',
              'Ça dure longtemps et c’est sale. Il vous ouvre l’avant-bras gauche sur toute la longueur avec la pointe du javelot, à l’aveugle, pendant que vous cherchez le dessous du menton.',
              'À la fin, c’est vous qui vous relevez. Vous mettez un moment à le faire.'
            ),
            effets: [
              { local: 'abattu', '=': true },
              { usure: 'couteau_depouille', valeur: -20 },
              { sante_heros: -14 },
              { etat: 'blesse_leger' },
              { xp: 25 },
              { flag: 'eclaireur_abattu' },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Descendre au ruisseau. Vite, et tant pis pour le bruit.',
        cout: { segments: 1, fatigue: 10 },
        sortie: true,
        apparait_si: [{ non: { local: 'abattu', '=': true } }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ non: { local: 'vu', '=': true } }],
            texte: p(
              'Vous reculez de trois pas et vous vous laissez partir dans la pente.',
              'Les feuilles mortes vous emmènent sur vingt pieds dans un froissement énorme, et vous finissez dans le ruisseau jusqu’aux genoux, une main sur une pierre, l’autre sur l’arc que vous avez tenu par réflexe.',
              'Vous remontez le courant sur deux cents pas, dans l’eau, parce que l’eau ne garde rien. Le froid vous prend les jambes au bout d’une minute et il ne les lâchera pas de la soirée.',
              'Derrière, sur la coupe : rien. Pas un cri, pas une course.',
              'Vous ne saurez jamais s’il a entendu.'
            ),
            effets: [
              { fatigue: 8 },
              { etat: 'epuise' },
              { flag: 'derobe_ruisseau' },
              { xp: 8 },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous partez dans la pente et les feuilles vous emmènent. Vingt pieds de glissade, le ruisseau, le froid jusqu’aux genoux.',
              'Il vous suit jusqu’au bord et il s’arrête là. Il ne descend pas.',
              'Il reste en haut du talus, le javelot le long de la jambe, et il vous regarde remonter le courant. Il ne court pas après vous et il ne vous perd pas des yeux non plus.',
              'Il fait ce que fait un éclaireur : il regarde où vous allez.',
              'Au troisième coude, vous ne le voyez plus. Ça ne veut rien dire.'
            ),
            effets: [
              { fatigue: 10 },
              { etat: 'epuise' },
              { flag: 'suivi_eclaireur' },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Reculer dans le taillis, pas à pas, sans lui tourner le dos.',
        cout: { segments: 1, fatigue: 4 },
        sortie: true,
        apparait_si: [{ non: { local: 'vu', '=': true } }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous reculez. Un pied derrière l’autre, le poids à l’arrière, les yeux sur lui, en cherchant le sol du talon avant d’y poser quoi que ce soit.',
              'Onze pas comme ça. Le taillis se referme sur vos épaules au douzième et vous êtes dedans.',
              'Il regarde toujours la crête est. Il n’a rien su.',
              'Vous contournez la coupe par le haut, ce qui vous coûte une bonne heure, et vous mettez tout ce temps à cesser de trembler des mains.'
            ),
            effets: [{ fatigue: 3 }, { flag: 'coupe_contournee' }, { xp: 10 }],
          },
        ],
      },
      {
        id: 'G',
        libelle: 'Fouiller le corps.',
        cout: { fatigue: 3 },
        sortie: true,
        apparait_si: [{ local: 'abattu', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous le retournez avec le pied d’abord, puis avec les mains.',
              'Le sac de toile est vide. Complètement : pas une miette de pain, pas un lacet, rien. Un homme qui marche depuis des jours ne porte pas un sac vide, à moins qu’il ne soit fait pour rapporter quelque chose.',
              'À la ceinture, une gourde presque pleine, un rouleau de lanières de cuir, et une chose plate en corne, gravée d’un quadrillage et de deux encoches profondes sur le bord long. Vous la tournez dans la main sans comprendre. Ce n’est pas une arme et ce n’est pas un bijou.',
              'Il n’a ni or, ni argent, ni rien de pris à personne.',
              'Vous récupérez vos flèches. Celle du cou est perdue, celle de l’omoplate est bonne.'
            ),
            effets: [
              { objet: 'fleche', quantite: 1, usure: 60 },
              { objet: 'cuir_brut', quantite: 1 },
              { objet: 'gourde_etain', quantite: 1, usure: 55 },
              { flag: 'objet_de_corne' },
              { carnet: 'rien_pris' },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter la coupe.',
        sortie: true,
        cout: { segments: 0 },
        apparait_si: [{ local: 'abattu', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous contournez la coupe par le haut et vous reprenez le sous-bois.',
              'Il est resté en travers des rejets, à quarante pas d’un empilement de grumes que des bûcherons viendront chercher un jour, et vous vous surprenez à penser à ces bûcherons-là.'
            ),
            effets: [],
          },
        ],
      },
    ],
  },
};
