"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { RUBRIC_DIMENSIONS } from "@/lib/ai/rubric";

/**
 * Collapsible panel that explains the scoring rubric to users BEFORE
 * they submit a prompt for feedback. This teaches users what to aim for
 * and makes the evaluation criteria transparent.
 */
export function RubricInfo() {
  const t = useTranslations("rubric");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      >
        <Lightbulb size={16} className="shrink-0 text-amber-500" />
        <span className="flex-1 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          {t("whatMakesGoodPrompt")}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="shrink-0 text-zinc-400" />
        ) : (
          <ChevronDown size={16} className="shrink-0 text-zinc-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-zinc-100 px-4 py-4 dark:border-zinc-800">
          <p className="mb-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t("rubricIntro")}
          </p>

          <div className="space-y-3">
            {RUBRIC_DIMENSIONS.map((dim) => (
              <div key={dim.key} className="rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-zinc-800/50">
                <h4 className="mb-0.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {dim.name}
                </h4>
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {t("rubricFooter")}
          </p>
        </div>
      )}
    </div>
  );
}
