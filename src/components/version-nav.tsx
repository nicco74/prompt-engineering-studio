import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VersionNavProps {
  currentVersion: number;
  totalVersions: number;
  basePath: string;
}

export function VersionNav({
  currentVersion,
  totalVersions,
  basePath,
}: VersionNavProps) {
  const t = useTranslations("common");
  const hasPrevious = currentVersion > 1;
  const hasNext = currentVersion < totalVersions;

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-2 py-2 sm:px-4 sm:py-3 dark:border-zinc-800 dark:bg-zinc-900">
      {hasPrevious ? (
        <Link
          href={`${basePath}?v=${currentVersion - 1}`}
          className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 sm:gap-1.5 sm:px-3 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">{t("previous")}</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-300 sm:gap-1.5 sm:px-3 dark:text-zinc-700">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">{t("previous")}</span>
        </span>
      )}

      <div className="flex items-center gap-1 sm:gap-2" role="navigation" aria-label="Version steps">
        {Array.from({ length: totalVersions }, (_, i) => i + 1).map(
          (version) => (
            <Link
              key={version}
              href={`${basePath}?v=${version}`}
              aria-label={`Version ${version}`}
              aria-current={version === currentVersion ? "step" : undefined}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 sm:h-8 sm:w-8 sm:text-sm dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900 ${
                version === currentVersion
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {version}
            </Link>
          )
        )}
      </div>

      {hasNext ? (
        <Link
          href={`${basePath}?v=${currentVersion + 1}`}
          className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 sm:gap-1.5 sm:px-3 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-zinc-300 sm:gap-1.5 sm:px-3 dark:text-zinc-700">
          <span className="hidden sm:inline">{t("next")}</span>
          <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}
