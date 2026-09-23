// Écran compétences : n'affiche que ce qui est débloqué. Ce qui reste à
// débloquer est indiqué sans révéler son contenu.
import { View, Text } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Petit, Bouton, Etiquette, Separateur, Vide } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { competencesProposees, competencesVerrouillees } from '../../engine/progression.js';
import { NIVEAUX_COMPETENCE } from '../../engine/schema.js';
import { useJeu } from '../jeu.js';

function Fiche({ c, acquise, onChoisir }) {
  return (
    <View style={{
      borderWidth: 1, borderColor: acquise ? T.bord : T.accentDoux, borderRadius: 7,
      padding: ESP.md, marginBottom: ESP.sm, backgroundColor: acquise ? T.panneau : T.fond2,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
        <Text style={[TYPO.corps, { fontWeight: '600', flex: 1 }]}>{c.nom}</Text>
        <Etiquette couleur={c.type === 'activable' ? T.accent : T.texteFaible}>
          {c.type === 'activable' ? 'activable' : 'passif'}
        </Etiquette>
      </View>
      <Text style={[TYPO.petit, { color: T.texteDoux }]}>{c.description}</Text>
      {c.effet_resume ? (
        <Text style={[TYPO.minuscule, { marginTop: 6, color: T.accentDoux }]}>{c.effet_resume}</Text>
      ) : null}
      {onChoisir ? (
        <Bouton onPress={onChoisir} variante="fort" style={{ marginTop: ESP.md }}>Apprendre</Bouton>
      ) : null}
    </View>
  );
}

export function EcranCompetences() {
  const { E, apprendre } = useJeu();
  const db = getDb();
  const acquises = E.heros.competences.map((id) => db.competences[id]).filter(Boolean);
  const proposees = competencesProposees(E);
  const fermees = competencesVerrouillees(E);
  const total = Object.keys(db.competences).length;
  const restantes = total - acquises.length - fermees.length;
  const prochain = NIVEAUX_COMPETENCE.find((n) => n > E.heros.niveau);

  return (
    <Page>
      <Titre>Compétences</Titre>

      {E.heros.competence_a_choisir > 0 && proposees.length ? (
        <Panneau plat style={{ borderWidth: 1, borderColor: T.accent, backgroundColor: T.selection, padding: ESP.md }}>
          <SousTitre style={{ color: T.accent }}>Un choix à faire</SousTitre>
          <Petit style={{ marginBottom: ESP.md }}>
            Prendre l’une ferme les autres pour cette partie.
          </Petit>
          {proposees.map((c) => (
            <Fiche key={c.id} c={c} onChoisir={() => apprendre(c.id)} />
          ))}
        </Panneau>
      ) : null}

      <Panneau plat>
        <SousTitre>Acquises</SousTitre>
        {acquises.length === 0 ? (
          <Vide>Rien d’appris pour l’instant.</Vide>
        ) : (
          acquises.map((c) => <Fiche key={c.id} c={c} acquise />)
        )}
      </Panneau>

      <Panneau>
        <SousTitre>Le reste</SousTitre>
        <Petit>
          {restantes > 0
            ? restantes + (restantes > 1 ? ' compétences restent hors d’atteinte pour l’instant.' : ' compétence reste hors d’atteinte pour l’instant.')
            : 'Plus rien à découvrir de ce côté.'}
        </Petit>
        {fermees.length ? (
          <Petit style={{ marginTop: 6, color: T.texteFaible }}>
            {fermees.length + (fermees.length > 1 ? ' voies sont fermées par les choix déjà faits.' : ' voie est fermée par les choix déjà faits.')}
          </Petit>
        ) : null}
        {prochain ? (
          <>
            <Separateur />
            <Petit>Prochain choix au niveau {prochain}.</Petit>
          </>
        ) : null}
      </Panneau>
    </Page>
  );
}
