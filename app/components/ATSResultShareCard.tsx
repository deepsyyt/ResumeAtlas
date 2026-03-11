"use client";

import React, { forwardRef } from "react";
import type { ATSAnalysisResult } from "@/app/lib/atsEngine";

type ATSResultShareCardProps = {
  engineResult: ATSAnalysisResult;
};

export const ATSResultShareCard = forwardRef<HTMLDivElement, ATSResultShareCardProps>(
  ({ engineResult }, ref) => {
    const atsScore = engineResult.ats_score ?? 0;
    const keywordScore = engineResult.keyword_coverage?.score ?? 0;
    const semanticScore = engineResult.semantic_similarity?.score ?? 0;
    const experienceScore = engineResult.experience_alignment?.score ?? 0;
    const missingSkills = engineResult.keyword_coverage?.missing_skills ?? [];

    return (
      <div
        ref={ref}
        className="w-[600px] max-w-full mx-auto rounded-2xl border border-slate-200 bg-white shadow-lg px-8 py-6 text-slate-900"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-[0.2em]">
          <span>ResumeAtlas</span>
          <span>Resume vs Job Description</span>
        </div>

        <h2 className="mt-3 text-sm font-semibold text-slate-900">
          Resume vs Job Description Analysis
        </h2>

        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
              Estimated ATS Pass Likelihood
            </p>
            <p className="mt-1 text-4xl font-bold text-slate-900">{atsScore}%</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase">Metrics</p>
          <div className="mt-2 space-y-1 text-sm text-slate-700 font-medium">
            <p className="flex justify-between">
              <span>Keyword coverage</span>
              <span>{keywordScore}%</span>
            </p>
            <p className="flex justify-between">
              <span>Semantic match</span>
              <span>{semanticScore}%</span>
            </p>
            <p className="flex justify-between">
              <span>Experience alignment</span>
              <span>{experienceScore}%</span>
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold tracking-wide text-slate-600 uppercase">
            Missing skills
          </p>
          <p className="mt-1 text-sm text-slate-700 min-h-[1.5rem]">
            {missingSkills.length
              ? missingSkills.slice(0, 6).join(" • ")
              : "No major missing skills detected for this job description."}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500">
          <span>Test your resume against a job description</span>
          <span className="font-semibold text-slate-800">resumeatlas.ai-stack.dev</span>
        </div>
      </div>
    );
  }
);

ATSResultShareCard.displayName = "ATSResultShareCard";

