# Production du contenu

Comment écrire du contenu en volume sans trahir les règles. Vaut pour tout
storylet nouveau. Les règles elles-mêmes sont dans `content/CONTRAT.md` : ce
document dit **comment** les tenir à grande échelle, il ne les répète pas.

---

## 1. Deux régimes

| | Recombinables | Majeurs et jalons |
|---|---|---|
| Rôle | Le gros du volume : scènes de terrain, rejouables sur tout POI du bon type | La colonne vertébrale : ouverture, razzia, jalons, bascules |
| Production | Par **lots** de 8 à 10 | **Un par un**, depuis un modèle de `SPEC_CONTENU` ou un brief validé par Tom |
| `majeur: true` | Non | **Oui** — réussite partielle obligatoire (contrat §4, règle 3) |
| Indices | **Jamais** | Placés à dessein |
| Relecture humaine | 2 storylets sur 10, par échantillon | Intégrale |

**Pourquoi jamais d'indice dans un recombinable :** il peut sortir n'importe où,
n'importe quand, dans n'importe quel ordre. Le rythme des retournements ne se
contrôle plus. Les indices vivent dans les jalons, les scènes majeures et les
storylets propres à un POI.

---

## 2. Avant d'écrire — lectures obligatoires

1. `content/CONTRAT.md` : §0, §0 bis, les règles du §4, §5.
2. `content/CANON.md`, en entier.
3. La fiche de lot, ou le brief du storylet majeur.
4. `docs/RELEVE.md` : les barèmes réels. **Les nombres d'un storylet viennent du
   code, jamais de `SPEC_EQUILIBRAGE`.**
5. Selon le lot : `SPEC_MONDE` (ce que le joueur peut savoir à ce chapitre),
   `SPEC_BESTIAIRE` (créatures), `SPEC_COMPAGNONS` (spécialités).
6. Un modèle d'écriture dans `SPEC_CONTENU` : §2 pour un recombinable, §3 à §6
   pour un jalon ou une scène majeure. **Leur format est périmé ; leur écriture
   fait référence.**

---

## 3. La fiche de lot

Chaque lot part d'une fiche. Elle vient de la conversation de conception, pas de
Claude Code.

```
LOT-<nn>
Type        : recombinable
Chapitre    : <n>
Lieu        : type_lieu <x> [; exige … ; exclut …]
Nombre      : 8 à 10
Répartition : ~60 % un seul critère de lieu, ~30 % deux, ~10 % trois ou plus
Fonction    : ce que le lot apporte au jeu (vivres rares, lecture du terrain…)
Obligations : ex. au moins 3 où l'observation change l'issue ;
              au moins 2 qui lisent une spécialité de compagnon
Créatures   : lesquelles peuvent apparaître
Indices     : aucun
Interdits   : …
```

Un lot est **homogène** : un seul type, un seul chapitre, un seul critère de lieu
dominant. C'est ce qui rend la relecture par échantillon valable.

---

## 4. La recette d'un storylet

1. **Une situation, une image.** Trois ou quatre phrases. Le décor ne contient
   que ce qu'une option reprendra (§0, règles 3 à 5).
2. **Les options naissent du décor.** Chacune agit sur un élément décrit. Trois à
   cinq options, dont une d'observation s'il y a un risque, et une sortie
   (§4, règles 5 à 7).
3. **Le coût se voit, le gain se devine.** `cout` affiché ; le libellé dit ce
   qu'on fait et ce qu'on perçoit (§0, règle 10).
4. **Aucune option ne rend zéro.** Sûr et pauvre, c'est légitime ; vide, non.
5. **Un risque a au moins deux visages**, et une réussite partielle sur un
   storylet majeur (§4, règle 3).
6. **L'aléatoire coûte, il ne tue jamais** (§4, règle 9).
7. **Tomas nomme précisément ce qu'il connaît, reste vague sur le reste**
   (§0, règle 8).
8. **Un compagnon réagit par sa spécialité, jamais par son nom** — sauf les trois
   frères et les storylets propres d'un compagnon (§24). Si Mathias est
   impliqué, une variante sans lui : il peut être mort.
