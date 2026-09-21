# Contrat de contenu — Les Terres Voilées

**Version 2.1** — 21 septembre 2026 · remplace la v1 « Val-de-Garde (MVP) » · 2.1 : arbitrages A1 à A3 rendus

Ce document est la **spécification mécanique** du contenu. Il fixe les
identifiants, les schémas de données, les valeurs d'équilibrage et les
obligations de chaque fichier. Il ne contient aucun texte narratif : la prose
est écrite directement dans les fichiers `/content/*.js`.

Tout fichier de contenu exporte des objets JS indexés par identifiant.
Le moteur ne lit **que** des identifiants ; tout ce qui est affiché vient d'ici.

---

## Lire d'abord — ce qui change en v2

La v2 garde **la numérotation et l'ordre de la v1**. Tout ajout ou changement
porte **[v2]**, pour que le diff se lise ligne à ligne. Elle a été écrite sans
`engine/schema.js` ni l'inventaire des storylets : les sections *Plan* seront
revues à leur lecture.

### Statuts

| Marque | Sens |
|---|---|
| *(aucune)* | En vigueur, inchangé depuis la v1 |
| 🔨 | Décidé, pas encore dans le code — le chantier est indiqué |
| ⏸ | À arbitrer — la règle v1 s'applique en attendant |

### Deux familles de sections

| Famille | Sections | Nature |
|---|---|---|
| **Règles** | §0, §0 bis, §1, §2, règles du §4, §5, §17 à §25 | Durables. Valent pour tout contenu, présent et futur |
| **Plan** | §3, liste du §4, §6 à §16 | Le contenu v1 tel qu'il est dans le dépôt. Sera remappé vers la carte cible |

### Préséance

- Une **règle de contenu** → ce contrat.
- Un **système de jeu** → `docs/spec/SPEC_DESIGN_terres-voilees.md`.
- Un **fait de monde** → `docs/spec/SPEC_MONDE_terres-voilees.md`.
- Un **nombre** → le code. Un nombre écrit ici est celui qui tourne et que le
  vérificateur mesure. `SPEC_EQUILIBRAGE` est la **cible** des systèmes à
  venir : un de ses nombres entre ici quand il est implémenté et mesuré.
  Deux sources de vérité pour un même nombre, c'est zéro source de vérité.

Les specs vivent dans `docs/spec/`.

### Modifier ce contrat

**Une idée nouvelle ne perd jamais contre ce contrat par défaut.** Si elle le
contredit, on modifie le contrat — jamais en silence. Chaque modification
indique : la règle touchée · le type (extension, assouplissement, remplacement,
correction) · ce qu'elle débloque · ce qu'elle coûte · **si le vérificateur
doit changer**. Une règle que le vérificateur ne contrôle pas est une
intention, pas une contrainte.

Les **piliers** — §0, §0 bis, les règles non négociables du §4, la stabilité
des identifiants — ne s'assouplissent que sur décision explicite, annoncée
comme un assouplissement.

### Journal des modifications v1 → v2

