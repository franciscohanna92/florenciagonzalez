import scrapedProjects from "./scraped-projects.json";

export type ProjectCategory =
  | "Vivienda"
  | "Comercial"
  | "Interiorismo"
  | "Mobiliario"
  | "Visualización 3D";

export type ProjectFeature = "hero" | "home" | null;

export type ProjectImage = {
  src: string;
  alt: string;
  cover: boolean;
};

export type Project = {
  title: string;
  slug: string;
  category: ProjectCategory;
  year: string;
  location: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  feature: ProjectFeature;
  images: ProjectImage[];
};

export const projects = scrapedProjects as Project[];

export const heroProject = projects.find(
  (project) => project.feature === "hero",
);

export const featuredProjects = projects.filter(
  (project) => project.feature === "home",
);

export function getProjectCover(project: Project) {
  return project.images.find((image) => image.cover) ?? project.images[0];
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
