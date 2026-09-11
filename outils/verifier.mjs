// Vérificateur de contenu + parties automatiques.
// N'IMPRIME JAMAIS DE TEXTE NARRATIF : uniquement des identifiants, des
// compteurs et des types de manquement.
import db from '../content/index.js';
import { operateursConnus } from '../engine/conditions.js';
import { nouvellePartie, voyager, rafraichirScene, pointsAccessibles, partieTerminee } from '../engine/game.js';
import { composerTexte, optionsVisibles, resoudreOption, ouvrirStorylet } from '../engine/storylets.js';
import { bilan } from '../engine/badges.js';
import { appliquerEffets } from '../engine/effects.js';
import { retirerObjet } from '../engine/items.js';

const OPS = new Set([...operateursConnus, 'ou', 'non']);
const EFFETS = new Set([
  'objet', 'quantite', 'tire', 'usure', 'prefixe', 'suffixe', 'uid', 'valeur',
  'sante_heros', 'fatigue', 'faim', 'etat', 'retire_etat', 'xp', 'point_stat',
  'competence_offerte', 'reputation', 'confiance', 'pnj_statut', 'compagnon',
  'retire_compagnon', 'statut', 'sante_compagnon', 'connaissance_sortilege',
  'flag', 'retire_flag', 'stat_partie', 'local', '=', '+=', 'segments',
  'lieu_bloque', 'debloque_point', 'differe', 'declenche', 'journal', 'majeure',
  'acte', 'fin',
]);
const BANNIS = [
  'atmosphère pesante', 'silence inquiétant', 'silence pesant', 'calme trouble',
  'étrangement calme', 'une ambiance', 'air lourd', 'comme si le temps',
  'frisson parcourt', 'sentiment étrange', 'quelque chose ne va pas',
];

const pbs = [];
const note = (grave, id, type, detail) => pbs.push({ grave, id, type, detail });

const mots = (t) => (t ?? '').trim().split(/\s+/).filter(Boolean).length;
const phrases = (t) => (t ?? '').split(/[.!?…]+/).map((s) => s.trim()).filter(Boolean);

// ---------------------------------------------------------------- structure
function verifConditions(id, ou, liste) {
  for (const c of liste ?? []) {
    if (!Array.isArray(c)) { note(1, id, 'condition_non_tableau', ou); continue; }
    if (c[0] === 'ou' || c[0] === 'non') {
      for (const sous of c.slice(1)) verifConditions(id, ou, sous);
      continue;
    }
    if (!OPS.has(c[0])) note(1, id, 'operateur_inconnu', ou + ':' + c[0]);
    verifRefs(id, ou, c);
  }
}

function verifRefs(id, ou, c) {
  const [op, a] = c;
  const table = {
    objet: 'objets', '!objet': 'objets', 'objet>=': 'objets', 'objet<=': 'objets',
    'usure<=': 'objets', 'usure>=': 'objets',
    competence: 'competences', '!competence': 'competences',
    compagnon: 'pnj', '!compagnon': 'pnj', 'confiance>=': 'pnj', 'confiance<=': 'pnj',
    pnj_statut: 'pnj', visite: 'points', '!visite': 'points', decouvert: 'points',
    bloque: 'points', position: 'points', vu: 'storylets', '!vu': 'storylets',
    mutateur: 'mutateurs', depart: 'departs',
  }[op];
  if (table && !db[table]?.[a]) note(1, id, 'reference_inconnue', ou + ':' + op + ':' + a);
  if (op === 'stat_partie>=' && !(a in bilanVierge.compteurs)) note(0, id, 'compteur_inconnu', a);
}

