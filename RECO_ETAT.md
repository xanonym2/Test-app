# Val-de-Garde — relevé d'état

Dépôt `xanonym2/Test-app`, branche `claude/new-session-ftellm`, commit `9f05e33`.
Relevé du 2026-09-19 20:39 UTC. Lecture seule : aucun fichier modifié, aucun commit, aucun push.

Ce document contient du **contenu narratif du jeu** (sections 5 et 6), affiché sur
demande explicite du propriétaire du projet. La contrainte de non-divulgation du
`CLAUDE.md` a été levée pour ce relevé.

Sommaire :
1. Test web — échec
2. État du vérificateur
3. Contrat de contenu (verbatim)
4. Constantes de règles (verbatim)
5. Inventaire des 22 storylets
6. Deux storylets complets (verbatim)
7. Volumétrie

---

# 1. TEST WEB

`npx expo export --platform web` — **ÉCHEC**.

Sortie brute :

```
Error: HTTP Proxy Network Error: Forbidden
Error: HTTP Proxy Network Error: Forbidden
    at ClientRequest.<anonymous> (/home/user/Test-app/node_modules/fetch-nodeshim/dist/minifetch.js:353:13)
    at Object.onceWrapper (node:events:634:26)
    at ClientRequest.emit (node:events:519:28)
    at Socket.socketOnData (node:_http_client:655:11)
    at Socket.emit (node:events:519:28)
    at addChunk (node:internal/streams/readable:561:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:512:3)
    at Readable.push (node:internal/streams/readable:392:5)
    at TCP.onStreamRead (node:internal/stream_base_commons:189:23)
EXIT:1
```

Dépendances web au moment du relevé :

```
react-dom           : ABSENT
react-native-web    : ABSENT
@expo/metro-runtime : ABSENT

dependencies déclarées dans package.json :
  @react-native-async-storage/async-storage: ^3.1.1
  expo: ~57.0.20
  expo-status-bar: ~57.0.1
  react: 19.2.3
  react-native: 0.86.3
```

---

# 2. ÉTAT DU VÉRIFICATEUR

`npm run verif`

```

> val-de-garde@1.0.0 verif
> node outils/verifier.mjs

=== CONTENU ===
storylets      : 22
  par lieu     : {"declenche_uniquement":3,"P01":2,"P02":3,"P03":2,"P04":2,"P05":4,"P06":3,"partout":3}
objets         : 15 | modificateurs : 8
créatures      : 6 | pnj : 7
compétences    : 9 | badges : 10
départs        : 3 | mutateurs : 6
points         : 6 | fins : 6
clés journal   : 26

=== VÉRIFICATION ===
bloquants : 0 | à revoir : 0

=== PARTIES AUTOMATIQUES ===
  parties OK   : 30 / 30   (crashs : 0)
  actions moy  : 38.9 | jours moy : 8.0
  niveau moy   : 6.2 | xp moy : 402.0
  scènes vues  : 16.2 / 22 | points visités : 4.7 / 6
  savoir moy   : 1.5 | badges moy : 3.5
  compagnons   : 0.5 | compétences prises : 2.9 | groupes fermés : 2.9
  santé finale : 27.4 / 50.0 | dégâts subis : 8.6
  pic de faim  : 86.3 / 100 | combats : 0.8
  parties où la survie a mordu : 16 / 30
  fins         : {"FIN-OUEST-RAPPORT":3,"FIN-OUEST-ENTAME":11,"FIN-OUEST-SAVOIR":7,"FIN-OUEST-SEUL":4,"FIN-OUEST-COMPAGNIE":4,"aucune":1}
EXIT:0
```

---

# 3. CONTRAT DE CONTENU — `content/CONTRAT.md`

Verbatim, intégral.

````markdown
# Contrat de contenu — Val-de-Garde (MVP)

Ce document est la **spécification mécanique** du contenu. Il fixe les
identifiants, les schémas de données, les valeurs d'équilibrage et les
obligations de chaque fichier. Il ne contient aucun texte narratif : la prose
est écrite directement dans les fichiers `/content/*.js`.

Tout fichier de contenu exporte des objets JS indexés par identifiant.
Le moteur ne lit **que** des identifiants ; tout ce qui est affiché vient d'ici.

---

## 0. Règles de style — non négociables

Elles viennent du brief et priment sur toute considération d'auteur.

1. **Phrases courtes.** Pas de subordonnées empilées.
2. **Vocabulaire courant.** Pas de mot rare, pas de tournure littéraire.
3. **Une image forte par scène. Jamais cinq.**
4. **3 à 4 phrases pour planter le décor**, puis on agit.
5. **Le détail est diagnostique, jamais décoratif.** Tout détail décrit doit
   pouvoir servir une décision. Si un élément du décor n'est repris par aucune
   option, il ne doit pas être écrit.
6. **Bannis** : « une atmosphère pesante », « un silence inquiétant », et toute
   formule d'ambiance qui ne décrit rien.
7. **Aucune exposition** après l'ouverture. Le héros connaît son monde : la
   narration énonce les choses comme des faits acquis, au détour d'autre chose.
