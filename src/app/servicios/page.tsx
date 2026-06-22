import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { serviceGroups } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Servicios de arquitectura, interiores, documentación, visualización 3D, aprobaciones, habilitaciones y dirección de obra.",
};

export default function ServiciosPage() {
  return (
    <>
      <Container as="section" className="py-12 md:py-20">
        <SectionHeader
          intro="Cada proyecto tiene su propio punto de partida. Podés consultarme por una idea inicial, una casa desde cero, una reforma, un local comercial, una necesidad de documentación, una aprobación, una habilitación, renders o acompañamiento en obra."
          title="Servicios"
          titleAs="h1"
        />
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted">
          Trabajo el alcance según lo que necesitás resolver, con una mirada que
          combina diseño, funcionalidad, criterio técnico y posibilidades reales
          de ejecución.
        </p>
      </Container>

      <section className="border-border border-t bg-surface py-16 md:py-24">
        <Container className="grid gap-12">
          {serviceGroups.map((service) => (
            <ServiceCard
              items={service.items}
              key={service.title}
              text={service.detail}
              title={service.title}
            />
          ))}
        </Container>
      </section>

      <ContactCTA
        buttonLabel="Contame qué necesitás resolver"
        title="¿Querés ordenar el alcance?"
      />
    </>
  );
}
