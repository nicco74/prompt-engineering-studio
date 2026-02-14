/**
 * Build-time content validation script.
 *
 * Run with: npx tsx src/content/validate.ts
 *
 * This script imports all content, which triggers Zod validation via
 * the index module. If any content file is invalid, the script exits
 * with a non-zero code and prints the validation errors.
 */

import {
  allExamples,
  categories,
  getExamplesByCategory,
  getLearningPath,
} from "./index";
import type { CategoryId } from "./types";

function main() {
  console.log("=== Content Validation ===\n");

  // ── Categories ──────────────────────────────────────────────────
  console.log(`Categories: ${categories.length}`);
  for (const cat of categories) {
    console.log(`  [${cat.order}] ${cat.id} — ${cat.name}`);
  }

  // ── Examples ────────────────────────────────────────────────────
  console.log(`\nExamples: ${allExamples.length}`);
  for (const ex of allExamples) {
    console.log(
      `  ${ex.id} (${ex.category}, ${ex.difficulty}) — ${ex.steps.length} steps`
    );
  }

  // ── Per-category counts ─────────────────────────────────────────
  console.log("\nExamples per category:");
  const categoryIds: CategoryId[] = [
    "content-marketing",
    "business-docs",
    "internal-comms",
  ];
  for (const catId of categoryIds) {
    const examples = getExamplesByCategory(catId);
    console.log(`  ${catId}: ${examples.length}`);
    if (examples.length < 2) {
      console.error(
        `  ERROR: Category "${catId}" has fewer than 2 examples!`
      );
      process.exit(1);
    }
  }

  // ── Learning path ───────────────────────────────────────────────
  const path = getLearningPath();
  console.log("\nLearning path order:");
  for (const ex of path) {
    console.log(`  ${ex.difficulty} — ${ex.title}`);
  }

  // ── Summary ─────────────────────────────────────────────────────
  const totalSteps = allExamples.reduce(
    (sum, ex) => sum + ex.steps.length,
    0
  );
  console.log(`\n=== All ${allExamples.length} examples (${totalSteps} total steps) validated successfully ===`);
}

try {
  main();
} catch (error) {
  console.error("\nValidation FAILED:\n");
  console.error(error);
  process.exit(1);
}
