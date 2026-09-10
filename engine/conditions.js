// Évaluation des conditions. Une condition est un TABLEAU d'atomes : tous vrais (ET).
// Un atome peut porter `ou: [...]` (au moins un vrai) ou `non: {...}` (négation).
//
// Le moteur ne connaît aucun contenu : il ne manipule que des identifiants.

import { statEffective, surcharge, capacitePort } from './etat.js';

function borne(valeur, spec) {
  if (spec == null) return true;
  if (typeof spec === 'number') return valeur >= spec;
  if (spec.egal !== undefined && valeur !== spec.egal) return false;
  if (spec.min !== undefined && valeur < spec.min) return false;
  if (spec.max !== undefined && valeur > spec.max) return false;
  return true;
}

function quantiteObjet(etat, baseId) {
  return etat.inventaire
    .filter((o) => o.base === baseId)
    .reduce((s, o) => s + (o.quantite ?? 1), 0);
}

function meilleureUsure(etat, baseId) {
  const trouves = etat.inventaire.filter((o) => o.base === baseId);
  if (!trouves.length) return null;
  return Math.max(...trouves.map((o) => o.usure));
}

export function evaluerAtome(atome, ctx) {
  if (!atome || typeof atome !== 'object') return true;
  const { etat, local = {}, catalogueObjets = {} } = ctx;

  if (atome.ou) return atome.ou.some((sous) => evaluerAtome(sous, ctx));
  if (atome.non) return !evaluerAtome(atome.non, ctx);
  if (atome.et) return atome.et.every((sous) => evaluerAtome(sous, ctx));

  if (atome.flag !== undefined) {
    const attendu = atome.valeur === undefined ? true : atome.valeur;
    return Boolean(etat.recit.flags[atome.flag]) === Boolean(attendu);
  }

  if (atome.local !== undefined) {
    const valeur = local[atome.local];
    if (atome.valeur !== undefined) return valeur === atome.valeur;
    if (atome.min !== undefined || atome.max !== undefined) {
      return borne(Number(valeur) || 0, atome);
    }
    return Boolean(valeur);
  }

  if (atome.objet !== undefined) {
    const q = quantiteObjet(etat, atome.objet);
    if (atome.min === undefined && atome.max === undefined) return q >= 1;
    return borne(q, atome);
  }

  if (atome.usure !== undefined) {
    const u = meilleureUsure(etat, atome.usure);
    if (u === null) return false;
    return borne(u, atome);
  }

  if (atome.stat !== undefined) return borne(statEffective(etat, atome.stat), atome);
  if (atome.niveau !== undefined) return borne(etat.heros.niveau, atome.niveau);
  if (atome.competence !== undefined) return etat.heros.competences.includes(atome.competence);

  if (atome.etat !== undefined) {
    const attendu = atome.valeur === undefined ? true : atome.valeur;
    return etat.heros.etats.includes(atome.etat) === Boolean(attendu);
  }

  if (atome.sante !== undefined) return borne(etat.heros.sante, atome.sante);
  if (atome.fatigue !== undefined) return borne(etat.heros.fatigue, atome.fatigue);
  if (atome.faim !== undefined) return borne(etat.heros.faim, atome.faim);

  if (atome.jour !== undefined) return borne(etat.temps.jour, atome.jour);
  if (atome.segment !== undefined) return borne(etat.temps.segment, atome.segment);

  if (atome.confiance !== undefined) {
    const valeur = etat.social.confiance[atome.confiance.pnj] ?? 0;
    return borne(valeur, atome.confiance);
  }
  if (atome.pnj_statut !== undefined) {
    const statut = etat.social.pnj_statut[atome.pnj_statut.id] ?? 'non_rencontre';
    return statut === atome.pnj_statut.valeur;
  }
  if (atome.reputation !== undefined) {
    const valeur = etat.social.reputation[atome.reputation.faction] ?? 0;
    return borne(valeur, atome.reputation);
  }
  if (atome.connaissance_sortilege !== undefined) {
    return borne(etat.recit.connaissance_sortilege, atome.connaissance_sortilege);
  }

  if (atome.storylet_vu !== undefined) {
    const attendu = atome.valeur === undefined ? true : atome.valeur;
    return Boolean(etat.systeme.storylets_vus[atome.storylet_vu]) === Boolean(attendu);
  }
  if (atome.point_decouvert !== undefined) {
    return etat.geo.points_decouverts.includes(atome.point_decouvert);
  }
  if (atome.position !== undefined) return etat.geo.position === atome.position;
  if (atome.lieu_bloque !== undefined) {
    return etat.geo.lieux_bloques.some((l) => l.id === atome.lieu_bloque);
  }

  if (atome.surcharge !== undefined) {
    const ratio = capacitePort(etat)
      ? (surcharge(etat, catalogueObjets) / capacitePort(etat)) * 100
      : 0;
    return borne(ratio, atome.surcharge);
  }

  if (atome.differe !== undefined) {
    return etat.systeme.differes.some((d) => d.evenement === atome.differe);
  }

  // Atome inconnu : on ne bloque pas le jeu, on le signale en développement.
  if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('Atome inconnu', atome);
  return true;
}

export function evaluer(conditions, ctx) {
  if (!conditions) return true;
  const liste = Array.isArray(conditions) ? conditions : [conditions];
  return liste.every((atome) => evaluerAtome(atome, ctx));
}

/** Forme `{ requis: [...], interdit: [...] }` utilisée par les storylets. */
export function evaluerBloc(bloc, ctx) {
  if (!bloc) return true;
  if (bloc.requis && !evaluer(bloc.requis, ctx)) return false;
  if (bloc.interdit && bloc.interdit.some((a) => evaluerAtome(a, ctx))) return false;
  return true;
}
