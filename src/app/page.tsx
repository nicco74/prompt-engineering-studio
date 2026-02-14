import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[calc(100vh-57px)] flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("home.title")}
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          {t("home.subtitle")}
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/examples"
            className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {t("home.browseExamples")}
          </Link>
          <Link
            href="/sandbox"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {t("home.trySandbox")}
          </Link>
        </div>
      </div>
    </div>
  );
}
