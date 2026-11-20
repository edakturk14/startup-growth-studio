import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  const initials = site.brandName
    .split(/\s*&\s*|\s+/)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#E8D5B0",
          color: "#101110",
          fontSize: 28,
          fontWeight: 500,
          borderRadius: 12,
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
