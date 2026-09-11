import { etatInitial, migrer, VERSION_SAUVEGARDE } from './engine/state';
import {
  choisirOption, choisirStorylet, entrerStorylet, enregistrerZones,
  optionsVisibles, reprendreLieu, resteAFaire, voyager,
} from './engine/moteur';
import { STORYLETS, DEPART } from './content/storylets';
import { ZONES } from './content/zones';
import { CARNET } from './content/carnet';
import { OBJETS } from './content/objets';
import { poidsPorte, capacitePort, santeMax, defObjet } from './engine/derive';
import { appliquerEffets } from './engine/effets';

enregistrerZones(ZONES);

let erreurs = [];
const check = (cond, msg) => { if (!cond) erreurs.push(msg); };

// --- 1. Validation statique du contenu -------------------------------------
const ids = Object.keys(STORYLETS);
console.log(`storylets: ${ids.length}`);
let nbOptions = 0, nbIssues = 0, nbVariantes = 0, motsTotal = 0;

const compterMots = (t) => (typeof t === 'string' ? t.split(/\s+/).filter(Boolean).length : 0);

for (const [id, sl] of Object.entries(STORYLETS)) {
  check(sl.id === id, `id incohérent: ${id} vs ${sl.id}`);
  check(sl.texte && (sl.texte.base || sl.texte.arrivee), `${id}: pas de texte`);
  check(Array.isArray(sl.options) && sl.options.length > 0, `${id}: pas d'options`);
  motsTotal += compterMots(sl.texte?.arrivee) + compterMots(sl.texte?.base);
  nbVariantes += (sl.texte?.variantes || []).length;
  for (const v of sl.texte?.variantes || []) motsTotal += compterMots(v.ajout) + compterMots(v.remplace);

  const sorties = sl.options.filter((o) => o.sortie);
  check(sorties.length > 0, `${id}: aucune option de sortie`);
  const idsOpt = new Set();
  for (const o of sl.options) {
    nbOptions += 1;
    check(!idsOpt.has(o.id), `${id}: option ${o.id} en double`);
    idsOpt.add(o.id);
    check(typeof o.libelle === 'string' && o.libelle.length > 0, `${id}/${o.id}: libellé vide`);
    check(Array.isArray(o.issues) && o.issues.length > 0, `${id}/${o.id}: pas d'issue`);
    for (const is of o.issues || []) {
      nbIssues += 1;
      motsTotal += compterMots(is.texte);
      check(typeof is.probabilite === 'number', `${id}/${o.id}: issue sans probabilité`);
      for (const e of is.effets || []) {
        if ('carnet' in e) check(CARNET[e.carnet], `${id}/${o.id}: entrée carnet inconnue ${e.carnet}`);
        if ('objet' in e) check(OBJETS[e.objet], `${id}/${o.id}: objet inconnu ${e.objet}`);
        if ('retire_objet' in e) check(OBJETS[e.retire_objet], `${id}/${o.id}: objet inconnu ${e.retire_objet}`);
        if ('declenche' in e) check(STORYLETS[e.declenche], `${id}/${o.id}: storylet inconnu ${e.declenche}`);
        if ('differe' in e) {
          check(STORYLETS[e.differe.resolution], `${id}: différé -> storylet inconnu ${e.differe.resolution}`);
          if (e.differe.resolution_alternative)
            check(STORYLETS[e.differe.resolution_alternative], `${id}: différé alt inconnu`);
        }
      }
    }
    if (o.cout?.objet) check(OBJETS[o.cout.objet], `${id}/${o.id}: coût objet inconnu ${o.cout.objet}`);
    if (o.declenche) check(STORYLETS[o.declenche], `${id}/${o.id}: declenche inconnu ${o.declenche}`);
  }
}
console.log(`options: ${nbOptions} · issues: ${nbIssues} · variantes: ${nbVariantes}`);
console.log(`volume narratif: ~${motsTotal} mots`);

// --- 2. Migration ----------------------------------------------------------
const vieux = etatInitial();
delete vieux.recit.carnet;
vieux.version_sauvegarde = VERSION_SAUVEGARDE;
const migre = migrer(JSON.parse(JSON.stringify(vieux)));
check(migre && migre.recit.carnet, 'migration: champ manquant non restauré');
check(migrer({ version_sauvegarde: 999 }) === null, 'migration: version future acceptée');

