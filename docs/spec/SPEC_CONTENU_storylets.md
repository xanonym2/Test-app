# Les Terres Voilées — Format et storylets de référence

**Version :** 1.6
**Statut :** références d'écriture — le format du §1 est remplacé par le schéma du contrat
**Dernière mise à jour :** 21 septembre 2026

> Compagnon de `SPEC_DESIGN_terres-voilees.md` (systèmes) et `SPEC_MONDE_terres-voilees.md` (récit).
> Ce fichier contient les **storylets modèles** : leur découpage en beats, leur ton et leur structure restent la référence d'écriture. **Le format du §1 est remplacé par le schéma de `content/CONTRAT.md` (§5)**, que la v3 applique déjà et que le vérificateur contrôle. Les modèles seront convertis à ce schéma au moment de leur implémentation.

---

## 1. Format formel

> **Remplacé le 21/09/2026** par le schéma du contrat (§5). Conservé pour lire les modèles ci-dessous.

```
ID            : <PREFIXE>-<NNN>
TITRE         : <titre de travail, jamais affiché au joueur>
POOL          : recombinable | jalon
TAGS EXIGÉS   : <liste — recombinable uniquement ; 1 tag ~60%, 2 ~30%, 3+ ~10%>
TAGS EXCLUS   : <liste — optionnel>
CONDITIONS    : <état du monde, chapitre, flags — optionnel>
POIDS         : <1-5, fréquence relative de tirage>
MOMENT        : indifférent | variante | conditionné
TYPE          : mineure (2-3 beats) | standard (4-6) | majeure (7-10)
BASCULE       : aucune | possible | systématique

ANCRAGE       : 3-5 lignes. Écrit une fois. Consultable à tout moment.
ÉTAT          : <variables internes et valeurs de départ>

BEAT n
  TEXTE       : <situation présente, 2-4 phrases>
  CHOIX
    LIBELLÉ     : <formulé à l'intention>
    PRÉREQUIS   : <sinon le choix n'apparaît pas>
    COÛT CERTAIN: <payé quoi qu'il arrive>
    FRANCHE     : <conséquence narrée 2-4 phrases> | <delta d'état>
    PARTIELLE   : <idem>
    ÉCHEC       : <idem>

SORTIES       : <4-6 issues typées, chacune avec son épilogue>
RETOMBÉES     : <écriture dans l'état du monde>
```

### Rappels non négociables

- **Aucun choix ne quitte la scène** sans passer par une SORTIE explicite
- **Chaque choix produit une conséquence narrée** : ton action *et* la réaction du monde, avant les choix suivants
- **Trois paliers sur les scènes majeures et les jalons** — c'est la réussite partielle qui fait durer la scène. Ailleurs, deux issues distinctes suffisent
- **Le détail est diagnostique, jamais décoratif**
- **Vocabulaire accessible** : un joueur de 15 ans comprend chaque mot sans le chercher
- **Jamais 6 lignes sans décision proposée**

### Préfixes d'ID

| Préfixe | Portée |
|---|---|
| `VDG` | Val-de-Garde et jalons de l'ouverture |
| `TN` | Jalons des Terres Noires |
| `CR` | Jalons de la Couronne |
| `SLT-<terrain>` | Pool recombinable, par terrain dominant |

---

## 2. Storylet modèle — pool recombinable

C'est **le modèle le plus important** : 60 à 100 storylets de ce type porteront l'essentiel du jeu.

```
ID            : SLT-FOR-012
TITRE         : Les traces fraîches
POOL          : recombinable
TAGS EXIGÉS   : forêt
POIDS         : 3
MOMENT        : variante
TYPE          : standard (4-6 beats)
BASCULE       : possible
```

**ANCRAGE**

> Le sentier s'ouvre sur une clairière basse, cernée de troncs serrés. Le sol est meuble, encore humide de la nuit.
>
> Des empreintes le traversent. Larges, profondes, espacées — quelque chose de lourd est passé ici, et pas il y a longtemps.
>
> Les oiseaux se sont tus.

**ÉTAT** — `distance: loin` · `alerte: non repéré` · `connaissance: inconnu` · `beats_écoulés: 0`

---

**BEAT 1**

> Les traces filent vers le nord, là où la forêt s'épaissit. Ta route passe à l'est.

| Choix | Détail |
|---|---|
| **Examiner les empreintes** | *Coût :* un peu de temps.<br>**Franche —** Tu t'accroupis. Les griffes ont mordu la terre à chaque appui : l'animal était pressé, ou il chassait. L'écart des pas dit une bête plus haute que toi au garrot. Tu sais maintenant à quoi tu as affaire, même si tu ne l'as jamais vu. → `connaissance: estimé`<br>**Partielle —** Le sol est trop mou, les bords se sont affaissés. Tu retiens seulement que c'est gros, et que c'est récent. → `connaissance: inconnu`, temps consommé |
| **Continuer vers l'est, sans t'attarder** | *Coût :* aucun.<br>**Franche —** Tu t'écartes de la clairière en gardant les troncs entre toi et le nord. Le silence tient jusqu'à ce que tu sois loin. → SORTIE *Évité* |
| **Suivre les traces** | *Prérequis :* aucun. *Coût :* temps, fatigue.<br>**Franche —** Tu remontes la piste sur cent pas. Elle s'arrête net au pied d'un hêtre — et repart en sens inverse, plus large. La bête est revenue sur ses pas. Elle est derrière toi. → `distance: proche`, `alerte: non repéré`<br>**Partielle —** Tu la remontes, mais tu casses une branche morte. Le bruit porte. → `distance: proche`, `alerte: repéré` |

---

**BEAT 2** *(si `distance: proche`)*

> Tu la vois avant qu'elle ne bouge. Massive, le poil collé de boue, immobile entre deux troncs. Elle respire lentement.
>
> *(si `connaissance: estimé`)* Rien ne te surprend : la taille correspond à ce que tu avais lu au sol.
>
> *(si `connaissance: inconnu`)* Tu n'as aucune idée de ce que ça encaisse.

