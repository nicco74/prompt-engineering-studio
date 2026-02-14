import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getCategoryById, getExampleBySlug } from "@/content";
import type { CategoryId, Example } from "@/content/types";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { PromptStepView } from "@/components/prompt-step-view";
import { OutputPreview } from "@/components/output-preview";
import { VersionNav } from "@/components/version-nav";

interface ExampleDetailPageProps {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ v?: string }>;
}

export default async function ExampleDetailPage({
  params,
  searchParams,
}: ExampleDetailPageProps) {
  const { category: categoryId, slug } = await params;
  const { v } = await searchParams;

  const category = getCategoryById(categoryId as CategoryId);
  if (!category) {
    notFound();
  }

  const example = getExampleBySlug(slug);
  if (!example || example.category !== categoryId) {
    notFound();
  }

  // Parse version from search params, default to 1
  const versionParam = v ? parseInt(v, 10) : 1;
  const currentVersion = Math.max(
    1,
    Math.min(versionParam, example.steps.length)
  );
  const currentStep = example.steps[currentVersion - 1];

  return (
    <ExampleDetailContent
      example={example}
      categoryName={category.name}
      categoryId={categoryId}
      currentVersion={currentVersion}
      currentStep={currentStep}
    />
  );
}

function ExampleDetailContent({
  example,
  categoryName,
  categoryId,
  currentVersion,
  currentStep,
}: {
  example: Example;
  categoryName: string;
  categoryId: string;
  currentVersion: number;
  currentStep: Example["steps"][number];
}) {
  const tNav = useTranslations("nav");

  const basePath = `/examples/${categoryId}/${example.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("examples"), href: "/examples" },
          { label: categoryName, href: `/examples/${categoryId}` },
          { label: example.title },
        ]}
      />

      {/* Example header */}
      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {example.title}
          </h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {example.description}
          </p>
        </div>
        <DifficultyBadge difficulty={example.difficulty} />
      </div>

      {/* Version navigation (top) */}
      <div className="mt-6">
        <VersionNav
          currentVersion={currentVersion}
          totalVersions={example.steps.length}
          basePath={basePath}
        />
      </div>

      {/* Two-column layout: step detail + output */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Left: prompt info */}
        <div>
          <PromptStepView
            step={currentStep}
            totalSteps={example.steps.length}
          />
        </div>

        {/* Right: AI output preview */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <OutputPreview output={currentStep.aiOutput} />
        </div>
      </div>

      {/* Version navigation (bottom) */}
      <div className="mt-8">
        <VersionNav
          currentVersion={currentVersion}
          totalVersions={example.steps.length}
          basePath={basePath}
        />
      </div>
    </div>
  );
}