function verifEffets(id, ou, effets) {
  for (const e of effets ?? []) {
    for (const k of Object.keys(e)) {
      if (!EFFETS.has(k)) note(1, id, 'effet_inconnu', ou + ':' + k);
    }
    if (e.objet && !db.objets[e.objet]) note(1, id, 'objet_inconnu', ou + ':' + e.objet);
    if (e.usure && e.usure !== 'arme_equipee' && !db.objets[e.usure]) note(1, id, 'objet_inconnu', ou + ':' + e.usure);
    if (e.compagnon && !db.pnj[e.compagnon]) note(1, id, 'pnj_inconnu', ou + ':' + e.compagnon);
    if (e.retire_compagnon && !db.pnj[e.retire_compagnon]) note(1, id, 'pnj_inconnu', ou + ':' + e.retire_compagnon);
    if (e.pnj_statut && !db.pnj[e.pnj_statut.id]) note(1, id, 'pnj_inconnu', ou + ':' + e.pnj_statut.id);
    if (e.confiance && !db.pnj[e.confiance.pnj]) note(1, id, 'pnj_inconnu', ou + ':' + e.confiance.pnj);
    if (e.sante_compagnon && !db.pnj[e.sante_compagnon.id]) note(1, id, 'pnj_inconnu', ou + ':' + e.sante_compagnon.id);
    if (e.declenche && !db.storylets[e.declenche]) note(1, id, 'storylet_inconnu', ou + ':' + e.declenche);
    if (e.differe && !db.storylets[e.differe.evenement]) note(1, id, 'storylet_inconnu', ou + ':' + e.differe.evenement);
    if (e.debloque_point && !db.points[e.debloque_point]) note(1, id, 'point_inconnu', ou + ':' + e.debloque_point);
    if (e.lieu_bloque && !db.points[e.lieu_bloque.id]) note(1, id, 'point_inconnu', ou + ':' + e.lieu_bloque.id);
    if (e.journal && !db.journal[e.journal]) note(1, id, 'cle_journal_manquante', ou + ':' + e.journal);
    if (e.fin && !db.meta.fins?.[e.fin]) note(1, id, 'fin_inconnue', ou + ':' + e.fin);
    if (e.stat_partie && !(e.stat_partie.compteur in bilanVierge.compteurs)) {
      note(0, id, 'compteur_inconnu', ou + ':' + e.stat_partie.compteur);
    }
  }
}

// ---------------------------------------------------------------- style
function verifStyle(id, ou, texte, maxMots) {
  if (!texte) return;
  const bas = texte.toLowerCase();
  for (const b of BANNIS) if (bas.includes(b)) note(0, id, 'formule_bannie', ou + ':' + b);
  const m = mots(texte);
  if (maxMots && m > maxMots) note(0, id, 'texte_trop_long', ou + ':' + m + '>' + maxMots);
  const longues = phrases(texte).filter((p) => mots(p) > 28).length;
  if (longues) note(0, id, 'phrase_trop_longue', ou + ':' + longues);
  if (/\b\d+\s*(pv|points? de vie|%|xp)\b/i.test(texte)) note(1, id, 'texte_qui_calcule', ou);
}

let bilanVierge;