8. Le héros est chasseur : il **nomme précisément** ce qu'il connaît (traces,
   essences, bruits, vent, état d'une piste) et reste **vague** sur ce qu'il
   ignore (magie, politique, armes de guerre).
9. **Le texte narre, il ne calcule jamais.** Aucun chiffre de règle dans la prose.
10. **Un libellé d'option décrit ce qu'on fait et ce qu'on perçoit**, jamais ce
    qu'on va obtenir. (« Suivre la trace vers le dévers », pas « Gagner 2 flèches ».)
11. Longueurs : `texte.arrivee` ≤ 110 mots · `texte.base` ≤ 70 mots ·
    `variantes[].ajout` ≤ 30 mots · `issues[].texte` ≤ 70 mots ·
    `libelle` ≤ 12 mots.
12. **2 à 3 variantes** conditionnelles par storylet, pas plus.

---

## 1. Univers (rappel factuel, à ne jamais ré-exposer en jeu)

Médiéval fantastique. Quatre puissances : **la Couronne** (ordre humain,
militaire), **les Terres Noires** (les orcs), **les Terres Scellées** (l'Ordre,
les mages), **les Terres Libres** (les Marchands, routes et comptoirs).

Guerre contre les orcs achevée il y a huit ans. Version officielle : ils ont
attaqué, on s'est défendus, on les a repoussés. La paix tient depuis.

Héros : homme, 25 ans, ancien soldat reconverti en chasseur. Il nourrit
**Val-de-Garde**, village frontalier né d'un ancien poste de garde dont plus
personne ne monte la garde. Parents morts. Deux frères portés disparus :
**Mathieu** (20 ans, forgeron) et **Joé** (28 ans).

Orcs : perçus comme des barbares. Organisés, implacables, impossibles à
négocier. Ils ne parlent pas la langue humaine. Ils tuent et détruisent mais
**ne pillent pas**.

Ton : pas de narration guidée, pas de choix évidents. Ressources rares, erreurs
coûteuses. La valeur morale porte sur les êtres pensants, pas sur les animaux.

**Trois noms maximum** posés avant l'attaque.

---

## 2. Espaces d'identifiants

| Domaine | Forme | Exemples |
|---|---|---|
| Points d'intérêt | `P01`..`P06` | fixés §3 |
| Storylets | `ST-<zone>-<nn>` | `ST-OUV-01`, `ST-P04-02` |
| Objets (base) | `OBJ-nn` | `OBJ-07` |
| Modificateurs | `MOD-Pn` (préfixe) / `MOD-Sn` (suffixe) | `MOD-P2` |
| Créatures | `CRE-nn` | `CRE-03` |
| PNJ | `PNJ-nn` | `PNJ-02` |
| Compétences | `C01`..`C09` | |
| Badges | `B01`..`B10` | |
| Départs | `D01`..`D03` | |
| Mutateurs | `M01`..`M06` | |
| Drapeaux | `f_<mecanique>` | `f_indice_1` |
| Variables locales | minuscules libres | `observe`, `tour_alerte` |

Les identifiants sont **stables et ne changent jamais**, indépendamment du nom
affiché (règle non négociable n°1).

---

## 3. Carte — 6 points d'intérêt

| ID | Rôle | Système enseigné | Obligatoire |
|---|---|---|---|
| `P01` | La Crête — promontoire | Observation graduée, temps, carte | **oui, entrée** |
| `P02` | La Ferme | Fouille, ressources, scène à états | non |
| `P03` | La Source | Survie, partage (**scène de respiration**) | non |
| `P04` | Le Layon | Risque, échec, confiance | non |
| `P05` | Le Camp des fuyards | Information sociale, recrutement | convergence |
| `P06` | Le Vieux Poste | Équipement, usure, portage | non |

**Un seul système enseigné par point.** Ordre pédagogique imposé : `P03`
enseigne la valeur de l'eau **avant** qu'elle devienne un dilemme en `P04`.

Graphe (coût en segments, symétrique) :

```
P01–P02 1   P01–P03 1   P01–P04 2   P01–P05 2   P01–P06 2
P02–P03 1   P02–P06 1   P03–P04 1   P04–P05 1   P05–P06 1
```

`P01` est découvert d'office. Les autres sont découverts par l'observation
en `P01` (`{ debloque_point: "Pxx" }`).

---

## 4. Liste des storylets à produire (22)

Chaque ligne fixe : le fichier, le lieu, la priorité, l'unicité, et les
**obligations mécaniques** (effets qui doivent exister quelque part dans le
storylet). Le reste est libre.

### `content/storylets/ouverture.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-OUV-01` | `declenche_uniquement` | 10 | oui | **1 seul tour.** Scène de vie ordinaire, très brève. Contient **au moins une décision réelle** aux effets distincts (au moins 2 options avec des effets différents : objet, flag ou confiance). Au plus **3 noms** posés. Se termine par `{ declenche: "ST-OUV-02" }`. |
| `ST-OUV-02` | `declenche_uniquement` | 10 | oui | Le retour sur le village attaqué. Le héros **ne peut rien faire seul**. 1 à 2 tours. Chaque option pose un flag distinct (`f_ouv_*`) et coûte quelque chose. Se termine par `{ debloque_point: "P01" }`, `{ journal: "...", majeure: true }`, `{ xp: 30 }` et une option `sortie: true` menant à la fuite vers l'ouest. |

