# Les Terres Voilées — Provenance des décisions

**Version :** 2.1
**Statut :** source de vérité — provenance
**Dernière mise à jour :** 21 septembre 2026

> **Pourquoi ce fichier existe.** Les autres fichiers énoncent des décisions sans dire **qui les a prises**. Une partie a été comblée par l'IA faute d'arbitrage, pour que l'ensemble reste cohérent et exploitable.
>
> **Une décision listée en §3 n'a jamais été validée par l'auteur.** Elle est reprenable sans coût, et doit se relire comme une proposition, pas comme un acquis.

---

## 1. Décisions de l'auteur

| Décision | Portée |
|---|---|
| **Incertitude par ignorance** — statistiques cachées, révélées par catégorie et niveau | **Structurante.** Le cœur du jeu |
| **Granularité des scènes** — jamais un choix unique, 4 à 6 décisions par rencontre | **Structurante.** Origine de la règle anti-spectateur |
| **Razzia éclair** au lieu d'une occupation suivie d'une reprise | **Structurante.** Rend le *casus belli* crédible |
| **Toute attaque ennemie doit avoir un contre** | **Structurante.** Sans elle, on subit au lieu de jouer |
| **Le rythme appartient au joueur** — se battre contre tout doit rester possible | **Structurante** |
| **Notoriété des créatures** — connues, racontées, légendes lointaines | Bestiaire et curiosité |
| **Roster** — recruter largement, composer son équipe, rotation à la base | Progression |
| **Les trois frères comme noyau** — Mathias et Jonas compagnons principaux | **Structurante.** Récit |
| **Magie avancée au chapitre 2**, portée par les trois frères | Combat et récit |
| Carte tactique hiérarchique cliquable | Structurante |
| Steam premium 8-15 €, refus du F2P | Modèle économique |
| Durée cible 6-10 h hors post-game | Volume de contenu |
| Aspect gamifié : niveaux, compétences, compagnons, réputations, bestiaire | Progression |
| Bilan de fin de run avec statistiques et badges | Rétention |
| Catégories C/B/A/S × niveaux 1-3 | Bestiaire |
| Points de commandement augmentables par l'arbre | Progression |
| **XP par unité tuée**, avec multiplicateur de niveau | Progression |
| Défaite par épuisement des points de commandement, jamais par malchance | Combat |
| Une unité temporaire protégée du permadeath | Combat |
| Message de permadeath explicite, hors fiction | Clarté du contrat |
| Mathias mortel dès le départ, **et sans défaut mécanique** | Difficulté |
| **Aucun Journal** — les indices vivent dans la mémoire du joueur | Interface et récit |
| Barre permanente : PV, faim, eau, fatigue, niveau, commandement — *l'eau en gourdes depuis le 21/09* | Interface |
| Onglets : Groupe, Sacs, Équipement, Bestiaire, Carte | Interface |
| **Trois options équivalentes par palier de compétence** | Progression |
| Compagnons perdables sans mourir — escorte marchande | Roster |
| Cycle jour/nuit à dangers différents, non punitif | Équilibre |
| Refus de bloquer un storylet par le moment de la journée | Ergonomie |
| Cartographie des routes hybride selon les territoires | Carte |
| Épuisement partiel des POI, ressources résiduelles | Économie |
| Traversée d'un POI sans engagement | Carte |
| Twist 1 via la contre-attaque et la source magique | Récit |
| Cabale motivée par l'émancipation du contrôle de l'Ordre | Récit |
| Jonas ordinaire le matin de la razzia | Récit |
| Noms : Tomas, Mathias, Jonas | Récit |
| **Vocabulaire accessible, refus du vieux français** | **Règle transversale d'écriture** |
| **Noms de lieux imagés, avec une cause visible** | **Règle transversale de nommage** |
| **Noms de créatures d'usage, pas descriptifs** | **Règle transversale de nommage** |
| Validation des 20 noms de lieux et des 6 noms de créatures, un par un | Carte et bestiaire |
| Pas de créatures modifiées par la magie | Périmètre |
| Pas de carnet de Vairon | Récit |
| **Résolution hors combat par tirage, avec garde-fou** — l'aléatoire coûte, il ne tue jamais ; le combat reste déterministe *(21/09)* | **Structurante.** Écarte la résolution entièrement déterministe (§3.1) |
| **L'eau est un objet, la soif un état** — pas de jauge *(21/09)* | Survie |
| **Trois paliers obligatoires sur les scènes majeures et les jalons seulement** *(21/09)* | Coût d'écriture |

