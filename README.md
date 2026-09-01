# SIEGE

An onchain territory game: 547 hexes, twelve guilds, one turn every eight hours,
fully deterministic resolution.

The repo holds two halves that talk to each other:

| | |
|---|---|
| `src/` | **The site.** Next.js 16, one page, the map is the product. |
| `sim/` | **M0, the balance simulation.** No dependencies — Node runs the TS natively. |

The board on the site is not invented data: it is a real state produced by
`sim/`, exported at tick 18 of a 126-tick season. Hex ids line up on both sides,
so the exported arrays apply directly to the map the browser draws.

```bash
npm run dev
```

```bash
npm run sim
```

`npm run sim:test` checks the formulas against the brief's own examples,
`npm run sim:diag` dissects the scenario that used to break the gate, and
`npm run sim:board` regenerates `src/lib/preview-board.ts`.

---

## The site

One page, no scrolling. The map fills the screen, the pitch sits over it, and
everything else — hex sheet, manual — opens on top and closes back to the map.
Once the layout stacks the two are split outright: map in the top band, copy in
the bottom one, because overlaying them makes both unreadable.

**What carries the reading:** the inside of a territory is faint, its borders are
strong. Filling each guild solid gives an unreadable stained-glass window; what
you look at on a conquest map is where your colour meets someone else's. Only
edges separating two different owners are drawn.

**Colour is rationed.** The twelve guilds split the wheel avoiding the orange
band, which belongs to the ember: the 27 tier 3 hexes (5% of the map, 8x yield)
and the act of committing an order. The rest of the game is cold.

**The clock is to scale.** The three tick segments are proportional to the real
durations — 7h commit, 45min reveal, 15min resolution — so the last two are thin
slivers at the end of a long segment. A bar in equal thirds would lie about the
rhythm of the game.

**Every hex sheet answers "what does this pay".** Yield per tick and per day,
treasury sitting on the hex, upkeep, the projected cut of the fixed season pool,
how many wallets hold it and how concentrated that holding is, the guild's
membership and daily take, fortification, and what a capture wins or costs.

**Nothing is deployed, and the site says so.** The order panel is disabled, the
board is labelled as a simulation everywhere it appears, and `isLive` stays false
while `NEXT_PUBLIC_SIEGE_BATTLE_ADDRESS` is unset. No invented address or price
can ship.

The name lives in `src/lib/site-config.ts` and nowhere else — `name`, `wordmark`,
`ticker`. Renaming means editing those three strings, not a grep-and-replace
through the components.

---

## M0 — the gate clears, after one rule change

The brief is explicit: *no move to M1 if a single wallet ends a season holding
more than 15% of the map.* It did not clear as written. It does now.

**The fix: claiming neutral ground carries the same empire multiplier as
attacking.** The brief applied the empire tax only to attacks, which left
expansion onto empty ground free at any size — the hole a solo wallet drove 216
hexes through. One line of rule, and the worst case drops from 45.9% to 11.3%.

Across 10 seasons of 126 ticks and 500 agents:

| Scenario | Top wallet (worst season) | Gate |
|---|---|---|
| `base` — 1 wallet per actor, 12 guilds | 4.0% | PASS |
| `conquest-only` — position minted on capture only | 4.6% | PASS |
| `sybil-10` — each whale split into 10 wallets | 0.9% (actor aggregate: 3.7%) | PASS |
| `sybil-100+conquest-only` | 0.5% (actor aggregate: 1.5%) | PASS |
| `guilds-3` | 2.0% | PASS |
| `whale-solo` — 4 whales in solo guilds, 12 guilds | 4.2% | PASS |
| `whale-solo-5g` — solo guilds, 5 guilds | 11.3% | PASS |
| `whale-solo-5g-floor` — same, 1 claim per tick | 10.6% | PASS |
| **`BRIEF-AS-WRITTEN`** — the same case, claims untaxed | **45.9%** | **FAIL** |

The last row is kept deliberately: it is the reference that failed, and it is
what proves the fix is what changed the outcome rather than a lucky seed.

### The cost of the fix

Burn rises from 51% to **63% of staked capital per season**, because the claim
surcharge is burned like the attack surcharge. The gate is no longer the binding
problem; the burn is. Lowering the empire tax exponent is now the top open item.

### What the hole looked like (`npm run sim:diag`, claims untaxed)

```
Dominant wallet     #0  (whale, guild 1)
Members in guild     1
Share of map        39.5%
Guild hexes         216 / 547
  acquired by claim     216
  acquired by conquest    0
  lost in battle          0
Cost of 216 hexes     29,500 SIEGE = 29.5% of its capital
Final balance        831,564 SIEGE  (x8.32)
```

It fought **no battles** and lost **no hexes**. It bought 40% of the map at the
listed price, for a third of its capital.

Three rules combined badly:

1. **Claiming a neutral hex was untaxed.** The empire tax
   (`stake * (100 + hexCount²) / 100`) applied only to attacks. A claim cost
   `tier * 100` flat whether the guild held 1 hex or 300, so the whole map cost
   less than a single whale's capital. **This is the one that was fixed.**
2. **The empire tax freezes the map.** At 30 hexes an attack costs x10, at 216
   it costs x467. Past a certain size nobody can attack anybody, so the early
   land grab is **irreversible**. Still true — which is exactly why the price of
   that early grab had to stop being flat.
3. **Nothing requires a minimum guild size.** Playing solo loses cohesion (102
   instead of 150), but cohesion only matters in combat — and this strategy
   never fought. Still true, now merely expensive rather than decisive.

