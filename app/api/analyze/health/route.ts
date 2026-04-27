import { NextResponse } from "next/server";
import {
  parseAnthropicErrorType,
  resolveAnthropicModelCandidates,
} from "@/app/lib/anthropicModels";

const API_URL = "https://api.anthropic.com/v1/messages";

export async function GET() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: "ANTHROPIC_API_KEY is missing",
      },
      { status: 503 }
    );
  }

  const candidates = resolveAnthropicModelCandidates();
  let discoveredModelIds: string[] = [];
  try {
    const modelListResponse = await fetch("https://api.anthropic.com/v1/models", {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
    });
    const modelListText = await modelListResponse.text();
    if (modelListResponse.ok) {
      const parsed = JSON.parse(modelListText) as {
        data?: Array<{ id?: unknown }>;
      };
      discoveredModelIds = Array.isArray(parsed.data)
        ? parsed.data
            .map((m) => (typeof m.id === "string" ? m.id.trim() : ""))
            .filter(Boolean)
        : [];
    }
  } catch {
    // Keep health check resilient even if model discovery fails.
  }
  for (const model of candidates) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 16,
        temperature: 0,
        messages: [{ role: "user" as const, content: "health check" }],
      }),
    });

    const responseText = await response.text();
    if (response.ok) {
      return NextResponse.json({
        ok: true,
        configured: true,
        selectedModel: model,
        candidatesTried: candidates,
        discoveredModelIds,
      });
    }

    const errorType = parseAnthropicErrorType(responseText);
    const isModelUnavailable = response.status === 404 && errorType === "not_found_error";
    if (!isModelUnavailable) {
      return NextResponse.json(
        {
          ok: false,
          configured: true,
          selectedModel: null,
          candidatesTried: candidates,
          discoveredModelIds,
          upstreamStatus: response.status,
          upstreamErrorType: errorType,
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json(
    {
      ok: false,
      configured: true,
      selectedModel: null,
      candidatesTried: candidates,
      discoveredModelIds,
      error: "No configured Anthropic model is available",
    },
    { status: 503 }
  );
}
