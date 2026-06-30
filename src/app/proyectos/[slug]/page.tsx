import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCTA } from "@/components/contact-cta";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectMeta } from "@/components/project-meta";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import {
  getProjectBySlug,
  getProjectCover,
  getProjectSummary,
  getRelatedProjects,
  projects,
} from "@/data/projects";
import { absoluteUrl, createPageMetadata } from "@/lib/seo";

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
  const description =
    getProjectSummary(project) ||
    `${project.title}: proyecto de ${project.category.toLowerCase()} en ${project.location}, con servicios de ${project.services.join(", ").toLowerCase()}.`;

  return createPageMetadata({
    title,
    description,
    path: `/proyectos/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const summary = getProjectSummary(project);
  const relatedProjects = getRelatedProjects(project);
  const cover = getProjectCover(project);

  const editorialSections = [
    ["Necesidad inicial", project.challenge],
    ["Solución propuesta", project.solution],
    ["Resultado / estado actual", project.result],
  ].filter(([, text]) => text.trim());

  const projectId = absoluteUrl(`/proyectos/${project.slug}#proyecto`);
  const breadcrumbId = absoluteUrl(`/proyectos/${project.slug}#migas-de-pan`);
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": projectId,
        url: absoluteUrl(`/proyectos/${project.slug}`),
        name: project.title,
        ...(summary ? { description: summary } : {}),
        creator: { "@id": absoluteUrl("/#florencia-gonzalez") },
        dateCreated: project.year,
        genre: project.category,
        keywords: project.services,
        contentLocation: {
          "@type": "Place",
          name: project.location,
        },
        ...(cover ? { image: absoluteUrl(cover.src) } : {}),
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Proyectos",
            item: absoluteUrl("/proyectos"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: project.title,
            item: absoluteUrl(`/proyectos/${project.slug}`),
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <Container
        as="section"
        className="flex flex-col pt-12 pb-4 md:pt-20 md:pb-6"
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/proyectos" />}>
                Proyectos
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{project.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-8 max-w-4xl font-heading text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
          {project.title}
        </h1>
        {summary ? (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {summary}
          </p>
        ) : null}
        <div className="mt-10">
          <ProjectMeta includeLocation project={project} />
        </div>
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-foreground">
            Servicios realizados
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {project.services.map((service) => (
              <li key={service}>
                <Badge variant="secondary">{service}</Badge>
              </li>
            ))}
          </ul>
          <Link
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            href="/servicios"
          >
            Ver servicios
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Link>
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
        <h2 className="sr-only">Galería de {project.title}</h2>
        <ProjectGallery images={project.images} />
      </Container>

      {relatedProjects.length > 0 ? (
        <section className="bg-muted py-16 md:py-24">
          <Container>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeader
                intro="Otros trabajos con una escala, categoría o contexto relacionado."
                title="Proyectos relacionados"
              />
              <Link
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className: "max-w-max",
                })}
                href="/proyectos"
              >
                Ver todos
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard
                  key={relatedProject.slug}
                  project={relatedProject}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <ContactCTA title="¿Tenés un proyecto parecido?" />
    </>
  );
}
