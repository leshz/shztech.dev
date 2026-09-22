import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide OpenGraph image.
 *
 * Colours are inlined literals rather than CSS custom properties: Satori (the
 * renderer behind ImageResponse) resolves no cascade and has no access to the
 * stylesheet, so `var(--color-accent)` would render as nothing. These values
 * mirror the light-theme tokens in src/styles/tokens.css — keep them in sync.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#141414",
        color: "#ffffff",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          fontSize: 28,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          color: "#f26b38",
        }}
      >
        {site.focus}
      </div>

      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.1,
          marginTop: 24,
        }}
      >
        {site.name}
      </div>

      <div style={{ fontSize: 36, color: "#a2a2a6", marginTop: 20 }}>
        {site.role}
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 26,
          color: "#ede574",
        }}
      >
        {site.url.replace("https://", "")}
      </div>
    </div>,
    size,
  );
}
