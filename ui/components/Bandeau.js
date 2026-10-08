// Bandeau d'état compact et permanent : jour, segment, météo, santé, fatigue, faim.
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Jauge } from './Base.js';
import { getDb } from '../../engine/db.js';
import { santeMax, tousLesEtats, encombrement, reserveEau } from '../../engine/derive.js';
import { enteteScene } from '../../engine/storylets.js';

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
  const eau = reserveEau(E);
  const aSoif = etats.includes('assoiffe');
  // Une scène qui déclare son en-tête remplace la ligne du monde : pendant
  // une razzia, l'heure et la météo n'ont rien à dire.
  const entete = enteteScene(E);

  return (
    <View style={{ backgroundColor: T.fond2, borderBottomWidth: 1, borderBottomColor: T.bord, paddingHorizontal: ESP.lg, paddingTop: ESP.sm, paddingBottom: ESP.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
        {entete ? (
          <>
            {entete.titre ? (
              <>
                <Text numberOfLines={1} style={[TYPO.minuscule, { color: T.accent, letterSpacing: 0.8, flexShrink: 0 }]}>{entete.titre.toUpperCase()}</Text>
                <Text style={[TYPO.minuscule, { marginHorizontal: 6 }]}>·</Text>
              </>
            ) : null}
            {/* Le libellé prend la place qui reste et cède le premier : le titre
                ne passe jamais sur deux lignes, SURCHARGE reste lisible. */}
            <Text style={[TYPO.minuscule, { flex: 1, flexShrink: 1 }]} numberOfLines={1}>{entete.libelle}</Text>
          </>
        ) : (
          <>
            <Text style={[TYPO.minuscule, { color: T.accent, letterSpacing: 0.8 }]}>
              {'JOUR ' + E.temps.jour}
            </Text>
            <Text style={[TYPO.minuscule, { marginHorizontal: 6 }]}>·</Text>
            <Text style={TYPO.minuscule}>{l.segments?.[E.temps.segment] ?? ''}</Text>
            <Text style={[TYPO.minuscule, { marginHorizontal: 6 }]}>·</Text>
            <Text style={TYPO.minuscule}>{meteo?.nom ?? ''}</Text>
            <View style={{ flex: 1 }} />
            {eau.contenant ? (
              <Text style={[TYPO.minuscule, { color: aSoif ? T.danger : eau.portee === 0 ? T.faim : T.texteDoux }]}>
                {'EAU ' + eau.portee + '/' + eau.capacite}
              </Text>
            ) : null}
          </>
        )}
        {enc.surcharge ? (
          <Text style={[TYPO.minuscule, { color: T.danger, marginLeft: 8 }]}>SURCHARGE</Text>
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
