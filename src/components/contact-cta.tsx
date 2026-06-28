import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type ContactCTAProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function ContactCTA({
  title = "¿Tenés un proyecto en mente?",
  text = "Si querés construir, remodelar, abrir un local o mejorar un espacio existente, contame en qué etapa estás y qué necesitás resolver.",
  buttonLabel = "Contame qué querés proyectar",
}: ContactCTAProps) {
  return (
    <section className="bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <h2 className="font-heading text-4xl leading-tight sm:text-5xl">
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
