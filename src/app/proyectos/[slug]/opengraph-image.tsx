import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getProjectBySlug, getProjectCover } from "@/data/projects";

export const alt = "Proyecto de Florencia González — Arquitectura & Diseño";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ProjectOpenGraphImageProps = {
  params: Promise<{ slug: string }>;
};

function getImageContentType(pathname: string) {
  switch (extname(pathname).toLowerCase()) {
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

export default async function ProjectOpenGraphImage({
  params,
}: ProjectOpenGraphImageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cover = getProjectCover(project);

  if (!cover) {
    notFound();
  }

  const coverPath = join(process.cwd(), "public", cover.src.replace(/^\//, ""));
  const coverData = await readFile(coverPath);
  const coverSrc = `data:${getImageContentType(cover.src)};base64,${coverData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        background: "#191816",
        color: "#f7f4ee",
        display: "flex",
        height: "100%",
        position: "relative",
        width: "100%",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: ImageResponse requires a native image element. */}
      <img
        alt=""
        height={size.height}
        src={coverSrc}
        style={{
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          width: "100%",
        }}
        width={size.width}
      />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(16, 15, 13, 0.06) 10%, rgba(16, 15, 13, 0.24) 48%, rgba(16, 15, 13, 0.92) 100%)",
          display: "flex",
          inset: 0,
          position: "absolute",
        }}
      />

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
