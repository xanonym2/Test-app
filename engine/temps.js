// Temps : jour + segment 1..6. Le passage du temps coûte de la fatigue et de la faim.

import { synchroniserEtatsJauges, surcharge, capacitePort } from './etat.js';

export const SEGMENTS = ['aube', 'matin', 'midi', 'après-midi', 'soir', 'nuit'];
export const SEGMENTS_PAR_JOUR = SEGMENTS.length;

export function nomSegment(numero) {
  return SEGMENTS[(numero - 1 + SEGMENTS_PAR_JOUR) % SEGMENTS_PAR_JOUR];
}

const FATIGUE_PAR_SEGMENT = 6;
const FAIM_PAR_SEGMENT = 5;

/**
 * Fait avancer le temps de `n` segments.
 * Renvoie la liste des bilans de fin de journée franchis (texte système).
 */
export function avancerSegments(etat, n, catalogueObjets = {}) {
  const bilans = [];
  for (let i = 0; i < n; i += 1) {
    let fatigue = FATIGUE_PAR_SEGMENT;
    // La nuit épuise davantage, et porter trop lourd aussi.
    if (etat.temps.segment === 6) fatigue += 4;
    const excedent = surcharge(etat, catalogueObjets);
    if (excedent > 0) {
      const ratio = excedent / Math.max(1, capacitePort(etat));
      fatigue += Math.min(8, Math.ceil(ratio * 12));
    }
    etat.heros.fatigue += fatigue;
    etat.heros.faim += FAIM_PAR_SEGMENT;

    etat.temps.segment += 1;
    if (etat.temps.segment > SEGMENTS_PAR_JOUR) {
      etat.temps.segment = 1;
      etat.temps.jour += 1;
      bilans.push(finDeJournee(etat));
    }
    synchroniserEtatsJauges(etat);
  }
  return bilans;
}

/** Décompte des lieux bloqués, usure des états, et bilan lisible. */
function finDeJournee(etat) {
  etat.geo.lieux_bloques = etat.geo.lieux_bloques
    .map((l) => ({ ...l, jours_restants: l.jours_restants - 1 }))
    .filter((l) => l.jours_restants > 0);

  const lignes = [];
  if (etat.heros.etats.includes('affame')) {
    etat.heros.sante -= 5;
    lignes.push('La faim a entamé tes forces.');
  } else if (etat.heros.faim < 70 && etat.heros.fatigue < 65) {
    // Un homme qui mange et qui dort se répare tout seul.
    etat.heros.sante += 3;
    lignes.push('La nuit t’a rendu quelque chose.');
  }
  if (etat.heros.etats.includes('blesse_leger') && etat.heros.fatigue < 60) {
    etat.heros.etats = etat.heros.etats.filter((e) => e !== 'blesse_leger');
    lignes.push('Ta blessure légère s’est refermée.');
  }
  synchroniserEtatsJauges(etat);

  return {
    type: 'bilan',
    jour: etat.temps.jour - 1,
    texte: [
      `Jour ${etat.temps.jour - 1} terminé.`,
      `Santé ${etat.heros.sante}, fatigue ${etat.heros.fatigue}, faim ${etat.heros.faim}.`,
      ...lignes,
    ].join(' '),
  };
}

/** Repos volontaire : rend de la fatigue, coûte du temps et de la faim. */
export function reposer(etat, segments, catalogueObjets) {
  const bilans = avancerSegments(etat, segments, catalogueObjets);
  etat.heros.fatigue -= segments * 16;
  if (etat.heros.etats.includes('blesse_leger')) etat.heros.sante += segments;
  synchroniserEtatsJauges(etat);
  return bilans;
}
