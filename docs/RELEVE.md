# Relevé du moteur — état v3 au 21 September 2026

Écrit à l'étape 1. **Factuel** : aucune recommandation, sauf le classement
proposé au §5, qui n'est qu'une proposition.

Dépôt à `e8ef398`, branche `claude/new-session-ftellm`.

---

## 1. Volumétrie

```
=== engine/ ===
   57 engine/badges.js
  128 engine/conditions.js
   12 engine/db.js
  142 engine/derive.js
  251 engine/effects.js
  169 engine/game.js
  144 engine/items.js
   68 engine/progression.js
   60 engine/rng.js
   66 engine/save.js
   89 engine/schema.js
  177 engine/storylets.js
  108 engine/time.js
   18 engine/voyage.js
 1489 total

=== content/ ===
    43 content/CANON.md
   852 content/CONTRAT.md
    83 content/badges.js
    94 content/competences.js
    58 content/creatures.js
    42 content/departs.js
    46 content/index.js
   167 content/libelles.js
    27 content/meta.js
    37 content/meteo.js
   104 content/modificateurs.js
    68 content/mutateurs.js
   215 content/objets.js
    97 content/pnj.js
    71 content/points.js
     8 content/pression.js
    51 content/voyage.js
   432 content/storylets/combat.js
   574 content/storylets/evenements.js
   234 content/storylets/ouverture.js
   249 content/storylets/p01.js
   530 content/storylets/p02.js
   353 content/storylets/p03.js
   425 content/storylets/p04.js
   587 content/storylets/p05.js
   463 content/storylets/p06.js
  5910 total

=== ui/screens/ ===
  173 ui/screens/Bilan.js
   74 ui/screens/Carte.js
  122 ui/screens/Compagnons.js
   90 ui/screens/Competences.js
  188 ui/screens/Inventaire.js
  113 ui/screens/Personnage.js
  125 ui/screens/Scene.js
   77 ui/screens/Titre.js
  962 total

=== outils/ ===
517 outils/verifier.mjs
```

Texte narratif des 22 storylets : **9 162 mots** au total.

---

## 2. `engine/schema.js`

```js
// Constantes de règles. Aucun texte narratif : uniquement des identifiants,
// des seuils et des barèmes. Les libellés affichables vivent dans /content.

export const VERSION_SAUVEGARDE = 1;

export const STATS = ['vigueur', 'adresse', 'perception', 'sangfroid'];

export const FACTIONS = ['couronne', 'terres_noires', 'ordre', 'marchands'];

export const ETATS = [
  'blesse_leger',
  'blesse_grave',
  'blesse_jambe',
  'epuise',
  'affame',
  'assoiffe',
];

export const METEOS = ['clair', 'couvert', 'pluie', 'brume', 'gel'];

export const CATEGORIES_OBJET = [
  'arme',
  'protection',
  'consommable',
  'ressource',
  'divers',
];

export const FAMILLES_ARME = ['arc', 'lame_legere', 'lame_longue', 'lourde', 'hast'];

// Paliers d'usure : jamais affichés en pourcentage brut.
export const PALIERS_USURE = [
  { min: 85, id: 'neuf', facteur: 1.0 },
  { min: 65, id: 'bon', facteur: 1.0 },
  { min: 40, id: 'use', facteur: 0.85 },
  { min: 20, id: 'abime', facteur: 0.65 },
  { min: 0, id: 'ruine', facteur: 0.4 },
];

export const NIVEAU_MAX = 8;

// XP cumulée requise pour atteindre le niveau N (index = niveau - 1).
export const SEUILS_XP = [0, 35, 85, 150, 230, 325, 440, 570];

// Niveaux auxquels une compétence est proposée (1 tous les 2 niveaux).
export const NIVEAUX_COMPETENCE = [2, 4, 6, 8];

export const SEGMENTS_PAR_JOUR = 6;

// Coût de base d'un segment écoulé.
export const COUT_SEGMENT = { fatigue: 6, faim: 5 };

// Segments de nuit : plus coûteux en fatigue.
export const SEGMENTS_NUIT = [5, 6];
export const MALUS_NUIT_FATIGUE = 4;

// Seuils de bascule d'état automatique.
export const SEUILS = {
  affame: 70,
  epuise: 75,
  fatigue_max: 100,
  faim_max: 100,
};

export const STATS_PARTIE_INITIALES = {
  jours: 1,
  segments_ecoules: 0,
  points_visites: 0,
  storylets_joues: 0,
  observations: 0,
  orcs_vaincus: 0,
  humains_vaincus: 0,
  betes_vaincues: 0,
  combats_evites: 0,
  combats_gagnes: 0,
  fleches_tirees: 0,
  degats_subis: 0,
  objets_ramasses: 0,
  objets_repares: 0,
  repas_pris: 0,
  eau_partagee: 0,
  compagnons_recrutes: 0,
  compagnons_perdus: 0,
  pnj_morts: 0,
  decisions_majeures: 0,
  indices_trouves: 0,
  nuits_a_decouvert: 0,
  xp_gagnee: 0,
};
```

