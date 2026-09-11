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
