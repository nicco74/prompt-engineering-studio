# Architecture Patterns

**Domain:** Interactive AI prompt-engineering learning platform
**Researched:** 2026-02-14
**Overall confidence:** HIGH

## Recommended Architecture

A **server-first Next.js App Router** application with five distinct layers: Routing/i18n, UI, Content, AI Integration, and Persistence. Content is managed as local typed JSON/TypeScript files (no CMS). AI integration uses the Vercel AI SDK provider registry for provider-agnostic streaming. User state (progress, bookmarks, notes, saved prompts) lives in browser localStorage with cookie-based session gating for password auth.

```
                        +------------------+
                        |   Vercel Edge    |
                        |   (Middleware)   |
                        |  i18n routing +  |
                        |  auth gate       |
                        +--------+---------+
                                 |
                    +------------+------------+
                    |    Next.js App Router   |
                    |    /[locale]/...        |
                    +--+--------+--------+---+
                       |        |        |
              +--------+  +----+----+  +-+--------+
              | Pages  |  |  API    |  | Layouts  |
              | (RSC)  |  | Routes  |  | (shared) |
              +---+----+  +----+----+  +----+-----+
                  |             |            |
          +-------+-------+    |    +-------+-------+
          |  UI Components |   |    | i18n Provider |
          |  (Client +     |   |    | (next-intl)   |
          |   Server)      |   |    +---------------+
          +-------+--------+   |
                  |            |
          +-------+--------+  +--------+--------+
          | Content Layer  |  |  AI Service     |
          | (typed JSON/TS)|  |  (AI SDK +      |
          |                |  |   provider      |
          |                |  |   registry)     |
          +----------------+  +-----------------+
                  |                    |
          +-------+--------+          |
          | Persistence    |          |
          | (localStorage  |          |
          |  + cookies)    |          |
          +----------------+          |
                                      |
                           +----------+----------+
                           |  External AI API    |
                           |  (OpenAI/Anthropic/ |
                           |   any provider)     |
                           +---------------------+
```

### Component Boundaries

| Component | Responsibility | Communicates With | Server/Client |
|-----------|---------------|-------------------|---------------|
| **Middleware** | Locale detection, redirect to `/[locale]/...`, auth cookie check, redirect unauthenticated users to login | Next.js router, cookies | Edge |
| **Root Layout** (`/[locale]/layout.tsx`) | HTML shell, `<html lang>`, `NextIntlClientProvider`, global providers, font loading | i18n Provider, all pages | Server |
| **Pages (Server Components)** | Data reads from Content Layer, render static content, pass props to Client Components | Content Layer, UI Components | Server |
| **UI Components (Client)** | Interactive elements: sandbox editor, progress indicators, bookmark buttons, copy-to-clipboard, language switcher | Persistence Layer, AI Service (via fetch to API routes) | Client |
| **UI Components (Server)** | Static rendering: example cards, step-by-step prompt evolution displays, category listings | Content Layer | Server |
| **Content Layer** | Typed data access for curated prompt examples, categories, step-by-step refinements, tips | Pages, UI Components (server) | Server (import-time) |
| **AI Service (API Routes)** | Proxy AI requests, enforce rate limits, hide API keys, stream responses back to client | External AI API via AI SDK | Server |
| **i18n Provider** | Translation loading, locale state, `useTranslations()` hook for Client Components | Root Layout, all components | Both |
| **Persistence Layer** | Read/write user progress, bookmarks, notes, saved prompts to localStorage; auth session cookie | UI Components (Client) | Client |
| **Auth Gate** | Simple password form, set session cookie on correct password, middleware checks cookie | Middleware, Persistence | Both |

### Data Flow

#### 1. Content Reading (Server-Side, Build/Request Time)

```
Typed JSON/TS files in /src/content/
        |
        v
Content access functions (getExamples, getCategories, etc.)
        |
        v
Server Components read content via direct import/function call
        |
        v
Props passed to Client Components for interactivity
```

Content is **statically importable** -- no database, no API call. Server Components import content directly. This means content changes require a redeploy, which is acceptable for a curated learning platform where content is authored by the team.

