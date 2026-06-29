"use client";

import { XIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProjectImage } from "@/data/projects";

type ProjectGalleryProps = {
  images: ProjectImage[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [openingIndex, setOpeningIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const selectOpeningImage = useCallback((index: number) => {
    setOpeningIndex(index);
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (!(open && carouselApi)) {
      return;
    }

    carouselApi.scrollTo(openingIndex, true);
  }, [carouselApi, open, openingIndex]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCurrentIndex = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateCurrentIndex();
    carouselApi.on("select", updateCurrentIndex);
    carouselApi.on("reInit", updateCurrentIndex);

    return () => {
      carouselApi.off("select", updateCurrentIndex);
      carouselApi.off("reInit", updateCurrentIndex);
    };
  }, [carouselApi]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <div className="grid gap-6 md:grid-cols-2">
        {images.map((image, index) => (
          <DialogTrigger
            key={image.src}
            render={
              <motion.button
                aria-label={`Abrir imagen ${index + 1} de ${images.length}: ${image.alt}`}
                className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden border-0 bg-foreground text-left outline-none"
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 36, scale: 0.98 }
                }
                onClick={() => selectOpeningImage(index)}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                type="button"
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : { opacity: 1, y: 0, scale: 1 }
                }
              />
            }
          >
            <Image
              alt={image.alt}
              className="object-cover transition-transform duration-500 motion-reduce:transition-none motion-safe:group-hover:scale-[1.02]"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={image.src}
            />
          </DialogTrigger>
        ))}
      </div>

      <DialogContent
        className="inset-0 block h-dvh w-screen max-w-none translate-x-0 translate-y-0 overflow-hidden bg-background p-0 text-foreground shadow-none ring-0 motion-reduce:animate-none motion-reduce:transition-none sm:max-w-none"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Galería de imágenes</DialogTitle>
        <Carousel
          aria-label="Galería ampliada"
          className="grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] [&_[data-slot=carousel-content]]:h-full"
          opts={{
            align: "start",
            loop: false,
            startIndex: openingIndex,
            watchDrag: images.length > 1,
          }}
          setApi={setCarouselApi}
        >
          <CarouselContent className="ml-0 h-full">
            {images.map((image, index) => (
              <CarouselItem
                aria-label={`Imagen ${index + 1} de ${images.length}`}
                className="flex h-full items-center justify-center px-4 pt-16 pb-4 sm:px-8 sm:pt-20 sm:pb-8"
                key={image.src}
              >
                <div className="relative h-full min-h-0 w-full">
                  <Image
                    alt={image.alt}
                    className="object-contain"
                    fill
                    sizes="100vw"
                    src={image.src}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-center gap-4 border-border border-t bg-background px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <CarouselPrevious
              aria-label="Imagen anterior"
              className="static inset-auto my-0"
              variant="secondary"
            />
            <p
              aria-live="polite"
              className="min-w-16 text-center text-xs font-semibold tracking-widest text-muted-foreground tabular-nums"
            >
              {currentIndex + 1} / {images.length}
            </p>
            <CarouselNext
              aria-label="Imagen siguiente"
              className="static inset-auto my-0"
              variant="secondary"
            />
          </div>
        </Carousel>

        <DialogClose
          render={
            <Button
              aria-label="Cerrar galería"
              className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))]"
              size="icon"
              variant="secondary"
            />
          }
        >
          <XIcon aria-hidden="true" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
