import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { ProjectMeta } from "@/components/project-meta";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    };
  }

  return {
    title: `${project.title} | Proyectos`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const [cover, ...gallery] = project.images;

  return (
    <>
      <Container
        as="section"
        className="grid gap-10 py-12 md:grid-cols-[1fr_0.8fr] md:items-end md:py-20"
      >
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {project.category}
          </p>
          <h1 className="max-w-4xl font-heading text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
        </div>
        <div>
          <ProjectMeta includeLocation project={project} />
        </div>
      </Container>

      <Container as="section" className="pb-16 md:pb-24">
        <ImagePlaceholder
          alt={cover.alt}
          className="aspect-[16/10]"
          label={project.status}
          priority
          src={cover.src}
        />
      </Container>

      <section className="border-border border-y bg-card py-16 text-card-foreground md:py-24">
        <Container className="grid gap-10 md:grid-cols-3">
          {[
            ["Necesidad inicial", project.challenge],
            ["Solución propuesta", project.solution],
            ["Resultado / estado actual", project.result],
          ].map(([title, text]) => (
            <article className="border-border border-t pt-6" key={title}>
              <h2 className="font-heading text-3xl leading-tight text-foreground">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </Container>
      </section>

      <Container as="section" className="py-16 md:py-24">
        <h2 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl">
          Galería
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {gallery.map((image) => (
            <ImagePlaceholder
              alt={image.alt}
              className="aspect-[4/3] rounded-none border-0 bg-foreground shadow-[0_24px_70px_rgba(45,41,38,0.18)]"
              key={image.src}
              reveal
              src={image.src}
            />
          ))}
        </div>
      </Container>

      <ContactCTA title="¿Tenés un proyecto parecido?" />
    </>
  );
}
