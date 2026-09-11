import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { C, ESP, T } from './theme';
import { capacitePort, defObjet, nomAffiche, palierUsure, poidsPorte } from '../engine/derive';
import { FAMILLES_ARME, modificateursDe } from '../content/objets';

const CATEGORIES = [
  { cle: 'arme', nom: 'Armes' },
  { cle: 'munition', nom: 'Munitions' },
  { cle: 'protection', nom: 'Protections' },
  { cle: 'consommable', nom: 'Consommables' },
  { cle: 'contenant', nom: 'Contenants' },
  { cle: 'ressource', nom: 'Ressources' },
  { cle: 'divers', nom: 'Divers' },
];

function BarreUsure({ valeur }) {
  const palier = palierUsure(valeur);
  return (
    <View style={s.usureLigne}>
      <View style={s.usureBarre}>
        <View
          style={[
            s.usureRemplie,
            { width: `${Math.max(2, valeur)}%`, backgroundColor: couleurPalier(palier.cle) },
          ]}
        />
      </View>
      <Text style={[T.minuscule, { color: couleurPalier(palier.cle) }]}>{palier.nom}</Text>
    </View>
  );
}

function couleurPalier(cle) {
  if (cle === 'neuf' || cle === 'bon') return C.texteFaible;
  if (cle === 'marque') return C.faim;
  return C.alerte;
}

