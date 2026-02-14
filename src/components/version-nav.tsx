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
    <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      {hasPrevious ? (
        <Link
          href={`${basePath}?v=${currentVersion - 1}`}
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ChevronLeft size={16} />
          {t("previous")}
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 dark:text-zinc-700">
          <ChevronLeft size={16} />
          {t("previous")}
        </span>
      )}

      <div className="flex items-center gap-2">
        {Array.from({ length: totalVersions }, (_, i) => i + 1).map(
          (version) => (
            <Link
              key={version}
              href={`${basePath}?v=${version}`}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
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
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {t("next")}
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-300 dark:text-zinc-700">
          {t("next")}
          <ChevronRight size={16} />
        </span>
      )}
    </div>
  );
}
