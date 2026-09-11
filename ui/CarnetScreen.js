import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from './theme';
import { CARNET, RUBRIQUES } from '../content/carnet';
import { nomSegment } from '../engine/temps';

// Le carnet consigne, il n'interprète jamais.
export default function CarnetScreen({ etat }) {
  const debloquees = Object.keys(etat.recit.carnet);

  return (
    <ScrollView style={s.ecran} contentContainerStyle={s.contenu}>
      {debloquees.length === 0 && (
        <View style={s.carte}>
          <Text style={T.petit}>
            Rien d’écrit pour l’instant. Ce carnet ne se remplit qu’avec ce que vous
            voyez ou entendez vous-même.
          </Text>
        </View>
      )}

      {RUBRIQUES.map((rubrique) => {
        const entrees = debloquees
          .filter((id) => CARNET[id]?.rubrique === rubrique.id)
          .map((id) => ({ id, ...CARNET[id], meta: etat.recit.carnet[id] }));
        if (entrees.length === 0) return null;

        return (
          <View key={rubrique.id}>
            <Text style={s.section}>{rubrique.nom}</Text>
            {entrees.map((e) => (
              <View key={e.id} style={s.carte}>
                <View style={s.ligne}>
                  <Text style={s.titre}>{e.titre}</Text>
                  <Text style={T.minuscule}>
                    j{e.meta?.jour ?? 1} · {nomSegment(e.meta?.segment ?? 1).toLowerCase()}
                  </Text>
                </View>
                <Text style={s.note}>{e.texte}</Text>
              </View>
            ))}
          </View>
        );
      })}
      <View style={{ height: ESP.xl }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  contenu: { padding: ESP.m },
  section: { ...T.soustitre, marginTop: ESP.m, marginBottom: ESP.s, color: C.accentSourd },
  carte: {
    backgroundColor: C.fondCarte,
    borderWidth: 1,
    borderColor: C.bordure,
    borderLeftWidth: 2,
    borderLeftColor: C.accentSourd,
    borderRadius: 3,
    padding: ESP.m,
    marginBottom: ESP.s,
  },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  titre: { ...T.corps, color: C.texteFort, fontWeight: '600' },
  note: { ...T.corps, marginTop: 5, fontStyle: 'italic', color: C.texte },
});
