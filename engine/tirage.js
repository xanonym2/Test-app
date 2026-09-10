// Tirages de haut niveau : choix d'une issue parmi celles d'une option.

import { tirer, choisirPondere } from './rng.js';
import { evaluer } from './conditions.js';

export { choisirPondere, tirer };

/**
 * Sélectionne une issue.
 * 1. On ne retient que les issues dont `condition_texte` est satisfaite.
 * 2. On tire au sort selon `probabilite` (poids relatifs).
 *
 * Les dégâts, eux, restent déterministes : l'incertitude porte sur ce que le
 * joueur ignore, pas sur les dés une fois la situation connue.
 */
export function choisirIssue(etat, issues, ctx) {
  if (!issues || !issues.length) return null;
  const possibles = issues.filter((i) => !i.condition_texte || evaluer(i.condition_texte, ctx));
  const liste = possibles.length ? possibles : issues.filter((i) => !i.condition_texte);
  if (!liste.length) return null;
  if (liste.length === 1) return liste[0];
  return choisirPondere(etat, liste, (i) => i.probabilite ?? 100);
}
