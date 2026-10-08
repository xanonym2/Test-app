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
repère religieux. **C'était la seule modification du texte validé à la
livraison** ; l'audit du 8 octobre en a relevé d'autres, de moi, et en a fait
quelques-unes : la liste complète est au §7.8.

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

---

## 7. Audit de jouabilité et corrections — 8 octobre 2026

Après la livraison, la tranche a été jouée dans un navigateur (390 × 844, à la
souris) et mesurée par des scripts, en plus du vérificateur. Tom a ensuite
délégué les décisions. Tout ce qui suit est fait, vérifié et poussé.

### 7.1 Une faille que le vérificateur ne pouvait pas voir

**La barre de nav faisait sortir de la razzia sans retour.** Carte → « Rester
et regarder autour » resélectionnait une scène de lieu (la Crête, v3) ; les 11
storylets de la tranche étant `declenche_uniquement`, rien ne ramenait jamais au
moyeu et `FIN-T1` devenait inatteignable. Même chose pendant l'ouverture v3 et
le combat. Le robot n'utilise que les options de scène : il ne pouvait pas le
voir.

Correctif : `sceneVerrouillee` (`engine/derive.js`) dérive le verrou du type de
lieu du storylet courant ; l'onglet Carte disparaît tant qu'une scène déclenchée
dure, et `relancerScene` réaffiche la scène au lieu d'en tirer une autre. Le
vérificateur contrôle les 14 scènes déclenchées (3 v3, 11 tranche).

**Leçon de méthode**, inscrite au `CLAUDE.md` : ce que le robot ne touche pas —
barre de nav, carte, rechargement — se teste dans le navigateur.

### 7.2 L'horloge ne mordait pas contre un joueur qui a compris

Mesure sur 200 parties par politique (`mesure-stricte.mjs`, scratchpad) :

| Politique | Avant | Après |
|---|---|---|
| **Stricte** — toujours une chaîne, jamais renoncer | 2 : 52 % · **3 : 45 %** · 4 : 2 % | 2 : 64 % · 3 : 36 % · 4 : 0 |
| Gourmande — une chaîne, renonce parfois | 2 : 35 % · 3 : 60 % | 1 : 20 % · 2 : 75 % · 3 : 5 % |
| Aléatoire | 0-3, moy 1,07 | 0-3, moy 0,94 |

Trois causes, trois décisions :

