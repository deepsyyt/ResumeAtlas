import { RoleAtsTemplatePage } from "@/app/components/RoleAtsTemplatePage";
import { roleAtsTemplateMetadata } from "@/app/lib/roleAtsTemplateConfig";

export const metadata = roleAtsTemplateMetadata("software-engineer");

export default function AtsResumeTemplateSoftwareEngineerPage() {
  return <RoleAtsTemplatePage role="software-engineer" />;
}