| Choix | Détail |
|---|---|
| **Tirer maintenant** | *Prérequis :* arc, au moins 1 flèche. *Coût :* 1 flèche, bruit.<br>**Franche —** La flèche entre derrière l'épaule. La bête s'effondre sur le flanc et ne se relève pas. → SORTIE *Abattue* · `connaissance: exact`<br>**Partielle —** Tu touches, mais trop haut. Elle hurle, se retourne, et te voit. → `distance: au contact`, `alerte: repéré`<br>**Échec —** La flèche claque contre un tronc. Elle charge. → `distance: au contact`, `alerte: repéré`, blessure légère |
| **Reculer sans un bruit** | *Coût :* temps.<br>**Franche —** Tu remets un pied en arrière, puis un autre. Elle ne bouge pas. → SORTIE *Évité*<br>**Partielle —** Une racine cède sous ton talon. Elle lève la tête. → `alerte: repéré` |
| **Lâcher une prise pour l'occuper** | *Prérequis :* vivres en réserve. *Coût :* 1 ration.<br>**Franche —** Tu jettes la pièce de viande à dix pas sur ta gauche. Elle y va. Tu passes par la droite. → SORTIE *Évité*, ration perdue |

---

**BEAT 3** *(si `au contact`)* — mêmes principes : tenir, fuir, appeler un compagnon. Une SORTIE atteignable en 1 à 2 beats supplémentaires.

---

**SORTIES**

| Sortie | Épilogue | Retombées |
|---|---|---|
| **Évité** | Tu reprends ta route. Longtemps après, tu entends encore craquer derrière toi. | Temps consommé |
| **Abattue** | Tu récupères ce qui se prend vite et tu ne t'attardes pas. | Viande, peau · `connaissance: exact` |
| **Repoussée** | Elle recule en boitant et disparaît entre les troncs. | Fatigue, blessure possible · `connaissance: estimé` |
| **Fuite** | Tu cours sans regarder derrière. Tu t'arrêtes bien plus loin que tu ne voulais. | Temps, fatigue, dispersion possible d'un compagnon |
| **Bascule tactique** | *(si un compagnon est engagé ou si `alerte: repéré` et `au contact`)* | Combat, état de départ hérité |

**RETOMBÉES** — bestiaire mis à jour selon `connaissance` · `épuisé` sur le POI si la bête est abattue · flag `traces_suivies` si la piste a été remontée

> **Ce que ce modèle démontre :** un seul tag exigé (`forêt`), donc rejouable partout dans la Vieille Forêt et plus tard dans n'importe quelle zone boisée ; trois paliers systématiques ; la lecture perceptive gratuite qui passe à *estimé* contre du temps ; cinq sorties dont aucune ne rend zéro.

---

## 3. Storylet modèle — jalon

```
ID            : TN-001
TITRE         : Le Passage aux Os
POOL          : jalon
CONDITIONS    : chapitre 1, première entrée dans les Terres Noires
MOMENT        : indifférent
TYPE          : majeure (7-10 beats)
BASCULE       : possible
```

**ANCRAGE**

> Le col est étroit, pris entre deux parois de roche nue. Le vent y monte du fond de la vallée et ne s'arrête jamais.
>
> Le sol est couvert d'os. Pas entassés — répandus, sur toute la longueur du passage, depuis si longtemps que la pierre les a blanchis. Des humains. Des orques. Mêlés, sans distinction.
>
> Au bout du col, une lumière : un feu, entretenu.

**ÉTAT** — `alerte: non repéré` · `position: entrée du col` · `feu: gardé` · `connaissance_orques:` hérité du bestiaire

---

**BEAT 1**

> Rien ne bouge au fond du col. Le feu brûle seul, à découvert. Personne ne laisse un feu sans surveillance.

| Choix | Détail |
|---|---|
| **Observer depuis les rochers** | *Coût :* temps.<br>**Franche —** Ils sont trois. Deux assis près du feu, arme posée. Le troisième debout, immobile, un mât planté dans le sol à côté de lui — haut, ferré, couvert de marques. Il ne s'assied pas et ne regarde pas le feu. → `connaissance: estimé` sur les trois unités<br>**Partielle —** Tu vois deux silhouettes près du feu. La troisième t'échappe. → `connaissance: estimé` sur deux unités |
| **Traverser par le haut** | *Prérequis :* pas de blessure lourde. *Coût :* temps, fatigue.<br>**Franche —** Tu longes la paroi au-dessus du col. Tu passes sans qu'ils lèvent la tête. → SORTIE *Franchi sans contact*<br>**Partielle —** Une pierre part sous ton pied et roule jusqu'en bas. Le silence s'installe. → `alerte: repéré` |
| **Avancer dans le col, sans se cacher** | *Coût :* aucun.<br>**Franche —** Tu marches sur les os. Ils t'entendent bien avant de te voir. Ils ne crient pas, ne se parlent pas. Ils se lèvent, et ils viennent. → `alerte: repéré`, `position: dans le col` |

---

**BEAT 2** *(si observé)*

> Le troisième n'a toujours pas bougé. Les deux autres ne s'éloignent jamais de plus de dix pas du mât.

| Choix | Détail |
|---|---|
| **Tirer sur le porteur de mât** | *Prérequis :* arc, 1 flèche. *Coût :* 1 flèche, bruit.<br>**Franche —** La flèche le prend à la gorge. Il tombe, le mât avec lui. Les deux autres s'arrêtent net. Une seconde entière, ils ne font rien du tout. Puis ils te cherchent. → `alerte: repéré`, indice `totem_anomalie` posé<br>**Partielle —** Tu touches le mât. Le bois sonne. Les trois se tournent en même temps, exactement en même temps. → `alerte: repéré` |
| **Tirer sur un garde** | *Coût :* 1 flèche, bruit.<br>**Franche —** Il tombe sans un cri. Les deux autres ne regardent pas son corps. Ils cherchent d'où c'est venu. → un ennemi en moins, `alerte: repéré` |
| **Reculer et chercher un autre passage** | *Coût :* beaucoup de temps.<br>**Franche —** Tu redescends. Il y a un autre chemin, plus long, plus haut, plus froid. → SORTIE *Contourné* |
| **Te montrer** | *Prérequis :* aucun.<br>**Franche —** Tu sors à découvert, arme baissée. Ils te regardent. Ils ne répondent pas, ne parlent pas, ne font aucun signe. Ils viennent. → `alerte: repéré`, indice `aucune_parole` posé |

---

**BEATS 3 à 7** — affrontement narratif ou bascule tactique selon l'état. Options non létales disponibles à chaque beat : reculer, briser le mât plutôt que tuer, laisser passer.

---

**SORTIES**

