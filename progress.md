# Prompt Engineering Studio — Progress

## Phase 3: Content Type System & Data Architecture
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Installed `zod` (4.x) for build-time content validation
- Installed `tsx` (dev dependency) for running TypeScript validation scripts
- Created TypeScript interfaces: `Category`, `Example`, `PromptStep`, `CategoryId`, `Difficulty`
- Created Zod validation schemas matching all interfaces
- Defined 3 content categories: content-marketing, business-docs, internal-comms
- Created 6 curated prompt refinement examples (2 per category):
  1. **Product Launch Social Post** (content-marketing, beginner) — 4 steps
  2. **Newsletter Welcome Email** (content-marketing, intermediate) — 4 steps
  3. **Quarterly Executive Summary** (business-docs, intermediate) — 4 steps
  4. **Client Project Proposal** (business-docs, advanced) — 4 steps
  5. **Weekly Project Status Update** (internal-comms, beginner) — 4 steps
  6. **Cross-Functional Meeting Summary** (internal-comms, advanced) — 4 steps
- Created content index module with validation-on-import and convenience accessors
- Created build-time validation script (`npm run validate-content`)
- Integrated validation into the build pipeline (`npm run build` runs validation first)
- Verified full build passes

### Files created/modified
- `src/content/types.ts` — TypeScript interfaces
- `src/content/schemas.ts` — Zod validation schemas
- `src/content/categories.ts` — Category definitions
- `src/content/examples/content-marketing/product-launch-social-post.ts`
- `src/content/examples/content-marketing/newsletter-welcome-sequence.ts`
- `src/content/examples/business-docs/executive-summary.ts`
- `src/content/examples/business-docs/client-proposal.ts`
- `src/content/examples/internal-comms/project-status-update.ts`
- `src/content/examples/internal-comms/meeting-summary.ts`
- `src/content/index.ts` — Validated exports and utility functions
- `src/content/validate.ts` — Build-time validation script
- `package.json` — Added `validate-content` script, updated `build` script, added `tsx` dev dep

### Content summary
- 6 examples across 3 categories
- 24 total prompt refinement steps
- Difficulty spread: 2 beginner, 2 intermediate, 2 advanced
- Learning path: beginner → intermediate → advanced within category order
- All content follows refinement pedagogy (iterative improvement, not technique taxonomy)

### Next steps
- Phase 4: UI components for displaying examples and steps

---

## Phase 4: Content Browsing UI
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Created shared navigation component (`Nav`) with links to Home, Examples, Sandbox, My Collection, plus LanguageSwitcher
- Updated root layout to include Nav in all pages
- Updated home page to use `<Link>` elements pointing to /examples and /sandbox (removed inline header since Nav is now in layout)
- Created examples listing page (`/examples`) with category grid showing name, description, and example count
- Created category page (`/examples/[category]`) showing all examples in that category with title, description, difficulty badge, and step count
- Created example detail page (`/examples/[category]/[slug]`) with:
  - Breadcrumb navigation
  - Difficulty badge
  - Two-column layout: prompt step details (left) and AI output preview (right)
  - Version navigation via URL search params (`?v=1`, `?v=2`) — works without client JS
  - Displays: version indicator, changes, prompt text, pros, cons, feedback, why, tips, AI output
  - Top and bottom version navigation with numbered step indicators
  - Sticky AI output panel on desktop
- Created 8 reusable Server Components:
  - `nav.tsx` — site navigation
  - `breadcrumbs.tsx` — hierarchical breadcrumb trail
  - `category-card.tsx` — category grid card
  - `example-card.tsx` — example listing card
  - `difficulty-badge.tsx` — color-coded difficulty indicator
  - `prompt-step-view.tsx` — main refinement view with all educational scaffolding
  - `output-preview.tsx` — AI output display
  - `version-nav.tsx` — previous/next controls with step indicators
- Added translation keys to both en.json and no.json for new UI elements
- All content pages rendered as Server Components — zero unnecessary JavaScript shipped
- Build passes successfully

### Files created
- `src/components/nav.tsx`
- `src/components/breadcrumbs.tsx`
- `src/components/category-card.tsx`
- `src/components/example-card.tsx`
- `src/components/difficulty-badge.tsx`
- `src/components/prompt-step-view.tsx`
- `src/components/output-preview.tsx`
- `src/components/version-nav.tsx`
- `src/app/examples/page.tsx`
- `src/app/examples/[category]/page.tsx`
- `src/app/examples/[category]/[slug]/page.tsx`

