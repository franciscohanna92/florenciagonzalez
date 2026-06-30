import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/data/projects";
import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Proyecto de Florencia González — Arquitectura & Diseño";
export const size = socialImageSize;
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

  return createSocialImage({
    eyebrow: `${project.category} · ${project.location} · ${project.year}`,
    title: project.title,
  });
}
