# Lot MVP 1 — « Les vingt premières minutes »

Étape 2. Onze storylets : l'ouverture en cinq beats, la razzia à moyeu et
l'après. Régime **majeurs et jalons** — relecture intégrale, tous les storylets
sont reproduits au §4.

---

## 1. La fiche de lot

| | |
|---|---|
| Départ | `D04` « La razzia », hors tirage, choisissable à l'écran titre |
| Identifiants | `ST-VDG-01` à `05` (ouverture) · `10` (moyeu) · `11` à `14` (chaînes) · `20` (après) |
| Fin | `FIN-T1` — « Fin de la tranche » |
| Compagnon | `PNJ-F1` Mathias, fiche complète, mortel dès le départ |
| Source du texte | `SPEC_CONTENU` §4 et §5, validé beat par beat — **porté, pas réécrit** |
| Horloge | compteur `razzia_temps` : 4 la ligne cède, 7 les orcs se retirent |

**Ce que l'état traverse.** Aucun ajout au moteur : compteurs `stat_partie`
(`vdg_matinee`, `vdg_voix`, `razzia_temps`, `survivants`), drapeaux
`f_vdg_*`, objets réels (les flèches sont des `OBJ-02`), états du héros.

---

## 2. Les onze storylets

| ID | Fonction | Options | Issues | Options à risque | Majeur | Stats lues |
|---|---|---|---|---|---|---|
| ST-VDG-01 | Ouverture — le seuil | 3 | 4 | 1 | oui | sangfroid |
| ST-VDG-02 | Ouverture — la forge | 4 | 4 | 0 | oui | — |
| ST-VDG-03 | Ouverture — la traversée | 4 | 4 | 0 | non | — |
| ST-VDG-04 | Ouverture — la chasse | 6 | 10 | 3 | oui | adresse |
| ST-VDG-05 | Ouverture — la cloche | 1 | 1 | 0 | non | — |
| ST-VDG-10 | Razzia — le moyeu | 6 | 7 | 0 | oui | — |
| ST-VDG-11 | Razzia — rejoindre la ligne | 4 | 7 | 3 | oui | adresse vigueur sangfroid |
| ST-VDG-12 | Razzia — atteindre la forge | 8 | 13 | 4 | oui | adresse vigueur sangfroid |
| ST-VDG-13 | Razzia — le toit des Ancel | 6 | 8 | 2 | oui | sangfroid perception |
| ST-VDG-14 | Razzia — la réserve du bas | 4 | 5 | 1 | oui | vigueur |
| ST-VDG-20 | Razzia — après | 1 | 1 | 0 | non | — |

---

## 3. Le vérificateur

```
=== CONTENU ===
storylets      : 33
  par lieu     : {"declenche_uniquement":14,"P01":2,"P02":3,"P03":2,"P04":2,"P05":4,"P06":3,"partout":3}
objets         : 15 | modificateurs : 8
créatures      : 6 | pnj : 7
compétences    : 9 | badges : 10
départs        : 4 | mutateurs : 6
points         : 6 | fins : 7
clés journal   : 32

=== VÉRIFICATION ===
bloquants : 0 | à revoir : 0

=== GARDE-FOU : L'ALÉATOIRE NE TUE JAMAIS ===
  issue tirée au sort, -999 santé   : santé 1 | fin aucune
  issue choisie, -999 santé         : santé 0 | fin FIN-MORT
  attendu : 1 / aucune, puis 0 / FIN-MORT  → CONFORME

=== SOIF ===
  seuil : 12 segments sans boire
  avant : non | à 11 : non | à 12 : assoiffé | après avoir bu : non
  attendu : non, non, assoiffé, non          → CONFORME

=== SAUVEGARDE ===
  version courante : 2 | chaîne complète : oui
  v1 migrée : champ ajouté oui | reste préservé oui | sauvegarde plus récente refusée oui
  → CONFORME
  mort d'attrition en voyage        : santé 0 | fin FIN-MORT
  attendu : 0 / FIN-MORT                   → CONFORME

=== PARTIES AUTOMATIQUES ===
  parties OK   : 30 / 30   (crashs : 0)
  actions moy  : 39.2 | jours moy : 8.0
  niveau moy   : 6.2 | xp moy : 407.2
  scènes vues  : 16.1 / 22 | points visités : 4.7 / 6
  savoir moy   : 1.6 | badges moy : 3.3
  compagnons   : 0.5 | compétences prises : 2.9 | groupes fermés : 2.9
  santé finale : 29.1 / 50.0 | dégâts subis : 8.7
  pic de faim  : 85.5 / 100 | combats : 0.8
  gorgées bues : 2.6 | plus long sans boire : 16.5 segments (seuil 12)
  parties où la survie a mordu : 16 / 30
  fins         : {"FIN-OUEST-RAPPORT":3,"FIN-OUEST-ENTAME":12,"FIN-OUEST-SAVOIR":7,"FIN-OUEST-SEUL":4,"FIN-OUEST-COMPAGNIE":3,"FIN-MORT":1}

=== TRANCHE MVP 1 (départ D04) ===
  parties OK   : 30 / 30   (crashs : 0)
  FIN-T1 atteinte : 30 / 30   (exigé : au moins 10)
  actions moy  : 20.0 | scènes vues : 9.3 / 11
  xp moy       : 166.5 | niveau moy : 3.8
  chaînes bouclées : 1.6 / 4   | horloge finale : 4.5 / 7
  répartition  : {"0":8,"1":4,"2":11,"3":7}
  fins         : {"FIN-T1":30}
```