| Sortie | Épilogue |
|---|---|
| **Franchi sans contact** | Tu passes le col et tu ne te retournes pas. |
| **Contourné** | Le détour te coûte la moitié de la journée. |
| **Col tenu** | Les trois sont à terre. Le mât aussi. Le feu brûle toujours. |
| **Repoussé** | Tu redescends en courant. Ils ne te poursuivent pas au-delà du col. |
| **Bascule tactique** | État de départ hérité des beats précédents. |

**RETOMBÉES** — bestiaire orque · flag `passage_franchi` · indices `totem_anomalie` et `aucune_parole` si déclenchés · accès aux zones profondes des Terres Noires

> **Ce que ce modèle démontre :** un jalon écrit à la main, deux indices posés à vue sans une ligne d'explication, des options non létales présentes dès le chapitre 1 sans justification apparente, et l'arrêt d'une seconde qui ne sera compris qu'au chapitre 3.

---

## 4. `VDG-002` — L'ouverture

```
ID            : VDG-002
TITRE         : Le dernier matin
POOL          : jalon
CONDITIONS    : début de partie
MOMENT        : conditionné (jour)
TYPE          : majeure
BASCULE       : aucune
SORTIE UNIQUE : enchaîne sur VDG-001 (la razzia)
```

**ANCRAGE**

> Le jour se lève sur Val-de-Garde.
>
> De la porte, on voit la tour de guet plantée en haut du versant. Sa cloche est immobile. Elle n'a pas sonné depuis huit ans — depuis que la Couronne a signé la paix avec les Terres Noires.
>
> Tu avais dix-sept ans et une lance. Maintenant tu as un arc, et les bois sont à toi.

**ÉTAT** — `flèches: 9` · `matinée: entière` · `voix_entendues: 0` · `jonas_situé: non` · `gibier: aucun`

> **Ressource de la scène : le temps.** Chaque beat en consomme. Ce qui est dépensé en préparation n'est pas dépensé à écouter le village — et inversement. Le joueur ne sait pas encore lequel des deux comptera.

---

### BEAT 1 — Le seuil

> Neuf flèches dans le carquois. Il en faut douze pour une bonne journée.

| Choix | Détail |
|---|---|
| **Tailler des pointes toi-même** | *Coût :* une bonne partie de la matinée.<br>**Franche —** Tu t'installes sur le seuil. Trois pointes, trois hampes, trois empennages. Le soleil est déjà haut quand tu ranges le couteau. → `flèches: 12`, `matinée: entamée` |
| **En demander à Mathias en passant** | *Coût :* un peu de temps.<br>**Franche —** Il en a toujours d'avance. Tu passeras les prendre à la forge. → `flèches: 12`, `matinée: presque entière`, `dette_mathias: oui`<br>**Partielle —** Il en a deux seulement. Le reste est commandé. → `flèches: 11`, `matinée: presque entière` |
| **Partir avec ce que tu as** | *Coût :* aucun.<br>**Franche —** Neuf, c'est neuf. Tu as chassé avec moins. → `flèches: 9`, `matinée: entière` |

---

### BEAT 2 — La forge

> La forge est ouverte des deux côtés, comme toujours. Mathias frappe une lame qui n'a rien d'une lame : un soc de charrue, qu'un paysan des Bois lui a apporté tordu.
>
> Il a vingt ans et les avant-bras d'un homme qui en a trente.

*(si `dette_mathias`)* > « Je t'avais dit avant-hier. Tu me le dis toujours le matin même. »

| Choix | Détail |
|---|---|
| **Lui demander où est Jonas** | *Coût :* un peu de temps.<br>**Franche —** Mathias ne lève pas les yeux du soc. « Au toit des Ancel. Il a dit qu'il finissait avant midi. » Un temps. « Il ne finira pas avant midi. » → `jonas_situé: oui` |
| **Lui demander des nouvelles du village** | *Coût :* un peu de temps.<br>**Franche —** « La garnison a eu deux hommes en moins ce mois-ci. Personne n'est venu les remplacer. » Il repose le marteau. « Ça fait trois mois. » → `voix_entendues: +1` |
| **Le laisser travailler** | *Coût :* aucun.<br>**Franche —** Tu prends tes pointes, tu ne dis rien. Il hoche la tête sans s'arrêter. C'est comme ça entre vous, et ça suffit. |
| **Lui proposer de venir** | *Prérequis :* aucun.<br>**Franche —** « Avec quoi ? Ma masse ? » Il rit. « Ramène quelque chose, je le ferai cuire. » → sa seule réplique légère de tout le jeu |

> **Fonction du beat :** installer Mathias comme personne avant de l'installer comme compagnon. Il est utile, occupé, un peu sec, et il ne se bat pas. Cette dernière information devra resservir (§6.9 de la spec de design).

---

### BEAT 3 — La traversée

> Il faut passer par la place pour sortir du village.

**Trois routes, un nombre de voix limité par `matinée`** — 3 voix si `entière`, 2 si `presque entière`, 1 si `entamée`.

| Route | Ce qu'on entend |
|---|---|
| **Par la place** | Un soldat de la Couronne, adossé au puits : *« La relève devait être là au printemps. On est en été. »* |
| **Par la route du sud** | Un marchand qui décharge, et qui compte deux fois : *« Le sel a pris un tiers depuis la Saint-Jean. Personne ne sait pourquoi. »* |
| **Par l'autel** | Une vieille femme qui balaie devant l'abri effondré : *« Les frères ne sont pas passés ce mois-ci. Ni le mois d'avant. »* |

**Rencontre obligatoire — Jonas.** Quelle que soit la route choisie, Tomas le croise. Deux répliques, rien de plus :

> Jonas descend d'une échelle, une botte de chaume sous le bras. Il te voit, lève le menton.
>
> « Tu montes ? »
>
> « Je monte. »
>
> Il est déjà reparti vers le toit.

> **Règle d'écriture — voir `SPEC_MONDE` §1.** Jonas est **parfaitement ordinaire** ce matin-là : aucun sous-entendu, aucun mystère, aucune ligne suggérant qu'il cache quelque chose. Le joueur doit l'avoir vu vivant et entendu parler une fois. C'est **l'absence de poids de cet échange** qui rendra sa disparition insupportable.
>
> Cet échange ne coûte pas de temps et n'est jamais sauté, y compris en version courte.

