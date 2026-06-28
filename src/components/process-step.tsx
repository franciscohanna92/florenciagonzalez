type ProcessStepProps = {
  number: string;
  title: string;
  text: string;
};

export function ProcessStep({ number, title, text }: ProcessStepProps) {
  return (
    <article className="grid gap-4 border-border border-t pt-6 sm:grid-cols-[5rem_1fr]">
      <span className="font-heading text-3xl text-primary">{number}</span>
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
    </article>
  );
}
