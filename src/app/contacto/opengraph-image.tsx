import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "Contacto — Florencia González";
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage({
    eyebrow: "Contacto",
    title: "Contame sobre tu proyecto",
  });
}
