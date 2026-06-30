import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProcessStep } from "@/components/process-step";
import { SectionHeader } from "@/components/section-header";
import { processSteps } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Cómo trabajo",
  description:
    "Conocé las etapas de un proyecto de arquitectura: consulta, relevamiento, propuesta, desarrollo, gestión de obra y cierre.",
  path: "/como-trabajo",
});

export default function ComoTrabajoPage() {
  return (
    <>
      <Container as="section" className="py-12 md:py-20">
        <SectionHeader
          eyebrow="Proceso"
          intro="Un proceso claro permite ordenar decisiones, anticipar necesidades y entender qué se desarrolla en cada etapa. El recorrido se adapta al alcance real de tu proyecto."
          title="Cómo trabajo"
          titleAs="h1"
        />
      </Container>

      <section className="border-border border-y bg-muted py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
              Etapas del proyecto
            </h2>
            <p className="mt-5 max-w-md leading-7 text-muted-foreground">
              No todos los encargos necesitan el mismo recorrido. Estas etapas
              ayudan a definir qué información, entregables y acompañamiento
              hacen falta.
            </p>
          </div>
          <div className="grid gap-8">
            {processSteps.map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                text={step.detail}
                title={step.title}
              />
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA title="Empecemos por una consulta" />
    </>
  );
}
