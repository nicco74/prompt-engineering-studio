"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import type { RubricFeedback } from "@/lib/ai/rubric";

/**
 * Returns a Tailwind color class based on the score (1-5).
 * Lower scores get warm/red colors, higher scores get green.
 */
function scoreColor(score: number): string {
  if (score >= 5) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 4) return "text-green-600 dark:text-green-400";
  if (score >= 3) return "text-amber-600 dark:text-amber-400";
  if (score >= 2) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
}

function scoreBgColor(score: number): string {
  if (score >= 5) return "bg-emerald-500";
  if (score >= 4) return "bg-green-500";
  if (score >= 3) return "bg-amber-500";
  if (score >= 2) return "bg-orange-500";
  return "bg-red-500";
}

function scoreLabel(score: number, t: ReturnType<typeof useTranslations>): string {
  if (score >= 5) return t("scoreExcellent");
  if (score >= 4) return t("scoreGood");
  if (score >= 3) return t("scoreAdequate");
  if (score >= 2) return t("scoreNeedsWork");
  return t("scorePoor");
}

interface RubricDisplayProps {
  feedback: RubricFeedback;
}

export function RubricDisplay({ feedback }: RubricDisplayProps) {
  const t = useTranslations("rubric");
  const [copied, setCopied] = useState(false);
  const [showImproved, setShowImproved] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedback.improvedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  return (
    <div className="space-y-5">
      {/* Overall score */}
      <div className="flex items-center gap-4">
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border-2 ${
            feedback.overallScore >= 4
              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
              : feedback.overallScore >= 3
                ? "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20"
                : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
          }`}
        >
          <span className={`text-2xl font-bold ${scoreColor(feedback.overallScore)}`}>
            {feedback.overallScore}
            <span className="text-sm font-normal text-zinc-400">/5</span>
          </span>
        </div>
        <div>
          <div className={`text-sm font-semibold ${scoreColor(feedback.overallScore)}`}>
            {scoreLabel(feedback.overallScore, t)}
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{t("overallScore")}</div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {feedback.summary}
        </p>
      </div>

      {/* Dimension scores */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <TrendingUp size={14} />
          {t("dimensionScores")}
        </h3>
        <div className="space-y-2">
          {feedback.dimensions.map((dim) => (
            <div
              key={dim.name}
              className="rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800"
            >
              {/* Score header row */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {dim.name}
                </span>
                <span className={`text-sm font-semibold ${scoreColor(dim.score)}`}>
                  {dim.score}/5
                </span>
              </div>

              {/* Score bar */}
              <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${scoreBgColor(dim.score)}`}
                  style={{ width: `${(dim.score / 5) * 100}%` }}
                />
              </div>

              {/* Explanation */}
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                {dim.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Improved prompt */}
      <div>
        <button
          onClick={() => setShowImproved(!showImproved)}
          className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <span>{t("improvedPrompt")}</span>
          {showImproved ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showImproved && (
          <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20">
            <div className="flex items-center justify-between border-b border-emerald-100 px-4 py-2 dark:border-emerald-800">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                {t("improvedVersion")}
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-emerald-600 transition-colors hover:bg-emerald-100 dark:text-emerald-400 dark:hover:bg-emerald-800"
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    {t("copied")}
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    {t("copy")}
                  </>
                )}
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-emerald-900 dark:text-emerald-200">
                {feedback.improvedPrompt}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
