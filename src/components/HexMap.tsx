"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildMap,
  hexCenter,
  pixelToAxial,
  DIRECTIONS,
  type HexCell,
} from "@/lib/hexmap";
import { guildColor, NEUTRAL_COLOR } from "@/lib/guilds";

/*
 * La carte. Canvas 2D, pas de librairie 3D — le brief l'impose et il a raison:
 * 547 hexagones plats se dessinent en quelques millisecondes et restent nets à
 * n'importe quel zoom.
 *
 * Le parti pris de lecture: l'INTÉRIEUR d'un territoire est faible, ses
 * FRONTIÈRES sont fortes. Un remplissage uniforme par guilde donne un vitrail
 * illisible; ce qu'un joueur regarde sur une carte de conquête, c'est où sa
 * couleur touche celle d'un autre. On dessine donc les arêtes qui séparent
 * deux propriétaires différents, et on laisse les arêtes internes s'effacer.
 */

const HEX_ANGLES = Array.from({ length: 6 }, (_, i) => ((60 * i - 30) * Math.PI) / 180);

/** Coins d'un hexagone pointy-top, dans l'ordre horaire depuis le haut-droit. */
function corners(cx: number, cy: number, size: number): [number, number][] {
  return HEX_ANGLES.map((a) => [cx + size * Math.cos(a), cy + size * Math.sin(a)]);
}

/**
 * L'arête partagée avec le voisin de direction `i`, exprimée en indices de
 * coins. Dérivé une fois plutôt que redécouvert à chaque frame.
 */
const EDGE_FOR_DIRECTION = DIRECTIONS.map((_, i) => {
  const a = (6 - i) % 6;
  return [a, (a + 1) % 6] as const;
});

export type HexMapProps = {
  owners: number[];
  tiers: number[];
  refuges: number[];
  radius: number;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
  /** 0 = carte collée à gauche, 1 = collée à droite. */
  bias?: number;
  biasY?: number;
  className?: string;
};

export function HexMap({
  owners,
  tiers,
  refuges,
  radius,
  selectedId,
  onSelect,
  bias = 0.5,
  biasY = 0.5,
  className,
}: HexMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
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
   * La géométrie ne dépend que du rayon: on la calcule à une taille unitaire
   * et on applique l'échelle au dessin. Redimensionner la fenêtre ne redéclenche
   * donc aucun recalcul de layout.
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

  /** Passage écran -> monde, partagé par le dessin et le pointeur. */
  const viewFor = useCallback(
    (w: number, h: number) => {
      const fit = Math.min(w / layout.width, h / layout.height) * 0.92;
      const scale = fit * zoom;
      const originX = w * bias + pan.x - layout.cx * scale;
      const originY = h * biasY + pan.y - layout.cy * scale;
      return { scale, originX, originY };
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
    // Sous ~4px d'apothème, les arêtes se confondent: on cesse de les tracer.
    const fine = size > 4;

    const at = (id: number) => ({
      x: originX + layout.pts[id].x * scale,
      y: originY + layout.pts[id].y * scale,
    });

    // --- Remplissages. Faibles: le territoire se lit par ses bords.
    for (const c of cells) {
      const { x, y } = at(c.id);
      if (x < -size * 2 || x > w + size * 2 || y < -size * 2 || y > h + size * 2) continue;

      const owner = owners[c.id] ?? 0;
      const pts = corners(x, y, size * 0.96);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();

      if (owner === 0) {
        ctx.fillStyle = NEUTRAL_COLOR;
        ctx.globalAlpha = 0.28;
      } else {
        ctx.fillStyle = guildColor(owner);
        ctx.globalAlpha = c.id === selectedId ? 0.62 : c.id === hovered ? 0.46 : 0.3;
      }
      ctx.fill();
      ctx.globalAlpha = 1;

      if (fine) {
        ctx.strokeStyle = "rgba(150,168,190,0.13)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // --- Frontières. Une arête n'est tracée que si elle sépare deux camps.
    if (fine) {
      ctx.lineCap = "round";
      for (const c of cells) {
        const owner = owners[c.id] ?? 0;
        if (owner === 0) continue;
        const { x, y } = at(c.id);
        if (x < -size * 2 || x > w + size * 2 || y < -size * 2 || y > h + size * 2) continue;

        const pts = corners(x, y, size * 0.96);
        ctx.strokeStyle = guildColor(owner);
        ctx.lineWidth = Math.max(1.4, size * 0.16);

        for (let d = 0; d < 6; d++) {
          const nb = byKey.get(`${c.q + DIRECTIONS[d].q},${c.r + DIRECTIONS[d].r}`);
          const nbOwner = nb === undefined ? -1 : (owners[nb] ?? 0);
          if (nbOwner === owner) continue; // arête interne: on la laisse disparaître
          const [a, b] = EDGE_FOR_DIRECTION[d];
          ctx.beginPath();
          ctx.moveTo(pts[a][0], pts[a][1]);
          ctx.lineTo(pts[b][0], pts[b][1]);
          ctx.stroke();
        }
      }
    }

    // --- Marques de tier. La braise ne sert qu'aux 5 % à 8x.
    for (const c of cells) {
      const tier = tiers[c.id] ?? 1;
      if (tier === 1) continue;
      const { x, y } = at(c.id);
      if (x < -size || x > w + size || y < -size || y > h + size) continue;

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

    // --- Refuges. Inattaquables: on leur donne un anneau blanc plein.
    for (const id of refugeSet) {
      const { x, y } = at(id);
      if (x < -size || x > w + size || y < -size || y > h + size) continue;
      const pts = corners(x, y, size * 0.62);
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = Math.max(1, size * 0.09);
      ctx.stroke();
    }

    // --- Sélection, par-dessus tout le reste.
    for (const id of [hovered, selectedId]) {
      if (id === null || id === undefined) continue;
      const { x, y } = at(id);
      const pts = corners(x, y, size * (id === selectedId ? 1.14 : 1.02));
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < 6; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.strokeStyle = id === selectedId ? "#ffffff" : "rgba(255,255,255,0.55)";
      ctx.lineWidth = id === selectedId ? Math.max(2, size * 0.14) : 1.5;
      ctx.stroke();
    }
  }, [cells, owners, tiers, refugeSet, byKey, layout, viewFor, hovered, selectedId]);

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

  /** Écran -> identifiant d'hex, ou null hors carte. */
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

  // Le glissement ne doit pas déclencher une sélection au relâchement.
  const drag = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  return (
    <div
      ref={wrapRef}
      className={className}
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
      }}
      onWheel={(e) => {
        const next = Math.min(6, Math.max(0.7, zoom * (e.deltaY < 0 ? 1.12 : 0.89)));
        setZoom(next);
      }}
      style={{ cursor: hovered !== null ? "pointer" : "grab", touchAction: "none" }}
    >
      <canvas ref={canvasRef} aria-label="Carte de SIEGE, 547 hexagones" />
    </div>
  );
}
