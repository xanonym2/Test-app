import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { couleurs, espaces, typo } from './theme.js';
import { Jauge, Ligne, Section } from './composants.js';

export function EcranPersonnage({ perso, etiquettes, competencesOffertes, onDepenserPoint, onApprendre }) {
  const surcharge = perso.charge > perso.capacite;

  return (
    <ScrollView style={styles.plein} contentContainerStyle={styles.contenu}>
      <Section titre="Le chasseur">
        <Ligne gauche="Niveau" droite={String(perso.niveau)} />
        <Ligne
          gauche="Expérience"
          droite={perso.xpProchain ? `${perso.xp} / ${perso.xpProchain}` : `${perso.xp}`}
        />
        <View style={{ marginTop: espaces.s }}>
          <Jauge valeur={perso.xp} max={perso.xpProchain ?? perso.xp} largeur={undefined} />
        </View>
        {perso.etats.length ? (
          <View style={styles.etats}>
            {perso.etats.map((e) => (
              <Text key={e} style={styles.etat}>{etiquettes.etats[e] ?? e}</Text>
            ))}
          </View>
        ) : null}
      </Section>

      <Section titre={perso.points ? `Caractéristiques · ${perso.points} point(s) à placer` : 'Caractéristiques'}>
        {perso.stats.map((stat) => (
          <View key={stat.cle} style={styles.statLigne}>
            <Text style={typo.petit}>{etiquettes.stats[stat.cle]}</Text>
            <View style={styles.statDroite}>
              <Text style={typo.valeur}>
                {stat.effective}
                {stat.effective !== stat.brute ? ` (${stat.brute})` : ''}
              </Text>
              {perso.points > 0 ? (
                <Pressable onPress={() => onDepenserPoint(stat.cle)} style={styles.plus}>
                  <Text style={styles.plusTexte}>+</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        ))}
      </Section>

      {competencesOffertes.length ? (
        <Section titre="Une compétence, une seule">
          {competencesOffertes.map((competence) => (
            <Pressable key={competence.id} onPress={() => onApprendre(competence.id)} style={styles.competence}>
              <Text style={styles.competenceNom}>{competence.nom}</Text>
              <Text style={typo.petit}>{competence.effet}</Text>
            </Pressable>
          ))}
        </Section>
      ) : null}

      {perso.competences.length ? (
        <Section titre="Compétences">
          {perso.competences.map((competence) => (
            <View key={competence.id} style={{ marginBottom: espaces.s }}>
              <Text style={styles.competenceNom}>{competence.nom}</Text>
              <Text style={typo.petit}>{competence.effet}</Text>
            </View>
          ))}
        </Section>
      ) : null}

      <Section titre="Inventaire">
        <View style={styles.charge}>
          <Text style={[typo.petit, surcharge && { color: couleurs.sang }]}>
            Encombrement {Math.round(perso.charge * 10) / 10} / {perso.capacite}
            {surcharge ? ' — tu traînes' : ''}
          </Text>
          <Jauge
            valeur={perso.charge}
            max={perso.capacite}
            teinte={surcharge ? couleurs.sang : couleurs.texteFaible}
            largeur={90}
          />
        </View>

        {perso.inventaire.length === 0 ? (
          <Text style={typo.recitSysteme}>Tu ne portes plus rien.</Text>
        ) : (
          perso.inventaire.map((objet) => (
            <View key={objet.uid} style={styles.objet}>
              <View style={styles.objetTete}>
                <Text style={styles.objetNom} numberOfLines={2}>
                  {objet.nom}
                  {objet.quantite > 1 ? ` ×${objet.quantite}` : ''}
                </Text>
                <Text style={typo.cout}>{etiquettes.usure[objet.palier]}</Text>
              </View>
              <Jauge
                valeur={objet.usure}
                max={100}
                teinte={objet.usure < 30 ? couleurs.sang : objet.usure < 60 ? couleurs.ocre : couleurs.texteFaible}
                largeur={undefined}
              />
            </View>
          ))
        )}
      </Section>

      {perso.confiance.length ? (
        <Section titre="Ceux que tu as croisés">
          {perso.confiance.map((pnj) => (
            <Ligne
              key={pnj.id}
              gauche={`${pnj.nom} · ${etiquettes.statuts[pnj.statut] ?? pnj.statut}`}
              droite={pnj.valeur > 0 ? `+${pnj.valeur}` : String(pnj.valeur)}
            />
          ))}
        </Section>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  plein: { flex: 1, backgroundColor: couleurs.fond },
  contenu: { padding: espaces.m, paddingBottom: espaces.xl },
  statLigne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 },
  statDroite: { flexDirection: 'row', alignItems: 'center' },
  plus: {
    marginLeft: espaces.m,
    width: 30,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: couleurs.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusTexte: { color: couleurs.accent, fontSize: 18, lineHeight: 20 },
  competence: {
    borderWidth: 1,
    borderColor: couleurs.bordureVive,
    borderRadius: 4,
    padding: espaces.m,
    marginBottom: espaces.s,
  },
  competenceNom: { fontSize: 15, color: couleurs.accent, marginBottom: 2 },
  charge: { marginBottom: espaces.m },
  objet: { paddingVertical: 7, borderTopWidth: 1, borderTopColor: couleurs.bordure },
  objetTete: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 },
  objetNom: { fontSize: 14.5, color: couleurs.texte, flexShrink: 1, marginRight: espaces.s },
  etats: { flexDirection: 'row', flexWrap: 'wrap', marginTop: espaces.s },
  etat: {
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: couleurs.sang,
    borderWidth: 1,
    borderColor: couleurs.sang,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 5,
    marginTop: 4,
  },
});
