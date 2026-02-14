import { useTranslations, useLocale } from "next-intl";
import {
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import type { PromptStep } from "@/content/types";
import {
  getPrompt,
  getChanges,
  getPros,
  getCons,
  getFeedback,
  getWhy,
  getTips,
} from "@/content/localized";
import { CopyButton } from "@/components/copy-button";

interface PromptStepViewProps {
  step: PromptStep;
  totalSteps: number;
}

export function PromptStepView({ step, totalSteps }: PromptStepViewProps) {
  const t = useTranslations("examples");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "en" | "no";

  const localizedPrompt = getPrompt(step, locale);
  const localizedChanges = getChanges(step, locale);
  const localizedPros = getPros(step, locale);
  const localizedCons = getCons(step, locale);
  const localizedFeedback = getFeedback(step, locale);
  const localizedWhy = getWhy(step, locale);
  const localizedTips = getTips(step, locale);

  return (
    <div className="space-y-5">
      {/* Version header */}
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
          {step.version}
        </span>
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {tCommon("versionOf", {
            current: step.version,
            total: totalSteps,
          })}
        </span>
      </div>

      {/* Changes */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <RefreshCw size={15} />
          {t("changes")}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {localizedChanges}
        </p>
      </div>

      {/* Prompt text */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {tCommon("prompt")}
          </span>
          <CopyButton text={localizedPrompt} />
        </div>
        <div className="whitespace-pre-wrap rounded-md bg-zinc-50 p-4 font-mono text-sm leading-relaxed text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          {localizedPrompt}
        </div>
      </div>

      {/* Pros & Cons side by side */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <ThumbsUp size={15} />
            {t("pros")}
          </div>
          <ul className="space-y-1.5">
            {localizedPros.map((pro, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-rose-700 dark:text-rose-400">
            <ThumbsDown size={15} />
            {t("cons")}
          </div>
          <ul className="space-y-1.5">
            {localizedCons.map((con, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-500" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feedback */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-400">
          <MessageCircle size={15} />
          {t("feedback")}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {localizedFeedback}
        </p>
      </div>

      {/* Why this change */}
      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-700 dark:text-purple-400">
          <HelpCircle size={15} />
          {t("why")}
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{localizedWhy}</p>
      </div>

      {/* Tips */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-amber-700 dark:text-amber-400">
          <Lightbulb size={15} />
          {t("tips")}
        </div>
        <ul className="space-y-1.5">
          {localizedTips.map((tip, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-300"
            >
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
