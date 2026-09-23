import { Component } from 'react';
import { View, Text, Platform, StatusBar as RNStatusBar, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import './content/index.js';
import { T } from './ui/theme.js';
import { FournisseurJeu, useJeu } from './ui/jeu.js';
import { Bandeau } from './ui/components/Bandeau.js';
import { BarreNav } from './ui/components/BarreNav.js';
import { EcranTitre } from './ui/screens/Titre.js';
import { EcranScene } from './ui/screens/Scene.js';
import { EcranCarte } from './ui/screens/Carte.js';
import { EcranPersonnage } from './ui/screens/Personnage.js';
import { EcranInventaire } from './ui/screens/Inventaire.js';
import { EcranCompetences } from './ui/screens/Competences.js';
import { EcranCompagnons } from './ui/screens/Compagnons.js';
import { EcranBilan } from './ui/screens/Bilan.js';

const HAUT = Platform.OS === 'android' ? (RNStatusBar.currentHeight ?? 0) : 44;

function Contenu() {
  const { E, ecran, setEcran } = useJeu();

  if (ecran === 'titre' || !E) {
    return <EcranTitre />;
  }
  if (ecran === 'bilan') {
    return <EcranBilan />;
  }

  const ecrans = {
    scene: EcranScene,
    carte: EcranCarte,
    personnage: EcranPersonnage,
    inventaire: EcranInventaire,
    competences: EcranCompetences,
    compagnons: EcranCompagnons,
  };
  const Ecran = ecrans[ecran] ?? EcranScene;

  return (
    <View style={{ flex: 1, backgroundColor: T.fond }}>
      <Bandeau E={E} onEtats={() => setEcran('personnage')} />
      <View style={{ flex: 1 }}>
        <Ecran />
      </View>
      <BarreNav ecran={ecran} setEcran={setEcran} E={E} />
    </View>
  );
}

class Garde extends Component {
  constructor(p) { super(p); this.state = { erreur: null }; }
  static getDerivedStateFromError(e) { return { erreur: e }; }
  render() {
    if (this.state.erreur) {
      return (
        <View style={{ flex: 1, backgroundColor: T.fond, padding: 24, justifyContent: 'center' }}>
          <Text style={{ color: T.danger, fontSize: 16, marginBottom: 12 }}>Le jeu s’est arrêté.</Text>
          <Text style={{ color: T.texteDoux, fontSize: 12 }}>{String(this.state.erreur?.message ?? this.state.erreur)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: T.fond, paddingTop: HAUT }}>
      <StatusBar style="light" backgroundColor={T.fond2} />
      <Garde>
        <FournisseurJeu>
          <Contenu />
        </FournisseurJeu>
      </Garde>
    </View>
  );
}
