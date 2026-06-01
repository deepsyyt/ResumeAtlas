import { redirect } from "next/navigation";
import { RESUME_KEYWORDS_HUB_PATH } from "@/app/lib/seoHubPages";

/** Legacy index; canonical keyword hub is /resume-keywords (includes pilot guides). */
export default function ATSKeywordsIndexPage() {
  redirect(RESUME_KEYWORDS_HUB_PATH);
}
