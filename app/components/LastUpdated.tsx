type LastUpdatedProps = {
  className?: string;
  /** When set, shown instead of today’s UTC date (for consistent money-page freshness signals). */
  label?: string;
  /** When true, render label as the full line (no "Last updated:" prefix). */
  noteOnly?: boolean;
};

export function LastUpdated({ className, label, noteOnly = false }: LastUpdatedProps) {
  const formatted = label
    ? label
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date());

  if (noteOnly && label) {
    return <p className={className}>{label}</p>;
  }

  return <p className={className}>Last updated: {formatted}</p>;
}
