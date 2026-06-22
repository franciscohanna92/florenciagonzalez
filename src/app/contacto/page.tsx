import type { Metadata } from "next";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import {
  projectStatusOptions,
  projectTypeOptions,
  siteConfig,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacto para consultas de arquitectura, interiores, reformas, locales comerciales, documentación, visualización 3D y dirección de obra.",
};

export default function ContactoPage() {
  return (
    <Container
      as="section"
      className="grid gap-12 py-12 md:grid-cols-[0.8fr_1.2fr] md:py-20"
    >
      <div>
        <SectionHeader
          intro="Para empezar, contame qué tipo de proyecto tenés en mente, en qué etapa estás y qué necesitás resolver. Con esa información puedo orientarte mejor sobre el alcance y los próximos pasos."
          title="Contame qué querés proyectar"
          titleAs="h1"
        />

        <dl className="mt-10 space-y-4 border-border border-t pt-6 text-sm">
          <div>
            <dt className="font-semibold text-foreground">Ubicación</dt>
            <dd className="mt-1 text-muted">{siteConfig.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Modalidad</dt>
            <dd className="mt-1 text-muted">{siteConfig.remoteWork}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">WhatsApp</dt>
            <dd className="mt-1">
              <a
                className="text-accent-strong underline-offset-4 hover:underline"
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
            <dd className="mt-1 text-muted">{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Instagram</dt>
            <dd className="mt-1 text-muted">{siteConfig.instagram}</dd>
          </div>
        </dl>
      </div>

      <form className="grid gap-5 rounded-xl border-border border bg-surface p-5 sm:p-8">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-foreground" htmlFor="name">
            Nombre
          </label>
          <input
            className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            id="name"
            name="name"
            type="text"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="phone"
            >
              Teléfono / WhatsApp
            </label>
            <input
              className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
              id="phone"
              name="phone"
              type="tel"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="project-type"
            >
              Tipo de proyecto
            </label>
            <select
              className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
              id="project-type"
              name="project-type"
            >
              {projectTypeOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <label
              className="text-sm font-medium text-foreground"
              htmlFor="location"
            >
              Ubicación del proyecto
            </label>
            <input
              className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
              id="location"
              name="location"
              type="text"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="current-status"
          >
            Estado actual
          </label>
          <select
            className="min-h-11 rounded-lg border border-border bg-background px-3 text-foreground"
            id="current-status"
            name="current-status"
          >
            {projectStatusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <label
            className="text-sm font-medium text-foreground"
            htmlFor="message"
          >
            Mensaje
          </label>
          <textarea
            className="min-h-36 resize-y rounded-lg border border-border bg-background px-3 py-3 text-foreground"
            id="message"
            name="message"
          />
        </div>

        <div className="flex flex-col gap-3 border-border border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Button
            href={siteConfig.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            Enviar consulta
          </Button>
          <p className="text-sm leading-6 text-muted">
            También podés escribirme directamente por WhatsApp.
          </p>
        </div>
      </form>
    </Container>
  );
}
