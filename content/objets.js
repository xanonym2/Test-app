// Objets de base. Peu d'objets écrits, beaucoup d'objets perçus : la table de
// préfixes et de suffixes plus bas multiplie ce catalogue.
//
// poids en unités de portage · usure_depart 0-100
// familles d'armes : arc · lame_legere · lame_longue · lourde · hast

export const FAMILLES_ARME = {
  arc: {
    nom: 'Arc',
    resume: 'Frappe à distance, demande des flèches, ne fait aucun bruit.',
  },
  lame_legere: {
    nom: 'Lame légère',
    resume: 'Rapide, se manie d’une main, entame peu.',
  },
  lame_longue: {
    nom: 'Lame longue',
    resume: 'Polyvalente. Rien d’excellent, rien de mauvais.',
  },
  lourde: {
    nom: 'Arme lourde',
    resume: 'Lente à ramener, mais ce qu’elle touche ne se relève pas.',
  },
  hast: {
    nom: 'Arme d’hast',
    resume: 'Tient l’adversaire à distance. Inutile une fois qu’il est dessus.',
  },
};

export const OBJETS = {
  // --- Armes ---------------------------------------------------------------
  arc_de_chasse: {
    nom: 'arc de chasse',
    categorie: 'arme',
    famille: 'arc',
    poids: 3,
    degats: 6,
    usure_depart: 72,
    empilable: false,
    detail: 'If, corne, deux ans de service. La corde a été changée trois fois.',
  },
  fleche: {
    nom: 'flèche',
    categorie: 'munition',
    poids: 0.2,
    usure_depart: 80,
    detail: 'Hampe de frêne, pointe à barbelure. Se récupère souvent, pas toujours.',
  },
  couteau_depouille: {
    nom: 'couteau à dépouiller',
    categorie: 'arme',
    famille: 'lame_legere',
    poids: 1,
    degats: 3,
    usure_depart: 68,
    empilable: false,
    detail: 'Lame courte et courbe, faite pour séparer la peau du muscle.',
  },
  hachette: {
    nom: 'hachette',
    categorie: 'arme',
    famille: 'lame_legere',
    poids: 2,
    degats: 5,
    usure_depart: 60,
    empilable: false,
    detail: 'Outil d’abord, arme ensuite. Le manche a été refait au fil de fer.',
  },
  epee_courte: {
    nom: 'épée courte',
    categorie: 'arme',
    famille: 'lame_longue',
    poids: 3,
    degats: 8,
    usure_depart: 55,
    empilable: false,
    detail: 'Modèle de troupe. Des milliers d’identiques ont été forgées.',
  },
  epieu: {
    nom: 'épieu',
    categorie: 'arme',
    famille: 'hast',
    poids: 4,
    degats: 7,
    usure_depart: 70,
    empilable: false,
    detail: 'Deux mètres de frêne, une pointe large, une traverse pour arrêter.',
  },
  maillet: {
    nom: 'maillet de forge',
    categorie: 'arme',
    famille: 'lourde',
    poids: 7,
    degats: 11,
    usure_depart: 85,
    empilable: false,
    detail: 'Tête d’acier, manche court. Il n’a jamais servi à frapper autre chose que du fer.',
  },

  // --- Protections ---------------------------------------------------------
  veste_cuir: {
    nom: 'veste de cuir bouilli',
    categorie: 'protection',
    poids: 4,
    armure: 2,
    usure_depart: 50,
    empilable: false,
    detail: 'Cuir durci, cousu double aux épaules. Encaisse une fois, pas deux.',
  },
  brassards: {
    nom: 'brassards cloutés',
    categorie: 'protection',
    poids: 2,
    armure: 1,
    usure_depart: 62,
    empilable: false,
    detail: 'Réglementaires. Les lanières sont trop longues d’un cran.',
  },

  // --- Contenants ----------------------------------------------------------
  outre: {
    nom: 'outre',
    categorie: 'contenant',
    poids: 1.5,
    usure_depart: 90,
    empilable: false,
    detail: 'Peau de chèvre, bouchon de bois. Pleine, elle pèse ; vide, elle inquiète.',
  },
  gourde_etain: {
    nom: 'gourde d’étain',
    categorie: 'contenant',
    poids: 1,
    usure_depart: 75,
    empilable: false,
    detail: 'Un nom a été gravé dessus, puis limé.',
  },

  // --- Consommables --------------------------------------------------------
  viande_seche: {
    nom: 'lanière de viande séchée',
    categorie: 'consommable',
    poids: 0.3,
    faim: -18,
    usure_depart: 100,
    detail: 'Salée à en piquer. Se garde un mois, se mâche dix minutes.',
  },
  lievre: {
    nom: 'lièvre',
    categorie: 'consommable',
    poids: 2.5,
    faim: -35,
    usure_depart: 100,
    detail: 'Vidé, pas dépouillé. Il faut du feu et du temps.',
  },
  pain_dur: {
    nom: 'quignon de pain',
    categorie: 'consommable',
    poids: 0.4,
    faim: -14,
    usure_depart: 100,
    detail: 'Dur comme une pierre plate. Trempé, il redevient du pain.',
  },
  racines: {
    nom: 'poignée de racines',
    categorie: 'consommable',
    poids: 0.5,
    faim: -10,
    usure_depart: 100,
    detail: 'Terreuses, filandreuses. Ça remplit sans nourrir.',
  },
  onguent: {
    nom: 'pot d’onguent',
    categorie: 'consommable',
    poids: 0.5,
    soin: 8,
    usure_depart: 100,
    detail: 'Graisse, résine, quelque chose d’amer. Ça brûle avant de soulager.',
  },
  bandes_toile: {
    nom: 'bandes de toile',
    categorie: 'consommable',
    poids: 0.3,
    soin: 4,
    usure_depart: 100,
    detail: 'Déchirées dans un drap. Propres, pour l’instant.',
  },

  // --- Ressources ----------------------------------------------------------
  corde: {
    nom: 'rouleau de corde',
    categorie: 'ressource',
    poids: 2,
    usure_depart: 65,
    detail: 'Chanvre tressé, six pas de long. Raide par temps sec.',
  },
  pierre_aiguiser: {
    nom: 'pierre à aiguiser',
    categorie: 'ressource',
    poids: 0.8,
    usure_depart: 70,
    detail: 'Grise, creusée en son milieu par des années de gestes identiques.',
  },
  cuir_brut: {
    nom: 'morceau de cuir brut',
    categorie: 'ressource',
    poids: 1,
    usure_depart: 100,
    detail: 'Se coupe en lanières, se coud, répare presque tout.',
  },
  boyau: {
    nom: 'écheveau de boyau',
    categorie: 'ressource',
    poids: 0.3,
    usure_depart: 100,
    detail: 'De quoi refaire une corde d’arc, ou deux si on ne gâche pas.',
  },
  amadou: {
    nom: 'boîte à amadou',
    categorie: 'ressource',
    poids: 0.4,
    usure_depart: 80,
    empilable: false,
    detail: 'Silex, briquet, mèche. Le tout au sec, ce qui n’est jamais garanti.',
  },

  // --- Divers --------------------------------------------------------------
  couverture: {
    nom: 'couverture de laine',
    categorie: 'divers',
    poids: 3,
    usure_depart: 45,
    empilable: false,
    detail: 'Grise, rêche, trouée à un angle. Elle tient chaud quand même.',
  },
  jeton_garnison: {
    nom: 'jeton de garnison',
    categorie: 'divers',
    poids: 0.1,
    usure_depart: 60,
    detail: 'Disque de plomb frappé d’une tour. Chaque compagnie a le sien.',
  },
  lettre_pliee: {
    nom: 'feuillet plié',
    categorie: 'divers',
    poids: 0.1,
    usure_depart: 50,
    detail: 'Papier épais, pliage militaire. L’encre a bavé sur un angle.',
  },
};

