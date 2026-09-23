# Canon — faits établis par le contenu

Les specs fixent le monde ; ce registre fixe **ce que les storylets en ont dit**.
Un nom de PNJ, un détail de lieu, une rumeur, un lien entre deux personnages :
dès qu'un storylet l'affirme, il devient vrai pour tous les autres.
**Deux storylets qui se contredisent, c'est un monde qui ment au joueur.**

## Règles

- On le lit **en entier** avant d'écrire un lot. On y inscrit les faits nouveaux
  après le vérificateur.
- Un fait par ligne : `entité · fait · storylet source · visible dès le chapitre n`.
- Un fait du canon ne change jamais en silence : s'il change, on corrige dans le
  même commit **tous** les storylets qui l'emploient.
- Un fait qui touche au récit principal et qu'aucun brief n'a demandé est noté
  **à valider** : il attend Tom.
- Les faits de conception — personnages principaux, factions, retournements —
  restent dans `docs/spec/SPEC_MONDE_terres-voilees.md`. Ils ne se recopient pas
  ici.

---

## Lieux

- **Le toit des Ancel** · toit en réfection à Val-de-Garde ; Jonas y travaille le
  matin de la razzia, ce qui le situe hors de chez lui · `SPEC_CONTENU` §5.3,
  chaîne C · chapitre 1
- **La tour de guet de Val-de-Garde** · sur le versant au-dessus du village ; sa
  cloche n'a pas sonné depuis huit ans, depuis la paix · `ST-VDG-01` · chapitre 1
- **La forge de Mathias** · ouverte des deux côtés, au milieu du village ; elle a
  une porte qu'on peut barrer de l'intérieur et un appentis non barré dehors ·
  `ST-VDG-02`, `ST-VDG-12` · chapitre 1
- **Le cellier commun** · au bas du village, à l'écart des passages ·
  `ST-VDG-14` · chapitre 1
- **L'abri effondré** · près de l'autel du village ; une vieille femme le balaie ·
  `ST-VDG-03` · chapitre 1

## Personnages secondaires

- **La famille Ancel** · famille de Val-de-Garde, sans rôle au-delà de son toit ;
  ne porte aucune faction, aucun secret, aucun lien avec les retournements ·
  `SPEC_CONTENU` §5.6 · chapitre 1 — **validée le 21/09/2026**

## Objets et choses vues

- **Les empreintes de la piste de sang** · quatre doigts, griffes profondes, plus
  large qu'un loup ; vues au sol pendant la chasse, sans que la bête soit
  rencontrée · `ST-VDG-04` · chapitre 1
- **L'échelle des Ancel** · restée contre le mur, le chaume à moitié posé, la
  botte défaite. Elle y est encore après la razzia · `ST-VDG-13`, `ST-VDG-20` ·
  chapitre 1

## Rumeurs — ce qu'on raconte

*Trois phrases entendues au village le matin de la razzia. Personne ne les
commente, personne n'enquête : elles se lisent comme du décor.*

- **La relève de la garnison** · elle devait arriver au printemps, on est en été ;
  deux hommes en moins ce mois-ci, personne pour les remplacer, depuis trois
  mois · `ST-VDG-02`, `ST-VDG-03` · chapitre 1
- **Le prix du sel** · il a pris un tiers depuis les foins, personne ne sait
  pourquoi · `ST-VDG-03` · chapitre 1
- **Les frères de l'Ordre** · ils ne sont pas passés au village ce mois-ci, ni le
  mois d'avant · `ST-VDG-03` · chapitre 1

## À valider

*(vide)*

---

## Ce qui n'est délibérément pas au canon

**Les faits du contenu v1 (« Val-de-Garde », 22 storylets).** Le relevé
(`docs/RELEVE.md` §5) classe ce contenu : 8 récupérables, 11 structure seule,
3 retirés. Inscrire ses lieux, ses PNJ et ses rumeurs ici lierait l'étape 2 à
des détails que le remappage va défaire. Ils entreront au canon au fur et à
mesure que la carte cible reprendra ce qui doit être repris.

**Décision du 21/09/2026.** La famille Ancel, elle, entre au canon parce que
l'étape 2 s'appuie dessus : elle situe Jonas au matin de la razzia et ouvre la
chaîne C. Elle ne porte rien d'autre — c'est ce qui la rend sans risque.
