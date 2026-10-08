# Les Terres Voilées — Bestiaire

**Version :** 1.1
**Statut :** source de vérité — créatures
**Dernière mise à jour :** 21 septembre 2026

> Compagnon de `SPEC_DESIGN` (systèmes), `SPEC_MONDE` (récit), `SPEC_COMPAGNONS`, `SPEC_ECRANS`, `SPEC_EQUILIBRAGE`.
> **Les chiffres de ce fichier sont repris dans `SPEC_EQUILIBRAGE`, qui fait foi entre les specs. Au-dessus de tout, le code fait foi (`content/CONTRAT.md`, préséance).**

**Les six :** Les Rabatteurs · La Nuée Noire · Le Gris · Le Fossoyeur · Le Fléau · L'Enclume

---

## 0. Le bestiaire — trois couches

Système allégé. **La rareté ne pèse sur rien d'autre que le bestiaire** : pas de quête, pas de système d'état, pas de place dans le récit. Elle sert à une seule chose — **faire peur et donner envie** à propos de bêtes qu'on ne peut pas encore aller voir.

| Couche | Quand elle s'ouvre | Contenu |
|---|---|---|
| **Ce qu'on raconte** | **Avant toute rencontre**, si la bête est connue ou légendaire | Texte seul. Aucune statistique, aucun visuel |
| **Ce qu'on a vu** | **À la première rencontre** | Le visuel, et la description de ce qu'on a observé |
| **Ce qu'on sait** | **Au premier combat** | Les statistiques exactes |

> Le visuel n'apparaît qu'à la rencontre — donc rien ne bloque tant qu'il n'est pas produit. L'entrée reste lisible sans lui.

**Trois états de connaissance seulement :**

| État | Ce que ça veut dire |
|---|---|
| **Connue** | Le héros ou les gens d'ici savent ce que c'est. La couche « ce qu'on raconte » est exacte |
| **Racontée** | On en parle sans l'avoir vue. La couche existe, mais elle exagère ou se trompe |
| **Inconnue** | Rien. Entrée vide jusqu'à la rencontre |

**La règle de distance suffit à tout régler :** connue en Couronne, racontée dans les Terres Libres, inconnue dans les Terres Noires.

### À quoi sert vraiment « Racontée »

Un PNJ raconte une bête **des terres lointaines**, que le joueur ne peut pas atteindre au chapitre 1. L'entrée s'ouvre dans le bestiaire : un nom, une histoire, pas un chiffre. **Elle reste là, vide et inquiétante, pendant des heures.**

C'est tout. Aucune mécanique accrochée dessus. Le joueur y pense, et c'est suffisant.

> **Garde-fou :** quand une histoire se trompe, elle se trompe toujours dans un sens qui coûte des **ressources**, jamais la vie.

---

## 0 bis. La règle du contre

> **Toute attaque ennemie doit avoir au moins un moyen de l'empêcher — connu, ou apprenable à la première rencontre.**

Sans cette règle, le joueur cesse de jouer : il encaisse et limite les dégâts. Un jeu tactique se reconnaît à ce que **chaque coup reçu est un coup qu'on aurait pu éviter**.

**Trois formes de contre.** Une attaque doit en avoir au moins une :

| Forme | Exemple |
|---|---|
| **Préventif** | Un ordre permanent, une position, le silence — l'attaque n'arrive jamais |
| **Réactif** | Une dépense de points de commandement, une capacité — l'attaque arrive, on l'annule |
| **Structurel** | Le risque a été choisi en amont : approche, composition, itinéraire |

**Corollaire — toute attaque lourde doit avoir une annonce.** Un tell, un tour à l'avance : la tête qui descend, la ligne qui se forme, le sol qui remue. Sans annonce, il n'y a pas de contre possible, donc pas de décision.

### Audit des six

| Créature | Attaque lourde | Annonce | Contre |
|---|---|---|---|
| Les Rabatteurs | Fauchage | La zone d'où rien ne vient | Tenir sa position, frapper les embusqués |
| La Nuée Noire | Enveloppement | Le bourdonnement, bien avant | Le feu, sortir de la zone |
| Le Gris | Charge | La tête qui descend | Quitter la zone, frapper de flanc |
| **Le Fossoyeur** | **Émergence** | **manquait — corrigé §4** | Le silence, l'appât, le déplacement |
| Le Fléau | Charge en ligne | La ligne qui se forme, la poussière | Le terrain accidenté |
| L'Enclume | Charge, Barrage | La tête qui descend | Ne pas entrer, ou payer la sortie |

