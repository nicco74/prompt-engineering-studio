import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[calc(100vh-57px)] flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          {t("home.title")}
        </h1>
        <p className="mt-4 max-w-lg text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          {t("home.subtitle")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/examples"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-500"
          >
            {t("home.browseExamples")}
          </Link>
          <Link
            href="/sandbox"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-500"
          >
            {t("home.trySandbox")}
          </Link>
        </div>
      </div>
    </div>
  );
}