// --- 3. Parties aléatoires --------------------------------------------------
// Un joueur compétent mange quand il a faim et dort quand il est épuisé.
function gererLeCorps(etat) {
  if (etat.heros.faim < 65 && etat.heros.sante > santeMax(etat) * 0.5) return false;
  const cible = etat.inventaire.objets.find((l) => {
    const d = defObjet(l.id);
    if (d.categorie !== 'consommable') return false;
    return etat.heros.faim >= 65 ? Boolean(d.faim) : Boolean(d.soin);
  });
  if (!cible) return false;
  const d = defObjet(cible.id);
  appliquerEffets(etat, [
    { retire_objet: cible.id, quantite: 1 },
    ...(d.faim ? [{ faim: d.faim }] : []),
    ...(d.soin ? [{ sante_heros: d.soin }] : []),
  ]);
  return true;
}

function partie(graine, competent) {
  let rng = graine;
  Math.random = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };

  let etat = entrerStorylet(etatInitial(), DEPART);
  let tours = 0, scenes = new Set();
  while (tours < 400) {
    tours += 1;
    if (etat.recit.flags.fin_mvp || etat.recit.flags.mort) break;
    if (competent && gererLeCorps(etat)) continue;
    if (!etat.scene) {
      if (etat.temps.segment >= 5 && (competent || Math.random() < 0.7)) {
        etat = entrerStorylet(etat, 'VDG-102');
        continue;
      }
      const ici = resteAFaire(etat);
      if (ici && Math.random() < 0.55) { etat = reprendreLieu(etat); continue; }
      const dispo = ZONES[0].points.filter(
        (p) => etat.geo.points_decouverts[p.id] && p.id !== etat.geo.position
      );
      if (dispo.length === 0) break;
      const cible = dispo[Math.floor(Math.random() * dispo.length)];
      etat = voyager(etat, cible.id, cible.cout_segments);
      continue;
    }
    scenes.add(etat.scene.storylet_id);
    const opts = optionsVisibles(etat);
    check(opts.length > 0, `aucune option dans ${etat.scene.storylet_id}`);
    if (opts.length === 0) break;
    // 25% du temps on sort, sinon on prend une option au hasard
    const sortie = opts.find((o) => o.sortie);
    const choix = (Math.random() < 0.3 && sortie) ? sortie : opts[Math.floor(Math.random() * opts.length)];
    etat = choisirOption(etat, choix.id);
    check(etat.heros.sante <= santeMax(etat), 'santé au-dessus du max');
    check(etat.heros.fatigue >= 0 && etat.heros.fatigue <= 100, 'fatigue hors bornes');
    check(etat.heros.faim >= 0 && etat.heros.faim <= 100, 'faim hors bornes');
    check(etat.inventaire.objets.every((l) => l.quantite > 0), 'ligne d’objet à quantité nulle');
  }
  return { tours, scenes: scenes.size, etat };
}

let totalScenes = new Set();
let atteintFin = 0, morts = 0;
const stats = { tours: [], jours: [], niveaux: [], carnet: [], faim: [], fatigue: [] };
for (let g = 1; g <= 40; g += 1) {
  const r = partie(g * 7919, false);
  r.etat && Object.keys(r.etat.systeme.storylets_vus).forEach((k) => totalScenes.add(k));
  if (r.etat.recit.flags.fin_mvp) atteintFin += 1;
  if (r.etat.recit.flags.mort) morts += 1;
  stats.tours.push(r.tours);
  stats.jours.push(r.etat.temps.jour);
  stats.niveaux.push(r.etat.heros.niveau);
  stats.carnet.push(Object.keys(r.etat.recit.carnet).length);
  stats.faim.push(r.etat.heros.faim);
  stats.fatigue.push(r.etat.heros.fatigue);
}
const moy = (a) => (a.reduce((x, y) => x + y, 0) / a.length).toFixed(1);
console.log(`\néquilibrage (40 parties jouées au hasard) :`);
console.log(`  décisions par partie : ${moy(stats.tours)} (min ${Math.min(...stats.tours)}, max ${Math.max(...stats.tours)})`);
console.log(`  jours écoulés        : ${moy(stats.jours)}`);
console.log(`  niveau atteint       : ${moy(stats.niveaux)}`);
console.log(`  entrées de carnet    : ${moy(stats.carnet)} / ${Object.keys(CARNET).length}`);
console.log(`  faim finale          : ${moy(stats.faim)} · fatigue finale : ${moy(stats.fatigue)}`);
console.log(`  morts                : ${morts}`);
const statsC = { morts: 0, fins: 0, jours: [], tours: [] };
for (let g = 1; g <= 40; g += 1) {
  const r = partie(g * 7919, true);
  if (r.etat.recit.flags.mort) statsC.morts += 1;
  if (r.etat.recit.flags.fin_mvp) statsC.fins += 1;
  statsC.jours.push(r.etat.temps.jour);
  statsC.tours.push(r.tours);
}
console.log(`\njoueur qui gère ses ressources (40 parties) :`);
console.log(`  morts ${statsC.morts}/40 · fins atteintes ${statsC.fins}/40 · ${moy(statsC.tours)} décisions · ${moy(statsC.jours)} jours`);

