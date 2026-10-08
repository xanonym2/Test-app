// Écran carte : points découverts seulement, position actuelle,
// distances en segments, lieux bloqués signalés.
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Petit, Etiquette, Vide } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { pointsAccessibles } from '../../engine/game.js';
import { facteurDeplacement } from '../../engine/derive.js';
import { pluriel } from '../format.js';
import { useJeu } from '../jeu.js';

export function EcranCarte() {
  const { E, allerA, setEcran, relancerScene } = useJeu();
  const db = getDb();
  const ici = db.points[E.geo.position];
  const liste = pointsAccessibles(E);
  const lent = facteurDeplacement(E) > 1;

  return (
    <Page>
      <Titre>Carte</Titre>

      <Panneau style={{ borderColor: T.accent }}>
        <SousTitre style={{ color: T.accent }}>Ici</SousTitre>
        <Text style={[TYPO.corps, { fontWeight: '600' }]}>{ici?.nom ?? '—'}</Text>
        {ici?.note_carte ? <Petit style={{ marginTop: 4 }}>{ici.note_carte}</Petit> : null}
        <Pressable onPress={() => { relancerScene(); }} style={({ pressed }) => ({ marginTop: ESP.md, opacity: pressed ? 0.6 : 1 })}>
          <Text style={[TYPO.petit, { color: T.accent }]}>Rester et regarder autour →</Text>
        </Pressable>
      </Panneau>

      {lent ? (
        <Petit style={{ color: T.danger, marginBottom: ESP.md }}>
          Le déplacement coûte plus cher qu’à l’ordinaire.
        </Petit>
      ) : null}

      <SousTitre>Se déplacer</SousTitre>
      {liste.length === 0 ? <Vide>Rien d’autre de connu.</Vide> : null}
      {liste.map((p) => (
        <Pressable
          key={p.id}
          onPress={p.bloque ? null : () => allerA(p.id)}
          style={({ pressed }) => ({
            backgroundColor: T.panneau,
            borderWidth: 1,
            borderColor: p.bloque ? T.danger : T.bord,
            borderRadius: 7,
            padding: ESP.md,
            marginBottom: ESP.sm,
            opacity: p.bloque ? 0.5 : pressed ? 0.8 : 1,
          })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[TYPO.corps, { fontSize: 15, fontWeight: '600', flex: 1 }]}>{p.point?.nom ?? p.id}</Text>
            {p.bloque ? (
              <Etiquette couleur={T.danger}>coupé</Etiquette>
            ) : (
              <Text style={[TYPO.minuscule, { color: T.accentDoux }]}>{pluriel(p.cout, 'segment')}</Text>
            )}
          </View>
          {p.point?.note_carte ? (
            <Petit style={{ marginTop: 4 }} numberOfLines={2}>{p.point.note_carte}</Petit>
          ) : null}
          {!p.visite ? <Etiquette style={{ marginTop: 7 }}>jamais vu</Etiquette> : null}
        </Pressable>
      ))}

      <Petit style={{ marginTop: ESP.md, color: T.texteFaible }}>
        {E.geo.points_decouverts.length} lieu{E.geo.points_decouverts.length > 1 ? 'x' : ''} connu{E.geo.points_decouverts.length > 1 ? 's' : ''} sur cette carte.
      </Petit>
    </Page>
  );
}
