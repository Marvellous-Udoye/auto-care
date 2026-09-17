import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "#ec3042",
          color: "#111",
          fontSize: 112,
          fontWeight: 900,
          fontFamily: "Arial, sans-serif",
        }}
      >
        A
      </div>
    ),
    size,
  );
}
