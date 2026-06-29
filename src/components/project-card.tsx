"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { getProjectCover, type Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cover = getProjectCover(project);

  if (!cover) {
    return null;
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
    >
      <Link
        aria-label={`Ver detalle de ${project.title}`}
        className="group relative block aspect-square overflow-hidden rounded-none bg-foreground"
        href={`/proyectos/${project.slug}`}
      >
        <Image
          alt={cover.alt}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={cover.src}
        />
        <div className="absolute inset-x-0 bottom-0 border-background/40 border-t bg-background/60 p-5 text-foreground backdrop-blur-xl backdrop-saturate-150 sm:p-6">
          <h3 className="font-heading text-3xl leading-tight">
            {project.title}
          </h3>
        </div>
      </Link>
    </motion.article>
  );
}
