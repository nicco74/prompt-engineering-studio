# Domain Pitfalls

**Domain:** AI Prompt Learning Platform (Next.js + TypeScript + Tailwind CSS)
**Researched:** 2026-02-14

---

## Critical Pitfalls

Mistakes that cause rewrites, security incidents, or runaway costs.

---

### Pitfall 1: Middleware-Only Authentication Gets Bypassed

**What goes wrong:** Teams implement simple password protection solely via Next.js middleware, believing it guards all routes. CVE-2025-29927 (CVSS 9.1) demonstrated that the internal `x-middleware-subrequest` header could be spoofed by external clients, bypassing middleware entirely. Even after patching, middleware remains an "optimistic" check -- it filters obvious unauthorized requests but is never a sole security layer.

**Why it happens:** Simple password auth seems like a trivial problem. Teams put one check in middleware and assume every route (pages, API routes, static assets) is protected. They forget that API routes serving sandbox data, progress JSON, or bookmarks are independently accessible endpoints.

**Consequences:** Unauthenticated access to the entire application. For this project: anyone could use the AI sandbox (burning API budget), read progress data, or access content meant for the team.

**Warning signs:**
- Auth check exists only in `middleware.ts` with no secondary verification
- API routes like `/api/sandbox`, `/api/progress` lack their own auth guards
- No integration test that directly hits API routes without a valid session cookie
- Using a Next.js version below 15.2.3 (self-hosted)

**Prevention:**
1. Implement a Data Access Layer (DAL) pattern: a shared `verifyAuth()` function called at every data access point, not just middleware
2. Middleware acts as first filter; API route handlers and Server Actions independently verify the session cookie
3. Pin Next.js to >= 15.2.3 and strip the `x-middleware-subrequest` header at the reverse proxy / Vercel edge layer
4. Write integration tests that call API endpoints directly without auth to confirm they reject

**Phase:** Foundation / Auth setup (Phase 1). Must be correct from the start; retrofitting auth layers is painful.

**Confidence:** HIGH -- CVE is documented, middleware limitations are in official Next.js security guidance.

