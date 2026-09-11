// Écran inventaire : groupé par catégorie, usure lisible par palier nommé,
// poids par objet et total porté / capacité, détail et comparaison.
import { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';
import { T, ESP, TYPO } from '../theme.js';
import { Page, Panneau, Titre, SousTitre, Ligne, Jauge, Petit, Bouton, Etiquette, Separateur, Vide } from '../components/Base.js';
import { getDb } from '../../engine/db.js';
import { encombrement, objetBase, modificateursObjet, degatsArme, palierUsure, poidsObjet } from '../../engine/derive.js';
import { CATEGORIES_OBJET } from '../../engine/schema.js';
import { nomObjet, etatUsure, poidsTexte } from '../format.js';
import { useJeu } from '../jeu.js';

function Usure({ item }) {
  const u = etatUsure(item);
  if (!u) return null;
  const couleur = u.ratio > 0.6 ? T.ok : u.ratio > 0.35 ? T.faim : T.danger;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
      <View style={{ width: 44 }}>
        <Jauge valeur={u.ratio} max={1} couleur={couleur} hauteur={3} />
      </View>
      <Text style={[TYPO.minuscule, { marginLeft: 7, color: couleur }]}>{u.nom}</Text>
    </View>
  );
}

function LigneObjet({ item, equipe, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row', alignItems: 'flex-start', paddingVertical: ESP.sm,
        borderBottomWidth: 1, borderBottomColor: T.bord, opacity: pressed ? 0.7 : 1,
      })}
    >
      <View style={{ flex: 1, paddingRight: ESP.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[TYPO.corps, { fontSize: 15, flexShrink: 1 }]} numberOfLines={1}>
            {nomObjet(item)}{(item.quantite ?? 1) > 1 ? '  ×' + item.quantite : ''}
          </Text>
          {equipe ? <Etiquette couleur={T.accent} style={{ marginLeft: 7 }}>porté</Etiquette> : null}
        </View>
        <Usure item={item} />
      </View>
      <Text style={[TYPO.minuscule, { paddingTop: 3 }]}>{poidsTexte(item)}</Text>
    </Pressable>
  );
}

