"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

/**
 * Hook for managing personal notes on examples.
 *
 * Stored under "pes:notes" as a JSON object mapping slug -> note text.
 */
export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Record<string, string>>(
    "notes",
    {}
  );

  const getNote = useCallback(
    (slug: string) => notes[slug] ?? "",
    [notes]
  );

  const setNote = useCallback(
    (slug: string, text: string) => {
      setNotes((prev) => {
        // If the text is empty, remove the key entirely to keep storage clean.
        if (!text.trim()) {
          const { [slug]: _removed, ...rest } = prev;
          void _removed;
          return rest;
        }
        return { ...prev, [slug]: text };
      });
    },
    [setNotes]
  );

  const deleteNote = useCallback(
    (slug: string) => {
      setNotes((prev) => {
        const { [slug]: _removed, ...rest } = prev;
        void _removed;
        return rest;
      });
    },
    [setNotes]
  );

  return {
    notes,
    getNote,
    setNote,
    deleteNote,
  };
}
