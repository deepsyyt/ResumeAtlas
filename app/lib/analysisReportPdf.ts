import PDFDocument from "pdfkit/js/pdfkit.standalone";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import {
  atsShortlistLikelihoodLine,
  ATS_REFERENCE_TITLE,
  evidenceInterviewLikelihoodLine,
  RISK_AREAS_INTRO,
  TOP_REJECTION_RISKS_INTRO,
  TOP_REJECTION_RISKS_TITLE,
  snapshotSummaryLine,
} from "@/app/lib/evidenceMetricCopy";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { recommendedFixActionLabel, resolveDashboardRecommendedFixes } from "@/app/lib/recommendedFixes";
import {
  ROLE_FIT_SECTION_INTRO,
  ROLE_FIT_SECTION_TITLE,
  roleFitVerdictStyle,
  type RoleFitRow,
  verdictLabelFor,
} from "@/app/lib/roleFitArchetypes";
import { getATSBadgeLabel, getScoreStyle, type ScoreStyle } from "@/app/lib/scoreColors";

export type AnalysisReportPdfInput = {
  analyzeResult: ATSAnalyzeResult;
  evidenceDashboard: EvidenceDashboard;
  generatedAt?: string;
};

type PdfDoc = InstanceType<typeof PDFDocument>;

const MARGIN = 36;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_H = 28;
const FOOTER_Y = PAGE_H - MARGIN - FOOTER_H;

export const PDF_AREAS_TO_STRENGTHEN_TITLE = "Areas to strengthen";

const COLORS = {
  indigo900: "#312e81",
  indigo700: "#4338ca",
  indigo200: "#c7d2fe",
  indigo100: "#e0e7ff",
  indigo50: "#eef2ff",
  slate900: "#0f172a",
  slate700: "#334155",
  slate600: "#475569",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  white: "#ffffff",
  amber900: "#78350f",
  amber800: "#92400e",
  amber50: "#fffbeb",
  amber100: "#fef3c7",
};

function truncateText(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 1).trimEnd() + "…";
}

function drawMiniBar(d: PdfDoc, x: number, y: number, w: number, pct: number, colorHex: string, h = 4): void {
  const fill = Math.max(0, Math.min(100, pct)) / 100;
  d.save();
  d.roundedRect(x, y, w, h, 2).fill(COLORS.slate200);
  if (fill > 0) {
    d.roundedRect(x, y, Math.max(3, w * fill), h, 2).fill(colorHex);
  }
  d.restore();
}

function drawBadgePill(
  d: PdfDoc,
  text: string,
  x: number,
  y: number,
  style: ScoreStyle,
  fontSize = 7
): void {
  d.font("Helvetica-Bold").fontSize(fontSize);
  const tw = d.widthOfString(text);
  const pw = tw + 12;
  const ph = fontSize + 6;
  d.save();
  d.roundedRect(x, y, pw, ph, 5).fill(style.hex);
  d.fillColor(COLORS.white).text(text, x + 6, y + 2.5);
  d.restore();
}

function drawCompactScoreCard(
  d: PdfDoc,
  x: number,
  y: number,
  w: number,
  h: number,
  args: { label: string; score: number; badge: string; secondaryLine: string; style: ScoreStyle }
): void {
  d.save();
  d.roundedRect(x, y, w, h, 6).fill(args.style.bgHex);
  d.roundedRect(x, y, w, h, 6).lineWidth(0.75).strokeColor(args.style.hex).stroke();
  d.restore();

  const pad = 10;
  d.font("Helvetica-Bold").fontSize(7).fillColor(COLORS.slate600);
  d.text(args.label.toUpperCase(), x + pad, y + pad, { width: w - pad * 2 });

  d.font("Helvetica-Bold").fontSize(22).fillColor(args.style.hex);
  d.text(`${args.score}%`, x + pad, y + pad + 10);

  const badgeX = x + pad + d.widthOfString(`${args.score}%`) + 8;
  drawBadgePill(d, args.badge, badgeX, y + pad + 15, args.style);

  d.font("Helvetica").fontSize(6.5).fillColor(args.style.hex);
  d.text(args.secondaryLine, x + pad, y + h - 16, { width: w - pad * 2, lineGap: 0 });
}

