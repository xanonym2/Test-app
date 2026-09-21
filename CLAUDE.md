# Les Terres Voilées — briefing de reprise

Jeu d'aventure narrative et tactique, médiéval-fantastique. Cible : Steam, achat
unique. Tout se développe depuis un iPhone, via Claude Code : **aucune étape ne
doit exiger un poste de travail.**

**Où on en est.** La v3 (« Val-de-Garde ») est jouable : une zone, 6 points
d'intérêt, 22 storylets, une partie de 4 à 5 h. Le jeu cible est une **campagne
en trois chapitres**, construite **par-dessus** la v3 : moteur, vérificateur et
écrans sont gardés. Rien ne se réécrit.

Branche de travail : `claude/new-session-ftellm`. Tout se développe et se pousse là.

Le contenu narratif peut être affiché et discuté librement : l'ancienne consigne
de non-divulgation est levée.

---

## Lire d'abord — qui fait autorité sur quoi

| Fichier | Rôle | Fait autorité sur |
|---|---|---|
| `content/CONTRAT.md` | Règles de contenu, identifiants, schémas | **Toute règle de contenu** |
| `docs/spec/SPEC_DESIGN_terres-voilees.md` | Les systèmes du jeu | **Tout système** |
| `docs/spec/SPEC_MONDE_terres-voilees.md` | Récit, personnages, retournements | **Tout fait de monde** |
| Le code — `engine/schema.js`, `content/*.js` | Ce qui tourne | **Tout nombre** |
| `docs/spec/SPEC_EQUILIBRAGE_terres-voilees.md` | Nombres visés par les systèmes à venir | Rien : c'est une cible |
| `docs/PRODUCTION.md` | La chaîne de production du contenu | Le processus |
| `content/CANON.md` | Les faits inventés par le contenu | La cohérence entre storylets |
| `docs/prompts/` | Les missions prêtes à exécuter | — |
| `docs/spec/SYNTHESE_GLOBALE_terres-voilees.md` | Porte d'entrée des specs | — |

**Une idée nouvelle ne perd jamais contre le contrat par défaut.** Si le contrat
la bloque, on le modifie — jamais en silence (protocole en tête de
`content/CONTRAT.md`). Toute modification du contrat est annoncée à Tom, avec son
type.

**Si tu hésites à en rajouter — description, option, système non décidé, texte —
la réponse est non.** Deux versions ont échoué : la première par pauvreté
narrative, la seconde par excès. On coupe dans le volume d'une scène, jamais dans
sa précision. Le volume du jeu se mesure en nombre de storylets, jamais en
longueur.

---

## Le jeu cible, en dix lignes

- **Tomas**, 25 ans, ancien soldat devenu chasseur. Ses frères **Mathias**
  (forgeron) et **Jonas** sont le noyau émotionnel.
- Une razzia orque frappe Val-de-Garde. La Couronne lance une expédition punitive
  dans les Terres Noires.
- Trois chapitres, bornés par deux retournements. Un chapitre se joue en un run
  de 1 h 30 à 2 h ; la partie entière vise 6 à 10 h.
- **Campagne à checkpoints, pas roguelite.** Un jalon atteint est consommé,
  jamais rejoué. Débloquer un chapitre donne un **package de départ défini**,
  jamais une sauvegarde restaurée.
- D'un run à l'autre persistent les jalons, les départs de chapitre, le
  bestiaire, les personnes rencontrées et **les morts de compagnons**. La
  puissance repart à zéro.
- Deux modes : narratif (storylets) et tactique (zones nommées, points de
  commandement, aucune grille).
- **En combat, aucun hasard** : l'incertitude vient de ce qu'on ignore de
  l'adversaire. Hors combat, un tirage existe, mais la préparation et
  l'observation le déplacent, et **il ne tue jamais**.
- **Le joueur n'est jamais spectateur** : jamais un choix unique par scène, deux à
  quatre beats par objectif.
- **La pression vient du coût d'opportunité, jamais d'un chronomètre.**

Le détail est dans `docs/spec/`.

---

## Ordre de travail

| Étape | Contenu | Mission |
|---|---|---|
| **1 — Préparation** | Kit en place, cible web hébergée, contrôles ajoutés au vérificateur, relevé du moteur | `docs/prompts/etape-1.md` |
| **2 — MVP 1 « Les vingt premières minutes »** | Ouverture, razzia, après. Contenu seul, nouveau départ `D04` | `docs/prompts/etape-2.md` |
| 3 — MVP 2 « La route » | Jalons, pression sur jalons, 8 POI de la Couronne, lots recombinables | à venir |
| 4 — MVP 3 « La première escarmouche » | Couche tactique, isolée | à venir |
| Plus tard | Sauvegarde de partie, bestiaire persistant, 5 zones, magie | — |

Les lots de contenu en volume passent par `docs/prompts/lot.md`, avec une fiche
de lot venue de la conversation de conception.

**La v3 reste jouable pendant toute la construction.** Le nouveau contenu
s'ajoute à côté, par de nouveaux départs, jusqu'à ce que Tom décide de la retirer.