---

## 1. Les Rabatteurs

> *Nom de chasse.* Un rabatteur pousse le gibier vers les tireurs. Quand des chasseurs ont compris ce que ces bêtes faisaient, ils leur ont donné le nom de leur propre métier.

| | |
|---|---|
| Archétype | **Meute** · Palier 1 |
| Terrains | `forêt` `colline` · `nocturne` |
| Notoriété | **Connue** en Couronne |

### Aspect

Hauts sur pattes, secs, la silhouette bien plus longue que celle d'un loup. Le pelage est court, gris-brun marbré de taches sombres qui les défont complètement dans les fourrés — on ne voit jamais une bête entière, seulement un morceau qui bouge.

La tête est étroite, les oreilles longues et mobiles, tournées indépendamment l'une de l'autre. Les pattes arrière sont plus hautes que les avant, ce qui leur donne une démarche penchée, comme s'ils étaient toujours sur le point de partir.

Ceux qui attendent sont plus lourds, plus courts sur pattes. Ils ne courent pas. Ils n'en ont pas besoin.

### Lecture perceptive

*Quelque chose bouge dans les fourrés, à votre gauche. Puis derrière. Jamais devant. Vous n'en voyez jamais deux en même temps.*

> **Élément non naturel :** ils ne font aucun bruit en chassant. Pas un souffle, pas une patte sur les feuilles mortes.

### Chiffres

| Unité | PV | Dég | Arm | Vit | Nombre |
|---|---|---|---|---|---|
| Batteur | 12 | 4 | 0 | 4 | 3 à 5 |
| Embusqué | 18 | 6 | 0 | 3 | 1 à 2 |

### Comportement — **ils ne cherchent pas à vous tuer, ils cherchent à vous déplacer**

C'est leur particularité, et elle vient du nom.

La meute se coupe en deux. Les **batteurs** harcèlent depuis les zones adjacentes : ils mordent, reculent, mordent encore, et **poussent** le groupe vers une zone précise. Ils ne s'engagent jamais vraiment.

Dans cette zone, les **embusqués** attendent. Immobiles. Toute unité poussée jusqu'à eux prend une attaque coordonnée, à pleine puissance.

Un joueur qui subit la pression sans comprendre se fait conduire exactement là où il ne faut pas aller.

**Se dispersent** si les embusqués tombent, ou si plus de la moitié de la meute est à terre : ils cessent d'être une meute.

### Attaques

| Attaque | Effet |
|---|---|
| **Morsure au jarret** *(batteur)* | Dégâts faibles, **−1 vitesse** un tour |
| **Poussée** *(batteur)* | Pas de dégâts. La cible est **repoussée** vers la zone choisie par la meute |
| **Repli** *(batteur)* | Après avoir frappé, il se replace hors de portée. Impossible de le fixer |
| **Fauchage** *(embusqué)* | Contre une unité **fraîchement repoussée** dans sa zone : dégâts doublés, cible **à terre** |
| **Silence** *(passif)* | Leurs déplacements ne déclenchent aucune réaction, aucune alerte |

### En mode narratif — leur première rencontre

**Problème :** la poussée a besoin de zones, qui n'existent qu'en tactique. Or Tomas n'a que Mathias au début du chapitre 1 : **leur première rencontre sera narrative.**

**Solution : les mêmes règles, exprimées en directions plutôt qu'en zones.** Aucune adaptation du comportement — seulement de sa forme.

**État de scène :** `directions_ouvertes` *(4 au départ)* · `pression` · `position_tenue`

| Beat | Texte | Choix |
|---|---|---|
| **1** | Quelque chose bouge à gauche. Puis derrière. **Une direction se ferme** | Reculer dans la direction libre · **Tenir** (coût : morsures) · Forcer vers le bruit |
| **2** | Une deuxième se ferme. Il n'en reste qu'une, et personne ne vient de ce côté | Les mêmes trois |
| **3** | S'il a cédé deux fois : **il est arrivé où on l'attendait.** Fauchage, pleine puissance | — |

**La règle d'écriture, valable pour tous les beats :**

> **La direction d'où rien ne vient est la direction où l'on vous attend.**

Elle est déjà dans la lecture perceptive — *« à votre gauche. Puis derrière. Jamais devant. »* Il faut qu'elle soit répétée dans le texte de chaque beat, sans jamais être expliquée.