function Detail({ item, E, fermer, actions }) {
  const db = getDb();
  const base = objetBase(item);
  const mods = modificateursObjet(item);
  const l = db.libelles;
  const u = etatUsure(item);
  const estArme = base.categorie === 'arme';
  const armeEquipee = E.inventaire.find((i) => i.uid === E.equipement.arme);
  const comparaison = estArme && armeEquipee && armeEquipee.uid !== item.uid
    ? degatsArme(item, E.heros.stats) - degatsArme(armeEquipee, E.heros.stats)
    : null;
  const equipable = base.categorie === 'arme' || base.categorie === 'protection';
  const equipe = E.equipement.arme === item.uid || E.equipement.protection === item.uid;

  return (
    <Modal visible transparent animationType="fade" onRequestClose={fermer}>
      <Pressable onPress={fermer} style={{ flex: 1, backgroundColor: '#000000BB', justifyContent: 'flex-end' }}>
        <Pressable
          onPress={() => {}}
          style={{ backgroundColor: T.fond2, borderTopWidth: 1, borderColor: T.bordFort, borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: ESP.lg, maxHeight: '86%' }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={[TYPO.titre, { fontSize: 18 }]}>{nomObjet(item)}</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 6, marginBottom: ESP.md, flexWrap: 'wrap' }}>
              <Etiquette>{l.categories?.[base.categorie] ?? base.categorie}</Etiquette>
              {base.famille ? <Etiquette>{l.familles?.[base.famille] ?? base.famille}</Etiquette> : null}
              {u ? <Etiquette couleur={u.ratio > 0.6 ? T.ok : u.ratio > 0.35 ? T.faim : T.danger}>{u.nom}</Etiquette> : null}
            </View>

            <Text style={[TYPO.petit, { color: T.texteDoux, marginBottom: ESP.md }]}>{base.description}</Text>

            <Panneau plat style={{ borderWidth: 1, borderColor: T.bord, padding: ESP.md }}>
              {estArme ? <Ligne gauche="Dégâts effectifs" droite={degatsArme(item, E.heros.stats)} /> : null}
              {base.protection ? <Ligne gauche="Protection" droite={base.protection} /> : null}
              <Ligne gauche="Poids" droite={poidsTexte(item)} />
              {comparaison !== null ? (
                <Ligne
                  gauche="Comparé à l’arme portée"
                  droite={(comparaison > 0 ? '+' : '') + comparaison}
                  doux={comparaison === 0}
                />
              ) : null}
            </Panneau>

            {mods.length ? (
              <>
                <SousTitre>Particularités</SousTitre>
                {mods.map((m) => (
                  <View key={m.id} style={{ marginBottom: ESP.sm }}>
                    <Text style={[TYPO.corps, { fontSize: 14, color: T.accent }]}>{m.nom}</Text>
                    {m.note ? <Petit>{m.note}</Petit> : null}
                  </View>
                ))}
              </>
            ) : null}

            <Separateur />

            <View style={{ gap: ESP.sm }}>
              {equipable ? (
                <Bouton variante={equipe ? 'normal' : 'fort'} onPress={() => { actions.equiper(item.uid); fermer(); }}>
                  {equipe ? 'Ranger' : 'Équiper'}
                </Bouton>
              ) : null}
              {base.effets_consommation ? (
                <Bouton variante="fort" onPress={() => { actions.utiliser(item.uid); fermer(); }}>Utiliser</Bouton>
              ) : null}
              {u && item.usure < 100 ? (
                <Bouton onPress={() => { actions.reparer(item.uid); fermer(); }}>
                  Réparer (matériaux)
                </Bouton>
              ) : null}
              <Bouton variante="discret" onPress={() => { actions.jeter(item.uid); fermer(); }}>Jeter</Bouton>
              <Bouton variante="discret" onPress={fermer}>Fermer</Bouton>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function EcranInventaire() {
  const { E, equiper, jeter, utiliser, reparer } = useJeu();
  const [ouvert, setOuvert] = useState(null);
  const db = getDb();
  const enc = encombrement(E);
  const item = ouvert ? E.inventaire.find((i) => i.uid === ouvert) : null;

  return (
    <Page>
      <Titre>Inventaire</Titre>

      <Panneau style={enc.surcharge ? { borderColor: T.danger } : null}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={TYPO.petit}>Charge portée</Text>
          <Text style={[TYPO.nombre, { fontSize: 13, color: enc.surcharge ? T.danger : T.texte }]}>
            {enc.porte.toFixed(1).replace('.', ',')} / {enc.capacite} kg
          </Text>
        </View>
        <Jauge valeur={Math.min(enc.porte, enc.capacite)} max={enc.capacite} couleur={enc.surcharge ? T.danger : T.accentDoux} hauteur={5} />
        {enc.surcharge ? (
          <Petit style={{ color: T.danger, marginTop: 7 }}>
            Dépassement de {enc.depassement.toFixed(1).replace('.', ',')} kg. Le pas ralentit et la fatigue monte plus vite.
          </Petit>
        ) : null}
      </Panneau>

      {CATEGORIES_OBJET.map((cat) => {
        const liste = E.inventaire.filter((i) => i.categorie === cat);
        if (!liste.length) return null;
        return (
          <Panneau key={cat} plat>
            <SousTitre>{db.libelles.categories?.[cat] ?? cat}</SousTitre>
            {liste.map((i) => (
              <LigneObjet
                key={i.uid}
                item={i}
                equipe={E.equipement.arme === i.uid || E.equipement.protection === i.uid}
                onPress={() => setOuvert(i.uid)}
              />
            ))}
          </Panneau>
        );
      })}

      {E.inventaire.length === 0 ? <Vide>Les mains vides.</Vide> : null}

      {item ? (
        <Detail
          item={item}
          E={E}
          fermer={() => setOuvert(null)}
          actions={{ equiper, jeter, utiliser, reparer }}
        />
      ) : null}
    </Page>
  );
}
