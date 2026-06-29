"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  projectStatusOptions: readonly string[];
  projectTypeOptions: readonly string[];
  whatsappPhone: string;
};

function getFormValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function ContactForm({
  projectStatusOptions,
  projectTypeOptions,
  whatsappPhone,
}: ContactFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const message = [
      "Hola Florencia, quiero hacer una consulta.",
      "",
      `Nombre: ${getFormValue(formData, "name")}`,
      `Tipo de proyecto: ${getFormValue(formData, "project-type")}`,
      `Estado actual: ${getFormValue(formData, "current-status")}`,
      `Mensaje: ${getFormValue(formData, "message")}`,
    ].join("\n");
    const whatsappUrl = new URL("https://api.whatsapp.com/send");

    whatsappUrl.searchParams.set("phone", whatsappPhone.replace(/\D/g, ""));
    whatsappUrl.searchParams.set("text", message);

    window.open(whatsappUrl.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      className="rounded-none border border-border bg-card p-5 text-card-foreground sm:p-8"
      onSubmit={handleSubmit}
    >
      <FieldGroup className="gap-5">
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input id="name" name="name" type="text" />
        </Field>

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
          <Textarea className="min-h-36 resize-y" id="message" name="message" />
        </Field>

        <Button className="self-start" size="lg" type="submit">
          Enviar consulta
        </Button>
      </FieldGroup>
    </form>
  );
}
