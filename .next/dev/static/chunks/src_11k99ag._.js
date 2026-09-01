(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Docs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Docs",
    ()=>Docs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/season.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/*
 * The manual.
 *
 * A game whose pitch is "no randomness" has to show its formulas, or the pitch
 * is worth nothing. And a game that pays has to show the arithmetic of the
 * payout, or the numbers on the hex sheet look like decoration. Both are here,
 * with the same figures the sheet uses.
 *
 * The status section says what the balance simulation actually found, including
 * the part that has not been fixed yet. A launch page that hides a known hole
 * only gets to hide it until someone finds it.
 */ const SECTIONS = [
    {
        id: "earn",
        label: "What you earn"
    },
    {
        id: "tick",
        label: "The tick"
    },
    {
        id: "ground",
        label: "Taking ground"
    },
    {
        id: "math",
        label: "The maths"
    },
    {
        id: "small",
        label: "Small players"
    },
    {
        id: "faq",
        label: "FAQ"
    },
    {
        id: "status",
        label: "Status"
    }
];
const TIER_ROWS = [
    1,
    2,
    3
].map(_c = (tier)=>{
    const count = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tiers.filter((t)=>t === tier).length;
    const perTick = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier] * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit;
    return {
        tier,
        count,
        perTick,
        perDay: perTick * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerDay,
        season: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier] / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TOTAL_TIER_WEIGHT"],
        claim: tier * 100
    };
});
_c1 = TIER_ROWS;
const FORMULAS = [
    {
        title: "Power",
        code: "power = Σ √(stake_i)",
        note: "The sum of roots, not the root of the sum. Doubling your stake does not double your force: four players at 250 outweigh one player at 1000."
    },
    {
        title: "Cohesion",
        code: "cohesion = 100 + 2 × min(active members, 25)",
        note: "100 to 150. A guild fielding twenty-five members hits half again as hard as a lone wallet."
    },
    {
        title: "Fortification",
        code: "fort = 100 + 5 × min(tick − held since, 20)",
        note: "100 to 200. Holding a hex for twenty ticks doubles its defence. Leave it undefended for thirty and it loses the bonus entirely."
    },
    {
        title: "Empire tax",
        code: "cost = stake × (100 + hexes²) / 100",
        note: "Attacking with 10 hexes costs double, 20 costs five times, 30 costs ten times — and claiming empty ground pays the same multiplier. The surcharge is burned, not redistributed. Growing is what costs you."
    },
    {
        title: "Resolution",
        code: "A > D  strictly",
        note: "On a tie the defender holds. The winner takes the hex, its entire treasury, and 20% of the defender's stake."
    }
];
const FAQ = [
    {
        q: "What do I actually own?",
        a: "A share of a hex, as an ERC-1155 where the token id is the hex id and your balance is your slice of the stake committed there. Several wallets can hold the same hex at once, and the payout follows those slices."
    },
    {
        q: "How do I make money?",
        a: `Three ways. Yield: every hex you hold accrues ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit)} to ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit * 8)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} per tick into its treasury, three ticks a day. Capture: win a siege and the defender's entire hex treasury moves to you, plus 10% of their stake. Season pool: a fixed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} is split across held territory at the final tick, weighted by tier.`
    },
    {
        q: "What does a hex actually pay?",
        a: `A tier 1 hex pays ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(TIER_ROWS[0].perDay)} a day and projects ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(TIER_ROWS[0].season)} from the season pool. A tier 3 pays ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(TIER_ROWS[2].perDay)} a day and projects ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(TIER_ROWS[2].season)}. There are only ${TIER_ROWS[2].count} tier 3 hexes and none of them touch each other.`
    },
    {
        q: "Do I have to play every eight hours?",
        a: "To attack, yes — orders are per tick. To hold, not quite: fortification climbs the longer you keep a hex, so established ground defends itself better. But a hex nobody has defended for thirty ticks loses that bonus, and an undefended hex falls to any attack at all."
    },
    {
        q: "What happens if I miss the reveal window?",
        a: "The stake you committed is forfeit — 10% burned, the rest returned. Reveal is 45 minutes and it is mandatory, because a commit nobody reveals would otherwise be a free option."
    },
    {
        q: "Why square roots?",
        a: "So money alone does not decide the map. Power grows as the root of your stake, which means a hundred times the tokens buys ten times the force, not a hundred. It is the single most important number in the balance."
    },
    {
        q: "Can a whale just buy the whole map?",
        a: "It could, until recently. Claiming empty ground was flat-priced, so a well-funded wallet playing alone took 40% of the map without fighting once. Claiming now carries the same empire multiplier as attacking — the more you hold, the more the next hex costs — and across ten simulated seasons no wallet finishes above 11.3%."
    },
    {
        q: "Can I be knocked out completely?",
        a: "No. Every guild holds one refuge hex that cannot be attacked, movable once every 21 ticks. You can lose everything else and still be on the board. A guild down to fewer than three hexes also attacks 25% harder from tick 32 onward."
    },
    {
        q: "What does upkeep cost me?",
        a: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].upkeepPct}% of each hex treasury per tick, returned to the season pool. It is a drag on hoarding: treasury left sitting on a hex slowly leaks, and it is also the prize someone else collects if they take the hex from you.`
    },
    {
        q: "Is anything random?",
        a: "No. Not the map, not the battles, not the tiers. Everything resolves in integer arithmetic at 1e18 precision, and replaying the same tick with the transactions in a different order gives the identical result — that property is tested, not assumed."
    },
    {
        q: "Are new tokens minted as rewards?",
        a: "Never. The season pool is pre-funded and fixed. The supply is capped at deployment and the only flows are between players, into the pool, or burned."
    },
    {
        q: "Where does the board on this page come from?",
        a: `Until a season is running it is a real state produced by the balance simulation at tick ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tick} of ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SEASON"]} — not a chain read, and not invented either. Once the contracts are live the same page draws the same shape straight off chain.`
    }
];
function Docs({ onClose }) {
    _s();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SECTIONS[0].id);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Docs.useEffect": ()=>{
            const onKey = {
                "Docs.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") onClose();
                }
            }["Docs.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "Docs.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["Docs.useEffect"];
        }
    }["Docs.useEffect"], [
        onClose
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-40 overflow-y-auto bg-void/97 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-0 z-10 flex items-center gap-1 overflow-x-auto border-b border-rule bg-void/95 px-4 py-3 backdrop-blur-sm sm:px-8",
                children: [
                    SECTIONS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: `#${s.id}`,
                            onClick: ()=>setActive(s.id),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label shrink-0 border px-3 py-2 transition-colors", active === s.id ? "border-ember/50 bg-ember/10 text-ember" : "border-transparent text-chalk-muted hover:text-chalk"),
                            children: s.label
                        }, s.id, false, {
                            fileName: "[project]/src/components/Docs.tsx",
                            lineNumber: 143,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        "aria-label": "Close",
                        className: "type-label ml-auto shrink-0 border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Docs.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-3xl px-5 py-10 sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-ember",
                        children: "How it works"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "type-display mt-2 text-chalk",
                        children: "Take ground. Hold it. Get paid."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-body mt-5 max-w-[64ch] text-chalk-soft",
                        children: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].wordmark,
                            " runs in eight-hour turns. Guilds stake",
                            " ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                            " on the hexes they want to take or keep, every order lands at once, and the winner walks off with the treasury. A season is",
                            " ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SEASON"],
                            " ticks — six weeks."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "earn",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "What you earn"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-body mt-3 max-w-[64ch] text-chalk-soft",
                        children: "Three income streams, and they stack."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid gap-3 sm:grid-cols-3",
                        children: [
                            [
                                "Yield",
                                "Every tick, each hex you hold accrues tier x base into its own treasury. Three payouts a day."
                            ],
                            [
                                "Capture",
                                "Win a siege and the defender's whole treasury moves to you, plus 10% of the stake they committed."
                            ],
                            [
                                "Season pool",
                                `A fixed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}, split at the last tick across held territory, weighted by tier.`
                            ]
                        ].map(([title, body])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel px-4 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-ember",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-body mt-2 text-chalk-soft",
                                        children: body
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, title, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-body mt-6 max-w-[64ch] text-chalk-soft",
                        children: [
                            "Ground is not equal. The map is ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes,
                            " hexes split across three tiers, and the tier sets both what a hex pays every tick and how large a slice of the season pool it carries."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 overflow-x-auto border border-rule",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full min-w-[520px] border-collapse",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-rule bg-field",
                                        children: [
                                            "Tier",
                                            "Hexes",
                                            "Per tick",
                                            "Per day",
                                            "Season pool",
                                            "Claim cost"
                                        ].map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label px-4 py-3 text-chalk-muted", i === 0 ? "text-left" : "text-right"),
                                                children: h
                                            }, h, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 210,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Docs.tsx",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: TIER_ROWS.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-rule/50 last:border-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-4 py-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-figure-sm", r.tier === 3 ? "text-ember" : "text-chalk"),
                                                            children: [
                                                                "Tier ",
                                                                r.tier
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Docs.tsx",
                                                            lineNumber: 227,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "type-label ml-2 text-chalk-muted",
                                                            children: [
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][r.tier],
                                                                "x"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Docs.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "type-data px-4 py-3 text-right text-chalk-soft",
                                                    children: r.count
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "type-data px-4 py-3 text-right text-chalk",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(r.perTick)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "type-data px-4 py-3 text-right text-chalk",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(r.perDay)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-data px-4 py-3 text-right", r.tier === 3 ? "text-ember" : "text-chalk"),
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(r.season)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "type-data px-4 py-3 text-right text-chalk-soft",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(r.claim)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Docs.tsx",
                                                    lineNumber: 256,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, r.tier, true, {
                                            fileName: "[project]/src/components/Docs.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Docs.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Docs.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-data mt-2 text-chalk-muted",
                        children: [
                            "All figures in ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                            ". Season pool column assumes you hold the hex at tick ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SEASON"],
                            "; upkeep of ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].upkeepPct,
                            "% per tick is not deducted."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "tick",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "The tick"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid gap-3 sm:grid-cols-3",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].map((phase)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel px-4 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: phase.name === "resolution" ? "text-ember" : undefined,
                                        children: phase.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "type-figure-sm mt-2 text-chalk",
                                        children: phase.seconds >= 3600 ? `${phase.seconds / 3600} h` : `${phase.seconds / 60} min`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-data mt-2 text-chalk-muted",
                                        children: phase.blurb
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, phase.name, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 276,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-body mt-5 max-w-[64ch] text-chalk-soft",
                        children: "The staked amount has to stay secret until reveal, or the other side simply outbids you. So you deposit into an internal balance first, and the commit carries only a hash — no transfer moves during the commit phase, because a transfer would leak the size of it."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "type-formula mt-4 overflow-x-auto border border-rule bg-field px-4 py-3 text-chalk-soft",
                        children: "commitment = keccak256(hexId, amount, isAttack, salt, sender)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "ground",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "Taking ground"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 302,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-4 space-y-3",
                        children: [
                            [
                                "Your first hex",
                                "A new guild claims any unowned hex on the rim of the map. That hex becomes its refuge."
                            ],
                            [
                                "Free ground",
                                `A neutral hex touching ground you already hold is bought outright — no battle. From ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(TIER_ROWS[0].claim)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} by tier, rising steeply with how much you already hold.`
                            ],
                            [
                                "Held ground",
                                "You can only attack a hex adjacent to one of yours. Both sides commit blind; the attacker needs strictly more power than the defender."
                            ],
                            [
                                "Refuges",
                                "Never attackable. One per guild, movable once every 21 ticks."
                            ]
                        ].map(([title, body])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-3 border-b border-rule/60 pb-3 last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "type-figure-sm text-chalk",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 315,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "type-body mt-1 max-w-[62ch] text-chalk-soft",
                                                children: body
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 316,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 314,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, title, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "math",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "The maths"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-body mt-3 max-w-[64ch] text-chalk-soft",
                        children: "There is no randomness anywhere, not even for flavour. Everything computes in integer arithmetic at 1e18 precision: two players replaying the same tick get the same answer, and the order the transactions land in changes nothing."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 space-y-3",
                        children: FORMULAS.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel px-4 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-baseline justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-chalk-soft",
                                                children: f.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                className: "type-formula text-ember",
                                                children: f.code
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 338,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-data mt-2.5 max-w-[70ch] text-chalk-muted",
                                        children: f.note
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, f.title, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "small",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "What protects small players"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-4 space-y-3",
                        children: [
                            [
                                "The refuge",
                                "One hex per guild that cannot be attacked. Nobody gets wiped off the map."
                            ],
                            [
                                "The square root",
                                "Power grows as the root of your stake. A hundred times the tokens is ten times the force."
                            ],
                            [
                                "The empire tax",
                                "The more hexes a guild holds, the more every attack costs it. The surcharge is burned."
                            ],
                            [
                                "The rebellion bonus",
                                "A guild down to fewer than three hexes attacks 25% harder from tick 32."
                            ]
                        ].map(([title, body])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-3 border-b border-rule/60 pb-3 last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1.5 h-1.5 w-1.5 shrink-0 bg-ember"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "type-figure-sm text-chalk",
                                                children: title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "type-body mt-1 max-w-[62ch] text-chalk-soft",
                                                children: body
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Docs.tsx",
                                                lineNumber: 360,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, title, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "faq",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "Questions"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                        className: "mt-4",
                        children: FAQ.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-rule/60 py-4 last:border-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "type-figure-sm text-chalk",
                                        children: item.q
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "type-body mt-2 max-w-[64ch] text-chalk-soft",
                                        children: item.a
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Docs.tsx",
                                        lineNumber: 374,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, item.q, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        id: "status",
                        className: "type-title mt-12 scroll-mt-20 text-chalk",
                        children: "Where the project actually stands"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 border border-ember/30 bg-ember/5 px-4 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-body max-w-[64ch] text-chalk-soft",
                                children: "The rules above are the design, and the balance simulation that had to clear before any of it ships is written, running, and clearing — ten seasons of five hundred agents each."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-body mt-3 max-w-[64ch] text-chalk-soft",
                                children: "It clears — now. It did not at first: the gate is that no single wallet ends a season holding more than 15% of the map, and one strategy took 45.9%. Claiming empty ground was flat-priced, so a wallet playing alone in a one-member guild bought 216 hexes for a third of its capital and never fought a battle. Claiming now carries the same empire multiplier as attacking, and the worst wallet across every scenario finishes at 11.3%."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-body mt-3 max-w-[64ch] text-chalk-soft",
                                children: "One thing is still wrong and is not being hidden: the empire tax burns roughly 63% of all staked capital per season, and the supply is fixed. That exponent has to come down before a real season runs."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data mt-3 text-chalk-muted",
                                children: [
                                    "The board on this page is the simulation's own output at tick",
                                    " ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tick,
                                    " of ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SEASON"],
                                    " — ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].battles,
                                    " ",
                                    "battles fought, ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].neutralHexes,
                                    " hexes still unclaimed."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Docs.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-16"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Docs.tsx",
                        lineNumber: 410,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Docs.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Docs.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this);
}
_s(Docs, "s3hOn6kCB+TvRogOcTLwc3wASD0=");
_c2 = Docs;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "TIER_ROWS$[1, 2, 3].map");
__turbopack_context__.k.register(_c1, "TIER_ROWS");
__turbopack_context__.k.register(_c2, "Docs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HexMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HexMap",
    ()=>HexMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/guilds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const HEX_ANGLES = Array.from({
    length: 6
}, (_, i)=>(60 * i - 30) * Math.PI / 180);
/** Vertical squash. Just enough to read as a table seen from a low angle. */ const SQUASH = 0.88;
/** Wall height per tier, as a fraction of the hex size. */ const TIER_DEPTH = {
    1: 0.2,
    2: 0.46,
    3: 0.8
};
/** Corners of a pointy-top hex, clockwise from upper right. */ function corners(cx, cy, size) {
    return HEX_ANGLES.map((a)=>[
            cx + size * Math.cos(a),
            cy + size * Math.sin(a) * SQUASH
        ]);
}
/**
 * The edge shared with the neighbour in direction `i`, as corner indices.
 * Derived once rather than rediscovered every frame.
 */ const EDGE_FOR_DIRECTION = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTIONS"].map(_c = (_, i)=>{
    const a = (6 - i) % 6;
    return [
        a,
        (a + 1) % 6
    ];
});
_c1 = EDGE_FOR_DIRECTION;
/**
 * The four walls a viewer above and slightly in front can see, as corner pairs.
 * The two upper edges face away and are never drawn.
 */ const FRONT_WALLS = [
    [
        0,
        1
    ],
    [
        1,
        2
    ],
    [
        2,
        3
    ],
    [
        3,
        4
    ]
];
/** Light comes from the upper left, so right-hand walls fall away hardest. */ const WALL_SHADE = [
    0.42,
    0.5,
    0.66,
    0.78
];
/*
 * Tier 1 sits close to the ground colour on purpose. It is 70% of the board, so
 * anything brighter turns the whole map into one orange mass and the 27 hexes
 * that actually matter stop reading at all. Scarcity has to look scarce.
 */ const TIER_RGB = {
    1: [
        44,
        24,
        17
    ],
    2: [
        130,
        52,
        25
    ],
    3: [
        255,
        96,
        34
    ]
};
const NEUTRAL_RGB = [
    64,
    71,
    82
];
function hexToRgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return [
        n >> 16 & 255,
        n >> 8 & 255,
        n & 255
    ];
}
function shade([r, g, b], f, alpha = 1) {
    const c = (v)=>Math.round(Math.min(255, v * f));
    return alpha === 1 ? `rgb(${c(r)},${c(g)},${c(b)})` : `rgba(${c(r)},${c(g)},${c(b)},${alpha})`;
}
/** Arrow keys walk the axial grid one column or one row at a time. */ const KEY_DIRECTION = {
    ArrowRight: {
        q: 1,
        r: 0
    },
    ArrowLeft: {
        q: -1,
        r: 0
    },
    ArrowUp: {
        q: 0,
        r: -1
    },
    ArrowDown: {
        q: 0,
        r: 1
    }
};
function HexMap({ owners, tiers, refuges, treasury, yieldUnit, ticksPerDay, radius, mode, selectedId, onSelect, bias = 0.5, biasY = 0.5, className }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tipAt, setTipAt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pan, setPan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HexMap.useMemo[cells]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMap"])(radius)
    }["HexMap.useMemo[cells]"], [
        radius
    ]);
    const refugeSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HexMap.useMemo[refugeSet]": ()=>new Set(refuges)
    }["HexMap.useMemo[refugeSet]"], [
        refuges
    ]);
    const byKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HexMap.useMemo[byKey]": ()=>{
            const m = new Map();
            for (const c of cells)m.set(`${c.q},${c.r}`, c.id);
            return m;
        }
    }["HexMap.useMemo[byKey]"], [
        cells
    ]);
    /*
   * Geometry depends only on the radius: compute it at unit size and apply the
   * scale when drawing. Resizing the window recomputes no layout at all.
   */ const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HexMap.useMemo[layout]": ()=>{
            const unit = 10;
            const pts = cells.map({
                "HexMap.useMemo[layout].pts": (c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexCenter"])(c, unit)
            }["HexMap.useMemo[layout].pts"]);
            const xs = pts.map({
                "HexMap.useMemo[layout].xs": (p)=>p.x
            }["HexMap.useMemo[layout].xs"]);
            const ys = pts.map({
                "HexMap.useMemo[layout].ys": (p)=>p.y
            }["HexMap.useMemo[layout].ys"]);
            const minX = Math.min(...xs) - unit * Math.sqrt(3) * 0.5;
            const maxX = Math.max(...xs) + unit * Math.sqrt(3) * 0.5;
            const minY = Math.min(...ys) - unit;
            const maxY = Math.max(...ys) + unit;
            // Back to front, so each tile's walls are covered by the tile ahead of it.
            const order = cells.map({
                "HexMap.useMemo[layout].order": (c)=>c.id
            }["HexMap.useMemo[layout].order"]).sort({
                "HexMap.useMemo[layout].order": (a, b)=>pts[a].y - pts[b].y || pts[a].x - pts[b].x
            }["HexMap.useMemo[layout].order"]);
            return {
                unit,
                pts,
                order,
                width: maxX - minX,
                height: (maxY - minY) * SQUASH,
                cx: (minX + maxX) / 2,
                cy: (minY + maxY) / 2
            };
        }
    }["HexMap.useMemo[layout]"], [
        cells
    ]);
    /** Screen -> world, shared by drawing and pointer hit-testing. */ const viewFor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HexMap.useCallback[viewFor]": (w, h)=>{
            const fit = Math.min(w / layout.width, h / layout.height) * 0.88;
            const scale = fit * zoom;
            return {
                scale,
                originX: w * bias + pan.x - layout.cx * scale,
                originY: h * biasY + pan.y - layout.cy * scale * SQUASH
            };
        }
    }["HexMap.useCallback[viewFor]"], [
        layout,
        zoom,
        pan,
        bias,
        biasY
    ]);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HexMap.useCallback[draw]": ()=>{
            const canvas = canvasRef.current;
            const wrap = wrapRef.current;
            if (!canvas || !wrap) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = wrap.clientWidth;
            const h = wrap.clientHeight;
            if (w === 0 || h === 0) return;
            if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
                canvas.width = w * dpr;
                canvas.height = h * dpr;
                canvas.style.width = `${w}px`;
                canvas.style.height = `${h}px`;
            }
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const { scale, originX, originY } = viewFor(w, h);
            const size = layout.unit * scale;
            // Below ~5px the walls collapse into noise; fall back to flat tiles.
            const relief = size > 5;
            const fine = size > 4;
            const at = {
                "HexMap.useCallback[draw].at": (id)=>({
                        x: originX + layout.pts[id].x * scale,
                        y: originY + layout.pts[id].y * scale * SQUASH
                    })
            }["HexMap.useCallback[draw].at"];
            const onScreen = {
                "HexMap.useCallback[draw].onScreen": (x, y, pad = 3)=>x > -size * pad && x < w + size * pad && y > -size * pad && y < h + size * pad
            }["HexMap.useCallback[draw].onScreen"];
            const trace = {
                "HexMap.useCallback[draw].trace": (pts)=>{
                    ctx.beginPath();
                    ctx.moveTo(pts[0][0], pts[0][1]);
                    for(let i = 1; i < 6; i++)ctx.lineTo(pts[i][0], pts[i][1]);
                    ctx.closePath();
                }
            }["HexMap.useCallback[draw].trace"];
            const baseRgb = {
                "HexMap.useCallback[draw].baseRgb": (id)=>{
                    if (mode === "pays") return TIER_RGB[tiers[id] ?? 1];
                    const owner = owners[id] ?? 0;
                    return owner === 0 ? NEUTRAL_RGB : hexToRgb((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(owner));
                }
            }["HexMap.useCallback[draw].baseRgb"];
            // ---- Tiles, back to front.
            for (const id of layout.order){
                const { x, y } = at(id);
                if (!onScreen(x, y)) continue;
                const tier = tiers[id] ?? 1;
                const owner = owners[id] ?? 0;
                const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
                const depth = relief ? size * (TIER_DEPTH[tier] + lifted) : 0;
                const rgb = baseRgb(id);
                // In owners mode the interior stays quiet so the borders can speak.
                const topAlpha = mode === "pays" ? 1 : owner === 0 ? 0.62 : id === selectedId ? 0.9 : id === hovered ? 0.78 : 0.52;
                const top = corners(x, y - lifted * size, size * 0.94);
                // Walls first, so the top face sits cleanly on them.
                //
                // They are drawn far more opaque than the top face. The interior of a
                // territory is deliberately quiet, but a translucent wall stops being a
                // wall — the depth simply vanishes into the background and the board goes
                // flat. Structure stays solid; only the surface is allowed to be faint.
                if (relief) {
                    const wallAlpha = Math.min(1, topAlpha + 0.42);
                    for(let i = 0; i < FRONT_WALLS.length; i++){
                        const [a, b] = FRONT_WALLS[i];
                        ctx.beginPath();
                        ctx.moveTo(top[a][0], top[a][1]);
                        ctx.lineTo(top[b][0], top[b][1]);
                        ctx.lineTo(top[b][0], top[b][1] + depth);
                        ctx.lineTo(top[a][0], top[a][1] + depth);
                        ctx.closePath();
                        ctx.fillStyle = shade(rgb, WALL_SHADE[i], wallAlpha);
                        ctx.fill();
                    }
                }
                // Top face.
                trace(top);
                ctx.fillStyle = shade(rgb, 1, topAlpha);
                ctx.fill();
                // A single bright edge along the lit side reads as a bevel for almost nothing.
                if (relief) {
                    ctx.beginPath();
                    ctx.moveTo(top[4][0], top[4][1]);
                    ctx.lineTo(top[5][0], top[5][1]);
                    ctx.lineTo(top[0][0], top[0][1]);
                    ctx.strokeStyle = shade(rgb, 1.32, 0.45);
                    ctx.lineWidth = Math.max(1, size * 0.06);
                    ctx.stroke();
                }
                if (fine) {
                    trace(top);
                    ctx.strokeStyle = "rgba(8,10,12,0.7)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
            // ---- Free ground. In "pays" mode this dashed crown is the call to action.
            if (fine && mode === "pays") {
                ctx.setLineDash([
                    size * 0.2,
                    size * 0.15
                ]);
                ctx.strokeStyle = "rgba(255,255,255,0.8)";
                ctx.lineWidth = Math.max(1, size * 0.08);
                for (const id of layout.order){
                    if ((owners[id] ?? 0) !== 0) continue;
                    const { x, y } = at(id);
                    if (!onScreen(x, y)) continue;
                    const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
                    trace(corners(x, y - lifted * size, size * 0.72));
                    ctx.stroke();
                }
                ctx.setLineDash([]);
            }
            // ---- Borders. An edge is drawn only where two sides actually meet.
            if (fine && mode === "owners") {
                ctx.lineCap = "round";
                for (const id of layout.order){
                    const owner = owners[id] ?? 0;
                    if (owner === 0) continue;
                    const { x, y } = at(id);
                    if (!onScreen(x, y)) continue;
                    const c = cells[id];
                    const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
                    const top = corners(x, y - lifted * size, size * 0.94);
                    ctx.strokeStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(owner);
                    ctx.lineWidth = Math.max(1.4, size * 0.15);
                    for(let d = 0; d < 6; d++){
                        const nb = byKey.get(`${c.q + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTIONS"][d].q},${c.r + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTIONS"][d].r}`);
                        const nbOwner = nb === undefined ? -1 : owners[nb] ?? 0;
                        if (nbOwner === owner) continue; // internal edge: let it disappear
                        const [a, b] = EDGE_FOR_DIRECTION[d];
                        ctx.beginPath();
                        ctx.moveTo(top[a][0], top[a][1]);
                        ctx.lineTo(top[b][0], top[b][1]);
                        ctx.stroke();
                    }
                }
            }
            // ---- Tier marks in owners mode; in "pays" the height and hue already say it.
            if (mode === "owners") {
                for (const id of layout.order){
                    const tier = tiers[id] ?? 1;
                    if (tier === 1) continue;
                    const { x, y } = at(id);
                    if (!onScreen(x, y, 1)) continue;
                    const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
                    const cy = y - lifted * size;
                    if (tier === 3) {
                        ctx.beginPath();
                        ctx.arc(x, cy, Math.max(1.8, size * 0.24), 0, Math.PI * 2);
                        ctx.strokeStyle = "#ff5a1f";
                        ctx.lineWidth = Math.max(1.2, size * 0.1);
                        ctx.stroke();
                    } else if (fine) {
                        ctx.beginPath();
                        ctx.arc(x, cy, Math.max(1, size * 0.1), 0, Math.PI * 2);
                        ctx.fillStyle = "rgba(255,255,255,0.34)";
                        ctx.fill();
                    }
                }
            }
            // ---- Refuges. Unattackable, so they wear a solid white crown.
            for (const id of refugeSet){
                const { x, y } = at(id);
                if (!onScreen(x, y, 1)) continue;
                const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
                trace(corners(x, y - lifted * size, size * 0.58));
                ctx.strokeStyle = "rgba(255,255,255,0.88)";
                ctx.lineWidth = Math.max(1, size * 0.09);
                ctx.stroke();
            }
            // ---- Hover and selection, above everything.
            for (const id of [
                hovered,
                selectedId
            ]){
                if (id === null || id === undefined) continue;
                const { x, y } = at(id);
                const lifted = id === selectedId ? 0.34 : 0.16;
                trace(corners(x, y - lifted * size, size * (id === selectedId ? 1.08 : 1.0)));
                ctx.strokeStyle = id === selectedId ? "#ffffff" : "rgba(255,255,255,0.65)";
                ctx.lineWidth = id === selectedId ? Math.max(2, size * 0.13) : 1.5;
                ctx.stroke();
            }
        }
    }["HexMap.useCallback[draw]"], [
        cells,
        owners,
        tiers,
        refugeSet,
        byKey,
        layout,
        viewFor,
        hovered,
        selectedId,
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HexMap.useEffect": ()=>{
            draw();
        }
    }["HexMap.useEffect"], [
        draw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HexMap.useEffect": ()=>{
            const wrap = wrapRef.current;
            if (!wrap) return;
            const ro = new ResizeObserver({
                "HexMap.useEffect": ()=>draw()
            }["HexMap.useEffect"]);
            ro.observe(wrap);
            return ({
                "HexMap.useEffect": ()=>ro.disconnect()
            })["HexMap.useEffect"];
        }
    }["HexMap.useEffect"], [
        draw
    ]);
    /**
   * Screen -> hex id.
   *
   * The extrusion goes DOWNWARD from the top face, which is drawn on the hex's
   * own centre. That is the reason it goes downward: the logical centre and the
   * visible face stay in the same place, so hit-testing needs no correction for
   * a height that varies by tier.
   */ const hexAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HexMap.useCallback[hexAt]": (clientX, clientY)=>{
            const wrap = wrapRef.current;
            if (!wrap) return null;
            const rect = wrap.getBoundingClientRect();
            const { scale, originX, originY } = viewFor(rect.width, rect.height);
            const wx = (clientX - rect.left - originX) / scale;
            const wy = (clientY - rect.top - originY) / (scale * SQUASH);
            const { q, r } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pixelToAxial"])(wx, wy, layout.unit);
            return byKey.get(`${q},${r}`) ?? null;
        }
    }["HexMap.useCallback[hexAt]"], [
        viewFor,
        layout,
        byKey
    ]);
    /** Put the tooltip on the hex itself — used when there is no pointer to follow. */ const tipOnHex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HexMap.useCallback[tipOnHex]": (id)=>{
            const wrap = wrapRef.current;
            if (!wrap) return;
            const rect = wrap.getBoundingClientRect();
            const { scale, originX, originY } = viewFor(rect.width, rect.height);
            setTipAt({
                x: originX + layout.pts[id].x * scale,
                y: originY + layout.pts[id].y * scale * SQUASH
            });
        }
    }["HexMap.useCallback[tipOnHex]"], [
        viewFor,
        layout
    ]);
    // A drag must not fire a selection on release.
    const drag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tip = hovered !== null && tipAt !== null ? {
        id: hovered,
        ...tipAt
    } : null;
    const tipOwner = tip ? owners[tip.id] ?? 0 : 0;
    const tipTier = tip ? tiers[tip.id] ?? 1 : 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: wrapRef,
        className: `relative ${className ?? ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                tabIndex: 0,
                role: "application",
                "aria-label": `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name} map, 547 hexes. Arrow keys move between hexes, Enter opens the hex sheet.`,
                className: "outline-none focus-visible:ring-2 focus-visible:ring-ember",
                style: {
                    cursor: hovered !== null ? "pointer" : "grab",
                    touchAction: "none"
                },
                onPointerDown: (e)=>{
                    e.target.setPointerCapture?.(e.pointerId);
                    drag.current = {
                        x: e.clientX,
                        y: e.clientY,
                        moved: false
                    };
                },
                onPointerMove: (e)=>{
                    if (drag.current) {
                        const dx = e.clientX - drag.current.x;
                        const dy = e.clientY - drag.current.y;
                        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                            drag.current.moved = true;
                            drag.current.x = e.clientX;
                            drag.current.y = e.clientY;
                            setPan((p)=>({
                                    x: p.x + dx,
                                    y: p.y + dy
                                }));
                        }
                        return;
                    }
                    const id = hexAt(e.clientX, e.clientY);
                    setHovered((prev)=>prev === id ? prev : id);
                    if (id === null) {
                        setTipAt(null);
                    } else {
                        const rect = wrapRef.current.getBoundingClientRect();
                        setTipAt({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top
                        });
                    }
                },
                onPointerUp: (e)=>{
                    const wasDrag = drag.current?.moved ?? false;
                    drag.current = null;
                    if (wasDrag) return;
                    onSelect(hexAt(e.clientX, e.clientY));
                },
                onPointerLeave: ()=>{
                    drag.current = null;
                    setHovered(null);
                    setTipAt(null);
                },
                onWheel: (e)=>{
                    setZoom((z)=>Math.min(6, Math.max(0.7, z * (e.deltaY < 0 ? 1.12 : 0.89))));
                },
                onKeyDown: (e)=>{
                    if (e.key === "Enter" || e.key === " ") {
                        if (hovered === null) return;
                        e.preventDefault();
                        onSelect(hovered);
                        return;
                    }
                    const step = KEY_DIRECTION[e.key];
                    if (!step) return;
                    e.preventDefault();
                    const from = hovered ?? selectedId ?? 0;
                    const cell = cells[from];
                    const next = byKey.get(`${cell.q + step.q},${cell.r + step.r}`);
                    if (next === undefined) return;
                    setHovered(next);
                    tipOnHex(next);
                },
                onFocus: ()=>{
                    if (hovered === null) {
                        const start = selectedId ?? 0;
                        setHovered(start);
                        tipOnHex(start);
                    }
                },
                onBlur: ()=>setTipAt(null)
            }, void 0, false, {
                fileName: "[project]/src/components/HexMap.tsx",
                lineNumber: 462,
                columnNumber: 7
            }, this),
            tip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] border border-rule-strong bg-void/95 px-3 py-2 backdrop-blur-sm",
                style: {
                    left: tip.x,
                    top: tip.y
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-2 w-2 shrink-0",
                                style: {
                                    background: tipOwner === 0 ? "#ffffff" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(tipOwner)
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexMap.tsx",
                                lineNumber: 545,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-label text-chalk",
                                children: tipOwner === 0 ? "Free to take" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(tipOwner)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexMap.tsx",
                                lineNumber: 549,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HexMap.tsx",
                        lineNumber: 544,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 whitespace-nowrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-figure-sm text-ember",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tipTier] * yieldUnit * ticksPerDay
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexMap.tsx",
                                lineNumber: 554,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-label ml-1.5 text-chalk-muted",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                    " / day"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexMap.tsx",
                                lineNumber: 557,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HexMap.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "type-label mt-1 whitespace-nowrap text-chalk-muted",
                        children: tipOwner === 0 ? `Costs ${tipTier * 100} to claim` : `${(treasury[tip.id] ?? 0).toLocaleString("en-US")} in treasury`
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexMap.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HexMap.tsx",
                lineNumber: 540,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HexMap.tsx",
        lineNumber: 461,
        columnNumber: 5
    }, this);
}
_s(HexMap, "2myaRXcenXEBeNyf1aWbDLFgGEk=");
_c2 = HexMap;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "EDGE_FOR_DIRECTION$DIRECTIONS.map");
__turbopack_context__.k.register(_c1, "EDGE_FOR_DIRECTION");
__turbopack_context__.k.register(_c2, "HexMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HexPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HexPanel",
    ()=>HexPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/OrderPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/guilds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
/*
 * One hex, and what it is worth.
 *
 * Everything here is public in the real game — owner, tier, treasury, how long
 * it has been held — because it is exactly what an attacker can read before
 * committing. The one thing nobody sees until reveal is the amount staked
 * against them, and the order panel says so rather than pretending otherwise.
 *
 * The earnings block leads. A player deciding whether to take this hex is
 * asking "what does it pay and who am I splitting it with", so that answer
 * comes before the combat maths.
 */ const TIER_NOTE = {
    1: "Common ground. 70% of the map.",
    2: "Rich ground. 25% of the map.",
    3: "Prime ground. 27 hexes in all, never adjacent to each other."
};
function Row({ k, v, tone, hint }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-rule/50 py-2.5 last:border-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: k
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-data shrink-0 text-chalk", tone),
                        children: v
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "type-data mt-1 text-chalk-muted",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 48,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HexPanel.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c = Row;
function Section({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-t border-rule px-5 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                className: "text-chalk-soft",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HexPanel.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_c1 = Section;
function HexPanel({ cell, onClose }) {
    _s();
    const previewBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const owner = previewBoard.owners[cell.id] ?? 0;
    const isRefuge = previewBoard.refuges.includes(cell.id);
    const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexEconomics"])(cell.id, previewBoard);
    const g = owner === 0 ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildEconomics"])(owner, previewBoard);
    const ticksLeft = previewBoard.ticksPerSeason - previewBoard.tick;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col border-l border-rule bg-void/96 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-3 border-b border-rule px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                children: "Hex"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "type-display mt-1 text-chalk",
                                children: [
                                    "#",
                                    String(cell.id).padStart(3, "0")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data mt-1 text-chalk-muted",
                                children: [
                                    "q ",
                                    cell.q,
                                    " · r ",
                                    cell.r,
                                    " · ring ",
                                    cell.ring
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        "aria-label": "Close hex sheet",
                        className: "type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 border-b border-rule px-5 py-3",
                        style: {
                            background: owner === 0 ? "transparent" : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(owner)}1f`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-3 w-3 shrink-0",
                                style: {
                                    background: owner === 0 ? "#39404a" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(owner)
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-figure-sm text-chalk",
                                children: owner === 0 ? "Unclaimed" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(owner)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            isRefuge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-label ml-auto border border-chalk/40 px-2 py-1 text-chalk",
                                children: "Refuge"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this),
                            e.tier === 3 && !isRefuge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "type-label ml-auto border border-ember/40 bg-ember/10 px-2 py-1 text-ember",
                                children: "Tier 3 · 8x"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-field/60 px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-ember",
                                children: "What this hex pays"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex items-baseline gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "type-figure text-chalk",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.yieldPerDay)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "type-label text-chalk-muted",
                                        children: [
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                            " / day"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 123,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data mt-1 text-chalk-muted",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.yieldPerTick),
                                    " per tick, three ticks a day. Tier ",
                                    e.tier,
                                    " pays",
                                    " ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][e.tier],
                                    "x the base rate."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        k: "Treasury on the hex",
                                        v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.treasury)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                        tone: e.treasury > 0 ? "text-gain" : undefined,
                                        hint: "Accrues every tick. Whoever takes the hex takes all of it."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        k: "Yield still to come",
                                        v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.yieldRemaining)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                        hint: `${ticksLeft} ticks left in the season.`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        k: "Upkeep this tick",
                                        // "-0" on an empty hex reads as a bug rather than as nothing owed.
                                        v: e.upkeepPerTick > 0 ? `−${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.upkeepPerTick)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}` : "—",
                                        tone: e.upkeepPerTick > 0 ? "text-loss" : undefined,
                                        hint: `${previewBoard.upkeepPct}% of the treasury goes back to the season pool every tick. Nothing is owed on an empty hex.`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 142,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                        k: "Season pool projection",
                                        v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.poolShare)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                        tone: "text-ember",
                                        hint: `${e.poolSharePct.toFixed(2)}% of the ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(previewBoard.seasonPool)} pool, if this hex is still yours at tick ${previewBoard.ticksPerSeason}.`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HexPanel.tsx",
                                        lineNumber: 153,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HexPanel.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Who holds it",
                        children: owner === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "type-body text-chalk-soft",
                            children: "Nobody yet. Claim it and the position is entirely yours until someone else buys in or takes it off you."
                        }, void 0, false, {
                            fileName: "[project]/src/components/HexPanel.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-baseline gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "type-figure text-chalk",
                                            children: e.holders
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HexPanel.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "type-label text-chalk-muted",
                                            children: [
                                                e.holders === 1 ? "wallet" : "wallets",
                                                " on this hex"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HexPanel.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                    className: "mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                            k: "Largest holder",
                                            v: `${e.topHolderPct}%`,
                                            hint: "Position sizes follow the stake each wallet committed here."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HexPanel.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                            k: "Pool share each",
                                            v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.poolSharePerHolder)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                            hint: "Even split of the projection above. Real payout follows each wallet's position."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HexPanel.tsx",
                                            lineNumber: 183,
                                            columnNumber: 17
                                        }, this),
                                        g && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                            k: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(owner)} guild`,
                                            v: `${g.mapPct.toFixed(1)}% of map`,
                                            hint: `${previewBoard.guilds.find((x)=>x.id === owner)?.members ?? 0} active members, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(g.yieldPerDay)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} a day across ${previewBoard.guilds.find((x)=>x.id === owner)?.hexes ?? 0} hexes.`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HexPanel.tsx",
                                            lineNumber: 189,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HexPanel.tsx",
                            lineNumber: 170,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: owner === 0 ? "Taking it" : "Breaking it",
                        children: owner === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Claim cost from",
                                    v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.claimCost)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                    hint: "Tier x 100 for a guild with no ground yet. No battle — a free hex next to yours is simply bought. The price carries the same empire multiplier as attacking, so it climbs steeply with what your guild already holds."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Pays for itself in",
                                    v: `${Math.ceil(e.claimCost / e.yieldPerDay)} days`,
                                    hint: "At the yield above, ignoring upkeep and anything you win holding it."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Ground",
                                    v: `Tier ${e.tier}`,
                                    hint: TIER_NOTE[e.tier]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HexPanel.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Fortification",
                                    v: `${e.fortification}%`,
                                    tone: e.fortification >= 200 ? "text-ember" : undefined,
                                    hint: `Held ${e.ticksHeld} ticks. Defence climbs 5% a tick and caps at 200% after twenty.`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 218,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Prize if you win",
                                    v: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.treasury)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`,
                                    hint: "The whole treasury moves to you, plus 10% of the defender's stake. The hex resets to 100% fortification in your hands."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Cost if you lose",
                                    v: "20% of your stake",
                                    tone: "text-loss",
                                    hint: "Half to the defender, half burned. Attacking is never free."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                                    k: "Ground",
                                    v: `Tier ${e.tier}`,
                                    hint: TIER_NOTE[e.tier]
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HexPanel.tsx",
                                    lineNumber: 235,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HexPanel.tsx",
                            lineNumber: 217,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    isRefuge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "type-data mx-5 my-4 border border-chalk/25 bg-chalk/5 px-3 py-2.5 text-chalk-soft",
                        children: "A refuge cannot be attacked. Every guild holds exactly one and can move it once every 21 ticks — which is what guarantees no guild can ever be wiped off the map."
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-5 mb-5 mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$OrderPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrderPanel"], {
                            hexId: cell.id,
                            tier: e.tier,
                            isNeutral: owner === 0,
                            claimCost: e.claimCost
                        }, void 0, false, {
                            fileName: "[project]/src/components/HexPanel.tsx",
                            lineNumber: 249,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HexPanel.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HexPanel.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HexPanel.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(HexPanel, "3X9QXZAqca2TlDARLNFPzKq5z8I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c2 = HexPanel;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Row");
__turbopack_context__.k.register(_c1, "Section");
__turbopack_context__.k.register(_c2, "HexPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MapKey.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapKey",
    ()=>MapKey
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
/*
 * The switch and the key, together.
 *
 * A map of 547 identical shapes in twelve colours is a wall until someone says
 * what the colour means. Putting the legend next to the control that changes it
 * means the answer is always beside the question.
 */ const MODES = [
    {
        key: "pays",
        label: "What it pays",
        hint: "Brighter ground earns more"
    },
    {
        key: "owners",
        label: "Who owns it",
        hint: "One colour per guild"
    }
];
function MapKey({ mode, onMode, className }) {
    _s();
    const board = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const day = (tier)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier] * board.yieldUnit * board.ticksPerDay;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("border border-rule bg-void/85 backdrop-blur-sm", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                role: "group",
                "aria-label": "Map colouring",
                children: MODES.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onMode(m.key),
                        "aria-pressed": mode === m.key,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label flex-1 px-3 py-2.5 transition-colors", mode === m.key ? "bg-ember text-void" : "text-chalk-muted hover:text-chalk"),
                        children: m.label
                    }, m.key, false, {
                        fileName: "[project]/src/components/MapKey.tsx",
                        lineNumber: 38,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/MapKey.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden border-t border-rule px-3 py-2.5 sm:block",
                children: mode === "pays" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-1.5",
                    children: [
                        [
                            3,
                            2,
                            1
                        ].map((tier)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-3 w-3 shrink-0",
                                        style: {
                                            background: `rgba(255,90,31,${tier === 3 ? 0.95 : tier === 2 ? 0.44 : 0.14})`
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MapKey.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "type-label text-chalk-soft",
                                        children: [
                                            "Tier ",
                                            tier
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MapKey.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "type-data ml-auto text-chalk",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(day(tier)),
                                            " / day"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MapKey.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, tier, true, {
                                fileName: "[project]/src/components/MapKey.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2 border-t border-rule/60 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 shrink-0 border border-dashed border-chalk"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 73,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-label text-chalk-soft",
                                    children: "Free"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data ml-auto text-chalk",
                                    children: [
                                        board.neutralHexes,
                                        " left"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapKey.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MapKey.tsx",
                    lineNumber: 57,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 shrink-0 bg-[#4c8df6]/40 ring-1 ring-[#4c8df6]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-label text-chalk-soft",
                                    children: "Guild territory"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 84,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data ml-auto text-chalk",
                                    children: [
                                        board.guilds.filter((g)=>g.hexes > 0).length,
                                        " guilds"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapKey.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 shrink-0 bg-[#39404a]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 90,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-label text-chalk-soft",
                                    children: "Unclaimed"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data ml-auto text-chalk",
                                    children: board.neutralHexes
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapKey.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 shrink-0 rounded-full border-2 border-ember"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 97,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-label text-chalk-soft",
                                    children: "Tier 3 · pays 8x"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data ml-auto text-chalk",
                                    children: board.tiers.filter((t)=>t === 3).length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 99,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapKey.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-3 w-3 shrink-0 border-2 border-chalk"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-label text-chalk-soft",
                                    children: "Refuge · safe"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 105,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data ml-auto text-chalk",
                                    children: board.refuges.length
                                }, void 0, false, {
                                    fileName: "[project]/src/components/MapKey.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapKey.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MapKey.tsx",
                    lineNumber: 81,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MapKey.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MapKey.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MapKey, "QYlP2IasX74eIKFkjhnFBwr449I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c = MapKey;
var _c;
__turbopack_context__.k.register(_c, "MapKey");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/OrderPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderPanel",
    ()=>OrderPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/formatUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/unit/parseUnits.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/constants/number.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useChainId.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContracts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSignMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSignMessage.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWriteContract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/abi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wagmiConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useChainTick.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const DEC = 18;
function OrderPanel({ hexId, tier, isNeutral, claimCost }) {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const chainId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"])();
    const { connect, connectors, isPending: connecting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { switchChain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { signMessageAsync } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSignMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignMessage"])();
    const { writeContractAsync, isPending: writing } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"])();
    const { data: chainTick } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainTick"])();
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isNeutral ? String(claimCost) : "100");
    const [side, setSide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(isNeutral ? "attack" : "attack");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [, forceRender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const battle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].battleAddress ?? undefined;
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].tokenAddress ?? undefined;
    const map = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].mapAddress ?? undefined;
    const { data: reads, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContracts"])({
        contracts: [
            {
                address: token,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexwartokenAbi"],
                functionName: "balanceOf",
                args: [
                    address
                ]
            },
            {
                address: token,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexwartokenAbi"],
                functionName: "allowance",
                args: [
                    address,
                    battle
                ]
            },
            {
                address: battle,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "freeBalance",
                args: [
                    address
                ]
            },
            {
                address: battle,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "commitBond"
            },
            {
                address: map,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapAbi"],
                functionName: "guildOf",
                args: [
                    address
                ]
            }
        ],
        query: {
            enabled: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] && !!address,
            refetchInterval: 15_000
        }
    });
    const walletBalance = reads?.[0]?.result ?? 0n;
    const allowance = reads?.[1]?.result ?? 0n;
    const internal = reads?.[2]?.result ?? 0n;
    const bond = reads?.[3]?.result ?? 0n;
    const guildId = Number(reads?.[4]?.result ?? 0);
    const tick = chainTick?.tick ?? 0;
    const phase = chainTick?.phase ?? 0;
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrderPanel.useMemo[parsed]": ()=>{
            try {
                return amount.trim() === "" ? 0n : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])(amount.trim(), DEC);
            } catch  {
                return null;
            }
        }
    }["OrderPanel.useMemo[parsed]"], [
        amount
    ]);
    const pending = address && tick ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pendingForTick"])(address, tick) : [];
    // ------------------------------------------------------------------ actions
    const run = async (label, fn)=>{
        setBusy(label);
        setError(null);
        try {
            await fn();
            await refetch();
            forceRender((n)=>n + 1);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "transaction failed";
            // Wallet rejections are a choice, not an error worth shouting about.
            setError(/user rejected|denied/i.test(msg) ? null : msg.split("\n")[0]);
        } finally{
            setBusy(null);
        }
    };
    /** Fetch the season seed, asking for one signature if it is not cached. */ const ensureSeed = async (account)=>{
        const season = 1;
        const cached = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cachedSeed"])(account, season);
        if (cached) return cached;
        const signature = await signMessageAsync({
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedMessage"])(season)
        });
        const seed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["seedFromSignature"])(signature);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cacheSeed"])(account, season, seed);
        return seed;
    };
    const doApprove = ()=>run("Approving", ()=>writeContractAsync({
                address: token,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexwartokenAbi"],
                functionName: "approve",
                args: [
                    battle,
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$constants$2f$number$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["maxUint256"]
                ]
            }));
    const doDeposit = ()=>run("Depositing", ()=>writeContractAsync({
                address: battle,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "deposit",
                args: [
                    parsed
                ]
            }));
    const doCommit = ()=>run("Committing", async ()=>{
            const seed = await ensureSeed(address);
            const nonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextNonce"])(address, tick, hexId);
            const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveSalt"])(seed, tick, hexId, nonce);
            const isAttack = isNeutral ? true : side === "attack";
            const commitment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["commitmentHash"])(hexId, parsed, isAttack, salt, address);
            await writeContractAsync({
                address: battle,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "commit",
                args: [
                    commitment
                ]
            });
            const order = {
                tick,
                hexId,
                amount: parsed.toString(),
                isAttack,
                nonce,
                commitment,
                revealed: false
            };
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveOrder"])(address, order);
        });
    const doReveal = (o)=>run("Revealing", async ()=>{
            const seed = await ensureSeed(address);
            const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deriveSalt"])(seed, o.tick, o.hexId, o.nonce);
            await writeContractAsync({
                address: battle,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "reveal",
                args: [
                    address,
                    o.hexId,
                    BigInt(o.amount),
                    o.isAttack,
                    salt
                ]
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["markRevealed"])(address, o.commitment);
        });
    // ------------------------------------------------------------------- render
    const frame = (title, children, note)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border border-rule",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b border-rule px-4 py-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        className: "text-chalk-soft",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/OrderPanel.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 196,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-4 py-4",
                    children: [
                        children,
                        note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "type-data mt-3 text-chalk-muted",
                            children: note
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrderPanel.tsx",
                            lineNumber: 201,
                            columnNumber: 18
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "type-data mt-3 text-loss",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrderPanel.tsx",
                            lineNumber: 202,
                            columnNumber: 19
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 199,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 195,
            columnNumber: 5
        }, this);
    // Nothing deployed yet. Say it once, plainly, and offer nothing that cannot work.
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"]) {
        return frame("Commit an order", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "type-body text-chalk-soft",
                    children: isNeutral ? `This hex will cost ${claimCost.toLocaleString("en-US")} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} to claim, before the empire multiplier.` : "Taking this hex will mean staking against its defenders, sealed until reveal."
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "mt-4 w-full",
                    disabled: true,
                    children: "Trading opens at launch"
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 211,
            columnNumber: 7
        }, this), `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} is not trading yet and no contract is deployed. ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network} is the target.`);
    }
    if (!isConnected) {
        return frame("Commit an order", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            className: "w-full",
            onClick: ()=>connect({
                    connector: connectors[0]
                }),
            disabled: connecting || !connectors[0],
            children: connecting ? "Connecting…" : "Connect wallet"
        }, void 0, false, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 228,
            columnNumber: 7
        }, this), `Connect to stake ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} on this hex.`);
    }
    if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["targetChain"].id) {
        return frame("Wrong network", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            className: "w-full",
            onClick: ()=>switchChain({
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["targetChain"].id
                }),
            children: [
                "Switch to ",
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 242,
            columnNumber: 7
        }, this));
    }
    if (guildId === 0) {
        return frame("Join a guild first", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "type-body text-chalk-soft",
            children: "Orders are placed by guilds, and cohesion counts your active members — a guild fielding twenty-five hits half again as hard as a lone wallet. Open the standings to join one."
        }, void 0, false, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 251,
            columnNumber: 7
        }, this), "A one-member guild is allowed, and pays for it in cohesion.");
    }
    if (allowance < (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$parseUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseUnits"])("1", DEC)) {
        return frame("Approve once", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "type-body text-chalk-soft",
                    children: [
                        "Let the game move ",
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                        " from your wallet into your playing balance. Approving moves nothing on its own."
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "mt-4 w-full",
                    onClick: doApprove,
                    disabled: writing || !!busy,
                    children: busy === "Approving" ? "Approving…" : `Approve ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 268,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 263,
            columnNumber: 7
        }, this), `Wallet balance ${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(walletBalance, DEC)).toLocaleString("en-US")} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}.`);
    }
    const needed = parsed ?? 0n;
    if (internal < needed + bond) {
        return frame("Top up your playing balance", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "type-body text-chalk-soft",
                    children: "Stakes come out of a balance held by the game, not straight from your wallet. That is what keeps an order sealed: a transfer at commit time would publish the amount."
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    inputMode: "decimal",
                    value: amount,
                    onChange: (e)=>setAmount(e.target.value),
                    "aria-label": `Amount of ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} to deposit`,
                    className: "type-figure-sm mt-4 w-full border border-rule-strong bg-void px-3 py-2.5 text-chalk"
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "mt-3 w-full",
                    onClick: doDeposit,
                    disabled: writing || !!busy || parsed === null || parsed === 0n,
                    children: busy === "Depositing" ? "Depositing…" : `Deposit ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 281,
            columnNumber: 7
        }, this), `In the game ${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(internal, DEC)).toLocaleString("en-US")} · in your wallet ${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(walletBalance, DEC)).toLocaleString("en-US")}.`);
    }
    if (phase === 1) {
        return frame("Reveal your orders", pending.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "type-body text-chalk-soft",
            children: "Nothing of yours is waiting this tick."
        }, void 0, false, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 310,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: pending.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b border-rule/60 py-2.5 last:border-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-baseline justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data text-chalk",
                                    children: [
                                        "#",
                                        String(o.hexId).padStart(3, "0"),
                                        " ·",
                                        " ",
                                        o.isAttack ? "attack" : "defend"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OrderPanel.tsx",
                                    lineNumber: 318,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "type-data text-chalk",
                                    children: Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(BigInt(o.amount), DEC)).toLocaleString("en-US")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OrderPanel.tsx",
                                    lineNumber: 322,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OrderPanel.tsx",
                            lineNumber: 317,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "mt-2 w-full",
                            onClick: ()=>doReveal(o),
                            disabled: writing || !!busy,
                            children: busy === "Revealing" ? "Revealing…" : "Reveal"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OrderPanel.tsx",
                            lineNumber: 326,
                            columnNumber: 15
                        }, this)
                    ]
                }, o.commitment, true, {
                    fileName: "[project]/src/components/OrderPanel.tsx",
                    lineNumber: 316,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 314,
            columnNumber: 9
        }, this), "Miss the window and the bond is forfeit — 10% burned. Anyone holding your salt can reveal for you.");
    }
    if (phase === 2) {
        return frame("Resolving", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "type-body text-chalk-soft",
            children: "Every battle on the map is settling. Commits reopen when the tick closes."
        }, void 0, false, {
            fileName: "[project]/src/components/OrderPanel.tsx",
            lineNumber: 344,
            columnNumber: 7
        }, this), chainTick?.resolutionPending ? "Waiting on the keeper." : undefined);
    }
    // Commit phase — the main event.
    return frame(isNeutral ? "Claim this hex" : "Commit an order", /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            !isNeutral && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    "attack",
                    "defend"
                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setSide(s),
                        "aria-pressed": side === s,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label flex-1 border px-3 py-2.5 text-center transition-colors", side === s ? "border-ember bg-ember text-void" : "border-rule-strong text-chalk-muted hover:text-chalk"),
                        children: s === "attack" ? "Attack" : "Defend"
                    }, s, false, {
                        fileName: "[project]/src/components/OrderPanel.tsx",
                        lineNumber: 358,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/OrderPanel.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                inputMode: "decimal",
                value: amount,
                onChange: (e)=>setAmount(e.target.value),
                "aria-label": `Amount of ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} to stake`,
                className: "type-figure-sm mt-3 w-full border border-rule-strong bg-void px-3 py-2.5 text-chalk"
            }, void 0, false, {
                fileName: "[project]/src/components/OrderPanel.tsx",
                lineNumber: 376,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                className: "mt-3 w-full",
                onClick: doCommit,
                disabled: writing || !!busy || parsed === null || parsed === 0n,
                children: busy === "Committing" ? "Sealing…" : "Commit sealed order"
            }, void 0, false, {
                fileName: "[project]/src/components/OrderPanel.tsx",
                lineNumber: 384,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/OrderPanel.tsx",
        lineNumber: 354,
        columnNumber: 5
    }, this), `Tick ${tick} · nothing moves until you reveal. A bond of ${Number((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$unit$2f$formatUnits$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatUnits"])(bond, DEC)).toLocaleString("en-US")} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} is locked, and that bond is all you risk if you never open the order.`);
}
_s(OrderPanel, "HDsuEJ/wNauz+fv0mNxMuU8Bz3A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useChainId$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainId"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSignMessage$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSignMessage"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWriteContract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWriteContract"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainTick"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContracts"]
    ];
});
_c = OrderPanel;
var _c;
__turbopack_context__.k.register(_c, "OrderPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Resolution.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Resolution",
    ()=>Resolution
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/guilds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$replay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-replay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
/*
 * The resolution screen.
 *
 * In the game every battle in a tick lands at the same instant. Showing them
 * that way would be honest and unwatchable — one frame, 23 hexes change colour,
 * nobody learns anything. So the replay sequences them, and says so: the header
 * reads "replayed in sequence" rather than pretending this is how time passed.
 *
 * What each beat has to answer is why a hex moved, and that is two numbers.
 * Attack power against defence power, drawn as bars on a shared scale, with the
 * fortification multiplier shown as the part of the defender's bar it earned by
 * standing there. Everything else on screen is subordinate to that comparison.
 *
 * The numbers are a real tick out of the balance simulation, not a mock-up. Once
 * a chain is live the indexer serves the same shape from `/replay/:tick`.
 */ const SPEEDS = [
    {
        label: "0.5x",
        ms: 1800
    },
    {
        label: "1x",
        ms: 900
    },
    {
        label: "2x",
        ms: 450
    },
    {
        label: "4x",
        ms: 220
    }
];
function outcomeOf(e) {
    if (e.kind === "claim") return "claimed";
    return e.winner !== 0 ? "captured" : "held";
}
function Resolution({ onClose }) {
    _s();
    const board = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Resolution.useMemo[cells]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMap"])(board.radius)
    }["Resolution.useMemo[cells]"], [
        board.radius
    ]);
    const events = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$replay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewReplay"].events;
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [playing, setPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [speed, setSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Resolution.useEffect": ()=>{
            const onKey = {
                "Resolution.useEffect.onKey": (e)=>{
                    if (e.key === "Escape") onClose();
                    if (e.key === " ") {
                        e.preventDefault();
                        setPlaying({
                            "Resolution.useEffect.onKey": (p)=>!p
                        }["Resolution.useEffect.onKey"]);
                    }
                }
            }["Resolution.useEffect.onKey"];
            window.addEventListener("keydown", onKey);
            return ({
                "Resolution.useEffect": ()=>window.removeEventListener("keydown", onKey)
            })["Resolution.useEffect"];
        }
    }["Resolution.useEffect"], [
        onClose
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Resolution.useEffect": ()=>{
            if (!playing) return;
            if (index >= events.length) {
                setPlaying(false);
                return;
            }
            const id = window.setTimeout({
                "Resolution.useEffect.id": ()=>setIndex({
                        "Resolution.useEffect.id": (i)=>i + 1
                    }["Resolution.useEffect.id"])
            }["Resolution.useEffect.id"], SPEEDS[speed].ms);
            return ({
                "Resolution.useEffect": ()=>window.clearTimeout(id)
            })["Resolution.useEffect"];
        }
    }["Resolution.useEffect"], [
        playing,
        index,
        speed,
        events.length
    ]);
    const current = index < events.length ? events[index] : null;
    const played = events.slice(0, Math.min(index + 1, events.length));
    /** Where each hex ends up once every beat up to `index` has landed. */ const owners = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Resolution.useMemo[owners]": ()=>{
            const next = [
                ...board.owners
            ];
            for (const e of events.slice(0, index)){
                if (e.winner !== 0) next[e.hex] = e.winner;
            }
            return next;
        }
    }["Resolution.useMemo[owners]"], [
        board.owners,
        events,
        index
    ]);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Resolution.useCallback[draw]": ()=>{
            const canvas = canvasRef.current;
            const wrap = wrapRef.current;
            if (!canvas || !wrap) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = wrap.clientWidth;
            const h = wrap.clientHeight;
            if (w === 0 || h === 0) return;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const unit = 10;
            const pts = cells.map({
                "Resolution.useCallback[draw].pts": (c)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hexCenter"])(c, unit)
            }["Resolution.useCallback[draw].pts"]);
            const xs = pts.map({
                "Resolution.useCallback[draw].xs": (p)=>p.x
            }["Resolution.useCallback[draw].xs"]);
            const ys = pts.map({
                "Resolution.useCallback[draw].ys": (p)=>p.y
            }["Resolution.useCallback[draw].ys"]);
            const spanX = Math.max(...xs) - Math.min(...xs) + unit * 2;
            const spanY = Math.max(...ys) - Math.min(...ys) + unit * 2;
            const scale = Math.min(w / spanX, h / spanY) * 0.9;
            const size = unit * scale;
            const ox = w / 2 - (Math.min(...xs) + Math.max(...xs)) / 2 * scale;
            const oy = h / 2 - (Math.min(...ys) + Math.max(...ys)) / 2 * scale;
            const hexPath = {
                "Resolution.useCallback[draw].hexPath": (cx, cy, s)=>{
                    ctx.beginPath();
                    for(let i = 0; i < 6; i++){
                        const a = (60 * i - 30) * Math.PI / 180;
                        const x = cx + s * Math.cos(a);
                        const y = cy + s * Math.sin(a);
                        if (i === 0) ctx.moveTo(x, y);
                        else ctx.lineTo(x, y);
                    }
                    ctx.closePath();
                }
            }["Resolution.useCallback[draw].hexPath"];
            // The board, dimmed: it is context for the beat, not the subject.
            for (const c of cells){
                const x = ox + pts[c.id].x * scale;
                const y = oy + pts[c.id].y * scale;
                const owner = owners[c.id] ?? 0;
                hexPath(x, y, size * 0.94);
                ctx.fillStyle = owner === 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NEUTRAL_COLOR"] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(owner);
                ctx.globalAlpha = owner === 0 ? 0.3 : 0.34;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            // Everything already resolved this tick, marked by what happened to it.
            for (const e of played){
                const x = ox + pts[e.hex].x * scale;
                const y = oy + pts[e.hex].y * scale;
                const kind = outcomeOf(e);
                hexPath(x, y, size * 0.94);
                ctx.fillStyle = kind === "captured" ? "#ff5a1f" : kind === "claimed" ? "#ffffff" : "#3fcf8e";
                ctx.globalAlpha = e === current ? 0.95 : 0.32;
                ctx.fill();
                ctx.globalAlpha = 1;
            }
            // The beat itself, ringed so the eye lands on it immediately.
            if (current) {
                const x = ox + pts[current.hex].x * scale;
                const y = oy + pts[current.hex].y * scale;
                hexPath(x, y, size * 1.6);
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    }["Resolution.useCallback[draw]"], [
        cells,
        owners,
        played,
        current
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Resolution.useEffect": ()=>{
            draw();
        }
    }["Resolution.useEffect"], [
        draw
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Resolution.useEffect": ()=>{
            const wrap = wrapRef.current;
            if (!wrap) return;
            const ro = new ResizeObserver({
                "Resolution.useEffect": ()=>draw()
            }["Resolution.useEffect"]);
            ro.observe(wrap);
            return ({
                "Resolution.useEffect": ()=>ro.disconnect()
            })["Resolution.useEffect"];
        }
    }["Resolution.useEffect"], [
        draw
    ]);
    // Running totals of what the tick has done so far.
    const tally = played.reduce((acc, e)=>{
        const k = outcomeOf(e);
        acc[k] += 1;
        if (e.winner !== 0) acc.moved += e.treasury;
        return acc;
    }, {
        captured: 0,
        held: 0,
        claimed: 0,
        moved: 0
    });
    const topAttacker = current?.attackers.reduce((best, a)=>best === null || a.power > best.power ? a : best, null);
    const scaleMax = Math.max(current?.defPower ?? 1, topAttacker?.power ?? 1, 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-50 flex flex-col bg-void/97 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-3 border-b border-rule px-4 py-3 sm:px-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-ember",
                                children: [
                                    "Tick ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$replay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewReplay"].tick,
                                    " resolution"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data mt-0.5 text-chalk-muted",
                                children: "Every battle lands at once on chain. Replayed in sequence so it can be read."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 202,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Resolution.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    if (index >= events.length) setIndex(0);
                                    setPlaying((p)=>!p);
                                },
                                className: "type-label border border-rule-strong px-3 py-2 text-chalk transition-colors hover:border-ember hover:text-ember",
                                children: index >= events.length ? "Replay" : playing ? "Pause" : "Play"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            SPEEDS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSpeed(i),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label px-2.5 py-2 transition-colors", speed === i ? "bg-ember text-void" : "text-chalk-muted hover:text-chalk"),
                                    children: s.label
                                }, s.label, false, {
                                    fileName: "[project]/src/components/Resolution.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Resolution.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Resolution.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1 flex-col lg:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: wrapRef,
                        className: "sheet-grid relative min-h-[240px] flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                            ref: canvasRef,
                            "aria-label": "Tick resolution replay"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Resolution.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Resolution.tsx",
                        lineNumber: 243,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex w-full shrink-0 flex-col border-t border-rule lg:w-[400px] lg:border-l lg:border-t-0",
                        children: [
                            current ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 overflow-y-auto px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-baseline justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "type-display text-chalk",
                                                children: [
                                                    "#",
                                                    String(current.hex).padStart(3, "0")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label border px-2 py-1", outcomeOf(current) === "captured" ? "border-ember/50 bg-ember/10 text-ember" : outcomeOf(current) === "claimed" ? "border-chalk/40 text-chalk" : "border-gain/50 bg-gain/10 text-gain"),
                                                children: outcomeOf(current) === "captured" ? "Captured" : outcomeOf(current) === "claimed" ? "Claimed" : "Held"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-data mt-1 text-chalk-muted",
                                        children: [
                                            "Tier ",
                                            current.tier,
                                            current.defender !== 0 && ` · held by ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(current.defender)}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 273,
                                        columnNumber: 15
                                    }, this),
                                    current.kind === "battle" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5 space-y-4",
                                        children: [
                                            current.attackers.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-baseline justify-between gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "type-label text-chalk-soft",
                                                                    children: [
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(a.guild),
                                                                        " attacks"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/Resolution.tsx",
                                                                    lineNumber: 284,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "type-figure-sm text-chalk",
                                                                    children: a.power.toFixed(1)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/Resolution.tsx",
                                                                    lineNumber: 287,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Resolution.tsx",
                                                            lineNumber: 283,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-1 h-2.5 w-full bg-field-line",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full transition-[width] duration-500",
                                                                style: {
                                                                    width: `${Math.min(100, a.power / scaleMax * 100)}%`,
                                                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(a.guild)
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 290,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Resolution.tsx",
                                                            lineNumber: 289,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "type-data mt-1 text-chalk-muted",
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.stake),
                                                                " ",
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                                                " staked"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/Resolution.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, a.guild, true, {
                                                    fileName: "[project]/src/components/Resolution.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-baseline justify-between gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-label text-chalk-soft",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(current.defender),
                                                                    " defends"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 306,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-figure-sm text-chalk",
                                                                children: current.defPower.toFixed(1)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 309,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Resolution.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 flex h-2.5 w-full bg-field-line",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-chalk-soft transition-[width] duration-500",
                                                                style: {
                                                                    width: `${Math.min(100, current.defPower / scaleMax * (100 / (current.fort / 100)))}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 314,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-full bg-gain transition-[width] duration-500",
                                                                style: {
                                                                    width: `${Math.min(100, current.defPower / scaleMax * 100 * (1 - 100 / current.fort))}%`
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 321,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Resolution.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "type-data mt-1 text-chalk-muted",
                                                        children: [
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(current.defStake),
                                                            " ",
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                                            " staked ·",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gain",
                                                                children: [
                                                                    current.fort,
                                                                    "% fortification"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Resolution.tsx",
                                                                lineNumber: 333,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Resolution.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 304,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "type-data border-t border-rule/60 pt-3 text-chalk-muted",
                                                children: current.winner !== 0 ? `A beat D, so ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(current.winner)} takes the hex and its ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(current.treasury)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} treasury.` : "A did not beat D. On a tie the defender holds, and every attacker forfeits 20% of their stake."
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 337,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 280,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "type-body text-chalk-soft",
                                                children: [
                                                    "Unclaimed ground, so no battle:",
                                                    " ",
                                                    current.attackers.length > 1 ? `${current.attackers.length} guilds bid, and the largest raw power took it.` : "bought outright at the tier price plus the empire multiplier."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 345,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "type-data mt-3 text-chalk-muted",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(current.winner),
                                                    " paid ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(current.treasury),
                                                    " ",
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                                    " into the hex treasury."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-display text-chalk",
                                        children: "Tick settled"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 360,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "type-body mt-3 text-chalk-soft",
                                        children: [
                                            tally.captured,
                                            " hexes changed hands, ",
                                            tally.held,
                                            " held, ",
                                            tally.claimed,
                                            " ",
                                            "bought from neutral. ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(tally.moved),
                                            " ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker,
                                            " of treasury moved with them."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "grid grid-cols-4 border-t border-rule",
                                children: [
                                    [
                                        "Captured",
                                        tally.captured,
                                        "text-ember"
                                    ],
                                    [
                                        "Held",
                                        tally.held,
                                        "text-gain"
                                    ],
                                    [
                                        "Claimed",
                                        tally.claimed,
                                        "text-chalk"
                                    ],
                                    [
                                        "Moved",
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(tally.moved),
                                        "text-chalk"
                                    ]
                                ].map(([k, v, tone])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-r border-rule px-3 py-2.5 last:border-r-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: String(k)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Resolution.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 378,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-figure-sm mt-1", tone),
                                                children: String(v)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Resolution.tsx",
                                                lineNumber: 381,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, String(k), true, {
                                        fileName: "[project]/src/components/Resolution.tsx",
                                        lineNumber: 377,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Resolution.tsx",
                                lineNumber: 370,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Resolution.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Resolution.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-rule px-4 py-3 sm:px-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "type-label shrink-0 text-chalk-muted",
                            children: [
                                Math.min(index + 1, events.length),
                                " / ",
                                events.length
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Resolution.tsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "range",
                            min: 0,
                            max: events.length,
                            value: index,
                            onChange: (e)=>{
                                setPlaying(false);
                                setIndex(Number(e.target.value));
                            },
                            "aria-label": "Scrub the tick",
                            className: "h-1 flex-1 appearance-none bg-field-line accent-ember"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Resolution.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Resolution.tsx",
                    lineNumber: 390,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Resolution.tsx",
                lineNumber: 389,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Resolution.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_s(Resolution, "gFCUmTzY6vhTYYkzvAR5u6nRWTM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c = Resolution;
var _c;
__turbopack_context__.k.register(_c, "Resolution");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Steps.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Steps",
    ()=>Steps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
;
;
;
;
;
/*
 * The ten-second explanation.
 *
 * A visitor arrives asking three things in this order: what do I get, how do I
 * get it, and what do I actually have to do. Prose answers all three eventually;
 * three numbered beats answer them at a glance — and the figures are the real
 * ones, so the strip doubles as the price list.
 *
 * It replaces the paragraph and the stat pills that used to sit here. Both said
 * the same thing, slower.
 */ const tier1Day = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][1] * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerDay;
const tier3Day = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][3] * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerDay;
const STEPS = [
    {
        n: "1",
        title: "Take a hex",
        figure: "100",
        unit: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} and up`,
        body: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].neutralHexes} are still unclaimed. Free ground next to yours is bought outright — no battle. The price climbs the more you hold.`
    },
    {
        n: "2",
        title: "Hold it",
        figure: "1",
        unit: "order every 8h",
        body: "Stake to defend. The longer you hold, the harder you are to shift — defence doubles after twenty turns."
    },
    {
        n: "3",
        title: "Get paid",
        figure: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(tier1Day)}–${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(tier3Day)}`,
        unit: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker} a day`,
        body: `Paid three times a day, plus a cut of the fixed ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool)} pool at season end.`
    }
];
function Steps({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
        className: className,
        children: STEPS.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "flex gap-3 border-b border-rule/60 py-2.5 last:border-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "type-figure-sm mt-0.5 w-4 shrink-0 text-ember",
                        children: step.n
                    }, void 0, false, {
                        fileName: "[project]/src/components/Steps.tsx",
                        lineNumber: 53,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-baseline justify-between gap-x-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "type-figure-sm text-chalk",
                                        children: step.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Steps.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-baseline gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "type-figure-sm text-ember",
                                                children: step.figure
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Steps.tsx",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "type-label text-chalk-muted",
                                                children: step.unit
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Steps.tsx",
                                                lineNumber: 59,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Steps.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Steps.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data mt-1 text-chalk-muted",
                                children: step.body
                            }, void 0, false, {
                                fileName: "[project]/src/components/Steps.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Steps.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                ]
            }, step.n, true, {
                fileName: "[project]/src/components/Steps.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/Steps.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c = Steps;
var _c;
__turbopack_context__.k.register(_c, "Steps");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/TickClock.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TickClock",
    ()=>TickClock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useChainTick.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/season.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function TickClock({ className }) {
    _s();
    // Server render and first client render have to agree: start at null and let
    // the clock appear only once mounted.
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: chain } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainTick"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TickClock.useEffect": ()=>{
            const sync = {
                "TickClock.useEffect.sync": ()=>setState((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tickStateAt"])(Date.now()))
            }["TickClock.useEffect.sync"];
            sync();
            const id = window.setInterval(sync, 1000);
            return ({
                "TickClock.useEffect": ()=>window.clearInterval(id)
            })["TickClock.useEffect"];
        }
    }["TickClock.useEffect"], []);
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].reduce((s, p)=>s + p.seconds, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("panel px-4 py-3", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                        children: [
                            "Tick ",
                            chain ? chain.tick : state ? state.tick : "—",
                            " / ",
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TICKS_PER_SEASON"]
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/TickClock.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label", state?.phase === "resolution" ? "animate-pulse-ember text-ember" : "text-chalk-soft"),
                        children: chain ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"][chain.phase]?.label ?? "—" : state ? state.phaseLabel : "Cadence"
                    }, void 0, false, {
                        fileName: "[project]/src/components/TickClock.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/TickClock.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 type-figure text-chalk",
                children: state ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCountdown"])(state.remaining) : "--:--:--"
            }, void 0, false, {
                fileName: "[project]/src/components/TickClock.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex h-1.5 w-full gap-[2px]",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].map((phase)=>{
                    const active = state?.phase === phase.name;
                    const done = state !== null && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].findIndex((p)=>p.name === state.phase) > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].findIndex((p)=>p.name === phase.name);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden bg-field-line",
                        style: {
                            flexGrow: phase.seconds / total
                        },
                        title: `${phase.label} — ${phase.blurb}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("absolute inset-y-0 left-0", phase.name === "resolution" ? "bg-ember" : "bg-chalk-soft"),
                            style: {
                                width: done ? "100%" : active ? `${(state?.phaseProgress ?? 0) * 100}%` : "0%"
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/TickClock.tsx",
                            lineNumber: 79,
                            columnNumber: 15
                        }, this)
                    }, phase.name, false, {
                        fileName: "[project]/src/components/TickClock.tsx",
                        lineNumber: 73,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/TickClock.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "type-data mt-2 text-chalk-muted",
                children: chain?.resolutionPending ? "Waiting on the keeper to resolve this tick." : chain ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"][chain.phase]?.blurb : state ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$season$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHASES"].find((p)=>p.name === state.phase)?.blurb : "One tick is 8h: commit, reveal, resolution."
            }, void 0, false, {
                fileName: "[project]/src/components/TickClock.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/TickClock.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(TickClock, "oU30VDIzEciYuPwSA1FeqbfVsSk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useChainTick$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChainTick"]
    ];
});
_c = TickClock;
var _c;
__turbopack_context__.k.register(_c, "TickClock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Ticker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Ticker",
    ()=>Ticker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/guilds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Ticker() {
    _s();
    const { board: previewBoard, source } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardContext"])();
    const standings = previewBoard.guilds.filter((g)=>g.hexes > 0);
    const items = standings.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex shrink-0 items-center gap-2 px-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "h-2 w-2 shrink-0",
                    style: {
                        background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(g.id)
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/Ticker.tsx",
                    lineNumber: 18,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "type-label text-chalk-soft",
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(g.id)
                }, void 0, false, {
                    fileName: "[project]/src/components/Ticker.tsx",
                    lineNumber: 19,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "type-data text-chalk",
                    children: g.hexes
                }, void 0, false, {
                    fileName: "[project]/src/components/Ticker.tsx",
                    lineNumber: 20,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "type-label text-chalk-muted",
                    children: [
                        g.conquests,
                        " taken · ",
                        g.losses,
                        " lost"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Ticker.tsx",
                    lineNumber: 21,
                    columnNumber: 7
                }, this)
            ]
        }, g.id, true, {
            fileName: "[project]/src/components/Ticker.tsx",
            lineNumber: 17,
            columnNumber: 5
        }, this));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center border-t border-rule bg-void/92 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "type-label shrink-0 border-r border-rule px-4 py-2.5 text-chalk-muted",
                children: source === "simulation" ? "Simulated" : `Tick ${previewBoard.tick}`
            }, void 0, false, {
                fileName: "[project]/src/components/Ticker.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden py-2.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-ticker flex w-max items-center",
                    children: [
                        items,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": true,
                            className: "flex",
                            children: items
                        }, void 0, false, {
                            fileName: "[project]/src/components/Ticker.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Ticker.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Ticker.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Ticker.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(Ticker, "uhjkuxlqT/RZVOnhRkIhvqlWWgo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardContext"]
    ];
});
_c = Ticker;
var _c;
__turbopack_context__.k.register(_c, "Ticker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/World.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "World",
    ()=>World
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HexMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HexMap.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HexPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HexPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MapKey$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MapKey.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Steps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Steps.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Docs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Docs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Resolution$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Resolution.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TickClock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TickClock.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Ticker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Ticker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function World() {
    _s();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [docsOpen, setDocsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [replayOpen, setReplayOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("pays");
    const [wide, setWide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const previewBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const cells = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "World.useMemo[cells]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildMap"])(previewBoard.radius)
    }["World.useMemo[cells]"], []);
    const selected = selectedId === null ? null : cells[selectedId];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "World.useEffect": ()=>{
            const query = window.matchMedia("(min-width: 1024px)");
            const sync = {
                "World.useEffect.sync": ()=>setWide(query.matches)
            }["World.useEffect.sync"];
            sync();
            query.addEventListener("change", sync);
            return ({
                "World.useEffect": ()=>query.removeEventListener("change", sync)
            })["World.useEffect"];
        }
    }["World.useEffect"], []);
    /*
   * The map slides out from under whatever is open: beside the copy on a wide
   * screen, and pushed further left when a hex sheet takes the right edge.
   *
   * Once the layout stacks there is no "beside" left, so the two are split
   * outright — map in the top band, copy in the bottom one. Overlaying them
   * makes both unreadable, and the rule is that nothing is ever read on top of
   * the map.
   */ const bias = wide ? selected ? 0.36 : 0.69 : 0.5;
    const biasY = 0.5;
    const openBestFreeHex = ()=>{
        // A free tier 3 shows both things that matter at once: what is worth taking,
        // and that there is still ground to take.
        const free = previewBoard.owners.map((owner, id)=>({
                owner,
                id,
                tier: previewBoard.tiers[id]
            })).filter((h)=>h.owner === 0);
        const prize = free.find((h)=>h.tier === 3) ?? free.find((h)=>h.tier === 2) ?? free[0];
        if (prize) setSelectedId(prize.id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sheet-grid absolute inset-x-0 top-0 bottom-[58%] lg:inset-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HexMap$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexMap"], {
                    owners: previewBoard.owners,
                    tiers: previewBoard.tiers,
                    refuges: previewBoard.refuges,
                    treasury: previewBoard.treasury,
                    yieldUnit: previewBoard.yieldUnit,
                    ticksPerDay: previewBoard.ticksPerDay,
                    radius: previewBoard.radius,
                    mode: mode,
                    selectedId: selectedId,
                    onSelect: setSelectedId,
                    bias: bias,
                    biasY: biasY,
                    className: "h-full w-full"
                }, void 0, false, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            !selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-3 top-3 z-20 w-[172px] sm:right-4 sm:top-4 sm:w-[236px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MapKey$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapKey"], {
                    mode: mode,
                    onMode: setMode
                }, void 0, false, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 98,
                columnNumber: 9
            }, this),
            !selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 top-[42%] bottom-10 overflow-y-auto border-t border-rule bg-void/90 px-4 backdrop-blur-sm sm:px-8 lg:inset-y-0 lg:top-0 lg:bottom-0 lg:flex lg:w-[50%] lg:items-center lg:overflow-visible lg:border-0 lg:bg-transparent lg:pb-12 lg:backdrop-blur-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pitch pointer-events-auto w-full max-w-[480px] py-5 lg:py-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-x-3 gap-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-chalk-soft",
                                    children: [
                                        "Tick ",
                                        previewBoard.tick,
                                        " / ",
                                        previewBoard.ticksPerSeason
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/World.tsx",
                                    lineNumber: 108,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SourceNote"], {}, void 0, false, {
                                    fileName: "[project]/src/components/World.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 107,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "type-hero wordmark-outline mt-4 text-chalk",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].wordmark
                        }, void 0, false, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "type-display mt-3 text-ember",
                            children: "Hold ground."
                        }, void 0, false, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "type-display text-chalk",
                            children: "Get paid every 8 hours."
                        }, void 0, false, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Steps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Steps"], {
                            className: "mt-5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 122,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex flex-wrap items-stretch gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: openBestFreeHex,
                                    children: "Pick a free hex"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/World.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setDocsOpen(true),
                                    children: "How it works"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/World.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: ()=>setReplayOpen(true),
                                    children: "Watch a tick resolve"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/World.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 max-w-[320px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TickClock$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TickClock"], {}, void 0, false, {
                                fileName: "[project]/src/components/World.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/World.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-x-0 bottom-14 hidden px-4 sm:block sm:px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pointer-events-auto flex flex-wrap items-center gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: ()=>setDocsOpen(true),
                        children: "How it works"
                    }, void 0, false, {
                        fileName: "[project]/src/components/World.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 right-0 z-30 w-full max-w-[420px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HexPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HexPanel"], {
                    cell: selected,
                    onClose: ()=>setSelectedId(null)
                }, void 0, false, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-x-0 bottom-0 z-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Ticker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Ticker"], {}, void 0, false, {
                    fileName: "[project]/src/components/World.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            docsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Docs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Docs"], {
                onClose: ()=>setDocsOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 163,
                columnNumber: 20
            }, this),
            replayOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Resolution$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Resolution"], {
                onClose: ()=>setReplayOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/World.tsx",
                lineNumber: 164,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/World.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(World, "4VTaiCqYja2+4dJw3Kmu3bABdzA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c = World;
var _c;
__turbopack_context__.k.register(_c, "World");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "ButtonLink",
    ()=>ButtonLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
/*
 * Un seul bouton plein, en braise, parce qu'engager un ordre est l'acte pour
 * lequel la page existe. Tout le reste est en contour.
 */ const base = "type-label inline-flex items-center justify-center gap-2 px-4 py-3 transition-colors duration-150 disabled:cursor-not-allowed";
function Button({ children, variant = "solid", className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(base, variant === "solid" ? "bg-ember text-void hover:bg-ember-bright disabled:bg-transparent disabled:text-chalk-muted disabled:ring-1 disabled:ring-rule-strong disabled:ring-inset" : "text-chalk ring-1 ring-rule-strong ring-inset hover:bg-chalk hover:text-void disabled:text-chalk-muted", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Button;
function ButtonLink({ children, href, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: href,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(base, "bg-ember text-void hover:bg-ember-bright", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Button.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_c1 = ButtonLink;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button");
__turbopack_context__.k.register(_c1, "ButtonLink");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/abi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * GENERATED — do not edit by hand. Regenerate with `npm run contracts:abi`.
 *
 * Emitted from the solc output so the site cannot drift from the contracts it
 * talks to.
 */ __turbopack_context__.s([
    "battleAbi",
    ()=>battleAbi,
    "hexwartokenAbi",
    ()=>hexwartokenAbi,
    "mapAbi",
    ()=>mapAbi,
    "seasonAbi",
    ()=>seasonAbi
]);
const battleAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "Burned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "burned",
                "type": "uint128"
            }
        ],
        "name": "CommitSlashed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "bond",
                "type": "uint128"
            }
        ],
        "name": "Committed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Deposited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "from",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "to",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "treasury",
                "type": "uint128"
            }
        ],
        "name": "HexCaptured",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cost",
                "type": "uint256"
            }
        ],
        "name": "HexClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "HexHeld",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "amount",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isAttack",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "relayer",
                "type": "address"
            }
        ],
        "name": "Revealed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "battles",
                "type": "uint16"
            }
        ],
        "name": "TickResolved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Withdrawn",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "COMMIT_SECONDS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_BATCH",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "REFUGE_COOLDOWN_TICKS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "REVEAL_SECONDS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TICKS_PER_SEASON",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "TICK_SECONDS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "accrue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "activeMembers",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            },
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "name": "atkSide",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "rawPower",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "stake",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
            }
        ],
        "name": "commit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "commitBond",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "commitments",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            },
            {
                "internalType": "uint128",
                "name": "bond",
                "type": "uint128"
            },
            {
                "internalType": "bool",
                "name": "revealed",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "settled",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "contested",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contestedCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentTick",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "name": "defSide",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "rawPower",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "stake",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "empireExponent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            }
        ],
        "name": "freeBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "name": "hexEpoch",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "name": "lastAccrualTick",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "lastActiveTick",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "name": "lastRefugeMoveTick",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastResolvedTick",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "lockedOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "map",
        "outputs": [
            {
                "internalType": "contract Map",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "moveRefuge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "phase",
        "outputs": [
            {
                "internalType": "enum Battle.Phase",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "positionId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "resolveCursor",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "max",
                "type": "uint16"
            }
        ],
        "name": "resolveTick",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint128",
                "name": "amount",
                "type": "uint128"
            },
            {
                "internalType": "bool",
                "name": "isAttack",
                "type": "bool"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            }
        ],
        "name": "reveal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "season",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seasonOver",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seasonStart",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "exponent",
                "type": "uint256"
            }
        ],
        "name": "setEmpireExponent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "season_",
                "type": "address"
            }
        ],
        "name": "setSeason",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "player",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "commitment",
                "type": "bytes32"
            }
        ],
        "name": "slashUnrevealed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalBurned",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "yieldUnit",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const mapAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "treasury",
                "type": "address"
            }
        ],
        "name": "GuildCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "from",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "to",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            }
        ],
        "name": "HexOwnerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "int16",
                "name": "q",
                "type": "int16"
            },
            {
                "indexed": false,
                "internalType": "int16",
                "name": "r",
                "type": "int16"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "tier",
                "type": "uint8"
            }
        ],
        "name": "HexSeeded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "member",
                "type": "address"
            }
        ],
        "name": "MemberJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "from",
                "type": "uint16"
            },
            {
                "indexed": false,
                "internalType": "uint16",
                "name": "to",
                "type": "uint16"
            }
        ],
        "name": "RefugeMoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "hexCount",
                "type": "uint256"
            }
        ],
        "name": "Sealed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "TransferBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "TransferSingle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "URI",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint128",
                "name": "amount",
                "type": "uint128"
            }
        ],
        "name": "addTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "battle",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "burnPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "clearTreasury",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "taken",
                "type": "uint128"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "treasury_",
                "type": "address"
            }
        ],
        "name": "createGuild",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "guildCount",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "guildHexCount",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "guildOf",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "name": "guilds",
        "outputs": [
            {
                "internalType": "address",
                "name": "treasury",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "hexCount",
                "type": "uint16"
            },
            {
                "internalType": "uint16",
                "name": "refugeHexId",
                "type": "uint16"
            },
            {
                "internalType": "uint32",
                "name": "memberCount",
                "type": "uint32"
            },
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "hexCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hexes",
        "outputs": [
            {
                "internalType": "int16",
                "name": "q",
                "type": "int16"
            },
            {
                "internalType": "int16",
                "name": "r",
                "type": "int16"
            },
            {
                "internalType": "uint8",
                "name": "tier",
                "type": "uint8"
            },
            {
                "internalType": "uint32",
                "name": "ownerGuild",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "heldSinceTick",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "lastDefendedTick",
                "type": "uint32"
            },
            {
                "internalType": "bool",
                "name": "isRefuge",
                "type": "bool"
            },
            {
                "internalType": "uint128",
                "name": "treasury",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int16",
                "name": "q",
                "type": "int16"
            },
            {
                "internalType": "int16",
                "name": "r",
                "type": "int16"
            }
        ],
        "name": "idAt",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "isBorder",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "joinGuild",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            }
        ],
        "name": "markDefended",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "memberCount",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mintPosition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            },
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "moveRefuge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "neighbors",
        "outputs": [
            {
                "internalType": "uint16[6]",
                "name": "out",
                "type": "uint16[6]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "uint32",
                "name": "",
                "type": "uint32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "seal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sealed_",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int16[]",
                "name": "q",
                "type": "int16[]"
            },
            {
                "internalType": "int16[]",
                "name": "r",
                "type": "int16[]"
            },
            {
                "internalType": "uint8[]",
                "name": "tier",
                "type": "uint8[]"
            }
        ],
        "name": "seedHexes",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "battle_",
                "type": "address"
            }
        ],
        "name": "setBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint32",
                "name": "to",
                "type": "uint32"
            },
            {
                "internalType": "uint32",
                "name": "tick",
                "type": "uint32"
            }
        ],
        "name": "setOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint128",
                "name": "amount",
                "type": "uint128"
            }
        ],
        "name": "skimTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "tierOf",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            },
            {
                "internalType": "uint32",
                "name": "guildId",
                "type": "uint32"
            }
        ],
        "name": "touchesGuild",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint16",
                "name": "hexId",
                "type": "uint16"
            }
        ],
        "name": "treasuryOf",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const seasonAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Claimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Drawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "root",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "name": "Finalised",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Funded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "battle",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "bytes32[]",
                "name": "proof",
                "type": "bytes32[]"
            }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "claimed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "draw",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "sent",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "root",
                "type": "bytes32"
            }
        ],
        "name": "finalise",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "finalised",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "fund",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "funded",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "merkleRoot",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paidOut",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolRemaining",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "returnToPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "battle_",
                "type": "address"
            }
        ],
        "name": "setBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const hexwartokenAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "MAX_SUPPLY",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/orders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cacheSeed",
    ()=>cacheSeed,
    "cachedSeed",
    ()=>cachedSeed,
    "commitmentHash",
    ()=>commitmentHash,
    "deriveSalt",
    ()=>deriveSalt,
    "loadOrders",
    ()=>loadOrders,
    "markRevealed",
    ()=>markRevealed,
    "nextNonce",
    ()=>nextNonce,
    "pendingForTick",
    ()=>pendingForTick,
    "saveOrder",
    ()=>saveOrder,
    "seedFromSignature",
    ()=>seedFromSignature,
    "seedMessage",
    ()=>seedMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/hash/keccak256.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/utils/abi/encodeAbiParameters.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js [app-client] (ecmascript)");
"use client";
;
/*
 * Salt custody, and why it works this way.
 *
 * A commit is a hash over (hexId, amount, isAttack, salt, player). Seven hours
 * later the player has to produce all five again or the order dies. If the salt
 * were a random number in localStorage, clearing site data on the wrong evening
 * would cost somebody their whole position.
 *
 * So the salt is not random. It is derived:
 *
 *     seed = keccak256(signature over a fixed per-season message)
 *     salt = keccak256(seed, tick, hexId, nonce)
 *
 * The seed is cached locally for convenience, but it is never the only copy:
 * signing the same message again reproduces it, because wallets sign
 * deterministically. Losing your browser costs you a signature prompt.
 *
 * The order details are cached too, and if that cache is lost the player can
 * simply re-enter the hex, amount and side — the salt is rederivable, so the
 * reveal still goes through. And because the contract debits the stake at reveal
 * rather than at commit, the worst case for a wallet that can recover nothing at
 * all is the bond, not the stake.
 */ const SEED_KEY = (account, season)=>`hexwar:seed:${account.toLowerCase()}:${season}`;
_c = SEED_KEY;
const ORDERS_KEY = (account)=>`hexwar:orders:${account.toLowerCase()}`;
_c1 = ORDERS_KEY;
function seedMessage(season) {
    return [
        "HEXWAR order salt",
        `Season: ${season}`,
        "",
        "Signing this derives the secret that seals your orders.",
        "It moves no funds and grants no approval.",
        "Sign the same message again on any device to recover it."
    ].join("\n");
}
function readCache(key) {
    try {
        return window.localStorage.getItem(key);
    } catch  {
        // Private windows and blocked site data throw rather than return null.
        return null;
    }
}
function writeCache(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch  {
    // A failed cache write is survivable: the seed is re-derivable by signing.
    }
}
function cachedSeed(account, season) {
    const v = readCache(SEED_KEY(account, season));
    return v && v.startsWith("0x") ? v : null;
}
function cacheSeed(account, season, seed) {
    writeCache(SEED_KEY(account, season), seed);
}
function seedFromSignature(signature) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])(signature);
}
function deriveSalt(seed, tick, hexId, nonce = 0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameters"])("bytes32, uint32, uint16, uint32"), [
        seed,
        tick,
        hexId,
        nonce
    ]));
}
function commitmentHash(hexId, amount, isAttack, salt, player) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$hash$2f$keccak256$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$utils$2f$abi$2f$encodeAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encodeAbiParameters"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$abitype$2f$dist$2f$esm$2f$human$2d$readable$2f$parseAbiParameters$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAbiParameters"])("uint16, uint128, bool, bytes32, address"), [
        hexId,
        amount,
        isAttack,
        salt,
        player
    ]));
}
function loadOrders(account) {
    const raw = readCache(ORDERS_KEY(account));
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
function saveOrder(account, order) {
    const all = loadOrders(account).filter((o)=>o.commitment !== order.commitment);
    all.push(order);
    // A season is 126 ticks; keeping the last few is enough to reveal and audit.
    const trimmed = all.slice(-40);
    writeCache(ORDERS_KEY(account), JSON.stringify(trimmed));
}
function markRevealed(account, commitment) {
    const all = loadOrders(account).map((o)=>o.commitment === commitment ? {
            ...o,
            revealed: true
        } : o);
    writeCache(ORDERS_KEY(account), JSON.stringify(all));
}
function pendingForTick(account, tick) {
    return loadOrders(account).filter((o)=>o.tick === tick && !o.revealed);
}
function nextNonce(account, tick, hexId) {
    const used = loadOrders(account).filter((o)=>o.tick === tick && o.hexId === hexId).map((o)=>o.nonce);
    let n = 0;
    while(used.includes(n))n++;
    return n;
}
var _c, _c1;
__turbopack_context__.k.register(_c, "SEED_KEY");
__turbopack_context__.k.register(_c1, "ORDERS_KEY");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preview-replay.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * GENERATED — do not edit by hand. Regenerate with `npm run sim:replay`.
 *
 * One real tick out of the balance simulation, ready to be replayed. Once a
 * chain is live the indexer serves the same shape from `/replay/:tick`.
 */ __turbopack_context__.s([
    "previewReplay",
    ()=>previewReplay
]);
const previewReplay = {
    tick: 18,
    ticksPerSeason: 126,
    captures: 7,
    holds: 2,
    claims: 14,
    treasuryMoved: 2256,
    events: [
        {
            "hex": 60,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 8,
                    "power": 46.09,
                    "stake": 2125
                }
            ],
            "winner": 8,
            "treasury": 100
        },
        {
            "hex": 85,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 7,
                    "power": 44.14,
                    "stake": 1949
                }
            ],
            "winner": 7,
            "treasury": 100
        },
        {
            "hex": 86,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 7,
                    "power": 44.14,
                    "stake": 1949
                },
                {
                    "guild": 8,
                    "power": 46.09,
                    "stake": 2125
                }
            ],
            "winner": 8,
            "treasury": 100
        },
        {
            "hex": 112,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 3,
                    "power": 63.24,
                    "stake": 2000
                },
                {
                    "guild": 9,
                    "power": 38.32,
                    "stake": 1469
                }
            ],
            "winner": 3,
            "treasury": 100
        },
        {
            "hex": 114,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 3,
                    "power": 31.62,
                    "stake": 1000
                }
            ],
            "winner": 3,
            "treasury": 100
        },
        {
            "hex": 128,
            "tier": 3,
            "kind": "battle",
            "defender": 12,
            "defPower": 67.67,
            "defStake": 1612,
            "fort": 105,
            "attackers": [
                {
                    "guild": 6,
                    "power": 83.37,
                    "stake": 1791
                }
            ],
            "winner": 6,
            "treasury": 39
        },
        {
            "hex": 130,
            "tier": 3,
            "kind": "battle",
            "defender": 6,
            "defPower": 18.16,
            "defStake": 100,
            "fort": 105,
            "attackers": [
                {
                    "guild": 12,
                    "power": 183.47,
                    "stake": 6490
                }
            ],
            "winner": 12,
            "treasury": 39
        },
        {
            "hex": 151,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 9,
                    "power": 38.32,
                    "stake": 1469
                }
            ],
            "winner": 9,
            "treasury": 100
        },
        {
            "hex": 169,
            "tier": 2,
            "kind": "battle",
            "defender": 12,
            "defPower": 12.63,
            "defStake": 71,
            "fort": 110,
            "attackers": [
                {
                    "guild": 6,
                    "power": 31.56,
                    "stake": 176
                }
            ],
            "winner": 6,
            "treasury": 29
        },
        {
            "hex": 173,
            "tier": 2,
            "kind": "battle",
            "defender": 6,
            "defPower": 11.28,
            "defStake": 70,
            "fort": 105,
            "attackers": [
                {
                    "guild": 5,
                    "power": 21.94,
                    "stake": 108
                }
            ],
            "winner": 5,
            "treasury": 14
        },
        {
            "hex": 196,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 9,
                    "power": 38.32,
                    "stake": 1469
                }
            ],
            "winner": 9,
            "treasury": 100
        },
        {
            "hex": 221,
            "tier": 3,
            "kind": "battle",
            "defender": 6,
            "defPower": 45.38,
            "defStake": 710,
            "fort": 115,
            "attackers": [
                {
                    "guild": 5,
                    "power": 25.87,
                    "stake": 127
                }
            ],
            "winner": 0,
            "treasury": 115
        },
        {
            "hex": 229,
            "tier": 2,
            "kind": "battle",
            "defender": 3,
            "defPower": 7.35,
            "defStake": 20,
            "fort": 135,
            "attackers": [
                {
                    "guild": 12,
                    "power": 116.88,
                    "stake": 2527
                }
            ],
            "winner": 12,
            "treasury": 96
        },
        {
            "hex": 249,
            "tier": 2,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 7,
                    "power": 62.43,
                    "stake": 3898
                }
            ],
            "winner": 7,
            "treasury": 200
        },
        {
            "hex": 252,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 1,
                    "power": 43.17,
                    "stake": 1864
                }
            ],
            "winner": 1,
            "treasury": 100
        },
        {
            "hex": 274,
            "tier": 3,
            "kind": "battle",
            "defender": 6,
            "defPower": 43.9,
            "defStake": 730,
            "fort": 110,
            "attackers": [
                {
                    "guild": 5,
                    "power": 32.41,
                    "stake": 176
                }
            ],
            "winner": 0,
            "treasury": 77
        },
        {
            "hex": 275,
            "tier": 2,
            "kind": "battle",
            "defender": 5,
            "defPower": 11.39,
            "defStake": 47,
            "fort": 135,
            "attackers": [
                {
                    "guild": 6,
                    "power": 76.19,
                    "stake": 1776
                }
            ],
            "winner": 6,
            "treasury": 96
        },
        {
            "hex": 303,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 1,
                    "power": 43.17,
                    "stake": 1864
                },
                {
                    "guild": 10,
                    "power": 38.32,
                    "stake": 1469
                }
            ],
            "winner": 1,
            "treasury": 100
        },
        {
            "hex": 364,
            "tier": 3,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 10,
                    "power": 66.38,
                    "stake": 4407
                }
            ],
            "winner": 10,
            "treasury": 300
        },
        {
            "hex": 403,
            "tier": 2,
            "kind": "battle",
            "defender": 5,
            "defPower": 8.1,
            "defStake": 33,
            "fort": 115,
            "attackers": [
                {
                    "guild": 12,
                    "power": 108.79,
                    "stake": 2162
                }
            ],
            "winner": 12,
            "treasury": 43
        },
        {
            "hex": 430,
            "tier": 1,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 4,
                    "power": 41.23,
                    "stake": 1700
                }
            ],
            "winner": 4,
            "treasury": 100
        },
        {
            "hex": 501,
            "tier": 2,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 4,
                    "power": 58.3,
                    "stake": 3400
                }
            ],
            "winner": 4,
            "treasury": 200
        },
        {
            "hex": 503,
            "tier": 2,
            "kind": "claim",
            "defender": 0,
            "defPower": 0,
            "defStake": 0,
            "fort": 100,
            "attackers": [
                {
                    "guild": 4,
                    "power": 58.3,
                    "stake": 3400
                }
            ],
            "winner": 4,
            "treasury": 200
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/season.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * The rhythm of the game.
 *
 * A tick lasts 8h and splits three ways: 7h of commit where amounts stay
 * sealed, 45min of mandatory reveal, 15min of resolution where every battle
 * lands at once. 126 ticks make a six-week season.
 *
 * No contract is deployed, so none of this runs for real. The clock on the
 * site demonstrates the cadence from a fixed anchor, and every surface showing
 * it says so.
 */ __turbopack_context__.s([
    "PHASES",
    ()=>PHASES,
    "TICKS_PER_SEASON",
    ()=>TICKS_PER_SEASON,
    "TICK_SECONDS",
    ()=>TICK_SECONDS,
    "formatCountdown",
    ()=>formatCountdown,
    "tickStateAt",
    ()=>tickStateAt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const TICK_SECONDS = 8 * 60 * 60;
const TICKS_PER_SEASON = 126;
const PHASES = [
    {
        name: "commit",
        label: "Commit",
        seconds: 7 * 60 * 60,
        blurb: "You post a hash. The amount stays secret."
    },
    {
        name: "reveal",
        label: "Reveal",
        seconds: 45 * 60,
        blurb: "Mandatory reveal. Miss it and the stake is forfeit."
    },
    {
        name: "resolution",
        label: "Resolution",
        seconds: 15 * 60,
        blurb: "Every battle on the map resolves at once."
    }
];
/** Demonstration anchor. Fixed, so the cadence is reproducible. */ const ANCHOR = Date.parse(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_SEASON_START ?? "2026-08-24T00:00:00Z");
function tickStateAt(now) {
    const elapsed = Math.max(0, Math.floor((now - ANCHOR) / 1000));
    const intoTick = elapsed % TICK_SECONDS;
    const tick = Math.floor(elapsed / TICK_SECONDS) % TICKS_PER_SEASON + 1;
    let acc = 0;
    for (const phase of PHASES){
        if (intoTick < acc + phase.seconds) {
            const into = intoTick - acc;
            return {
                tick,
                phase: phase.name,
                phaseLabel: phase.label,
                remaining: phase.seconds - into,
                phaseProgress: into / phase.seconds,
                tickProgress: intoTick / TICK_SECONDS
            };
        }
        acc += phase.seconds;
    }
    // Unreachable: the three phases total exactly TICK_SECONDS.
    const last = PHASES[PHASES.length - 1];
    return {
        tick,
        phase: last.name,
        phaseLabel: last.label,
        remaining: 0,
        phaseProgress: 1,
        tickProgress: 1
    };
}
function formatCountdown(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor(s % 3600 / 60);
    const sec = s % 60;
    const pad = (n)=>String(n).padStart(2, "0");
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/useChainTick.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChainTick",
    ()=>useChainTick
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useReadContracts.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/abi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useChainTick() {
    _s();
    const address = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].battleAddress ?? undefined;
    const { data, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContracts"])({
        contracts: [
            {
                address,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "currentTick"
            },
            {
                address,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "phase"
            },
            {
                address,
                abi: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$abi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["battleAbi"],
                functionName: "lastResolvedTick"
            }
        ],
        query: {
            enabled: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"],
            // A tick is eight hours; polling every twenty seconds is plenty to catch
            // a phase change without hammering the RPC.
            refetchInterval: 20_000
        }
    });
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] || !data) return {
        data: null,
        isLoading
    };
    const [tick, phase, lastResolved] = data;
    if (tick.status !== "success" || phase.status !== "success" || lastResolved.status !== "success") {
        return {
            data: null,
            isLoading
        };
    }
    const t = Number(tick.result);
    const resolved = Number(lastResolved.result);
    return {
        data: {
            tick: t,
            phase: Number(phase.result),
            lastResolvedTick: resolved,
            resolutionPending: t > resolved
        },
        isLoading
    };
}
_s(useChainTick, "2quBku0MdC7V1drT3g+xDHXF5jc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useReadContracts$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReadContracts"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_11k99ag._.js.map