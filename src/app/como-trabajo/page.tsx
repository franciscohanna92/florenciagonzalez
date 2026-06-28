import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProcessStep } from "@/components/process-step";
import { SectionHeader } from "@/components/section-header";
import { processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cómo trabajo",
  description:
    "Proceso de trabajo para proyectos de arquitectura, interiores, documentación, visualización y obra.",
};

export default function ComoTrabajoPage() {
  return (
    <>
      <Container as="section" className="py-12 md:py-20">
        <SectionHeader
          intro="Cada proyecto necesita orden, escucha y decisiones claras. Mi forma de trabajo busca que entiendas qué se está definiendo en cada etapa, qué información necesitamos y cómo avanzar sin perder de vista el uso real del espacio."
          title="Cómo trabajo"
          titleAs="h1"
        />
      </Container>

      <section className="border-border border-t bg-card py-16 text-card-foreground md:py-24">
        <Container className="grid gap-7">
          {processSteps.map((step) => (
            <ProcessStep
              key={step.number}
              number={step.number}
              text={step.detail}
              title={step.title}
            />
          ))}
        </Container>
      </section>

      <ContactCTA
        buttonLabel="Empecemos por una consulta"
        title="¿Querés empezar con una consulta?"
      />
    </>
  );
}