1. **Regarder une chaîne était gratuit.** Entrer dans A, C ou D, lire
   l'arrivée, revenir par « Renoncer » : zéro temps. On pouvait inspecter les
   quatre avant de choisir — contre la règle 7 du contrat et contre « le joueur
   ne choisit pas des objectifs : il court ». **Renoncer coûte 1 temps** dans
   les quatre chaînes (dans B, seulement avant d'avoir avancé).
2. **B, C et D restaient ouvertes jusqu'à 7.** Avec des chaînes à 2-3 temps,
   trois chaînes étaient presque garanties, quatre possibles. **Elles se ferment
   à 5** : deux chaînes, trois si les deux premières ont été courtes. C'est
   exactement « deux, parfois trois ». La spec disait « toujours » parce qu'elle
   coupait une chaîne en cours à 7 ; le port ne coupe pas en cours, la fermeture
   à 5 produit la même pression.
3. **« Crier de reculer » ne faisait pas céder la ligne.** La spec §5.4 le
   demande (« ligne : cède immédiatement ») : l'issue franche coûte désormais 4
   temps. Les trois survivants ont un prix : la ligne.

### 7.3 L'horloge se lit, sans chiffre

Le moyeu ne changeait de texte qu'à 4 et 7 : le joueur dépensait la moitié de
son budget sans signal, et le seul avertissement arrivait après la perte.

- **Troisième version du moyeu à 2** — « La ligne plie. […] Il te reste le
  temps d'une chose. Peut-être. » C'est la seule phrase ajoutée au texte validé
  de la razzia : sans elle, « Tu as peut-être le temps de deux choses » se
  relisait tel quel après une chaîne, et c'était faux.
- **Un en-tête de scène** (`bandeau`, contrat M20) : pendant le moyeu et les
  quatre chaînes, le bandeau affiche « VAL-DE-GARDE · La ligne tient / La ligne
  plie / La ligne a cédé / Ils avancent vers le bas du village / Ils se
  retirent » à la place de jour, segment, météo et eau. Aucun nombre : l'état du
  monde que le moyeu raconte, rendu permanent — y compris au fond d'une chaîne,
  où le moyeu ne parle pas. Ce n'est pas le compte à rebours que `SPEC_DESIGN`
  rejette.

### 7.4 Cohérence — ce que la relecture croisée a trouvé

Un atelier de six lecteurs indépendants a relu la tranche sous six angles. Les
trouvailles retenues :

- **La confiance de Mathias tombait de 3 à 1** quand on lui proposait de venir
  (ST-VDG-02 C) : le moteur partait de 0 pour un PNJ pas encore compagnon, puis
  la fiche n'était plus lue. Corrigé dans `engine/effects.js` : la confiance part
  de `confiance_initiale`.
- **« Les hommes de la ligne sont tous morts »** contredisait la chaîne A, qui
  en sauve deux à trois. **« tous » est retiré** de l'arrivée et de la base de
  ST-VDG-20 — un mot, deux fois, dans le texte validé. Et la phrase « Les trois
  passent la porte de la forge avant que ça cède » (11-C), qui était de moi,
  contredisait Mathias barricadé : coupée.
- **Parti tôt, on lisait la sortie de la forge comme si on y était.** Variante
  `ajout` de ST-VDG-20 sous `route_tete` ou `route_flot` : « Tu n'as rien vu de
  tout ça. Tu l'apprends sur le chemin, à la nuit, de ceux qui te rattrapent. »
  La sortie F (regarder les orcs partir) ne pose plus `route_flot` : on est
  resté.
- **Le moyeu disait « les Ancel » à qui n'avait pas posé la question.** Le
  libellé C dévoilait la réponse que la chaîne fait payer. Deux options
  exclusives : « Monter au toit des Ancel » si on sait, **« Chercher Jonas »**
  sinon. Même chaîne, même coût, même nombre d'options visibles.
- **« Tu prends tes pointes »** à la forge quand on n'en avait pas demandé :
  deux issues sur `f_vdg_dette_mathias`, la seconde sans les pointes.
- **Être repéré ne coûtait rien.** `f_vdg_repere` était posé quatre fois et lu
  nulle part. Il vaut désormais **−15** sur les options tirées des chaînes jouées
  ensuite (12-A, C, D, E · 13-B, C · 14-A). Aucun texte ajouté.
- **Arriver à la porte de la forge** et repartir laissait la chaîne B ouverte :
  on rejouait toute la traversée et le discours de Mathias. Repartir de la porte
  ferme B.
- **La réserve** : « deux outres » donnaient deux rations d'eau ; elles donnent
  deux outres, et la capacité d'eau se cumule par outre (M22). Les quantités
  doublent pour que « le sac pèse lourd » (un mot changé : « trop » → « lourd »,
  le poids ne dépassait jamais la capacité de port).
- **Mathias dit « ma masse »** dans deux textes validés ; sa fiche portait une
  hache lourde, visible à l'écran Compagnons. **`OBJ-16` Masse de forge** (M22).
- **La note de Jonas** (`PNJ-F2`) le disait « parti avant l'attaque » — c'était
  la v3. Alignée sur la tranche, et le canon le dit.
- **`FIN-T1`** disait « avant que quelqu'un d'autre ne s'en charge » ; Mathias
  dit « Personne ne viendra le dire à leur place ». La fin dit la même chose
  que lui.
- **Les seuils `adresse ≥ 3` et `perception ≥ 3`** étaient toujours vrais au
  départ (stats 2/3/3/2) : bonus inconditionnels. Passés à 4 dans la razzia : un
  point dépensé après l'ouverture les débloque.

### 7.4 bis Fuites et impasses — second lecteur

- **« Nouvelle partie » écrasait la partie en cours d'un seul tap**, sans
  confirmation, sur un écran où le pouce part vite. L'écran titre demande un
  second geste tant qu'une sauvegarde existe : « Effacer et recommencer » ou
  « Garder la partie en cours ».
- **Les options affichées survivaient à l'inventaire.** Choisir « Tirer »,
  ranger l'arc, revenir : le choix se validait quand même, car
  `resoudreOption` ne revérifiait ni `requiert`, ni `apparait_si`, ni le coût.
  Le moteur revérifie au moment de résoudre, et l'interface recalcule les
  options après chaque geste d'inventaire — la sélection tombe si elle n'y est
  plus.
- **« Tirer depuis le toit du puits » exigeait trois flèches, pas l'arc.** Il
  l'exige, comme la chasse.
- **« Les orcs pressent » retardait la pression d'un jour** au lieu de
  l'avancer : signe inversé dans `engine/time.js`. Socle v3 ; l'état de
  référence v3 bouge d'un cheveu.
- **`D04` tirait un ou deux mutateurs** comme un run v3, alors que le package
  d'une tranche est défini. Un départ peut fixer ses mutateurs (M23) ; `D04`
  n'en a aucun.
- **L'écran « Le jeu s'est arrêté »** n'avait pas de bouton : un plantage de
  rendu lié à l'état aurait bloqué le téléphone pour de bon. Un bouton efface
  la partie et rend le titre.
- **Le robot du vérificateur s'évadait** d'une scène déclenchée sans option
  — ce que l'interface ne fait plus. Il y reste coincé comme le joueur : une
  impasse est désormais un plantage mesuré. Et un auto-test rejoue une
  sauvegarde faite au milieu de la razzia : même scène, mêmes options, même
  état.

### 7.4 ter Téléphone et équilibrage — troisième et quatrième lecteurs

Le troisième a joué dans Chromium en 390 × 844 et 390 × 664 (Safari avec ses
barres) ; le quatrième a joué 4 800 parties sous seize politiques.

- **44 px morts en haut sur le web** : le padding d'encoche iOS s'appliquait
  aussi au navigateur. `Platform.select`, et le panneau d'options se borne à
  40 % de la hauteur sur un petit écran au lieu de 290 px fixes.
- **Le fil s'ouvrait défilé à la fin** : l'arrivée d'une scène nouvelle était
  cachée selon la longueur de la précédente. On ne suit le fil qu'au tour
  suivant de la même scène ; une scène nouvelle se lit depuis le haut.
- **« Le jour se lève » sous « Milieu de journée »**, et un gel tiré au sort
  sous « Le soleil monte » : un départ fixe son premier matin (M24). `D04`
  ouvre au matin, ciel clair.
- **« Une partie suivante saura qu'il est tombé »** puis, trois panneaux plus
  bas, « Rien ne sera conservé » : une fin dit elle-même ce qui suit
  (`apres`, M25). `FIN-T1` : « Le chapitre suivant partira d'ici. »
- **« Réparer (matériaux) » était un bouton mort** sans matériel, et le
  contrôleur de session portait un identifiant d'objet en dur. `OBJ-13` déclare
  `repare: 30`, le moteur le reconnaît à ça (`materielReparation`), le bouton se
  grise et le dit.
- **Les neuf fiches de compétences vouvoyaient** ; elles tutoient, comme tout
  le jeu.
- **`survivants`, la récompense de la chaîne A et de « prévenir », n'était
  affiché nulle part.** Le bilan le montre : « Sortis du village grâce à toi ».
- **« Chercher un chariot » dominait « Charger »** : même coût, certain, deux
  fois plus. Le chariot coûte 3 : vite et léger contre lent et lourd.
- **La compétence du niveau 2 n'avait aucun effet dans la tranche.** Ce que
  sa fiche promet est branché : « Main sûre à l'arc » +10 sur le tir de la
  chasse et depuis le toit du puits ; « Pas silencieux » +10 sur la descente
  vers le chevreuil, la rue vers la forge, l'attente de l'orc. Aucune option
  nouvelle.
- **« Demander à quelqu'un qui court »** s'épuisait au premier refus et tuait
  la chaîne C sans préparation ; on retente sur place, un temps la tentative.
- **« Ce que tu n'as pas fait, tu ne le feras plus »** se lisait à 4, au
  moment précis où une troisième chaîne restait jouable — dans 100 % des
  parties gourmandes. La phrase passe au retrait (7), où elle est vraie. Un
  déplacement dans le texte validé, pas une coupe.
- **L'XP de l'ouverture** : une réplique valait 10, soit le niveau 2 avant la
  chasse dans 85 % des parties et quatre niveaux en vingt minutes (6 à 11 XP
  par minute contre 1,5 en v3). Les répliques valent 5. Le barème complet de
  la tranche contre la courbe v3 reste une décision pour Tom (§7.6).

### 7.4 quater Relecture adverse du diff

Quatre relecteurs ont repassé le diff pour le casser. Ce qui a tenu et a été
corrigé :

- **La chasse dévorait la journée** : quatre options à 1 segment, la cloche
  sonnait « Nuit » et la forge s'ouvrait « en fin d'après-midi » sous « Nuit
  profonde ». Monter aux bois coûte le segment, observer le chevreuil aussi
  (règle 7), le reste de la chasse n'en coûte plus : la cloche sonne en milieu
  de journée ou l'après-midi.
- **« Mathias est déjà là où il avait dit »** se lisait aussi quand on était
  parti sur la route, juste avant « ceux qui te rattrapent ». La variante ne
  s'affiche plus sur la route. Et il pose la masse, plus « contre le mur » — la
  phrase était de moi, et sur un chemin il n'y a pas de mur.
- **Le commentaire d'en-tête de `vdg-razzia.js`** décrivait l'horloge d'avant.
  Réécrit à l'échelle réelle.
- **Le contrat** : M22 citait le mauvais paragraphe, §6 comptait 15 objets, et
  une clé de `libelles.bilan` n'était lue nulle part.
- Un relecteur proposait de fermer la forge, le toit et la réserve à 4 pour
  que « Il te reste le temps d'une chose » soit toujours exact à 2-3. À 4, ce
  serait « jamais trois chaînes » : la spec veut « parfois trois ». Le
  « Peut-être » du texte validé porte cette incertitude ; gardé à 5.
- Un relecteur notait que tout joueur a vu Jonas monter à une échelle au beat
  3, et que « Il pouvait être n'importe où » (ST-VDG-13 sans la question du
  matin) force le trait. La phrase est validée (`SPEC_CONTENU` §5.6) ; le
  joueur sait qu'il est sur un toit, pas lequel. Laissé, signalé.

