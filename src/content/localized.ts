/**
 * Locale-aware content accessors.
 *
 * These helpers read the optional `_no` fields from Example and PromptStep
 * objects and return the Norwegian version when the active locale is "no",
 * falling back to the English default otherwise.
 */

import type { Example, PromptStep, Category } from "./types";

type Locale = "en" | "no";

// ── Category-level fields ───────────────────────────────────────────

export function getCategoryName(category: Category, locale: Locale): string {
  return locale === "no" && category.name_no
    ? category.name_no
    : category.name;
}

export function getCategoryDescription(
  category: Category,
  locale: Locale
): string {
  return locale === "no" && category.description_no
    ? category.description_no
    : category.description;
}

// ── Example-level fields ────────────────────────────────────────────

export function getTitle(example: Example, locale: Locale): string {
  return locale === "no" && example.title_no ? example.title_no : example.title;
}

export function getDescription(example: Example, locale: Locale): string {
  return locale === "no" && example.description_no
    ? example.description_no
    : example.description;
}

// ── Step-level fields ───────────────────────────────────────────────

export function getPrompt(step: PromptStep, locale: Locale): string {
  return locale === "no" && step.prompt_no ? step.prompt_no : step.prompt;
}

export function getChanges(step: PromptStep, locale: Locale): string {
  return locale === "no" && step.changes_no ? step.changes_no : step.changes;
}

export function getPros(step: PromptStep, locale: Locale): string[] {
  return locale === "no" && step.pros_no ? step.pros_no : step.pros;
}

export function getCons(step: PromptStep, locale: Locale): string[] {
  return locale === "no" && step.cons_no ? step.cons_no : step.cons;
}

export function getFeedback(step: PromptStep, locale: Locale): string {
  return locale === "no" && step.feedback_no
    ? step.feedback_no
    : step.feedback;
}

export function getWhy(step: PromptStep, locale: Locale): string {
  return locale === "no" && step.why_no ? step.why_no : step.why;
}

export function getTips(step: PromptStep, locale: Locale): string[] {
  return locale === "no" && step.tips_no ? step.tips_no : step.tips;
}

export function getAiOutput(step: PromptStep, locale: Locale): string {
  return locale === "no" && step.aiOutput_no
    ? step.aiOutput_no
    : step.aiOutput;
}
