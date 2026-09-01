(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
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
    const standings = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].guilds.filter((g)=>g.hexes > 0);
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
                        lineNumber: 43,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Drawer.tsx",
                lineNumber: 35,
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
                        lineNumber: 49,
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
                                        lineNumber: 57,
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
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-rule px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "block text-chalk-muted",
                                        children: [
                                            "Standings — tick ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tick,
                                            " / ",
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerSeason
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-3",
                                        children: standings.map((g)=>{
                                            const e = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildEconomics"])(g.id);
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
                                                                lineNumber: 79,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "type-figure-sm truncate text-chalk",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$guilds$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["guildName"])(g.id)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Drawer.tsx",
                                                                lineNumber: 83,
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
                                                                lineNumber: 86,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 78,
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
                                                                lineNumber: 92,
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
                                                                lineNumber: 95,
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
                                                                lineNumber: 98,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 91,
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
                                                                lineNumber: 104,
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
                                                                lineNumber: 107,
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
                                                                lineNumber: 110,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 103,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, g.id, true, {
                                                fileName: "[project]/src/components/Drawer.tsx",
                                                lineNumber: 77,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 68,
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
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                        className: "mt-3 space-y-2",
                                        children: [
                                            [
                                                "Hexes",
                                                String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes)
                                            ],
                                            [
                                                "Still unclaimed",
                                                String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].neutralHexes)
                                            ],
                                            [
                                                "Players on the board",
                                                String(totalMembers)
                                            ],
                                            [
                                                "Battles fought",
                                                String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].battles)
                                            ],
                                            [
                                                "Hexes captured",
                                                String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].conquests)
                                            ],
                                            [
                                                "Map yield",
                                                `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].mapYieldPerTick)} / tick`
                                            ],
                                            [
                                                "Prize pool",
                                                `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool)} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].ticker}`
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
                                                        lineNumber: 137,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                        className: "type-data shrink-0 text-chalk",
                                                        children: v
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Drawer.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, k, true, {
                                                fileName: "[project]/src/components/Drawer.tsx",
                                                lineNumber: 136,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Drawer.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "type-data px-5 py-4 text-chalk-muted",
                                children: "Nothing is deployed. These standings come out of the balance simulation, not the chain — a demonstration of what the map will do, not a live game state."
                            }, void 0, false, {
                                fileName: "[project]/src/components/Drawer.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Drawer.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Drawer.tsx",
                lineNumber: 48,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Drawer.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(Drawer, "e27cRtNMdAs0U0o1oHlS6A8OEBo=");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/preview-board.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/economics.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site-config.ts [app-client] (ecmascript)");
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
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 8.6 L20 12 V19 L14 22.4 L8 19 V12 Z",
                fill: "#ffffff"
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = Mark;
function Navbar() {
    const held = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].neutralHexes;
    const chips = [
        {
            key: "Hexes",
            value: String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes)
        },
        {
            key: "Held",
            value: `${Math.round(100 * held / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes)}%`
        },
        {
            key: "Guilds",
            value: String(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].guilds.filter((g)=>g.hexes > 0).length)
        },
        {
            key: "Pool",
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$economics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 border-b border-rule bg-void/92 backdrop-blur-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "flex h-16 items-center gap-4 px-4 sm:px-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Drawer"], {}, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: "/",
                    className: "flex items-center gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Mark, {}, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "type-title text-chalk",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].name
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 56,
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
                                        lineNumber: 65,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                    className: "type-data text-chalk",
                                    children: chip.value
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, chip.key, true, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "type-label ml-auto shrink-0 border border-rule-strong px-2.5 py-1.5 text-chalk-muted md:ml-0",
                    title: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] ? undefined : "No contract is deployed: the board shown comes from the balance simulation.",
                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isLive"] ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chainConfig"].network : "Pre-launch"
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c1 = Navbar;
var _c, _c1;
__turbopack_context__.k.register(_c, "Mark");
__turbopack_context__.k.register(_c1, "Navbar");
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
const TOTAL_TIER_WEIGHT = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tiers.reduce(_c = (sum, tier)=>sum + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier], 0);
_c1 = TOTAL_TIER_WEIGHT;
function hexEconomics(id) {
    const tier = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tiers[id] ?? 1;
    const weight = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][tier];
    const treasury = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].treasury[id] ?? 0;
    const heldSince = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].heldSince[id] ?? 0;
    const owner = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].owners[id] ?? 0;
    const holders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].holders[id] ?? 0;
    const yieldPerTick = weight * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].yieldUnit;
    const ticksLeft = Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerSeason - __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tick);
    const poolShare = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool * weight / TOTAL_TIER_WEIGHT;
    const ticksHeld = owner === 0 ? 0 : Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tick - heldSince);
    return {
        tier,
        yieldPerTick,
        yieldPerDay: yieldPerTick * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerDay,
        yieldRemaining: yieldPerTick * ticksLeft,
        upkeepPerTick: treasury * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].upkeepPct / 100,
        treasury,
        poolShare,
        poolSharePct: 100 * weight / TOTAL_TIER_WEIGHT,
        holders,
        topHolderPct: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].topHolderPct[id] ?? 0,
        poolSharePerHolder: holders > 0 ? poolShare / holders : poolShare,
        claimCost: tier * 100,
        fortification: 100 + 5 * Math.min(ticksHeld, 20),
        ticksHeld
    };
}
function guildEconomics(guildId) {
    const g = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].guilds.find((x)=>x.id === guildId);
    if (!g) return null;
    // Tier weight actually held, rebuilt from the board rather than stored twice.
    let weight = 0;
    for(let id = 0; id < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].owners.length; id++){
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].owners[id] === guildId) weight += __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hexmap$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TIER_YIELD"][__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].tiers[id]];
    }
    const poolShare = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].seasonPool * weight / TOTAL_TIER_WEIGHT;
    return {
        yieldPerTick: g.yieldPerTick,
        yieldPerDay: g.yieldPerTick * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].ticksPerDay,
        treasury: g.treasury,
        poolShare,
        poolSharePct: 100 * weight / TOTAL_TIER_WEIGHT,
        perMember: g.members > 0 ? poolShare / g.members : poolShare,
        mapPct: 100 * g.hexes / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$preview$2d$board$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["previewBoard"].totalHexes
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
    neutralHexes: 129,
    battles: 214,
    conquests: 210,
    /** Season economics. The pool is pre-funded and fixed — nothing is minted. */ seasonPool: 2000000,
    /** Base yield per tick, multiplied by the hex tier (1x / 3x / 8x). */ yieldUnit: 5,
    /** Combined yield of every held hex, per tick. */ mapYieldPerTick: 4175,
    ticksPerDay: 3,
    upkeepPct: 2,
    /** 0 = neutral, otherwise the id of the guild holding the hex. */ owners: [
        2,
        2,
        1,
        9,
        10,
        9,
        8,
        3,
        2,
        2,
        3,
        10,
        3,
        8,
        9,
        8,
        8,
        8,
        8,
        3,
        12,
        2,
        1,
        3,
        1,
        9,
        10,
        9,
        10,
        9,
        8,
        8,
        8,
        8,
        8,
        8,
        8,
        3,
        12,
        2,
        1,
        10,
        3,
        10,
        3,
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
        7,
        7,
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
        1,
        3,
        10,
        3,
        10,
        9,
        1,
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
        7,
        7,
        7,
        8,
        8,
        8,
        3,
        12,
        12,
        2,
        2,
        1,
        1,
        12,
        10,
        3,
        10,
        3,
        10,
        3,
        1,
        4,
        10,
        9,
        1,
        9,
        1,
        9,
        1,
        9,
        1,
        7,
        8,
        7,
        8,
        7,
        0,
        7,
        8,
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
        3,
        11,
        4,
        10,
        4,
        10,
        4,
        1,
        9,
        1,
        9,
        10,
        9,
        1,
        9,
        1,
        9,
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
        6,
        2,
        2,
        1,
        2,
        3,
        1,
        3,
        11,
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
        2,
        12,
        1,
        4,
        11,
        9,
        1,
        4,
        10,
        4,
        10,
        9,
        10,
        9,
        11,
        9,
        11,
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
        5,
        5,
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
        11,
        4,
        11,
        4,
        11,
        9,
        11,
        9,
        10,
        9,
        10,
        0,
        10,
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
        12,
        5,
        5,
        2,
        2,
        2,
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
        11,
        4,
        11,
        4,
        10,
        4,
        10,
        9,
        11,
        0,
        11,
        9,
        11,
        9,
        10,
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
        5,
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
        10,
        0,
        11,
        0,
        11,
        0,
        11,
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
        4,
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
        70,
        113,
        261,
        27,
        119,
        70,
        489,
        270,
        57,
        119,
        116,
        518,
        251,
        261,
        270,
        121,
        121,
        121,
        121,
        119,
        96,
        119,
        121,
        121,
        116,
        111,
        279,
        111,
        279,
        111,
        251,
        111,
        108,
        124,
        124,
        121,
        109,
        109,
        121,
        124,
        270,
        124,
        121,
        124,
        288,
        119,
        111,
        113,
        113,
        288,
        113,
        124,
        241,
        108,
        108,
        105,
        105,
        70,
        126,
        122,
        126,
        109,
        126,
        124,
        126,
        121,
        126,
        116,
        126,
        124,
        121,
        297,
        113,
        108,
        489,
        108,
        111,
        116,
        126,
        105,
        126,
        105,
        105,
        102,
        365,
        102,
        126,
        128,
        128,
        126,
        128,
        128,
        134,
        128,
        57,
        188,
        124,
        128,
        27,
        128,
        152,
        124,
        113,
        630,
        128,
        121,
        108,
        111,
        105,
        111,
        105,
        108,
        518,
        630,
        121,
        306,
        102,
        0,
        210,
        102,
        0,
        288,
        0,
        131,
        39,
        109,
        39,
        131,
        315,
        131,
        131,
        128,
        131,
        14,
        128,
        121,
        131,
        119,
        131,
        116,
        126,
        306,
        134,
        105,
        111,
        315,
        270,
        102,
        108,
        102,
        108,
        261,
        105,
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
        70,
        133,
        128,
        126,
        14,
        133,
        133,
        131,
        146,
        131,
        133,
        14,
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
        113,
        323,
        111,
        133,
        261,
        102,
        105,
        241,
        306,
        251,
        131,
        0,
        102,
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
        77,
        126,
        122,
        135,
        135,
        56,
        131,
        134,
        14,
        135,
        126,
        223,
        36,
        135,
        96,
        135,
        83,
        146,
        657,
        135,
        133,
        111,
        135,
        231,
        135,
        108,
        0,
        459,
        231,
        105,
        241,
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
        43,
        56,
        14,
        39,
        83,
        128,
        128,
        137,
        137,
        133,
        134,
        133,
        56,
        122,
        60,
        128,
        135,
        126,
        131,
        36,
        122,
        109,
        137,
        113,
        83,
        111,
        113,
        108,
        111,
        137,
        108,
        339,
        105,
        137,
        105,
        0,
        102,
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
        14,
        131,
        126,
        140,
        140,
        134,
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
        109,
        113,
        83,
        111,
        96,
        111,
        140,
        108,
        347,
        331,
        108,
        0,
        365,
        140,
        102,
        140,
        102,
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
        29,
        131,
        126,
        83,
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
        96,
        270,
        122,
        105,
        121,
        105,
        142,
        105,
        142,
        102,
        105,
        0,
        221,
        0,
        102,
        0,
        102,
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
        124,
        169,
        144,
        133,
        192,
        315,
        169,
        102,
        144,
        0,
        121,
        0,
        121,
        0,
        142,
        0,
        144,
        210,
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
        14,
        14,
        13,
        13,
        12,
        14,
        13,
        12,
        15,
        12,
        13,
        12,
        14,
        13,
        12,
        11,
        11,
        11,
        11,
        12,
        12,
        12,
        11,
        11,
        13,
        15,
        11,
        15,
        11,
        15,
        14,
        15,
        16,
        10,
        10,
        11,
        11,
        11,
        11,
        10,
        12,
        10,
        11,
        10,
        10,
        12,
        15,
        14,
        14,
        10,
        14,
        10,
        15,
        16,
        16,
        17,
        17,
        14,
        9,
        10,
        9,
        11,
        9,
        10,
        9,
        11,
        9,
        13,
        9,
        10,
        11,
        9,
        14,
        16,
        13,
        16,
        15,
        13,
        9,
        17,
        9,
        17,
        17,
        18,
        17,
        18,
        9,
        8,
        8,
        9,
        8,
        8,
        9,
        8,
        15,
        14,
        10,
        8,
        13,
        8,
        15,
        10,
        14,
        8,
        8,
        11,
        16,
        15,
        17,
        15,
        17,
        16,
        12,
        8,
        11,
        8,
        18,
        0,
        18,
        18,
        0,
        10,
        0,
        7,
        18,
        11,
        18,
        7,
        7,
        7,
        7,
        8,
        7,
        18,
        8,
        11,
        7,
        12,
        7,
        13,
        9,
        8,
        9,
        17,
        15,
        7,
        12,
        18,
        16,
        18,
        16,
        13,
        17,
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
        14,
        6,
        8,
        9,
        18,
        6,
        6,
        7,
        8,
        7,
        6,
        18,
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
        14,
        6,
        15,
        6,
        13,
        18,
        17,
        15,
        8,
        14,
        7,
        0,
        18,
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
        17,
        9,
        10,
        5,
        5,
        6,
        7,
        9,
        18,
        5,
        9,
        13,
        11,
        5,
        12,
        5,
        13,
        8,
        7,
        5,
        6,
        15,
        5,
        16,
        5,
        16,
        0,
        14,
        16,
        17,
        15,
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
        16,
        6,
        18,
        18,
        13,
        8,
        8,
        4,
        4,
        6,
        9,
        6,
        6,
        10,
        5,
        8,
        5,
        9,
        7,
        11,
        10,
        11,
        4,
        14,
        13,
        15,
        14,
        16,
        15,
        4,
        16,
        4,
        17,
        4,
        17,
        0,
        18,
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
        18,
        7,
        9,
        3,
        3,
        9,
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
        11,
        14,
        13,
        15,
        12,
        15,
        3,
        16,
        3,
        5,
        16,
        0,
        17,
        3,
        18,
        3,
        18,
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
        17,
        7,
        9,
        13,
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
        12,
        12,
        10,
        17,
        11,
        17,
        2,
        17,
        2,
        18,
        17,
        0,
        17,
        0,
        18,
        0,
        18,
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
        10,
        6,
        1,
        6,
        4,
        7,
        6,
        18,
        1,
        0,
        11,
        0,
        11,
        0,
        2,
        0,
        1,
        18,
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
        9,
        2,
        2,
        2,
        5,
        1,
        2,
        6,
        2,
        8,
        6,
        4,
        7,
        2,
        2,
        4,
        1,
        2,
        3,
        2,
        2,
        2,
        2,
        1,
        7,
        2,
        2,
        2,
        1,
        2,
        3,
        2,
        2,
        2,
        1,
        2,
        2,
        4,
        2,
        2,
        8,
        8,
        2,
        3,
        7,
        3,
        1,
        2,
        5,
        2,
        1,
        2,
        2,
        6,
        1,
        1,
        2,
        2,
        1,
        2,
        1,
        8,
        6,
        9,
        2,
        10,
        2,
        2,
        2,
        1,
        2,
        3,
        1,
        2,
        2,
        6,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        1,
        5,
        8,
        3,
        2,
        2,
        12,
        2,
        8,
        6,
        2,
        2,
        6,
        2,
        8,
        2,
        2,
        3,
        1,
        2,
        1,
        2,
        2,
        2,
        2,
        2,
        7,
        2,
        2,
        7,
        1,
        0,
        2,
        2,
        0,
        5,
        0,
        5,
        5,
        11,
        5,
        3,
        6,
        2,
        7,
        4,
        3,
        4,
        4,
        2,
        2,
        2,
        1,
        2,
        1,
        11,
        10,
        1,
        2,
        7,
        6,
        2,
        2,
        2,
        2,
        3,
        2,
        0,
        2,
        6,
        9,
        0,
        0,
        0,
        0,
        0,
        0,
        3,
        0,
        7,
        10,
        14,
        8,
        4,
        3,
        2,
        2,
        9,
        6,
        7,
        4,
        5,
        2,
        6,
        2,
        5,
        10,
        8,
        2,
        7,
        4,
        2,
        9,
        1,
        2,
        3,
        1,
        2,
        2,
        7,
        2,
        1,
        0,
        3,
        2,
        11,
        3,
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
        5,
        10,
        15,
        13,
        5,
        2,
        13,
        8,
        4,
        4,
        8,
        10,
        5,
        7,
        2,
        8,
        5,
        7,
        7,
        5,
        8,
        9,
        2,
        4,
        1,
        4,
        2,
        5,
        2,
        2,
        0,
        4,
        2,
        2,
        1,
        2,
        0,
        2,
        3,
        2,
        0,
        8,
        4,
        0,
        0,
        11,
        0,
        0,
        0,
        0,
        0,
        4,
        0,
        0,
        7,
        5,
        4,
        5,
        11,
        6,
        4,
        7,
        6,
        7,
        9,
        7,
        4,
        11,
        4,
        4,
        5,
        2,
        4,
        5,
        8,
        8,
        5,
        2,
        7,
        2,
        4,
        2,
        2,
        2,
        2,
        7,
        2,
        1,
        1,
        0,
        2,
        0,
        7,
        0,
        2,
        0,
        2,
        0,
        0,
        0,
        0,
        3,
        0,
        2,
        8,
        2,
        1,
        0,
        0,
        0,
        10,
        6,
        0,
        0,
        6,
        16,
        8,
        5,
        5,
        4,
        11,
        2,
        10,
        6,
        10,
        10,
        13,
        6,
        11,
        5,
        2,
        13,
        5,
        5,
        2,
        8,
        1,
        9,
        2,
        9,
        1,
        8,
        2,
        13,
        8,
        2,
        0,
        2,
        8,
        2,
        7,
        1,
        2,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        0,
        2,
        0,
        0,
        1,
        11,
        0,
        2,
        0,
        4,
        2,
        0,
        12,
        8,
        0,
        4,
        0,
        0,
        5,
        7,
        5,
        4,
        13,
        5,
        3,
        10,
        1,
        10,
        9,
        3,
        2,
        10,
        6,
        15,
        13,
        3,
        2,
        1,
        10,
        2,
        7,
        4,
        8,
        2,
        2,
        2,
        17,
        1,
        16,
        1,
        1,
        0,
        2,
        0,
        2,
        0,
        1,
        11,
        0,
        12,
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
        10,
        0,
        13,
        0,
        15,
        2,
        11,
        0,
        0,
        0,
        0,
        0,
        13,
        8,
        0,
        0,
        2,
        0,
        0,
        0,
        26,
        22,
        26,
        19,
        21,
        27,
        15,
        14,
        11,
        15,
        19,
        2,
        2,
        1,
        11,
        2,
        12,
        24,
        9,
        14,
        6,
        10,
        1,
        20,
        0,
        2,
        0,
        1,
        0,
        6,
        0,
        19,
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
        10,
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
        8,
        0,
        27,
        0,
        0,
        0,
        0,
        2,
        0,
        0,
        0,
        0,
        9,
        13,
        2,
        20,
        0,
        0,
        0,
        1,
        2,
        0,
        0
    ],
    /** Share of that hex held by its single largest wallet, in percent. */ topHolderPct: [
        18,
        50,
        50,
        50,
        29,
        100,
        50,
        93,
        50,
        29,
        86,
        68,
        84,
        50,
        50,
        81,
        100,
        50,
        45,
        50,
        50,
        50,
        50,
        100,
        85,
        50,
        50,
        50,
        100,
        50,
        34,
        50,
        90,
        50,
        100,
        50,
        50,
        37,
        50,
        50,
        83,
        78,
        50,
        33,
        75,
        33,
        100,
        50,
        36,
        50,
        100,
        50,
        50,
        34,
        100,
        100,
        50,
        50,
        100,
        50,
        100,
        53,
        20,
        58,
        50,
        87,
        50,
        50,
        50,
        100,
        50,
        33,
        100,
        50,
        50,
        29,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        50,
        100,
        36,
        15,
        44,
        50,
        50,
        65,
        50,
        86,
        92,
        50,
        50,
        93,
        50,
        72,
        50,
        50,
        46,
        100,
        50,
        100,
        50,
        50,
        50,
        50,
        50,
        21,
        50,
        50,
        24,
        100,
        0,
        50,
        50,
        0,
        28,
        0,
        33,
        49,
        86,
        57,
        41,
        89,
        50,
        23,
        55,
        41,
        40,
        69,
        50,
        50,
        50,
        100,
        50,
        100,
        19,
        47,
        100,
        50,
        23,
        34,
        50,
        50,
        50,
        50,
        33,
        50,
        0,
        50,
        24,
        26,
        0,
        0,
        0,
        0,
        0,
        0,
        85,
        0,
        86,
        20,
        14,
        25,
        91,
        50,
        82,
        50,
        82,
        24,
        30,
        89,
        40,
        50,
        94,
        50,
        30,
        80,
        68,
        50,
        59,
        38,
        50,
        22,
        100,
        50,
        74,
        100,
        50,
        50,
        20,
        50,
        100,
        0,
        33,
        50,
        16,
        49,
        0,
        24,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        94,
        30,
        39,
        10,
        94,
        50,
        45,
        30,
        35,
        51,
        20,
        77,
        92,
        22,
        50,
        46,
        96,
        22,
        89,
        23,
        90,
        82,
        50,
        62,
        100,
        25,
        50,
        45,
        50,
        50,
        0,
        91,
        50,
        50,
        100,
        50,
        0,
        50,
        34,
        50,
        0,
        20,
        61,
        0,
        0,
        25,
        0,
        0,
        0,
        0,
        0,
        47,
        0,
        0,
        86,
        96,
        92,
        26,
        68,
        29,
        41,
        29,
        30,
        29,
        57,
        24,
        95,
        83,
        96,
        37,
        31,
        50,
        46,
        96,
        27,
        88,
        26,
        50,
        88,
        50,
        25,
        50,
        50,
        50,
        50,
        86,
        50,
        100,
        100,
        0,
        50,
        0,
        21,
        0,
        50,
        0,
        50,
        0,
        0,
        0,
        0,
        35,
        0,
        50,
        22,
        50,
        100,
        0,
        0,
        0,
        24,
        78,
        0,
        0,
        94,
        38,
        92,
        94,
        96,
        91,
        17,
        50,
        22,
        25,
        45,
        32,
        14,
        94,
        81,
        96,
        50,
        78,
        88,
        59,
        50,
        14,
        100,
        81,
        50,
        85,
        100,
        26,
        50,
        69,
        44,
        50,
        0,
        50,
        28,
        50,
        26,
        100,
        50,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        32,
        0,
        50,
        0,
        0,
        100,
        59,
        0,
        50,
        0,
        46,
        50,
        0,
        67,
        84,
        0,
        42,
        0,
        0,
        96,
        93,
        96,
        96,
        46,
        94,
        88,
        22,
        100,
        69,
        77,
        70,
        50,
        88,
        94,
        80,
        65,
        38,
        50,
        100,
        24,
        50,
        88,
        65,
        86,
        50,
        50,
        50,
        61,
        100,
        65,
        100,
        100,
        0,
        50,
        0,
        50,
        0,
        100,
        66,
        0,
        78,
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
        47,
        0,
        67,
        0,
        59,
        50,
        72,
        0,
        0,
        0,
        0,
        0,
        83,
        78,
        0,
        0,
        50,
        0,
        0,
        0,
        51,
        61,
        32,
        38,
        29,
        34,
        54,
        66,
        21,
        56,
        55,
        50,
        50,
        100,
        63,
        50,
        83,
        49,
        21,
        51,
        30,
        62,
        100,
        43,
        0,
        50,
        0,
        100,
        0,
        25,
        0,
        55,
        50,
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
        50,
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
        20,
        0,
        41,
        0,
        0,
        0,
        0,
        50,
        0,
        0,
        0,
        0,
        20,
        64,
        50,
        54,
        0,
        0,
        0,
        100,
        50,
        0,
        0
    ],
    guilds: [
        {
            "id": 7,
            "hexes": 51,
            "claimed": 51,
            "conquests": 0,
            "losses": 0,
            "members": 40,
            "yieldPerTick": 755,
            "treasury": 14243,
            "tier3": 6
        },
        {
            "id": 8,
            "hexes": 48,
            "claimed": 49,
            "conquests": 0,
            "losses": 1,
            "members": 39,
            "yieldPerTick": 570,
            "treasury": 10860,
            "tier3": 4
        },
        {
            "id": 1,
            "hexes": 44,
            "claimed": 47,
            "conquests": 19,
            "losses": 22,
            "members": 39,
            "yieldPerTick": 400,
            "treasury": 6343,
            "tier3": 2
        },
        {
            "id": 9,
            "hexes": 43,
            "claimed": 47,
            "conquests": 2,
            "losses": 6,
            "members": 40,
            "yieldPerTick": 340,
            "treasury": 7381,
            "tier3": 1
        },
        {
            "id": 4,
            "hexes": 42,
            "claimed": 43,
            "conquests": 20,
            "losses": 21,
            "members": 37,
            "yieldPerTick": 290,
            "treasury": 5467,
            "tier3": 0
        },
        {
            "id": 11,
            "hexes": 40,
            "claimed": 38,
            "conquests": 23,
            "losses": 21,
            "members": 38,
            "yieldPerTick": 390,
            "treasury": 5334,
            "tier3": 2
        },
        {
            "id": 10,
            "hexes": 38,
            "claimed": 40,
            "conquests": 16,
            "losses": 18,
            "members": 37,
            "yieldPerTick": 310,
            "treasury": 5512,
            "tier3": 2
        },
        {
            "id": 2,
            "hexes": 30,
            "claimed": 30,
            "conquests": 13,
            "losses": 13,
            "members": 36,
            "yieldPerTick": 220,
            "treasury": 4062,
            "tier3": 0
        },
        {
            "id": 3,
            "hexes": 29,
            "claimed": 31,
            "conquests": 22,
            "losses": 24,
            "members": 38,
            "yieldPerTick": 315,
            "treasury": 3680,
            "tier3": 2
        },
        {
            "id": 5,
            "hexes": 20,
            "claimed": 13,
            "conquests": 32,
            "losses": 25,
            "members": 35,
            "yieldPerTick": 185,
            "treasury": 2106,
            "tier3": 1
        },
        {
            "id": 6,
            "hexes": 18,
            "claimed": 5,
            "conquests": 36,
            "losses": 23,
            "members": 39,
            "yieldPerTick": 230,
            "treasury": 1522,
            "tier3": 2
        },
        {
            "id": 12,
            "hexes": 15,
            "claimed": 24,
            "conquests": 27,
            "losses": 36,
            "members": 39,
            "yieldPerTick": 170,
            "treasury": 1553,
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
    // Placeholder name — not final.
    name: "SIEGE",
    wordmark: "Siege",
    ticker: "$SIEGE",
    tagline: "Hold ground. Get paid every 8 hours.",
    description: "An onchain territory game. Guilds stake tokens on hexes, attack in turns, and the winner takes the treasury. Every battle resolves in integer arithmetic — no randomness anywhere.",
    seoDescription: "547 hexes, twelve guilds, one turn every eight hours. Hold a hex and it pays yield three times a day; take one and its whole treasury moves to you.",
    url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL ?? "https://siege.example",
    x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SIEGE_X ?? null,
    discord: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SIEGE_DISCORD ?? null
};
function envOrNull(value) {
    return value && value.trim().length > 0 ? value : null;
}
const chainConfig = {
    network: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SIEGE_NETWORK ?? "Base Sepolia",
    battleAddress: envOrNull(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SIEGE_BATTLE_ADDRESS),
    isLive: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SIEGE_LIVE === "true"
};
const isLive = chainConfig.isLive && chainConfig.battleAddress !== null;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_03bc0-y._.js.map