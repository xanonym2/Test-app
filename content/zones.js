// Géographie. Identifiants techniques stables, indépendants des noms affichés.

export const zones = {
  'VDG-Z01': {
    id: 'VDG-Z01',
    nom: 'Les hauts de Val-de-Garde',
    territoire: 'marche_ouest',
  },
};

export const points = {
  'VDG-Z01-P01': { id: 'VDG-Z01-P01', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'promontoire', nom: 'La Crête', note: 'on voit loin, on est vu de loin' },
  'VDG-Z01-P02': { id: 'VDG-Z01-P02', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'batiment', nom: 'La Ferme', note: 'toit crevé, cour ouverte' },
  'VDG-Z01-P03': { id: 'VDG-Z01-P03', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'eau', nom: 'La Source', note: 'l’eau sort de la pierre' },
  'VDG-Z01-P04': { id: 'VDG-Z01-P04', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'sentier', nom: 'Le Layon', note: 'un passage étroit sous les arbres' },
  'VDG-Z01-P05': { id: 'VDG-Z01-P05', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'campement', nom: 'Le Camp des fuyards', note: 'des feux qu’on n’ose pas éteindre' },
  'VDG-Z01-P06': { id: 'VDG-Z01-P06', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'batiment', nom: 'Le Vieux Poste', note: 'la Couronne y a dormi, autrefois' },
  'VDG-Z01-P07': { id: 'VDG-Z01-P07', zone: 'VDG-Z01', territoire: 'marche_ouest', type_lieu: 'passage', nom: 'La Passe de l’Ouest', note: 'la sortie' },
};

// Liaisons non orientées, coût en segments.
export const liaisons = [
  { a: 'VDG-Z01-P01', b: 'VDG-Z01-P02', segments: 1 },
  { a: 'VDG-Z01-P01', b: 'VDG-Z01-P04', segments: 1 },
  { a: 'VDG-Z01-P02', b: 'VDG-Z01-P03', segments: 1 },
  { a: 'VDG-Z01-P03', b: 'VDG-Z01-P04', segments: 1 },
  { a: 'VDG-Z01-P02', b: 'VDG-Z01-P06', segments: 2 },
  { a: 'VDG-Z01-P04', b: 'VDG-Z01-P06', segments: 1 },
  { a: 'VDG-Z01-P03', b: 'VDG-Z01-P05', segments: 2 },
  { a: 'VDG-Z01-P04', b: 'VDG-Z01-P05', segments: 1 },
  { a: 'VDG-Z01-P06', b: 'VDG-Z01-P05', segments: 1 },
  { a: 'VDG-Z01-P05', b: 'VDG-Z01-P07', segments: 2 },
];

export const depart = {
  zone: 'VDG-Z01',
  position: 'VDG-Z01-P01',
  segment: 4,
};
