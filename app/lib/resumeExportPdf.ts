import PDFDocument from "pdfkit/js/pdfkit.standalone";
import type { Resume } from "@/app/types/resume";

export type PdfDoc = InstanceType<typeof PDFDocument>;

/** Navy section / company color — matches professional resume reference. */
const COLOR_NAVY = "#0f3d6e";
const COLOR_BODY = "#1e293b";
const COLOR_MUTED = "#64748b";
const COLOR_RULE = "#cbd5e1";

const PT_NAME = 22;
const PT_TITLE = 11;
const PT_TAGLINE = 9;
const PT_CONTACT = 8.5;
const PT_SECTION = 10;
const PT_COMPANY = 10;
const PT_ROLE = 9.5;
const PT_BODY = 9;
const PT_BULLET = 8.75;
const PT_PROJECT = 9;
const PT_SKILL_LABEL = 9;

const LINE_GAP_BODY = 1.15;
const LINE_GAP_BULLET = 1.1;

function contentWidth(d: PdfDoc): number {
  return d.page.width - d.page.margins.left - d.page.margins.right;
}

function marginLeft(d: PdfDoc): number {
  return d.page.margins.left;
}

function resetX(d: PdfDoc): void {
  d.x = marginLeft(d);
}

function remainingY(d: PdfDoc): number {
  return d.page.height - d.page.margins.bottom - d.y;
}

function ensureSpace(d: PdfDoc, min: number): void {
  if (remainingY(d) < min) {
    d.addPage();
  }
  resetX(d);
}

function heightOf(
  d: PdfDoc,
  text: string,
  opts: { font: string; size: number; width?: number; lineGap?: number }
): number {
  d.font(opts.font).fontSize(opts.size);
  return d.heightOfString(text, {
    width: opts.width ?? contentWidth(d),
    lineGap: opts.lineGap ?? 0,
  });
}

function drawRule(d: PdfDoc): void {
  const y = d.y;
  d.lineWidth(0.75);
  d.moveTo(marginLeft(d), y)
    .lineTo(d.page.width - d.page.margins.right, y)
    .strokeColor(COLOR_RULE)
    .stroke();
  resetX(d);
}

function parseTitleBlock(title: string): { headline: string; tagline: string | null } {
  const raw = title.trim();
  if (!raw) return { headline: "", tagline: null };

  const pipeSplit = raw.split(/\s*[|]\s*/);
  if (pipeSplit.length >= 2) {
    const headline = pipeSplit[0]!.trim();
    const rest = pipeSplit.slice(1).join(" | ");
    const tags = rest
      .split(/[,•·]/)
      .map((t) => t.trim())
      .filter(Boolean)
      .join("  •  ");
    return { headline, tagline: tags || null };
  }

  return { headline: raw, tagline: null };
}

function contactToSingleLine(contact: string): string {
  return contact
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .join("  |  ");
}

