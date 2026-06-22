type ServiceCardProps = {
  title: string;
  text: string;
  items?: string[];
};

export function ServiceCard({ title, text, items }: ServiceCardProps) {
  return (
    <article className="border-border border-t pt-6">
      <h3 className="font-[var(--display)] text-3xl leading-tight text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted">{text}</p>
      {items ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              className="rounded-lg border-border border bg-surface px-3 py-1 text-xs text-muted"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
