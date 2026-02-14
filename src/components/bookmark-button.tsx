"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { useTranslations } from "next-intl";

interface BookmarkButtonProps {
  slug: string;
}

export function BookmarkButton({ slug }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const t = useTranslations("collection");
  const bookmarked = isBookmarked(slug);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900 ${
        bookmarked
          ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
      }`}
      aria-label={bookmarked ? t("removeBookmark") : t("addBookmark")}
      aria-pressed={bookmarked}
    >
      {bookmarked ? (
        <BookmarkCheck size={16} className="fill-current" aria-hidden="true" />
      ) : (
        <Bookmark size={16} aria-hidden="true" />
      )}
      <span className="hidden sm:inline">
        {bookmarked ? t("bookmarked") : t("bookmark")}
      </span>
    </button>
  );
}
