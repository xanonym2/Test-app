// Mise en forme des données de règles pour l'affichage.
import { getDb } from '../engine/db.js';
import { palierUsure, modificateursObjet, objetBase, poidsObjet } from '../engine/derive.js';

export function nomObjet(item) {
  const base = objetBase(item);
  if (!base) return '?';
  const mods = modificateursObjet(item);
  const prefixe = mods.find((m) => m.type === 'prefixe');
  const suffixe = mods.find((m) => m.type === 'suffixe');
  return [prefixe?.nom, base.nom, suffixe?.nom].filter(Boolean).join(' ');
}

export function nomBase(id) {
  return getDb().objets[id]?.nom ?? id;
}

export function etatUsure(item) {
  if (item.usure === null || item.usure === undefined) return null;
  const p = palierUsure(item.usure);
  return { id: p.id, nom: getDb().libelles.usure?.[p.id] ?? p.id, ratio: item.usure / 100 };
}

export function poidsTexte(item) {
  return poidsObjet(item).toFixed(1).replace('.', ',') + ' kg';
}

export function coutTexte(o) {
  const db = getDb();
  const c = o.cout ?? {};
  const bouts = [];
  if (c.segments) bouts.push(c.segments + (c.segments > 1 ? ' segments' : ' segment'));
  if (c.fatigue) bouts.push('fatigue +' + c.fatigue);
  if (c.usure_arme) bouts.push('use l’arme');
  if (c.objet) {
    for (const [id, q] of Object.entries(c.objet)) {
      bouts.push(nomBase(id) + (q > 1 ? ' ×' + q : ''));
    }
  }
  return bouts.join(' · ');
}

export function traceTexte(t) {
  const l = getDb().libelles.traces ?? {};
  const nom = l[t.cle] ?? t.cle;
  switch (t.cle) {
    case 'objet_gagne': return nom + ' : ' + nomBase(t.id) + (t.valeur > 1 ? ' ×' + t.valeur : '');
    case 'objet_perdu': return nom + ' : ' + nomBase(t.id) + (t.valeur > 1 ? ' ×' + t.valeur : '');
    case 'sante': return nom + ' ' + (t.valeur > 0 ? '+' : '') + t.valeur;
    case 'xp': return nom + ' +' + t.valeur;
    case 'niveau': return nom + ' ' + t.valeur;
    default: return nom;
  }
}

export function pluriel(n, singulier, plurielMot) {
  return n + ' ' + (n > 1 ? (plurielMot ?? singulier + 's') : singulier);
}
