import Link from "next/link";
import { useTranslations } from "next-intl";
import { FolderOpen } from "lucide-react";
import type { Category } from "@/content/types";

interface CategoryCardProps {
  category: Category;
  exampleCount: number;
}

export function CategoryCard({ category, exampleCount }: CategoryCardProps) {
  const t = useTranslations("common");

  return (
    <Link
      href={`/examples/${category.id}`}
      className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700">
        <FolderOpen size={20} />
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {category.name}
      </h3>
      <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>
      <p className="mt-4 text-xs font-medium text-zinc-500 dark:text-zinc-500">
        {t("examplesCount", { count: exampleCount })}
      </p>
    </Link>
  );
}
