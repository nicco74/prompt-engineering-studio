"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

/**
 * Hook for managing bookmarked example slugs.
 *
 * Stored under "pes:bookmarks" as a JSON array of slug strings.
 */
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>("bookmarks", []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (slug: string) => {
      setBookmarks((prev) =>
        prev.includes(slug)
          ? prev.filter((s) => s !== slug)
          : [...prev, slug]
      );
    },
    [setBookmarks]
  );

  const addBookmark = useCallback(
    (slug: string) => {
      setBookmarks((prev) =>
        prev.includes(slug) ? prev : [...prev, slug]
      );
    },
    [setBookmarks]
  );

  const removeBookmark = useCallback(
    (slug: string) => {
      setBookmarks((prev) => prev.filter((s) => s !== slug));
    },
    [setBookmarks]
  );

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
    addBookmark,
    removeBookmark,
  };
}
