"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { StickyNote } from "lucide-react";
import { useNotes } from "@/hooks/use-notes";
import { useTranslations } from "next-intl";

interface NoteEditorProps {
  slug: string;
}

export function NoteEditor({ slug }: NoteEditorProps) {
  const { getNote, setNote } = useNotes();
  const t = useTranslations("collection");

  const savedNote = getNote(slug);
  const [localValue, setLocalValue] = useState(savedNote);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync local state when the stored note changes (e.g. from another tab).
  useEffect(() => {
    setLocalValue(savedNote);
  }, [savedNote]);

  const save = useCallback(
    (text: string) => {
      setNote(slug, text);
    },
    [slug, setNote]
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setLocalValue(text);

    // Debounce auto-save: 500ms after the user stops typing.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(text), 500);
  }

  function handleBlur() {
    // Immediately save on blur.
    if (debounceRef.current) clearTimeout(debounceRef.current);
    save(localValue);
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 sm:px-4 dark:border-zinc-700">
        <StickyNote size={16} className="text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("notes")}
        </span>
      </div>
      <textarea
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={t("addNote")}
        rows={3}
        aria-label={t("notes")}
        className="w-full resize-y rounded-b-lg bg-transparent px-3 py-3 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-400 sm:px-4 dark:text-zinc-200 dark:placeholder-zinc-500 dark:focus-visible:ring-zinc-500"
      />
    </div>
  );
}