### Questions ouvertes — ne pas trancher seul

- **La mort du héros.** Dans `SPEC_DESIGN`, la section « États d'échec — le héros
  ne meurt pas » dit qu'il ne meurt jamais (capture, laissé pour mort) ; les §2.4
  et §2.5 parlent de sa mort ; la v3 a une fin `FIN-MORT`. Sans effet sur les
  étapes 1 et 2 — la razzia ne peut pas tuer. À trancher par Tom avant l'étape 3.
- **La famille Ancel** (chaîne C de la razzia) : inventée, jamais validée. Notée
  « à valider » au canon.

---

## Stack

| Couche | Choix |
|---|---|
| Runtime | React Native 0.86.3 + React 19.2.3 |
| Framework | Expo SDK 57 (managed, prebuild) |
| Moteur JS | Hermes, bundle ~1,8 Mo |
| Persistance | `@react-native-async-storage/async-storage` 3.1.1 (localStorage sur le web) |
| Build Android | Gradle via GitHub Actions · EAS profil `preview` en secours |
| Web | Export statique Expo, hébergé — mis en place à l'étape 1 |
| Langage | JavaScript ES modules. Pas de TypeScript. |

**N'ajoute pas de dépendance sans raison forte.** Pas de react-navigation, pas de
state manager, pas de librairie UI : chaque ajout natif est du risque de build
pour zéro bénéfice sur un jeu hors ligne. Les seules ajoutées depuis la v3 sont
celles de la cible web — du JavaScript pur. Après tout ajout,
`npx expo export --platform android` doit passer.

Aucune dépendance réseau, aucune API externe. L'app fonctionne en avion.

---

## Règle d'architecture — la seule qui compte

```
ui  ───────►  engine  ◄───────  content
                 ▲
            (setDb au démarrage, content/index.js)
```

- **`engine` ne connaît que des identifiants. Aucun texte narratif dedans.**
  On doit pouvoir lire tout le moteur sans rien apprendre de l'histoire.
- **`content` ne contient aucune logique.** Que des données déclaratives :
  conditions terses (`["etat","affame"]`), effets objets (`{ xp: 25 }`).
- **`ui` ne calcule rien.** Il lit des valeurs dérivées du moteur et des libellés
  du contenu. Aucune règle de jeu n'est dupliquée dans un écran.

C'est ce découplage qui rend le vérificateur possible : il joue 30 parties
complètes **sans React**, en Node pur.

---

## Arborescence

```
App.js                    coquille : garde d'erreur, bandeau, barre de nav, aiguillage
index.js                  point d'entrée Expo
app.json / eas.json       config Expo (package com.testapp.valdegarde)
CLAUDE.md                 ce fichier

engine/                   ── LE MOTEUR ── ~1 480 lignes, zéro texte narratif
  schema.js                 constantes de règles : stats, états, seuils, barèmes XP
  db.js                     point d'injection du contenu (setDb / getDb)
  rng.js                    aléatoire déterministe sérialisable (mulberry32)
  derive.js                 tout ce qui se calcule : santé max, port, dégâts, usure
  conditions.js             évaluateur du DSL de conditions
  effects.js                application des effets sur l'état
  storylets.js              sélection, composition du texte, résolution des options
  items.js                  instances d'objets, empilement, usure, péremption
  time.js                   segments, jours, météo, pression de fond, différés
  voyage.js                 transitions de déplacement
  progression.js            points de stat, compétences à groupes exclusifs
  badges.js                 évaluation des badges + bilan de fin
  game.js                   création de partie, carte, voyage, orchestration
  save.js                   sauvegarde versionnée + chaîne de migrations

content/                  ── LES DONNÉES ── ~5 000 lignes
  CONTRAT.md                les règles de contenu — fait autorité
  CANON.md                  les faits inventés par le contenu
  index.js                  assemblage + injection dans le moteur
  meta.js points.js meteo.js pression.js voyage.js
  objets.js modificateurs.js creatures.js pnj.js
  competences.js badges.js departs.js mutateurs.js journal.js
  libelles.js               tous les mots de l'UI qui ne sont pas de la narration
  storylets/                ouverture · p01..p06 · combat · evenements

ui/                       ── L'INTERFACE ── ~1 475 lignes
  theme.js                  palette sobre, espacements, typographie
  jeu.js                    contrôleur de session (contexte React + autosave)
  format.js                 mise en forme des données de règles
  components/               Base.js · Bandeau.js · BarreNav.js
  screens/                  Titre · Scene · Carte · Personnage · Inventaire
                            Competences · Compagnons · Bilan

docs/
  spec/                     les specs de conception
  PRODUCTION.md             la chaîne de production du contenu
  RELEVE.md                 le relevé du moteur — écrit à l'étape 1
  prompts/                  les missions
  lots/                     un rapport par lot de contenu

outils/verifier.mjs       lint de contenu + 30 parties automatiques
.github/workflows/        android-apk.yml : vérif → prebuild → 2× gradle → release
```

