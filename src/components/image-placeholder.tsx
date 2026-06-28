"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  reveal?: boolean;
};

export function ImagePlaceholder({
  src,
  alt,
  label,
  className,
  imageClassName,
  priority = false,
  reveal = false,
}: ImagePlaceholderProps) {
  return (
    <motion.figure
      className={cn(
        "relative overflow-hidden rounded-none border border-border bg-muted",
        className,
      )}
      initial={reveal ? { opacity: 0, y: 36, scale: 0.98 } : false}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={reveal ? { once: true, margin: "0px 0px -12% 0px" } : undefined}
      whileInView={reveal ? { opacity: 1, y: 0, scale: 1 } : undefined}
    >
      <Image
        alt={alt}
        className={cn("object-cover", imageClassName)}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={src}
      />
      {label ? (
        <figcaption className="absolute right-3 bottom-3 rounded-none bg-card/90 px-3 py-2 text-card-foreground shadow-sm">
          <Badge variant="secondary">{label}</Badge>
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
