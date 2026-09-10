import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StatusBar as BarreNative, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { catalogue } from './content/index.js';
import {
  nouvellePartie,
  choisir,
  fermerScene,
  explorerIci,
  peutExplorerIci,
  seReposer,
  voyager,
  depenserPointStat,
  apprendreCompetence,
  competencesDisponibles,
  vueBandeau,
  vueScene,
  vueCarte,
  vuePersonnage,
} from './engine/partie.js';
import { charger, sauvegarder, effacer } from './engine/sauvegarde.js';

import { couleurs, espaces, typo } from './ui/theme.js';
import { Bouton } from './ui/composants.js';
import { Bandeau } from './ui/Bandeau.js';
import { EcranScene } from './ui/EcranScene.js';
import { EcranCarte } from './ui/EcranCarte.js';
import { EcranPersonnage } from './ui/EcranPersonnage.js';

const HAUT = Platform.OS === 'android' ? BarreNative.currentHeight ?? 24 : 44;

const ETIQUETTES = {
  etats: catalogue.systeme.etiquettes_etats,
  usure: catalogue.systeme.etiquettes_usure,
  stats: catalogue.systeme.etiquettes_stats,
  statuts: catalogue.systeme.etiquettes_statuts,
};

export default function App() {
  const [ecran, setEcran] = useState('chargement');
  const [etat, setEtat] = useState(null);
  const [reprise, setReprise] = useState(false);
  const [onglet, setOnglet] = useState('scene');

  // Reprise de partie : on relit le disque une seule fois, au lancement.
  useEffect(() => {
    let vivant = true;
    charger().then((resultat) => {
      if (!vivant) return;
      if (resultat.ok) {
        setEtat(resultat.etat);
        setReprise(true);
      }
      setEcran('menu');
    });
    return () => {
      vivant = false;
    };
  }, []);

  // Sauvegarde automatique à chaque décision validée.
  useEffect(() => {
    if (ecran === 'jeu' && etat) sauvegarder(etat);
  }, [etat, ecran]);

  const majEtat = useCallback((suivant) => {
    setEtat(suivant);
  }, []);

  if (ecran === 'chargement') {
    return <Cadre><Text style={typo.recitSysteme}>…</Text></Cadre>;
  }

  if (ecran === 'menu') {
    return (
      <Cadre>
        <View style={styles.menu}>
          <Text style={styles.marque}>Val-de-Garde</Text>
          <Text style={[typo.recitSysteme, styles.menuNote]}>
            Marche ouest — trois jours après.
          </Text>

          <View style={styles.menuActions}>
            {reprise ? (
              <Bouton
                titre="Reprendre"
                sousTitre={etat ? `jour ${etat.temps.jour}` : undefined}
                variante="primaire"
                onPress={() => {
                  setOnglet('scene');
                  setEcran('jeu');
                }}
              />
            ) : null}
            <Bouton
              titre={reprise ? 'Recommencer depuis le début' : 'Commencer'}
              variante={reprise ? 'normal' : 'primaire'}
              onPress={async () => {
                await effacer();
                const neuf = nouvellePartie(catalogue);
                setEtat(neuf);
                setReprise(true);
                setOnglet('scene');
                setEcran('jeu');
              }}
            />
          </View>
        </View>
      </Cadre>
    );
  }

  if (!etat) return <Cadre><Text style={typo.recitSysteme}>…</Text></Cadre>;

  if (etat.systeme.fin) {
    const fin = catalogue.systeme.textes_fin[etat.systeme.fin] ?? catalogue.systeme.textes_fin.mort;
    const scene = vueScene(etat, catalogue);
    return (
      <Cadre>
        <ScrollView contentContainerStyle={styles.finContenu}>
          {scene
            ? scene.journal.map((entree, i) => (
                <Text
                  key={i}
                  style={[entree.type === 'systeme' ? typo.recitSysteme : typo.recit, styles.finEntree]}
                >
                  {entree.texte}
                </Text>
              ))
            : null}
          <Text style={styles.finTitre}>{fin.titre}</Text>
          <Text style={[typo.recit, styles.finEntree]}>{fin.texte}</Text>
          <Text style={[typo.recitSysteme, styles.finEntree]}>
            Jour {etat.temps.jour} · niveau {etat.heros.niveau} · {etat.heros.xp} d’expérience ·{' '}
            {Object.keys(etat.systeme.storylets_vus).length} scènes traversées.
          </Text>
          <Bouton
            titre="Repartir de la crête"
            variante="primaire"
            onPress={async () => {
              await effacer();
              setEtat(nouvellePartie(catalogue));
              setOnglet('scene');
            }}
          />
        </ScrollView>
      </Cadre>
    );
  }

  const bandeau = vueBandeau(etat, catalogue);
  const scene = vueScene(etat, catalogue);
  const point = catalogue.points[etat.geo.position];

  const lieu = {
    nom: point?.nom ?? '',
    note: point?.note ?? '',
    message: etat.systeme.dernier_message ?? null,
    peutExplorer: peutExplorerIci(etat, catalogue),
  };

  const actionLieu = (action) => {
    if (action === 'explorer') majEtat(explorerIci(nettoyer(etat), catalogue));
    else if (action === 'reposer') majEtat(seReposer(etat, catalogue, 2));
    else if (action === 'carte') setOnglet('carte');
  };

  return (
    <Cadre>
      <Bandeau vue={bandeau} etiquettesEtats={ETIQUETTES.etats} />

      <View style={styles.corps}>
        {onglet === 'scene' ? (
          <EcranScene
            scene={scene}
            lieu={lieu}
            onValider={(id) => majEtat(choisir(etat, id, catalogue))}
            onContinuer={() => majEtat(fermerScene(etat, catalogue))}
            onAction={actionLieu}
          />
        ) : null}

        {onglet === 'carte' ? (
          <EcranCarte
            carte={vueCarte(etat, catalogue)}
            onVoyager={(id) => {
              majEtat(voyager(nettoyer(etat), id, catalogue));
              setOnglet('scene');
            }}
          />
        ) : null}

        {onglet === 'personnage' ? (
          <EcranPersonnage
            perso={vuePersonnage(etat, catalogue)}
            etiquettes={ETIQUETTES}
            competencesOffertes={competencesDisponibles(etat, catalogue)}
            onDepenserPoint={(stat) => majEtat(depenserPointStat(etat, stat))}
            onApprendre={(id) => majEtat(apprendreCompetence(etat, id, catalogue))}
          />
        ) : null}
      </View>

      <View style={styles.onglets}>
        <Onglet nom="Scène" actif={onglet === 'scene'} onPress={() => setOnglet('scene')} />
        <Onglet nom="Carte" actif={onglet === 'carte'} onPress={() => setOnglet('carte')} />
        <Onglet
          nom="Personnage"
          actif={onglet === 'personnage'}
          pastille={etat.heros.points_stat_disponibles > 0}
          onPress={() => setOnglet('personnage')}
        />
      </View>
      <StatusBar style="light" />
    </Cadre>
  );
}

