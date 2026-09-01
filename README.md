# SIEGE

Jeu de conquête territoriale onchain : 547 hexagones, douze guildes, un tick
toutes les huit heures, résolution 100 % déterministe.

Le dépôt contient deux moitiés qui se parlent :

| | |
|---|---|
| `src/` | **Le site.** Next.js 16, une seule page, la carte est le produit. |
| `sim/` | **M0, la simulation d'équilibrage.** Aucune dépendance, Node exécute le TS nativement. |

Le plateau affiché sur le site n'est pas une donnée inventée : c'est un état
réel produit par `sim/`, exporté au tick 18 d'une saison de 126. Les
identifiants d'hexagones se correspondent d'un côté à l'autre, donc les
tableaux exportés s'appliquent tels quels sur la carte du navigateur.

```bash
npm run dev
```

```bash
npm run sim
```

`npm run sim:test` vérifie les formules contre les exemples du brief,
`npm run sim:diag` dissèque le scénario qui casse le gate, et
`npm run sim:board` régénère `src/lib/preview-board.ts`.

---

## Le site

Une page, sans défilement. La carte occupe l'écran, le pitch se pose dessus,
et tout le reste — fiche d'hexagone, règles — s'ouvre par-dessus puis se
referme sur la carte.

**Ce qui porte la lecture :** l'intérieur d'un territoire est faible, ses
frontières sont fortes. Un remplissage uniforme par guilde donne un vitrail
illisible ; ce qu'on regarde sur une carte de conquête, c'est où sa couleur
touche celle d'un autre. Seules les arêtes séparant deux propriétaires
différents sont tracées.

**La couleur est rationnée.** Les douze guildes se partagent le cercle
chromatique en évitant la bande orange, réservée à la braise : les 27 hexagones
de tier 3 (5 % de la carte, 8x de rendement) et le geste d'engager un ordre.
Le reste du jeu est froid ; ce qui brûle se paie.

**L'horloge est à l'échelle.** Les trois segments du tick sont proportionnels
aux vraies durées — 7 h de commit, 45 min de reveal, 15 min de résolution — donc
les deux dernières phases sont deux fines lamelles au bout d'un long segment.
Une barre en tiers égaux mentirait sur le rythme du jeu.

**Rien n'est déployé, et le site le dit.** Aucun contrat n'existe : le panneau
d'ordre est désactivé, la carte est étiquetée comme simulation partout où elle
apparaît, et `isLive` reste faux tant que `NEXT_PUBLIC_SIEGE_BATTLE_ADDRESS`
est absent. Aucune adresse ni aucun prix inventé ne peut partir en production.

Le nom vit dans `src/lib/site-config.ts` et nulle part ailleurs — `name`,
`wordmark`, `ticker`. Le renommer, c'est éditer ces trois chaînes ; pas un
grep-and-replace à travers les composants.

---

## M0 — verdict : le gate ne passe pas

Le brief est explicite : *on ne passe pas à M1 si un seul wallet dépasse 15 %
de la carte.* Sur 10 saisons de 126 ticks, 500 agents, 8 scénarios :

| Scénario | Top wallet (pire saison) | Gate |
|---|---|---|
| `base` — 1 wallet par acteur, 12 guildes | 2,4 % | PASS |
| `conquest-only` — position mintée à la prise seulement | 2,7 % | PASS |
| `sybil-10` — chaque whale en 10 wallets | 0,9 % (acteur agrégé : 3,5 %) | PASS |
| `sybil-100+conquest-only` | 1,1 % (acteur agrégé : 4,1 %) | PASS |
| `guildes-3` | 1,2 % | PASS |
| `whale-solo` — 4 whales en guilde solo, 12 guildes | 7,3 % | PASS |
| **`whale-solo-5g`** — guildes solo, 5 guildes | **45,9 %** | **ÉCHEC** |
| **`whale-solo-5g-plancher`** — idem, 1 seul claim/tick | **18,5 %** | **ÉCHEC** |

### Comment un wallet prend 40 % de la carte (`npm run sim:diag`)

```
Wallet dominant     #0  (whale, guilde 1)
Membres de sa guilde 1
Part de carte       39.5%
Hexes de la guilde  216 / 547
  acquis par claim      216
  acquis par conquete     0
  perdus au combat        0
Cout des 216 hexes    29 500 SIEGE = 29.5% de son capital
Solde final           831 564 SIEGE  (x8.32)
```

Il n'a **livré aucune bataille** et **perdu aucun hex**. Il a acheté 40 % de la
carte au tarif affiché, pour un tiers de son capital.

Trois règles se combinent mal :

1. **Le claim d'un hex neutre n'est pas taxé.** La taxe d'empire
   (`mise * (100 + hexCount²) / 100`) ne s'applique qu'à l'attaque. Un claim
   coûte `tier * 100` à plat, que la guilde ait 1 hex ou 300. Toute la carte
   coûte moins cher qu'un seul capital de whale.
2. **La taxe d'empire gèle la carte.** À 30 hexes une attaque coûte x10, à 216
   x467. Passé une certaine taille plus personne ne peut attaquer personne : la
   course aux neutres du début de saison devient **irréversible**.
3. **Rien n'impose une taille minimale de guilde.** En solo on perd la cohésion
   (102 au lieu de 150), mais la cohésion ne sert qu'au combat — et cette
   stratégie ne combat jamais.

Le `base` passe le gate non pas parce que le design tient, mais parce que 500
joueurs répartis sur 12 guildes se diluent mutuellement. Le gate mesure le
**wallet** ; aucune règle n'oblige un acteur à jouer avec un seul wallet, ni à
rejoindre une guilde peuplée.

