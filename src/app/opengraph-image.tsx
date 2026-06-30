import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Florencia González — Arquitectura e interiores";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage({
    eyebrow: "Arquitectura · Interiorismo · Dirección de obra",
    title: "Diseño espacios desde la idea hasta la obra.",
  });
}
