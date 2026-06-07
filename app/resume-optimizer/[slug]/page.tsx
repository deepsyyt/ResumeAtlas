import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleOptimizerPage } from "@/app/components/optimize/RoleOptimizerPage";
import { buildRoleOptimizerPath } from "@/app/lib/roleOptimizerContent";
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
  return {
    title: role.title,
    description: role.description,
    alternates: { canonical: role.path },
    openGraph: {
      title: role.title,
      description: role.description,
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
