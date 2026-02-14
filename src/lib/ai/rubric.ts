/**
 * Scoring Rubric for Prompt Evaluation
 *
 * Defines the 5 dimensions used to evaluate prompt quality.
 * This module is shared between the API (system prompt construction)
 * and the UI (rubric info panel), ensuring a single source of truth.
 */

export interface RubricDimension {
  /** Machine-readable key */
  key: string;
  /** Human-readable name */
  name: string;
  /** What this dimension measures */
  description: string;
  /** What each score level (1-5) means */
  scoringGuide: Record<1 | 2 | 3 | 4 | 5, string>;
}

export interface DimensionScore {
  name: string;
  score: number;
  explanation: string;
}

export interface RubricFeedback {
  overallScore: number;
  dimensions: DimensionScore[];
  summary: string;
  improvedPrompt: string;
}

/**
 * The 5 scoring dimensions for prompt evaluation.
 * Each dimension is scored 1-5 with clear descriptions.
 */
export const RUBRIC_DIMENSIONS: RubricDimension[] = [
  {
    key: "clarity",
    name: "Clarity",
    description:
      "How clear and unambiguous is the prompt? Can the AI understand exactly what is being asked without guessing?",
    scoringGuide: {
      1: "The intent is unclear or contradictory; the AI would have to guess what you want.",
      2: "The main idea is present but vague; multiple interpretations are possible.",
      3: "The intent is understandable but some parts could be misinterpreted.",
      4: "The intent is clear with only minor ambiguities remaining.",
      5: "The intent is perfectly clear; there is no room for misinterpretation.",
    },
  },
  {
    key: "specificity",
    name: "Specificity",
    description:
      "Does the prompt include enough detail such as audience, tone, format, and length to produce a targeted result?",
    scoringGuide: {
      1: "No specific details provided; the output could be anything.",
      2: "One or two details mentioned, but key aspects like audience or format are missing.",
      3: "Some important details are included, but others are left to the AI's discretion.",
      4: "Most important details are specified; the AI has clear guidance on the desired output.",
      5: "All relevant details are specified: audience, tone, format, length, and style.",
    },
  },
  {
    key: "context",
    name: "Context",
    description:
      "Does the prompt provide the background information the AI needs to produce a relevant and accurate response?",
    scoringGuide: {
      1: "No background information provided; the AI has no context to work with.",
      2: "Minimal context; the AI would need to make many assumptions.",
      3: "Some context is provided but key background details are missing.",
      4: "Good context is provided; the AI has most of the information it needs.",
      5: "Comprehensive context including background, purpose, and relevant details.",
    },
  },
  {
    key: "structure",
    name: "Structure",
    description:
      "Is the prompt well-organized and easy to follow? Does it use formatting like sections, lists, or step-by-step instructions?",
    scoringGuide: {
      1: "The prompt is a disorganized block of text with no logical flow.",
      2: "Some organization exists but the prompt jumps between unrelated ideas.",
      3: "The prompt has a basic structure but could be better organized.",
      4: "Well-organized with clear sections or logical progression.",
      5: "Excellently structured with clear sections, logical flow, and easy-to-follow formatting.",
    },
  },
  {
    key: "constraints",
    name: "Constraints",
    description:
      "Does the prompt set appropriate boundaries and output requirements such as what to include, what to avoid, and how the result should be formatted?",
    scoringGuide: {
      1: "No constraints specified; the AI has complete freedom in how it responds.",
      2: "One constraint mentioned but important boundaries are missing.",
      3: "Some constraints are set but the AI still has wide latitude on key aspects.",
      4: "Good constraints that guide the AI's output effectively.",
      5: "Clear, well-defined constraints that precisely shape the desired output.",
    },
  },
];

/**
 * Builds the system prompt section that describes the rubric to the AI.
 * Used in the feedback API route to instruct the model on how to score.
 */
export function buildRubricSystemPromptSection(): string {
  const dimensionDescriptions = RUBRIC_DIMENSIONS.map((dim) => {
    const guideLines = Object.entries(dim.scoringGuide)
      .map(([score, desc]) => `  ${score}/5: ${desc}`)
      .join("\n");
    return `### ${dim.name}\n${dim.description}\n${guideLines}`;
  }).join("\n\n");

  return `You are an expert prompt-engineering coach. The user will give you a prompt they have written for an AI assistant. Your job is to evaluate it against a structured scoring rubric and provide constructive, educational feedback.

## Scoring Rubric

Score each dimension from 1 to 5 using the guides below:

${dimensionDescriptions}

## Instructions

1. Score each dimension from 1 to 5 based on the guides above.
2. For each dimension, write a brief explanation (1-2 sentences) justifying the score. Be specific — reference what the prompt does well or what it lacks.
3. Calculate the overall score as the average of all dimension scores, rounded to the nearest integer.
4. Write a summary assessment (2-3 sentences) that highlights the prompt's biggest strength and the most impactful area for improvement.
5. Provide an improved version of the prompt that addresses the weaknesses you identified. The improved version should score at least 4/5 on every dimension.

Keep your feedback encouraging and educational. Use plain language. Focus on teaching the user what makes a prompt effective.`;
}
