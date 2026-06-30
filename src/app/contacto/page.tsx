import { ContactForm } from "@/components/contact-form";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import {
  projectStatusOptions,
  projectTypeOptions,
  siteConfig,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contacto",
  description:
    "Contactá a Florencia González por proyectos de arquitectura, interiores, reformas, locales, visualización 3D y dirección de obra en San Juan.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Container
      as="section"
      className="grid gap-12 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-20"
    >
      <div>
        <SectionHeader
          intro="Para empezar, contame qué tipo de proyecto tenés en mente, en qué etapa estás y qué necesitás resolver. Con esa información puedo orientarte mejor sobre el alcance y los próximos pasos."
          title="Contame sobre tu proyecto"
          titleAs="h1"
        />

        <dl className="mt-10 flex flex-col gap-4 border-border border-t pt-6 text-sm">
          <div>
            <dt className="font-semibold text-foreground">Ubicación</dt>
            <dd className="mt-1 text-muted-foreground">
              {siteConfig.location}. {siteConfig.remoteWork}.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">WhatsApp</dt>
            <dd className="mt-1">
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={siteConfig.whatsappHref}
                rel="noreferrer"
                target="_blank"
              >
                {siteConfig.whatsapp}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Email</dt>
            <dd className="mt-1">
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={siteConfig.emailHref}
              >
                {siteConfig.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Instagram</dt>
            <dd className="mt-1">
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={siteConfig.instagramHref}
                rel="noreferrer"
                target="_blank"
              >
                {siteConfig.instagram}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <ContactForm
        projectStatusOptions={projectStatusOptions}
        projectTypeOptions={projectTypeOptions}
        whatsappPhone={siteConfig.whatsapp}
      />
    </Container>
  );
}
