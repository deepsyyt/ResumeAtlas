type LastUpdatedProps = {
  className?: string;
  /** When set, shown instead of today’s UTC date (for consistent money-page freshness signals). */
  label?: string;
};

export function LastUpdated({ className, label }: LastUpdatedProps) {
  const formatted = label
    ? label
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      }).format(new Date());

  return <p className={className}>Last updated: {formatted}</p>;
}
