# Les Terres Voilées — Monde et récit

**Version :** 2.0
**Statut :** source de vérité — lore
**Dernière mise à jour :** 15 septembre 2026

> Ce fichier est le compagnon de `SPEC_DESIGN_terres-voilees.md`, qui gouverne les **systèmes**. Celui-ci gouverne le **monde et le récit**. En cas de contradiction sur un système, la spec de design prime.
>
> **Avertissement de rédaction :** ce document contient la résolution complète des deux twists. Il ne doit jamais être cité, résumé ou paraphrasé dans du contenu destiné au joueur avant le chapitre où la révélation est prévue.

---

## 1. Le héros

| | |
|---|---|
| Âge | 25 ans |
| Passé | Ancien soldat, engagé à 17 ans. Plus sous les armes depuis la paix |
| Aujourd'hui | Chasseur à Val-de-Garde |
| Nom | **Fixe**, pas de personnalisation |

**Décision actée :** pas de nom personnalisable. Le héros a un passé défini, deux frères et un métier — ce n'est pas un avatar vide. Des personnages capables de prononcer son nom valent mieux qu'un texte qui l'évite.

**Noms arrêtés :** **Tomas** (héros, 25 ans) · **Mathias** (20 ans, forgeron) · **Jonas** (28 ans, disparu).
Trois noms de la même famille sonore, cohérents avec le registre du monde.

### Mathias — 20 ans, forgeron

Premier compagnon, obtenu à la fin de l'ouverture. **Mortel dès le départ, permadeath sans exception.**

> Conséquence d'écriture : toute scène impliquant Mathias exige une variante sans lui.

Risque de design identifié : ne jamais le rendre **mécaniquement indispensable**, sa mort deviendrait une fin de run de fait.

### Jonas — 28 ans, **deuxième compagnon principal**

**Au matin de la razzia, il est au village et parfaitement ordinaire.** Il doit être vu vivant, sans mystère ni sous-entendu : un adieu banal rend son absence bien plus lourde qu'un adieu chargé de sens.

> **Règle d'écriture :** ne jamais suggérer que Jonas cachait quelque chose. Sa disparition est un **accident tragique**, pas une énigme préparée. Toute ligne laissant entendre qu'il « ne disait plus où il allait » lance le joueur sur une fausse piste qui ne mène nulle part.

Disparaît pendant la razzia. Pris à part par plusieurs orques, pourchassé jusqu'à un point marchand éloigné.

**Il est vivant, et il est recrutable — retrouvé à la fin du chapitre 1.** Une caravane l'a ramassé au bord de la route, ouvert au flanc. Ils l'ont soigné, **et ils l'ont mis sur son compte** : les Marchands ne font pas de charité. Il est resté parce qu'il devait, et parce qu'il croyait tout le monde mort — personne n'est venu lui dire que la forge avait tenu.

> **Le récupérer est une transaction.** Il faut solder la dette : payer, négocier un travail, ou l'emmener de force et perdre la réputation Marchands.

**Anomalie portée : le sel** (voir §5).

Fiche complète dans `SPEC_COMPAGNONS`.

---

### Le noyau : les trois frères

**Tomas, Mathias et Jonas réunis sont le cœur émotionnel du jeu.** Ils occupent deux emplacements d'équipe sur quatre — obtenus par le récit, pas par l'optimisation.

Ce sont eux qui portent la magie à partir du chapitre 2 : *Révéler* pour Tomas, *Affermir* pour Mathias, *Lier* pour Jonas.

> **Le cas Jonas est chargé.** Le **lien** est exactement le nom du rite qui a asservi les orques. Il en utilise une version minuscule, consentie, entre deux frères — pendant des heures, sans le savoir. Au chapitre 3, le joueur comprend qu'il s'en sert depuis le début.

---

## 1 bis. Les autres compagnons

**Règle d'écriture : chaque compagnon porte une anomalie, et la raconte sans la comprendre.**

| Compagnon | Anomalie portée |
|---|---|
| **Renn**, 31 ans, déserteur | La relève qui n'arrive jamais |
| **Alix**, 34 ans, trappeuse | Le gibier a quitté la forêt avant que les hommes ne sachent rien |
| **Constant**, 24 ans, novice de l'Ordre | Les frères ne passent plus |
| **Jonas** | Le sel, et qui l'a acheté |

