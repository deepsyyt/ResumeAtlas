import { redirect } from "next/navigation";
import { RESUME_NOT_GETTING_INTERVIEWS_PATH } from "@/app/lib/interviewCluster/paths";

export default function LegacyResumeNotGettingInterviewsPage() {
  redirect(RESUME_NOT_GETTING_INTERVIEWS_PATH);
}