| # | § | Modification | Type | Vérificateur |
|---|---|---|---|---|
| M01 | §0 | Règle 2 : test « un joueur de 15 ans comprend chaque mot », mots rares bannis. Exemple de la règle 10 corrigé : « dévers » violait la règle 2 | Clarification | Oui, dès maintenant — liste de mots bannis étendue |
| M02 | §0 bis | Nouveau : règles du récit — indices, rien de nommé avant le twist 1, Couronne aimée, non létal dès le chapitre 1, lexique de l'Ordre | Extension | Partiel — le reste relève de la relecture |
| M03 | §0 bis, §10, §18 | Rien n'aligne les indices : journal jamais consultable en jeu, jamais d'indice et d'entrée de journal sur la même issue, aucun compteur d'indices visible avant le twist correspondant | Extension | Oui — co-occurrence dès maintenant, compteurs 🔨 chantier 1 |
| M04 | §0 bis | Épargner ne coûte jamais d'expérience. Corrige aussi `SPEC_EQUILIBRAGE` : XP « par unité tuée » → « par unité mise hors de combat » | Correction | Oui — 🔨 chantier 3 |
| M05 | §4 | Règles 5 et 6 : valent par tour de storylet ; en tactique, le retrait reste toujours jouable | Clarification | 🔨 chantier 3 |
| M06 | §1, §8, §16 | Tomas, Mathias, Jonas ; statut des frères ; titre du jeu. `PNJ-F1` et `PNJ-F2` gardent leur identifiant | Correction | Non |
| M07 | §2 | Espaces étendus (`P`, `C`), ajoutés (`Z`, `CH`, `J`, `D-CH`) ; un identifiant retiré n'est jamais réattribué | Extension | Non |
| M08 | §14 | Pression de fond : du calendrier aux jalons. Plus aucune fin ni évènement du monde déclenché par la date | Remplacement | Oui — 🔨 chantier 1 ; la métrique « jours moy » disparaît |
| M09 | §11 | Les départs portent les packages de chapitre (`D-CH2`, `D-CH3`) | Extension | 🔨 chantiers 1-2 |
| M10 | §3, §4, §7-§9, §20-§25 | Sections *Plan* signalées ; contrats minimaux des systèmes à venir, schémas figés à l'ouverture de chaque chantier | Extension | 🔨 |
| M11 | En-tête | Statuts, familles, préséance, protocole. **Nombres : le code fait foi** — remplace « SPEC_EQUILIBRAGE fait foi » | Remplacement | Non |
| M12 | §4, §5 | **A1 tranché** — combat par `si`, exploration par tirage. Nouvelle règle 9 : l'aléatoire coûte, il ne tue jamais | Extension | Oui — contrôle dès maintenant ; plancher de santé 🔨 moteur |
| M13 | §6 | **A2 tranché** — l'eau reste un objet, la soif un état. Specs corrigées | Correction des specs | Non |
| M14 | §4 | **A3 tranché** — réussite partielle obligatoire sur les storylets majeurs et les jalons (`majeur: true`, `partielle: true`) | Extension | Oui — 🔨 accepter les deux champs, puis contrôler |
| M15 | §6 | **Rythme de la soif fixé** — `assoiffe` se dérive de 12 segments sans boire ; boire remet le compteur à zéro. Le chantier ouvert par M13 est refermé | Extension | Oui — cas de test dédié |
| M16 | §4 r. 9 | **Mort du héros clarifiée** — un adversaire ne tue jamais (`SPEC_DESIGN` §4.5) ; seule l'attrition met fin au run. La contradiction §2.5 / §4.5 est levée | Clarification | Non — le moteur v3 n'a pas d'état de défaite |

### Arbitrages

Aucun en attente. A1 à A3 ont été rendus le 21 septembre 2026 par Tom — voir M12 à M14.

---

## 0. Règles de style — non négociables

Elles viennent du brief et priment sur toute considération d'auteur.

1. **Phrases courtes.** Pas de subordonnées empilées.
2. **Vocabulaire courant.** Pas de mot rare, pas de tournure littéraire.
   **[v2]** Test : un joueur de 15 ans comprend chaque mot. Précis n'est pas
   rare — « chêne », « trace fraîche », « vent de face » sont précis et
   courants (règle 8). Bannis : *dévers, layon, combe, gibet, nef, cloître*.
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
    qu'on va obtenir. (« Suivre la trace vers le ruisseau », pas « Gagner 2 flèches ».)
    **[v2]** Exemple corrigé : « dévers » violait la règle 2.
11. Longueurs : `texte.arrivee` ≤ 110 mots · `texte.base` ≤ 70 mots ·
    `variantes[].ajout` ≤ 30 mots · `issues[].texte` ≤ 70 mots ·
    `libelle` ≤ 12 mots.
12. **2 à 3 variantes** conditionnelles par storylet, pas plus.

## 0 bis. Règles du récit — non négociables **[v2]**

Elles protègent les deux retournements, la partie la plus fragile du jeu.
Aucune n'était écrite en v1 : rien ne les imposait au contenu.

1. **Un indice décrit un fait observable, jamais une interprétation.** Il a
   toujours une explication innocente immédiate. Un indice qui suggère une
   **volonté** est trop lisible.
2. **Avant le twist 1, rien n'est nommé.** Le joueur voit des anomalies, jamais
   une explication : aucun texte ne présente un sortilège, une emprise ou la
   magie comme cause.
3. **La Couronne reste aimée.** Aucun dysfonctionnement visible, aucune raison
   de s'en méfier. Qu'un village n'ait pas été défendu passe pour une évidence
   tragique : attaque soudaine, village isolé, renforts trop loin.