// --- Modificateurs ---------------------------------------------------------
// Un objet de base + un préfixe ou un suffixe. Le joueur voit un catalogue
// beaucoup plus large que ce qui a été réellement écrit.

export const PREFIXES = {
  rouillé: { usure: -25, degats: -1, categories: ['arme', 'protection'] },
  ébréché: { usure: -15, degats: -1, categories: ['arme'] },
  'bien graissé': { usure: +10, categories: ['arme', 'protection'] },
  'trop grand': { poids: +1, categories: ['protection'] },
  raide: { usure: -10, categories: ['ressource', 'contenant'] },
  neuf: { usure: +20, categories: ['arme', 'protection', 'ressource'] },
};

export const SUFFIXES = {
  'du braconnier': { degats: +1, poids: -0.5, categories: ['arme'] },
  'de la Couronne': { armure: +1, degats: +1, categories: ['arme', 'protection'] },
  'de récupération': { usure: -20, categories: ['arme', 'protection', 'ressource'] },
  'de forge': { degats: +2, poids: +1, categories: ['arme'] },
  'marqué d’un nom': { categories: ['arme', 'protection', 'divers'] },
};

export function modificateursDe(ligne) {
  const mods = [];
  if (ligne.prefixe && PREFIXES[ligne.prefixe]) mods.push([ligne.prefixe, PREFIXES[ligne.prefixe]]);
  if (ligne.suffixe && SUFFIXES[ligne.suffixe]) mods.push([ligne.suffixe, SUFFIXES[ligne.suffixe]]);
  return mods;
}
