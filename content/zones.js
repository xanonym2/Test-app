// Géographie. La Crête est l'entrée obligatoire et ouvre la carte ; les quatre
// points centraux sont librement explorables ; le Camp est le point de
// convergence, et la sortie part vers l'ouest.

export const ZONES = [
  {
    id: 'VDG-Z01',
    nom: 'Les hauteurs de Val-de-Garde',
    points: [
      {
        id: 'VDG-Z01-P01',
        nom: 'La Crête',
        resume: 'Un dos de roche au-dessus de la vallée.',
        cout_segments: 1,
        obligatoire: true,
      },
      {
        id: 'VDG-Z01-P02',
        nom: 'La Ferme',
        resume: 'Bâtiments bas, un peu à l’écart de la route.',
        cout_segments: 1,
      },
      {
        id: 'VDG-Z01-P03',
        nom: 'La Source',
        resume: 'Au fond du vallon, sous les aulnes.',
        cout_segments: 1,
      },
      {
        id: 'VDG-Z01-P04',
        nom: 'Le Layon',
        resume: 'Une percée droite dans le taillis.',
        cout_segments: 1,
      },
      {
        id: 'VDG-Z01-P05',
        nom: 'Le Camp des fuyards',
        resume: 'Des feux bas, sous le couvert.',
        cout_segments: 2,
      },
      {
        id: 'VDG-Z01-P06',
        nom: 'Le Vieux Poste',
        resume: 'Ce qu’il reste d’une tour de guet.',
        cout_segments: 2,
      },
      {
        id: 'VDG-Z01-P07',
        nom: 'Le Col',
        resume: 'Le replat, les trois lacets, la brèche entre deux sommets.',
        cout_segments: 2,
        sortie_zone: true,
      },
    ],
  },
];

export const POINTS = Object.fromEntries(
  ZONES.flatMap((z) => z.points.map((p) => [p.id, { ...p, zone: z.id }]))
);

export function nomLieu(id) {
  return POINTS[id]?.nom ?? id;
}