4. **Non létal dès le chapitre 1, sans justification.** Toute rencontre avec des
   orcs offre au moins une option non létale — fuir, neutraliser, épargner,
   capturer. Le texte n'explique jamais pourquoi elle existe.
5. **Épargner ne coûte jamais d'expérience.** Une unité mise hors de combat —
   tuée, neutralisée ou mise en fuite — rapporte la même chose.
6. **L'Ordre n'a aucun lexique chrétien.** Bannis : *église, chapelle, cierge,
   messe, prêtre, saint, abbaye*. Son registre : la veille, le scellement, les
   portes closes, les statues, le feu entretenu, les serments.
7. **Rien n'aligne les indices.** Aucun journal consultable en cours de partie ;
   aucun compteur d'indices visible — barre, bilan, badges — avant le twist
   correspondant (§10, §18).

---

## 1. Univers (rappel factuel, à ne jamais ré-exposer en jeu)

Médiéval fantastique. Quatre puissances : **la Couronne** (ordre humain,
militaire), **les Terres Noires** (les orcs), **les Terres Scellées** (l'Ordre,
les mages), **les Terres Libres** (les Marchands, routes et comptoirs).

Guerre contre les orcs achevée il y a huit ans. Version officielle : ils ont
attaqué, on s'est défendus, on les a repoussés. La paix tient depuis.

Héros : **Tomas** **[v2]**, 25 ans, ancien soldat reconverti en chasseur. Il nourrit
**Val-de-Garde**, village frontalier né d'un ancien poste de garde dont plus
personne ne monte la garde. Parents morts. Deux frères **[v2]** : **Mathias**
(20 ans, forgeron), barricadé dans la forge pendant la razzia, compagnon
ensuite ; **Jonas** (28 ans), qui disparaît pendant la razzia.

Orcs : perçus comme des barbares. Organisés, implacables, impossibles à
négocier. Ils ne parlent pas la langue humaine. Ils tuent et détruisent mais
**ne pillent pas**.

Ton : pas de narration guidée, pas de choix évidents. Ressources rares, erreurs
coûteuses. La valeur morale porte sur les êtres pensants, pas sur les animaux.

**Trois noms maximum** posés avant l'attaque.

**[v2]** La résolution des deux retournements est dans
`docs/spec/SPEC_MONDE_terres-voilees.md` (§4 et §5). Elle ne s'écrit jamais
ici, et n'apparaît dans aucun texte joueur avant le chapitre prévu. Tout auteur
la lit avant d'écrire un storylet porteur d'indice.

---

## 2. Espaces d'identifiants

| Domaine | Forme | Exemples |
|---|---|---|
| Points d'intérêt | `P01`..`P99` **[v2]** | v1 : `P01`..`P06`, fixés §3 |
| Storylets | `ST-<zone>-<nn>` | `ST-OUV-01`, `ST-P04-02` |
| Objets (base) | `OBJ-nn` | `OBJ-07` |
| Modificateurs | `MOD-Pn` (préfixe) / `MOD-Sn` (suffixe) | `MOD-P2` |
| Créatures | `CRE-nn` | `CRE-03` |
| PNJ | `PNJ-nn` | `PNJ-02` |
| Compétences | `C01`..`C99` **[v2]** | v1 : `C01`..`C09` |
| Badges | `B01`..`B10` | |
| Départs | `D01`..`D03` · `D-CH2`, `D-CH3` **[v2]** | §11 |
| Mutateurs | `M01`..`M06` | |
| Zones **[v2]** | `Z01`..`Z09` | `Z01` (déjà utilisé, §15) |
| Chapitres **[v2]** | `CH1`..`CH3` | §20 |
| Jalons **[v2]** | `J<chapitre>-<nn>` | `J1-01` |
| Drapeaux | `f_<mecanique>` | `f_indice_1` |
| Variables locales | minuscules libres | `observe`, `tour_alerte` |

Les identifiants sont **stables et ne changent jamais**, indépendamment du nom
affiché (règle non négociable n°1).

**[v2]** Un identifiant retiré n'est **jamais réattribué**. Retirés à ce jour :
aucun. Les domaines des systèmes à venir (tactique, magie) sont créés à
l'ouverture de leur chantier (§22, §25), pas avant.

---

## 3. Carte — 6 points d'intérêt

