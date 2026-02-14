# Roadmap

## Overview

| Phase | Name | Goal | Req Count | Depends On | Parallelizable With |
|-------|------|------|-----------|------------|---------------------|
| 1 | Project Scaffold & i18n Foundation | Bootable Next.js 16 app with i18n wired end-to-end | 2 | none | none |
| 2 | Authentication & Security | Shared password gate with multi-layer verification | 3 | 1 | none |
| 3 | Content Type System & Data Architecture | Typed content schema, category definitions, and example data files | 3 | 1 | 2 |
| 4 | Content Browsing UI | Users can browse categories, view step-by-step refinement, and navigate prompt versions | 4 | 2, 3 | none |
| 5 | Search, Discovery & Clipboard | Users can find examples by keyword/filter and copy prompts | 3 | 4 | 6 |
| 6 | Personalization — Bookmarks & Notes | Users can bookmark examples, add notes, and view their personal collection | 4 | 4 | 5 |
| 7 | AI Provider Integration & API Layer | Provider-agnostic AI backend with secure API routes and cost controls | 3 | 2 | 5, 6 |
| 8 | Practice Sandbox UI & Streaming | Users can write prompts and see real AI responses streamed back | 2 | 7 | none |
| 9 | AI Feedback & Scoring Rubric | Users receive structured AI evaluation with visible scoring criteria | 2 | 8 | none |
| 10 | Internationalization — Full Content & UI | Complete English + Norwegian UI text and natively-authored Norwegian examples | 2 | 4 | 8, 9 |
| 11 | Responsive Design & Polish | Production-quality responsive layout across all breakpoints | 1 | 4, 8 | 10 |
| 12 | Deployment & Production Hardening | Live on Vercel with production configuration | 1 | all prior | none |

**Total v1 requirements covered: 30/30**

---

## Phase Details

### Phase 1: Project Scaffold & i18n Foundation

**Goal:** Create a bootable Next.js 16 application with Tailwind v4, TypeScript, and next-intl wired end-to-end with both English and Norwegian locale files.

**Requirements:** I18N-02, I18N-04

**Success Criteria:**
1. Running `pnpm dev` launches the app with no errors and displays a "Hello world" page.
2. User can toggle between English and Norwegian using a language switcher, and the displayed greeting changes accordingly.
3. Both `messages/en.json` and `messages/no.json` exist with identical key structures.
4. Adding a new language requires only adding a new JSON file and updating the locale config — no code changes in components.

**Depends On:** none

**Parallelizable With:** none

**Pitfalls Addressed:** P4 (wrong i18n library — use next-intl from day one), P7 (i18n retrofitted — both locale files from first commit)

---

### Phase 2: Authentication & Security

**Goal:** Protect the app with a shared password gate using the DAL pattern so that no route or API endpoint is accessible without a valid session.

**Requirements:** AUTH-01, AUTH-02, AUTH-03

**Success Criteria:**
1. Unauthenticated users are redirected to the login page when visiting any protected route.
2. Entering the correct shared password creates a session cookie that persists for 7 days, allowing access without re-entering the password.
3. API routes independently verify the session cookie — directly hitting `/api/*` without a valid cookie returns 401.
4. No environment variable prefixed with `NEXT_PUBLIC_` contains secrets; the `server-only` package prevents accidental client imports of server modules.

**Depends On:** Phase 1

**Parallelizable With:** none (Phase 3 can run in parallel once Phase 1 is complete)

**Pitfalls Addressed:** P1 (middleware-only auth bypass — DAL pattern with `verifyAuth()` at every access point), P2 (API key leakage — `server-only` enforcement), P9 (cookie without expiry — 7-day expiry, httpOnly, secure, sameSite=strict)

---

### Phase 3: Content Type System & Data Architecture

**Goal:** Define the TypeScript interfaces, Zod validation schemas, and initial content data files so that all downstream UI phases have typed, validated example data to render.

**Requirements:** INFR-03, CONT-05, CONT-07

