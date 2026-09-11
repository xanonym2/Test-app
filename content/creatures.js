// Créatures et menaces. Les fiches servent au combat narratif et à l'écran de
// carnet ; les dégâts sont déterministes, l'incertitude porte sur ce que le
// héros ignore (champ `inconnu`, révélé par l'observation).

export const CREATURES = {
  sanglier_solitaire: {
    nom: 'ragot solitaire',
    categorie: 'bête',
    sante: 14,
    degats: 6,
    connu: 'Il charge droit et ne tourne pas court. Un arbre suffit à le tromper.',
    inconnu: 'Sa patte arrière gauche traîne : il a déjà reçu quelque chose.',
  },
  meute_chiens: {
    nom: 'chiens retournés à la forêt',
    categorie: 'bête',
    sante: 9,
    degats: 4,
    connu: 'Ils tournent avant de mordre et n’attaquent jamais seuls.',
    inconnu: 'Trois seulement tiennent debout. Les deux autres suivent sans oser.',
  },
  corbeaux: {
    nom: 'corbeaux',
    categorie: 'bête',
    sante: 1,
    degats: 0,
    connu: 'Ils ne quittent pas une table servie. Ce qu’ils désignent ne bouge plus.',
    inconnu: null,
  },
  eclaireur_orc: {
    nom: 'éclaireur des Terres Noires',
    categorie: 'orc',
    sante: 18,
    degats: 9,
    connu: 'Il porte peu, va vite, et ne crie pas pour prévenir les autres.',
    inconnu: 'Il boite à peine. Il marche depuis bien plus longtemps qu’il ne devrait.',
  },
  guerrier_orc: {
    nom: 'guerrier des Terres Noires',
    categorie: 'orc',
    sante: 26,
    degats: 13,
    connu: 'Armure de plaques lacées, arme à deux mains. Il n’esquive pas : il encaisse.',
    inconnu: 'Les lacets de son flanc droit ont été refaits à la hâte, avec du cuir neuf.',
  },
  meneur_orc: {
    nom: 'porteur d’enseigne',
    categorie: 'orc',
    sante: 30,
    degats: 14,
    connu: 'Les autres se règlent sur lui. Il regarde autour avant de frapper.',
    inconnu: 'Il ne pille rien. Il vérifie, il compte, et il repart.',
  },
  pillard: {
    nom: 'homme armé, seul',
    categorie: 'humain',
    sante: 16,
    degats: 7,
    connu: 'Il évalue avant d’engager. Un homme qui a le choix ne se bat pas.',
    inconnu: 'Sa main gauche ne se referme plus complètement.',
  },
  froid_de_nuit: {
    nom: 'la nuit à découvert',
    categorie: 'menace',
    sante: null,
    degats: 5,
    connu: 'Elle ne se combat pas. Elle se prépare, ou elle se paie.',
    inconnu: null,
  },
};
