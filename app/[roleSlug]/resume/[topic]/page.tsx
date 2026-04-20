import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { generateMetadata as generateSeoMetadata } from "@/app/seo/[slug]/page";
import type { RoleSlug } from "@/app/lib/seoPages";
import type { ResumeSeoTopic as Topic } from "@/app/lib/resumeTopicTypes";
import { isRoleResumeTopicIndexed } from "@/app/lib/roleClusterIndexPolicy";
import { absoluteCanonicalUrl, roleResumeExamplePath } from "@/app/lib/searchIntentSeo";

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

function canonicalTargetForTopic(roleSlug: RoleSlug, topic: Topic): string {
  const examplePath = roleResumeExamplePath(roleSlug);
  switch (topic) {
    case "skills":
      return `${examplePath}#skills`;
    case "summary":
      return `${examplePath}#summary`;
    case "projects":
      return `${examplePath}#projects`;
    case "bullet-points":
    case "responsibilities":
    case "experience-examples":
      return `${examplePath}#bullet-points`;
    default:
      return examplePath;
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  if (!TOPICS.has(params.topic)) return {};
  const slug = buildLegacySeoSlug(params.roleSlug, params.topic);
  const existing = await generateSeoMetadata({ params: { slug } });
  const indexed = isRoleResumeTopicIndexed(params.topic);
  const mergedAnchor =
    params.topic === "bullet-points"
      ? "bullet-points"
      : params.topic === "skills"
        ? "skills"
        : params.topic === "summary"
          ? "summary"
          : params.topic === "projects"
            ? "projects"
            : null;
  const exampleBase = absoluteCanonicalUrl(roleResumeExamplePath(params.roleSlug));
  return {
    ...existing,
    alternates: {
      canonical: mergedAnchor
        ? `${exampleBase}#${mergedAnchor}`
        : absoluteCanonicalUrl(`/${params.roleSlug}/resume/${params.topic}`),
    },
    ...(indexed
      ? {}
      : {
          robots: { index: false, follow: true },
        }),
  };
}

export default function RoleResumeTopicPage({ params }: { params: PageParams }) {
  if (!TOPICS.has(params.topic)) {
    notFound();
  }
  permanentRedirect(canonicalTargetForTopic(params.roleSlug, params.topic));
}