**Les quatre anomalies du village ont ainsi un porteur.** Le joueur assemble la vérité sans le savoir : elle marche à côté de lui.

**Renn** a quitté une garnison frontalière vidée de ses hommes. Il déserte d'une paix, pas d'une guerre. Puis la razzia a frappé le village voisin du sien, où il se trouvait.

**Alix** ne se recrute pas, elle se croise. Elle suit une piste qui va dans la même direction, et elle part quand les routes divergent.

**Constant** a quitté seul son chapitre pour comprendre pourquoi les frères ont cessé leurs tournées. Personne ne le lui a ordonné — et personne ne le lui a interdit non plus, ce qui l'inquiète davantage. **Au twist 1, il devient une charge** : le garder coûte de la réputation Couronne. Le twist cesse d'être une information pour devenir une question — *est-ce que Constant savait ?*

Fiches complètes dans `SPEC_COMPAGNONS`.

---

## 1 ter. Val-de-Garde après la razzia — la base

**Les orques ont fait une razzia, pas une occupation. Ils sont repartis.** Le village est debout, abîmé, avec sa vingtaine de survivants sortis de la forge.

C'est donc **la base** : les compagnons écartés y vont, l'équipe s'y recompose, l'équipement s'y répare quand Mathias y est.

> Le joueur retourne sans cesse dans le village qu'il n'a pas su défendre. Il n'y a rien à ajouter pour que ça pèse.

---

## 2. Les quatre factions

| Faction | Territoire | Rôle |
|---|---|---|
| **La Couronne** | Terres du royaume | Camp du héros. Doit rester **aimée** |
| **Les Orcs** | Les Terres Noires | Ennemi apparent. **Victimes réelles** |
| **L'Ordre** | Les Terres Scellées | Fausse piste du twist 1 |
| **Les Marchands** | Les Terres Libres | Neutres |

**Réputation :** une valeur par faction, plus des drapeaux d'actes marquants. Matrice d'opposition asymétrique — monter chez les uns fait baisser chez les autres. **Les Marchands sont neutres dans la matrice** : gagner leur estime ne coûte rien ailleurs, ce qui les rend compatibles avec tous les autres.

### Les Orcs

**Ils ne parlent aucune langue humaine.** Le barrage de langue est structurant : il rend leur barbarie apparente crédible, empêche toute négociation au chapitre 1, et fait que la carte des Terres Noires n'est qu'une collection d'**exonymes** — des noms que les hommes leur ont donnés. Après le twist, toute la carte se relit autrement.

### L'Ordre

**Aucun lexique chrétien** (voir spec de design §8.12). Identité portée par ses marqueurs visuels : la veille, le scellement, les portes closes, les statues, le feu entretenu, les serments.

Pratique sur lui-même un **rite de lien** : consenti, sur un initié préparé, il retire la peur, le doute et l'hésitation, et produit un homme inébranlable. Le **scellement** que le joueur voit en combat (Maître Veilleur) en est la version minuscule.

### Les Marchands

Neutres, non agressifs, cherchent toujours l'échange. Deviennent des ennemis redoutables s'ils sont menacés. Leur force vient de l'argent : meilleur équipement, combattants recrutés au loin.

---

## 3. Chronologie

| Période | Événement |
|---|---|
| Très ancien | Un **fragment** de la source magique des Terres Noires sort du territoire orc et parvient à l'Ordre |
| Il y a 8 ans | La Couronne signe la paix avec les Terres Noires. Le héros quitte l'armée |
| Récemment | **L'échange** entre la cabale et une faction interne de l'Ordre |
| Peu après | Le rituel est lancé. Les orcs deviennent incontrôlables |
| **Jour 1 du jeu** | **La razzia sur Val-de-Garde** |

---

## 4. Le mécanisme central

### La source et le fragment

Une **source magique majeure** se trouve loin dans les Terres Noires. L'Ordre n'y a jamais accédé : il détient un **fragment** qui en provient, sorti du territoire orc il y a très longtemps.

Ce fragment résout plusieurs problèmes d'un coup :

