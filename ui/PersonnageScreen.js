import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from './theme';
import {
  capacitePort,
  etatsActifs,
  poidsPorte,
  porteeObservation,
  santeMax,
  xpProchainNiveau,
} from '../engine/derive';

// Ce que chaque stat gouverne concrètement — jamais un chiffre nu.
const STATS = [
  {
    cle: 'vigueur',
    nom: 'Vigueur',
    gouverne: 'Santé maximale, capacité de port, tout ce qui se règle au corps à corps.',
  },
  {
    cle: 'adresse',
    nom: 'Adresse',
    gouverne: 'Tir à l’arc, déplacement silencieux, gestes qui demandent de la précision.',
  },
  {
    cle: 'perception',
    nom: 'Perception',
    gouverne: 'Ce que vous voyez quand vous observez, et ce que vous remarquez sans chercher.',
  },
  {
    cle: 'sang_froid',
    nom: 'Sang-froid',
    gouverne: 'Résistance à la pression, poids de votre parole face à quelqu’un qui hésite.',
  },
];

const COMPETENCES = {
  lire_le_bois: {
    nom: 'Lire le bois',
    texte:
      'Vous distinguez ce qu’un bois devrait faire de ce qu’il fait. Une observation de moins vous suffit pour savoir si un endroit est habité.',
  },
};

const ETATS = {
  blesse_leger: {
    nom: 'Blessé',
    effet: 'Les efforts coûtent davantage. Certaines options de force disparaissent.',
  },
  blesse_jambe: {
    nom: 'Jambe touchée',
    effet: 'Chaque déplacement ajoute de la fatigue. Toute fuite est plus chère.',
  },
  epuise: {
    nom: 'Épuisé',
    effet:
      'Vous percevez moins de détails et la narration se resserre. Passé un certain point, chaque moment qui passe vous prend de la santé.',
  },
  affame: {
    nom: 'Affamé',
    effet:
      'La nourriture passe devant tout le reste, y compris dans ce que vous remarquez. Si vous ne mangez pas, le corps se sert sur vous.',
  },
};

function Ligne({ gauche, droite }) {
  return (
    <View style={s.ligne}>
      <Text style={T.petit}>{gauche}</Text>
      <Text style={[T.petit, { color: C.texte }]}>{droite}</Text>
    </View>
  );
}

export default function PersonnageScreen({ etat, onAttribuer }) {
  const max = santeMax(etat);
  const seuil = xpProchainNiveau(etat.heros.niveau);
  const actifs = etatsActifs(etat);
  const points = etat.heros.points_stat_disponibles;

  return (
    <ScrollView style={s.ecran} contentContainerStyle={s.contenu}>
      <Text style={s.section}>Progression</Text>
      <View style={s.carte}>
        <Ligne gauche="Niveau" droite={`${etat.heros.niveau} / 5`} />
        <Ligne
          gauche="Expérience"
          droite={seuil === Infinity ? `${etat.heros.xp}` : `${etat.heros.xp} / ${seuil}`}
        />
        {seuil !== Infinity && (
          <View style={s.barre}>
            <View
              style={[
                s.barreRemplie,
                { width: `${Math.min(100, (etat.heros.xp / seuil) * 100)}%` },
              ]}
            />
          </View>
        )}
        {points > 0 && (
          <Text style={s.alerte}>
            {points} point{points > 1 ? 's' : ''} de caractéristique à attribuer.
          </Text>
        )}
      </View>

      <Text style={s.section}>Caractéristiques</Text>
      {STATS.map((stat) => (
        <View key={stat.cle} style={s.carte}>
          <View style={s.ligne}>
            <Text style={s.statNom}>{stat.nom}</Text>
            <View style={s.statDroite}>
              <Text style={s.statValeur}>{etat.heros.stats[stat.cle]}</Text>
              {points > 0 && (
                <Pressable style={s.plus} onPress={() => onAttribuer(stat.cle)}>
                  <Text style={s.plusTexte}>+</Text>
                </Pressable>
              )}
            </View>
          </View>
          <Text style={[T.petit, { marginTop: 4 }]}>{stat.gouverne}</Text>
        </View>
      ))}

      <Text style={s.section}>Effets dérivés</Text>
      <View style={s.carte}>
        <Ligne gauche="Santé" droite={`${etat.heros.sante} / ${max}`} />
        <Ligne
          gauche="Capacité de port"
          droite={`${poidsPorte(etat).toFixed(1)} / ${capacitePort(etat)}`}
        />
        <Ligne
          gauche="Portée d’observation"
          droite={
            ['sommaire', 'sommaire', 'correcte', 'bonne', 'fine', 'très fine'][
              Math.min(5, porteeObservation(etat))
            ]
          }
        />
        <Text style={[T.minuscule, { marginTop: ESP.s }]}>
          Aucune de ces valeurs n’est stockée : elles se recalculent à partir des
          caractéristiques et de ce que vous portez.
        </Text>
      </View>

      <Text style={s.section}>État</Text>
      <View style={s.carte}>
        {actifs.length === 0 ? (
          <Text style={T.petit}>Rien à signaler. Vous tenez.</Text>
        ) : (
          actifs.map((cle) => (
            <View key={cle} style={{ marginBottom: ESP.s }}>
              <Text style={s.etatNom}>{ETATS[cle]?.nom || cle}</Text>
              <Text style={T.petit}>{ETATS[cle]?.effet}</Text>
            </View>
          ))
        )}
      </View>

      <Text style={s.section}>Compétences</Text>
      <View style={s.carte}>
        {etat.heros.competences.length === 0 ? (
          <Text style={T.petit}>
            Aucune. La première s’acquiert au niveau 5.
          </Text>
        ) : (
          etat.heros.competences.map((cle) => (
            <View key={cle} style={{ marginBottom: ESP.s }}>
              <Text style={s.etatNom}>{COMPETENCES[cle]?.nom || cle}</Text>
              <Text style={T.petit}>{COMPETENCES[cle]?.texte}</Text>
            </View>
          ))
        )}
      </View>
      <View style={{ height: ESP.xl }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  contenu: { padding: ESP.m },
  section: { ...T.soustitre, marginTop: ESP.m, marginBottom: ESP.s, color: C.accentSourd },
  carte: {
    backgroundColor: C.fondCarte,
    borderWidth: 1,
    borderColor: C.bordure,
    borderRadius: 3,
    padding: ESP.m,
    marginBottom: ESP.s,
  },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statNom: { ...T.corps, color: C.texteFort, fontWeight: '600' },
  statDroite: { flexDirection: 'row', alignItems: 'center', gap: ESP.s },
  statValeur: { ...T.titre, fontSize: 19, color: C.accent },
  plus: {
    borderWidth: 1,
    borderColor: C.accent,
    borderRadius: 3,
    width: 30,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusTexte: { color: C.accent, fontSize: 16, fontWeight: '700', lineHeight: 18 },
  barre: { height: 3, backgroundColor: C.bordure, borderRadius: 2, marginTop: ESP.s },
  barreRemplie: { height: 3, backgroundColor: C.accentSourd, borderRadius: 2 },
  alerte: { ...T.petit, color: C.accent, marginTop: ESP.s },
  etatNom: { ...T.corps, color: C.texteFort },
});
