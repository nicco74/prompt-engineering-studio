import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCategoryById, getExamplesByCategory } from "@/content";
import type { CategoryId } from "@/content/types";
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

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("examples"), href: "/examples" },
          { label: category.name },
        ]}
      />

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {category.name}
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          {category.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
}
