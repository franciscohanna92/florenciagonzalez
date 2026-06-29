import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  titleAs?: "h1" | "h2";
  className?: string;
  emphasized?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  titleAs = "h2",
  className,
  emphasized = false,
}: SectionHeaderProps) {
  const Heading = titleAs;

  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-heading text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl",
          emphasized && "font-semibold",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
