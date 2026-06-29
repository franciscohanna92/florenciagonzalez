import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContactCTAProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  emphasized?: boolean;
};

export function ContactCTA({
  title = "¿Tenés un proyecto en mente?",
  text = "Si querés construir, remodelar, abrir un local o mejorar un espacio existente, contame en qué etapa estás y qué necesitás resolver.",
  buttonLabel = "Contame qué querés proyectar",
  emphasized = false,
}: ContactCTAProps) {
  return (
    <section className="bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-14 sm:px-8 lg:px-10">
        <div>
          <h2
            className={cn(
              "font-heading text-4xl leading-tight sm:text-5xl",
              emphasized && "font-semibold",
            )}
          >
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-brand-foreground/80 sm:text-base">
            {text}
          </p>
        </div>
        <Link
          className={buttonVariants({ variant: "secondary", size: "lg" })}
          href="/contacto"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
