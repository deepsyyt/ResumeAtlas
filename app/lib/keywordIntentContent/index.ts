import type { RoleSlug } from "@/app/lib/seoPages";
import type { RoleKeywordIntent } from "@/app/lib/roleSeo";
import type { KeywordIntentContent } from "./types";
import { CORE_KEYWORDS_BY_ROLE } from "./data/core-keywords";
import { TECHNICAL_SKILLS_BY_ROLE } from "./data/technical-skills";
import { TOOLS_PLATFORMS_BY_ROLE } from "./data/tools-platforms";
import { ACTION_VERBS_BY_ROLE } from "./data/action-verbs";
import { PROJECT_KEYWORDS_BY_ROLE } from "./data/project-keywords";
import { SUMMARY_KEYWORDS_BY_ROLE } from "./data/summary-keywords";

const BY_INTENT: Record<RoleKeywordIntent, Record<RoleSlug, KeywordIntentContent>> = {
  "core-keywords": CORE_KEYWORDS_BY_ROLE,
  "technical-skills": TECHNICAL_SKILLS_BY_ROLE,
  "tools-platforms": TOOLS_PLATFORMS_BY_ROLE,
  "action-verbs": ACTION_VERBS_BY_ROLE,
  projects: PROJECT_KEYWORDS_BY_ROLE,
  summary: SUMMARY_KEYWORDS_BY_ROLE,
};

export function getKeywordIntentContent(
  role: RoleSlug,
  intent: RoleKeywordIntent
): KeywordIntentContent {
  return BY_INTENT[intent][role];
}

export type {
  KeywordIntentContent,
  KeywordCluster,
  KeywordExample,
  PlacementGuideRow,
  PlacementSection,
} from "./types";
