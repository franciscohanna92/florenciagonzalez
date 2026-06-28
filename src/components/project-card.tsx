"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cover = project.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
    >
      <Link
        aria-label={`Ver detalle de ${project.title}`}
        className="group relative block overflow-hidden rounded-none bg-foreground shadow-[0_24px_70px_rgba(45,41,38,0.18)] transition-shadow duration-300 hover:shadow-[0_28px_80px_rgba(45,41,38,0.24)]"
        href={`/proyectos/${project.slug}`}
      >
        <Image
          alt={cover.alt}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={cover.src}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/35 to-foreground/5" />
        <div className="relative flex min-h-[32rem] flex-col justify-end p-5 text-background sm:p-6">
          <div className="max-w-xl">
            <h3 className="font-heading text-4xl leading-tight text-background">
              {project.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
