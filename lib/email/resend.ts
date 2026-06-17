import { Resend } from "resend";
import {
  WEEKLY_UPDATE_SUBJECT,
  buildWeeklyUpdateHtml,
} from "@/lib/email/weeklyUpdateTemplate";

const FROM_ADDRESS = "ResumeAtlas <hello@resumeatlas.io>";

let resendClient: Resend | null = null;

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export type SendEmailResult =
  | { success: true; id?: string }
  | { success: false; error: string };

/**
 * Send the weekly ResumeAtlas update email to a single recipient.
 */
export async function sendWeeklyUpdateEmail(
  to: string
): Promise<SendEmailResult> {
  const trimmed = to.trim();
  if (!trimmed) {
    return { success: false, error: "Recipient email is empty." };
  }

  try {
    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: trimmed,
      subject: WEEKLY_UPDATE_SUBJECT,
      html: buildWeeklyUpdateHtml(),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Resend error";
    return { success: false, error: message };
  }
}

export type BatchEmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
};

/**
 * Send up to 100 emails in one Resend batch request.
 * Returns counts and any error message from Resend.
 */
export async function sendWeeklyUpdateBatch(
  recipients: string[]
): Promise<{ sent: number; failed: number; error?: string }> {
  if (recipients.length === 0) {
    return { sent: 0, failed: 0 };
  }

  const html = buildWeeklyUpdateHtml();
  const emails: BatchEmailPayload[] = recipients.map((to) => ({
    from: FROM_ADDRESS,
    to,
    subject: WEEKLY_UPDATE_SUBJECT,
    html,
  }));

  try {
    const resend = getResend();
    const { data, error } = await resend.batch.send(emails, {
      batchValidation: "permissive",
    });

    if (error) {
      console.error("[email] Resend batch error:", error);
      return { sent: 0, failed: recipients.length, error: error.message };
    }

    const batchErrors =
      "errors" in data && Array.isArray(data.errors) ? data.errors : [];
    const sent = data.data.length;
    const failed = recipients.length - sent;

    if (batchErrors.length > 0) {
      console.warn("[email] Resend batch partial failures:", batchErrors);
    }

    return { sent, failed };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown batch error";
    console.error("[email] Resend batch exception:", message);
    return { sent: 0, failed: recipients.length, error: message };
  }
}

/** Split an array into chunks of the given size (Resend batch limit is 100). */
export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