Le résultat est robuste : même à un claim par tick — soit une transaction — le
gate tombe sur 10 saisons sur 10.

---

## Trous et contradictions dans la spec

Trouvés en implémentant. Les six premiers bloquent M1.

**1. Le reveal manquant est insanctionnable tel qu'écrit.** *« Reveal manquant =
mise engagée perdue (10 % brûlés, 90 % rendus) »*. Le contrat ne détient que
`keccak256(hexId, amount, isAttack, salt, sender)`. Si le joueur ne révèle
jamais, le montant n'est **jamais connu onchain** : impossible d'en brûler 10 %.
Il faut un bond fixe posé au commit, ou slasher un pourcentage du solde interne.

**2. Rien n'alimente `treasury`.** Le champ est « accumulé », l'upkeep en
prélève 2 %, la conquête le transfère — mais aucune règle ne dit ce qui le
**remplit**. *Hypothèse prise : coût de claim + rendement du tier tiré de la
cagnotte pré-financée.*

**3. 512 hexes ≠ disque de rayon 13.** Un disque hexagonal contient
`3R² + 3R + 1` : R=12 donne 469, R=13 donne 547. **Aucun rayon ne donne 512.**
Découper 512 dans le disque casse la connexité du bord. *Hypothèse prise : 547.*

**4. L'invariant « même ordre de tx → même état » est faux si on peut commit
plus que son solde.** Les reveals sont des transactions séquentielles. Un joueur
qui commit trois ordres totalisant plus que son solde fait dépendre du
**mempool** lesquels passent. Même correctif que le trou #1.

**5. Résolution multi-attaquants non spécifiée.** Deux guildes attaquent le même
hex au même tick : qui l'emporte ? *Hypothèse prise : A maximal ; égalité →
le défenseur tient ; tous les attaquants perdants paient les 20 %.*

**6. Aucune taille minimale de guilde.** Voir le verdict ci-dessus.

**7. « Un hex non défendu depuis 30 ticks perd sa fortification » est ambigu** —
pas attaqué, ou pas de mise défensive ? *Hypothèse prise : aucune mise défensive
révélée depuis 30 ticks.*

**8. Défendre est un travail de bot.** Un ordre par hex et par tick : tenir 40
hexes demande 40 ordres, 3 fois par jour, 42 jours. Cela contredit *« les ticks
existent pour que les bots ne gagnent pas »*. Les ticks empêchent le combat
réflexe, pas l'automatisation — ils la **rendent obligatoire**.

**9. La cagnotte de fin de saison invite au snipe.** 90 % de la cagnotte n'est
pas consommée pendant la saison et se distribue sur l'état **final**. Seule la
carte du dernier tick compte.

**10. `Σ √mise` récompense le découpage.** Choix assumé du brief, mais il faut
en connaître le prix : découper une mise sur N wallets multiplie la puissance
par `√N` — vérifié dans `sim/selftest.ts`, 100 wallets = **x10 à capital égal**.

---

## Deux chiffres à regarder en plus du gate

**La taxe d'empire détruit la moitié de l'économie.** 51 % du capital initial
est brûlé par saison, dont **99 % par le seul surcoût d'attaque**. Supply fixe,
aucun mint : à ce rythme la partie s'éteint en quelques saisons.

**Les petits joueurs partent avant la mi-saison.** 61 % des passifs et moyens
abandonnent, tick médian **43 sur 126**, surtout par ruine.

Autres mesures (`base`) : Gini territoire 0,605 ; Gini soldes 0,707 ; plus
grosse guilde 16,4 % ; carte 100 % partagée en fin de saison ; ~750 batailles
et ~582 conquêtes par saison.

---

## Ce qui est déjà acquis pour M1

**L'invariant d'ordre des transactions est prouvé, pas supposé.** La résolution
est une fonction pure `(snapshot, ordres) → effets` : aucune bataille ne voit le
résultat d'une autre. Un tick sur sept est rejoué avec les ordres mélangés et
les effets comparés par empreinte — **0 échec sur toutes les saisons de tous les
scénarios**. C'est le quatrième test invariant Foundry exigé au M1, validé avant
d'écrire le contrat.

`sim/rules.ts` et `sim/fixed.ts` sont écrits pour être transposés ligne à ligne
en Solidity : entiers partout, `isqrt` de Babylone vérifiée sur 200 000 valeurs
plus 2 000 grands entiers aléatoires.

---

## Recommandations avant d'ouvrir M1

1. **Taxer le claim comme l'attaque**, ou faire croître son coût avec `hexCount`.
2. **Changer la métrique du gate** : mesurer le plus gros **acteur** et la plus
   grosse **guilde**, pas le plus gros wallet.
3. **Poser un bond au commit** — ferme les trous #1 et #4 d'un coup.
4. **Baisser l'exposant de la taxe d'empire** et re-mesurer le burn.
5. **Imposer une taille minimale de guilde**, ou accepter le solo et le pricer.
6. **Trancher les points 2, 3, 5, 7** — ce sont des choix de design, pas des bugs.

---

## Structure

```
src/app/            layout, page, globals.css, icon, image OG, robots, sitemap
src/components/     World (coque), HexMap (canvas), HexPanel, TickClock,
                    InfoOverlay, Ticker, Navbar, Drawer
src/lib/            site-config, hexmap, season (horloge), guilds,
                    preview-board (généré)
sim/                fixed, rules, hex, engine, agents, season, metrics,
                    run, diag, selftest, export-board
```

Le seul aléatoire du projet est dans `mulberry32`, qui pilote **uniquement** le
comportement des agents simulés — jamais une résolution. Toute la règle de jeu
est déterministe et en entiers. Les seeds sont fixes : `npm run sim` redonne
exactement ces chiffres.
