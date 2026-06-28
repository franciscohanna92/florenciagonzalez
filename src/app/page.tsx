import type { Metadata } from "next";
import Link from "next/link";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ProcessStep } from "@/components/process-step";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";
import { processSteps, serviceGroups } from "@/lib/content";
import { placeholderImage } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: {
    absolute: "Florencia González | Arquitectura e interiores",
  },
  description:
    "Arquitectura, interiores, visualización 3D, documentación y dirección de obra para viviendas y espacios comerciales.",
};

export default function Home() {
  return (
    <>
      <Container
        as="section"
        className="grid gap-10 py-12 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-20"
      >
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Arquitectura e interiores
          </p>
          <h1 className="max-w-3xl font-heading text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            Diseño espacios desde la idea hasta la obra.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Trabajo en proyectos residenciales y comerciales, combinando
            arquitectura, interiorismo, documentación técnica, visualización 3D
            y dirección de obra.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Casas, reformas, locales comerciales, interiores, mobiliario,
            aprobaciones y acompañamiento en obra.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className={buttonVariants({ size: "lg" })} href="/contacto">
              Contame qué querés proyectar
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              href="/proyectos"
            >
              Ver proyectos
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <ImagePlaceholder
            alt="Placeholder de proyecto residencial"
            className="aspect-[5/4]"
            label="Proyecto residencial"
            priority
            src={placeholderImage("1200x960", "Proyecto residencial")}
          />
          <div className="grid grid-cols-2 gap-4">
            <ImagePlaceholder
              alt="Placeholder de interiorismo"
              className="aspect-[4/3]"
              label="Interiorismo"
              src={placeholderImage("700x520", "Interiorismo", {
                background: "dce0d3",
              })}
            />
            <ImagePlaceholder
              alt="Placeholder de local comercial"
              className="aspect-[4/3]"
              label="Local comercial"
              src={placeholderImage("700x520", "Local comercial", {
                background: "ead2c8",
              })}
            />
          </div>
        </div>
      </Container>

      <section className="border-border border-t bg-card py-16 text-card-foreground md:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              intro="Cada proyecto puede empezar en un punto distinto: una idea, un terreno, un local, una reforma pendiente, una necesidad de aprobación o una obra que necesita ordenarse."
              title="Qué puedo hacer por tu espacio"
            />
            <Link
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "max-w-max",
              })}
              href="/servicios"
            >
              Ver servicios
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGroups.map((service) => (
              <ServiceCard
                key={service.title}
                text={service.summary}
                title={service.title}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              intro="Una selección de trabajos residenciales y comerciales, con proyectos diseñados, obras finalizadas, visualizaciones 3D y detalles de proceso."
              title="Proyectos destacados"
            />
            <Link
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "max-w-max",
              })}
              href="/proyectos"
            >
              Ver todos los proyectos
            </Link>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border border-y bg-card py-16 text-card-foreground md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            intro="Me gusta que el proceso sea claro desde el principio. Por eso ordeno cada proyecto en etapas, para tomar decisiones con información, criterio y una idea concreta de lo que se va a desarrollar."
            title="Cómo trabajo"
          />
          <div className="grid gap-7">
            {processSteps.slice(0, 5).map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                text={step.short}
                title={step.title}
              />
            ))}
            <Link
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "max-w-max",
              })}
              href="/como-trabajo"
            >
              Conocer el proceso
            </Link>
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24"
      >
        <ImagePlaceholder
          alt="Placeholder de perfil profesional"
          className="aspect-[4/5]"
          label="Sobre mí"
          src={placeholderImage("900x1125", "Perfil profesional", {
            background: "dce0d3",
          })}
        />
        <div>
          <SectionHeader title="Sobre mí" />
          <div className="mt-6 flex flex-col gap-4 text-base leading-7 text-muted-foreground">
            <p>
              Soy arquitecta y trabajo en proyectos residenciales y comerciales,
              desde el diseño inicial hasta la documentación y la dirección de
              obra.
            </p>
            <p>
              Me interesa crear espacios simples, cálidos y funcionales, con una
              estética cuidada y decisiones pensadas para la vida real. Creo que
              un buen proyecto no solo tiene que verse bien: también tiene que
              poder construirse, usarse y sostenerse en el tiempo.
            </p>
            <p>
              En cada trabajo busco ordenar ideas, resolver necesidades
              concretas y acompañar el proceso con claridad, criterio y atención
              al detalle.
            </p>
          </div>
          <Link
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "mt-8",
            })}
            href="/sobre-mi"
          >
            Conocer más
          </Link>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