The failure was robust: even at one claim per tick — a single transaction — the
untaxed rules failed in 10 seasons out of 10. So is the fix, in the other
direction: every scenario now clears with the worst wallet at 11.3%.

Note what `base` does *not* prove. It clears at 4.0% because 500 players spread
across 12 guilds dilute each other, not because the design forces it. The gate
measures the **wallet**, and no rule obliges an actor to use one wallet or to
join a populated guild — which is why the solo and sybil scenarios exist.

---

## Spec holes and contradictions

Found while implementing. The first six block M1.

**1. A missed reveal cannot be penalised as written.** *"Missed reveal = stake
forfeit (10% burned, 90% returned)"*. The contract holds only
`keccak256(hexId, amount, isAttack, salt, sender)`. If the player never reveals,
the amount is **never known onchain**, so 10% of it cannot be burned. This needs
a fixed bond posted at commit, or slashing a percentage of the internal balance.

**2. Nothing funds `treasury`.** The field is "accumulated", upkeep skims 2%,
capture transfers it — but no rule says what **fills** it. *Assumed: claim cost
plus tier yield drawn from the pre-funded pool.*

**3. 512 hexes ≠ a radius-13 disc.** A hex disc holds `3R² + 3R + 1`: R=12 gives
469, R=13 gives 547. **No radius gives 512.** Carving 512 out of the disc breaks
border connectivity. *Assumed: 547.*

**4. The "same state regardless of tx order" invariant is false if a player can
commit more than their balance.** Reveals are sequential transactions. A player
committing three orders totalling more than their balance makes the **mempool**
decide which land. Same fix as hole #1.

**5. Multi-attacker resolution is unspecified.** Two guilds attack the same hex
in the same tick — who wins? *Assumed: highest A; exact tie means the defender
holds; every losing attacker pays the 20%.*

**6. No minimum guild size.** Playing solo is legal and, before the claim tax,
optimal. It is no longer decisive, but a floor on guild size is still worth a
decision.

**7. "A hex undefended for 30 ticks loses its fortification" is ambiguous** — not
attacked, or no defensive stake? *Assumed: no defensive stake revealed in 30
ticks.*

**8. Defending is a bot's job.** One order per hex per tick: holding 40 hexes
means 40 orders, three times a day, for 42 days. This contradicts *"ticks exist
so bots do not win"*. Ticks prevent reflex combat, not automation — they make it
**mandatory**.

**9. The end-of-season pool invites sniping.** 90% of the pool is not consumed
during the season and is distributed on the **final** state. Only the last tick's
map matters.

**10. `Σ √stake` rewards splitting.** A deliberate choice in the brief, but the
price should be known: splitting a stake across N wallets multiplies power by
`√N` — verified in `sim/selftest.ts`, 100 wallets = **x10 at equal capital**.

---

## Two figures beyond the gate

**The empire tax destroys most of the economy.** 63% of starting capital is
burned per season, **99% of it from the empire surcharge**. Fixed supply, no
minting: at that rate the game runs dry in a couple of seasons. This is now the
single worst number in the model, and the claim tax made it worse — the right
answer is almost certainly a gentler exponent than `hexCount²`.

**Small players leave before mid-season.** 61% of passive and medium players quit,
median quit tick **43 of 126**, mostly through ruin.

Other measures (`base`): territory Gini 0.605; balance Gini 0.707; largest guild
16.4%; map fully partitioned by season end; ~750 battles and ~582 captures per
season.

---

## Already banked for M1

**The transaction-order invariant is proven, not assumed.** Resolution is a pure
function `(snapshot, orders) → effects`: no battle sees another's result. Every
seventh tick is replayed with the orders shuffled and the effects compared by
fingerprint — **zero failures across every season of every scenario**. That is
the fourth Foundry invariant test the brief requires at M1, cleared before the
contract is written.

`sim/rules.ts` and `sim/fixed.ts` are written to transpose line by line into
Solidity: integers throughout, Babylonian `isqrt` verified across 200,000 values
plus 2,000 large random integers.

---

## Recommendations before opening M1

1. ~~**Tax claiming like attacking.**~~ **Done** — `taxClaims`, on by default.
   Worst-case wallet share went from 45.9% to 11.3%.
2. **Lower the empire tax exponent** and re-measure the burn. Now the top item:
   63% of capital destroyed per season is not survivable on a fixed supply.
3. **Post a bond at commit** — closes holes #1 and #4 at once.
4. **Change the gate metric**: measure the largest **actor** and the largest
   **guild**, not the largest wallet.
5. **Require a minimum guild size**, or accept solo play and price it.
6. **Settle points 2, 3, 5, 7** — design choices, not bugs.
7. **Design salt custody and the reveal window.** Commit at T, reveal 7h later:
   a player who loses their salt cannot reveal and forfeits the stake, and a
   player asleep during the 45-minute window forfeits it too. Neither has a
   design yet, and both will hit every player eventually.

---

## Structure

```
src/app/            layout, page, globals.css, icon, OG image, robots, sitemap
src/components/     World (shell), HexMap (canvas), HexPanel, Docs, TickClock,
                    Ticker, Navbar, Drawer
src/lib/            site-config, hexmap, season (clock), guilds, economics,
                    preview-board (generated)
sim/                fixed, rules, hex, engine, agents, season, metrics,
                    run, diag, selftest, export-board
```

The only randomness in the project is `mulberry32`, which drives **only** the
behaviour of the simulated agents — never a resolution. The whole game rule is
deterministic and integer. Seeds are fixed: `npm run sim` reproduces these
figures exactly.