**Success Criteria:**
1. TypeScript interfaces for `Category`, `Example`, `PromptStep`, and related types exist and are importable from `src/content/types.ts`.
2. At least 6 curated prompt refinement examples exist across 3 categories (content/marketing, business docs, internal comms), each with 3-5 progressive refinement steps.
3. Every example is tagged with a difficulty level (beginner, intermediate, advanced) and organized into a logical learning path.
4. Content follows refinement-focused pedagogy — each step teaches iterative improvement process, not technique taxonomy names.
5. Build-time validation (Zod) catches missing fields or type mismatches in content files.

**Depends On:** Phase 1

**Parallelizable With:** Phase 2

**Pitfalls Addressed:** P5 (hardcoded content without typed schema — schema before content), P8 (examples go stale — `lastReviewed` field in schema, universal principles focus)

---

### Phase 4: Content Browsing UI

**Goal:** Users can browse curated prompt refinement examples by category, view the step-by-step evolution of each example, and see AI output previews — all rendered as Server Components.

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-06

**Success Criteria:**
1. User sees a category grid on the examples page and can click into any category to see its examples.
2. Each example displays a step-by-step refinement view showing the prompt evolution from basic to refined.
3. Each prompt version displays pros, cons, feedback, actionable tips, and a simulated AI output preview.
4. User can navigate between prompt versions using previous/next controls.
5. Content pages are rendered as Server Components — zero unnecessary JavaScript shipped for static content viewing.

**Depends On:** Phase 2, Phase 3

**Parallelizable With:** none

**Pitfalls Addressed:** None directly, but builds on P5 (typed schema) and P7 (i18n in all components via `t()` wrappers)

---

### Phase 5: Search, Discovery & Clipboard

**Goal:** Users can find specific examples through keyword search and category/difficulty filters, and copy any prompt to their clipboard with one click.

**Requirements:** SRCH-01, SRCH-02, SRCH-03

**Success Criteria:**
1. User can type a keyword into a search input and see matching examples filtered in real time.
2. User can filter examples by category and by difficulty level, and combine filters.
3. User can click a copy button on any prompt version and the prompt text is copied to their clipboard with visual confirmation.

**Depends On:** Phase 4

**Parallelizable With:** Phase 6

**Pitfalls Addressed:** None directly. Keep search client-side — no search engine needed for fewer than 100 examples.

---

### Phase 6: Personalization — Bookmarks & Notes

**Goal:** Users can bookmark favorite examples, add personal notes to any example, and view all their saved items in a personal collection page.

**Requirements:** PERS-01, PERS-02, PERS-03, INFR-04

**Success Criteria:**
1. User can click a bookmark icon on any example and see it toggled as bookmarked.
2. User can type a personal note on any example and it persists across page reloads.
3. User can navigate to a "My Collection" page and see all bookmarked examples with their notes.
4. All user state (bookmarks, notes, language preference) is stored in localStorage with namespaced keys (`pes:bookmarks`, `pes:notes`, etc.) and survives browser refresh.

**Depends On:** Phase 4

**Parallelizable With:** Phase 5

**Pitfalls Addressed:** P10 (localStorage data loss — document limitation clearly, use namespaced keys)

---

### Phase 7: AI Provider Integration & API Layer

**Goal:** Establish the server-side AI infrastructure — provider registry, secure API routes with authentication, rate limiting, and spending controls — so the sandbox can safely call an AI model.

**Requirements:** PRAC-05, PRAC-06, AUTH-03

**Success Criteria:**
1. A single registry file (`src/lib/ai/registry.ts`) centralizes the AI model configuration; switching providers requires changing only this file.
2. The `POST /api/ai/feedback` route streams AI responses and independently verifies the session cookie before processing.
3. Rate limiting enforces a maximum of 20-30 requests per user per hour, returning a clear error when exceeded.
4. AI provider dashboard has a hard spending cap ($20/month) and billing alerts configured.

