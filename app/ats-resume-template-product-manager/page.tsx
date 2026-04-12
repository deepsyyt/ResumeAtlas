import { RoleAtsTemplatePage } from "@/app/components/RoleAtsTemplatePage";
import { roleAtsTemplateMetadata } from "@/app/lib/roleAtsTemplateConfig";

export const metadata = roleAtsTemplateMetadata("product-manager");

export default function AtsResumeTemplateProductManagerPage() {
  return <RoleAtsTemplatePage role="product-manager" />;
}
