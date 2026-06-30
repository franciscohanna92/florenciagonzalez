import Link from "next/link";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sobre mí",
  description:
    "Conocé a Florencia González, arquitecta en San Juan dedicada a viviendas, espacios comerciales, interiores, documentación y dirección de obra.",
  path: "/sobre-mi",
});

export default function SobreMiPage() {
  return (
    <>
      <Container className="grid gap-12 py-12 md:grid-cols-[0.85fr_1.15fr] md:items-start md:py-20">
        <ImagePlaceholder
          alt="Retrato de la arquitecta Florencia González"
          className="aspect-[3/4]"
          priority
          src="/images/profile.jpeg"
        />
        <div>
          <SectionHeader
            eyebrow="Sobre mí"
            intro="Soy arquitecta y trabajo en proyectos residenciales y comerciales desde San Juan, con acompañamiento presencial o a distancia según el alcance."
            title="Diseño espacios claros, cálidos y posibles de construir"
            titleAs="h1"
          />
          <div className="mt-8 flex max-w-2xl flex-col gap-5 leading-7 text-muted-foreground">
            <p>
              Trabajo desde el diseño inicial hasta la documentación y la
              dirección de obra. Me interesa que cada decisión responda a la
              forma de usar el espacio, sus condiciones reales y los recursos
              disponibles.
            </p>
            <p>
              Busco una arquitectura simple y funcional, con materiales,
              iluminación, circulación y detalles pensados en conjunto. Un buen
              proyecto no solo tiene que verse bien: también tiene que poder
              construirse, usarse y sostenerse en el tiempo.
            </p>
            <p>
              En cada trabajo acompaño el proceso con claridad, criterio y
              atención al detalle, definiendo el alcance adecuado para cada
              etapa.
            </p>
          </div>
          <dl className="mt-10 grid gap-4 border-border border-t pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-foreground">Ubicación</dt>
              <dd className="mt-1 text-muted-foreground">
                {siteConfig.location}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Modalidad</dt>
              <dd className="mt-1 text-muted-foreground">
                {siteConfig.remoteWork}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className={buttonVariants({ size: "lg" })} href="/servicios">
              Ver servicios
            </Link>
            <Link
              className={buttonVariants({ variant: "secondary", size: "lg" })}
              href="/contacto"
            >
              Contame sobre tu proyecto
            </Link>
          </div>
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