---

## Vérifier

```bash
npm run verif        # node outils/verifier.mjs
```

Contrôle les références croisées, les opérateurs et effets inconnus, les règles
non négociables, les plafonds de longueur et les formules d'ambiance bannies,
puis joue **30 parties automatiques** avec un robot qui mange, se soigne, dépense
ses points, prend ses compétences et vise les lieux jamais vus. La liste complète
des contrôles, dont ceux qu'ajoute l'étape 1 : `docs/PRODUCTION.md` §6.

Sort en code 1 s'il reste un bloquant ou un plantage. **Il tourne avant chaque
build** : un contenu cassé n'atteint jamais l'APK, ni la version web.

Il n'imprime que des identifiants et des compteurs. Les textes vont dans les
rapports de lot.

### État de référence (à ne pas dégrader)

Mesuré sur la v3. Remesuré à la fin de l'étape 1, puis réécrit ici.

```
bloquants : 0 | à revoir : 0 | parties OK : 30 / 30 (crashs : 0)
jours moy 8,0 · niveau moy 6,2 · 2,9 compétences prises · 2,9 groupes fermés
scènes vues 16,2 / 22 · points visités 4,7 / 6 · savoir 1,5 / 3
survie qui mord : 16 / 30 · 5 fins distinctes + la mort
```

### Les ratios à surveiller

**Un run ne voit jamais tout son chapitre.** Le coût d'opportunité l'impose :
entre deux jalons, on ne peut pas tout visiter. Scènes vues, indices trouvés et
compétences prises se mesurent donc par chapitre. **Si l'un de ces ratios monte
vers le maximum, la pression s'est relâchée.**

La métrique « jours moy » disparaîtra avec la pression sur jalons
(`content/CONTRAT.md` §14).

---

## Construire

**Web** — après l'étape 1 : chaque push sur la branche de travail met à jour la
version jouable dans Safari, une fois le vérificateur passé.

**APK** — GitHub Actions, déclenché par tout push sur la branche de travail.
Publie deux APK en release : `arm64` (~28 Mo, tout téléphone récent) et
`universal` (~74 Mo, 32 bits et émulateurs). Signés avec le **keystore de debug
du gabarit** : bon pour tester, à remplacer avant toute distribution réelle.

Validation rapide sans build complet : `npx expo export --platform android`
(~30 s, attrape toutes les erreurs de JSX et d'import).

---

## Décisions prises, et ce qu'elles coûtent

**Pas de react-navigation.** L'aiguillage est un `switch` dans `App.js`. La
librairie aurait ajouté 3 dépendances natives pour remplacer 12 lignes.

**État mutable + clone superficiel** au lieu d'un reducer immuable. *Revers
assumé* : impossible de faire un `undo` générique — la réversibilité du choix est
gérée **en amont**, dans la sélection, avant que le moteur ne touche à rien.

**Le fil narratif est sauvegardé, pas recomposé.** Recomposer la scène au
chargement rejouerait les `regles_locales` du storylet et leurs effets de bord.
Le texte affiché voyage dans la sauvegarde (plafonné à 40 entrées) ; seules les
options, dont l'évaluation est pure, sont recalculées.

**Dégâts déterministes en combat.** L'incertitude porte sur l'**information**,
jamais sur les dés : en combat, les issues se choisissent par leur `si`, pas par
`probabilite`.

**L'aléatoire coûte, il ne tue jamais** (contrat §4, règle 9). Hors combat, une
issue tirée au sort ne tue ni le héros ni un compagnon, et ne met pas fin au run.

**Package de chapitre défini, jamais sauvegarde restaurée.** Sinon, abandonner un
run annulerait une perte.

**Le code fait foi sur les nombres.** `SPEC_EQUILIBRAGE` est une cible : un de ses
nombres n'entre dans le contrat qu'une fois implémenté et mesuré.

---

## Ce qui n'est pas fait

- **Aucun test sur appareil réel** au moment de la v3. Prouvé : le bundle passe,
  le moteur encaisse 30 parties, le build Android réussit. Non prouvé : rendu
  tactile, lisibilité au pouce, fluidité du scroll.
- **Pas d'équilibrage fin.** Réglage grossier, calibré sur le robot. Les vrais
  chiffres viendront du test humain.
- **Pas de son, pas d'animation, aucune illustration** — délibéré.
- Tout ce que liste l'ordre de travail au-delà de l'étape 2.
- Trois commits intermédiaires portent une ancienne adresse d'auteur et
  s'affichent « Unverified » sur GitHub.

---

## Conventions

- Commits et commentaires **en français**, comme tout le code.
- Un commentaire dit **pourquoi**, jamais quoi. Densité faible : le code nomme.
- Toujours `git push -u origin claude/new-session-ftellm`. Jamais d'autre branche
  sans accord explicite. Pas de pull request sans demande explicite.
- **Message de fin de session : court.** Ce qui est fait, ce qui bloque, ce qui
  attend une décision de Tom, et toute modification du contrat avec son type.
