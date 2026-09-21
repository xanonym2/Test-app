# Les Terres Voilées — Synthèse globale

**Version :** 2.1
**Date :** 21 septembre 2026
**Objet :** document autoportant destiné à l'audit externe et au briefing d'implémentation

---

## 1. Le projet en dix lignes

Jeu d'aventure narrative et tactique en médiéval-fantastique, développé en solo avec assistance IA, destiné à Steam en achat unique 8-15 €.

Le joueur incarne **Tomas**, 25 ans, ancien soldat devenu chasseur, dont le village frontalier est détruit par une razzia orque. Il part avec son frère **Mathias** prévenir la Couronne, rejoint la contre-attaque, et découvre au fil de trois chapitres que les orques ne sont pas des bêtes : ils sont **asservis par un rituel**, lancé non par l'Ordre religieux qu'on soupçonne d'abord, mais par une **cabale au sein de la Couronne elle-même** — le camp du joueur.

Le jeu se joue en **runs de 1h30-2h**. La puissance retombe à zéro à chaque run ; la **connaissance** et le **récit** persistent.

**Développement contraint :** l'auteur travaille depuis un iPhone, via session Claude Code cloud. Ce pipeline est validé de bout en bout et constitue un critère de décision technique prioritaire.

---

## 2. Cartographie des fichiers

| Fichier | Gouverne |
|---|---|
| `SPEC_DESIGN` | Systèmes : structure de partie, storylets, modes, connaissance, carte, unités, progression |
| `SPEC_MONDE` | Récit : personnages, factions, chronologie, mécanisme des twists, indices |
| `SPEC_CONTENU_storylets` | Cinq storylets modèles entièrement rédigés. **Leur format est remplacé par le schéma du contrat** |
| `SPEC_BESTIAIRE` | Les six créatures : aspect, comportement, attaques, contres |
| `SPEC_COMPAGNONS` | Les cinq compagnons, compétences, magie, roster |
| `SPEC_ECRANS` | Interface : barre permanente, onglets, écrans de jeu |
| `content/CONTRAT.md` *(dépôt)* | Règles de contenu, identifiants, schéma des storylets — **prime sur toute règle de contenu** |
| `CLAUDE.md` *(dépôt)* | Stack réelle, architecture, vérificateur, conventions |
| `SPEC_EQUILIBRAGE` | Nombres cibles des systèmes à venir — **le code fait foi** |
| `SPEC_PROVENANCE` | Qui a décidé quoi — validé par l'auteur vs comblé par l'IA |

*Le dossier `archives/` contient l'audit interne et les développements du 15-16 septembre. Ils ne sont plus tenus à jour et ne doivent plus être lus comme des sources. `SPEC_TECHNIQUE` y est aussi : la stack et l'architecture réelles sont celles du `CLAUDE.md` du dépôt.*

**Règle de préséance :** en cas de contradiction sur un système, `SPEC_DESIGN` prime. Sur un nombre, `SPEC_EQUILIBRAGE` prime. Sur un fait de monde, `SPEC_MONDE` prime.

---

## 3. Décisions fondatrices

### 3.1 Contrainte économique

> **Zéro appel API au runtime. Tout le texte est pré-écrit et livré avec le jeu.**

Sur un achat unique, générer du texte en cours de partie créerait un coût récurrent par joueur sur un revenu encaissé une fois. L'IA est donc un **outil de production de contenu en amont**, jamais le narrateur au runtime.

### 3.2 Structure de partie

| Élément | Persiste ? |
|---|---|
| Niveau, équipement, compagnons, compétences, réputation | **Non** |
| Bestiaire et connaissance des unités | **Oui** |
| Jalons narratifs atteints | **Oui** |
| Départs de chapitre débloqués | **Oui** |

**Règle :** la persistance est autorisée quand elle **élargit le champ des possibles**, interdite quand elle **rend plus fort**.

**Trois chapitres**, bornés par les twists : Orques → Ordre soupçonné → Cabale. **Jalon atteint = jalon consommé**, jamais rejoué.

