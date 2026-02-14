/**
 * Content Type System for Prompt Engineering Studio
 *
 * These interfaces define the shape of all content used throughout the app.
 * Each Example walks a learner through iterative prompt refinement,
 * showing how small, concrete changes improve AI output quality.
 */

// ---------------------------------------------------------------------------
// Enums / Union Types
// ---------------------------------------------------------------------------

/** The three content categories the app ships with. */
export type CategoryId = "content-marketing" | "business-docs" | "internal-comms";

/** Difficulty tag that places an example on the learning path. */
export type Difficulty = "beginner" | "intermediate" | "advanced";

// ---------------------------------------------------------------------------
// Core Content Types
// ---------------------------------------------------------------------------

/**
 * A single step in a prompt refinement journey.
 *
 * Each step represents one version of a prompt. The `changes` field explains
 * what was modified compared to the previous version, while `pros`, `cons`,
 * `feedback`, `why`, and `tips` provide the educational scaffolding that
 * teaches learners *how* to think about prompt improvement.
 */
export interface PromptStep {
  /** Sequential version number (1-based). */
  version: number;

  /** The full prompt text for this version. */
  prompt: string;

  /** A short description of what changed from the previous version. */
  changes: string;

  /** Strengths of this prompt version. */
  pros: string[];

  /** Weaknesses or areas still needing improvement. */
  cons: string[];

  /** Concise reviewer-style feedback on this version. */
  feedback: string;

  /** The pedagogical rationale: *why* this change matters. */
  why: string;

  /** Actionable tips the learner can apply right away. */
  tips: string[];

  /** A realistic mock AI output that this prompt version would produce. */
  aiOutput: string;
}

/**
 * A complete prompt refinement example.
 *
 * An Example bundles metadata (title, category, difficulty) with an ordered
 * sequence of PromptSteps that demonstrate progressive improvement.
 */
export interface Example {
  /** Unique identifier (kebab-case, e.g. "product-launch-email"). */
  id: string;

  /** URL-friendly slug, usually identical to `id`. */
  slug: string;

  /** Human-readable title shown in the UI. */
  title: string;

  /** One-sentence description of the scenario. */
  description: string;

  /** Which content category this example belongs to. */
  category: CategoryId;

  /** Difficulty rating for the learning path. */
  difficulty: Difficulty;

  /** Ordered refinement steps (minimum 3, maximum 5). */
  steps: PromptStep[];

  /** ISO-8601 date string of the last editorial review. */
  lastReviewed: string;
}

/**
 * A content category that groups related examples.
 */
export interface Category {
  /** Machine-readable identifier matching CategoryId. */
  id: CategoryId;

  /** Display name shown in navigation and headings. */
  name: string;

  /** Short description explaining what this category covers. */
  description: string;

  /** Suggested display order (lower = first). */
  order: number;
}
