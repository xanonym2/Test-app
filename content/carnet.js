// Le carnet. Le héros y note de sa main ce qu'il a vu ou entendu.
// Règle : il consigne, il n'interprète jamais. Aucune entrée ne conclut,
// aucune ne relie deux faits entre eux. C'est au joueur de le faire.
//
// Les entrées se débloquent par l'effet { carnet: "id" }.

export const RUBRIQUES = [
  { id: 'noms', nom: 'Noms' },
  { id: 'lieux', nom: 'Lieux' },
  { id: 'vu', nom: 'Choses vues' },
  { id: 'a_faire', nom: 'À vérifier' },
];

export const CARNET = {
  mathieu: {
    rubrique: 'noms',
    titre: 'Mathieu',
    texte: 'Mon frère. Forge. Vingt ans le mois dernier.',
  },
  joe: {
    rubrique: 'noms',
    titre: 'Joé',
    texte: 'Mon frère. Vingt-huit. Il fauchait au Bas-Pré ce matin-là.',
  },
  renn: {
    rubrique: 'noms',
    titre: 'Renn',
    texte: 'Charretier. Terres Libres. Route des comptoirs, deux fois par mois.',
  },
  garic: {
    rubrique: 'noms',
    titre: 'Garic',
    texte: 'Sergent. Sans compagnie depuis huit jours. Il dit huit, pas « environ huit ».',
  },
  vairon: {
    rubrique: 'noms',
    titre: 'Capitaine Vairon',
    texte: 'Nom entendu au camp. Commandait la garnison de la vallée.',
  },
  abeline: {
    rubrique: 'noms',
    titre: 'Abeline',
    texte: 'Ferme haute. Elle est restée trois jours dans la cave.',
  },
  perrine: {
    rubrique: 'noms',
    titre: 'Perrine',
    texte: 'Seize ans. Apprentie au comptoir de la route basse. Elle retient tout.',
  },

  val_de_garde: {
    rubrique: 'lieux',
    titre: 'Val-de-Garde',
    texte: 'Brûlé. Je suis passé par la crête, pas par la route.',
  },
  vieux_poste: {
    rubrique: 'lieux',
    titre: 'Le Vieux Poste',
    texte: 'Tour de guet. Abandonnée avant la paix. Le toit tient encore d’un côté.',
  },
  route_ouest: {
    rubrique: 'lieux',
    titre: 'La route de l’ouest',
    texte: 'Elle sort de la vallée par le col. Trois jours jusqu’au premier comptoir.',
  },

  orcs_a_louest: {
    rubrique: 'vu',
    titre: 'Où ils sont',
    texte:
      'Traces d’orcs bien à l’ouest du fleuve. Pas une patrouille : une colonne. ' +
      'Ils ne devraient pas être de ce côté-ci.',
  },
  rien_pris: {
    rubrique: 'vu',
    titre: 'Ce qu’ils ont laissé',
    texte:
      'Le grenier plein. Les outils en place. L’argent de la ferme encore dans le pot. ' +
      'Ils ont tué et ils sont repartis.',
  },
  garnison_est: {
    rubrique: 'vu',
    titre: 'La garnison',
    texte:
      'Elle est partie vers l’est. Garic dit : ordre écrit, six jours avant. ' +
      'Il n’a pas vu l’ordre lui-même.',
  },
  enseigne: {
    rubrique: 'vu',
    titre: 'L’enseigne',
    texte: 'Un d’entre eux portait une hampe noire, sans étoffe au bout.',
  },
  eau: {
    rubrique: 'a_faire',
    titre: 'L’eau',
    texte: 'La source du vallon coule encore. Deux jours de marche jusqu’à la suivante.',
  },
  col_ouest: {
    rubrique: 'a_faire',
    titre: 'Sortir',
    texte: 'Le col, avant les premiers froids. Ne pas prendre la route basse.',
  },
};
