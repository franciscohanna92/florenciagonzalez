import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Proyectos",
  description:
    "Proyectos de arquitectura residencial y comercial, reformas, interiores, mobiliario y visualización 3D en San Juan y otras ciudades.",
  path: "/proyectos",
});

export default function ProyectosPage() {
  return (
    <>
      <Container as="section" className="pt-12 pb-6 md:pt-20 md:pb-8">
        <SectionHeader
          emphasized
          intro="Cada proyecto muestra una forma distinta de resolver necesidades, usos y posibilidades reales. Algunos corresponden a obras finalizadas, otros a propuestas de diseño, visualizaciones 3D o procesos en desarrollo."
          title="Proyectos"
          titleAs="h1"
        />
      </Container>

      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              headingLevel="h2"
              key={project.slug}
              project={project}
            />
          ))}
        </Container>
      </section>

      <ContactCTA title="¿Tenés un proyecto parecido?" />
    </>
  );
}
