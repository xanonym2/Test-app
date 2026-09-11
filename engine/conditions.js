// Évaluation des conditions.
//
// Une condition est une liste de clauses ; la liste est vraie si TOUTES les
// clauses le sont (liste vide = vrai).
//
// Une clause porte un « sujet » (une clé qui désigne une valeur de l'état) et,
// optionnellement, un comparateur : "=", "!=", ">=", "<=", ">", "<".
// Sans comparateur, la clause est vraie si la valeur du sujet est « truthy »
// (un flag présent, un objet possédé, un lieu visité...).
//
//   { flag: "village_brule" }
//   { local: "corde_coupee", "=": true }
//   { stat: "perception", ">=": 3 }
//   { fatigue: 0, ">=": 60 }          // le 0 est ignoré, seul le sujet compte
//   { non: { objet: "outre" } }
//   { ou: [ { meteo: "pluie" }, { meteo: "brume" } ] }
//
// Les sujets qui portent un nom (stat, objet, confiance...) prennent ce nom en
// valeur ; les sujets globaux (fatigue, segment, jour...) ignorent la leur.

import { capacitePort, poidsPorte, quantiteObjet, usureObjet } from './derive';

const COMPARATEURS = ['=', '!=', '>=', '<=', '>', '<'];

function compare(valeur, operateur, attendu) {
  if (Array.isArray(attendu)) {
    const dedans = attendu.some((a) => egal(valeur, a));
    return operateur === '!=' ? !dedans : dedans;
  }
  switch (operateur) {
    case '=':
      return egal(valeur, attendu);
    case '!=':
      return !egal(valeur, attendu);
    case '>=':
      return nombre(valeur) >= nombre(attendu);
    case '<=':
      return nombre(valeur) <= nombre(attendu);
    case '>':
      return nombre(valeur) > nombre(attendu);
    case '<':
      return nombre(valeur) < nombre(attendu);
    default:
      return false;
  }
}

function egal(a, b) {
  if (typeof a === 'boolean' || typeof b === 'boolean') return Boolean(a) === Boolean(b);
  return a === b;
}

function nombre(v) {
  if (typeof v === 'number') return v;
  if (typeof v === 'boolean') return v ? 1 : 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Chaque sujet reçoit (etat, nom, local) et renvoie la valeur à comparer.
const SUJETS = {
  flag: (e, nom) => Boolean(e.recit.flags[nom]),
  carnet: (e, nom) => Boolean(e.recit.carnet[nom]),
  local: (e, nom, local) => (local ? local[nom] : undefined),

  objet: (e, nom) => quantiteObjet(e, nom),
  usure: (e, nom) => usureObjet(e, nom),
  outre_pleine: (e) => Boolean((e.inventaire.objets.find((o) => o.id === 'outre') || {}).plein),
  equipe: (e, nom) => e.inventaire.equipe.arme === nom || e.inventaire.equipe.protection === nom,
  surcharge: (e) => poidsPorte(e) > capacitePort(e),

  stat: (e, nom) => e.heros.stats[nom] ?? 0,
  etat: (e, nom) => Boolean(e.heros.etats[nom]),
  sante: (e) => e.heros.sante,
  fatigue: (e) => e.heros.fatigue,
  faim: (e) => e.heros.faim,
  niveau: (e) => e.heros.niveau,

  jour: (e) => e.temps.jour,
  segment: (e) => e.temps.segment,
  meteo: (e) => e.temps.meteo,

  position: (e) => e.geo.position,
  visite: (e, nom) => e.geo.points_visites[nom] ?? 0,
  decouvert: (e, nom) => Boolean(e.geo.points_decouverts[nom]),
  bloque: (e, nom) => Boolean(e.geo.lieux_bloques[nom]),

  confiance: (e, nom) => e.social.confiance[nom] ?? 0,
  pnj_statut: (e, nom) => e.social.pnj_statut[nom] ?? 'non_rencontre',
  reputation: (e, nom) => e.social.reputation[nom] ?? 0,

  acte: (e) => e.recit.acte,
  connaissance_sortilege: (e) => e.recit.connaissance_sortilege,
  storylet_vu: (e, nom) => Boolean(e.systeme.storylets_vus[nom]),
};

export function clauseVraie(clause, etat, local) {
  if (!clause || typeof clause !== 'object') return true;

  if (clause.non) return !clauseVraie(clause.non, etat, local);
  if (clause.ou) return clause.ou.some((c) => clauseVraie(c, etat, local));
  if (clause.et) return clause.et.every((c) => clauseVraie(c, etat, local));

  const sujet = Object.keys(clause).find((k) => SUJETS[k]);
  if (!sujet) return true;

  const valeur = SUJETS[sujet](etat, clause[sujet], local);
  const operateur = COMPARATEURS.find((op) => op in clause);
  if (!operateur) return Boolean(valeur);
  return compare(valeur, operateur, clause[operateur]);
}

export function conditionsVraies(conditions, etat, local) {
  if (!conditions || conditions.length === 0) return true;
  return conditions.every((c) => clauseVraie(c, etat, local));
}

// { requis: [...], interdit: [...] }
export function blocVraie(bloc, etat, local) {
  if (!bloc) return true;
  if (!conditionsVraies(bloc.requis, etat, local)) return false;
  if (bloc.interdit && bloc.interdit.length > 0) {
    if (bloc.interdit.some((c) => clauseVraie(c, etat, local))) return false;
  }
  return true;
}
