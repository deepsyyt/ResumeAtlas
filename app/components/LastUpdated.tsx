type LastUpdatedProps = {
  className?: string;
};

export function LastUpdated({ className }: LastUpdatedProps) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date());

  return <p className={className}>Last updated: {formatted}</p>;
}