Contrainte **absolue** : le premier vrai choix arrive en **moins de 2 minutes**
de lecture. Compte ~180 mots/minute : l'ouverture entière avant le premier
choix ne dépasse pas **200 mots**.

### `content/storylets/p01.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P01-01` | `P01` | 9 | oui | Enseigne l'**observation graduée** (10.4). 3 tours max. Une option `observation: true` répétable avec `cout.segments: 1`, dont chaque passage révèle une couche : passage 1 → `{ debloque_point: "P02" }` + `{ debloque_point: "P03" }` ; passage 2 → `{ debloque_point: "P06" }` + `{ debloque_point: "P04" }` ; passage 3 → `{ debloque_point: "P05" }` + **indice 1** (`{ connaissance_sortilege: "+1" }`, `{ flag: "f_indice_1" }`). Utiliser une variable locale `couche` (0→3). Sortie disponible à chaque tour. `{ xp: 25 }`. |
| `ST-P01-02` | `P01` | 4 | non | Visites suivantes. Court. Permet de se repérer : une option d'observation qui, si `f_indice_1` absent, peut encore le donner. `{ xp: 10 }`. |

### `content/storylets/p02.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P02-01` | `P02` | 9 | oui | Enseigne la **fouille** et la **scène à états** : au moins 2 variantes conditionnées par l'état du héros (`['etat','affame']`, `['etat','blesse_leger']`, `['meteo','pluie']`). Fouiller donne des objets via `{ objet: "OBJ-xx", tire: true }`. Pose `f_ferme_fouillee`. `{ xp: 25 }`. |
| `ST-P02-02` | `P02` | 7 | oui | Seconde couche, nécessite `f_ferme_fouillee`. Contient **l'indice 2** (« ils ont tué et n'ont rien pris ») : `{ connaissance_sortilege: "+1" }`, `{ flag: "f_indice_2" }`. Lecture innocente possible et immédiate. `{ xp: 25 }`. |
| `ST-P02-03` | `P02` | 6 | oui | Menace. Doit pouvoir déclencher le combat : une issue avec `{ declenche: "ST-CBT-01" }`. Au moins deux manières de se dérober, chacune avec un coût distinct (temps, objet, ou `{ etat: "blesse_leger" }`). |

### `content/storylets/p03.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P03-01` | `P03` | 9 | oui | **Scène de respiration** (10.9) : aucune menace, aucun jet raté possible. Enseigne l'eau comme **objet** : options de remplissage `{ objet: "OBJ-05", quantite: N }` limitées par `OBJ-04`. Repos possible : `{ fatigue: -35 }` pour `cout.segments: 2`. `{ xp: 20 }`. |
| `ST-P03-02` | `P03` | 7 | oui | Le **partage**. Un PNJ demande de l'eau. Donner : `{ objet: "OBJ-05", quantite: -1 }`, `{ confiance: {...} }`, `{ stat_partie: { compteur: "eau_partagee", valeur: 1 } }`. Refuser : effet distinct et réel. Pose `f_source_partage` ou `f_source_refus`. `{ journal: "...", majeure: true }`. |

### `content/storylets/p04.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P04-01` | `P04` | 9 | oui | Enseigne le **risque et l'échec**. Applique 10.3 : l'environnement est décrit en premier et **chaque option découle d'un élément décrit**. Au moins une option risquée avec ≥ 2 issues aux effets distincts (`probabilite` + `modif_proba` sur `['stat>=','adresse',4]` et sur la possession de `OBJ-05`). L'échec donne `{ etat: "blesse_jambe" }` ou `{ sante_heros: -N }`. Une option d'observation coûtant du temps. `{ xp: 30 }`. |
| `ST-P04-02` | `P04` | 7 | oui | Conséquence et **confiance**. Conditionné par le résultat du précédent (`f_layon_reussi` / `f_layon_rate`). Un différé possible : `{ differe: { evenement: "ST-EVT-01", dans_jours: 1 } }`. `{ xp: 20 }`. |

### `content/storylets/p05.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P05-01` | `P05` | 9 | oui | **Information sociale**. Présente 2 PNJ recrutables (`PNJ-01`, `PNJ-02`) et 1 PNJ d'information (`PNJ-03`). Aucune recrue ici : on écoute. Pose `f_camp_atteint`, `{ xp: 25 }`. |
| `ST-P05-02` | `P05` | 7 | oui | **Recrutement exclusif** : `PNJ-01` et `PNJ-02` ne peuvent **pas** être recrutés tous les deux dans la même partie. Recruter l'un pose `f_recrue_prise` ; l'autre devient inaccessible (`apparait_si: [['!flag','f_recrue_prise']]`). Effet : `{ compagnon: "PNJ-0x" }`, `{ journal: "...", majeure: true }`. |
| `ST-P05-03` | `P05` | 6 | oui | Information contre quelque chose. `PNJ-03` donne un élément de compréhension coûteux (objet, temps ou réputation). Peut donner **l'indice 3** si et seulement si `f_indice_3` n'a pas déjà été posé au `P06`. |
| `ST-P05-04` | `P05` | 8 | oui | `conditions.requis: [['jour>=',5]]`. **Pression de fond** : le camp se défait. Ferme définitivement le recrutement (`{ flag: "f_camp_ferme" }`) et rend `ST-P05-02` indisponible. |

