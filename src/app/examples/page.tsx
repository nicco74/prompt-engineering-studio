import { useTranslations } from "next-intl";
import { categories, getExamplesByCategory } from "@/content";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryCard } from "@/components/category-card";

export default function ExamplesPage() {
  const t = useTranslations("examples");
  const tNav = useTranslations("nav");

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
    </div>
  );
}