**Cohérence avec le tactique :** céder = se laisser repousser · tenir = refuser le déplacement · forcer = frapper les batteurs. Ce sont exactement les trois mêmes options, dans les deux modes. Le joueur qui a compris la meute en narratif la comprend en tactique, et l'inverse.

**L'observation détaillée** (§5.3) révèle où sont les embusqués, dans les deux modes. Qui prend le temps de regarder voit le piège.

### Contre

**Refuser de bouger.** Tenir coûte des dégâts mais casse tout leur plan. Sinon, **repérer la direction vide** et frapper les embusqués en premier.

Un **passage étroit** fonctionne aussi : ils ne peuvent plus contourner pour pousser.

**Menace : 5.** Une rencontre `danger:2` à eux seuls.

> **Pourquoi je ne simplifie pas la mécanique :** elle a le droit d'être opaque à la première rencontre, parce que le prix de l'erreur est faible — un fauchage à 12 dégâts sur 30 points de vie. Ça marque sans tuer.
>
> **On enseigne les leçons chères sur des ennemis pas chers.**

### Butin

Peaux marbrées, bonne valeur d'échange. Viande médiocre.

### Pourquoi ils existent

Ils enseignent que **la position est une ressource** — la première leçon tactique du jeu, et la seule qui compte contre les orques. Et ils la donnent sous la forme la plus claire possible : un ennemi qui vous déplace au lieu de vous frapper.

> Les empreintes de la scène de chasse (`VDG-002`, beat 4.2) sont celles d'un embusqué.

---

## 2. La Nuée Noire

> *Nom de masse.* Pas un nom d'insecte : un nom de chose. On ne les compte pas, on les subit.

| | |
|---|---|
| Archétype | **Essaim** · Palier 1 |
| Terrains | `marais` `eau` · `indifférent` |
| Notoriété | **Racontée** |

### Aspect

Des insectes noirs, le corps gros comme un ongle, les ailes dures qui claquent les unes contre les autres. Un par un, ils sont ridicules.

Ensemble, ils forment une masse de deux hauteurs d'homme qui se déplace au ras de l'eau morte, se creuse, se referme, et avance toujours dans le même sens. Elle n'a pas de forme — elle en prend une, et elle la perd.

### Lecture perceptive

*Un bourdonnement d'abord, bien avant de voir quoi que ce soit. Puis la masse noire, au ras de l'eau, qui vient sans se presser.*

> **Élément non naturel :** le nuage prend brièvement la forme de ce qu'il vient de recouvrir. Un arbre mort. Un animal. Un homme.

### Chiffres

