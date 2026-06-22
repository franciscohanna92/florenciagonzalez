import type { Project } from "@/data/projects";

type ProjectMetaProps = {
  project: Project;
  includeLocation?: boolean;
};

export function ProjectMeta({
  project,
  includeLocation = false,
}: ProjectMetaProps) {
  const meta = [
    ["Categoría", project.category],
    ["Año", project.year],
    ...(includeLocation ? [["Ubicación", project.location]] : []),
  ];

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      {meta.map(([label, value]) => (
        <div className="border-border border-t pt-3" key={label}>
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {label}
          </dt>
          <dd className="mt-1 font-medium text-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