---

## 3. Mécaniques

### 3.1 Choix du départ au lancement

Les deux voies existent, toutes deux depuis l'écran titre (`ui/screens/Titre.js`) :

- **Tiré** — « Nouvelle partie » appelle `demarrer({})`. `nouvellePartie()`
  tire alors `depart` par `tirerDepart()` (uniforme sur les 3 départs) puis
  1 ou 2 mutateurs par `tirerMutateurs()`, jamais deux du même groupe.
- **Choisi** — « Choisir son départ → » liste les 3 départs avec leur
  description et appelle `demarrer({ depart: 'D0x' })`. **Les mutateurs restent
  tirés dans les deux cas** : le joueur ne les choisit jamais.

L'inventaire initial est `meta.inventaire_initial` puis celui du départ ; la
première arme trouvée est équipée d'office. Les effets du départ, puis ceux de
chaque mutateur, sont appliqués ensuite.

### 3.2 Avancée du temps

`engine/time.js`, `avancerSegments(E, n)`, segment par segment :

- 6 segments par jour (`SEGMENTS_PAR_JOUR`).
- Chaque segment : fatigue +6, faim +5 (`COUT_SEGMENT`).
- Segments 5 et 6 = nuit (`SEGMENTS_NUIT`) : fatigue +4 de plus.
- Attrition : faim ≥ 95 → santé −2 par segment ; fatigue = 100 → santé −1.
- Au passage de jour : denrées périmées retirées (`perimer`), météo retirée
  (`tirerMeteo`, pondérée par les mutateurs), paliers de pression appliqués.
- **Pression de fond** (`content/pression.js`) : jour 3 → `ST-EVT-01` ;
  jour 5 → `P02` bloqué ; jour 6 → `ST-P05-04` ; jour 8 → `ST-FIN-01`.
  Un mutateur portant `pression_decalage_jours` avance tous les paliers.
- Les différés arrivés à échéance sont renvoyés comme déclenchements.

Les états `affame` (faim ≥ 70) et `epuise` (fatigue ≥ 75) ne sont pas
stockés : ils sont dérivés à la lecture (`etatsAutomatiques`).

### 3.3 L'état `assoiffe`

**Il ne se déclenche jamais.**

`assoiffe` est déclaré dans `engine/schema.js`, porte un libellé dans
`content/libelles.js`, et **trois endroits le retirent** — l'eau (`OBJ-05`),
une option de `ST-P03-01`, une option de `ST-P04-01`. Mais **aucun code ni
aucun contenu ne le pose** : `etatsAutomatiques()` ne dérive que `affame` et
`epuise`, et les seuls `{ etat: ... }` écrits par le contenu sont
`blesse_leger` (4 fois) et `blesse_jambe` (2 fois).

Vérifié : sur 40 parties × 60 segments, `assoiffe` n'apparaît pas une fois.

Conséquence mesurable — dans `ST-P04-01`, sont donc **morts** :
une variante de texte (`si: [["etat","assoiffe"]]`), une option entière
(`apparait_si: [["etat","assoiffe"], ["!local","bu"]]`) et un modificateur de
probabilité (`valeur: -12`). Le dilemme de l'eau que l'ordre pédagogique
`P03` → `P04` doit installer ne se produit pas.

### 3.4 Déroulé de `ST-CBT-01`

- `lieu: { type: "declenche_uniquement" }`, `unique: false`, priorité 10.
- **État local** : `ennemi` (défaut `CRE-05`), `lu`, `touche`, `garde`,
  `couvert`. Une règle locale pose `presse` à partir du tour 4.
- **Lecture de l'adversaire** : l'option `OBS` n'apparaît que si `lu` est faux,
  coûte 4 de fatigue, pose `lu` et incrémente `garde`. Son texte diffère selon
  la famille de l'adversaire (orc / humain / bête). `FLANC` n'apparaît qu'avec
  `lu` : l'information ouvre une option, elle ne donne pas de bonus.
- **Aucune `probabilite`** : les 28 issues se choisissent toutes par leur `si`,
  de la plus spécifique à la plus générale.
