# Research Summary

**Project:** Prompt Engineering Studio
**Synthesized:** 2026-02-14
**Input Documents:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

This is the primary input for roadmap creation. It consolidates all research findings into actionable decisions, priorities, risks, and build order.

---

## 1. Stack Summary

### Core Framework

| Technology | Version | Pin Strategy | Purpose |
|------------|---------|-------------|---------|
| Next.js | 16.1.6 | `^16.1.0` | Full-stack framework. App Router, Turbopack default. `proxy.ts` replaces `middleware.ts`. |
| React | 19.2.4 | `^19.2.0` | UI library. Server Components, Suspense, Activity API stable. |
| TypeScript | 5.9.3 | `~5.9.0` | Type safety. Do NOT use 6.0 beta. |
| Tailwind CSS | 4.1.18 | `^4.1.0` | CSS-first config (no JS config file). Lightning CSS engine. |
| Node.js | 24.x LTS | `>=20.9.0` in engines | Active LTS through April 2028. |
| pnpm | 10.29.3 | `^10.0.0` via corepack | Package manager. Vercel-native. |

### AI Integration

| Technology | Version | Purpose |
|------------|---------|---------|
| AI SDK (`ai`) | 6.0.86 | Provider-agnostic abstraction. Streaming, structured output, tool calls. |
| `@ai-sdk/openai` | 3.0.28 | OpenAI provider (drop-in). |
| `@ai-sdk/anthropic` | 3.0.43 | Anthropic provider (drop-in). |

**Strategy:** Install `ai` as core. Add provider packages as needed. Provider switching is a one-line model parameter change, centralized in a single registry file (`src/lib/ai/registry.ts`).

### Key Supporting Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| next-intl | 4.8.2 | i18n for App Router + Server Components. Cookie-based locale (no URL prefixes). |
| Zod | 4.3.6 | Schema validation. 14x faster in v4. Used for forms, content validation, AI structured output. |
| shadcn/ui (CLI 3.8.x) | Copy-paste components | Accessible UI primitives. Tailwind v4 + React 19 compatible. Own the code. |
| Lucide React | 0.563.0 | Icons. Default for shadcn/ui. Tree-shakable. |
| Vitest | 4.0.18 | Unit + integration tests. 10-20x faster than Jest. |
| Playwright | 1.58.2 | E2E tests. Critical journeys only. |

### Explicit Non-Choices

Do NOT use: NextAuth.js (overkill for shared password), Prisma (no database), LangChain.js (too heavy), Redux/Zustand (RSC + URL state sufficient), next-i18next (Pages Router only, breaks with App Router), Storybook (unnecessary overhead), MongoDB/Firebase (wrong fit for structured content), TypeScript 6.0 beta (unstable).

### Data Strategy

