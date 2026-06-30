import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/projects";

export const alt = "Proyecto de Florencia González — Arquitectura & Diseño";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ProjectOpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({
  params,
}: ProjectOpenGraphImageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    <div
      style={{
        background: "#5f6b5b",
        color: "#fffaf3",
        display: "flex",
        height: "100%",
        position: "relative",
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
          position: "relative",
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
            {project.category} · {project.location} · {project.year}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 70,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              maxWidth: 980,
            }}
          >
            {project.title}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
