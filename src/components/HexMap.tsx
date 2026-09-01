"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildMap, hexCenter, pixelToAxial, DIRECTIONS, TIER_YIELD } from "@/lib/hexmap";
import { guildColor, guildName, NEUTRAL_COLOR } from "@/lib/guilds";
import { siteConfig } from "@/lib/site-config";

/*
 * The map. Canvas 2D, no 3D library — the brief rules one out and it is right:
 * 547 flat tiles do not need WebGL, and a 2D canvas stays crisp at any zoom with
 * nothing to install.
 *
 * The relief is not decoration. Height encodes tier, so the ground that pays
 * stands up: a tier 3 hex is visibly a block, a tier 1 is nearly flush. That is
 * one more channel carrying the same fact the colour carries, which is what
 * makes the map readable at a glance and still readable to someone who cannot
 * separate the two oranges.
 *
 * Two readings on top of that:
 *
 *   "pays"   — one hue, three depths of it. Free hexes get a dashed crown, so
 *              "what is worth having" and "what can I still buy" answer at once.
 *
 *   "owners" — guild colour on the top face. The INSIDE of a territory is faint
 *              and its BORDERS are strong, because what a player looks at on a
 *              conquest map is where their colour meets someone else's.
 *
 * Drawing is back to front by screen y, so a tile's walls are overdrawn by the
 * tile in front of it. That painter's ordering is the whole trick — without it
 * the extrusions cross and the board looks like broken glass.
 */

export type MapMode = "pays" | "owners";

const HEX_ANGLES = Array.from({ length: 6 }, (_, i) => ((60 * i - 30) * Math.PI) / 180);

/** Vertical squash. Just enough to read as a table seen from a low angle. */
const SQUASH = 0.88;

/** Wall height per tier, as a fraction of the hex size. */
const TIER_DEPTH: Record<number, number> = { 1: 0.2, 2: 0.46, 3: 0.8 };

/** Corners of a pointy-top hex, clockwise from upper right. */
function corners(cx: number, cy: number, size: number): [number, number][] {
  return HEX_ANGLES.map((a) => [cx + size * Math.cos(a), cy + size * Math.sin(a) * SQUASH]);
}

/**
 * The edge shared with the neighbour in direction `i`, as corner indices.
 * Derived once rather than rediscovered every frame.
 */
const EDGE_FOR_DIRECTION = DIRECTIONS.map((_, i) => {
  const a = (6 - i) % 6;
  return [a, (a + 1) % 6] as const;
});

/**
 * The four walls a viewer above and slightly in front can see, as corner pairs.
 * The two upper edges face away and are never drawn.
 */
const FRONT_WALLS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

/** Light comes from the upper left, so right-hand walls fall away hardest. */
const WALL_SHADE: number[] = [0.42, 0.5, 0.66, 0.78];

type Rgb = [number, number, number];

/*
 * Tier 1 sits close to the ground colour on purpose. It is 70% of the board, so
 * anything brighter turns the whole map into one orange mass and the 27 hexes
 * that actually matter stop reading at all. Scarcity has to look scarce.
 */
const TIER_RGB: Record<number, Rgb> = {
  1: [44, 24, 17],
  2: [130, 52, 25],
  3: [255, 96, 34],
};

const NEUTRAL_RGB: Rgb = [64, 71, 82];

