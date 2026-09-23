// Écran personnage : les 4 stats avec ce qu'elles gouvernent, les effets
// dérivés, la progression, les points attribuables et les états actifs
// avec leur effet réel.
import { View, Text, Pressable } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Ligne, Jauge, Petit, Separateur, Etiquette } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { santeMax, capacitePort, porteeObservation, bonusMelee, bonusTir, progressionNiveau, tousLesEtats, poidsPorte } from '../../engine/derive.js';
import { useJeu } from '../jeu.js';
import { STATS } from '../../engine/schema.js';

function Stat({ cle, valeur, l, points, onPlus }) {
  return (
    <View style={{ marginBottom: ESP.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={[TYPO.corps, { fontWeight: '600', flex: 1 }]}>{l.nom}</Text>
        <Text style={[TYPO.nombre, { fontSize: 19, color: T.accent, marginRight: ESP.md }]}>{valeur}</Text>
        {points > 0 ? (
          <Pressable
            onPress={onPlus}
            style={({ pressed }) => ({
              width: 32, height: 32, borderRadius: 6, borderWidth: 1, borderColor: T.accent,
              alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text style={{ color: T.accent, fontSize: 18, lineHeight: 21 }}>+</Text>
          </Pressable>
        ) : null}
      </View>
      <Petit style={{ marginTop: 2 }}>{l.gouverne}</Petit>
      <Jauge valeur={valeur} max={6} hauteur={3} couleur={T.accentDoux} />
    </View>
  );
}

export function EcranPersonnage() {
  const { E, attribuerPoint } = useJeu();
  const db = getDb();
  const l = db.libelles;
  const p = progressionNiveau(E.heros.xp, E.heros.niveau);
  const etats = tousLesEtats(E.heros);

  return (
    <Page>
      <Titre>Personnage</Titre>

      <Panneau>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: ESP.sm }}>
          <Text style={[TYPO.corps, { fontWeight: '600' }]}>Niveau {E.heros.niveau}</Text>
          <View style={{ flex: 1 }} />
          <Text style={TYPO.petit}>
            {p.max ? 'progression au maximum' : p.actuel + ' / ' + p.requis + ' points d’expérience'}
          </Text>
        </View>
        <Jauge valeur={p.ratio} max={1} couleur={T.accent} />
        {E.heros.points_stat > 0 ? (
          <Etiquette couleur={T.accent} style={{ marginTop: ESP.md }}>
            {E.heros.points_stat > 1 ? E.heros.points_stat + ' points à répartir' : '1 point à répartir'}
          </Etiquette>
        ) : null}
      </Panneau>

      <Panneau>
        <SousTitre>Caractéristiques</SousTitre>
        {STATS.map((s) => (
          <Stat
            key={s}
            cle={s}
            valeur={E.heros.stats[s]}
            l={l.stats?.[s] ?? { nom: s, gouverne: '' }}
            points={E.heros.points_stat}
            onPlus={() => attribuerPoint(s)}
          />
        ))}
      </Panneau>

      <Panneau>
        <SousTitre>Effets dérivés</SousTitre>
        <Ligne gauche="Santé maximale" droite={E.heros.sante + ' / ' + santeMax(E.heros.stats)} />
        <Ligne gauche="Capacité de port" droite={poidsPorte(E.inventaire).toFixed(1).replace('.', ',') + ' / ' + capacitePort(E.heros.stats) + ' kg'} />
        <Ligne gauche="Portée d’observation" droite={porteeObservation(E.heros.stats)} />
        <Ligne gauche="Corps à corps" droite={'+' + bonusMelee(E.heros.stats)} />
        <Ligne gauche="Tir" droite={'+' + bonusTir(E.heros.stats)} />
      </Panneau>

      <Panneau>
        <SousTitre>États actifs</SousTitre>
        {etats.length === 0 ? (
          <Petit>Aucun. Le corps suit encore.</Petit>
        ) : (
          etats.map((e) => (
            <View key={e} style={{ marginBottom: ESP.sm }}>
              <Text style={[TYPO.corps, { fontSize: 14.5, color: T.danger, fontWeight: '600' }]}>
                {l.etats?.[e]?.nom ?? e}
              </Text>
              <Petit>{l.etats?.[e]?.effet ?? ''}</Petit>
            </View>
          ))
        )}
        <Separateur />
        <Ligne gauche="Fatigue" droite={E.heros.fatigue + ' / 100'} doux />
        <Ligne gauche="Faim" droite={E.heros.faim + ' / 100'} doux />
      </Panneau>

      <Panneau>
        <SousTitre>Réputation</SousTitre>
        {Object.entries(E.social.reputation).map(([f, v]) => (
          <Ligne key={f} gauche={l.factions?.[f] ?? f} droite={(v > 0 ? '+' : '') + v} doux={v === 0} />
        ))}
      </Panneau>
    </Page>
  );
}
