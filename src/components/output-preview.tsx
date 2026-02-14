import { useTranslations } from "next-intl";
import { Bot } from "lucide-react";

interface OutputPreviewProps {
  output: string;
}

export function OutputPreview({ output }: OutputPreviewProps) {
  const t = useTranslations("examples");

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-3 sm:px-4 dark:border-zinc-800">
        <Bot size={16} className="text-zinc-500" aria-hidden="true" />
        <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t("output")}
        </h3>
      </div>
      <div className="p-3 sm:p-4">
        <div className="break-words whitespace-pre-wrap rounded-md bg-zinc-50 p-3 font-mono text-sm leading-relaxed text-zinc-800 sm:p-4 dark:bg-zinc-950 dark:text-zinc-200">
          {output}
        </div>
      </div>
    </div>
  );
}
