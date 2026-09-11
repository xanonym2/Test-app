import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from './theme';
import { PNJ } from '../content/pnj';
import { defObjet } from '../engine/derive';

function niveauConfiance(valeur) {
  if (valeur >= 6) return 'Il vous suivrait sans poser de question.';
  if (valeur >= 3) return 'Il vous écoute et il vous corrige quand vous avez tort.';
  if (valeur >= 1) return 'Il vous accorde le bénéfice du doute.';
  if (valeur <= -2) return 'Il se souvient de quelque chose et il ne le dit pas.';
  return 'Il vous connaît de vue, et c’est tout.';
}

const STATUTS = {
  vivant_allie: 'Avec vous',
  vivant_hostile: 'Hostile',
  mort: 'Mort',
  non_rencontre: 'Jamais rencontré',
};

export default function CompagnonsScreen({ etat }) {
  const connus = Object.entries(PNJ).filter(
    ([id]) => (etat.social.pnj_statut[id] ?? 'non_rencontre') !== 'non_rencontre'
  );
  const compagnons = connus.filter(
    ([id, fiche]) => fiche.compagnon && etat.recit.flags[`${id}_compagnon`]
  );
  const autres = connus.filter(([id]) => !compagnons.some(([cid]) => cid === id));

  return (
    <ScrollView style={s.ecran} contentContainerStyle={s.contenu}>
      <Text style={s.section}>Ceux qui marchent avec vous</Text>
      {compagnons.length === 0 ? (
        <View style={s.carte}>
          <Text style={T.petit}>
            Personne. Vous allez seul, ce qui est plus rapide et plus court.
          </Text>
        </View>
      ) : (
        compagnons.map(([id, fiche]) => {
          const confiance = etat.social.confiance[id] ?? 0;
          return (
            <View key={id} style={s.carte}>
              <View style={s.ligne}>
                <Text style={s.nom}>{fiche.nom}</Text>
                <Text style={T.minuscule}>{fiche.age} ans</Text>
              </View>
              <Text style={[T.petit, { marginTop: 2 }]}>{fiche.role}</Text>

              {fiche.stats && (
                <View style={s.stats}>
                  {Object.entries(fiche.stats).map(([cle, val]) => (
                    <View key={cle} style={s.stat}>
                      <Text style={T.minuscule}>{cle.replace('_', '-')}</Text>
                      <Text style={s.statVal}>{val}</Text>
                    </View>
                  ))}
                </View>
              )}

              {fiche.sante != null && (
                <View style={{ marginTop: ESP.s }}>
                  <View style={s.ligne}>
                    <Text style={T.minuscule}>Santé</Text>
                    <Text style={T.minuscule}>
                      {fiche.sante} / {fiche.sante_max}
                    </Text>
                  </View>
                  <View style={s.barre}>
                    <View
                      style={[
                        s.barreRemplie,
                        { width: `${(fiche.sante / fiche.sante_max) * 100}%` },
                      ]}
                    />
                  </View>
                </View>
              )}

              <Text style={s.champ}>En combat</Text>
              <Text style={T.petit}>{fiche.combat}</Text>

              <Text style={s.champ}>Hors combat</Text>
              <Text style={T.petit}>{fiche.hors_combat}</Text>

              {fiche.competences?.length > 0 && (
                <>
                  <Text style={s.champ}>Savoir-faire</Text>
                  {fiche.competences.map((c) => (
                    <Text key={c} style={T.petit}>
                      · {c}
                    </Text>
                  ))}
                </>
              )}

              {fiche.equipement?.length > 0 && (
                <>
                  <Text style={s.champ}>Ce qu’il porte</Text>
                  {fiche.equipement.map((e) => (
                    <Text key={e} style={T.petit}>
                      · {e}
                    </Text>
                  ))}
                </>
              )}

              <Text style={s.champ}>Confiance</Text>
              <Text style={T.petit}>{niveauConfiance(confiance)}</Text>
            </View>
          );
        })
      )}

      <Text style={s.section}>Rencontrés</Text>
      {autres.length === 0 ? (
        <View style={s.carte}>
          <Text style={T.petit}>Personne encore.</Text>
        </View>
      ) : (
        autres.map(([id, fiche]) => (
          <View key={id} style={s.carte}>
            <View style={s.ligne}>
              <Text style={s.nom}>{fiche.nom}</Text>
              <Text style={T.minuscule}>
                {STATUTS[etat.social.pnj_statut[id]] ?? '—'}
              </Text>
            </View>
            <Text style={[T.petit, { marginTop: 2 }]}>{fiche.role}</Text>
            <Text style={[T.petit, { marginTop: 6 }]}>
              {niveauConfiance(etat.social.confiance[id] ?? 0)}
            </Text>
          </View>
        ))
      )}
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
    borderRadius: 3,
    padding: ESP.m,
    marginBottom: ESP.s,
  },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  nom: { ...T.corps, fontSize: 16, color: C.texteFort, fontWeight: '600' },
  stats: { flexDirection: 'row', gap: ESP.m, marginTop: ESP.s },
  stat: { alignItems: 'center' },
  statVal: { ...T.corps, color: C.accent },
  barre: { height: 3, backgroundColor: C.bordure, borderRadius: 2, marginTop: 4 },
  barreRemplie: { height: 3, backgroundColor: C.sante, borderRadius: 2 },
  champ: { ...T.minuscule, marginTop: ESP.s, marginBottom: 2, color: C.accentSourd },
});