### `content/storylets/p06.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-P06-01` | `P06` | 9 | oui | Enseigne **équipement, usure, portage**. Butin lourd : au moins une option qui met explicitement en tension le poids (`{ objet: ..., tire: true }` d'un objet ≥ 4 kg). Au moins une variante conditionnée par `['surcharge']`. `{ xp: 25 }`. |
| `ST-P06-02` | `P06` | 7 | oui | **Réparation** : `{ objet: "OBJ-13", quantite: -1 }` → `{ usure: "arme_equipee", valeur: +35 }`. Coût en segments. Une variante si l'arme équipée est déjà en bon état. |
| `ST-P06-03` | `P06` | 6 | oui | **Indice 3** (garnison redéployée vers l'est peu avant l'attaque + le nom du **capitaine Vairon** cité en passant). `{ connaissance_sortilege: "+1" }`, `{ flag: "f_indice_3" }`, `{ pnj_statut: { id: "PNJ-V1", valeur: "cite" } }`. Lecture innocente : mauvais commandement. |

### `content/storylets/combat.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-CBT-01` | `declenche_uniquement` | 10 | non | **Combat narratif**, 2 à 4 tours, état local. §27 : l'environnement est décrit d'abord, les options en découlent. **Dégâts déterministes** — les `issues` se choisissent par `si`, pas par `probabilite`. L'incertitude porte sur l'**information** : une option d'observation révèle l'état réel de l'adversaire (variable locale `lu`). Postures distinctes aux compromis clairs. Plusieurs manières de se dérober, chacune avec son coût. Compteurs : `{ stat_partie: { compteur: "orcs_vaincus"/"humains_vaincus"/"betes_vaincues", valeur: 1 } }`, `combats_gagnes`, `combats_evites`, `fleches_tirees`. |

### `content/storylets/evenements.js`
| ID | Lieu | Prio | Unique | Obligations |
|---|---|---|---|---|
| `ST-EVT-01` | `partout` | 8 | oui | Évènement de pression, `requis: [['jour>=',3]]`. Court, 1 tour. Rappelle que le monde se dégrade. |
| `ST-EVT-02` | `partout` | 3 | non | **Nuit à découvert**, `requis: [['segment>=',5]]`. Repos possible : `{ fatigue: -40 }`, `cout.segments: 2`, `{ stat_partie: { compteur: "nuits_a_decouvert", valeur: 1 } }`. Si `['meteo','gel']` ou `['meteo','pluie']`, coût supplémentaire. |
| `ST-FIN-01` | `partout` | 10 | oui | `requis: [['ou', [['jour>=',8]], [['flag','f_pret_a_partir']]]]`. Convergence : partir vers l'ouest. Chaque option mène à `{ fin: "FIN-xx" }`. Au moins 3 fins distinctes selon `connaissance_sortilege`, présence de compagnons, et état du héros. |

### Règles de contenu — non négociables (rappel)

1. Un libellé décrit ce qu'on fait et ce qu'on perçoit, jamais ce qu'on va
   obtenir. Les **coûts concrets** restent affichés (`cout`).
2. Le texte narre, il ne calcule jamais.
3. Toute option risquée a **au moins deux issues** aux effets distincts.
4. Un storylet qui ne modifie l'état d'aucune façon n'a pas sa place.
5. Une **sortie est toujours disponible** à chaque tour (`sortie: true`).
6. **3 à 5 options par tour.**
7. Une option d'**observation** coûtant du temps partout où il y a un risque.
8. Les **différés** ont leur issue déterminée au moment du choix
   (`{ differe: { evenement, resolution, dans_jours } }`).

---

## 5. Schéma d'un storylet

```js
'ST-P02-01': {
  id: 'ST-P02-01',
  titre_travail: 'court, pour les outils — jamais affiché',
  lieu: { type: 'point_interet', cible: 'P02' },
  conditions: { requis: [], interdit: [] },
  unique: true,
  priorite: 9,
  poids: 10,
  duree_segments: 1,
  etat_local_initial: { fouille: 0 },
  texte: {
    arrivee: 'première visite',
    base: 'visites suivantes',
    variantes: [
      { si: [['etat', 'affame']], ajout: 'une phrase' },
      { si: [['local>=', 'fouille', 2]], remplace: 'texte complet' },
    ],
  },
  regles_locales: [
    { si: [['local>=', 'fouille', 3]], alors: [{ local: 'epuise_lieu', '=': true }] },
  ],
  options: [
    {
      id: 'A',
      libelle: 'ce qu'on fait et ce qu'on perçoit',
      cout: { segments: 1 },          // aussi: fatigue, objet: {'OBJ-05':1}, usure_arme: 5
      apparait_si: [['!local', 'epuise_lieu']],
      requiert: [['objet', 'OBJ-14']], // visible mais grisée si faux
      epuisable: false,
      observation: false,
      deplacement: false,
      sortie: false,
      modif_proba: [{ si: [['stat>=', 'perception', 4]], valeur: 15 }],
      issues: [
        { probabilite: 65, reussite: true, si: [], texte: '…', effets: [ ... ] },
        { probabilite: 35, si: [], texte: '…', effets: [ ... ] },
      ],
    },
  ],
}
```

