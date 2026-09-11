import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from './theme';
import { POINTS, ZONES } from '../content/zones';

export default function CarteScreen({ etat, onVoyager }) {
  const zone = ZONES[0];
  const position = etat.geo.position;

  return (
    <ScrollView style={s.ecran} contentContainerStyle={s.contenu}>
      <Text style={s.zone}>{zone.nom}</Text>
      <Text style={[T.minuscule, { marginBottom: ESP.m }]}>
        Points d’intérêt découverts uniquement. Les distances sont en moments de
        la journée.
      </Text>

      {zone.points.map((point) => {
        const decouvert = etat.geo.points_decouverts[point.id];
        const ici = point.id === position;
        const bloque = etat.geo.lieux_bloques[point.id];
        const visites = etat.geo.points_visites[point.id] ?? 0;

        if (!decouvert) {
          return (
            <View key={point.id} style={[s.carte, s.inconnu]}>
              <Text style={[T.petit, { color: C.texteTresFaible }]}>— non découvert —</Text>
            </View>
          );
        }

        return (
          <Pressable
            key={point.id}
            disabled={ici || Boolean(bloque)}
            onPress={() => onVoyager(point.id, point.cout_segments)}
            style={[s.carte, ici && s.carteIci, bloque && s.carteBloquee]}
          >
            <View style={s.ligne}>
              <Text style={s.nom}>{point.nom}</Text>
              {ici ? (
                <Text style={s.tag}>vous êtes ici</Text>
              ) : bloque ? (
                <Text style={[s.tag, { color: C.alerte }]}>inaccessible</Text>
              ) : (
                <Text style={T.minuscule}>
                  {point.cout_segments} moment{point.cout_segments > 1 ? 's' : ''}
                </Text>
              )}
            </View>
            <Text style={[T.petit, { marginTop: 3 }]}>{point.resume}</Text>
            {visites > 0 && !ici && (
              <Text style={[T.minuscule, { marginTop: 4 }]}>
                déjà passé {visites} fois
              </Text>
            )}
          </Pressable>
        );
      })}
      <View style={{ height: ESP.xl }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  contenu: { padding: ESP.m },
  zone: { ...T.titre, fontSize: 18, marginBottom: 2 },
  carte: {
    backgroundColor: C.fondCarte,
    borderWidth: 1,
    borderColor: C.bordure,
    borderRadius: 3,
    padding: ESP.m,
    marginBottom: ESP.s,
  },
  carteIci: { borderColor: C.accent },
  carteBloquee: { opacity: 0.45 },
  inconnu: { alignItems: 'center', paddingVertical: ESP.m, borderStyle: 'dashed' },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  nom: { ...T.corps, fontSize: 16, color: C.texteFort, fontWeight: '600' },
  tag: { ...T.minuscule, color: C.accent },
});
