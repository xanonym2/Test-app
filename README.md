# Val-de-Garde

Jeu narratif à storylets pour Android. Partie courte et rejouable, permadeath,
aucune progression entre les parties : seule la connaissance du joueur persiste.

Expo / React Native, sauvegarde locale, aucune dépendance réseau,
aucune API externe.

## Organisation

```
/engine    moteur : état, conditions, effets, résolution, temps, sauvegarde
/content   données : storylets, objets, créatures, PNJ, zones, libellés
/ui        écrans et composants
/outils    vérificateur de contenu et parties automatiques
```

Le moteur ne contient **aucun** texte narratif : il ne manipule que des
identifiants. Tout ce qui s'affiche vient de `/content`, injecté au démarrage
par `content/index.js` via `setDb()`.

`content/CONTRAT.md` est la spécification mécanique du contenu : espaces
d'identifiants, schéma de storylet, opérateurs de conditions, formes d'effets,
valeurs d'équilibrage et règles de style. Toute nouvelle scène s'y conforme.

## Vérifier le contenu

```bash
npm run verif
```

Contrôle les références croisées (objets, PNJ, points, storylets, clés de
journal), les opérateurs et formes d'effets inconnus, les règles de contenu
non négociables (une sortie par tour, 3-5 options, deux issues minimum sur une
option risquée, aucun storylet sans effet), les plafonds de longueur et les
formules d'ambiance bannies. Puis joue trente parties automatiques de bout en
bout et rapporte durée, niveau atteint, scènes vues, savoir et badges.

Le vérificateur n'imprime jamais de texte narratif : uniquement des
identifiants et des compteurs.

## Lancer en développement

```bash
npm install
npx expo start
```

## Construire un APK

### 1. GitHub Actions (aucun compte Expo requis)

`.github/workflows/android-apk.yml` vérifie le contenu, prébuild le projet
natif, lance `./gradlew assembleRelease` et publie deux APK — un `arm64`
(tout téléphone récent) et un `universal` (32 bits et émulateurs) — comme
artefact de run et comme asset de release.

La release est signée avec le keystore de debug du gabarit : installable
immédiatement, à remplacer par un keystore propre avant toute distribution
réelle.

### 2. EAS Build (compte Expo gratuit requis)

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
```

Le profil `preview` est déjà réglé sur `buildType: "apk"` et distribution
interne.

## Sauvegarde

Automatique à chaque décision validée, dans le stockage local de l'appareil.
Le paquet est versionné (`engine/schema.js`, `VERSION_SAUVEGARDE`) et
`engine/save.js` porte la chaîne de migrations. Une sauvegarde plus récente
que le binaire est refusée plutôt que corrompue.
