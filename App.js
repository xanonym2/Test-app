import { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { etatInitial } from './engine/state';
import {
  choisirOption,
  resteAFaire,
  entrerStorylet,
  enregistrerZones,
  reprendreLieu,
  voyager,
} from './engine/moteur';
import { ecrire, effacer, lire } from './engine/sauvegarde';
import { DEPART } from './content/storylets';
import { ZONES, nomLieu } from './content/zones';
import { defObjet, ligneObjet } from './engine/derive';
import { appliquerEffets } from './engine/effets';

import OuvertureScreen from './ui/OuvertureScreen';
import SceneScreen from './ui/SceneScreen';
import CarteScreen from './ui/CarteScreen';
import PersonnageScreen from './ui/PersonnageScreen';
import InventaireScreen from './ui/InventaireScreen';
import CompagnonsScreen from './ui/CompagnonsScreen';
import CarnetScreen from './ui/CarnetScreen';
import { C, ESP, T } from './ui/theme';

enregistrerZones(ZONES);

const ONGLETS = [
  { cle: 'scene', nom: 'Scène' },
  { cle: 'carte', nom: 'Carte' },
  { cle: 'perso', nom: 'Perso' },
  { cle: 'sac', nom: 'Sac' },
  { cle: 'allies', nom: 'Alliés' },
  { cle: 'carnet', nom: 'Carnet' },
];

export default function App() {
  const [etat, setEtat] = useState(null);
  const [sauvegarde, setSauvegarde] = useState(undefined); // undefined = pas encore lu
  const [onglet, setOnglet] = useState('scene');

  useEffect(() => {
    lire().then((s) => setSauvegarde(s));
  }, []);

  // Sauvegarde automatique à chaque décision validée.
  const majEtat = useCallback((suivant) => {
    setEtat(suivant);
    ecrire(suivant);
  }, []);

  if (sauvegarde === undefined) {
    return <View style={s.chargement} />;
  }

  if (!etat) {
    return (
      <SafeAreaView style={s.racine}>
        <StatusBar barStyle="light-content" backgroundColor={C.fond} />
        <OuvertureScreen
          sauvegardeExistante={Boolean(sauvegarde)}
          onReprendre={() => {
            setEtat(sauvegarde);
            setOnglet(sauvegarde?.scene ? 'scene' : 'carte');
          }}
          onCommencer={async () => {
            await effacer();
            const depart = entrerStorylet(etatInitial(), DEPART);
            majEtat(depart);
            setOnglet('scene');
          }}
        />
      </SafeAreaView>
    );
  }

  const mort = etat.recit.flags.mort;
  const fin = etat.recit.flags.fin_mvp;

  const rendu = () => {
    if (mort || fin) return <Epilogue etat={etat} fin={fin} onRecommencer={recommencer} />;
    switch (onglet) {
      case 'scene':
        return etat.scene ? (
          <SceneScreen
            etat={etat}
            onChoisir={(id) => {
              const suivant = choisirOption(etat, id);
              majEtat(suivant);
              if (!suivant.scene && !suivant.recit.flags.mort && !suivant.recit.flags.fin_mvp) {
                setOnglet('carte');
              }
            }}
          />
        ) : (
          <EntreDeuxScenes
            etat={etat}
            onReprendre={reprendre}
            onCamper={camper}
            onCarte={() => setOnglet('carte')}
          />
        );
      case 'carte':
        return (
          <CarteScreen
            etat={etat}
            onVoyager={(cible, cout) => {
              majEtat(voyager(etat, cible, cout));
              setOnglet('scene');
            }}
          />
        );
      case 'perso':
        return <PersonnageScreen etat={etat} onAttribuer={attribuer} />;
      case 'sac':
        return (
          <InventaireScreen
            etat={etat}
            onEquiper={equiper}
            onJeter={jeter}
            onReparer={reparer}
            onConsommer={consommer}
          />
        );
      case 'allies':
        return <CompagnonsScreen etat={etat} />;
      case 'carnet':
        return <CarnetScreen etat={etat} />;
      default:
        return null;
    }
  };

  function reprendre() {
    const suivant = reprendreLieu(etat);
    majEtat(suivant);
    setOnglet('scene');
  }

  function camper() {
    majEtat(entrerStorylet(etat, 'VDG-102'));
    setOnglet('scene');
  }

  // Manger et se soigner ne demandent pas de scène : ça se fait en marchant.
  function consommer(id) {
    const def = defObjet(id);
    const suivant = JSON.parse(JSON.stringify(etat));
    appliquerEffets(suivant, [
      { retire_objet: id, quantite: 1 },
      ...(def.faim ? [{ faim: def.faim }] : []),
      ...(def.soin ? [{ sante_heros: def.soin }, { etat: 'blesse_leger', valeur: false }] : []),
      { fatigue: def.soin ? 0 : -2 },
    ]);
    majEtat(suivant);
  }

  function recommencer() {
    effacer().then(() => {
      setSauvegarde(null);
      setEtat(null);
    });
  }

  function attribuer(cle) {
    if (etat.heros.points_stat_disponibles <= 0) return;
    const suivant = JSON.parse(JSON.stringify(etat));
    suivant.heros.stats[cle] += 1;
    suivant.heros.points_stat_disponibles -= 1;
    majEtat(suivant);
  }

  function equiper(id) {
    const suivant = JSON.parse(JSON.stringify(etat));
    const def = defObjet(id);
    if (def.categorie === 'arme') suivant.inventaire.equipe.arme = id;
    if (def.categorie === 'protection') suivant.inventaire.equipe.protection = id;
    majEtat(suivant);
  }

  function jeter(id) {
    const suivant = JSON.parse(JSON.stringify(etat));
    const index = suivant.inventaire.objets.findIndex((l) => l.id === id);
    if (index >= 0) {
      const ligne = suivant.inventaire.objets[index];
      ligne.quantite -= 1;
      if (ligne.quantite <= 0) suivant.inventaire.objets.splice(index, 1);
      if (suivant.inventaire.equipe.arme === id) suivant.inventaire.equipe.arme = null;
      if (suivant.inventaire.equipe.protection === id) suivant.inventaire.equipe.protection = null;
    }
    majEtat(suivant);
  }

  // Réparer coûte une matière : du cuir pour ce qui se coud, la pierre pour
  // ce qui se tranche. Sans matière, rien ne se répare.
  function reparer(id) {
    const def = defObjet(id);
    const suivant = JSON.parse(JSON.stringify(etat));
    const cuir = ligneObjet(suivant, 'cuir_brut');
    const pierre = ligneObjet(suivant, 'pierre_aiguiser');
    const cible = ligneObjet(suivant, id);
    if (!cible) return;

    const trancheArme = def.categorie === 'arme' && def.famille !== 'arc';
    if (trancheArme && pierre) {
      cible.usure = Math.min(100, cible.usure + 20);
      pierre.usure = Math.max(0, pierre.usure - 10);
    } else if (cuir) {
      cible.usure = Math.min(100, cible.usure + 22);
      cuir.quantite -= 1;
      if (cuir.quantite <= 0) {
        suivant.inventaire.objets.splice(
          suivant.inventaire.objets.findIndex((l) => l.id === 'cuir_brut'),
          1
        );
      }
    } else {
      return;
    }
    majEtat(suivant);
  }

  return (
    <SafeAreaView style={s.racine}>
      <StatusBar barStyle="light-content" backgroundColor={C.fondEleve} />
      <View style={s.corps}>{rendu()}</View>
      {!mort && !fin && (
        <View style={s.onglets}>
          {ONGLETS.map((o) => (
            <Pressable
              key={o.cle}
              style={[s.onglet, onglet === o.cle && s.ongletActif]}
              onPress={() => setOnglet(o.cle)}
            >
              <Text style={[s.ongletTexte, onglet === o.cle && s.ongletTexteActif]}>{o.nom}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

function EntreDeuxScenes({ etat, onReprendre, onCamper, onCarte }) {
  const encore = resteAFaire(etat, etat.geo.position);
  const nuit = etat.temps.segment >= 5;
  return (
    <ScrollView contentContainerStyle={s.entreDeux}>
      <Text style={T.soustitre}>Vous êtes</Text>
      <Text style={s.lieu}>{nomLieu(etat.geo.position)}</Text>
      <View style={s.filet} />
      <Text style={[T.petit, { textAlign: 'center' }]}>
        {encore
          ? 'Il reste quelque chose à faire ici.'
          : 'Il n’y a plus rien à faire ici pour le moment.'}
      </Text>
      <View style={{ height: ESP.l }} />
      {encore && (
        <Pressable style={s.bouton} onPress={onReprendre}>
          <Text style={s.boutonTexte}>Rester encore</Text>
        </Pressable>
      )}
      {nuit && (
        <Pressable style={[s.bouton, s.boutonSecondaire]} onPress={onCamper}>
          <Text style={[s.boutonTexte, s.boutonTexteSecondaire]}>Camper pour la nuit</Text>
        </Pressable>
      )}
      <Pressable style={[s.bouton, s.boutonSecondaire]} onPress={onCarte}>
        <Text style={[s.boutonTexte, s.boutonTexteSecondaire]}>Ouvrir la carte</Text>
      </Pressable>
    </ScrollView>
  );
}

function Epilogue({ etat, fin, onRecommencer }) {
  return (
    <ScrollView contentContainerStyle={s.entreDeux}>
      <Text style={s.lieu}>{fin ? 'Fin du MVP' : 'Vous n’êtes pas allé plus loin'}</Text>
      <View style={s.filet} />
      <Text style={[T.petit, { textAlign: 'center' }]}>
        Jour {etat.temps.jour} · niveau {etat.heros.niveau} · {etat.heros.xp} points
        d’expérience · {Object.keys(etat.recit.carnet).length} entrées au carnet
      </Text>
      <View style={{ height: ESP.l }} />
      <Pressable style={s.bouton} onPress={onRecommencer}>
        <Text style={s.boutonTexte}>Recommencer</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  racine: { flex: 1, backgroundColor: C.fond },
  chargement: { flex: 1, backgroundColor: C.fond },
  corps: { flex: 1 },
  onglets: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: C.bordure,
    backgroundColor: C.fondEleve,
  },
  onglet: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  ongletActif: { borderTopWidth: 2, borderTopColor: C.accent, marginTop: -1 },
  ongletTexte: { ...T.minuscule, color: C.texteTresFaible },
  ongletTexteActif: { color: C.accent },

  entreDeux: { padding: ESP.l, paddingTop: ESP.xl * 2, alignItems: 'center' },
  lieu: { ...T.titre, fontSize: 24, textAlign: 'center', marginTop: ESP.s },
  filet: { height: 1, backgroundColor: C.bordure, alignSelf: 'stretch', marginVertical: ESP.l },
  bouton: {
    alignSelf: 'stretch',
    backgroundColor: C.accent,
    borderRadius: 3,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: ESP.s,
  },
  boutonSecondaire: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: C.bordureVive,
  },
  boutonTexte: {
    color: '#17150f',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  boutonTexteSecondaire: { color: C.texteFaible },
});
