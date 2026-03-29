import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoSlugPage, {
  generateMetadata as generateSeoMetadata,
} from "@/app/seo/[slug]/page";
import type { RoleSlug } from "@/app/lib/seoPages";
import type { ResumeSeoTopic as Topic } from "@/app/lib/resumeTopicTypes";

type PageParams = {
  roleSlug: RoleSlug;
  topic: Topic;
};

const TOPICS = new Set<Topic>([
  "bullet-points",
  "skills",
  "summary",
  "responsibilities",
  "projects",
  "experience-examples",
]);

function buildLegacySeoSlug(roleSlug: RoleSlug, topic: Topic): string {
  if (topic === "bullet-points") {
    return `bullet-points-${roleSlug}-resume`;
  }
  return `${roleSlug}-resume-${topic}`;
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!TOPICS.has(params.topic)) return {};
  const slug = buildLegacySeoSlug(params.roleSlug, params.topic);
  const existing = await generateSeoMetadata({ params: { slug } });
  return {
    ...existing,
    alternates: {
      canonical: `/${params.roleSlug}/resume/${params.topic}`,
    },
  };
}

export default function RoleResumeTopicPage({ params }: { params: PageParams }) {
  if (!TOPICS.has(params.topic)) {
    notFound();
  }
  const slug = buildLegacySeoSlug(params.roleSlug, params.topic);
  return <SeoSlugPage params={{ slug }} />;
}