### Files modified
- `src/app/layout.tsx` — Added Nav component
- `src/app/page.tsx` — Replaced buttons with Links, removed inline header
- `messages/en.json` — Added new translation keys
- `messages/no.json` — Added new translation keys

### Architecture notes
- Version navigation uses URL search params (`?v=N`) so the entire example detail page is server-rendered — no client-side state needed
- The only "use client" component in the browsing flow is the `LanguageSwitcher` (pre-existing from Phase 2)
- All new components are Server Components by default
- Content is imported from `@/content` which validates all data at module-evaluation time via Zod

### Next steps
- Phase 5: Practice Sandbox with AI feedback

---

## Phase 7: AI Provider Integration & API Layer
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Installed Vercel AI SDK 6.x (`ai@6.0.86`) and OpenAI provider (`@ai-sdk/openai@3.0.29`)
- Created centralized AI provider registry using `createProviderRegistry()` pattern
- Default model: `openai:gpt-4o-mini` — switchable by changing one line
- Created in-memory rate limiter (30 requests/user/hour, keyed by IP)
  - Automatic cleanup of expired entries every 10 minutes
  - Timer uses `unref()` so it won't prevent process exit
- Created `POST /api/ai/chat` route:
  - Accepts `{prompt, systemPrompt?}` body
  - Verifies auth via DAL (`verifyAuth()`) — defense in depth beyond proxy
  - Checks rate limit before processing
  - Streams response using `streamText()` / `toTextStreamResponse()`
  - Returns rate limit headers (`X-RateLimit-Remaining`, `X-RateLimit-Reset`)
  - Returns clear JSON errors: 401 (unauthorized), 429 (rate limited), 400 (bad request)
- Created `POST /api/ai/feedback` route:
  - Accepts `{prompt}` body
  - Same auth and rate limit checks as chat
  - Uses a rubric-based system prompt evaluating: Clarity, Specificity, Context, Constraints, Structure
  - Streams structured feedback with ratings and an improved prompt version
- Added OPENAI_API_KEY to `.env.local` (documented, not committed)
- Created `.env.example` template file for onboarding
- Added i18n strings for rate limit and AI errors in both `en.json` and `no.json`
- All AI modules import "server-only" to prevent client bundle leakage
- TypeScript compiles with zero errors
- Full production build passes

### Files created
- `src/lib/ai/registry.ts` — AI provider registry (centralized model config)
- `src/lib/ai/rate-limit.ts` — In-memory rate limiter (30 req/hour per IP)
- `src/app/api/ai/chat/route.ts` — Streaming chat endpoint
- `src/app/api/ai/feedback/route.ts` — Prompt feedback endpoint
- `.env.example` — Environment variable template (committable)

### Files modified
- `package.json` — Added `ai` and `@ai-sdk/openai` dependencies
- `package-lock.json` — Updated lockfile
- `.env.local` — Added OPENAI_API_KEY placeholder
- `messages/en.json` — Added sandbox AI error strings
- `messages/no.json` — Added sandbox AI error strings

### Architecture notes
- Provider registry pattern: all AI config in one file, swap providers by changing one line
- Rate limiter is per-process/in-memory — resets on restart, does not share across instances
- Both API routes independently verify the session cookie via the DAL (not just the proxy)
- Both routes share the same rate limit pool (keyed by IP, not by route)
- Streaming uses `toTextStreamResponse()` for plain text streaming to the client
- The feedback system prompt evaluates against 5 criteria and returns actionable suggestions

### Next steps
- Phase 8: Sandbox UI wiring (connect frontend to these API routes)
- Phase 9: Enhanced feedback with structured JSON output

---

## Phase 5: Search, Discovery & Clipboard
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Added keyword search input to the `/examples` page for real-time filtering across example titles, descriptions, and prompt text
- Added category dropdown filter (All / Content & Marketing / Business Documents / Internal Communications)
- Added difficulty dropdown filter (All / Beginner / Intermediate / Advanced)
- All filters combine: search + category + difficulty work together
- Created `CopyButton` client component with clipboard copy and "Copied!" visual confirmation (resets after 2 seconds)
- Added the copy button to each prompt version in the example detail view (next to the "Prompt" heading)
- Server Component `/examples` page prepares serializable data and passes it as props to the client `ExampleSearch` component
- Added 6 new translation keys to both `en.json` and `no.json`
- Uses Lucide icons: `Search`, `Filter`, `Copy`, `Check`, `FileText`
- TypeScript compiles with zero errors (`npx tsc --noEmit` passes)

