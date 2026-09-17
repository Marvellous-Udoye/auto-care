import { ImageResponse } from "next/og";

export const alt = "AutoCare hero section preview with a red performance car";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#030303",
          color: "white",
          fontFamily: "Arial, sans-serif",
          overflow: "hidden",
        }}
      >
        <img
          src={`${siteUrl}/images/hero-bg.jpg`}
          alt=""
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 760,
            height: 630,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,#030303 0%,#030303 38%,rgba(3,3,3,.72) 58%,rgba(3,3,3,.05) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 650,
            paddingLeft: 82,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 54 }}>
            <span style={{ fontSize: 32, fontWeight: 800 }}>Aut</span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 34,
                height: 34,
                margin: "0 2px",
                borderRadius: 999,
                background: "#ec3042",
                color: "#111",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              o
            </span>
            <span style={{ fontSize: 32, fontWeight: 800 }}>Care</span>
          </div>
          <div
            style={{
              display: "flex",
              width: 290,
              padding: "14px 24px",
              marginBottom: 34,
              background: "#ec3042",
              color: "#fff",
              fontSize: 18,
              letterSpacing: 3,
              textTransform: "uppercase",
              justifyContent: "center",
            }}
          >
            Welcome to Auto Care
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            Your <span style={{ color: "#ec3042" }}>Trusted</span> Auto Repair Service Provider
          </h1>
          <p
            style={{
              marginTop: 28,
              width: 540,
              color: "#a4a4a4",
              fontSize: 22,
              lineHeight: 1.4,
              fontWeight: 600,
            }}
          >
            Reliable diagnostics, maintenance, repairs, and car care appointments.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
