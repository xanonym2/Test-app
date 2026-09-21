# Les Terres Voilées — Spécification de design

**Version :** 2.1
**Statut :** source de vérité
**Dernière mise à jour :** 21 septembre 2026

> **21/09/2026 —** Les règles de contenu et le format des storylets relèvent désormais de `content/CONTRAT.md` (v2.1). Sur une règle de contenu, le contrat prime ; sur un système de jeu, ce fichier prime.

---

## 0. Usage de ce document

Ce fichier est la **source de vérité** du projet. Il n'est pas un brief jetable.

**Règles d'usage :**

1. Ce document est lu **au début de chaque session** de développement, avant toute implémentation.
2. Toute demande d'implémentation se formule par référence : « implémente X **en respectant la spec** », jamais en réexpliquant le design depuis zéro.
3. Si une implémentation contredit ce document, **le document gagne** — sauf décision explicite de changer la spec.
4. Toute décision de design nouvelle est **écrite ici** avant d'être codée.
5. Les points listés en §15 (Questions ouvertes) ne doivent **pas être inventés** par l'implémenteur. Ils sont remontés pour arbitrage.

**Fichiers compagnons à créer et maintenir séparément :**

| Fichier | Contenu |
|---|---|
| `SPEC_MONDE` | Lore, factions, personnages, chronologie, mécanisme des twists |
| `SPEC_CONTENU_storylets` | Storylets de référence. **Leur format est remplacé par le schéma du contrat** |
| `SPEC_BESTIAIRE` | Créatures : aspect, comportement, attaques |
| `SPEC_COMPAGNONS` | Compagnons, compétences, magie, roster |
| `SPEC_ECRANS` | Interface et écrans |
| `content/CONTRAT.md` *(dépôt)* | Règles de contenu, identifiants, schéma des storylets |
| `CLAUDE.md` *(dépôt)* | Stack réelle, architecture, vérificateur, conventions |
| `SPEC_EQUILIBRAGE` | Valeurs cibles des systèmes à venir. **Le code fait foi** en cas d'écart |
| `SPEC_PROVENANCE` | Qui a décidé quoi — validé par l'auteur, ou comblé par l'IA |

Ce document-ci ne contient **aucune valeur chiffrée définitive**. Il définit les systèmes, pas leur calibrage.

---

## 1. Cadre du projet

| | |
|---|---|
| **Genre** | Aventure narrative + tactique, médiéval-fantastique |
| **Plateforme cible** | PC / Steam en priorité. Portage mobile envisagé après. |
| **Modèle économique** | Achat unique, 8-15 €. Démo gratuite généreuse. |
| **Structure** | Runs de 1h30-2h, organisés en chapitres |
| **Développement** | Solo, avec Claude Code. Moteur cible : Godot 4. |

### 1.1 Contrainte fondatrice : zéro appel API au runtime

**Tout le texte du jeu est pré-écrit et livré avec le jeu.**

Sur un achat unique, toute génération de texte en cours de partie créerait un coût récurrent par joueur sur un revenu encaissé une seule fois. C'est économiquement intenable.

**Conséquence sur le rôle de l'IA :** le modèle est un **outil de production de contenu en amont** (écrire des centaines de storylets conformes au format), jamais le narrateur au runtime.

**Conséquence sur le design :** le contenu doit être fini, structuré et recombinable. C'est précisément ce que garantit le format défini en §3.

---

## 2. Structure de partie

### 2.1 Le principe

Le jeu est une **structure en runs avec progression narrative en escalier**.

- La **puissance** retombe à zéro à chaque run.
- Le **récit** et la **connaissance** avancent définitivement.

### 2.2 Ce qui persiste, ce qui reset

| Élément | Persiste ? | Raison |
|---|---|---|
| Niveau du héros | **Non** | Maintient la difficulté |
| Équipement | **Non** | Idem |
| Compagnons recrutés | **Non** | Mais **la mort d'un compagnon persiste sur toute la partie** — un frère mort au chapitre 1 est absent aux chapitres 2 et 3. Seule une nouvelle partie le ramène |
| Compétences débloquées | **Non** | Idem |
| Réputation de faction | **Non** | Doit rester un arbitrage de run (voir §7.2) |
| **Bestiaire / connaissance des unités** | **Oui** | N'est pas de la puissance (voir §5.5) |
| **Jalons narratifs atteints** | **Oui** | Un twist ne se rejoue jamais (voir §2.4) |
| **Départs de chapitre débloqués** | **Oui** | Évite de rejouer un chapitre terminé |
| **Contenu découvert** (compagnons rencontrés, zones, routes connues) | **Oui** | Élargit sans renforcer |

**Règle de séparation :** la persistance est autorisée quand elle **élargit le champ des possibles** ; elle est interdite quand elle **rend le joueur plus fort**.

### 2.3 Chapitres

Le récit est découpé en chapitres, bornés par les jalons majeurs :

| Chapitre | Cible perçue de l'enquête | Se clôt sur |
|---|---|---|
| **1** | Les Orcs (menace brute, apparente) | Twist 1 : la piste remonte à L'Ordre |
| **2** | L'Ordre (suspect crédible, mais innocent) | Twist 2 : la cabale au sein de La Couronne |
| **3** | La cabale — et l'après-révélation | Voir §13 |

Un chapitre peut être atteint **dès le premier run** si le joueur en fait les choix. Il n'y a pas de quota de runs imposé.

### 2.4 Règle non négociable : jalon atteint = jalon consommé

Un jalon narratif (twist, révélation, scène scénarisée majeure) ne se déclenche **qu'une seule fois par partie**. Il n'est jamais rejoué, même si le joueur meurt ensuite.

Un joueur qui revoit trois fois la même révélation décroche définitivement.

### 2.5 Déblocage de chapitre : départ, pas sauvegarde

**C'est la distinction critique du système.** Atteindre un twist débloque **l'accès à un point de départ**, pas la restauration d'un état.

| | Débloquer un départ (retenu) | Restaurer une sauvegarde (rejeté) |
|---|---|---|
| Ce qui est rendu | l'accès au chapitre | l'état exact au moment T |
| Permadeath | intacte | annulée |
| Coût de la mort | réel | nul |

**Package de départ de chapitre.** Quand le joueur relance au chapitre N, il démarre avec :