> **Règle d'écriture :** aucune de ces phrases n'est commentée. Personne ne s'en étonne, personne n'enquête. Le joueur les lit comme du décor. Elles décrivent le plan en cours (voir `SPEC_MONDE` §5).

---

### BEAT 4 — La chasse

*C'est le premier vrai storylet du jeu. Il enseigne trois systèmes sans jamais les nommer.*

> Les bois commencent à deux cents pas des dernières maisons. Le sol monte, puis s'aplatit.
>
> Un chevreuil est là, en contrebas, le long du ruisseau. Il n'a pas bougé la tête. Le vent vient vers toi — il ne t'a ni vu ni senti.

**ÉTAT** — `distance: longue` · `vent: favorable` · `alerte: non`

**BEAT 4.1**

| Choix | Détail |
|---|---|
| **Le regarder un moment** | *Coût :* un peu de temps.<br>**Franche —** Il est jeune, l'arrière-train maigre. Il boite légèrement de l'antérieur gauche. Il ne courra pas vite. → bestiaire : chevreuil en *exact*<br>*Enseigne : observer est gratuit en risque, payant en temps.* |
| **Descendre en s'abritant** | *Coût :* temps, fatigue.<br>**Franche —** Tu descends de vingt pas. Il n'a rien entendu. → `distance: courte`<br>**Partielle —** Une pierre part. Il relève la tête, immobile. Tu ne respires plus. → `distance: courte`, `alerte: oui` |
| **Tirer d'ici** | *Coût :* **1 flèche**, quoi qu'il arrive.<br>**Franche —** La flèche descend en courbe et le prend au flanc. Il fait trois bonds et tombe. → `gibier: chevreuil`, SORTIE<br>**Partielle —** Tu touches trop bas. Il part en boitant, laissant une trace de sang dans les fougères. → `distance: perdue`, `piste_sang: oui`<br>**Échec —** La flèche se plante dans la berge. Il est parti avant que tu aies rangé ta main. → flèche perdue, SORTIE *bredouille* |

**BEAT 4.2** *(si `piste_sang`)*

> La trace monte vers les fourrés. Facile à suivre. Trop facile.
>
> À dix pas du sang, dans la terre molle, il y a d'autres empreintes. Larges. Elles suivent la même piste que toi.

| Choix | Détail |
|---|---|
| **Examiner les empreintes** | *Coût :* un peu de temps.<br>**Franche —** Quatre doigts, des griffes qui mordent profond. Plus lourd qu'un chien, plus large qu'un loup. Tu n'as jamais vu ça de près, et tu ne tiens pas à commencer aujourd'hui. → bestiaire : **entrée inconnue en *estimé*** |
| **Continuer la piste** | *Coût :* temps, risque.<br>**Franche —** Tu trouves le chevreuil avant l'autre chose. → `gibier: chevreuil`, SORTIE<br>**Partielle —** Tu le trouves déjà entamé. Tu prends ce qui reste et tu ne t'attardes pas. → `gibier: partiel`, SORTIE |
| **Faire demi-tour** | *Coût :* la bête.<br>**Franche —** Tu redescends vers le village les mains vides, et tu ne le regrettes qu'à moitié. → SORTIE *bredouille* |

> **Ce que ce beat installe :** la première entrée *estimé* du bestiaire, obtenue sans combat, sur une créature que le joueur ne rencontrera que bien plus tard. Il apprend en trois lignes que **savoir se ramasse au sol**.

---

### BEAT 5 — La cloche

*Déclenché quelle que soit la sortie du beat 4. Aucun choix.*

> Tu es à mi-pente quand le son arrive.
>
> Un coup. Puis un autre. Puis sans s'arrêter.
>
> Tu connais cette cloche. Tu ne l'as jamais entendue.

→ **SORTIE UNIQUE** : enchaîne sur `VDG-001`.

> **Fonction :** la cloche a été posée à la deuxième phrase du beat 1 comme un détail de décor. Elle sonne ici sans qu'un mot d'explication soit nécessaire. **Zéro ligne de lore, effet maximal.**

---

### Version courte — runs suivants

Déclenchée automatiquement à partir du deuxième run. **~2 minutes.**

> Le jour se lève sur Val-de-Garde. Mathias est à la forge, Jonas sur un toit.
>
> Tu montes aux bois comme tous les matins.

- **Un seul choix conservé**, immédiatement : `flèches: 9` ou prendre le temps d'en tailler trois de plus
- Beat 4 joué en **version réduite** (4.1 uniquement, pas de piste de sang)
- Beats 2 et 3 **réduits** — la rencontre avec Jonas est conservée ; `voix_entendues` est fixé à 2 par défaut, pour que le joueur ne soit pas pénalisé de connaître déjà le village
- Beat 5 **identique**

> **Règle :** la version courte ne doit jamais désavantager le joueur. Elle retire de la découverte, pas de la ressource.

**RETOMBÉES (communes aux deux versions)** — `flèches` · `gibier` · `voix_entendues` · `jonas_situé` · `dette_mathias` · entrées de bestiaire acquises

---

## 5. `VDG-001` — La razzia

```
ID            : VDG-001
TITRE         : Ce qu'on peut encore prendre
POOL          : jalon
CONDITIONS    : sortie de VDG-002
MOMENT        : conditionné (jour)
TYPE          : majeure (7-9 beats)
BASCULE       : possible — sur la chaîne A uniquement
MORT          : impossible (§4.5)
```

### 5.1 Structure : storylet à moyeu

**Nouveau motif, réutilisable pour toute rencontre majeure.**

Un **moyeu** central redécrit la situation à chaque retour et propose les objectifs encore atteignables. Chaque objectif est une **chaîne** de 2 à 3 beats. Le moyeu n'est pas un menu : son texte change à chaque passage, parce que la situation empire.

```
BEAT 0 (lecture) → MOYEU ⇄ CHAÎNE A | B | C | D → SORTIE
```

### 5.2 L'horloge

**C'est la mécanique centrale. Le joueur ne choisit pas des objectifs : il court.**

| `temps` | État du village |
|---|---|
| 0-3 | La ligne tient |
| **4** | **La ligne cède** — les orques passent sur la place |
| 5-6 | Ils fouillent, ils cassent, ils avancent vers le bas du village |
| **7** | **Ils se retirent.** Fin de scène, quoi qu'ait fait le joueur |

