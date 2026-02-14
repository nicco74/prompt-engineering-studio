import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight
              size={14}
              className="text-zinc-400 dark:text-zinc-600"
            />
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 dark:text-zinc-100">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
