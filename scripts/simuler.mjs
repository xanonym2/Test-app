// Simulation de parties entières. Vérifie les invariants du moteur ET les
// règles de contenu qui ne se voient qu'en jeu (nombre d'options par tour,
// sortie toujours disponible), puis donne des repères d'équilibrage.
// N'affiche aucun texte narratif : uniquement des identifiants et des nombres.

import { catalogue } from '../content/index.js';
import {
  nouvellePartie,
  choisir,
  fermerScene,
  vueScene,
  voyager,
  explorerIci,
  peutExplorerIci,
  seReposer,
  destinationsVisibles,
} from '../engine/partie.js';

const PARTIES = Number(process.argv[2] ?? 400);
const MODE = process.argv[3] ?? 'aleatoire'; // 'aleatoire' (invariants) | 'raisonnable' (équilibrage)
const PAS_MAX = 300;

/* -- Un joueur raisonnable : il mange, il dort, et il finit par partir. -- */

function pireDegat(option) {
  let pire = 0;
  for (const issue of option.issuesBrutes ?? []) {
    for (const effet of issue.effets ?? []) {
      if ((effet.sante_heros ?? 0) < 0) pire = Math.max(pire, -effet.sante_heros);
    }
  }
  return pire;
}

function cheminVers(etat, cible) {
  const file = [[etat.geo.position]];
  const vus = new Set([etat.geo.position]);
  while (file.length) {
    const chemin = file.shift();
    const dernier = chemin[chemin.length - 1];
    if (dernier === cible) return chemin;
    for (const l of catalogue.liaisons) {
      const suivant = l.a === dernier ? l.b : l.b === dernier ? l.a : null;
      if (!suivant || vus.has(suivant)) continue;
      vus.add(suivant);
      file.push([...chemin, suivant]);
    }
  }
  return null;
}

function effetsDe(vue, optionId) {
  const source = (catalogue.storylets[vue.id]?.options ?? []).concat(catalogue.systeme.options_repli ?? []);
  const option = source.find((x) => x.id === optionId);
  return (option?.issues ?? []).flatMap((i) => i.effets ?? []);
}

function nourrit(vue, optionId) {
  return effetsDe(vue, optionId).some((e) => (e.faim ?? 0) < 0);
}

function soigne(vue, optionId) {
  return effetsDe(vue, optionId).some((e) => (e.sante_heros ?? 0) > 0);
}

function choixRaisonnable(etat, vue) {
  const options = vue.options.map((o) => ({ ...o, issuesBrutes: (catalogue.storylets[vue.id]?.options ?? []).concat(catalogue.systeme.options_repli ?? []).find((x) => x.id === o.id)?.issues }));
  const ratio = etat.heros.sante / (16 + etat.heros.stats.vigueur * 4);

  // Priorité au corps : manger, puis se soigner.
  if (etat.heros.faim >= 62) {
    const manger = options.find((o) => nourrit(vue, o.id));
    if (manger) return manger.id;
  }
  if (ratio < 0.5) {
    const soin = options.find((o) => soigne(vue, o.id) && pireDegat(o) === 0);
    if (soin) return soin.id;
  }

  const sures = options.filter((o) => pireDegat(o) <= Math.max(3, ratio * 20));
  const pool = sures.length ? sures : options;
  if (ratio < 0.4 || vue.tour >= 4) {
    const sortie = pool.find((o) => o.sortie) ?? options.find((o) => o.sortie);
    if (sortie) return sortie.id;
  }
  const avancer = pool.filter((o) => !o.sortie);
  const liste = avancer.length ? avancer : pool;
  return liste[hasard(liste.length)].id;
}

const violations = new Map();
const stats = {
  fins: {},
  vus: {},
  joursMoyens: 0,
  toursMoyens: 0,
  niveauxMoyens: 0,
  xpMoyen: 0,
  santeMoyenne: 0,
  morts: 0,
  bloquees: 0,
  optionsMin: 99,
  optionsMax: 0,
};

function noter(cle) {
  violations.set(cle, (violations.get(cle) ?? 0) + 1);
}

function hasard(n) {
  return Math.floor(Math.random() * n);
}

