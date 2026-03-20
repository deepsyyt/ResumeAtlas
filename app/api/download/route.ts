import { NextResponse } from "next/server";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import type { Resume } from "@/app/types/resume";

type DownloadRequestBody = {
  resume?: Resume;
  rawText?: string;
};

type PdfDoc = InstanceType<typeof PDFDocument>;

function contentWidth(d: PdfDoc): number {
  return d.page.width - d.page.margins.left - d.page.margins.right;
}

function remainingY(d: PdfDoc): number {
  return d.page.height - d.page.margins.bottom - d.y;
}

/** New page when less than `min` pt remain (reduces splits mid-bullet / mid-section). */
function ensureSpace(d: PdfDoc, min: number): void {
  if (remainingY(d) < min) {
    d.addPage();
  }
}

/** Wrapped height for a string using the same options as a following `.text()` call. */
function heightOfWrappedText(
  d: PdfDoc,
  text: string,
  opts: { font: string; size: number; lineGap?: number }
): number {
  d.font(opts.font).fontSize(opts.size);
  const lineGap = opts.lineGap ?? 0;
  return d.heightOfString(text, {
    width: contentWidth(d),
    lineGap,
  });
}

function sanitizeBulletPdf(text: string): string {
  return String(text ?? "")
    .replace(/^\s*(?:optimized|optimised|rewritten|improved)\s+bullet\s*:\s*/i, "")
    .replace(/^\s*bullet\s*:\s*/i, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Section titles vs body: headings bold + larger; bullets/body smaller. */
const PDF_SECTION_PT = 11;
const PDF_BODY_PT = 9.5;
const PDF_BULLET_PT = 9;
const PDF_ROLE_PT = 10;
const PDF_META_PT = 9;
/** Project titles: regular weight only (not bold). */
const PDF_PROJECT_TITLE_PT = 9;

/** Role left, dates right — mirrors StructuredResume experience header row. */
function drawExperienceRoleRow(doc: PdfDoc, role: string, dates: string): void {
  const left = doc.page.margins.left;
  const w = contentWidth(doc);
  const top = doc.y;
  const dateStr = dates.trim();
  const roleBlockW = dateStr ? w * 0.62 : w;

  doc.font("Helvetica-Bold").fontSize(PDF_ROLE_PT).fillColor("#0f172a");
  const hRole = doc.heightOfString(role || "Experience", {
    width: roleBlockW,
    lineGap: 0,
  });
  let hDates = 0;
  if (dateStr) {
    doc.font("Helvetica").fontSize(PDF_META_PT).fillColor("#64748b");
    hDates = doc.heightOfString(dateStr, {
      width: w * 0.36,
      align: "right",
      lineGap: 0,
    });
  }
  const rowH = Math.max(hRole, hDates) + 4;
  ensureSpace(doc, rowH + 2);

  doc.font("Helvetica-Bold").fontSize(PDF_ROLE_PT).fillColor("#0f172a");
  doc.text(role || "Experience", left, top, { width: roleBlockW, lineBreak: true });
  if (dateStr) {
    doc.font("Helvetica").fontSize(PDF_META_PT).fillColor("#64748b");
    doc.text(dateStr, left, top, { width: w, align: "right", lineBreak: false });
  }
  doc.y = top + rowH;
}

function writePdfBullet(doc: PdfDoc, bulletText: string, indentPt: number): void {
  const cleaned = sanitizeBulletPdf(bulletText);
  if (!cleaned) return;
  const left = doc.page.margins.left + indentPt;
  const w = contentWidth(doc) - indentPt;
  const lineGap = 1.05;
  const line = `• ${cleaned}`;
  doc.font("Helvetica").fontSize(PDF_BULLET_PT).fillColor("#334155");
  const h = doc.heightOfString(line, { width: w, lineGap }) + 3;
  ensureSpace(doc, h);
  doc.text(line, left, doc.y, { width: w, lineGap });
}

/** @param isFirstSection - first block after header rule uses tighter top gap; later sections get extra air above the title. */
function pdfSectionLabel(doc: PdfDoc, label: string, isFirstSection = false): void {
  if (!isFirstSection) {
    doc.moveDown(1.2);
  }
  ensureSpace(doc, isFirstSection ? 30 : 42);
  doc.moveDown(isFirstSection ? 0.1 : 0.05);
  doc
    .font("Helvetica-Bold")
    .fontSize(PDF_SECTION_PT)
    .fillColor("#0f172a")
    .text(label.toUpperCase(), { align: "left" });
  doc.moveDown(0.32);
}

/** PDF layout aligned with app/components/StructuredResume.tsx (print styles). */
function renderStructuredResumeLikeUi(doc: PdfDoc, resume: Resume): void {
  const { basics, experience, skills, education } = resume;

  ensureSpace(doc, 72);
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#0f172a")
    .text(basics.name?.trim() || "Resume", { align: "left" });
  if (basics.title?.trim()) {
    doc.moveDown(0.12);
    doc.font("Helvetica-Bold").fontSize(14).fillColor("#1e293b").text(basics.title.trim(), {
      align: "left",
    });
  }
  const contact = basics.contact?.trim();
  if (contact) {
    for (const line of contact.split(/\r?\n/)) {
      const t = line.trim();
      if (!t) continue;
      doc.moveDown(0.1);
      doc.font("Helvetica").fontSize(12).fillColor("#475569").text(t, { align: "left" });
    }
  }

  doc.moveDown(0.45);
  doc.lineWidth(0.35);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor("#e2e8f0")
    .stroke();
  doc.moveDown(0.45);

  let firstPdfSection = true;
  if (basics.summary?.trim()) {
    pdfSectionLabel(doc, "Professional Summary", firstPdfSection);
    firstPdfSection = false;
    const sum = basics.summary.trim();
    const lineGap = 1.05;
    doc.font("Helvetica").fontSize(PDF_BODY_PT).fillColor("#334155");
    const h = doc.heightOfString(sum, { width: contentWidth(doc), lineGap }) + 4;
    ensureSpace(doc, h);
    doc.text(sum, { align: "left", lineGap });
  }

  if (skills && skills.length > 0) {
    pdfSectionLabel(doc, "Skills", firstPdfSection);
    firstPdfSection = false;
    const body = skills.join(" • ");
    const lineGap = 1.05;
    doc.font("Helvetica").fontSize(PDF_BODY_PT).fillColor("#334155");
    const h = doc.heightOfString(body, { width: contentWidth(doc), lineGap }) + 4;
    ensureSpace(doc, h);
    doc.text(body, { align: "left", lineGap });
  }

  if (experience && experience.length > 0) {
    pdfSectionLabel(doc, "Experience", firstPdfSection);
    firstPdfSection = false;
    experience.forEach((exp) => {
      drawExperienceRoleRow(doc, exp.role?.trim() || "", exp.duration?.trim() || "");
      if (exp.company?.trim()) {
        doc.moveDown(0.08);
        doc.font("Helvetica").fontSize(PDF_META_PT).fillColor("#475569").text(exp.company.trim(), {
          align: "left",
        });
      }
      const bullets = (exp.bullets ?? []).map(sanitizeBulletPdf).filter(Boolean);
      if (bullets.length > 0) {
        doc.moveDown(0.2);
        bullets.forEach((b) => writePdfBullet(doc, b, 18));
      }
      if (exp.projects && exp.projects.length > 0) {
        exp.projects.forEach((proj) => {
          if (!proj.title?.trim()) return;
          doc.moveDown(0.22);
          ensureSpace(doc, 22);
          // Project title: regular Helvetica only (never bold).
          doc
            .font("Helvetica")
            .fontSize(PDF_PROJECT_TITLE_PT)
            .fillColor("#1e293b")
            .text(proj.title.trim(), { align: "left" });
          doc.moveDown(0.12);
          (proj.bullets ?? [])
            .map(sanitizeBulletPdf)
            .filter(Boolean)
            .forEach((b) => writePdfBullet(doc, b, 18));
        });
      }
      doc.moveDown(0.45);
    });
  }

  if (education && education.length > 0) {
    pdfSectionLabel(doc, "Education", firstPdfSection);
    education.forEach((edu) => {
      const line = [edu.degree, edu.institution, edu.year].filter(Boolean).join(" · ").trim();
      if (!line) return;
      ensureSpace(doc, 20);
      doc.font("Helvetica").fontSize(PDF_BODY_PT).fillColor("#0f172a").text(line, { align: "left" });
      doc.moveDown(0.2);
    });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.replace(/Bearer\s+/i, "").trim() || null;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Login required to download resume." },
        { status: 401 }
      );
    }

    const supabase = getSupabaseAdmin();
    const {
      data: { user },
    } = await supabase.auth.getUser(accessToken);

    if (!user) {
      return NextResponse.json(
        { error: "Login required to download resume." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as DownloadRequestBody;
    const resume = body?.resume;
    const rawText = typeof body?.rawText === "string" ? body.rawText.trim() : "";

    if (!resume && !rawText) {
      return NextResponse.json(
        { error: "Missing resume payload." },
        { status: 400 }
      );
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
    });

    if (resume) {
      renderStructuredResumeLikeUi(doc, resume);
    } else if (rawText) {
      // Fallback: plain text only (no structured resume) — ATS-style typography.
      const lines = rawText.replace(/\r\n?/g, "\n").split("\n");
      const sectionHeaderRe = /^(professional summary|experience|skills|education)$/i;
      let i = 0;

      // Header block (name + contact lines)
      while (i < lines.length && !lines[i]!.trim()) i++;
      const name = (lines[i] ?? "").trim();
      i++;
      const contactLines: string[] = [];
      while (i < lines.length && lines[i]!.trim()) {
        contactLines.push(lines[i]!.trim());
        i++;
      }
      while (i < lines.length && !lines[i]!.trim()) i++;

      if (name) {
        const titleSplit = name.split(/\s+—\s+/).map((s) => s.trim()).filter(Boolean);
        if (titleSplit.length >= 2) {
          doc
            .font("Helvetica-Bold")
            .fontSize(24)
            .fillColor("#0f172a")
            .text(titleSplit[0]!, { align: "left" });
          doc.moveDown(0.12);
          doc
            .font("Helvetica-Bold")
            .fontSize(14)
            .fillColor("#1e293b")
            .text(titleSplit.slice(1).join(" — "), { align: "left" });
        } else {
          doc
            .font("Helvetica-Bold")
            .fontSize(24)
            .fillColor("#0f172a")
            .text(name, { align: "left" });
        }
      } else {
        doc
          .font("Helvetica-Bold")
          .fontSize(24)
          .fillColor("#0f172a")
          .text("Resume", { align: "left" });
      }
      if (contactLines.length > 0) {
        doc.moveDown(0.2);
        for (const c of contactLines) {
          doc
            .font("Helvetica")
            .fontSize(12)
            .fillColor("#475569")
            .text(c, { align: "left" });
        }
      }

      doc.moveDown(0.5);
      doc.lineWidth(0.35);
      doc
        .moveTo(doc.page.margins.left, doc.y)
        .lineTo(doc.page.width - doc.page.margins.right, doc.y)
        .strokeColor("#e2e8f0")
        .stroke();
      doc.moveDown(0.5);

      let firstRawSectionHeading = true;
      // Body sections
      while (i < lines.length) {
        const rawLine = lines[i] ?? "";
        i++;
        const t = rawLine.trim();
        if (!t) {
          doc.moveDown(0.28);
          continue;
        }

        // Project label (tab from resumeDocumentToPlainText) — subtle, not a section heading.
        if (/^\t/.test(rawLine)) {
          ensureSpace(doc, 22);
          doc
            .font("Helvetica")
            .fontSize(PDF_PROJECT_TITLE_PT)
            .fillColor("#1e293b")
            .text(t, { align: "left" });
          doc.moveDown(0.12);
          continue;
        }

        if (sectionHeaderRe.test(t)) {
          ensureSpace(doc, 52);
          if (!firstRawSectionHeading) {
            doc.moveDown(1.2);
          }
          firstRawSectionHeading = false;
          doc.moveDown(0.12);
          doc
            .font("Helvetica-Bold")
            .fontSize(PDF_SECTION_PT)
            .fillColor("#0f172a")
            .text(t.toUpperCase(), { align: "left" });
          doc.moveDown(0.32);
          continue;
        }

        // Bullet line
        if (/^•\s*/.test(t)) {
          const bulletText = t.replace(/^•\s*/, "").trim();
          writePdfBullet(doc, bulletText, 18);
          continue;
        }

        // Experience block: role — company — dates (matches resumeDocumentToPlainText)
        if (/—/.test(t)) {
          const parts = t.split("—").map((p) => p.trim()).filter(Boolean);
          if (parts.length >= 2) {
            const role = parts[0] ?? "";
            const company = parts[1] ?? "";
            const dates = parts.slice(2).join(" — ");
            drawExperienceRoleRow(doc, role, dates);
            if (company) {
              doc.moveDown(0.08);
              doc
                .font("Helvetica")
                .fontSize(PDF_META_PT)
                .fillColor("#475569")
                .text(company, { align: "left" });
            }
            doc.moveDown(0.2);
            continue;
          }
        }

        // Plain content line
        const plainGap = 1.05;
        const plainH =
          heightOfWrappedText(doc, t, {
            font: "Helvetica",
            size: PDF_BODY_PT,
            lineGap: plainGap,
          }) + 4;
        ensureSpace(doc, plainH);
        doc.font("Helvetica").fontSize(PDF_BODY_PT).fillColor("#334155").text(t, {
          align: "left",
          lineGap: plainGap,
        });
      }
    }

    doc.end();
    const pdfBuffer = await pdfPromise;

    return new Response(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="ResumeAtlas_Optimized_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error("Download PDF error", error);
    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  }
}

