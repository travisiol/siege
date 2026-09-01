"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildMap, hexCenter, pixelToAxial, DIRECTIONS, TIER_YIELD } from "@/lib/hexmap";
import { guildColor, guildName, NEUTRAL_COLOR } from "@/lib/guilds";
import { siteConfig } from "@/lib/site-config";

/*
 * The map. Canvas 2D, no 3D library — the brief requires it and it is right:
 * 547 flat hexes draw in a few milliseconds and stay crisp at any zoom.
 *
 * Two readings, because a newcomer and a player want different things.
 *
 *   "pays"   — colour by tier. Three shades, one meaning: how much this ground
 *              earns. Free hexes get a dashed outline, so "what is worth having"
 *              and "what can I still buy" are answered in a single look.
 *
 *   "owners" — colour by guild. Here the INSIDE of a territory is faint and its
 *              BORDERS are strong: filling each guild solid gives an unreadable
 *              stained-glass window, and what a player looks at on a conquest
 *              map is where their colour meets someone else's.
 *
 * Pointer and keyboard both drive it. This canvas is the primary control of the
 * whole page, so it cannot be pointer-only.
 */

export type MapMode = "pays" | "owners";

const HEX_ANGLES = Array.from({ length: 6 }, (_, i) => ((60 * i - 30) * Math.PI) / 180);

/** Corners of a pointy-top hex, clockwise from upper right. */
function corners(cx: number, cy: number, size: number): [number, number][] {
  return HEX_ANGLES.map((a) => [cx + size * Math.cos(a), cy + size * Math.sin(a)]);
}

/**
 * The edge shared with the neighbour in direction `i`, as corner indices.
 * Derived once rather than rediscovered every frame.
 */
const EDGE_FOR_DIRECTION = DIRECTIONS.map((_, i) => {
  const a = (6 - i) % 6;
  return [a, (a + 1) % 6] as const;
});

/** Tier fill in "pays" mode: one hue, three intensities. Dim = poor, bright = rich. */
const TIER_FILL: Record<number, string> = {
  1: "rgba(255, 90, 31, 0.14)",
  2: "rgba(255, 90, 31, 0.44)",
  3: "rgba(255, 90, 31, 0.95)",
};

/** Arrow keys walk the axial grid one column or one row at a time. */
const KEY_DIRECTION: Record<string, { q: number; r: number }> = {
  ArrowRight: { q: 1, r: 0 },
  ArrowLeft: { q: -1, r: 0 },
  ArrowUp: { q: 0, r: -1 },
  ArrowDown: { q: 0, r: 1 },
};

export type HexMapProps = {
  owners: number[];
  tiers: number[];
  refuges: number[];
  treasury: number[];
  yieldUnit: number;
  ticksPerDay: number;
  radius: number;
  mode: MapMode;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  /** 0 = map pinned left, 1 = pinned right. */
  bias?: number;
  biasY?: number;
  className?: string;
};