- **Dépenser un point ou apprendre une compétence** laissait aussi les options
  affichées périmées — six options v3 dépendent d'une compétence. Les deux
  gestes passent par le même recalcul que l'inventaire (`pousserOptions`).
- **La confiance avait trois lectures** : l'effet partait de la fiche, les
  conditions et le recrutement non. Une seule dérivée, `confianceDe`, lue par
  les trois. Et `PNJ-04` portait `confiance_initiale: 25` sur une jauge bornée
  à 5 : ramenée à 5.
- **Le contrôle M21** acceptait comme bloc du bilan n'importe quelle clé de
  `libelles.bilan`, y compris un libellé de ligne. Les lignes vivent dans
  `libelles.lignes_bilan` ; `libelles.bilan` ne contient que des blocs, et le
  contrôle est exact.

### 7.4 quinquies Récit et contrat — cinquième et sixième lecteurs

- **À 5-6, le moyeu n'offrait que « Prendre la route »** : deux tiers des
  joueurs qui s'étaient battus étaient mis dehors et lisaient « Tu n'as rien
  vu de tout ça ». « Les regarder s'en aller » apparaît dès 5 : rester est un
  choix.
- **Les deux questions à la forge coûtent « un peu de temps »** dans le texte
  validé — rien dans le jeu. Elles coûtent une part de matinée, comme au seuil.
  Savoir où est Jonas se paie en voix entendues.
