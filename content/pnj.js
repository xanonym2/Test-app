// PNJ nommés. `confiance` est une valeur par PNJ, modifiée par les effets ;
// `statut` vaut non_rencontre · vivant_allie · vivant_hostile · mort.
//
// `apports` alimente l'écran compagnons : ce que chacun sait faire, en combat
// et en dehors.

export const PNJ = {
  mathieu: {
    nom: 'Mathieu',
    age: 20,
    role: 'Forgeron. Le frère cadet.',
    compagnon: false,
    apports: { combat: null, hors_combat: null },
  },
  joe: {
    nom: 'Joé',
    age: 28,
    role: 'L’aîné. Il tenait la maison depuis la guerre.',
    compagnon: false,
    apports: { combat: null, hors_combat: null },
  },
  renn: {
    nom: 'Renn',
    age: 34,
    role: 'Charretier des Terres Libres. Il faisait la route des comptoirs.',
    compagnon: true,
    stats: { vigueur: 4, adresse: 2, perception: 3, sang_froid: 4 },
    sante: 22,
    sante_max: 30,
    combat: 'Il tient une ligne et ne recule pas. Il ne sait pas viser.',
    hors_combat: 'Il connaît les routes, les péages et le prix de tout.',
    competences: ['Lit une piste de charroi', 'Négocie un passage'],
    equipement: ['épieu', 'veste de cuir bouilli'],
  },
  abeline: {
    nom: 'Abeline',
    age: 51,
    role: 'Elle tenait la ferme haute avec son mari.',
    compagnon: false,
    combat: 'Aucun.',
    hors_combat: 'Elle sait ce qui se mange et ce qui se garde.',
    competences: ['Connaît les terres hautes'],
    equipement: [],
  },
  garic: {
    nom: 'Garic',
    age: 41,
    role: 'Sergent de la Couronne, sans compagnie depuis huit jours.',
    compagnon: true,
    stats: { vigueur: 5, adresse: 3, perception: 2, sang_froid: 5 },
    sante: 18,
    sante_max: 45,
    combat: 'Il sait tenir un passage étroit à lui seul. Il fatigue vite.',
    hors_combat: 'Il connaît les ordres, les relèves, et ce qui ne se fait pas.',
    competences: ['Reconnaît une manœuvre', 'Discipline de marche'],
    equipement: ['épée courte', 'brassards cloutés'],
  },
  perrine: {
    nom: 'Perrine',
    age: 16,
    role: 'Elle était en apprentissage au comptoir de la route basse.',
    compagnon: false,
    combat: 'Aucun.',
    hors_combat: 'Elle a une mémoire exacte des noms et des dates.',
    competences: ['Retient ce qu’elle entend'],
    equipement: [],
  },
};
