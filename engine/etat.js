// Modèle d'état + valeurs dérivées.
// Règle non négociable n°3 : rien de calculable n'est stocké.
// santé max, capacité de port, poids porté et bonus sont TOUJOURS recalculés.

import { creerGraine } from './rng.js';
import { objetsDepart, departContenu } from '../content/index.js';

export const VERSION_SAUVEGARDE = 1;

export const STATS = ['vigueur', 'adresse', 'perception', 'sang_froid'];
export const FACTIONS = ['couronne', 'orcs', 'ordre', 'marchands'];
export const ETATS_CONNUS = ['blesse_leger', 'blesse_jambe', 'epuise', 'affame'];

export const SEUILS_XP = [0, 45, 110, 200, 320];
export const NIVEAU_MAX = 5;

export function creerEtatInitial(graine = creerGraine()) {
  const etat = {
    version_sauvegarde: VERSION_SAUVEGARDE,
    graine,
    heros: {
      niveau: 1,
      xp: 0,
      stats: { vigueur: 3, adresse: 4, perception: 4, sang_froid: 3 },
      points_stat_disponibles: 0,
      competences: [],
      sante: 0, // fixé juste après, une fois santeMax calculable
      fatigue: 12,
      faim: 15,
      etats: [],
    },
    inventaire: [],
    temps: { jour: 1, segment: departContenu.segment },
    geo: {
      position: departContenu.position,
      zones_decouvertes: [departContenu.zone],
      points_decouverts: [departContenu.position],
      lieux_bloques: [],
    },
    social: {
      reputation: { couronne: 0, orcs: 0, ordre: 0, marchands: 0 },
      confiance: {},
      pnj_statut: {},
    },
    recit: { acte: 1, connaissance_sortilege: 0, flags: {} },
    systeme: {
      tirages: 0,
      differes: [],
      storylets_vus: {},
      scene: null,
      file_declenchee: [],
      journal: [],
      fin: null,
      compteur_objets: 0,
    },
  };

  for (const modele of objetsDepart) {
    etat.inventaire.push({
      uid: `o${++etat.systeme.compteur_objets}`,
      base: modele.base,
      prefixe: modele.prefixe ?? null,
      suffixe: modele.suffixe ?? null,
      usure: modele.usure ?? 100,
      quantite: modele.quantite ?? 1,
    });
  }

  etat.heros.sante = santeMax(etat);
  return etat;
}

/* ------------------------------------------------------------------ */
/* Valeurs dérivées — jamais stockées                                  */
/* ------------------------------------------------------------------ */

export function santeMax(etat) {
  return 16 + etat.heros.stats.vigueur * 4;
}

export function capacitePort(etat) {
  const base = 10 + etat.heros.stats.vigueur * 3;
  return base + (etat.heros.competences.includes('dos_solide') ? 6 : 0);
}

export function poidsPorte(etat, catalogueObjets) {
  return etat.inventaire.reduce((total, objet) => {
    const modele = catalogueObjets[objet.base];
    const poids = modele ? modele.poids : 0;
    return total + poids * (objet.quantite ?? 1);
  }, 0);
}

export function surcharge(etat, catalogueObjets) {
  const porte = poidsPorte(etat, catalogueObjets);
  const capacite = capacitePort(etat);
  return Math.max(0, porte - capacite);
}

/**
 * Stat effective : valeur brute moins les pénalités d'état.
 * Les états sont cumulatifs et volontairement lisibles.
 */
export function statEffective(etat, stat) {
  let valeur = etat.heros.stats[stat] ?? 0;
  const etats = etat.heros.etats;
  if (etats.includes('epuise')) valeur -= 1;
  if (etats.includes('affame')) valeur -= 1;
  if (stat === 'vigueur' && etats.includes('blesse_leger')) valeur -= 1;
  if (stat === 'adresse' && etats.includes('blesse_jambe')) valeur -= 2;
  if (stat === 'vigueur' && etats.includes('blesse_jambe')) valeur -= 1;
  // Les compétences se lisent ici, jamais stockées dans les stats brutes.
  if (stat === 'adresse' && etat.heros.competences.includes('main_sure')) valeur += 1;
  if (stat === 'perception' && etat.heros.competences.includes('oeil_de_chasse')) valeur += 1;
  return Math.max(0, valeur);
}

export function xpProchainNiveau(etat) {
  const niveau = etat.heros.niveau;
  if (niveau >= NIVEAU_MAX) return null;
  return SEUILS_XP[niveau];
}

export function ajouterEtat(etat, nom) {
  if (!etat.heros.etats.includes(nom)) etat.heros.etats.push(nom);
}

export function retirerEtat(etat, nom) {
  etat.heros.etats = etat.heros.etats.filter((e) => e !== nom);
}

/** Les états dérivés de jauges sont resynchronisés après chaque mutation. */
export function synchroniserEtatsJauges(etat) {
  if (etat.heros.fatigue >= 80) ajouterEtat(etat, 'epuise');
  else retirerEtat(etat, 'epuise');
  if (etat.heros.faim >= 80) ajouterEtat(etat, 'affame');
  else retirerEtat(etat, 'affame');
  etat.heros.sante = Math.max(0, Math.min(santeMax(etat), etat.heros.sante));
  etat.heros.fatigue = Math.max(0, Math.min(100, etat.heros.fatigue));
  etat.heros.faim = Math.max(0, Math.min(100, etat.heros.faim));
}

export function cloner(etat) {
  return JSON.parse(JSON.stringify(etat));
}
