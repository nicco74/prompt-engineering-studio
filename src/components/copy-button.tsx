"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("common");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: older browsers without clipboard API
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
      aria-label={t("copyPrompt")}
    >
      {copied ? (
        <>
          <Check size={14} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-600 dark:text-emerald-400">
            {t("copied")}
          </span>
        </>
      ) : (
        <>
          <Copy size={14} aria-hidden="true" />
          <span>{t("copyPrompt")}</span>
        </>
      )}
    </button>
  );
}
