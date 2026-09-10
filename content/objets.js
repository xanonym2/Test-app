// Catalogue d'objets de base. Les identifiants sont techniques et STABLES.
// Le nom affiché peut changer, l'id jamais.

export const objets = {
  arc_de_chasse: { id: 'arc_de_chasse', nom: 'arc de chasse', categorie: 'arme', famille: 'arc', poids: 3, degats: 6, portee: 'distance' },
  couteau_de_chasse: { id: 'couteau_de_chasse', nom: 'couteau de chasse', categorie: 'arme', famille: 'lame_legere', poids: 1, degats: 3, portee: 'contact' },
  hachette: { id: 'hachette', nom: 'hachette', categorie: 'arme', famille: 'arme_lourde', poids: 3, degats: 7, portee: 'contact' },
  lame_de_garnison: { id: 'lame_de_garnison', nom: 'lame de garnison', categorie: 'arme', famille: 'lame_longue', poids: 3, degats: 6, portee: 'contact' },
  epieu: { id: 'epieu', nom: 'épieu', categorie: 'arme', famille: 'arme_hast', poids: 4, degats: 6, portee: 'allonge' },
  fleche: { id: 'fleche', nom: 'flèche', categorie: 'munition', poids: 0.1 },
  carquois: { id: 'carquois', nom: 'carquois', categorie: 'equipement', poids: 1 },
  outre: { id: 'outre', nom: 'outre', categorie: 'equipement', poids: 2, contenance: true },
  sac_de_toile: { id: 'sac_de_toile', nom: 'sac de toile', categorie: 'equipement', poids: 1, capacite_bonus: 6 },
  corde: { id: 'corde', nom: 'rouleau de corde', categorie: 'outil', poids: 2 },
  silex: { id: 'silex', nom: 'briquet à silex', categorie: 'outil', poids: 0.5 },
  pierre_a_aiguiser: { id: 'pierre_a_aiguiser', nom: 'pierre à aiguiser', categorie: 'outil', poids: 1 },
  necessaire_de_reparation: { id: 'necessaire_de_reparation', nom: 'nécessaire de réparation', categorie: 'outil', poids: 2 },
  lanterne: { id: 'lanterne', nom: 'lanterne sourde', categorie: 'outil', poids: 2 },
  huile: { id: 'huile', nom: 'fiole d’huile', categorie: 'ressource', poids: 0.5 },
  gibier_du_jour: { id: 'gibier_du_jour', nom: 'lièvre saigné', categorie: 'vivres', poids: 3, nourriture: 30 },
  lard_sale: { id: 'lard_sale', nom: 'lard salé', categorie: 'vivres', poids: 1, nourriture: 20 },
  pain_dur: { id: 'pain_dur', nom: 'pain dur', categorie: 'vivres', poids: 0.5, nourriture: 14 },
  navets: { id: 'navets', nom: 'navets terreux', categorie: 'vivres', poids: 1, nourriture: 10 },
  bandage_de_toile: { id: 'bandage_de_toile', nom: 'bande de toile', categorie: 'soin', poids: 0.2, soin: 6 },
  onguent: { id: 'onguent', nom: 'pot d’onguent', categorie: 'soin', poids: 0.5, soin: 12 },
  couverture: { id: 'couverture', nom: 'couverture de laine', categorie: 'equipement', poids: 2 },
  pieces: { id: 'pieces', nom: 'pièces de cuivre', categorie: 'divers', poids: 0.02 },
  medaillon_de_garnison: { id: 'medaillon_de_garnison', nom: 'jeton de garnison', categorie: 'divers', poids: 0.1 },
  eau_claire: { id: 'eau_claire', nom: 'eau claire', categorie: 'vivres', poids: 1, boisson: 18 },
  peau_de_lievre: { id: 'peau_de_lievre', nom: 'peau de lièvre', categorie: 'ressource', poids: 0.5 },
};

// Inventaire de départ : l'arc, un couteau, une outre, la chasse du jour.
export const objetsDepart = [
  { base: 'arc_de_chasse', usure: 72 },
  { base: 'fleche', quantite: 9 },
  { base: 'carquois', usure: 80 },
  { base: 'couteau_de_chasse', usure: 64 },
  { base: 'outre', usure: 90 },
  { base: 'gibier_du_jour', quantite: 1 },
];