**[v2] Plan v1.** Cette carte est celle du dépôt. Cible : 5 zones, 22 POI
(`SPEC_MONDE`, `SPEC_DESIGN`), à remapper après inventaire des storylets. Un POI
v1 garde son identifiant s'il garde son rôle, même sous un autre nom ; sinon son
identifiant est retiré (§2). « Le Layon » viole la règle 2 : à renommer.

Ce qui passe tel quel dans la cible : **un seul système enseigné par POI au
chapitre 1, dans un ordre pédagogique.** Nommage des lieux cibles : un terrain
concret et une cause visible en arrivant ; en Terres Noires, des exonymes — les
orcs ne parlent aucune langue humaine.

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

**[v2] Plan v1.** Cette liste décrit les 22 storylets du dépôt. Après
inventaire, chacun sera classé **récupérable** (recombinable par `type_lieu`),
**structure seule** (texte trop ancré dans la v1 ; beats et issues
réutilisables) ou **retiré**. Les règles non négociables en fin de section,
elles, valent pour tout contenu.

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
   **[v2]** Sur un storylet majeur (`majeur: true` ; tous les jalons le sont), l'une
   d'elles est une **réussite partielle** — on progresse, à un prix — marquée
   `partielle: true`.
4. Un storylet qui ne modifie l'état d'aucune façon n'a pas sa place.
5. Une **sortie est toujours disponible** à chaque tour (`sortie: true`).
6. **3 à 5 options par tour.**
7. Une option d'**observation** coûtant du temps partout où il y a un risque.
8. Les **différés** ont leur issue déterminée au moment du choix
   (`{ differe: { evenement, resolution, dans_jours } }`).
9. **[v2] L'aléatoire coûte, il ne tue jamais.** Une issue tirée par `probabilite`
   ne contient ni `retire_compagnon` ni `fin`, et le moteur ne la laisse jamais
   amener la santé du héros sous 1.

**[v2] Portée.** Les règles 5 et 6 valent **par tour de storylet**. La couche
tactique (§22) a ses propres règles ; la règle 5 s'y traduit ainsi : **le
retrait est toujours jouable, même coûteux.**

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

**[v2] Résolution (A1, tranché).** Le combat se résout par `si` (déterministe),
l'exploration par `probabilite` + `modif_proba` : la préparation et
l'observation déplacent la chance. Garde-fou : règle 9 du §4. Vérificateur :
dès maintenant, aucune issue à `probabilite` ne contient `retire_compagnon` ni
`fin`. Moteur 🔨 : le plancher de santé.

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

**[v2] 🔨 Opérateurs réservés** — forme proposée, figée à l'ouverture du
chantier :

