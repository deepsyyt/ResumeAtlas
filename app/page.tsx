import { HomeMarketingPage } from "@/app/components/HomeMarketingPage";
import { homeWebApplicationJsonLd } from "@/app/lib/homeJsonLd";
import { buildHomeMarketingMetadata } from "@/app/lib/homePageSeo";

export const metadata = buildHomeMarketingMetadata();

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeWebApplicationJsonLd()) }}
      />
      <HomeMarketingPage />
    </>
  );
}
