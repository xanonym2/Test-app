import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OUVERTURE } from '../content/monde';
import { C, ESP, T } from './theme';

export default function OuvertureScreen({ onCommencer, onReprendre, sauvegardeExistante }) {
  return (
    <View style={s.ecran}>
      <ScrollView contentContainerStyle={s.contenu} showsVerticalScrollIndicator={false}>
        <Text style={s.titre}>{OUVERTURE.titre}</Text>
        <Text style={s.soustitre}>{OUVERTURE.sous_titre}</Text>
        <View style={s.filet} />

        {OUVERTURE.sections.map((section) => (
          <View key={section.titre} style={s.section}>
            <Text style={s.sectionTitre}>{section.titre}</Text>
            {section.paragraphes.map((para, i) => (
              <Text key={i} style={[T.recit, s.para]}>
                {para}
              </Text>
            ))}
          </View>
        ))}

        <View style={s.filet} />
        <Text style={s.pied}>{OUVERTURE.pied}</Text>

        <View style={s.actions}>
          {sauvegardeExistante && (
            <Pressable style={s.bouton} onPress={onReprendre}>
              <Text style={s.boutonTexte}>Reprendre</Text>
            </Pressable>
          )}
          <Pressable
            style={[s.bouton, sauvegardeExistante && s.boutonSecondaire]}
            onPress={onCommencer}
          >
            <Text style={[s.boutonTexte, sauvegardeExistante && s.boutonTexteSecondaire]}>
              {sauvegardeExistante ? 'Nouvelle partie' : 'Commencer'}
            </Text>
          </Pressable>
        </View>
        <View style={{ height: ESP.xl }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  contenu: { padding: ESP.l, paddingTop: ESP.xl + 20 },
  titre: { ...T.titre, fontSize: 30, textAlign: 'center', letterSpacing: 2 },
  soustitre: { ...T.minuscule, textAlign: 'center', marginTop: 6, letterSpacing: 2 },
  filet: {
    height: 1,
    backgroundColor: C.bordure,
    marginVertical: ESP.l,
    marginHorizontal: ESP.xl,
  },
  section: { marginBottom: ESP.l },
  sectionTitre: { ...T.soustitre, marginBottom: ESP.s, color: C.accentSourd },
  para: { marginBottom: ESP.m },
  pied: { ...T.corps, textAlign: 'center', color: C.texteFaible, fontStyle: 'italic' },
  actions: { marginTop: ESP.xl, gap: ESP.s },
  bouton: {
    backgroundColor: C.accent,
    borderRadius: 3,
    paddingVertical: 15,
    alignItems: 'center',
  },
  boutonSecondaire: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: C.bordureVive,
  },
  boutonTexte: {
    color: '#17150f',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  boutonTexteSecondaire: { color: C.texteFaible, fontWeight: '600' },
});