- **« Crier de reculer » sautait au retrait** depuis 3 (+4 → 7). La spec dit
  « la ligne cède » : un état, pas un saut. `stat_partie` accepte `'='` (M26)
  et l'horloge se pose à 4.
- **« Épargner coûtait de l'XP »** (§0 bis r.5) — trouvaille réfutée après
  essai. Attendre que l'orc passe rapporte 15, le frapper 25 : mais la règle
  vise une unité *mise hors de combat* — tuée, neutralisée, mise en fuite.
  Laisser passer, se cacher, contourner, c'est se dérober : la rencontre n'a
  pas eu lieu. Un contrôle automatique sur cette lecture large faisait payer
  la fuite par les ronces autant que la bête tuée en v3 ; il est retiré, la
  règle est précisée au contrat (M26). « Crier de reculer » passe à 30 comme
  le tir, pour l'équilibre de la chaîne A — rien à voir avec r.5.
- **Une issue tirée pouvait tuer un compagnon** (`sante_compagnon` à 0,
  `pnj_statut: mort`) : règle 9 étendue au compagnon, moteur et vérificateur.
- **Observer n'aidait pas** (§4 r.7) : avoir vu le village d'en haut vaut +10
  au tir depuis le puits et au chargement de la réserve ; avoir lu les
  empreintes vaut +10 pour lire la rue depuis le toit. `f_vdg_vue_haute` a un
  lecteur.
