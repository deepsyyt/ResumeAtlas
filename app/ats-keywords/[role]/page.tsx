import { notFound, permanentRedirect } from "next/navigation";
import { KEYWORD_PAGES, type RoleSlug } from "@/app/lib/seoPages";
import { roleResumeKeywordsPath } from "@/app/lib/searchIntentSeo";

type PageParams = {
  role: RoleSlug;
};

export default function ATSKeywordsRolePage({ params }: { params: PageParams }) {
  if (!KEYWORD_PAGES[params.role]) notFound();
  permanentRedirect(roleResumeKeywordsPath(params.role));
}

