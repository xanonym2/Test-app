// Instances d'objets. Une instance = base + modificateurs + usure.
// Peu d'objets écrits, beaucoup d'objets perçus.
import { getDb } from './db.js';
import { choixPondere, entier } from './rng.js';
import { palierUsure } from './derive.js';

let _compteurUid = 0;

export function nouvelUid(E) {
  _compteurUid += 1;
  E.systeme.uid_suivant = (E.systeme.uid_suivant ?? 1) + 1;
  return 'o' + E.systeme.uid_suivant;
}

export function creerObjet(E, baseId, opts = {}) {
  const base = getDb().objets[baseId];
  if (!base) return null;
  return {
    uid: nouvelUid(E),
    base: baseId,
    categorie: base.categorie,
    famille: base.famille ?? null,
    prefixe: opts.prefixe ?? null,
    suffixe: opts.suffixe ?? null,
    usure: base.usable === false ? null : (opts.usure ?? 100),
    quantite: opts.quantite ?? 1,
  };
}

// Tirage d'un objet « perçu » : base + éventuels modificateurs.
export function tirerObjet(E, baseId, opts = {}) {
  const db = getDb();
  const base = db.objets[baseId];
  if (!base) return null;
  let seed = E.systeme.rng;
  let prefixe = null;
  let suffixe = null;

  const pool = (tableau) =>
    Object.values(db.modificateurs).filter(
      (m) => m.type === tableau && (!m.categories || m.categories.includes(base.categorie))
    );

  if (base.usable !== false) {
    const r1 = entier(seed, 100); seed = r1.etat;
    if (r1.valeur < (opts.chance_prefixe ?? 55)) {
      const p = pool('prefixe');
      if (p.length) { const c = choixPondere(seed, p); seed = c.etat; prefixe = c.valeur.id; }
    }
    const r2 = entier(seed, 100); seed = r2.etat;
    if (r2.valeur < (opts.chance_suffixe ?? 30)) {
      const p = pool('suffixe');
      if (p.length) { const c = choixPondere(seed, p); seed = c.etat; suffixe = c.valeur.id; }
    }
  }

  let usure = opts.usure ?? null;
  if (usure === null && base.usable !== false) {
    const r3 = entier(seed, (opts.usure_max ?? 90) - (opts.usure_min ?? 35) + 1);
    seed = r3.etat;
    usure = (opts.usure_min ?? 35) + r3.valeur;
  }
  E.systeme.rng = seed;
  return { ...creerObjet(E, baseId, { prefixe, suffixe, usure, quantite: opts.quantite ?? 1 }) };
}

export function empilable(baseId) {
  const b = getDb().objets[baseId];
  return !!b && b.empilable === true;
}

export function ajouterObjet(E, item) {
  if (!item) return E;
  if (empilable(item.base)) {
    const ex = E.inventaire.find(
      (i) => i.base === item.base && i.prefixe === item.prefixe && i.suffixe === item.suffixe
    );
    if (ex) {
      ex.quantite = (ex.quantite ?? 1) + (item.quantite ?? 1);
      return E;
    }
  }
  E.inventaire.push(item);
  return E;
}

export function retirerObjet(E, baseId, quantite = 1) {
  let reste = quantite;
  for (let i = E.inventaire.length - 1; i >= 0 && reste > 0; i--) {
    const it = E.inventaire[i];
    if (it.base !== baseId) continue;
    const q = it.quantite ?? 1;
    if (q > reste) {
      it.quantite = q - reste;
      reste = 0;
    } else {
      reste -= q;
      if (E.equipement) {
        for (const k of Object.keys(E.equipement)) {
          if (E.equipement[k] === it.uid) E.equipement[k] = null;
        }
      }
      E.inventaire.splice(i, 1);
    }
  }
  return quantite - reste;
}

export function userObjet(E, baseId, valeur) {
  for (const it of E.inventaire) {
    if (it.base === baseId && it.usure !== null) {
      it.usure = Math.max(0, Math.min(100, it.usure + valeur));
    }
  }
}

export function userUid(E, uid, valeur) {
  const it = E.inventaire.find((i) => i.uid === uid);
  if (it && it.usure !== null) it.usure = Math.max(0, Math.min(100, it.usure + valeur));
}

export function compter(E, baseId) {
  return E.inventaire
    .filter((i) => i.base === baseId)
    .reduce((s, i) => s + (i.quantite ?? 1), 0);
}

export function etatObjet(item) {
  return item.usure === null ? null : palierUsure(item.usure);
}
