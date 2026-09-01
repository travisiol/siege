import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { previewBoard } from "@/lib/preview-board";
import { guildColor } from "@/lib/guilds";
import { buildMap, hexCenter } from "@/lib/hexmap";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/*
 * La carte réelle en aperçu social, pas une illustration.
 *
 * ImageResponse ne fait pas de canvas: on projette donc les 547 centres en SVG
 * et on laisse la couleur des guildes porter l'image. C'est la même donnée que
 * celle affichée sur la page.
 */
export default function OpengraphImage() {
  const cells = buildMap(previewBoard.radius);
  const unit = 11.6;
  const pts = cells.map((c) => hexCenter(c, unit));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0d0f",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 0,
            width: 700,
            height: 630,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="640" height="600" viewBox="-330 -320 660 640">
            {cells.map((c, i) => {
              const owner = previewBoard.owners[c.id] ?? 0;
              const p = pts[i];
              const pointsAttr = Array.from({ length: 6 }, (_, k) => {
                const a = ((60 * k - 30) * Math.PI) / 180;
                return `${p.x + unit * 0.94 * Math.cos(a)},${p.y + unit * 0.94 * Math.sin(a)}`;
              }).join(" ");
              return (
                <polygon
                  key={c.id}
                  points={pointsAttr}
                  fill={owner === 0 ? "#2b313a" : guildColor(owner)}
                  fillOpacity={owner === 0 ? 0.6 : 0.85}
                />
              );
            })}
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            width: 620,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#ff5a1f",
            }}
          >
            {previewBoard.totalHexes} hexagones · 12 guildes
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              fontWeight: 900,
              letterSpacing: -3,
              textTransform: "uppercase",
              marginTop: 12,
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              color: "#adb6c2",
              marginTop: 20,
              lineHeight: 1.3,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              color: "#6f7987",
              marginTop: 28,
              lineHeight: 1.4,
            }}
          >
            Un tour toutes les 8 h. Aucun aléatoire.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
