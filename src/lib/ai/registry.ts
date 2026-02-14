import "server-only";

import { createProviderRegistry } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

/**
 * AI Provider Registry
 *
 * Centralizes all AI model configuration in one place.
 * To switch providers, change the provider setup and default model ID below.
 *
 * Supported providers (install the corresponding @ai-sdk/* package):
 *   - OpenAI:    @ai-sdk/openai
 *   - Anthropic: @ai-sdk/anthropic
 *   - Google:    @ai-sdk/google
 *   - Mistral:   @ai-sdk/mistral
 */

const openai = createOpenAI({
  // The API key is read from OPENAI_API_KEY env var by default.
  // You can override it here if needed:
  // apiKey: process.env.OPENAI_API_KEY,
});

const registry = createProviderRegistry({
  openai,
});

// ---------------------------------------------------------------------------
// Default model — change this single line to switch models / providers
// ---------------------------------------------------------------------------
const DEFAULT_MODEL_ID = "openai:gpt-4o-mini";

/**
 * Returns the configured language model ready for use with streamText / generateText.
 * Optionally pass a model ID to override the default (e.g. "openai:gpt-4o").
 */
export function getModel(modelId: string = DEFAULT_MODEL_ID) {
  return registry.languageModel(modelId as Parameters<typeof registry.languageModel>[0]);
}
