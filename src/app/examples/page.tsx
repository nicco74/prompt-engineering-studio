import { useTranslations } from "next-intl";
import { categories, allExamples } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";
import { getExamplesByCategory } from "@/content";
import {
  ExampleSearch,
  type SearchableExample,
  type SearchableCategory,
} from "@/components/example-search";

export default function ExamplesPage() {
  const t = useTranslations("examples");
  const tNav = useTranslations("nav");

  // Prepare serializable data for the client search component.
  // We flatten prompt text from all steps into a single searchable string
  // so the client component does not need the full step objects.
  const searchableExamples: SearchableExample[] = allExamples.map((ex) => ({
    id: ex.id,
    slug: ex.slug,
    title: ex.title,
    description: ex.description,
    category: ex.category,
    difficulty: ex.difficulty,
    stepsCount: ex.steps.length,
    searchableText: ex.steps.map((s) => s.prompt).join(" "),
    title_no: ex.title_no,
    description_no: ex.description_no,
  }));

  const searchableCategories: SearchableCategory[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    name_no: cat.name_no,
  }));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("examples") },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("title")}
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {t("subtitle")}
        </p>
      </div>

      {/* Category cards — Server Component grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const examples = getExamplesByCategory(category.id);
          return (
            <CategoryCard
              key={category.id}
              category={category}
              exampleCount={examples.length}
            />
          );
        })}
      </div>

      {/* Divider */}
      <hr className="my-10 border-zinc-200 dark:border-zinc-800" />

      {/* Search and filter — Client Component */}
      <ExampleSearch
        examples={searchableExamples}
        categories={searchableCategories}
      />
    </div>
  );
}