- **Postures** : `TIR` (exige arc + flèches, seulement tant que `garde` ≤ 0),
  `FORCE` (12 fatigue, use l'arme, −8 santé sans `C03`, −3 avec),
  `COUVERT` (remet le tronc entre eux, remet `garde` à 0).
- **Sorties** : `EPINES` (exige `couvert`, 1 segment, blessure si `presse`),
  `JETER` (bêtes seulement, coûte `OBJ-06`), `RECULER` (toujours disponible,
  −6 santé si `garde` ≥ 2). Une sortie reste jouable à chaque tour.
- Compteurs alimentés : `orcs_vaincus`, `humains_vaincus`, `betes_vaincues`,
  `combats_gagnes`, `combats_evites`, `fleches_tirees`.

### 3.5 Santé du héros à 0

Deux chemins, qui ne se valent pas :

- **Par une issue de storylet** — `resoudreOption()` teste, après avoir fait
  s'écouler les segments : `if (E.heros.sante <= 0 && !E.fin) E.fin = { id: 'FIN-MORT' }`.
  L'interface bascule sur le bilan au retour de `valider()`.
- **Par l'attrition pendant un voyage** — `voyager()` appelle
  `avancerSegments()` mais **ne teste pas la santé**, et `allerA()` côté
  interface ne le teste pas non plus. Vérifié : santé 0, `E.fin` reste `null`,
  `partieTerminee()` renvoie `true`. Le bilan n'arrive qu'au prochain choix
  validé, qui pose alors `FIN-MORT`.

Depuis l'étape 1, une issue **tirée au sort** ne peut plus amener la santé
sous 1 (contrat §4, règle 9) ; une issue **choisie par le contenu** le peut
toujours.

### 3.6 De `fin` au bilan

`{ fin: 'FIN-xx' }` écrit `E.fin = { id, jour, segment }`. Au retour de
`valider()`, l'interface passe sur l'écran bilan. `bilan(E)` (`engine/badges.js`)
assemble jours, segments, départ, mutateurs, héros, équipe, statuts de PNJ,
ennemis, zones explorées et jamais atteintes, décisions du journal, savoir,
compteurs, badges — plus un bloc `manques` qui compte ce qui n'a pas été vu
sans jamais dire quoi. L'écran lit `meta.fins[E.fin.id]` pour le titre et le
texte de fin. `FIN-MORT` y figure au même titre que les autres.

---

## 4. Barèmes réellement utilisés par le contenu

Relevé sur les 22 storylets, effets d'issues et de règles locales confondus.

| Effet | Fourchette | Occurrences |
|---|---|---|
| `xp` | +5 à +40 | 155 |
| `fatigue` | −45 à +22 | 42 |
| `faim` | −45 à −25 | 6 |
| `sante_heros` | −14 à +10 | 19 |

Quantités d'objets, par base (min / max d'un même effet) :

```
OBJ-02 −3 / +2   OBJ-03 +1 / +1   OBJ-05 −1 / +3   OBJ-06 −1 / +1
OBJ-07 +1 / +1   OBJ-08 −1 / +1   OBJ-09 +1 / +1   OBJ-10 +1 / +1
OBJ-11 −1 / +1   OBJ-12 +1 / +1   OBJ-13 +1 / +2   OBJ-14 +1 / +1
OBJ-15 −1 / +3
```

**Rendement d'une fouille.** Dix effets seulement utilisent `tire: true`,
répartis sur quatre storylets :

```
ST-P02-01  2   OBJ-03, OBJ-14
ST-P06-01  5   OBJ-08 ×2, OBJ-07 ×2, OBJ-11   (branches exclusives)
ST-P06-02  1   OBJ-09
ST-P06-03  2   OBJ-10 ×2
```

Un objet tiré reçoit un préfixe dans 55 % des cas, un suffixe dans 30 %, et une
usure entre 35 et 90 (`engine/items.js`, valeurs par défaut). Une option ne rend
jamais plus d'une pièce : les cinq effets de `ST-P06-01` sont des branches qui
s'excluent.

**Repos.** Toutes les baisses de fatigue écrites par le contenu :

| Storylet | Valeurs |
|---|---|
| `ST-EVT-02` | −45, −40, −25, −25, −10, −10 |
| `ST-P03-01` | −35, −8 |
| `ST-P04-02` | −20 |
| `ST-P01-02`, `ST-P06-01` | −12 |
| `ST-OUV-01`, `ST-P04-01` | −6, −8 |

