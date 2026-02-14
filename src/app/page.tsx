import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <header className="flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {t("common.appName")}
        </h1>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("home.title")}
        </h2>
        <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          {t("home.subtitle")}
        </p>
        <div className="mt-8 flex gap-4">
          <button className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
            {t("home.browseExamples")}
          </button>
          <button className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            {t("home.trySandbox")}
          </button>
        </div>
      </main>
    </div>
  );
}
