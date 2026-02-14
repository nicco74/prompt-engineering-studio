/**
 * Content index — single entry point for all validated content.
 *
 * Importing from this module guarantees that every example has been
 * validated against its Zod schema at module-evaluation time.
 * If any content file has a missing field or type mismatch, the
 * import will throw a descriptive ZodError before the app renders.
 */

import { ExampleSchema, CategorySchema } from "./schemas";
import type { Example, Category } from "./types";

// ── Category data ───────────────────────────────────────────────────
import { categories as rawCategories } from "./categories";

// ── Example data ────────────────────────────────────────────────────
import productLaunchSocialPost from "./examples/content-marketing/product-launch-social-post";
import newsletterWelcomeSequence from "./examples/content-marketing/newsletter-welcome-sequence";
import executiveSummary from "./examples/business-docs/executive-summary";
import clientProposal from "./examples/business-docs/client-proposal";
import projectStatusUpdate from "./examples/internal-comms/project-status-update";
import meetingSummary from "./examples/internal-comms/meeting-summary";

// ── Validation helper ───────────────────────────────────────────────

function validateExample(example: Example): Example {
  ExampleSchema.parse(example);
  return example;
}

function validateCategory(category: Category): Category {
  CategorySchema.parse(category);
  return category;
}

// ── Validate categories ─────────────────────────────────────────────

export const categories: Category[] = rawCategories.map(validateCategory);

// ── Validate and export examples ────────────────────────────────────

export const allExamples: Example[] = [
  productLaunchSocialPost,
  newsletterWelcomeSequence,
  executiveSummary,
  clientProposal,
  projectStatusUpdate,
  meetingSummary,
].map(validateExample);

// ── Convenience accessors ───────────────────────────────────────────

/** Get all examples for a given category. */
export function getExamplesByCategory(
  categoryId: Example["category"]
): Example[] {
  return allExamples.filter((ex) => ex.category === categoryId);
}

/** Get all examples for a given difficulty level. */
export function getExamplesByDifficulty(
  difficulty: Example["difficulty"]
): Example[] {
  return allExamples.filter((ex) => ex.difficulty === difficulty);
}

/** Get a single example by its slug. Returns undefined if not found. */
export function getExampleBySlug(slug: string): Example | undefined {
  return allExamples.find((ex) => ex.slug === slug);
}

/** Get a category by its id. Returns undefined if not found. */
export function getCategoryById(
  id: Category["id"]
): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

/**
 * Learning path: examples ordered by difficulty, then by category order.
 * This is the recommended order for a learner working through all content.
 */
export function getLearningPath(): Example[] {
  const difficultyOrder: Record<Example["difficulty"], number> = {
    beginner: 0,
    intermediate: 1,
    advanced: 2,
  };

  const categoryOrder: Record<Category["id"], number> = Object.fromEntries(
    categories.map((cat) => [cat.id, cat.order])
  ) as Record<Category["id"], number>;

  return [...allExamples].sort((a, b) => {
    const diffDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    if (diffDiff !== 0) return diffDiff;
    return categoryOrder[a.category] - categoryOrder[b.category];
  });
}

// ── Re-exports for convenience ──────────────────────────────────────

export type { Example, Category, PromptStep, CategoryId, Difficulty } from "./types";
