export const WEEKLY_UPDATE_SUBJECT =
  "Not getting interview calls? Check this first.";

const CTA_URL =
  "https://resumeatlas.io/check-resume-against-job-description";

/**
 * Responsive HTML email for the weekly ResumeAtlas update campaign.
 */
export function buildWeeklyUpdateHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${WEEKLY_UPDATE_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:32px 28px 8px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#6366f1;">ResumeAtlas</p>
              <h1 style="margin:0 0 20px;font-size:24px;line-height:1.3;color:#18181b;">Before you apply, check your resume against the job</h1>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3f3f46;">
                Most resumes don't get rejected because candidates lack experience.
              </p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#3f3f46;">
                They get rejected because the resume doesn't clearly match the job description.
              </p>
              <p style="margin:0 0 12px;font-size:16px;line-height:1.6;color:#18181b;font-weight:600;">
                ResumeAtlas helps you:
              </p>
              <ul style="margin:0 0 28px;padding-left:20px;font-size:16px;line-height:1.7;color:#3f3f46;">
                <li style="margin-bottom:8px;">Compare your resume against a job description in seconds</li>
                <li style="margin-bottom:8px;">Identify missing keywords and skills recruiters are looking for</li>
                <li style="margin-bottom:8px;">Find gaps between your experience and the role requirements</li>
                <li style="margin-bottom:8px;">Improve ATS compatibility before you apply</li>
                <li style="margin-bottom:8px;">Get actionable suggestions to strengthen your resume</li>
              </ul>
              <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#3f3f46;">
                Before you submit your next application, run a quick check:
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 28px;">
                <tr>
                  <td style="border-radius:8px;background-color:#4f46e5;">
                    <a href="${CTA_URL}" style="display:inline-block;padding:14px 24px;font-size:16px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Check resume against job description
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#3f3f46;">
                A 2-minute review today could save dozens of applications later.
              </p>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#71717a;">
                If you know someone actively job hunting, feel free to share ResumeAtlas with them.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid #e4e4e7;">
              <p style="margin:0;font-size:13px;line-height:1.5;color:#a1a1aa;">
                ResumeAtlas · <a href="https://resumeatlas.io" style="color:#6366f1;text-decoration:none;">resumeatlas.io</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