**Depends On:** Phase 2

**Parallelizable With:** Phase 5, Phase 6

**Pitfalls Addressed:** P2 (API key leakage — all calls through server routes), P3 (sandbox cost spiral — rate limiting and spending caps shipped with sandbox), P6 (AI abstraction — use AI SDK with single registry file)

---

### Phase 8: Practice Sandbox UI & Streaming

**Goal:** Users can write prompts in a practice sandbox and see real AI responses streamed back in real time, with proper error handling and loading states.

**Requirements:** PRAC-01, PRAC-02

**Success Criteria:**
1. User can type a prompt in the sandbox editor and submit it to receive a streamed AI response displayed progressively.
2. User can request AI feedback that evaluates their prompt quality with specific improvement suggestions.
3. Streaming errors display a user-friendly message via React Error Boundaries; a 30-second timeout aborts hung requests.
4. A visible request counter shows the user how many AI requests they have remaining in the current period.

**Depends On:** Phase 7

**Parallelizable With:** none (Phase 10 can run in parallel once Phase 4 is complete)

**Pitfalls Addressed:** P11 (streaming without error boundaries — Error Boundaries, `onError` callback, 30-second timeout)

---

### Phase 9: AI Feedback & Scoring Rubric

**Goal:** AI feedback uses a structured scoring rubric that is visible to the user, teaching them what makes a prompt good through transparent evaluation criteria.

**Requirements:** PRAC-03, PRAC-04

**Success Criteria:**
1. AI feedback evaluates prompts against a defined rubric (specificity, clarity, context, structure) and returns a score per dimension.
2. Each rubric dimension displays its score alongside an explanation (e.g., "Specificity: 3/5 — Your prompt did not specify the audience").
3. The scoring rubric criteria are visible to the user before they submit, so they know what to aim for.

**Depends On:** Phase 8

**Parallelizable With:** none (but Phase 10 and Phase 11 can proceed in parallel)

**Pitfalls Addressed:** P3 (cost spiral — system prompt token budget awareness), feedback prompt designed with cost efficiency in mind (Q7 from open questions)

---

### Phase 10: Internationalization — Full Content & UI

**Goal:** Complete English and Norwegian coverage for all UI text and curated content, with natively-authored Norwegian examples (not machine-translated).

**Requirements:** I18N-01, I18N-03

**Success Criteria:**
1. Every UI string in the application displays correctly in both English and Norwegian — no `[TODO]` placeholders remain.
2. All curated prompt examples have natively-authored Norwegian versions that read naturally (not machine-translated English).
3. A CI check or build-time validation confirms key parity between `en.json` and `no.json` with no missing keys.
4. Norwegian layouts render correctly — longer strings do not break UI elements or cause overflow.

**Depends On:** Phase 4 (all content UI must exist to translate)

**Parallelizable With:** Phase 8, Phase 9

**Pitfalls Addressed:** P12 (poor Norwegian quality — natively authored, not translated), P7 (i18n key parity check)

---

### Phase 11: Responsive Design & Polish

**Goal:** Every page works flawlessly on desktop, tablet, and mobile breakpoints with production-quality visual polish, loading states, and error handling.

**Requirements:** INFR-01

**Success Criteria:**
1. All pages (home, login, examples/browse, examples/detail, sandbox, my collection) render correctly at mobile (375px), tablet (768px), and desktop (1280px) widths.
2. Navigation, category grids, step-by-step views, and sandbox editor adapt their layout to the viewport without horizontal scrolling.
3. Loading skeletons display during content/AI loading; empty states have clear messaging.
4. Accessibility basics pass: keyboard navigation works, focus states are visible, color contrast meets WCAG AA.

**Depends On:** Phase 4, Phase 8 (all UI must exist to polish)

**Parallelizable With:** Phase 10

**Pitfalls Addressed:** General UX quality. Ensures mobile-responsive from TS-8 research recommendation.

---

### Phase 12: Deployment & Production Hardening

