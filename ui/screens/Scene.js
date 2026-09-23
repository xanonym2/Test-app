// Écran scène : texte narratif, options en bas, sélection réversible,
// validation explicite et impossible à manquer.
import { useRef, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Bouton, Vide } from '../components/Base.js';
import { coutTexte, nomBase } from '../format.js';
import { useJeu } from '../jeu.js';

function Option({ o, choisi, onPress }) {
  const cout = coutTexte(o);
  return (
    <Pressable
      onPress={o.indisponible ? null : onPress}
      style={({ pressed }) => ({
        backgroundColor: choisi ? T.selection : T.panneau,
        borderWidth: 1,
        borderColor: choisi ? T.accent : T.bord,
        borderRadius: 7,
        paddingVertical: 13,
        paddingHorizontal: ESP.md,
        marginBottom: ESP.sm,
        opacity: o.indisponible ? 0.4 : pressed ? 0.8 : 1,
      })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{
          width: 15, height: 15, borderRadius: 8, borderWidth: 1.5, marginTop: 3, marginRight: ESP.md,
          borderColor: choisi ? T.accent : T.bordFort,
          backgroundColor: choisi ? T.accent : 'transparent',
        }} />
        <View style={{ flex: 1 }}>
          <Text style={TYPO.libelle}>{o.libelle}</Text>
          {cout ? <Text style={[TYPO.minuscule, { marginTop: 5, color: T.accentDoux }]}>{cout}</Text> : null}
          {o.indisponible ? (
            <Text style={[TYPO.minuscule, { marginTop: 4, color: T.texteFaible }]}>
              {o.manque ? 'Il manque : ' + nomBase(o.manque) : 'Hors de portée pour l’instant'}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export function EcranScene() {
  const { E, scene, selection, setSelection, valider, setEcran, relancerScene } = useJeu();
  const scroll = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [scene.fil.length]);

  if (!scene.storylet) {
    return (
      <View style={{ flex: 1, backgroundColor: T.fond, padding: ESP.lg, justifyContent: 'center' }}>
        {scene.fil.map((b, i) => (
          <Text key={i} style={[TYPO.narration, { marginBottom: ESP.md }]}>{b.t}</Text>
        ))}
        <Vide>Rien ne retient ici.</Vide>
        <Bouton onPress={() => setEcran('carte')} variante="fort">Ouvrir la carte</Bouton>
        <View style={{ height: ESP.sm }} />
        <Bouton onPress={relancerScene} variante="discret">Regarder autour</Bouton>
      </View>
    );
  }

  const opt = scene.options ?? [];
  const choisie = opt.find((o) => o.id === selection);

  return (
    <View style={{ flex: 1, backgroundColor: T.fond }}>
      <ScrollView
        ref={scroll}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: ESP.lg, paddingBottom: ESP.md }}
        showsVerticalScrollIndicator={false}
      >
        {scene.fil.map((b, i) => (
          <View key={i} style={{ marginBottom: ESP.lg }}>
            {b.k === 'v' ? (
              <Text style={[TYPO.narration, { color: T.texteFaible, fontStyle: 'italic', fontSize: 15 }]}>{b.t}</Text>
            ) : b.k === 'i' ? (
              <View style={{ borderLeftWidth: 2, borderLeftColor: T.bordFort, paddingLeft: ESP.md }}>
                <Text style={[TYPO.narration, { color: T.texteDoux }]}>{b.t}</Text>
              </View>
            ) : (
              <Text style={TYPO.narration}>{b.t}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={{ borderTopWidth: 1, borderTopColor: T.bord, backgroundColor: T.fond2, padding: ESP.lg, paddingTop: ESP.md }}>
        {opt.length === 0 ? (
          <Bouton onPress={relancerScene} variante="fort">Continuer</Bouton>
        ) : (
          <>
            <ScrollView style={{ maxHeight: 290 }} showsVerticalScrollIndicator={false}>
              {opt.map((o) => (
                <Option
                  key={o.id}
                  o={o}
                  choisi={selection === o.id}
                  onPress={() => setSelection(selection === o.id ? null : o.id)}
                />
              ))}
            </ScrollView>
            <View style={{ marginTop: ESP.sm }}>
              <Bouton onPress={valider} variante="fort" desactive={!choisie}>
                {choisie ? 'Valider ce choix' : 'Choisir une action'}
              </Bouton>
              {choisie ? (
                <Pressable onPress={() => setSelection(null)} style={{ alignItems: 'center', paddingTop: ESP.sm }}>
                  <Text style={[TYPO.minuscule, { color: T.texteFaible }]}>Revenir sur le choix</Text>
                </Pressable>
              ) : null}
            </View>
          </>
        )}
      </View>
    </View>
  );
}