`lieu.type` ∈ `point_interet` · `zone` · `territoire` · `type_lieu` · `partout` ·
`declenche_uniquement`.

Sélection : parmi les storylets disponibles au point courant, la **priorité la
plus haute** gagne ; à égalité, tirage pondéré par `poids`.

### Conditions — opérateurs disponibles

Une condition est un tableau terse. Une liste de conditions est un **ET**.

```
['flag', id] ['!flag', id]
['local', n] ['!local', n] ['local=', n, v] ['local>=', n, v] ['local<=', n, v]
['objet', id] ['!objet', id] ['objet>=', id, n] ['objet<=', id, n]
['equipe_famille', 'arc'] ['usure<=', id, n] ['usure>=', id, n] ['surcharge']
['stat>=', stat, n] ['stat<=', stat, n] ['niveau>=', n]
['competence', id] ['!competence', id]
['etat', id] ['!etat', id]
['sante<=', n] ['sante>=', n] ['fatigue>=', n] ['fatigue<=', n]
['faim>=', n] ['faim<=', n]
['jour>=', n] ['jour<=', n] ['segment>=', n] ['segment<=', n] ['meteo', m] ['nuit']
['position', p] ['visite', p] ['!visite', p] ['decouvert', p] ['bloque', p]
['compagnon', id] ['!compagnon', id] ['compagnons>=', n]
['confiance>=', id, n] ['confiance<=', id, n] ['pnj_statut', id, v]
['reputation>=', f, n] ['reputation<=', f, n]
['savoir>=', n] ['acte>=', n] ['mutateur', id] ['depart', id]
['vu', storyletId] ['!vu', storyletId] ['stat_partie>=', compteur, n]
['tour', n] ['tour>=', n] ['tour<=', n]
['ou', [conds], [conds]] ['non', [conds]]
```

### Effets — formes disponibles

```
{ objet: 'OBJ-xx', quantite: N }                  // N<0 pour retirer
{ objet: 'OBJ-xx', tire: true }                   // tire préfixe/suffixe/usure
{ objet: 'OBJ-xx', usure: 60, prefixe: 'MOD-P1' } // instance dirigée
{ usure: 'OBJ-xx' | 'arme_equipee', valeur: ±N }
{ sante_heros: ±N } { fatigue: ±N } { faim: ±N }
{ etat: 'blesse_leger' } { retire_etat: 'blesse_leger' }
{ xp: N } { point_stat: N } { competence_offerte: 1 }
{ reputation: { faction: 'couronne', valeur: ±N } }
{ confiance: { pnj: 'PNJ-01', valeur: ±N } }
{ pnj_statut: { id: 'PNJ-01', valeur: 'vivant_allie' } }
{ compagnon: 'PNJ-01' } { retire_compagnon: 'PNJ-01', statut: 'mort' }
{ sante_compagnon: { id: 'PNJ-01', valeur: -8 } }
{ connaissance_sortilege: '+1' }
{ flag: 'f_x' } { retire_flag: 'f_x' }
{ stat_partie: { compteur: 'orcs_vaincus', valeur: 1 } }
{ local: 'nom', '=': valeur }   ou   { local: 'nom', '+=': 1 }
{ segments: N }
{ lieu_bloque: { id: 'P02', duree_jours: 3 } } { debloque_point: 'P04' }
{ differe: { evenement: 'ST-EVT-01', resolution: 'x', dans_jours: 2 } }
{ declenche: 'ST-CBT-01' }
{ journal: 'cle_courte', majeure: true }   // alimente le bilan de fin
{ acte: 2 } { fin: 'FIN-xx' }
```

`{ journal: 'cle' }` : la clé doit exister dans `content/journal.js`
(`journal['cle'] = 'phrase affichée dans le bilan'`).

---

## 6. Objets — 15 bases

`content/objets.js` exporte `objets` (indexé par id) :

```js
'OBJ-01': { id, nom, categorie, famille, poids, degats, protection, empilable,
            usable, description, effets_consommation }
```

