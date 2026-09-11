// Valeurs dérivées. Règle non négociable n°3 : ne jamais stocker ce qui se calcule.
import { PALIERS_USURE, SEUILS_XP, NIVEAU_MAX, SEUILS } from './schema.js';
import { getDb } from './db.js';

export function santeMax(stats) {
  return 20 + stats.vigueur * 5;
}

export function capacitePort(stats) {
  return 12 + stats.vigueur * 3;
}

export function porteeObservation(stats) {
  return 1 + Math.floor(stats.perception / 2);
}

export function bonusMelee(stats) {
  return Math.floor(stats.vigueur / 2);
}

export function bonusTir(stats) {
  return Math.floor(stats.adresse / 2);
}

export function palierUsure(usure) {
  const u = Math.max(0, Math.min(100, usure ?? 100));
  return PALIERS_USURE.find((p) => u >= p.min) ?? PALIERS_USURE[PALIERS_USURE.length - 1];
}

export function objetBase(item) {
  return getDb().objets[item.base] ?? null;
}

export function poidsObjet(item) {
  const base = objetBase(item);
  if (!base) return 0;
  const mod = modificateursObjet(item);
  const facteur = mod.reduce((f, m) => f * (m.poids_facteur ?? 1), 1);
  return Math.round(base.poids * facteur * (item.quantite ?? 1) * 10) / 10;
}

export function modificateursObjet(item) {
  const db = getDb();
  const out = [];
  if (item.prefixe && db.modificateurs[item.prefixe]) out.push(db.modificateurs[item.prefixe]);
  if (item.suffixe && db.modificateurs[item.suffixe]) out.push(db.modificateurs[item.suffixe]);
  return out;
}

// Dégâts effectifs d'une arme : base + modificateurs + palier d'usure + stat.
export function degatsArme(item, stats) {
  const base = objetBase(item);
  if (!base || base.categorie !== 'arme') return bonusMelee(stats);
  const mods = modificateursObjet(item);
  let d = base.degats;
  for (const m of mods) d += m.degats ?? 0;
  d = d * palierUsure(item.usure).facteur;
  const statArme = base.famille === 'arc' ? bonusTir(stats) : bonusMelee(stats);
  return Math.max(1, Math.round(d + statArme));
}

export function protectionTotale(inventaire, equipement) {
  let p = 0;
  for (const uid of Object.values(equipement ?? {})) {
    const item = inventaire.find((i) => i.uid === uid);
    if (!item) continue;
    const base = objetBase(item);
    if (!base || base.categorie !== 'protection') continue;
    const mods = modificateursObjet(item);
    let v = base.protection ?? 0;
    for (const m of mods) v += m.protection ?? 0;
    p += v * palierUsure(item.usure).facteur;
  }
  return Math.round(p);
}

export function poidsPorte(inventaire) {
  return Math.round(inventaire.reduce((s, i) => s + poidsObjet(i), 0) * 10) / 10;
}

export function encombrement(etat) {
  const cap = capacitePort(etat.heros.stats);
  const porte = poidsPorte(etat.inventaire);
  return {
    porte,
    capacite: cap,
    depassement: Math.max(0, Math.round((porte - cap) * 10) / 10),
    surcharge: porte > cap,
  };
}

export function niveauPourXp(xp) {
  let n = 1;
  for (let i = 0; i < SEUILS_XP.length; i++) if (xp >= SEUILS_XP[i]) n = i + 1;
  return Math.min(n, NIVEAU_MAX);
}

export function progressionNiveau(xp, niveau) {
  if (niveau >= NIVEAU_MAX) return { actuel: 0, requis: 0, ratio: 1, max: true };
  const bas = SEUILS_XP[niveau - 1];
  const haut = SEUILS_XP[niveau];
  return {
    actuel: xp - bas,
    requis: haut - bas,
    ratio: Math.max(0, Math.min(1, (xp - bas) / (haut - bas))),
    max: false,
  };
}

// États automatiques déduits des jauges (jamais stockés en double).
export function etatsAutomatiques(heros) {
  const out = [];
  if (heros.faim >= SEUILS.affame) out.push('affame');
  if (heros.fatigue >= SEUILS.epuise) out.push('epuise');
  return out;
}

export function tousLesEtats(heros) {
  return Array.from(new Set([...(heros.etats ?? []), ...etatsAutomatiques(heros)]));
}

// Pénalité globale appliquée aux jets d'action.
export function penaliteEtats(heros) {
  const e = tousLesEtats(heros);
  let p = 0;
  if (e.includes('blesse_leger')) p += 1;
  if (e.includes('blesse_grave')) p += 3;
  if (e.includes('blesse_jambe')) p += 1;
  if (e.includes('epuise')) p += 2;
  if (e.includes('affame')) p += 1;
  return p;
}

// Coût en segments d'un déplacement, modifié par l'état et la charge.
export function facteurDeplacement(etat) {
  let f = 1;
  const e = tousLesEtats(etat.heros);
  if (e.includes('blesse_jambe')) f += 0.5;
  if (e.includes('epuise')) f += 0.25;
  if (encombrement(etat).surcharge) f += 0.5;
  return f;
}
