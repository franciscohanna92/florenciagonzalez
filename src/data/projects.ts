import scrapedProjects from "./scraped-projects.json";

export type ProjectCategory =
  | "Vivienda"
  | "Comercial"
  | "Interiorismo"
  | "Mobiliario"
  | "Visualización 3D";

export type ProjectStatus =
  | "Obra finalizada"
  | "Proyecto"
  | "En obra"
  | "Visualización 3D"
  | "Dirección de obra";

export type ProjectImage = {
  src: string;
  alt: string;
  originalUrl?: string;
};

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategory;
  year: string;
  status: ProjectStatus;
  location: string;
  services: string[];
  excerpt: string;
  description: string;
  challenge?: string;
  solution?: string;
  result?: string;
  sourceUrl?: string;
  images: ProjectImage[];
};

export const projects = scrapedProjects as Project[];

export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