Le repos long vaut 2 segments (−35 au point d'eau, −40 à −45 la nuit) ; les
valeurs basses sont des soulagements incidents, pas des options de repos.

**Repas** : −40 faim (`OBJ-06`), −25 (`OBJ-15`).

---

## 5. Inventaire des 22 storylets

`mots` = tout le texte narratif du storylet : arrivée, base, variantes,
textes forcés, libellés d'options, textes d'issues.

| ID | Fichier | Lieu | Prio | Options | Issues | Combat | Indice | Journal | Mots |
|---|---|---|---|---|---|---|---|---|---|
| ST-CBT-01 | combat.js | declenche_uniquement | 10 | 8 | 28 | oui | non | — | 905 |
| ST-EVT-01 | evenements.js | partout | 8 | 4 | 8 | non | non | evt_fumee | 339 |
| ST-EVT-02 | evenements.js | partout | 3 | 4 | 9 | non | non | — | 376 |
| ST-FIN-01 | evenements.js | partout | 10 | 5 | 15 | non | non | fin_rapport fin_compagnie fin_savoir fin_seul fin_entame | 552 |
| ST-OUV-01 | ouverture.js | declenche_uniquement | 10 | 3 | 3 | non | non | — | 208 |
| ST-OUV-02 | ouverture.js | declenche_uniquement | 10 | 4 | 5 | oui | non | ouv_forge ouv_maison ouv_fleches ouv_ouest | 358 |
| ST-P01-01 | p01.js | P01 | 9 | 4 | 6 | non | oui | p01_orcs_ouest | 340 |
| ST-P01-02 | p01.js | P01 | 4 | 4 | 4 | non | oui | p01_orcs_ouest | 190 |
| ST-P02-01 | p02.js | P02 | 9 | 5 | 6 | non | non | — | 358 |
| ST-P02-02 | p02.js | P02 | 7 | 4 | 5 | non | oui | ferme_rien_pris | 289 |
| ST-P02-03 | p02.js | P02 | 6 | 6 | 9 | oui | non | ferme_bete_evitee | 450 |
| ST-P03-01 | p03.js | P03 | 9 | 7 | 10 | non | non | — | 443 |
| ST-P03-02 | p03.js | P03 | 7 | 4 | 4 | non | non | source_partage source_refus | 262 |
| ST-P04-01 | p04.js | P04 | 9 | 6 | 11 | non | non | layon_passe layon_chute | 533 |
| ST-P04-02 | p04.js | P04 | 7 | 6 | 12 | non | non | layon_force | 546 |
| ST-P05-01 | p05.js | P05 | 9 | 5 | 9 | non | non | — | 432 |
| ST-P05-02 | p05.js | P05 | 7 | 5 | 7 | non | non | recrue_devant recrue_arriere camp_seul | 393 |
| ST-P05-03 | p05.js | P05 | 6 | 6 | 11 | non | oui | charretier_garnison | 565 |
| ST-P05-04 | p05.js | P05 | 8 | 4 | 7 | non | non | camp_defait | 338 |
| ST-P06-01 | p06.js | P06 | 9 | 6 | 12 | non | non | p06_arsenal | 593 |
| ST-P06-02 | p06.js | P06 | 7 | 5 | 5 | non | non | p06_reparation | 270 |
| ST-P06-03 | p06.js | P06 | 6 | 5 | 9 | non | oui | p06_tableau | 422 |

### Classement proposé

Critères du contrat §4 : **récupérable** (recombinable par `type_lieu`),
**structure seule** (texte trop ancré dans la v1 ; beats et issues
réutilisables), **retiré**. Ce n'est qu'une proposition.

| ID | Proposition | Pourquoi |
|---|---|---|
| ST-OUV-01 | retiré | L'étape 2 réécrit l'ouverture. Son seul acquis est une mesure — 87 mots avant le premier choix — pas un texte |
| ST-OUV-02 | retiré | L'étape 2 réécrit la razzia, avec un autre régime de létalité |
| ST-P01-01 | structure seule | L'observation graduée par couches est à garder telle quelle ; le texte décrit une crête précise |
| ST-P01-02 | récupérable | Scène de retour courte, sans ancrage : se retague par `type_lieu` hauteur |
| ST-P02-01 | récupérable | Fouille et scène à états : le système est générique, le lieu est un décor |
| ST-P02-02 | structure seule | Les beats tiennent, l'indice 2 change avec le nouveau récit |
| ST-P02-03 | récupérable | Menace qui bascule en combat, trois dérobades à coûts distincts : générique |
| ST-P03-01 | récupérable | Scène de respiration à un point d'eau, aucune menace, aucun ancrage |
| ST-P03-02 | récupérable | Le partage d'eau ne dépend que d'un point d'eau et d'un PNJ |
| ST-P04-01 | structure seule | Meilleur exemple de risque gradué du dépôt, mais le nom du lieu viole la règle 2 et irrigue tout le texte |
| ST-P04-02 | structure seule | Conséquence et différé : mécanique à garder, texte collé au lieu précédent |
| ST-P05-01 | structure seule | La scène d'écoute tient, ses trois PNJ sont v1 |
| ST-P05-02 | structure seule | L'exclusivité des deux recrues est le modèle à reprendre ; les recrues changent |
| ST-P05-03 | structure seule | Information contre contrepartie : à garder ; l'indice 3 change |
| ST-P05-04 | retiré | Déclenché par `jour >= 5` ; la pression sur jalons (contrat §14) supprime ce déclencheur |
| ST-P06-01 | récupérable | Arbitrage de portage sur un râtelier : ne dépend que d'un lieu d'équipement |
| ST-P06-02 | récupérable | Réparation contre matériaux et temps : générique |
| ST-P06-03 | structure seule | La salle de garde tient comme beat ; l'indice 3 change |
| ST-CBT-01 | structure seule | Le modèle de combat — lecture, postures, dérobades — est à garder ; son décor est fixe alors qu'il se déclenche partout |
| ST-EVT-01 | récupérable | Évènement de fond court, déjà `partout` |
| ST-EVT-02 | récupérable | Nuit à découvert, déjà `partout` ; un seul mot à renommer |
| ST-FIN-01 | structure seule | Cinq fins départagées par savoir, compagnons et état : modèle de fin de chapitre ; la convergence « partir vers l'ouest » est propre à la v3 |

Répartition : **8 récupérables · 11 structure seule · 3 retirés**.

---

## 6. Deux storylets en entier

### 6.1 Scène sans risque — `ST-P03-01`

`content/storylets/p03.js`, lignes 2 à 215. Aucune `probabilite` : chaque
issue se choisit par son `si`, aucun échec n'est possible.

```js
  "ST-P03-01": {
    id: "ST-P03-01",
    titre_travail: "Source — boire, remplir, souffler",
    lieu: { type: "point_interet", cible: "P03" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    priorite: 9,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { bu: false, repose: false },
    texte: {
      arrivee:
        "L'eau sort de la roche au fond d'un creux, entre deux frênes. Elle tombe dans une cuvette de pierre large comme un bouclier, puis repart sous les cailloux. Elle est froide à faire mal aux dents. Au-dessus du creux, une dalle plate prend le soleil, hors du vent.",
      base:
        "Le creux n'a pas changé. L'eau sort, tombe, repart sous les cailloux. La dalle est sèche.",
      variantes: [
        {
          si: [["competence", "C01"]],
          ajout:
            "Les coulées descendent toutes au même point de la berge. Ça vient boire ici tous les soirs.",
        },
        {
          si: [["etat", "blesse_leger"]],
          ajout:
            "La descente au creux se fait de côté, une main sur la roche.",
        },
        {
          si: [["fatigue>=", 70]],
          remplace:
            "L'eau sort de la roche. Elle est froide. Il y a une dalle plate au-dessus, au soleil. Je ne cherche pas plus loin.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Boire au filet, à genoux dans la mousse",
        cout: {},
        apparait_si: [["!local", "bu"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je bois jusqu'à ne plus pouvoir. L'eau a le goût de la pierre. Je reste à genoux le temps que le froid passe des mains aux bras.",
            effets: [
              { fatigue: -8 },
              { retire_etat: "assoiffe" },
              { local: "bu", "=": true },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Remplir la gourde à la cuvette",
        cout: { segments: 1 },
        requiert: [["objet", "OBJ-04"]],
        apparait_si: [["objet<=", "OBJ-05", 2]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["objet<=", "OBJ-05", 0]],
            texte:
              "La gourde sonne creux. Je la tiens sous le filet jusqu'à ce que ça déborde sur mes doigts. Trois parts, pas une de plus : le cuir ne tient que ça. Le bouchon a gonflé, il rentre mal.",
            effets: [
              { objet: "OBJ-05", quantite: 3 },
              { xp: 10 },
            ],
          },
          {
            si: [["objet<=", "OBJ-05", 1]],
            texte:
              "J'ajoute ce qui manque. La gourde est pleine au col. Le reste de l'eau repart sous les cailloux, et je n'ai rien d'autre pour l'emporter.",
            effets: [{ objet: "OBJ-05", quantite: 2 }],
          },
          {
            si: [],
            texte:
              "Il reste une place, je la remplis. Ensuite l'eau déborde et coule sur mes doigts : la gourde ne prend pas plus, et le creux ne me suit pas.",
            effets: [{ objet: "OBJ-05", quantite: 1 }],
          },
        ],
      },
      {
        id: "C",
        libelle: "S'asseoir sur la dalle et ne rien faire",
        cout: { segments: 2 },
        apparait_si: [["!local", "repose"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je m'allonge sur la pierre chaude, le sac sous la nuque. Le bruit de l'eau couvre le reste. Quand je rouvre les yeux, l'ombre des frênes a tourné d'une main.",
            effets: [
              { fatigue: -35 },
              { local: "repose", "=": true },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Manger ici, à l'abri du vent",
        cout: { segments: 1 },
        apparait_si: [["ou", [["objet", "OBJ-06"]], [["objet", "OBJ-15"]]]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            si: [["objet", "OBJ-06"]],
            texte:
              "La viande du jour ne passera pas deux jours de plus. Je la mange ici, avec de l'eau froide par-dessus. C'est le bon moment, c'est tout ce qu'il y a à en dire.",
            effets: [
              { objet: "OBJ-06", quantite: -1 },
              { faim: -40 },
            ],
          },
          {
            si: [],
            texte:
              "Galettes sèches et eau froide. Ça tient le ventre. Ça ne fait pas plaisir.",
            effets: [
              { objet: "OBJ-15", quantite: -1 },
              { faim: -25 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Attendre à l'affût, à plat ventre sous les frênes",
        cout: { segments: 2, objet: { "OBJ-02": 1 } },
        apparait_si: [["competence", "C01"]],
        requiert: [["equipe_famille", "arc"], ["objet", "OBJ-02"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je me couche en amont des coulées, sous le vent, et je ne bouge plus. Un chevreuil descend boire avant l'ombre. Un seul trait, de près. Il ne repart pas.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { fatigue: 6 },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "G",
        libelle: "Laver la plaie à l'eau froide et la resserrer",
        cout: { segments: 1 },
        apparait_si: [["competence", "C04"], ["etat", "blesse_leger"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "L'eau est assez froide pour endormir la peau. Je lave, je retire ce qui traîne dedans, je serre avec une lanière propre. Ça se rouvrira si je force. Pour aujourd'hui, ça tient.",
            effets: [
              { retire_etat: "blesse_leger" },
              { sante_heros: 6 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Remonter du creux et reprendre la route",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: true,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Je remonte par les racines des frênes. En haut, le vent reprend tout de suite.",
            effets: [],
          },
        ],
      },
    ],
  },
```

### 6.2 Combat — `ST-CBT-01`

`content/storylets/combat.js`, lignes 1 à 429.

```js
// Combat narratif. Déclenché depuis ailleurs. L'adversaire arrive par
// la variable locale "ennemi" (CRE-01..CRE-06), valeur par défaut ci-dessous.

export const storylets = {
  "ST-CBT-01": {
    id: "ST-CBT-01",
    titre_travail: "Combat — le sol nu, le tronc, l'éboulis",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: false,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {
      ennemi: "CRE-05",
      lu: 0,
      touche: 0,
      garde: 0,
      couvert: 0,
    },
    regles_locales: [
      { si: [["tour>=", 4]], alors: [{ local: "presse", "=": true }] },
    ],
    texte: {
      arrivee:
        "Vingt pas de sol nu, et rien pour tricher. À gauche un tronc couché, gros, l'écorce partie. À droite l'éboulis : des cailloux plats qui glissent sous le pied, et qui s'entendent dès qu'on y met le poids. Derrière l'éboulis, un fourré d'épines assez épais pour qu'on n'y passe pas vite. L'autre est au bout du sol nu.",
      base:
        "Le tronc couché à gauche, l'éboulis à droite, les épines derrière. Vingt pas de sol nu entre eux deux.",
      variantes: [
        {
          si: [["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]]],
          ajout:
            "Un orc. Il ne court pas. Il avance du même pas et il regarde où il pose les pieds. Rien à lui crier qu'il comprenne.",
        },
        {
          si: [["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]]],
          ajout:
            "Un homme. Il tient sa lame trop haut et il souffle fort. Il a marché longtemps avant d'arriver là.",
        },
        {
          si: [["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]]],
          ajout:
            "Une bête. Le garrot bas, elle tourne pour garder le vent sur elle. On lui compte les côtes.",
        },
      ],
    },
    options: [
      {
        id: "OBS",
        libelle: "Rester derrière le tronc et le regarder venir",
        observation: true,
        apparait_si: [["!local", "lu"]],
        cout: { fatigue: 4 },
        issues: [
          {
            si: [["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]]],
            texte:
              "Le bouclier reste bas, à hauteur de hanche. Il pose toujours le pied droit en premier et la jambe ne plie pas bien. Tant qu'il avance comme ça, le côté gauche est ouvert.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]]],
            texte:
              "L'homme souffle par la bouche. La pointe tremble. Il regarde derrière lui deux fois en vingt pas. Il ne tiendra pas un échange long, et il le sait avant lui.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]]],
            texte:
              "Elle tourne pour garder le vent. Une patte avant se pose à plat, sans appui : quelque chose y a mordu avant lui. Elle viendra du côté sain.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il laisse venir et prend le temps qu'il faut. Il sait par où entrer, maintenant.",
            effets: [
              { local: "lu", "=": true },
              { local: "garde", "+=": 1 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "TIR",
        libelle: "Tirer pendant qu'il reste du sol nu",
        apparait_si: [["local<=", "garde", 0]],
        requiert: [["equipe_famille", "arc"], ["objet", "OBJ-02"]],
        cout: { objet: { "OBJ-02": 1 }, fatigue: 3 },
        issues: [
          {
            si: [
              ["competence", "C07"],
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]],
            ],
            sortie: true,
            texte:
              "Il laisse venir, puis il tire au moment exact où le poids passe sur la jambe touchée. La flèche entre au défaut de l'épaule. L'orc s'arrête, met un genou, et ne le relève pas.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 35 },
            ],
          },
          {
            si: [
              ["competence", "C07"],
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]],
            ],
            sortie: true,
            texte:
              "Il attend que l'homme se remette en garde et tire dans ce temps-là. C'est fini debout, à vingt pas, sans échange.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { stat_partie: { compteur: "humains_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 35 },
            ],
          },
          {
            si: [["competence", "C07"], ["local>=", "touche", 1]],
            sortie: true,
            texte:
              "Il attend qu'elle se pose sur la patte saine et lâche. La flèche prend derrière l'épaule. Elle fait trois pas de côté et se couche.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 35 },
            ],
          },
          {
            si: [["local>=", "touche", 1]],
            texte:
              "La deuxième part plus bas. Elle porte. Le pas se casse. L'autre continue, mais il faut maintenant qu'il y mette de la volonté.",
            effets: [
              { local: "garde", "+=": 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 5 },
            ],
          },
          {
            si: [],
            texte:
              "Il tire au moment où le pied se pose. La flèche entre et reste dedans. L'autre encaisse et avance quand même, un peu plus court.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "+=": 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "FORCE",
        libelle: "Traverser l'éboulis et entrer dedans",
        cout: { fatigue: 12, usure_arme: 5 },
        issues: [
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]],
            ],
            sortie: true,
            texte:
              "Il traverse en trois pas et entre sous la garde. Le coup passe. L'orc tombe en avant, sans un mot, comme ils tombent tous.",
            effets: [
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]],
            ],
            sortie: true,
            texte:
              "Il traverse et frappe avant que la lame redescende. L'homme lâche tout et s'assoit contre le tronc. Il ne se relève pas.",
            effets: [
              { stat_partie: { compteur: "humains_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["local>=", "touche", 1]],
            sortie: true,
            texte:
              "Il traverse l'éboulis en criant. Elle charge quand même. Le coup passe en travers du garrot. Elle va deux pas plus loin et s'arrête là.",
            effets: [
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["competence", "C03"]],
            texte:
              "Les cailloux partent sous lui mais il arrive la garde haute. Il prend l'échange sur le plat de l'arme au lieu des côtes, et il rend le sien. Ils sont au contact, et ce n'est pas lui qui recule.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { sante_heros: -3 },
              { xp: 15 },
            ],
          },
          {
            si: [],
            texte:
              "Les cailloux plats partent sous lui à mi-chemin. Il arrive mal, frappe quand même, et prend l'échange dans les côtes. Ils sont au contact, maintenant.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { sante_heros: -8 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "COUVERT",
        libelle: "Rompre et remettre le tronc entre eux",
        apparait_si: [["!local", "couvert"]],
        cout: { fatigue: 5 },
        issues: [
          {
            si: [["competence", "C03"], ["local>=", "garde", 2]],
            texte:
              "Il rompt en tenant la distance de bras, le fer entre eux deux. L'autre ne trouve pas d'angle. Le tronc revient dans son dos et la distance est refaite sans rien payer.",
            effets: [
              { local: "couvert", "=": true },
              { local: "garde", "=": 0 },
            ],
          },
          {
            si: [["local>=", "garde", 2]],
            texte:
              "Il rompt vers le tronc. L'autre suit de trop près et le touche à l'épaule avant qu'il passe derrière le bois. Le tronc tient. La distance est refaite.",
            effets: [
              { sante_heros: -5 },
              { local: "couvert", "=": true },
              { local: "garde", "=": 0 },
            ],
          },
          {
            si: [],
            texte:
              "Il recule derrière le tronc couché et pose l'épaule contre l'écorce partie. L'autre s'arrête au bord du sol nu. On recommence de loin.",
            effets: [
              { local: "couvert", "=": true },
              { local: "garde", "=": 0 },
            ],
          },
        ],
      },
      {
        id: "FLANC",
        libelle: "Prendre le côté qu'il ne couvre pas",
        apparait_si: [["local", "lu"]],
        cout: { fatigue: 8, usure_arme: 3 },
        issues: [
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-01"]], [["local=", "ennemi", "CRE-02"]]],
            ],
            sortie: true,
            texte:
              "Il passe par la gauche, du côté qui ne suit pas. Le bouclier part trop tard. L'orc tombe sur l'éboulis et les cailloux descendent avec lui.",
            effets: [
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [
              ["local>=", "touche", 1],
              ["ou", [["local=", "ennemi", "CRE-03"]], [["local=", "ennemi", "CRE-04"]]],
            ],
            sortie: true,
            texte:
              "Il entre du côté où l'homme regarde derrière lui. C'est fini avant que la lame redescende.",
            effets: [
              { stat_partie: { compteur: "humains_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["local>=", "touche", 1]],
            sortie: true,
            texte:
              "Il vient par la patte qui ne porte pas. Elle se retourne sur le mauvais appui et s'ouvre. Un coup suffit.",
            effets: [
              { stat_partie: { compteur: "betes_vaincues", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 30 },
            ],
          },
          {
            si: [["competence", "C03"]],
            texte:
              "Il entre par le côté ouvert, touche, et reste à distance de bras pendant que l'autre cherche l'angle. Rien ne passe. Ils sont nez à nez, et c'est lui qui a gardé la main.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { xp: 15 },
            ],
          },
          {
            si: [],
            texte:
              "Il prend le côté ouvert et touche. Pas assez profond. L'autre ferme la distance et ils se retrouvent nez à nez.",
            effets: [
              { local: "touche", "+=": 1 },
              { local: "garde", "=": 2 },
              { sante_heros: -3 },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "EPINES",
        libelle: "Reculer dans les épines sans se retourner",
        apparait_si: [["local", "couvert"]],
        sortie: true,
        cout: { segments: 1, fatigue: 6 },
        issues: [
          {
            si: [["local", "presse"]],
            texte:
              "Il entre à reculons. Ça tient, ça déchire, ça ne laisse pas passer vite. Il ressort de l'autre côté les avant-bras ouverts.",
            effets: [
              { etat: "blesse_leger" },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            si: [],
            texte:
              "Il glisse dans le fourré et se laisse tomber à plat. Les épines referment le passage derrière lui. Il compte jusqu'à cent avant de bouger.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "JETER",
        libelle: "Jeter la chasse du jour sur l'éboulis",
        apparait_si: [
          ["ou", [["local=", "ennemi", "CRE-05"]], [["local=", "ennemi", "CRE-06"]]],
          ["local>=", "garde", 1],
        ],
        requiert: [["objet", "OBJ-06"]],
        sortie: true,
        cout: { objet: { "OBJ-06": 1 } },
        issues: [
          {
            si: [],
            texte:
              "Il sort la viande du sac et la lance sur les cailloux plats. Elle s'arrête dessus et ne lève plus la tête. Il part par le fourré pendant qu'elle mange.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "RECULER",
        libelle: "Reculer à découvert sans le quitter des yeux",
        sortie: true,
        cout: { fatigue: 8 },
        issues: [
          {
            si: [["local>=", "garde", 2]],
            texte:
              "Il recule sans se retourner, le fer devant. L'autre le suit sur dix pas et place un coup avant de le laisser aller. Ça saigne, mais ça marche.",
            effets: [
              { sante_heros: -6 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
            ],
          },
          {
            si: [["local", "presse"]],
            texte:
              "Il recule. Les jambes ont pris. L'autre le laisse partir plus par choix que par fatigue.",
            effets: [
              { sante_heros: -4 },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
            ],
          },
          {
            si: [],
            texte:
              "Il recule à découvert, face à l'autre, sans presser. Vingt pas, puis la lisière. Personne n'a bougé le premier.",
            effets: [
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
    ],
  },
```

---

## 7. Les « à revoir » sur l'héritage v1

Remontés par les contrôles ajoutés à l'étape 1. **46 au total, 0 bloquant.**
Non corrigés, conformément à la mission.

```
bloquants : 0 | à revoir : 46
  ~ nom_perime (9) : ST-OUV-01 [arrivee:Mathieu], ST-OUV-02 [arrivee:Joé], ST-OUV-02 [issueA0:Mathieu], ST-OUV-02 [optB:Joé], ST-OUV-02 [issueB0:Joé], pnj [PNJ-F1.nom:Mathieu], pnj [PNJ-F2.nom:Joé], journal [ouv_forge:Mathieu], journal [ouv_maison:Joé]
  ~ mot_rare (28) : ST-P01-01 [issueA1:layon], ST-P01-01 [issueA2:layon], ST-P01-02 [optA:layon], ST-P01-02 [issueA0:layon], ST-P01-02 [issueB0:layon], ST-P04-01 [arrivee:dévers], ST-P04-01 [arrivee:layon], ST-P04-01 [optC:dévers], ST-P04-01 [issueE1:layon], ST-P04-02 [arrivee:layon], ST-P04-02 [base:layon], ST-P05-03 [issueB1:layon], ST-P05-03 [issueC1:layon], ST-P05-03 [issueN1:layon], ST-P05-03 [issueD1:layon], ST-EVT-02 [arrivee:dévers], ST-EVT-02 [variante1:dévers], points [P04.nom:layon], points [P04.nom_court:layon], points [P04.note_carte:dévers], objets [OBJ-14.description:dévers], creatures [CRE-06.nom:dévers], departs [D02.description:dévers], mutateurs [M05.description:dévers], voyage [generiques[1]:layon], voyage [conditionnelles[0].texte:dévers], journal [layon_passe:layon], journal [layon_chute:layon]
  ~ indice_et_journal (9) : ST-P01-01 [optA:2], ST-P01-02 [optA:0], ST-P02-02 [optB:0], ST-P05-03 [optB:0], ST-P05-03 [optC:0], ST-P05-03 [optN:0], ST-P05-03 [optD:0], ST-P06-03 [optTABLEAU:0], ST-P06-03 [optTABLEAU:1]
```

### Lecture

- **`nom_perime` (9)** — `Mathieu` et `Joé` sont les noms v1 des frères. Le
  canon les remplace par `Mathias` et `Jonas`. Occurrences dans `ST-OUV-01`,
  `ST-OUV-02`, `content/pnj.js` (`PNJ-F1`, `PNJ-F2`) et deux clés de journal.
  Les deux storylets concernés sont proposés « retirés » au §5 ; restent les
  fiches PNJ et le journal.
- **`mot_rare` (28)** — deux mots seulement : `layon` (16) et `dévers` (12).
  `layon` est le nom même de `P04` (`points.js`, deux champs) et irrigue
  `ST-P01-01`, `ST-P01-02`, `ST-P04-01`, `ST-P04-02`, `ST-P05-03` et deux
  clés de journal. `dévers` touche aussi `objets.js`, `creatures.js`
  (le nom de `CRE-06`), `departs.js`, `mutateurs.js` et `voyage.js`.
  Le contrat §3 signalait déjà « Le Layon » comme à renommer.
- **`indice_et_journal` (9)** — neuf issues posent un indice et une entrée de
  journal ensemble, ce que le contrat §18 interdit désormais. Concentrées sur
  les quatre storylets porteurs d'indices : `ST-P01-01`, `ST-P01-02`,
  `ST-P02-02`, `ST-P05-03`, `ST-P06-03`.
- **Aucune occurrence** de `lexique_chretien`, `mot_sensible`,
  `issue_tiree_letale`, `majeur_sans_issue_partielle` ni
  `indice_dans_recombinable` dans le contenu v1.
