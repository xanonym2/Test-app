// Contrôleur de session : relie le moteur à l'interface.
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { getDb } from '../engine/db.js';
import { nouvellePartie, voyager, rafraichirScene, forcerStorylet, partieTerminee } from '../engine/game.js';
import { composerTexte, optionsVisibles, resoudreOption } from '../engine/storylets.js';
import { texteVoyage } from '../engine/voyage.js';
import { ouvrirStorylet } from '../engine/storylets.js';
import { depenserPointStat, apprendreCompetence, xpCompagnons } from '../engine/progression.js';
import { sauvegarder, charger, effacer } from '../engine/save.js';
import { retirerObjet } from '../engine/items.js';
import { appliquerEffets } from '../engine/effects.js';

const Ctx = createContext(null);
export const useJeu = () => useContext(Ctx);

function scenePour(E) {
  const db = getDb();
  const s = db.storylets[E.systeme.storylet_courant];
  if (!s) return { fil: [], options: [], storylet: null };
  const texte = composerTexte(E, s);
  E.systeme.premiere_vue = false;
  return { fil: [{ k: 's', t: texte }], options: optionsVisibles(E, s), storylet: s };
}

export function FournisseurJeu({ children }) {
  const [E, setE] = useState(null);
  const [ecran, setEcran] = useState('titre');
  const [scene, setScene] = useState({ fil: [], options: [], storylet: null });
  const [selection, setSelection] = useState(null);
  const [message, setMessage] = useState(null);
  const ref = useRef(null);
  ref.current = E;

  const pousser = useCallback((etat, sc) => {
    // Le fil affiché fait partie de « revenir exactement au même point » :
    // on le persiste plutôt que de le recomposer, car recomposer rejouerait
    // les règles locales du storylet.
    if (sc) etat.systeme.fil = sc.fil.slice(-40);
    setE({ ...etat });
    if (sc) setScene(sc);
    sauvegarder(etat);
  }, []);

  const demarrer = useCallback((opts) => {
    const etat = nouvellePartie(opts);
    const sc = scenePour(etat);
    setSelection(null);
    setEcran('scene');
    pousser(etat, sc);
  }, [pousser]);

  const reprendre = useCallback(async () => {
    const etat = await charger();
    if (!etat) return false;
    const s = getDb().storylets[etat.systeme.storylet_courant];
    const sc = etat.fin || !s
      ? { fil: etat.systeme.fil ?? [], options: [], storylet: null }
      : { fil: etat.systeme.fil ?? [], options: optionsVisibles(etat, s), storylet: s };
    setSelection(null);
    setEcran(etat.fin ? 'bilan' : 'scene');
    setE({ ...etat });
    setScene(sc);
    return true;
  }, []);

  const abandonner = useCallback(async () => {
    await effacer();
    setE(null);
    setScene({ fil: [], options: [], storylet: null });
    setEcran('titre');
  }, []);

  // Validation explicite d'un choix. Tant qu'on n'a pas validé, la sélection
  // est réversible : rien n'est appliqué ici avant l'appel.
  const valider = useCallback(() => {
    const etat = ref.current;
    if (!etat || !selection) return;
    const r = resoudreOption(etat, selection);
    setSelection(null);
    if (!r) return;

    const xpGagnee = (r.traces ?? []).filter((t) => t.cle === 'xp').reduce((a, t) => a + t.valeur, 0);
    if (xpGagnee) xpCompagnons(etat, xpGagnee);

    if (etat.fin || partieTerminee(etat)) {
      setEcran('bilan');
      pousser(etat, { fil: [...scene.fil, { k: 'i', t: r.texte }], options: [], storylet: scene.storylet });
      return;
    }

    if (r.declenchements.length) {
      ouvrirStorylet(etat, r.declenchements[0]);
      const sc = scenePour(etat);
      pousser(etat, { fil: [{ k: 'i', t: r.texte }, ...sc.fil], options: sc.options, storylet: sc.storylet });
      return;
    }

    if (r.sortie) {
      const quitte = scene.storylet?.id ?? null;
      const suivant = rafraichirScene(etat);
      // On n'enchaîne que sur une scène réellement nouvelle : sinon on rend
      // la main au joueur plutôt que de le renvoyer dans la même scène.
      if (suivant && suivant !== quitte) {
        const sc = scenePour(etat);
        pousser(etat, { fil: [{ k: 'i', t: r.texte }, ...sc.fil], options: sc.options, storylet: sc.storylet });
      } else {
        etat.systeme.storylet_courant = null;
        pousser(etat, { fil: [{ k: 'i', t: r.texte }], options: [], storylet: null });
      }
      return;
    }

    const db = getDb();
    const s = db.storylets[etat.systeme.storylet_courant];
    const texte = composerTexte(etat, s);
    const options = optionsVisibles(etat, s);
    pousser(etat, {
      fil: [...scene.fil, { k: 'i', t: r.texte }, { k: 's', t: texte }],
      options,
      storylet: s,
    });
  }, [selection, scene, pousser]);

  const allerA = useCallback((pointId) => {
    const etat = ref.current;
    const transition = texteVoyage(etat, pointId);
    const r = voyager(etat, pointId);
    if (!r.ok) { setMessage('bloque'); return; }
    const sc = etat.systeme.storylet_courant ? scenePour(etat) : { fil: [], options: [], storylet: null };
    setSelection(null);
    setEcran('scene');
    pousser(etat, {
      ...sc,
      fil: transition ? [{ k: 'v', t: transition }, ...sc.fil] : sc.fil,
    });
  }, [pousser]);

  const relancerScene = useCallback(() => {
    const etat = ref.current;
    const id = rafraichirScene(etat);
    const sc = id ? scenePour(etat) : { fil: [], options: [], storylet: null };
    setSelection(null);
    setEcran('scene');
    pousser(etat, sc);
  }, [pousser]);

  const attribuerPoint = useCallback((stat) => {
    const etat = ref.current;
    if (depenserPointStat(etat, stat)) pousser(etat);
  }, [pousser]);

  const apprendre = useCallback((id) => {
    const etat = ref.current;
    if (apprendreCompetence(etat, id)) pousser(etat);
  }, [pousser]);

  const equiper = useCallback((uid) => {
    const etat = ref.current;
    const it = etat.inventaire.find((i) => i.uid === uid);
    if (!it) return;
    if (it.categorie === 'arme') {
      etat.equipement.arme = etat.equipement.arme === uid ? null : uid;
    } else if (it.categorie === 'protection') {
      etat.equipement.protection = etat.equipement.protection === uid ? null : uid;
    }
    pousser(etat);
  }, [pousser]);

  const jeter = useCallback((uid) => {
    const etat = ref.current;
    const it = etat.inventaire.find((i) => i.uid === uid);
    if (!it) return;
    retirerObjet(etat, it.base, 1);
    pousser(etat);
  }, [pousser]);

  const utiliser = useCallback((uid) => {
    const etat = ref.current;
    const it = etat.inventaire.find((i) => i.uid === uid);
    if (!it) return;
    const base = getDb().objets[it.base];
    if (!base?.effets_consommation) return;
    appliquerEffets(etat, base.effets_consommation);
    retirerObjet(etat, it.base, 1);
    pousser(etat);
  }, [pousser]);

  const reparer = useCallback((uid) => {
    const etat = ref.current;
    const it = etat.inventaire.find((i) => i.uid === uid);
    if (!it || it.usure === null || it.usure >= 100) return;
    if (retirerObjet(etat, 'OBJ-13', 1) < 1) { setMessage('materiaux'); return; }
    it.usure = Math.min(100, it.usure + 30);
    etat.stats_partie.objets_repares += 1;
    pousser(etat);
  }, [pousser]);

  const valeur = {
    E, ecran, setEcran, scene, selection, setSelection, message, setMessage,
    demarrer, reprendre, abandonner, valider, allerA, relancerScene,
    attribuerPoint, apprendre, equiper, jeter, utiliser, reparer,
  };
  return <Ctx.Provider value={valeur}>{children}</Ctx.Provider>;
}
