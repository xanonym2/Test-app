// Barre d'accès permanente. Accessible à tout moment, en un geste,
// sans quitter la scène en cours.
import { View, Text, Pressable } from 'react-native';
import { T, ESP } from '../theme.js';
import { getDb } from '../../engine/db.js';

const ONGLETS = ['scene', 'carte', 'personnage', 'inventaire', 'competences', 'compagnons'];

export function BarreNav({ ecran, setEcran, E }) {
  const l = getDb().libelles.nav ?? {};
  const pastilles = {
    personnage: (E?.heros.points_stat ?? 0) > 0,
    competences: (E?.heros.competence_a_choisir ?? 0) > 0,
  };
  return (
    <View style={{ flexDirection: 'row', backgroundColor: T.fond2, borderTopWidth: 1, borderTopColor: T.bord, paddingBottom: 6, paddingTop: 6 }}>
      {ONGLETS.map((o) => {
        const actif = ecran === o;
        return (
          <Pressable
            key={o}
            onPress={() => setEcran(o)}
            style={({ pressed }) => ({ flex: 1, alignItems: 'center', paddingVertical: 6, opacity: pressed ? 0.6 : 1 })}
          >
            <View style={{ height: 2, width: 18, backgroundColor: actif ? T.accent : 'transparent', marginBottom: 5, borderRadius: 1 }} />
            <View>
              <Text style={{ fontSize: 10.5, letterSpacing: 0.2, color: actif ? T.texte : T.texteFaible, fontWeight: actif ? '600' : '400' }}>
                {l[o] ?? o}
              </Text>
              {pastilles[o] ? (
                <View style={{ position: 'absolute', top: -3, right: -7, width: 6, height: 6, borderRadius: 3, backgroundColor: T.accent }} />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
