import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl, topLevelRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pageEntries: MetadataRoute.Sitemap = topLevelRoutes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/proyectos/${project.slug}`),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...pageEntries, ...projectEntries];
}