### Files created
- `src/components/copy-button.tsx` — "use client" clipboard copy with visual feedback
- `src/components/example-search.tsx` — "use client" search input + filter dropdowns + results grid

### Files modified
- `src/app/examples/page.tsx` — Added ExampleSearch component with serializable data props
- `src/components/prompt-step-view.tsx` — Added CopyButton next to prompt text heading
- `messages/en.json` — Added search/filter translation keys
- `messages/no.json` — Added search/filter translation keys

### Architecture notes
- Only 2 new "use client" components; the `/examples` page itself remains a Server Component
- Example data is flattened to a `SearchableExample` interface (no step objects) for efficient client-side serialization
- Search is client-side using `useMemo` with case-insensitive substring matching — sufficient for <100 examples
- `CopyButton` uses `navigator.clipboard.writeText()` with a try/catch fallback for older browsers
- Existing category card grid is preserved above the search section, separated by a divider

### Success criteria met
1. User can type a keyword into a search input and see matching examples filtered in real time
2. User can filter examples by category and by difficulty level, and combine filters
3. User can click a copy button on any prompt version and the prompt text is copied to their clipboard with visual confirmation

### Next steps
- Phase 6: Personalization — Bookmarks & Notes

---

## Phase 6: Personalization — Bookmarks & Notes
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Created generic `useLocalStorage` hook using `useSyncExternalStore` for SSR-safe, cross-tab-synced localStorage access
- All localStorage keys namespaced with `pes:` prefix (e.g. `pes:bookmarks`, `pes:notes`)
- Created `useBookmarks` hook — manages an array of bookmarked example slugs stored at `pes:bookmarks`
- Created `useNotes` hook — manages an object mapping example slugs to note text stored at `pes:notes`
- Created `BookmarkButton` component — toggles bookmark state with filled/outlined Lucide `Bookmark`/`BookmarkCheck` icons, amber color when active
- Created `NoteEditor` component — textarea with auto-save on blur and 500ms debounce while typing, syncs across tabs
- Integrated `BookmarkButton` into the example detail page header (next to difficulty badge)
- Integrated `NoteEditor` into the example detail page (below bottom version navigation)
- Created `/collection` page showing all bookmarked examples with:
  - Card layout with title, description, difficulty badge, step count
  - Inline note display (amber highlight) and editable note editor
  - Bookmark toggle and "View example" link per card
  - Empty state with icon, message, and "Browse Examples" CTA button
- Added 6 new translation keys to both `en.json` and `no.json` (bookmark, bookmarked, addBookmark, removeBookmark, viewExample, browseExamples)
- All localStorage access is in "use client" components only
- TypeScript compiles with zero errors (`npx tsc --noEmit` passes)
- ESLint passes with zero errors on all new files
- Full production build passes (`npm run build`)

### Files created
- `src/hooks/use-local-storage.ts` — Generic namespaced localStorage hook (useSyncExternalStore)
- `src/hooks/use-bookmarks.ts` — Bookmark management hook (pes:bookmarks)
- `src/hooks/use-notes.ts` — Note management hook (pes:notes)
- `src/components/bookmark-button.tsx` — "use client" bookmark toggle button
- `src/components/note-editor.tsx` — "use client" auto-saving note textarea
- `src/app/collection/page.tsx` — "use client" collection page with bookmarks and notes

### Files modified
- `src/app/examples/[category]/[slug]/page.tsx` — Added BookmarkButton and NoteEditor to example detail view
- `messages/en.json` — Added collection personalization keys (already had base keys from Phase 5)
- `messages/no.json` — Added collection personalization keys (already had base keys from Phase 5)
- `progress.md` — Updated with Phase 6 status

### Architecture notes
- `useLocalStorage` uses `useSyncExternalStore` (React 18+) to avoid the setState-in-effect antipattern
- Cross-tab sync works via the native `storage` event; same-tab updates dispatch a synthetic `StorageEvent`
- Server renders return `initialValue` (empty array / empty object) — no hydration mismatch
- The collection page is a fully client-rendered page since all its data comes from localStorage
- Notes auto-save with 500ms debounce on typing and immediate save on blur
- Empty notes are cleaned up (key removed from storage) to prevent stale data accumulation