- Le rituel est lancé **à travers le fragment**, accordé à la source — il porte donc à distance, sans que personne n'aille sur place
- La cabale sait où se trouve la source **parce qu'elle a manipulé le fragment**
- Elle veut la source entière parce qu'un fragment ne suffit pas à s'émanciper de l'Ordre
- **Rompre l'emprise exige de détruire le fragment ou d'atteindre la source** — le chapitre 3 converge donc naturellement, sans raccorder deux fils artificiellement

### Le mobile de la cabale

S'**émanciper du contrôle magique de l'Ordre** sur la Couronne. Pour cela : s'emparer de la source des Terres Noires.

Mais une invasion sans prétexte est impossible — les nobles ne la financeraient pas, l'Ordre ne la tolérerait pas, les Marchands ne prêteraient pas. **Si les orcs attaquent en premier, tout se débloque.**

### L'échange

Une faction interne à l'Ordre transmet le **rite de lien**, contre la restitution d'une relique historique de l'Ordre détenue de longue date par la Couronne.

**Ce qu'ils croient céder :** un moyen de rendre les soldats de la Couronne incapables de céder au combat. Défensif, honorable, presque pieux.

**Ce que la cabale en fait :** elle l'applique **à un peuple entier, sans consentement, à travers un fragment de sa propre source sacrée.**

> **Le point de bascule :** le rite ne peut pas lier ce qui ne prête pas serment. Il ne reste alors que ce qu'il fait d'abord — retirer la peur, le doute, l'hésitation. Chez qui n'a rien accepté, cela ne produit pas de la discipline. Cela produit de la sauvagerie.
>
> **Personne n'a conçu l'agressivité. C'est ce qui reste quand on retire tout le reste.**

Répartition des culpabilités :

| | Culpabilité |
|---|---|
| **L'Ordre** (faction interne) | **Imprudence**, pas cruauté — trompé sur l'usage |
| **La cabale** | **Intention.** Elle voulait une guerre, elle en a eu une vraie |

### Le dérapage

Ils voulaient une incursion **limitée et contrôlable**, à repousser héroïquement. Ils obtiennent une invasion massive : trop d'orcs touchés, emprise trop durable. Ils ne maîtrisent pas cette magie — ils l'ont employée une fois, mal.

**Val-de-Garde n'a jamais été une cible militaire :** un village frontalier **jugé sacrifiable** pour que le prétexte soit crédible.

### Le piège

Rompre le sortilège exigerait d'avouer l'avoir lancé. La cabale a donc besoin que **la guerre continue** — et doit empêcher toute enquête, toute négociation, tout interrogatoire de prisonnier orc, toute implication de l'Ordre dans l'analyse du phénomène.

### Pourquoi les orcs s'arrêtent quand le totem tombe

Personne ne tient l'autre bout du lien : les orcs ne sont asservis **à personne**. Faute de berger, ils ont reconstitué eux-mêmes un point d'ancrage — le totem. Quand il tombe, ils ne fuient pas, ne se débandent pas : **ils s'arrêtent**, une seconde, désorientés.

---

## 5. Le double retournement

| Étape | Ce que croit le joueur |
|---|---|
| Ouverture | Les orcs sont des bêtes. La Couronne nous protège |
| Razzia et route | Des **anomalies** chez les orcs. Rien d'explicable |
| Contre-attaque dans les Terres Noires | On découvre qu'ils sont **ensorcelés** |
| **Twist 1** | L'Ordre est coupable — il détient ce savoir |
| Chapitre 2, affrontement de l'Ordre | Écrasement réel : capture, pertes |
| **Twist 2** | **La cabale de la Couronne.** Nos propres chefs |

**Règle de calendrier :** la découverte du sortilège comme *fait nommé* vient de l'Ordre. Avant cela, le joueur ne voit que des **anomalies**, jamais une explication.

### La contre-attaque du chapitre 1

La Couronne annonce une offensive punitive sur le territoire orc. **Objectif caché : atteindre la source.** C'est ce qui explique que l'expédition s'enfonce si loin au lieu de se contenter de repousser.

### La Couronne doit rester aimée

Le joueur doit s'y sentir pleinement intégré, protégé, légitime dans sa vengeance. **Aucun dysfonctionnement visible, aucune raison de se méfier.** Un joueur loyal jusqu'au bout est infiniment plus dévastable qu'un joueur méfiant.

Que Val-de-Garde n'ait pas été défendu doit passer pour une évidence tragique : attaque soudaine, village isolé, renforts trop loin. **Aucune faute — juste la guerre.**

