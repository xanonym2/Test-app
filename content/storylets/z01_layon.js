import { p } from './_p';

export const LAYON = {
  // ---------------------------------------------------------------------------
  'VDG-401': {
    id: 'VDG-401',
    options_persistantes: true,
    titre_travail: 'Le Layon — risque, échec, confiance, différés',
    lieu: { type: 'point_interet', cible: 'VDG-Z01-P04' },
    unique: false,
    priorite: 8,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      lu: false,
      approche: false,
      leve: false,
      eau_donnee: false,
      libre: false,
      traverse: false,
    },
    texte: {
      arrivee: p(
        'Le layon est une entaille droite dans le taillis, tirée au cordeau sur un quart de lieue pour sortir les grumes. Quatre pas de large, des souches à hauteur de cheville tous les deux mètres, et deux ornières profondes que les roues ferrées ont creusées jusqu’à la marne jaune.',
        'De chaque côté, le taillis de châtaignier est si serré qu’on ne voit pas à trois pas dedans. Devant, la percée file jusqu’au point où elle se ferme par la perspective. Un chemin où l’on va deux fois plus vite qu’ailleurs, et où l’on se voit d’un bout à l’autre.',
        'À soixante pas, un chariot est couché dans l’ornière de droite.',
        'C’est un chariot de charretier, à deux roues, bâché. La roue gauche a quitté l’essieu et gît à plat trois mètres plus loin. Le chargement a glissé : des ballots de toile écrue, une caisse éventrée, du sel répandu en tas blanc sur la marne.',
        'Il y a un homme dessous. Vivant : il bouge le bras droit, lentement, à intervalles réguliers, et ce mouvement-là n’est pas un appel. C’est un homme qui essaie encore, tout seul, depuis longtemps.',
        'Il n’a pas crié en vous voyant. Il ne vous a pas vu.'
      ),
      base: p(
        'Le layon, droit, ses deux ornières et ses souches. Le chariot couché à soixante pas, la roue à plat, le sel blanc sur la marne jaune.'
      ),
      variantes: [
        {
          si: [{ local: 'lu', '=': true }, { non: { local: 'approche', '=': true } }],
          ajout:
            'Vous restez dans le châtaignier. D’ici, vous tenez tout le layon dans l’axe : ce qui viendra viendra par un bout ou par l’autre, et il n’y a pas de troisième bout.',
        },
        {
          si: [{ local: 'approche', '=': true }, { non: { local: 'libre', '=': true } }],
          ajout:
            'Il s’appelle Renn. Il l’a dit deux fois, comme si ça pouvait aider. L’essieu lui tient la jambe droite au-dessus de la cheville, pris entre le bois et le fond dur de l’ornière. Il a la bouche blanche aux commissures et il ne transpire plus.',
        },
        {
          si: [{ local: 'libre', '=': true }],
          ajout:
            'Renn est assis contre la roue à plat, la jambe droite allongée devant lui, et il la regarde comme on regarde un outil dont on n’est pas sûr.',
        },
        {
          si: [{ meteo: 'brume' }],
          ajout:
            'La brume s’est posée dans la percée et raccourcit le layon de moitié. Le bout du chemin a disparu ; ce qui en sortira sortira à vingt pas.',
        },
        {
          si: [{ meteo: 'vent' }],
          ajout:
            'Le vent passe dans la percée comme dans un couloir et fait claquer la bâche par intervalles. Tant qu’elle claque, on n’entend rien d’autre.',
        },
        {
          registre: 'epuise',
          ajout:
            'Soixante pas. Vous les évaluez deux fois et le chiffre ne vous plaît pas plus la seconde fois.',
        },
      ],
    },
    regles_locales: [
      {
        si: [{ local: 'libre', '=': true }, { local: 'eau_donnee', '=': true }],
        alors: [{ local: 'renn_pret', '=': true }],
      },
    ],
    options: [
      {
        id: 'A',
        libelle: 'Rester au couvert. Lire le layon avant d’y mettre le pied.',
        cout: { fatigue: 2 },
        epuisable: true,
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous vous accroupissez derrière une cépée et vous prenez le chemin par morceaux.',
              'Le vent descend le layon dans votre dos, du nord vers le sud — il porte votre odeur vers le chariot et au-delà. Mauvais.',
              'À mi-distance, un châtaignier mort est tombé en travers de l’ornière gauche et n’a jamais été dégagé. Il fait un dos de deux pieds. On peut passer derrière, courbé, sur une vingtaine de pas.',
              'Le talus de droite est plus haut que celui de gauche : le layon a été tiré dans le dévers, et tout ce qui est en contrebas ne voit pas ce qui est en amont.',
              'Au bout sud, la percée s’ouvre sur une clairière de coupe. Le sol y est piétiné large.',
              'Et les oiseaux : rien. Pas une mésange dans le taillis, sur tout le côté est. Vous avez passé la matinée dans un bois qui parlait sans arrêt. Ici, il y a un côté qui s’est tu, et un côté qui n’a rien à cacher.'
            ),
            effets: [{ local: 'lu', '=': true }, { flag: 'layon_lu' }, { xp: 12 }],
          },
        ],
      },
      {
        id: 'B',
        libelle: 'Rejoindre le chariot par le talus haut.',
        cout: { segments: 1, fatigue: 4 },
        epuisable: true,
        apparait_si: [{ local: 'lu', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Vous longez le dévers, du côté amont, où le talus vous cache jusqu’aux épaules. Vingt pas courbé derrière le châtaignier mort, puis vous descendez dans l’ornière à la hauteur du chariot.',
              'Il ne vous entend qu’au dernier moment et il a un mouvement de tout le corps qui lui arrache un son bref.',
              'Il a une quarantaine d’années, le cou et les mains d’un homme qui tient des rênes toute l’année, et une trace de roue sur la joue gauche qui date d’avant aujourd’hui.',
              'Il dit : « Renn. Je m’appelle Renn. » Deux fois.',
              'L’essieu lui tient la jambe au-dessus de la cheville. Il est là-dessous depuis l’aube.'
            ),
            effets: [
              { local: 'approche', '=': true },
              { pnj_statut: { id: 'renn', valeur: 'vivant_allie' } },
              { carnet: 'renn' },
              { xp: 6 },
            ],
          },
        ],
      },
      {
        id: 'C',
        libelle: 'Descendre droit dans l’ornière et traverser.',
        cout: { segments: 1, fatigue: 6 },
        epuisable: true,
        apparait_si: [{ non: { local: 'approche', '=': true } }],
        issues: [
          {
            probabilite: 55,
            condition_texte: [{ local: 'lu', '=': true }],
            texte: p(
              'Vous prenez l’ornière et vous marchez vite, l’arc dans la main gauche, sans courir — courir fait du bruit et fait perdre la vue.',
              'Soixante pas à découvert. Rien ne bouge d’un bout à l’autre du layon, et vous arrivez au chariot avec le cœur qui cogne pour rien.',
              'L’homme dessous sursaute. Il dit son nom, Renn, deux fois de suite.'
            ),
            effets: [
              { local: 'approche', '=': true },
              { pnj_statut: { id: 'renn', valeur: 'vivant_allie' } },
              { carnet: 'renn' },
              { xp: 4 },
            ],
          },
          {
            probabilite: 45,
            texte: p(
              'Vous prenez l’ornière et vous marchez vite. Le fond est de marne dure, les souches sont basses, et les soixante pas se font sans une hésitation.',
              'À mi-chemin, quelque chose bouge dans le taillis du côté est — une seule fois, à hauteur d’épaule, et pas comme un oiseau. Vous ne vous arrêtez pas. C’est la seule décision juste et elle ne vous rassure pas du tout.',
              'Vous arrivez au chariot. L’homme dessous sursaute et dit son nom, Renn, deux fois de suite.',
              'Vous surveillez le taillis pendant tout le temps qu’il parle. Rien ne recommence.'
            ),
            effets: [
              { local: 'approche', '=': true },
              { pnj_statut: { id: 'renn', valeur: 'vivant_allie' } },
              { carnet: 'renn' },
              { fatigue: 3 },
              {
                differe: {
                  id: 'vu_dans_le_layon',
                  evenement: 'Quelqu’un vous a vu traverser à découvert.',
                  resolution: 'VDG-CBT-01',
                  resolution_alternative: 'VDG-DIF-01',
                  sur_flag: 'sorti_du_layon',
                  probabilite: 70,
                },
              },
              { xp: 4 },
            ],
          },
        ],
      },
      {
        id: 'D',
        libelle: 'Passer la perche sous l’essieu et peser dessus.',
        cout: { segments: 1, fatigue: 10 },
        epuisable: true,
        apparait_si: [{ local: 'approche', '=': true }, { non: { local: 'libre', '=': true } }],
        issues: [
          {
            probabilite: 75,
            condition_texte: [{ stat: 'vigueur', '>=': 4 }],
            texte: p(
              'Vous arrachez un brancard au chariot — du frêne de deux pouces, assez long — et vous le glissez sous l’essieu. Une souche fait le point d’appui. Vous calez une pierre plate dessous pour qu’elle ne s’enfonce pas.',
              'Vous lui dites de tirer au moment où vous direz. Il dit qu’il a compris. Les hommes qui disent qu’ils ont compris ne tirent jamais au bon moment.',
              'Vous pesez. Le brancard plie, l’essieu monte d’un pouce, deux, et Renn tire au bon moment.',
              'Il sort la jambe. Il ne crie pas : il fait un bruit de gorge, bouche fermée, et il reste à quatre pattes dans la marne pendant un long moment.',
              'La cheville est violette sur tout le tour et elle enfle déjà. Elle n’est pas cassée. Ce qui n’est pas cassé porte, un peu.'
            ),
            effets: [
              { local: 'libre', '=': true },
              { confiance: { pnj: 'renn', valeur: 3 } },
              { fatigue: 6 },
              { xp: 15 },
              { flag: 'renn_degage' },
            ],
          },
          {
            probabilite: 50,
            texte: p(
              'Vous arrachez un brancard au chariot et vous le glissez sous l’essieu, une souche en point d’appui.',
              'Vous pesez. Le bois plie, plie encore, et casse net à l’endroit de la mortaise — vous partez en avant, la main contre l’essieu, et le chariot redescend d’un coup dans l’ornière.',
              'Renn hurle cette fois, et ça s’entend loin dans une percée droite.',
              'Vous restez une seconde à genoux, la paume ouverte par l’éclat, à écouter le bout du layon.',
              'Il faut recommencer. Il n’y a pas d’autre brancard : il y a la roue à plat, le moyeu, et ce que vous pourrez inventer.'
            ),
            effets: [
              { sante_heros: -4 },
              { etat: 'blesse_leger' },
              { fatigue: 8 },
              { local: 'echec_levier', '=': true },
              { confiance: { pnj: 'renn', valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'E',
        libelle: 'Caler la roue à plat sous l’essieu et la faire rouler de champ.',
        cout: { segments: 1, fatigue: 12 },
        epuisable: true,
        apparait_si: [
          { local: 'approche', '=': true },
          { non: { local: 'libre', '=': true } },
          { local: 'echec_levier', '=': true },
        ],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'La roue fait quatre pieds de haut et pèse ce que pèse du chêne cerclé de fer. Vous la relevez de champ contre la caisse, vous la roulez jusqu’à l’essieu, et vous la couchez dessous en biais de façon que la jante fasse une rampe.',
              'Ensuite ce n’est plus du levier : c’est vous, l’épaule sous le plat-bord, les deux pieds contre la souche, et le temps qu’il faudra.',
              'L’essieu monte d’un demi-pouce. Il redescend. Il remonte.',
              'Renn sort la jambe en s’aidant des deux mains, au troisième essai, pendant que vous ne voyez plus rien du tout à cause du sang qui vous est monté à la tête.',
              'Vous vous asseyez tous les deux dans la marne, épaule contre épaule, et vous restez comme ça sans rien dire d’intelligent.'
            ),
            effets: [
              { local: 'libre', '=': true },
              { confiance: { pnj: 'renn', valeur: 4 } },
              { fatigue: 10 },
              { sante_heros: -2 },
              { xp: 18 },
              { flag: 'renn_degage' },
            ],
          },
        ],
      },
      {
        id: 'F',
        libelle: 'Lui tendre l’outre.',
        cout: { fatigue: 0 },
        epuisable: true,
        apparait_si: [{ local: 'approche', '=': true }, { objet: 'outre', '>=': 1 }],
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ non: { outre_pleine: true } }],
            texte: p(
              'Il regarde l’outre à votre hanche avant de regarder votre visage. Il ne demande pas. Il a la bouche blanche aux commissures depuis l’aube et il ne demande pas.',
              'Vous la décrochez. Elle ne pèse rien dans la main, et ce rien-là, vous l’entendez : le bouchon claque à vide quand vous le retirez.',
              'Vous restez le bras tendu une seconde de trop, avec une outre vide au bout.',
              '« Ça ira », il dit. Il tourne la tête vers l’ornière.',
              'Vous vous accroupissez à côté de lui sans rien dire. La source est à deux heures d’ici, dans l’autre sens, et il fait ce qu’il fait de plus chaud à cette heure-là.'
            ),
            effets: [
              { confiance: { pnj: 'renn', valeur: -1 } },
              { flag: 'outre_vide_devant_renn' },
              { xp: 2 },
            ],
          },
          {
            probabilite: 100,
            condition_texte: [{ outre_pleine: true }],
            texte: p(
              'Il regarde l’outre à votre hanche avant de regarder votre visage. Il ne demande pas.',
              'Vous la décrochez et vous pesez, une dernière fois, ces trois livres que vous portez depuis le vallon. Deux jours. C’est ce que vaut une outre pleine entre ici et le col, et il n’y a rien entre les deux.',
              'Vous lui mettez le goulot dans la main.',
              'Il boit comme boivent les hommes qui ont vraiment soif : trop vite, en s’étranglant, en renversant sur le menton et sur le col. Vous lui abaissez l’outre au bout de quatre gorgées, parce qu’il faut, et il ne proteste pas.',
              'Au bout d’un moment il dit : « Renn. » Et puis, en désignant la percée du menton : « Vous êtes venu par le talus haut. Pas par le milieu. »',
              'Il vous regarde autrement à partir de là.'
            ),
            effets: [
              { local: 'eau_donnee', '=': true },
              { outre: false },
              { confiance: { pnj: 'renn', valeur: 4 } },
              { flag: 'eau_partagee' },
              { xp: 12 },
            ],
          },
        ],
      },
      {
        id: 'G',
        libelle: 'Fouiller le chargement.',
        cout: { fatigue: 3 },
        epuisable: true,
        apparait_si: [{ local: 'approche', '=': true }],
        issues: [
          {
            probabilite: 100,
            texte: p(
              'Il vous dit de prendre ce qu’il faut, d’un geste de la main, et il ajoute le prix de chaque chose au fur et à mesure, par habitude, sans le vouloir.',
              'Toile écrue, deux ballots, dont un éventré. Du sel — il y en a pour trois mois de solde et il est par terre. Une caisse de quincaillerie : clous, une lime, un écheveau de boyau de porc qu’il vendait aux archers du comptoir.',
              'Sous le siège, dans le coffre, une couverture de laine grise et une gourde d’étain avec un nom limé sur le flanc.'
            ),
            effets: [
              { objet: 'boyau', quantite: 1 },
              { objet: 'couverture', quantite: 1, usure: 45 },
              { objet: 'gourde_etain', quantite: 1, usure: 75 },
              { objet: 'corde', quantite: 1, usure: 70 },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: 'S',
        libelle: 'Quitter le layon.',
        sortie: true,
        cout: { segments: 0 },
        issues: [
          {
            probabilite: 100,
            condition_texte: [{ local: 'libre', '=': true }, { local: 'eau_donnee', '=': true }],
            texte: p(
              'Il se met debout en s’appuyant au moyeu, essaie la jambe, jure une fois, et trouve un appui qui tient.',
              'Il coupe un jeune châtaignier à hauteur d’aisselle et s’en fait une béquille en trois coups de hachette. Il connaît le geste.',
              '« Je sais où sont les autres », il dit. « Nord-ouest, dans le repli, sous le couvert. J’y allais quand la roue a lâché. »',
              'Vous partez ensemble, lui d’un pas et demi pour un des vôtres, et vous réglez votre allure sur la sienne sans que ce soit dit.'
            ),
            effets: [
              { flag: 'sorti_du_layon' },
              { flag: 'renn_compagnon' },
              { decouvre: 'VDG-Z01-P05' },
              { confiance: { pnj: 'renn', valeur: 1 } },
            ],
          },
          {
            probabilite: 100,
            condition_texte: [{ local: 'libre', '=': true }],
            texte: p(
              'Il se met debout en s’appuyant au moyeu, essaie la jambe et trouve un appui qui tient à peu près.',
              '« Le camp est au nord-ouest », il dit. « Dans le repli. J’y allais. »',
              'Il ne demande pas à venir avec vous et vous ne le proposez pas. Vous partez à peu près en même temps, dans la même direction, ce qui n’est pas exactement partir ensemble.'
            ),
            effets: [
              { flag: 'sorti_du_layon' },
              { decouvre: 'VDG-Z01-P05' },
            ],
          },
          {
            probabilite: 100,
            texte: p(
              'Vous remontez dans le couvert et vous reprenez le sous-bois, là où le châtaignier est assez serré pour qu’on doive écarter les tiges à la main.',
              'Derrière vous, dans la percée, le bras droit continue à bouger lentement, à intervalles réguliers.',
              'Vous entendez ce mouvement-là pendant un bon moment après avoir cessé de le voir.'
            ),
            effets: [
              { flag: 'sorti_du_layon' },
              { flag: 'renn_abandonne' },
              { confiance: { pnj: 'renn', valeur: -3 } },
              { decouvre: 'VDG-Z01-P05' },
            ],
          },
        ],
      },
    ],
  },
};