### Success criteria met
1. User can click a bookmark icon on any example and see it toggled as bookmarked
2. User can type a personal note on any example and it persists across page reloads
3. User can navigate to a "My Collection" page and see all bookmarked examples with their notes
4. All user state (bookmarks, notes) is stored in localStorage with namespaced keys (pes:bookmarks, pes:notes) and survives browser refresh

### Next steps
- Phase 7 or continuing with remaining phases

---

## Phase 8: Practice Sandbox UI & Streaming
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Created the `/sandbox` page as a Server Component wrapper rendering the client `Sandbox` component
- Created the `Sandbox` "use client" component with full streaming AI integration:
  - Textarea for writing prompts with placeholder text from translations
  - "Send Prompt" button that POSTs to `/api/ai/chat` and streams the response
  - "Get Feedback" button that POSTs to `/api/ai/feedback` and streams structured feedback
  - Manual `fetch` with `ReadableStream` reader for progressive text display
  - 30-second `AbortController` timeout that aborts hung requests
  - Request counter showing remaining requests (read from `X-RateLimit-Remaining` header)
  - Loading states with `Loader2` spinning icon during streaming
  - Streaming indicator in the output header ("AI is responding...")
  - Error handling for 401 (unauthorized), 429 (rate limit with retry-after), 500 (server error), timeout, and missing API key
  - Clear/reset button to start a new prompt (cancels in-flight requests)
- Uses Lucide icons: `Send`, `MessageSquare`, `AlertCircle`, `Loader2`, `RotateCcw`, `Sparkles`
- Styled consistently with existing design: zinc colors, rounded-lg borders, clean spacing
- Added 4 new translation keys to both `en.json` and `no.json`: `clear`, `streaming`, `timeoutError`, `noApiKey`, `retryAfter`
- Message key parity validation passes (96 keys each language)
- Full production build passes with zero errors

### Files created
- `src/app/sandbox/page.tsx` — Server Component page wrapper
- `src/components/sandbox.tsx` — "use client" sandbox with streaming AI integration

### Files modified
- `messages/en.json` — Added sandbox streaming/error translation keys
- `messages/no.json` — Added sandbox streaming/error translation keys
- `progress.md` — Updated with Phase 8 status

### Architecture notes
- The sandbox page is a Server Component that renders the client `Sandbox` component (proper Next.js pattern)
- Streaming uses manual `fetch` + `ReadableStream` reader rather than the Vercel AI SDK `useChat` hook, because the API routes use `toTextStreamResponse()` (plain text streaming) rather than the AI SDK's protocol format
- Each request creates a fresh `AbortController` with a 30-second timeout; previous in-flight requests are cancelled when a new one starts
- Rate limit remaining count is extracted from the `X-RateLimit-Remaining` response header and displayed persistently
- Error states are reset on each new request; the clear button resets all state including cancelling streams
- The output area conditionally shows "AI Response" or "Prompt Feedback" header based on which button was pressed

### Success criteria met
1. User can type a prompt in the sandbox editor and submit it to receive a streamed AI response displayed progressively
2. User can request AI feedback that evaluates their prompt quality with specific improvement suggestions
3. Streaming errors display a user-friendly message via error handling; a 30-second timeout aborts hung requests
4. A visible request counter shows the user how many AI requests they have remaining in the current period

### Next steps
- Phase 9: Enhanced feedback with structured JSON output

---

## Phase 10: Internationalization — Full Content & UI
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Audited `messages/en.json` and `messages/no.json` — confirmed full key parity (96 keys each, all matching)
- Created build-time message key parity validation script (`src/i18n/validate-messages.ts`) that:
  - Recursively compares all keys in both message files
  - Reports missing keys in either direction
  - Exits with error code 1 if any mismatch is found
  - Integrated into the build pipeline (runs before content validation and next build)
