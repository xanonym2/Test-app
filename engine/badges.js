// Badges : se branchent uniquement sur les compteurs du bilan de fin.
import { getDb } from './db.js';

export function evaluerBadges(E) {
  const db = getDb();
  return Object.values(db.badges)
    .map((b) => ({ ...b, obtenu: b.test(E) }))
    .sort((a, b) => Number(b.obtenu) - Number(a.obtenu));
}

export function badgesObtenus(E) {
  return evaluerBadges(E).filter((b) => b.obtenu);
}

export function bilan(E) {
  const db = getDb();
  const zonesConnues = E.geo.points_decouverts;
  const toutesZones = Object.keys(db.points);
  return {
    fin: E.fin,
    jours: E.temps.jour,
    segments: E.stats_partie.segments_ecoules,
    depart: E.partie.depart,
    mutateurs: E.partie.mutateurs,
    heros: {
      niveau: E.heros.niveau,
      stats: { ...E.heros.stats },
      competences: [...E.heros.competences],
      xp: E.heros.xp,
    },
    equipe: E.compagnons.map((c) => ({
      id: c.id, niveau: c.niveau, statut: c.statut,
      stats: { ...c.stats }, competences: [...c.competences],
      confiance: c.confiance,
    })),
    pnj: Object.entries(E.social.pnj_statut).map(([id, statut]) => ({ id, statut })),
    ennemis: {
      orcs: E.stats_partie.orcs_vaincus,
      humains: E.stats_partie.humains_vaincus,
      betes: E.stats_partie.betes_vaincues,
    },
    zones_explorees: zonesConnues.filter((p) => (E.geo.points_visites[p] ?? 0) > 0),
    zones_jamais_atteintes: toutesZones.filter((p) => !(E.geo.points_visites[p] > 0)),
    decisions: E.journal.filter((j) => j.cle),
    savoir: E.recit.connaissance_sortilege,
    savoir_max: 5,
    compteurs: { ...E.stats_partie },
    badges: evaluerBadges(E),
    // « Ce qui a été raté » : on signale le volume manqué, jamais son contenu.
    manques: {
      storylets_non_vus: Object.keys(db.storylets).length - Object.keys(E.systeme.storylets_vus).length,
      indices_non_trouves: 3 - Math.min(3, E.stats_partie.indices_trouves),
      points_non_atteints: toutesZones.filter((p) => !(E.geo.points_visites[p] > 0)).length,
      competences_non_prises: Object.keys(db.competences).length - E.heros.competences.length,
    },
  };
}
