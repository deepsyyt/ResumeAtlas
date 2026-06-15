import { buildRoleOptimizerPath } from "@/app/lib/roleOptimizerContent";
import { isResumeBulletRole, publicPathForBulletHub } from "@/app/lib/resumeBulletPointContent";
import { ROLE_OPTIMIZER_ORDER } from "@/app/lib/roleOptimizer/registry";
import { KEYWORD_PAGES, resumeExamplePublicPath, type RoleSlug } from "@/app/lib/seoPages";
import { roleResumeKeywordsPath, roleResumePillarPath } from "@/app/lib/searchIntentSeo";

export type HomeRoleBrowseCard = {
  slug: string;
  roleName: string;
  examplePath: string;
  guidePath: string;
  keywordsPath: string;
  optimizerPath?: string;
  bulletGuideAnchor?: string;
};

const optimizerPathBySlug = Object.fromEntries(
  ROLE_OPTIMIZER_ORDER.map((role) => [role.slug, role.path])
);

function cardFromKeywordSlug(slug: RoleSlug): HomeRoleBrowseCard {
  const cfg = KEYWORD_PAGES[slug];
  const pillarPath = roleResumePillarPath(slug);
  return {
    slug,
    roleName: cfg.roleName,
    examplePath: resumeExamplePublicPath(slug),
    guidePath: pillarPath,
    keywordsPath: roleResumeKeywordsPath(slug),
    optimizerPath: optimizerPathBySlug[slug],
    bulletGuideAnchor: isResumeBulletRole(slug) ? publicPathForBulletHub(slug) : undefined,
  };
}

/** Optimizer spokes without a matching KEYWORD_PAGES hub card. */
const OPTIMIZER_EXTRA_ROLE_CARDS: HomeRoleBrowseCard[] = [
  {
    slug: "data-engineer",
    roleName: "Data Engineer",
    examplePath: "/data-engineer-resume-guide",
    guidePath: "/data-engineer-resume-guide",
    keywordsPath: "/data-engineer-resume-keywords",
    optimizerPath: buildRoleOptimizerPath("data-engineer"),
  },
  {
    slug: "ai-engineer",
    roleName: "AI Engineer",
    examplePath: "/software-engineer-resume-guide",
    guidePath: "/software-engineer-resume-guide",
    keywordsPath: "/software-engineer-resume-keywords",
    optimizerPath: buildRoleOptimizerPath("ai-engineer"),
  },
  {
    slug: "analytics-manager",
    roleName: "Analytics Manager",
    examplePath: "/data-analyst-resume-guide",
    guidePath: "/data-analyst-resume-guide",
    keywordsPath: "/data-analyst-resume-keywords",
    optimizerPath: buildRoleOptimizerPath("analytics-manager"),
  },
];

const keywordSlugSet = new Set(Object.keys(KEYWORD_PAGES));

export const HOME_ROLE_BROWSE_CARDS: HomeRoleBrowseCard[] = [
  ...Object.keys(KEYWORD_PAGES).map((slug) => cardFromKeywordSlug(slug as RoleSlug)),
  ...OPTIMIZER_EXTRA_ROLE_CARDS.filter((card) => !keywordSlugSet.has(card.slug)),
]
  .slice()
  .sort((a, b) => a.roleName.localeCompare(b.roleName));
