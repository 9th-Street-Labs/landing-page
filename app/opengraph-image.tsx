import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.product} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#000000",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#8a8a8a",
            letterSpacing: "0.05em",
          }}
        >
          9th Street Labs presents
        </div>
        <div
          style={{
            fontSize: 200,
            fontWeight: 600,
            color: "#f5f5f5",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginTop: 24,
          }}
        >
          {site.product}
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#ff3d00",
            marginTop: 32,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
