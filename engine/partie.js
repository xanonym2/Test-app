// Contrôleur de partie : la seule surface que l'interface appelle.
// Toutes les fonctions prennent un état, en renvoient une copie modifiée.

import { cloner, creerEtatInitial, santeMax, capacitePort, poidsPorte, statEffective, xpProchainNiveau } from './etat.js';
import { avancerSegments, reposer, nomSegment } from './temps.js';
import { appliquerEffets } from './effets.js';
import {
  choisirStorylet,
  demarrerScene,
  optionsDisponibles,
  resoudreOption,
  storyletsEligibles,
  differeAResoudre,
  consommerDiffere,
} from './storylets.js';
import { nomObjet, palierUsure } from './inventaire.js';
import { evaluer } from './conditions.js';

/* ------------------------------------------------------------------ */
/* Démarrage                                                           */
/* ------------------------------------------------------------------ */

export function nouvellePartie(catalogue, graine) {
  const etat = creerEtatInitial(graine);
  demarrerScene(etat, catalogue.systeme.storylet_ouverture, catalogue);
  return etat;
}

/* ------------------------------------------------------------------ */
/* Déplacement                                                         */
/* ------------------------------------------------------------------ */

export function liaisonsDepuis(etat, catalogue, depuis = etat.geo.position) {
  return (catalogue.liaisons ?? [])
    .filter((l) => l.a === depuis || l.b === depuis)
    .map((l) => ({ cible: l.a === depuis ? l.b : l.a, segments: l.segments }));
}

export function destinationsVisibles(etat, catalogue) {
  return liaisonsDepuis(etat, catalogue)
    .filter((d) => etat.geo.points_decouverts.includes(d.cible))
    .map((d) => {
      const point = catalogue.points[d.cible];
      const bloque = etat.geo.lieux_bloques.find((l) => l.id === d.cible);
      return {
        id: d.cible,
        nom: point?.nom ?? d.cible,
        segments: d.segments,
        bloque: bloque ? bloque.jours_restants : 0,
      };
    });
}

export function voyager(etatSource, cibleId, catalogue) {
  const etat = cloner(etatSource);
  const liaison = liaisonsDepuis(etat, catalogue).find((l) => l.cible === cibleId);
  if (!liaison) return etatSource;
  if (etat.geo.lieux_bloques.some((l) => l.id === cibleId)) return etatSource;

  let cout = liaison.segments;
  // Une jambe blessée coûte un segment de plus sur chaque trajet.
  if (etat.heros.etats.includes('blesse_jambe')) cout += 1;

  avancerSegments(etat, cout, catalogue.objets);
  verifierFin(etat);
  if (etat.systeme.fin) return etat;
  etat.geo.position = cibleId;
  if (!etat.geo.points_decouverts.includes(cibleId)) etat.geo.points_decouverts.push(cibleId);
  arriver(etat, catalogue);
  return etat;
}

/** Arrivée sur un lieu : différés d'abord, puis storylet le plus prioritaire. */
function arriver(etat, catalogue) {
  const differe = differeAResoudre(etat, catalogue, { lieu: etat.geo.position });
  if (differe && differe.charge && catalogue.storylets[differe.charge]) {
    consommerDiffere(etat, differe.evenement);
    demarrerScene(etat, differe.charge, catalogue);
    return;
  }
  const storylet = choisirStorylet(etat, catalogue);
  if (storylet) demarrerScene(etat, storylet.id, catalogue);
  else etat.systeme.scene = null;
}

export function peutExplorerIci(etat, catalogue) {
  return storyletsEligibles(etat, catalogue).length > 0;
}

export function explorerIci(etatSource, catalogue) {
  const etat = cloner(etatSource);
  arriver(etat, catalogue);
  return etat;
}

export function seReposer(etatSource, catalogue, segments = 2) {
  const etat = cloner(etatSource);
  const bilans = reposer(etat, segments, catalogue.objets);
  etat.systeme.dernier_message = catalogue.systeme.texte_repos(segments, bilans);
  verifierFin(etat);
  return etat;
}

/* ------------------------------------------------------------------ */
/* Scène                                                               */
/* ------------------------------------------------------------------ */

export function choisir(etatSource, optionId, catalogue) {
  const etat = cloner(etatSource);
  resoudreOption(etat, optionId, catalogue);
  verifierFin(etat);
  return etat;
}

/** Le corps a le dernier mot : à zéro, la partie s'arrête. */
function verifierFin(etat) {
  if (etat.heros.sante <= 0 && !etat.systeme.fin) etat.systeme.fin = 'mort';
}

/** Après une sortie de scène : storylet déclenché en attente, sinon retour au lieu. */
function enchainer(etat, catalogue) {
  while (etat.systeme.file_declenchee.length) {
    const id = etat.systeme.file_declenchee.shift();
    if (catalogue.storylets[id]) {
      demarrerScene(etat, id, catalogue);
      return;
    }
  }
  etat.systeme.scene = null;
}

