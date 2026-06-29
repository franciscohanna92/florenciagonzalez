import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { ProjectGallery } from "@/components/project-gallery";
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

  const title = `${project.title} | Proyectos`;
  const description = `${project.title}, proyecto de ${project.category.toLowerCase()} en ${project.location}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const editorialSections = [
    ["Necesidad inicial", project.challenge],
    ["Solución propuesta", project.solution],
    ["Resultado / estado actual", project.result],
  ].filter(([, text]) => text.trim());

  return (
    <>
      <Container as="section" className="flex flex-col py-12 md:py-20">
        <Link
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          href="/proyectos"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4 shrink-0" />
          Proyectos
        </Link>
        <h1 className="mt-8 max-w-4xl font-heading text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
          {project.title}
        </h1>
        <div className="mt-10">
          <ProjectMeta includeLocation project={project} />
        </div>
      </Container>

      {editorialSections.length > 0 ? (
        <section className="border-border border-y bg-card py-16 text-card-foreground md:py-24">
          <Container className="grid gap-10 md:grid-cols-3">
            {editorialSections.map(([title, text]) => (
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
      ) : null}

      <Container as="section" className="py-8 md:py-8">
        <ProjectGallery images={project.images} />
      </Container>

      <ContactCTA title="¿Tenés un proyecto parecido?" />
    </>
  );
}
