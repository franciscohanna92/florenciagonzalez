import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#5f6b5b",
        color: "#fffaf3",
        display: "flex",
        fontSize: 188,
        fontWeight: 600,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-0.08em",
        paddingRight: 22,
        width: "100%",
      }}
    >
      FG
    </div>,
    size,
  );
}
