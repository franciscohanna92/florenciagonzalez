import type { Icon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";

type ServiceCardProps = {
  icon: Icon;
  title: string;
  text: string;
  items?: string[];
  headingLevel?: "h2" | "h3";
};

export function ServiceCard({
  icon: Icon,
  title,
  text,
  items,
  headingLevel: Heading = "h3",
}: ServiceCardProps) {
  return (
    <article className="border-border border-t pt-6">
      <Icon
        aria-hidden="true"
        className="size-7 text-highlight"
        weight="light"
      />
      <Heading className="mt-4 font-heading text-3xl leading-tight text-foreground">
        {title}
      </Heading>
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