9. **Rien de nommé avant le twist 1. La Couronne reste aimée. Face aux orcs, une
   option non létale, sans justification** (§0 bis).
10. **Tout fait nouveau entre au canon.**

---

## 5. L'auto-relecture

Avant le vérificateur, pour chaque storylet — les questions qu'une machine ne
peut pas trancher :

- Chaque détail décrit sert-il une option ? Sinon, le couper.
- Un joueur de 15 ans comprend-il chaque mot ?
- Une option rend-elle zéro ?
- Un libellé promet-il un gain ?
- Un fait contredit-il le canon ?
- Le texte explique-t-il quelque chose que le joueur ne doit pas encore savoir ?
- Face aux orcs : l'option non létale existe-t-elle, sans explication ?
- La Couronne apparaît-elle sous un mauvais jour ?
- Un compagnon est-il désigné par son nom, hors des trois frères ?

Une réponse de travers : on réécrit avant de lancer le vérificateur.

---

## 6. Les contrôles automatiques

| Contrôle | Règle | Statut |
|---|---|---|
| Références croisées ; opérateurs et effets inconnus | §5 | existant |
| Sortie ; 3 à 5 options ; deux issues sur option risquée ; aucun storylet sans effet | §4 | existant |
| Plafonds de longueur ; formules d'ambiance bannies | §0 | existant |
| 30 parties automatiques | — | existant |
| Mots rares bannis ; lexique chrétien pour l'Ordre | §0 r. 2 · §0 bis r. 6 | **étape 1** |
| Noms périmés — Mathieu, Joé, Matt, Joe | §1 | **étape 1** |
| Une issue à `probabilite` ne contient ni `retire_compagnon` ni `fin` | §4 r. 9 | **étape 1** |
| Storylet `majeur` : chaque option risquée a une issue `partielle` | §4 r. 3 | **étape 1** |
| Jamais d'indice et d'entrée de journal sur la même issue | §18 | **étape 1** |
| Au plus 3 variantes | §0 r. 12 | **étape 1**, s'il manque |
| Aucun indice dans un storylet recombinable | ce document, §1 | **étape 1** |
| Mots sensibles avant le twist 1 — *sortilège, emprise, ensorcelé, magie* | §0 bis r. 2 | **étape 1**, en « à revoir » |

Un storylet est **recombinable** quand son `lieu.type` n'est pas `point_interet`
ni `declenche_uniquement`. Un **indice** est un effet `f_indice_*` ou
`connaissance_sortilege`.

**Gravité.** Bloquant sur tout storylet nouveau. Sur les storylets hérités de la
v1 — `ST-OUV`, `ST-P01` à `ST-P06`, `ST-CBT`, `ST-EVT`, `ST-FIN` — les nouveaux
contrôles signalent « à revoir », jamais « bloquant » : la v3 doit continuer à se
construire. Les mots sensibles restent « à revoir » partout : un mot n'est pas
une faute, c'est son usage comme explication qui l'est.

---

## 7. L'échantillon

- Le rapport de lot imprime **deux storylets en entier** : le plus risqué (face
  aux orcs, ou le plus d'options risquées) et un tiré au hasard.
- Tom les transmet à la conversation de conception, où ils sont relus.
- **Un défaut trouvé sur l'échantillon se cherche dans tout le lot** : il ne se
  corrige pas seulement là.
- **Au plus deux lots en attente de relecture.** Au-delà, on s'arrête.

Pour un storylet majeur ou un jalon : relecture intégrale, pas d'échantillon.

---

## 8. Le canon

Après le vérificateur, inscrire au canon chaque fait nouveau : un nom, un détail
de lieu, une rumeur, un lien entre deux personnages. Format et règles : en tête
de `content/CANON.md`.

---

## 9. Le rapport — `docs/lots/<LOT-nn>.md`

1. La fiche de lot.
2. Un tableau : identifiant · lieu · fonction en une ligne · nombre d'options ·
   risques · spécialités lues.
3. Le bloc complet du vérificateur, et l'écart avec l'état de référence.
4. Les deux storylets de l'échantillon, en entier.
5. Les faits ajoutés au canon.
6. Les doutes et les questions pour Tom.

Le message de fin de session tient en cinq lignes.
