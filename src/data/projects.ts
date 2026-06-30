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
  summary?: string;
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

export function getProjectSummary(project: Project) {
  return project.summary?.trim() ?? "";
}

export function getRelatedProjects(project: Project, limit = 3) {
  return projects
    .filter(
      (candidate) =>
        candidate.slug !== project.slug &&
        (candidate.category === project.category ||
          candidate.location === project.location),
    )
    .slice(0, limit);
}

export const projectContentGaps = projects.map((project) => ({
  slug: project.slug,
  missing: [
    ...(getProjectSummary(project) ? [] : ["summary"]),
    ...(project.challenge.trim() ? [] : ["challenge"]),
    ...(project.solution.trim() ? [] : ["solution"]),
    ...(project.result.trim() ? [] : ["result"]),
  ],
}));
