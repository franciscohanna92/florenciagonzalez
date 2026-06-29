import {
  ArmchairIcon,
  BlueprintIcon,
  HouseLineIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
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
import {
  featuredProjects,
  getProjectCover,
  heroProject,
} from "@/data/projects";
import { processSteps, serviceGroups } from "@/lib/content";
import { placeholderImage } from "@/lib/placeholders";

const serviceIcons = [
  HouseLineIcon,
  StorefrontIcon,
  ArmchairIcon,
  BlueprintIcon,
] as const;

export const metadata: Metadata = {
  title: {
    absolute: "Florencia González | Arquitectura e interiores",
  },
  description:
    "Arquitectura, interiores, visualización 3D, documentación y dirección de obra para viviendas y espacios comerciales.",
};

export default function Home() {
  const heroCover = heroProject ? getProjectCover(heroProject) : undefined;

  return (
    <>
      <section className="bg-white">
        <Container className="grid gap-10 py-12 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-20">
          <div>
            <h1 className="max-w-3xl font-heading text-5xl leading-[1.02] font-semibold text-foreground sm:text-6xl lg:text-7xl">
              Diseño espacios desde la idea hasta la obra.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Trabajo en proyectos residenciales y comerciales, combinando
              arquitectura, interiorismo, documentación técnica, visualización
              3D y dirección de obra.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className={buttonVariants({ size: "lg" })} href="/contacto">
                Contame sobre tu proyecto
              </Link>
              <Link
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
                href="/proyectos"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          <div>
            {heroProject && heroCover ? (
              <Link
                aria-label={`Ver detalle de ${heroProject.title}`}
                className="block"
                href={`/proyectos/${heroProject.slug}`}
              >
                <ImagePlaceholder
                  alt={heroCover.alt}
                  className="aspect-[5/4]"
                  priority
                  src={heroCover.src}
                />
              </Link>
            ) : (
              <ImagePlaceholder
                alt="Placeholder de proyecto residencial"
                className="aspect-[5/4]"
                priority
                src={placeholderImage("1200x960", "Proyecto residencial")}
              />
            )}
          </div>
        </Container>
      </section>

      <section className="bg-background py-16 md:py-24">
        <Container>
          <SectionHeader
            emphasized
            intro="Cada proyecto puede empezar en un punto distinto: una idea, un terreno, un local, una reforma pendiente, una necesidad de aprobación o una obra que necesita ordenarse."
            title="Qué puedo hacer por tu espacio"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceGroups.map((service, index) => (
              <ServiceCard
                icon={serviceIcons[index]}
                key={service.title}
                text={service.summary}
                title={service.title}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              emphasized
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

      <section className="bg-muted py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            emphasized
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
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-24">
          <ImagePlaceholder
            alt="Retrato de Florencia González"
            className="aspect-[3/4]"
            src="/images/profile.jpeg"
          />
          <div>
            <SectionHeader emphasized title="Sobre mí" />
            <div className="mt-6 flex flex-col gap-4 text-base leading-7 text-muted-foreground">
              <p>
                Soy arquitecta y trabajo en proyectos residenciales y
                comerciales, desde el diseño inicial hasta la documentación y la
                dirección de obra.
              </p>
              <p>
                Me interesa crear espacios simples, cálidos y funcionales, con
                una estética cuidada y decisiones pensadas para la vida real.
                Creo que un buen proyecto no solo tiene que verse bien: también
                tiene que poder construirse, usarse y sostenerse en el tiempo.
              </p>
              <p>
                En cada trabajo busco ordenar ideas, resolver necesidades
                concretas y acompañar el proceso con claridad, criterio y
                atención al detalle.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA emphasized />
    </>
  );
}
