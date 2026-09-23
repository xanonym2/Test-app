# Les Terres Voilées — Écrans et interface

**Version :** 1.1
**Statut :** source de vérité — interface
**Dernière mise à jour :** 21 septembre 2026

> Comble le manque signalé dans l'audit interne §5.2.
>
> **Statut particulier de ce document.** L'interface est le seul domaine du projet où **tester bat réfléchir**. Cinq minutes d'usage réel révèlent ce qu'aucune réflexion sur le papier ne peut prévoir. Ce fichier sert donc à **avoir quelque chose à tester**, pas à décider. Tout y est révisable après le premier MVP jouable.

---

## 1. Principes

**Cible de test : Safari sur iPhone.** Tout est donc dessiné pour un écran étroit, un pouce, sans survol possible.

| Principe | Conséquence |
|---|---|
| **Un pouce** | Toute action fréquente est atteignable dans le tiers bas de l'écran. Les onglets sont en bas, jamais en haut |
| **Le texte est le jeu** | L'interface ne doit jamais manger plus de 20 % de la hauteur. Barre en haut, onglets en bas, tout le reste au récit |
| **Pas de survol** | Aucune information cachée derrière un appui long ou un passage de curseur. Ce qui compte est visible, ou à un appui |
| **Lisibilité des coûts en continu** | C'est la condition posée en §7 bis des créatures : un joueur doit **voir ses ressources fondre pendant qu'il joue**, pas le découvrir au bilan |

---

## 2. La barre permanente

Toujours visible, en haut, sur tous les écrans. **Une seule ligne compacte.**

```
 ❤ 46/66   🍖 ▓▓▓▓░░   💧 2/3      ⚡ ▓▓▓▓▓░       Niv. 7   ⚔ 4
```

| Élément | Forme | Pourquoi |
|---|---|---|
| **Points de vie** | Chiffre + barre | **Validé.** Sans eux, le joueur ne sait pas où il en est hors combat |
| **Faim** | Barre à 6 crans | Assez précis pour décider, jamais un pourcentage |
| **Eau** | Gourdes restantes, sur 3 : `💧 2/3`. L'état *assoiffé* s'affiche à côté quand il est actif | L'eau est un objet, pas une jauge (décision du 21/09/2026) |
| **Fatigue** | Barre à 6 crans | Idem |
| **Niveau** | Chiffre | |
| **Points de commandement** | Chiffre | **Les points utilisables**, en grand. Le maximum en petit à côté : `⚔ 3/4`. Hors combat, le maximum seul, en gris — c'est une valeur de progression, pas une ressource disponible |

**Trois seuils, trois couleurs** — alignés sur les paliers d'équilibrage 60 / 80 / 100 :

| État | Couleur | Signal |
|---|---|---|
| 0-59 | neutre | rien |
| 60-79 | ambre | la barre clignote une fois au franchissement |
| 80-99 | rouge | idem |
| 100 | rouge plein | état critique affiché en toutes lettres |

> **Le franchissement d'un seuil doit aussi se dire dans le texte**, pas seulement à l'écran. *« Tu n'as rien bu depuis ce matin. »* Un joueur absorbé par le récit ne regarde pas la barre.

**Appui sur une barre** → détail chiffré et ce qui la fait monter. Rien de plus.

---

## 3. Les onglets

Cinq, en bas, toujours accessibles hors combat. **Il n'y en a pas d'autre.**

| Onglet | Contenu | Disponible |
|---|---|---|
| **Groupe** | Tomas et les compagnons | dès le départ |
| **Sacs** | Vivres, eau, soins, matériaux, monnaie | dès le départ |
| **Équipement** | Armes, armures, usure, accessoires | dès le départ |
| **Bestiaire** | Créatures et unités rencontrées | dès le départ |
| **Carte** | Zones, POI, routes | dès le départ |

> **Pourquoi « Groupe » et non « Compagnons » :** Tomas y figure comme les autres. Sinon il faut un onglet de plus pour lui seul, et l'arbre de compétences n'a nulle part où vivre.

---

## 4. Onglet Groupe

**Liste** — une ligne par personnage : nom, niveau, points de vie, état *(intact / blessé / hors de combat / enfoui)*, une icône de rôle tactique.

**Fiche** — au clic :

