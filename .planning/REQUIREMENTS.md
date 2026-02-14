# Requirements

## v1 Requirements

### Content & Learning

- [ ] **CONT-01**: User can browse curated prompt refinement examples organized by work scenario category (content/marketing, business docs, internal comms)
- [ ] **CONT-02**: User can see step-by-step prompt evolution for each example — from basic to refined — with analysis of what changed and why
- [ ] **CONT-03**: Each prompt version shows pros, cons, feedback, and actionable tips
- [ ] **CONT-04**: Each prompt version shows a simulated AI output preview so users see the impact of refinement
- [ ] **CONT-05**: Examples are tagged with difficulty levels (beginner, intermediate, advanced) and organized into a learning path
- [ ] **CONT-06**: User can navigate between prompt versions using previous/next controls
- [ ] **CONT-07**: Content follows refinement-focused pedagogy — teaches iterative improvement process, not technique taxonomy names

### Practice & AI Interaction

- [ ] **PRAC-01**: User can write prompts in a practice sandbox and see real AI responses streamed back
- [ ] **PRAC-02**: User can request AI feedback that evaluates their prompt quality with specific improvement suggestions
- [ ] **PRAC-03**: AI feedback uses a visible scoring rubric (specificity, clarity, context, structure) so users learn WHAT makes a prompt good
- [ ] **PRAC-04**: User can see the scoring criteria alongside their scores with explanations (e.g., "Specificity: 3/5 — Your prompt did not specify the audience")
- [ ] **PRAC-05**: Sandbox has rate limiting and cost controls to prevent runaway API usage
- [ ] **PRAC-06**: AI API integration is provider-agnostic via Vercel AI SDK — switching providers is a config change

### Personalization

- [ ] **PERS-01**: User can bookmark favorite prompt examples for quick access
- [ ] **PERS-02**: User can add personal notes to any prompt example
- [ ] **PERS-03**: User can view their bookmarked examples and notes in a personal collection

### Search & Discovery

- [ ] **SRCH-01**: User can search examples by keyword
- [ ] **SRCH-02**: User can filter examples by category and difficulty level
- [ ] **SRCH-03**: User can copy any prompt to clipboard with one click

### Internationalization

- [ ] **I18N-01**: All UI text is available in English and Norwegian
- [ ] **I18N-02**: User can switch language via a language selector that persists their choice
- [ ] **I18N-03**: Curated prompt examples have both English and Norwegian versions (natively authored, not translated)
- [ ] **I18N-04**: i18n architecture supports adding new languages without code changes

### Access & Security

- [ ] **AUTH-01**: App is protected by a simple shared password — users enter it once to access the tool
- [ ] **AUTH-02**: Password session persists via cookie with 7-day expiry
- [ ] **AUTH-03**: AI API keys are never exposed to the client — all AI calls go through server-side API routes

### Design & Infrastructure

- [ ] **INFR-01**: Responsive design that works on desktop, tablet, and mobile
- [ ] **INFR-02**: Deployed to Vercel with production-ready configuration
- [ ] **INFR-03**: Content stored as typed TypeScript files — version-controlled, validated at build time
- [ ] **INFR-04**: User state (bookmarks, notes, language preference) stored in localStorage with namespaced keys

## v2 Requirements (Deferred)

- [ ] Progress tracking — examples studied, exercises completed, scores over time (TS-7)
- [ ] Saved prompts library — save prompts from practice sessions for reuse (DF-4)
- [ ] Team features — shared prompt library visible to all team members (DF-5)
- [ ] Team progress dashboard — see how the whole team is progressing (DF-5)
- [ ] Work-scenario prompt templates — starter templates users can modify (DF-7)

## Out of Scope

- Multi-model comparison / model battleground — adds massive API cost and confusing UX for learners (AF-1)
- Prompt auto-optimization engine — if AI rewrites your prompt for you, you learn nothing (AF-2)
- Certification / badges / gamification — overkill for 2-5 people, gamification feels patronizing (AF-3)
- Community features (forums, Discord) — 2-5 people don't need a forum (AF-4)
- Video content / recorded lectures — expensive to produce, hard to localize, interactive text is better (AF-5)
- Prompt version control / deployment / API — production infrastructure, not learning tooling (AF-6)
- Advanced technique taxonomy (CoT, ReAct, etc.) — jargon barriers for non-technical users (AF-7)
- Multi-LLM provider support in UI — unnecessary complexity, teach transferable principles (AF-8)
- Image/audio/multimodal prompting — scope is text-in, text-out (AF-9)
- Admin dashboard / analytics / LMS features — overhead for 2-5 people (AF-10)
- Individual user accounts — simple password is sufficient for team size

## Traceability

| REQ-ID | Requirement | Phase | Status |
|--------|-------------|-------|--------|
| CONT-01 | Browse curated prompt refinement examples by category | 4 | pending |
| CONT-02 | Step-by-step prompt evolution with analysis | 4 | pending |
| CONT-03 | Pros, cons, feedback, and tips per version | 4 | pending |
| CONT-04 | Simulated AI output preview per version | 4 | pending |
| CONT-05 | Difficulty levels and learning path | 3 | pending |
| CONT-06 | Previous/next navigation between versions | 4 | pending |
| CONT-07 | Refinement-focused pedagogy | 3 | pending |
| PRAC-01 | Practice sandbox with live AI streaming | 8 | pending |
| PRAC-02 | AI feedback with improvement suggestions | 8 | pending |
| PRAC-03 | Visible scoring rubric | 9 | pending |
| PRAC-04 | Scoring criteria with explanations | 9 | pending |
| PRAC-05 | Rate limiting and cost controls | 7 | pending |
| PRAC-06 | Provider-agnostic AI via Vercel AI SDK | 7 | pending |
| PERS-01 | Bookmark favorite examples | 6 | pending |
| PERS-02 | Personal notes on examples | 6 | pending |
| PERS-03 | Personal collection view | 6 | pending |
| SRCH-01 | Search examples by keyword | 5 | pending |
| SRCH-02 | Filter by category and difficulty | 5 | pending |
| SRCH-03 | Copy prompt to clipboard | 5 | pending |
| I18N-01 | English and Norwegian UI text | 10 | pending |
| I18N-02 | Language switcher with persisted choice | 1 | pending |
| I18N-03 | Bilingual curated content (natively authored) | 10 | pending |
| I18N-04 | i18n architecture supports new languages without code changes | 1 | pending |
| AUTH-01 | Shared password protection | 2 | pending |
| AUTH-02 | 7-day session cookie | 2 | pending |
| AUTH-03 | Server-side AI API calls (keys never exposed) | 2, 7 | pending |
| INFR-01 | Responsive design (desktop, tablet, mobile) | 11 | pending |
| INFR-02 | Deployed to Vercel | 12 | pending |
| INFR-03 | Content as typed TypeScript files | 3 | pending |
| INFR-04 | User state in localStorage with namespaced keys | 6 | pending |

---
*Last updated: 2026-02-14 after roadmap creation*