#### 2. AI Feedback Loop (Client -> API Route -> External AI)

```
User types prompt in Sandbox (Client Component)
        |
        v
Client calls POST /api/ai/feedback (fetch with streaming)
        |
        v
API Route uses AI SDK streamText() with provider registry model
        |
        v
AI SDK calls external provider (OpenAI, Anthropic, etc.)
        |
        v
Streaming response flows back through API route to client
        |
        v
Client renders streamed feedback in real-time
```

The API route is the **only component that touches AI provider credentials**. The client never sees API keys. The provider registry in `src/lib/ai/registry.ts` centralizes model configuration so switching providers is a one-file change.

#### 3. User State Persistence (Client-Side)

```
User action (bookmark, note, complete lesson, save prompt)
        |
        v
React state update in Client Component
        |
        v
Persistence hook (useLocalStorage or Zustand with persist)
writes to localStorage under namespaced keys
        |
        v
On page load, persistence hook hydrates state from localStorage
```

For 2-5 users on personal devices, localStorage is sufficient. No server-side database needed. If the team grows beyond ~10 users or needs cross-device sync, migrate to a lightweight database (SQLite via Turso, or Vercel KV).

#### 4. Authentication Flow

```
User visits any page
        |
        v
Middleware checks for auth cookie
        |
    No cookie?  --> Redirect to /[locale]/login
        |
    Has cookie? --> Allow through to requested page
        |
        v
Login page: user enters shared password
        |
        v
POST /api/auth/login validates password against env var
        |
        v
Sets HttpOnly cookie with session token (simple hash)
        |
        v
Redirect to home page
```

No user accounts. One shared password stored in `SITE_PASSWORD` env var. Cookie-based so middleware can gate all routes server-side before any page renders.

#### 5. i18n Data Flow

```
Request arrives at middleware
        |
        v
Middleware detects locale (URL path, Accept-Language header, cookie)
        |
        v
Redirects to /en/... or /no/... as needed
        |
        v
/[locale]/layout.tsx loads messages for detected locale
        |
        v
NextIntlClientProvider wraps app, making useTranslations() available
        |
        v
Server Components: use getTranslations() from next-intl/server
Client Components: use useTranslations() hook
```

Translation files live in `/messages/en.json` and `/messages/no.json`. Namespaced by feature (e.g., `HomePage.title`, `Sandbox.placeholder`, `Common.submit`).

## Recommended Directory Structure

```
src/
  app/
    [locale]/
      layout.tsx              # Root layout with NextIntlClientProvider
      page.tsx                 # Home/landing page
      login/
        page.tsx               # Password login page
      examples/
        page.tsx               # Browse all categories
        [category]/
          page.tsx             # Examples in a category
          [exampleId]/
            page.tsx           # Single example with step-by-step view
      sandbox/
        page.tsx               # Practice sandbox with AI feedback
      progress/
        page.tsx               # User's learning progress dashboard
      saved/
        page.tsx               # Saved prompts and bookmarked examples
    api/
      ai/
        feedback/
          route.ts             # AI feedback streaming endpoint
      auth/
        login/
          route.ts             # Password validation endpoint
  components/
    ui/                        # Generic UI primitives (Button, Card, Input, etc.)
    examples/                  # Example browsing components
      ExampleCard.tsx
      StepByStepView.tsx
      CategoryGrid.tsx
    sandbox/                   # Practice sandbox components
      PromptEditor.tsx
      FeedbackStream.tsx
    progress/                  # Progress tracking components
      ProgressDashboard.tsx
      LessonCheckmark.tsx
    layout/                    # Layout components
      Header.tsx
      Navigation.tsx
      LanguageSwitcher.tsx
      Footer.tsx
  content/
    examples/                  # Curated prompt refinement data
      index.ts                 # Export all examples with types
      content-marketing.ts     # Category: content/marketing examples
      business-docs.ts         # Category: business documents
      internal-comms.ts        # Category: internal communications
    categories.ts              # Category definitions and metadata
    types.ts                   # TypeScript interfaces for all content
  lib/
    ai/
      registry.ts              # AI SDK provider registry configuration
      prompts.ts               # System prompts for feedback generation
    i18n/
      routing.ts               # next-intl routing configuration
      request.ts               # next-intl request configuration (getRequestConfig)
    auth/
      password.ts              # Password validation utility
      session.ts               # Cookie/session helpers
    hooks/
      useLocalStorage.ts       # localStorage persistence hook
      useProgress.ts           # Progress tracking hook
      useBookmarks.ts          # Bookmark management hook
      useNotes.ts              # Notes management hook
      useSavedPrompts.ts       # Saved prompts hook
  middleware.ts                # next-intl middleware + auth check
messages/
  en.json                      # English translations
  no.json                      # Norwegian translations
```