| ID | Catégorie | Famille | Poids | Dégâts | Prot. | Empilable | Usable | Rôle imposé |
|---|---|---|---|---|---|---|---|---|
| `OBJ-01` | arme | `arc` | 2.0 | 7 | — | non | oui | Arme de départ. Distance, munitions limitées, silencieux. |
| `OBJ-02` | ressource | — | 0.05 | — | — | **oui** | non | Munitions de l'arc. |
| `OBJ-03` | arme | `lame_legere` | 0.6 | 4 | — | non | oui | Arme de départ secondaire. Rapide, faible dégât. |
| `OBJ-04` | divers | — | 0.4 | — | — | non | oui | Contenant : limite la quantité d'eau transportable (3). |
| `OBJ-05` | consommable | — | 0.5 | — | — | **oui** | non | L'eau est un **objet**, pas une jauge. `{ fatigue: -8 }`, retire `assoiffe`. |
| `OBJ-06` | consommable | — | 1.2 | — | — | **oui** | non | La chasse du jour. `{ faim: -40 }`. Se gâte : voir `perissable: 3` (jours). |
| `OBJ-07` | arme | `lame_longue` | 1.8 | 9 | — | non | oui | Polyvalent. |
| `OBJ-08` | arme | `lourde` | 4.5 | 14 | — | non | oui | Lent, gros dégât. Met le portage en tension. |
| `OBJ-09` | arme | `hast` | 3.2 | 11 | — | non | oui | Allonge. |
| `OBJ-10` | protection | — | 2.5 | — | 3 | non | oui | Légère. |
| `OBJ-11` | protection | — | 6.0 | — | 7 | non | oui | Lourde. Met le portage en tension. |
| `OBJ-12` | consommable | — | 0.2 | — | — | **oui** | non | Soin : `{ sante_heros: +10 }`, retire `blesse_leger`. |
| `OBJ-13` | ressource | — | 1.0 | — | — | **oui** | non | Matériaux de réparation. |
| `OBJ-14` | divers | — | 1.5 | — | — | non | oui | Outil d'escalade/franchissement. Ouvre des options. |
| `OBJ-15` | consommable | — | 0.4 | — | — | **oui** | non | Vivres sèches. `{ faim: -25 }`. Ne se gâte pas. |

Chaque objet porte une `description` d'**une phrase**, factuelle, qui dit à
quoi il sert — jamais un chiffre de règle.

### Modificateurs — `content/modificateurs.js`

4 préfixes (`MOD-P1`..`MOD-P4`) et 4 suffixes (`MOD-S1`..`MOD-S4`).

```js
'MOD-P1': { id, type: 'prefixe', nom, poids: 10, categories: ['arme'],
            degats: +2, protection: 0, poids_facteur: 1.0, note }
```

Deux préfixes péjoratifs (dégâts/protection négatifs), deux mélioratifs.
Les suffixes racontent une **provenance** et donnent un effet modeste.
Le nom affiché d'une instance se compose : `« <préfixe> <nom de base> <suffixe> »`.

---

## 7. Créatures — `content/creatures.js` — 6

```js
'CRE-01': { id, nom, type: 'orc'|'humain'|'bete', pv, degats, note }
```