function verifier() {
  const E0 = nouvellePartie({ seed: 1 });
  bilanVierge = bilan(E0);

  // --- couverture
  const ids = Object.keys(db.storylets);
  const parLieu = {};
  for (const s of Object.values(db.storylets)) {
    const k = s.lieu?.type === 'point_interet' ? s.lieu.cible : s.lieu?.type;
    parLieu[k] = (parLieu[k] ?? 0) + 1;
  }

  for (const [id, s] of Object.entries(db.storylets)) {
    if (s.id !== id) note(1, id, 'id_incoherent', s.id);
    if (!s.texte?.base && !s.texte?.arrivee) note(1, id, 'sans_texte', '');
    verifConditions(id, 'requis', s.conditions?.requis);
    verifConditions(id, 'interdit', s.conditions?.interdit);
    verifStyle(id, 'arrivee', s.texte?.arrivee, 110);
    verifStyle(id, 'base', s.texte?.base, 70);

    const nbVariantes = (s.texte?.variantes ?? []).length;
    if (nbVariantes > 3) note(0, id, 'trop_de_variantes', String(nbVariantes));
    for (const [i, v] of (s.texte?.variantes ?? []).entries()) {
      verifConditions(id, 'variante' + i, v.si);
      verifStyle(id, 'variante' + i, v.ajout, 30);
      verifStyle(id, 'variante' + i, v.remplace, 90);
    }
    for (const [i, r] of (s.regles_locales ?? []).entries()) {
      verifConditions(id, 'regle' + i, r.si);
      verifEffets(id, 'regle' + i, (r.alors ?? []).filter((a) => !a.texte_force));
    }

    const opts = s.options ?? [];
    if (!opts.length) note(1, id, 'sans_option', '');
    // Le plafond de 3 à 5 options porte sur les options VISIBLES à un tour
    // donné, pas sur le total déclaré : un storylet à états en porte plus.
    if (opts.length > 9) note(0, id, 'trop_options', String(opts.length));
    let aSortie = false;
    let modifieEtat = false;
    for (const o of opts) {
      if (!o.libelle) note(1, id, 'option_sans_libelle', o.id);
      if (mots(o.libelle) > 12) note(0, id, 'libelle_trop_long', o.id + ':' + mots(o.libelle));
      if (o.sortie) aSortie = true;
      verifConditions(id, 'opt' + o.id, o.apparait_si);
      verifConditions(id, 'req' + o.id, o.requiert);
      for (const [i, m] of (o.modif_proba ?? []).entries()) verifConditions(id, 'proba' + o.id + i, m.si);
      const issues = o.issues ?? [];
      if (!issues.length && !o.sortie) note(1, id, 'option_sans_issue', o.id);
      const risquee = issues.some((x) => x.probabilite !== undefined);
      if (risquee && issues.length < 2) note(1, id, 'risque_issue_unique', o.id);
      for (const [i, x] of issues.entries()) {
        verifConditions(id, 'issue' + o.id + i, x.si);
        verifEffets(id, 'issue' + o.id + i, x.effets);
        verifStyle(id, 'issue' + o.id + i, x.texte, 70);
        if ((x.effets ?? []).length) modifieEtat = true;
      }
      if (o.cout?.objet) {
        for (const k of Object.keys(o.cout.objet)) {
          if (!db.objets[k]) note(1, id, 'objet_inconnu', 'cout' + o.id + ':' + k);
        }
      }
    }
    if (!aSortie) note(1, id, 'aucune_sortie', '');
    if (!modifieEtat) note(1, id, 'sans_effet', '');
  }

  // --- compétences réellement utilisées
  const brut = JSON.stringify(db.storylets);
  for (const c of Object.keys(db.competences)) {
    if (!brut.includes('"' + c + '"')) note(0, 'competences', 'competence_jamais_utilisee', c);
  }
  for (const o of Object.keys(db.objets)) {
    if (!brut.includes('"' + o + '"') && !JSON.stringify(db.meta).includes('"' + o + '"')) {
      note(0, 'objets', 'objet_jamais_utilise', o);
    }
  }
  for (const p of Object.keys(db.pnj)) {
    if (!brut.includes('"' + p + '"')) note(0, 'pnj', 'pnj_jamais_utilise', p);
  }
  for (const c of Object.keys(db.creatures)) {
    if (!brut.includes('"' + c + '"')) note(0, 'creatures', 'creature_jamais_utilisee', c);
  }
  for (const pr of db.pression) {
    if (pr.storylet && !db.storylets[pr.storylet]) note(1, 'pression', 'storylet_inconnu', pr.storylet);
    for (const b of pr.bloque ?? []) if (!db.points[b]) note(1, 'pression', 'point_inconnu', b);
  }
  for (const p of Object.values(db.points)) {
    for (const v of Object.keys(p.voisins ?? {})) {
      if (!db.points[v]) note(1, 'points', 'voisin_inconnu', p.id + '->' + v);
    }
  }
  if (!db.storylets[db.meta.storylet_ouverture]) note(1, 'meta', 'ouverture_inconnue', db.meta.storylet_ouverture);

  return { ids, parLieu };
}

// ---------------------------------------------------------------- parties auto
// Un joueur raisonnable mange quand il a faim et se soigne quand il saigne :
// c'est ce que permet l'écran d'inventaire, donc le robot le fait aussi.
function entretien(E) {
  const conso = (base) => {
    const it = E.inventaire.find((i) => i.base === base);
    if (!it) return false;
    const b = db.objets[base];
    if (!b?.effets_consommation) return false;
    appliquerEffets(E, b.effets_consommation);
    retirerObjet(E, base, 1);
    return true;
  };
  if (E.heros.faim >= 60) {
    for (const id of Object.keys(db.objets)) {
      const b = db.objets[id];
      if (b.categorie !== 'consommable') continue;
      if ((b.effets_consommation ?? []).some((e) => (e.faim ?? 0) < 0) && conso(id)) break;
    }
  }
  if (E.heros.sante <= 12) {
    for (const id of Object.keys(db.objets)) {
      const b = db.objets[id];
      if (b.categorie !== 'consommable') continue;
      if ((b.effets_consommation ?? []).some((e) => (e.sante_heros ?? 0) > 0) && conso(id)) break;
    }
  }
}