## Patterns to Follow

### Pattern 1: Server Components for Content, Client Components for Interaction

**What:** Default to Server Components. Only add `'use client'` when the component needs browser APIs (event handlers, useState, useEffect, localStorage).

**When:** Every component decision.

**Example:**
```typescript
// src/app/[locale]/examples/[category]/page.tsx (Server Component)
import { getExamplesByCategory } from '@/content/examples';
import { ExampleCard } from '@/components/examples/ExampleCard';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const examples = getExamplesByCategory(params.category);
  return (
    <div>
      {examples.map(ex => <ExampleCard key={ex.id} example={ex} />)}
    </div>
  );
}
```

```typescript
// src/components/examples/ExampleCard.tsx (Server Component - no interactivity)
import { Example } from '@/content/types';

export function ExampleCard({ example }: { example: Example }) {
  return (
    <div className="rounded-lg border p-4">
      <h3>{example.title}</h3>
      <p>{example.description}</p>
    </div>
  );
}
```

```typescript
// src/components/examples/BookmarkButton.tsx (Client Component - needs onClick + localStorage)
'use client';
import { useBookmarks } from '@/lib/hooks/useBookmarks';

export function BookmarkButton({ exampleId }: { exampleId: string }) {
  const { isBookmarked, toggle } = useBookmarks();
  return (
    <button onClick={() => toggle(exampleId)}>
      {isBookmarked(exampleId) ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
```

### Pattern 2: Provider Registry for AI Abstraction

**What:** Centralize all AI provider configuration in a single registry file. Reference models by alias, not provider-specific IDs.

**When:** Any AI integration code.

**Example:**
```typescript
// src/lib/ai/registry.ts
import { createProviderRegistry, customProvider } from 'ai';
import { openai } from '@ai-sdk/openai';

export const registry = createProviderRegistry({
  openai: customProvider({
    languageModels: {
      feedback: openai('gpt-4o-mini'), // alias for the feedback model
    },
    fallbackProvider: openai,
  }),
});

// To switch providers later, only this file changes:
// import { anthropic } from '@ai-sdk/anthropic';
// feedback: anthropic('claude-haiku-4-5'),
```

```typescript
// src/app/api/ai/feedback/route.ts
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { registry } from '@/lib/ai/registry';
import { FEEDBACK_SYSTEM_PROMPT } from '@/lib/ai/prompts';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, context } = await req.json();

  const result = streamText({
    model: registry.languageModel('openai:feedback'),
    system: FEEDBACK_SYSTEM_PROMPT,
    prompt: `Analyze this prompt and provide improvement suggestions:\n\n${prompt}\n\nContext: ${context}`,
  });

  return result.toUIMessageStreamResponse();
}
```

### Pattern 3: Typed Content Layer

**What:** Define TypeScript interfaces for all content, then export typed data from `.ts` files. No runtime parsing needed -- TypeScript validates at build time.

**When:** All curated content (examples, categories, tips).

**Example:**
```typescript
// src/content/types.ts
export interface PromptStep {
  version: number;
  prompt: string;
  analysis: {
    changes: string;
    pros: string[];
    cons: string[];
    feedback: string;
    tips: string[];
  };
  aiOutputPreview: string; // what AI would produce with this prompt
}

export interface Example {
  id: string;
  category: string;
  titleKey: string;        // i18n key for the title
  descriptionKey: string;  // i18n key for the description
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: PromptStep[];
  tags: string[];
}

export interface Category {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  order: number;
}
```