for (let partie = 0; partie < PARTIES; partie += 1) {
  let etat = nouvellePartie(catalogue, partie * 7919 + 13);
  let tours = 0;
  let pas = 0;
  let scenesIci = 0;
  let dernierLieu = null;
  const visites = [];

  while (pas < PAS_MAX && !etat.systeme.fin) {
    pas += 1;
    const scene = etat.systeme.scene;

    if (scene && !scene.terminee) {
      const vue = vueScene(etat, catalogue);
      const n = vue.options.length;
      stats.optionsMin = Math.min(stats.optionsMin, n);
      stats.optionsMax = Math.max(stats.optionsMax, n);
      if (n < 3) noter(`${vue.id} : ${n} option(s) au tour ${vue.tour}`);
      if (n > 5) noter(`${vue.id} : ${n} options au tour ${vue.tour}`);
      if (!vue.options.some((o) => o.sortie)) noter(`${vue.id} : aucune sortie au tour ${vue.tour}`);
      if (!vue.journal.length) noter(`${vue.id} : scène sans texte`);

      const avant = JSON.stringify(etat.heros) + JSON.stringify(etat.inventaire) + JSON.stringify(scene.local);
      const idChoisi = MODE === 'raisonnable' ? choixRaisonnable(etat, vue) : vue.options[hasard(n)].id;
      etat = choisir(etat, idChoisi, catalogue);
      const apres = JSON.stringify(etat.heros) + JSON.stringify(etat.inventaire) + JSON.stringify(etat.systeme.scene?.local);
      if (avant === apres && !etat.systeme.scene?.terminee) noter(`${vue.id} : un tour sans aucun effet`);
      tours += 1;
      continue;
    }

    if (scene && scene.terminee) {
      etat = fermerScene(etat, catalogue);
      continue;
    }

    // Hors scène : explorer, voyager ou souffler.
    const destinations = destinationsVisibles(etat, catalogue).filter((d) => !d.bloque);
    const peut = peutExplorerIci(etat, catalogue);

    if (MODE === 'raisonnable') {
      const ici = etat.geo.position;
      if (ici !== dernierLieu) { scenesIci = 0; dernierLieu = ici; }
      if (!visites.includes(ici)) visites.push(ici);

      // On ne se repose que si ça ne revient pas à se laisser mourir de faim.
      if (etat.heros.fatigue > 70 && etat.heros.faim < 60) { etat = seReposer(etat, catalogue, 2); continue; }

      const connaitSortie = etat.geo.points_decouverts.includes('VDG-Z01-P07');
      const assezVu = Object.keys(etat.systeme.storylets_vus).length >= 9 || etat.temps.jour >= 3;
      const cible = connaitSortie && assezVu ? 'VDG-Z01-P07' : !visites.includes('VDG-Z01-P05') ? 'VDG-Z01-P05' : null;
      if (cible && cible !== ici) {
        const chemin = cheminVers(etat, cible);
        const suivant = chemin?.[1];
        if (suivant && destinations.some((d) => d.id === suivant)) { etat = voyager(etat, suivant, catalogue); continue; }
      }
      if (peut && (scenesIci < 3 || etat.heros.faim >= 62)) { scenesIci += 1; etat = explorerIci(etat, catalogue); continue; }
      if (destinations.length) {
        const neufs = destinations.filter((d) => !visites.includes(d.id));
        const liste = neufs.length ? neufs : destinations;
        etat = voyager(etat, liste[hasard(liste.length)].id, catalogue);
        continue;
      }
      break;
    }

    const choix = hasard(10);
    if (peut && choix < 6) etat = explorerIci(etat, catalogue);
    else if (destinations.length && choix < 9) etat = voyager(etat, destinations[hasard(destinations.length)].id, catalogue);
    else if (etat.heros.fatigue > 30) etat = seReposer(etat, catalogue, 2);
    else if (destinations.length) etat = voyager(etat, destinations[hasard(destinations.length)].id, catalogue);
    else break;
  }

  // Le comptage se fait sur l'état final : une partie qui se termine sur une
  // scène compte quand même cette scène.
  for (const [id, n] of Object.entries(etat.systeme.storylets_vus)) {
    stats.vus[id] = (stats.vus[id] ?? 0) + n;
  }
  if (etat.systeme.scene) stats.vus[etat.systeme.scene.id] = (stats.vus[etat.systeme.scene.id] ?? 0) + 1;
  const fin = etat.systeme.fin ?? (pas >= PAS_MAX ? 'sans_fin' : 'impasse');
  stats.fins[fin] = (stats.fins[fin] ?? 0) + 1;
  if (fin === 'mort') stats.morts += 1;
  if (fin === 'impasse') stats.bloquees += 1;
  stats.joursMoyens += etat.temps.jour;
  stats.toursMoyens += tours;
  stats.niveauxMoyens += etat.heros.niveau;
  stats.xpMoyen += etat.heros.xp;
  stats.santeMoyenne += etat.heros.sante;
}

const arrondi = (x) => Math.round(x * 10) / 10;
console.log(`parties simulées : ${PARTIES}  (mode : ${MODE})`);
console.log(`jours par partie : ${arrondi(stats.joursMoyens / PARTIES)}`);
console.log(`tours de scène par partie : ${arrondi(stats.toursMoyens / PARTIES)}`);
console.log(`niveau atteint : ${arrondi(stats.niveauxMoyens / PARTIES)}  (xp ${arrondi(stats.xpMoyen / PARTIES)})`);
console.log(`santé finale : ${arrondi(stats.santeMoyenne / PARTIES)}`);
console.log(`options visibles : de ${stats.optionsMin} à ${stats.optionsMax}`);
console.log('issues de partie :', stats.fins);
console.log('');
const jamaisVus = Object.keys(catalogue.storylets).filter((id) => !stats.vus[id]);
console.log(`storylets atteints : ${Object.keys(stats.vus).length}/${Object.keys(catalogue.storylets).length}`);
if (jamaisVus.length) console.log('jamais atteints :', jamaisVus.join(', '));
console.log('');
if (violations.size) {
  console.log(`VIOLATIONS D'INVARIANT (${violations.size} types)`);
  [...violations.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([cle, n]) => console.log(`  - ${cle}  ×${n}`));
  process.exit(1);
}
console.log('Aucune violation d’invariant sur l’ensemble des parties simulées.');
