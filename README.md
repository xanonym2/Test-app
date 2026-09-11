# Val-de-Garde — MVP jouable

Jeu narratif à storylets, en français, jouable sur téléphone Android.
Environ 30 à 40 minutes de jeu pour la zone 1.

## Organisation

Le moteur et le contenu sont strictement séparés. **Le moteur ne contient pas
une ligne de texte narratif.**

```
/engine     état, conditions, effets, temps, résolution des storylets, sauvegarde
/content    storylets, objets, créatures, PNJ, zones, carnet, écran d'ouverture
/ui         écrans et composants
/tools      validateur de contenu (ne fait pas partie de l'application)
```

### Moteur (`/engine`)

| Fichier | Rôle |
|---|---|
| `state.js` | modèle d'état, version de sauvegarde, migrations |
| `conditions.js` | évaluation du DSL de conditions (`{ flag: … }`, `{ stat: …, ">=": 3 }`, `non`, `ou`, `et`) |
| `effets.js` | application des effets d'une issue |
| `derive.js` | tout ce qui se calcule et ne se stocke jamais (santé max, portage, paliers d'usure) |
| `temps.js` | six segments par jour, météo, coût du temps sur le corps |
| `moteur.js` | sélection des storylets, machine à états locale, voyage, différés |
| `sauvegarde.js` | persistance locale versionnée |

### Contenu (`/content`)

25 storylets, 92 options, 130 issues, 101 variantes de texte conditionnelles.
Le format complet d'un storylet est décrit dans les fichiers de
`content/storylets/` ; chacun expose `texte.arrivee` (première visite),
`texte.base` (visites suivantes) et des `variantes` conditionnées par l'état,
la météo, le moment de la journée ou le registre physique du héros.

## Lancer en développement

```bash
npm install
npx expo start
```

## Valider le contenu

Vérifie la cohérence des identifiants, la présence d'une sortie dans chaque
scène, les références croisées (objets, entrées de carnet, storylets
déclenchés), puis simule 120 parties pour mesurer l'accessibilité et
l'équilibrage.

```bash
npm run valider
```

## Produire un APK

Deux chemins indépendants donnent le même résultat : un APK qu'on installe
directement, sans compte Google Play.

### 1. GitHub Actions (aucun compte Expo nécessaire)

`.github/workflows/android-apk.yml` se déclenche à chaque poussée sur la
branche de travail, et peut être lancé à la main depuis l'onglet Actions. Il
publie l'APK deux fois :

- comme artefact de workflow (`val-de-garde-apk`)
- comme asset de release (`apk-build-<numéro>`), pour un lien direct

La build de release est signée avec le keystore de debug du gabarit, ce qui
la rend installable immédiatement. Avant toute distribution réelle, générer
un keystore propre : la clé de debug est publique et identique pour tout le
monde.

### 2. EAS Build (compte Expo gratuit)

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```
