import type { Metadata } from "next";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
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

        <dl className="mt-10 flex flex-col gap-4 border-border border-t pt-6 text-sm">
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
            <dd className="mt-1 text-muted-foreground">{siteConfig.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Instagram</dt>
            <dd className="mt-1 text-muted-foreground">
              {siteConfig.instagram}
            </dd>
          </div>
        </dl>
      </div>

      <form className="rounded-none border border-border bg-card p-5 text-card-foreground sm:p-8">
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel htmlFor="name">Nombre</FieldLabel>
            <Input id="name" name="name" type="text" />
          </Field>

          <FieldGroup className="gap-5 sm:grid sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Teléfono / WhatsApp</FieldLabel>
              <Input id="phone" name="phone" type="tel" />
            </Field>
          </FieldGroup>

          <FieldGroup className="gap-5 sm:grid sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="project-type">Tipo de proyecto</FieldLabel>
              <NativeSelect
                className="w-full"
                id="project-type"
                name="project-type"
              >
                {projectTypeOptions.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="location">Ubicación del proyecto</FieldLabel>
              <Input id="location" name="location" type="text" />
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="current-status">Estado actual</FieldLabel>
            <NativeSelect
              className="w-full"
              id="current-status"
              name="current-status"
            >
              {projectStatusOptions.map((option) => (
                <NativeSelectOption key={option} value={option}>
                  {option}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Mensaje</FieldLabel>
            <Textarea
              className="min-h-36 resize-y"
              id="message"
              name="message"
            />
          </Field>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              className={buttonVariants({ size: "lg" })}
              href={siteConfig.whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              Enviar consulta
            </a>
            <p className="text-sm leading-6 text-muted-foreground">
              También podés escribirme directamente por WhatsApp.
            </p>
          </div>
        </FieldGroup>
      </form>
    </Container>
  );
}
