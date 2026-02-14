# Technology Stack

**Project:** Prompt Engineering Studio
**Researched:** 2026-02-14
**Overall Confidence:** HIGH

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js | 16.1.6 | Full-stack React framework | App Router is the standard for 2026. Turbopack stable by default for dev and build. Proxy file (renamed from middleware in v16) runs on Node.js runtime. Vercel-native deployment. | HIGH |
| React | 19.2.4 | UI library | Required by Next.js 16. Server Components, Suspense, and Activity API are stable. | HIGH |
| TypeScript | 5.9.3 | Type safety | Latest stable. Next.js 16 requires TS 5.1+; 5.9 adds import defer support. Do NOT use 6.0 beta. | HIGH |
| Tailwind CSS | 4.1.18 | Utility-first CSS | CSS-first configuration (no tailwind.config.js). Up to 5x faster full builds. Uses Lightning CSS engine. All shadcn/ui components updated for v4. | HIGH |
| Node.js | 24.x LTS | Runtime | Active LTS ("Krypton"), supported through April 2028. Next.js 16 requires Node 20.9+. Node 22 also acceptable (maintenance LTS until April 2027). | HIGH |

### AI Integration

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| AI SDK (`ai`) | 6.0.x (currently 6.0.86) | Provider-agnostic AI abstraction | Unified API for 20+ providers. Handles streaming, structured output, and tool calls. From the creators of Next.js, so integration is first-class. Switching providers requires changing one import. | HIGH |
| `@ai-sdk/openai` | 3.0.x | OpenAI provider | Drop-in provider for GPT models via AI SDK unified interface. Install only when needed. | HIGH |
| `@ai-sdk/anthropic` | 3.0.x | Anthropic provider | Drop-in provider for Claude models via AI SDK unified interface. Install only when needed. | HIGH |

**Provider strategy:** Install `ai` as the core package. Add provider packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`, etc.) as needed. The unified API means swapping providers is a one-line change in the model parameter.

```typescript
// Provider-agnostic usage pattern (AI SDK 6)
import { streamText } from 'ai';

