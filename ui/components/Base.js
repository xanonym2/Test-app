import { View, Text, Pressable, ScrollView } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';

export function Panneau({ children, style, plat }) {
  return (
    <View
      style={[
        {
          backgroundColor: plat ? 'transparent' : T.panneau,
          borderWidth: plat ? 0 : 1,
          borderColor: T.bord,
          borderRadius: 8,
          padding: ESP.md,
          marginBottom: ESP.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function Titre({ children, style }) {
  return <Text style={[TYPO.titre, { marginBottom: ESP.sm }, style]}>{children}</Text>;
}

export function SousTitre({ children, style }) {
  return <Text style={[TYPO.sousTitre, { marginBottom: ESP.sm }, style]}>{children}</Text>;
}

export function Petit({ children, style, numberOfLines }) {
  return <Text numberOfLines={numberOfLines} style={[TYPO.petit, style]}>{children}</Text>;
}

export function Ligne({ gauche, droite, style, doux }) {
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 3 }, style]}>
      <Text style={[TYPO.corps, { fontSize: 14.5, color: doux ? T.texteDoux : T.texte, flexShrink: 1, paddingRight: ESP.sm }]}>{gauche}</Text>
      <Text style={[TYPO.nombre, { fontSize: 14.5, color: doux ? T.texteDoux : T.texte, textAlign: 'right' }]}>{droite}</Text>
    </View>
  );
}

export function Separateur({ style }) {
  return <View style={[{ height: 1, backgroundColor: T.bord, marginVertical: ESP.md }, style]} />;
}

export function Jauge({ valeur, max, couleur, hauteur = 5, inverse }) {
  const r = Math.max(0, Math.min(1, max ? valeur / max : 0));
  return (
    <View style={{ height: hauteur, backgroundColor: T.bord, borderRadius: hauteur / 2, overflow: 'hidden' }}>
      <View style={{ width: `${(inverse ? 1 - r : r) * 100}%`, height: '100%', backgroundColor: couleur ?? T.accent }} />
    </View>
  );
}

export function Bouton({ children, onPress, variante = 'normal', desactive, style }) {
  const fonds = { normal: T.panneauHaut, fort: T.accentDoux, discret: 'transparent', danger: T.danger };
  return (
    <Pressable
      onPress={desactive ? null : onPress}
      style={({ pressed }) => [
        {
          backgroundColor: fonds[variante],
          opacity: desactive ? 0.4 : pressed ? 0.75 : 1,
          borderWidth: 1,
          borderColor: variante === 'fort' ? T.accent : T.bordFort,
          borderRadius: 7,
          paddingVertical: 13,
          paddingHorizontal: ESP.md,
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Text style={{ color: variante === 'fort' ? '#F3ECE0' : T.texte, fontSize: 15, fontWeight: '600' }}>
        {children}
      </Text>
    </Pressable>
  );
}

export function Etiquette({ children, couleur, style }) {
  return (
    <View
      style={[
        { borderWidth: 1, borderColor: couleur ?? T.bordFort, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start' },
        style,
      ]}
    >
      <Text style={{ fontSize: 10.5, letterSpacing: 0.6, color: couleur ?? T.texteDoux, textTransform: 'uppercase' }}>
        {children}
      </Text>
    </View>
  );
}

export function Page({ children, contentStyle }) {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: T.fond }}
      contentContainerStyle={[{ padding: ESP.lg, paddingBottom: ESP.xl * 2 }, contentStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function Vide({ children }) {
  return (
    <View style={{ paddingVertical: ESP.xl, alignItems: 'center' }}>
      <Text style={[TYPO.petit, { color: T.texteFaible, textAlign: 'center' }]}>{children}</Text>
    </View>
  );
}
