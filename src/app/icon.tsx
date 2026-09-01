import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** La marque en 32px: un hexagone braise, un cœur blanc. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0d0f",
        }}
      >
        <svg width="28" height="32" viewBox="0 0 28 32">
          <path
            d="M14 1.6 L26 8.5 V23.5 L14 30.4 L2 23.5 V8.5 Z"
            fill="none"
            stroke="#ff5a1f"
            strokeWidth="2.4"
          />
          <path d="M14 9 L19.6 12.2 V18.8 L14 22 L8.4 18.8 V12.2 Z" fill="#ffffff" />
        </svg>
      </div>
    ),
    size,
  );
}
