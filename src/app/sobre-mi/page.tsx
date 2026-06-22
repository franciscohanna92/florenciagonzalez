import type { Metadata } from "next";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/content";
import { placeholderImage } from "@/lib/placeholders";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Perfil profesional de Florencia González, arquitectura e interiores en San Juan, Argentina.",
};

export default function SobreMiPage() {
  return (
    <>
      <Container
        as="section"
        className="grid gap-10 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:py-20"
      >
        <ImagePlaceholder
          alt="Placeholder de foto de perfil profesional"
          className="aspect-[4/5]"
          label="Perfil profesional"
          priority
          src={placeholderImage("900x1125", "Foto de perfil", {
            background: "dce0d3",
          })}
        />
        <div>
          <SectionHeader title="Sobre mí" titleAs="h1" />
          <div className="mt-6 space-y-4 text-base leading-7 text-muted">
            <p>
              Soy arquitecta y trabajo en proyectos residenciales y comerciales,
              combinando diseño arquitectónico, interiorismo, documentación
              técnica, visualización 3D y dirección de obra.
            </p>
            <p>
              Me interesan los espacios simples, cálidos y bien resueltos. Busco
              que cada decisión tenga una razón: la luz, los materiales, la
              circulación, el uso cotidiano, la escala, el guardado y los
              detalles que hacen que un lugar funcione mejor.
            </p>
            <p>
              Creo que un buen proyecto no solo tiene que verse bien. También
              tiene que poder construirse, usarse y sostenerse en el tiempo.
            </p>
            <p>
              Trabajo de forma cercana y ordenada, acompañando cada etapa con
              claridad, criterio técnico y atención al detalle.
            </p>
          </div>

          <dl className="mt-10 grid gap-4 border-border border-t pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">Matrícula</dt>
              <dd className="mt-1 text-muted">[completar]</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Formación</dt>
              <dd className="mt-1 text-muted">[completar]</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Ubicación</dt>
              <dd className="mt-1 text-muted">{siteConfig.location}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Modalidad</dt>
              <dd className="mt-1 text-muted">{siteConfig.remoteWork}</dd>
            </div>
          </dl>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