function drawRoleFitTable(
  d: PdfDoc,
  x: number,
  y: number,
  w: number,
  rows: RoleFitRow[],
  rowH: number
): number {
  const headerH = 16;
  const tableH = headerH + rows.length * rowH;

  d.save();
  d.roundedRect(x, y, w, tableH, 4).lineWidth(0.6).strokeColor(COLORS.indigo200).stroke();
  d.rect(x, y, w, headerH).fill(COLORS.indigo50);
  d.restore();

  d.font("Helvetica-Bold").fontSize(6.5).fillColor(COLORS.indigo900);
  d.text("Role", x + 6, y + 5, { width: w * 0.54 });
  d.text("Verdict", x + w * 0.54, y + 5, { width: w * 0.4, align: "right" });

  let rowY = y + headerH;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (i > 0) {
      d.save();
      d.moveTo(x + 4, rowY).lineTo(x + w - 4, rowY).strokeColor(COLORS.indigo100).lineWidth(0.4).stroke();
      d.restore();
    }

    const vStyle = roleFitVerdictStyle(row.verdict);
    const label = verdictLabelFor(row.verdict);

    d.font("Helvetica").fontSize(6.5).fillColor(COLORS.slate700);
    d.text(row.role, x + 6, rowY + 4, { width: w * 0.54 });

    d.font("Helvetica-Bold").fontSize(5.5);
    const tw = d.widthOfString(label);
    const pw = tw + 10;
    const ph = 10;
    const pillX = x + w - pw - 6;
    d.save();
    d.roundedRect(pillX, rowY + 3, pw, ph, 5).fill(vStyle.bgHex);
    d.roundedRect(pillX, rowY + 3, pw, ph, 5).lineWidth(0.4).strokeColor(vStyle.hex).stroke();
    d.fillColor(vStyle.hex).text(label, pillX + 5, rowY + 4.5);
    d.restore();

    rowY += rowH;
  }

  return y + tableH;
}

function drawSectionLabel(d: PdfDoc, x: number, y: number, w: number, title: string): number {
  d.font("Helvetica-Bold").fontSize(7.5).fillColor(COLORS.indigo900);
  d.text(title.toUpperCase(), x, y, { width: w });
  d.save();
  d.moveTo(x, y + 11).lineTo(x + w, y + 11).strokeColor(COLORS.indigo100).lineWidth(0.5).stroke();
  d.restore();
  return y + 15;
}

function drawAreasToStrengthenBox(
  d: PdfDoc,
  x: number,
  y: number,
  w: number,
  risks: string[]
): number {
  const pad = 10;
  const intro = RISK_AREAS_INTRO;
  const bullets = risks.map((r) => `• ${r}`).join("\n");
  const body = `${intro}\n\n${bullets}`;

  d.font("Helvetica").fontSize(6.5).fillColor(COLORS.amber800);
  const textH = d.heightOfString(body, { width: w - pad * 2 - 4, lineGap: 1.5 });
  const boxH = textH + pad * 2 + 4;

  d.save();
  d.roundedRect(x, y, w, boxH, 5).fill(COLORS.amber50);
  d.roundedRect(x, y, w, boxH, 5).lineWidth(0.6).strokeColor("#fcd34d").stroke();
  d.rect(x, y, 4, boxH).fill("#f59e0b");
  d.restore();

  d.font("Helvetica-Bold").fontSize(6.5).fillColor(COLORS.amber900);
  d.text(intro, x + pad + 4, y + pad, { width: w - pad * 2 - 4, lineGap: 1 });
  const introH = d.heightOfString(intro, { width: w - pad * 2 - 4, lineGap: 1 });
  d.font("Helvetica").fontSize(6.5).fillColor(COLORS.amber800);
  d.text(bullets, x + pad + 4, y + pad + introH + 4, {
    width: w - pad * 2 - 4,
    lineGap: 1.5,
  });

  return y + boxH;
}