- Chose Option A: added optional `_no` suffix fields to content types (inline Norwegian alongside English)
- Added Norwegian fields to TypeScript interfaces: `PromptStep` (8 fields), `Example` (2 fields), `Category` (2 fields)
- Added corresponding optional Zod schema fields for validation
- Added natively-authored Norwegian content to all 6 curated examples (24 steps total):
  - `title_no`, `description_no` on each example
  - `prompt_no`, `changes_no`, `pros_no`, `cons_no`, `feedback_no`, `why_no`, `tips_no`, `aiOutput_no` on each step
- Added `name_no` and `description_no` to all 3 categories
- Created centralized locale-aware content accessor utility (`src/content/localized.ts`) with 12 helper functions
- Updated all UI components to use localized content via `useLocale()`:
  - `prompt-step-view.tsx` — all content fields use localized helpers
  - `example-card.tsx` — title and description localized
  - `category-card.tsx` — name and description localized
  - `output-preview.tsx` — added `break-words` for longer Norwegian strings
  - `example-search.tsx` — extended interfaces with `_no` fields, locale-aware rendering
- Updated all pages to pass and render localized data:
  - `examples/[category]/[slug]/page.tsx` — passes full category object, uses localized breadcrumbs/header
  - `examples/[category]/page.tsx` — localized category name and description
  - `examples/page.tsx` — passes `_no` fields to search component
  - `collection/page.tsx` — localized bookmarked example titles and descriptions
- TypeScript compiles with zero errors
- Full production build passes (message validation + content validation + next build)

### Files created
- `src/i18n/validate-messages.ts` — Build-time EN/NO message key parity validator
- `src/content/localized.ts` — Locale-aware content accessor utility (12 helpers)

### Files modified
- `package.json` — Added `validate-messages` script, updated `build` to include it
- `src/content/types.ts` — Added optional `_no` fields to PromptStep (8), Example (2), Category (2)
- `src/content/schemas.ts` — Added optional Zod schemas for all Norwegian fields
- `src/content/categories.ts` — Added `name_no` and `description_no` to all 3 categories
- `src/content/examples/content-marketing/product-launch-social-post.ts` — Norwegian content (4 steps)
- `src/content/examples/content-marketing/newsletter-welcome-sequence.ts` — Norwegian content (4 steps)
- `src/content/examples/business-docs/executive-summary.ts` — Norwegian content (4 steps)
- `src/content/examples/business-docs/client-proposal.ts` — Norwegian content (4 steps)
- `src/content/examples/internal-comms/project-status-update.ts` — Norwegian content (4 steps)
- `src/content/examples/internal-comms/meeting-summary.ts` — Norwegian content (4 steps)
- `src/components/prompt-step-view.tsx` — Uses localized helpers for all content fields
- `src/components/example-card.tsx` — Uses localized title/description
- `src/components/category-card.tsx` — Uses localized name/description
- `src/components/output-preview.tsx` — Added break-words class
- `src/components/example-search.tsx` — Extended interfaces with `_no` fields, locale-aware rendering
- `src/app/examples/[category]/[slug]/page.tsx` — Passes category object, uses localized content
- `src/app/examples/[category]/page.tsx` — Uses localized category name/description
- `src/app/examples/page.tsx` — Passes `_no` fields to search component
- `src/app/collection/page.tsx` — Uses localized title/description

### Architecture notes
- Option A pattern (inline `_no` fields) keeps English and Norwegian content co-located in each file, avoiding file duplication
- The `localized.ts` utility centralizes all locale-resolution logic — components call helpers instead of doing inline ternaries
- All helpers follow the same pattern: `locale === "no" && field_no ? field_no : field` with fallback to English
- The message key parity validator runs recursively so it catches nested key mismatches, not just top-level
- Build pipeline order: validate messages -> validate content -> next build

### Success criteria met
1. `en.json` and `no.json` have identical key sets (96 keys each), validated at build time
2. All 6 examples and 3 categories have complete Norwegian translations
3. All UI components render Norwegian content when the locale cookie is set to "no"
4. Build passes with all validations (message parity, content schemas, TypeScript, Next.js)

### Next steps
- Phase 9: Enhanced feedback with structured JSON output
- Phase 11+ as defined in roadmap

---

## Phase 9: AI Feedback & Scoring Rubric
**Status:** COMPLETE
**Date:** 2026-02-14

### What was done
- Created a shared rubric definition module (`src/lib/ai/rubric.ts`) defining 5 scoring dimensions:
  1. **Clarity** — Is the intent clear and unambiguous?
  2. **Specificity** — Does it include enough detail (audience, tone, format, length)?
  3. **Context** — Does it provide necessary background information?
  4. **Structure** — Is it well-organized and easy to follow?
  5. **Constraints** — Does it set appropriate boundaries and output requirements?
