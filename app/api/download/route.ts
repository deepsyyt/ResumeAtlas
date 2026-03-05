import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { getSupabaseAdmin } from "@/app/lib/supabase/server";
import type { Resume } from "@/app/types/resume";

type DownloadRequestBody = {
  resume?: Resume;
};

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

    // Require that the user has purchased credits (but do NOT consume them)
    let { data: profile, error } = await supabase
      .from("profiles")
      .select("download_credits")
      .eq("id", user.id)
      .single();

    if (!profile || error) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email ?? null,
        resume_credits: 0,
        free_preview_used: false,
        generation_credits: 0,
        download_credits: 0,
      });
      profile = { download_credits: 0 };
    }

    const credits = profile.download_credits ?? 0;
    if (credits <= 0) {
      return NextResponse.json(
        { error: "Download requires credits." },
        { status: 403 }
      );
    }

    const body = (await request.json()) as DownloadRequestBody;
    const resume = body?.resume;

    if (!resume) {
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

    // Build a simple, ATS-friendly PDF layout
    const { basics, experience, skills, education } = resume;

    doc.fontSize(18).text(basics.name || "Name", { align: "left" });
    if (basics.title) {
      doc.moveDown(0.3);
      doc.fontSize(12).fillColor("#555555").text(basics.title, { align: "left" });
    }

    doc.moveDown(0.8);
    doc
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .strokeColor("#e5e7eb")
      .stroke();

    if (basics.summary) {
      doc.moveDown(0.8);
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text("SUMMARY".toUpperCase(), { continued: false });
      doc.moveDown(0.2);
      doc.fontSize(11).fillColor("#111827").text(basics.summary, {
        align: "left",
      });
    }

    if (experience && experience.length > 0) {
      doc.moveDown(0.8);
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text("EXPERIENCE".toUpperCase());
      doc.moveDown(0.2);

      experience.forEach((exp) => {
        doc.fontSize(11).fillColor("#111827").text(exp.role || "", {
          continued: true,
        });
        if (exp.duration) {
          doc
            .fontSize(10)
            .fillColor("#6b7280")
            .text(`  ·  ${exp.duration}`, { continued: false });
        } else {
          doc.text("");
        }

        if (exp.company) {
          doc
            .fontSize(10)
            .fillColor("#4b5563")
            .text(exp.company, { align: "left" });
        }

        if (exp.bullets && exp.bullets.length > 0) {
          doc.moveDown(0.1);
          exp.bullets.forEach((b) => {
            doc
              .fontSize(10)
              .fillColor("#111827")
              .text(`• ${b}`, { indent: 10 });
          });
        }

        doc.moveDown(0.6);
      });
    }

    if (skills && skills.length > 0) {
      doc.moveDown(0.4);
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text("SKILLS".toUpperCase());
      doc.moveDown(0.2);
      doc
        .fontSize(11)
        .fillColor("#111827")
        .text(skills.join(" · "), { align: "left" });
    }

    if (education && education.length > 0) {
      doc.moveDown(0.6);
      doc
        .fontSize(10)
        .fillColor("#6b7280")
        .text("EDUCATION".toUpperCase());
      doc.moveDown(0.2);

      education.forEach((edu) => {
        doc
          .fontSize(11)
          .fillColor("#111827")
          .text(edu.degree || "", { align: "left" });
        const line = [edu.institution, edu.year].filter(Boolean).join(" · ");
        if (line) {
          doc
            .fontSize(10)
            .fillColor("#4b5563")
            .text(line, { align: "left" });
        }
        doc.moveDown(0.4);
      });
    }

    doc.end();
    const pdfBuffer = await pdfPromise;

    try {
      await supabase
        .from("profiles")
        .update({ download_credits: credits - 1 })
        .eq("id", user.id)
        .gt("download_credits", 0);
    } catch {
      // swallow decrement errors, PDF still returns
    }

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