Chaque beat de chaîne coûte **1 temps**. Chaque retour au moyeu est gratuit.

> **Deux objectifs, pas plus.** Une chaîne coûte 2 à 3 temps. Le joueur en boucle deux, parfois trois s'il a de la chance et de la préparation. Il y en a quatre.

> **Les orques se retirent d'eux-mêmes.** Jamais parce que le joueur a gagné. Le texte de sortie ne doit à aucun moment laisser croire qu'il a sauvé le village.

**ANCRAGE**

> Ils ne sont pas venus pour prendre le village. Ils le traversent.
>
> La rangée de maisons basses n'existe plus. Du côté du puits, une dizaine d'entre eux poussent vers la place. Une vingtaine d'hommes sont déjà tombés — il en reste une poignée qui tient la ligne, et qui tient pour rien d'autre que gagner du temps.
>
> La forge est fermée. Quelqu'un a barré la porte de l'intérieur.
>
> Ça ne tiendra pas longtemps.

**ÉTAT** — `temps: 0` · `ligne: tient` · `alerte: non repéré` · `blessure: aucune` · `charge: vide` · `flèches:` hérité de VDG-002 · `jonas_situé:` hérité de VDG-002

---

### 5.3 Le moyeu

**Trois versions du texte, selon `temps`.**

**`temps 0-3`**

> La ligne tient encore. Tu as peut-être le temps de deux choses. Peut-être.

**`temps 4-6`**

> La ligne a cédé. Ils sont sur la place maintenant, et ils ne se pressent pas. L'un d'eux retourne une charrette d'un coup d'épaule, pour voir ce qu'il y a dessous.
>
> Ce que tu n'as pas fait, tu ne le feras plus.

**`temps 7`** → SORTIE automatique.

**Options proposées au moyeu** *(chaque chaîne disparaît une fois accomplie ou devenue impossible)*

| | Chaîne | Disponible |
|---|---|---|
| **A** | Rejoindre la ligne | `temps ≤ 3` |
| **B** | Atteindre la forge | toujours |
| **C** | Le toit des Ancel | toujours |
| **D** | La réserve du bas | toujours |
| **E** | Partir maintenant | toujours → SORTIE |

---

### 5.4 Chaîne A — Rejoindre la ligne

*2 à 3 beats · seule chaîne à bascule tactique · indisponible après `temps 3`*

**A.1**

> Ils sont sept, épaule contre épaule, en travers de la rue. Devant eux, les orques ne chargent pas : ils cognent, ils reculent d'un pas, ils recommencent. Méthodiques.

| Choix | Détail |
|---|---|
| **Tirer depuis le toit du puits** | *Prérequis :* `flèches ≥ 3`. *Coût :* 1 temps, 3 flèches.<br>**Franche —** Trois flèches, trois corps. La ligne reprend un pas. Un des hommes lève la tête vers toi et ne dit rien. → `ligne:` tient un beat de plus<br>**Partielle —** Deux touchent. La troisième se perd. Ils t'ont vu. → `alerte: repéré` |
| **Prendre place dans la ligne** | *Coût :* 1 temps.<br>**Franche —** Tu te glisses entre deux hommes que tu connais depuis l'enfance. Personne ne te demande ce que tu fais là. → **bascule possible** (voir A.2) |
| **Crier de reculer vers la forge** | *Coût :* 1 temps.<br>**Franche —** Trois d'entre eux entendent. Les autres ne bougent pas. → 3 survivants garantis, `ligne: cède` immédiatement<br>**Partielle —** Un seul se retourne. Il meurt en se retournant. |

**A.2 — Bascule tactique** *(si « prendre place dans la ligne »)*

Les derniers soldats deviennent des **unités temporaires** (§4.6). L'effectif atteint 3, ce qui autorise une escarmouche.

| | |
|---|---|
| Échelle | Escarmouche — 2 zones, 4 tours, 2 points de commandement |
| Tes unités | Tomas + 3 soldats *(autonomes, redressables à 1 point, ordres simples)* |
| Ennemis | 5 orques — 3 Rôdeurs C1, 2 Cogneurs B1 |
| Objectif | **Tenir 4 tours.** Pas vaincre |
| Issue | **Perdue d'avance.** La ligne cède au tour 4 quoi qu'il arrive |

> **Fonction :** démonstration du système tactique, jamais le chemin principal. Le joueur découvre les ordres permanents, les points de commandement et les unités temporaires dans une situation où **il ne peut pas gagner** — donc où il ne peut pas non plus rater son apprentissage.

**A.3** — Repli forcé vers le moyeu. `temps +1`, `ligne: cède`, blessure légère probable.

**Retombées de la chaîne A** — `survivants: +2 à +4` · un soldat nommé survit et réapparaîtra sur la route comme **témoin** · `flèches` consommées · aucune information sur Jonas · aucune ressource

---

### 5.5 Chaîne B — Atteindre la forge

*3 beats · c'est le chemin qui rassure et qui équipe*

**B.1**

> Entre toi et la forge, il y a la rue, ou les jardins, ou les toits bas des remises.

| Choix | Détail |
|---|---|
| **Par la rue, vite** | *Coût :* 1 temps.<br>**Franche —** Tu cours. Personne ne te voit. → B.3 directement<br>**Partielle —** On te voit. On ne te suit pas encore. → `alerte: repéré`, B.2 |
| **Par les jardins** | *Coût :* 1 temps.<br>**Franche —** Les haies te cachent jusqu'au mur de la forge. → B.2 sans alerte |
| **Par les toits des remises** | *Prérequis :* `blessure: aucune`. *Coût :* 1 temps.<br>**Franche —** Tu passes au-dessus de tout. Tu vois le village entier depuis là-haut, et tu voudrais ne pas l'avoir vu. → B.3 directement, `voix_entendues` sans objet mais **lecture perceptive complète** du village<br>**Échec —** Une tuile cède. Tu tombes mal. → `blessure: légère`, B.2 |

**B.2**

> Un orque est à l'angle de la maison Ancel, dos tourné. Il n'a rien vu. La forge est à vingt pas derrière lui.