// --- Joueur dirigé : celui qui va au bout sans traîner --------------------
function partieDirigee(graine) {
  let rng = graine;
  Math.random = () => { rng = (rng * 1103515245 + 12345) % 2147483648; return rng / 2147483648; };
  let etat = entrerStorylet(etatInitial(), DEPART);
  let tours = 0;
  const vues = {};
  while (tours < 300) {
    tours += 1;
    if (etat.recit.flags.fin_mvp || etat.recit.flags.mort) break;
    if (gererLeCorps(etat)) continue;
    if (!etat.scene) {
      if (etat.temps.segment >= 5) { etat = entrerStorylet(etat, 'VDG-102'); continue; }
      if (etat.geo.points_decouverts['VDG-Z01-P07'] &&
          ZONES[0].points.filter((p) => p.id !== 'VDG-Z01-P07' &&
            etat.geo.points_decouverts[p.id] && !etat.geo.points_visites[p.id]).length === 0) {
        etat = voyager(etat, 'VDG-Z01-P07', 2);
        continue;
      }
      if (resteAFaire(etat)) { etat = reprendreLieu(etat); continue; }
      const neuf = ZONES[0].points.find(
        (p) => etat.geo.points_decouverts[p.id] && !etat.geo.points_visites[p.id]
      );
      const cible = neuf || ZONES[0].points.find(
        (p) => etat.geo.points_decouverts[p.id] && p.id !== etat.geo.position && resteAFaire(etat, p.id)
      );
      if (!cible) break;
      etat = voyager(etat, cible.id, cible.cout_segments);
      continue;
    }
    const opts = optionsVisibles(etat);
    if (opts.length === 0) break;
    const cleScene = `${etat.scene.storylet_id}#${etat.geo.points_visites[etat.geo.position] || 0}`;
    vues[cleScene] = vues[cleScene] || new Set();
    const utiles = opts.filter((o) => !o.sortie && !vues[cleScene].has(o.id));
    const choix = utiles.length > 0 ? utiles[0] : opts.find((o) => o.sortie) || opts[0];
    vues[cleScene].add(choix.id);
    etat = choisirOption(etat, choix.id);
  }
  return { tours, etat };
}

const statsD = { morts: 0, fins: 0, jours: [], tours: [], carnet: [], niveaux: [] };
for (let g = 1; g <= 40; g += 1) {
  const r = partieDirigee(g * 7919);
  if (r.etat.recit.flags.mort) statsD.morts += 1;
  if (r.etat.recit.flags.fin_mvp) statsD.fins += 1;
  statsD.jours.push(r.etat.temps.jour);
  statsD.tours.push(r.tours);
  statsD.carnet.push(Object.keys(r.etat.recit.carnet).length);
  statsD.niveaux.push(r.etat.heros.niveau);
}
console.log(`\njoueur dirigé, qui va au bout (40 parties) :`);
console.log(`  morts ${statsD.morts}/40 · fins atteintes ${statsD.fins}/40`);
console.log(`  ${moy(statsD.tours)} décisions · ${moy(statsD.jours)} jours · niveau ${moy(statsD.niveaux)} · carnet ${moy(statsD.carnet)}/${Object.keys(CARNET).length}`);

console.log(`40 parties simulées · storylets atteints: ${totalScenes.size}/${ids.length} · fins atteintes: ${atteintFin}`);
const jamais = ids.filter((i) => !totalScenes.has(i));
if (jamais.length) console.log('jamais atteints:', jamais.join(', '));

// --- 4. Rapport ------------------------------------------------------------
if (erreurs.length) {
  console.log(`\n${erreurs.length} ERREURS:`);
  [...new Set(erreurs)].slice(0, 30).forEach((e) => console.log(' -', e));
  process.exit(1);
}
console.log('\nOK — aucune erreur.');