```
['chapitre', n] ['jalon', id] ['!jalon', id]    // chantier 1
['premiere_partie'] ['bestiaire>=', id, n]       // chantier 2
['specialite', tag]                              // roster, §24
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

**[v2] 🔨 Effets réservés** — même statut :

```
{ jalon: 'J1-02' }                          // chantier 1 — persiste sur la partie
{ bestiaire: { id: 'CRE-03', niveau: 2 } }  // chantier 2 — 1 raconté, 2 vu, 3 su
```

`acte` reste la phase **à l'intérieur** d'un run. `chapitre` est nouveau et
persiste d'un run à l'autre (§20).

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

**[v2] L'eau (A2, tranché).** L'eau reste un objet, la soif un état. Les specs
(`SPEC_EQUILIBRAGE` §5, `SPEC_ECRANS`) sont corrigées en conséquence.

**Rythme de la soif (M15).** `assoiffe` n'est pas stocké : il se dérive de
`heros.segments_sans_boire`, que le temps incrémente et que boire remet à zéro.
Seuil : **12 segments**, soit deux jours de jeu (`engine/schema.js`,
`SEUIL_SOIF`). Assoiffé coûte **+2 de fatigue par segment** et **+1 de pénalité
d'action** — la soif se paie en effort, jamais en santé.

Tout effet `{ retire_etat: "assoiffe" }` vaut « boire » : le contenu qui existait
déjà fonctionne sans changement. Calibré sur « un run type demande 3 gourdes »
(`SPEC_EQUILIBRAGE` §5 bis) et mesuré à **2,6 gorgées par run** sur les parties
automatiques.

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

**[v2] Plan v1.** Cible : les bêtes de `SPEC_BESTIAIRE` (§23), et les orcs et
humains en unités de catégorie C/B/A/S (§22).

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
`PNJ-F1` = **Mathias** **[v2]**, `PNJ-F2` = **Jonas** **[v2]**, `PNJ-V1` = **capitaine Vairon**.

Statuts possibles : `inconnu`, `disparu`, `vivant_allie`, `vivant_hostile`,
`blesse`, `mort`, `cite`.

Les deux recrutables ont des stats de **somme égale** (10) réparties
différemment, et des apports hors combat clairement distincts.

**[v2]** Les noms affichés changent, les identifiants restent — c'est la raison
d'être de la règle n°1. **Plan v1** pour `PNJ-01` à `PNJ-04` : le camp des
fuyards n'existe plus dans la cible. Cible : §24.

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
moins un storylet, sinon elle n'existe pas en jeu. **[v2]** Ou par une règle de
la couche tactique (§22).

**[v2] Plan v1.** Cible : 5 paliers de 3 options équivalentes — voies chasse,
combat, route — avec « meilleure si » affiché (`SPEC_DESIGN`). Le mécanisme ne
change pas : choisir ferme le palier.

---

## 10. Badges — `content/badges.js` — 10

```js
'B01': { id, nom, description, test: (E) => E.stats_partie.xxx >= n }
```

Uniquement branchés sur `E.stats_partie`, `E.recit`, `E.geo`, `E.compagnons`.
Axes imposés : exploration, savoir (les 3 indices), combat, évitement,
altruisme (eau partagée), équipe, vitesse (fin avant J+6), survie
(aucune blessure grave), artisanat (réparations), endurance (nuits dehors).

**[v2] 🔨 chantier 1.** Un badge qui compte des indices n'apparaît qu'une fois
le twist correspondant atteint (§0 bis, règle 7).

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

**[v2] 🔨 Départs de chapitre.** Le même mécanisme porte les packages de
chapitre : `D-CH2`, `D-CH3`. Même schéma, plus une condition de déblocage lue
dans la sauvegarde de partie — le dernier jalon du chapitre précédent.
`inventaire` = équipement standard du palier ; `storylet_ouverture` = ouverture
du chapitre. **Un package est défini, jamais restauré** (§21).

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
Fixé — ne pas modifier sans raison mécanique. *(v1, en vigueur dans le code.)*

**[v2] 🔨 chantier 1 — pression sur jalons, jamais sur la date.** La raison
mécanique : décision de design validée — *le rythme appartient au joueur ; la
pression vient du coût d'opportunité, jamais d'un chronomètre.* Le calendrier
continue d'exister (faim, fatigue, nuit, météo), mais **aucune fin et aucun
évènement du monde ne sont déclenchés par la date** :

```js
export const pression = [
  { jalon: 'J1-01', flag: 'f_pression_1', storylet: 'ST-EVT-01' },
  // ...
];
```

Conséquences : `ST-FIN-01` (`jour>=8`) et `ST-P05-04` (`jour>=5`) passent sur
jalons ; la métrique « jours moy » du vérificateur perd son sens.

## 15. Points — `content/points.js`

```js
'P01': { id, nom, zone: 'Z01', type_lieu: 'hauteur', territoire: 'frontiere',
         voisins: { P02: 1, P03: 1, P04: 2, P05: 2, P06: 2 },
         nom_court, note_carte: 'une ligne, ce qu'on sait du lieu' }
```

## 16. Méta — `content/meta.js`

```js
export const meta = {
  titre: 'Les Terres Voilées',   // [v2] ex 'Val-de-Garde'
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

**[v2]** Une entrée décrit un **acte** du héros, jamais un indice ni une
interprétation. Une issue qui pose un indice (`f_indice_*`,
`connaissance_sortilege`) ne pose pas d'entrée de journal. Le journal n'est
jamais consultable en cours de partie : il n'alimente que le bilan de fin.

---

## 19. Assemblage — `content/index.js`

Écrit par l'intégrateur, pas par les auteurs de contenu. Il agrège tout et
appelle `setDb()`.

---

# Systèmes à venir **[v2]**

Contrats minimaux : ce que chaque système exige du contenu, et les règles qui
s'imposent dès maintenant. **Les schémas se figent à l'ouverture de chaque
chantier**, moteur sous les yeux — pas avant.

## 20. Chapitres et jalons — 🔨 chantier 1

Le jeu est une **campagne à checkpoints**, pas un roguelite : 3 chapitres
bornés par les deux retournements, un chapitre par run (1h30 à 2 h).

- Un **jalon** est un storylet `unique` qui pose `{ jalon: 'J1-02' }`. Atteint
  une fois pour toute la partie : **consommé, jamais rejoué.**
- **Un chapitre finit sur son dernier jalon, jamais sur une date** (§14).
- Entre deux jalons, la colonne avance par étapes fixes ; Tomas part en
  éclaireur sur 3 à 5 POI libres, puis rejoint le point de ralliement.
- `acte` reste disponible pour découper un chapitre en phases.

Détail : `SPEC_DESIGN`.

## 21. Sauvegarde de partie — 🔨 chantier 2

Deux sauvegardes distinctes : le **run** (existe, `engine/save.js`) et la
**partie** (nouvelle).

| Persiste sur la partie | Repart à zéro à chaque run |
|---|---|
| Jalons atteints, départs de chapitre débloqués | Niveau, compétences |
| Bestiaire, personnes rencontrées | Inventaire, équipement |
| **Morts de compagnons** | État du héros |
| Première partie ou non (ouverture longue ou courte) | |

**Règle anti-exploit :** un départ de chapitre est un **package défini** (§11),
jamais la restauration d'un état. Sinon, mourir exprès annulerait une perte.

## 22. Couche tactique — 🔨 chantier 3

Déclenchée depuis un storylet, comme `ST-CBT-01` aujourd'hui. Déverrouillée à
3 unités. Équipe : Tomas et 4 compagnons.

- **Zones nommées, aucune grille.** Escarmouche : 2 zones, 2 points de
  commandement par tour. Bataille : 5 zones, 4 par tour.
- Ordres permanents gratuits, improvisation payante.
- **Règle du contre :** toute attaque ennemie a un moyen d'être empêchée ;
  toute attaque lourde est **annoncée un tour avant**. La défaite vient de
  l'épuisement d'une ressource, jamais de la malchance.
- Dégâts déterministes — déjà la règle de `ST-CBT-01`.
- Le retrait est toujours jouable, même coûteux (§4, portée).

Détail : `SPEC_DESIGN`, `SPEC_EQUILIBRAGE`, modèle `TN-002` dans `SPEC_CONTENU`.

## 23. Bestiaire — 🔨 chantier 2

Trois couches, qui persistent sur la partie : **ce qu'on raconte** (avant la
rencontre) · **ce qu'on a vu** (à la rencontre) · **ce qu'on sait** (au combat).

En combat, une unité est **Inconnue** (`PV ??`, lecture perceptive
obligatoire), **Estimée** ou **Exacte**. La règle 7 du §4 ne change pas : le
bestiaire renseigne l'**espèce**, l'observation renseigne l'**individu**.

Contenu :
- Un seul élément non naturel par bête.
- Le nom ne désigne jamais l'animal ; il vient d'un registre — chasse, masse,
  couleur, métier, outil, récit.
- Ce qu'on raconte peut exagérer ou se tromper. C'est voulu.

Détail : `SPEC_BESTIAIRE`.

## 24. Compagnons et roster — 🔨

10 à 12 compagnons sur la partie, 3 à 4 recrutés par chapitre, 4 actifs.
Rotation sur le POI `base` : Val-de-Garde, après la razzia.

- **Un storylet générique ne réagit jamais à un compagnon précis, seulement à
  une spécialité.** C'est ce qui rend 10 compagnons écrivables. Exceptions : les
  storylets propres d'un compagnon, et les trois frères.
- **Mathias est mortel dès le départ** : toute scène qui l'implique a une
  variante sans lui.
- La mort d'un compagnon persiste sur toute la partie (§21).
- Cible : catégorie C/B/A/S (rôle) et niveau dérivé de celui du héros (−1, rien
  à stocker) remplacent `role`, `niveau` et `montee` du §8 — à confirmer à
  l'ouverture du chantier.

Détail : `SPEC_COMPAGNONS`.

## 25. Magie — 🔨 chapitre 2

Portée par les trois frères : **Révéler** (Tomas), **Affermir** (Mathias),
**Lier** (Jonas). Le twist 2 débloque **briser l'emprise**. Les autres
compagnons peuvent l'apprendre, à un coût. **Aucun soigneur** : le soin reste
un consommable.

Dès maintenant : aucun contenu du chapitre 1 ne donne accès à la magie ni ne
l'explique (§0 bis, règle 2).

Détail : `SPEC_DESIGN`.
