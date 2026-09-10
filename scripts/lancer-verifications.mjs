// Point d'entrée unique des vérifications : valide le contenu, puis simule
// des parties entières pour contrôler les invariants du moteur.
// Les fichiers ESM du projet sont recopiés dans un dossier temporaire marqué
// `type: module`, ce qui permet de les exécuter sous Node sans toucher au
// paquet Expo (Metro, lui, les charge très bien tels quels).

import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const bac = join(tmpdir(), 'vdg-verifications');

rmSync(bac, { recursive: true, force: true });
mkdirSync(bac, { recursive: true });
for (const dossier of ['engine', 'content', 'scripts']) {
  cpSync(join(racine, dossier), join(bac, dossier), { recursive: true });
}
writeFileSync(join(bac, 'package.json'), '{"type":"module"}\n');

// Bouchon de stockage : le moteur de sauvegarde parle à AsyncStorage, qui
// n'existe que sur l'appareil. On lui en donne un équivalent en mémoire pour
// pouvoir vérifier le cycle complet hors téléphone.
const bouchon = join(bac, 'node_modules', '@react-native-async-storage', 'async-storage');
mkdirSync(bouchon, { recursive: true });
writeFileSync(
  join(bouchon, 'package.json'),
  JSON.stringify({ name: '@react-native-async-storage/async-storage', version: '0.0.0-bouchon', type: 'module', main: 'index.js' })
);
writeFileSync(
  join(bouchon, 'index.js'),
  [
    'const boite = new Map();',
    'export default {',
    '  async setItem(cle, valeur) { boite.set(cle, valeur); },',
    '  async getItem(cle) { return boite.has(cle) ? boite.get(cle) : null; },',
    '  async removeItem(cle) { boite.delete(cle); },',
    '};',
  ].join('\n')
);

const lancer = (script, ...args) =>
  execFileSync(process.execPath, [join(bac, 'scripts', script), ...args], { stdio: 'inherit' });

console.log('— validation du contenu —');
lancer('valider-contenu.mjs');
console.log('\n— simulation, jeu aléatoire (invariants) —');
lancer('simuler.mjs', '400', 'aleatoire');
console.log('\n— simulation, jeu raisonnable (équilibrage) —');
lancer('simuler.mjs', '400', 'raisonnable');
console.log('\n— combat narratif, exploration exhaustive —');
lancer('verifier-combat.mjs');
console.log('\n— sauvegarde, relecture et migrations —');
lancer('verifier-sauvegarde.mjs');
