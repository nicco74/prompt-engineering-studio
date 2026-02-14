import { useTranslations } from "next-intl";
import type { Difficulty } from "@/content/types";

const styles: Record<Difficulty, string> = {
  beginner:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  intermediate:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  advanced:
    "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const t = useTranslations("examples");

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}
    >
      {t(difficulty)}
    </span>
  );
}