function partieAuto(seed, maxActions = 400) {
  let E;
  try { E = nouvellePartie({ seed }); } catch (e) { return { erreur: 'creation:' + e.message }; }
  let actions = 0;
  let bloque = 0;
  const vus = new Set();
  try {
    while (!partieTerminee(E) && actions < maxActions) {
      actions += 1;
      entretien(E);
      const s = db.storylets[E.systeme.storylet_courant];
      if (!s) {
        const acc = pointsAccessibles(E).filter((p) => !p.bloque);
        if (!acc.length) {
          rafraichirScene(E);
          if (!E.systeme.storylet_courant) { bloque += 1; if (bloque > 3) break; }
          continue;
        }
        const neufs = acc.filter((p) => !p.visite);
        const cible = (neufs.length ? neufs : acc)[actions % (neufs.length || acc.length)];
        voyager(E, cible.id);
        continue;
      }
      vus.add(s.id);
      composerTexte(E, s);
      E.systeme.premiere_vue = false;
      const opts = optionsVisibles(E, s).filter((o) => !o.indisponible);
      if (!opts.length) { rafraichirScene(E); continue; }
      const obs = opts.filter((x) => x.observation);
      const o = (E.geo.points_decouverts.length < 4 && obs.length)
        ? obs[0]
        : opts[(actions * 7 + seed) % opts.length];
      const r = resoudreOption(E, o.id);
      if (!r) { rafraichirScene(E); continue; }
      if (r.declenchements.length) { ouvrirStorylet(E, r.declenchements[0]); continue; }
      if (r.sortie) {
        const quitte = s.id;
        const suivant = rafraichirScene(E);
        if (!suivant || suivant === quitte) {
          E.systeme.storylet_courant = null;
          const acc = pointsAccessibles(E).filter((p) => !p.bloque);
          if (!acc.length) continue;
          const neufs = acc.filter((p) => !p.visite);
          voyager(E, (neufs.length ? neufs : acc)[actions % (neufs.length || acc.length)].id);
        }
      }
    }
  } catch (e) {
    return { erreur: e.message, pile: (e.stack ?? '').split('\n')[1]?.trim(), actions };
  }
  let b;
  try { b = bilan(E); } catch (e) { return { erreur: 'bilan:' + e.message }; }
  return {
    actions, jours: E.temps.jour, niveau: E.heros.niveau, fin: E.fin?.id ?? null,
    points: E.stats_partie.points_visites,
    vus: vus.size, badges: b.badges.filter((x) => x.obtenu).length,
    savoir: E.recit.connaissance_sortilege, xp: E.heros.xp,
    compagnons: E.compagnons.length,
  };
}

// ---------------------------------------------------------------- rapport
const { ids, parLieu } = verifier();

console.log('=== CONTENU ===');
console.log('storylets      :', ids.length);
console.log('  par lieu     :', JSON.stringify(parLieu));
console.log('objets         :', Object.keys(db.objets).length,
            '| modificateurs :', Object.keys(db.modificateurs).length);
console.log('créatures      :', Object.keys(db.creatures).length,
            '| pnj :', Object.keys(db.pnj).length);
console.log('compétences    :', Object.keys(db.competences).length,
            '| badges :', Object.keys(db.badges).length);
console.log('départs        :', Object.keys(db.departs).length,
            '| mutateurs :', Object.keys(db.mutateurs).length);
console.log('points         :', Object.keys(db.points).length,
            '| fins :', Object.keys(db.meta.fins ?? {}).length);
console.log('clés journal   :', Object.keys(db.journal).length);

const graves = pbs.filter((p) => p.grave);
const legers = pbs.filter((p) => !p.grave);
console.log('\n=== VÉRIFICATION ===');
console.log('bloquants :', graves.length, '| à revoir :', legers.length);
const grouper = (l) => {
  const m = {};
  for (const p of l) (m[p.type] ??= []).push(p.id + (p.detail ? ' [' + p.detail + ']' : ''));
  return m;
};
for (const [t, l] of Object.entries(grouper(graves))) console.log('  ! ' + t + ' (' + l.length + ') : ' + l.join(', '));
for (const [t, l] of Object.entries(grouper(legers))) console.log('  ~ ' + t + ' (' + l.length + ') : ' + l.join(', '));

console.log('\n=== PARTIES AUTOMATIQUES ===');
let ko = 0;
const res = [];
for (let s = 1; s <= 30; s++) {
  const r = partieAuto(s * 977);
  if (r.erreur) { ko++; if (ko <= 5) console.log('  CRASH seed', s, ':', r.erreur, r.pile ?? ''); }
  else res.push(r);
}
if (res.length) {
  const moy = (k) => (res.reduce((a, r) => a + (r[k] ?? 0), 0) / res.length).toFixed(1);
  console.log('  parties OK   :', res.length, '/ 30   (crashs :', ko + ')');
  console.log('  actions moy  :', moy('actions'), '| jours moy :', moy('jours'));
  console.log('  niveau moy   :', moy('niveau'), '| xp moy :', moy('xp'));
  console.log('  scènes vues  :', moy('vus'), '/', ids.length, '| points visités :', moy('points'), '/ 6');
  console.log('  savoir moy   :', moy('savoir'), '| badges moy :', moy('badges'));
  console.log('  compagnons   :', moy('compagnons'));
  const fins = {};
  for (const r of res) fins[r.fin ?? 'aucune'] = (fins[r.fin ?? 'aucune'] ?? 0) + 1;
  console.log('  fins         :', JSON.stringify(fins));
}
process.exit(graves.length || ko ? 1 : 0);