/** Le message de repos ne survit pas à l'action suivante. */
function nettoyer(etat) {
  if (!etat.systeme.dernier_message) return etat;
  return { ...etat, systeme: { ...etat.systeme, dernier_message: null } };
}

function Cadre({ children }) {
  return <View style={styles.cadre}>{children}</View>;
}

function Onglet({ nom, actif, onPress, pastille }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.onglet, pressed && { opacity: 0.7 }]}>
      <Text style={[styles.ongletTexte, actif && styles.ongletActif]}>{nom}</Text>
      {pastille ? <View style={styles.pastille} /> : null}
      <View style={[styles.ongletTrait, actif && styles.ongletTraitActif]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cadre: { flex: 1, backgroundColor: couleurs.fond, paddingTop: HAUT },
  corps: { flex: 1 },

  menu: { flex: 1, justifyContent: 'center', padding: espaces.xl },
  marque: {
    fontFamily: 'serif',
    fontSize: 34,
    color: couleurs.texte,
    letterSpacing: 1,
    marginBottom: espaces.s,
  },
  menuNote: { marginBottom: espaces.xl },
  menuActions: { marginTop: espaces.l },

  finContenu: { padding: espaces.l, paddingBottom: espaces.xl },
  finTitre: { ...typo.titre, marginTop: espaces.l, marginBottom: espaces.m, color: couleurs.accent },
  finEntree: { marginBottom: espaces.m },

  onglets: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: couleurs.bordure,
    backgroundColor: couleurs.surface,
  },
  onglet: { flex: 1, alignItems: 'center', paddingTop: espaces.m, paddingBottom: espaces.s },
  ongletTexte: { ...typo.sousTitre, color: couleurs.texteFaible },
  ongletActif: { color: couleurs.accent },
  ongletTrait: { height: 2, width: 26, marginTop: 6, backgroundColor: 'transparent' },
  ongletTraitActif: { backgroundColor: couleurs.accent },
  pastille: {
    position: 'absolute',
    top: 8,
    right: 26,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: couleurs.accent,
  },
});