const { textStream } = streamText({
  model: 'anthropic/claude-sonnet-4-5',  // or 'openai/gpt-5'
  prompt: userPrompt,
});
```

### Internationalization (i18n)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| next-intl | 4.8.x (currently 4.8.2) | i18n for Next.js | Purpose-built for App Router and Server Components. ICU message syntax. Type-safe. Supports setup WITHOUT locale routing (no /en/ /no/ URL prefixes needed). Cookie-based locale switching is simpler for a small internal tool. | HIGH |

**Routing strategy:** Use the **without i18n routing** setup. For a small internal team tool, URL-based locale prefixes (/en, /no) add unnecessary complexity. Instead, store locale preference in a cookie and read it in `getRequestConfig`. This avoids proxy/middleware configuration for i18n entirely.

### Authentication

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Next.js Proxy (built-in) | N/A (part of Next.js 16) | Simple password protection | For a 2-5 person internal team, a shared password via environment variable is sufficient. Implement in `proxy.ts` (the renamed middleware file in Next.js 16). Check a session cookie or HTTP Basic Auth header. No external auth dependency needed. | HIGH |

**Auth strategy:** Do NOT use NextAuth.js, Clerk, Auth0, or Supabase Auth. These are overengineered for a shared-password use case with 2-5 users. Instead:

1. Create a `proxy.ts` file (Next.js 16's proxy, formerly middleware)
2. Check for a session cookie on protected routes
3. If missing, redirect to a simple login page
4. Login page validates password against `process.env.SITE_PASSWORD`
5. On success, set an HTTP-only cookie with a signed token
6. Store the password hash (not plaintext) in the environment variable

### UI Components

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| shadcn/ui (via `shadcn` CLI) | CLI v3.8.x | Accessible component library | Copy-paste components, not a dependency. Full Tailwind v4 + React 19 support. Radix UI primitives underneath. You own the code. | HIGH |
| Lucide React | 0.563.x | Icons | Default icon set for shadcn/ui. Tree-shakable (only imported icons ship). Consistent design language. | HIGH |

### Validation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Zod | 4.3.x (currently 4.3.6) | Schema validation | 14x faster parsing in v4. 57% smaller core. Top-level format helpers (z.email(), z.url()). Works with AI SDK for structured output schemas. Also use for form validation on the login page and any user input. | HIGH |

### Database / Persistence

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| JSON files (local) | N/A | Content storage | For a learning platform with curated examples, content is author-managed, read-heavy, and changes infrequently. JSON files in a `/content` directory are version-controlled, require zero infrastructure, and deploy instantly on Vercel. No database needed for MVP. | HIGH |

**Why NOT a database:** This is a content-driven learning tool for 2-5 users, not a SaaS product. The content (prompt examples, scenarios, exercises) is curated by the team, not user-generated at scale. JSON files:
- Are version-controlled with git
- Require zero setup, zero cost, zero maintenance
- Deploy as static assets on Vercel
- Can be typed with TypeScript interfaces
- Can be migrated to a database later if needed (content structure stays the same)

**If persistence IS needed later** (e.g., saving user progress): Use Vercel KV (Redis) or Turso (SQLite at the edge) with Drizzle ORM. But do not add this complexity until there is a real need.

### Testing

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vitest | 4.0.x (currently 4.0.18) | Unit + integration tests | 10-20x faster than Jest. Native TypeScript and ESM support. Vite-powered HMR in watch mode. The modern default for new projects in 2026. | HIGH |
| Playwright | 1.58.x (currently 1.58.2) | E2E tests | Browser automation for testing the full learning flow. Multi-browser support. Best-in-class for Next.js E2E testing. | MEDIUM |
| React Testing Library | latest | Component tests | Standard for testing React components. Works with Vitest. | HIGH |

**Testing strategy:** Vitest for unit tests and component tests (with React Testing Library). Playwright for critical user journeys only (not every page). Keep the test surface lean for a small project.

### Developer Experience

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| ESLint | 9.x | Linting | Flat config is the default. Use `eslint-config-next@16.1.6` for Next.js rules. Next.js 16 removed `next lint` -- use ESLint CLI directly. | HIGH |
| Prettier | 3.x | Formatting | Consistent code style. Use `prettier-plugin-tailwindcss` for class sorting. | HIGH |
| pnpm | 10.x (currently 10.29.3) | Package manager | Faster installs, strict dependency resolution, disk-efficient. The standard for modern Next.js projects. Vercel supports it natively. | HIGH |

### Infrastructure

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel | N/A | Hosting + deployment | Zero-config deployment for Next.js 16. Preview deployments on PRs. Built-in analytics. Environment variables for secrets. Free tier sufficient for 2-5 users. | HIGH |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| **i18n** | next-intl | next-translate, next-international, react-i18next | next-intl has the best App Router + Server Components integration. Others either lack RSC support or have smaller ecosystems. next-intl is the clear community standard. |
| **Auth** | Custom proxy.ts + cookie | NextAuth.js, Clerk, Auth0, Supabase Auth | Massive overengineering for a shared password protecting 2-5 users. Adds dependencies, configuration complexity, and external service costs for a problem solvable in 30 lines of code. |
| **Database** | JSON files | Turso, Supabase, PlanetScale, Vercel Postgres | No database needed for curated, read-heavy content served to a small team. Adding a database adds cost, latency, setup time, and operational burden with zero benefit at this scale. |
| **AI SDK** | Vercel AI SDK 6 | LangChain.js, direct API calls, TanStack AI | AI SDK is from the same team as Next.js, giving first-class integration. LangChain adds heavyweight abstractions unnecessary for prompt-and-response use cases. Direct API calls lose streaming helpers and provider switching. TanStack AI is newer with a smaller ecosystem. |
| **Testing** | Vitest | Jest | Jest requires more configuration for TypeScript and ESM. Vitest is faster and simpler for greenfield projects. Jest is better only for legacy codebases already using it. |
| **UI** | shadcn/ui | Material UI, Chakra UI, Mantine, Ant Design | shadcn/ui gives you ownership of the code (not a dependency). Tailwind-native. No runtime CSS overhead. Other libraries add bundle size and impose their design system. |
| **Package Manager** | pnpm | npm, yarn, bun | pnpm is faster, stricter, and more disk-efficient. npm is slower with flat node_modules. yarn offers no advantage over pnpm in 2026. bun is fast but less mature for production Next.js. |
| **Icons** | Lucide React | Heroicons, React Icons, Phosphor | Lucide is the default for shadcn/ui. Using the same icon set as the component library ensures visual consistency. Tree-shakable. |
| **CSS** | Tailwind CSS v4 | CSS Modules, Styled Components, Emotion | Tailwind v4 is the decided stack. CSS-in-JS libraries (Styled Components, Emotion) have runtime overhead and poor RSC support. CSS Modules work but lack the utility-first productivity. |

---

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| **NextAuth.js / Auth.js** | Designed for OAuth flows with multiple providers. Massive overkill for a shared password. Adds complexity, session management, and database requirements you do not need. |
| **Prisma** | No database means no ORM. If you add a database later, Drizzle ORM is lighter and faster. Prisma's CLI-heavy workflow and generated client add unnecessary overhead. |
| **LangChain.js** | Heavy abstraction layer designed for complex AI agent workflows. For simple prompt-in / response-out with streaming, the AI SDK is simpler and more idiomatic in Next.js. |
| **Redux / Zustand** | No complex client-side state to manage. React Server Components + URL state + React context covers the needs of this application. |
| **Tailwind CSS v3** | v4 is stable and is the default for new projects. v3 uses a JavaScript config file that v4 eliminates. shadcn/ui fully supports v4. No reason to start a new project on v3. |
| **TypeScript 6.0 beta** | Not stable. TS 5.9.3 is the latest stable release. TS 6.0 is the final JS-based compiler release before the Go rewrite (TS 7.0). Wait for stable. |
| **Express.js** | Next.js API routes and Server Actions cover all backend needs. Adding Express adds another server to maintain with no benefit. |
| **MongoDB / Firebase** | Schemaless databases add complexity for structured learning content. If you need a database later, SQLite (via Turso) or Postgres is more appropriate for structured content. |
| **Storybook** | Unnecessary overhead for a small team project. If component documentation is needed later, it can be added. Do not start with it. |

---

## Critical Next.js 16 Changes

These are breaking changes that affect the stack setup:

1. **Middleware renamed to Proxy:** The `middleware.ts` file is now `proxy.ts`. The exported function is `proxy()` not `middleware()`. The runtime is Node.js only (no edge runtime).
2. **Turbopack is default:** Both `next dev` and `next build` use Turbopack. No `--turbo` flag needed.
3. **`next lint` removed:** Use ESLint CLI directly. The `eslint` config option in `next.config.ts` is no longer needed.
4. **Node.js 20.9+ required:** Node 18 support dropped.
5. **TypeScript 5.1+ required.**

---

## Installation

```bash
# Initialize project
pnpm create next-app@latest prompt-engineering-studio --typescript --tailwind --eslint --app --src-dir