| | Valeur |
|---|---|
| Réserve de PV | 30 *(réserve unique, pas d'unités)* |
| Dégâts / tour | 6, **répartis sur toutes les unités de la zone** |
| Armure | **ignorée** |
| Vitesse | 2 |

### Comportement

Fond sur toute chaleur à portée. **Ignore lignes, couverts et boucliers** — elle ne peut pas être bloquée. Ne fuit jamais : elle se disperse quand la réserve tombe à zéro.

### Attaques

| Attaque | Effet |
|---|---|
| **Enveloppement** | Dégâts à **toutes** les unités de la zone, armure ignorée |
| **Étouffement** | Une unité restée **deux tours** dans la zone prend **+3 fatigue par tour** |
| **Reformation** | Change de zone sans qu'aucune unité puisse s'y opposer |

### Contre

**Le feu** — dégâts ×3, le seul vrai contre. Sinon terrain dégagé et venté (dégâts ÷2), ou sortir de la zone et la laisser passer.

**Menace : 3.** Faible en dégâts, coûteuse en fatigue.

### Butin

Aucun.

### Pourquoi elle existe

Elle rend **le feu utile** et **le marais réellement pénible** sans qu'aucune règle spéciale soit écrite. Et c'est la première créature qui vise la fatigue plutôt que les points de vie : le joueur découvre que cette jauge est une cible.

---

## 3. Le Gris

> *Nom réduit.* Il y a un mot pour ça quelque part, mais personne ne l'emploie. On dit « un gris », et tout le monde comprend.

| | |
|---|---|
| Archétype | **Solitaire** · Palier 2 |
| Terrains | `colline` `montagne` · `diurne` |
| Notoriété | **Connue** en Couronne |

### Aspect

Massif, bas sur pattes, large comme une charrette. Le dos et les flancs sont couverts de plaques grises qui se chevauchent comme des tuiles — épaisses d'un doigt, un peu bombées, usées au sommet et fendillées sur les bords.

La tête est petite pour le corps, enfoncée dans les épaules, sans cou visible. Les yeux sont minuscules et ne servent presque à rien. Les naseaux sont larges : **il vous sent bien avant de vous voir.**

**Le ventre et le bas des flancs n'ont pas de plaques.**

### Lecture perceptive

*Quelque chose de gris et de très gros, immobile à cinquante pas. Vous n'êtes pas sûr que ce soit un animal avant qu'il respire. Quand la tête descend, c'est qu'il arrive.*

> **Élément non naturel :** ses plaques sont chaudes. Là où il a dormi, le givre a fondu en creux.

### Chiffres

| PV | Dég | Arm | Vit |
|---|---|---|---|
| 60 | 12 | 2 | 1 |

### Comportement

**Charge dès qu'on entre dans sa zone.** Ensuite il charge **un tour sur deux**, toujours **annoncé** : la tête descend au tour précédent.

Entre deux charges, il est lent, il tourne mal, et son flanc est ouvert. Il ne poursuit jamais hors de sa zone, mais il ne cède pas un pas.

### Attaques

| Attaque | Effet |
|---|---|
| **Charge** *(annoncée)* | **Toute la zone**, dégâts pleins. Les unités touchées sont **repoussées** |
| **Coup de tête** | Une cible au contact. Dégâts réduits mais **étourdit** : elle perd son action suivante |
| **Piétinement** | Contre une unité **repoussée ou à terre** : dégâts doublés |
| **Retournement** *(lent)* | Il met un tour entier à se réorienter. Pendant ce tour, les attaques de flanc **ignorent son armure** |

### Contre

**Quitter la zone quand la tête descend.** Frapper dans la fenêtre entre deux charges, et toujours de flanc ou au ventre. L'affronter de face est la seule erreur qui ne pardonne pas.

**Menace : 8.** Une rencontre `danger:3` à lui seul.

### Butin

**Plaques** — matériau d'armure lourde, seule source hors marchands au chapitre 1. Viande en grande quantité, si on peut la porter.

### Pourquoi il existe

Le solitaire enseigne **les fenêtres** : un ennemi a un rythme, et on joue dedans. C'est exactement le fonctionnement du Cogneur orque, dont la frappe est aussi annoncée un tour à l'avance. Et ses plaques donnent une **raison de le chasser** au lieu de l'éviter.

---

## 4. Le Fossoyeur

> *Nom de métier.* Il vit sous terre, et il enterre ce qu'il prend. Les mineurs l'ont nommé les premiers, et ils ne plaisantaient pas.

| | |
|---|---|
| Archétype | **Solitaire** · Palier 2 |
| Terrains | `souterrain` `confiné` · `indifférent` |
| Notoriété | **Racontée** chez les mineurs · **Inconnue** ailleurs |

### Aspect

Long de quatre ou cinq pas, épais comme un tronc d'homme, la peau grise et nue, plissée en anneaux serrés comme celle d'un ver de terre — mais tendue sur quelque chose de dur.

L'avant du corps est un **bouclier osseux plat**, large, bordé de dents courtes tournées vers l'arrière : c'est avec ça qu'il creuse. Pas d'yeux, pas de trace d'yeux. La gueule est dessous, comme celle d'un poisson de fond.

On ne le voit jamais en entier. On voit le sol se soulever.

### Lecture perceptive

*La poussière tombe du plafond. Sous vos pieds, quelque chose de lourd se déplace, et ça ne va pas dans la même direction que vous.*

> **Élément non naturel :** il n'a pas d'oreilles. Il entend par le sol — et il vous entend **arriver bien avant que vous entriez dans la galerie.**

### Chiffres

| PV | Dég | Arm | Vit |
|---|---|---|---|
| 50 | 10 | 1 | 2 |

### Comportement

**Aveugle. Il attaque l'unité la plus bruyante de sa zone**, sans exception. Une unité qui ne fait rien pendant un tour n'est jamais ciblée : elle n'existe pas pour lui.

Il se déplace **sous le sol** et n'est pas ciblable tant qu'il n'a pas émergé. Il ne quitte jamais les galeries : en terrain ouvert, il rebrousse chemin.

### Attaques

| Attaque | Effet |
|---|---|
| **Remuement** *(annonce)* | Le sol tremble dans **une zone désignée**. Il émergera là **au tour suivant**. Le joueur sait où — pas sur qui |
| **Émergence** | Dans la zone annoncée, sur **l'unité la plus bruyante** de cette zone. Dégâts pleins, cible **à terre** |
| **Saisie** | La cible est **immobilisée**. **Libérable** : n'importe quelle attaque réussie sur lui le fait lâcher, ou **1 point de commandement** pour une extraction immédiate |
| **Enfouissement** | Une unité **immobilisée deux tours entiers** est entraînée sous terre — **hors de combat**, non morte |
| **Effondrement** | Il creuse sous toute la zone. Dégâts faibles, touche **tout le monde**, y compris les silencieux |
| **Plongée** | *(gratuit)* Il retourne sous le sol. Impossible à cibler jusqu'à sa prochaine émergence |

### Les trois contres

| Forme | Comment |
|---|---|
| **Préventif** | Ordre permanent *ne rien faire* sur les unités fragiles. Une unité silencieuse n'est **jamais** ciblée |
| **Préventif** | **Désigner un appât** — une unité solide qui fait volontairement du bruit et encaisse à la place des autres |
| **Réactif** | Le Remuement annonce la zone : **la quitter au tour suivant** annule complètement l'attaque |

> **Le joueur choisit toujours qui risque**, puisque c'est le bruit qui désigne la cible. Rien n'est subi.

### Si Tomas est saisi

Cas particulier, parce qu'il ne peut pas être perdu comme un compagnon.

| Tour | Ce qui se passe |
|---|---|
| **1** | Le texte annonce clairement : *il recule, et il l'emmène* |
| **1-2** | **2 points de commandement** l'extraient immédiatement. Ou n'importe quelle attaque réussie fait lâcher le Fossoyeur |
| **Fin du tour 2** | S'il n'a pas été libéré : **défaite**, état *laissé pour mort* (§4.5) |

**La défaite vient donc de l'épuisement d'une ressource, jamais d'un coup de malchance.** Un joueur qui a gardé ses points de commandement s'en sort toujours ; un joueur qui les a tous dépensés ailleurs paie ce choix.

### Récupérer une unité enfouie

| Option | Coût |
|---|---|
| **Pendant le combat** | **2 points de commandement** + l'action d'une unité pour la déterrer |
| **Après le combat** | Gratuit, mais elle est **blessée** et indisponible jusqu'au prochain repos en lieu sûr |

> C'est le vrai intérêt tactique du Fossoyeur, et il apparaît surtout **combiné à d'autres ennemis** : continuer à trois en laissant le compagnon sous terre, ou dépenser deux points de commandement et une action pour le récupérer tout de suite. Les deux se défendent.

### Contre

Résumé : **le silence, l'appât, et quitter la zone annoncée.** On le frappe pendant les tours où il est sorti — il est intouchable le reste du temps.

Ou bien on ne le combat pas du tout : on traverse la galerie en silence et il ne saura jamais qu'on est passé.

**Menace : 7 si on le combat, 2 si on l'évite.**

### Butin

Peu. Son bouclier frontal fait une bonne pièce d'armure, pour qui sait la monter.

### Pourquoi il existe

Il donne un sens **tactique** au souterrain : le tag `confiné` produit une bête qu'on ne bat pas à la force. C'est le premier ennemi qui **récompense l'inaction**, ce qui casse l'automatisme « tout le monde attaque à chaque tour ».

Et l'enfouissement est le seul effet du jeu qui **retire une unité sans la tuer** — une perte qui fait mal sans consommer un personnage, et qui pose en plein combat un arbitrage réel : continuer sans elle, ou payer pour la récupérer.

---

## 5. Le Fléau

> *Nom d'outil et de calamité.* Le fléau bat le grain et l'aplatit. C'est aussi ce qui tombe sur vous sans qu'on sache pourquoi. Un troupeau entier nommé comme une seule chose — comme la Nuée.

| | |
|---|---|
| Archétype | **Meute** · Palier 2 |
| Terrains | `plaine` `colline` · `diurne` |
| Notoriété | **Connue** en Couronne et en Terres Libres |

### Aspect

Grands, l'épaule à hauteur d'homme, le corps massif porté sur des pattes courtes. Le cuir est épais, gris de poussière, tendu sur les épaules.

Le front est large, plat et bas, couvert d'une **plaque osseuse** qui descend jusqu'aux naseaux. Les cornes sont courtes, tournées vers l'avant, **émoussées et fendues par les coups** : elles ne percent pas, elles défoncent.

Ils se tiennent en ligne large, jamais en colonne. Et on les voit rarement en premier — **on voit d'abord la poussière qui monte.**

### Lecture perceptive

*Une ligne de poussière sur la plaine, qui ne se déplace pas avec le vent. Puis les bêtes dessous, huit peut-être, toutes tournées vers vous. Aucune ne mange.*

> **Élément non naturel :** ils se tournent tous en même temps, sans signal, sans que le premier ait bougé.

### Chiffres

| PV | Dég | Arm | Vit | Nombre |
|---|---|---|---|---|
| 18 | 6 | 1 | 3 | 5 à 8 |

### Comportement

**Chargent à vue, en ligne, tous ensemble.** Ils ne se divisent jamais, ne contournent jamais, ne renoncent pas.

En **terrain dégagé**, la ligne frappe toute la zone et repousse tout ce qu'elle touche. En **terrain accidenté** — rochers, fossé, bois, ruines, pente — ils ne peuvent pas se lancer : la charge est annulée et leurs dégâts sont divisés par deux.

### Attaques

| Attaque | Effet |
|---|---|
| **Charge en ligne** | *(terrain dégagé seulement)* Toute la zone. Toute unité touchée est **repoussée** et perd son action |
| **Bousculade** | Pousse une cible hors de sa zone, **vers le terrain dégagé** — donc vers la prochaine charge |
| **Coup de front** | Contact, dégâts pleins. Doublés sur une unité **déjà repoussée** |
| **Demi-tour** | Après une charge, un tour entier pour se remettre en ligne. **C'est la seule fenêtre** |

### Contre

**Le terrain, et rien d'autre.** Rejoindre un ravin, un bois, une hauteur, des ruines, un fossé. En plaine ouverte il n'y a pas de contre — seulement la fuite, et ils sont plus rapides.

**Menace : 8 en terrain dégagé · 4 en terrain accidenté.**

### Butin

Beaucoup de viande. Plaques frontales — armure légère. Les cornes s'échangent bien chez les marchands.

### Pourquoi il existe

Il enseigne que **le terrain est une arme**, seule leçon qu'aucune autre créature ne donne — et la ligne du Cogneur orque se casse exactement de la même façon.

Il rend aussi la plaine ouverte réellement dangereuse : longer les bois devient un **choix de route**, pas une habitude.

---

## 6. L'Enclume

> *Nom de forge, et récit d'un échec.* Les hommes de la Couronne ont brisé leurs lances sur elle avant la paix, et les fers y sont restés plantés. On ne déplace pas une enclume.

| | |
|---|---|
| Archétype | **Solitaire** · Palier **3 — Légendaire, unique, nommée** |
| Terrain | **Le Ravin Noir** (Crête Brûlée), uniquement |
| Notoriété | **Racontée** — tout le monde connaît l'histoire, personne ne l'a vue |
| Condition | Un seul exemplaire par partie. Réapparaît à chaque run tant qu'elle n'a pas été tuée |

### Ce qu'on raconte

*Un gris, mais noir, et deux fois plus gros. Il est là depuis toujours. Avant la paix, la Couronne a envoyé des hommes pour l'abattre : ils y ont laissé leurs lances et la moitié d'entre eux.* ***Il n'a jamais reculé d'un pas.***

**L'histoire se trompe sur ce dernier point.**

### Aspect

Un gris. Mais deux fois trop grand, et noir — les plaques ont brûlé, noirci, certaines ont éclaté et repoussé de travers, d'autres manquent et laissent voir la peau grise en dessous.

Il y a **des fers de lance plantés dans son dos**, entre les plaques. Cinq ou six, rouillés, le bois disparu depuis longtemps. La chair a repoussé autour.

Elle ne se déplace pas. Elle est au fond du ravin, et elle regarde l'entrée.

### Lecture perceptive

*Le ravin est étroit et la lumière n'y descend pas. Au fond, quelque chose de très gros est tourné vers vous. Il n'a pas bougé. Il ne bougera pas tant que vous n'entrerez pas.*

> **Élément non naturel : aucun.** Elle doit rester un animal — c'est ce qui la rend crédible, et terrifiante.

### Chiffres

| PV | Dég | Arm | Vit |
|---|---|---|---|
| 110 | 15 | 2 | 1 |

### Comportement

Comme un gris, avec trois différences :

1. **Elle n'attaque jamais la première.** Elle attend qu'on entre
2. **Elle bloque la sortie dès le deuxième tour** — le ravin n'a qu'une issue
3. **Au tiers de ses points de vie, elle recule** au fond du ravin, où l'on ne peut pas la suivre. Le combat s'arrête. Elle sera intacte au prochain run

> **C'est là que l'histoire ment.** « Il n'a jamais reculé » pousse le joueur à tout engager pour l'achever. Elle recule quand même. Il aura brûlé ses ressources pour rien — **et il aura appris que ce que tout le monde sait peut être faux.**

### Attaques

| Attaque | Effet |
|---|---|
| **Charge** *(annoncée)* | Toute la zone, dégâts pleins, repousse. Dans un ravin étroit, **on est repoussé contre la paroi** : dégâts supplémentaires |
| **Coup de tête** | **Étourdit deux tours** au lieu d'un |
| **Piétinement** | Dégâts doublés sur une unité repoussée ou à terre |
| **Barrage** | *(à partir du tour 2)* Elle occupe la sortie. **Fuir devient impossible sans la déloger ou l'attirer ailleurs** |

### Contre

Ceux du gris, avec trois fois moins de marge d'erreur — plus un piège : **la sortie se referme au deuxième tour.** Il faut l'attirer hors de l'entrée avant, ou renoncer.

Ou ne pas entrer.

**Menace : 15.** `danger:5` à elle seule.

### Butin

**Ses plaques noires** — le meilleur matériau d'armure du chapitre 1, et de loin.

Et les **fers de lance** arrachés de son dos. Ils portent une marque de la Couronne, et ils sont bien plus vieux que huit ans de paix.

### Pourquoi elle existe

Un jeu à bestiaire a besoin d'une bête que **tout le monde connaît et que personne n'a tuée**. Elle donne au Ravin Noir sa raison d'être : le silence, la roche calcinée, l'absence de tout autre animal.

Elle est **optionnelle, visible depuis l'entrée, clairement au-dessus du niveau**. Le joueur qui la voit au premier run sait qu'il reviendra.

---

## 7. Récapitulatif

| Créature | Terrain | Palier | Notoriété | Menace |
|---|---|---|---|---|
| Les Rabatteurs | `forêt` nuit | 1 | Connue | 5 |
| La Nuée Noire | `marais` | 1 | Racontée | 3 |
| Le Gris | `colline` `montagne` | 2 | Connue | 8 |
| Le Fossoyeur | `souterrain` | 2 | Racontée / Inconnue | 7 / 2 |
| Le Fléau | `plaine` | 2 | Connue | 8 / 4 |
| L'Enclume | Ravin Noir | 3 | Racontée | 15 |

### Ce que chacune enseigne

| Leçon | Par |
|---|---|
| **La position est une ressource** | Les Rabatteurs |
| Le feu, quitter la zone | La Nuée Noire |
| **Les fenêtres entre deux attaques** | Le Gris, L'Enclume |
| Le silence, l'inaction, l'urgence | Le Fossoyeur |
| **Le terrain est une arme** | Le Fléau |

### Vocabulaire d'effets — partagé avec les unités orques

Les créatures servent d'**école tactique** avant le premier affrontement organisé.

| Effet | Infligé par |
|---|---|
| **Repoussé** | Rabatteurs, Gris, Fléau, Enclume |
| **À terre** | Rabatteurs, Fossoyeur |
| **Immobilisé** | Fossoyeur |
| **Étourdi** | Gris, Enclume |
| **Hors de combat** *(sans mort)* | Fossoyeur |

### Expérience — par unité tuée, jamais au forfait

> **XP = coût de menace × 10.** Le multiplicateur de niveau est déjà contenu dans la menace, qui monte avec lui.

**Unités de faction**

| | Niveau 1 | Niveau 2 | Niveau 3 |
|---|---|---|---|
| **C** | 10 | 15 | 20 |
| **B** | 25 | 40 | 60 |
| **A** | 40 | 55 | 70 |
| **S** | 70 | 100 | 130 |

Traits inclus : **Meneur ×1,5**, **Vétéran ×1,3** — les mêmes multiplicateurs que pour la menace.

> **Note sur les chevauchements.** La correction d'armure de l'audit §5.2 a rompu l'un des trois chevauchements annoncés à l'origine. Deux tiennent — **C3 ≈ B1** (2 contre 2,5) et **A3 = S1** (7 = 7) — parce qu'ils comparent des unités de fonction comparable. **B3 contre A1** (6 contre 4) ne tient plus, et ne devrait jamais avoir tenu : une ligne lourde de niveau 3 est objectivement plus dangereuse qu'un soutien fragile de niveau 1. La catégorie est un **rôle**, pas un rang — il n'y a donc aucune raison qu'un A1 vaille un B3.

**Créatures**

| Créature | XP par unité |
|---|---|
| Batteur *(Rabatteurs)* | 8 |
| Embusqué *(Rabatteurs)* | 14 |
| Unité de Fléau | 12 |
| La Nuée Noire *(entité unique)* | 30 |
| Le Fossoyeur | 70 |
| Le Gris | 80 |
| **L'Enclume** | **100** si on la fait reculer · **150** si on l'abat |

**Pourquoi cette formule et pas une table séparée :** XP et difficulté restent **verrouillées ensemble à jamais**. Tout ajustement d'équilibrage sur une unité met son XP à jour automatiquement, et il devient impossible qu'un ennemi facile rapporte gros.

> À titre de comparaison, un jalon narratif rapporte 150 et une bataille 200. **Le récit paie mieux que la chasse**, ce qui est voulu.

> ⚠ **Conséquence à mesurer.** En passant du forfait par combat à l'XP par unité, un run type descend d'environ 1 570 à **1 380 XP** — le joueur finirait le chapitre 1 au **niveau 9** et non 10. Soit on abaisse la courbe, soit on l'accepte. **Premier point à vérifier en test.**

### Fréquence — trois niveaux

| Type | Fréquence | Durée | Effet |
|---|---|---|---|
| **Signes** — traces, carcasse, silhouette au loin, un bruit | **1 POI sur 2** | 30-60 s | Entrée de bestiaire en *estimé*, **aucun combat** |
| **Rencontres réelles** | **1 POI sur 4-5** | ~5 min, narratif | Combat ou évitement |
| **Bascule tactique** | **1 par run au maximum** | 10-15 min | Réservée aux situations qui dégénèrent |

Les **signes** sont ce qui fait qu'un monde paraît habité sans devenir une file de combats. Ils remplissent aussi le bestiaire sans risque — sans eux, un joueur prudent n'apprendrait presque rien.

> **Ces fréquences règlent ce que le monde propose, jamais ce que le joueur fait.** Voir §7 bis.

**Ce qui manque :** rien en `désert` ni en `côte` — hors MVP. Aucune créature palier 1 diurne en forêt.

---

## 7 bis. Le rythme appartient au joueur

> **Les durées estimées servent à budgéter le contenu, jamais à contraindre la partie.**

Un joueur qui se bat contre tout ce qu'il croise allonge son run. **Ce n'est pas un défaut à corriger** : c'est sa façon de jouer, et elle doit rester possible. Il comprendra seul que ce n'est pas optimal — épuisement des ressources, compagnons blessés, usure de l'équipement, et parfois une mort.

Un joueur qui traverse sans jamais s'arrêter va plus vite, et le paie autrement : moins d'informations, moins d'équipement, moins de niveaux, un bestiaire à trous. Il arrive aux Terres Noires nu.

**Aucune des deux voies n'est bloquée, aucune n'est récompensée artificiellement.** C'est l'économie qui arbitre, pas une règle.

**La seule obligation que ça crée :** les coûts doivent être **lisibles en cours de route**. Un joueur qui se bat beaucoup doit voir ses ressources fondre pendant qu'il joue, pas le découvrir au bilan. C'est la condition pour que l'auto-régulation fonctionne — sinon ce n'est plus un choix, c'est un piège.

**Ce que ça implique pour l'équilibrage :** la courbe d'expérience est calibrée sur un run type, pas sur un plafond. Un joueur combatif finira un ou deux niveaux plus haut — avec moins de ressources. C'est un échange, pas un déséquilibre.

---

## 8. Ce que j'ai changé, et pourquoi

Deux créatures ont été **reconçues à partir de leur nom**, une fois les attributs inventés précédemment abandonnés.

**Les Rabatteurs.** Le nom vient de la chasse : un rabatteur pousse le gibier vers les tireurs. J'en ai fait leur mécanique — la meute se coupe en deux, les batteurs harcèlent pour vous **déplacer**, les embusqués attendent où l'on vous pousse. C'est beaucoup plus intéressant qu'un encerclement générique, et ça installe la leçon la plus importante du jeu dès la première meute.

**Le Fossoyeur.** Un fossoyeur enterre. La bête ne coule plus le long des parois : **elle vient de dessous**, elle creuse, et son attaque signature entraîne une unité sous terre — hors de combat, sans la tuer. Le nom a produit une meilleure créature que la description que j'avais écrite avant lui.

**Abandonné :** la piste des créatures modifiées par la magie au chapitre 3. Elle imposait un système d'état pour un bénéfice purement thématique.

---