| Choix | Détail |
|---|---|
| **Le frapper maintenant** | *Coût :* 1 temps, bruit.<br>**Franche —** Il tombe sans un bruit. Tu ne savais pas que tu pouvais encore faire ça. → B.3<br>**Partielle —** Il tombe, mais pas assez vite. Un autre a tourné la tête. → `alerte: repéré`, B.3 |
| **Attendre qu'il passe** | *Coût :* 1 temps.<br>**Franche —** Il s'éloigne vers la place. Tu traverses. → B.3<br>**Partielle —** Il ne passe pas. Il appelle. Un second arrive. → B.2bis, deux ennemis entre toi et la porte |
| **Reculer et tenter la rue** | *Coût :* 1 temps.<br>**Franche —** Plus long, plus exposé, mais dégagé. → B.3 |

**B.3 — La porte**

> Tu frappes trois coups. Quelque chose racle de l'autre côté, puis la voix de Mathias, très bas, tout près du bois :
>
> « Ils sont vingt là-dedans. Femmes, gosses. Ils n'ont pas fait un bruit depuis que j'ai barré. Les orques passent devant sans regarder. »
>
> Un silence.
>
> « Ne l'ouvre pas. »

| Choix | Détail |
|---|---|
| **Prendre ce qui est dehors** | *Coût :* 1 temps.<br>**Franche —** L'appentis n'est pas barré. Pointes, lame de rechange, corde. Tu remplis ce que tu peux. → `charge: équipement`, `flèches +4` |
| **Rester une minute** | *Coût :* 1 temps.<br>**Franche —** Vous parlez à travers la porte, sans vous voir. Il te dit où il ira quand ce sera fini. Tu lui dis où tu seras. → `rdv_mathias: oui` — les retrouvailles après la razzia se font sans délai ni recherche |
| **Repartir tout de suite** | *Coût :* 0 temps.<br>**Franche —** Tu ne réponds rien. Il n'attend pas de réponse. |

> **Fonction de B.3 :** c'est ici que le joueur apprend que les cachés sont hors de danger — **de la bouche de Mathias, jamais du narrateur** (§6.8 de la spec de design). Sans cette réplique, partir ressemble à une lâcheté, et le jeu aurait l'air de fournir une excuse.

**Retombées de la chaîne B** — `flèches +4` · équipement de base · `rdv_mathias` · certitude sur les cachés

---

### 5.6 Chaîne C — Le toit des Ancel

*2 beats si `jonas_situé: oui`, 3 sinon*

> **C'est ici que se paie une question posée à la forge au matin.** Un joueur qui a demandé à Mathias où était Jonas sait où aller. Les autres cherchent.

**C.0** *(uniquement si `jonas_situé: non`)*

> Tu ne sais pas où il est. Il pouvait être n'importe où.

| Choix | Détail |
|---|---|
| **Chez lui** | *Coût :* 1 temps. **Franche —** La porte est ouverte, la maison vide, le lit fait. Il n'y est pas venu de la matinée. |
| **Demander à quelqu'un** | *Coût :* 1 temps. **Franche —** Une femme qui court te crie qu'elle l'a vu sur un toit, du côté des Ancel. → C.1<br>**Partielle —** Personne ne s'arrête. → 1 temps perdu pour rien |

**C.1**

> L'échelle est encore contre le mur. Le chaume est à moitié posé, la botte défaite, les liens en travers.
>
> Il n'y a personne sur le toit. Il n'y a personne en bas.

| Choix | Détail |
|---|---|
| **Monter voir** | *Coût :* 1 temps.<br>**Franche —** De là-haut, tu vois toute la rue. Et tu vois trois orques, en bas, qui ne cassent rien et ne fouillent rien. Ils avancent vite, tous les trois dans la même direction, vers le sud. Ils suivent quelque chose. → `piste_jonas: sud`, **indice** `poursuite_organisée`<br>**Partielle —** Tu montes, tu regardes, tu ne comprends pas ce que tu vois. Trois d'entre eux partent vers le sud sans rien détruire. → `piste_jonas: sud` |
| **Lire le sol** | *Coût :* 1 temps.<br>**Franche —** Des traces de pas, les siennes, qui partent en courant. Et d'autres par-dessus, plus larges. Beaucoup plus larges. Elles ne vont pas vers la place : elles vont au sud, hors du village. → `piste_jonas: sud` |
| **Crier son nom** | *Coût :* 1 temps, bruit.<br>**Franche —** Rien. Rien du tout. → `alerte: repéré`, aucune information |

**Retombées de la chaîne C** — `piste_jonas: sud`, **seule source d'information sur sa disparition** · l'indice `poursuite_organisée` posé à vue : des orques qui poursuivent une cible précise sans rien détruire ne se comportent pas comme des bêtes

> Sans cette chaîne, Jonas disparaît **sans aucune piste** et le fil narratif s'ouvre bien plus tard, par les Marchands. Ce n'est pas un blocage : c'est un retard.

---

### 5.7 Chaîne D — La réserve du bas

*2 beats · le chemin pauvre en récit, riche en matériel*

**D.1**

> Le cellier commun est au bas du village, à l'écart de la poussée. Personne n'y est allé. Personne n'y pense.

| Choix | Détail |
|---|---|
| **Charger ce que tu peux porter** | *Coût :* 1 temps.<br>**Franche —** Grain, lard, deux outres. Le sac pèse trop et tu le prends quand même. → `charge: vivres`<br>**Partielle —** Tu prends trop. Tu devras jeter la moitié sur la route. → `charge: vivres réduits` |
| **Charger et prévenir** | *Coût :* 2 temps.<br>**Franche —** Tu cries à deux familles cachées derrière le cellier de prendre ce qu'elles peuvent et de filer par le bas. Elles t'écoutent. → `charge: vivres réduits`, `survivants +4` |
| **Chercher un chariot** | *Coût :* 1 temps.<br>**Franche —** Il y en a un, la ridelle cassée, mais il roule. → `charge: vivres` ×2, mais **vitesse réduite** sur la route : un chariot ne passe pas partout |

**Retombées de la chaîne D** — ressources de départ pour la route · aucune information · aucun survivant, sauf option 2

---

### 5.8 Sorties

