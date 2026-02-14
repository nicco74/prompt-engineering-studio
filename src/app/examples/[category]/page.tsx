import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getCategoryById, getExamplesByCategory } from "@/content";
import type { CategoryId } from "@/content/types";
import { getCategoryName, getCategoryDescription } from "@/content/localized";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ExampleCard } from "@/components/example-card";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryId } = await params;
  const category = getCategoryById(categoryId as CategoryId);

  if (!category) {
    notFound();
  }

  const examples = getExamplesByCategory(category.id);

  return <CategoryPageContent category={category} examples={examples} />;
}

function CategoryPageContent({
  category,
  examples,
}: {
  category: NonNullable<ReturnType<typeof getCategoryById>>;
  examples: ReturnType<typeof getExamplesByCategory>;
}) {
  const t = useTranslations("examples");
  const tNav = useTranslations("nav");
  const locale = useLocale() as "en" | "no";

  const localizedCategoryName = getCategoryName(category, locale);
  const localizedCategoryDescription = getCategoryDescription(category, locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("examples"), href: "/examples" },
          { label: localizedCategoryName },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50">
          {localizedCategoryName}
        </h1>
        <p className="mt-2 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          {localizedCategoryDescription}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}
