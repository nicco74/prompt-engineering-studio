"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Send,
  MessageSquare,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { RubricDisplay } from "@/components/rubric-display";
import { RubricInfo } from "@/components/rubric-info";
import type { RubricFeedback } from "@/lib/ai/rubric";

/** How long to wait before aborting a streaming request (ms). */
const STREAM_TIMEOUT_MS = 30_000;

/** How long to wait before aborting a JSON request (ms). */
const JSON_TIMEOUT_MS = 60_000;

type OutputKind = "chat" | "feedback" | null;

export function Sandbox() {
  const t = useTranslations("sandbox");

  // ---- state ----
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [outputKind, setOutputKind] = useState<OutputKind>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [rubricFeedback, setRubricFeedback] = useState<RubricFeedback | null>(null);

  // Ref to the current AbortController so we can cancel on unmount / new request.
  const abortRef = useRef<AbortController | null>(null);

  // ---- helpers for common error handling ----
  const handleErrorResponse = useCallback(
    async (res: Response) => {
      const contentType = res.headers.get("Content-Type") ?? "";
      if (contentType.includes("application/json")) {
        const body = await res.json();
        if (res.status === 401) {
          setError(t("unauthorized"));
        } else if (res.status === 429) {
          const retryAfter = res.headers.get("Retry-After");
          if (retryAfter) {
            setError(
              `${t("rateLimitExceeded")} ${t("retryAfter", { seconds: retryAfter })}`
            );
          } else {
            setError(t("rateLimitExceeded"));
          }
          setRemaining(0);
        } else if (res.status === 500 && body?.message?.includes("not configured")) {
          setError(t("noApiKey"));
        } else {
          setError(t("aiError"));
        }
      } else {
        setError(t("aiError"));
      }
    },
    [t]
  );

  // ---- streaming helper (for chat) ----
  const streamRequest = useCallback(
    async () => {
      // Validate input
      if (!prompt.trim()) {
        setError(t("emptyPrompt"));
        return;
      }

      // Cancel any in-flight request
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      // 30-second timeout
      const timeoutId = setTimeout(() => controller.abort(), STREAM_TIMEOUT_MS);

      setError(null);
      setOutput("");
      setRubricFeedback(null);
      setOutputKind("chat");
      setIsStreaming(true);

      try {
        const res = await fetch("/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt.trim() }),
          signal: controller.signal,
        });

        // Read rate-limit header
        const remainingHeader = res.headers.get("X-RateLimit-Remaining");
        if (remainingHeader !== null) {
          setRemaining(Number(remainingHeader));
        }

        // Handle error responses
        if (!res.ok) {
          await handleErrorResponse(res);
          return;
        }

        // Stream the response body
        const reader = res.body?.getReader();
        if (!reader) {
          setError(t("aiError"));
          return;
        }

        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setOutput(accumulated);
        }

        // Flush any remaining bytes
        accumulated += decoder.decode();
        setOutput(accumulated);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          if (!controller.signal.aborted) return;
          setError(t("timeoutError"));
        } else {
          setError(t("aiError"));
        }
      } finally {
        clearTimeout(timeoutId);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [prompt, t, handleErrorResponse]
  );

  // ---- JSON feedback helper (for structured rubric feedback) ----
  const fetchFeedback = useCallback(
    async () => {
      // Validate input
      if (!prompt.trim()) {
        setError(t("emptyPrompt"));
        return;
      }

      // Cancel any in-flight request
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;

      // 60-second timeout (structured output can take longer)
      const timeoutId = setTimeout(() => controller.abort(), JSON_TIMEOUT_MS);

      setError(null);
      setOutput("");
      setRubricFeedback(null);
      setOutputKind("feedback");
      setIsStreaming(true);

      try {
        const res = await fetch("/api/ai/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: prompt.trim() }),
          signal: controller.signal,
        });

        // Read rate-limit header
        const remainingHeader = res.headers.get("X-RateLimit-Remaining");
        if (remainingHeader !== null) {
          setRemaining(Number(remainingHeader));
        }

        // Handle error responses
        if (!res.ok) {
          await handleErrorResponse(res);
          return;
        }

        // Parse structured JSON response
        const data: RubricFeedback = await res.json();
        setRubricFeedback(data);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          if (!controller.signal.aborted) return;
          setError(t("timeoutError"));
        } else {
          setError(t("aiError"));
        }
      } finally {
        clearTimeout(timeoutId);
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [prompt, t, handleErrorResponse]
  );

  // ---- actions ----
  const handleSend = () => streamRequest();
  const handleFeedback = () => fetchFeedback();

  const handleClear = () => {
    abortRef.current?.abort();
    setPrompt("");
    setOutput("");
    setRubricFeedback(null);
    setOutputKind(null);
    setError(null);
    setIsStreaming(false);
  };

  // ---- render ----
  const hasOutput = output || rubricFeedback || isStreaming;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Request counter */}
      {remaining !== null && (
        <div className="mb-4 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Sparkles size={14} className="shrink-0 text-amber-500" />
          <span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {remaining}
            </span>{" "}
            {t("requestsRemaining")}
          </span>
        </div>
      )}

      {/* Rubric info panel */}
      <div className="mb-4">
        <RubricInfo />
      </div>

      {/* Prompt input area */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t("placeholder")}
          rows={6}
          disabled={isStreaming}
          aria-label={t("placeholder")}
          className="w-full resize-y rounded-t-lg border-b border-zinc-100 bg-transparent px-3 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-500"
        />

        {/* Action buttons -- wrap on small screens */}
        <div className="flex flex-wrap items-center gap-2 px-3 py-3 sm:px-4">
          <button
            onClick={handleSend}
            disabled={isStreaming || !prompt.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
          >
            {isStreaming && outputKind === "chat" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {t("submit")}
          </button>

          <button
            onClick={handleFeedback}
            disabled={isStreaming || !prompt.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
          >
            {isStreaming && outputKind === "feedback" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <MessageSquare size={16} />
            )}
            {t("getFeedback")}
          </button>

          <div className="flex-1" />

          <button
            onClick={handleClear}
            disabled={isStreaming}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-zinc-500 transition-colors hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
          >
            <RotateCcw size={16} />
            {t("clear")}
          </button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Output area */}
      {hasOutput && (
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          {/* Output header */}
          <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            {outputKind === "feedback" ? (
              <MessageSquare size={16} className="shrink-0 text-amber-500" />
            ) : (
              <Sparkles size={16} className="shrink-0 text-blue-500" />
            )}
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {outputKind === "feedback" ? t("promptFeedback") : t("aiResponse")}
            </h2>
            {isStreaming && (
              <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
                <Loader2 size={12} className="animate-spin" />
                <span className="hidden sm:inline">
                  {outputKind === "feedback" ? t("analyzingPrompt") : t("streaming")}
                </span>
              </span>
            )}
          </div>

          {/* Output body */}
          <div className="px-3 py-4 sm:px-4">
            {/* Structured rubric feedback display */}
            {outputKind === "feedback" && rubricFeedback ? (
              <RubricDisplay feedback={rubricFeedback} />
            ) : output ? (
              <div className="prose prose-sm prose-zinc max-w-none whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {output}
              </div>
            ) : (
              isStreaming && (
                <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
                  <Loader2 size={16} className="animate-spin" />
                  {outputKind === "feedback" ? t("analyzingPrompt") : t("streaming")}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
