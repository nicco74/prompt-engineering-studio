import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FileText } from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import type { Example } from "@/content/types";
import { getTitle, getDescription } from "@/content/localized";

interface ExampleCardProps {
  example: Example;
}

export function ExampleCard({ example }: ExampleCardProps) {
  const t = useTranslations("common");
  const locale = useLocale() as "en" | "no";

  return (
    <Link
      href={`/examples/${example.category}/${example.slug}`}
      className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700">
          <FileText size={18} aria-hidden="true" />
        </div>
        <DifficultyBadge difficulty={example.difficulty} />
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {getTitle(example, locale)}
      </h3>
      <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
        {getDescription(example, locale)}
      </p>
      <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
        {t("stepsCount", { count: example.steps.length })}
      </p>
    </Link>
  );
}
