"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { setLocale } from "@/i18n/actions";
import { locales } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    startTransition(async () => {
      await setLocale(newLocale);
      window.location.reload();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Globe size={18} className="text-zinc-500" />
      <select
        value={locale}
        onChange={handleChange}
        disabled={isPending}
        className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        aria-label={t("switchTo")}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {t(loc)}
          </option>
        ))}
      </select>
    </div>
  );
}