function drawTopRejectionRisksBox(
  d: PdfDoc,
  x: number,
  y: number,
  w: number,
  items: string[]
): number {
  const pad = 8;
  const intro = TOP_REJECTION_RISKS_INTRO;
  const bullets = items.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const body = `${intro}\n\n${bullets}`;

  d.font("Helvetica").fontSize(6.5).fillColor("#9f1239");
  const textH = d.heightOfString(body, { width: w - pad * 2 - 4, lineGap: 1.5 });
  const boxH = textH + pad * 2 + 4;

  d.save();
  d.roundedRect(x, y, w, boxH, 5).fill("#fff1f2");
  d.roundedRect(x, y, w, boxH, 5).lineWidth(0.6).strokeColor("#fecdd3").stroke();
  d.rect(x, y, 4, boxH).fill("#f43f5e");
  d.restore();

  d.font("Helvetica-Bold").fontSize(6.5).fillColor("#881337");
  d.text(intro, x + pad + 4, y + pad, { width: w - pad * 2 - 4, lineGap: 1 });
  const introH = d.heightOfString(intro, { width: w - pad * 2 - 4, lineGap: 1 });
  d.font("Helvetica").fontSize(6.5).fillColor("#9f1239");
  d.text(bullets, x + pad + 4, y + pad + introH + 4, {
    width: w - pad * 2 - 4,
    lineGap: 1.5,
  });

  return y + boxH;
}

function drawSkillPills(d: PdfDoc, x: number, y: number, w: number, skills: string[]): number {
  const compact = skills.length > 18;
  const gap = compact ? 4 : 5;
  const padX = compact ? 6 : 8;
  const pillH = compact ? 13 : 16;
  const rowGap = compact ? 4 : 5;
  const fontSize = compact ? 5.5 : 6;
  let cx = x;
  let cy = y;

  d.font("Helvetica").fontSize(fontSize);

  for (const skill of skills) {
    const tw = d.widthOfString(skill);
    const pw = tw + padX * 2;
    if (cx + pw > x + w && cx > x) {
      cx = x;
      cy += pillH + rowGap;
    }
    d.save();
    d.roundedRect(cx, cy, pw, pillH, compact ? 6 : 8).fill(COLORS.slate100);
    d.roundedRect(cx, cy, pw, pillH, compact ? 6 : 8).lineWidth(0.4).strokeColor(COLORS.slate200).stroke();
    d.fillColor(COLORS.slate700).text(skill, cx + padX, cy + (compact ? 3 : 4.5));
    d.restore();
    cx += pw + gap;
  }

  return cy + pillH;
}

