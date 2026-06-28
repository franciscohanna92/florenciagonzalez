import { Badge } from "@/components/ui/badge";

type ServiceCardProps = {
  title: string;
  text: string;
  items?: string[];
};

export function ServiceCard({ title, text, items }: ServiceCardProps) {
  return (
    <article className="border-border border-t pt-6">
      <h3 className="font-heading text-3xl leading-tight text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p>
      {items ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item}>
              <Badge variant="secondary">{item}</Badge>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
