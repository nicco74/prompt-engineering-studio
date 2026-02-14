import { verifyAuth } from "@/lib/auth";
import { getModel } from "@/lib/ai/registry";
import { checkRateLimit } from "@/lib/ai/rate-limit";
import { buildRubricSystemPromptSection } from "@/lib/ai/rubric";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

/**
 * Zod schema for the structured feedback response.
 * Used with generateObject to get typed, validated output from the AI.
 */
const feedbackSchema = z.object({
  overallScore: z
    .number()
    .int()
    .min(1)
    .max(5)
    .describe("Overall score from 1-5, averaged from dimension scores and rounded to the nearest integer."),
  dimensions: z
    .array(
      z.object({
        name: z.string().describe("The name of the scoring dimension (e.g. Clarity, Specificity)."),
        score: z.number().int().min(1).max(5).describe("Score from 1 to 5 for this dimension."),
        explanation: z
          .string()
          .describe("A 1-2 sentence explanation justifying the score, referencing specific aspects of the prompt."),
      })
    )
    .length(5)
    .describe("Scores for each of the 5 rubric dimensions: Clarity, Specificity, Context, Structure, Constraints."),
  summary: z
    .string()
    .describe("A 2-3 sentence overall assessment highlighting the biggest strength and most impactful improvement area."),
  improvedPrompt: z
    .string()
    .describe("An improved version of the prompt that addresses the identified weaknesses and scores at least 4/5 on every dimension."),
});

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

  // 4. Generate structured AI feedback using the scoring rubric
  try {
    const result = await generateObject({
      model: getModel(),
      schema: feedbackSchema,
      schemaName: "PromptFeedback",
      schemaDescription: "Structured feedback for a user-submitted AI prompt, scored against a 5-dimension rubric.",
      system: buildRubricSystemPromptSection(),
      prompt: `Please evaluate the following prompt and provide structured feedback with scores:\n\n---\n${prompt.trim()}\n---`,
    });

    // Return the structured feedback as JSON
    return NextResponse.json(result.object, {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": String(rateLimit.resetAt),
      },
    });
  } catch (error) {
    console.error("[ai/feedback] Generation error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: "Failed to generate AI feedback." },
      { status: 500 }
    );
  }
}
