import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "Dev Badodiya").slice(0, 80);
  const kicker = (searchParams.get("kicker") || "Cosverse AI").slice(0, 48);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#23201c",
          color: "#f4f1eb",
          padding: "64px 72px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#b1a89e",
            fontSize: 28,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#c6e2b2",
            }}
          />
          {kicker}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div
            style={{
              fontSize: title.length > 36 ? 64 : 76,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#b1a89e", lineHeight: 1.35 }}>
            Founding member · Cosverse AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#8f877e",
            fontSize: 24,
          }}
        >
          <div>Dev Badodiya</div>
          <div>devvv.online</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
