// Temps, météo, pression de fond.
import { SEGMENTS_PAR_JOUR, COUT_SEGMENT, SEGMENTS_NUIT, MALUS_NUIT_FATIGUE, SEUILS } from './schema.js';
import { choixPondere } from './rng.js';
import { getDb } from './db.js';

export function tableMeteo(E) {
  const db = getDb();
  let table = db.meteo.table.map((m) => ({ ...m }));
  for (const mid of E.partie.mutateurs) {
    const mut = db.mutateurs[mid];
    if (mut?.meteo_poids) {
      table = table.map((m) => ({ ...m, poids: m.poids * (mut.meteo_poids[m.id] ?? 1) }));
    }
  }
  return table;
}

export function tirerMeteo(E) {
  const c = choixPondere(E.systeme.rng, tableMeteo(E));
  E.systeme.rng = c.etat;
  return c.valeur.id;
}

// Fait s'écouler n segments. Retourne la liste des évènements déclenchés.
export function avancerSegments(E, n) {
  const evenements = [];
  let restant = Math.max(0, Math.round(n));
  while (restant > 0) {
    const nuit = SEGMENTS_NUIT.includes(E.temps.segment);
    E.heros.fatigue = Math.min(SEUILS.fatigue_max, E.heros.fatigue + COUT_SEGMENT.fatigue + (nuit ? MALUS_NUIT_FATIGUE : 0));
    E.heros.faim = Math.min(SEUILS.faim_max, E.heros.faim + COUT_SEGMENT.faim);
    E.stats_partie.segments_ecoules += 1;

    // Attrition : la faim et l'épuisement extrêmes coûtent de la santé.
    if (E.heros.faim >= 95) E.heros.sante = Math.max(0, E.heros.sante - 2);
    if (E.heros.fatigue >= 100) E.heros.sante = Math.max(0, E.heros.sante - 1);

    E.temps.segment += 1;
    if (E.temps.segment > SEGMENTS_PAR_JOUR) {
      E.temps.segment = 1;
      E.temps.jour += 1;
      E.stats_partie.jours = E.temps.jour;
      E.temps.meteo = tirerMeteo(E);
      evenements.push({ type: 'jour', jour: E.temps.jour });
      evenements.push(...appliquerPression(E));
    }
    evenements.push(...echeancesDues(E));
    restant -= 1;
  }
  return evenements;
}

// Pression de fond : le monde se dégrade pendant que le joueur se prépare.
export function appliquerPression(E) {
  const db = getDb();
  const out = [];
  const paliers = db.pression ?? [];
  for (const p of paliers) {
    if (E.temps.jour >= p.jour && !E.recit.flags[p.flag]) {
      E.recit.flags[p.flag] = true;
      if (p.bloque) for (const id of p.bloque) E.geo.lieux_bloques[id] = { jusqu_au: 9999 };
      if (p.storylet) out.push({ type: 'declenche', storylet: p.storylet });
      out.push({ type: 'pression', palier: p.flag });
    }
  }
  return out;
}

export function programmerDiffere(E, d) {
  E.systeme.differes.push({
    evenement: d.evenement,
    resolution: d.resolution ?? null,
    jour: E.temps.jour + (d.dans_jours ?? 1),
    segment: d.segment ?? E.temps.segment,
  });
}

function echeancesDues(E) {
  const out = [];
  const restants = [];
  for (const d of E.systeme.differes) {
    if (E.temps.jour > d.jour || (E.temps.jour === d.jour && E.temps.segment >= d.segment)) {
      out.push({ type: 'declenche', storylet: d.evenement, resolution: d.resolution });
    } else {
      restants.push(d);
    }
  }
  E.systeme.differes = restants;
  return out;
}

export function libererLieux(E) {
  for (const [id, v] of Object.entries(E.geo.lieux_bloques)) {
    if (v.jusqu_au && E.temps.jour >= v.jusqu_au) delete E.geo.lieux_bloques[id];
  }
}

export function nomSegment(segment) {
  return segment; // les libellés vivent dans /content
}
