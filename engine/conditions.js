// Évaluateur de conditions.
// Une condition est un tableau terse : [operateur, ...arguments].
// Une liste de conditions est un ET logique. ['ou', listeA, listeB, ...] pour un OU.
import { tousLesEtats, encombrement } from './derive.js';

function invStack(E, objetId) {
  return E.inventaire
    .filter((i) => i.base === objetId)
    .reduce((s, i) => s + (i.quantite ?? 1), 0);
}

function itemEquipe(E, famille) {
  const uid = E.equipement?.arme;
  if (!uid) return false;
  const it = E.inventaire.find((i) => i.uid === uid);
  return !!it && it.famille === famille;
}

function pireUsure(E, objetId) {
  const l = E.inventaire.filter((i) => i.base === objetId);
  if (!l.length) return null;
  return Math.min(...l.map((i) => i.usure ?? 100));
}

const OPS = {
  flag: (E, id) => !!E.recit.flags[id],
  '!flag': (E, id) => !E.recit.flags[id],

  local: (E, n, _v, L) => !!L?.[n],
  '!local': (E, n, _v, L) => !L?.[n],
  'local=': (E, n, v, L) => (L?.[n] ?? null) === v,
  'local>=': (E, n, v, L) => (L?.[n] ?? 0) >= v,
  'local<=': (E, n, v, L) => (L?.[n] ?? 0) <= v,

  objet: (E, id) => invStack(E, id) >= 1,
  '!objet': (E, id) => invStack(E, id) < 1,
  'objet>=': (E, id, n) => invStack(E, id) >= n,
  'objet<=': (E, id, n) => invStack(E, id) <= n,
  equipe_famille: (E, f) => itemEquipe(E, f),
  'usure<=': (E, id, n) => { const u = pireUsure(E, id); return u !== null && u <= n; },
  'usure>=': (E, id, n) => { const u = pireUsure(E, id); return u !== null && u >= n; },
  surcharge: (E) => encombrement(E).surcharge,

  'stat>=': (E, s, n) => (E.heros.stats[s] ?? 0) >= n,
  'stat<=': (E, s, n) => (E.heros.stats[s] ?? 0) <= n,
  'niveau>=': (E, n) => E.heros.niveau >= n,
  competence: (E, id) => E.heros.competences.includes(id),
  '!competence': (E, id) => !E.heros.competences.includes(id),

  etat: (E, id) => tousLesEtats(E.heros).includes(id),
  '!etat': (E, id) => !tousLesEtats(E.heros).includes(id),
  'sante<=': (E, n) => E.heros.sante <= n,
  'sante>=': (E, n) => E.heros.sante >= n,
  'fatigue>=': (E, n) => E.heros.fatigue >= n,
  'fatigue<=': (E, n) => E.heros.fatigue <= n,
  'faim>=': (E, n) => E.heros.faim >= n,
  'faim<=': (E, n) => E.heros.faim <= n,

  'jour>=': (E, n) => E.temps.jour >= n,
  'jour<=': (E, n) => E.temps.jour <= n,
  'segment>=': (E, n) => E.temps.segment >= n,
  'segment<=': (E, n) => E.temps.segment <= n,
  meteo: (E, m) => E.temps.meteo === m,
  nuit: (E) => E.temps.segment >= 5,

  position: (E, p) => E.geo.position === p,
  visite: (E, p) => (E.geo.points_visites[p] ?? 0) > 0,
  '!visite': (E, p) => (E.geo.points_visites[p] ?? 0) === 0,
  decouvert: (E, p) => E.geo.points_decouverts.includes(p),
  bloque: (E, p) => !!E.geo.lieux_bloques[p],

  compagnon: (E, id) => E.compagnons.some((c) => c.id === id && c.statut === 'actif'),
  '!compagnon': (E, id) => !E.compagnons.some((c) => c.id === id && c.statut === 'actif'),
  'compagnons>=': (E, n) => E.compagnons.filter((c) => c.statut === 'actif').length >= n,
  'confiance>=': (E, id, n) => (E.social.confiance[id] ?? 0) >= n,
  'confiance<=': (E, id, n) => (E.social.confiance[id] ?? 0) <= n,
  pnj_statut: (E, id, v) => (E.social.pnj_statut[id] ?? null) === v,
  'reputation>=': (E, f, n) => (E.social.reputation[f] ?? 0) >= n,
  'reputation<=': (E, f, n) => (E.social.reputation[f] ?? 0) <= n,

  'savoir>=': (E, n) => E.recit.connaissance_sortilege >= n,
  'acte>=': (E, n) => E.recit.acte >= n,
  mutateur: (E, id) => E.partie.mutateurs.includes(id),
  depart: (E, id) => E.partie.depart === id,
  vu: (E, id) => !!E.systeme.storylets_vus[id],
  '!vu': (E, id) => !E.systeme.storylets_vus[id],
  'stat_partie>=': (E, c, n) => (E.stats_partie[c] ?? 0) >= n,

  tour: (E, n, _v, _L, ctx) => (ctx?.tour ?? 1) === n,
  'tour>=': (E, n, _v, _L, ctx) => (ctx?.tour ?? 1) >= n,
  'tour<=': (E, n, _v, _L, ctx) => (ctx?.tour ?? 1) <= n,
};

export function evaluerCondition(E, cond, local, ctx) {
  if (!Array.isArray(cond) || cond.length === 0) return true;
  const [op, a, b] = cond;
  if (op === 'ou') {
    return cond.slice(1).some((liste) => evaluerConditions(E, liste, local, ctx));
  }
  if (op === 'non') {
    return !evaluerConditions(E, cond[1], local, ctx);
  }
  const fn = OPS[op];
  if (!fn) {
    if (__DEV__CHECK) console.warn('Condition inconnue :', op);
    return false;
  }
  return !!fn(E, a, b, local, ctx);
}

export function evaluerConditions(E, liste, local, ctx) {
  if (!liste || liste.length === 0) return true;
  return liste.every((c) => evaluerCondition(E, c, local, ctx));
}

const __DEV__CHECK = true;

// Vérifie qu'un storylet est jouable ici et maintenant.
export function storyletDisponible(E, s) {
  if (s.unique && E.systeme.storylets_vus[s.id]) return false;
  const c = s.conditions ?? {};
  if (!evaluerConditions(E, c.requis, null, null)) return false;
  if (c.interdit && c.interdit.length && evaluerConditions(E, c.interdit, null, null)) return false;
  if (c.interdit_si_un && c.interdit_si_un.some((x) => evaluerCondition(E, x, null, null))) return false;
  return true;
}

export const operateursConnus = Object.keys(OPS);
