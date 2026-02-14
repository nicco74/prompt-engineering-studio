import {
  Skeleton,
  CategoryGridSkeleton,
  SearchResultsSkeleton,
} from "@/components/skeleton";

export default function ExamplesLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-40" />

      {/* Heading */}
      <div className="mt-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="mt-2 h-5 w-96" />
      </div>

      {/* Category grid */}
      <div className="mt-8">
        <CategoryGridSkeleton />
      </div>

      {/* Divider */}
      <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

      {/* Search skeleton */}
      <Skeleton className="h-11 w-full rounded-lg" />
      <div className="mt-4 flex gap-3">
        <Skeleton className="h-10 w-40 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-4 w-32" />

      {/* Results grid */}
      <div className="mt-4">
        <SearchResultsSkeleton />
      </div>
    </div>
  );
}
