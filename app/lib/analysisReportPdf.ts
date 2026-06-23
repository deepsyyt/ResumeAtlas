import PDFDocument from "pdfkit/js/pdfkit.standalone";
import type { ATSAnalyzeResult } from "@/app/lib/atsAnalyze";
import { buildDashboardReportSnapshot, type KeywordTone } from "@/app/lib/dashboardReportSnapshot";
import {
  APPLICATION_VERDICT_TITLE,
  KEYWORD_COVERAGE_MISSING_LABEL,
  KEYWORD_COVERAGE_PROVEN_LABEL,
  KEYWORD_COVERAGE_SCORE_TITLE,
  KEYWORD_COVERAGE_WEAK_LABEL,
  OPTIMIZE_ALIGN_AFTER_LABEL,
  OPTIMIZE_ALIGN_BEFORE_LABEL,
  OPTIMIZE_ALIGN_CARD_TITLE,
  RECOMMENDED_FIXES_INTRO,
  RECOMMENDED_FIXES_TITLE,
  TOP_REJECTION_RISKS_INTRO,
} from "@/app/lib/evidenceMetricCopy";
import type { EvidenceDashboard } from "@/app/lib/resumeEvidenceScore";
import { recommendedFixActionLabel, recommendedFixKey, type RecommendedFix } from "@/app/lib/recommendedFixes";
import {
  ROLE_FIT_SECTION_INTRO,
  ROLE_FIT_SECTION_TITLE,
  roleFitVerdictStyle,
  verdictLabelCompactFor,
} from "@/app/lib/roleFitArchetypes";
import { getScoreStyle } from "@/app/lib/scoreColors";
import { analyzeMatchLevelLabel } from "@/app/lib/resumeTypography";

export type AnalysisReportPdfInput = {
  analyzeResult: ATSAnalyzeResult;
  evidenceDashboard: EvidenceDashboard;
  selectedRecommendedFixes?: RecommendedFix[];
  generatedAt?: string;
};

/** @deprecated Dashboard PDF uses recommended fixes section instead. */
export const PDF_AREAS_TO_STRENGTHEN_TITLE = "Areas to strengthen";

type PdfDoc = InstanceType<typeof PDFDocument>;
type Snapshot = ReturnType<typeof buildDashboardReportSnapshot>;

const MARGIN = 32;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;
const HEADER_H = 52;
const BODY_TOP = HEADER_H + 14;
const FOOTER_H = 34;
const CONTENT_BOTTOM = PAGE_H - MARGIN - FOOTER_H;

const COLORS = {
  indigo900: "#312e81",
  indigo200: "#c7d2fe",
  indigo100: "#e0e7ff",
  indigo50: "#eef2ff",
  slate900: "#0f172a",
  slate700: "#334155",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate200: "#e2e8f0",
  white: "#ffffff",
  emerald700: "#047857",
  emerald600: "#059669",
  emerald100: "#d1fae5",
  emerald50: "#ecfdf5",
  rose900: "#881337",
  rose800: "#9f1239",
  rose100: "#ffe4e6",
  rose50: "#fff1f2",
  amber800: "#b45309",
  amber100: "#fef3c7",
  violet700: "#6d28d9",
};