### Règle des indices

- Un indice décrit un **fait observable**, jamais une interprétation
- Chaque indice possède une **explication innocente immédiatement disponible**
- Un indice qui suggère une **volonté** est trop lisible

**Indices en place :**

| Indice | Lecture innocente | Réalité |
|---|---|---|
| Le totem orc et l'arrêt d'une seconde | Effet de moral | Le relais du lien se rompt |
| Le scellement des Maîtres Veilleurs | L'Ordre a ce pouvoir | Version minuscule du même rite |
| Les forges orques qui brûlent sans arrêt | Préparatifs de guerre | Une industrie, pas une horde |
| Le Marécage aux Chaînes | Cruauté orque | À relire après le twist |
| La relève qui n'arrive pas, l'Ordre absent | Désorganisation de guerre | Le plan en cours |
| **Le sel a pris un tiers avant l'hiver** | La Couronne ravitaille ses garnisons, c'est son travail | **On s'approvisionne pour une campagne longue — avant que les orques n'attaquent** |

> **Pourquoi le sel.** Sans conservation au froid, c'est la seule façon de nourrir une armée en campagne pendant des mois. Un prix qui monte d'un tiers signifie que quelqu'un en achète massivement. **Et la date compte plus que le prix : avant l'hiver, donc avant la razzia.**
>
> Révélé en trois temps, sans jamais être expliqué : la plainte d'un marchand à l'ouverture · un prix qui a encore monté sur la route · puis Jonas, aux retrouvailles — *« Des gens de la Couronne sont venus deux fois avant l'hiver. Ils ont payé d'avance. Ils ont tout pris. »*

### Le dilemme moral

Les orcs étant des victimes, **des options non létales doivent exister dès le début** — fuir, neutraliser, épargner, capturer — sans que le joueur comprenne pourquoi elles sont là. Sinon le twist devient une punition arbitraire au lieu d'une révélation.

**C'est le principal moteur de rejouabilité : rejouer en sachant.**

---

## 6. La razzia sur Val-de-Garde

Déroulé et choix : voir `SPEC_DESIGN_terres-voilees.md` §6.8.

Faits actés :

- Les orcs **n'incendient pas** le village, ils le **traversent**
- **Aucun captif** : sous emprise, ils tuent et détruisent
- Mathias a barricadé la forge avec une vingtaine de femmes et d'enfants — **ils survivent**, et serviront de **témoins** sur le comportement des orcs
- Une poignée de soldats tient la ligne pour donner le temps aux non-combattants de se cacher. **Tous meurent**
- Tomas et Mathias survivent **parce qu'ils n'étaient pas dans la ligne** — l'un n'est plus soldat depuis huit ans, l'autre est forgeron. Personne ne les désigne : il ne reste personne d'autre
- **Jonas disparaît**
- Les orcs se retirent **d'eux-mêmes**, le plan accompli

---

## 7. PNJ persistants

*Les compagnons sont traités en §1 bis et dans `SPEC_COMPAGNONS`.*

| PNJ | Rôle |
|---|---|
| **Capitaine Vairon** | Officier de la Couronne. **Innocent, et instrumentalisé.** Il reçoit l'ordre d'enfoncer la colonne bien plus loin qu'une expédition punitive ne l'exige. Il ne le comprend pas. Il l'exécute, parce que c'est son métier. Loyal, compétent, humain — **c'est ce qui rendra la révélation insupportable** |

**Confiance individuelle :** distincte de la réputation de faction — une valeur par PNJ nommé.

---

## 8. Questions ouvertes

1. **Par quel mécanisme le twist 2 se révèle-t-il ?** Aucun dispositif n'est prévu. Le carnet de Vairon a été écarté — un objet qui contient la réponse court-circuite l'enquête au lieu de la récompenser
2. **Nature exacte de la relique** rendue à l'Ordre
3. **Quels membres de l'Ordre** ont traité, et comment le joueur l'apprend au chapitre 3
4. **Où se trouve la source** dans les Terres Noires, et à quoi elle ressemble
5. **Conditions exactes des retrouvailles avec Jonas** — montant de la dette, façons de la solder
6. **Sort de l'Ordre** après le twist 2 : allié, brisé, ou divisé
