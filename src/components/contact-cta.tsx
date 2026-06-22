import { Button } from "@/components/button";

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
    <section className="bg-olive text-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <h2 className="font-[var(--display)] text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-surface/80 sm:text-base">
            {text}
          </p>
        </div>
        <Button
          className="border-surface hover:bg-accent-soft"
          href="/contacto"
          variant="secondary"
        >
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
