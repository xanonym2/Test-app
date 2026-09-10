import { Pressable, StyleSheet, Text, View } from 'react-native';
import { couleurs, espaces, typo } from './theme.js';

/** Jauge compacte : une barre, pas de chiffre inutile. */
export function Jauge({ valeur, max = 100, teinte = couleurs.accent, largeur = 46 }) {
  const part = Math.max(0, Math.min(1, max ? valeur / max : 0));
  return (
    <View style={[styles.jauge, { width: largeur }]}>
      <View style={[styles.jaugeRemplie, { width: `${part * 100}%`, backgroundColor: teinte }]} />
    </View>
  );
}

export function Bouton({ titre, sousTitre, onPress, variante = 'normal', desactive = false }) {
  return (
    <Pressable
      onPress={desactive ? undefined : onPress}
      style={({ pressed }) => [
        styles.bouton,
        variante === 'primaire' && styles.boutonPrimaire,
        variante === 'discret' && styles.boutonDiscret,
        desactive && styles.boutonDesactive,
        pressed && !desactive && styles.boutonPresse,
      ]}
    >
      <Text
        style={[
          styles.boutonTexte,
          variante === 'primaire' && styles.boutonTextePrimaire,
          desactive && styles.boutonTexteDesactive,
        ]}
      >
        {titre}
      </Text>
      {sousTitre ? <Text style={styles.boutonSousTitre}>{sousTitre}</Text> : null}
    </Pressable>
  );
}

export function Section({ titre, children, style }) {
  return (
    <View style={[styles.section, style]}>
      {titre ? <Text style={[typo.sousTitre, styles.sectionTitre]}>{titre}</Text> : null}
      {children}
    </View>
  );
}

export function Ligne({ gauche, droite, teinte }) {
  return (
    <View style={styles.ligne}>
      <Text style={[typo.petit, teinte ? { color: teinte } : null]}>{gauche}</Text>
      <Text style={typo.valeur}>{droite}</Text>
    </View>
  );
}

export function Etiquette({ texte, teinte = couleurs.bordureVive }) {
  return (
    <View style={[styles.etiquette, { borderColor: teinte }]}>
      <Text style={[styles.etiquetteTexte, { color: teinte === couleurs.bordureVive ? couleurs.texteDoux : teinte }]}>
        {texte}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  jauge: {
    height: 4,
    backgroundColor: '#2a2724',
    borderRadius: 2,
    overflow: 'hidden',
  },
  jaugeRemplie: { height: '100%', borderRadius: 2 },

  bouton: {
    backgroundColor: couleurs.surfaceHaute,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: espaces.m,
    marginBottom: espaces.s,
  },
  boutonPrimaire: { backgroundColor: '#3a3025', borderColor: couleurs.accent },
  boutonDiscret: { backgroundColor: 'transparent', borderColor: couleurs.bordure },
  boutonPresse: { backgroundColor: couleurs.surfaceChoisie },
  boutonDesactive: { opacity: 0.4 },
  boutonTexte: { ...typo.option, textAlign: 'center' },
  boutonTextePrimaire: { color: couleurs.accent, fontWeight: '600', letterSpacing: 0.6 },
  boutonTexteDesactive: { color: couleurs.texteFaible },
  boutonSousTitre: { ...typo.cout, textAlign: 'center', marginTop: 3 },

  section: {
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 4,
    padding: espaces.m,
    marginBottom: espaces.m,
  },
  sectionTitre: { marginBottom: espaces.s },

  ligne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },

  etiquette: {
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginTop: 4,
  },
  etiquetteTexte: { fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' },
});
