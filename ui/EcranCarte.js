import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { couleurs, espaces, typo } from './theme.js';

/** Points d'intérêt découverts seulement. Distances en segments. */
export function EcranCarte({ carte, onVoyager }) {
  return (
    <ScrollView style={styles.plein} contentContainerStyle={styles.contenu}>
      <Text style={styles.titre}>{carte.zone}</Text>
      <Text style={[typo.recitSysteme, { marginBottom: espaces.l }]}>
        Ce que tu connais de cette marche. Le reste est encore blanc.
      </Text>

      {carte.points.map((point) => (
        <Point key={point.id} point={point} onVoyager={onVoyager} />
      ))}
    </ScrollView>
  );
}

function Point({ point, onVoyager }) {
  const activable = point.accessible && !point.ici;
  return (
    <Pressable
      onPress={activable ? () => onVoyager(point.id) : undefined}
      style={({ pressed }) => [
        styles.point,
        point.ici && styles.pointIci,
        !activable && !point.ici && styles.pointLoin,
        pressed && activable && styles.pointPresse,
      ]}
    >
      <View style={styles.rangee}>
        <Text style={[styles.nom, point.ici && { color: couleurs.accent }]}>{point.nom}</Text>
        <Text style={styles.distance}>
          {point.ici
            ? 'tu es ici'
            : point.bloque
            ? `inaccessible · ${point.bloque} j`
            : point.segments != null
            ? `${point.segments} segment${point.segments > 1 ? 's' : ''}`
            : 'plus loin'}
        </Text>
      </View>
      <Text style={styles.note}>{point.note}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  plein: { flex: 1, backgroundColor: couleurs.fond },
  contenu: { padding: espaces.l, paddingBottom: espaces.xl },
  titre: { ...typo.titre, marginBottom: espaces.s },
  point: {
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 4,
    padding: espaces.m,
    marginBottom: espaces.s,
  },
  pointIci: { borderColor: couleurs.accent, backgroundColor: couleurs.surfaceChoisie },
  pointLoin: { opacity: 0.45 },
  pointPresse: { backgroundColor: couleurs.surfaceHaute },
  rangee: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  nom: { fontSize: 16, color: couleurs.texte, flexShrink: 1 },
  distance: { ...typo.cout, marginLeft: espaces.s },
  note: { ...typo.recitSysteme, marginTop: 4 },
});