| Sortie | Déclencheur | Épilogue |
|---|---|---|
| **Le retrait** | `temps: 7` | Ils s'en vont comme ils sont venus, sans se presser, sans se retourner. Personne ne les poursuit. Il n'y a plus personne pour les poursuivre. |
| **Partir avant la vague** | Chaîne E à `temps ≤ 2` | Tu prends la route du nord pendant qu'ils sont encore sur la place. Tu es le premier sur le chemin. Les patrouilles de la Couronne sont encore à leur poste — pour quelques heures. → `route: en tête`, `patrouilles: en place` |
| **Partir après** | Chaîne E à `temps ≥ 3` | Tu pars au milieu des autres. Il y a déjà du monde sur le chemin. → `route: dans le flot` |
| **Fuite forcée** | `blessure: grave` | Tu ne décides pas de partir. Tes jambes décident. Tu reprends conscience de toi-même bien plus bas, sans savoir comment tu y es arrivé. → **départ appauvri**, aucune chaîne supplémentaire |

> **Rappel §4.5 :** aucune mort, aucune capture. Les orques sous emprise ne font pas de prisonniers, et la scène enseigne — elle ne punit pas.

> **Règle : aucune sortie ne rend zéro.** Même « partir avant la vague » rapporte une position et une fenêtre de patrouilles. Sûr et pauvre est une option légitime ; vide ne l'est pas.

### 5.9 Après la razzia

*Scène courte, sans choix, qui clôt l'ouverture.*

- Les cachés sortent de la forge. **Ils survivent** — et serviront de témoins sur le comportement des orques
- **Tous les hommes de la ligne sont morts**
- Tomas et Mathias survivent **parce qu'ils n'étaient pas dans la ligne**. Personne ne les désigne pour aller prévenir la Couronne : il ne reste personne d'autre
- **Jonas n'est ni parmi les morts, ni parmi les vivants.** Son échelle est toujours contre le mur, le chaume à moitié posé

> **Mathias devient compagnon.** Le message de permadeath (§6.9 de la spec de design) s'affiche ici : **hors fiction, court, non modal, une seule fois, sur l'écran de transition — jamais pendant la scène.**

**RETOMBÉES GLOBALES** — `survivants` · `charge` · `flèches` · `piste_jonas` · `rdv_mathias` · `route` · indices `poursuite_organisée` · compagnon Mathias · flag `val_de_garde_frappé`

---

## 6. `TN-002` — Le Camp aux Feux

```
ID            : TN-002
TITRE         : Le Camp aux Feux
POOL          : jalon
ZONE          : La Crête Brûlée (Terres Noires)
CONDITIONS    : chapitre 1, contre-attaque de la Couronne engagée
MOMENT        : variante (jour / nuit)
TYPE          : majeure
BASCULE       : systématique — sauf chaîne de contournement
```

> **C'est le modèle de bascule narratif → tactique.** Il démontre : la phase d'approche qui écrit l'état de départ du combat, l'échelle **bataille**, les unités temporaires de la Couronne, les interruptions narratives en cours de bataille, et l'option non létale posée sans explication.

**ANCRAGE**

> Le camp est en fond de cuvette, à l'abri du vent. Une palissade de bois brut, montée vite et bien. Des feux — quatre, cinq, qui brûlent en plein jour sans raison apparente.
>
> On les voit d'ici parce qu'on est plus haut qu'eux. C'est la seule chose qu'on a sur eux.
>
> Derrière toi, la colonne de la Couronne s'est arrêtée. Vairon attend.

**ÉTAT** — `alerte: non repéré` · `connaissance_camp: aucune` · `moment:` jour ou nuit · `fatigue:` hérité · `unités_couronne: 2` disponibles

---

### 6.1 Phase d'approche — narrative

*3 beats. Chaque choix écrit dans l'état de départ de la bataille.*

**A.1 — Depuis la pente**

| Choix | Détail |
|---|---|
| **Observer longuement** | *Coût :* du temps — Vairon s'impatiente.<br>**Franche —** Tu comptes neuf. Quatre qui dorment sous les abris, trois près des feux, un qui fait le tour de la palissade. Et un neuvième qui ne fait rien : debout au centre, un mât ferré planté à côté de lui. Il ne s'assied pas. → `connaissance_camp: complète`, bestiaire en *estimé* sur toutes les unités<br>**Partielle —** Tu en comptes sept et tu t'arrêtes là : Vairon te rappelle. → `connaissance_camp: partielle` |
| **Descendre reconnaître la palissade** | *Prérequis :* `moment: nuit` ou compagnon discret. *Coût :* risque.<br>**Franche —** Elle est montée sur pieux, sans fossé. Deux sections tiennent mal. → `brèche_connue: oui`<br>**Partielle —** Un chien, ou quelque chose qui aboie comme un chien. → `alerte: repéré` |
| **Rejoindre Vairon et décider** | *Coût :* aucun. → A.2 |

**A.2 — Le plan**

> Vairon ne descend pas de cheval pour parler. « Ils sont neuf. On est vingt. Je ne vois pas où est la discussion. »

| Choix | Détail | Écrit dans l'état tactique |
|---|---|---|
| **Assaut frontal** | Il approuve sans hésiter. Les hommes descendent en ligne. | Initiative ennemie · départ en `La Palissade` · +2 unités Couronne |
| **Encerclement** | *Prérequis :* `connaissance_camp: complète`. Il grogne, puis cède. | Initiative joueur · départ réparti sur `La Pente` et `Le Ravin` · +2 unités Couronne |
| **Infiltration** | *Prérequis :* `moment: nuit`. « Tout seul ? » Il te regarde longtemps. « Deux heures. » | Initiative joueur · départ en `Les Abris` · **0 unité Couronne** · 2 ennemis commencent hors de combat |
| **Contourner le camp** | Vairon refuse pour la colonne. Toi, tu peux passer. | → SORTIE *Contourné*, aucune bataille |

**A.3 — L'approche**

*Un seul jet, dont le palier décide du dernier paramètre.*

| Palier | Effet sur la bataille |
|---|---|
| **Franche** | `alerte: non repéré` — 1 tour entier avant leur réaction |
| **Partielle** | `alerte: repéré au contact` — ils réagissent immédiatement, sans être prêts |
| **Échec** | `alerte: alertés` — ils sont en position, le porteur de totem au centre |

---

### 6.2 État de départ tactique — table de correspondance

> **C'est ce tableau qui matérialise le pont entre les deux modes (§4.2 de la spec de design). Tout storylet à bascule doit en fournir un.**

| Paramètre | Source narrative |
|---|---|
| Initiative | Choix du plan (A.2) |
| Zone de départ | Choix du plan (A.2) |
| Unités temporaires | Choix du plan (A.2) |
| Tour de grâce | Palier d'approche (A.3) |
| Unités ennemies visibles | `connaissance_camp` (A.1) |
| Brèche exploitable | `brèche_connue` (A.1) |
| Fatigue de départ | Héritée du trajet et des POI précédents |

