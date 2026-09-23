# Mission — Étape 1 : préparation

Le `CLAUDE.md` que tu viens de lire remplace celui chargé en début de session :
c'est lui qui fait foi, y compris sur la levée de la non-divulgation.

**Cette mission ne touche à aucun texte narratif.** Elle prépare le terrain : le
kit en place, la version web, les nouveaux contrôles, le relevé du moteur.

---

## 1. Point de départ

`npm run verif` avant toute modification du code. Garde le bloc de résultats tel
quel : c'est la référence.

## 2. Le kit

- Vérifie qu'il est en place : `CLAUDE.md`, `content/CONTRAT.md` (v2.1),
  `content/CANON.md`, `docs/PRODUCTION.md`, `docs/prompts/` (3 fichiers),
  `docs/spec/` (9 fichiers).
- Vérifie avec `git status` que rien d'autre n'a été écrasé.
- Dans `content/CONTRAT.md`, la mention « Les specs vivent dans `docs/spec/` —
  🔨 à committer » devient un fait accompli. Signale-le comme modification de
  statut.
- Commit : « Kit de conception : contrat v2.1, specs, production, missions ».

## 3. Garde-fou moteur : l'aléatoire ne tue jamais

Contrat §4, règle 9. Là où le moteur résout une issue : si elle a été tirée par
`probabilite`, la santé du héros ne descend pas sous 1. Quelques lignes dans
`engine/`, aucune dans `content/`. Ajoute au vérificateur un cas qui le prouve.

## 4. Vérificateur — nouveaux contrôles

Implémente les contrôles marqués « étape 1 » dans `docs/PRODUCTION.md` §6, avec la
gravité indiquée : bloquant sur le nouveau contenu, « à revoir » sur l'héritage
v1. Le vérificateur accepte désormais les champs `majeur` (storylet) et
`partielle` (issue).

- Mots rares bannis : *dévers, layon, combe, gibet, nef, cloître*.
- Lexique chrétien banni : *église, chapelle, cierge, messe, prêtre, saint,
  abbaye*.
- Noms périmés : *Mathieu, Joé, Matt, Joe* (mots entiers).
- Mots sensibles, en « à revoir » : *sortilège, emprise, ensorcelé, magie*.

Ensuite : 0 bloquant. Les « à revoir » sur l'héritage v1 sont attendus — liste-les
dans le relevé, sans les corriger.

## 5. La cible web

1. Installe ce que `npx expo export --platform web` réclame — en principe
   `react-dom` et `react-native-web`, avec `npx expo install`. Ce sont des
   dépendances JavaScript pures : c'est la raison forte qu'exige `CLAUDE.md`.
2. `npx expo export --platform web` doit produire `dist/`. Si tu peux, sers
   `dist/` en local et vérifie que la page se charge sans erreur ; sinon, dis-le.
3. `npx expo export --platform android` doit toujours passer.
4. Ajoute un `netlify.toml` : commande `npm run verif && npx expo export --platform web`,
   dossier publié `dist`, et la même version de Node que la CI Android. Un
   contenu cassé ne doit pas plus atteindre le web que l'APK.
5. Le branchement Netlify se fait côté Tom, depuis Safari sur iPhone. Écris dans
   ton message de fin les étapes exactes : compte gratuit, connexion à GitHub,
   choix du dépôt et de la branche `claude/new-session-ftellm`. Si Netlify pose
   problème, propose Cloudflare Pages.

## 6. Le relevé — `docs/RELEVE.md`

Il servira à écrire les fiches de lot de l'étape 3. Il est **factuel** : aucune
recommandation, sauf le classement demandé au point 5.

1. **Volumétrie** : `wc -l` de chaque fichier de `engine/`, `content/`,
   `ui/screens/` et `outils/`.
2. **`engine/schema.js`** en entier.
3. **Mécaniques**, chacune en quelques lignes :
   - comment un départ est choisi au lancement — tirage, ou choix du joueur ;
   - comment le temps avance : segments, jours, nuit, pression de fond ;
   - comment l'état `assoiffe` se déclenche, et ce qu'il fait ;
   - comment se déroule `ST-CBT-01` : état local, lecture de l'adversaire,
     sorties ;
   - ce qui se passe quand la santé du héros tombe à 0 ;
   - comment `fin` mène au bilan.
4. **Barèmes réellement utilisés** par le contenu : fourchettes de `xp`,
   `fatigue`, `faim`, `sante_heros`, quantités d'objets, rendement d'une fouille.
5. **Inventaire des 22 storylets** : identifiant · fichier · lieu · priorité ·
   options · combat · indice · journal · mots. Pour chacun, **propose** un
   classement — récupérable, structure seule, retiré (contrat §4) — avec une
   ligne de justification. Ce n'est qu'une proposition.
6. **Deux storylets en entier** : le plus représentatif d'une scène sans risque,
   et `ST-CBT-01`.
7. **Les « à revoir »** remontés par les nouveaux contrôles sur l'héritage v1.

## 7. Clôture

- `npm run verif` final : remplace le bloc « État de référence » de `CLAUDE.md`
  et note ce qui a changé, et pourquoi.
- Commit, push.
- Message de fin, court : ce qui est fait ; les étapes Netlify pour Tom ; toute
  modification du contrat, avec son type ; ce qui bloque.
