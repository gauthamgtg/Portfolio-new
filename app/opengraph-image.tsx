import { ImageResponse } from "next/og";

export const alt = "Gautham M — Data Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0820, #070710 60%, #08121a)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(139,92,246,0.45), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(34,211,238,0.32), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22d3ee",
            }}
          />
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 26, letterSpacing: 1 }}>
            Available for data &amp; analytics roles
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            Gautham M
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              marginTop: 8,
              background: "linear-gradient(90deg, #22d3ee, #8b5cf6, #e879f9)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            Data Analyst · 5.5+ yrs · SaaS · Q-Commerce · Fintech
          </div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {[
            ["$22K+", "Revenue saved"],
            ["$3M+", "Ad spend tracked"],
            ["90%", "Reporting time cut"],
          ].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 52, fontWeight: 700, color: "#fff" }}>{v}</div>
              <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