function truncateText(text: string, maxLen: number): string {
  const t = text.trim();
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen - 1).trimEnd()}…`;
}

/** Bounded text — prevents PDFKit from auto-inserting extra pages on overflow. */
function drawText(
  doc: PdfDoc,
  text: string,
  x: number,
  y: number,
  w: number,
  opts: {
    height?: number;
    font?: "Helvetica" | "Helvetica-Bold";
    size?: number;
    color?: string;
    align?: "left" | "right" | "center";
    lineGap?: number;
  } = {}
): number {
  const font = opts.font ?? "Helvetica";
  const size = opts.size ?? 7;
  const color = opts.color ?? COLORS.slate700;
  const lineGap = opts.lineGap ?? 0.8;
  const height = opts.height ?? doc.heightOfString(text, { width: w, lineGap });

  doc.font(font).fontSize(size).fillColor(color);
  doc.text(text, x, y, {
    width: w,
    height,
    lineGap,
    align: opts.align,
    ellipsis: true,
  });
  return y + height;
}

function measureText(
  doc: PdfDoc,
  text: string,
  w: number,
  size: number,
  lineGap = 0.8
): number {
  doc.font("Helvetica").fontSize(size);
  return doc.heightOfString(text, { width: w, lineGap });
}

function drawPageHeader(doc: PdfDoc, generatedAt?: string): number {
  doc.save();
  doc.rect(0, 0, PAGE_W, HEADER_H).fill(COLORS.indigo900);
  doc.rect(0, HEADER_H, PAGE_W, 2).fill("#6366f1");
  doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(14);
  doc.text("ResumeAtlas", MARGIN, 14, { width: CONTENT_W, lineBreak: false });
  doc.font("Helvetica").fontSize(8).fillColor("#c7d2fe");
  doc.text("Job description match analysis report", MARGIN, 32, { width: CONTENT_W, lineBreak: false });
  doc.restore();

  let y = BODY_TOP;
  if (generatedAt) {
    doc.font("Helvetica").fontSize(6.5).fillColor(COLORS.slate500);
    doc.text(`Generated ${generatedAt} · For hiring-team review`, MARGIN, y, {
      width: CONTENT_W,
      lineBreak: false,
    });
    y += 12;
  }
  return y;
}

function drawSectionLabel(doc: PdfDoc, x: number, y: number, w: number, title: string): number {
  doc.font("Helvetica-Bold").fontSize(7).fillColor(COLORS.indigo900);
  doc.text(title.toUpperCase(), x, y, { width: w, lineBreak: false });
  doc.save();
  doc.moveTo(x, y + 10).lineTo(x + w, y + 10).strokeColor(COLORS.indigo100).lineWidth(0.5).stroke();
  doc.restore();
  return y + 13;
}

function drawVerdictPanel(doc: PdfDoc, x: number, y: number, w: number, snapshot: Snapshot): number {
  const { applicationVerdict: verdict, parsedSummary } = snapshot;
  const style = getScoreStyle(verdict.shortlistPct);
  const pad = 8;
  const innerW = w - pad * 2;

  let contentH = pad + 28;
  if (parsedSummary) {
    contentH += 16 + 16 + 12 + 2;
  }
  contentH += 8 + 24;
  const boxH = contentH;

  doc.save();
  doc.roundedRect(x, y, w, boxH, 5).fill(style.bgHex);
  doc.roundedRect(x, y, w, boxH, 5).lineWidth(0.75).strokeColor(style.hex).stroke();
  doc.restore();

  doc.font("Helvetica-Bold").fontSize(6.5).fillColor(COLORS.slate500);
  doc.text(APPLICATION_VERDICT_TITLE.toUpperCase(), x + pad, y + pad, { width: innerW, lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(22).fillColor(style.hex);
  doc.text(`${verdict.shortlistPct}%`, x + pad, y + pad + 10, { lineBreak: false });
  const badge = verdict.badgeLabel;
  doc.font("Helvetica-Bold").fontSize(6.5);
  const badgeW = doc.widthOfString(badge) + 10;
  doc.save();
  doc.roundedRect(x + pad + 48, y + pad + 16, badgeW, 12, 4).fill(style.hex);
  doc.fillColor(COLORS.white).text(badge, x + pad + 53, y + pad + 18, { lineBreak: false });
  doc.restore();

  let innerY = y + pad + 28;
  if (parsedSummary) {
    innerY = drawText(doc, `JD needs: ${truncateText(parsedSummary.jdNeeds, 90)}.`, x + pad, innerY, innerW, {
      size: 6,
      color: COLORS.slate700,
      height: 16,
      lineGap: 0.5,
    });
    innerY = drawText(
      doc,
      `Resume shows: ${truncateText(parsedSummary.resumeShows, 90)}.`,
      x + pad,
      innerY,
      innerW,
      { size: 6, color: COLORS.slate700, height: 16, lineGap: 0.5 }
    );
    innerY = drawText(doc, `Match: ${analyzeMatchLevelLabel(parsedSummary.match)}`, x + pad, innerY, innerW, {
      font: "Helvetica-Bold",
      size: 6,
      color: COLORS.slate700,
      height: 12,
      lineGap: 0.5,
    });
    innerY += 2;
  }

  drawText(doc, OPTIMIZE_ALIGN_CARD_TITLE.toUpperCase(), x + pad, innerY, innerW, {
    font: "Helvetica-Bold",
    size: 5.5,
    color: COLORS.slate500,
    height: 8,
  });
  doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.slate900);
  doc.text(`${verdict.shortlistPct}%`, x + pad, innerY + 9, { lineBreak: false });
  doc.font("Helvetica").fontSize(9).fillColor(COLORS.slate400);
  doc.text("→", x + pad + 26, innerY + 10, { lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(10).fillColor(COLORS.emerald600);
  doc.text(`${verdict.optimizedShortlistPct}%`, x + pad + 38, innerY + 9, { lineBreak: false });
  if (verdict.shortlistUplift > 0) {
    const uplift = `+${verdict.shortlistUplift}%`;
    doc.font("Helvetica-Bold").fontSize(6);
    const uw = doc.widthOfString(uplift) + 8;
    doc.save();
    doc.roundedRect(x + pad + 82, innerY + 9, uw, 11, 4).fill(COLORS.emerald100);
    doc.fillColor(COLORS.emerald700).text(uplift, x + pad + 86, innerY + 11, { lineBreak: false });
    doc.restore();
  }

  return y + boxH;
}

function drawScanSummaryPanel(doc: PdfDoc, x: number, y: number, w: number, snapshot: Snapshot): number {
  const pad = 8;
  const innerW = w - pad * 2;
  const { breakdown, keywordScore, risks, recommendedFixes } = snapshot;
  const colW = innerW / 3;

  const metrics = [
    { label: "Critical risks", value: String(risks.length), color: COLORS.rose800 },
    { label: "Recommended fixes", value: String(recommendedFixes.length), color: COLORS.emerald600 },
    { label: "Keyword coverage", value: `${keywordScore}%`, color: COLORS.violet700 },
  ];

  const boxH = 88;
  doc.save();
  doc.roundedRect(x, y, w, boxH, 5).fill(COLORS.indigo50);
  doc.roundedRect(x, y, w, boxH, 5).lineWidth(0.75).strokeColor(COLORS.indigo200).stroke();
  doc.restore();

  doc.font("Helvetica-Bold").fontSize(6.5).fillColor(COLORS.indigo900);
  doc.text("SCAN SUMMARY", x + pad, y + pad, { width: innerW, lineBreak: false });

  let colX = x + pad;
  const rowY = y + pad + 14;
  for (const metric of metrics) {
    drawText(doc, metric.label.toUpperCase(), colX, rowY, colW - 4, {
      font: "Helvetica-Bold",
      size: 5.5,
      color: COLORS.slate500,
      height: 8,
    });
    doc.font("Helvetica-Bold").fontSize(15).fillColor(metric.color);
    doc.text(metric.value, colX, rowY + 10, { width: colW - 4, lineBreak: false });
    colX += colW;
  }

  const kwLine = `${breakdown.proven} proven · ${breakdown.weak} weak · ${breakdown.missing} missing`;
  drawText(doc, kwLine, x + pad, y + boxH - 18, innerW, {
    size: 5.5,
    color: COLORS.slate500,
    height: 10,
    align: "center",
  });

  return y + boxH;
}

function drawImpactPreview(doc: PdfDoc, x: number, y: number, w: number, before: string, after: string): number {
  const pad = 6;
  const half = (w - 6) / 2;
  const beforeText = truncateText(before, 140);
  const afterText = truncateText(after, 140);
  const boxH = 42;

  doc.save();
  doc.roundedRect(x, y, w, boxH, 4).fill("#0f172a");
  doc.restore();

  doc.font("Helvetica-Bold").fontSize(5.5).fillColor("#94a3b8");
  doc.text("SEE THE IMPACT", x + pad, y + pad, { width: w - pad * 2, lineBreak: false });
  doc.font("Helvetica-Bold").fontSize(5.5).fillColor("#cbd5e1");
  doc.text(OPTIMIZE_ALIGN_BEFORE_LABEL.toUpperCase(), x + pad, y + pad + 10, { width: half - pad, lineBreak: false });
  doc.text(OPTIMIZE_ALIGN_AFTER_LABEL.toUpperCase(), x + half + 3, y + pad + 10, { width: half - pad, lineBreak: false });
  drawText(doc, beforeText, x + pad, y + pad + 18, half - pad, {
    size: 6,
    color: "#e2e8f0",
    height: 18,
    lineGap: 0.5,
  });
  drawText(doc, afterText, x + half + 3, y + pad + 18, half - pad, {
    size: 6,
    color: "#ecfdf5",
    height: 18,
    lineGap: 0.5,
  });

  return y + boxH;
}

function drawRejectionRiskCard(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  index: number,
  item: { headline: string; description: string }
): number {
  const pad = 6;
  const textW = w - pad * 2 - 18;
  const headline = truncateText(item.headline, 70);
  const description = truncateText(item.description, 120);
  const headlineH = measureText(doc, headline, textW, 6.5, 0.5);
  const descH = measureText(doc, description, textW, 6, 0.5);
  const boxH = Math.min(pad * 2 + headlineH + descH + 4, 52);

  doc.save();
  doc.roundedRect(x, y, w, boxH, 4).fill(COLORS.rose50);
  doc.roundedRect(x, y, w, boxH, 4).lineWidth(0.5).strokeColor("#fecdd3").stroke();
  doc.restore();

  doc.save();
  doc.roundedRect(x + pad, y + pad, 12, 12, 2).fill(COLORS.rose100);
  doc.fillColor(COLORS.rose900).font("Helvetica-Bold").fontSize(6.5);
  doc.text(String(index + 1), x + pad + 3.5, y + pad + 2.5, { lineBreak: false });
  doc.restore();

  const textX = x + pad + 16;
  let textY = y + pad;
  textY = drawText(doc, headline, textX, textY, textW, {
    font: "Helvetica-Bold",
    size: 6.5,
    color: COLORS.rose900,
    height: headlineH,
    lineGap: 0.5,
  });
  drawText(doc, description, textX, textY, textW, {
    size: 6,
    color: COLORS.rose800,
    height: Math.min(descH, boxH - (textY - y) - pad),
    lineGap: 0.5,
  });

  doc.font("Helvetica-Bold").fontSize(5);
  const badge = "HIGH IMPACT";
  const bw = doc.widthOfString(badge) + 6;
  doc.save();
  doc.roundedRect(x + w - bw - pad, y + pad, bw, 9, 3).fill(COLORS.rose100);
  doc.fillColor(COLORS.rose900).text(badge, x + w - bw - pad + 3, y + pad + 1.5, { lineBreak: false });
  doc.restore();

  return y + boxH;
}

function drawRecommendedFixRow(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  label: string,
  uplift: number,
  selected: boolean
): number {
  const pad = 5;
  const textW = w - pad * 2 - 30;
  const shortLabel = truncateText(label, 100);
  const textH = Math.min(measureText(doc, shortLabel, textW, 6, 0.5), 22);
  const rowH = Math.max(textH + pad * 2, 18);

  doc.save();
  doc.roundedRect(x, y, w, rowH, 3).fill(selected ? COLORS.emerald50 : COLORS.white);
  doc.roundedRect(x, y, w, rowH, 3).lineWidth(0.5).strokeColor(selected ? "#86efac" : COLORS.slate200).stroke();
  doc.restore();

  doc.save();
  doc.roundedRect(x + pad, y + pad - 1, 9, 9, 2).fill(selected ? COLORS.emerald600 : COLORS.white);
  if (!selected) {
    doc.roundedRect(x + pad, y + pad - 1, 9, 9, 2).lineWidth(0.5).strokeColor(COLORS.slate200).stroke();
  } else {
    doc.fillColor(COLORS.white).font("Helvetica-Bold").fontSize(5.5);
    doc.text("✓", x + pad + 1.5, y + pad, { lineBreak: false });
  }
  doc.restore();

  drawText(doc, shortLabel, x + pad + 14, y + pad, textW, {
    size: 6,
    color: COLORS.slate700,
    height: textH,
    lineGap: 0.5,
  });

  if (uplift > 0) {
    doc.font("Helvetica-Bold").fontSize(5.5).fillColor(COLORS.emerald700);
    doc.text(`+${uplift}%`, x + w - pad - 22, y + pad + 1, { width: 22, align: "right", lineBreak: false });
  }

  return y + rowH + 3;
}

function drawKeywordToneGroup(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  tone: KeywordTone,
  skills: string[],
  maxPills: number
): number {
  if (skills.length === 0) return y;

  const label =
    tone === "proven"
      ? KEYWORD_COVERAGE_PROVEN_LABEL
      : tone === "weak"
        ? KEYWORD_COVERAGE_WEAK_LABEL
        : KEYWORD_COVERAGE_MISSING_LABEL;
  const toneColor =
    tone === "proven" ? COLORS.emerald700 : tone === "weak" ? COLORS.amber800 : COLORS.rose800;
  const toneBg =
    tone === "proven" ? COLORS.emerald100 : tone === "weak" ? COLORS.amber100 : COLORS.rose100;

  const shown = skills.slice(0, maxPills);
  const extra = skills.length - shown.length;

  doc.font("Helvetica-Bold").fontSize(6).fillColor(toneColor);
  doc.text(`${label} (${skills.length})`, x, y, { width: w, lineBreak: false });
  y += 10;

  const gap = 3;
  const padX = 5;
  const pillH = 11;
  let cx = x;
  doc.font("Helvetica").fontSize(5);

  for (const skill of shown) {
    const display = truncateText(skill, 22);
    const tw = doc.widthOfString(display);
    const pw = tw + padX * 2;
    if (cx + pw > x + w && cx > x) {
      cx = x;
      y += pillH + gap;
    }
    doc.save();
    doc.roundedRect(cx, y, pw, pillH, 5).fill(toneBg);
    doc.fillColor(COLORS.slate700).text(display, cx + padX, y + 2, { lineBreak: false });
    doc.restore();
    cx += pw + gap;
  }

  if (extra > 0) {
    const more = `+${extra} more`;
    const tw = doc.widthOfString(more);
    const pw = tw + padX * 2;
    if (cx + pw > x + w && cx > x) {
      cx = x;
      y += pillH + gap;
    }
    doc.save();
    doc.roundedRect(cx, y, pw, pillH, 5).fill(COLORS.slate200);
    doc.fillColor(COLORS.slate500).text(more, cx + padX, y + 2, { lineBreak: false });
    doc.restore();
  }

  return y + pillH + 5;
}

function drawRoleFitTable(
  doc: PdfDoc,
  x: number,
  y: number,
  w: number,
  rows: Snapshot["roleFitRows"]
): number {
  const headerH = 14;
  const rowH = 13;
  const tableH = headerH + rows.length * rowH;

  doc.save();
  doc.roundedRect(x, y, w, tableH, 3).lineWidth(0.5).strokeColor(COLORS.indigo200).stroke();
  doc.rect(x, y, w, headerH).fill(COLORS.indigo50);
  doc.restore();

  doc.font("Helvetica-Bold").fontSize(6).fillColor(COLORS.indigo900);
  doc.text("Role", x + 5, y + 4, { width: w * 0.62, lineBreak: false });
  doc.text("Verdict", x + w * 0.62, y + 4, { width: w * 0.34, align: "right", lineBreak: false });

  let rowY = y + headerH;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    if (i > 0) {
      doc.save();
      doc.moveTo(x + 3, rowY).lineTo(x + w - 3, rowY).strokeColor(COLORS.indigo100).lineWidth(0.35).stroke();
      doc.restore();
    }

    const vStyle = roleFitVerdictStyle(row.verdict);
    const label = verdictLabelCompactFor(row.verdict);

    doc.font("Helvetica").fontSize(6).fillColor(COLORS.slate700);
    doc.text(truncateText(row.role, 48), x + 5, rowY + 3, { width: w * 0.62, lineBreak: false });

    doc.font("Helvetica-Bold").fontSize(5);
    const tw = doc.widthOfString(label);
    const pw = tw + 8;
    const pillX = x + w - pw - 5;
    doc.save();
    doc.roundedRect(pillX, rowY + 2, pw, 9, 4).fill(vStyle.bgHex);
    doc.roundedRect(pillX, rowY + 2, pw, 9, 4).lineWidth(0.35).strokeColor(vStyle.hex).stroke();
    doc.fillColor(vStyle.hex).text(label, pillX + 4, rowY + 3.5, { lineBreak: false });
    doc.restore();

    rowY += rowH;
  }

  return y + tableH;
}

function drawFooter(doc: PdfDoc): void {
  const footerY = PAGE_H - MARGIN - FOOTER_H + 4;
  doc.save();
  doc.moveTo(MARGIN, footerY).lineTo(MARGIN + CONTENT_W, footerY).strokeColor(COLORS.slate200).lineWidth(0.5).stroke();
  doc.restore();
  doc.font("Helvetica").fontSize(5.5).fillColor(COLORS.slate400);
  doc.text(
    "This report reflects documented résumé evidence against the job description. It supports screening conversations and is not a substitute for interview evaluation or background verification. Generated by ResumeAtlas.",
    MARGIN,
    footerY + 4,
    { width: CONTENT_W, height: FOOTER_H - 6, lineGap: 0.6, ellipsis: true }
  );
}

export function renderAnalysisReportPdf(input: AnalysisReportPdfInput): Promise<Buffer> {
  const snapshot = buildDashboardReportSnapshot({
    analyzeResult: input.analyzeResult,
    evidenceDashboard: input.evidenceDashboard,
    selectedRecommendedFixes: input.selectedRecommendedFixes,
  });

  const selectedList =
    input.selectedRecommendedFixes && input.selectedRecommendedFixes.length > 0
      ? input.selectedRecommendedFixes
      : snapshot.recommendedFixes;
  const selectedKeys = new Set(selectedList.map(recommendedFixKey));

  const doc = new PDFDocument({
    size: "A4",
    margin: MARGIN,
    autoFirstPage: true,
  });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });

  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const left = MARGIN;
  const w = CONTENT_W;
  const gap = 8;
  const half = (w - gap) / 2;
  let y = drawPageHeader(doc, input.generatedAt);

  const row1Bottom = Math.max(
    drawVerdictPanel(doc, left, y, half, snapshot),
    drawScanSummaryPanel(doc, left + half + gap, y, half, snapshot)
  );
  y = row1Bottom + 6;

  if (snapshot.bulletPreview?.before && snapshot.bulletPreview.after) {
    y = drawImpactPreview(doc, left, y, w, snapshot.bulletPreview.before, snapshot.bulletPreview.after) + 6;
  }

  const colGap = 8;
  const colW = (w - colGap) / 2;
  const risksTop = y;

  if (snapshot.riskItems.length > 0) {
    let riskY = drawSectionLabel(doc, left, risksTop, colW, snapshot.risksTitle);
    riskY = drawText(doc, TOP_REJECTION_RISKS_INTRO, left, riskY, colW, {
      size: 5.5,
      color: COLORS.slate500,
      height: 10,
      lineGap: 0.5,
    });
    riskY += 2;
    for (let i = 0; i < snapshot.riskItems.length; i++) {
      riskY = drawRejectionRiskCard(doc, left, riskY, colW, i, snapshot.riskItems[i]!) + 4;
    }
    y = Math.max(y, riskY);
  }

  if (snapshot.recommendedFixes.length > 0) {
    let fixY = drawSectionLabel(doc, left + colW + colGap, risksTop, colW, RECOMMENDED_FIXES_TITLE);
    fixY = drawText(doc, RECOMMENDED_FIXES_INTRO, left + colW + colGap, fixY, colW * 0.68, {
      size: 5.5,
      color: COLORS.slate500,
      height: 10,
      lineGap: 0.5,
    });
    if (snapshot.projectedUplift > 0) {
      doc.font("Helvetica-Bold").fontSize(5.5).fillColor(COLORS.emerald700);
      doc.text(`+${snapshot.projectedUplift}% projected`, left + colW + colGap + colW * 0.68, fixY - 10, {
        width: colW * 0.32,
        align: "right",
        lineBreak: false,
      });
    }
    fixY += 2;
    for (let i = 0; i < snapshot.recommendedFixes.length; i++) {
      const fix = snapshot.recommendedFixes[i]!;
      fixY = drawRecommendedFixRow(
        doc,
        left + colW + colGap,
        fixY,
        colW,
        recommendedFixActionLabel(fix),
        snapshot.fixUplifts[i] ?? 0,
        selectedKeys.has(recommendedFixKey(fix))
      );
    }
    y = Math.max(y, fixY);
  } else if (snapshot.riskItems.length > 0) {
    y = risksTop + 160;
  }

  y += 4;

  const keywordCount =
    snapshot.keywordGroups.proven.length +
    snapshot.keywordGroups.weak.length +
    snapshot.keywordGroups.missing.length;
  if (keywordCount > 0 && y < CONTENT_BOTTOM - 80) {
    y = drawSectionLabel(doc, left, y, w, KEYWORD_COVERAGE_SCORE_TITLE) + 1;
    y = drawText(
      doc,
      `${snapshot.breakdown.proven} proven · ${snapshot.breakdown.weak} weak · ${snapshot.breakdown.missing} missing`,
      left,
      y,
      w,
      { size: 5.5, color: COLORS.slate500, height: 9 }
    );
    y += 2;
    for (const tone of ["proven", "weak", "missing"] as const) {
      const maxPills = tone === "proven" ? 8 : tone === "weak" ? 4 : 6;
      y = drawKeywordToneGroup(
        doc,
        left,
        y,
        w,
        tone,
        snapshot.keywordGroups[tone].map((row) => row.skill),
        maxPills
      );
    }
    y += 2;
  }

  if (snapshot.roleFitRows.length > 0 && y < CONTENT_BOTTOM - 40) {
    y = drawSectionLabel(doc, left, y, w, ROLE_FIT_SECTION_TITLE) + 1;
    if (ROLE_FIT_SECTION_INTRO) {
      y = drawText(doc, truncateText(ROLE_FIT_SECTION_INTRO, 160), left, y, w, {
        size: 5.5,
        color: COLORS.slate500,
        height: 10,
        lineGap: 0.5,
      });
    }
    y = drawRoleFitTable(doc, left, y, w, snapshot.roleFitRows.slice(0, 5));
  }

  drawFooter(doc);
  doc.end();
  return done;
}
