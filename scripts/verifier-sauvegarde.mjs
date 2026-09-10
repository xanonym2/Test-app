// Vérifie le cycle sauvegarde → relecture → migration → reprise au même point.
import { catalogue } from '../content/index.js';
import { nouvellePartie, choisir, vueScene, fermerScene } from '../engine/partie.js';
import { sauvegarder, charger, migrer, MIGRATIONS } from '../engine/sauvegarde.js';
import { VERSION_SAUVEGARDE } from '../engine/etat.js';

let etat = nouvellePartie(catalogue, 4242);
for (let i = 0; i < 6; i += 1) {
  const vue = vueScene(etat, catalogue);
  if (!vue) break;
  if (vue.terminee) { etat = fermerScene(etat, catalogue); continue; }
  etat = choisir(etat, vue.options[0].id, catalogue);
}

const avant = JSON.stringify(etat);
await sauvegarder(etat);
const relu = await charger();
if (!relu.ok) { console.error('échec de relecture :', relu.raison); process.exit(1); }
if (JSON.stringify(relu.etat) !== avant) { console.error('l’état relu diffère de l’état sauvegardé'); process.exit(1); }
console.log(`version de sauvegarde : ${VERSION_SAUVEGARDE}`);
console.log('relecture identique au bit près : oui');

// Reprise exactement au même point.
const vueAvant = vueScene(etat, catalogue);
const vueApres = vueScene(relu.etat, catalogue);
console.log('scène reprise :', vueApres?.id === vueAvant?.id ? 'même storylet, même tour' : 'DIVERGENTE');
if (JSON.stringify(vueAvant) !== JSON.stringify(vueApres)) { console.error('la vue reprise diffère'); process.exit(1); }

// Refus d'une sauvegarde plus récente que le moteur.
const futur = migrer({ ...JSON.parse(avant), version_sauvegarde: VERSION_SAUVEGARDE + 1 });
console.log('sauvegarde plus récente refusée :', futur.ok === false ? futur.raison : 'NON — problème');

// Une migration factice prouve que la chaîne fonctionne.
MIGRATIONS[VERSION_SAUVEGARDE] = (e) => ({ ...e, migre: true, version_sauvegarde: VERSION_SAUVEGARDE });
const ancien = migrer({ ...JSON.parse(avant), version_sauvegarde: VERSION_SAUVEGARDE - 1 });
console.log('migration depuis une version antérieure :', ancien.ok && ancien.etat.migre ? 'appliquée' : 'ÉCHEC');
if (!ancien.ok) process.exit(1);

// Une sauvegarde sans chemin de migration est refusée, pas chargée de travers.
delete MIGRATIONS[VERSION_SAUVEGARDE];
const orphelin = migrer({ ...JSON.parse(avant), version_sauvegarde: VERSION_SAUVEGARDE - 1 });
console.log('sans chemin de migration :', orphelin.ok === false ? orphelin.raison : 'NON — problème');