### Écart avec l'état de référence

**Aucun.** Le bloc v3 rend exactement les mêmes chiffres qu'avant la tranche :
39,2 actions · 8,0 jours · niveau 6,2 · 407,2 xp · 16,1 scènes sur 22 ·
2,6 gorgées. C'est ce que garantit `hors_tirage` sur `D04` : la tranche ne
rentre jamais dans le tirage de la v3, donc elle n'en déplace pas la mesure.

### Ce que dit la mesure de la tranche

| Mesure | Valeur | Lecture |
|---|---|---|
| `FIN-T1` atteinte | **30 / 30** | exigé : au moins 10 |
| Chaînes bouclées | **1,6 / 4** — réparties 0:8 · 1:4 · 2:11 · 3:7 | « deux, parfois trois. Il y en a quatre » |
| Horloge finale | 4,5 / 7 | elle mord : personne ne boucle les quatre |
| Scènes vues | 9,3 / 11 | |

---

## 4. Les onze storylets en entier

### 4.1 L'ouverture

```js
// MVP 1 — L'ouverture, cinq beats (SPEC_CONTENU §4).
// Le texte a été validé beat par beat : il est porté dans le schéma, pas
// réécrit. Les coupes imposées par les plafonds de longueur sont signalées
// dans docs/lots/MVP1.md.
//
// L'état traverse les storylets par des compteurs et des drapeaux :
//   vdg_matinee   3 entière · 2 presque entière · 1 entamée
//   vdg_voix      nombre de voix entendues à la traversée
//   f_vdg_jonas_situe    on sait où est Jonas
//   f_vdg_dette_mathias  on lui a demandé des pointes la veille au soir
// Les flèches sont un vrai objet : OBJ-02.

export const storylets = {
  // ---------------------------------------------------------------- BEAT 1
  "ST-VDG-01": {
    id: "ST-VDG-01",
    titre_travail: "Ouverture — le seuil",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Le jour se lève sur Val-de-Garde.\n\nDe la porte, on voit la tour de guet plantée en haut du versant. Sa cloche est immobile. Elle n'a pas sonné depuis huit ans — depuis que la Couronne a signé la paix avec les Terres Noires.\n\nTu avais dix-sept ans et une lance. Maintenant tu as un arc, et les bois sont à toi.\n\nNeuf flèches dans le carquois. Il en faut douze pour une bonne journée.",
      base:
        "Neuf flèches dans le carquois. Il en faut douze pour une bonne journée.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Tailler des pointes toi-même, sur le seuil",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu t'installes sur le seuil. Trois pointes, trois hampes, trois empennages. Le soleil est déjà haut quand tu ranges le couteau.",
            effets: [
              { objet: "OBJ-02", quantite: 3 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -2 } },
              { fatigue: 4 },
              { xp: 10 },
              { journal: "vdg_pointes", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "En demander à Mathias en passant",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Il en a toujours d'avance. Tu passeras les prendre à la forge.",
            effets: [
              { objet: "OBJ-02", quantite: 3 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -1 } },
              { flag: "f_vdg_dette_mathias" },
              { xp: 10 },
              { journal: "vdg_demande", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il en a deux seulement. Le reste est commandé.",
            effets: [
              { objet: "OBJ-02", quantite: 2 },
              { stat_partie: { compteur: "vdg_matinee", valeur: -1 } },
              { flag: "f_vdg_dette_mathias" },
              { xp: 10 },
              { journal: "vdg_demande", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Partir avec ce que tu as",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Neuf, c'est neuf. Tu as chassé avec moins.",
            effets: [
              { xp: 10 },
              { journal: "vdg_parti_court", majeure: true },
              { declenche: "ST-VDG-02" },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 2
  "ST-VDG-02": {
    id: "ST-VDG-02",
    titre_travail: "Ouverture — la forge",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La forge est ouverte des deux côtés, comme toujours. Mathias frappe une lame qui n'a rien d'une lame : un soc de charrue, qu'un paysan des Bois lui a apporté tordu.\n\nIl a vingt ans et les avant-bras d'un homme qui en a trente.",
      base:
        "Mathias frappe le soc tordu. Il a vingt ans et les avant-bras d'un homme qui en a trente.",
      variantes: [
        {
          si: [["flag", "f_vdg_dette_mathias"]],
          ajout:
            "« Je t'avais dit avant-hier. Tu me le dis toujours le matin même. »",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Lui demander où est Jonas",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Mathias ne lève pas les yeux du soc. « Au toit des Ancel. Il a dit qu'il finissait avant midi. » Un temps. « Il ne finira pas avant midi. »",
            effets: [
              { flag: "f_vdg_jonas_situe" },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Lui demander des nouvelles du village",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« La garnison a eu deux hommes en moins ce mois-ci. Personne n'est venu les remplacer. » Il repose le marteau. « Ça fait trois mois. »",
            effets: [
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Lui proposer de venir",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« Avec quoi ? Ma masse ? » Il rit. « Ramène quelque chose, je le ferai cuire. »",
            effets: [
              { confiance: { pnj: "PNJ-F1", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Le laisser travailler et sortir",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu prends tes pointes, tu ne dis rien. Il hoche la tête sans s'arrêter. C'est comme ça entre vous, et ça suffit.",
            effets: [{ declenche: "ST-VDG-03" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 3
  // La traversée. Le nombre de voix qu'on peut entendre dépend de ce qui
  // reste de matinée : trois si elle est entière, deux si elle est entamée
  // par la forge, une si on a taillé ses pointes.
  "ST-VDG-03": {
    id: "ST-VDG-03",
    titre_travail: "Ouverture — la traversée",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { arme: false, restantes: 0 },
    texte: {
      arrivee:
        "Il faut passer par la place pour sortir du village. Trois chemins y mènent, et on n'a pas le temps de les prendre tous.",
      base:
        "La place, la route du sud, l'autel. On n'a pas le temps de tout prendre.",
      variantes: [
        {
          si: [["local<=", "restantes", 0]],
          ajout: "Le soleil monte. Les bois n'attendront pas.",
        },
      ],
    },
    regles_locales: [
      {
        si: [["!local", "arme"], ["stat_partie>=", "vdg_matinee", 3]],
        alors: [{ local: "restantes", "=": 3 }, { local: "arme", "=": true }],
      },
      {
        si: [["!local", "arme"], ["stat_partie>=", "vdg_matinee", 2]],
        alors: [{ local: "restantes", "=": 2 }, { local: "arme", "=": true }],
      },
      {
        si: [["!local", "arme"]],
        alors: [{ local: "restantes", "=": 1 }, { local: "arme", "=": true }],
      },
    ],
    options: [
      {
        id: "A",
        libelle: "Par la place, devant le puits",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Un soldat de la Couronne, adossé au puits, à personne en particulier : « La relève devait être là au printemps. On est en été. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Par la route du sud, où l'on décharge",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Un marchand décharge, et il compte deux fois. « Le sel a pris un tiers depuis les foins. Personne ne sait pourquoi. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Par l'autel, le long de l'abri effondré",
        cout: {},
        apparait_si: [["local>=", "restantes", 1]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Une vieille femme balaie devant l'abri effondré. « Les frères ne sont pas passés ce mois-ci. Ni le mois d'avant. »",
            effets: [
              { local: "restantes", "+=": -1 },
              { stat_partie: { compteur: "vdg_voix", valeur: 1 } },
              { xp: 5 },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Monter aux bois",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Jonas descend d'une échelle, une botte de chaume sous le bras. Il te voit, lève le menton.\n\n« Tu montes ? »\n\n« Je monte. »\n\nIl est déjà reparti vers le toit.",
            effets: [
              { xp: 10 },
              { declenche: "ST-VDG-04" },
            ],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 4
  // La chasse. Premier vrai storylet : il enseigne l'observation, la
  // distance et le coût d'une flèche sans jamais les nommer.
  "ST-VDG-04": {
    id: "ST-VDG-04",
    titre_travail: "Ouverture — la chasse",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: { distance: 0, alerte: false, sang: false, lu: false },
    texte: {
      arrivee:
        "Les bois commencent à deux cents pas des dernières maisons. Le sol monte, puis s'aplatit.\n\nUn chevreuil est là, en contrebas, le long du ruisseau. Il n'a pas bougé la tête. Le vent vient vers toi — il ne t'a ni vu ni senti.",
      base:
        "Le chevreuil est toujours le long du ruisseau. Le vent tient.",
      variantes: [
        {
          si: [["local>=", "distance", 1]],
          ajout: "Tu es à vingt pas plus bas. D'ici, une flèche porte droit.",
        },
        {
          si: [["local", "sang"]],
          remplace:
            "La trace monte vers les fourrés. Facile à suivre. Trop facile.\n\nÀ dix pas du sang, dans la terre molle, il y a d'autres empreintes. Larges. Elles suivent la même piste que toi.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Le regarder un moment",
        cout: { segments: 1 },
        apparait_si: [["!local", "sang"], ["!local", "lu"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Il est jeune, l'arrière-train maigre. Il boite légèrement de l'antérieur gauche. Il ne courra pas vite.",
            effets: [
              { local: "lu", "=": true },
              { xp: 15 },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Descendre en s'abritant derrière la berge",
        cout: { segments: 1, fatigue: 6 },
        apparait_si: [["!local", "sang"], ["local<=", "distance", 0]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [
          { si: [["stat>=", "adresse", 3]], valeur: 15 },
          { si: [["local", "lu"]], valeur: 10 },
        ],
        issues: [
          {
            probabilite: 65,
            reussite: true,
            si: [],
            texte: "Tu descends de vingt pas. Il n'a rien entendu.",
            effets: [{ local: "distance", "=": 1 }],
          },
          {
            probabilite: 35,
            partielle: true,
            si: [],
            texte:
              "Une pierre part. Il relève la tête, immobile. Tu ne respires plus.",
            effets: [
              { local: "distance", "=": 1 },
              { local: "alerte", "=": true },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Tirer",
        cout: { objet: { "OBJ-02": 1 } },
        apparait_si: [["!local", "sang"]],
        requiert: [["equipe_famille", "arc"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [
          { si: [["local>=", "distance", 1]], valeur: 25 },
          { si: [["stat>=", "adresse", 3]], valeur: 10 },
          { si: [["local", "alerte"]], valeur: -15 },
        ],
        issues: [
          {
            probabilite: 45,
            reussite: true,
            si: [],
            sortie: true,
            texte:
              "La flèche descend en courbe et le prend au flanc. Il fait trois bonds et tombe.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 25 },
              { declenche: "ST-VDG-05" },
            ],
          },
          {
            probabilite: 35,
            partielle: true,
            si: [],
            texte:
              "Tu touches trop bas. Il part en boitant, laissant une trace de sang dans les fougères.",
            effets: [
              { local: "sang", "=": true },
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 10 },
            ],
          },
          {
            probabilite: 20,
            si: [],
            sortie: true,
            texte:
              "La flèche se plante dans la berge. Il est parti avant que tu aies rangé ta main.",
            effets: [
              { stat_partie: { compteur: "fleches_tirees", valeur: 1 } },
              { xp: 5 },
              { declenche: "ST-VDG-05" },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Examiner les empreintes",
        cout: { segments: 1 },
        apparait_si: [["local", "sang"]],
        epuisable: true,
        observation: true,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Quatre doigts, des griffes qui mordent profond. Plus lourd qu'un chien, plus large qu'un loup. Tu n'as jamais vu ça de près, et tu ne tiens pas à commencer aujourd'hui.",
            effets: [
              { flag: "f_vdg_empreintes_lues" },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Continuer la piste dans les fourrés",
        cout: { segments: 1, fatigue: 8 },
        apparait_si: [["local", "sang"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["flag", "f_vdg_empreintes_lues"]], valeur: 20 }],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            sortie: true,
            texte: "Tu trouves le chevreuil avant l'autre chose.",
            effets: [
              { objet: "OBJ-06", quantite: 1 },
              { xp: 25 },
              { declenche: "ST-VDG-05" },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            sortie: true,
            texte:
              "Tu le trouves déjà entamé. Tu prends ce qui reste et tu ne t'attardes pas.",
            effets: [
              { objet: "OBJ-15", quantite: 1 },
              { xp: 15 },
              { declenche: "ST-VDG-05" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Redescendre vers le village",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu redescends vers le village les mains vides, et tu ne le regrettes qu'à moitié.",
            effets: [{ declenche: "ST-VDG-05" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- BEAT 5
  // La cloche. Aucun choix : c'est une transition, pas un beat de décision.
  // La cloche a été posée à la deuxième phrase du beat 1 comme un détail de
  // décor. Elle sonne ici sans qu'un mot d'explication soit nécessaire.
  "ST-VDG-05": {
    id: "ST-VDG-05",
    titre_travail: "Ouverture — la cloche",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Tu es à mi-pente quand le son arrive.\n\nUn coup. Puis un autre. Puis sans s'arrêter.\n\nTu connais cette cloche. Tu ne l'as jamais entendue.",
      base:
        "La cloche sonne sans s'arrêter.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "Z",
        libelle: "Descendre en courant",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu laisses le sentier et tu coupes droit dans la pente. Le carquois bat contre ton dos.",
            effets: [
              { acte: 2 },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  vdg_pointes: "Il a pris la matinée pour tailler trois pointes de plus.",
  vdg_demande: "Il a compté sur son frère pour les trois pointes qui manquaient.",
  vdg_parti_court: "Il est parti chasser avec neuf flèches, en sachant qu'il en manquait trois.",
};
```