### Pattern 4: Namespaced localStorage with Custom Hooks

**What:** Wrap all localStorage access in typed custom hooks with a namespace prefix to avoid key collisions.

**When:** Any user state persistence (progress, bookmarks, notes, saved prompts).

**Example:**
```typescript
// src/lib/hooks/useLocalStorage.ts
'use client';
import { useState, useEffect } from 'react';

const NAMESPACE = 'pes'; // prompt-engineering-studio

export function useLocalStorage<T>(key: string, initialValue: T) {
  const namespacedKey = `${NAMESPACE}:${key}`;
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(namespacedKey);
    if (stored) setValue(JSON.parse(stored));
    setHydrated(true);
  }, [namespacedKey]);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(namespacedKey, JSON.stringify(value));
    }
  }, [value, hydrated, namespacedKey]);

  return [value, setValue, hydrated] as const;
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Database for 2-5 Users

**What:** Setting up PostgreSQL/MySQL/MongoDB for user data persistence at this scale.

**Why bad:** Massive overhead for a team of 2-5. Adds infrastructure cost, migration complexity, connection management, and deployment concerns -- all for storing bookmarks and progress checkmarks.

**Instead:** Use localStorage for user state. If cross-device sync becomes needed later, add Vercel KV (Redis) or a SQLite database (Turso) -- both are trivial to add retroactively.

### Anti-Pattern 2: CMS for Curated Content

**What:** Integrating Contentful, Sanity, Strapi, or any CMS for managing the curated prompt examples.

**Why bad:** The content is authored by the same developers building the platform. A CMS adds API latency, a separate system to manage, potential schema drift, and cost -- all for content that changes infrequently.

**Instead:** Typed TypeScript files in `/src/content/`. Content changes go through the same PR/deploy workflow as code changes. TypeScript catches schema errors at build time.

### Anti-Pattern 3: Direct AI Provider Calls from Client

**What:** Calling OpenAI/Anthropic APIs directly from browser-side code.

**Why bad:** Exposes API keys to the client. No rate limiting. No cost control. Any user can extract the key and run up the bill.

**Instead:** All AI calls go through Next.js API routes (`/api/ai/feedback`). API keys stay in server-side environment variables. Add rate limiting at the route level.

### Anti-Pattern 4: Monolithic Translation Files

**What:** Putting all translations in a single flat JSON object.

**Why bad:** File becomes unwieldy quickly. Merge conflicts when multiple features modify translations simultaneously. Hard to find relevant keys.

**Instead:** Namespace translations by feature/page: `HomePage.title`, `Sandbox.submitButton`, `Examples.filterLabel`. Keep the file structure flat (one file per locale) but deeply namespaced.

### Anti-Pattern 5: Client Components by Default

**What:** Adding `'use client'` to every component or putting it at the layout level.

**Why bad:** Loses all benefits of Server Components: zero JS shipped for content-heavy pages, direct data access without API calls, better SEO. A learning platform is primarily content -- most of it should render on the server.

**Instead:** Default to Server Components. Only opt into Client Components for interactive pieces (buttons, forms, editors, the sandbox).

## Suggested Build Order

Build order follows dependency chains. Each phase produces something usable, and later phases build on earlier foundations.

### Phase 1: Foundation (no dependencies)

**Build:** Project structure, Tailwind configuration, base layout, i18n setup with next-intl, basic routing (`/[locale]/` structure).

**Why first:** Every other component depends on the routing structure, layout shell, and i18n provider being in place. Getting `next-intl` middleware configured early prevents painful retrofitting.

**Produces:** A navigable app skeleton with English/Norwegian switching.

### Phase 2: Content Layer + Example Browsing (depends on Phase 1)

**Build:** Content type definitions, sample content data files, category browsing page, individual example page with step-by-step view.

**Why second:** This is the core read-only value of the platform. Users can learn from curated examples before any interactivity is built. Server Components only -- no client-side complexity yet.

**Produces:** A functional content browser where users can study prompt refinement examples.

### Phase 3: Auth Gate (depends on Phase 1)

**Build:** Login page, password validation API route, session cookie management, middleware auth check.

**Why third:** Must be in place before deploying to Vercel. Can be built in parallel with Phase 2 since it only depends on Phase 1's routing/layout foundation.

**Produces:** Password-protected access to the platform.

### Phase 4: User State Persistence (depends on Phase 1)

**Build:** localStorage hooks (useLocalStorage, useBookmarks, useProgress, useNotes, useSavedPrompts), bookmark/note UI on example pages, progress tracking page.

**Why fourth:** Adds personalization to the content browsing experience. Requires Client Components but the data model is simple.

**Produces:** Users can bookmark examples, add notes, and track which examples they have studied.

### Phase 5: AI Integration + Sandbox (depends on Phases 1, 2)

**Build:** AI SDK provider registry, feedback API route, sandbox page with prompt editor, streaming feedback display.

**Why fifth:** Most complex feature. Depends on content layer (for providing context to AI) and the app shell. Isolated to one page (`/sandbox`) and one API route, so it does not risk breaking earlier work.

**Produces:** Users can write prompts and get real-time AI feedback on how to improve them.

### Phase 6: Polish + Deploy (depends on all prior phases)

**Build:** Responsive design refinement, copy-to-clipboard, loading states, error boundaries, Vercel deployment configuration, environment variable setup.

**Why last:** Polish work touches every layer. Deployment requires all features to be functional.

**Produces:** A production-ready deployed platform.

### Dependency Graph

```
Phase 1: Foundation
   |
   +---> Phase 2: Content Layer + Browsing
   |        |
   |        +---> Phase 5: AI Integration + Sandbox
   |
   +---> Phase 3: Auth Gate (can parallel with Phase 2)
   |
   +---> Phase 4: User State Persistence (can parallel with Phase 2/3)
   |
   All ----> Phase 6: Polish + Deploy
