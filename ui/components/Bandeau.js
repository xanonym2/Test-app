import { StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from '../theme';
import { nomMeteo, nomSegment } from '../../engine/temps';
import { etatsActifs, santeMax } from '../../engine/derive';

// Bandeau d'état permanent et compact. Jauges sans chiffre : l'état se lit,
// il ne se calcule pas.
function Jauge({ valeur, max, couleur, inverse }) {
  const ratio = Math.max(0, Math.min(1, valeur / max));
  const rempli = inverse ? ratio : ratio;
  return (
    <View style={s.jauge}>
      <View style={[s.jaugeRemplie, { width: `${rempli * 100}%`, backgroundColor: couleur }]} />
    </View>
  );
}

const LIBELLE_ETAT = {
  blesse_leger: 'blessé',
  blesse_jambe: 'jambe',
  epuise: 'épuisé',
  affame: 'affamé',
};

export default function Bandeau({ etat }) {
  const etats = etatsActifs(etat);
  return (
    <View style={s.bandeau}>
      <View style={s.ligne}>
        <Text style={s.temps}>
          Jour {etat.temps.jour} · {nomSegment(etat.temps.segment)} · {nomMeteo(etat.temps.meteo)}
        </Text>
        {etats.length > 0 && (
          <Text style={s.etats}>{etats.map((e) => LIBELLE_ETAT[e] || e).join(' · ')}</Text>
        )}
      </View>
      <View style={s.jauges}>
        <View style={s.bloc}>
          <Text style={s.label}>Santé</Text>
          <Jauge valeur={etat.heros.sante} max={santeMax(etat)} couleur={C.sante} />
        </View>
        <View style={s.bloc}>
          <Text style={s.label}>Fatigue</Text>
          <Jauge valeur={etat.heros.fatigue} max={100} couleur={C.fatigue} />
        </View>
        <View style={s.bloc}>
          <Text style={s.label}>Faim</Text>
          <Jauge valeur={etat.heros.faim} max={100} couleur={C.faim} />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bandeau: {
    paddingHorizontal: ESP.m,
    paddingTop: ESP.s,
    paddingBottom: ESP.s,
    backgroundColor: C.fondEleve,
    borderBottomWidth: 1,
    borderBottomColor: C.bordure,
  },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  temps: { ...T.minuscule, color: C.texteFaible },
  etats: { ...T.minuscule, color: C.alerte },
  jauges: { flexDirection: 'row', gap: ESP.m, marginTop: 6 },
  bloc: { flex: 1 },
  label: { ...T.minuscule, marginBottom: 3 },
  jauge: {
    height: 3,
    backgroundColor: C.bordure,
    borderRadius: 2,
    overflow: 'hidden',
  },
  jaugeRemplie: { height: 3, borderRadius: 2 },
});
