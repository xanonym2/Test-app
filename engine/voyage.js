// Transitions de voyage : une ou deux phrases, jamais un paragraphe.
import { getDb } from './db.js';
import { evaluerConditions } from './conditions.js';
import { choix } from './rng.js';

export function texteVoyage(E, cible) {
  const v = getDb().voyage;
  if (!v) return null;
  const premiere = (E.geo.points_visites[cible] ?? 0) === 0;
  if (premiere && v.arrivees?.[cible]) return v.arrivees[cible];
  const c = (v.conditionnelles ?? []).find((x) => evaluerConditions(E, x.si, null, null));
  if (c) return c.texte;
  const liste = v.generiques ?? [];
  if (!liste.length) return null;
  const r = choix(E.systeme.rng, liste);
  E.systeme.rng = r.etat;
  return r.valeur;
}
