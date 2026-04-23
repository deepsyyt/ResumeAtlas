/**
 * One-off (or re-run) generator: public/downloads/ats-resume-template.{txt,docx}
 * Keep text aligned with `resumeTemplateSnippets.ts` (SNIPPET_GENERAL_FRESHER).
 */
import { Document, Packer, Paragraph, TextRun } from "docx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "downloads");

const SNIPPET_GENERAL_FRESHER = `JORDAN LEE
Boston, MA · jordan.lee@email.com · (555) 010-0199 · linkedin.com/in/jordanlee

SUMMARY
Economics graduate targeting operations analytics roles. Internship-proven at turning messy operational data into weekly KPI packs, exec-ready Excel readouts, and SQL-backed answers for account managers—comfortable owning the loop from raw tables to clear stakeholder updates under tight deadlines.

SKILLS
SQL · Microsoft Excel · Google Sheets · Tableau (basics) · Python (pandas, introductory)

EXPERIENCE
Operations Analytics Intern · Acme Logistics · Jun 2023–Aug 2024
• Built weekly KPI pack in Excel; reduced prep time from roughly 4 hours to under 90 minutes.
• Joined and cleaned shipment-level tables (5k+ rows/week) for ad-hoc questions from account managers.

PROJECTS
Campus operations KPI dashboard (Tableau + SQL) · Academic project · team of 3
• Modeled dining-hall traffic and staffing gaps from 18 months of facility logs; surfaced $120K annualized overtime risk and a staffing plan adopted by the student union board.

Cohort retention capstone (Python + Excel) · Senior thesis · anonymized sample data
• Segmented first-year retention drivers with logistic-style feature exploration; delivered a 12-slide readout and reproducible notebook the department reused for advising outreach.

EDUCATION
BS Economics · State University · May 2024`;

/** One paragraph per line: matches plain-text view in Word. */
function paragraphsLineByLine(t) {
  return t.split("\n").map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            font: "Calibri",
            size: 22, // 11pt
          }),
        ],
        spacing: { after: 80 },
      })
  );
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const txtPath = path.join(outDir, "ats-resume-template.txt");
  fs.writeFileSync(txtPath, SNIPPET_GENERAL_FRESHER, "utf8");

  const children = paragraphsLineByLine(SNIPPET_GENERAL_FRESHER);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(outDir, "ats-resume-template.docx"), buf);
  // eslint-disable-next-line no-console
  console.log("Wrote", txtPath, "and ats-resume-template.docx");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
