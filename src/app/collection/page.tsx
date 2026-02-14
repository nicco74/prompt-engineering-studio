"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Bookmark, BookOpen, StickyNote } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useNotes } from "@/hooks/use-notes";
import { allExamples } from "@/content";
import { getTitle, getDescription } from "@/content/localized";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { BookmarkButton } from "@/components/bookmark-button";
import { NoteEditor } from "@/components/note-editor";

export default function CollectionPage() {
  const t = useTranslations("collection");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "en" | "no";
  const { bookmarks } = useBookmarks();
  const { getNote } = useNotes();

  // Resolve bookmarked slugs to full Example objects, preserving bookmark order.
  const bookmarkedExamples = bookmarks
    .map((slug) => allExamples.find((ex) => ex.slug === slug))
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      {bookmarkedExamples.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Bookmark
              size={24}
              className="text-zinc-400 dark:text-zinc-500"
            />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("noBookmarks")}
          </p>
          <Link
            href="/examples"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <BookOpen size={16} />
            {t("browseExamples")}
          </Link>
        </div>
      ) : (
        /* Bookmarked items list */
        <div className="space-y-6">
          {bookmarkedExamples.map((example) => {
            if (!example) return null;
            const note = getNote(example.slug);
            return (
              <div
                key={example.slug}
                className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/examples/${example.category}/${example.slug}`}
                      className="group"
                    >
                      <h2 className="text-lg font-semibold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                        {getTitle(example, locale)}
                      </h2>
                    </Link>
                    <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                      {getDescription(example, locale)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <DifficultyBadge difficulty={example.difficulty} />
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">
                        {tCommon("stepsCount", {
                          count: example.steps.length,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <BookmarkButton slug={example.slug} />
                    <Link
                      href={`/examples/${example.category}/${example.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
                    >
                      <BookOpen size={16} />
                      {t("viewExample")}
                    </Link>
                  </div>
                </div>

                {/* Note section */}
                <div className="px-5 py-4">
                  {note ? (
                    <div className="mb-3 flex items-start gap-2 rounded-md bg-amber-50 p-3 dark:bg-amber-900/10">
                      <StickyNote
                        size={14}
                        className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                      />
                      <p className="text-sm text-amber-800 dark:text-amber-300">
                        {note}
                      </p>
                    </div>
                  ) : null}
                  <NoteEditor slug={example.slug} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