Répartition imposée : **2 orcs, 2 humains, 2 bêtes**. `note` = une phrase
diagnostique (ce qu'un chasseur remarque et qui sert à décider).
`type` alimente le bon compteur du bilan.

---

## 8. PNJ — `content/pnj.js` — 4 nommés + 3 statuts

```js
'PNJ-01': { id, nom, role: 'melee'|'distance'|'soutien', stats: {...},
            competences: [], niveau: 1, niveau_max: 5, montee: ['vigueur','adresse'],
            equipement: ['OBJ-xx'], confiance_initiale: 0,
            apport_hors_combat: 'une phrase', description: 'deux phrases max' }
```

| ID | Rôle | Recrutable | Contrainte |
|---|---|---|---|
| `PNJ-01` | combat rapproché | oui | **Exclusif avec `PNJ-02`** |
| `PNJ-02` | distance ou soutien | oui | **Exclusif avec `PNJ-01`** |
| `PNJ-03` | information | non | Donne du savoir contre un coût |
| `PNJ-04` | présence au camp | non | Peut mourir selon les choix |

Statuts seuls (aucune fiche complète, juste `nom` pour le bilan) :
`PNJ-F1` = **Mathieu**, `PNJ-F2` = **Joé**, `PNJ-V1` = **capitaine Vairon**.

Statuts possibles : `inconnu`, `disparu`, `vivant_allie`, `vivant_hostile`,
`blesse`, `mort`, `cite`.

Les deux recrutables ont des stats de **somme égale** (10) réparties
différemment, et des apports hors combat clairement distincts.

---

## 9. Compétences — `content/competences.js` — 9

```js
'C01': { id, nom, groupe: 'G1', niveau_min: 2, type: 'passif'|'activable',
         description: 'ce qu'elle fait, concrètement', effet_resume: 'une ligne' }
```

Choisir une compétence d'un groupe **ferme le groupe** : les autres deviennent
inaccessibles pour la partie. C'est le moteur des trajectoires exclusives.

| ID | Groupe | Niveau | Type | Axe imposé |
|---|---|---|---|---|
| `C01` | G1 | 2 | passif | Tir / chasse |
| `C02` | G1 | 2 | passif | Discrétion / évitement |
| `C03` | G2 | 4 | passif | Combat rapproché |
| `C04` | G2 | 4 | activable | Soin / survie |
| `C05` | G3 | 6 | passif | Social / meneur (compagnons) |
| `C06` | G3 | 6 | passif | Pistage / lecture du terrain |
| `C07` | G4 | 8 | activable | Finisseur orienté combat |
| `C08` | G4 | 8 | passif | Finisseur orienté endurance/portage |
| `C09` | G4 | 8 | passif | Finisseur orienté information |

Les compétences sont **lues par le contenu** via `['competence','C0x']` dans les
`apparait_si` et `modif_proba`. Chaque compétence doit être référencée par au
moins un storylet, sinon elle n'existe pas en jeu.

---

## 10. Badges — `content/badges.js` — 10

```js
'B01': { id, nom, description, test: (E) => E.stats_partie.xxx >= n }
```

Uniquement branchés sur `E.stats_partie`, `E.recit`, `E.geo`, `E.compagnons`.
Axes imposés : exploration, savoir (les 3 indices), combat, évitement,
altruisme (eau partagée), équipe, vitesse (fin avant J+6), survie
(aucune blessure grave), artisanat (réparations), endurance (nuits dehors).

---

## 11. Départs — `content/departs.js` — 3

```js
'D01': { id, nom, description: 'deux phrases, ce que ça change concrètement',
         inventaire: [{ base, quantite, usure }], effets: [...],
         storylet_ouverture: 'ST-OUV-01' }
```

| ID | Forme imposée |
|---|---|
| `D01` | Parti chasser loin — arrive **plus tard**, mais avec de la chasse. `{ segments: 2 }`, plus de `OBJ-06`. |
| `D02` | Blessé dès le début — `{ etat: 'blesse_leger' }`, `{ sante_heros: -8 }`, mais un objet de valeur en plus. |
| `D03` | Accompagné d'un proche — `{ compagnon: 'PNJ-04' }` dès le départ, **qui peut mourir dans l'heure** (le contenu doit lui offrir une vraie fenêtre de mort). |

## 12. Mutateurs — `content/mutateurs.js` — 6, 3 groupes

```js
'M01': { id, nom, groupe: 'climat'|'faction'|'route', description: 'une phrase',
         effets: [...], meteo_poids: { gel: 3, pluie: 2 } }
```

| ID | Groupe | Forme imposée |
|---|---|---|
| `M01` | climat | Hiver rude : `meteo_poids` favorise `gel`, coût de survie accru. |
| `M02` | climat | Saison humide : favorise `pluie` et `brume`. |
| `M03` | faction | La Couronne en position de force : `{ reputation: { faction: 'couronne', valeur: 10 } }`. |
| `M04` | faction | Les orcs pressent : pression avancée d'un jour. `{ flag: 'f_mut_orcs' }` |
| `M05` | route | Une route coupée : `{ lieu_bloque: { id: 'P04', duree_jours: 3 } }` |
| `M06` | route | Passage dégagé : un point supplémentaire connu d'avance. |

1 à 2 mutateurs tirés au départ, jamais deux du même groupe.

## 13. Météo — `content/meteo.js`

```js
export const meteo = {
  table: [ { id: 'clair', nom, poids: 30, note }, ... ],
};
```
Les 5 météos de `engine/schema.js` : `clair`, `couvert`, `pluie`, `brume`, `gel`.
`note` = une phrase, utilisée dans le bandeau d'état.

## 14. Pression de fond — `content/pression.js`

```js
export const pression = [
  { jour: 3, flag: 'f_pression_1', storylet: 'ST-EVT-01' },
  { jour: 5, flag: 'f_pression_2', bloque: ['P02'] },
  { jour: 6, flag: 'f_pression_3', storylet: 'ST-P05-04' },
  { jour: 8, flag: 'f_pression_4', storylet: 'ST-FIN-01' },
];
```
Fixé — ne pas modifier sans raison mécanique.

## 15. Points — `content/points.js`

```js
'P01': { id, nom, zone: 'Z01', type_lieu: 'hauteur', territoire: 'frontiere',
         voisins: { P02: 1, P03: 1, P04: 2, P05: 2, P06: 2 },
         nom_court, note_carte: 'une ligne, ce qu'on sait du lieu' }
```

## 16. Méta — `content/meta.js`

```js
export const meta = {
  titre: 'Val-de-Garde',
  point_depart: 'P01',
  points_initiaux: ['P01'],
  storylet_ouverture: 'ST-OUV-01',
  inventaire_initial: [ { base: 'OBJ-01', usure: 75 }, { base: 'OBJ-02', quantite: 9 },
                        { base: 'OBJ-03', usure: 80 }, { base: 'OBJ-04' },
                        { base: 'OBJ-05', quantite: 1 }, { base: 'OBJ-06', quantite: 1 } ],
  fins: { 'FIN-xx': { id, nom, description: 'deux à trois phrases' }, ... },
};
```
`meta.fins` doit contenir `FIN-MORT` (mort du héros) plus les fins de `ST-FIN-01`.

## 17. Libellés d'interface — `content/libelles.js`

Tous les mots affichés par l'UI qui ne sont pas de la narration :
noms des stats et **ce qu'elles gouvernent concrètement**, noms des états et
**leur effet réel**, paliers d'usure, catégories d'inventaire, segments de la
journée (6), factions, rôles de compagnon, clés de traces d'effets.

```js
export const libelles = {
  stats: { vigueur: { nom, gouverne: 'Santé maximale, capacité de port, corps à corps' }, ... },
  etats: { blesse_leger: { nom, effet: 'effet réel, pas seulement le nom' }, ... },
  usure: { neuf: '…', bon: '…', use: '…', abime: '…', ruine: '…' },
  categories: { arme: '…', protection: '…', consommable: '…', ressource: '…', divers: '…' },
  familles: { arc: '…', lame_legere: '…', lame_longue: '…', lourde: '…', hast: '…' },
  segments: { 1: '…', 2: '…', 3: '…', 4: '…', 5: '…', 6: '…' },
  factions: { couronne: '…', terres_noires: '…', ordre: '…', marchands: '…' },
  roles: { melee: '…', distance: '…', soutien: '…' },
  statuts_pnj: { inconnu: '…', disparu: '…', vivant_allie: '…', mort: '…', ... },
  traces: { objet_gagne: '…', sante: '…', xp: '…', ... },
};
```

## 18. Journal — `content/journal.js`

`journal['cle'] = 'phrase au passé, une ligne, affichée dans le bilan de fin'`.
Toute clé utilisée par `{ journal: 'cle' }` doit exister ici.

---

## 19. Assemblage — `content/index.js`

Écrit par l'intégrateur, pas par les auteurs de contenu. Il agrège tout et
appelle `setDb()`.
````

---

# 4. CONSTANTES DE RÈGLES — `engine/schema.js`

Verbatim, intégral.

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

# 5. INVENTAIRE DES STORYLETS

Colonne « titre » = champ `titre_travail`, seul champ de titre existant ; il n'est
jamais rendu à l'écran.

Critère « combat » : identifiant `ST-CBT-01`, ou référence à `ST-CBT-01`, ou
présence d'un compteur `orcs_vaincus` / `humains_vaincus` / `betes_vaincues` /
`combats_gagnes`.

| Identifiant | Fichier | Titre | Lieu / tag | Options | Combat |
|---|---|---|---|---|---|
| ST-CBT-01 | combat.js | Combat — le sol nu, le tronc, l'éboulis | declenche_uniquement | 8 | oui |
| ST-EVT-01 | evenements.js | Fond — la fumée qui reste basse | partout | 4 | non |
| ST-EVT-02 | evenements.js | Nuit — le dévers et le sapin mort | partout | 4 | non |
| ST-FIN-01 | evenements.js | Convergence — partir vers l'ouest | partout | 5 | non |
| ST-OUV-01 | ouverture.js | Le col, avant | declenche_uniquement | 3 | non |
| ST-OUV-02 | ouverture.js | Le village | declenche_uniquement | 4 | oui |
| ST-P01-01 | p01.js | La crête, première lecture | P01 | 4 | non |
| ST-P01-02 | p01.js | La crête, retours | P01 | 4 | non |
| ST-P02-01 | p02.js | Ferme — fouille | P02 | 5 | non |
| ST-P02-02 | p02.js | Ferme — l'enclos | P02 | 4 | non |
| ST-P02-03 | p02.js | Ferme — ce qui revient | P02 | 6 | oui |
| ST-P03-01 | p03.js | Source — boire, remplir, souffler | P03 | 7 | non |
| ST-P03-02 | p03.js | Source — l'outre fendue | P03 | 4 | non |
| ST-P04-01 | p04.js | Layon — la coulée | P04 | 6 | non |
| ST-P04-02 | p04.js | Layon — après la coulée | P04 | 6 | non |
| ST-P05-01 | p05.js | Camp — écouter | P05 | 5 | non |
| ST-P05-02 | p05.js | Camp — partir à deux | P05 | 5 | non |
| ST-P05-03 | p05.js | Camp — le colporteur | P05 | 6 | non |
| ST-P05-04 | p05.js | Camp — ce qui reste | P05 | 4 | non |
| ST-P06-01 | p06.js | Poste — le râtelier sous la poutre | P06 | 6 | non |
| ST-P06-02 | p06.js | Poste — l'atelier et la meule | P06 | 5 | non |
| ST-P06-03 | p06.js | Poste — la salle de garde | P06 | 5 | non |

---

# 6. DEUX STORYLETS COMPLETS

## 6.a — Scène ordinaire sans risque : `ST-P03-01`

Source : `content/storylets/p03.js`, lignes 2 à 215. Verbatim.

Aucune `probabilite` dans ce storylet : chaque issue est sélectionnée par son
`si`, aucun échec n'est possible.

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

## 6.b — Combat : `ST-CBT-01`

Source : `content/storylets/combat.js`, lignes 1 à 429 (fichier entier hors
l'export `journal` vide qui suit). Verbatim.

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

# 7. VOLUMÉTRIE

```
=== engine/ ===
   57 engine/badges.js
  128 engine/conditions.js
   12 engine/db.js
  142 engine/derive.js
  248 engine/effects.js
  169 engine/game.js
  144 engine/items.js
   68 engine/progression.js
   60 engine/rng.js
   66 engine/save.js
   89 engine/schema.js
  170 engine/storylets.js
  108 engine/time.js
   18 engine/voyage.js
 1479 total

=== content/ ===
   540 content/CONTRAT.md
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
  5555 total

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
```
