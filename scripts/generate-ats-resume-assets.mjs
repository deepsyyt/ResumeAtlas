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
Chicago, IL · jordan.lee@email.com · (555) 010-0199 · linkedin.com/in/jordanlee

SUMMARY
Senior business analyst with 8+ years translating requirements into shipped solutions. Delivers SQL-backed reporting, executive dashboards, and cross-functional alignment that improves forecast accuracy and cycle time across finance and operations.

SKILLS
SQL · Power BI · Tableau · Excel · Requirements gathering · Process mapping · Jira · Stakeholder management

EXPERIENCE
Senior Business Analyst · Northwind Financial · 2019-Present
• Led requirements workshops with 12 stakeholders; delivered a unified KPI framework adopted across finance and ops, reducing conflicting metrics by 38%.
• Built Power BI executive dashboard suite; cut monthly close reporting time from 6 days to 2.5 days.
• Mapped order-to-cash processes and authored 140+ user stories; accelerated release cadence by 22% over three quarters.
• Partnered with engineering on API integration specs; reduced production defects tied to requirements gaps by 31%.

Business Analyst · Lakeside Corp · 2016-2019
• Standardized reporting definitions in SQL and Excel; eliminated duplicate KPI versions used by three departments.
• Facilitated UAT for a billing integration; documented 48 acceptance scenarios with zero rollback on launch.

EDUCATION
MBA · Midwest University · 2018 · BS Finance · 2014`;

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
