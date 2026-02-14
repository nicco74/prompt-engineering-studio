import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-1 text-sm"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight
              size={14}
              className="shrink-0 text-zinc-400 dark:text-zinc-600"
              aria-hidden="true"
            />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="truncate text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:rounded-sm dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-zinc-500"
            >
              {item.label}
            </Link>
          ) : (
            <span className="truncate font-medium text-zinc-900 dark:text-zinc-100">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
