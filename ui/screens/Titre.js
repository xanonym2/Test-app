// Écran de lancement : reprendre, ou choisir un départ. Les mutateurs sont
// tirés — le joueur sait qu'ils existent, pas lesquels avant de partir.
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Petit, Bouton, Etiquette, Separateur } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { existeSauvegarde } from '../../engine/save.js';
import { useJeu } from '../jeu.js';

export function EcranTitre() {
  const { demarrer, reprendre } = useJeu();
  const [sauvegarde, setSauvegarde] = useState(false);
  const [choix, setChoix] = useState(false);
  const db = getDb();

  useEffect(() => { existeSauvegarde().then(setSauvegarde); }, []);

  return (
    <Page contentStyle={{ paddingTop: ESP.xl * 2 }}>
      <Text style={{ fontSize: 30, fontWeight: '300', color: T.texte, letterSpacing: 2 }}>
        {db.meta.titre}
      </Text>
      <View style={{ height: 2, width: 48, backgroundColor: T.accent, marginTop: ESP.md, marginBottom: ESP.xl }} />

      {sauvegarde ? (
        <>
          <Bouton variante="fort" onPress={() => reprendre()}>Reprendre</Bouton>
          <Petit style={{ marginTop: 6, marginBottom: ESP.lg }}>
            La partie reprend exactement où elle s’est arrêtée.
          </Petit>
        </>
      ) : null}

      {!choix ? (
        <>
          <Bouton variante={sauvegarde ? 'normal' : 'fort'} onPress={() => demarrer({})}>
            Nouvelle partie
          </Bouton>
          <Pressable onPress={() => setChoix(true)} style={{ paddingVertical: ESP.md, alignItems: 'center' }}>
            <Text style={[TYPO.petit, { color: T.accent }]}>Choisir son départ →</Text>
          </Pressable>
        </>
      ) : (
        <>
          <SousTitre>Départs</SousTitre>
          <Petit style={{ marginBottom: ESP.md }}>
            Le même chemin, un point d’entrée différent. Une ou deux variables du monde
            sont tirées par-dessus.
          </Petit>
          {Object.values(db.departs).map((d) => (
            <Pressable
              key={d.id}
              onPress={() => demarrer({ depart: d.id })}
              style={({ pressed }) => ({
                backgroundColor: T.panneau, borderWidth: 1, borderColor: T.bord,
                borderRadius: 7, padding: ESP.md, marginBottom: ESP.sm, opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={[TYPO.corps, { fontSize: 15, fontWeight: '600' }]}>{d.nom}</Text>
              <Petit style={{ marginTop: 4 }}>{d.description}</Petit>
            </Pressable>
          ))}
          <Bouton variante="discret" onPress={() => setChoix(false)}>Retour</Bouton>
        </>
      )}

      <Separateur style={{ marginTop: ESP.xl }} />
      <Panneau plat>
        <Petit>
          Une partie dure quelques heures. La mort est définitive et rien ne se
          débloque d’une partie à l’autre : seul ce que vous aurez compris reste.
        </Petit>
      </Panneau>
    </Page>
  );
}