export function HexMap({
  owners,
  tiers,
  refuges,
  treasury,
  yieldUnit,
  ticksPerDay,
  radius,
  mode,
  selectedId,
  onSelect,
  bias = 0.5,
  biasY = 0.5,
  className,
}: HexMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tipAt, setTipAt] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const cells = useMemo(() => buildMap(radius), [radius]);
  const refugeSet = useMemo(() => new Set(refuges), [refuges]);

  const byKey = useMemo(() => {
    const m = new Map<string, number>();
    for (const c of cells) m.set(`${c.q},${c.r}`, c.id);
    return m;
  }, [cells]);

  /*
   * Geometry depends only on the radius: compute it at unit size and apply the
   * scale when drawing. Resizing the window therefore triggers no layout
   * recomputation at all.
   */
  const layout = useMemo(() => {
    const unit = 10;
    const pts = cells.map((c) => hexCenter(c, unit));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs) - unit * Math.sqrt(3) * 0.5;
    const maxX = Math.max(...xs) + unit * Math.sqrt(3) * 0.5;
    const minY = Math.min(...ys) - unit;
    const maxY = Math.max(...ys) + unit;
    return {
      unit,
      pts,
      width: maxX - minX,
      height: maxY - minY,
      cx: (minX + maxX) / 2,
      cy: (minY + maxY) / 2,
    };
  }, [cells]);

  /** Screen -> world, shared by drawing and pointer hit-testing. */
  const viewFor = useCallback(
    (w: number, h: number) => {
      const fit = Math.min(w / layout.width, h / layout.height) * 0.88;
      const scale = fit * zoom;
      return {
        scale,
        originX: w * bias + pan.x - layout.cx * scale,
        originY: h * biasY + pan.y - layout.cy * scale,
      };
    },
    [layout, zoom, pan, bias, biasY],
  );

  const draw = useCallback(() => {
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
    // Below ~4px apothem the edges merge, so stop drawing them.
    const fine = size > 4;

    const at = (id: number) => ({
      x: originX + layout.pts[id].x * scale,
      y: originY + layout.pts[id].y * scale,
    });
    const onScreen = (x: number, y: number, pad = 2) =>
      x > -size * pad && x < w + size * pad && y > -size * pad && y < h + size * pad;

    const path = (x: number, y: number, s: number) => {
      const pts = corners(x, y, s);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      return pts;
    };

    // --- Fills
    for (const c of cells) {
      const { x, y } = at(c.id);
      if (!onScreen(x, y)) continue;

      const owner = owners[c.id] ?? 0;
      const tier = tiers[c.id] ?? 1;
      const lift = c.id === selectedId ? 1 : c.id === hovered ? 0.6 : 0;
      path(x, y, size * 0.96);

      if (mode === "pays") {
        ctx.fillStyle = TIER_FILL[tier];
        ctx.fill();
        if (lift > 0) {
          ctx.fillStyle = "rgba(255,255,255,0.2)";
          ctx.globalAlpha = lift;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      } else if (owner === 0) {
        // Unclaimed ground has to read as available, not as background.
        ctx.fillStyle = NEUTRAL_COLOR;
        ctx.globalAlpha = 0.55 + lift * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = guildColor(owner);
        ctx.globalAlpha = 0.3 + lift * 0.32;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (fine) {
        ctx.strokeStyle = "rgba(150,168,190,0.13)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // --- Free ground. In "pays" mode this dashed ring is the call to action.
    if (fine && mode === "pays") {
      ctx.setLineDash([size * 0.22, size * 0.16]);
      ctx.strokeStyle = "rgba(255,255,255,0.78)";
      ctx.lineWidth = Math.max(1, size * 0.09);
      for (const c of cells) {
        if ((owners[c.id] ?? 0) !== 0) continue;
        const { x, y } = at(c.id);
        if (!onScreen(x, y)) continue;
        path(x, y, size * 0.8);
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    // --- Borders. An edge is drawn only if it separates two sides.
    if (fine && mode === "owners") {
      ctx.lineCap = "round";
      for (const c of cells) {
        const owner = owners[c.id] ?? 0;
        if (owner === 0) continue;
        const { x, y } = at(c.id);
        if (!onScreen(x, y)) continue;

        const pts = corners(x, y, size * 0.96);
        ctx.strokeStyle = guildColor(owner);
        ctx.lineWidth = Math.max(1.4, size * 0.16);

        for (let d = 0; d < 6; d++) {
          const nb = byKey.get(`${c.q + DIRECTIONS[d].q},${c.r + DIRECTIONS[d].r}`);
          const nbOwner = nb === undefined ? -1 : (owners[nb] ?? 0);
          if (nbOwner === owner) continue; // internal edge: let it disappear
          const [a, b] = EDGE_FOR_DIRECTION[d];
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        }
      }
    }

    // --- Tier marks. Owners mode only; in "pays" the fill already says it.
    if (mode === "owners") {
      for (const c of cells) {
        const tier = tiers[c.id] ?? 1;
        if (tier === 1) continue;
        const { x, y } = at(c.id);
        if (!onScreen(x, y, 1)) continue;

        if (tier === 3) {
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1.8, size * 0.26), 0, Math.PI * 2);
          ctx.strokeStyle = "#ff5a1f";
          ctx.lineWidth = Math.max(1.2, size * 0.1);
          ctx.stroke();
        } else if (fine) {
          ctx.beginPath();
          ctx.arc(x, y, Math.max(1, size * 0.11), 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.34)";
          ctx.fill();
        }
      }
    }

    // --- Refuges. Unattackable, so they get a solid white ring.
    for (const id of refugeSet) {
      const { x, y } = at(id);
      if (!onScreen(x, y, 1)) continue;
      path(x, y, size * 0.62);
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = Math.max(1, size * 0.09);
      ctx.stroke();
    }

    // --- Hover and selection, above everything else.
    for (const id of [hovered, selectedId]) {
      if (id === null || id === undefined) continue;
      const { x, y } = at(id);
      path(x, y, size * (id === selectedId ? 1.14 : 1.02));
      ctx.strokeStyle = id === selectedId ? "#ffffff" : "rgba(255,255,255,0.6)";
      ctx.lineWidth = id === selectedId ? Math.max(2, size * 0.14) : 1.5;
      ctx.stroke();
    }
  }, [cells, owners, tiers, refugeSet, byKey, layout, viewFor, hovered, selectedId, mode]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [draw]);

  /** Screen -> hex id, or null off the map. */
  const hexAt = useCallback(
    (clientX: number, clientY: number): number | null => {
      const wrap = wrapRef.current;
      if (!wrap) return null;
      const rect = wrap.getBoundingClientRect();
      const { scale, originX, originY } = viewFor(rect.width, rect.height);
      const wx = (clientX - rect.left - originX) / scale;
      const wy = (clientY - rect.top - originY) / scale;
      const { q, r } = pixelToAxial(wx, wy, layout.unit);
      return byKey.get(`${q},${r}`) ?? null;
    },
    [viewFor, layout, byKey],
  );

  /** Put the tooltip on the hex itself — used when there is no pointer to follow. */
  const tipOnHex = useCallback(
    (id: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const { scale, originX, originY } = viewFor(rect.width, rect.height);
      setTipAt({
        x: originX + layout.pts[id].x * scale,
        y: originY + layout.pts[id].y * scale,
      });
    },
    [viewFor, layout],
  );

  // A drag must not fire a selection on release.
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const tip = hovered !== null && tipAt !== null ? { id: hovered, ...tipAt } : null;
  const tipOwner = tip ? (owners[tip.id] ?? 0) : 0;
  const tipTier = tip ? (tiers[tip.id] ?? 1) : 1;

  return (
    <div ref={wrapRef} className={`relative ${className ?? ""}`}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        role="application"
        aria-label={`${siteConfig.name} map, 547 hexes. Arrow keys move between hexes, Enter opens the hex sheet.`}
        className="outline-none focus-visible:ring-2 focus-visible:ring-ember"
        style={{ cursor: hovered !== null ? "pointer" : "grab", touchAction: "none" }}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          drag.current = { x: e.clientX, y: e.clientY, moved: false };
        }}
        onPointerMove={(e) => {
          if (drag.current) {
            const dx = e.clientX - drag.current.x;
            const dy = e.clientY - drag.current.y;
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
              drag.current.moved = true;
              drag.current.x = e.clientX;
              drag.current.y = e.clientY;
              setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
            }
            return;
          }
          const id = hexAt(e.clientX, e.clientY);
          setHovered((prev) => (prev === id ? prev : id));
          if (id === null) {
            setTipAt(null);
          } else {
            const rect = wrapRef.current!.getBoundingClientRect();
            setTipAt({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        }}
        onPointerUp={(e) => {
          const wasDrag = drag.current?.moved ?? false;
          drag.current = null;
          if (wasDrag) return;
          onSelect(hexAt(e.clientX, e.clientY));
        }}
        onPointerLeave={() => {
          drag.current = null;
          setHovered(null);
          setTipAt(null);
        }}
        onWheel={(e) => {
          setZoom((z) => Math.min(6, Math.max(0.7, z * (e.deltaY < 0 ? 1.12 : 0.89))));
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (hovered === null) return;
            e.preventDefault();
            onSelect(hovered);
            return;
          }
          const step = KEY_DIRECTION[e.key];
          if (!step) return;
          e.preventDefault();
          // Start from the centre so the first key press always lands somewhere.
          const from = hovered ?? selectedId ?? 0;
          const cell = cells[from];
          const next = byKey.get(`${cell.q + step.q},${cell.r + step.r}`);
          if (next === undefined) return;
          setHovered(next);
          tipOnHex(next);
        }}
        onFocus={() => {
          if (hovered === null) {
            const start = selectedId ?? 0;
            setHovered(start);
            tipOnHex(start);
          }
        }}
        onBlur={() => setTipAt(null)}
      />

      {/*
        The tooltip answers the only question a first-time visitor has while
        moving across the map: is this mine to take, and what does it pay.
      */}
      {tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+14px)] border border-rule-strong bg-void/95 px-3 py-2 backdrop-blur-sm"
          style={{ left: tip.x, top: tip.y }}
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span
              className="h-2 w-2 shrink-0"
              style={{ background: tipOwner === 0 ? "#ffffff" : guildColor(tipOwner) }}
            />
            <span className="type-label text-chalk">
              {tipOwner === 0 ? "Free to take" : guildName(tipOwner)}
            </span>
          </div>
          <div className="mt-1 whitespace-nowrap">
            <span className="type-figure-sm text-ember">
              {TIER_YIELD[tipTier] * yieldUnit * ticksPerDay}
            </span>
            <span className="type-label ml-1.5 text-chalk-muted">
              {siteConfig.ticker} / day
            </span>
          </div>
          <div className="type-label mt-1 whitespace-nowrap text-chalk-muted">
            {tipOwner === 0
              ? `Costs ${tipTier * 100} to claim`
              : `${(treasury[tip.id] ?? 0).toLocaleString("en-US")} in treasury`}
          </div>
        </div>
      )}
    </div>
  );
}
