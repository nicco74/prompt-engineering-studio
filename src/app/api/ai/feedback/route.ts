import { verifyAuth } from "@/lib/auth";
import { getModel } from "@/lib/ai/registry";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

/**
 * System prompt for evaluating user-submitted prompts.
 *
 * This rubric focuses on the core prompt-engineering principles taught
 * throughout the application: clarity, specificity, context, constraints,
 * and iterative refinement.
 */
const FEEDBACK_SYSTEM_PROMPT = `You are an expert prompt-engineering coach. The user will give you a prompt they have written for an AI assistant. Your job is to evaluate it and provide constructive feedback.

Evaluate the prompt against these criteria:
1. **Clarity** — Is the intent clear and unambiguous?
2. **Specificity** — Does it include enough detail (audience, tone, format, length)?
3. **Context** — Does it provide necessary background information?
4. **Constraints** — Does it set appropriate boundaries and output requirements?
5. **Structure** — Is it well-organized and easy to follow?

Respond with:
- A brief overall assessment (1-2 sentences)
- A rating for each criterion: Strong, Adequate, or Needs Improvement
- 2-3 specific, actionable suggestions for improvement
- An improved version of the prompt that incorporates your suggestions

Keep your feedback encouraging and educational. Use plain language. Format your response in Markdown.`;

export async function POST(request: NextRequest) {
  // 1. Authenticate
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

  try {
    const body = await request.json();
    prompt = body.prompt;

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

  // 4. Stream AI feedback
  try {
    const result = streamText({
      model: getModel(),
      system: FEEDBACK_SYSTEM_PROMPT,
      prompt: `Please evaluate the following prompt and provide feedback:\n\n---\n${prompt.trim()}\n---`,
    });

    const response = result.toTextStreamResponse();

    // Append rate limit headers
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    response.headers.set("X-RateLimit-Reset", String(rateLimit.resetAt));

    return response;
  } catch (error) {
    console.error("[ai/feedback] Stream error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: "Failed to generate AI feedback." },
      { status: 500 }
    );
  }
}
