import type { RoleContent } from "@/app/lib/roleContentMap";

const CLUSTER_LABELS: Record<string, string> = {
  backend: "Backend keywords",
  frontend: "Frontend keywords",
  devops: "DevOps / platform keywords",
  data: "Data & analytics keywords",
  tools: "Tools",
  concepts: "Concepts & practices",
};

type Props = {
  roleName: string;
  title: string;
  roleContent: RoleContent;
};

export function RoleKeywordClustersSection({ roleName, title, roleContent }: Props) {
  const clusters = roleContent.keywordClusters;
  if (!clusters) return null;

  const entries = Object.entries(clusters).filter(([, items]) => items && items.length > 0);
  if (entries.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        Grouped {roleName.toLowerCase()} resume keywords recruiters and ATS match to specialized job
        descriptions.
      </p>
      <div
        className={`mt-5 grid grid-cols-1 gap-4 ${
          entries.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {entries.map(([key, items]) => (
          <div key={key} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              {CLUSTER_LABELS[key] ?? key.replace(/-/g, " ")}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {items!.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