```

**Parallelization opportunities:** Phases 2, 3, and 4 can all be built concurrently after Phase 1 is complete. Phase 5 depends on Phase 2's content types (for sandbox context) but not on Phases 3 or 4.

## Scalability Considerations

| Concern | At 2-5 users (current) | At 50 users | At 500+ users |
|---------|------------------------|-------------|---------------|
| **Data persistence** | localStorage (no server DB) | Vercel KV or Turso SQLite | PostgreSQL with proper auth |
| **Authentication** | Shared password + cookie | Still workable | Individual accounts needed |
| **AI API costs** | Minimal, low usage | Add rate limiting per session | Add per-user quotas, usage tracking |
| **Content management** | TypeScript files in repo | Still workable | Consider lightweight CMS |
| **Hosting** | Vercel Hobby tier | Vercel Pro | Vercel Pro with edge caching |
| **i18n** | 2 locales, manageable files | Still fine | Consider translation management platform |

The architecture is deliberately right-sized for 2-5 users. Every scaling concern has a clear migration path, but none of those migrations are needed now. Build for today, not for hypothetical scale.

## Sources

- [Next.js App Router Documentation](https://nextjs.org/docs/app) (HIGH confidence -- official docs)
- [next-intl App Router Setup](https://next-intl.dev/docs/getting-started/app-router) via Context7 /amannn/next-intl (HIGH confidence)
- [Vercel AI SDK Provider Management](https://ai-sdk.dev/docs/ai-sdk-core/provider-management) via Context7 /websites/ai-sdk_dev (HIGH confidence)
- [Vercel AI SDK Provider Registry Template](https://vercel.com/templates/next.js/ai-sdk-provider-registry) (HIGH confidence -- official Vercel template)
- [Next.js Architecture Patterns 2026](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) (MEDIUM confidence -- third-party, consistent with official docs)
- [Next.js Local JSON File Data Loading](https://www.slingacademy.com/article/next-js-read-and-display-data-from-a-local-json-file/) (MEDIUM confidence -- verified approach)
- [Vercel Knowledge Base: Loading Static Files](https://vercel.com/kb/guide/loading-static-file-nextjs-api-route) (HIGH confidence -- official Vercel)
