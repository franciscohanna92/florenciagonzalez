import type { Metadata } from "next";
import { siteConfig } from "@/lib/content";

const PRODUCTION_ORIGIN = "https://florenciagonzalez.vercel.app";
const DEVELOPMENT_ORIGIN = "http://localhost:3000";

function normalizeOrigin(value: string) {
  const url = new URL(value);
  url.hash = "";
  url.pathname = "/";
  url.search = "";
  return url;
}

export const siteUrl = normalizeOrigin(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "production"
      ? PRODUCTION_ORIGIN
      : DEVELOPMENT_ORIGIN),
);

export const topLevelRoutes = [
  "/",
  "/proyectos",
  "/servicios",
  "/como-trabajo",
  "/sobre-mi",
  "/contacto",
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const socialImage = {
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
    alt: "Florencia González — Arquitectura e interiores en San Juan",
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      locale: "es_AR",
      siteName: siteConfig.name,
      type,
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}

export function getSiteJsonLd() {
  const websiteId = absoluteUrl("/#website");
  const personId = absoluteUrl("/#florencia-gonzalez");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: absoluteUrl(),
        name: `${siteConfig.name} | ${siteConfig.descriptor}`,
        description:
          "Portfolio de arquitectura, interiores, visualización 3D, documentación y dirección de obra.",
        inLanguage: "es-AR",
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        jobTitle: "Arquitecta",
        description:
          "Arquitecta especializada en proyectos residenciales y comerciales, interiorismo, visualización 3D, documentación y dirección de obra.",
        url: absoluteUrl("/sobre-mi"),
        image: absoluteUrl("/images/profile.jpeg"),
        email: siteConfig.email,
        telephone: siteConfig.whatsapp,
        sameAs: [siteConfig.instagramHref, siteConfig.behanceHref],
        workLocation: {
          "@type": "Place",
          name: siteConfig.location,
        },
        knowsAbout: [
          "Arquitectura residencial",
          "Arquitectura comercial",
          "Diseño interior",
          "Mobiliario a medida",
          "Visualización 3D",
          "Documentación técnica",
          "Dirección de obra",
        ],
      },
    ],
  };
}