- un **niveau de base** cohérent avec l'avancement narratif (pas son niveau d'avant)
- un **choix de compagnon** parmi ceux qu'il a déjà rencontrés (pas son roster d'avant)
- un **équipement standard** de palier (pas son inventaire d'avant)
- son **bestiaire** intact
- sa **réputation remise à zéro**

**Exploit à interdire absolument :** si mourir restaurait l'état de début de chapitre, le jeu optimal deviendrait « se suicider dès qu'un compagnon meurt » pour annuler la perte. Le package de départ défini supprime cet exploit.

### 2.6 Nouvelle partie

Le joueur peut toujours relancer une partie complète depuis le chapitre 1 — pour explorer des trajectoires différentes ou préserver des personnages morts. Cela réinitialise les jalons narratifs, **mais pas le bestiaire**.

### 2.6 bis Le rythme appartient au joueur

> **Les durées estimées servent à budgéter le contenu, jamais à contraindre la partie.**

Un joueur qui affronte tout ce qu'il croise allonge son run. **Ce n'est pas un défaut à corriger** : c'est sa façon de jouer, et elle doit rester possible. Il comprendra seul que ce n'est pas optimal — ressources épuisées, compagnons blessés, équipement usé, parfois une mort.

Un joueur qui traverse sans jamais s'arrêter va plus vite et le paie autrement : moins d'informations, moins d'équipement, moins de niveaux, un bestiaire à trous. Il arrive aux Terres Noires nu.

**Aucune voie n'est bloquée, aucune n'est récompensée artificiellement. C'est l'économie qui arbitre, pas une règle.**

> **La seule obligation que ça crée :** les coûts doivent être **lisibles en cours de route**. Un joueur qui se bat beaucoup doit voir ses ressources fondre pendant qu'il joue, pas le découvrir au bilan. Sans ça, l'auto-régulation devient un piège.

---

### 2.7 Diversité des départs — obligatoire

Le joueur traversera les débuts de plus en plus vite à mesure qu'il maîtrise le jeu. **Le début ne doit donc pas être identique d'un run à l'autre.**

Leviers obligatoires :

- **départs variables** : situation initiale, lieu, événement déclencheur
- **mutateurs de groupe** : composition de départ, contraintes, avantages
- **rotation du pool recombinable** : les premières rencontres ne sont jamais les mêmes

C'est ce qui empêche l'usure des 30 premières minutes. À vérifier en test à chaque itération.

---

## 3. Format de storylet

### 3.1 Le principe qui règle la granularité

**Interdit :** un choix = une scène. Le joueur choisit, on saute ailleurs.

**Requis :** une scène = **un lieu + une situation qui évolue**.

> **Règle dure :** aucun choix ne fait quitter la scène, sauf s'il déclenche explicitement une sortie (fuite réussie, menace neutralisée, catastrophe).

Tout le reste reste dans le même décor, avec la même focale.

### 3.2 Structure

```
STORYLET
├─ MÉTA        id, zone/POI, type, conditions d'apparition, poids, pool
├─ ANCRAGE     le décor — 3 à 5 lignes, écrit UNE fois, relisible à tout moment
├─ ÉTAT        variables internes de scène (menace, distance, visibilité, alerte…)
├─ BEATS       boucle : état → choix → conséquence narrée → nouvel état
├─ SORTIES     4 à 6 issues typées, chacune avec son épilogue
└─ RETOMBÉES   écriture dans l'état du monde (blessures, loot, flags, réputation)
```

**L'ANCRAGE est le champ le plus important.** C'est lui qui rend la scène visualisable et stable. Il ne change pas pendant toute la rencontre et doit rester consultable par le joueur.

### 3.3 Anatomie d'un choix

| Champ | Rôle |
|---|---|
| **Libellé** | L'action, formulée à l'intention (« Viser la gorge du premier orque ») |
| **Prérequis** | Équipement, compagnon, état requis — sinon le choix **n'apparaît pas** |
| **Coût certain** | Payé quoi qu'il arrive : munition, fatigue, bruit, temps |
| **Issues** | Au moins deux, aux effets distincts. Sur une scène majeure ou un jalon : trois paliers — franche / partielle / échec |
| **Conséquence narrée** | **Obligatoire, 2 à 4 phrases** |
| **Delta d'état** | Ce que ça change dans les variables de scène |

**La conséquence narrée est le champ non négociable.** Chaque choix produit un texte décrivant **ce qui vient de se passer** — l'action du joueur *et* la réaction du monde — **avant** que les choix suivants soient proposés.

> Exemple de référence : le joueur tire. La flèche touche la gorge du premier orque, qui s'effondre. Le second se jette derrière un rocher et hurle vers la crête. *Puis* les nouveaux choix s'affichent.

### 3.4 Le moteur de la durée : la réussite partielle

Un résultat binaire réussite/échec termine une scène en deux tours. Trois paliers, non. **Ils sont obligatoires sur les scènes majeures et les jalons** ; ailleurs, deux issues distinctes suffisent — c'est là que se joue le coût d'écriture (décision du 21/09/2026).

| Palier | Effet |
|---|---|
| **Franche** | Objectif atteint, la menace baisse |
| **Partielle** | Ça marche, mais ça coûte — nouvelle complication |
| **Échec** | L'état empire ; de nouvelles options apparaissent, d'autres disparaissent |

**C'est la réussite partielle qui fait durer la scène sans l'étirer artificiellement.**

### 3.5 Bornes de longueur

| Type de rencontre | Beats |
|---|---|
| Mineure | 2-3 |
| Standard | 4-6 |
| Majeure | 7-10 |

**Garde-fou anti-enlisement :** au-delà de la borne haute, les coûts augmentent progressivement, ce qui force une résolution.

### 3.6 Deux pools de contenu

| | Pool recombinable (~80%) | Pool jalons (~20%) |
|---|---|---|
| Nature | Rencontres, embuscades, loot, PNJ mineurs | Révélations, scènes scénarisées, PNJ récurrents majeurs |
| Déclenchement | Aléatoire, pondéré par zone / faction / état | Conditions précises |
| Rejouabilité | Oui, recombiné indéfiniment | **Non — consommé définitivement** |

Le champ `pool` de la MÉTA est obligatoire et détermine ce comportement.

---

### 3.7 Le joueur ne doit jamais être spectateur

> **Règle de conception centrale.**
> Le joueur doit être stimulé **en permanence** — par la narration *et* par la décision. Une scène qu'il lit sans agir est une scène ratée, même bien écrite. L'ennui naît de la passivité, pas de la longueur.

**Applications obligatoires :**

- **Aucune scène majeure ne se résout en un choix unique.** Atteindre un objectif prend 2 à 4 beats, chacun ramenant une décision.
- **Plus de ~6 lignes de texte sans décision proposée est un signal d'alarme.** Seules exceptions : l'ancrage initial (§3.2) et les textes de trajet (§8.5), qui sont des respirations, pas des scènes.
- **Le décor ne se contemple pas, il se lit.** Chaque description doit alimenter la décision qui suit.

**Pourquoi c'est structurant :** c'est ce système de beats multipliés qui rend chaque run unique. Deux joueurs ne traversent jamais la même scène de la même façon — non parce que le contenu diffère, mais parce que leur chemin dans la scène diffère.

**Exemple — atteindre la forge pendant la razzia :**

> **Beat 1** — Aller par la rue, vite (bruyant) · Contourner par les jardins (lent, discret) · Passer par les toits bas (risque de chute)
> → *les jardins*
>
> **Beat 2** — Un orque est à l'angle de la maison, dos tourné. Il n'a rien vu. La forge est à vingt pas derrière lui.
> → Le frapper maintenant · Attendre qu'il passe (temps) · Reculer et tenter la rue
> → *attendre* — il ne passe pas : il appelle. Un second arrive.
>
> **Beat 3** — Ils sont deux, entre toi et la porte.
> → Tirer sur le premier · Faire du bruit ailleurs · Foncer et encaisser

Trois à quatre beats par objectif, plusieurs objectifs possibles, une contrainte de temps qui n'en autorise que deux. Le joueur joue en permanence.

---

## 4. Les deux modes de jeu

### 4.1 Pourquoi deux régimes d'information

L'information complète et le mystère narratif ne coexistent pas dans une même scène. Ils coexistent très bien si le joueur **change explicitement de focale**.

| | Mode narratif | Mode tactique |
|---|---|---|
| Ce que le joueur incarne | Un homme dans une situation | Un tacticien qui évalue |
| Information | Coûts visibles, **résultats incertains** | **Tout visible** : PV, dégâts, portées, ordre d'action |
| Résolution | **Tirage informé** — la préparation et l'observation déplacent la chance ; l'aléatoire coûte, il ne tue jamais | **Déterministe, calculée** |
| Rythme | Prose, immersion | Lisibilité, calcul |

**Justification diégétique :** dans le feu de l'action, on ne sait pas si la flèche portera. Une fois le combat engagé, le temps se dilate et on jauge l'adversaire. Le changement de régime d'information **est** le changement de focale.

### 4.2 Le pont entre les deux

**Les choix narratifs déterminent l'état de départ du combat tactique.**

Les décisions prises en storylet modifient : l'initiative, la distance d'engagement, le fait d'être repéré ou non, le nombre d'ennemis déjà blessés, la fatigue, le positionnement des compagnons.

Si la situation dégénère → bascule en tactique **avec cet état-là**.

**Conséquence de design :** bien jouer la phase narrative, c'est commencer le combat avec un avantage réel et chiffré. Les deux couches se nourrissent au lieu de se concurrencer.

### 4.3 Règle de rythme : toutes les rencontres ne basculent pas

| Enjeu | Comportement |
|---|---|
| **Mineure** | 100 % narratif (rôdeur isolé, piège, animal) |
| **Standard** | Narratif ; bascule tactique **seulement si ça dérape** |
| **Majeure** | Bascule quasi systématique (chef, embuscade, affrontement scénarisé) |

Le mode tactique doit rester un **événement**, jamais une routine.

### 4.4 Périmètre du mode tactique : zones nommées, pas grille libre

**Décision arrêtée : positions discrètes (type rangs/zones), pas de déplacement libre sur grille.**

| Option | Coût de dev | Verdict |
|---|---|---|
| Grille libre (pathfinding, IA de déplacement, isométrie) | Très lourd | **Écarté** — risque d'enlisement en solo |
| **Zones nommées discrètes** | Modéré | **Retenu** |
| Résolution narrative à stats visibles | Léger | Insuffisant — perd la tactique |

Ce qui est conservé : PV exacts, dégâts d'arme exacts, portées, ordre d'action, positionnement, ciblage. Ce qui est évité : pathfinding, carte isométrique, animations complexes.

Une évolution vers la grille libre est envisageable **dans un jeu ultérieur**, pas dans celui-ci.

---

### 4.5 La règle du contre

> **Toute attaque ennemie doit avoir au moins un moyen de l'empêcher — connu, ou apprenable à la première rencontre.**

Sans cette règle, le joueur cesse de jouer : il encaisse et limite les dégâts. **Un jeu tactique se reconnaît à ce que chaque coup reçu est un coup qu'on aurait pu éviter.**

**Trois formes de contre.** Toute attaque doit en offrir au moins une :

| Forme | Exemple |
|---|---|
| **Préventif** | Un ordre permanent, une position, le silence — l'attaque n'arrive jamais |
| **Réactif** | Une dépense de points de commandement, une capacité — l'attaque arrive, on l'annule |
| **Structurel** | Le risque a été choisi en amont : approche, composition, itinéraire |

> **Corollaire : toute attaque lourde doit avoir une annonce.** Un tour à l'avance : la tête qui descend, la ligne qui se forme, le sol qui remue. Sans annonce, pas de contre — donc pas de décision.

**Corollaire sur les défaites :** une défaite doit venir de l'épuisement d'une ressource, jamais d'un coup de malchance. Exemple de référence — Tomas saisi par le Fossoyeur : deux points de commandement l'extraient. Qui a gardé ses points s'en sort toujours.

---

### 4.5 États d'échec — le héros ne meurt pas

Le héros ne meurt jamais. Mais l'issue d'un échec **dépend de l'adversaire**, car la capture n'a pas de sens face à tous.

| Adversaire | Issue |
|---|---|
| Couronne / Ordre / Marchands | **Capture.** Perte de l'équipement porté (jamais du stock en base), évasion à jouer |
| **Orques** | **Pas de capture.** Sous emprise, ils ne font aucun prisonnier. Le héros est **laissé pour mort** : temps perdu, blessure lourde, équipement porté dispersé |
| Créatures | Fuite forcée ou laissé pour mort, selon l'archétype |

> **Règle :** l'échec ne tue pas, mais il doit coûter assez pour ne jamais devenir une porte de sortie gratuite. Un échec indolore annule tout le système de risque.

**Exception — l'ouverture :** aucune mort ni capture n'est possible pendant la razzia. Une situation critique déclenche une **fuite forcée**, et le joueur repart avec un départ appauvri (moins de ressources, blessure, aucune information). La scène enseigne, elle ne punit pas.

---

### 4.6 Système tactique — spécification

#### Frontière entre les deux systèmes

**Deux conditions doivent être réunies** pour qu'un combat bascule en tactique :

1. **Une équipe à commander** — au moins 3 unités côté joueur
2. **Un enjeu suffisant** — selon la règle de rythme §4.3

Sans les deux, la rencontre reste narrative. Un animal, un individu isolé, un danger diffus ne basculent jamais.

#### Déverrouillage progressif

| Unités côté joueur | Combat disponible |
|---|---|
| 1-2 | **Narratif uniquement** |
| 3-4 | Escarmouche |
| 5 | Escarmouche et bataille |

> **Décision de rupture :** l'ancienne règle imposait **toujours 5 unités** côté joueur, conçue pour une campagne de 40-50 h où l'équipe se constituait une seule fois. Avec le reset de puissance (§2.2), Tomas démarre chaque run **seul**, puis à deux avec Mathias, et n'atteint 5 unités qu'en fin de chapitre s'il recrute bien.
>
> **Conséquence assumée et bénéfique : le mode tactique est une couche qui se déverrouille en recrutant.** Cela donne au recrutement un poids bien supérieur à un bonus de statistiques.

#### Deux échelles, mêmes règles, même code

| | Escarmouche | Bataille |
|---|---|---|
| Zones | 2 | 4-5 |
| Ennemis | 3-5 | 8-12 |
| Tours | 3-4 | 8+ |
| Points de commandement / tour | **2** | **4** |
| Interruptions narratives | 0 ou 1 | plusieurs |
| Options par zone | 2-3 | 4-5 |
| Ce que ça teste | **la planification** | **l'adaptation** |

#### Représentation : zones nommées, aucune grille

**Décision arrêtée :** pas de grille, même visuelle. Les zones nommées sont affichées côte à côte, chacune listant les unités qui s'y trouvent.

> Supersède la note de conception antérieure, qui gardait une grille visible pour le repère spatial avec les zones comme granularité de commandement, et laissait leur articulation à préciser. Supprimer la grille élimine la question sans réponse, coûte moins cher et se lit mieux.

#### Phase de plan

Avant chaque combat, le joueur **place ses unités** et donne à chacune un **ordre permanent**, exécuté seul, gratuitement, tour après tour.

Exemples d'ordres : *tenir cette zone* · *protéger telle unité* · *attaquer tout ennemi entrant dans cette zone* · *se replier sous un seuil de points de vie*.

#### Points de commandement — ressource centrale

| Action | Coût |
|---|---|
| Exécuter un ordre permanent | **Gratuit** |
| Changer l'ordre d'une unité | 1 point |
| Déclencher une capacité active | 1 point |
| Commander une unité temporaire | 1 point |

> **Ce qui est prévu est gratuit, ce qui est improvisé se paie.** C'est le cœur de la tension : l'escarmouche récompense un bon plan, la bataille récompense la capacité à réagir.

**Progression :** l'augmentation des points de commandement se débloque dans l'arbre de compétences (§10.3).

> **Garde-fou d'équilibrage :** c'est de loin l'amélioration la plus puissante du jeu — passer de 2 à 4 en escarmouche double la capacité d'improvisation. **Deux à trois paliers maximum sur tout l'arbre**, rares et chers. Une augmentation banalisée rendrait le chapitre 3 trivial.

#### Unités temporaires

Soldats survivants, gardes marchands intervenant au titre du drapeau *obligé* (§9.3), villageois armés.

**Régime retenu : autonomes par défaut, redressables au prix d'un point de commandement, ordres simples uniquement.**

- Elles se battent **selon leur nature** — les soldats tiennent, les villageois hésitent, les gardes marchands protègent la marchandise
- **Aucun ordre permanent** ne leur est donné en phase de plan
- En cours de combat, un point de commandement permet de leur crier un ordre **simple** : *tiens* · *recule* · *viens ici*. Jamais d'ordre conditionnel ou de protection ciblée

**Pourquoi ce régime :** des inconnus qui obéiraient au doigt et à l'œil ne seraient pas crédibles ; du décor ingérable ne serait pas intéressant. Ici elles **consomment la ressource centrale**, donc les commander est un arbitrage — et les vrais compagnons restent qualitativement supérieurs, puisqu'ils obéissent gratuitement.

**Deux propriétés importantes :**

1. **Elles comptent pour le seuil de 3 unités.** C'est ce qui rend une escarmouche possible alors que le héros est seul
2. **Elles peuvent mourir sans permadeath.** Le combat coûte émotionnellement sans brûler un personnage du récit

#### L'état *hors de combat*

Une unité protégée par le récit (personnage porteur de storylets, ou Mathias en Mode Récit) ne meurt pas : elle **quitte le combat à un seuil de dégâts**, définitivement pour cette bataille.

> **Le seuil est indispensable.** Si elle ne sortait qu'au moment de mourir, le joueur comprendrait vite qu'il tient un bouclier immortel et l'enverrait absorber tout ce qui passe. Avec un seuil, elle sort tôt, le joueur perd une unité, et les storylets écrits autour d'elle sont saufs.

Un seul et même mécanisme sert les deux cas.

#### Aucun scaling dynamique

> **Règle absolue : le danger est une propriété du lieu, jamais du niveau du joueur.**

Faire monter les ennemis avec le joueur transformerait la progression en illusion : trois heures d'équipement, et les orques restent exactement aussi durs qu'au premier jour. Le joueur le sent, même sans comprendre pourquoi, et cesse de vouloir progresser.

| Approche | Effet |
|---|---|
| Scaling dynamique | Le joueur ne sent jamais qu'il progresse |
| **Danger fixe par lieu** (retenu) | Le joueur mesure sa progression à ce qu'il ose affronter |

**Ce qui s'adapte, ce n'est pas la difficulté : c'est l'accès.** Les zones dures sont ouvertes dès le début — le joueur peut y aller trop tôt et le payer, c'est son choix. Revenir tard sur une zone qui l'avait mis en déroute et l'écraser est une **récompense**, pas un déséquilibre.

#### Animations

Courtes, **désactivables**, réservées aux coups qui comptent. Une bataille de huit tours où chaque échange déclenche une animation devient interminable.

---

## 5. Système de connaissance

C'est le système central du jeu. **En combat**, il remplace l'aléatoire comme source d'incertitude.

> **En combat, l'incertitude ne vient pas du hasard. Elle vient de l'ignorance du joueur.**

Résolution déterministe + information imparfaite = lisibilité tactique **et** tension.

**Hors combat** (décision du 21/09/2026), un tirage existe, mais la préparation et l'observation le déplacent, et il ne peut jamais tuer : une issue tirée au sort ne tue ni le héros ni un compagnon, et ne met pas fin au run. L'ignorance reste la première source d'incertitude.

### 5.1 Taxonomie des unités

Chaque faction décline ses unités selon **deux axes indépendants** :

| Axe | Rôle |
|---|---|
| **Catégorie (C / B / A / S)** | **Le rôle et les capacités** — designs réellement distincts |
| **Niveau (1 / 2 / 3)** | **L'échelle de puissance** — multiplicateur sur la fiche |

**Piège à éviter absolument :** si C < B < A < S n'est qu'une hiérarchie verticale de puissance, les unités C deviennent obsolètes en fin de partie et 75 % du contenu meurt. Les catégories doivent être des **rôles** (ex. : rôdeur rapide, porteur de bouclier, soutien, chef à aura), ce qui garde un C1 pertinent tard — en escorte d'un S.

**Bénéfice :** 4 designs + 1 courbe par faction au lieu de 12 fiches. Les rencontres deviennent des **compositions** (3×C1 + 1×B2 + 1×A1) plutôt qu'un curseur de difficulté.

### 5.1 bis Le bestiaire — trois couches

| Couche | Quand elle s'ouvre | Contenu |
|---|---|---|
| **Ce qu'on raconte** | **Avant toute rencontre**, si la bête est connue ou racontée | Texte seul. Aucune statistique, aucun visuel |
| **Ce qu'on a vu** | **À la première rencontre** | Le visuel, et la description de ce qu'on a observé |
| **Ce qu'on sait** | **Au premier combat** | Les statistiques exactes |

> Le visuel n'apparaît qu'à la rencontre — **rien ne bloque tant qu'il n'est pas produit.**

**Trois états de notoriété**, réglés par la seule règle de distance :

| État | Sens | Où |
|---|---|---|
| **Connue** | Le héros et les gens d'ici savent ce que c'est. Le texte est exact | Couronne |
| **Racontée** | On en parle sans l'avoir vue. Le texte **exagère ou se trompe** | Terres Libres, bêtes lointaines |
| **Inconnue** | Rien. Entrée vide jusqu'à la rencontre | Terres Noires |

**Fonction du niveau *Racontée* :** faire peur et donner envie à propos de bêtes qu'on ne peut pas encore aller voir. L'entrée s'ouvre, reste vide et inquiétante pendant des heures, et **aucune mécanique n'est accrochée dessus**.

> **Garde-fou :** quand une histoire se trompe, elle se trompe toujours dans un sens qui coûte des **ressources**, jamais la vie.

**Correction importante :** toute créature ne démarre donc pas en état *Inconnu*. Tomas est chasseur, chez lui, dans des bois qu'il arpente depuis huit ans — il connaît les bêtes de la Couronne.

---

### 5.2 Trois états d'information

| État | Affichage | Origine |
|---|---|---|
| **Inconnu** | `PV ??` + **lecture perceptive obligatoire** | Jamais rencontré |
| **Estimé** | `PV ~45-70` | Extrapolé, observé, ou appris |
| **Exact** | `PV 58` | Déjà affronté |

### 5.3 La lecture perceptive — garde-fou anti-frustration

**Règle :** une unité en état *Inconnu* livre **toujours** une description perceptive gratuite : taille, armure, cicatrices, ornements, posture, comportement.

Le joueur ne connaît pas les chiffres, mais il sait qu'il a affaire à quelque chose de sérieux. **Décider en connaissance de risque ≠ décider à l'aveugle.**

Sans cette règle, un joueur qui croise une unité très supérieure, fait un choix raisonnable et meurt, subit une mort injuste — et décroche.

**Niveaux de lecture :**

| | Coût | Rendu |
|---|---|---|
| **Basique** | Gratuite, automatique | Description perceptive |
| **Détaillée** | Action volontaire, coût faible mais réel (temps, fatigue, bruit, risque d'être repéré) | Passage en état *Estimé* |

### 5.4 Extrapolation

Le cloisonnement total (12 découvertes par faction) est du remplissage.

- Connaître **C1** déverrouille **C2 et C3** en état *Estimé* (fourchette), jamais *Exact*.
- Connaître **deux catégories** de la même faction affine l'estimation des autres.

Justification narrative : on commence à comprendre comment ces créatures sont bâties.

### 5.5 Pourquoi le bestiaire persiste entre les runs

**Le bestiaire n'est pas de la puissance.** Connaître les PV d'un orque ne rend pas plus fort : le joueur redémarre niveau 1, sans équipement, sans compagnon.

Sans persistance, le run 2 produit ceci : le joueur *sait* qu'une flèche tue un C1, l'UI affiche `??`. Soit il tire quand même et l'affichage n'a servi à rien, soit il doit refaire l'observation pour que l'interface rattrape ce qu'il sait déjà. **C'est de la corvée, pas de la difficulté.**

Le garde-fou de la difficulté, c'est le reset de puissance (§2.2). Il suffit.

### 5.6 Voies d'acquisition — plusieurs, pas seulement le combat

**Risque identifié :** un joueur en difficulté fuit → n'apprend pas → reste en difficulté → fuit encore. Le système punirait celui qui perd déjà.

**Correctif : le combat n'est qu'une voie parmi plusieurs.**

| Voie | Rendu |
|---|---|
| Affronter | État *Exact* |
| Observer à distance (choix de storylet, coûte temps/fatigue) | État *Estimé* |
| Examiner un cadavre après coup | *Estimé* ou *Exact* selon le cas |
| Interroger un PNJ, acheter un bestiaire chez un marchand | *Estimé* |
| **Compagnon spécialiste** (le chasseur connaît les bêtes, l'ancien soldat connaît les orques) | *Estimé*, automatique |

Le compagnon spécialiste est le levier le plus intéressant : il donne une **valeur stratégique au recrutement au-delà des stats de combat**.

Résultat : le joueur prudent joue info-par-exploration, le joueur agressif joue info-par-affrontement. **Deux styles viables, aucun puni.**

### 5.7 Écran bestiaire

Obligatoire. Sans lui, le joueur devrait mémoriser des dizaines d'entrées. C'est aussi une **vitrine de progression** très satisfaisante, et l'un des rares éléments qui persiste — donc un moteur d'attachement au long cours.

### 5.8 Bénéfice transversal

Le système de connaissance est le **ciment entre les deux modes** :

- la connaissance acquise en tactique débloque des **options narratives** (« tu sais que leur chef porte toujours l'étendard — vise-le ») ;
- l'observation menée en narratif améliore **l'affichage tactique**.

---

## 6. Cadrage d'ouverture

**Problème constaté en v3 :** le jeu entre directement dans l'action. Le joueur — y compris le concepteur — se sent perdu.

**Principe :** mystère et cadrage ne sont pas opposés. Le bon mystère, c'est **comprendre parfaitement les règles du monde et son objectif, sans savoir ce qui va arriver**. Sans ce socle, le joueur ne se perd pas dans le bon sens : il décroche.

### 6.1 Exigences de la séquence d'ouverture

L'ouverture doit établir, **de façon narrative** (pas sous forme de tutoriel ou de manuel) :

1. **Où** — le lieu, l'époque, l'ambiance
2. **Qui** — qui est le héros, sa situation, ses attaches
3. **Quoi** — ce qui se passe dans le monde, la nature de la menace
4. **Pourquoi lui** — ce qui le met en mouvement
5. **Quel type d'expérience** — ce que le joueur va faire (explorer, décider, combattre, survivre)

### 6.2 Ce qu'il ne faut PAS expliquer

Les mécaniques évidentes (barres de faim et de fatigue, gourdes) **vont de soi** et n'ont pas besoin d'être détaillées. Elles s'apprennent à l'usage.

### 6.3 Contraintes de rythme

- **Premier vrai choix en moins de 2 minutes.**
- Le cadrage se fait **par la scène**, pas par un écran de texte.
- L'ancrage initial doit rester **consultable à tout moment**.

### 6.4 Ton d'écriture

La v3 a établi le bon registre — **simple, accessible, compréhensible** — après une v2 excessivement descriptive. Ce registre est **validé et à conserver**.

> **Règle d'écriture transversale : le détail est diagnostique, jamais décoratif.**
> Chaque détail décrit doit aider le joueur à évaluer sa situation ou à décider. Un détail qui ne sert qu'à faire joli est supprimé.

---

### 6.5 Deux versions de l'ouverture

L'ouverture complète ne peut pas se rejouer à chaque run : au troisième, elle devient une corvée.

| Version | Quand | Durée |
|---|---|---|
| **Longue** | Premier run uniquement | ~8-10 min |
| **Courte** | Runs suivants | ~2 min — on démarre directement à la chasse |

### 6.6 Structure en 5 beats

| Beat | Ce que ça installe | Ce que ça enseigne |
|---|---|---|
| **1. Le seuil** | Où, qui, depuis quand. **Premier choix à 90 s** | Coûts, équipement |
| **2. La forge** | Mathias, le lien fraternel, le métier | Compagnons |
| **3. La traversée** | Le lore, par les voix du village | Réputation, factions |
| **4. La chasse** | Un storylet complet à faible enjeu | Lecture perceptive, paliers, bestiaire |
| **5. La cloche** | Bascule | Que tout ce qui précède était fragile |

### 6.7 Beat 1 — texte de référence

> Le jour se lève sur Val-de-Garde.
>
> De la porte, on voit la tour de guet plantée en haut du versant. Sa cloche est immobile. Elle n'a pas sonné depuis huit ans — depuis que la Couronne a signé la paix avec les Terres Noires.
>
> Tu avais dix-sept ans et une lance. Maintenant tu as un arc, et les bois sont à toi.
>
> Neuf flèches dans le carquois. Il en faut douze pour une bonne journée.

Quatre phrases installent : le lieu, le passé de soldat, la durée de la paix, et un manque chiffré.

**Premier choix, immédiat :** refaire des flèches (coûte du bois et une partie de la matinée) ou partir léger. Le joueur ignore que ce choix décidera de ce qu'il pourra faire pendant la razzia.

> **La cloche est le dispositif central.** Posée à la deuxième phrase, apparemment décorative. Quand elle sonne au beat 5, **aucune explication n'est nécessaire** : le joueur a compris dès la première minute. Effet maximal, coût nul.

**Le lore par les voix (beat 3)** — au lieu d'un paragraphe explicatif, trois échanges entendus en traversant le village :

- un soldat de la Couronne qui se plaint d'une relève qui n'arrive pas
- un marchand qui dit que la route du sud coûte plus cher qu'avant
- quelqu'un qui remarque que les frères de l'Ordre ne sont pas passés ce mois-ci

Trois factions présentées, trois anomalies posées, zéro explication. Le joueur les lit comme du décor. Elles n'en sont pas.

### 6.8 La razzia

**Nature de l'événement :** une **attaque éclair**, pas une occupation. Les orques traversent le village, détruisent, puis se retirent vers leur territoire. Ils ne tiennent rien, ne prennent personne.

> **Justification de design :** une razzia suivie d'un retrait fabrique un *casus belli*. Une occupation n'appellerait qu'une reconquête locale ; une razzia appelle une **expédition punitive en territoire ennemi** — précisément ce que la cabale cherche à obtenir.

**Le héros est parti chasser.** Il ne vit pas l'attaque : il **y revient**. Il arrive trop tard et ne peut plus que choisir.

#### Lecture de la scène

La scène de retour est une **lecture perceptive appliquée à une bataille** (§5.3). Cinq éléments, tous diagnostiques :

| Élément | Ce que ça informe |
|---|---|
| Ampleur | Combien, dispersés ou en masse |
| Phase | Ce qui est tombé, ce qui tient |
| Direction | Où ils poussent — donc où ils ne sont pas |
| Ce qui tient | La forge, la ligne, la tour |
| Temps restant | Avant que ça cède |

**Texte de référence :**

> Ils ne sont pas venus pour prendre le village. Ils le traversent.
>
> La rangée de maisons basses n'existe plus. Du côté du puits, une dizaine d'entre eux poussent vers la place. Une vingtaine d'hommes sont déjà tombés — il en reste une poignée qui tient la ligne, et qui tient pour rien d'autre que gagner du temps.
>
> La forge est fermée. Quelqu'un a barré la porte de l'intérieur.
>
> Ça ne tiendra pas longtemps.

#### Les choix

**Principe : le joueur a le temps de faire deux choses. Il y en a quatre à faire.**

Chaque beat consomme du temps. La ligne tombe au bout de N beats **quoi que fasse le joueur**. Ce n'est pas un menu d'objectifs, c'est une course.

| Choix | Ce qui se passe | Conséquence différée |
|---|---|---|
| **Tenir la ligne** | Se battre avec les derniers ; ne sauve rien de précis | Plus de survivants ; un soldat s'en sort — témoin utile plus tard |
| **La forge** | Mathias répond à travers la porte ; on s'y équipe | Confirmation que les cachés sont hors de danger ; flèches |
| **Chercher Jonas** | Porte ouverte, maison vide, traces vers le sud | **Seule piste** sur sa disparition |
| **La réserve** | Vivres et matériel | Ressources de départ pour la route |
| **Partir tout de suite** | Indemne, non épuisé, **avant la vague** | Arrivée en tête des fuyards, patrouilles de la Couronne encore en place |

> **Règle : aucune option ne rend zéro.** Sûr et pauvre est une option légitime ; vide ne l'est pas.

**Ce que le tableau raconte :** l'option héroïque — tenir la ligne — est celle qui prive de l'information sur Jonas et des ressources. Se battre ou se préparer, pas les deux.

**Et le tout premier choix du jeu se paie ici :** avec douze flèches, on peut tenir la ligne ; avec neuf, on est à sec avant la fin. Le joueur apprend en trois minutes que les petites décisions comptent — sans qu'on le lui dise.

#### Le joueur ne doit pas se sentir lâche

L'information qui l'autorise à partir vient de **Mathias**, jamais du narrateur :

> « Ils sont vingt là-dedans. Femmes, gosses. Ils n'ont pas fait un bruit depuis que j'ai barré. Les orques passent devant sans regarder. »

Venant du narrateur, cela sonnerait comme une excuse fournie par le jeu.

**La razzia s'achève seule.** Les orques se retirent parce que c'était le plan, pas parce que le joueur a gagné. Il ne doit à aucun moment croire qu'il a sauvé le village.

### 6.9 Après la razzia

- Les cachés sortent de la forge — **ils survivent, et serviront de témoins** sur le comportement des orques
- **Tous les soldats sont morts** en tenant la ligne
- Tomas et Mathias survivent **parce qu'ils n'étaient pas dans la ligne** : l'un n'est plus soldat depuis huit ans, l'autre est forgeron. Aucun capitaine mourant ne les désigne — il ne reste simplement personne d'autre
- **Jonas a disparu.** Personne ne sait ni où ni pourquoi
- Mission par défaut : **prévenir les chefs de la Couronne**

> **Mathias est mortel dès le départ** — permadeath sans exception. Conséquence d'écriture à budgéter : **toute scène l'impliquant a besoin d'une variante sans lui**, y compris le rapport aux chefs de la Couronne.

**Message de permadeath.** Au moment où Mathias devient compagnon, un message **hors fiction**, court, visuellement soigné, **non modal**, affiché une seule fois sur l'écran de transition après la scène — jamais pendant. Le joueur ne doit pas pouvoir le rater, mais la scène ne doit pas être coupée.

Trois garde-fous diégétiques l'accompagnent :

| Garde-fou | Forme |
|---|---|
| État lisible | Un compagnon en danger réel est **visiblement** en danger — par la description, pas par une barre à surveiller |
| Sortie disponible | En mode tactique, le retrait reste toujours jouable, même coûteux |
| Une ligne de Mathias | Il dit lui-même qu'il n'est pas soldat. Le joueur est prévenu **par le personnage**, pas par le système |

### 6.10 Arc du chapitre 1 — révisé

| Phase | Contenu | Durée cible |
|---|---|---|
| Ouverture | Val-de-Garde au calme, Mathias, la chasse | 8 min |
| **La razzia** | Retour, lecture de scène, choix de ce qu'on sauve | 10 min |
| Après | Les survivants sortent. Joé manque. Mission de prévenir la Couronne | 5 min |
| Route | Traversée de la Couronne, premiers compagnons, l'attaque se raconte | 25 min |
| **La contre-attaque** | Offensive de la Couronne, enfoncement dans les Terres Noires | 40 min |
| **Twist 1** | Les orques sont ensorcelés → l'Ordre est soupçonné | 5 min |

> **Décision de rupture :** le camp de fuyards et la **reprise de Val-de-Garde sont supprimés**. Cet arc était budgété à 3-5 h et ne tient pas dans un run de 1h30-2h. La razzia éclair le remplace.

**Conséquence sur la carte MVP (§8.15) :** le rapport 10 POI Couronne / 4 POI Terres Noires s'inverse. Les Terres Noires doivent être étoffées, la Couronne resserrée.

---

## 7. Systèmes de progression — hiérarchie

### 7.1 Hiérarchie des systèmes — anti-dilution

Cinq systèmes de progression développés au même niveau en solo = un jeu à moitié fini sur cinq fronts.

| Priorité | Systèmes | Traitement |
|---|---|---|
| **Cœur** | Bestiaire / connaissance, Compagnons | Soignés, profonds — ils alimentent directement les deux modes |
| **Support** | Niveaux, Compétences | Courbe simple et lisible, assumée comme telle — détail en §10 |
| **Cas à part** | Réputation | Voir §7.2 |

### 7.2 Réputation de faction — variable de run

**La réputation ne persiste pas entre les runs.**

Si elle persistait, le joueur démarrerait allié partout au 4ᵉ run et tout arbitrage disparaîtrait. C'est **dans le run** qu'elle crée la tension : on ne peut pas plaire à tout le monde.

**Ce qui persiste à la place :** la **découverte qu'une route existe**. Le joueur sait désormais que s'allier à telle faction ouvre telle possibilité — mais il doit la mériter à chaque run.

### 7.3 Compagnons

- **Permadeath réelle** sur les compagnons.
- Valeur au-delà du combat : spécialisation de connaissance (§5.6), options narratives exclusives, prérequis de choix.
- **Piège à éviter :** rendre un compagnon mécaniquement indispensable, ce qui transformerait sa mort en fin de run de facto.

---

## 8. Carte et déplacement

### 8.1 Deux structures superposées

La carte n'est **pas un simple arbre**. Il faut deux structures distinctes :

| Structure | Rôle |
|---|---|
| **Hiérarchie** | Organiser l'affichage, le dépliage, le brouillard |
| **Graphe de routes** | Dire quels POI sont reliés, à quelle distance, par quel terrain |

Un arbre seul ne permet pas de relier deux POI voisins appartenant à des branches différentes — le joueur devrait remonter au niveau supérieur pour redescendre, ce qui est absurde. Le graphe de routes est indépendant de la hiérarchie.

**Profondeur maximale : 3 niveaux.** Région → Zone → POI. Au-delà, le joueur se perd dans la navigation au lieu de se repérer.

### 8.2 Niveaux de cartographie

La connaissance des routes est un **attribut de zone**, pas une liste codée en dur.

| Niveau | Ce que le joueur voit d'avance | Territoires typiques |
|---|---|---|
| **Cartographié** | Toutes les routes, distances incluses | Territoire de départ (Val-de-Garde) |
| **Partiel** | Axes principaux visibles, sentiers cachés | Terres Libres (marchands) |
| **Vierge** | Aucune route connue | Terres Noires (orques), Terres Scellées (Ordre) |

Une zone peut **monter d'un cran** : carte achetée à un marchand, compagnon pisteur, prisonnier qui parle, traces suivies. Cela donne une valeur concrète à ces objets et à ces recrutements.

> **Règle anti-impasse :** en zone vierge, on cache la **destination** d'une route, jamais son **existence**. Le joueur doit voir « trois sentiers partent d'ici » sans savoir où ils mènent.
> Cacher l'existence des routes ne produit pas du mystère, mais un écran sans option lisible — le joueur erre et décroche.

### 8.3 États de POI

| État | Ce que voit le joueur |
|---|---|
| **Inconnu** | Rien, ou une tache de brouillard |
| **Signalé** | Nom + nature approximative, jamais visité (rumeur, PNJ, carte, traversée) |
| **Accessible** | Relié à la position actuelle, visitable, contenu inconnu |
| **Exploré** | Contenu connu, contrôle local connu |
| **Épuisé** | Visité ce run, contenu consommé (voir §8.7) |

**Calques activables** par-dessus : contrôle de faction, danger estimé, ressources connues. C'est ainsi que le système de connaissance (§5) devient visible géographiquement.

### 8.4 Le POI est un contexte, pas un contenu — décision structurante

**C'est la décision qui pilote tout le planning de production.**

Si chaque POI a ses storylets écrits à la main : 50 POI × 5 storylets = 250 scènes, soit plusieurs mois d'écriture pure avant d'avoir un jeu jouable.

**Solution : découpler les storylets des lieux par un système de tags.**

- Un **POI** déclare un jeu de tags de contexte : `forêt`, `ruine`, `contrôle:orques`, `isolé`, `eau`, `danger:3`…
- Un **storylet** déclare les tags qu'il **exige** pour pouvoir se déclencher.
- Le moteur tire dans le pool recombinable filtré par les tags du POI et l'état du monde.

| Approche | Contenu nécessaire | Rejouabilité |
|---|---|---|
| Storylets attachés aux POI | 250+ scènes | Faible — toujours la même chose au même endroit |
| **Storylets filtrés par tags** | **60-100 scènes** | **Forte — recombinaison** |

L'écriture sur-mesure est **réservée aux jalons** et aux quelques lieux emblématiques. C'est exactement la répartition 80/20 des deux pools (§3.6).

> Cette décision doit être prise **avant** d'écrire le contenu. La rétrofitter sur 100 storylets déjà écrits serait très coûteux.

### 8.5 Le trajet

> **Règle absolue : le temps passe dans la fiction, jamais en temps réel.**
> Pas de barre de chargement, pas de déplacement animé à regarder, pas de timer. Un jeu narratif qui fait patienter perd le joueur.

**Contenu de l'écran de trajet :**

| Élément | Contenu |
|---|---|
| Texte de trajet | 3-6 lignes : terrain, météo, état du groupe, un détail diagnostique |
| Deltas affichés | Coût du voyage (fatigue, faim, usure, temps) |
| Arrivée | L'ancrage du POI de destination |

**Durée réelle : 20 à 40 secondes de lecture**, un écran, un clic.

**Répartition :**
- ~70 % des trajets : transition simple
- ~30 % des trajets : déclenchement d'un **storylet de route** (embuscade, rencontre, découverte) — ce n'est alors plus du trajet mais du contenu

**Usage narratif :** le texte de trajet est le meilleur emplacement pour la respiration entre les scènes — remarque d'un compagnon, tension dans le groupe, souvenir. C'est là que se construit l'attachement aux personnages, et c'est du contenu court donc peu coûteux.

### 8.6 Traversée sans engagement

Le joueur peut **traverser un POI sans en déclencher le contenu**. Cela rend le graphe de routes stratégique : la route courte passant par trois POI hostiles devient un pari face au détour long et coûteux.

| Type de contenu | Comportement |
|---|---|
| **Opt-in** — zone à explorer, campement à attaquer, ressources à récolter, PNJ à rencontrer | Le joueur choisit de s'arrêter ou de poursuivre |
| **Imposé** — embuscade, interception, événement qui fond sur le groupe | Inévitable |

**Deux règles obligatoires :**

1. **La traversée est informée.** Passer devant un POI déclenche toujours la lecture perceptive gratuite (§5.3) : présence d'un campement, taille approximative, gardes visibles. Le POI passe en état **Signalé**. Renoncer à l'aveugle n'est pas un choix.
2. **L'événement imposé n'est pas aléatoire.** Il résulte d'un test : discrétion et taille du groupe, terrain, moment de la journée, contrôle de faction, et **antécédent de repérage sur ce lieu**. Un groupe léger passe de nuit en forêt ; une troupe de cinq traverse la plaine à midi et se fait intercepter. Cela récompense la préparation au lieu de punir la malchance.

**Le renoncement doit être réel :** un POI ignoré peut avoir disparu au passage suivant si un jalon est tombé entre-temps — campement levé, compagnon reparti, ruine occupée. C'est un mécanisme d'**occasion manquée**, pas d'échec.

### 8.7 Épuisement partiel

| Couche | Après épuisement |
|---|---|
| **Storylets** | Consommés — plus rien, sauf jalon non encore déclenché |
| **Ressources** | Toujours disponibles, mais **rendement dégressif** à chaque passage |
| **Risque** | **Croissant** à chaque retour — la présence répétée finit par être remarquée |

C'est la troisième couche qui fait le travail anti-farm : revenir trois fois au même endroit devient statistiquement une mauvaise affaire. Aucun blocage artificiel n'est nécessaire.

**Niveau de sécurité du POI** — attribut distinct, qui crée un arbitrage permanent :

| Niveau | Risque | Rendement |
|---|---|---|
| **Sécurisé** (contrôle allié, lieu nettoyé, garnison) | Nul ou très faible | Faible |
| **Neutre** | Modéré, croissant | Dégressif |
| **Hostile** | Élevé, croissant vite | Meilleur |

La sécurité se paie en rendement. **Sécuriser un lieu devient un objectif de jeu qui a du sens.**

### 8.8 Modèle de pression

**Rejeté :** compte à rebours global, jauge de fatalité, menace qui monte au chronomètre. Cela punit l'exploration — précisément ce que le jeu veut récompenser — et transforme l'exploration en anxiété.

**Retenu : pression par coût d'opportunité, sur trois couches.**

| Couche | Nature | Mécanisme |
|---|---|---|
| **1. Économique** | Passive, invisible, moteur principal | Chaque trajet consomme ; chaque retour rapporte moins et risque plus. Le joueur arrête de farmer parce que **ça ne vaut plus le coup**, pas parce que c'est interdit |
| **2. Traction narrative** | Active, incitative | Des PNJ **tirent** le joueur : piste, zone prioritaire, compagnon à recruter avant son départ, rumeur d'équipement. Le joueur avance parce qu'il **veut** quelque chose |
| **3. Monde qui évolue** | Événementielle, **sur jalons, jamais sur chrono** | Un jalon atteint fait bouger le monde : contrôle de zone, PNJ disparu, route fermée ou ouverte. Crée des occasions manquées, pas des échecs |

> **Règle d'équilibrage critique — sans elle, la couche 1 ne fonctionne pas :**
> **Le bilan net en ressources doit être négatif sur les lieux épuisés et positif uniquement sur les lieux neufs.**
> Si un POI épuisé rapporte encore plus que ne coûte le trajet pour s'y rendre, le farm redevient optimal et toute la pression s'effondre. À re-tester après chaque ajustement de chiffres.

**Corollaire :** il faut un **puits à ressources permanent** (équipement, recrutement, soins, amélioration) pour qu'un joueur en surplus reste sous pression. Une ressource qui s'accumule sans usage est une pression morte.

### 8.9 Géographie fixe, monde variable

**La géographie ne change jamais d'un run à l'autre.** Une carte régénérée casserait le lore et rendrait inutile la connaissance du monde — ce que le jeu veut justement récompenser.

Ce qui **varie** d'un run à l'autre :

- le point de départ
- quels POI sont actifs et lesquels dorment
- quelle faction contrôle quoi
- quelles routes sont ouvertes (effondrement, patrouille, siège)
- le contenu attaché à chaque lieu (via les tags, §8.4)

Le joueur apprend la carte — acquis définitif — mais ne sait jamais dans quel état il va la trouver.

### 8.10 Volume cible

Estimation à valider en test, **pas une valeur arrêtée**.

**Budget d'un run de ~100 min :** ouverture ~8 min, 1 à 2 affrontements tactiques ~20 min, bilan ~2 min, soit ~70 min de boucle d'exploration. Un cycle POI complet (trajet + arrivée + 1-2 storylets + décisions) ≈ **7-8 min**.

| Repère | Valeur |
|---|---|
| POI **visités** par run | **9 à 13** (centre de gravité : 11) |
| POI **accessibles** par chapitre | **25 à 35** |

Le second chiffre est celui qui pilote le planning de contenu : c'est lui qui garantit que deux runs ne se ressemblent pas. Grâce au filtrage par tags (§8.4), 30 POI ne demandent pas 150 storylets mais 60-80 bien tagués.

---

### 8.11 Vocabulaire de tags — liste fermée

**Les tags sont invisibles pour le joueur.** Ce sont des mots-clés moteur servant au filtrage des storylets (§8.4), jamais du texte affiché. Les restrictions de vocabulaire de §8.12 ne s'appliquent donc **pas** aux tags.

| Axe | Nature | Tags |
|---|---|---|
| **Terrain** | statique | `forêt` `plaine` `colline` `montagne` `marais` `désert` `côte` `souterrain` |
| **Lieu** | statique | `village` `ferme` `ruine` `campement` `fort` `sanctuaire` `mine` `pont` `relais` `cimetière` |
| **Caractère** | statique | `isolé` `fréquenté` `abandonné` `fortifié` `sacré` `confiné` |
| **Ressource** | statique | `gibier` `bois` `minerai` `vivres` `eau` `forge` |
| **Contrôle** | dynamique | `couronne` `orques` `ordre` `marchands` `aucun` |
| **Danger** | dynamique | `danger:1` → `danger:5` |
| **Statut** | dynamique | `signalé` `exploré` `épuisé` `sécurisé` `repéré` |
| **Moment** | dynamique | `jour` `nuit` |
| **Unités** (axe porté par les créatures, pas par les lieux) | — | `diurne` `nocturne` `indifférent` |

**Deux règles de production :**

1. **Liste fermée.** Aucun tag créé à la volée. Sans cette règle, `forêt`, `boisé` et `sous-bois` coexisteront et le filtrage cassera silencieusement.
2. **Jamais un tag pour un seul storylet.** Si un tag ne sert qu'une fois, le contenu concerné est un jalon écrit à la main, pas du recombinable.

**Répartition cible des exigences de storylet** — plus un storylet exige de tags, moins il se rejoue :

| Tags exigés | Part visée |
|---|---|
| 1 tag | ~60 % |
| 2 tags | ~30 % |
| 3 et + | ~10 % |

> Principe : **écrire large, habiller précis.**

**Terrains dominants par territoire.** Chaque terrain ne croise ainsi que 1-2 factions au lieu de 4, ce qui réduit la combinatoire et donne à chaque territoire une identité visuelle immédiate.

| Territoire | Terrains |
|---|---|
| Couronne | `forêt` `plaine` `colline` |
| Terres Noires | `montagne` `souterrain` `marais` |
| Terres Scellées | `colline` `côte`, avec beaucoup de `confiné` et `sacré` |
| Terres Libres | `désert` `côte` `plaine` |

---

### 8.12 Nomenclature des lieux

#### Trois couches d'information — ne jamais les confondre

| Couche | Porte | Change ? |
|---|---|---|
| **Nom** | Le type de lieu et sa culture d'appartenance | Jamais |
| **Qualificatif** (ligne sous le nom) | Nature et état actuel | À chaque run |
| **Calques / icônes** | Données précises : danger, contrôle, ressources connues | En continu |

Format d'affichage : **`La Croix-Penchée`** — *carrefour · tenu par la Couronne*

> **Le nom ne porte jamais le danger.** Le danger est dynamique, le nom est statique : un nom qui annonce le danger mentira un run sur deux et détruira la confiance du joueur dans sa carte.

**Règle narrative :** le nom dit ce que le lieu **était**, le qualificatif dit ce qu'il est **devenu**. Un lieu qui change de mains garde son ancien nom — « La Chapelle Effondrée · tenue par les orques » raconte la guerre en quatre mots.

#### La formule

> **Nom = un mot de terrain concret + une cause visible.**

Le mot de terrain dit **où on est** (le joueur doit pouvoir se repérer). La cause dit **pourquoi ça s'appelle comme ça**, et doit être un élément **qu'on voit en arrivant** — pas une anecdote historique.

**Chaque POI porte sa raison en une ligne dans sa fiche.** Ce n'est pas de la documentation : c'est le matériau de l'ancrage de scène (§3.2), donc du contenu gratuit.

#### Les cinq tests

1. **Le nom dit-il le terrain ?** Sinon le joueur ne peut pas se repérer.
2. **La cause est-elle visible en arrivant ?** Une anecdote ancienne ne compte pas.
3. **Peut-on déplacer le nom dans un autre territoire sans que ça choque ?** Si oui, il est mauvais.
4. **Le nom révèle-t-il le danger actuel ?** Si oui, il est mauvais.
5. **Un joueur de 15 ans comprend-il chaque mot sans le chercher ?** Si non, il est mauvais.

#### Accessibilité du vocabulaire — règle transversale

> **L'immersion vient de l'image, jamais du vocabulaire.** Un mot rare est un péage à l'entrée ; il exclut sans rien ajouter.

Cette règle vaut **aussi pour les descriptions et les storylets**, pas seulement pour les noms.

| | |
|---|---|
| **Bannis** | gibet, combe, charbonnière, marche (territoire), layon, nef, cloître, bas-bois, et tout vocabulaire de vieux français |
| **Autorisés** | vallée, colline, forêt, bois, plaine, ravin, rivière, pont, chemin, carrefour, tour, mur, porte, puits, ferme, grange, camp, fort, temple, autel, mine, grotte, falaise |

**Registre religieux :** l'Ordre ne doit pas sonner chrétien-catholique. Sont proscrits *église, chapelle, cierge, messe, prêtre, saint, abbaye*. L'identité de l'Ordre passe par ses **marqueurs visuels** : la veille, le scellement, les portes closes, les statues, le feu entretenu, les serments — pas par un lexique religieux emprunté.

#### Varier le type de cause

Réutiliser le même type de cause produit de la monotonie (trop de lieux noyés, trop de lieux brûlés).

| Type de cause | Exemples |
|---|---|
| Construit par l'homme | statues, escalier, portail, mur, potence |
| Phénomène naturel visible | fissure, effondrement, affaissement |
| Trace d'activité | fumée, ossements, chaînes, marques, fours |
| Végétal / animal | arbre mort, oiseaux |
| Lumière / son | lanternes, cloches |
| Eau | **1 à 2 par territoire maximum** |

#### Deux rangs de lieux

> **Si tout est marquant, plus rien ne l'est.**

| Rang | Part | Traitement |
|---|---|---|
| **Signature** | ~30 % | Formule complète, cause visible forte, mémorable |
| **Ordinaire** | ~70 % | Noms fonctionnels et sobres (La Ferme du Haut, Le Puits Sec, Le Vieux Mur) — quelques secondes à produire |

Les ordinaires forment le fond neutre qui fait ressortir les signatures.

#### Registres par territoire

| Territoire | Source des noms | Sonorité |
|---|---|---|
| **Couronne** | Géographie + bâti + familles | Composés à trait d'union, simples |
| **Terres Noires** | **Exonymes humains** — les orques ne parlent aucune langue humaine, ces noms sont ceux que les hommes leur donnent | Mots courts, durs, descriptifs |
| **Terres Scellées** | Veille, scellement, statues, lumière | Sobre, solennelle, non religieuse |
| **Terres Libres** | Eau, marchandises, fondateurs | Pragmatique, concrète |

> Le registre des Terres Noires rend le **barrage de langue tangible sur la carte** : le joueur ne lit jamais que des noms inventés par les siens. Après le twist, la carte entière se relit autrement — pour un coût de production nul.

#### L'exclusivité passe par l'habillage, pas par le tag

Un même tag mécanique produit des lieux d'identités opposées selon le contrôle de faction. C'est ainsi qu'on obtient des lieux propres à chaque territoire **sans fragmenter le pool de storylets**.

| Tag | + Contrôle | → Rendu |
|---|---|---|
| `sanctuaire` | `ordre` | Les Sept-Veilleurs |
| `sanctuaire` | `orques` | Le Marécage aux Chaînes |
| `fort` | `couronne` | La Tour-Fendue |
| `fort` | `orques` | Le Camp aux Feux |

Créer un tag exclusif à une faction rendrait tous les storylets qui l'exigent injouables ailleurs. Réservé aux 2-3 **lieux uniques** par faction, écrits à la main.

---

### 8.13 Cycle jour / nuit

Système à **deux valeurs**, volontairement simple.

> **Règle d'équilibrage : risque équivalent, nature différente.**
> Le joueur ne doit jamais choisir « le moment le plus sûr », mais « le type de risque adapté à mon groupe et à mon objectif ».

| | Jour | Nuit |
|---|---|---|
| Discrétion | Mauvaise | Bonne |
| Perception (lecture des unités) | Bonne | Dégradée |
| Menaces | Patrouilles, contrôles, pillards, rivaux | Créatures nocturnes, rôdeurs, bandits |
| Opportunités | Marchands, PNJ, information, commerce | Infiltration, vol, approche de campement |

**Règles :**

1. Le cycle avance au **temps de jeu consommé** (trajets, actions longues), pas au tour.
2. Le joueur peut **attendre** le moment voulu — choix tactique réel, coûte vivres et temps.
3. `souterrain` ignore le cycle. `désert` l'inverse partiellement : le jour y est dangereux.
4. Les créatures portent un axe `diurne` / `nocturne` / `indifférent`, ce qui crée des **bestiaires partiellement disjoints** : un joueur qui ne voyage que de jour aura un bestiaire à trous, avec les conséquences que cela implique (§5).

#### Le moment ne bloque jamais — il colore

| Niveau | Part | Comportement |
|---|---|---|
| **Indifférent** | ~70 % | Se déclenche jour ou nuit ; variante de texte, même fonction, même récompense |
| **À variante** | ~25 % | Deux versions du même storylet — le patrouilleur devient rôdeur, l'approche change, mais le contenu existe dans les deux cas |
| **Conditionné** | ~5 % | Réservé aux lieux marquants |

> **Jamais de verrou silencieux.** Si un POI recèle un contenu conditionné par le moment, la lecture perceptive gratuite (§5.3) doit le signaler : lueurs sous une porte, traces fraîches absentes le matin, un garde qui évoque la relève. Le joueur repart en sachant qu'il doit revenir, et quand.

> **Aucun jalon narratif n'est conditionné par le moment de la journée.**

---

### 8.14 Déplacement terrestre uniquement

**Décision arrêtée : pas de navigation.** Ajouter le déplacement maritime reviendrait à construire un second système de carte (routes maritimes, conditions de mer, embarquements) — hors budget.

**La côte est un décor, pas un mode de déplacement :** falaises, salines, épaves échouées, ports vus depuis la terre ferme. Jamais d'embarquement.

---

### 8.15 Découpage territorial

#### Périmètre MVP

Le MVP sert à tester la **boucle** (trajet → POI → storylet → décision), pas à exposer la carte. Deux territoires suffisent : la Couronne comme base, la lisière des Terres Noires comme front. Les Terres Scellées et les Terres Libres n'apparaissent qu'au chapitre 1 complet.

**5 zones · 22 POI · 9 signature (★)**

**COURONNE**
→ **La Plaine de Garde** — `plaine` `colline`

| POI | Ce qu'on voit | Tags |
|---|---|---|
| **Val-de-Garde** ★ | Une tour de guet domine la vallée | `village` `fortifié` `forge` `vivres` |
| **La Croix-Penchée** ★ | Croix de pierre inclinée, à un carrefour | `relais` `fréquenté` |
| **La Rivière aux Cendres** ★ | Foyers noircis sur la berge — on y brûlait les bêtes malades | `pont` `eau` `isolé` |
| L'Auberge du Carrefour | Auberge de route, écurie, va-et-vient | `relais` `fréquenté` `vivres` |

→ **La Vieille Forêt** — `forêt` `colline`

| POI | Ce qu'on voit | Tags |
|---|---|---|
| **La Tour-Fendue** ★ | Tour ouverte du sommet à la base par une fissure | `ruine` `fortifié` `isolé` |
| **Le Chêne Creux** ★ | Un chêne assez large pour qu'on tienne debout à l'intérieur | `bois` `isolé` `fréquenté` |
| Le Chemin des Bûcherons | Chemin large, souches fraîches, traces de traîneaux | `bois` `fréquenté` |
| L'Autel Brisé | Autel de pierre fendu en deux sous un abri effondré | `sanctuaire` `sacré` `abandonné` |

**TERRES NOIRES**
→ **La Crête Brûlée** — `montagne` `colline` *(lisière)*

| POI | Ce qu'on voit | Tags |
|---|---|---|
| **Le Passage aux Os** ★ | Col jalonné d'ossements, humains et orques mêlés | `montagne` `isolé` `danger:4` |
| Le Camp aux Feux | Camp orque, feux visibles de loin, palissade de bois brut | `campement` `contrôle:orques` `danger:4` |
| Le Ravin Noir | Ravin encaissé, roche calcinée, aucun bruit | `montagne` `minerai` `danger:3` |
| Le Fort Brûlé | Ancien fort de la Couronne, incendié, encore debout | `fort` `abandonné` `danger:3` |

→ **Les Gueules-de-Pierre** — `montagne` `souterrain`

| POI | Ce qu'on voit | Tags |
|---|---|---|
| **Le Tas d'Armes** ★ | Monticule d'armes humaines empilées devant une entrée | `souterrain` `contrôle:orques` `danger:4` |
| Le Puits Sec | Puits taillé dans la roche, sans eau, qui descend plus bas qu'on ne voit | `souterrain` `confiné` `danger:3` |
| La Galerie Basse | Tunnel où il faut marcher courbé | `souterrain` `confiné` `danger:4` |
| La Salle aux Piliers | Caverne immense, soutenue par des piliers taillés | `souterrain` `minerai` `danger:4` |
| Le Chemin de Corde | Passerelle tendue au-dessus du vide | `montagne` `isolé` `danger:4` |

→ **La Vallée Fumante** — `montagne` `forge`

| POI | Ce qu'on voit | Tags |
|---|---|---|
| **Les Grandes Forges** ★ | Des feux qui brûlent de jour comme de nuit | `campement` `forge` `contrôle:orques` `danger:5` |
| **Le Pont de Fer** ★ | Pont fait de métal fondu et ressoudé | `pont` `contrôle:orques` `danger:4` |
| La Colline de Cendres | Versant entier fait de cendres accumulées | `colline` `isolé` `danger:3` |
| Les Fosses | Trous d'extraction, échelles de bois, paniers | `mine` `minerai` `contrôle:orques` `danger:4` |
| Le Camp Bas | Campement en fond de vallée, à l'abri du vent | `campement` `contrôle:orques` `danger:4` |

> **Indices posés à vue** — Le Tas d'Armes et Le Pont de Fer : un peuple qui empile les armes prises et qui coule du métal pour bâtir n'est pas une horde sauvage. Le joueur le voit, le lit comme de la barbarie, et se trompe.

**Écrits à la main** (hors système de tags) : Val-de-Garde (hub et ouverture), Le Camp aux Feux (première bascule tactique probable), Le Passage aux Os (seuil symbolique entre les deux mondes).

**Note :** le ratio signature du MVP est volontairement élevé (~41 % contre ~30 % visés). C'est la tranche qui doit convaincre ; le ratio se diluera avec l'ajout de POI ordinaires.

**Rééquilibrage acté.** La répartition initiale (10 POI Couronne / 4 Terres Noires) ne correspondait plus à l'arc du chapitre 1 révisé (§6.10), qui passe ~40 min dans les Terres Noires contre ~25 min de route en Couronne. Deux zones orques ont été ajoutées et deux POI Couronne supprimés (La Grange Brûlée, Les Fours à Charbon).

**Fonction narrative de la Couronne — ce n'est pas une zone d'exploration, c'est la phase de constitution.** Tomas sort de la razzia sans équipement, sans compagnon hors Mathias, avec peu de flèches. Les Terres Noires sont en `danger:3` à `danger:5` : y entrer non préparé, c'est mourir.

| Type de POI | Ce qu'il rend |
|---|---|
| Villages frappés | Témoignages, indices sur le comportement des orques |
| Fermes, réserves | Vivres, matériel |
| Postes, garnisons | Compagnons recrutables, réputation Couronne |
| Forges, marchands | Équipement |
| Routes, carrefours | Information — où va l'armée, qui a vu quoi |

**Lien mécanique :** la réputation et l'équipement au moment de rejoindre l'expédition déterminent **avec quelle unité et avec quoi** le joueur entre dans les Terres Noires. Rien ne l'oblige à explorer ; ne pas le faire se paie plus loin.

**Réemploi aux chapitres suivants — zéro POI supplémentaire à créer.** Le tag `contrôle` fait tout le travail :

| Chapitre | Ce qu'est la Couronne |
|---|---|
| 1 | Terre frappée — on s'y prépare, on y recrute |
| 2 | Base arrière de la campagne contre l'Ordre |
| 3 | **Terrain de chasse** — on y traque la cabale, chez soi, seul |

#### Stock validé hors MVP

| Territoire | Zones | POI orphelins (à rattacher) |
|---|---|---|
| **Terres Noires** | Les Gueules-de-Pierre · La Vallée Fumante · Le Marécage aux Chaînes | — |
| **Terres Scellées** | La Colline aux Lanternes | Le Temple Englouti *(lieu unique — marée)* · Les Sept-Veilleurs · La Porte-sans-Mur · L'Escalier-du-Vide |
| **Terres Libres** | — | Halte-des-Sables · Les Trois-Citernes · Le Marché-aux-Peaux · Puits-d'Orsane · Le Mur-des-Marques |

#### Lieu unique acté : Le Temple Englouti

Premier lieu à mécanique propre. Colonnes et toit dépassant de l'eau à marée haute ; accessible seulement à marée basse.

| | |
|---|---|
| Marée haute | Inaccessible — mais **visible**, donc jamais un verrou silencieux |
| Marée basse | Accessible, avec **compte à rebours de sortie** |
| Enjeu | Rester trop longtemps = piégé par la montée |

C'est le **seul chrono du jeu**, et il est acceptable parce qu'il est local, annoncé et diégétique.

#### Volume restant à produire

| Échéance | Manque |
|---|---|
| MVP | rien |
| Chapitre 1 complet | 1-3 zones Couronne, 10-20 POI ordinaires |
| Jeu entier | 2-3 zones Terres Scellées, 2-3 zones Terres Libres, ~40 POI ordinaires |

Le reste est majoritairement du rang **ordinaire**, produit en lot une fois les zones arrêtées.

---

## 9. Unités et factions

### 9.1 La grammaire C / B / A / S

Les quatre rangs forment une **grammaire commune aux quatre factions**. Le joueur apprend une fois à lire une composition, puis cette lecture fonctionne partout.

| Rang | Rôle | Fonction tactique |
|---|---|---|
| **C** | Piétaille | Nombreux, faibles, rapides. Saturent, harcèlent, font du nombre |
| **B** | Ligne | Résistants, lents. Tiennent une zone, bloquent l'accès |
| **A** | Spécialiste | Peu nombreux, fragiles, **changent les règles** de la rencontre |
| **S** | Chef | Aura qui renforce les autres. **Cible de décapitation** |

> **Règle absolue : aucune unité purement passive.** Une unité qui bloque sans menacer n'est pas un adversaire, c'est un minuteur — le joueur la contourne ou l'attend, et il s'ennuie. Toute unité de ligne doit avoir une capacité offensive crédible.

**Le rang S est la clé du design tactique.** L'abattre affaiblit la composition entière, ce qui crée l'arbitrage central de chaque combat : forcer le passage vers le chef à travers la ligne B, ou nettoyer méthodiquement. Cela branche directement sur le système de connaissance (§5) : **reconnaître** un chef avant qu'il n'agisse devient une compétence acquise.

### 9.2 Traits — au lieu de rangs intermédiaires

Des rangs intermédiaires (C+, B+…) doubleraient le roster : 8 catégories × 4 factions = 32 designs au lieu de 16. C'est le piège de fausse diversité identifié en §5.1, et l'échelle de puissance existe déjà via les niveaux.

**Solution : des traits qui se posent sur une unité existante.**

| Trait | Effet | Se pose sur |
|---|---|---|
| **Meneur** | Aura réduite, portée à quelques unités proches | Un B ou un A |
| **Vétéran** | Meilleures stats, réactions plus fines | N'importe quel rang |
| **Nommé** | Unité unique, avec un nom propre | Rare — lieux marquants et jalons |

Un « B+ » s'écrit donc *Cogneur vétéran, Meneur*. On obtient la hiérarchie à plusieurs étages — abattre un Meneur casse un bloc de la ligne avant même de toucher au chef — **sans une seule fiche supplémentaire**. Le joueur apprend à repérer les traits, ce qui enrichit le système de connaissance au lieu de le diluer.

### 9.3 Les quatre factions

#### Orques — Terres Noires

| Rang | Unité | Ce que le joueur voit |
|---|---|---|
| **C** | Rôdeur | Léger, rapide, arme improvisée |
| **B** | Cogneur | Massue à deux mains, armure de plaques récupérées. Frappe lente et **annoncée un tour à l'avance**, mais qui écarte et sonne |
| **A** | **Porteur de totem** | Un mât lourd et ferré : il le plante pour renforcer les siens, et s'en sert comme arme d'allonge |
| **S** | Chef de guerre | Le plus grand, ornements pris sur des morts |

Le Cogneur tient la ligne **par la peur, pas par les points de vie** : sa frappe est esquivable puisqu'annoncée, mais elle fait mal. Le joueur doit gérer sa position, pas seulement frapper.

> **Indice de twist posé à vue — Porteur de totem.**
> Mécaniquement, c'est un buff de zone classique : le joueur apprend vite à le tuer en priorité. Mais quand le totem tombe, les orques ne fuient pas et ne se débandent pas : ils **s'arrêtent**. Une seconde, désorientés, comme si on avait coupé un fil.
> Le joueur note l'anomalie dès le chapitre 1 sans pouvoir l'interpréter. Après le twist, il comprend qu'il voyait se rompre le relais du sortilège — et qu'à chaque totem abattu, il libérait brièvement des esclaves.

#### Couronne

| Rang | Unité | Fonction |
|---|---|---|
| **C** | Recrue | Levée récente, lance, mal équipée |
| **B** | Homme d'armes | Cotte de mailles, épée longue, tient la ligne |
| **A** | Arbalétrier | **Perce l'armure** — le contre naturel des rangs B |
| **S** | Capitaine | Réorganise la ligne, aura de discipline |

#### Ordre — Terres Scellées

| Rang | Unité | Fonction |
|---|---|---|
| **C** | Veilleur | Lance et lanterne, discipline |
| **B** | Gardien | Bouclier haut, masse, armure lourde |
| **A** | **Porte-Feu** | Projette du feu — **interdit une zone entière** |
| **S** | **Maître Veilleur** | **Scelle** une unité sur place : elle ne peut plus bouger |

> **Fausse piste structurante — le scellement.**
> Le joueur voit de ses yeux l'Ordre immobiliser des êtres par un pouvoir. Quand le chapitre 1 se conclut sur une piste qui remonte vers eux, il y croit sans effort : il a passé des heures à les voir faire exactement cela.
> La tromperie est mécaniquement honnête : un Maître Veilleur scelle **une** unité, **un** tour, **en la voyant**. Le sortilège qui asservit un peuple entier à distance est d'un autre ordre. La ressemblance est superficielle — mais il faut atteindre le chapitre 3 pour le comprendre.

#### Marchands — Terres Libres

Leur identité tactique découle de ce qu'ils sont : pas l'entraînement d'une armée, mais **l'argent**. Donc le meilleur matériel, et des combattants venus d'ailleurs.

| Rang | Unité | Fonction |
|---|---|---|
| **C** | Convoyeur | Armé correctement, se bat à couvert derrière les chariots |
| **B** | Mercenaire | Professionnel, bien payé, bien équipé |
| **A** | **Lame étrangère** | Combattant venu de loin, **style de combat absent du bestiaire** |
| **S** | **Maître de caravane** | Le meilleur équipement du jeu, garde personnelle, paie des renforts en plein combat |

La Lame étrangère est le morceau le plus intéressant : les marchands voyagent, donc recrutent partout. Le joueur affronte quelque chose qu'il ne sait pas lire, **même tard dans la partie** — une aura de danger réelle sans en faire une armée.

> **Règle : la négociation n'est pas une capacité d'unité.**
> La paix s'achète **en amont, dans le storylet**. Une fois le combat engagé, les marchands se battent pour de bon. Mettre « acheter la fin du combat » dans la fiche du S en ferait un mauvais combattant et décrédibiliserait toute la faction.

**Drapeau de relation par POI marchand** — pas un second système de réputation, un simple flag à trois états :

| État | Obtention | Effet |
|---|---|---|
| *Aucun lien* | défaut | — |
| *Client* | avoir commercé | meilleurs prix, information |
| *Obligé* | avoir aidé dans un storylet | **interviennent si le joueur est attaqué à proximité** |

Cela crée des **îlots de répit gagnés, pas donnés**, dans des zones qui restent dangereuses (créatures, bandits). Attaquer des marchands fait tomber le drapeau à zéro **et** la réputation globale : la voie « pillard » reste ouverte, avec un prix clair.

### 9.4 Créatures — système distinct

Les créatures ne suivent **pas** la grille C/B/A/S : un loup n'a ni spécialiste ni chef. Elles relèvent de trois archétypes, chacun avec son contre tactique.

| Archétype | Ce que c'est | Comment on s'en sort |
|---|---|---|
| **Essaim** | Beaucoup de minuscules, réserve de points de vie commune. Ignore les lignes, passe partout | Attaques de zone, feu, terrain dégagé |
| **Meute** | 3 à 6 unités coordonnées, encerclent, harcèlent les flancs | Tenir un passage étroit, abattre le dominant |
| **Solitaire** | Une seule, énorme, attaques de zone **annoncées** | Exploiter les fenêtres entre les frappes |

**Hiérarchie de puissance**, indépendante de l'archétype :

| Palier | Statut |
|---|---|
| **1 — Commune** | Fond de bestiaire, rencontre ordinaire |
| **2 — Redoutée** | Rencontre marquante, risque réel |
| **3 — Légendaire** | Unique, nommée, liée à un lieu — candidate au contenu écrit à la main |

**Conditions d'apparition** portées par les tags déjà figés (§8.11) : territoire, terrain, `diurne` / `nocturne`, et parfois un état de monde (après un jalon, sur un POI épuisé, en période de disette).

> Effet sur le système de connaissance : un joueur qui ne voyage que de jour ignore tout du bestiaire nocturne. Surpris dehors à la nuit tombée, il affronte des créatures entièrement en état *Inconnu*.

### 9.5 Coût de menace et composition des rencontres

Chaque unité porte un **coût de menace**, qui sert à composer les rencontres dans un budget.

| | Niveau 1 | Niveau 2 | Niveau 3 |
|---|---|---|---|
| **C** | 1 | 1,5 | 2 |
| **B** | 2 | 3 | 4 |
| **A** | 4 | 5,5 | 7 |
| **S** | 7 | 9 | 12 |

**Les bandes se chevauchent volontairement** : le haut d'une catégorie vaut le bas de la suivante (C3 ≈ B1, B3 ≈ A1, A3 ≈ S1).

> **Chevauchement ≠ interchangeabilité.** En duel, un B1 bat presque toujours un C3 (plus de PV, plus d'armure). Le C3 l'emporte autrement : par le nombre, la vitesse, les flancs. C'est ce qui empêche la catégorie de redevenir une simple échelle verticale.

**Le tag `danger:N` est un budget de menace** — ordre de grandeur à calibrer : `danger:1` ≈ 4 points, `danger:3` ≈ 12, `danger:5` ≈ 25. L'implémenteur compose librement dans ce budget.

**Deux règles de composition :**

1. **Le niveau ne change jamais le rôle.** Il amplifie ce que le rôle fait déjà bien, plus un peu de survie. Un C3 frappe plus fort et va plus vite, il reste fragile. Un B3 encaisse bien plus, il reste lent.
2. **Jamais de rencontre mono-catégorie.** Cinq C, c'est un seul problème répété. 3 C + 1 B + 1 A, c'est une situation à lire.

---

## 10. Progression du héros

### 10.1 Rééchelonnement — décision de rupture

> **Le système à 100 niveaux est un vestige de l'ancien format** (campagne de 40-50 h) et **ne s'applique plus**.

Ancien système, pour mémoire : 1 à 100, une compétence tous les 5 niveaux (20 au total), compétences neutres jusqu'à 50, spécialisation obtenue auprès de l'Ordre selon réputation au niveau 50, puis compétences spécialisées jusqu'à 100.

Incompatible avec des runs de 1h30-2h à reset de puissance : le joueur finirait un run vers le niveau 6, et 94 niveaux n'existeraient jamais.

### 10.2 Échelle retenue

| | Plage de niveaux | Compétences |
|---|---|---|
| **Chapitre 1** | 1 → 10 | neutres |
| **Chapitre 2** | départ ~9 → 20 | neutres |
| **Chapitre 3** | départ ~19 → 30 | **spécialisées** |

**Une compétence tous les 2 niveaux → 15 compétences** (contre 20 dans l'ancien système).

Les niveaux de départ de chapitre sont ceux du **package de départ** (§2.5), pas le niveau atteint lors du run précédent.

### 10.3 Spécialisation

**Déclencheur : le twist 2**, pas un palier de niveau ni la réputation auprès de l'Ordre. C'est l'application directe du principe « le twist débloque du gameplay » (§13).

Trois voies, exclusives, choix définitif, **capacités actives** — pas des bonus passifs :

- **Combat**
- **Pièges**
- **Magie**

> **Plafond de coût :** le coût d'une spécialisation n'est pas l'écriture des compétences (c'est de la mécanique), mais les **options de storylet** qui lui sont propres — sans elles, la spécialisation est cosmétique. **Plafond : ~5 options narratives exclusives par spécialisation.**

L'arbre détaillé relève du contenu de chapitre 3 et n'est pas à produire avant le MVP.

### 10.4 Magie

La magie est d'abord **quelque chose qu'on subit**, jamais quelque chose qu'on fait : le scellement de l'Ordre, le sortilège de la cabale.

> **Rupture — 16/09/2026.** Elle devenait accessible au twist 2. Elle arrive désormais au **chapitre 2**, au moment où le joueur affronte l'Ordre : il obtient son pouvoir **en le prenant à ceux qu'il accuse**, et il ne saura qu'au chapitre 3 qu'ils étaient innocents.

**Ce que le twist 2 débloque à la place :** non plus la magie en général, mais **son seul usage qui compte** — *briser l'emprise*, rendre un orque à lui-même en plein combat. Une capacité qui n'a aucun sens avant qu'on sache ce qu'est l'emprise. Le principe « le twist débloque du gameplay » est donc préservé, et renforcé.

**Périmètre volontairement étroit** — 3 à 4 effets, branchés sur des systèmes existants :

| Effet | Chapitre | Branche sur |
|---|---|---|
| **Révéler** | 2 | Système de connaissance — expose une unité cachée, passe une créature en état *exact* |
| **Affermir** | 2 | La matière — une arme mord plus, une armure tient un coup de plus, une pièce cassée dure un tour |
| **Lier** | 2 | Deux alliés agissent comme un seul |
| **Briser l'emprise** | **3, au twist 2** | Un orque s'arrête en plein combat, se retourne, cesse d'être un ennemi |

**Les trois usages du chapitre 2 sont portés par les trois frères** — un chacun, calqué sur leur rôle. Tout autre compagnon peut les apprendre, mais à un coût.

> **Contrainte d'écriture rétroactive :** les chapitres 1 et 2 ne doivent **jamais** affirmer que la magie est impossible pour le joueur. Inaccessible, inexpliquée, inquiétante — mais jamais niée. À respecter dès la première ligne écrite, sous peine de contradiction au chapitre 3.

---

## 11. Bilan de fin de run

Déjà prévu au brief v3 (statistiques détaillées + badges à seuils). **À vérifier en test : le problème est l'exécution, pas la conception.**

**Trois fonctions :**

1. **Récapitulatif chiffré** — unités tuées par catégorie, distance parcourue, zones explorées, ressources consommées, choix majeurs, badges déclenchés par seuils statistiques.
2. **Paragraphe narratif** — une relecture de la partie qui replace les choix dans le fil général. **C'est ici qu'on peut glisser un fragment de révélation.** Le bilan est un vecteur de récit, pas seulement un tableau.
3. **Actif marketing** — c'est le meilleur levier de bouche-à-oreille gratuit du jeu. Un écran de bilan conçu pour donner envie d'être partagé en capture d'écran vaut cher quand le budget d'acquisition est nul.

---

## 12. Modes de difficulté

Deux modes, un simple drapeau — **pas de contenu en double**.

| Mode | Comportement |
|---|---|
| **Mode Récit** | Checkpoints de chapitre, morts moins punitives. Pour ceux qui viennent pour l'histoire. |
| **Mode Voilé** | Run intègre, permadeath réelle, aucun filet. |

Le mode dur est un **argument de fierté et de communauté** — utile au bouche-à-oreille.

---

## 13. L'après-twist : là où se joue la rejouabilité

**Alerte structurelle assumée :** 3 chapitres + jalons finis + checkpoints font glisser le jeu vers la campagne, avec son risque économique (écrire longtemps pour une soirée de jeu).

**La réponse est l'après-twist final, qui doit être riche.**

Le twist ne doit **pas clore l'histoire** : il doit **débloquer du gameplay**. La révélation est une **nouvelle règle du monde**.

| | Avant révélation | Après révélation |
|---|---|---|
| Les orques | Ennemis, point | Asservis — libérables, négociables, épargnables, potentiellement recrutables |
| Les nobles | Égoïstes et mesquins | Cibles d'enquête ; certains complices |
| Les routes | Affronter | Affronter, briser l'emprise, retourner, s'allier |

**Le joueur rejoue non pas malgré le twist, mais à cause de lui** : il veut rejouer le monde avec sa nouvelle lecture.

**Conséquence de production :** le contenu post-révélation n'est pas un épilogue. C'est une part substantielle du jeu, à budgéter comme telle.

---

## 14. Checklist de conformité

Toute nouvelle scène, tout nouveau contenu doit passer ces tests :

**Storylets**
- [ ] L'ANCRAGE existe, fait 3-5 lignes, et reste consultable
- [ ] Aucun choix ne quitte la scène sans passer par une SORTIE explicite
- [ ] Chaque choix a une **conséquence narrée** de 2-4 phrases
- [ ] La conséquence décrit l'action **et** la réaction du monde
- [ ] Trois paliers de résultat sur les scènes majeures et les jalons ; deux issues distinctes minimum ailleurs
- [ ] Le nombre de beats respecte les bornes du type de rencontre
- [ ] Le champ `pool` est renseigné (recombinable / jalon)

**Information**
- [ ] Toute unité *Inconnu* livre une lecture perceptive gratuite
- [ ] Les coûts sont visibles, les résultats ne le sont pas (mode narratif)
- [ ] Tout est visible en mode tactique

**Persistance**
- [ ] Rien qui augmente la puissance ne persiste entre les runs
- [ ] Aucun jalon narratif ne peut se déclencher deux fois
- [ ] Aucune mécanique ne permet d'annuler une perte en mourant volontairement

**Écriture**
- [ ] Ton simple et accessible
- [ ] Chaque détail est diagnostique, aucun n'est décoratif

---

## 15. Questions ouvertes — ne pas trancher sans arbitrage

1. **Calibrage chiffré** — PV, dégâts, courbes de niveau, coûts de fatigue et de faim, rythme de la soif, seuils de badges. Aucune valeur n'est arrêtée.
2. **Nombre de zones et de POI par chapitre** — l'estimation de §8.10 (25-35 POI accessibles) est provisoire et doit être validée en test.
3. **Calibrage du budget `danger:N`** (§9.5) — les ordres de grandeur proposés sont provisoires.
4. **Volume cible de storylets** par pool et par zone.
5. **Contenu du package de départ** de chaque chapitre (niveau de base, équipement de palier, liste des compagnons proposables).
6. **Densité et nature du contenu post-révélation** (§10).
7. **Ergonomie et rendu de la carte** — la structure de données est arrêtée (§8), mais l'affichage, le dépliage, les calques et la lisibilité des états restent à spécifier.
8. **Lieux uniques** — la liste des 2-3 lieux par faction portant une mécanique propre. Le Temple Englouti est le premier acté (§8.15) ; les autres restent à définir.
9. **Calibrage des coûts de trajet et des courbes de rendement dégressif** (§8.7, §8.8).
10. **Portage mobile** — non traité dans cette spec.

---

## 16. Journal des décisions

| Date | Décision |
|---|---|
| 14/09/2026 | Modèle économique : achat unique Steam 8-15 €, pas de F2P / cosmétiques / loot boxes |
| 14/09/2026 | Zéro appel API au runtime — tout le texte pré-écrit |
| 14/09/2026 | Mode tactique : zones nommées discrètes, pas de grille libre |
| 14/09/2026 | Incertitude par ignorance (déterministe + information imparfaite), pas par aléatoire |
| 14/09/2026 | Bestiaire persistant entre les runs ; puissance non persistante |
| 14/09/2026 | Réputation = variable de run, non persistante |
| 14/09/2026 | Déblocage de chapitre = package de départ défini, jamais restauration d'état |
| 14/09/2026 | Deux modes de difficulté (Récit / Voilé) |
| 14/09/2026 | L'après-twist porte la rejouabilité — le twist débloque du gameplay |
| 15/09/2026 | Carte = hiérarchie (3 niveaux max) + graphe de routes indépendant |
| 15/09/2026 | Cartographie des routes = attribut de zone (cartographié / partiel / vierge) |
| 15/09/2026 | Le POI est un contexte à tags, pas un contenu — storylets découplés des lieux |
| 15/09/2026 | Trajets = temps fictionnel, 20-40 s de lecture, jamais d'attente réelle |
| 15/09/2026 | Traversée d'un POI possible et informée ; événement imposé déterminé par test, pas par hasard |
| 15/09/2026 | Épuisement partiel : storylets consommés, ressources dégressives, risque croissant |
| 15/09/2026 | Pression par coût d'opportunité (économique + traction PNJ + monde sur jalons), jamais par chronomètre |
| 15/09/2026 | Géographie fixe entre les runs ; seul l'état du monde varie |
| 15/09/2026 | Vocabulaire de tags figé en liste fermée (§8.11) |
| 15/09/2026 | Nomenclature : nom = terrain concret + cause visible ; cinq tests ; deux rangs (signature / ordinaire) |
| 15/09/2026 | Accessibilité du vocabulaire : l'immersion vient de l'image, pas des mots rares — vaut aussi pour les storylets |
| 15/09/2026 | L'Ordre n'emploie aucun lexique chrétien ; son identité passe par ses marqueurs visuels |
| 15/09/2026 | Cycle jour/nuit à deux valeurs, risque équivalent de nature différente ; jamais de verrou silencieux |
| 15/09/2026 | Déplacement terrestre uniquement — la côte est un décor |
| 15/09/2026 | Périmètre MVP arrêté : 3 zones, 14 POI (Couronne + lisière des Terres Noires) |
| 15/09/2026 | Le Temple Englouti acté comme premier lieu unique (mécanique de marée, seul chrono du jeu) |
| 15/09/2026 | Grammaire C/B/A/S commune aux 4 factions ; aucune unité purement passive |
| 15/09/2026 | Traits (Meneur / Vétéran / Nommé) au lieu de rangs intermédiaires C+/B+/A+/S+ |
| 15/09/2026 | Rosters des 4 factions figés ; totem orque et scellement de l'Ordre servent les deux twists |
| 15/09/2026 | Marchands : négociation dans le storylet, jamais dans la fiche d'unité ; drapeau de relation par POI |
| 15/09/2026 | Créatures hors grille C/B/A/S : 3 archétypes (essaim / meute / solitaire) × 3 paliers |
| 15/09/2026 | Coût de menace par unité, bandes chevauchantes ; `danger:N` devient un budget |
| 15/09/2026 | **Rupture** : abandon de l'échelle 1-100 (vestige du format campagne) pour 1-30 sur 3 chapitres |
| 15/09/2026 | Spécialisation déclenchée par le twist 2 (et non par le niveau 50 ou la réputation Ordre) |
| 15/09/2026 | Magie accessible au joueur seulement après le twist 2 ; périmètre limité à 3-4 effets |
| 15/09/2026 | Règle centrale : le joueur n'est jamais spectateur — 2 à 4 beats par objectif, jamais un choix unique |
| 15/09/2026 | États d'échec différenciés : capture chez les humains, laissé pour mort chez les orques |
| 15/09/2026 | Ouverture en 5 beats, deux versions (longue au 1er run, courte ensuite) |
| 15/09/2026 | **Rupture** : razzia éclair au lieu d'occupation ; camp de fuyards et reprise de Val-de-Garde supprimés |
| 15/09/2026 | Mathieu mortel dès le départ ; message de permadeath hors fiction, non modal, une seule fois |
| 15/09/2026 | Nom du héros fixe (pas de personnalisation) |
| 15/09/2026 | Noms arrêtés : Tomas, Mathias, Jonas — registre moderne assumé |
| 15/09/2026 | Carte MVP rééquilibrée : 5 zones, 22 POI, Terres Noires étoffées à 14 POI |
| 15/09/2026 | La Couronne est la phase de constitution, pas une zone d'exploration ; réemployée aux ch. 2 et 3 via le tag `contrôle` |
| 15/09/2026 | Le Chêne Creux remplace La Potence Neuve (Vieille Forêt) |
| 15/09/2026 | **Rupture** : abandon de la règle des 5 unités fixes — le tactique se déverrouille à 3 unités |
| 15/09/2026 | Bascule tactique conditionnée à deux critères : équipe commandable ET enjeu suffisant |
| 15/09/2026 | Aucune grille, même visuelle — zones nommées affichées côte à côte |
| 15/09/2026 | Points de commandement : ordres permanents gratuits, improvisation payante ; 2-3 paliers d'augmentation max dans l'arbre |
| 15/09/2026 | Unités temporaires autonomes, redressables à 1 point, ordres simples ; comptent pour le seuil de 3 |
| 15/09/2026 | État *hors de combat* à seuil de dégâts, pour les unités protégées par le récit et pour le Mode Récit |
| 15/09/2026 | Aucun scaling dynamique — le danger appartient au lieu, la progression ouvre l'accès |
| 16/09/2026 | **Rupture** : magie avancée au chapitre 2, portée par les trois frères ; le twist 2 débloque *briser l'emprise* |
| 16/09/2026 | La mort d'un compagnon persiste sur toute la partie, pas seulement sur le run |
| 16/09/2026 | Règle du contre : toute attaque ennemie doit avoir un moyen de l'empêcher, et toute attaque lourde une annonce |
| 16/09/2026 | Le rythme appartient au joueur — les durées budgètent le contenu, ne contraignent jamais la partie |
| 16/09/2026 | Bestiaire à trois couches ; notoriété connue / racontée / inconnue selon la distance |
| 16/09/2026 | Équipe de 5 unités : Tomas + 4 compagnons. Roster illimité à la base |
| 16/09/2026 | Val-de-Garde devient la base — le village survit à la razzia |
| 16/09/2026 | Niveau des compagnons dérivé du héros ; leurs compétences se débloquent par le temps passé dans l'équipe |
| 16/09/2026 | Aucun soigneur dans le groupe — les soins restent une ressource consommable |
| 21/09/2026 | Résolution hors combat : tirage informé, garde-fou « l'aléatoire coûte, il ne tue jamais ». Le combat reste déterministe |
| 21/09/2026 | Trois paliers obligatoires sur les scènes majeures et les jalons seulement ; deux issues distinctes ailleurs |
| 21/09/2026 | La soif n'est pas une jauge : l'eau est un objet, la soif un état (modèle v3) |
| 21/09/2026 | Épargner ne coûte jamais d'expérience : XP par unité mise hors de combat, pas par unité tuée |