### 4.2 La razzia et l'après

```js
// MVP 1 — La razzia (SPEC_CONTENU §5) et l'après (§5.9).
// Texte validé, porté tel quel.
//
// Motif à moyeu : ST-VDG-10 redécrit la situation à chaque retour et propose
// ce qui reste atteignable. Chaque chaîne est un storylet unique qui rend la
// main au moyeu. L'horloge est le compteur razzia_temps : chaque beat de
// chaîne coûte 1, le retour au moyeu est gratuit.
//
//   0-3  la ligne tient
//   4    la ligne cède
//   5-6  ils fouillent, ils avancent vers le bas du village
//   7    ils se retirent — fin de scène, quoi qu'ait fait le joueur
//
// Personne ne meurt pendant la razzia (SPEC_DESIGN §4.5). Aucun texte ne
// laisse croire au joueur qu'il a sauvé le village : les orcs se retirent
// d'eux-mêmes.

export const storylets = {
  // ----------------------------------------------------------------- MOYEU
  "ST-VDG-10": {
    id: "ST-VDG-10",
    titre_travail: "Razzia — le moyeu",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: false,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Ils ne sont pas venus pour prendre le village. Ils le traversent.\n\nLa rangée de maisons basses n'existe plus. Du côté du puits, une dizaine d'entre eux poussent vers la place. Une vingtaine d'hommes sont déjà tombés — il en reste une poignée qui tient la ligne, et qui tient pour rien d'autre que gagner du temps.\n\nLa forge est fermée. Quelqu'un a barré la porte de l'intérieur.\n\nÇa ne tiendra pas longtemps.",
      base:
        "La ligne tient encore. Tu as peut-être le temps de deux choses. Peut-être.",
      variantes: [
        {
          si: [["stat_partie>=", "razzia_temps", 4]],
          remplace:
            "La ligne a cédé. Ils sont sur la place maintenant, et ils ne se pressent pas. L'un d'eux retourne une charrette d'un coup d'épaule, pour voir ce qu'il y a dessous.\n\nCe que tu n'as pas fait, tu ne le feras plus.",
        },
        {
          si: [["stat_partie>=", "razzia_temps", 7]],
          remplace:
            "Ils s'en vont comme ils sont venus, sans se presser, sans se retourner. Personne ne les poursuit.\n\nIl n'y a plus personne pour les poursuivre.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Rejoindre la ligne, du côté du puits",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_a"],
          ["non", [["stat_partie>=", "razzia_temps", 4]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu remontes la rue vers le bruit.",
            effets: [{ declenche: "ST-VDG-11" }],
          },
        ],
      },
      {
        id: "B",
        libelle: "Atteindre la forge",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_b"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "La porte barrée est à trois rues d'ici.",
            effets: [{ declenche: "ST-VDG-12" }],
          },
        ],
      },
      {
        id: "C",
        libelle: "Monter au toit des Ancel",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_c"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu coupes par les jardins, vers le haut du village.",
            effets: [{ declenche: "ST-VDG-13" }],
          },
        ],
      },
      {
        id: "D",
        libelle: "Descendre à la réserve du bas",
        cout: {},
        apparait_si: [
          ["!flag", "f_vdg_chaine_d"],
          ["non", [["stat_partie>=", "razzia_temps", 7]]],
        ],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Le cellier commun est à l'écart de la poussée.",
            effets: [{ declenche: "ST-VDG-14" }],
          },
        ],
      },
      {
        id: "E",
        libelle: "Prendre la route maintenant",
        cout: {},
        apparait_si: [["non", [["stat_partie>=", "razzia_temps", 7]]]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            si: [["non", [["stat_partie>=", "razzia_temps", 3]]]],
            texte:
              "Tu prends la route du nord pendant qu'ils sont encore sur la place. Tu es le premier sur le chemin. Les patrouilles de la Couronne sont encore à leur poste — pour quelques heures.",
            effets: [
              { flag: "f_vdg_route_tete" },
              { journal: "vdg_parti_tot", majeure: true },
              { declenche: "ST-VDG-20" },
            ],
          },
          {
            si: [],
            texte:
              "Tu pars au milieu des autres. Il y a déjà du monde sur le chemin.",
            effets: [
              { flag: "f_vdg_route_flot" },
              { journal: "vdg_parti_tard", majeure: true },
              { declenche: "ST-VDG-20" },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Les regarder s'en aller",
        cout: {},
        apparait_si: [["stat_partie>=", "razzia_temps", 7]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu restes où tu es jusqu'à ce que le dernier ait passé la haie du bas. Personne ne bouge avant longtemps.",
            effets: [
              { flag: "f_vdg_route_flot" },
              { declenche: "ST-VDG-20" },
            ],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------------- CHAÎNE A — la ligne
  // La bascule tactique n'existe pas encore : la chaîne reste narrative.
  "ST-VDG-11": {
    id: "ST-VDG-11",
    titre_travail: "Razzia — rejoindre la ligne",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Ils sont sept, épaule contre épaule, en travers de la rue. Devant eux, les orcs ne chargent pas : ils cognent, ils reculent d'un pas, ils recommencent. Méthodiques.",
      base:
        "Sept hommes en travers de la rue. En face, ils cognent et reculent d'un pas, méthodiques.",
      variantes: [],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Tirer depuis le toit du puits",
        cout: { objet: { "OBJ-02": 3 } },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "adresse", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Trois flèches, trois corps. La ligne reprend un pas. Un des hommes lève la tête vers toi et ne dit rien.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 3 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { stat_partie: { compteur: "survivants", valeur: 2 } },
              { xp: 30 },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Deux touchent. La troisième se perd. Ils t'ont vu.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 2 } },
              { stat_partie: { compteur: "fleches_tirees", valeur: 3 } },
              { flag: "f_vdg_repere" },
              { xp: 25 },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Prendre place dans la ligne",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 50,
            reussite: true,
            si: [],
            texte:
              "Tu te glisses entre deux hommes que tu connais depuis l'enfance. Personne ne te demande ce que tu fais là. Vous tenez quatre échanges. Au cinquième, la ligne s'ouvre, et des mains te tirent en arrière.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 2 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { flag: "f_vdg_ligne_tenue" },
              { sante_heros: -6 },
              { xp: 35 },
              { journal: "vdg_ligne", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 50,
            partielle: true,
            si: [],
            texte:
              "Tu prends ta place. Ça tient le temps de trois coups. Le quatrième te jette contre un mur, et quand tu te relèves la rue est vide derrière toi.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 1 } },
              { flag: "f_vdg_ligne_tenue" },
              { etat: "blesse_leger" },
              { sante_heros: -10 },
              { xp: 25 },
              { journal: "vdg_ligne", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Leur crier de reculer vers la forge",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            texte:
              "Trois d'entre eux entendent. Les autres ne bougent pas. Les trois passent la porte de la forge avant que ça cède.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 3 } },
              { xp: 25 },
              { journal: "vdg_crie", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            texte:
              "Un seul se retourne. Il meurt en se retournant. Les autres n'ont rien entendu du tout.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 15 },
              { journal: "vdg_crie", majeure: true },
              { flag: "f_vdg_chaine_a" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Renoncer et redescendre",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu regardes la rue une seconde de trop, puis tu tournes les talons.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------- CHAÎNE B — la forge
  "ST-VDG-12": {
    id: "ST-VDG-12",
    titre_travail: "Razzia — atteindre la forge",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { etape: 0 },
    texte: {
      arrivee:
        "Entre toi et la forge, il y a la rue, ou les jardins, ou les toits bas des remises.",
      base:
        "Entre toi et la forge, il y a la rue, ou les jardins, ou les toits bas des remises.",
      variantes: [
        {
          si: [["local>=", "etape", 1]],
          remplace:
            "Un orc est à l'angle de la maison Ancel, dos tourné. Il n'a rien vu. La forge est à vingt pas derrière lui.",
        },
        {
          si: [["local>=", "etape", 2]],
          remplace:
            "Tu frappes trois coups. Quelque chose racle de l'autre côté, puis la voix de Mathias, très bas, tout près du bois :\n\n« Ils sont vingt là-dedans. Femmes, gosses. Ils n'ont pas fait un bruit depuis que j'ai barré. Les orcs passent devant sans regarder. »\n\nUn silence.\n\n« Ne l'ouvre pas. »",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Par la rue, vite",
        cout: {},
        apparait_si: [["local<=", "etape", 0]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            probabilite: 55,
            reussite: true,
            si: [],
            texte: "Tu cours. Personne ne te voit.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
          {
            probabilite: 45,
            partielle: true,
            si: [],
            texte: "On te voit. On ne te suit pas encore.",
            effets: [
              { local: "etape", "=": 1 },
              { flag: "f_vdg_repere" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Par les jardins, derrière les haies",
        cout: {},
        apparait_si: [["local<=", "etape", 0]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Les haies te cachent jusqu'au mur de la forge.",
            effets: [
              { local: "etape", "=": 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Par les toits bas des remises",
        cout: { fatigue: 6 },
        apparait_si: [["local<=", "etape", 0]],
        requiert: [["!etat", "blesse_jambe"]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "adresse", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Tu passes au-dessus de tout. Tu vois le village entier depuis là-haut, et tu voudrais ne pas l'avoir vu.",
            effets: [
              { local: "etape", "=": 2 },
              { flag: "f_vdg_vue_haute" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte: "Une tuile cède. Tu tombes mal.",
            effets: [
              { local: "etape", "=": 1 },
              { etat: "blesse_leger" },
              { sante_heros: -6 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Le frapper maintenant",
        cout: { usure_arme: 5 },
        apparait_si: [["local=", "etape", 1]],
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 15 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Il tombe sans un bruit. Tu ne savais pas que tu pouvais encore faire ça.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { stat_partie: { compteur: "combats_gagnes", valeur: 1 } },
              { xp: 25 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il tombe, mais pas assez vite. Un autre a tourné la tête.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "orcs_vaincus", valeur: 1 } },
              { flag: "f_vdg_repere" },
              { xp: 20 },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Attendre qu'il passe",
        cout: {},
        apparait_si: [["local=", "etape", 1]],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte: "Il s'éloigne vers la place. Tu traverses.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Il ne passe pas. Il appelle. Un second arrive. Tu attends encore, plaqué au mur, et tu les laisses s'écarter tous les deux.",
            effets: [
              { local: "etape", "=": 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "combats_evites", valeur: 1 } },
              { xp: 10 },
            ],
          },
        ],
      },
      {
        id: "F",
        libelle: "Prendre ce qui est dehors, sous l'appentis",
        cout: {},
        apparait_si: [["local>=", "etape", 2]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "L'appentis n'est pas barré. Pointes, lame de rechange, corde. Tu remplis ce que tu peux.",
            effets: [
              { objet: "OBJ-02", quantite: 4 },
              { objet: "OBJ-07", tire: true },
              { objet: "OBJ-14", quantite: 1 },
              { objet: "OBJ-13", quantite: 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_b" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "G",
        libelle: "Rester une minute, à travers la porte",
        cout: {},
        apparait_si: [["local>=", "etape", 2]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Vous parlez à travers la porte, sans vous voir. Il te dit où il ira quand ce sera fini. Tu lui dis où tu seras.",
            effets: [
              { flag: "f_vdg_rdv_mathias" },
              { confiance: { pnj: "PNJ-F1", valeur: 2 } },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 25 },
              { journal: "vdg_porte", majeure: true },
              { flag: "f_vdg_chaine_b" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Repartir tout de suite",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [["local>=", "etape", 2]],
            texte:
              "Tu ne réponds rien. Il n'attend pas de réponse.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
          {
            reussite: true,
            si: [],
            texte:
              "Tu recules d'une rue. La forge attendra, ou elle n'attendra pas.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------- CHAÎNE C — le toit
  "ST-VDG-13": {
    id: "ST-VDG-13",
    titre_travail: "Razzia — le toit des Ancel",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: { trouve: false },
    texte: {
      arrivee:
        "L'échelle est encore contre le mur. Le chaume est à moitié posé, la botte défaite, les liens en travers.\n\nIl n'y a personne sur le toit. Il n'y a personne en bas.",
      base:
        "L'échelle contre le mur, le chaume à moitié posé. Personne en haut, personne en bas.",
      variantes: [
        {
          si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
          remplace:
            "Tu ne sais pas où il est. Il pouvait être n'importe où.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Chercher chez lui",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "La porte est ouverte, la maison vide, le lit fait. Il n'y est pas venu de la matinée.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Demander à quelqu'un qui court",
        cout: {},
        apparait_si: [["!flag", "f_vdg_jonas_situe"], ["!local", "trouve"]],
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        modif_proba: [{ si: [["stat>=", "sangfroid", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Une femme qui court te crie qu'elle l'a vu sur un toit, du côté des Ancel.",
            effets: [
              { local: "trouve", "=": true },
              { flag: "f_vdg_jonas_situe" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
              { xp: 15 },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte: "Personne ne s'arrête.",
            effets: [
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Monter voir depuis le toit",
        cout: { fatigue: 5 },
        apparait_si: [
          ["ou", [["flag", "f_vdg_jonas_situe"]], [["local", "trouve"]]],
        ],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "perception", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "De là-haut, tu vois toute la rue. Et tu vois trois orcs, en bas, qui ne cassent rien et ne fouillent rien. Ils avancent vite, tous les trois dans la même direction, vers le sud. Ils suivent quelque chose.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { flag: "f_indice_poursuite" },
              { connaissance_sortilege: "+1" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 35 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Tu montes, tu regardes, tu ne comprends pas ce que tu vois. Trois d'entre eux partent vers le sud sans rien détruire.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 20 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "D",
        libelle: "Lire le sol au pied de l'échelle",
        cout: {},
        apparait_si: [
          ["ou", [["flag", "f_vdg_jonas_situe"]], [["local", "trouve"]]],
        ],
        epuisable: false,
        observation: true,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Des traces de pas, les siennes, qui partent en courant. Et d'autres par-dessus, plus larges. Beaucoup plus larges. Elles ne vont pas vers la place : elles vont au sud, hors du village.",
            effets: [
              { flag: "f_vdg_piste_jonas" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_c" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "E",
        libelle: "Crier son nom",
        cout: {},
        epuisable: true,
        observation: false,
        deplacement: false,
        sortie: false,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Rien. Rien du tout.",
            effets: [
              { flag: "f_vdg_repere" },
              { stat_partie: { compteur: "razzia_temps", valeur: 1 } },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Redescendre vers le reste du village",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu laisses l'échelle où elle est.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // ------------------------------------------------- CHAÎNE D — la réserve
  "ST-VDG-14": {
    id: "ST-VDG-14",
    titre_travail: "Razzia — la réserve du bas",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: true,
    priorite: 10,
    poids: 10,
    duree_segments: 0,
    etat_local_initial: {},
    texte: {
      arrivee:
        "Le cellier commun est au bas du village, à l'écart de la poussée. Personne n'y est allé. Personne n'y pense.",
      base:
        "Le cellier commun, au bas du village. Personne n'y pense.",
      variantes: [
        {
          si: [["surcharge"]],
          ajout: "Le sac tire déjà sur les épaules. Il faudra choisir.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "A",
        libelle: "Charger ce que tu peux porter",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        modif_proba: [{ si: [["stat>=", "vigueur", 3]], valeur: 20 }],
        issues: [
          {
            probabilite: 60,
            reussite: true,
            si: [],
            texte:
              "Grain, lard, deux outres. Le sac pèse trop et tu le prends quand même.",
            effets: [
              { objet: "OBJ-15", quantite: 4 },
              { objet: "OBJ-05", quantite: 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
          {
            probabilite: 40,
            partielle: true,
            si: [],
            texte:
              "Tu prends trop. Tu devras jeter la moitié sur la route.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { objet: "OBJ-05", quantite: 1 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 15 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "B",
        libelle: "Charger, et prévenir les familles cachées",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Tu cries à deux familles cachées derrière le cellier de prendre ce qu'elles peuvent et de filer par le bas. Elles t'écoutent.",
            effets: [
              { objet: "OBJ-15", quantite: 2 },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { stat_partie: { compteur: "survivants", valeur: 4 } },
              { xp: 30 },
              { journal: "vdg_prevenu", majeure: true },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "C",
        libelle: "Chercher un chariot derrière le cellier",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "Il y en a un, la ridelle cassée, mais il roule. Il ne passera pas partout.",
            effets: [
              { objet: "OBJ-15", quantite: 6 },
              { objet: "OBJ-05", quantite: 2 },
              { objet: "OBJ-13", quantite: 2 },
              { flag: "f_vdg_chariot" },
              { stat_partie: { compteur: "razzia_temps", valeur: 2 } },
              { xp: 25 },
              { flag: "f_vdg_chaine_d" },
              { declenche: "ST-VDG-10" },
            ],
          },
        ],
      },
      {
        id: "Z",
        libelle: "Remonter sans rien prendre",
        cout: {},
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte: "Tu refermes la porte du cellier derrière toi.",
            effets: [{ declenche: "ST-VDG-10" }],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------- L'APRÈS
  // Scène courte, sans choix, qui clôt la tranche. Le message de permadeath
  // s'affiche après, sur l'écran de transition — jamais pendant la scène.
  "ST-VDG-20": {
    id: "ST-VDG-20",
    titre_travail: "Razzia — après",
    lieu: { type: "declenche_uniquement" },
    conditions: { requis: [], interdit: [] },
    unique: true,
    majeur: false,
    priorite: 10,
    poids: 10,
    duree_segments: 1,
    etat_local_initial: {},
    texte: {
      arrivee:
        "La porte de la forge s'ouvre en fin d'après-midi. Ils sortent un par un, vingt, peut-être plus. Personne n'a rien.\n\nLes hommes de la ligne sont tous morts. On les compte avant la nuit.\n\nL'échelle est toujours contre le mur des Ancel, le chaume à moitié posé. Jonas n'est ni parmi les morts, ni parmi les vivants.",
      base:
        "Ils sortent de la forge. Les hommes de la ligne sont tous morts. Jonas n'est nulle part.",
      variantes: [
        {
          si: [["flag", "f_vdg_piste_jonas"]],
          ajout:
            "Tu sais dans quelle direction ils sont partis. C'est tout ce que tu sais.",
        },
        {
          si: [["flag", "f_vdg_rdv_mathias"]],
          ajout:
            "Mathias est déjà là où il avait dit qu'il serait.",
        },
      ],
    },
    regles_locales: [],
    options: [
      {
        id: "Z",
        libelle: "Écouter ce que dit Mathias",
        cout: { segments: 1 },
        epuisable: false,
        observation: false,
        deplacement: false,
        sortie: true,
        issues: [
          {
            reussite: true,
            si: [],
            texte:
              "« Personne ne viendra le dire à leur place. » Il pose la masse contre le mur et la reprend aussitôt, parce qu'il ne sait pas quoi faire de ses mains. « Je ne suis pas soldat. Je viens quand même. »",
            effets: [
              { compagnon: "PNJ-F1" },
              { pnj_statut: { id: "PNJ-F2", valeur: "disparu" } },
              { flag: "f_vdg_frappe" },
              { acte: 2 },
              { xp: 40 },
              { journal: "vdg_mission", majeure: true },
              { fin: "FIN-T1" },
            ],
          },
        ],
      },
    ],
  },
};

export const journal = {
  vdg_ligne: "Il a pris place dans la ligne, entre deux hommes qu'il connaissait depuis l'enfance.",
  vdg_crie: "Il a crié aux derniers de reculer vers la forge.",
  vdg_porte: "Il est resté une minute à parler à son frère à travers la porte barrée.",
  vdg_prevenu: "Il a prévenu deux familles cachées derrière le cellier avant de charger.",
  vdg_parti_tot: "Il a pris la route pendant qu'ils étaient encore sur la place.",
  vdg_parti_tard: "Il est parti au milieu des autres, quand le chemin était déjà plein.",
  vdg_mission: "Personne ne restait pour prévenir la Couronne. Il est parti le faire.",
};

export const fins = {
  "FIN-T1": {
    id: "FIN-T1",
    nom: "Fin de la tranche",
    description:
      "Val-de-Garde a été traversé, pas pris. La route du nord commence ici, et il faut prévenir la Couronne avant que quelqu'un d'autre ne s'en charge. Ce qui est arrivé à Jonas attendra la suite.",
  },
};
```