- Each dimension has: name, description, and a 1-5 scoring guide with clear explanations per level
- The rubric module exports both the dimension definitions (for UI) and a system prompt builder function (for the API)
- Updated the feedback API route (`/api/ai/feedback`) to use `generateObject()` from the Vercel AI SDK:
  - Uses a Zod schema to enforce structured JSON output with scores, explanations, summary, and improved prompt
  - Returns complete JSON (not streaming) since structured output must be complete
  - The system prompt is generated from the rubric definition, ensuring UI and API are always in sync
- Created `RubricDisplay` component (`src/components/rubric-display.tsx`):
  - Overall score prominently displayed with color-coded styling (green/amber/red based on score)
  - Score label (Excellent/Good/Adequate/Needs Work/Poor) alongside the overall score
  - Summary assessment in a highlighted panel
  - Individual dimension scores with animated progress bars and color coding
  - Per-dimension explanations from the AI
  - Collapsible "View Improved Prompt" section with copy-to-clipboard functionality
- Created `RubricInfo` component (`src/components/rubric-info.tsx`):
  - Collapsible panel shown BEFORE submission so users know what to aim for
  - "What makes a good prompt?" educational framing with lightbulb icon
  - Lists all 5 dimensions with their descriptions
  - Intro and footer text providing guidance on target scores
- Updated the `Sandbox` component to integrate both rubric components:
  - `RubricInfo` panel displayed above the prompt textarea
  - Separate request handlers for chat (streaming) and feedback (JSON)
  - Feedback uses 60-second timeout (longer than chat's 30s since structured output takes more time)
  - "Analyzing your prompt..." loading state during feedback requests
  - When feedback is received, renders `RubricDisplay` instead of raw text
  - Clear button resets rubric feedback state
- Added 16 new translation keys across both `en.json` and `no.json`:
  - `sandbox.analyzingPrompt` for the feedback loading state
  - `rubric.*` section with 15 keys for rubric UI strings
- Message key parity validated: 113 keys each language
- TypeScript compiles with zero errors
- Full production build passes (message validation + content validation + Next.js build)

### Files created
- `src/lib/ai/rubric.ts` — Rubric dimension definitions, TypeScript types, system prompt builder
- `src/components/rubric-display.tsx` — "use client" visual scoring results component
- `src/components/rubric-info.tsx` — "use client" pre-submission rubric info panel

### Files modified
- `src/app/api/ai/feedback/route.ts` — Replaced `streamText` with `generateObject` using Zod schema
- `src/components/sandbox.tsx` — Integrated RubricInfo, RubricDisplay; split chat/feedback request handlers
- `messages/en.json` — Added `sandbox.analyzingPrompt` and `rubric.*` section (16 new keys)
- `messages/no.json` — Added `sandbox.analyzingPrompt` and `rubric.*` section (16 new keys)
- `progress.md` — Updated with Phase 9 status

### Architecture notes
- The rubric definition is a single source of truth: `RUBRIC_DIMENSIONS` array is used both in the UI (`RubricInfo` component) and in the API (system prompt via `buildRubricSystemPromptSection()`)
- The feedback API now uses `generateObject()` instead of `streamText()`, returning validated JSON that conforms to a Zod schema
- Chat endpoint remains unchanged (still uses `streamText` for progressive display)
- The sandbox now handles two different response formats: streaming text for chat, JSON for feedback
- Feedback timeout is 60s (vs 30s for chat) because structured output via `generateObject` takes longer
- Score visualization uses color-coded progress bars and dynamic Tailwind classes based on score thresholds
- The improved prompt section is collapsible to avoid overwhelming users and includes copy-to-clipboard

### Success criteria met
1. AI feedback evaluates prompts against a defined rubric (Clarity, Specificity, Context, Structure, Constraints) and returns a score per dimension (1-5)
2. Each rubric dimension displays its score alongside an explanation (e.g., "Specificity: 3/5 — Your prompt did not specify the audience")
3. The scoring rubric criteria are visible to the user before they submit, so they know what to aim for (via the collapsible RubricInfo panel)

### Next steps
- Phase 11+ as defined in roadmap
