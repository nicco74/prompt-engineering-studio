"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Search, Filter, FileText } from "lucide-react";
import type { CategoryId, Difficulty } from "@/content/types";

/**
 * Serializable example shape for the search component.
 * We intentionally flatten the prompt text from steps into a single
 * searchable string so we can do client-side text matching.
 */
export interface SearchableExample {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: Difficulty;
  stepsCount: number;
  /** Concatenated prompt text from all steps, used for keyword matching. */
  searchableText: string;
}

export interface SearchableCategory {
  id: CategoryId;
  name: string;
}

interface ExampleSearchProps {
  examples: SearchableExample[];
  categories: SearchableCategory[];
}

export function ExampleSearch({ examples, categories }: ExampleSearchProps) {
  const t = useTranslations("examples");
  const tCommon = useTranslations("common");

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();

    return examples.filter((example) => {
      // Category filter
      if (categoryFilter !== "all" && example.category !== categoryFilter) {
        return false;
      }

      // Difficulty filter
      if (
        difficultyFilter !== "all" &&
        example.difficulty !== difficultyFilter
      ) {
        return false;
      }

      // Text search across title, description, and prompt text
      if (lowerQuery) {
        const matchesTitle = example.title.toLowerCase().includes(lowerQuery);
        const matchesDescription = example.description
          .toLowerCase()
          .includes(lowerQuery);
        const matchesPrompts = example.searchableText
          .toLowerCase()
          .includes(lowerQuery);
        if (!matchesTitle && !matchesDescription && !matchesPrompts) {
          return false;
        }
      }

      return true;
    });
  }, [examples, query, categoryFilter, difficultyFilter]);

  const difficultyStyles: Record<Difficulty, string> = {
    beginner:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    intermediate:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    advanced:
      "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400",
  };

  return (
    <div>
      {/* Search and filter controls */}
      <div className="space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-zinc-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label={t("filterByCategory")}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
            >
              <option value="all">{t("allCategories")}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            aria-label={t("filterByDifficulty")}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-zinc-500 dark:focus:ring-zinc-500"
          >
            <option value="all">{t("allDifficulties")}</option>
            <option value="beginner">{t("beginner")}</option>
            <option value="intermediate">{t("intermediate")}</option>
            <option value="advanced">{t("advanced")}</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        {t("resultsCount", { count: filtered.length })}
      </p>

      {/* Results grid */}
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((example) => (
            <Link
              key={example.id}
              href={`/examples/${example.category}/${example.slug}`}
              className="group flex flex-col rounded-lg border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition-colors group-hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-zinc-700">
                  <FileText size={18} />
                </div>
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[example.difficulty]}`}
                >
                  {t(example.difficulty)}
                </span>
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {example.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
                {example.description}
              </p>
              <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-500">
                {tCommon("stepsCount", { count: example.stepsCount })}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("noSearchResults")}
          </p>
        </div>
      )}
    </div>
  );
}
