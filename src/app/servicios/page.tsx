import {
  ArmchairIcon,
  BlueprintIcon,
  HouseLineIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { buttonVariants } from "@/components/ui/button";
import { featuredProjects } from "@/data/projects";
import { serviceGroups } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

const serviceIcons = [
  HouseLineIcon,
  StorefrontIcon,
  ArmchairIcon,
  BlueprintIcon,
] as const;

export const metadata = createPageMetadata({
  title: "Servicios de arquitectura e interiores",
  description:
    "Servicios de arquitectura en San Juan para viviendas, locales, interiores, mobiliario, renders, documentación, aprobaciones y dirección de obra.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <Container as="section" className="py-12 md:py-20">
        <SectionHeader
          eyebrow="Servicios"
          intro="Puedo acompañarte desde una idea inicial hasta la documentación y la obra. El alcance se define según el tipo de espacio, la etapa en la que estás y lo que necesitás resolver."
          title="Arquitectura y diseño según tu proyecto"
          titleAs="h1"
        />
      </Container>

      <section className="border-border border-b py-16 md:py-24">
        <Container className="grid gap-12 md:grid-cols-2">
          {serviceGroups.map((service, index) => (
            <ServiceCard
              headingLevel="h2"
              icon={serviceIcons[index]}
              items={service.items}
              key={service.title}
              text={service.detail}
              title={service.title}
            />
          ))}
        </Container>
      </section>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              intro="Estos trabajos muestran distintas escalas y formas de combinar diseño, visualización, documentación y ejecución."
              title="Proyectos relacionados"
            />
            <Link
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              href="/proyectos"
            >
              Ver todos los proyectos
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA title="¿Qué necesitás resolver en tu espacio?" />
    </>
  );
}
