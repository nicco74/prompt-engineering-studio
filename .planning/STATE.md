# Project State

## Project Reference
See: .planning/PROJECT.md (updated 2026-02-14)
**Core value:** Team members who don't know how to prompt AI can learn by seeing exactly how prompts improve step-by-step, and then practice until they're confident.
**Current focus:** Phase 1

## Phase Status

| Phase | Name | Status | Notes |
|-------|------|--------|-------|
| 1 | Project Scaffold & i18n Foundation | pending | Next.js 16, Tailwind v4, TypeScript, next-intl with EN+NO |
| 2 | Authentication & Security | pending | Shared password, DAL pattern, session cookie |
| 3 | Content Type System & Data Architecture | pending | TypeScript interfaces, Zod schemas, curated examples |
| 4 | Content Browsing UI | pending | Category grid, step-by-step view, Server Components |
| 5 | Search, Discovery & Clipboard | pending | Keyword search, filters, copy-to-clipboard |
| 6 | Personalization — Bookmarks & Notes | pending | Bookmarks, notes, personal collection, localStorage |
| 7 | AI Provider Integration & API Layer | pending | AI SDK registry, secure API routes, rate limiting |
| 8 | Practice Sandbox UI & Streaming | pending | Prompt editor, streaming responses, error boundaries |
| 9 | AI Feedback & Scoring Rubric | pending | Rubric dimensions, score display, explanations |
| 10 | Internationalization — Full Content & UI | pending | Complete NO translations, natively-authored NO content |
| 11 | Responsive Design & Polish | pending | All breakpoints, loading states, accessibility |
| 12 | Deployment & Production Hardening | pending | Vercel deploy, env vars, production verification |

## Current Phase

Phase 1: Project Scaffold & i18n Foundation — Not started

### Phase 1 Requirements
- I18N-02: Language switcher with persisted choice
- I18N-04: i18n architecture supports new languages without code changes

### Phase 1 Success Criteria
1. Running `pnpm dev` launches the app with no errors and displays a page.
2. User can toggle between English and Norwegian using a language switcher.
3. Both `messages/en.json` and `messages/no.json` exist with identical key structures.
4. Adding a new language requires only a new JSON file and locale config update.

### Phase 1 Key Decisions to Make
- Q1: Cookie-based or URL-based i18n routing? (STACK.md says cookie-based; ARCHITECTURE.md uses `[locale]` segments)

---
*Last updated: 2026-02-14 after roadmap creation*
