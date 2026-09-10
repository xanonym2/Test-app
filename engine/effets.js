// Application des effets. Chaque effet est un objet à une clé principale.
// Les effets sont la SEULE façon de muter l'état depuis le contenu.

import { ajouterEtat, retirerEtat, synchroniserEtatsJauges, santeMax, SEUILS_XP, NIVEAU_MAX } from './etat.js';
import { ajouterObjet, retirerObjet, userObjet } from './inventaire.js';
import { avancerSegments } from './temps.js';
import { choisirPondere } from './rng.js';

function nombre(valeur) {
  if (typeof valeur === 'number') return valeur;
  if (typeof valeur === 'string') return parseInt(valeur, 10) || 0;
  return 0;
}

/**
 * @returns {{ local: object, journal: string[], declenche: string[], montees: object[] }}
 */
export function appliquerEffets(etat, effets, contexte = {}) {
  const local = contexte.local ?? {};
  const catalogueObjets = contexte.catalogueObjets ?? {};
  const journal = [];
  const declenche = [];
  const montees = [];

  for (const effet of effets ?? []) {
    if (!effet || typeof effet !== 'object') continue;

    if (effet.objet !== undefined) {
      const q = nombre(effet.quantite ?? 1);
      if (q >= 0) {
        ajouterObjet(etat, {
          base: effet.objet,
          quantite: q,
          prefixe: effet.prefixe ?? null,
          suffixe: effet.suffixe ?? null,
          usure: effet.usure ?? 100,
        });
      } else {
        retirerObjet(etat, effet.objet, -q);
      }
      continue;
    }

    if (effet.usure !== undefined) {
      userObjet(etat, effet.usure, nombre(effet.valeur));
      continue;
    }

    if (effet.sante_heros !== undefined) {
      etat.heros.sante = Math.min(santeMax(etat), etat.heros.sante + nombre(effet.sante_heros));
      continue;
    }
    if (effet.fatigue !== undefined) {
      etat.heros.fatigue += nombre(effet.fatigue);
      continue;
    }
    if (effet.faim !== undefined) {
      etat.heros.faim += nombre(effet.faim);
      continue;
    }

    if (effet.etat !== undefined) {
      if (effet.retire) retirerEtat(etat, effet.etat);
      else ajouterEtat(etat, effet.etat);
      continue;
    }

    if (effet.xp !== undefined) {
      etat.heros.xp += nombre(effet.xp);
      montees.push(...appliquerMontees(etat));
      continue;
    }

    if (effet.reputation !== undefined) {
      const { faction, valeur } = effet.reputation;
      etat.social.reputation[faction] = (etat.social.reputation[faction] ?? 0) + nombre(valeur);
      continue;
    }
    if (effet.confiance !== undefined) {
      const { pnj, valeur } = effet.confiance;
      etat.social.confiance[pnj] = (etat.social.confiance[pnj] ?? 0) + nombre(valeur);
      continue;
    }
    if (effet.pnj_statut !== undefined) {
      etat.social.pnj_statut[effet.pnj_statut.id] = effet.pnj_statut.valeur;
      continue;
    }

    if (effet.connaissance_sortilege !== undefined) {
      const delta = nombre(effet.connaissance_sortilege);
      etat.recit.connaissance_sortilege = Math.max(
        0,
        Math.min(5, etat.recit.connaissance_sortilege + delta)
      );
      continue;
    }
    if (effet.acte !== undefined) {
      etat.recit.acte = nombre(effet.acte);
      continue;
    }

    if (effet.flag !== undefined) {
      const valeur = effet.valeur === undefined ? true : effet.valeur;
      if (valeur === false) delete etat.recit.flags[effet.flag];
      else etat.recit.flags[effet.flag] = valeur;
      continue;
    }

    if (effet.local !== undefined) {
      const valeur = effet['='] !== undefined ? effet['='] : effet.valeur;
      if (typeof valeur === 'object' && valeur && valeur.increment !== undefined) {
        local[effet.local] = (Number(local[effet.local]) || 0) + nombre(valeur.increment);
      } else {
        local[effet.local] = valeur;
      }
      continue;
    }

    if (effet.local_aleatoire !== undefined) {
      // Sert à figer une information que le joueur ignore (combien sont-ils ?),
      // jamais à rendre des dégâts aléatoires.
      const { nom, valeurs, poids } = effet.local_aleatoire;
      const entrees = valeurs.map((valeur, i) => ({ valeur, poids: poids ? poids[i] : 1 }));
      local[nom] = choisirPondere(etat, entrees).valeur;
      continue;
    }

    if (effet.segments !== undefined) {
      const n = Math.abs(nombre(effet.segments));
      const bilans = avancerSegments(etat, n, catalogueObjets);
      bilans.forEach((b) => journal.push(b.texte));
      continue;
    }

    if (effet.lieu_bloque !== undefined) {
      const { id, duree_jours } = effet.lieu_bloque;
      const existant = etat.geo.lieux_bloques.find((l) => l.id === id);
      if (existant) existant.jours_restants = Math.max(existant.jours_restants, duree_jours);
      else etat.geo.lieux_bloques.push({ id, jours_restants: duree_jours });
      continue;
    }

    if (effet.differe !== undefined) {
      // L'issue est figée MAINTENANT ; seule la résolution est repoussée.
      etat.systeme.differes.push({
        evenement: effet.differe.evenement,
        resolution: effet.differe.resolution,
        charge: effet.differe.charge ?? null,
        cree_jour: etat.temps.jour,
      });
      continue;
    }

    if (effet.declenche !== undefined) {
      declenche.push(effet.declenche);
      continue;
    }

    if (effet.point_decouvert !== undefined) {
      const ids = [].concat(effet.point_decouvert);
      for (const id of ids) {
        if (!etat.geo.points_decouverts.includes(id)) etat.geo.points_decouverts.push(id);
      }
      continue;
    }
    if (effet.zone_decouverte !== undefined) {
      if (!etat.geo.zones_decouvertes.includes(effet.zone_decouverte)) {
        etat.geo.zones_decouvertes.push(effet.zone_decouverte);
      }
      continue;
    }
    if (effet.deplace !== undefined) {
      etat.geo.position = effet.deplace;
      continue;
    }

    if (effet.competence !== undefined) {
      if (!etat.heros.competences.includes(effet.competence)) {
        etat.heros.competences.push(effet.competence);
      }
      continue;
    }
    if (effet.point_stat !== undefined) {
      etat.heros.points_stat_disponibles += nombre(effet.point_stat);
      continue;
    }

    if (effet.differe_resolu !== undefined) {
      etat.systeme.differes = etat.systeme.differes.filter(
        (d) => d.evenement !== effet.differe_resolu
      );
      continue;
    }

    if (effet.fin !== undefined) {
      etat.systeme.fin = effet.fin;
      continue;
    }

    if (typeof __DEV__ !== 'undefined' && __DEV__) console.warn('Effet inconnu', effet);
  }

  synchroniserEtatsJauges(etat);
  return { local, journal, declenche, montees };
}

/** Montée(s) de niveau si l'XP le permet. Une compétence au niveau 5. */
export function appliquerMontees(etat) {
  const montees = [];
  while (etat.heros.niveau < NIVEAU_MAX && etat.heros.xp >= SEUILS_XP[etat.heros.niveau]) {
    etat.heros.niveau += 1;
    etat.heros.points_stat_disponibles += 1;
    const monte = { niveau: etat.heros.niveau, competence: etat.heros.niveau === NIVEAU_MAX };
    montees.push(monte);
    // La santé suit la vigueur : on ne rend rien de plus qu'un souffle.
    etat.heros.sante = Math.min(santeMax(etat), etat.heros.sante + 4);
  }
  return montees;
}