export default function InventaireScreen({ etat, onEquiper, onJeter, onReparer, onConsommer }) {
  const [ouvert, setOuvert] = useState(null);
  const porte = poidsPorte(etat);
  const capacite = capacitePort(etat);
  const surcharge = porte > capacite;

  const parCategorie = CATEGORIES.map((cat) => ({
    ...cat,
    lignes: etat.inventaire.objets.filter((l) => defObjet(l.id).categorie === cat.cle),
  })).filter((c) => c.lignes.length > 0);

  const armeEquipee = etat.inventaire.objets.find((l) => l.id === etat.inventaire.equipe.arme);

  return (
    <ScrollView style={s.ecran} contentContainerStyle={s.contenu}>
      <View style={[s.poids, surcharge && s.poidsAlerte]}>
        <View style={s.ligne}>
          <Text style={T.petit}>Porté</Text>
          <Text style={[T.corps, surcharge && { color: C.alerte }]}>
            {porte.toFixed(1)} / {capacite}
          </Text>
        </View>
        <View style={s.barre}>
          <View
            style={[
              s.barreRemplie,
              {
                width: `${Math.min(100, (porte / capacite) * 100)}%`,
                backgroundColor: surcharge ? C.alerte : C.accentSourd,
              },
            ]}
          />
        </View>
        {surcharge && (
          <Text style={[T.petit, { color: C.alerte, marginTop: 6 }]}>
            Vous portez trop. Le pas ralentit, la fatigue vient plus vite, et vous ne
            courrez pas.
          </Text>
        )}
      </View>

      {parCategorie.map((cat) => (
        <View key={cat.cle}>
          <Text style={s.section}>{cat.nom}</Text>
          {cat.lignes.map((ligne, index) => {
            const def = defObjet(ligne.id);
            const cle = `${ligne.id}:${index}`;
            const estOuvert = ouvert === cle;
            const equipee =
              etat.inventaire.equipe.arme === ligne.id ||
              etat.inventaire.equipe.protection === ligne.id;

            return (
              <Pressable
                key={cle}
                style={[s.carte, equipee && s.carteEquipee]}
                onPress={() => setOuvert(estOuvert ? null : cle)}
              >
                <View style={s.ligne}>
                  <Text style={[T.corps, { color: C.texteFort, flex: 1 }]}>
                    {nomAffiche(ligne)}
                    {ligne.quantite > 1 ? `  ×${ligne.quantite}` : ''}
                    {ligne.id === 'outre' ? (ligne.plein ? '  · pleine' : '  · vide') : ''}
                  </Text>
                  <Text style={T.minuscule}>
                    {(def.poids * ligne.quantite).toFixed(1)}
                  </Text>
                </View>
                {equipee && <Text style={s.porteTag}>porté</Text>}
                {def.categorie !== 'consommable' && def.categorie !== 'munition' && (
                  <BarreUsure valeur={ligne.usure} />
                )}

                {estOuvert && (
                  <View style={s.detail}>
                    <Text style={T.petit}>{def.detail}</Text>

                    {def.famille && (
                      <Text style={[T.petit, { marginTop: 6 }]}>
                        {FAMILLES_ARME[def.famille].nom} — {FAMILLES_ARME[def.famille].resume}
                      </Text>
                    )}
                    {def.degats ? (
                      <Text style={[T.petit, { marginTop: 6 }]}>
                        Entame : {def.degats}
                        {armeEquipee && armeEquipee.id !== ligne.id && def.categorie === 'arme'
                          ? `  (portée actuellement : ${defObjet(armeEquipee.id).degats ?? 0})`
                          : ''}
                      </Text>
                    ) : null}
                    {def.armure ? (
                      <Text style={[T.petit, { marginTop: 6 }]}>Encaisse : {def.armure}</Text>
                    ) : null}
                    {def.faim ? (
                      <Text style={[T.petit, { marginTop: 6 }]}>
                        Nourrit : {Math.abs(def.faim)}
                      </Text>
                    ) : null}
                    {def.soin ? (
                      <Text style={[T.petit, { marginTop: 6 }]}>Soigne : {def.soin}</Text>
                    ) : null}

                    {modificateursDe(ligne).map(([nom]) => (
                      <Text key={nom} style={[T.petit, { marginTop: 6, color: C.accent }]}>
                        {nom}
                      </Text>
                    ))}

                    <View style={s.actions}>
                      {(def.categorie === 'arme' || def.categorie === 'protection') && !equipee && (
                        <Pressable style={s.action} onPress={() => onEquiper(ligne.id)}>
                          <Text style={s.actionTexte}>Porter</Text>
                        </Pressable>
                      )}
                      {def.categorie === 'consommable' && (
                        <Pressable style={s.action} onPress={() => onConsommer(ligne.id)}>
                          <Text style={s.actionTexte}>
                            {def.soin ? 'Se soigner' : 'Manger'}
                          </Text>
                        </Pressable>
                      )}
                      {def.categorie !== 'consommable' && ligne.usure < 70 && (
                        <Pressable style={s.action} onPress={() => onReparer(ligne.id)}>
                          <Text style={s.actionTexte}>Réparer</Text>
                        </Pressable>
                      )}
                      <Pressable style={s.action} onPress={() => onJeter(ligne.id)}>
                        <Text style={s.actionTexte}>Jeter</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
      <View style={{ height: ESP.xl }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  ecran: { flex: 1, backgroundColor: C.fond },
  contenu: { padding: ESP.m },
  ligne: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  poids: {
    backgroundColor: C.fondCarte,
    borderWidth: 1,
    borderColor: C.bordure,
    borderRadius: 3,
    padding: ESP.m,
  },
  poidsAlerte: { borderColor: C.alerte },
  barre: { height: 3, backgroundColor: C.bordure, borderRadius: 2, marginTop: ESP.s },
  barreRemplie: { height: 3, borderRadius: 2 },
  section: { ...T.soustitre, marginTop: ESP.m, marginBottom: ESP.s, color: C.accentSourd },
  carte: {
    backgroundColor: C.fondCarte,
    borderWidth: 1,
    borderColor: C.bordure,
    borderRadius: 3,
    padding: ESP.m,
    marginBottom: 6,
  },
  carteEquipee: { borderColor: C.accentSourd },
  porteTag: { ...T.minuscule, color: C.accent, marginTop: 2 },
  usureLigne: { flexDirection: 'row', alignItems: 'center', gap: ESP.s, marginTop: 8 },
  usureBarre: { flex: 1, height: 2, backgroundColor: C.bordure, borderRadius: 1 },
  usureRemplie: { height: 2, borderRadius: 1 },
  detail: { marginTop: ESP.m, borderTopWidth: 1, borderTopColor: C.bordure, paddingTop: ESP.s },
  actions: { flexDirection: 'row', gap: ESP.s, marginTop: ESP.m },
  action: {
    borderWidth: 1,
    borderColor: C.bordureVive,
    borderRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: ESP.m,
  },
  actionTexte: { ...T.petit, color: C.texte },
});