**Sources:**
- [Vercel Postmortem on Middleware Bypass](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass)
- [Next.js Security Guide](https://nextjs.org/blog/security-nextjs-server-components-actions)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/guides/authentication)

---

### Pitfall 2: AI API Key Leaked to Client Bundle

**What goes wrong:** The AI provider API key ends up in the client-side JavaScript bundle, either through a `NEXT_PUBLIC_` prefix, direct import in a Client Component, or a bundler misconfiguration. Anyone opening browser dev tools can extract the key.

**Why it happens:** During sandbox development, a developer tests AI calls from a Client Component for faster iteration. The `NEXT_PUBLIC_AI_API_KEY` variable "just works" in the browser. It ships to production. Or, a Server Component that reads `process.env.AI_API_KEY` gets refactored into a Client Component without removing the server-only import.

**Consequences:** Exposed API key leads to unlimited third-party usage billed to your account. With OpenAI or Anthropic keys, an attacker can run thousands of dollars in API calls within hours.

**Warning signs:**
- Any environment variable with `NEXT_PUBLIC_` prefix containing a secret
- AI SDK import statements (`import { openai } from '@ai-sdk/openai'`) appearing in files with `'use client'` directive
- No `server-only` package import in modules that touch `process.env`
- API calls to AI providers made directly from frontend code

**Prevention:**
1. All AI API calls go through a Next.js API route or Server Action -- never from Client Components
2. Use the `server-only` package: `import 'server-only'` in any module that accesses `process.env` secrets
3. Create a dedicated Data Access Layer module (e.g., `lib/dal.ts`) that is the only place `process.env.AI_API_KEY` is read
4. Add a CI check that greps for `NEXT_PUBLIC_` variables containing "KEY", "SECRET", or "TOKEN"
5. Set billing alerts and hard spending caps on the AI provider dashboard from day one

**Phase:** Foundation / AI integration setup. Establish the server-only pattern before writing any sandbox code.

**Confidence:** HIGH -- documented in official Next.js security guidance and multiple incident reports.

**Sources:**
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
- [Smashing Magazine: Protect API Keys with Next.js](https://www.smashingmagazine.com/2021/12/protect-api-key-production-nextjs-api-route/)

---

### Pitfall 3: Sandbox AI Costs Spiral Without Per-User Rate Limits

**What goes wrong:** The practice sandbox lets users send unlimited prompts to the AI API. Even with only 2-5 users, a single person experimenting enthusiastically (or a script accidentally left running) can generate hundreds of API calls per hour. With no guardrails, monthly costs exceed budget within days.

**Why it happens:** Teams building for "just 2-5 users" skip rate limiting because it feels like over-engineering. They assume responsible usage. They also forget that AI feedback on prompts can involve substantial system prompts (evaluation rubrics, examples), multiplying token usage per request far beyond what the user's short prompt suggests.

**Consequences:** Unexpected bills of hundreds or thousands of dollars. Potential service suspension if provider spending limits are hit. Team loses trust in the tool when it goes offline.

**Warning signs:**
- No per-session or per-user request counter in sandbox API route
- System prompt for evaluation exceeds 500 tokens without awareness of cumulative cost
- No spending cap configured on the AI provider dashboard
- No response caching for identical or near-identical prompts
- No UI indication of remaining requests or cost awareness

**Prevention:**
1. Implement server-side rate limiting in the sandbox API route: max requests per user per hour (e.g., 20-30/hour is generous for learning)
2. Set hard spending caps on the AI provider dashboard (e.g., $20/month for a 2-5 person team)
3. Cache AI responses for identical prompts using a simple hash-based cache (even in-memory or a JSON file)
4. Keep system prompts lean -- measure token count of your evaluation prompt and optimize
5. Show users a request counter in the UI ("12 of 30 practice attempts remaining this hour")
6. Consider using cheaper/smaller models for prompt feedback (e.g., GPT-4o-mini or Claude Haiku) since evaluation does not require frontier model quality

**Phase:** Sandbox development phase. Rate limiting must ship with the sandbox, not after the first bill.

**Confidence:** HIGH -- well-documented pattern in AI API cost management literature.

**Sources:**
- [AI API Pricing Guide 2026](https://medium.com/@anyapi.ai/ai-api-pricing-guide-2026-cost-comparison-and-how-to-optimize-your-spending-c74f2254a2a8)
- [ChatGPT API Pricing 2026](https://intuitionlabs.ai/articles/chatgpt-api-pricing-2026-token-costs-limits)

---

### Pitfall 4: Choosing next-i18next for App Router (Wrong Library)

**What goes wrong:** Teams pick `next-i18next` because it has the most stars, the most tutorials, and "i18next" is the de facto standard. But `next-i18next` was built for the Pages Router and does not work properly with App Router Server Components. It requires awkward workarounds, breaks server-side rendering of translations, and becomes a debugging nightmare.

**Why it happens:** Training data, blog posts, and Stack Overflow answers overwhelmingly recommend `next-i18next` because it dominated for years. Developers search "Next.js i18n" and follow the top results without checking App Router compatibility.

**Consequences:** Translations fail in Server Components. Flash of untranslated content (FOUC) on page load. Team wastes days debugging hydration mismatches. Eventually must migrate to a different library -- a rewrite of every component that uses translations.

**Warning signs:**
- `next-i18next` in `package.json` alongside App Router (`app/` directory)
- `useTranslation` hook imported from `next-i18next` in Server Components (which cannot use hooks)
- Hydration mismatch warnings in console related to translated text
- Wrapping the app in `appWithTranslation` HOC (a Pages Router pattern)

**Prevention:**
1. Use `next-intl` -- it is purpose-built for App Router, works with Server Components, layouts, and file-based routing
2. Decide this in Phase 1 and never revisit. The library choice is foundational
3. Set up the `[locale]` dynamic segment routing pattern from the first route, not retrofitted later
4. Structure translation files as `messages/en.json` and `messages/no.json` from day one

**Phase:** Foundation / i18n setup (Phase 1). This is a day-one architectural decision.

**Confidence:** HIGH -- `next-i18next` App Router incompatibility is documented by its own maintainers and confirmed by `next-intl` adoption (used by Node.js website).

**Sources:**
- [next-intl App Router Documentation](https://next-intl.dev/docs/getting-started/app-router)
- [next-i18next vs next-intl Comparison](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)

---

## Moderate Pitfalls

Mistakes that cause significant rework or degraded user experience.

---

### Pitfall 5: Hardcoded Content Without a Structured Schema

**What goes wrong:** Prompt examples, step-by-step refinements, analysis text, and category metadata get embedded directly in React components or scattered across untyped JSON files. Adding a new example, fixing a typo in Norwegian, or restructuring categories requires editing code across multiple files.

**Why it happens:** The original prototype was a single-file app with all content inline. Teams carry this pattern forward because "it's just a few examples" and a CMS feels like overkill for an internal tool.

**Consequences:** Content updates require code deployments. Translation coverage gaps go unnoticed because there is no schema enforcing that every English string has a Norwegian counterpart. Adding a new category touches 5+ files. Non-developer team members cannot contribute content.

**Warning signs:**
- Prompt example text appearing inside `.tsx` component files
- Translation keys inconsistent between `en.json` and `no.json` (missing keys, different structure)
- No TypeScript type/interface defining the shape of a prompt example
- Adding one new example requires modifying more than 2 files

**Prevention:**
1. Define a strict TypeScript interface for content: `PromptExample`, `RefinementStep`, `Category`
2. Store all content in typed JSON/TS data files (e.g., `content/examples/email.ts`) separate from components
3. Use a validation script or Zod schema that confirms both language files have identical key structures
4. Consider a flat-file content approach: one directory per example, with metadata and translations co-located
5. Keep content files importable but decoupled -- components receive data via props, never import content directly

**Phase:** Content architecture (Phase 1-2). Design the content schema before writing any examples.

**Confidence:** HIGH -- standard content management best practice, reinforced by prototype history.

---

### Pitfall 6: Provider-Agnostic Abstraction That Is Too Thin or Too Thick

**What goes wrong:** The "provider-agnostic AI API" requirement leads to one of two extremes. Too thin: a wrapper that just swaps base URLs, breaking when providers have different request/response shapes, tool-calling formats, or error codes. Too thick: a LangChain-style abstraction that adds layers of complexity for a project that only needs simple prompt-in/text-out calls.

**Why it happens:** "Provider-agnostic" sounds like a simple interface, but AI providers differ in authentication, streaming formats, rate limit headers, error response shapes, and token counting. Teams either underestimate this (thin wrapper breaks on provider switch) or overestimate it (bring in a framework that adds 50+ dependencies for a use case that needs one function).

**Consequences:** Too thin: switching providers requires rewriting error handling, response parsing, and streaming logic. Too thick: debugging AI issues means wading through abstraction layers; bundle size bloats; team cannot understand the AI integration code.

**Warning signs:**
- AI abstraction layer has no tests for provider-specific error responses
- Using LangChain, LlamaIndex, or similar framework when the only operation is "send prompt, get text back"
- Provider swap requires changing more than one file
- No model compatibility matrix documenting which features work with which provider

**Prevention:**
1. Use the Vercel AI SDK (`ai` package) -- it provides a thin but correct abstraction for multiple providers with a unified streaming interface, purpose-built for Next.js
2. Define a minimal interface: `evaluatePrompt(userPrompt: string, systemPrompt: string): Promise<string>` -- nothing more
3. Isolate the provider configuration in a single file (`lib/ai/provider.ts`) that exports this interface
4. Write integration tests with mock responses shaped like each target provider's actual response format
5. Maintain a one-page compatibility matrix: which models support streaming, what token limits apply, what the cost per 1K tokens is

**Phase:** AI integration phase (Phase 2-3). Design the interface before implementing the sandbox.

**Confidence:** MEDIUM -- based on community patterns and documented abstraction layer challenges. Vercel AI SDK is the strongest current option but verify latest API surface.

**Sources:**
- [LLM Abstraction Layer](https://www.proxai.co/blog/archive/llm-abstraction-layer)
- [Vercel AI SDK Anthropic Provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)

---

### Pitfall 7: i18n Retrofitted Instead of Foundational

**What goes wrong:** English is built first with hardcoded strings in components. Norwegian translations are added later as a second pass. This creates a pattern where new features ship in English only, Norwegian falls behind, and the codebase accumulates a mix of translated and untranslated strings.

**Why it happens:** "We'll add Norwegian later" is the path of least resistance. Developers write `<h1>Practice Sandbox</h1>` instead of `<h1>{t('sandbox.title')}</h1>` because it is faster in the moment.

**Consequences:** Perpetual translation debt. Norwegian users see English fragments mixed with Norwegian. Every feature requires a second "translation pass" that is easy to forget. QA must check every page in both languages, doubling effort.

**Warning signs:**
- Components with hardcoded English strings that are not wrapped in `t()` calls
- Norwegian JSON file has fewer keys than English JSON file
- No linting rule or CI check for untranslated strings
- No locale switcher in the development environment for quick visual testing

**Prevention:**
1. Set up `next-intl` with both `en.json` and `no.json` in Phase 1, before writing any UI
2. Enforce a rule: no hardcoded user-facing strings in components. Every string goes through `t()`
3. Add a CI validation script that compares keys between `en.json` and `no.json` and fails on mismatch
4. Add a locale toggle to the dev toolbar so developers see both languages during development
5. Write the English translation file first, then immediately create the Norwegian counterpart (even with placeholder text that is clearly marked `[TODO: translate]`)

**Phase:** Foundation (Phase 1). The i18n architecture must exist before the first component is written.

**Confidence:** HIGH -- this is the single most common i18n mistake in every framework, extensively documented.

---

### Pitfall 8: Prompt Example Content Becomes Stale as AI Models Evolve

**What goes wrong:** Curated prompt refinement examples are written for a specific model's behavior (e.g., GPT-4 circa 2024). As models improve, the "bad" prompt in an example actually produces good output, and the "refined" prompt shows marginal improvement. The learning value of the example collapses.

**Why it happens:** AI models improve rapidly. A prompt technique that was essential 6 months ago (e.g., "think step by step") may become unnecessary as models internalize chain-of-thought. The examples were correct when written but the world moved.

**Consequences:** Users learn outdated techniques. The platform teaches workarounds for problems that no longer exist. Credibility suffers when a user tries the "bad" prompt and gets great output.

**Warning signs:**
- Examples reference specific model names or versions
- "Bad" prompt examples that now produce acceptable output
- Techniques taught that are model-specific rather than universally applicable
- No review date or version metadata on example content
- No process for periodically re-testing examples against current models

**Prevention:**
1. Focus examples on universal prompting principles (clarity, specificity, context-setting, output format specification) rather than model-specific tricks
2. Add a `lastReviewed` date field to every example in the content schema
3. Write examples that demonstrate the *principle* (e.g., "being specific about format improves output") rather than the *workaround* (e.g., "you must say 'think step by step'")
4. Establish a quarterly review cadence: run each example against the current model and verify the refinement still demonstrates meaningful improvement
5. Store the AI-generated output separately from the example content so outputs can be regenerated without rewriting the example

**Phase:** Content creation phase and ongoing maintenance. Design the review process during content architecture.

**Confidence:** MEDIUM -- based on observed pattern of prompt technique obsolescence, but the specific rate of drift depends on model release cadence.

---

## Minor Pitfalls

Mistakes that cause friction or technical debt but are recoverable.

---

### Pitfall 9: Cookie-Based Session Without Proper Expiry or Rotation

**What goes wrong:** The simple password auth sets a session cookie that never expires, or expires only when the browser closes. Team members share the password once, authenticate, and then have permanent access. If a team member leaves or a device is compromised, there is no way to revoke access without changing the shared password (which disrupts everyone).

**Prevention:**
1. Set a reasonable cookie expiry (e.g., 7 days) so sessions naturally rotate
2. Store a server-side session version counter -- incrementing it invalidates all existing sessions (equivalent to "change the password for everyone")
3. Use `httpOnly`, `secure`, and `sameSite=strict` cookie attributes
4. Consider storing a hashed password version in the cookie so changing the password auto-invalidates old sessions

**Phase:** Auth implementation (Phase 1).

**Confidence:** HIGH -- standard session management practice.

---

### Pitfall 10: Progress Tracking in localStorage Only

**What goes wrong:** User progress, bookmarks, and notes are stored in `localStorage`. This means progress is lost when clearing browser data, is inaccessible from a different device, and cannot be backed up.

**Prevention:**
1. For 2-5 users, a simple server-side JSON file or SQLite database is sufficient
2. Use localStorage as a cache/fallback, not the source of truth
3. Sync progress to server on meaningful events (completing an example, adding a bookmark) rather than on every interaction
4. If staying client-only for Phase 1, document the limitation explicitly and plan for server-side sync in a later phase

**Phase:** Progress tracking feature (Phase 2-3). Decide the storage strategy before implementing.

**Confidence:** HIGH -- well-understood limitation of localStorage.

---

### Pitfall 11: Streaming Responses Without Error Boundaries

**What goes wrong:** The sandbox streams AI responses to the UI. When the stream errors mid-response (network timeout, provider rate limit, malformed chunk), the UI shows a partial response with no error indication, or crashes entirely.

**Prevention:**
1. Wrap streaming UI in React Error Boundaries with a fallback that explains what happened
2. Handle stream errors explicitly: `onError` callback that shows a user-friendly message
3. Add a timeout to streaming responses (e.g., 30 seconds) with automatic abort and retry suggestion
4. Show a loading/streaming indicator that transitions to an error state on failure, not just an empty area

**Phase:** Sandbox UI development.

**Confidence:** HIGH -- common issue with streaming AI integrations in React.

---

### Pitfall 12: Norwegian Translation Quality Treated as an Afterthought

**What goes wrong:** English copy is carefully written with proper UX writing principles. Norwegian translations are done by running the English through a translation tool or by a team member who "knows enough Norwegian." The result is stilted, overly formal, or grammatically awkward Norwegian that feels like a bad translation rather than a native experience.

**Prevention:**
1. Have a native Norwegian speaker review all translations, not just translate them
2. Write Norwegian copy as original content where possible, not as literal translations of English
3. Pay attention to UI string length differences -- Norwegian strings are often longer than English equivalents, which can break layouts
4. Test the entire UI in Norwegian mode to catch layout issues from longer strings

**Phase:** Content and i18n development.

**Confidence:** MEDIUM -- depends on team composition and Norwegian language proficiency.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|---|---|---|
| Foundation / Auth | Middleware-only auth bypass (Pitfall 1) | DAL pattern with multi-layer verification from day one |
| Foundation / i18n | Wrong library choice (Pitfall 4) | Use `next-intl`, decide before writing any components |
| Foundation / i18n | Retrofitting translations (Pitfall 7) | Set up both languages before first component |
| Content Architecture | No content schema (Pitfall 5) | TypeScript interfaces + validation before writing examples |
| Content Creation | Stale examples (Pitfall 8) | Focus on universal principles, add review metadata |
| AI Integration | API key exposure (Pitfall 2) | Server-only pattern, `server-only` package, DAL |
| AI Integration | Abstraction extremes (Pitfall 6) | Vercel AI SDK, minimal interface, single config file |
| Sandbox Development | Cost spiral (Pitfall 3) | Rate limits + spending caps ship with sandbox |
| Sandbox Development | Stream errors (Pitfall 11) | Error boundaries + timeout + fallback UI |
| Progress / Data | localStorage-only storage (Pitfall 10) | Server-side storage or explicit plan for migration |
| Auth Hardening | Session management gaps (Pitfall 9) | Cookie expiry, rotation, httpOnly attributes |
| Localization QA | Poor Norwegian quality (Pitfall 12) | Native speaker review, layout testing in Norwegian |

---

## Sources

- [Vercel Postmortem on Next.js Middleware Bypass](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass)
- [Next.js Security with Server Components and Actions](https://nextjs.org/blog/security-nextjs-server-components-actions)
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/guides/authentication)
- [next-intl App Router Documentation](https://next-intl.dev/docs/getting-started/app-router)
- [next-i18next vs next-intl vs Intlayer Comparison](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer)
- [AI API Pricing Guide 2026](https://medium.com/@anyapi.ai/ai-api-pricing-guide-2026-cost-comparison-and-how-to-optimize-your-spending-c74f2254a2a8)
- [LLM Abstraction Layer: Why Your Codebase Needs One](https://www.proxai.co/blog/archive/llm-abstraction-layer)
- [Vercel AI SDK Anthropic Provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)
- [Solving Common i18n Pitfalls in Next.js](https://medium.com/@rameshkannanyt0078/solving-common-i18n-pitfalls-in-next-js-static-ssr-real-time-translation-workflows-b574c440cd3f)
- [Smashing Magazine: Protect API Keys with Next.js](https://www.smashingmagazine.com/2021/12/protect-api-key-production-nextjs-api-route/)
- [CVE-2025-29927 Analysis (ProjectDiscovery)](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass)
