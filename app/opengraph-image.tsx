import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/content";

export const alt = "A growth studio for startups.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SocialImage() {
  const font = await readFile(
    join(process.cwd(), "app/fonts/Inter-Medium.ttf"),
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 70,
          background: "#151512",
          color: "#F3F0E8",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", fontSize: 30 }}>
          {site.fullBrandName}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 850,
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1.15,
          }}
        >
          A growth studio for startups.
        </div>
        <div style={{ display: "flex", color: "#E8D5B0", fontSize: 22 }}>
          Community. Content. Strategy.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Inter", data: font, weight: 500, style: "normal" }],
    },
  );
}