- **« Je t'avais dit avant-hier »** se relisait à chaque réponse de Mathias,
  jusqu'à quatre fois : à l'arrivée seulement (`["tour", 1]`).
- **« D'ici, une flèche porte droit »** s'affichait sur la piste de sang, après
  la fuite du chevreuil. Plus après le tir.
- **Entré par « Chercher Jonas »**, le joueur ne lisait jamais l'échelle et la
  botte défaite : une variante les montre une fois Jonas situé sur place.
- **Le vérificateur avait des angles morts** : une clé de coût mal écrite
  passait en silence, un `lieu.type` inconnu aussi, et une scène déclenchée
  pouvait n'offrir aucune sortie à un tour. Bloquants désormais.
- **« Charger, et prévenir les familles cachées »** annonçait des familles que
  l'arrivée nie ; le libellé validé est « Charger et prévenir ».

### 7.4 sexies Dernière relecture — vérificateur et interface

- **La fin de la v3 pouvait se perdre.** Ouvrir `ST-FIN-01` puis partir par la
  carte : la scène, unique, ne revenait jamais, et la partie ne pouvait plus
  finir que par la mort. Reproduit. Elle n'est plus unique : elle revient au
  prochain lieu (M27). Le vérificateur interdit désormais qu'une scène qui
  porte une fin soit à la fois unique et quittable.
- **Le robot voyageait après la fin de partie** quand la fin tombait sur une
  option « sortie », et y perdait de la santé que personne ne voit. Il s'arrête
  à la fin, comme l'interface. La mesure v3 en est un peu plus juste : jours
  7,8 au lieu de 7,9.
- **Le vérificateur** : un palier d'en-tête sans condition avant le dernier
  masquait tous les suivants sans rien dire — bloquant. Les champs d'un départ
  (storylet, météo, mutateurs, segment) sont contrôlés. L'auto-test de reprise
  part d'une vraie sauvegarde v1 prise au milieu de la razzia, avec un fil de
  40 entrées, et la fait remonter la chaîne de migration.
