import { RoleAtsTemplatePage } from "@/app/components/RoleAtsTemplatePage";
import { roleAtsTemplateMetadata } from "@/app/lib/roleAtsTemplateConfig";

export const metadata = roleAtsTemplateMetadata("data-analyst");

export default function AtsResumeTemplateDataAnalystPage() {
  return <RoleAtsTemplatePage role="data-analyst" />;
}