- **Content storage:** JSON/TypeScript files in `/src/content/`. Version-controlled, zero infrastructure, typed at build time. No CMS, no database.
- **User state:** Browser localStorage with namespaced keys. Sufficient for 2-5 users on personal devices.
- **Authentication:** Shared password via `SITE_PASSWORD` env var. Session cookie with `proxy.ts` (Next.js 16's renamed middleware). No external auth service.
- **Scaling escape hatches:** If persistence needed later, add Vercel KV or Turso (SQLite). If users exceed ~10, add individual accounts. All migration paths are documented.

### Next.js 16 Breaking Changes (Must Know)

1. `middleware.ts` renamed to `proxy.ts`. Export `proxy()` not `middleware()`. Node.js runtime only.
2. Turbopack is default for both `dev` and `build`. No `--turbo` flag.
3. `next lint` removed. Use ESLint CLI directly.
4. Node.js 20.9+ required.
5. TypeScript 5.1+ required.

---

## 2. Feature Priorities

### Table Stakes (Must Have)

Ranked by dependency order and impact.

| Priority | ID | Feature | Complexity | Phase |
|----------|----|---------|------------|-------|
| 1 | TS-1 | Curated prompt examples with before/after comparison | Medium | 1 |
| 2 | TS-2 | Step-by-step refinement analysis (WHY a prompt improved) | Medium | 1 |
| 3 | TS-5 | Structured learning path with progressive difficulty | Low | 1 |
| 4 | TS-6 | Real work scenario categories (emails, reports, meeting notes) | Low | 1 |
| 5 | TS-9 | Search and filtering for content discovery | Low | 1 |
| 6 | TS-8 | Mobile-responsive design | Medium | 1-2 |
| 7 | TS-3 | Practice sandbox with live AI interaction | High | 2 |
| 8 | TS-4 | AI-powered feedback on user prompts (scoring rubric) | High | 2 |
| 9 | TS-7 | Progress tracking | Medium | 2 |

### Differentiators (Competitive Advantage)

| Priority | ID | Feature | Complexity | Phase |
|----------|----|---------|------------|-------|
| 1 | DF-2 | Refinement-focused pedagogy (process, not technique names) | Low | 1 (content decision) |
| 2 | DF-3 | Bookmarks and personal notes on examples | Low | 1-2 |
| 3 | DF-6 | Contextual scoring rubric visible to user | Medium | 2 |
| 4 | DF-4 | Personal saved prompts library | Medium | 2 |
| 5 | DF-7 | Work-scenario prompt templates | Low | 3 |
| 6 | DF-1 | Bilingual content (EN + NO) | High | 3 |
| 7 | DF-5 | Team-aware features (shared library, team progress) | Medium | 3 |

**Key differentiator insight:** No existing prompt learning platform serves Norwegian speakers. This is a verified gap across all major platforms. However, Norwegian content must be natively authored, not machine-translated, to have real quality.

### Anti-Features (Do NOT Build)

Multi-model comparison (AF-1), auto-optimize engine (AF-2), certifications/gamification (AF-3), community features (AF-4), video content (AF-5), prompt version control/API (AF-6), advanced technique taxonomy (AF-7), multi-provider sandbox (AF-8), multimodal prompting (AF-9), admin dashboard (AF-10).

### Critical Path

Two independent foundation pillars: **TS-1 (content)** and **TS-3 (sandbox)**. Everything else depends on one or both. Content is the bigger bottleneck because it requires editorial work, not just engineering.

---

## 3. Architecture Overview

### System Design

Server-first Next.js App Router application with five layers:

1. **Routing + Auth Gate** -- `proxy.ts` handles locale detection and session cookie verification. Unauthenticated users redirect to `/login`.
2. **UI Layer** -- Server Components for content (zero JS shipped), Client Components only for interactivity (sandbox editor, bookmarks, language switcher).
3. **Content Layer** -- Typed TypeScript/JSON files in `/src/content/`. Imported directly by Server Components. No API calls, no database.
4. **AI Service** -- API routes proxy all AI requests. Client never touches API keys. AI SDK provider registry centralizes model config in one file.
5. **Persistence** -- localStorage for user state (progress, bookmarks, notes, saved prompts). Cookie for auth session.

### Key Data Flows

| Flow | Path | Notes |
|------|------|-------|
| Content reading | TS files -> Server Components -> Props to Client Components | Static import, no API call. Changes require redeploy. |
| AI feedback | Client -> `POST /api/ai/feedback` -> AI SDK -> External provider -> Streaming response -> Client | API route hides keys. Rate limiting here. |
| User state | React state -> `useLocalStorage` hook -> `localStorage` | Namespaced keys (`pes:bookmarks`, etc.). Hydrated on page load. |
| Authentication | Visit page -> `proxy.ts` checks cookie -> Redirect to login or allow through | One shared password. `HttpOnly` cookie. No user accounts. |
| i18n | Request -> proxy detects locale -> `/[locale]/layout.tsx` loads messages -> `NextIntlClientProvider` wraps app | `messages/en.json` + `messages/no.json`. Namespaced by feature. |

### Directory Structure (Key Paths)

```
src/
  app/[locale]/           # All pages under locale segment
    layout.tsx            # Root layout with i18n provider
    page.tsx              # Home
    login/page.tsx        # Password login
    examples/             # Browse categories -> individual examples
    sandbox/page.tsx      # AI practice sandbox
    progress/page.tsx     # Learning progress dashboard
    saved/page.tsx        # Saved prompts + bookmarks
  app/api/
    ai/feedback/route.ts  # AI streaming endpoint
    auth/login/route.ts   # Password validation
  components/
    ui/                   # shadcn/ui primitives
    examples/             # ExampleCard, StepByStepView, CategoryGrid
    sandbox/              # PromptEditor, FeedbackStream
    progress/             # ProgressDashboard, LessonCheckmark
    layout/               # Header, Navigation, LanguageSwitcher, Footer
  content/
    types.ts              # PromptStep, Example, Category interfaces
    examples/             # Typed content files per category
    categories.ts         # Category definitions
  lib/
    ai/registry.ts        # AI SDK provider registry
    ai/prompts.ts         # System prompts for feedback
    auth/                 # Password validation, session helpers
    hooks/                # useLocalStorage, useProgress, useBookmarks, useNotes, useSavedPrompts
    i18n/                 # next-intl routing + request config
messages/
  en.json                 # English translations
  no.json                 # Norwegian translations
```

### Scalability Escape Hatches

| Concern | Current (2-5 users) | Migration trigger | Migration target |
|---------|---------------------|-------------------|------------------|
| Data persistence | localStorage | Cross-device sync needed | Vercel KV or Turso SQLite |
| Authentication | Shared password | >10 users or team churn | Individual accounts |
| AI costs | Low, minimal limits | >$20/month spend | Per-user quotas, usage tracking |
| Content management | TS files in repo | Non-developer authors | Lightweight CMS |
| Hosting | Vercel Hobby | Traffic growth | Vercel Pro |

---

## 4. Critical Risks

Ranked by severity and likelihood.

### Severity: Critical (causes rewrites, security incidents, or runaway costs)

| # | Pitfall | Impact | Prevention | Phase |
|---|---------|--------|------------|-------|
| P1 | **Middleware-only auth bypass** -- CVE-2025-29927 showed `proxy.ts` can be bypassed. If auth exists only there, entire app is exposed. | Unauthenticated access to everything, including AI sandbox (burns API budget). | Implement Data Access Layer (DAL) pattern: shared `verifyAuth()` called at every data access point. Middleware is first filter, not sole guard. API routes independently verify session cookie. Write integration tests that hit endpoints without auth. | Foundation |
| P2 | **AI API key leaked to client** -- Key ends up in browser bundle via `NEXT_PUBLIC_` prefix or Client Component import. | Unlimited third-party API usage billed to your account. Hundreds/thousands in hours. | All AI calls through API routes only. Use `server-only` package. Never prefix secrets with `NEXT_PUBLIC_`. CI check for leaked secrets. Set billing caps on provider dashboard day one. | Foundation |
| P3 | **Sandbox AI cost spiral** -- No rate limits on sandbox. Even 2-5 users can generate hundreds of calls/hour. System prompts multiply token usage. | Unexpected bills, potential service suspension. | Server-side rate limiting (20-30 req/user/hour). Hard spending caps on provider dashboard ($20/month). Cache identical prompts. Use cheaper models for feedback (GPT-4o-mini, Claude Haiku). Show request counter in UI. | Sandbox |
| P4 | **Wrong i18n library** -- Picking `next-i18next` (Pages Router) instead of `next-intl` (App Router). | Translations break in Server Components. Hydration mismatches. Full rewrite of every translated component. | Use `next-intl` from day one. This is a non-reversible Phase 1 decision. | Foundation |

### Severity: Moderate (significant rework or degraded UX)

| # | Pitfall | Prevention | Phase |
|---|---------|------------|-------|
| P5 | Hardcoded content without typed schema | Define TypeScript interfaces for all content before writing examples. Zod validation for i18n key parity. | Content Architecture |
| P6 | AI abstraction too thin or too thick | Use Vercel AI SDK (correct middle ground). Single registry file. Minimal interface. | AI Integration |
| P7 | i18n retrofitted instead of foundational | Set up both `en.json` and `no.json` before first component. CI check for key parity. No hardcoded strings ever. | Foundation |
| P8 | Prompt examples go stale as models evolve | Focus on universal principles, not model tricks. Add `lastReviewed` date to content schema. Quarterly review cadence. | Content + Ongoing |

### Severity: Minor (friction, recoverable)

| # | Pitfall | Prevention | Phase |
|---|---------|------------|-------|
| P9 | Session cookie without expiry/rotation | 7-day expiry. `httpOnly`, `secure`, `sameSite=strict`. Server-side version counter for revocation. | Auth |
| P10 | Progress in localStorage only (lost on clear) | Document limitation. Plan server-side sync as future phase. Use localStorage as cache, not source of truth. | Progress |
| P11 | Streaming responses without error boundaries | React Error Boundaries. `onError` callback. 30-second timeout with abort. Loading/error state indicators. | Sandbox UI |
| P12 | Poor Norwegian translation quality | Native speaker review. Author Norwegian natively, not as translations. Test layouts in Norwegian (strings are longer). | i18n/Content |

---

## 5. Conflicts and Tensions

### Tension 1: i18n Routing Strategy

- **STACK.md** recommends **without i18n routing** (cookie-based, no `/en/` `/no/` URL prefixes) for simplicity.
- **ARCHITECTURE.md** describes a `[locale]` dynamic segment with URL-based routing (`/en/...`, `/no/...`) and middleware locale detection/redirect.

**Resolution:** These are partially compatible. `next-intl` supports both modes. The ARCHITECTURE.md directory structure uses `[locale]` segments, which implies URL-based routing. The STACK.md recommendation for cookie-based routing is simpler but loses shareable locale-specific URLs. **Recommend deciding this explicitly during Phase 1.** For a 2-5 person internal tool, cookie-based (no URL prefixes) is simpler. But if the architecture uses `[locale]` segments anyway, the URL-based approach is already structured in. Either works; pick one and commit.

### Tension 2: localStorage vs. Server-Side Persistence

- **ARCHITECTURE.md** uses localStorage as the primary persistence layer for all user state.
- **PITFALLS.md** (P10) warns that localStorage-only storage means progress is lost on browser clear and inaccessible cross-device.
- **STACK.md** says "No database needed for MVP" but mentions Vercel KV or Turso as future options.

**Resolution:** localStorage is acceptable for Phase 1 MVP with 2-5 users on personal devices. **Document this as a known limitation.** Plan server-side sync (Vercel KV or Turso) as a Phase 3+ enhancement if cross-device access becomes a real need. Do not pre-build database infrastructure.

### Tension 3: Middleware Naming

- **ARCHITECTURE.md** references `middleware.ts` and "Middleware" in the component table and data flow diagrams.
- **STACK.md** explicitly notes that Next.js 16 renamed middleware to `proxy.ts` with a `proxy()` export.

**Resolution:** Use `proxy.ts` with `proxy()` export per Next.js 16 conventions. The ARCHITECTURE.md diagrams use the old name but the intended behavior is the same. The code must use the new convention.

### Tension 4: Feature Phasing -- i18n Timing

- **FEATURES.md** places bilingual content (DF-1) in **Phase 3** because it is high complexity and "better to nail English first."
- **PITFALLS.md** (P7) strongly warns against retrofitting i18n and insists both languages be set up in **Phase 1**.
- **ARCHITECTURE.md** includes i18n in the Foundation phase.

**Resolution:** These are not contradictory if read carefully. **i18n infrastructure** (next-intl setup, both JSON files, `t()` wrappers in all components) must be Phase 1. **Norwegian content authoring** (quality Norwegian prompt examples, full translation coverage) can be Phase 3. The key rule: never write a hardcoded English string. Always use `t()`. Norwegian values can be `[TODO: translate]` placeholders until Phase 3.

### Tension 5: Auth in Architecture vs. Pitfalls

- **ARCHITECTURE.md** describes auth as a simple middleware cookie check with a login page.
- **PITFALLS.md** (P1) warns this exact pattern is insufficient and demands multi-layer verification (DAL pattern).

**Resolution:** Follow the PITFALLS.md guidance. Middleware/proxy is the first gate, but every API route and data access point must independently verify the session. This is a small code overhead (one `verifyAuth()` call per route) with significant security benefit.

---

## 6. Recommended Build Order

Synthesized from ARCHITECTURE.md build order, FEATURES.md MVP phasing, and PITFALLS.md phase warnings.

### Phase 1: Foundation + Content (Weeks 1-3)

**Goal:** A navigable, content-rich learning platform with no AI features.

| Step | What to Build | Key Decisions | Pitfalls to Avoid |
|------|---------------|---------------|--------------------|
| 1.1 | Project scaffold: Next.js 16, Tailwind v4, TypeScript, pnpm, ESLint, Prettier | Use `pnpm create next-app@latest` with `--app --src-dir --typescript --tailwind` | P4: Ensure next-intl, NOT next-i18next |
| 1.2 | i18n setup: `next-intl` with both `en.json` and `no.json`, locale switching | Decide: cookie-based (no URL prefixes) or `[locale]` URL routing. Pick one. | P7: Both locale files from day one. `t()` for all strings. |
| 1.3 | Auth gate: `proxy.ts` + login page + session cookie + `verifyAuth()` DAL | Shared password via `SITE_PASSWORD` env var. 7-day cookie expiry. | P1: DAL pattern, not middleware-only. P9: Cookie expiry + httpOnly. |
| 1.4 | Content type system: TypeScript interfaces for `Example`, `PromptStep`, `Category` | Include `lastReviewed` date field. Include i18n keys, not raw strings. | P5: Schema before content. P8: Review date metadata. |
| 1.5 | Content authoring: 5-10 curated prompt refinement examples across 3-4 categories | Focus on universal principles. Refinement pedagogy (DF-2). English first, Norwegian placeholders. | P8: Universal principles, not model tricks. P12: Plan for native Norwegian later. |
| 1.6 | Content browsing UI: Category grid, example list, step-by-step refinement view | Server Components for all content rendering. Mobile-responsive from start. | Anti-pattern: Client Components by default. |
| 1.7 | Search + filtering: Basic text search and category/difficulty filters | Client-side filtering is fine for <100 examples. | Keep it simple. No search engine needed. |
| 1.8 | Bookmarks + notes: Client-side with localStorage hooks | Namespace all keys (`pes:bookmarks`). Document localStorage limitation. | P10: Acknowledge data loss risk. |
| 1.9 | Progress tracking (basic): Mark examples as studied, track completion | localStorage-based. Simple checkmark per example. | P10: Same localStorage caveat. |

**Deliverable:** A deployed (Vercel), password-protected learning platform where users can browse curated prompt examples, study refinement steps, bookmark favorites, and track which examples they have completed. English UI with Norwegian infrastructure in place.

### Phase 2: AI Sandbox + Feedback (Weeks 4-6)

**Goal:** Interactive practice with AI-powered feedback.

| Step | What to Build | Key Decisions | Pitfalls to Avoid |
|------|---------------|---------------|--------------------|
| 2.1 | AI provider registry: `src/lib/ai/registry.ts` with AI SDK | Pick initial model (GPT-4o-mini or Claude Haiku for cost efficiency). | P6: Use AI SDK, not LangChain. Single registry file. |
| 2.2 | Feedback API route: `POST /api/ai/feedback` with streaming | `server-only` import. `verifyAuth()` check. `maxDuration = 30`. | P2: No API keys in client. P1: Auth check in route. |
| 2.3 | Rate limiting: Per-session request counter | 20-30 requests/user/hour. Show counter in UI. | P3: Ship rate limits WITH sandbox, not after first bill. |
| 2.4 | Sandbox UI: Prompt editor + streaming feedback display | React Error Boundaries. Loading/error states. Timeout handling. | P11: Error boundaries for streaming. |
| 2.5 | Scoring rubric: Visible evaluation criteria | Display rubric alongside scores (DF-6). Rubric becomes teaching tool. | Make criteria transparent, not opaque. |
| 2.6 | Saved prompts: Save sandbox prompts to personal library (DF-4) | localStorage-based. Tagging + search. | Keep scope small. No version control. |
| 2.7 | Provider spending caps | Set hard cap ($20/month) on AI provider dashboard. Billing alerts. | P3: Do this before any team member uses sandbox. |

**Deliverable:** Users can practice writing prompts, receive real-time AI feedback with a visible scoring rubric, and save their best prompts. Costs are controlled.

### Phase 3: Bilingual + Team + Polish (Weeks 7-10)

**Goal:** Full Norwegian support, team features, production polish.

| Step | What to Build | Notes |
|------|---------------|-------|
| 3.1 | Norwegian content authoring | Native Norwegian speaker authors prompt examples. NOT machine-translated. |
| 3.2 | Norwegian UI translations | Complete `no.json`. Verify key parity with CI check. Test layouts for longer strings. |
| 3.3 | Work-scenario templates (DF-7) | Starter templates for common tasks. Annotated with explanations. |
| 3.4 | Team features (DF-5) | Shared prompt library visible to all. Team progress overview. |
| 3.5 | Responsive design polish | Test all pages at mobile, tablet, desktop breakpoints. |
| 3.6 | Error handling + edge cases | Loading skeletons, offline fallbacks, graceful degradation. |
| 3.7 | Testing | Vitest unit tests for hooks + content utils. Playwright for critical journeys (login -> browse -> sandbox). |
| 3.8 | Production hardening | Environment variables, Vercel deployment config, performance audit. |

**Deliverable:** A fully bilingual (EN+NO), team-ready, polished learning platform ready for daily use.

---

## 7. Open Questions

These need answers before or during implementation. The research documents do not resolve them.

| # | Question | Context | When to Decide |
|---|----------|---------|----------------|
| Q1 | **Cookie-based or URL-based i18n routing?** | STACK.md says cookie-based (simpler). ARCHITECTURE.md uses `[locale]` URL segments. Both work with `next-intl`. | Phase 1, Step 1.2 |
| Q2 | **Which AI model for sandbox feedback?** | GPT-4o-mini and Claude Haiku are cheapest. GPT-4o or Claude Sonnet are smarter. Cost vs. quality tradeoff for feedback use case. | Phase 2, Step 2.1 |
| Q3 | **What specific scoring rubric criteria?** | FEATURES.md references Mindstone's 5 criteria (specificity, clarity, relevancy, practicality, feasibility). Need to decide our own rubric dimensions. | Phase 2, Step 2.5 |
| Q4 | **Who authors Norwegian content?** | PITFALLS.md insists on native speaker. Is someone on the team a native Norwegian speaker, or is external help needed? | Phase 3, Step 3.1 |
| Q5 | **How many initial examples are enough?** | FEATURES.md suggests content is the core asset but does not specify a minimum count. 5-10 examples across 3-4 categories is a plausible MVP, but needs validation. | Phase 1, Step 1.5 |
| Q6 | **Should progress persist server-side from day one?** | PITFALLS.md warns against localStorage-only. ARCHITECTURE.md and STACK.md say localStorage is fine for MVP. Tension exists. | Phase 1, Step 1.8 |
| Q7 | **System prompt token budget for feedback?** | PITFALLS.md warns that evaluation system prompts can be large (>500 tokens), multiplying cost. Need to design the feedback prompt with a token budget in mind. | Phase 2, Step 2.2 |
| Q8 | **Quarterly content review process?** | PITFALLS.md recommends re-testing examples against current models quarterly. Who owns this? What is the process? | Post-launch |

---

## Appendix: Source Confidence Summary

| Document | Overall Confidence | Primary Sources |
|----------|--------------------|-----------------|
| STACK.md | HIGH | Context7 official docs, npm version data, Next.js 16 release posts |
| FEATURES.md | MEDIUM | Analysis of 10+ platforms. Table stakes HIGH, differentiators MEDIUM (gap analysis). |
| ARCHITECTURE.md | HIGH | Official Next.js + AI SDK + next-intl docs. Standard App Router patterns. |
| PITFALLS.md | HIGH (critical), MEDIUM (moderate/minor) | CVE documentation, official security guides, community incident reports. |