| Bloc | Contenu |
|---|---|
| Identité | Nom, âge, ce qu'il faisait avant |
| Niveau | Niveau, expérience jusqu'au suivant |
| Statistiques | PV, dégâts, armure, vitesse |
| Rôle tactique | C / B / A / S, comme les ennemis — **même grammaire des deux côtés** |
| Compétences | Acquises, et la prochaine à débloquer |
| Spécialité | Ce qu'il apporte hors combat — connaissance des bêtes, lecture des routes, forge |
| Ordre par défaut | L'ordre permanent qu'il prendra en phase de plan |

> **Le dernier bloc est le plus utile** : pouvoir régler l'ordre par défaut **hors combat** évite de reconfigurer cinq unités à chaque bataille. Gain de temps considérable sur mobile.

**Arbre de compétences** — sous-écran depuis la fiche de Tomas. Les 15 compétences, les acquises, les verrouillées, et les trois branches de spécialisation grisées jusqu'au twist 2.

---

## 5. Onglet Sacs

**Charge en tête d'écran** : `Charge 31 / 40`. Barre rouge au-delà.

| Section | Contenu |
|---|---|
| **Vivres** | Rations. Appui → consommer, −30 faim |
| **Eau** | Gourdes. Appui → boire, retire *assoiffé* |
| **Soins** | Bandages, remèdes. Appui → soigner, choix de la cible |
| **Matériaux** | Plaques, cornes, peaux, bois. Pour la forge et l'échange |
| **Monnaie** | |

**Chaque objet affiche son poids.** C'est la seule façon de rendre l'arbitrage de charge réel au lieu d'abstrait.

**Un compteur en bas de l'écran, permanent :**

> *À ce rythme : vivres pour 4 POI · eau pour 3 POI*

C'est **la pièce la plus importante de tout l'écran**. Elle transforme une consommation invisible en information exploitable, et c'est elle qui rend l'auto-régulation possible : un joueur qui choisit de tout affronter doit pouvoir mesurer ce que ça lui coûte pendant qu'il le fait.

---

## 6. Onglet Équipement

**Par personnage**, sélection en haut.

| Emplacement | Affiche |
|---|---|
| Arme principale | Dégâts, portée, **usure** |
| Arme secondaire | Idem |
| Armure | Réduction, effet sur la vitesse, **usure** |
| Accessoires | 2 emplacements — effets divers |
| Munitions | Flèches : `9 / 20` |

**L'usure** — barre à 10 crans par pièce, avec le seuil de casse marqué.

| État | Affichage |
|---|---|
| 10 à 4 | neutre |
| 3 à 1 | **ambre — « bientôt inutilisable »** |
| 0 | **rouge — −2 dégâts, ou −1 armure** |

L'avertissement à 3 crans est indispensable : découvrir qu'une arme est cassée au milieu d'une bataille n'est pas de la difficulté, c'est une information qu'on n'a pas donnée.

**Réparer** — disponible dans les lieux `forge`, ou avec Mathias si le matériel suffit. Coût en matériaux affiché avant confirmation.

---

## 7. Onglet Bestiaire

**Liste** — par territoire, puis par palier. Chaque entrée montre son état de remplissage :

| Icône | Sens |
|---|---|
| ○ | **Racontée** — on en a entendu parler, jamais vue |
| ◐ | **Vue** — visuel et description obtenus |
| ● | **Connue** — statistiques exactes |

**Fiche — les trois couches de la §0 des créatures, dans cet ordre :**

| Couche | Quand |
|---|---|
| **Ce qu'on raconte** | Dès qu'un PNJ en a parlé. Texte seul |
| **Ce qu'on a vu** | À la première rencontre. Visuel + description perceptive |
| **Ce qu'on sait** | Au premier combat. PV, dégâts, armure, vitesse, attaques, contres identifiés |

**Journal de rencontres** — où, quand, combien de fois. Le bestiaire devient une carte de ce qu'on a traversé, pas seulement une table.

> **Aucun visuel n'est requis pour que l'écran fonctionne.** L'entrée reste lisible sans image, et la place lui est réservée. C'est ce qui permet de produire les visuels beaucoup plus tard.

---

## 7 bis. Pas de Journal — décision de design

**Aucun onglet ne rassemble les indices.** Ni au départ, ni après le twist.

