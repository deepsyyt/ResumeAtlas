import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { generateRoleResumeTopicLegacyMetadata } from "@/app/components/resumeTopicGuide";
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

export function generateMetadata({
  params,
}: {
  params: PageParams;
}): Metadata {
  if (!TOPICS.has(params.topic)) return {};
  const existing = generateRoleResumeTopicLegacyMetadata(params.roleSlug, params.topic);
  const indexed = isRoleResumeTopicIndexed(params.topic);
  const pillarBase = absoluteCanonicalUrl(roleResumeExamplePath(params.roleSlug));
  return {
    ...existing,
    alternates: {
      canonical: pillarBase,
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
