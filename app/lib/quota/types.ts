export type AnalysisQuotaScope = "anonymous" | "user";

export type AnalysisQuotaStatus = {
  allowed: boolean;
  remaining: number;
  used: number;
  limit: number;
  resetAt?: string;
  scope: AnalysisQuotaScope;
};

export type AnalysisActor = {
  userId: string | null;
  anonymousId: string | null;
  ipHash: string | null;
  scope: AnalysisQuotaScope;
};
