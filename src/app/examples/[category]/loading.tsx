import { Skeleton, CardSkeleton } from "@/components/skeleton";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Breadcrumb skeleton */}
      <Skeleton className="h-4 w-56" />

      {/* Heading */}
      <div className="mt-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="mt-2 h-5 w-80" />
      </div>

      {/* Example cards grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
