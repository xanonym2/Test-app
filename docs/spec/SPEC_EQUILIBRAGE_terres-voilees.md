# Les Terres Voilées — Équilibrage

**Version :** 2.1 — **à tester, pas à croire**
**Statut :** cible — nombres proposés, jamais mesurés
**Dernière mise à jour :** 21 septembre 2026

> **Ce fichier est la cible, pas la vérité.** Les nombres qui tournent sont ceux du code (`engine/schema.js`, `content/*.js`), mesurés par le vérificateur sur 30 parties. Un nombre de ce fichier entre dans le contrat quand il est implémenté et mesuré (`content/CONTRAT.md`, préséance). Deux sources de vérité pour un même nombre, c'est zéro source de vérité.
>
> Les valeurs de la v3 et celles-ci ne sont pas encore réconciliées : ce travail commence à la lecture de `engine/schema.js`.

> **Statut réel de ces valeurs :** elles sont **cohérentes entre elles**, pas validées par le jeu. Aucune n'a été testée. Elles existent pour que quelque chose de jouable sorte — le vrai équilibrage commence au premier run testé.

---

## 1. Le héros

| | Niveau 1 | Progression | Niveau 10 |
|---|---|---|---|
| Points de vie | 30 | +4 / niveau | 66 |
| Dégâts de base | 4 | +1 tous les 3 niveaux | 7 |
| Capacité de charge | 40 | +2 / niveau | 58 |

**Courbe d'expérience** — 15 compétences sur 3 chapitres, une tous les 2 niveaux

| Passage | XP requis |
|---|---|
| 1 → 2 | 60 |
| chaque niveau suivant | +30 |
| 9 → 10 | 300 |
| **Total chapitre 1** | **1 620** |

**Gains d'expérience — par unité mise hors de combat (tuée, neutralisée ou mise en fuite), jamais au forfait de combat**

> **Épargner ne coûte jamais d'expérience** (correction du 21/09/2026). « Par unité tuée » punissait les options non létales, qui doivent exister dès le chapitre 1.

> **XP = coût de menace × 10.** Le multiplicateur de niveau est déjà contenu dans la menace.

| | Niveau 1 | Niveau 2 | Niveau 3 |
|---|---|---|---|
| **C** | 10 | 15 | 20 |
| **B** | 25 | 40 | 60 |
| **A** | 40 | 55 | 70 |
| **S** | 70 | 100 | 130 |

Traits inclus : **Meneur ×1,5**, **Vétéran ×1,3**.

**Avantage structurel :** XP et difficulté restent verrouillées ensemble. Tout ajustement sur une unité met son XP à jour automatiquement, et il devient impossible qu'un ennemi facile rapporte gros.

**Autres sources**

| Source | XP |
|---|---|
| Storylet mineur | 15 |
| Storylet standard | 40 |
| Storylet majeur | 100 |
| Jalon narratif | 150 |

> **Le récit paie mieux que la chasse**, ce qui est voulu : chasser des bêtes ne doit jamais être une façon efficace de monter de niveau.

> ⚠ **Vérification, et conséquence du passage à l'XP par unité.** Un run de chapitre 1 avec 11 POI visités, 2 combats tactiques et 3 jalons rapporte désormais ≈ **1 380 XP** au lieu de 1 570 — le joueur finirait au **niveau 9** et non 10.
>
> **C'est le premier chiffre à mesurer en test.** Soit on abaisse la courbe, soit on l'accepte.

---

## 2. Unités — C / B / A / S

> **Correction du 16/09/2026 — armures ramenées à 0-2.** L'ancienne table donnait 3 à 4 points d'armure à des unités frappées par des coups de 6-8, ce qui divisait les dégâts par deux ou trois : les rangs B et S encaissaient le double de ce que leur coût de menace supposait. Les compositions `danger:4` et `danger:5` étaient en réalité un tiers plus dures qu'annoncé.