function sanitizeBullet(text: string): string {
  return String(text ?? "")
    .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
    .replace(/^\s*bullet\s*:\s*/i, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}


function buildPipeRows(items: string[], maxCharsPerRow = 92): string[] {
  const rows: string[] = [];
  let current = "";
  for (const item of items) {
    const sep = current ? "  |  " : "";
    const candidate = `${current}${sep}${item}`;
    if (candidate.length > maxCharsPerRow && current) {
      rows.push(current);
      current = item;
    } else {
      current = candidate;
    }
  }
  if (current) rows.push(current);
  return rows;
}

function drawSectionHeader(d: PdfDoc, label: string, isFirst = false): void {
  if (!isFirst) {
    d.moveDown(0.85);
  }
  ensureSpace(d, 28);
  d.moveDown(isFirst ? 0.15 : 0.05);
  resetX(d);
  const top = d.y;
  d.font("Helvetica-Bold")
    .fontSize(PT_SECTION)
    .fillColor(COLOR_NAVY)
    .text(label.toUpperCase(), marginLeft(d), top, {
      width: contentWidth(d),
      characterSpacing: 0.4,
    });
  d.y = top + heightOf(d, label.toUpperCase(), { font: "Helvetica-Bold", size: PT_SECTION }) + 3;
  drawRule(d);
  d.moveDown(0.35);
  resetX(d);
}

function drawTextBlock(
  d: PdfDoc,
  text: string,
  opts: { font?: string; size?: number; color?: string; lineGap?: number } = {}
): void {
  const font = opts.font ?? "Helvetica";
  const size = opts.size ?? PT_BODY;
  const lineGap = opts.lineGap ?? LINE_GAP_BODY;
  const h = heightOf(d, text, { font, size, lineGap }) + 4;
  ensureSpace(d, h);
  const top = d.y;
  resetX(d);
  d.font(font).fontSize(size).fillColor(opts.color ?? COLOR_BODY);
  d.text(text, marginLeft(d), top, { width: contentWidth(d), align: "left", lineGap });
  d.y = top + h;
  resetX(d);
}

function drawBullet(d: PdfDoc, text: string, indent = 14): void {
  const cleaned = sanitizeBullet(text);
  if (!cleaned) return;

  const left = marginLeft(d) + indent;
  const width = contentWidth(d) - indent;
  const line = `•  ${cleaned}`;

  const estH =
    heightOf(d, line, {
      font: "Helvetica",
      size: PT_BULLET,
      width,
      lineGap: LINE_GAP_BULLET,
    }) + 8;
  ensureSpace(d, estH);

  const top = d.y;
  resetX(d);
  d.font("Helvetica").fontSize(PT_BULLET).fillColor(COLOR_BODY);
  d.text(line, left, top, { width, lineGap: LINE_GAP_BULLET });
  d.y = top + estH - 6;
  resetX(d);
}

function drawCompanyDateRow(d: PdfDoc, company: string, dates: string): void {
  const left = marginLeft(d);
  const w = contentWidth(d);
  const companyText = company.trim().toUpperCase();
  const dateText = dates.trim();

  ensureSpace(d, 22);
  const top = d.y;

  d.font("Helvetica-Bold").fontSize(PT_COMPANY).fillColor(COLOR_NAVY);
  const companyW = dateText ? w * 0.68 : w;
  d.text(companyText, left, top, { width: companyW, lineBreak: true });

  if (dateText) {
    d.font("Helvetica-Bold").fontSize(PT_COMPANY).fillColor(COLOR_NAVY);
    d.text(dateText, left, top, { width: w, align: "right", lineBreak: false });
  }

  const h = Math.max(
    heightOf(d, companyText, { font: "Helvetica-Bold", size: PT_COMPANY, width: companyW }),
    dateText
      ? heightOf(d, dateText, { font: "Helvetica-Bold", size: PT_COMPANY, width: w * 0.3 })
      : 0
  );
  d.y = top + h + 2;
  resetX(d);
}

function drawRoleLine(d: PdfDoc, role: string): void {
  const t = role.trim();
  if (!t) return;
  ensureSpace(d, 16);
  const top = d.y;
  resetX(d);
  d.font("Helvetica-BoldOblique").fontSize(PT_ROLE).fillColor(COLOR_NAVY);
  d.text(t, marginLeft(d), top, { width: contentWidth(d), align: "left" });
  d.y = top + heightOf(d, t, { font: "Helvetica-BoldOblique", size: PT_ROLE }) + 4;
  resetX(d);
}

function drawProjectTitle(d: PdfDoc, title: string): void {
  const t = title.trim();
  if (!t) return;
  ensureSpace(d, 18);
  d.moveDown(0.1);
  const top = d.y;
  resetX(d);
  d.font("Helvetica-Bold").fontSize(PT_PROJECT).fillColor(COLOR_BODY);
  d.text(t, marginLeft(d), top, { width: contentWidth(d), align: "left" });
  d.y = top + heightOf(d, t, { font: "Helvetica-Bold", size: PT_PROJECT }) + 6;
  resetX(d);
}

function drawSkillCategory(d: PdfDoc, label: string, items: string[]): void {
  const body = items.map((i) => i.trim()).filter(Boolean).join(", ");
  if (!body) return;
  const line = `${label}: ${body}`;
  const h =
    heightOf(d, line, {
      font: "Helvetica",
      size: PT_BODY,
      lineGap: LINE_GAP_BODY,
    }) + 4;
  ensureSpace(d, h);
  resetX(d);
  const top = d.y;
  d.font("Helvetica-Bold").fontSize(PT_SKILL_LABEL).fillColor(COLOR_BODY);
  const labelText = `${label}: `;
  const labelW = d.widthOfString(labelText);
  d.text(labelText, marginLeft(d), top, { width: labelW, lineBreak: false });
  d.font("Helvetica").fontSize(PT_BODY).fillColor(COLOR_BODY);
  d.text(body, marginLeft(d) + labelW, top, {
    width: contentWidth(d) - labelW,
    lineGap: LINE_GAP_BODY,
  });
  d.y = top + h;
  resetX(d);
}

function drawPipeBlock(d: PdfDoc, rows: string[]): void {
  for (const row of rows) {
    drawTextBlock(d, row, { size: PT_BODY, lineGap: LINE_GAP_BODY });
    d.moveDown(0.06);
  }
}

function drawEducationRow(d: PdfDoc, line: string, year: string): void {
  ensureSpace(d, 18);
  const left = marginLeft(d);
  const w = contentWidth(d);
  const top = d.y;
  const yearText = year.trim();

  d.font("Helvetica").fontSize(PT_BODY).fillColor(COLOR_BODY);
  d.text(line, left, top, { width: yearText ? w * 0.72 : w, lineBreak: true });

  if (yearText) {
    d.font("Helvetica-Bold").fontSize(PT_BODY).fillColor(COLOR_NAVY);
    d.text(yearText, left, top, { width: w, align: "right", lineBreak: false });
  }

  const h = Math.max(
    heightOf(d, line, { font: "Helvetica", size: PT_BODY, width: w * 0.72 }),
    yearText ? heightOf(d, yearText, { font: "Helvetica-Bold", size: PT_BODY }) : 0
  );
  d.y = top + h + 4;
  resetX(d);
}

function drawHeader(d: PdfDoc, resume: Resume): void {
  const { basics } = resume;
  const name = basics.name?.trim() || "Resume";
  const { headline, tagline } = parseTitleBlock(basics.title?.trim() ?? "");

  ensureSpace(d, 80);
  d.font("Helvetica-Bold")
    .fontSize(PT_NAME)
    .fillColor(COLOR_NAVY)
    .text(name.toUpperCase(), { align: "left", characterSpacing: 0.6 });
  d.moveDown(0.08);

  if (headline) {
    d.font("Helvetica-Bold")
      .fontSize(PT_TITLE)
      .fillColor(COLOR_NAVY)
      .text(headline.toUpperCase(), { align: "left", characterSpacing: 0.35 });
    d.moveDown(0.1);
  }

  if (tagline) {
    d.font("Helvetica").fontSize(PT_TAGLINE).fillColor(COLOR_MUTED);
    d.text(tagline, { align: "left", lineGap: 0.5 });
    d.moveDown(0.12);
  }

  const contactLine = basics.contact?.trim() ? contactToSingleLine(basics.contact) : "";
  if (contactLine) {
    d.font("Helvetica").fontSize(PT_CONTACT).fillColor(COLOR_MUTED);
    d.text(contactLine, { align: "left", lineGap: 0.4 });
  }

  d.moveDown(0.45);
  drawRule(d);
  d.moveDown(0.35);
  resetX(d);
}

function drawExperience(d: PdfDoc, resume: Resume, isFirstSection: boolean): boolean {
  const { experience } = resume;
  if (!experience?.length) return isFirstSection;

  drawSectionHeader(d, "Professional Experience", isFirstSection);

  experience.forEach((exp, expIndex) => {
    const company = exp.company?.trim() ?? "";
    const role = exp.role?.trim() ?? "";
    const dates = exp.duration?.trim() ?? "";
    const bullets = (exp.bullets ?? []).map(sanitizeBullet).filter(Boolean);
    const projects = (exp.projects ?? []).filter(
      (p) => p.title?.trim() || (p.bullets ?? []).some((b) => sanitizeBullet(b))
    );

    if (expIndex > 0) d.moveDown(0.35);

    // Keep role header with at least one content line when possible.
    ensureSpace(d, 48);
    if (company || dates) drawCompanyDateRow(d, company || role, dates);
    else if (role) drawRoleLine(d, role);
    if (company && role) drawRoleLine(d, role);

    bullets.forEach((b) => drawBullet(d, b));

    projects.forEach((proj) => {
      if (proj.title?.trim()) drawProjectTitle(d, proj.title);
      (proj.bullets ?? []).map(sanitizeBullet).filter(Boolean).forEach((b) => drawBullet(d, b));
    });
  });

  return false;
}

/** Professional ATS-friendly PDF layout (reference: navy headers, rules, metric accents). */
export function renderProfessionalResumePdf(d: PdfDoc, resume: Resume): void {
  drawHeader(d, resume);

  let isFirstSection = true;

  if (resume.basics.summary?.trim()) {
    drawSectionHeader(d, "Executive Summary", isFirstSection);
    isFirstSection = false;
    drawTextBlock(d, resume.basics.summary.trim());
  }

  const hasSkillGroups = (resume.skillGroups?.length ?? 0) > 0;
  const flatSkills = (resume.skills ?? []).map((s) => String(s).trim()).filter(Boolean);

  if (hasSkillGroups) {
    const competencyItems = resume.skillGroups!.flatMap((g) =>
      (g.items ?? []).map((i) => String(i).trim()).filter(Boolean)
    );
    if (competencyItems.length > 0) {
      drawSectionHeader(d, "Core Competencies", isFirstSection);
      isFirstSection = false;
      drawPipeBlock(d, buildPipeRows(competencyItems, 88));
    }
  } else if (flatSkills.length > 0) {
    drawSectionHeader(d, "Core Competencies", isFirstSection);
    isFirstSection = false;
    drawPipeBlock(d, buildPipeRows(flatSkills));
  }

  isFirstSection = drawExperience(d, resume, isFirstSection);

  if (hasSkillGroups) {
    drawSectionHeader(d, "Technical Skills", isFirstSection);
    isFirstSection = false;
    for (const group of resume.skillGroups!) {
      const items = (group.items ?? []).map((i) => String(i).trim()).filter(Boolean);
      if (items.length === 0) continue;
      drawSkillCategory(d, group.label?.trim() || "Skills", items);
    }
  } else if (flatSkills.length > 0) {
    // Already shown as Core Competencies before experience.
  }

  const certs = (resume.certifications ?? []).map((c) => String(c).trim()).filter(Boolean);
  if (certs.length > 0) {
    drawSectionHeader(d, "Certifications", isFirstSection);
    isFirstSection = false;
    drawPipeBlock(d, buildPipeRows(certs, 100));
  }

  const awards = (resume.awards ?? []).map((a) => String(a).trim()).filter(Boolean);
  if (awards.length > 0) {
    drawSectionHeader(d, "Awards & Recognitions", isFirstSection);
    isFirstSection = false;
    drawPipeBlock(d, buildPipeRows(awards, 100));
  }

  if (resume.education?.length) {
    drawSectionHeader(d, "Education", isFirstSection);
    isFirstSection = false;
    for (const edu of resume.education) {
      const line = [edu.degree, edu.institution].filter(Boolean).join(" · ").trim();
      if (!line && !edu.year?.trim()) continue;
      drawEducationRow(d, line || edu.degree || edu.institution, edu.year ?? "");
    }
  }

  for (const section of resume.additionalSections ?? []) {
    const title = String(section.title ?? "").trim();
    const lines = (section.lines ?? []).map((l) => String(l).trim()).filter(Boolean);
    if (!title || lines.length === 0) continue;
    drawSectionHeader(d, title, isFirstSection);
    isFirstSection = false;
    lines.forEach((line) => drawBullet(d, line.replace(/^•\s*/, ""), 0));
  }
}

export function createResumePdfDocument(): PdfDoc {
  return new PDFDocument({
    size: "LETTER",
    margin: 44,
    bufferPages: true,
  });
}

export async function resumeToPdfBuffer(resume: Resume): Promise<Buffer> {
  const doc = createResumePdfDocument();
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  });
  const done = new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
  renderProfessionalResumePdf(doc, resume);
  doc.end();
  return done;
}
