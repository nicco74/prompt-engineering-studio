import { verifyAuth } from "@/lib/auth";
import { getModel } from "@/lib/ai/registry";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // 1. Authenticate — defense in depth (proxy also checks, but DAL is authoritative)
  const authenticated = await verifyAuth();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded",
        message: "You have exceeded the maximum number of requests. Please try again later.",
        retryAfter: rateLimit.resetAt,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rateLimit.resetAt),
          "Retry-After": String(rateLimit.resetAt - Math.floor(Date.now() / 1000)),
        },
      }
    );
  }

  // 3. Parse request body
  let prompt: string;
  let systemPrompt: string | undefined;

  try {
    const body = await request.json();
    prompt = body.prompt;
    systemPrompt = body.systemPrompt;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Bad request", message: "A non-empty 'prompt' field is required." },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Bad request", message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 4. Stream AI response
  try {
    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      prompt: prompt.trim(),
    });

    const response = result.toTextStreamResponse();

    // Append rate limit headers to the streaming response
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    response.headers.set("X-RateLimit-Reset", String(rateLimit.resetAt));

    return response;
  } catch (error) {
    console.error("[ai/chat] Stream error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: "Failed to generate AI response." },
      { status: 500 }
    );
  }
}
