import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { classifyJdDomain } from "@/app/lib/jdDomainClass";
import { attachMissingEvidenceToEvidenceDashboard } from "@/app/lib/missingEvidenceLlm";
import { attachRoleFitToEvidenceDashboard } from "@/app/lib/roleFitLlm";
import { attachSkillProofToEvidenceDashboard } from "@/app/lib/skillProofLlm";
import { attachRiskAreasToEvidenceDashboard } from "@/app/lib/riskAreasLlm";
import { attachApplicationVerdictToEvidenceDashboard } from "@/app/lib/applicationVerdictLlm";

export async function enrichEvidenceDashboardWithLlm(args: {
  dashboard: EvidenceDashboard;
  apiKey: string;
  modelCandidates: string[];
  resumeText: string;
  jobDescription: string;
  targetRoleTitle?: string;
  missingSkills: string[];
  matchedSkills?: string[];
  skillProofDisplayLimit?: number;
}): Promise<EvidenceDashboard> {
  const [roleFitDashboard, missingDashboard, skillProofDashboard] = await Promise.all([
      attachRoleFitToEvidenceDashboard({
        dashboard: args.dashboard,
        apiKey: args.apiKey,
        modelCandidates: args.modelCandidates,
        resumeText: args.resumeText,
        jobDescription: args.jobDescription,
        targetRoleTitle: args.targetRoleTitle,
      }),
      attachMissingEvidenceToEvidenceDashboard({
        dashboard: args.dashboard,
        apiKey: args.apiKey,
        modelCandidates: args.modelCandidates,
        resumeText: args.resumeText,
        jobDescription: args.jobDescription,
        missingSkills: args.missingSkills,
      }),
      attachSkillProofToEvidenceDashboard({
        dashboard: args.dashboard,
        apiKey: args.apiKey,
        modelCandidates: args.modelCandidates,
        resumeText: args.resumeText,
        jobDescription: args.jobDescription,
        matchedSkills: args.matchedSkills ?? [],
        missingSkills: args.missingSkills,
        targetRoleTitle: args.targetRoleTitle,
        skillProofDisplayLimit: args.skillProofDisplayLimit,
      }),
    ]);

  const merged: EvidenceDashboard = {
    ...roleFitDashboard,
    mostMissingEvidence: missingDashboard.mostMissingEvidence,
    missingEvidenceVersion: missingDashboard.missingEvidenceVersion,
    skillProof: skillProofDashboard.skillProof,
    skillProofAll: skillProofDashboard.skillProofAll,
    skillProofVersion: skillProofDashboard.skillProofVersion,
    keywordCoverageVerdict: skillProofDashboard.keywordCoverageVerdict,
    snapshot: skillProofDashboard.snapshot,
  };

  const withRiskAreas = await attachRiskAreasToEvidenceDashboard({
    dashboard: merged,
    apiKey: args.apiKey,
    modelCandidates: args.modelCandidates,
    resumeText: args.resumeText,
    jobDescription: args.jobDescription,
    missingSkills: args.missingSkills,
    targetRoleTitle: args.targetRoleTitle,
  });

  const withVerdict = await attachApplicationVerdictToEvidenceDashboard({
    dashboard: withRiskAreas,
    apiKey: args.apiKey,
    modelCandidates: args.modelCandidates,
    resumeText: args.resumeText,
    jobDescription: args.jobDescription,
    missingSkills: args.missingSkills,
    targetRoleTitle: args.targetRoleTitle,
  });

  return {
    ...withVerdict,
    jdDomain: classifyJdDomain(args.jobDescription, args.targetRoleTitle),
  };
}

export async function enrichOptimizeEvidenceDashboards(args: {
  before: EvidenceDashboard;
  after: EvidenceDashboard;
}): Promise<{ before: EvidenceDashboard; after: EvidenceDashboard }> {
  return args;
}
