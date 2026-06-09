import { HomeMarketingPage } from "@/app/components/HomeMarketingPage";
import { buildHomeMarketingMetadata } from "@/app/lib/homePageSeo";

export const metadata = buildHomeMarketingMetadata();

export default function Page() {
  return <HomeMarketingPage />;
}
