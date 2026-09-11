// Constantes de règles. Aucun texte narratif : uniquement des identifiants,
// des seuils et des barèmes. Les libellés affichables vivent dans /content.

export const VERSION_SAUVEGARDE = 1;

export const STATS = ['vigueur', 'adresse', 'perception', 'sangfroid'];

export const FACTIONS = ['couronne', 'terres_noires', 'ordre', 'marchands'];

export const ETATS = [
  'blesse_leger',
  'blesse_grave',
  'blesse_jambe',
  'epuise',
  'affame',
  'assoiffe',
];

export const METEOS = ['clair', 'couvert', 'pluie', 'brume', 'gel'];

export const CATEGORIES_OBJET = [
  'arme',
  'protection',
  'consommable',
  'ressource',
  'divers',
];

export const FAMILLES_ARME = ['arc', 'lame_legere', 'lame_longue', 'lourde', 'hast'];

// Paliers d'usure : jamais affichés en pourcentage brut.
export const PALIERS_USURE = [
  { min: 85, id: 'neuf', facteur: 1.0 },
  { min: 65, id: 'bon', facteur: 1.0 },
  { min: 40, id: 'use', facteur: 0.85 },
  { min: 20, id: 'abime', facteur: 0.65 },
  { min: 0, id: 'ruine', facteur: 0.4 },
];

export const NIVEAU_MAX = 8;

// XP cumulée requise pour atteindre le niveau N (index = niveau - 1).
export const SEUILS_XP = [0, 35, 85, 150, 230, 325, 440, 570];

// Niveaux auxquels une compétence est proposée (1 tous les 2 niveaux).
export const NIVEAUX_COMPETENCE = [2, 4, 6, 8];

export const SEGMENTS_PAR_JOUR = 6;

// Coût de base d'un segment écoulé.
export const COUT_SEGMENT = { fatigue: 6, faim: 5 };

// Segments de nuit : plus coûteux en fatigue.
export const SEGMENTS_NUIT = [5, 6];
export const MALUS_NUIT_FATIGUE = 4;

// Seuils de bascule d'état automatique.
export const SEUILS = {
  affame: 70,
  epuise: 75,
  fatigue_max: 100,
  faim_max: 100,
};

export const STATS_PARTIE_INITIALES = {
  jours: 1,
  segments_ecoules: 0,
  points_visites: 0,
  storylets_joues: 0,
  observations: 0,
  orcs_vaincus: 0,
  humains_vaincus: 0,
  betes_vaincues: 0,
  combats_evites: 0,
  combats_gagnes: 0,
  fleches_tirees: 0,
  degats_subis: 0,
  objets_ramasses: 0,
  objets_repares: 0,
  repas_pris: 0,
  eau_partagee: 0,
  compagnons_recrutes: 0,
  compagnons_perdus: 0,
  pnj_morts: 0,
  decisions_majeures: 0,
  indices_trouves: 0,
  nuits_a_decouvert: 0,
  xp_gagnee: 0,
};
