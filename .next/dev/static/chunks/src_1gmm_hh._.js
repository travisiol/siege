(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Drawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Drawer",
    ()=>Drawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/guilds.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
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
function Drawer() {
    _s();
    const previewBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Drawer.useEffect": ()=>{
            const onKey = {
                "Drawer.useEffect.onKey": (event)=>{
                    if (event.key === "Escape") setOpen(false);
                }
            }["Drawer.useEffect.onKey"];
            document.addEventListener("keydown", onKey);
            return ({
                "Drawer.useEffect": ()=>document.removeEventListener("keydown", onKey)
            })["Drawer.useEffect"];
        }
    }["Drawer.useEffect"], []);
    const standings = previewBoard.guilds.filter((g)=>g.hexes > 0);
    const totalMembers = standings.reduce((s, g)=>s + g.members, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                "aria-label": "Open standings",
                "aria-expanded": open,
                className: "flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-[5px] border border-rule transition-colors duration-150 hover:border-ember",
                children: [
                    0,
                    1,
                    2
                ].map((bar)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "h-px w-4 bg-chalk"
                    }, bar, false, {
                        fileName: "[project]/src/components/Drawer.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Drawer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[60] flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Close standings",
                        onClick: ()=>setOpen(false),
                        className: "flex-1 bg-void/80"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Drawer.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "w-[380px] max-w-[92vw] overflow-y-auto border-l border-rule bg-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-b border-rule px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-chalk",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].wordmark
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setOpen(false),
                                        "aria-label": "Close standings",
                                        className: "type-data px-2 text-chalk-muted transition-colors duration-150 hover:text-ember",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 59,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-rule px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "block text-chalk-muted",
                                        children: [
                                            "Standings — tick ",
                                            previewBoard.tick,
                                            " / ",
                                            previewBoard.ticksPerSeason
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-3",
                                        children: standings.map((g)=>{
                                            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildEconomics"])(g.id, previewBoard);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "border-b border-rule/40 py-3 last:border-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-baseline gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "h-2.5 w-2.5 shrink-0 self-center",
                                                                style: {
                                                                    background: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildColor"])(g.id)
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 80,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-figure-sm truncate text-chalk",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(g.id)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 84,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-data ml-auto shrink-0 text-chalk",
                                                                children: [
                                                                    g.hexes,
                                                                    " hexes"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 87,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 79,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1.5 flex flex-wrap gap-x-4 gap-y-1 pl-[18px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-data text-chalk-muted",
                                                                children: [
                                                                    g.members,
                                                                    " ",
                                                                    g.members === 1 ? "member" : "members"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 93,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-data text-chalk-soft",
                                                                children: [
                                                                    e ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.yieldPerDay) : 0,
                                                                    " / day"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 96,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-data text-ember",
                                                                children: [
                                                                    e ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(e.poolShare) : 0,
                                                                    " projected"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-1 flex flex-wrap gap-x-4 gap-y-1 pl-[18px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-label text-chalk-muted",
                                                                children: [
                                                                    g.conquests,
                                                                    " taken"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-label text-chalk-muted",
                                                                children: [
                                                                    g.losses,
                                                                    " lost"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 108,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-label text-chalk-muted",
                                                                children: [
                                                                    g.tier3,
                                                                    " prime"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, g.id, true, {
                                                fileName: "[project]/src/components/Drawer.tsx",
                                                lineNumber: 78,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-rule px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "block text-chalk-muted",
                                        children: "The season"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                        className: "mt-3 space-y-2",
                                        children: [
                                            [
                                                "Hexes",
                                                String(previewBoard.totalHexes)
                                            ],
                                            [
                                                "Still unclaimed",
                                                String(previewBoard.neutralHexes)
                                            ],
                                            [
                                                "Players on the board",
                                                String(totalMembers)
                                            ],
                                            [
                                                "Battles fought",
                                                String(previewBoard.battles)
                                            ],
                                            [
                                                "Hexes captured",
                                                String(previewBoard.conquests)
                                            ],
                                            [
                                                "Map yield",
                                                `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(previewBoard.mapYieldPerTick)} / tick`
                                            ],
                                            [
                                                "Prize pool",
                                                `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(previewBoard.seasonPool)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`
                                            ],
                                            [
                                                "Target network",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network
                                            ]
                                        ].map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-baseline justify-between gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                        className: "type-body text-chalk-soft",
                                                        children: k
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "type-data shrink-0 text-chalk",
                                                        children: v
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 139,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/src/components/Drawer.tsx",
                                                lineNumber: 137,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 123,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data px-5 py-4 text-chalk-muted",
                                children: "Nothing is deployed. These standings come out of the balance simulation, not the chain — a demonstration of what the map will do, not a live game state."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Drawer.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Drawer.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Drawer.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(Drawer, "Sp3uR+7gBNiU1pWo1HXNh2TsCxc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c = Drawer;
var _c;
__turbopack_context__.k.register(_c, "Drawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Drawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletConnect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WalletConnect.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
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
/*
 * The state of the map, carried in the header.
 *
 * Every chip is a real reading off the simulated board. The pill on the right
 * states the actual state of the project — while no contract exists it says so,
 * rather than showing a fake "live" that would age badly.
 */ /** The mark: a hex breached on one flank. */ function Mark() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "32",
        viewBox: "0 0 28 32",
        "aria-hidden": true,
        focusable: "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 1.6 L26 8.5 V23.5 L14 30.4 L2 23.5 V8.5 Z",
                fill: "none",
                stroke: "#ff5a1f",
                strokeWidth: "2"
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 8.6 L20 12 V19 L14 22.4 L8 19 V12 Z",
                fill: "#ffffff"
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = Mark;
function Navbar() {
    _s();
    const previewBoard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"])();
    const held = previewBoard.totalHexes - previewBoard.neutralHexes;
    const chips = [
        {
            key: "Hexes",
            value: String(previewBoard.totalHexes)
        },
        {
            key: "Held",
            value: `${Math.round(100 * held / previewBoard.totalHexes)}%`
        },
        {
            key: "Guilds",
            value: String(previewBoard.guilds.filter((g)=>g.hexes > 0).length)
        },
        {
            key: "Pool",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(previewBoard.seasonPool)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-rule bg-void/92 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "flex h-16 items-center gap-4 px-4 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawer"], {}, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/",
                    className: "flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mark, {}, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "type-title text-chalk",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                    className: "ml-auto hidden items-center gap-5 md:flex",
                    children: chips.map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-baseline gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        children: chip.key
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Navbar.tsx",
                                        lineNumber: 67,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "type-data text-chalk",
                                    children: chip.value
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 69,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, chip.key, true, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WalletConnect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WalletConnect"], {
                    className: "shrink-0 border border-rule-strong text-chalk hover:border-ember hover:text-ember"
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "type-label ml-auto shrink-0 border border-rule-strong px-2.5 py-1.5 text-chalk-muted md:ml-0",
                    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] ? undefined : "No contract is deployed: the board shown comes from the balance simulation.",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network : "Pre-launch"
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 55,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(Navbar, "3X9QXZAqca2TlDARLNFPzKq5z8I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoardData"]
    ];
});
_c1 = Navbar;
var _c, _c1;
__turbopack_context__.k.register(_c, "Mark");
__turbopack_context__.k.register(_c1, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WalletConnect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WalletConnect",
    ()=>WalletConnect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useDisconnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function WalletConnect({ className }) {
    _s();
    const { address, isConnected } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { disconnect } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"])();
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"]) return null;
    const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";
    const injectedConnector = connectors.find((c)=>c.type === "injected") ?? connectors[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>isConnected ? disconnect() : connect({
                connector: injectedConnector
            }),
        disabled: isPending || !injectedConnector,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label px-4 py-3 transition-colors duration-150 disabled:cursor-not-allowed", className),
        title: isConnected ? `Connected on ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network}` : undefined,
        children: isPending ? "Connecting…" : isConnected ? short : "Connect wallet"
    }, void 0, false, {
        fileName: "[project]/src/components/WalletConnect.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_s(WalletConnect, "QSSslHXt3ryBVDv6po7hS1lXN00=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useDisconnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDisconnect"]
    ];
});
_c = WalletConnect;
var _c;
__turbopack_context__.k.register(_c, "WalletConnect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/context.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/wagmiConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Providers({ children }) {
    _s();
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Providers.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]()
    }["Providers.useState"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$context$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WagmiProvider"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wagmiConfig"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/providers.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/providers.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(Providers, "qFhNRSk+4hqflxYLL9+zYF5AcuQ=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label,
    "PreviewTag",
    ()=>PreviewTag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
;
function Label({ children, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label text-chalk-muted", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
function PreviewTag({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])("type-label inline-flex items-center gap-1.5 border border-ember/40 bg-ember/10 px-2 py-1 text-ember", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-1.5 w-1.5 bg-ember"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Label.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            "Pre-launch"
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Label.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c1 = PreviewTag;
var _c, _c1;
__turbopack_context__.k.register(_c, "Label");
__turbopack_context__.k.register(_c1, "PreviewTag");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/board-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BoardProvider",
    ()=>BoardProvider,
    "useBoardContext",
    ()=>useBoardContext,
    "useBoardData",
    ()=>useBoardData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/board.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const BoardContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    board: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fallbackBoard"],
    source: "simulation",
    error: null
});
function BoardProvider({ children }) {
    _s();
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoard"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BoardContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/board-context.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, this);
}
_s(BoardProvider, "LSeG7ZGQKa9WqAHwHnXhTUws5qc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBoard"]
    ];
});
_c = BoardProvider;
function useBoardContext() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BoardContext);
}
_s1(useBoardContext, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function useBoardData() {
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BoardContext).board;
}
_s2(useBoardData, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "BoardProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/board.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fallbackBoard",
    ()=>fallbackBoard,
    "useBoard",
    ()=>useBoard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const INDEXER = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_INDEXER_URL ?? "";
const fallbackBoard = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"];
function useBoard() {
    _s();
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(fallbackBoard);
    const [source, setSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("simulation");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBoard.useEffect": ()=>{
            if (!INDEXER) return;
            let cancelled = false;
            const pull = {
                "useBoard.useEffect.pull": async ()=>{
                    try {
                        const res = await fetch(`${INDEXER}/board`, {
                            cache: "no-store"
                        });
                        if (!res.ok) throw new Error(`indexer ${res.status}`);
                        const next = await res.json();
                        if (cancelled) return;
                        setBoard(next);
                        setSource("indexer");
                        setError(null);
                    } catch (e) {
                        if (cancelled) return;
                        // Falling back is the honest failure: the page keeps working and keeps
                        // saying the board is a simulation, rather than showing a stale chain
                        // state as if it were current.
                        setSource("simulation");
                        setError(e instanceof Error ? e.message : "indexer unreachable");
                    }
                }
            }["useBoard.useEffect.pull"];
            pull();
            const id = window.setInterval(pull, 30_000);
            return ({
                "useBoard.useEffect": ()=>{
                    cancelled = true;
                    window.clearInterval(id);
                }
            })["useBoard.useEffect"];
        }
    }["useBoard.useEffect"], []);
    return {
        board,
        source,
        error
    };
}
_s(useBoard, "lwCo9fMZRCAkGV8U6kuMFeQgeC0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/economics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TOTAL_TIER_WEIGHT",
    ()=>TOTAL_TIER_WEIGHT,
    "compact",
    ()=>compact,
    "guildEconomics",
    ()=>guildEconomics,
    "hexEconomics",
    ()=>hexEconomics,
    "money",
    ()=>money
]);
/*
 * What a hex is worth, in numbers a player can act on.
 *
 * Two things pay out, and they are not the same thing:
 *
 *   1. Yield. Every tick, a held hex accrues `tier x base` into its own
 *      treasury. Upkeep skims 2% of that treasury back to the season pool.
 *      Whoever takes the hex takes the treasury with it — so yield sitting on
 *      a hex is a prize, not a balance.
 *
 *   2. The season pool. Fixed, pre-funded, nothing minted. At the end it is
 *      split across held territory weighted by tier, so a tier 3 is worth
 *      eight tier 1s in the final payout regardless of what happened in
 *      between.
 *
 * The pool projection assumes you still hold the hex at the last tick. That is
 * the assumption the whole game is about, so it is stated wherever it shows.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hexmap.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
;
;
/** Config-shaped values (pool size, yield rate, tier weights) do not change
 *  between the simulated and the live board, so they stay bound to the export. */ const DEFAULT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"];
const TOTAL_TIER_WEIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tiers.reduce(_c = (sum, tier)=>sum + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier], 0);
_c1 = TOTAL_TIER_WEIGHT;
function hexEconomics(id, board = DEFAULT) {
    const tier = board.tiers[id] ?? 1;
    const weight = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier];
    const treasury = board.treasury[id] ?? 0;
    const heldSince = board.heldSince[id] ?? 0;
    const owner = board.owners[id] ?? 0;
    const holders = board.holders[id] ?? 0;
    const yieldPerTick = weight * board.yieldUnit;
    const ticksLeft = Math.max(0, board.ticksPerSeason - board.tick);
    const poolShare = board.seasonPool * weight / TOTAL_TIER_WEIGHT;
    const ticksHeld = owner === 0 ? 0 : Math.max(0, board.tick - heldSince);
    return {
        tier,
        yieldPerTick,
        yieldPerDay: yieldPerTick * board.ticksPerDay,
        yieldRemaining: yieldPerTick * ticksLeft,
        upkeepPerTick: treasury * board.upkeepPct / 100,
        treasury,
        poolShare,
        poolSharePct: 100 * weight / TOTAL_TIER_WEIGHT,
        holders,
        topHolderPct: board.topHolderPct[id] ?? 0,
        poolSharePerHolder: holders > 0 ? poolShare / holders : poolShare,
        claimCost: tier * 100,
        fortification: 100 + 5 * Math.min(ticksHeld, 20),
        ticksHeld
    };
}
function guildEconomics(guildId, board = DEFAULT) {
    const g = board.guilds.find((x)=>x.id === guildId);
    if (!g) return null;
    // Tier weight actually held, rebuilt from the board rather than stored twice.
    let weight = 0;
    for(let id = 0; id < board.owners.length; id++){
        if (board.owners[id] === guildId) weight += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][board.tiers[id]];
    }
    const poolShare = board.seasonPool * weight / TOTAL_TIER_WEIGHT;
    return {
        yieldPerTick: g.yieldPerTick,
        yieldPerDay: g.yieldPerTick * board.ticksPerDay,
        treasury: g.treasury,
        poolShare,
        poolSharePct: 100 * weight / TOTAL_TIER_WEIGHT,
        perMember: g.members > 0 ? poolShare / g.members : poolShare,
        mapPct: 100 * g.hexes / board.totalHexes
    };
}
function compact(n) {
    if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
    if (Math.abs(n) >= 10_000) return `${(n / 1000).toFixed(1)}k`;
    if (Math.abs(n) >= 1000) return `${(n / 1000).toFixed(2)}k`;
    return n.toLocaleString("en-US", {
        maximumFractionDigits: n < 10 ? 1 : 0
    });
}
function money(n) {
    return n.toLocaleString("en-US", {
        maximumFractionDigits: 0
    });
}
var _c, _c1;
__turbopack_context__.k.register(_c, "TOTAL_TIER_WEIGHT$previewBoard.tiers.reduce");
__turbopack_context__.k.register(_c1, "TOTAL_TIER_WEIGHT");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/guilds.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * The twelve guilds and their colour.
 *
 * The hue is functional, not decorative: across 547 identical hexes it is the
 * only thing saying who owns what. They are therefore kept out of the orange
 * band, which belongs to the ember (tier 3, and committing an order).
 */ __turbopack_context__.s([
    "GUILD_SKINS",
    ()=>GUILD_SKINS,
    "NEUTRAL_COLOR",
    ()=>NEUTRAL_COLOR,
    "guildColor",
    ()=>guildColor,
    "guildName",
    ()=>guildName,
    "guildSkin",
    ()=>guildSkin
]);
const GUILD_SKINS = [
    {
        id: 1,
        name: "Meridian",
        color: "#4c8df6"
    },
    {
        id: 2,
        name: "Verdigris",
        color: "#1fc7a9"
    },
    {
        id: 3,
        name: "Nocturne",
        color: "#a271f2"
    },
    {
        id: 4,
        name: "Bastion",
        color: "#e0b33c"
    },
    {
        id: 5,
        name: "Thicket",
        color: "#48b558"
    },
    {
        id: 6,
        name: "Cinder Rose",
        color: "#ec6aa8"
    },
    {
        id: 7,
        name: "Halcyon",
        color: "#57cbe8"
    },
    {
        id: 8,
        name: "Wormwood",
        color: "#b9cf46"
    },
    {
        id: 9,
        name: "Cobalt Vow",
        color: "#7c86ea"
    },
    {
        id: 10,
        name: "Redoubt",
        color: "#e8556b"
    },
    {
        id: 11,
        name: "Tidewall",
        color: "#5aa79f"
    },
    {
        id: 12,
        name: "Amaranth",
        color: "#c070c8"
    }
];
const NEUTRAL_COLOR = "#39404a";
function guildSkin(id) {
    if (id <= 0) return null;
    return GUILD_SKINS[(id - 1) % GUILD_SKINS.length] ?? null;
}
function guildColor(id) {
    return guildSkin(id)?.color ?? NEUTRAL_COLOR;
}
function guildName(id) {
    return guildSkin(id)?.name ?? "Neutre";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/hexmap.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * The map, browser side.
 *
 * Same algorithm as `sim/hex.ts` — same axial coordinates, same canonical
 * order, same deterministic tier placement — but in `number` rather than
 * `bigint`, because here we draw rather than resolve. Hex ids line up between
 * the two files, which is what lets the board exported by the simulation apply
 * directly to this map.
 */ __turbopack_context__.s([
    "DIRECTIONS",
    ()=>DIRECTIONS,
    "TIER_YIELD",
    ()=>TIER_YIELD,
    "axialDistance",
    ()=>axialDistance,
    "buildMap",
    ()=>buildMap,
    "hexCenter",
    ()=>hexCenter,
    "pixelToAxial",
    ()=>pixelToAxial
]);
const DIRECTIONS = [
    {
        q: 1,
        r: 0
    },
    {
        q: 1,
        r: -1
    },
    {
        q: 0,
        r: -1
    },
    {
        q: -1,
        r: 0
    },
    {
        q: -1,
        r: 1
    },
    {
        q: 0,
        r: 1
    }
];
function axialDistance(a, b) {
    const dq = a.q - b.q;
    const dr = a.r - b.r;
    return (Math.abs(dq) + Math.abs(dq + dr) + Math.abs(dr)) / 2;
}
const key = (q, r)=>`${q},${r}`;
/** Deterministic integer hash: spreads the tiers without ever rolling. */ function spread(q, r, salt) {
    let h = q * 73856093 ^ r * 19349663 ^ salt * 83492791;
    h = Math.imul(h ^ h >>> 15, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^ h >>> 16) >>> 0;
}
function buildMap(radius) {
    const raw = [];
    for(let q = -radius; q <= radius; q++){
        const rLo = Math.max(-radius, -q - radius);
        const rHi = Math.min(radius, -q + radius);
        for(let r = rLo; r <= rHi; r++)raw.push({
            q,
            r
        });
    }
    raw.sort((a, b)=>{
        const da = axialDistance(a, {
            q: 0,
            r: 0
        });
        const db = axialDistance(b, {
            q: 0,
            r: 0
        });
        return da - db || a.q - b.q || a.r - b.r;
    });
    const byKey = new Map();
    raw.forEach((c, i)=>byKey.set(key(c.q, c.r), i));
    const cells = raw.map((c, i)=>{
        const neighbors = [];
        for (const d of DIRECTIONS){
            const n = byKey.get(key(c.q + d.q, c.r + d.r));
            if (n !== undefined) neighbors.push(n);
        }
        return {
            id: i,
            q: c.q,
            r: c.r,
            ring: axialDistance(c, {
                q: 0,
                r: 0
            }),
            tier: 1,
            neighbors,
            isBorder: axialDistance(c, {
                q: 0,
                r: 0
            }) === radius
        };
    });
    assignTiers(cells);
    return cells;
}
/** ~70% tier 1, 25% tier 2, 5% tier 3, no two tier 3 adjacent. */ function assignTiers(cells) {
    const n = cells.length;
    const n3 = Math.round(n * 0.05);
    const n2 = Math.round(n * 0.25);
    const t3 = [
        ...cells
    ].sort((a, b)=>spread(a.q, a.r, 3) - spread(b.q, b.r, 3) || a.id - b.id);
    const picked = new Set();
    for (const c of t3){
        if (picked.size >= n3) break;
        if (c.neighbors.some((nb)=>picked.has(nb))) continue;
        picked.add(c.id);
    }
    for (const id of picked)cells[id].tier = 3;
    const t2 = cells.filter((c)=>c.tier === 1).sort((a, b)=>spread(a.q, a.r, 2) - spread(b.q, b.r, 2) || a.id - b.id);
    for(let i = 0; i < Math.min(n2, t2.length); i++)t2[i].tier = 2;
}
const TIER_YIELD = {
    1: 1,
    2: 3,
    3: 8
};
function hexCenter(c, size) {
    return {
        x: size * Math.sqrt(3) * (c.q + c.r / 2),
        y: size * 1.5 * c.r
    };
}
function pixelToAxial(x, y, size) {
    const r = 2 / 3 * (y / size);
    const q = x / (size * Math.sqrt(3)) - r / 2;
    // Cube rounding: correct whichever axis drifted most.
    const s = -q - r;
    let rq = Math.round(q);
    let rr = Math.round(r);
    const rs = Math.round(s);
    const dq = Math.abs(rq - q);
    const dr = Math.abs(rr - r);
    const ds = Math.abs(rs - s);
    if (dq > dr && dq > ds) rq = -rr - rs;
    else if (dr > ds) rr = -rq - rs;
    return {
        q: rq,
        r: rr
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/preview-board.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * GENERATED — do not edit by hand. Regenerate with `npm run sim:board`.
 *
 * A real season state, taken from the M0 balance simulation at tick 18 of
 * 126. No contracts exist: this board is a demonstration, not a chain
 * read, and every surface that shows it says so.
 */ __turbopack_context__.s([
    "previewBoard",
    ()=>previewBoard
]);
const previewBoard = {
    radius: 13,
    tick: 18,
    ticksPerSeason: 126,
    totalHexes: 547,
    neutralHexes: 142,
    battles: 213,
    conquests: 203,
    /** Season economics. The pool is pre-funded and fixed — nothing is minted. */ seasonPool: 2000000,
    /** Base yield per tick, multiplied by the hex tier (1x / 3x / 8x). */ yieldUnit: 5,
    /** Combined yield of every held hex, per tick. */ mapYieldPerTick: 4100,
    ticksPerDay: 3,
    upkeepPct: 2,
    /** 0 = neutral, otherwise the id of the guild holding the hex. */ owners: [
        9,
        2,
        10,
        9,
        8,
        9,
        8,
        2,
        2,
        2,
        2,
        8,
        3,
        8,
        9,
        8,
        9,
        8,
        8,
        2,
        2,
        2,
        10,
        3,
        10,
        9,
        10,
        9,
        1,
        3,
        8,
        9,
        8,
        7,
        8,
        8,
        8,
        12,
        2,
        12,
        12,
        12,
        3,
        10,
        3,
        10,
        9,
        1,
        9,
        1,
        3,
        1,
        3,
        8,
        7,
        8,
        7,
        8,
        8,
        8,
        8,
        12,
        12,
        12,
        2,
        1,
        1,
        3,
        10,
        3,
        10,
        3,
        10,
        9,
        1,
        9,
        1,
        3,
        1,
        3,
        1,
        3,
        8,
        7,
        8,
        7,
        8,
        0,
        8,
        0,
        8,
        3,
        12,
        12,
        2,
        2,
        1,
        1,
        12,
        11,
        3,
        10,
        3,
        10,
        3,
        1,
        4,
        1,
        9,
        1,
        9,
        1,
        3,
        1,
        3,
        1,
        7,
        8,
        7,
        8,
        0,
        0,
        0,
        0,
        0,
        8,
        0,
        3,
        6,
        6,
        12,
        2,
        2,
        2,
        1,
        3,
        1,
        12,
        11,
        4,
        10,
        4,
        10,
        4,
        1,
        9,
        10,
        9,
        10,
        9,
        1,
        9,
        1,
        0,
        1,
        7,
        1,
        0,
        8,
        7,
        8,
        0,
        0,
        0,
        0,
        0,
        0,
        8,
        0,
        6,
        12,
        6,
        6,
        5,
        2,
        2,
        11,
        11,
        3,
        1,
        12,
        1,
        4,
        10,
        4,
        10,
        4,
        1,
        4,
        1,
        9,
        10,
        9,
        10,
        9,
        1,
        9,
        1,
        7,
        8,
        7,
        8,
        0,
        1,
        7,
        8,
        7,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        6,
        4,
        6,
        6,
        6,
        5,
        5,
        2,
        2,
        2,
        4,
        11,
        12,
        1,
        4,
        11,
        9,
        1,
        4,
        10,
        9,
        10,
        4,
        10,
        9,
        10,
        9,
        10,
        9,
        10,
        0,
        1,
        7,
        1,
        7,
        1,
        0,
        8,
        7,
        8,
        0,
        8,
        7,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        2,
        2,
        11,
        11,
        4,
        2,
        3,
        11,
        4,
        11,
        4,
        11,
        9,
        11,
        4,
        10,
        4,
        10,
        4,
        10,
        4,
        10,
        9,
        10,
        9,
        1,
        9,
        1,
        0,
        0,
        0,
        8,
        0,
        8,
        0,
        8,
        0,
        0,
        0,
        0,
        7,
        0,
        7,
        7,
        7,
        7,
        0,
        0,
        0,
        7,
        7,
        0,
        0,
        4,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        2,
        2,
        11,
        2,
        4,
        2,
        3,
        1,
        4,
        11,
        4,
        11,
        4,
        11,
        4,
        10,
        4,
        11,
        4,
        10,
        4,
        10,
        9,
        0,
        0,
        10,
        9,
        0,
        9,
        0,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        8,
        0,
        8,
        0,
        0,
        7,
        8,
        0,
        7,
        0,
        7,
        7,
        0,
        7,
        7,
        0,
        7,
        0,
        0,
        3,
        3,
        12,
        6,
        5,
        12,
        12,
        5,
        5,
        5,
        2,
        11,
        11,
        3,
        2,
        3,
        1,
        4,
        11,
        4,
        1,
        4,
        11,
        4,
        11,
        4,
        11,
        4,
        10,
        4,
        10,
        4,
        0,
        4,
        0,
        0,
        0,
        0,
        0,
        9,
        0,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        8,
        0,
        8,
        0,
        8,
        7,
        8,
        0,
        0,
        0,
        0,
        0,
        7,
        7,
        0,
        0,
        7,
        0,
        0,
        0,
        3,
        4,
        6,
        6,
        12,
        5,
        5,
        5,
        5,
        5,
        2,
        11,
        11,
        11,
        3,
        11,
        3,
        11,
        4,
        11,
        4,
        1,
        0,
        1,
        0,
        11,
        0,
        11,
        0,
        10,
        0,
        10,
        4,
        0,
        4,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        9,
        0,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        8,
        0,
        8,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        0,
        0,
        7,
        7,
        7,
        7,
        0,
        0,
        0,
        7,
        7,
        0,
        0
    ],
    tiers: [
        2,
        1,
        1,
        1,
        2,
        1,
        2,
        1,
        1,
        2,
        3,
        2,
        2,
        1,
        1,
        3,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        3,
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        3,
        3,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        3,
        2,
        3,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        3,
        2,
        1,
        1,
        2,
        1,
        3,
        1,
        3,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        2,
        2,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        3,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        3,
        1,
        1,
        2,
        1,
        2,
        2,
        3,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        3,
        2,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        2,
        1,
        2,
        3,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        1,
        2,
        1,
        2,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        3,
        1,
        1,
        1,
        2,
        2,
        1,
        3,
        1,
        3,
        1,
        1,
        2,
        3,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        2,
        1,
        2,
        1,
        1,
        2,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        2,
        1,
        3,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        3
    ],
    refuges: [
        469,
        470,
        471,
        473,
        474,
        479,
        486,
        492,
        500,
        513,
        526,
        539
    ],
    treasury: [
        251,
        116,
        116,
        116,
        261,
        113,
        261,
        119,
        119,
        57,
        152,
        261,
        70,
        119,
        116,
        518,
        251,
        251,
        251,
        121,
        121,
        121,
        121,
        119,
        279,
        119,
        121,
        121,
        116,
        111,
        279,
        111,
        270,
        108,
        241,
        111,
        111,
        124,
        124,
        116,
        70,
        57,
        121,
        124,
        270,
        124,
        121,
        119,
        288,
        116,
        108,
        113,
        108,
        288,
        113,
        124,
        251,
        105,
        108,
        105,
        102,
        122,
        126,
        96,
        126,
        109,
        126,
        124,
        126,
        121,
        126,
        119,
        126,
        124,
        121,
        297,
        121,
        105,
        518,
        105,
        113,
        105,
        126,
        116,
        126,
        102,
        102,
        0,
        365,
        0,
        126,
        128,
        128,
        126,
        128,
        128,
        134,
        128,
        29,
        223,
        124,
        128,
        121,
        128,
        188,
        124,
        113,
        258,
        128,
        124,
        105,
        113,
        102,
        111,
        102,
        111,
        489,
        630,
        119,
        306,
        0,
        0,
        0,
        0,
        0,
        288,
        0,
        131,
        39,
        70,
        39,
        131,
        315,
        131,
        131,
        128,
        131,
        43,
        128,
        121,
        131,
        119,
        131,
        116,
        126,
        306,
        122,
        105,
        113,
        315,
        279,
        102,
        111,
        0,
        108,
        241,
        108,
        0,
        131,
        603,
        315,
        0,
        0,
        0,
        0,
        0,
        0,
        547,
        0,
        14,
        133,
        128,
        126,
        14,
        133,
        133,
        124,
        96,
        131,
        133,
        29,
        131,
        124,
        48,
        121,
        133,
        96,
        146,
        116,
        146,
        315,
        111,
        323,
        111,
        133,
        270,
        102,
        108,
        221,
        306,
        231,
        131,
        0,
        105,
        297,
        323,
        306,
        0,
        315,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        48,
        133,
        158,
        128,
        152,
        126,
        134,
        135,
        135,
        56,
        131,
        83,
        14,
        135,
        126,
        223,
        36,
        135,
        96,
        135,
        306,
        146,
        223,
        135,
        133,
        111,
        135,
        231,
        135,
        108,
        0,
        489,
        210,
        105,
        221,
        102,
        0,
        135,
        288,
        135,
        0,
        323,
        306,
        0,
        0,
        323,
        0,
        0,
        0,
        0,
        0,
        323,
        0,
        0,
        96,
        56,
        29,
        115,
        14,
        128,
        128,
        137,
        137,
        133,
        70,
        133,
        56,
        122,
        60,
        128,
        135,
        126,
        131,
        36,
        109,
        109,
        137,
        119,
        158,
        116,
        108,
        113,
        105,
        137,
        105,
        339,
        102,
        137,
        105,
        0,
        0,
        0,
        323,
        0,
        135,
        0,
        137,
        0,
        0,
        0,
        0,
        297,
        0,
        288,
        315,
        135,
        135,
        0,
        0,
        0,
        331,
        683,
        0,
        0,
        64,
        60,
        60,
        56,
        56,
        122,
        131,
        126,
        140,
        140,
        70,
        64,
        135,
        60,
        122,
        64,
        128,
        169,
        297,
        128,
        121,
        122,
        113,
        181,
        111,
        70,
        111,
        140,
        111,
        347,
        331,
        0,
        0,
        333,
        140,
        0,
        140,
        0,
        140,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        140,
        0,
        140,
        0,
        0,
        288,
        339,
        0,
        630,
        0,
        733,
        140,
        0,
        347,
        733,
        0,
        315,
        0,
        0,
        64,
        60,
        60,
        60,
        60,
        56,
        14,
        131,
        126,
        134,
        142,
        128,
        126,
        134,
        60,
        158,
        158,
        131,
        126,
        128,
        142,
        108,
        122,
        270,
        109,
        108,
        119,
        108,
        142,
        105,
        142,
        105,
        0,
        102,
        0,
        0,
        0,
        0,
        0,
        355,
        0,
        142,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        355,
        0,
        142,
        0,
        347,
        279,
        339,
        0,
        0,
        0,
        0,
        0,
        355,
        142,
        0,
        0,
        279,
        0,
        0,
        0,
        144,
        142,
        140,
        192,
        363,
        137,
        135,
        133,
        131,
        146,
        363,
        126,
        124,
        124,
        169,
        121,
        169,
        144,
        133,
        192,
        315,
        169,
        0,
        144,
        0,
        121,
        0,
        119,
        0,
        142,
        0,
        144,
        210,
        0,
        210,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        142,
        0,
        144,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        142,
        0,
        144,
        0,
        0,
        0,
        0,
        270,
        0,
        0,
        0,
        0,
        339,
        347,
        142,
        144,
        0,
        0,
        0,
        270,
        261,
        0,
        0
    ],
    heldSince: [
        14,
        13,
        13,
        13,
        13,
        14,
        13,
        12,
        12,
        15,
        15,
        13,
        14,
        12,
        13,
        12,
        14,
        14,
        14,
        11,
        11,
        11,
        11,
        12,
        11,
        12,
        11,
        11,
        13,
        15,
        11,
        15,
        12,
        16,
        15,
        15,
        15,
        10,
        10,
        13,
        14,
        15,
        11,
        10,
        12,
        10,
        11,
        12,
        10,
        13,
        16,
        14,
        16,
        10,
        14,
        10,
        14,
        17,
        16,
        17,
        18,
        10,
        9,
        12,
        9,
        11,
        9,
        10,
        9,
        11,
        9,
        12,
        9,
        10,
        11,
        9,
        11,
        17,
        12,
        17,
        14,
        17,
        9,
        13,
        9,
        18,
        18,
        0,
        17,
        0,
        9,
        8,
        8,
        9,
        8,
        8,
        9,
        8,
        17,
        13,
        10,
        8,
        11,
        8,
        14,
        10,
        14,
        12,
        8,
        10,
        17,
        14,
        18,
        15,
        18,
        15,
        13,
        8,
        12,
        8,
        0,
        0,
        0,
        0,
        0,
        10,
        0,
        7,
        18,
        14,
        18,
        7,
        7,
        7,
        7,
        8,
        7,
        16,
        8,
        11,
        7,
        12,
        7,
        13,
        9,
        8,
        10,
        17,
        14,
        7,
        11,
        18,
        15,
        0,
        16,
        15,
        16,
        0,
        7,
        9,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        11,
        0,
        18,
        6,
        8,
        9,
        18,
        6,
        6,
        10,
        12,
        7,
        6,
        17,
        7,
        10,
        8,
        11,
        6,
        12,
        8,
        13,
        8,
        7,
        15,
        6,
        15,
        6,
        12,
        18,
        16,
        17,
        8,
        16,
        7,
        0,
        17,
        9,
        6,
        8,
        0,
        7,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        8,
        6,
        7,
        8,
        15,
        9,
        9,
        5,
        5,
        6,
        7,
        13,
        18,
        5,
        9,
        13,
        11,
        5,
        12,
        5,
        8,
        8,
        13,
        5,
        6,
        15,
        5,
        16,
        5,
        16,
        0,
        13,
        18,
        17,
        17,
        18,
        0,
        5,
        10,
        5,
        0,
        6,
        8,
        0,
        0,
        6,
        0,
        0,
        0,
        0,
        0,
        6,
        0,
        0,
        12,
        6,
        17,
        16,
        18,
        8,
        8,
        4,
        4,
        6,
        14,
        6,
        6,
        10,
        5,
        8,
        5,
        9,
        7,
        11,
        11,
        11,
        4,
        12,
        7,
        13,
        16,
        14,
        17,
        4,
        17,
        4,
        18,
        4,
        17,
        0,
        0,
        0,
        6,
        0,
        5,
        0,
        4,
        0,
        0,
        0,
        0,
        9,
        0,
        10,
        7,
        5,
        5,
        0,
        0,
        0,
        5,
        6,
        0,
        0,
        4,
        5,
        5,
        6,
        6,
        10,
        7,
        9,
        3,
        3,
        14,
        4,
        5,
        5,
        10,
        4,
        8,
        6,
        9,
        8,
        11,
        10,
        14,
        5,
        15,
        14,
        15,
        3,
        15,
        3,
        5,
        0,
        0,
        18,
        3,
        0,
        3,
        0,
        3,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        3,
        0,
        0,
        10,
        4,
        0,
        8,
        0,
        4,
        3,
        0,
        3,
        4,
        0,
        7,
        0,
        0,
        4,
        5,
        5,
        5,
        5,
        6,
        18,
        7,
        9,
        9,
        2,
        8,
        9,
        9,
        5,
        7,
        7,
        7,
        9,
        8,
        2,
        16,
        10,
        12,
        11,
        16,
        12,
        16,
        2,
        17,
        2,
        17,
        0,
        18,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        2,
        0,
        3,
        11,
        4,
        0,
        0,
        0,
        0,
        0,
        2,
        2,
        0,
        0,
        11,
        0,
        0,
        0,
        1,
        2,
        3,
        4,
        1,
        4,
        5,
        6,
        7,
        8,
        1,
        9,
        10,
        10,
        6,
        11,
        6,
        1,
        6,
        4,
        7,
        6,
        0,
        1,
        0,
        11,
        0,
        12,
        0,
        2,
        0,
        1,
        18,
        0,
        18,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        1,
        0,
        0,
        0,
        0,
        12,
        0,
        0,
        0,
        0,
        4,
        3,
        2,
        1,
        0,
        0,
        0,
        12,
        13,
        0,
        0
    ],
    /** Wallets holding an ERC-1155 position on the hex. */ holders: [
        5,
        1,
        2,
        1,
        3,
        1,
        2,
        1,
        1,
        7,
        5,
        1,
        8,
        2,
        1,
        4,
        4,
        1,
        1,
        2,
        1,
        1,
        2,
        2,
        6,
        1,
        2,
        2,
        2,
        4,
        5,
        1,
        3,
        2,
        1,
        2,
        1,
        3,
        2,
        7,
        9,
        8,
        2,
        2,
        7,
        2,
        1,
        1,
        6,
        2,
        3,
        2,
        2,
        5,
        1,
        2,
        1,
        2,
        1,
        1,
        1,
        13,
        7,
        14,
        1,
        10,
        3,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        2,
        6,
        2,
        2,
        3,
        1,
        1,
        2,
        2,
        2,
        2,
        1,
        1,
        0,
        1,
        0,
        1,
        4,
        6,
        1,
        3,
        3,
        10,
        3,
        6,
        7,
        1,
        2,
        2,
        2,
        7,
        2,
        2,
        9,
        1,
        2,
        1,
        1,
        2,
        3,
        1,
        2,
        5,
        4,
        1,
        8,
        0,
        0,
        0,
        0,
        0,
        5,
        0,
        10,
        5,
        10,
        5,
        3,
        9,
        3,
        6,
        3,
        3,
        7,
        4,
        2,
        2,
        2,
        1,
        2,
        2,
        6,
        9,
        1,
        1,
        7,
        3,
        1,
        2,
        0,
        2,
        1,
        1,
        0,
        2,
        9,
        8,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        4,
        12,
        12,
        8,
        3,
        6,
        4,
        2,
        9,
        5,
        7,
        6,
        3,
        2,
        6,
        2,
        3,
        8,
        14,
        2,
        13,
        5,
        2,
        8,
        1,
        2,
        4,
        1,
        1,
        1,
        5,
        1,
        1,
        0,
        2,
        2,
        12,
        3,
        0,
        6,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5,
        9,
        16,
        12,
        9,
        2,
        10,
        9,
        7,
        4,
        6,
        7,
        6,
        8,
        2,
        7,
        5,
        9,
        7,
        5,
        8,
        11,
        4,
        2,
        1,
        1,
        2,
        3,
        2,
        1,
        0,
        2,
        1,
        1,
        1,
        1,
        0,
        2,
        3,
        2,
        0,
        11,
        4,
        0,
        0,
        10,
        0,
        0,
        0,
        0,
        0,
        7,
        0,
        0,
        14,
        5,
        6,
        9,
        5,
        4,
        2,
        12,
        8,
        7,
        9,
        8,
        4,
        9,
        4,
        7,
        5,
        1,
        5,
        5,
        11,
        9,
        5,
        1,
        11,
        1,
        1,
        2,
        1,
        2,
        1,
        9,
        1,
        1,
        1,
        0,
        0,
        0,
        8,
        0,
        2,
        0,
        2,
        0,
        0,
        0,
        0,
        1,
        0,
        1,
        9,
        2,
        1,
        0,
        0,
        0,
        9,
        8,
        0,
        0,
        6,
        16,
        8,
        5,
        5,
        11,
        10,
        2,
        12,
        11,
        9,
        10,
        11,
        6,
        9,
        5,
        5,
        14,
        5,
        6,
        1,
        10,
        1,
        10,
        2,
        8,
        2,
        6,
        1,
        12,
        7,
        0,
        0,
        1,
        8,
        0,
        5,
        0,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5,
        0,
        2,
        0,
        0,
        2,
        15,
        0,
        3,
        0,
        4,
        2,
        0,
        14,
        9,
        0,
        6,
        0,
        0,
        5,
        7,
        5,
        4,
        13,
        5,
        6,
        9,
        1,
        10,
        11,
        4,
        4,
        10,
        6,
        13,
        12,
        8,
        2,
        3,
        13,
        2,
        10,
        3,
        9,
        2,
        3,
        1,
        15,
        2,
        13,
        2,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        11,
        0,
        14,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        12,
        0,
        15,
        0,
        15,
        2,
        9,
        0,
        0,
        0,
        0,
        0,
        16,
        8,
        0,
        0,
        1,
        0,
        0,
        0,
        27,
        24,
        29,
        19,
        22,
        20,
        17,
        15,
        5,
        12,
        21,
        2,
        2,
        1,
        11,
        3,
        10,
        26,
        7,
        16,
        8,
        12,
        0,
        19,
        0,
        3,
        0,
        2,
        0,
        7,
        0,
        21,
        1,
        0,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        11,
        0,
        23,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        9,
        0,
        25,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        10,
        12,
        2,
        20,
        0,
        0,
        0,
        1,
        1,
        0,
        0
    ],
    /** Share of that hex held by its single largest wallet, in percent. */ topHolderPct: [
        46,
        100,
        50,
        100,
        49,
        100,
        50,
        100,
        100,
        31,
        98,
        100,
        84,
        50,
        100,
        56,
        92,
        100,
        100,
        50,
        100,
        100,
        50,
        50,
        76,
        100,
        50,
        50,
        50,
        25,
        46,
        100,
        49,
        50,
        100,
        50,
        100,
        33,
        50,
        14,
        87,
        85,
        50,
        50,
        35,
        50,
        100,
        100,
        43,
        50,
        33,
        50,
        50,
        44,
        100,
        50,
        100,
        50,
        100,
        100,
        100,
        70,
        24,
        57,
        100,
        84,
        33,
        50,
        50,
        50,
        50,
        50,
        50,
        100,
        50,
        46,
        50,
        50,
        49,
        100,
        100,
        50,
        50,
        50,
        50,
        100,
        100,
        0,
        100,
        0,
        100,
        33,
        25,
        100,
        49,
        48,
        67,
        47,
        90,
        96,
        100,
        50,
        50,
        50,
        53,
        50,
        50,
        33,
        100,
        50,
        100,
        100,
        50,
        33,
        100,
        50,
        92,
        48,
        100,
        41,
        0,
        0,
        0,
        0,
        0,
        44,
        0,
        15,
        89,
        85,
        55,
        50,
        82,
        45,
        35,
        47,
        36,
        86,
        40,
        50,
        50,
        50,
        100,
        50,
        50,
        71,
        84,
        100,
        100,
        36,
        38,
        100,
        50,
        0,
        50,
        100,
        100,
        0,
        50,
        37,
        29,
        0,
        0,
        0,
        0,
        0,
        0,
        73,
        0,
        36,
        18,
        19,
        23,
        37,
        77,
        79,
        50,
        85,
        43,
        29,
        92,
        36,
        50,
        94,
        50,
        43,
        86,
        46,
        50,
        75,
        63,
        50,
        27,
        100,
        50,
        64,
        100,
        100,
        100,
        76,
        100,
        100,
        0,
        50,
        96,
        23,
        50,
        0,
        53,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        94,
        22,
        36,
        17,
        47,
        50,
        60,
        18,
        35,
        51,
        28,
        91,
        88,
        19,
        50,
        51,
        96,
        17,
        91,
        30,
        60,
        84,
        94,
        89,
        100,
        100,
        50,
        94,
        50,
        100,
        0,
        52,
        100,
        100,
        100,
        100,
        0,
        50,
        33,
        50,
        0,
        20,
        93,
        0,
        0,
        27,
        0,
        0,
        0,
        0,
        0,
        26,
        0,
        0,
        67,
        96,
        89,
        59,
        93,
        28,
        64,
        25,
        32,
        25,
        81,
        23,
        96,
        90,
        96,
        29,
        30,
        100,
        21,
        95,
        83,
        86,
        36,
        100,
        88,
        100,
        100,
        50,
        100,
        50,
        100,
        42,
        100,
        100,
        100,
        0,
        0,
        0,
        37,
        0,
        50,
        0,
        50,
        0,
        0,
        0,
        0,
        100,
        0,
        100,
        28,
        50,
        100,
        0,
        0,
        0,
        20,
        58,
        0,
        0,
        94,
        38,
        92,
        94,
        96,
        85,
        21,
        50,
        17,
        14,
        50,
        32,
        17,
        94,
        86,
        96,
        32,
        57,
        50,
        21,
        100,
        51,
        100,
        91,
        50,
        88,
        50,
        30,
        100,
        58,
        72,
        0,
        0,
        100,
        33,
        0,
        29,
        0,
        50,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        28,
        0,
        50,
        0,
        0,
        50,
        67,
        0,
        46,
        0,
        63,
        50,
        0,
        69,
        62,
        0,
        69,
        0,
        0,
        96,
        93,
        96,
        96,
        46,
        95,
        87,
        22,
        100,
        57,
        78,
        56,
        38,
        17,
        94,
        80,
        73,
        34,
        50,
        83,
        17,
        50,
        87,
        64,
        84,
        50,
        33,
        100,
        63,
        50,
        65,
        50,
        0,
        100,
        0,
        0,
        0,
        0,
        0,
        75,
        0,
        83,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        61,
        0,
        65,
        0,
        59,
        50,
        18,
        0,
        0,
        0,
        0,
        0,
        82,
        78,
        0,
        0,
        100,
        0,
        0,
        0,
        53,
        60,
        32,
        33,
        37,
        35,
        39,
        13,
        35,
        47,
        40,
        50,
        50,
        100,
        72,
        33,
        88,
        50,
        21,
        39,
        88,
        41,
        0,
        36,
        0,
        33,
        0,
        50,
        0,
        31,
        0,
        54,
        100,
        0,
        100,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        18,
        0,
        51,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        17,
        0,
        40,
        0,
        0,
        0,
        0,
        50,
        0,
        0,
        0,
        0,
        22,
        67,
        50,
        54,
        0,
        0,
        0,
        100,
        100,
        0,
        0
    ],
    guilds: [
        {
            "id": 8,
            "hexes": 47,
            "claimed": 47,
            "conquests": 0,
            "losses": 0,
            "members": 36,
            "yieldPerTick": 575,
            "treasury": 10864,
            "tier3": 4
        },
        {
            "id": 7,
            "hexes": 45,
            "claimed": 45,
            "conquests": 0,
            "losses": 0,
            "members": 39,
            "yieldPerTick": 715,
            "treasury": 13381,
            "tier3": 6
        },
        {
            "id": 1,
            "hexes": 44,
            "claimed": 46,
            "conquests": 20,
            "losses": 22,
            "members": 38,
            "yieldPerTick": 405,
            "treasury": 6558,
            "tier3": 3
        },
        {
            "id": 4,
            "hexes": 43,
            "claimed": 43,
            "conquests": 19,
            "losses": 19,
            "members": 39,
            "yieldPerTick": 330,
            "treasury": 5845,
            "tier3": 1
        },
        {
            "id": 9,
            "hexes": 39,
            "claimed": 43,
            "conquests": 2,
            "losses": 6,
            "members": 34,
            "yieldPerTick": 315,
            "treasury": 6890,
            "tier3": 0
        },
        {
            "id": 10,
            "hexes": 38,
            "claimed": 41,
            "conquests": 15,
            "losses": 18,
            "members": 34,
            "yieldPerTick": 295,
            "treasury": 5469,
            "tier3": 1
        },
        {
            "id": 3,
            "hexes": 31,
            "claimed": 38,
            "conquests": 21,
            "losses": 28,
            "members": 37,
            "yieldPerTick": 270,
            "treasury": 3883,
            "tier3": 1
        },
        {
            "id": 11,
            "hexes": 31,
            "claimed": 27,
            "conquests": 23,
            "losses": 19,
            "members": 36,
            "yieldPerTick": 335,
            "treasury": 3875,
            "tier3": 2
        },
        {
            "id": 2,
            "hexes": 30,
            "claimed": 34,
            "conquests": 15,
            "losses": 19,
            "members": 34,
            "yieldPerTick": 215,
            "treasury": 3900,
            "tier3": 1
        },
        {
            "id": 5,
            "hexes": 19,
            "claimed": 13,
            "conquests": 25,
            "losses": 19,
            "members": 35,
            "yieldPerTick": 145,
            "treasury": 2154,
            "tier3": 0
        },
        {
            "id": 6,
            "hexes": 19,
            "claimed": 5,
            "conquests": 34,
            "losses": 20,
            "members": 40,
            "yieldPerTick": 270,
            "treasury": 1685,
            "tier3": 3
        },
        {
            "id": 12,
            "hexes": 19,
            "claimed": 23,
            "conquests": 29,
            "losses": 33,
            "members": 37,
            "yieldPerTick": 230,
            "treasury": 1745,
            "tier3": 1
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/site-config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/*
 * The name lives here and nowhere else.
 *
 * On earlier projects the name leaked into components and every rename turned
 * into a grep-and-replace. Here the hero, the nav, the drawer, the OG image and
 * the metadata all read these three strings.
 */ __turbopack_context__.s([
    "chainConfig",
    ()=>chainConfig,
    "isLive",
    ()=>isLive,
    "siteConfig",
    ()=>siteConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const siteConfig = {
    name: "HEXWAR",
    wordmark: "Hexwar",
    // $HEX is a major existing token; $HXW is the short alternative if wanted.
    ticker: "$HEXWAR",
    tagline: "Hold ground. Get paid every 8 hours.",
    description: "An onchain territory game. Guilds stake tokens on hexes, attack in turns, and the winner takes the treasury. Every battle resolves in integer arithmetic — no randomness anywhere.",
    seoDescription: "547 hexes, twelve guilds, one turn every eight hours. Hold a hex and it pays yield three times a day; take one and its whole treasury moves to you.",
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL ?? "https://hexwar.example",
    x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_X ?? null,
    discord: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_DISCORD ?? null
};
function envOrNull(value) {
    return value && value.trim().length > 0 ? value : null;
}
const chainConfig = {
    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_NETWORK ?? "Base Sepolia",
    battleAddress: envOrNull(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_BATTLE_ADDRESS),
    isLive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_LIVE === "true"
};
const isLive = chainConfig.isLive && chainConfig.battleAddress !== null;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/wagmiConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "targetChain",
    ()=>targetChain,
    "wagmiConfig",
    ()=>wagmiConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/core/dist/esm/createConfig.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/clients/transports/http.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/base.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/viem/_esm/chains/definitions/baseSepolia.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@wagmi/core/dist/esm/connectors/injected.js [app-client] (ecmascript)");
;
;
;
const targetChain = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_CHAIN_ID === "8453" ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"];
const wagmiConfig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$createConfig$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConfig"])({
    chains: [
        targetChain
    ],
    connectors: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$wagmi$2f$core$2f$dist$2f$esm$2f$connectors$2f$injected$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["injected"])()
    ],
    transports: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$base$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_RPC_URL),
        [__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$chains$2f$definitions$2f$baseSepolia$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseSepolia"].id]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$viem$2f$_esm$2f$clients$2f$transports$2f$http$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["http"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_HEXWAR_RPC_URL)
    },
    ssr: true
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1gmm_hh._.js.map