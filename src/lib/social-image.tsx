import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

type SocialImageOptions = {
  eyebrow: string;
  title: string;
};

export function createSocialImage({ eyebrow, title }: SocialImageOptions) {
  return new ImageResponse(
    <div
      style={{
        background: "#5f6b5b",
        color: "#fffaf3",
        display: "flex",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "52px 60px 56px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            letterSpacing: "0.02em",
          }}
        >
          <span>Florencia González</span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Arquitectura &amp; Diseño
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: "0.14em",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 28 ? 62 : 70,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    </div>,
    socialImageSize,
  );
}
