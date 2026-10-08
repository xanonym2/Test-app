// Écran de lancement : reprendre, ou choisir un départ. Les mutateurs sont
// tirés — le joueur sait qu'ils existent, pas lesquels avant de partir.
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Petit, Bouton, Etiquette, Separateur } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { etatSauvegarde } from '../../engine/save.js';
import { useJeu } from '../jeu.js';

export function EcranTitre() {
  const { demarrer, reprendre } = useJeu();
  const [sauvegarde, setSauvegarde] = useState('aucune');
  const [choix, setChoix] = useState(false);
  // Sur un téléphone, un tap part vite : tant qu'une partie est en cours, la
  // recommencer demande un second geste.
  const [confirmer, setConfirmer] = useState(null);
  const db = getDb();

  useEffect(() => { etatSauvegarde().then(setSauvegarde); }, []);

  // Une partie finie n'a plus que son bilan : la recommencer n'efface rien
  // qu'on puisse encore jouer.
  const aProteger = sauvegarde === 'en_cours' || sauvegarde === 'illisible';
  const lancer = (opts) => {
    if (aProteger) setConfirmer(opts);
    else demarrer(opts);
  };

  return (
    <Page contentStyle={{ paddingTop: ESP.xl * 2 }}>
      <Text style={{ fontSize: 30, fontWeight: '300', color: T.texte, letterSpacing: 2 }}>
        {db.meta.titre}
      </Text>
      <View style={{ height: 2, width: 48, backgroundColor: T.accent, marginTop: ESP.md, marginBottom: ESP.xl }} />

      {sauvegarde === 'en_cours' || sauvegarde === 'terminee' ? (
        <>
          <Bouton variante="fort" onPress={() => reprendre()}>
            {sauvegarde === 'terminee' ? 'Revoir le bilan' : 'Reprendre'}
          </Bouton>
          <Petit style={{ marginTop: 6, marginBottom: ESP.lg }}>
            {sauvegarde === 'terminee'
              ? 'La dernière partie est finie. Il en reste le bilan.'
              : 'La partie reprend exactement où elle s’est arrêtée.'}
          </Petit>
        </>
      ) : sauvegarde === 'illisible' ? (
        <Petit style={{ marginBottom: ESP.lg }}>
          La partie enregistrée ne se lit pas avec cette version du jeu.
        </Petit>
      ) : null}

      {confirmer ? (
        <Panneau style={{ borderColor: T.danger }}>
          <SousTitre style={{ color: T.danger }}>Une partie est en cours</SousTitre>
          <Petit style={{ marginBottom: ESP.md }}>
            La recommencer l’efface. Rien n’en sera gardé.
          </Petit>
          <Bouton variante="fort" onPress={() => { setConfirmer(null); demarrer(confirmer); }}>
            Effacer et recommencer
          </Bouton>
          <View style={{ height: ESP.sm }} />
          <Bouton variante="discret" onPress={() => setConfirmer(null)}>Garder la partie en cours</Bouton>
        </Panneau>
      ) : !choix ? (
        <>
          <Bouton variante={sauvegarde === 'en_cours' ? 'normal' : 'fort'} onPress={() => lancer({})}>
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
            Chaque départ change ce que tu portes et le moment où tu entres.
          </Petit>
          {Object.values(db.departs).map((d) => (
            <Pressable
              key={d.id}
              onPress={() => lancer({ depart: d.id })}
              style={({ pressed }) => ({
                backgroundColor: T.panneau, borderWidth: 1, borderColor: T.bord,
                borderRadius: 7, padding: ESP.md, marginBottom: ESP.sm, opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text style={[TYPO.corps, { fontSize: 15, fontWeight: '600' }]}>{d.nom}</Text>
              <Petit style={{ marginTop: 4 }}>{d.description}</Petit>
              {d.mutateurs === undefined ? (
                <Petit style={{ marginTop: 4, color: T.texteFaible }}>
                  Une ou deux variables du monde sont tirées par-dessus.
                </Petit>
              ) : null}
            </Pressable>
          ))}
          <Bouton variante="discret" onPress={() => setChoix(false)}>Retour</Bouton>
        </>
      )}

      <Separateur style={{ marginTop: ESP.xl }} />
      <Panneau plat>
        <Petit>
          Une partie dure quelques heures. La mort est définitive et rien ne se
          débloque d’une partie à l’autre : seul ce que tu auras compris reste.
        </Petit>
      </Panneau>
    </Page>
  );
}
