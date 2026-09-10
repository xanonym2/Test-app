# Val-de-Garde — MVP jouable

Jeu narratif à storylets, jouable sur téléphone Android. Environ 30 minutes de
jeu, une zone, une sortie. Ce n'est pas une démo commerciale : c'est un test de
mécanique et de ressenti.

## Architecture

Le moteur ne contient aucun texte narratif. Tout le contenu vit dans des
fichiers de données séparés, ce qui permettra plus tard de rhabiller le jeu
pour une autre plateforme sans y toucher.

```
/engine    état, conditions, effets, temps, inventaire, storylets, sauvegarde
/content   zones, objets, modificateurs, créatures, PNJ, compétences, storylets
/ui        thème, bandeau d'état, écrans scène / carte / personnage
/scripts   validation du contenu et simulation de parties
```

| Fichier | Rôle |
|---|---|
| `engine/etat.js` | modèle d'état, valeurs dérivées, version de sauvegarde |
| `engine/conditions.js` | évaluation des conditions (tableau d'atomes, `ou` / `non`) |
| `engine/effets.js` | application des effets — seule voie de mutation depuis le contenu |
| `engine/storylets.js` | sélection, machine à états locale, résolution des issues |
| `engine/temps.js` | jour, segments 1-6, fatigue, faim, bilan de fin de journée |
| `engine/inventaire.js` | usure par paliers, préfixes / suffixes, encombrement |
| `engine/sauvegarde.js` | sauvegarde locale versionnée + migrations |
| `engine/partie.js` | seule surface appelée par l'interface |

### Trois règles tenues dès le premier jour

1. **Identifiants stables** — zones, objets, PNJ et storylets ont un id technique
   qui ne change jamais, indépendant du nom affiché.
2. **Sauvegarde versionnée** — `version_sauvegarde` + table `MIGRATIONS` dans
   `engine/sauvegarde.js`. Une sauvegarde sans chemin de migration est refusée
   plutôt que chargée de travers.
3. **Rien de calculable n'est stocké** — santé max, capacité de port, poids
   porté et bonus sont recalculés à chaque lecture.

## Vérifications

```bash
npm run verifier
```

Quatre passes, sans jamais afficher le texte du jeu :

- **validation du contenu** — références d'objets, de PNJ, de lieux et de
  storylets existantes ; sortie disponible ; option d'observation là où il y a
  du risque ; différés résolus sur un lieu ou un événement, jamais sur un délai.
- **simulation** — 800 parties complètes. Le mode aléatoire contrôle les
  invariants du moteur (3 à 5 options par tour, une sortie toujours offerte,
  aucun tour sans effet) ; le mode raisonnable donne les repères d'équilibrage.
- **combat narratif** — exploration exhaustive de toutes les suites de choix
  jusqu'à six tours, sur plusieurs graines : la scène se referme toujours et
  aucun état local n'y devient absurde.
- **sauvegarde** — écriture, relecture au bit près, reprise sur la même scène
  au même tour, refus d'une sauvegarde plus récente que le moteur, et chaîne de
  migration exercée dans les deux cas (présente et absente).

## Développement

```bash
npm install
npx expo start
```

## APK Android

### 1. GitHub Actions (aucun compte Expo nécessaire)

`.github/workflows/android-apk.yml` se déclenche à chaque push sur la branche de
travail, et se lance à la main depuis l'onglet Actions. Il valide le contenu,
prébuild le projet natif, lance `./gradlew assembleRelease`, puis publie l'APK :

- comme artefact de workflow (`val-de-garde-apk`)
- comme *release* GitHub (`apk-build-<numéro>`), pour un lien direct

La release est signée avec la clé de debug du template — c'est ce qui rend l'APK
installable immédiatement. Avant toute distribution réelle, générer sa propre
clé : la clé de debug est publique et identique pour tout le monde.

### 2. EAS Build (compte Expo gratuit)

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

Le profil `preview` est déjà réglé sur `buildType: "apk"` en distribution
interne.
