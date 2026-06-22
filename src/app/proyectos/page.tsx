import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Portfolio de proyectos residenciales y comerciales, reformas, interiores, mobiliario, visualización 3D y dirección de obra.",
};

export default function ProyectosPage() {
  return (
    <>
      <Container as="section" className="py-12 md:py-20">
        <SectionHeader
          intro="Cada proyecto muestra una forma distinta de resolver necesidades, usos y posibilidades reales. Algunos corresponden a obras finalizadas, otros a propuestas de diseño, visualizaciones 3D o procesos en desarrollo."
          title="Proyectos"
          titleAs="h1"
        />
      </Container>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Container>
      </section>

      <ContactCTA title="¿Tenés un proyecto parecido?" />
    </>
  );
}
