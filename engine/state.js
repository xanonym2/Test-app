// Modèle d'état.
//
// Trois règles non négociables :
//   1. identifiants stables, jamais renommés, indépendants du nom affiché
//   2. sauvegarde versionnée dès le jour 1
//   3. rien de calculable n'est stocké (voir derive.js)

export const VERSION_SAUVEGARDE = 1;

export function etatInitial() {
  return {
    version_sauvegarde: VERSION_SAUVEGARDE,

    heros: {
      niveau: 1,
      xp: 0,
      stats: { vigueur: 3, adresse: 4, perception: 4, sang_froid: 3 },
      points_stat_disponibles: 0,
      competences: [],
      sante: 35,
      fatigue: 10,
      faim: 15,
      etats: {
        blesse_leger: false,
        blesse_jambe: false,
        epuise: false,
        affame: false,
      },
    },

    inventaire: {
      // { id, quantite, usure, prefixe?, suffixe? }
      objets: [
        { id: 'arc_de_chasse', quantite: 1, usure: 72 },
        { id: 'fleche', quantite: 9, usure: 80 },
        { id: 'couteau_depouille', quantite: 1, usure: 68 },
        { id: 'outre', quantite: 1, usure: 90, plein: true },
      ],
      equipe: { arme: 'arc_de_chasse', protection: null },
    },

    temps: {
      jour: 1,
      segment: 2, // 1 aube · 2 matin · 3 midi · 4 après-midi · 5 soir · 6 nuit
      meteo: 'degage',
      segments_ecoules: 0,
    },

    geo: {
      position: 'PROLOGUE',
      zones_decouvertes: {},
      points_decouverts: {},
      points_visites: {}, // id -> nombre de visites (pour texte.arrivee)
      lieux_bloques: {}, // id -> jour de déblocage
    },

    social: {
      reputation: { couronne: 0, ordre: 0, marchands: 0, terres_noires: 0 },
      confiance: {},
      pnj_statut: {},
    },

    recit: {
      acte: 1,
      connaissance_sortilege: 0,
      flags: {},
      carnet: {}, // id_entree -> { jour, segment }
    },

    systeme: {
      differes: [], // { id, evenement, resolution, issue }
      storylets_vus: {},
      options_epuisees: {}, // "storyletId:optionId" -> true
      journal: [], // fil des textes de la scène courante
    },

    scene: null, // { storylet_id, local, tour, options_utilisees }
  };
}

// --- Migration --------------------------------------------------------------
//
// Chaque migration prend l'état de la version N et renvoie celui de la N+1.
// On ajoute une entrée ici, jamais on ne modifie une migration publiée.
const MIGRATIONS = {
  // 1: (etat) => { ...etat, nouveau_champ: valeur, version_sauvegarde: 2 },
};

export function migrer(sauvegarde) {
  if (!sauvegarde || typeof sauvegarde !== 'object') return null;
  let etat = sauvegarde;
  let version = etat.version_sauvegarde ?? 0;

  while (version < VERSION_SAUVEGARDE) {
    const migration = MIGRATIONS[version];
    if (!migration) return null; // saut impossible : on repart proprement
    etat = migration(etat);
    version = etat.version_sauvegarde;
  }

  if (version > VERSION_SAUVEGARDE) return null; // sauvegarde d'une version future
  return fusionDefauts(etat);
}

// Un champ ajouté au modèle sans migration ne doit pas faire planter une
// sauvegarde ancienne : on complète par les valeurs par défaut.
function fusionDefauts(etat) {
  const base = etatInitial();
  const fusion = (def, val) => {
    if (val === undefined || val === null) return def;
    if (Array.isArray(def) || typeof def !== 'object') return val;
    const sortie = { ...def };
    for (const cle of Object.keys(def)) sortie[cle] = fusion(def[cle], val[cle]);
    for (const cle of Object.keys(val)) if (!(cle in def)) sortie[cle] = val[cle];
    return sortie;
  };
  return fusion(base, etat);
}