export function renderAnalysisReportPdf(input: AnalysisReportPdfInput): Promise<Buffer> {
  const { analyzeResult: r, evidenceDashboard: dash } = input;
  const evidenceStyle = getScoreStyle(dash.evidenceMatch);
  const atsStyle = getScoreStyle(r.ats_score);

  const doc = new PDFDocument({ size: "A4", margin: MARGIN, autoFirstPage: true });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });

  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const left = MARGIN;
  const w = CONTENT_W;

  doc.save();
  doc.rect(0, 0, PAGE_W, 56).fill(COLORS.indigo900);
  doc.rect(0, 56, PAGE_W, 2).fill("#6366f1");
  doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(15);
  doc.text("ResumeAtlas", left, 16, { width: w });
  doc.font("Helvetica").fontSize(8.5).fillColor("#c7d2fe");
  doc.text("Job description match analysis report", left, 36, { width: w });
  doc.restore();

  let y = 66;
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.slate500);
  doc.text(
    input.generatedAt
      ? `Generated ${input.generatedAt} · For hiring-team review`
      : "Prepared for hiring-team review",
    left,
    y,
    { width: w }
  );
  y += 16;

  const cardH = 58;
  const half = (w - 12) / 2;
  drawCompactScoreCard(doc, left, y, half, cardH, {
    label: "Evidence match",
    score: dash.evidenceMatch,
    badge: getATSBadgeLabel(dash.evidenceMatch),
    secondaryLine: evidenceInterviewLikelihoodLine(dash.evidenceMatch),
    style: evidenceStyle,
  });
  drawCompactScoreCard(doc, left + half + 12, y, half, cardH, {
    label: ATS_REFERENCE_TITLE,
    score: r.ats_score,
    badge: getATSBadgeLabel(r.ats_score),
    secondaryLine: atsShortlistLikelihoodLine(r.ats_score),
    style: atsStyle,
  });
  y += cardH + 10;

  const summaryRaw = r.summary?.trim() || "Analysis completed.";
  const summaryPad = 10;
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.slate700);
  const summaryTextH = doc.heightOfString(summaryRaw, { width: w - summaryPad * 2 - 6, lineGap: 1.2 });
  const summaryH = Math.min(summaryTextH + summaryPad * 2 + 6, 78);
  doc.save();
  doc.roundedRect(left, y, w, summaryH, 5).fill(evidenceStyle.bgHex);
  doc.rect(left, y, 4, summaryH).fill(evidenceStyle.hex);
  doc.restore();
  doc.font("Helvetica-Bold").fontSize(7).fillColor(COLORS.indigo900);
  doc.text("EXECUTIVE SUMMARY", left + summaryPad + 4, y + 6, { width: w - summaryPad * 2 - 6 });
  doc.font("Helvetica").fontSize(7).fillColor(COLORS.slate700);
  doc.text(truncateText(summaryRaw, 560), left + summaryPad + 4, y + 16, {
    width: w - summaryPad * 2 - 6,
    lineGap: 1.2,
  });
  y += summaryH + 12;

  const bodyTop = y;

  const roleFitRows = dash.roleFit ?? [];
  const mostMissingEvidence = dash.mostMissingEvidence ?? [];
  const riskAreas = resolveDashboardRecommendedFixes(dash.riskAreas).map((fix) =>
    recommendedFixActionLabel(fix)
  );
  const matchedSkills = r.matched_skills ?? [];
  const hasSkills = matchedSkills.length > 0;

  let contentY = drawSectionLabel(doc, left, bodyTop, w, "Evidence snapshot");
  doc.font("Helvetica").fontSize(6.5).fillColor(COLORS.indigo700);
  doc.text(snapshotSummaryLine(dash), left, contentY, { width: w, lineGap: 1 });
  contentY += doc.heightOfString(snapshotSummaryLine(dash), { width: w, lineGap: 1 }) + 10;

  if (roleFitRows.length > 0) {
    contentY = drawSectionLabel(doc, left, contentY, w, ROLE_FIT_SECTION_TITLE) + 2;
    doc.font("Helvetica").fontSize(6).fillColor(COLORS.slate500);
    doc.text(truncateText(ROLE_FIT_SECTION_INTRO, 160), left, contentY, { width: w, lineGap: 1 });
    contentY += doc.heightOfString(truncateText(ROLE_FIT_SECTION_INTRO, 160), { width: w, lineGap: 1 }) + 6;
    contentY = drawRoleFitTable(doc, left, contentY, w, roleFitRows, 16) + 10;
  }

  if (mostMissingEvidence.length > 0) {
    contentY = drawSectionLabel(doc, left, contentY, w, TOP_REJECTION_RISKS_TITLE) + 4;
    contentY =
      drawTopRejectionRisksBox(doc, left, contentY, w, mostMissingEvidence.slice(0, 5)) + 10;
  }

  if (riskAreas.length > 0) {
    contentY = drawSectionLabel(doc, left, contentY, w, PDF_AREAS_TO_STRENGTHEN_TITLE) + 4;
    contentY = drawAreasToStrengthenBox(doc, left, contentY, w, riskAreas.slice(0, 5)) + 10;
  }

  if (hasSkills) {
    contentY = drawSectionLabel(doc, left, contentY, w, "Skills matched in work bullets") + 4;
    contentY = drawSkillPills(doc, left, contentY, w, matchedSkills) + 6;
  }

  const dividerY = FOOTER_Y - 6;
  doc.save();
  doc.moveTo(left, dividerY).lineTo(left + w, dividerY).strokeColor(COLORS.slate200).lineWidth(0.5).stroke();
  doc.restore();
  doc.font("Helvetica").fontSize(6).fillColor(COLORS.slate400);
  doc.text(
    "This report reflects documented résumé evidence against the job description. It supports screening conversations and is not a substitute for interview evaluation or background verification. Generated by ResumeAtlas.",
    left,
    FOOTER_Y + 2,
    { width: w, lineGap: 0.8 }
  );

  doc.end();
  return done;
}
