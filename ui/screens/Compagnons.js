// Écran compagnons : fiche par compagnon, rôle en combat, équipement,
// confiance, et ce que chacun apporte hors combat.
import { View, Text } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Ligne, Jauge, Petit, Etiquette, Separateur, Vide } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { santeMax } from '../../engine/derive.js';
import { STATS } from '../../engine/schema.js';
import { nomBase } from '../format.js';
import { useJeu } from '../jeu.js';

function Confiance({ valeur }) {
  return (
    <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center' }}>
      {[-2, -1, 0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            width: 14, height: 4, borderRadius: 2,
            backgroundColor: valeur >= 0
              ? (i <= valeur - 1 && i >= 0 ? T.accent : T.bord)
              : (i < 0 && i >= valeur ? T.danger : T.bord),
          }}
        />
      ))}
    </View>
  );
}

function Fiche({ c, db }) {
  const modele = db.pnj[c.id] ?? {};
  const l = db.libelles;
  const mort = c.statut === 'mort';
  return (
    <Panneau style={mort ? { borderColor: T.danger, opacity: 0.75 } : null}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <Text style={[TYPO.corps, { fontWeight: '600', flex: 1 }]}>{modele.nom ?? c.id}</Text>
        <Etiquette couleur={mort ? T.danger : T.texteFaible}>
          {mort ? (l.statuts_pnj?.mort ?? 'mort') : (l.roles?.[c.role] ?? c.role)}
        </Etiquette>
      </View>
      {modele.description ? <Petit style={{ marginBottom: ESP.md }}>{modele.description}</Petit> : null}

      <Ligne gauche="Niveau" droite={c.niveau} />
      <View style={{ marginVertical: 6 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
          <Text style={TYPO.minuscule}>SANTÉ</Text>
          <Text style={TYPO.minuscule}>{c.sante} / {santeMax(c.stats)}</Text>
        </View>
        <Jauge valeur={c.sante} max={santeMax(c.stats)} couleur={T.sante} hauteur={4} />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: ESP.sm }}>
        {STATS.map((s) => (
          <View key={s} style={{ width: '50%', paddingVertical: 2 }}>
            <Text style={TYPO.minuscule}>
              {(l.stats?.[s]?.nom ?? s) + '  '}
              <Text style={{ color: T.texte }}>{c.stats[s]}</Text>
            </Text>
          </View>
        ))}
      </View>

      <Separateur style={{ marginVertical: ESP.sm }} />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={TYPO.minuscule}>CONFIANCE</Text>
        <Confiance valeur={c.confiance ?? 0} />
      </View>

      {modele.apport_hors_combat ? (
        <>
          <SousTitre style={{ marginTop: ESP.md }}>Hors combat</SousTitre>
          <Petit>{modele.apport_hors_combat}</Petit>
        </>
      ) : null}

      {c.equipement?.length ? (
        <>
          <SousTitre style={{ marginTop: ESP.md }}>Équipement porté</SousTitre>
          {c.equipement.map((o, i) => (
            <Text key={i} style={[TYPO.petit, { color: T.texteDoux }]}>{nomBase(o)}</Text>
          ))}
        </>
      ) : null}

      {c.competences?.length ? (
        <>
          <SousTitre style={{ marginTop: ESP.md }}>Compétences</SousTitre>
          {c.competences.map((id) => (
            <Text key={id} style={[TYPO.petit, { color: T.texteDoux }]}>
              {db.competences[id]?.nom ?? id}
            </Text>
          ))}
        </>
      ) : null}
    </Panneau>
  );
}

export function EcranCompagnons() {
  const { E } = useJeu();
  const db = getDb();
  const actifs = E.compagnons.filter((c) => c.statut === 'actif');
  const perdus = E.compagnons.filter((c) => c.statut !== 'actif');

  return (
    <Page>
      <Titre>Compagnons</Titre>
      {actifs.length === 0 && perdus.length === 0 ? (
        <Vide>Personne pour l’instant. On avance seul.</Vide>
      ) : null}
      {actifs.map((c) => <Fiche key={c.id} c={c} db={db} />)}
      {perdus.length ? (
        <>
          <SousTitre style={{ marginTop: ESP.md }}>Ceux qui ne sont plus là</SousTitre>
          {perdus.map((c) => <Fiche key={c.id} c={c} db={db} />)}
        </>
      ) : null}
    </Page>
  );
}
