/**
 * Zod validation schemas for all content types.
 *
 * These schemas mirror the TypeScript interfaces in ./types.ts and are used
 * at build time (and on import) to catch missing fields or type mismatches
 * in hand-authored content files.
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Enum Schemas
// ---------------------------------------------------------------------------

export const CategoryIdSchema = z.enum([
  "content-marketing",
  "business-docs",
  "internal-comms",
]);

export const DifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

// ---------------------------------------------------------------------------
// PromptStep Schema
// ---------------------------------------------------------------------------

export const PromptStepSchema = z.object({
  version: z.number().int().min(1),
  prompt: z.string().min(1),
  changes: z.string().min(1),
  pros: z.array(z.string().min(1)).min(1),
  cons: z.array(z.string().min(1)).min(1),
  feedback: z.string().min(1),
  why: z.string().min(1),
  tips: z.array(z.string().min(1)).min(1),
  aiOutput: z.string().min(1),
  // Norwegian translations (optional)
  prompt_no: z.string().min(1).optional(),
  changes_no: z.string().min(1).optional(),
  pros_no: z.array(z.string().min(1)).min(1).optional(),
  cons_no: z.array(z.string().min(1)).min(1).optional(),
  feedback_no: z.string().min(1).optional(),
  why_no: z.string().min(1).optional(),
  tips_no: z.array(z.string().min(1)).min(1).optional(),
  aiOutput_no: z.string().min(1).optional(),
});

// ---------------------------------------------------------------------------
// Example Schema
// ---------------------------------------------------------------------------

export const ExampleSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "id must be kebab-case (e.g. 'product-launch-email')"
      ),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case"),
    title: z.string().min(1),
    description: z.string().min(1),
    category: CategoryIdSchema,
    difficulty: DifficultySchema,
    steps: z.array(PromptStepSchema).min(3).max(5),
    // Norwegian translations (optional)
    title_no: z.string().min(1).optional(),
    description_no: z.string().min(1).optional(),
    lastReviewed: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "lastReviewed must be an ISO-8601 date string (YYYY-MM-DD)"
      ),
  })
  .refine(
    (example) =>
      example.steps.every((step, index) => step.version === index + 1),
    {
      message: "Step version numbers must be sequential starting from 1",
    }
  );

// ---------------------------------------------------------------------------
// Category Schema
// ---------------------------------------------------------------------------

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  name: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().min(0),
  // Norwegian translations (optional)
  name_no: z.string().min(1).optional(),
  description_no: z.string().min(1).optional(),
});

// ---------------------------------------------------------------------------
// Inferred types (useful when you want schema-derived types)
// ---------------------------------------------------------------------------

export type PromptStepZ = z.infer<typeof PromptStepSchema>;
export type ExampleZ = z.infer<typeof ExampleSchema>;
export type CategoryZ = z.infer<typeof CategorySchema>;
