import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleOptimizerPage } from "@/app/components/optimize/RoleOptimizerPage";
import {
  buildRoleOptimizerMetaDescription,
  buildRoleOptimizerMetaTitle,
  buildRoleOptimizerPath,
} from "@/app/lib/roleOptimizerContent";
import {
  ROLE_OPTIMIZER_ORDER,
  getRoleOptimizerByPath,
} from "@/app/lib/roleOptimizer/registry";
import { getSiteUrl } from "@/app/lib/siteUrl";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ROLE_OPTIMIZER_ORDER.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = buildRoleOptimizerPath(slug);
  const role = getRoleOptimizerByPath(path);
  if (!role) {
    return {};
  }
  const siteBase = getSiteUrl().replace(/\/$/, "");
  const title = buildRoleOptimizerMetaTitle(role.roleName);
  const description = buildRoleOptimizerMetaDescription(role.roleName);
  return {
    title,
    description,
    alternates: { canonical: role.path },
    openGraph: {
      title,
      description,
      url: `${siteBase}${role.path}`,
      type: "website",
    },
  };
}

export default async function ResumeOptimizerRolePage({ params }: PageProps) {
  const { slug } = await params;
  const path = buildRoleOptimizerPath(slug);
  const role = getRoleOptimizerByPath(path);
  if (!role) {
    notFound();
  }
  return <RoleOptimizerPage role={role} />;
}
