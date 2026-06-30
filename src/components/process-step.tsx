type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
  headingLevel?: "h2" | "h3";
};

export function ProcessStep({
  number,
  title,
  text,
  headingLevel: Heading = "h3",
}: ProcessStepProps) {
  return (
    <article className="grid gap-4 border-border border-t pt-6 sm:grid-cols-[5rem_1fr]">
      <span className="font-heading text-3xl text-highlight">{number}</span>
      <div>
        <Heading className="text-xl font-semibold text-foreground">
          {title}
        </Heading>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </article>
  );
}