function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function shade([r, g, b]: Rgb, f: number, alpha = 1): string {
  const c = (v: number) => Math.round(Math.min(255, v * f));
  return alpha === 1
    ? `rgb(${c(r)},${c(g)},${c(b)})`
    : `rgba(${c(r)},${c(g)},${c(b)},${alpha})`;
}

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
   * scale when drawing. Resizing the window recomputes no layout at all.
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
    // Back to front, so each tile's walls are covered by the tile ahead of it.
    const order = cells.map((c) => c.id).sort((a, b) => pts[a].y - pts[b].y || pts[a].x - pts[b].x);
    return {
      unit,
      pts,
      order,
      width: maxX - minX,
      height: (maxY - minY) * SQUASH,
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
        originY: h * biasY + pan.y - layout.cy * scale * SQUASH,
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
    // Below ~5px the walls collapse into noise; fall back to flat tiles.
    const relief = size > 5;
    const fine = size > 4;

    const at = (id: number) => ({
      x: originX + layout.pts[id].x * scale,
      y: originY + layout.pts[id].y * scale * SQUASH,
    });
    const onScreen = (x: number, y: number, pad = 3) =>
      x > -size * pad && x < w + size * pad && y > -size * pad && y < h + size * pad;

    const trace = (pts: [number, number][]) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
    };

    const baseRgb = (id: number): Rgb => {
      if (mode === "pays") return TIER_RGB[tiers[id] ?? 1];
      const owner = owners[id] ?? 0;
      return owner === 0 ? NEUTRAL_RGB : hexToRgb(guildColor(owner));
    };

    // ---- Tiles, back to front.
    for (const id of layout.order) {
      const { x, y } = at(id);
      if (!onScreen(x, y)) continue;

      const tier = tiers[id] ?? 1;
      const owner = owners[id] ?? 0;
      const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
      const depth = relief ? size * (TIER_DEPTH[tier] + lifted) : 0;
      const rgb = baseRgb(id);

      // In owners mode the interior stays quiet so the borders can speak.
      const topAlpha =
        mode === "pays"
          ? 1
          : owner === 0
            ? 0.62
            : id === selectedId
              ? 0.9
              : id === hovered
                ? 0.78
                : 0.52;

      const top = corners(x, y - lifted * size, size * 0.94);

      // Walls first, so the top face sits cleanly on them.
      //
      // They are drawn far more opaque than the top face. The interior of a
      // territory is deliberately quiet, but a translucent wall stops being a
      // wall — the depth simply vanishes into the background and the board goes
      // flat. Structure stays solid; only the surface is allowed to be faint.
      if (relief) {
        const wallAlpha = Math.min(1, topAlpha + 0.42);
        for (let i = 0; i < FRONT_WALLS.length; i++) {
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
      ctx.setLineDash([size * 0.2, size * 0.15]);
      ctx.strokeStyle = "rgba(255,255,255,0.8)";
      ctx.lineWidth = Math.max(1, size * 0.08);
      for (const id of layout.order) {
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
      for (const id of layout.order) {
        const owner = owners[id] ?? 0;
        if (owner === 0) continue;
        const { x, y } = at(id);
        if (!onScreen(x, y)) continue;

        const c = cells[id];
        const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
        const top = corners(x, y - lifted * size, size * 0.94);
        ctx.strokeStyle = guildColor(owner);
        ctx.lineWidth = Math.max(1.4, size * 0.15);

        for (let d = 0; d < 6; d++) {
          const nb = byKey.get(`${c.q + DIRECTIONS[d].q},${c.r + DIRECTIONS[d].r}`);
          const nbOwner = nb === undefined ? -1 : (owners[nb] ?? 0);
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
      for (const id of layout.order) {
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
    for (const id of refugeSet) {
      const { x, y } = at(id);
      if (!onScreen(x, y, 1)) continue;
      const lifted = id === selectedId ? 0.34 : id === hovered ? 0.16 : 0;
      trace(corners(x, y - lifted * size, size * 0.58));
      ctx.strokeStyle = "rgba(255,255,255,0.88)";
      ctx.lineWidth = Math.max(1, size * 0.09);
      ctx.stroke();
    }

    // ---- Hover and selection, above everything.
    for (const id of [hovered, selectedId]) {
      if (id === null || id === undefined) continue;
      const { x, y } = at(id);
      const lifted = id === selectedId ? 0.34 : 0.16;
      trace(corners(x, y - lifted * size, size * (id === selectedId ? 1.08 : 1.0)));
      ctx.strokeStyle = id === selectedId ? "#ffffff" : "rgba(255,255,255,0.65)";
      ctx.lineWidth = id === selectedId ? Math.max(2, size * 0.13) : 1.5;
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

  /**
   * Screen -> hex id.
   *
   * The extrusion goes DOWNWARD from the top face, which is drawn on the hex's
   * own centre. That is the reason it goes downward: the logical centre and the
   * visible face stay in the same place, so hit-testing needs no correction for
   * a height that varies by tier.
   */
  const hexAt = useCallback(
    (clientX: number, clientY: number): number | null => {
      const wrap = wrapRef.current;
      if (!wrap) return null;
      const rect = wrap.getBoundingClientRect();
      const { scale, originX, originY } = viewFor(rect.width, rect.height);
      const wx = (clientX - rect.left - originX) / scale;
      const wy = (clientY - rect.top - originY) / (scale * SQUASH);
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
        y: originY + layout.pts[id].y * scale * SQUASH,
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
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+18px)] border border-rule-strong bg-void/95 px-3 py-2 backdrop-blur-sm"
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
