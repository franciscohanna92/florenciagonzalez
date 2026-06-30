import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Proyectos de Florencia González";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage({
    eyebrow: "Arquitectura · Interiorismo · Visualización 3D",
    title: "Proyectos",
  });
}