**Bien jouer l'approche, c'est commencer la bataille avec un avantage réel et chiffré.** Mal la jouer ne la rend pas impossible — elle la rend chère.

---

### 6.3 La bataille

| | |
|---|---|
| Échelle | **Bataille** — 5 zones, 8+ tours, 4 points de commandement / tour |
| Tes unités | Tomas + compagnons (jusqu'à 5) + 0 à 2 unités Couronne temporaires |
| Ennemis | **9** — budget de menace ≈ 17 (`danger:4`) |

**Zones nommées** *(affichées côte à côte, aucune grille)*

| Zone | Particularité |
|---|---|
| **La Pente** | Hauteur — portée longue, mauvaise défense au contact |
| **La Palissade** | Entrée est — goulot, deux sections fragiles si `brèche_connue` |
| **Les Feux** | Centre — le porteur de totem s'y tient |
| **Les Abris** | Ouest — les dormeurs, `confiné` |
| **Le Ravin** | Sud — sortie ; toute unité qui l'atteint quitte le combat |

**Composition ennemie**

| Unité | Nombre | Menace | Zone de départ |
|---|---|---|---|
| Rôdeur C1 | 4 | 4 | Les Feux, La Palissade |
| Cogneur B1 | 2 | 4 | La Palissade |
| Cogneur B2 · **Meneur** | 1 | 3 | La Palissade |
| **Porteur de totem A1** | 1 | 4 | Les Feux |
| Rôdeur C2 | 1 | 1,5 | Les Abris |

**Objectifs**

| | Condition |
|---|---|
| **Principal** | Le camp est à toi — aucun ennemi debout hors du Ravin |
| **Secondaire** | Abattre le porteur de totem avant le tour 5 |
| **Défaite** | Toutes tes unités hors de combat, ou repli volontaire |

---

### 6.4 Interruptions narratives

*Propres à l'échelle bataille. Le texte s'insère entre deux tours, sans choix, sauf mention contraire.*

**Quand le Meneur tombe** — La section de palissade qu'il tenait se disloque. Deux Rôdeurs reculent d'eux-mêmes vers Les Feux. *(Effet mécanique : perte d'aura sur un bloc.)*

**Quand le porteur de totem tombe** — **interruption obligatoire, avec choix.**

> Le mât tombe avant lui. Le fer sonne contre une pierre.
>
> Et tout s'arrête.
>
> Pas un cri, pas une débandade. Ils s'arrêtent, simplement, là où ils sont. Celui qui allait frapper ne frappe pas. Celui qui courait s'immobilise en plein élan.
>
> Une seconde entière. Peut-être deux.
>
> Puis ils reprennent, exactement comme avant.

| Choix | Détail |
|---|---|
| **En profiter** | *Coût :* 1 point de commandement.<br>Tes unités agissent librement pendant un tour supplémentaire. |
| **Les laisser partir vers le Ravin** | *Coût :* aucun. L'objectif principal est atteint sans un mort de plus. Vairon ne comprend pas. Il le dit. → indice `laissés_partir` |
| **Ne rien faire** | La seconde passe. |

> **Fonction :** l'indice le plus important du chapitre 1 est délivré **à l'intérieur d'une bataille**, au moment où le joueur est le moins disposé à l'analyser. Et l'option non létale est posée ici, sans aucune justification — voir `SPEC_MONDE` §5. Le joueur qui l'a choisie sans savoir pourquoi s'en souviendra au chapitre 3.

**Au tour 6, si le camp tient encore** — Vairon fait sonner le rappel. Tu peux l'ignorer. Il s'en souviendra.

---

### 6.5 Sorties

| Sortie | Épilogue | Retombées |
|---|---|---|
| **Camp pris** | Les feux brûlent toujours. Personne n'est venu les éteindre depuis le début. | Réputation Couronne · ressources du camp · bestiaire en *exact* |
| **Camp pris, cher** | Tu comptes les tiens avant de compter les leurs. | Idem, moins les pertes · permadeath possible sur un compagnon |
| **Laissés partir** | Ils s'en vont vers le sud sans se retourner. Vairon note quelque chose et ne te le montre pas. | Objectif atteint · **réputation Couronne en baisse** · indice `laissés_partir` |
| **Repli** | La colonne remonte la pente. On ne reviendra pas ce soir. | Fatigue, blessures, POI en `repéré` — le camp sera renforcé |
| **Contourné** | Tu passes au nord de la cuvette. Tu entends les feux crépiter longtemps après ne plus les voir. | Temps · aucun butin · aucune perte |

**RETOMBÉES GLOBALES** — bestiaire orque · indices `totem_anomalie` et `laissés_partir` · réputation Couronne · `camp_aux_feux: pris | tenu | contourné` · accès facilité à La Vallée Fumante si le camp est pris

---

## 7. Ce qui reste à écrire

Les quatre storylets modèles sont écrits. Ils couvrent l'ensemble des cas de figure :

| Modèle | Ce qu'il démontre |
|---|---|
| `SLT-FOR-012` | Pool recombinable, filtrage par tags, lecture perceptive |
| `TN-001` | Jalon narratif, indices posés à vue |
| `VDG-002` | Ouverture, deux versions, enseignement des systèmes |
| `VDG-001` | Storylet à moyeu, horloge, escarmouche optionnelle |
| `TN-002` | Bascule tactique, échelle bataille, interruptions narratives |

**Prochaine étape : production en volume.** 60 à 100 storylets recombinables, tagués selon §8.11 de la spec de design, en respectant la répartition 1 tag ~60 % / 2 tags ~30 % / 3+ ~10 %.

**Note sur la razzia (`VDG-001`) :** Tomas revient **seul** au village. Les chemins *forge*, *Jonas*, *réserve* et *fuite* sont donc narratifs par construction — aucune bascule n'est possible, sans avoir à l'interdire.

Seul le chemin **tenir la ligne** peut basculer : les derniers soldats de Val-de-Garde deviennent des **unités temporaires** (§4.6), ce qui porte l'effectif à 3 et autorise une escarmouche — 2 zones, 4 tours, 2 points de commandement. Une escarmouche perdue d'avance, qui sert de démonstration du système sans jamais être le chemin principal.
