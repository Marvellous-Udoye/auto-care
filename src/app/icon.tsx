import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "#ec3042",
          color: "#111",
          fontSize: 20,
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
