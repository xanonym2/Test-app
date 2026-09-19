# Val-de-Garde — briefing de reprise

Jeu narratif à storylets pour Android. Partie courte et rejouable (4-5 h réelles,
~8 jours de jeu), permadeath, **aucune progression entre les parties** : seule la
connaissance du joueur persiste.

Branche de travail : `claude/new-session-ftellm`. Tout se développe et se pousse là.

---

## ⚠ CONTRAINTE PRIORITAIRE — ne pas divulguer le contenu

Le joueur qui teste ce jeu **ne doit pas connaître le contenu narratif à l'avance.**

- N'affiche **jamais** dans la conversation le texte des storylets, le nom des
  créatures, des objets, des PNJ, ni les issues des choix.
- Écris ces fichiers directement sur disque, sans en montrer le contenu.
- Dans tes messages, dis ce que tu as fait (« 3 storylets corrigés »), jamais ce
  qu'ils contiennent.
- Pour signaler un problème sur un contenu, décris-le sans le citer.
- Tu peux librement afficher : le code, la structure, les schémas, l'interface,
  les identifiants, les compteurs.

Dans cet environnement, une écriture de fichier passe par un appel d'outil visible.
Le moyen le plus propre de tenir la contrainte est de **déléguer la rédaction
narrative à des sous-agents** (leurs appels sont repliés, leur rapport ne remonte
pas), en leur interdisant explicitement de citer du texte dans leur rapport final.

---

## Stack

| Couche | Choix |
|---|---|
| Runtime | React Native 0.86.3 + React 19.2.3 |
| Framework | Expo SDK 57 (managed, prebuild) |
| Moteur JS | Hermes, bundle ~1,8 Mo |
| Persistance | `@react-native-async-storage/async-storage` 3.1.1 |
| Build | Gradle via GitHub Actions · EAS profil `preview` en secours |
| Langage | JavaScript ES modules. Pas de TypeScript. |

**5 dépendances au total.** Pas de react-navigation, pas de state manager, pas de
librairie UI. C'est volontaire : chaque ajout natif est du risque de build pour
zéro bénéfice sur un jeu hors-ligne. **N'ajoute pas de dépendance sans raison
forte**, et si tu en ajoutes une, vérifie que `npx expo export --platform android`
passe encore.

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

engine/                   ── LE MOTEUR ── ~1 480 lignes, zéro texte narratif
  schema.js                 constantes de règles : stats, états, seuils, barèmes XP
  db.js                     point d'injection du contenu (setDb / getDb)
  rng.js                    aléatoire déterministe sérialisable (mulberry32)
  derive.js                 tout ce qui se calcule : santé max, port, dégâts, usure
  conditions.js             évaluateur du DSL de conditions (57 opérateurs)
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
  CONTRAT.md                LA spec : identifiants, schémas, équilibrage, style
  index.js                  assemblage + injection dans le moteur
  meta.js points.js meteo.js pression.js voyage.js
  objets.js modificateurs.js creatures.js pnj.js
  competences.js badges.js departs.js mutateurs.js
  libelles.js               tous les mots de l'UI qui ne sont pas de la narration
  storylets/                ouverture · p01..p06 · combat · evenements

ui/                       ── L'INTERFACE ── ~1 475 lignes
  theme.js                  palette sobre, espacements, typographie
  jeu.js                    contrôleur de session (contexte React + autosave)
  format.js                 mise en forme des données de règles
  components/               Base.js · Bandeau.js · BarreNav.js
  screens/                  Titre · Scene · Carte · Personnage · Inventaire
                            Competences · Compagnons · Bilan