- **L'écran titre** distingue une partie en cours, une partie finie (« Revoir
  le bilan », et « Nouvelle partie » sans confirmation : il n'y a plus rien à
  perdre) et une sauvegarde illisible par cette version.
- **L'en-tête de la razzia** passait sur deux lignes avec SURCHARGE et coupait
  le palier le plus long. Le titre ne se coupe plus, le libellé cède la place.
  Vérifié à 360 px.
- **L'après** affichait « Milieu de journée » sous « La porte de la forge
  s'ouvre en fin d'après-midi » : en-tête « Val-de-Garde · Après la razzia ».
  Et plus de coût sous la seule option de la scène.
- **La liste des départs** disait de tous qu'« une ou deux variables du monde
  sont tirées par-dessus » : seulement sous les trois départs v3.
- **Les badges, une créature et un objet vouvoyaient** : tout le jeu tutoie.

### 7.5 Le reste de l'audit

- **Le bilan** : une fin déclare les blocs qu'elle montre (M21). `FIN-T1` montre
  les décisions et les survivants — Mathias vivant, **Jonas disparu** — et plus
  « 1 badge sur 10 » ni « 5 lieux jamais atteints ». Au passage, l'écran de
  bilan et le titre tutoient, comme tout le jeu ; trois clés de `libelles.bilan`
  n'étaient pas lues.
- **Le dernier tour d'un beat** n'est plus tenu au plancher de 3 options (M19).
  Mesuré : ST-VDG-02, 03, 04, 10, 13 descendaient à 1 ou 2 quand il ne restait
  que la sortie. On n'ajoute pas une option pour tenir un quota.
- **`D04` ne porte plus la viande** de la chasse avant d'être allé chasser (§6.4
  point 2, tranché).
- **Faim, fatigue, soif** restent inertes sur vingt minutes (§6.4 point 1) :
  accepté tel quel. Les jauges disent vrai, elles ne bougent pas.

### 7.6 Ce qui reste signalé, pas corrigé

- **Partir tôt ne rapporte rien dans la tranche.** La spec §5.8 veut « une
  position et une fenêtre de patrouilles » : c'est le premier POI de la route
  (MVP 2) qui lira `f_vdg_route_tete` et `f_vdg_route_flot`. Dette inscrite.
- **La courbe d'XP.** `SEUILS_XP` est celle d'un run v3 de 4 à 5 h ; la tranche
  en consomme un quart en vingt minutes même après la retouche de l'ouverture.
  Étirer la courbe (un nombre moteur, la mesure v3 bougera) ou accepter qu'un
  chapitre de 1 h 30 monte vite : à Tom.
- **Les pastilles** Personnage et Compétences s'allument pendant une scène
  déclenchée et invitent à la quitter. Elles disent vrai ; les éteindre
  masquerait des points à dépenser. Laissées.

- ST-VDG-03 dit « on n'a pas le temps de les prendre tous » alors qu'avec la
  matinée entière, on prend les trois voix. Texte validé, contradiction de la
  spec elle-même : à Tom.
- Dans ST-VDG-12, « Le frapper maintenant » use l'arme équipée — l'arc — alors
  qu'on frappe au couteau. Le coût s'affiche, l'objet usé est le mauvais ;
  corriger demanderait un coût d'usure ciblé que le schéma n'a pas.
- Sortir d'une chaîne par Z puis y revenir remet son état local à zéro
  (« Chercher chez lui » se rejoue, la traversée vers la forge se repaie).
  Renoncer coûte 1 temps, ce qui le rend rare, et revenir sur ses pas se repaie
  en temps : cohérent. Un lecteur proposait de fermer pour de bon une chaîne
  abandonnée (`!vu`) — c'est un choix de design, pas une faute : à Tom.