**Heuristique de menace :** (coups pour tuer à l'épée 8) × (dégâts par tour) ÷ 10.

| Rang | PV | Dégâts | Armure | Vitesse | Menace |
|---|---|---|---|---|---|
| **C1** | 12 | 4 | 0 | 3 | 1 |
| **C2** | 15 | 5 | 0 | 3 | 1,5 |
| **C3** | 18 | 6 | 1 | 3 | 2 |
| **B1** | 24 | 6 | 1 | 1 | 2,5 |
| **B2** | 30 | 8 | 2 | 1 | 4 |
| **B3** | 36 | 10 | 2 | 1 | 6 |
| **A1** | 18 | 5 | 1 | 2 | 4 |
| **A2** | 22 | 6 | 1 | 2 | 5,5 |
| **A3** | 26 | 7 | 2 | 2 | 7 |
| **S1** | 40 | 10 | 2 | 2 | 7 |
| **S2** | 48 | 12 | 3 | 2 | 10 |
| **S3** | 56 | 14 | 3 | 2 | 13 |

### Chevauchements — ce qui tient et ce qui ne tient pas

| Paire | Verdict |
|---|---|
| **C3 (2) ≈ B1 (2,5)** | ✅ Un rôdeur aguerri vaut une ligne fraîche. **C'est le chevauchement qui compte** : il empêche les C de devenir obsolètes en fin de partie |
| **A3 (7) = S1 (7)** | ✅ Un spécialiste vétéran vaut un chef frais. Deux cibles prioritaires |
| **B3 (6) contre A1 (4)** | ❌ Ne tient plus — **et n'aurait jamais dû tenir** |

> **La catégorie est un rôle, pas un rang.** Un A n'est pas « au-dessus » d'un B : il fait autre chose. Un spécialiste de niveau 1 (18 PV, 5 de dégâts) est objectivement moins menaçant qu'une ligne de niveau 3 (36 PV, 10 de dégâts). Leur donner le même coût forçait un chiffre faux pour préserver un tableau symétrique.

Le rang A paie cher au regard de ses statistiques parce qu'il **change les règles**, pas parce qu'il encaisse. Un A1 mal protégé meurt vite — c'est voulu.

**Traits**

| Trait | Effet |
|---|---|
| **Meneur** | +2 dégâts et +1 armure aux unités de sa zone. Coût de menace ×1,5 |
| **Vétéran** | +25 % PV, +1 dégâts. Coût de menace ×1,3 |
| **Nommé** | Valeurs sur mesure, hors table |

---

## 3. Budget de menace par niveau de danger

| Tag | Budget | Composition typique |
|---|---|---|
| `danger:1` | 4 | 3 C1 + 1 C2 |
| `danger:2` | 8 | 4 C1 + 2 B1 |
| `danger:3` | 12 | 4 C1 + 2 B1 + 1 A1 |
| `danger:4` | 17 | 5 C1 + 2 B1 + 1 B2·Meneur + 1 A1 |
| `danger:5` | 25 | 6 C + 3 B + 1 A2 + 1 S1 |

**Tolérance : ±15 %.** Au-delà, la rencontre sort de son niveau de danger annoncé et la carte ment au joueur.

---

## 4. Armes et équipement

| Arme | Dégâts | Portée | Coût par usage |
|---|---|---|---|
| Arc | 6 | longue | 1 flèche |
| Couteau de chasse | 4 | contact | — |
| Épée | 8 | contact | — |
| Hache, masse | 10 | contact | −1 vitesse |
| Lance | 7 | moyenne | — |

| Armure | Réduction | Coût |
|---|---|---|
| Aucune | 0 | — |
| Cuir | 1 | −0 vitesse |
| Cuir clouté | 2 | −0 vitesse |
| Mailles | 3 | −1 vitesse |

**Flèches** — carquois max **20** · départ de run : **9** (défaut) ou **12** (préparation) · récupération après combat : **50 %** des flèches tirées

**Usure** — chaque combat use l'équipement de 1 point sur 10. À 0, l'arme perd 2 dégâts et l'armure 1 de réduction. Réparation en forge ou chez un marchand.

---

## 5. Fatigue, faim, eau

Deux jauges de **0 à 100** : fatigue et faim. 0 = parfait état.

**La soif n'est pas une jauge** (décision du 21/09/2026) : l'eau est un objet — une gourde, 3 au maximum — et la soif un état, *assoiffé*. Rythme et effets : ceux du code, à relever dans `engine/schema.js`.

| Action | Fatigue | Faim |
|---|---|---|
| Trajet court (POI voisin) | +5 | +4 |
| Trajet long (zone à zone) | +12 | +8 |
| Storylet mineur | +2 | +1 |
| Storylet standard | +4 | +2 |
| Storylet majeur | +8 | +4 |
| Escarmouche | +8 | +3 |
| Bataille | +15 | +6 |
| Observation détaillée | +2 | +1 |
| Attendre le moment voulu | +6 | +8 |
| Nuit de repos | **−40** | +6 |

**Seuils**

| Valeur | Effet |
|---|---|
| 0-59 | Aucun |
| **60** | −1 dégâts, −1 vitesse, options physiques plus coûteuses |
| **80** | −2 dégâts, −1 armure, certaines options disparaissent |
| **100** | État critique — fuite forcée au prochain combat |

> **L'eau reste stratégique autrement :** trois gourdes au maximum. Les POI `eau` comptent, et un terrain sans source — le `désert` — devient hostile sans règle spéciale.

---

## 5 bis. Manger, boire, soigner

**Manque corrigé le 16/09/2026 :** l'ancienne version définissait ce qui fait monter la faim et la soif, et **rien qui les fasse baisser**. Un run accumulait ~100 de faim et ~110 de soif sans aucun moyen de les réduire.

| Consommable | Effet | Poids |
|---|---|---|
| **Ration** | −30 faim | 2 |
| **Gourde** | Retire *assoiffé* — l'eau est un objet, 3 au maximum | 2 |
| **Repas chaud** *(lieu sûr, feu)* | −50 faim, −20 fatigue | — |
| **Bandage** | −15 PV de blessure, retire *blessé léger* | 1 |
| **Remède** | Retire *blessé grave*, +20 PV | 1 |

**Un run type demande 3 rations et 3 gourdes.** C'est ce qui donne une valeur concrète aux tags `vivres` et `eau`.

> ⚠ **Valeur la plus sensible du fichier : la rareté des soins.** Personne dans le groupe ne sait soigner — tout repose sur la disponibilité des bandages et remèdes. **S'ils sont trop trouvables, tout le système de blessures et l'escorte marchande s'effondrent.** À surveiller dès le premier test.

---

## 5 ter. Créatures

Fiches complètes dans `SPEC_BESTIAIRE`.

| Créature | PV | Dég | Arm | Vit | Nombre | Menace | XP |
|---|---|---|---|---|---|---|---|
| Batteur *(Rabatteurs)* | 12 | 4 | 0 | 4 | 3-5 | 0,8 | 8 |
| Embusqué *(Rabatteurs)* | 18 | 6 | 0 | 3 | 1-2 | 1,4 | 14 |
| La Nuée Noire | 30 | 6 | — | 2 | 1 | 3 | 30 |
| Le Gris | 60 | 12 | 2 | 1 | 1 | 8 | 80 |
| Le Fossoyeur | 50 | 10 | 1 | 2 | 1 | 7 | 70 |
| Unité de Fléau | 18 | 6 | 1 | 3 | 5-8 | 1,5 | 12 |
| **L'Enclume** | 110 | 15 | 2 | 1 | 1 | 15 | 100 / 150 |

**Taux de rencontre**

| Type | Fréquence | Durée |
|---|---|---|
| **Signes** — traces, carcasse, silhouette | 1 POI sur 2 | 30-60 s |
| **Rencontres réelles** | 1 POI sur 4-5 | ~5 min |
| **Bascule tactique** | 1 par run au maximum | 10-15 min |

---

## 5 quater. Compagnons

Fiches complètes dans `SPEC_COMPAGNONS`.

| Compagnon | Rôle | PV | Dég | Arm | Vit | Menace |
|---|---|---|---|---|---|---|
| Mathias | B — frappe lourde | 28 | 8 | 0 | 2 | 3 |
| Renn | B — ligne entraînée | 30 | 7 | 1 | 2 | 3,5 |
| Jonas | A — ouvre les armures | 22 | 5 | 1 | 3 | 4 |
| Alix | C — harcèlement | 20 | 6 | 0 | 4 | 2 |
| Constant | A — contrôle par le feu | 22 | 5 | 1 | 2 | 4 |

**Règles de progression**

| | |
|---|---|
| Niveau d'un compagnon | **Niveau du héros − 1**, minimum 1. Rien à stocker |
| Compétences | **1 tous les 3 niveaux**, débloquées par le **temps passé dans l'équipe** |
| Équipe active | **5 unités : Tomas + 4 compagnons** |

**Trait de Mathias — Bras de forge :** ses dégâts ne baissent jamais aux seuils de fatigue, là où tout le monde perd 1 puis 2.

---

## 6. Ressources, rendement et pression

**Valeur de rendement d'un POI**

> **Unité : une ration, ou son équivalent** — une gourde, un lot de flèches, une pièce d'équipement mineure, un objet revendable. Sans unité concrète, la règle critique ci-dessous était invérifiable en test.

| État | Rendement |
|---|---|
| Neuf | **20** |
| 1er retour (épuisé) | 8 |
| 2e retour | 4 |
| 3e retour et + | 2 |

**Coût d'un trajet** — 6 (court) à 10 (long), en ressources équivalentes

> ### Règle d'équilibrage critique
> **Le bilan net doit être négatif sur les lieux épuisés et positif uniquement sur les lieux neufs.**
>
> Avec ces valeurs : POI neuf = +10 à +14 net · 1er retour = −2 à +2 net · 2e retour = −2 à −6 net.
> **Un retour est au mieux blanc, deux sont perdants.** Le farm s'éteint de lui-même, sans interdiction.
>
> **C'est la valeur la plus fragile de tout ce fichier.** Toute modification du rendement ou du coût de trajet doit être revérifiée contre cette règle.

**Risque croissant au retour** — `danger` +1 par retour, plafonné à +2

**Niveau de sécurité du POI**

| Niveau | Risque | Multiplicateur de rendement |
|---|---|---|
| Sécurisé | nul | ×0,5 |
| Neutre | modéré | ×1 |
| Hostile | élevé | ×1,4 |

---

## 7. Combat tactique

| | Escarmouche | Bataille |
|---|---|---|
| Zones | 2 | 5 |
| Ennemis | 3-5 | 8-12 |
| Tours | 3-4 | 8+ |
| **Points de commandement / tour** | **2** | **4** |

**Augmentation par l'arbre de compétences — 2 paliers maximum**

| Palier | Escarmouche | Bataille |
|---|---|---|
| Départ | 2 | 4 |
| Palier 1 | 3 | 5 |
| Palier 2 | 4 | 6 |

> **C'est l'amélioration la plus puissante du jeu.** Deux paliers, chers, espacés. Au-delà, le chapitre 3 devient trivial.

**Coûts en points de commandement**

| Action | Coût |
|---|---|
| Ordre permanent exécuté | 0 |
| Changer l'ordre d'une unité | 1 |
| Capacité active | 1 |
| Commander une unité temporaire | 1 |

**État hors de combat** — une unité protégée par le récit quitte la bataille à **40 % de ses PV**, définitivement pour ce combat.

> Le seuil est volontairement haut. Trop bas, le joueur l'utiliserait comme bouclier avant qu'elle ne sorte.

---

## 8. Modes de difficulté

| | Mode Voilé | Mode Récit |
|---|---|---|
| Permadeath compagnons | **Oui** | Non — hors de combat à 40 % PV |
| Pertes de ressources sur échec | 100 % | 50 % |
| Reprise après échec | Départ de chapitre | Départ de chapitre |
| Seuils de fatigue | 60 / 80 / 100 | 70 / 90 / 100 |

> Aucune différence de rendement, d'XP ou de contenu. Le Mode Récit retire de la punition, jamais de la matière.

---

## 9. Ordre de vérification en test

Dans cet ordre — chaque point dépend du précédent.

1. **Le joueur finit-il le chapitre 1 autour du niveau 9-10 ?** Si non, ajuster la courbe d'XP avant tout le reste
2. **Un POI épuisé est-il perdant au 2e retour ?** C'est la règle critique du §6
3. **Une rencontre `danger:3` est-elle survivable à 4 unités correctement équipées ?**
4. **Un run tient-il en 1h30-2h ?** Sinon, ajuster le nombre de POI accessibles, pas les coûts
5. **La soif se fait-elle sentir sans devenir pénible ?**
6. **Un joueur peut-il finir un run sans jamais dormir ?** Si oui, le repos ne sert à rien
7. **Les soins sont-ils trop faciles à trouver ?** C'est la valeur qui peut faire s'effondrer le plus de systèmes à la fois

---

## 10. Valeurs non encore fixées

1. Prix marchands et valeur monétaire des ressources
2. Capacités actives des rangs A et S — effets chiffrés
3. Capacités des 15 compétences de l'arbre
4. Seuils de badges du bilan de fin de run
5. Durée du cycle jour/nuit en unités de temps de jeu
6. Coût de l'escorte marchande — assez élevé pour être une décision, assez bas pour être une option réelle
7. Coût d'apprentissage de la magie pour les compagnons non-frères