**Goal:** Deploy the complete application to Vercel with production-ready configuration, environment variables, and verification that all features work in the deployed environment.

**Requirements:** INFR-02

**Success Criteria:**
1. The app is live on a Vercel URL accessible to the team.
2. Environment variables (`SITE_PASSWORD`, AI API keys) are configured in the Vercel dashboard — not committed to the repo.
3. The full user journey works in production: login -> browse examples -> search/filter -> bookmark -> sandbox -> AI feedback -> switch language.
4. Vercel build completes without warnings; no `server-only` violations or leaked secrets in the client bundle.

**Depends On:** All prior phases

**Parallelizable With:** none

**Pitfalls Addressed:** P2 (leaked keys — verify client bundle), P1 (auth bypass — verify in production), P3 (spending caps — confirm provider dashboard settings)

---

## Parallelization Map

```
Phase 1 ─────────────────────────────────────────────────────────────────────
              │
        ┌─────┴─────┐
        ▼           ▼
     Phase 2     Phase 3  ←── can run in parallel
        │           │
        └─────┬─────┘
              ▼
           Phase 4
              │
        ┌─────┼──────────────────────┐
        ▼     ▼                      ▼
     Phase 5  Phase 6             Phase 7    ←── 5 & 6 parallel; 7 parallel with 5 & 6
        │     │                      │
        └──┬──┘                      │
           │                         ▼
           │                      Phase 8
           │                         │
           │                         ▼
           │                      Phase 9
           │                         │
           │    ┌────────────────────┤
           │    ▼                    │
           │  Phase 10               │
           │    │                    │
           │    │         ┌──────────┘
           │    │         ▼
           │    │      Phase 11  ←── 10 & 11 parallel
           │    │         │
           └────┴────┬────┘
                     ▼
                  Phase 12
```

---

## Requirement Traceability

| REQ-ID | Requirement | Phase |
|--------|-------------|-------|
| CONT-01 | Browse curated prompt refinement examples by category | 4 |
| CONT-02 | Step-by-step prompt evolution with analysis | 4 |
| CONT-03 | Pros, cons, feedback, and tips per version | 4 |
| CONT-04 | Simulated AI output preview per version | 4 |
| CONT-05 | Difficulty levels and learning path | 3 |
| CONT-06 | Previous/next navigation between versions | 4 |
| CONT-07 | Refinement-focused pedagogy | 3 |
| PRAC-01 | Practice sandbox with live AI streaming | 8 |
| PRAC-02 | AI feedback with improvement suggestions | 8 |
| PRAC-03 | Visible scoring rubric | 9 |
| PRAC-04 | Scoring criteria with explanations | 9 |
| PRAC-05 | Rate limiting and cost controls | 7 |
| PRAC-06 | Provider-agnostic AI via Vercel AI SDK | 7 |
| PERS-01 | Bookmark favorite examples | 6 |
| PERS-02 | Personal notes on examples | 6 |
| PERS-03 | Personal collection view | 6 |
| SRCH-01 | Search examples by keyword | 5 |
| SRCH-02 | Filter by category and difficulty | 5 |
| SRCH-03 | Copy prompt to clipboard | 5 |
| I18N-01 | English and Norwegian UI text | 10 |
| I18N-02 | Language switcher with persisted choice | 1 |
| I18N-03 | Bilingual curated content (natively authored) | 10 |
| I18N-04 | i18n architecture supports new languages without code changes | 1 |
| AUTH-01 | Shared password protection | 2 |
| AUTH-02 | 7-day session cookie | 2 |
| AUTH-03 | Server-side AI API calls (keys never exposed) | 2, 7 |
| INFR-01 | Responsive design (desktop, tablet, mobile) | 11 |
| INFR-02 | Deployed to Vercel | 12 |
| INFR-03 | Content as typed TypeScript files | 3 |
| INFR-04 | User state in localStorage with namespaced keys | 6 |

---
*Last updated: 2026-02-14 after roadmap creation*
