import { StyleSheet, Text, View } from 'react-native';
import { couleurs, espaces, typo } from './theme.js';
import { Jauge } from './composants.js';

/** Bandeau d'état permanent et compact : jour, segment, santé, fatigue, faim. */
export function Bandeau({ vue, etiquettesEtats }) {
  const teinteSante =
    vue.sante / vue.santeMax < 0.3 ? couleurs.sang : vue.sante / vue.santeMax < 0.6 ? couleurs.ocre : couleurs.vert;

  return (
    <View style={styles.bandeau}>
      <View style={styles.rangee}>
        <Text style={styles.temps}>
          J{vue.jour} · {vue.nomSegment}
        </Text>
        <Text style={styles.lieu} numberOfLines={1}>
          {vue.lieu}
        </Text>
      </View>

      <View style={styles.rangee}>
        <Mesure nom="Santé" valeur={`${vue.sante}/${vue.santeMax}`} part={vue.sante} max={vue.santeMax} teinte={teinteSante} />
        <Mesure nom="Fatigue" valeur={vue.fatigue} part={vue.fatigue} max={100} teinte={vue.fatigue >= 80 ? couleurs.sang : couleurs.texteFaible} />
        <Mesure nom="Faim" valeur={vue.faim} part={vue.faim} max={100} teinte={vue.faim >= 80 ? couleurs.sang : couleurs.texteFaible} />
      </View>

      {vue.etats.length ? (
        <View style={styles.etats}>
          {vue.etats.map((e) => (
            <Text key={e} style={styles.etat}>
              {etiquettesEtats[e] ?? e}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function Mesure({ nom, valeur, part, max, teinte }) {
  return (
    <View style={styles.mesure}>
      <Text style={styles.mesureNom}>{nom}</Text>
      <Text style={[styles.mesureValeur, { color: teinte }]}>{valeur}</Text>
      <Jauge valeur={part} max={max} teinte={teinte} largeur={54} />
    </View>
  );
}

const styles = StyleSheet.create({
  bandeau: {
    backgroundColor: couleurs.surface,
    borderBottomWidth: 1,
    borderBottomColor: couleurs.bordure,
    paddingHorizontal: espaces.m,
    paddingTop: espaces.s,
    paddingBottom: espaces.s,
  },
  rangee: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  temps: { ...typo.sousTitre, color: couleurs.accent },
  lieu: { ...typo.sousTitre, flexShrink: 1, textAlign: 'right', marginLeft: espaces.s },
  mesure: { marginTop: espaces.s, minWidth: 68 },
  mesureNom: { fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase', color: couleurs.texteFaible },
  mesureValeur: { fontSize: 14, marginBottom: 3, fontVariant: ['tabular-nums'] },
  etats: { flexDirection: 'row', flexWrap: 'wrap', marginTop: espaces.s },
  etat: {
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: couleurs.sang,
    borderWidth: 1,
    borderColor: couleurs.sang,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
  },
});