Atteindre un twist débloque un **package de départ de chapitre** (niveau de base, choix d'un compagnon déjà rencontré, équipement de palier), **jamais la restauration d'un état sauvegardé** — sinon mourir volontairement annulerait toute perte.

### 3.3 Le système central : incertitude par ignorance

> **L'incertitude ne vient pas du hasard. Elle vient de ce que le joueur ne sait pas encore.**

Chaque unité existe en catégorie **C/B/A/S** (le rôle) × niveau **1-3** (l'échelle). Trois états d'information :

| État | Affichage |
|---|---|
| Inconnu | `PV ??` + **lecture perceptive obligatoire** |
| Estimé | `PV ~45-70` |
| Exact | `PV 58` |

La lecture perceptive gratuite est le garde-fou anti-frustration : le joueur ignore les chiffres mais **voit** à quoi il a affaire. Décider en connaissance de risque ≠ décider à l'aveugle.

Le savoir s'acquiert par plusieurs voies — affronter, observer, examiner un cadavre, acheter un bestiaire, recruter un compagnon spécialiste — pour qu'un joueur prudent ne s'enferme pas dans une spirale d'ignorance.

Le bestiaire **persiste entre les runs** : il n'est pas de la puissance, il évite de repayer une taxe d'information déjà payée.

### 3.4 Deux modes de jeu

| | Narratif | Tactique |
|---|---|---|
| Information | Coûts visibles, **résultats incertains** | **Tout visible** |
| Résolution | Tirage informé, qui ne tue jamais ; trois paliers sur les scènes majeures et les jalons | Déterministe |

**Le pont :** les choix narratifs écrivent l'état de départ du combat — initiative, distance, repérage, ennemis déjà blessés, fatigue, position des compagnons. Bien jouer l'approche, c'est commencer avec un avantage chiffré.

Le tactique se **déverrouille à 3 unités** (le héros démarre seul), en deux échelles — escarmouche et bataille — sur le même code. **Points de commandement** comme ressource centrale : les ordres permanents sont gratuits, l'improvisation se paie.

### 3.5 Règle anti-spectateur

> **Aucune scène majeure ne se résout en un choix unique.** 2 à 4 beats par objectif, chacun ramenant une décision. Plus de six lignes sans décision est un signal d'alarme.

C'est la **réussite partielle** qui fait durer une scène sans l'étirer : ça marche, mais ça coûte, et une complication apparaît.

### 3.6 Carte et pression

**Hiérarchie** (3 niveaux max) + **graphe de routes** indépendant. Géographie **fixe** entre les runs ; seul l'état du monde varie.

**Un POI est un contexte, pas un contenu.** Il porte des tags (`forêt`, `ruine`, `contrôle:orques`, `danger:3`) ; les storylets déclarent les tags qu'ils exigent. Cette décision divise la charge d'écriture par trois à quatre.

**Pression par coût d'opportunité, jamais par chronomètre :**

1. **Économique** — un POI épuisé rapporte moins qu'il ne coûte d'y aller
2. **Traction narrative** — des PNJ tirent le joueur, ne le menacent pas
3. **Monde qui évolue** — sur jalons, jamais sur temps écoulé

> **Règle d'équilibrage critique :** bilan net négatif sur les lieux épuisés, positif uniquement sur les lieux neufs. Si un retour reste rentable, toute la pression s'effondre.

---

## 4. Le monde et les twists

### 4.1 Le mécanisme

Une **source magique** se trouve loin dans les Terres Noires. L'Ordre n'y a jamais accédé : il détient un **fragment** qui en provient, sorti du territoire il y a très longtemps.

Une **cabale au sein de la Couronne** veut s'émanciper du contrôle magique de l'Ordre. Pour cela, s'emparer de la source. Mais une invasion sans prétexte est impossible — **si les orques attaquent en premier, tout se débloque.**

Elle obtient d'une faction interne de l'Ordre le **rite de lien** : le rite que l'Ordre pratique sur lui-même, qui retire au veilleur consentant la peur, le doute et l'hésitation, et produit un homme inébranlable. Les membres de l'Ordre croient céder un moyen de rendre les soldats de la Couronne incapables de céder au combat.

> **Le point de bascule :** le rite ne peut lier que ce qui prête serment. Appliqué à un peuple entier, sans consentement, il ne reste que ce qu'il fait d'abord — retirer la peur, le doute, l'hésitation.
>
> **Personne n'a conçu l'agressivité. C'est ce qui reste quand on retire tout le reste.**

L'Ordre est coupable d'**imprudence**. La cabale est coupable d'**intention**. Val-de-Garde n'a jamais été une cible : un village frontalier **jugé sacrifiable** pour rendre le prétexte crédible.

### 4.2 Contraintes de récit

- **La Couronne doit rester aimée.** Aucun dysfonctionnement visible avant le twist 2. Un joueur loyal jusqu'au bout est bien plus dévastable qu'un joueur méfiant
- **Les orques ne parlent aucune langue humaine.** Toute la carte des Terres Noires n'est faite que d'**exonymes** — des noms que les hommes leur ont donnés. Après le twist, elle se relit autrement, pour un coût nul
- **Des options non létales existent dès le chapitre 1**, sans explication. Sinon le twist punit au lieu de révéler
- **Un indice décrit un fait observable, jamais une interprétation**, et possède toujours une explication innocente disponible

### 4.3 Indices posés à vue

| Indice | Lecture innocente | Réalité |
|---|---|---|
| Le totem tombe, les orques s'arrêtent une seconde | Effet de moral | Le relais du lien se rompt |
| Le scellement des Maîtres Veilleurs | L'Ordre a ce pouvoir | Version minuscule du même rite |
| Les forges orques brûlent sans arrêt | Préparatifs de guerre | Une industrie, pas une horde |
| Trois orques poursuivent une cible sans rien détruire | Sauvagerie ciblée | Un comportement organisé |
| Relève absente, sel plus cher, frères de l'Ordre disparus | Désorganisation de guerre | Le plan en cours |

---

## 5. État de la production

### 5.1 Fait

- **Carte MVP** : 5 zones, 22 POI entièrement tagués, 9 lieux signature
- **Cinq storylets modèles** couvrant tous les cas : recombinable tagué, jalon narratif, ouverture, storylet à moyeu avec horloge, bascule tactique
- **Vocabulaire de tags** fermé (~45 tags)
- **Nomenclature** : formule, cinq tests, listes de mots bannis, registres par territoire
- **Rosters des quatre factions** en C/B/A/S
- **Six créatures** complètes — aspect, comportement, attaques nommées, contres
- **Cinq compagnons** complets, plus le système de roster et la base
- **Interface** : barre permanente, cinq onglets, écrans narratif, tactique, carte, bilan
- **Quinze compétences** de chapitre 1, en trois voies équivalentes
- **Équilibrage** corrigé : armures 0-2, XP par unité, consommables

### 5.2 Bloquant pour un MVP testable

| Manque | Conséquence |
|---|---|
| **Volume de contenu** : 5 storylets, il en faut 15-20 | **La boucle n'est pas jouable.** Seul vrai mur restant |
| **Stack exacte de la v3 inconnue** | Bloquant **au démarrage de l'implémentation** : impossible de décider entre repartir de zéro et reprendre l'existant |

**Résolus depuis l'audit du 16 septembre :** six créatures complètes · cinq compagnons complets · spécification d'écrans · système de roster · correction des armures · XP par unité · manger et boire.

### 5.3 Historique

Trois versions MVP ont été produites et testées sur Android. La v1 manquait de contexte, la v2 sur-décrivait, la v3 a le bon ton mais une architecture conçue pour un format abandonné depuis — campagne longue, 100 niveaux, 5 unités fixes, occupation puis reprise du village. Toutes ces hypothèses ont été explicitement cassées.

---

## 6. Points de fragilité connus

À vérifier en priorité par tout auditeur.

1. ~~La résolution entièrement déterministe~~ — **point résolu le 21/09/2026** : tirage informé hors combat, avec garde-fou
2. **Le rendement des POI épuisés** (20 / 8 / 4 / 2) — toute la pression économique en dépend, et se casse en silence au moindre ajustement
3. **Les durées de phases du chapitre 1** — inventées, et elles pilotent tout le volume de contenu
4. **La tension entre structure en runs et récit à twists** — un twist ne fonctionne qu'une fois ; la rejouabilité repose entièrement sur l'après-révélation, qui n'est pas encore écrit
5. **Le glissement vers la campagne** — trois chapitres, jalons finis, packages de départ : la structure ressemble de moins en moins à un roguelite. Assumé, mais à surveiller
6. **Le mécanisme de révélation du twist 2** — aucun dispositif n'est prévu. Le carnet de Vairon a été écarté parce qu'un objet qui contient la réponse court-circuite l'enquête
7. **La charge de contenu** — 60 à 100 storylets recombinables. Produits par lots de 8-10, relus par échantillon, contrôlés par le validateur
