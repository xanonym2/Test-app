# Mission — Étape 2 : MVP 1 « Les vingt premières minutes »

**But :** que Tom joue l'ouverture, la razzia et l'après dans le vrai moteur,
avant tout nouveau système.

**Périmètre : du contenu.** Deux exceptions seulement : rendre le départ `D04`
choisissable à l'écran titre, et afficher le message de permadeath de Mathias si
le bandeau existant le permet. Si le moteur ne permet pas autre chose,
**arrête-toi et signale-le** : on ne contourne pas le moteur sans accord.

Régime : **majeurs et jalons** (`docs/PRODUCTION.md` §1) — un par un, relecture
intégrale.

---

## Lectures

`CLAUDE.md` · `docs/PRODUCTION.md` · `content/CONTRAT.md` · `content/CANON.md` ·
`docs/RELEVE.md` · dans `docs/spec/` :

- `SPEC_CONTENU_storylets.md` §4 (l'ouverture) et §5 (la razzia, jusqu'à §5.9) ;
- `SPEC_DESIGN_terres-voilees.md` : « États d'échec — le héros ne meurt pas »,
  puis §6.5 à §6.10 ;
- `SPEC_MONDE_terres-voilees.md` §1 et §6 ;
- `SPEC_COMPAGNONS_terres-voilees.md` : Mathias.

## Ce qu'il faut produire

1. **Le départ `D04` — « La razzia »** (contrat §11). Inventaire de départ : celui
   de la v3. Neuf flèches : il en manque trois pour une bonne journée, et c'est
   voulu. Ajoute `D04` au §11 du contrat — extension du plan, à signaler.
2. **L'ouverture**, cinq beats, **version longue seulement** : la courte attend la
   sauvegarde de partie. Premier vrai choix avant 200 mots (contrat §4).
3. **La razzia**, à moyeu : un storylet moyeu, un storylet par chaîne — A la
   ligne, B la forge, C le toit des Ancel, D la réserve —, et la sortie E,
   partir maintenant. Horloge : à 4, la ligne cède ; à 7, les orcs se retirent.
4. **L'après** : les cachés sortent de la forge, Jonas manque, Mathias devient
   compagnon, la mission tombe — prévenir la Couronne. Fin sur
   `{ fin: 'FIN-T1' }`, « Fin de la tranche », déclarée dans `meta.fins`.
5. **Mathias** : fiche complète pour `PNJ-F1` (schéma du §8), rôle combat
   rapproché. Son trait « Bras de forge » attend le roster (contrat §24).
6. Identifiants des storylets : `ST-VDG-<nn>`.

## Pièges connus

- **Le texte est validé.** Tom a validé beat par beat celui de `SPEC_CONTENU` : on
  le **porte** dans le schéma, on ne le réécrit pas. On ne coupe que ce que les
  plafonds de longueur imposent, et on le signale.
- **Le plafond de 2 à 3 variantes** (§0, règle 12) interdit de loger une chaîne
  entière dans un storylet : un storylet par chaîne, qui rend la main au moyeu.
- **L'état traverse les storylets** — temps, alerte, blessure, charge, flèches,
  piste de Jonas. L'état local ne suffit pas : drapeaux, objets, états du héros
  et compteurs `stat_partie` (par exemple `razzia_temps`) le portent avec les
  opérateurs existants. S'il faut autre chose, signale-le.
- **La bascule tactique de la chaîne A n'existe pas encore.** La chaîne reste
  narrative, ou passe par `ST-CBT-01`.
- **Personne ne meurt pendant la razzia.** Une situation critique déclenche une
  fuite forcée, qui mène à l'après avec des pertes.
- **Rien n'est nommé.** Les orcs traversent, n'incendient pas, ne prennent rien :
  des faits observés, jamais une explication (contrat §0 bis).
- **Les orcs se retirent d'eux-mêmes.** Aucun texte ne laisse croire au joueur
  qu'il a sauvé le village.
- **Ce qui autorise à partir vient de Mathias**, jamais du narrateur
  (`SPEC_DESIGN` §6.8).
- **`majeur: true`** sur le moyeu, les chaînes et les beats à risque : chaque
  option risquée a une issue `partielle`.
- **La famille Ancel est « à valider ».** L'écrire telle que `SPEC_CONTENU` la
  décrit ; Tom la jugera en jouant.

## Vérifier

- `npm run verif` : 0 bloquant. Le robot joue `D04` jusqu'à `FIN-T1` dans au
  moins 10 des 30 parties.
- L'état de référence de la v3 ne se dégrade pas.

## Clôture

- Inscris au canon les faits de ces storylets.
- Rapport `docs/lots/MVP1.md` (format de `docs/PRODUCTION.md` §9), avec **tous**
  les storylets en entier : régime majeur, relecture intégrale.
- Commit, push. Message de fin : ce qui est fait, ce qui a été coupé et
  pourquoi, le lien de la version web.
