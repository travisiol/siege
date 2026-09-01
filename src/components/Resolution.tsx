"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { buildMap, hexCenter } from "@/lib/hexmap";
import { guildColor, guildName, NEUTRAL_COLOR } from "@/lib/guilds";
import { previewReplay, type ReplayEvent } from "@/lib/preview-replay";
import { useBoardData } from "@/lib/board-context";
import { money } from "@/lib/economics";
import { Label } from "@/components/ui/Label";
import { siteConfig } from "@/lib/site-config";

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
 */

const SPEEDS = [
  { label: "0.5x", ms: 1800 },
  { label: "1x", ms: 900 },
  { label: "2x", ms: 450 },
  { label: "4x", ms: 220 },
];

function outcomeOf(e: ReplayEvent): "captured" | "held" | "claimed" {
  if (e.kind === "claim") return "claimed";
  return e.winner !== 0 ? "captured" : "held";
}

export function Resolution({ onClose }: { onClose: () => void }) {
  const board = useBoardData();
  const cells = useMemo(() => buildMap(board.radius), [board.radius]);
  const events = previewReplay.events;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!playing) return;
    if (index >= events.length) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setIndex((i) => i + 1), SPEEDS[speed].ms);
    return () => window.clearTimeout(id);
  }, [playing, index, speed, events.length]);

  const current = index < events.length ? events[index] : null;
  const played = events.slice(0, Math.min(index + 1, events.length));

  /** Where each hex ends up once every beat up to `index` has landed. */
  const owners = useMemo(() => {
    const next = [...board.owners];
    for (const e of events.slice(0, index)) {
      if (e.winner !== 0) next[e.hex] = e.winner;
    }
    return next;
  }, [board.owners, events, index]);

  const draw = useCallback(() => {
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
    const pts = cells.map((c) => hexCenter(c, unit));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const spanX = Math.max(...xs) - Math.min(...xs) + unit * 2;
    const spanY = Math.max(...ys) - Math.min(...ys) + unit * 2;
    const scale = Math.min(w / spanX, h / spanY) * 0.9;
    const size = unit * scale;
    const ox = w / 2 - ((Math.min(...xs) + Math.max(...xs)) / 2) * scale;
    const oy = h / 2 - ((Math.min(...ys) + Math.max(...ys)) / 2) * scale;

    const hexPath = (cx: number, cy: number, s: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = ((60 * i - 30) * Math.PI) / 180;
        const x = cx + s * Math.cos(a);
        const y = cy + s * Math.sin(a);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    // The board, dimmed: it is context for the beat, not the subject.
    for (const c of cells) {
      const x = ox + pts[c.id].x * scale;
      const y = oy + pts[c.id].y * scale;
      const owner = owners[c.id] ?? 0;
      hexPath(x, y, size * 0.94);
      ctx.fillStyle = owner === 0 ? NEUTRAL_COLOR : guildColor(owner);
      ctx.globalAlpha = owner === 0 ? 0.3 : 0.34;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Everything already resolved this tick, marked by what happened to it.
    for (const e of played) {
      const x = ox + pts[e.hex].x * scale;
      const y = oy + pts[e.hex].y * scale;
      const kind = outcomeOf(e);
      hexPath(x, y, size * 0.94);
      ctx.fillStyle =
        kind === "captured" ? "#ff5a1f" : kind === "claimed" ? "#ffffff" : "#3fcf8e";
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
  }, [cells, owners, played, current]);

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

  // Running totals of what the tick has done so far.
  const tally = played.reduce(
    (acc, e) => {
      const k = outcomeOf(e);
      acc[k] += 1;
      if (e.winner !== 0) acc.moved += e.treasury;
      return acc;
    },
    { captured: 0, held: 0, claimed: 0, moved: 0 },
  );

  const topAttacker = current?.attackers.reduce(
    (best, a) => (best === null || a.power > best.power ? a : best),
    null as { guild: number; power: number; stake: number } | null,
  );
  const scaleMax = Math.max(current?.defPower ?? 1, topAttacker?.power ?? 1, 1);

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-void/97 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 border-b border-rule px-4 py-3 sm:px-6">
        <div>
          <Label className="text-ember">Tick {previewReplay.tick} resolution</Label>
          <p className="type-data mt-0.5 text-chalk-muted">
            Every battle lands at once on chain. Replayed in sequence so it can be read.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (index >= events.length) setIndex(0);
              setPlaying((p) => !p);
            }}
            className="type-label border border-rule-strong px-3 py-2 text-chalk transition-colors hover:border-ember hover:text-ember"
          >
            {index >= events.length ? "Replay" : playing ? "Pause" : "Play"}
          </button>
          {SPEEDS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => setSpeed(i)}
              className={clsx(
                "type-label px-2.5 py-2 transition-colors",
                speed === i ? "bg-ember text-void" : "text-chalk-muted hover:text-chalk",
              )}
            >
              {s.label}
            </button>
          ))}
          <button
            type="button"
            onClick={onClose}
            className="type-label border border-rule-strong px-3 py-2 text-chalk-muted transition-colors hover:border-chalk hover:text-chalk"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        {/* The board */}
        <div ref={wrapRef} className="sheet-grid relative min-h-[240px] flex-1">
          <canvas ref={canvasRef} aria-label="Tick resolution replay" />
        </div>

        {/* The beat */}
        <div className="flex w-full shrink-0 flex-col border-t border-rule lg:w-[400px] lg:border-l lg:border-t-0">
          {current ? (
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="type-display text-chalk">
                  #{String(current.hex).padStart(3, "0")}
                </span>
                <span
                  className={clsx(
                    "type-label border px-2 py-1",
                    outcomeOf(current) === "captured"
                      ? "border-ember/50 bg-ember/10 text-ember"
                      : outcomeOf(current) === "claimed"
                        ? "border-chalk/40 text-chalk"
                        : "border-gain/50 bg-gain/10 text-gain",
                  )}
                >
                  {outcomeOf(current) === "captured"
                    ? "Captured"
                    : outcomeOf(current) === "claimed"
                      ? "Claimed"
                      : "Held"}
                </span>
              </div>

              <p className="type-data mt-1 text-chalk-muted">
                Tier {current.tier}
                {current.defender !== 0 && ` · held by ${guildName(current.defender)}`}
              </p>

              {/* The comparison the whole screen exists for. */}
              {current.kind === "battle" ? (
                <div className="mt-5 space-y-4">
                  {current.attackers.map((a) => (
                    <div key={a.guild}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="type-label text-chalk-soft">
                          {guildName(a.guild)} attacks
                        </span>
                        <span className="type-figure-sm text-chalk">{a.power.toFixed(1)}</span>
                      </div>
                      <div className="mt-1 h-2.5 w-full bg-field-line">
                        <div
                          className="h-full transition-[width] duration-500"
                          style={{
                            width: `${Math.min(100, (a.power / scaleMax) * 100)}%`,
                            background: guildColor(a.guild),
                          }}
                        />
                      </div>
                      <p className="type-data mt-1 text-chalk-muted">
                        {money(a.stake)} {siteConfig.ticker} staked
                      </p>
                    </div>
                  ))}

                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="type-label text-chalk-soft">
                        {guildName(current.defender)} defends
                      </span>
                      <span className="type-figure-sm text-chalk">
                        {current.defPower.toFixed(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex h-2.5 w-full bg-field-line">
                      <div
                        className="h-full bg-chalk-soft transition-[width] duration-500"
                        style={{
                          width: `${Math.min(100, (current.defPower / scaleMax) * (100 / (current.fort / 100)))}%`,
                        }}
                      />
                      {/* The slice fortification added, shown as what standing still bought. */}
                      <div
                        className="h-full bg-gain transition-[width] duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            (current.defPower / scaleMax) * 100 * (1 - 100 / current.fort),
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="type-data mt-1 text-chalk-muted">
                      {money(current.defStake)} {siteConfig.ticker} staked ·{" "}
                      <span className="text-gain">{current.fort}% fortification</span>
                    </p>
                  </div>

                  <p className="type-data border-t border-rule/60 pt-3 text-chalk-muted">
                    {current.winner !== 0
                      ? `A beat D, so ${guildName(current.winner)} takes the hex and its ${money(current.treasury)} ${siteConfig.ticker} treasury.`
                      : "A did not beat D. On a tie the defender holds, and every attacker forfeits 20% of their stake."}
                  </p>
                </div>
              ) : (
                <div className="mt-5">
                  <p className="type-body text-chalk-soft">
                    Unclaimed ground, so no battle:{" "}
                    {current.attackers.length > 1
                      ? `${current.attackers.length} guilds bid, and the largest raw power took it.`
                      : "bought outright at the tier price plus the empire multiplier."}
                  </p>
                  <p className="type-data mt-3 text-chalk-muted">
                    {guildName(current.winner)} paid {money(current.treasury)}{" "}
                    {siteConfig.ticker} into the hex treasury.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 px-5 py-4">
              <p className="type-display text-chalk">Tick settled</p>
              <p className="type-body mt-3 text-chalk-soft">
                {tally.captured} hexes changed hands, {tally.held} held, {tally.claimed}{" "}
                bought from neutral. {money(tally.moved)} {siteConfig.ticker} of treasury
                moved with them.
              </p>
            </div>
          )}

          {/* Running totals */}
          <dl className="grid grid-cols-4 border-t border-rule">
            {[
              ["Captured", tally.captured, "text-ember"],
              ["Held", tally.held, "text-gain"],
              ["Claimed", tally.claimed, "text-chalk"],
              ["Moved", money(tally.moved), "text-chalk"],
            ].map(([k, v, tone]) => (
              <div key={String(k)} className="border-r border-rule px-3 py-2.5 last:border-r-0">
                <dt>
                  <Label>{String(k)}</Label>
                </dt>
                <dd className={clsx("type-figure-sm mt-1", tone)}>{String(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t border-rule px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="type-label shrink-0 text-chalk-muted">
            {Math.min(index + 1, events.length)} / {events.length}
          </span>
          <input
            type="range"
            min={0}
            max={events.length}
            value={index}
            onChange={(e) => {
              setPlaying(false);
              setIndex(Number(e.target.value));
            }}
            aria-label="Scrub the tick"
            className="h-1 flex-1 appearance-none bg-field-line accent-ember"
          />
        </div>
      </div>
    </div>
  );
}
