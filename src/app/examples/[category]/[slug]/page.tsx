import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getCategoryById, getExampleBySlug } from "@/content";
import type { CategoryId, Example, Category } from "@/content/types";
import {
  getTitle,
  getDescription,
  getAiOutput,
  getCategoryName,
} from "@/content/localized";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { PromptStepView } from "@/components/prompt-step-view";
import { OutputPreview } from "@/components/output-preview";
import { VersionNav } from "@/components/version-nav";
import { BookmarkButton } from "@/components/bookmark-button";
import { NoteEditor } from "@/components/note-editor";

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
      category={category}
      categoryId={categoryId}
      currentVersion={currentVersion}
      currentStep={currentStep}
    />
  );
}

function ExampleDetailContent({
  example,
  category,
  categoryId,
  currentVersion,
  currentStep,
}: {
  example: Example;
  category: Category;
  categoryId: string;
  currentVersion: number;
  currentStep: Example["steps"][number];
}) {
  const tNav = useTranslations("nav");
  const locale = useLocale() as "en" | "no";

  const localizedTitle = getTitle(example, locale);
  const localizedDescription = getDescription(example, locale);
  const localizedAiOutput = getAiOutput(currentStep, locale);
  const localizedCategoryName = getCategoryName(category, locale);

  const basePath = `/examples/${categoryId}/${example.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        items={[
          { label: tNav("home"), href: "/" },
          { label: tNav("examples"), href: "/examples" },
          { label: localizedCategoryName, href: `/examples/${categoryId}` },
          { label: localizedTitle },
        ]}
      />

      {/* Example header -- stacks on mobile, side-by-side on wider screens */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
            {localizedTitle}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            {localizedDescription}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BookmarkButton slug={example.slug} />
          <DifficultyBadge difficulty={example.difficulty} />
        </div>
      </div>

      {/* Version navigation (top) */}
      <div className="mt-6">
        <VersionNav
          currentVersion={currentVersion}
          totalVersions={example.steps.length}
          basePath={basePath}
        />
      </div>

      {/* Two-column layout: step detail + output. Stacks on mobile. */}
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
          <OutputPreview output={localizedAiOutput} />
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

      {/* Personal notes */}
      <div className="mt-8">
        <NoteEditor slug={example.slug} />
      </div>
    </div>
  );
}
