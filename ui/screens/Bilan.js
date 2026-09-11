// Bilan de fin de partie : complet et soigné. Les compteurs et les badges
// viennent tous de l'état de partie.
import { View, Text } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Ligne, Petit, Bouton, Etiquette, Separateur, Jauge } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { bilan } from '../../engine/badges.js';
import { useJeu } from '../jeu.js';

function Bloc({ titre, children }) {
  return (
    <Panneau>
      <SousTitre>{titre}</SousTitre>
      {children}
    </Panneau>
  );
}

export function EcranBilan() {
  const { E, abandonner } = useJeu();
  const db = getDb();
  const l = db.libelles.bilan ?? {};
  const b = bilan(E);
  const fin = db.meta.fins?.[b.fin?.id] ?? null;
  const obtenus = b.badges.filter((x) => x.obtenu);

  return (
    <Page>
      <Titre>{fin?.nom ?? 'Fin de partie'}</Titre>
      {fin?.description ? (
        <Text style={[TYPO.narration, { marginBottom: ESP.lg, color: T.texteDoux }]}>{fin.description}</Text>
      ) : null}

      <Bloc titre={l.appris ?? 'Ce que vous avez appris'}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={[TYPO.nombre, { fontSize: 22, color: T.accent, marginRight: ESP.sm }]}>
            {b.savoir}
          </Text>
          <Text style={TYPO.petit}>sur {b.savoir_max} morceaux de vérité</Text>
        </View>
        <Jauge valeur={b.savoir} max={b.savoir_max} couleur={T.accent} />
        <Petit style={{ marginTop: ESP.sm }}>
          {b.compteurs.indices_trouves} indice{b.compteurs.indices_trouves > 1 ? 's' : ''} relevé{b.compteurs.indices_trouves > 1 ? 's' : ''} sur les trois qui traînaient dans cette région.
        </Petit>
      </Bloc>

      <Bloc titre={l.temps ?? 'Temps écoulé'}>
        <Ligne gauche="Jours de jeu" droite={b.jours} />
        <Ligne gauche="Segments écoulés" droite={b.segments} />
        <Ligne gauche="Départ" droite={db.departs[b.depart]?.nom ?? b.depart} />
        {b.mutateurs.map((m) => (
          <Ligne key={m} gauche="Monde" droite={db.mutateurs[m]?.nom ?? m} doux />
        ))}
      </Bloc>

      <Bloc titre={l.heros ?? 'Le héros'}>
        <Ligne gauche="Niveau atteint" droite={b.heros.niveau} />
        <Ligne gauche="Expérience" droite={b.heros.xp} />
        {Object.entries(b.heros.stats).map(([s, v]) => (
          <Ligne key={s} gauche={db.libelles.stats?.[s]?.nom ?? s} droite={v} doux />
        ))}
        {b.heros.competences.length ? (
          <>
            <Separateur style={{ marginVertical: ESP.sm }} />
            {b.heros.competences.map((c) => (
              <Text key={c} style={[TYPO.petit, { color: T.texteDoux }]}>
                {db.competences[c]?.nom ?? c}
              </Text>
            ))}
          </>
        ) : null}
      </Bloc>

      {b.equipe.length ? (
        <Bloc titre={l.equipe ?? 'L’équipe'}>
          {b.equipe.map((c) => (
            <View key={c.id} style={{ marginBottom: ESP.sm }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[TYPO.corps, { fontSize: 14.5, flex: 1 }]}>{db.pnj[c.id]?.nom ?? c.id}</Text>
                <Etiquette couleur={c.statut === 'actif' ? T.ok : T.danger}>
                  {db.libelles.statuts_pnj?.[c.statut === 'actif' ? 'vivant_allie' : c.statut] ?? c.statut}
                </Etiquette>
              </View>
              <Petit>
                niveau {c.niveau} · {Object.entries(c.stats).map(([s, v]) => (db.libelles.stats?.[s]?.nom ?? s) + ' ' + v).join(' · ')}
              </Petit>
            </View>
          ))}
        </Bloc>
      ) : null}

      {b.pnj.length ? (
        <Bloc titre={l.survivants ?? 'Qui a survécu'}>
          {b.pnj.map((p) => (
            <Ligne
              key={p.id}
              gauche={db.pnj[p.id]?.nom ?? p.id}
              droite={db.libelles.statuts_pnj?.[p.statut] ?? p.statut}
              doux={p.statut === 'inconnu'}
            />
          ))}
        </Bloc>
      ) : null}

      <Bloc titre={l.ennemis ?? 'Ennemis vaincus'}>
        <Ligne gauche={db.libelles.factions?.terres_noires ?? 'Orcs'} droite={b.ennemis.orcs} />
        <Ligne gauche="Humains" droite={b.ennemis.humains} />
        <Ligne gauche="Bêtes" droite={b.ennemis.betes} />
        <Separateur style={{ marginVertical: ESP.sm }} />
        <Ligne gauche="Combats gagnés" droite={b.compteurs.combats_gagnes} doux />
        <Ligne gauche="Combats évités" droite={b.compteurs.combats_evites} doux />
        <Ligne gauche="Dégâts encaissés" droite={b.compteurs.degats_subis} doux />
      </Bloc>

      <Bloc titre={l.zones ?? 'Zones'}>
        {b.zones_explorees.map((z) => (
          <Text key={z} style={[TYPO.petit, { color: T.texte }]}>{db.points[z]?.nom ?? z}</Text>
        ))}
        {b.zones_jamais_atteintes.length ? (
          <>
            <Separateur style={{ marginVertical: ESP.sm }} />
            <Petit style={{ color: T.texteFaible }}>
              {b.zones_jamais_atteintes.length} lieu{b.zones_jamais_atteintes.length > 1 ? 'x' : ''} jamais atteint{b.zones_jamais_atteintes.length > 1 ? 's' : ''}.
            </Petit>
          </>
        ) : null}
      </Bloc>

      {b.decisions.length ? (
        <Bloc titre={l.decisions ?? 'Décisions majeures'}>
          {b.decisions.map((d, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 5 }}>
              <Text style={[TYPO.minuscule, { width: 46, color: T.accentDoux }]}>J{d.jour}</Text>
              <Text style={[TYPO.petit, { flex: 1 }]}>{db.journal?.[d.cle] ?? d.cle}</Text>
            </View>
          ))}
        </Bloc>
      ) : null}

      <Bloc titre={l.badges ?? 'Badges'}>
        <Petit style={{ marginBottom: ESP.md }}>{obtenus.length} sur {b.badges.length}</Petit>
        {b.badges.map((x) => (
          <View key={x.id} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: ESP.sm, opacity: x.obtenu ? 1 : 0.38 }}>
            <View style={{
              width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: ESP.md,
              backgroundColor: x.obtenu ? T.accent : 'transparent',
              borderWidth: 1, borderColor: x.obtenu ? T.accent : T.bordFort,
            }} />
            <View style={{ flex: 1 }}>
              <Text style={[TYPO.corps, { fontSize: 14, fontWeight: '600' }]}>{x.nom}</Text>
              <Petit>{x.description}</Petit>
            </View>
          </View>
        ))}
      </Bloc>

      <Bloc titre={l.manques ?? 'Ce que vous avez manqué'}>
        <Petit style={{ marginBottom: ESP.sm }}>
          Il y avait autre chose à trouver. Cette partie n’en a pas vu la moitié.
        </Petit>
        <Ligne gauche="Scènes jamais jouées" droite={b.manques.storylets_non_vus} doux />
        <Ligne gauche="Indices laissés sur place" droite={b.manques.indices_non_trouves} doux />
        <Ligne gauche="Lieux jamais atteints" droite={b.manques.points_non_atteints} doux />
        <Ligne gauche="Compétences jamais prises" droite={b.manques.competences_non_prises} doux />
      </Bloc>

      <Bouton variante="fort" onPress={abandonner}>Relancer une partie</Bouton>
      <Petit style={{ marginTop: ESP.sm, textAlign: 'center' }}>
        Rien ne sera conservé. Sauf ce que vous savez maintenant.
      </Petit>
    </Page>
  );
}