---

## 2. Propositions de l'IA, validées explicitement

| Décision | Origine de la proposition |
|---|---|
| Structure en runs plutôt que campagne | Économie de contenu |
| Bestiaire persistant entre les runs | Correction d'une position initiale |
| Déblocage de chapitre = package de départ, jamais restauration d'état | Correction d'un exploit |
| **La mort persiste sur toute la partie, pas seulement sur le run** | Sans ça, la permadeath ne pèse rien |
| Deux modes de difficulté | Compromis |
| Traits (Meneur / Vétéran / Nommé) au lieu de rangs C+/B+ | Anti-doublement du roster |
| Tactique déverrouillé à 3 unités | Conséquence du reset de puissance |
| Unités temporaires autonomes, redressables à 1 point | Troisième voie |
| Aucun scaling dynamique | Ressenti de progression |
| Fragment de la source détenu par l'Ordre | Résout l'accès à distance |
| Rite de lien détourné — personne n'a conçu l'agressivité | Résout le mobile de l'Ordre |
| Nom du héros fixe | Arbitrage narratif |
| Zones nommées sans grille | Coût de développement |
| ~~Stack TypeScript / React / Electron~~ | **Retirée le 21/09/2026** : la v3 existe en React Native + Expo. On la garde, et on ajoute une cible web pour tester vite |
| Cible de test **web dans Safari** | Cycle de test de 30 s au lieu de 10 min |
| Le POI est un contexte à tags, pas un contenu | **Divise la charge d'écriture par 3 à 4** |
| Storylet à moyeu | Motif structurel |
| **Val-de-Garde comme base** | Le village survit à la razzia — personne ne l'avait vu |
| **Chaque compagnon porte une anomalie** | Règle d'écriture |
| Niveau des compagnons dérivé du héros | Zéro donnée à stocker |
| Réaction des storylets **par spécialité, pas par personne** | Contient le coût d'écriture |
| Jonas en rang A, ouvre les armures | Seul trou réel de l'équipe |
| Jonas retenu chez les Marchands **par une dette** | Les Marchands ne font pas de charité |
| Vairon innocent et instrumentalisé | Préserve « la Couronne doit rester aimée » |
| Aucun soigneur dans le groupe | Garde les soins rares et chers |
| Correction des armures à 0-2 | Erreur d'équilibrage détectée au calcul |

---

## 3. Décisions prises par l'IA, jamais validées

> **À relire en priorité.** Par impact décroissant.

### 3.1 Impact fort

| Décision | Ce qu'elle engage |
|---|---|
| ~~Résolution entièrement déterministe, aucun aléatoire~~ | **Écartée le 21/09/2026** par l'auteur — voir §1 |
| **Nombres : le code fait foi**, `SPEC_EQUILIBRAGE` devient une cible *(21/09)* | Les valeurs de la v3 sont mesurées, celles des specs non. Annoncé, non contesté |
| **XP par unité mise hors de combat**, pas par unité tuée *(21/09)* | Protège la règle non létale. Annoncé, non contesté |
| **Durées des phases du chapitre 1** (8 / 10 / 5 / 25 / 40 / 5 min) | Pilote le volume de contenu |
| **Périmètre MVP** : Couronne + lisière des Terres Noires | Décide ce qui est testable |
| **Volumes cibles** : 9-13 POI par run, 25-35 par chapitre, 60-100 storylets | Planning |
| **Toutes les valeurs d'équilibrage** | Signalé en tête du fichier concerné |
| **Format de données, arborescence, règles du validateur** | La stack était validée, pas l'architecture |
| **Modèle « colonne à jalons »** pendant la contre-attaque | Résout l'incompatibilité entre deux storylets écrits |

