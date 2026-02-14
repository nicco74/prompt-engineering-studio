# Prompt Engineering Studio

## What This Is

An interactive learning platform that teaches non-technical team members how to write effective AI prompts. Users learn by studying curated prompt refinement examples across real work scenarios (content, business docs, internal comms), then practice writing their own prompts with live AI feedback. Built for a small mixed team (2-5 people) who need to get comfortable using AI in their daily work.

## Core Value

Team members who don't know how to prompt AI can learn by seeing exactly how prompts improve step-by-step, and then practice until they're confident.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Browse curated prompt refinement examples across categories (content/marketing, business docs, internal comms)
- [ ] See step-by-step prompt evolution with analysis (changes, pros, cons, feedback, tips)
- [ ] See AI output preview for each prompt version to understand impact
- [ ] Practice sandbox where users write prompts and get live AI feedback on how to improve
- [ ] Progress tracking — users can see their learning journey
- [ ] Bookmark favorite examples and add personal notes
- [ ] Save prompts from practice sessions
- [ ] Simple shared password protection for team access
- [ ] English and Norwegian language support with i18n architecture for future languages
- [ ] Copy prompts to clipboard for use in other tools
- [ ] Responsive design — works on desktop and mobile
- [ ] Deploy to Vercel for team access

### Out of Scope

- Individual user accounts / authentication system — overkill for 2-5 people, simple password is enough
- Real-time collaboration between users — team is small, not needed
- Prompt marketplace or sharing between teams — internal tool only
- AI model comparison (showing same prompt across different models) — adds complexity, not core to learning
- API provider selection — architecture will be provider-agnostic, decision deferred

## Context

- Evolved from a single-file React prototype built as a Claude Desktop artifact (~966 lines)
- Original had 5 categories: Social Media, Cover Letter, CV/Resume, Email, Job Application
- Original used hardcoded mock AI responses — no real AI integration
- Original had English + partial Norwegian translations
- Team members range from marketers to admins — varied technical comfort levels
- The goal is behavior change: team should feel confident prompting AI after using this tool

## Constraints

- **Tech stack**: Next.js + TypeScript + Tailwind CSS (matches team's existing projects)
- **Hosting**: Vercel (already used for other projects)
- **Team size**: 2-5 users — no need for enterprise-grade infrastructure
- **API**: Provider-agnostic architecture — will integrate a real AI API but provider TBD
- **Budget**: Keep hosting costs minimal (Vercel free/hobby tier)
- **i18n**: Must support RTL-ready architecture even if not needed immediately

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + TypeScript + Tailwind | Matches existing team projects, strong ecosystem | — Pending |
| Simple password over user accounts | Only 2-5 users, reduces complexity significantly | — Pending |
| Provider-agnostic AI integration | User needs to research best API for this use case | — Pending |
| Pre-built examples + user notes (not user-generated examples) | Curated quality matters for learning, notes add personalization | — Pending |
| English + Norwegian for v1, i18n-ready for more | Team needs both languages, future-proof architecture | — Pending |

---
*Last updated: 2026-02-14 after initialization*