---

## 5. Faits ajoutés au canon

Inscrits dans `content/CANON.md` :

- **Lieux** — la tour de guet et sa cloche muette depuis huit ans · la forge
  ouverte des deux côtés, sa porte barrable et son appentis · le cellier commun
  au bas du village · l'abri effondré près de l'autel.
- **Objets et choses vues** — les empreintes à quatre doigts relevées sur la
  piste de sang, sans que la bête soit rencontrée · l'échelle des Ancel, restée
  contre le mur après la razzia.
- **Rumeurs** — la relève de la garnison qui n'arrive pas · le sel qui a pris un
  tiers · les frères de l'Ordre qui ne passent plus.

La **famille Ancel** était déjà validée à la passe de cohérence du 21/09.

---

## 6. Doutes et questions pour Tom

### 6.1 Une coupe dans le texte validé — à arbitrer

`ST-VDG-03`, la voix du marchand. Le texte validé dit **« Le sel a pris un
tiers depuis la Saint-Jean »**. Le contrat bannit le lexique chrétien (§0 bis,
règle 6) et le vérificateur l'a bloqué. La Saint-Jean est une fête catholique
réelle : la garder importait le christianisme dans un monde dont la religion est
l'Ordre. J'ai écrit **« depuis les foins »** — même saison, même sens, aucun
repère religieux. **C'est la seule modification du texte validé.**

