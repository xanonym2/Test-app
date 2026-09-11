import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Bandeau from './components/Bandeau';
import { C, ESP, T } from './theme';
import { optionsVisibles } from '../engine/moteur';
import { defObjet } from '../engine/derive';

// Le libellé ne dit jamais ce qu'on va obtenir, mais le coût concret reste
// affiché : le joueur sait toujours ce qu'il dépense.
function coutLisible(cout) {
  const morceaux = [];
  if (cout.segments) morceaux.push(cout.segments === 1 ? 'un moment' : `${cout.segments} moments`);
  if (cout.objet) {
    const n = cout.quantite ?? 1;
    const nom = defObjet(cout.objet).nom;
    morceaux.push(n > 1 ? `${n} ${nom}s` : `1 ${nom}`);
  }
  if (cout.fatigue >= 10) morceaux.push('gros effort');
  else if (cout.fatigue > 5) morceaux.push('effort');
  if (cout.fatigue < 0) morceaux.push('du repos');
  return morceaux.join(' · ');
}

export default function SceneScreen({ etat, onChoisir }) {
  const [selection, setSelection] = useState(null);
  const scroll = useRef(null);
  const options = optionsVisibles(etat);
  const journal = etat.systeme.journal || [];

  useEffect(() => {
    setSelection(null);
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [journal.length, etat.scene?.storylet_id]);

  const choisie = options.find((o) => o.id === selection) || null;

  return (
    <View style={s.ecran}>
      <Bandeau etat={etat} />

      <ScrollView
        ref={scroll}
        style={s.recit}
        contentContainerStyle={s.recitContenu}
        showsVerticalScrollIndicator={false}
      >
        {journal.map((entree, i) => {
          if (entree.type === 'choix') {
            return (
              <View key={i} style={s.choixFait}>
                <Text style={s.choixTexte}>{entree.texte}</Text>
              </View>
            );
          }
          if (!entree.texte) return null;
          return (
            <Text key={i} style={[T.recit, s.paragraphe, entree.type === 'issue' && s.issue]}>
              {entree.texte}
            </Text>
          );
        })}
        <View style={{ height: ESP.l }} />
      </ScrollView>

      <View style={s.options}>
        {options.map((o) => {
          const active = o.id === selection;
          const cout = coutLisible(o.cout);
          return (
            <Pressable
              key={o.id}
              onPress={() => setSelection(active ? null : o.id)}
              style={[s.option, active && s.optionActive, o.sortie && s.optionSortie]}
            >
              <Text style={[T.option, active && s.optionTexteActif]}>{o.libelle}</Text>
              {cout ? <Text style={s.cout}>{cout}</Text> : null}
            </Pressable>
          );
        })}

        {choisie ? (
          <Pressable style={s.valider} onPress={() => onChoisir(choisie.id)}>
            <Text style={s.validerTexte}>Valider</Text>
          </Pressable>
        ) : (
          <View style={s.indication}>
            <Text style={T.minuscule}>
              Touchez une option pour la choisir. Rien n’est validé avant le bouton.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  recit: { flex: 1 },
  recitContenu: { padding: ESP.m, paddingBottom: 0 },
  paragraphe: { marginBottom: ESP.m },
  issue: { color: C.texteFort },
  choixFait: {
    borderLeftWidth: 2,
    borderLeftColor: C.accentSourd,
    paddingLeft: ESP.s,
    marginBottom: ESP.m,
  },
  choixTexte: { ...T.petit, fontStyle: 'italic', color: C.texteFaible },

  options: {
    borderTopWidth: 1,
    borderTopColor: C.bordure,
    backgroundColor: C.fondEleve,
    padding: ESP.s,
    gap: 6,
  },
  option: {
    borderWidth: 1,
    borderColor: C.bordure,
    borderRadius: 3,
    paddingVertical: 11,
    paddingHorizontal: ESP.m,
    backgroundColor: C.fondCarte,
  },
  optionActive: { borderColor: C.accent, backgroundColor: '#2a251a' },
  optionSortie: { borderStyle: 'dashed' },
  optionTexteActif: { color: C.texteFort },
  cout: { ...T.minuscule, marginTop: 3 },

  valider: {
    marginTop: 2,
    backgroundColor: C.accent,
    borderRadius: 3,
    paddingVertical: 14,
    alignItems: 'center',
  },
  validerTexte: {
    color: '#17150f',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  indication: { paddingVertical: 12, alignItems: 'center' },
});