Un journal qui aligne la relève absente, le sel plus cher et les orques qui s'arrêtent une seconde **détruirait le twist**. Tout le dispositif repose sur le fait que le joueur les lise **comme du décor** (`SPEC_MONDE` §5). Les ranger dans une liste les transforme en dossier d'enquête : le joueur ouvre l'onglet, voit cinq anomalies alignées, et comprend qu'il y a un complot des heures trop tôt.

**Les indices vivent donc uniquement dans la mémoire du joueur.** C'est plus exigeant, et c'est ce qui rend la révélation possible.

**Seul élément conservé : l'objectif courant.** C'est une destination — sa place est **sur la carte**.

---

## 8. Écrans de jeu

### 8.1 Écran narratif — l'écran principal

```
 ┌─ barre permanente ───────────────┐
 │                                  │
 │   [ancrage — repliable]          │
 │                                  │
 │   texte du beat                  │
 │                                  │
 │   ▸ choix 1        (coût)        │
 │   ▸ choix 2        (coût)        │
 │   ▸ choix 3        (coût)        │
 │                                  │
 └─ onglets ────────────────────────┘
```

- **L'ancrage est repliable et toujours accessible.** C'est la règle §3.2 : la scène doit rester visualisable à tout moment
- **Chaque choix affiche son coût certain**, jamais son résultat. C'est la règle d'information du mode narratif
- **Un choix dont le prérequis manque n'apparaît pas.** Il n'est pas grisé — il n'existe pas

### 8.2 Écran tactique

Zones affichées **en colonnes empilées verticalement**, ce qui convient à un écran étroit. Aucune grille.

```
 ┌─ barre permanente ──────  ⚔ 3/4 ─┐
 │  LA PENTE        Renn, Tomas     │
 │  LES FEUX        2 Rôdeurs, Totem│
 │  LA PALISSADE    3 Cogneurs      │
 │  LE RAVIN        —               │
 ├──────────────────────────────────┤
 │  [journal du tour]               │
 └──────────────────────────────────┘
```

- **Appui sur une zone** → détail des unités, avec leur état d'information (`PV ??` / `~45-70` / `58`)
- **Appui sur une unité** → ses actions possibles, et le coût en points de commandement
- **Les annonces sont affichées dans la zone concernée** : *tête baissée*, *le sol remue*, *ils se mettent en ligne*. C'est la surface de contre exigée par la règle du contre
- **Journal du tour** en bas : ce qui vient de se passer, en une ou deux lignes

### 8.3 Écran de carte — délibérément sous-spécifié

> **Rien n'est tranché ici, volontairement.** La répartition entre onglets, plein écran et menus est impossible à décider sur le papier : elle dépend de sensations qu'il faut avoir manipulées.

**Version minimale pour le premier MVP :**

- **Plein écran**, appelé depuis l'action de voyager — pas un onglet, qui la contraindrait à la largeur du reste
- Zones dépliables, POI avec leur état *(inconnu / signalé / accessible / exploré / épuisé)*
- **L'objectif courant** affiché en haut
- **Avant de confirmer un déplacement**, un encart : temps, fatigue, faim, eau, et les POI traversés en chemin. Un trajet ne se décide jamais à l'aveugle

**Reporté au retour de test :** les calques (contrôle, danger, ressources), la navigation entre niveaux de zoom, et la question de savoir si la carte mérite un onglet permanent.

### 8.4 Bilan de fin de run

Statistiques, badges, et le paragraphe narratif. Conçu pour être **partagé en capture d'écran** — donc tenir en une hauteur d'écran, sans défilement.

---

## 9. Ce qui reste ouvert

Ces points ne se décident pas sur le papier. Ils se tranchent après le premier MVP jouable.

| Point | Ce qu'il faudra observer en test |
|---|---|
| **Répartition carte / onglets / menus** | Est-ce qu'on cherche la carte, ou est-ce qu'elle tombe sous le pouce ? |
| **Le compteur « vivres pour 4 POI »** | Utile, ou trop assistant ? Il est indispensable à l'auto-régulation, mais il peut casser la tension |
| **Densité de la barre permanente** | Six indicateurs sur une largeur de téléphone. Trop ? |
| **Profondeur des fiches** | Combien d'appuis pour atteindre une information dont on a besoin en plein combat |
| **Repliage de l'ancrage** | Ouvert par défaut, ou fermé ? |

**Tranché :** points de vie dans la barre · points de commandement utilisables affichés en grand · **aucun Journal, à aucun moment** · carte en plein écran.
