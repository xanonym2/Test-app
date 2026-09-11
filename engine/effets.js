// Application des effets d'une issue.
//
// Un effet est un petit objet ; l'ordre de la liste est respecté. Les effets
// qui touchent le corps sont bornés, ceux qui touchent l'inventaire passent
// par une ligne d'objet (id + usure + quantité), jamais par un compteur nu.

import { defObjet, ligneObjet, santeMax, xpProchainNiveau } from './derive';
import { avancer } from './temps';

export function appliquerEffets(etat, effets, contexte = {}) {
  if (!effets) return etat;
  for (const effet of effets) appliquerEffet(etat, effet, contexte);
  return etat;
}

function appliquerEffet(etat, effet, ctx) {
  if (!effet || typeof effet !== 'object') return;

  if ('objet' in effet) {
    ajouterObjet(etat, effet);
    return;
  }
  if ('retire_objet' in effet) {
    retirerObjet(etat, effet.retire_objet, effet.quantite ?? 1);
    return;
  }
  if ('usure' in effet) {
    const ligne = ligneObjet(etat, effet.usure);
    if (ligne) ligne.usure = borne(ligne.usure + (effet.valeur ?? 0));
    return;
  }
  if ('outre' in effet) {
    const ligne = ligneObjet(etat, 'outre');
    if (ligne) ligne.plein = Boolean(effet.outre);
    return;
  }
  if ('sante_heros' in effet) {
    etat.heros.sante = Math.max(
      0,
      Math.min(santeMax(etat), etat.heros.sante + effet.sante_heros)
    );
    return;
  }
  if ('fatigue' in effet) {
    etat.heros.fatigue = borne(etat.heros.fatigue + effet.fatigue);
    return;
  }
  if ('faim' in effet) {
    etat.heros.faim = borne(etat.heros.faim + effet.faim);
    return;
  }
  if ('etat' in effet) {
    etat.heros.etats[effet.etat] = effet.valeur ?? true;
    return;
  }
  if ('xp' in effet) {
    gagnerXp(etat, effet.xp);
    return;
  }
  if ('reputation' in effet) {
    const { faction, valeur } = effet.reputation;
    etat.social.reputation[faction] = (etat.social.reputation[faction] ?? 0) + valeur;
    return;
  }
  if ('confiance' in effet) {
    const { pnj, valeur } = effet.confiance;
    etat.social.confiance[pnj] = (etat.social.confiance[pnj] ?? 0) + valeur;
    return;
  }
  if ('pnj_statut' in effet) {
    etat.social.pnj_statut[effet.pnj_statut.id] = effet.pnj_statut.valeur;
    return;
  }
  if ('connaissance_sortilege' in effet) {
    const delta = Number(String(effet.connaissance_sortilege).replace('+', '')) || 0;
    etat.recit.connaissance_sortilege = Math.max(
      0,
      Math.min(5, etat.recit.connaissance_sortilege + delta)
    );
    return;
  }
  if ('flag' in effet) {
    etat.recit.flags[effet.flag] = effet.valeur ?? true;
    return;
  }
  if ('acte' in effet) {
    etat.recit.acte = effet.acte;
    return;
  }
  if ('carnet' in effet) {
    if (!etat.recit.carnet[effet.carnet]) {
      etat.recit.carnet[effet.carnet] = {
        jour: etat.temps.jour,
        segment: etat.temps.segment,
      };
    }
    return;
  }
  if ('local' in effet) {
    if (ctx.local) ctx.local[effet.local] = '=' in effet ? effet['='] : true;
    return;
  }
  if ('segments' in effet) {
    avancer(etat, Math.abs(effet.segments));
    return;
  }
  if ('decouvre' in effet) {
    etat.geo.points_decouverts[effet.decouvre] = true;
    return;
  }
  if ('decouvre_zone' in effet) {
    etat.geo.zones_decouvertes[effet.decouvre_zone] = true;
    return;
  }
  if ('lieu_bloque' in effet) {
    const { id, duree_jours } = effet.lieu_bloque;
    etat.geo.lieux_bloques[id] = etat.temps.jour + (duree_jours ?? 1);
    return;
  }
  if ('differe' in effet) {
    // L'issue est fixée MAINTENANT, au moment du choix (règle de contenu n°8).
    const d = effet.differe;
    etat.systeme.differes.push({
      id: d.id || `differe_${etat.systeme.differes.length + 1}`,
      evenement: d.evenement,
      resolution: d.resolution, // storylet déclenché à la résolution
      resolution_alternative: d.resolution_alternative || null,
      sur_lieu: d.sur_lieu || null,
      sur_flag: d.sur_flag || null,
      issue: d.issue ?? (Math.random() * 100 < (d.probabilite ?? 50)),
    });
    return;
  }
  if ('declenche' in effet) {
    ctx.declenche = effet.declenche;
    return;
  }
  if ('stat' in effet) {
    etat.heros.stats[effet.stat] = (etat.heros.stats[effet.stat] ?? 0) + (effet.valeur ?? 1);
    return;
  }
  if ('points_stat' in effet) {
    etat.heros.points_stat_disponibles += effet.points_stat;
  }
}

function ajouterObjet(etat, effet) {
  const id = effet.objet;
  const quantite = effet.quantite ?? 1;
  if (quantite <= 0) {
    retirerObjet(etat, id, -quantite);
    return;
  }
  const def = defObjet(id);
  const empilable = def.empilable !== false;
  const existante = empilable
    ? etat.inventaire.objets.find(
        (l) => l.id === id && l.prefixe === effet.prefixe && l.suffixe === effet.suffixe
      )
    : null;

  if (existante) {
    existante.quantite += quantite;
    return;
  }
  etat.inventaire.objets.push({
    id,
    quantite,
    usure: effet.usure ?? def.usure_depart ?? 80,
    ...(effet.prefixe ? { prefixe: effet.prefixe } : {}),
    ...(effet.suffixe ? { suffixe: effet.suffixe } : {}),
    ...(def.categorie === 'contenant' ? { plein: effet.plein ?? false } : {}),
  });
}

function retirerObjet(etat, id, quantite) {
  let reste = quantite;
  for (let i = etat.inventaire.objets.length - 1; i >= 0 && reste > 0; i -= 1) {
    const ligne = etat.inventaire.objets[i];
    if (ligne.id !== id) continue;
    const pris = Math.min(ligne.quantite, reste);
    ligne.quantite -= pris;
    reste -= pris;
    if (ligne.quantite <= 0) {
      etat.inventaire.objets.splice(i, 1);
      if (etat.inventaire.equipe.arme === id) etat.inventaire.equipe.arme = null;
      if (etat.inventaire.equipe.protection === id) etat.inventaire.equipe.protection = null;
    }
  }
}

function gagnerXp(etat, xp) {
  etat.heros.xp += xp;
  while (etat.heros.niveau < 5 && etat.heros.xp >= xpProchainNiveau(etat.heros.niveau)) {
    etat.heros.niveau += 1;
    etat.heros.points_stat_disponibles += 2;
    etat.heros.sante = Math.min(santeMax(etat), etat.heros.sante + 5);
    if (etat.heros.niveau === 5 && !etat.heros.competences.includes('lire_le_bois')) {
      etat.heros.competences.push('lire_le_bois');
    }
  }
}

function borne(v) {
  return Math.max(0, Math.min(100, Math.round(v)));
}