outils/verifier.mjs       lint de contenu + 30 parties automatiques
.github/workflows/        android-apk.yml : vérif → prebuild → 2× gradle → release
```

---

## Avant de toucher au contenu : lis `content/CONTRAT.md`

540 lignes qui font autorité sur :
- les **espaces d'identifiants** (`ST-P04-02`, `OBJ-07`, `PNJ-01`, `C03`, `f_indice_1`…)
  — identifiants **stables, jamais modifiés**, indépendants du nom affiché ;
- le **schéma exact d'un storylet** et la liste close des opérateurs de conditions
  et des formes d'effets ;
- les **règles de contenu non négociables** (une sortie par tour, 3-5 options
  visibles, deux issues minimum sur une option risquée, aucun storylet sans effet,
  une option d'observation partout où il y a un risque) ;
- les **règles de style** : phrases courtes, vocabulaire courant, une image forte
  par scène, et surtout **le détail est diagnostique, jamais décoratif** — tout
  détail décrit doit pouvoir servir une décision.

Deux versions précédentes ont échoué : la première par pauvreté narrative, la
seconde par excès. **Si tu hésites à en rajouter — description, option, système,
texte — la réponse est non.** Coupe dans le volume, jamais dans la précision.

---

## Vérifier

```bash
npm run verif        # node outils/verifier.mjs
```

Contrôle les références croisées (objets, PNJ, points, storylets, clés de journal),
les opérateurs et effets inconnus, les règles non négociables, les plafonds de
longueur et les formules d'ambiance bannies. Puis joue **30 parties automatiques**
avec un robot qui mange, se soigne, dépense ses points, prend ses compétences et
vise les lieux jamais vus.

Sort en code 1 s'il reste un bloquant ou un plantage. **Il tourne dans la CI avant
le build** : un contenu cassé n'atteint jamais l'APK.

Il n'imprime jamais de texte narratif — uniquement des identifiants et des compteurs.

### État de référence (à ne pas dégrader)

```
bloquants : 0 | à revoir : 0 | parties OK : 30 / 30 (crashs : 0)
jours moy 8,0 · niveau moy 6,2 · 2,9 compétences prises · 2,9 groupes fermés
scènes vues 16,2 / 22 · points visités 4,7 / 6 · savoir 1,5 / 3
survie qui mord : 16 / 30 · 5 fins distinctes + la mort
```

Les trois chiffres à surveiller : **16,2/22 scènes, 1,5/3 indices, 2,9 compétences.**
Une partie ne doit **jamais** pouvoir tout voir — c'est le moteur de rejouabilité.
Si l'un de ces ratios monte vers le maximum, quelque chose s'est desserré.

---

## Construire un APK

**GitHub Actions**, déclenché par tout push sur la branche de travail. Publie deux
APK en release : `arm64` (~28 Mo, tout téléphone récent) et `universal` (~74 Mo,
32 bits et émulateurs). Signés avec le **keystore de debug du gabarit** : bon pour
tester, à remplacer avant toute distribution réelle.

**EAS** (`npx eas-cli build --platform android --profile preview`) est configuré et
fonctionnel, mais demande un compte Expo — c'est pour ça que la chaîne Actions est
le chemin par défaut.

Validation rapide sans build complet : `npx expo export --platform android`
(~30 s, attrape toutes les erreurs de JSX et d'import).

---

## Décisions prises, et ce qu'elles coûtent

**Pas de react-navigation.** L'aiguillage est un `switch` dans `App.js`. Six écrans
plats, aucun empilement. La librairie aurait ajouté 3 dépendances natives pour
remplacer 12 lignes.

**État mutable + clone superficiel** au lieu d'un reducer immuable. Le moteur mute
`E` en place, l'UI force le rendu avec `setE({...etat})`. *Revers assumé* :
impossible de faire un `undo` générique — c'est pourquoi la réversibilité du choix
est gérée **en amont**, dans la sélection, avant que le moteur ne touche à rien.

**Le fil narratif est sauvegardé, pas recomposé.** Recomposer la scène au chargement
rejouerait les `regles_locales` du storylet et leurs effets de bord. Le texte
affiché voyage donc dans la sauvegarde (plafonné à 40 entrées) ; seules les options,
dont l'évaluation est pure, sont recalculées.

**Dégâts déterministes en combat.** L'incertitude porte sur l'**information** (ce
qu'on ignore de l'adversaire, révélé par une option d'observation), jamais sur les
dés. Si tu ajoutes du combat, garde cette règle : les issues se choisissent par
leur `si`, pas par `probabilite`.

---

## Ce qui n'est pas fait

- **Aucun test sur appareil réel.** Prouvé : le bundle passe, le moteur encaisse
  30 parties, le build Android réussit. Non prouvé : rendu tactile, lisibilité au
  pouce, fluidité du scroll.
- **Pas d'équilibrage fin.** Le réglage actuel est grossier, calibré sur le robot.
  Les vrais chiffres viendront du test humain.
- **Pas de son, pas d'animation, aucune illustration** — délibéré (brief).
- **Une seule zone** (6 points d'intérêt, 22 storylets). L'architecture est prête
  pour d'autres zones : `lieu.type` accepte déjà `zone`, `territoire` et `type_lieu`.
- Trois commits intermédiaires portent une ancienne adresse d'auteur et
  s'affichent « Unverified » sur GitHub.

---

## Conventions

- Commits et commentaires **en français**, comme tout le code.
- Un commentaire dit **pourquoi**, jamais quoi. Densité faible : le code nomme.
- Toujours `git push -u origin claude/new-session-ftellm`. Jamais d'autre branche
  sans accord explicite.
- Pas de pull request sans demande explicite.