### 6.2 Deux défauts de mon portage, trouvés par la mesure

- **L'horloge ne mordait pas.** J'avais facturé le temps par storylet au lieu de
  par beat : 13 parties sur 30 bouclaient les quatre chaînes. Retarifé selon la
  spec — chaque chaîne coûte au moins 2 temps.
- **Entrer dans une chaîne la fermait.** Le moyeu gatait sur « déjà vu ». Entrer
  puis ressortir aussitôt fermait un objectif **pour zéro temps** : un clic
  malheureux coûtait une chaîne. Le moyeu gate désormais sur
  l'**accomplissement** (`f_vdg_chaine_*`), pas sur l'entrée.

### 6.3 Ce que je n'ai pas fait

- **La bascule tactique de la chaîne A** n'existe pas : la chaîne reste
  narrative, comme la mission l'autorise. « Prendre place dans la ligne » se
  résout en deux issues, dont une partielle, et coûte 2 temps.
- **La version courte de l'ouverture** attend la sauvegarde de partie, comme
  prévu.

### 6.4 Trois points qui méritent ton avis

1. **La tranche ne consomme presque pas de temps de jeu** : 1 jour, 1 segment au
   bilan. Faim, fatigue et soif ne bougent pas. C'est cohérent — « la pression
   vient du coût d'opportunité, jamais d'un chronomètre » — mais la couche de
   survie est inerte pendant vingt minutes de jeu. Voulu ou non ?
2. **`D04` hérite de l'inventaire v3**, comme la mission l'impose — donc d'une
   unité de `OBJ-06`, « la chasse du jour », avant d'être allé chasser. Je ne
   l'ai pas retirée : la consigne était explicite.
3. **Le bilan est celui de la v3.** Il parle de zones explorées et de badges qui
   n'ont pas de sens pour une tranche de vingt minutes. Il fonctionne, il n'est
   pas faux, mais il n'est pas écrit pour ça.