# Core dependencies
pnpm add ai @ai-sdk/openai @ai-sdk/anthropic next-intl zod

# UI components (shadcn/ui - installs components into your project)
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input dialog tabs

# Icons (auto-installed with shadcn, but explicit for clarity)
pnpm add lucide-react

# Dev dependencies
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test
pnpm add -D prettier prettier-plugin-tailwindcss
pnpm add -D eslint-config-next@latest
```

---

## Version Summary (as of 2026-02-14)

| Package | Exact Version | Pinned? |
|---------|---------------|---------|
| next | 16.1.6 | Use `^16.1.0` (minor updates safe) |
| react / react-dom | 19.2.4 | Use `^19.2.0` |
| typescript | 5.9.3 | Use `~5.9.0` (patch updates only) |
| tailwindcss | 4.1.18 | Use `^4.1.0` |
| ai (AI SDK) | 6.0.86 | Use `^6.0.0` |
| @ai-sdk/openai | 3.0.28 | Use `^3.0.0` |
| @ai-sdk/anthropic | 3.0.43 | Use `^3.0.0` |
| next-intl | 4.8.2 | Use `^4.8.0` |
| zod | 4.3.6 | Use `^4.3.0` |
| vitest | 4.0.18 | Use `^4.0.0` |
| @playwright/test | 1.58.2 | Use `^1.58.0` |
| lucide-react | 0.563.0 | Use `^0.563.0` |
| shadcn (CLI) | 3.8.4 | Use `latest` (CLI only, not a dependency) |
| pnpm | 10.29.3 | Use `^10.0.0` via corepack |
| node | 24.x LTS | Specify `>=20.9.0` in engines |
| eslint | 9.x | Use `^9.0.0` |
| prettier | 3.x | Use `^3.0.0` |

---

## Sources

### Context7 (HIGH confidence)
- Next.js v16.1.5 official docs via Context7 `/vercel/next.js/v16.1.5` -- proxy file rename, route segment config
- AI SDK official docs via Context7 `/websites/ai-sdk_dev` -- provider-agnostic API, streaming patterns, SDK structure
- next-intl via Context7 `/amannn/next-intl` -- App Router i18n, ICU message syntax

### Official Documentation (HIGH confidence)
- [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- middleware to proxy rename, breaking changes
- [Next.js 16 blog post](https://nextjs.org/blog/next-16) -- Turbopack stable, feature overview
- [Next.js 16.1 blog post](https://nextjs.org/blog/next-16-1) -- file system caching
- [AI SDK documentation](https://ai-sdk.dev/docs/introduction) -- SDK 6 unified API
- [AI SDK 6 announcement](https://vercel.com/blog/ai-sdk-6) -- stable release
- [Tailwind CSS v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, performance
- [next-intl without i18n routing](https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing) -- cookie-based locale
- [shadcn/ui Tailwind v4 support](https://ui.shadcn.com/docs/tailwind-v4) -- all components updated
- [Zod v4 release notes](https://zod.dev/v4) -- performance improvements
- [TypeScript 5.9 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/) -- stable release
- [Vitest 4.0 announcement](https://vitest.dev/blog/vitest-4) -- latest major release

### npm (HIGH confidence for version numbers)
- [ai@6.0.86](https://www.npmjs.com/package/ai) -- published 2026-02-14
- [@ai-sdk/openai@3.0.28](https://www.npmjs.com/package/@ai-sdk/openai) -- published 2026-02-13
- [@ai-sdk/anthropic@3.0.43](https://www.npmjs.com/package/@ai-sdk/anthropic) -- published 2026-02-13
- [next-intl@4.8.2](https://www.npmjs.com/package/next-intl) -- published 2026-02-03
- [zod@4.3.6](https://www.npmjs.com/package/zod) -- published 2026-01-23
- [tailwindcss@4.1.18](https://www.npmjs.com/package/tailwindcss) -- published 2025-12
- [typescript@5.9.3](https://www.npmjs.com/package/typescript) -- latest stable
- [vitest@4.0.18](https://www.npmjs.com/package/vitest) -- published 2026-01-23
- [@playwright/test@1.58.2](https://www.npmjs.com/package/@playwright/test) -- published 2026-02-07
- [lucide-react@0.563.0](https://www.npmjs.com/package/lucide-react) -- published 2026-01-24

### Web Search (verified, MEDIUM-HIGH confidence)
- [Vercel basic auth password template](https://vercel.com/templates/next.js/basic-auth-password) -- proxy-based auth pattern
- [Next.js proxy documentation](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) -- proxy file conventions
- [Node.js releases](https://nodejs.org/en/about/previous-releases) -- Node 24 LTS active
