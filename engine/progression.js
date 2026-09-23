// Progression : points de stat et compétences.
// Le build prime sur l'accumulation : les compétences sont proposées par
// groupes mutuellement exclusifs — en choisir une ferme les autres du groupe.
import { getDb } from './db.js';
import { santeMax } from './derive.js';
import { NIVEAU_MAX } from './schema.js';

export function depenserPointStat(E, stat) {
  if (E.heros.points_stat <= 0) return false;
  if (E.heros.stats[stat] >= 6) return false;
  E.heros.stats[stat] += 1;
  E.heros.points_stat -= 1;
  if (stat === 'vigueur') E.heros.sante = Math.min(santeMax(E.heros.stats), E.heros.sante + 5);
  return true;
}

// Compétences proposées au joueur maintenant.
export function competencesProposees(E) {
  const db = getDb();
  if (E.heros.competence_a_choisir <= 0) return [];
  return Object.values(db.competences).filter((c) => {
    if (E.heros.competences.includes(c.id)) return false;
    if (c.niveau_min && E.heros.niveau < c.niveau_min) return false;
    if (c.groupe && E.heros.groupes_fermes.includes(c.groupe)) return false;
    if (c.requiert && !c.requiert.every((r) => E.heros.competences.includes(r))) return false;
    return true;
  });
}

export function apprendreCompetence(E, id) {
  const db = getDb();
  const c = db.competences[id];
  if (!c || E.heros.competence_a_choisir <= 0) return false;
  if (!competencesProposees(E).some((x) => x.id === id)) return false;
  E.heros.competences.push(id);
  E.heros.competence_a_choisir -= 1;
  if (c.groupe && !E.heros.groupes_fermes.includes(c.groupe)) E.heros.groupes_fermes.push(c.groupe);
  return true;
}

// Compétences jamais débloquables cette partie (affichées « verrouillées »).
export function competencesVerrouillees(E) {
  const db = getDb();
  return Object.values(db.competences).filter(
    (c) => !E.heros.competences.includes(c.id) && c.groupe && E.heros.groupes_fermes.includes(c.groupe)
  );
}

export function aCompetence(E, id) {
  return E.heros.competences.includes(id);
}

// Progression des compagnons : plus lente, plafond plus bas.
export function xpCompagnons(E, xp) {
  for (const c of E.compagnons) {
    if (c.statut !== 'actif') continue;
    const plafond = getDb().pnj[c.id]?.niveau_max ?? 5;
    c.xp += Math.round(xp * 0.6);
    const seuil = (n) => 80 * n * n;
    while (c.niveau < Math.min(plafond, NIVEAU_MAX) && c.xp >= seuil(c.niveau)) {
      c.niveau += 1;
      const ordre = getDb().pnj[c.id]?.montee ?? ['vigueur'];
      const stat = ordre[(c.niveau - 2) % ordre.length];
      c.stats[stat] += 1;
      c.sante = santeMax(c.stats);
    }
  }
}
