// Bandeau d'état compact et permanent : jour, segment, météo, santé, fatigue, faim.
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Jauge } from './Base.js';
import { getDb } from '../../engine/db.js';
import { santeMax, tousLesEtats, encombrement } from '../../engine/derive.js';

function Mini({ nom, valeur, max, couleur, inverse }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
        <Text style={TYPO.minuscule}>{nom}</Text>
        <Text style={[TYPO.minuscule, { color: T.texteDoux }]}>{valeur}</Text>
      </View>
      <Jauge valeur={valeur} max={max} couleur={couleur} inverse={inverse} hauteur={4} />
    </View>
  );
}

export function Bandeau({ E, onEtats }) {
  const db = getDb();
  const l = db.libelles;
  const max = santeMax(E.heros.stats);
  const etats = tousLesEtats(E.heros);
  const enc = encombrement(E);
  const meteo = db.meteo.table.find((m) => m.id === E.temps.meteo);

  return (
    <View style={{ backgroundColor: T.fond2, borderBottomWidth: 1, borderBottomColor: T.bord, paddingHorizontal: ESP.lg, paddingTop: ESP.sm, paddingBottom: ESP.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
        <Text style={[TYPO.minuscule, { color: T.accent, letterSpacing: 0.8 }]}>
          {'JOUR ' + E.temps.jour}
        </Text>
        <Text style={[TYPO.minuscule, { marginHorizontal: 6 }]}>·</Text>
        <Text style={TYPO.minuscule}>{l.segments?.[E.temps.segment] ?? ''}</Text>
        <Text style={[TYPO.minuscule, { marginHorizontal: 6 }]}>·</Text>
        <Text style={TYPO.minuscule}>{meteo?.nom ?? ''}</Text>
        <View style={{ flex: 1 }} />
        {enc.surcharge ? (
          <Text style={[TYPO.minuscule, { color: T.danger }]}>SURCHARGE</Text>
        ) : null}
      </View>

      <View style={{ flexDirection: 'row', gap: ESP.md }}>
        <Mini nom={'SANTÉ'} valeur={E.heros.sante} max={max} couleur={T.sante} />
        <Mini nom={'FATIGUE'} valeur={E.heros.fatigue} max={100} couleur={T.fatigue} />
        <Mini nom={'FAIM'} valeur={E.heros.faim} max={100} couleur={T.faim} />
      </View>

      {etats.length ? (
        <Pressable onPress={onEtats} style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 7, gap: 6 }}>
          {etats.map((e) => (
            <Text key={e} style={[TYPO.minuscule, { color: T.danger, borderWidth: 1, borderColor: T.danger, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1 }]}>
              {(l.etats?.[e]?.nom ?? e).toUpperCase()}
            </Text>
          ))}
        </Pressable>
      ) : null}
    </View>
  );
}
