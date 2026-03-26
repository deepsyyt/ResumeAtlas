import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

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
          borderRadius: 40,
          background: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
          color: "#ffffff",
          fontSize: 76,
          fontWeight: 800,
          fontFamily: "Inter, Arial, sans-serif",
          letterSpacing: "-0.03em",
        }}
      >
        RA
      </div>
    ),
    { ...size }
  );
}
