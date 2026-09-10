import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { couleurs, espaces, typo } from './theme.js';
import { Bouton } from './composants.js';

/**
 * Écran principal. Sélection réversible : tant que « Valider » n'est pas
 * pressé, le choix peut être changé ou annulé.
 */
export function EcranScene({ scene, lieu, onValider, onContinuer, onAction }) {
  const [choix, setChoix] = useState(null);
  const journalRef = useRef(null);

  useEffect(() => {
    setChoix(null);
  }, [scene?.id, scene?.tour, scene?.terminee]);

  if (!scene) return <EcranLieu lieu={lieu} onAction={onAction} />;

  const optionChoisie = scene.options.find((o) => o.id === choix) ?? null;

  return (
    <View style={styles.plein}>
      <ScrollView
        ref={journalRef}
        style={styles.journal}
        contentContainerStyle={styles.journalContenu}
        onContentSizeChange={() => journalRef.current?.scrollToEnd({ animated: true })}
      >
        <Text style={styles.titre}>{scene.titre}</Text>
        {scene.journal.map((entree, index) => (
          <Entree key={index} entree={entree} />
        ))}
      </ScrollView>

      <View style={styles.pied}>
        {scene.terminee ? (
          <Bouton titre="Continuer" variante="primaire" onPress={onContinuer} />
        ) : (
          <>
            <ScrollView style={styles.options} keyboardShouldPersistTaps="handled">
              {scene.options.map((option) => (
                <Option
                  key={option.id}
                  option={option}
                  choisie={choix === option.id}
                  onPress={() => setChoix(choix === option.id ? null : option.id)}
                />
              ))}
            </ScrollView>

            <View style={styles.validation}>
              <Bouton
                titre={optionChoisie ? 'Valider ce choix' : 'Choisis une action'}
                sousTitre={optionChoisie ? resumeCout(optionChoisie) : 'Touche une option, tu pourras encore changer'}
                variante="primaire"
                desactive={!optionChoisie}
                onPress={() => optionChoisie && onValider(optionChoisie.id)}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

function Entree({ entree }) {
  if (entree.type === 'choix') {
    return <Text style={[typo.choixPasse, styles.entreeChoix]}>› {entree.texte}</Text>;
  }
  if (entree.type === 'systeme') {
    return <Text style={[typo.recitSysteme, styles.entree]}>{entree.texte}</Text>;
  }
  return <Text style={[typo.recit, styles.entree]}>{entree.texte}</Text>;
}

function Option({ option, choisie, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        option.sortie && styles.optionSortie,
        choisie && styles.optionChoisie,
        pressed && styles.optionPressee,
      ]}
    >
      <View style={styles.optionRangee}>
        <View style={[styles.puce, choisie && styles.puceChoisie]} />
        <View style={styles.optionCorps}>
          <Text style={[typo.option, choisie && styles.optionTexteChoisi]}>{option.libelle}</Text>
          {resumeCout(option) ? <Text style={typo.cout}>{resumeCout(option)}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

/** Le coût est de l'information, pas de l'orientation : on l'affiche toujours. */
function resumeCout(option) {
  const morceaux = [];
  const segments = option.cout?.segments;
  if (segments) morceaux.push(`${segments} segment${segments > 1 ? 's' : ''}`);
  if (option.sortie) morceaux.push('quitte la scène');
  return morceaux.join(' · ');
}

function EcranLieu({ lieu, onAction }) {
  return (
    <ScrollView style={styles.plein} contentContainerStyle={styles.journalContenu}>
      <Text style={styles.titre}>{lieu.nom}</Text>
      <Text style={[typo.recitSysteme, styles.entree]}>{lieu.note}</Text>
      {lieu.message ? <Text style={[typo.recitSysteme, styles.entree]}>{lieu.message}</Text> : null}

      <View style={{ marginTop: espaces.l }}>
        {lieu.peutExplorer ? (
          <Bouton titre="Regarder autour de toi" sousTitre="ce qui se présente ici" variante="primaire" onPress={() => onAction('explorer')} />
        ) : (
          <Text style={[typo.recitSysteme, styles.entree]}>
            Il n’y a plus rien à faire ici pour le moment.
          </Text>
        )}
        <Bouton titre="T’arrêter un moment" sousTitre="2 segments" onPress={() => onAction('reposer')} />
        <Bouton titre="Ouvrir la carte" variante="discret" onPress={() => onAction('carte')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  plein: { flex: 1, backgroundColor: couleurs.fond },
  journal: { flex: 1 },
  journalContenu: { padding: espaces.l, paddingBottom: espaces.xl },
  titre: { ...typo.titre, marginBottom: espaces.m },
  entree: { marginBottom: espaces.m },
  entreeChoix: { marginBottom: espaces.m, marginTop: espaces.xs },

  pied: {
    borderTopWidth: 1,
    borderTopColor: couleurs.bordure,
    backgroundColor: couleurs.surface,
    paddingHorizontal: espaces.m,
    paddingTop: espaces.m,
  },
  options: { maxHeight: 250 },
  option: {
    backgroundColor: couleurs.surfaceHaute,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    borderRadius: 4,
    paddingVertical: 11,
    paddingHorizontal: espaces.m,
    marginBottom: espaces.s,
  },
  optionSortie: { borderStyle: 'dashed' },
  optionChoisie: { borderColor: couleurs.accent, backgroundColor: couleurs.surfaceChoisie },
  optionPressee: { opacity: 0.75 },
  optionRangee: { flexDirection: 'row', alignItems: 'flex-start' },
  optionCorps: { flex: 1 },
  optionTexteChoisi: { color: couleurs.accent },
  puce: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: couleurs.bordureVive,
    marginRight: espaces.m,
    marginTop: 5,
  },
  puceChoisie: { backgroundColor: couleurs.accent, borderColor: couleurs.accent },
  validation: { paddingTop: espaces.s, paddingBottom: espaces.s },
});
