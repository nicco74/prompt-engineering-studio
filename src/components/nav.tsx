import Link from "next/link";
import { useTranslations } from "next-intl";
import { Home, BookOpen, Beaker, Bookmark } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Nav() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
        >
          {tCommon("appName")}
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Home size={16} />
            {t("home")}
          </Link>
          <Link
            href="/examples"
            className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <BookOpen size={16} />
            {t("examples")}
          </Link>
          <Link
            href="/sandbox"
            className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Beaker size={16} />
            {t("sandbox")}
          </Link>
          <Link
            href="/collection"
            className="flex items-center gap-1.5 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <Bookmark size={16} />
            {t("collection")}
          </Link>

          <div className="ml-2 border-l border-zinc-200 pl-4 dark:border-zinc-700">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