### 3.2 Impact moyen

| Décision | Ce qu'elle engage |
|---|---|
| Répartition 80 / 20 entre pool recombinable et jalons | Volume |
| Répartition 70 / 25 / 5 pour le moment de la journée | Volume |
| Répartition 30 / 70 entre lieux signature et ordinaires | Identité de la carte |
| Répartition 60 / 30 / 10 du nombre de tags exigés | Rejouabilité |
| Rendement des POI épuisés : 20 / 8 / 4 / 2 | **Toute la pression économique en dépend** |
| Taux de rencontre 1 créature pour 3-4 POI, signes 1 POI sur 2 | Rythme |
| Horloge de la razzia : ligne qui cède à 4, retrait à 7 | Rythme de l'ouverture |
| Les 22 POI et l'intégralité de leurs tags | Filtrage du contenu |
| Cinq zones du Camp aux Feux et composition ennemie | Modèle tactique |
| Seuil « jamais 6 lignes sans décision » | Écriture |
| Règle « aucune option ne rend zéro » | Design |
| Les cinq tests de nommage, mots bannis, registres | Écriture |
| Valeurs de ration, gourde, bandage, remède | Économie |
| Les 15 compétences du chapitre 1 et leurs trois voies | Progression |

### 3.3 Contenu inventé

| Élément | Remarque |
|---|---|
| **La famille « Ancel »** | Présente à quatre endroits. **Jamais validée** |
| Les trois voix du village, la scène de chasse, les flags | Contenu exact inventé |
| `SLT-FOR-012` et `TN-001` intégralement | Modèles inventés |
| Aspect, comportement et attaques des six créatures | Inventés — **les noms**, eux, sont validés |
| Renn, Alix, Constant : histoire, âge, caractère | Inventés à partir d'une ligne pour Renn, de rien pour les deux autres |
| Le détail « la fumée = les forges orques » | Inventé, sert le twist |
| L'indice `poursuite_organisée` au toit des Ancel | Inventé |
| Les trois usages de magie — Révéler, Affermir, Lier | Inventés. **Le calendrier (chapitre 2, les trois frères) est de l'auteur** |

---

## 4. Jamais tranché

| Point | État |
|---|---|
| ~~Stack exacte de la v3~~ | **Connue le 21/09/2026** : React Native + Expo, JavaScript, architecture `ui → engine ← content` — voir le `CLAUDE.md` du dépôt |
| **Par quel mécanisme le twist 2 se révèle-t-il** | Aucun dispositif. Le carnet de Vairon a été écarté |
| **Lieux uniques par faction** — 5 ou 6 manquants | Seul Le Temple Englouti est acté |
| **Nature de la relique** rendue à l'Ordre | Reporté par l'auteur |
| **Quels membres de l'Ordre** ont traité | Reporté par l'auteur |
| Où se trouve la source dans les Terres Noires | Ouvert |
| Sort de l'Ordre après le twist 2 | Ouvert |
| Vairon meurt-il à la fin du chapitre 2 ? | Ouvert |
| **Volume de contenu** — 5 storylets écrits, 15 à 20 nécessaires | **Bloquant pour un MVP testable** |
| Capacités actives des rangs A et S | Ouvert |
| Les 10 compétences des chapitres 2 et 3 | Reportées après le premier test |
| Deuxième et troisième compétences de compagnons | Reportées après le premier test |
| Prix marchands, seuils de badges, durée du cycle jour/nuit | Ouverts |

---

## 5. Règle d'usage

**Toute décision de §3 peut être annulée sans discussion.** Elle n'a pas été arbitrée : elle a été comblée pour que l'ensemble tienne debout.

**Toute décision de §1 et §2 ne s'annule qu'explicitement**, et l'annulation s'inscrit comme **rupture** au journal des décisions de `SPEC_DESIGN`.