export function fermerScene(etatSource, catalogue) {
  const etat = cloner(etatSource);
  enchainer(etat, catalogue);
  return etat;
}

/* ------------------------------------------------------------------ */
/* Progression                                                         */
/* ------------------------------------------------------------------ */

export function depenserPointStat(etatSource, stat) {
  const etat = cloner(etatSource);
  if (etat.heros.points_stat_disponibles <= 0) return etatSource;
  if (etat.heros.stats[stat] === undefined) return etatSource;
  etat.heros.stats[stat] += 1;
  etat.heros.points_stat_disponibles -= 1;
  return etat;
}

export function competencesDisponibles(etat, catalogue) {
  if (etat.heros.niveau < 5 || etat.heros.competences.length > 0) return [];
  return Object.values(catalogue.competences).filter((c) =>
    !c.conditions ? true : evaluer(c.conditions, { etat, local: {}, catalogueObjets: catalogue.objets })
  );
}

export function apprendreCompetence(etatSource, competenceId, catalogue) {
  const etat = cloner(etatSource);
  if (etat.heros.niveau < 5 || etat.heros.competences.length > 0) return etatSource;
  if (!catalogue.competences[competenceId]) return etatSource;
  etat.heros.competences.push(competenceId);
  return etat;
}

/* ------------------------------------------------------------------ */
/* Vues pour l'interface — tout est recalculé, rien n'est stocké        */
/* ------------------------------------------------------------------ */

export function vueBandeau(etat, catalogue) {
  return {
    jour: etat.temps.jour,
    segment: etat.temps.segment,
    nomSegment: nomSegment(etat.temps.segment),
    sante: etat.heros.sante,
    santeMax: santeMax(etat),
    fatigue: etat.heros.fatigue,
    faim: etat.heros.faim,
    etats: etat.heros.etats,
    lieu: catalogue.points[etat.geo.position]?.nom ?? '',
  };
}

export function vueScene(etat, catalogue) {
  const scene = etat.systeme.scene;
  if (!scene) return null;
  const storylet = catalogue.storylets[scene.id];
  return {
    id: scene.id,
    titre: storylet?.titre_affiche ?? catalogue.points[etat.geo.position]?.nom ?? '',
    journal: scene.journal,
    terminee: scene.terminee,
    tour: scene.tour,
    options: scene.terminee
      ? []
      : optionsDisponibles(etat, catalogue).map((o) => ({
          id: o.id,
          libelle: o.libelle,
          cout: o.cout ?? null,
          sortie: Boolean(o.sortie),
        })),
  };
}

export function vuePersonnage(etat, catalogue) {
  return {
    niveau: etat.heros.niveau,
    xp: etat.heros.xp,
    xpProchain: xpProchainNiveau(etat),
    points: etat.heros.points_stat_disponibles,
    stats: ['vigueur', 'adresse', 'perception', 'sang_froid'].map((stat) => ({
      cle: stat,
      brute: etat.heros.stats[stat],
      effective: statEffective(etat, stat),
    })),
    competences: etat.heros.competences.map((id) => catalogue.competences[id]).filter(Boolean),
    etats: etat.heros.etats,
    charge: poidsPorte(etat, catalogue.objets),
    capacite: capacitePort(etat),
    inventaire: etat.inventaire.map((objet) => ({
      uid: objet.uid,
      nom: nomObjet(objet, catalogue.objets, catalogue.modificateurs),
      quantite: objet.quantite ?? 1,
      usure: objet.usure,
      palier: palierUsure(objet.usure).cle,
      poids: (catalogue.objets[objet.base]?.poids ?? 0) * (objet.quantite ?? 1),
      categorie: catalogue.objets[objet.base]?.categorie ?? 'divers',
    })),
    connaissances: etat.recit.connaissance_sortilege,
    confiance: Object.entries(etat.social.confiance).map(([id, valeur]) => ({
      id,
      nom: catalogue.pnjs[id]?.nom ?? id,
      valeur,
      statut: etat.social.pnj_statut[id] ?? 'non_rencontre',
    })),
  };
}

export function vueCarte(etat, catalogue) {
  const points = etat.geo.points_decouverts
    .map((id) => catalogue.points[id])
    .filter(Boolean)
    .map((point) => {
      const liaison = liaisonsDepuis(etat, catalogue).find((l) => l.cible === point.id);
      const bloque = etat.geo.lieux_bloques.find((l) => l.id === point.id);
      return {
        id: point.id,
        nom: point.nom,
        note: point.note ?? '',
        ici: point.id === etat.geo.position,
        accessible: Boolean(liaison) && !bloque,
        segments: liaison ? liaison.segments : null,
        bloque: bloque ? bloque.jours_restants : 0,
      };
    });
  return { zone: catalogue.zones[catalogue.points[etat.geo.position]?.zone]?.nom ?? '', points };
}