- `duree_segments` n'est lu nulle part : donnée morte du schéma v3.
- `vdg_voix`, `f_vdg_ligne_tenue`, `f_vdg_vue_haute`, `f_vdg_chariot` sont
  écrits et jamais lus : ce sont les retombées que la spec réserve à la suite.

- **Le tout premier choix — neuf flèches ou douze — ne se paie nulle part**
  dans la tranche : « Tirer depuis le toit » en coûte 3, on en a toujours au
  moins 8. `SPEC_DESIGN` §6.8 vise la bascule tactique (MVP 3), où les flèches
  partent par tour. Dette inscrite.
- **« Ils suivent quelque chose. »** (ST-VDG-13, l'indice de la poursuite) est
  une interprétation, contre la lettre de §0 bis r.1 — mais c'est le texte
  validé de `SPEC_CONTENU` §5.6. Gardé ; à Tom de trancher s'il faut
  l'assouplir au contrat ou couper.
- **Neuf points où le contrat se contredit ou contredit `SPEC_DESIGN`** (deux
  ou trois paliers sur un majeur, « aucun dysfonctionnement visible » contre
  la relève qui manque, etc.) sont listés dans le rapport du lecteur
  « contrat » (`scratchpad/wf/contrat/`) : une passe de correction
  documentaire, pas de code. À planifier.
- Le journal `vdg_demande` dit « les trois pointes qui manquaient » même quand
  Mathias n'en avait que deux.

### 7.7 État de référence après l'audit

```
MVP 1 (D04)  30/30 · FIN-T1 30/30 · scènes 8,8/11
             chaînes bouclées 1,3/4 — réparties 0:7 · 1:8 · 2:14 · 3:1
             horloge finale 3,7/7
             joueur strict (200 parties) : 2 chaînes 64 % · 3 chaînes 36 %
```

### 7.8 Les écarts au texte validé, tous

Ce que la livraison avait changé sans le dire, ce que l'audit a changé en le
disant. Rien d'autre n'a bougé.

| Où | Écart | Pourquoi |
|---|---|---|
| ST-VDG-03 | « la Saint-Jean » → « les foins » | lexique chrétien banni (§6.1) |
| ST-VDG-10 | version à 2 ajoutée : « La ligne plie… Il te reste le temps d'une chose. Peut-être. » | « deux choses » se relisait faux après une chaîne |
| ST-VDG-10 | « Ce que tu n'as pas fait, tu ne le feras plus » déplacé de 4 à 7 | faux à 4, vrai à 7 |
| ST-VDG-11 C | « Les trois passent la porte de la forge avant que ça cède » — de moi, coupé | contredisait la forge barrée |
| ST-VDG-12 | « Reculer et tenter la rue » (B.2) non porté ; « Tu attends encore, plaqué au mur… » ajouté à la partielle d'« Attendre » | Z recule déjà d'une rue ; le beat B.2bis n'existe pas |
| ST-VDG-14 | « Le sac pèse trop » → « pèse lourd » ; « Il ne passera pas partout » (de moi) coupé ; variante `surcharge` (de moi) gardée | l'état ne dépassait jamais la capacité ; rien ne lisait la promesse |
| ST-VDG-14 B | « Charger, et prévenir les familles cachées » → « Charger et prévenir » | libellé validé, et l'autre dévoilait |
| ST-VDG-20 | « tous morts » → « morts », deux fois ; variante « Tu n'as rien vu de tout ça… » ajoutée | la chaîne A sauve des hommes ; parti tôt, on n'était pas là |
| ST-VDG-20 Z | « la masse contre le mur » → « la masse » (phrase de moi) | sur un chemin, pas de mur |
| ST-VDG-02 D | seconde issue sans « Tu prends tes pointes » | on n'en avait pas demandé |
| ST-VDG-13 | variante « Tu ne sais pas où il est… » conservée ; l'arrivée validée rejouée une fois Jonas situé | texte validé ; sinon jamais lu |

La v3 bouge d'un cheveu, par la pression corrigée : jours 7,9, survie qui mord
17/30. Rien d'autre.


---

## 8. Personnalisation — ce que la tranche rend des choix passés

Décision de Tom après l'audit : **augmenter la cohérence et la personnalisation
de la narration en fonction des choix passés.** Aucune scène ajoutée : des
rappels d'une phrase, posés au moment où le choix compte, et la dernière
réplique de Mathias qui dépend de ce qui s'est passé entre les frères.

### 8.1 Les rappels

| Choix | Où il revient | Fréquence (600 parties) |
|---|---|---|
| Ce que la matinée a laissé (seuil, forge) | l'arrivée de la traversée dit si la matinée est entière ou entamée | 8 % · 75 % |
| La voix du puits (traversée) | le soldat est au bout de la ligne (chaîne A) | 20 % |
| La voix du sud | la charrette du marchand devant le cellier (chaîne D) | 11 % |
| La voix de l'autel | la vieille femme sort la dernière de la forge (l'après) | 54 % |
| Demander où est Jonas | Mathias, à la porte : « Jonas était sur le toit des Ancel. Va voir. » | 20 % |
| Ne pas l'avoir demandé | « Ce matin, il descendait d'une échelle. Tu ne sais pas laquelle. » | 19 % |
| Sauver des hommes de la ligne | « Les hommes de la ligne sont morts, presque tous. » | 20 % |
| Prévenir les familles du cellier | elles remontent du bas du village (l'après) | 17 % |
| Parler à Mathias à travers la porte | « Je n'ai pas ouvert. » | 23 % |
| Lui proposer de venir, et ramener la chasse | « Tu as ramené quelque chose. » | 20 % |
| Ne pas être allé à la forge | « Tu n'es pas venu à la forge. » | 40 % |

Une partie en rencontre **3 à 5** ; aucune n'en rencontre zéro. Les trois
voix de la traversée, qui ne servaient à rien, ont chacune une suite : le
choix de la matinée — combien de voix — se paie désormais dans la razzia.

### 8.2 Le journal

Le bilan rend **4,2 décisions** par partie au lieu de 3,2 : le tir depuis le
puits, l'appentis de la forge, les traces au pied de l'échelle, le cellier
chargé, le chariot, l'invitation à Mathias. « Les trois pointes qui
manquaient » ne se lit plus quand il n'en restait que deux.

### 8.3 Contrat

**M28 (extension)** : les rappels — un `ajout` de 20 mots au plus qui rend un
choix passé — ne comptent pas dans le plafond de 3 variantes ; cinq au plus
par storylet. Le plafond protégeait d'une chaîne logée dans un storylet, ce
qu'une phrase ne peut pas faire. Il empêchait l'après de rendre ce que le
joueur avait fait. Le vérificateur compte les deux séparément.

### 8.4 Écarts au texte validé (s'ajoutent au §7.8)

| Où | Écart | Pourquoi |
|---|---|---|
| ST-VDG-03 | deux versions de l'arrivée, selon la matinée ; la validée reste pour la matinée « presque entière » | la règle était invisible |
| ST-VDG-13 | « Il pouvait être n'importe où » → « Ce matin, il descendait d'une échelle. Tu ne sais pas laquelle. » | tout joueur l'a vu sur l'échelle au beat 3 |
| ST-VDG-20 | « sont morts, presque tous » quand la chaîne A a sauvé des hommes | sinon l'arrivée démentait la chaîne |
| ST-VDG-20 Z | une phrase de Mathias avant la réplique validée, selon le parcours ; la réplique validée est intacte dans les quatre cas | personnalisation |
| ST-VDG-14 | variante « le sac tire » (de moi, jamais vraie) retirée | morte |

### 8.5 Ce que ça ne règle pas

Partir tôt, le chariot et neuf flèches contre douze n'ont toujours pas de
conséquence mécanique dans la tranche : leurs retombées sont celles de la
route (MVP 2) et de la couche tactique (MVP 3). La tranche les rend au moins
au journal.
