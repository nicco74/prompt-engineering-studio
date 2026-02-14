# Feature Landscape

**Domain:** Interactive prompt engineering learning platform for non-technical team members
**Researched:** 2026-02-14
**Overall confidence:** MEDIUM — Based on analysis of 10+ existing platforms; market is fragmented across education platforms and professional tools, so some categorizations are judgment calls.

---

## Table Stakes

Features users expect. Missing = product feels incomplete or amateurish.

| # | Feature | Why Expected | Complexity | Dependencies | Notes |
|---|---------|--------------|------------|--------------|-------|
| TS-1 | **Curated prompt examples with before/after comparison** | Every learning platform (LearnPrompting, SheetPrompt, Anthropic tutorial) shows good vs. bad prompts side by side. Users cannot learn prompting without seeing concrete examples of what works and what does not. | Medium | None | SheetPrompt does this well with "Bad Prompt / Improved Prompt / Result Comparison" format. This is the core content asset — quality here determines platform value. |
| TS-2 | **Step-by-step refinement analysis** | Showing WHY a prompt improved (not just that it did) is what separates a learning tool from a prompt gallery. Anthropic's tutorial, Mindstone sandbox, and business courses all walk through the reasoning behind improvements. | Medium | TS-1 | Each example needs annotation explaining what changed and why. This is editorial work, not engineering complexity. |
| TS-3 | **Practice sandbox with live AI interaction** | Mindstone Prompt Sandbox, OpenAI Playground, Anthropic tutorial all provide a space to write prompts and see AI responses. Users expect to practice, not just read. Non-negotiable for any "interactive" learning claim. | High | API integration with LLM provider | Core engineering challenge. Requires LLM API calls, response streaming, error handling, rate limiting, cost management. |
| TS-4 | **AI-powered feedback on user prompts** | Mindstone scores prompts on specificity/clarity/relevancy/practicality/feasibility. Codecademy provides AI Learning Assistant feedback. Users expect to know if their prompt is good, not just see the AI response. | High | TS-3 | Can be implemented as a secondary LLM call that evaluates the user's prompt against a rubric. The rubric design (scoring criteria) is the hard part, not the engineering. |
| TS-5 | **Structured learning path with progressive difficulty** | Every course platform (LearnPrompting, Codecademy, Coursera, Prompt Engineering Institute) organizes content from beginner to advanced. Users need to know where to start and what comes next. | Low | TS-1 | Straightforward content organization. Use difficulty tags (beginner/intermediate/advanced) and a recommended order. |
| TS-6 | **Real work scenario categories** | Business courses (Global Knowledge, Infinity Training, Emory) all organize by work task: emails, reports, meeting notes, content creation, data analysis. Non-technical users need to see THEIR work reflected. | Low | TS-1 | Categories should match the target audience's daily tasks: content writing, business docs, internal comms, data summarization, etc. |
| TS-7 | **Progress tracking** | Mindstone tracks prompt level over time. Codecademy tracks course completion. LearnPrompting tracks modules completed. Users expect to see how far they have come. | Medium | TS-3, TS-5 | Track: examples studied, exercises completed, prompt scores over time. Simple state management, but needs persistent storage. |
| TS-8 | **Mobile-responsive design** | Standard expectation for any web application in 2026. Team members may learn on different devices. | Medium | None | Not a feature per se, but missing it makes the product feel broken. Build responsive from day one. |
| TS-9 | **Search and filtering** | Users need to find examples and saved prompts by category, scenario type, difficulty, or keyword. Any content library without search feels frustrating. | Low | TS-1 | Basic text search + category filters. Does not need to be sophisticated. |

---

## Differentiators

Features that set this product apart. Not expected by default, but create competitive advantage for this specific use case (small non-technical team, EN + NO bilingual).

| # | Feature | Value Proposition | Complexity | Dependencies | Notes |
|---|---------|-------------------|------------|--------------|-------|
| DF-1 | **Bilingual content (EN + NO)** | No existing prompt engineering learning platform serves Norwegian speakers. LearnPrompting supports 9 languages but Norwegian is not one. This is a genuine gap in the market for Scandinavian teams. | High | TS-1, TS-2 | All curated content needs dual-language versions. UI chrome needs i18n. The hard part is creating quality Norwegian prompt examples — direct translation of English examples will produce awkward prompts because prompting conventions differ by language. Norwegian examples should be authored natively, not translated. |
| DF-2 | **Refinement-focused pedagogy (not technique taxonomy)** | Most platforms (LearnPrompting, Codecademy, Prompt Engineering Institute) teach TECHNIQUES (zero-shot, few-shot, chain-of-thought). This platform teaches REFINEMENT PROCESS — how to iteratively improve a prompt through observation and adjustment. This is far more useful for non-technical users who do not need to know technique names. | Low | TS-1, TS-2 | This is a content/pedagogical decision, not an engineering feature. Structure examples around "Draft 1 -> observe problem -> Draft 2 -> observe improvement -> Draft 3" rather than "here is the few-shot technique." |
| DF-3 | **Bookmarks and personal notes on examples** | No learning platform found offers this. LearnPrompting and Codecademy are consume-only. Allowing users to annotate examples with their own insights creates personal learning artifacts and increases retention. | Low | TS-1, TS-7 | Simple: bookmark flag + free-text note per example. Store per-user. Low engineering cost, high learning value. |
| DF-4 | **Personal saved prompts library** | PromptDrive and TeamAI offer this as standalone products, but no LEARNING platform integrates a personal prompt library. Bridging learning and daily use (save what you learn for later reuse) increases long-term engagement. | Medium | TS-3, TS-9 | Users save prompts they craft during practice sessions. Add tagging, categorization, and search. The bridge between "learning tool" and "daily productivity tool" is the differentiator. |
| DF-5 | **Team-aware features (shared library, team progress)** | Built specifically for a small team (2-5 people). TeamAI and PromptDrive serve teams but are not learning platforms. No learning platform found offers team-level features like shared prompt libraries or team progress dashboards. | Medium | DF-4, TS-7 | Small scope: shared prompt library visible to all team members, team progress overview. Do NOT build complex permissions, roles, or enterprise admin features — the team is 2-5 people. |
| DF-6 | **Contextual scoring rubric visible to user** | Mindstone scores prompts but the rubric is somewhat opaque. Making the scoring criteria explicit and educational (showing users WHAT is being evaluated and WHY) turns the feedback mechanism itself into a teaching tool. | Medium | TS-4 | Display the rubric alongside scores: "Specificity: 3/5 — Your prompt did not specify the audience. Try adding who this is for." The rubric becomes a learning framework users internalize. |
| DF-7 | **Work-scenario prompt templates** | Starter templates for common work tasks (draft an email, summarize a meeting, write a proposal) that users can modify and learn from. Bridges the gap between "learning" and "doing real work." | Low | TS-6 | Curated templates with annotations explaining why they are structured the way they are. Users clone and modify rather than starting from scratch. |

---

## Anti-Features

Features to explicitly NOT build. Each would add complexity without serving the core mission.

| # | Anti-Feature | Why Avoid | What to Do Instead |
|---|--------------|-----------|-------------------|
| AF-1 | **Multi-model comparison / model battleground** | PromptPerfect and enterprise tools offer side-by-side model comparison. This is for power users optimizing production prompts, not for non-technical learners discovering how to write good prompts. Adds massive API cost and confusing UX. | Pick one LLM for the sandbox. Teach principles that work across models. Mention model differences in content, not tooling. |
| AF-2 | **Prompt optimization engine (auto-improve)** | PromptPerfect's core feature. If the AI rewrites your prompt for you, you learn nothing. Defeats the entire pedagogical purpose. | Show users HOW to improve their own prompts through the scoring rubric and worked examples. The learning IS the manual refinement. |
| AF-3 | **Certification / badges / gamification** | IBM, Coursera, Prompt Engineering Institute all offer certifications. For a 2-5 person team, nobody is building a resume with this. Certification infrastructure is heavy (assessment design, credential management, verification). Gamification (points, leaderboards, streaks) can feel patronizing for adult professionals. | Simple progress tracking (modules completed, practice sessions done). If the team wants proof of completion, a basic completion indicator per module is sufficient. |
| AF-4 | **Community features (forums, Discord, social)** | LearnPrompting has 40K Discord members. For 2-5 people, a forum is a ghost town. Community features require critical mass to be valuable. | The team already communicates through existing channels. If they want to discuss prompts, they will use Slack/Teams/email. Do not build a community platform. |
| AF-5 | **Video content / recorded lectures** | LearnPrompting and Coursera courses use video heavily. Video is expensive to produce, impossible to update quickly, hard to localize to Norwegian, and unnecessary when the content is interactive text + practice. | Text-based lessons with interactive examples. If a concept needs visual explanation, use annotated screenshots or diagrams, not video. |
| AF-6 | **Prompt version control / deployment / API** | PromptLayer, Langfuse, and enterprise platforms offer Git-style versioning and REST API deployment. This is production infrastructure, not learning tooling. | Simple save/edit for personal prompt library. No versioning, no deployment, no API. |
| AF-7 | **Advanced technique taxonomy (CoT, ReAct, Tree-of-Thought, etc.)** | LearnPrompting and technical courses teach 20+ named techniques. Non-technical users do not need to know "chain-of-thought" by name. Teaching technique names creates jargon barriers. | Teach the PRINCIPLES behind techniques through worked examples. Show "break your request into steps" rather than "use chain-of-thought prompting." Users learn the skill without the vocabulary. |
| AF-8 | **Multi-LLM provider support** | Prompts.ai supports 35+ models. Unnecessary complexity for a learning tool. Each provider has different APIs, pricing, and behavior. | Single provider (likely OpenAI or Anthropic). Teach transferable principles. |
| AF-9 | **Image/audio/multimodal prompt engineering** | Some platforms cover Midjourney, DALL-E, Whisper prompting. The target audience is writing text prompts for text tasks (emails, docs, comms). Multimodal adds scope without serving the core need. | Keep scope to text-in, text-out. Mention multimodal capabilities exist in content if relevant, but do not build tooling for it. |
| AF-10 | **Admin dashboard / analytics / LMS features** | Enterprise learning platforms offer admin views, user management, assignment tracking. For 2-5 people, this is overhead. | Simple team progress page that any team member can see. No admin/learner role separation. |

---

## Feature Dependencies

```
TS-1 (Curated examples)
  |
  +---> TS-2 (Refinement analysis) — requires examples to annotate
  |       |
  |       +---> DF-2 (Refinement pedagogy) — content structure decision
  |
  +---> TS-5 (Learning path) — requires examples to organize into paths
  |
  +---> TS-6 (Scenario categories) — requires examples to categorize
  |
  +---> TS-9 (Search/filter) — requires content to search
  |
  +---> DF-1 (Bilingual) — requires examples to localize
  |
  +---> DF-3 (Bookmarks/notes) — requires examples to bookmark
  |
  +---> DF-7 (Templates) — requires example scenarios as basis

TS-3 (Practice sandbox)
  |
  +---> TS-4 (AI feedback) — requires sandbox to generate prompts to evaluate
  |       |
  |       +---> DF-6 (Visible rubric) — extends feedback with transparency
  |
  +---> DF-4 (Saved prompts library) — requires sandbox to create prompts
  |       |
  |       +---> DF-5 (Team features) — extends personal library to team

TS-7 (Progress tracking)
  |
  +---> DF-5 (Team progress) — extends personal to team view
```

**Critical path:** TS-1 (content) and TS-3 (sandbox) are the two independent foundation pillars. Everything else depends on one or both.

---

## MVP Recommendation

**Prioritize (Phase 1):**
1. **TS-1 + TS-2**: Curated examples with refinement analysis — this IS the product. Without quality content, nothing else matters.
2. **TS-5 + TS-6**: Learning path structure and scenario categories — organize the content so users can navigate it.
3. **TS-9**: Search and filtering — basic content discovery.
4. **DF-2**: Refinement-focused pedagogy — a content decision that should be made before authoring examples, not after.
5. **DF-3**: Bookmarks and notes — low complexity, high value.

**Prioritize (Phase 2):**
1. **TS-3**: Practice sandbox — the second pillar. Significant engineering work (LLM API integration).
2. **TS-4 + DF-6**: AI feedback with visible rubric — makes the sandbox educational, not just a chatbot.
3. **TS-7**: Progress tracking — meaningful once there is content to study and exercises to complete.
4. **DF-4**: Saved prompts library — natural extension of sandbox.

**Prioritize (Phase 3):**
1. **DF-1**: Bilingual EN + NO — high complexity, high value. Better to nail the English content first, then localize with quality Norwegian examples (not just translations).
2. **DF-5**: Team features — shared library, team progress. Only valuable once individuals are using the platform.
3. **DF-7**: Work-scenario templates — natural extension once scenario categories are proven.

**Defer indefinitely:** All anti-features (AF-1 through AF-10).

---

## Sources

### Platforms Analyzed
- [LearnPrompting](https://learnprompting.org/) — Largest open-source prompt engineering guide, 60+ modules, 9 languages, 40K Discord community
- [Prompt Engineering Institute](https://promptengineering.org/) — Text-based courses, no-code-required, certification program
- [PromptPerfect by Jina AI](https://promptperfect.jina.ai/) — Automatic prompt optimization, model battleground, multi-model support
- [Mindstone Prompt Sandbox](https://help.mindstone.com/en/articles/9418846-what-is-the-mindstone-prompt-sandbox) — Interactive practice with scoring (specificity, clarity, relevancy, practicality, feasibility), virtual coach
- [Codecademy Prompt Engineering](https://www.codecademy.com/learn/learn-prompt-engineering) — Interactive browser-based learning, AI Learning Assistant
- [SheetPrompt](https://sheetprompt.com/prompt-engineering-guide) — Before/after examples, interactive exercises, fill-in-the-blank, drag-and-drop frameworks
- [Anthropic Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) — Jupyter notebook-based, 9 chapters with exercises and playground
- [PromptLayer](https://www.promptlayer.com/) — Prompt management CMS, non-technical editor, version control, collaboration
- [PromptDrive](https://promptdrive.ai/) — Team prompt organization, sharing, collaboration
- [TeamAI](https://teamai.com/) — Team prompt libraries with department-level organization

### Business-Focused Courses Analyzed
- [Global Knowledge - Quick Start to Prompt Engineering for Business Users](https://www.globalknowledge.com/us-en/course/194386/quick-start-to-prompt-engineering-for-everyday-business-users/) — Workshop format with real business scenario labs
- [Emory Goizueta - AI Prompt Engineering Executive Education](https://goizueta.emory.edu/executive-education/short-courses/ai-prompt-engineering) — Hands-on refinement for business scenarios
- [Coursera Prompt Engineering for ChatGPT](https://www.coursera.org/learn/prompt-engineering) — Vanderbilt University, structured foundation

### Evaluation & Scoring References
- [Maxim AI - Prompt Evaluation Frameworks](https://www.getmaxim.ai/articles/prompt-evaluation-frameworks-measuring-quality-consistency-and-cost-at-scale/) — Rubric design for quality, consistency, cost
- [EHGA - Measuring Prompt Quality Rubrics](https://ehga.org/measuring-prompt-quality-rubrics-for-completeness-and-clarity) — Rubric criteria: clarity, specificity, context, structure

### Confidence Notes
- **Table stakes features:** HIGH confidence — consistent across all platforms analyzed
- **Differentiators:** MEDIUM confidence — based on gap analysis (what competitors do NOT offer). Norwegian language gap verified across all major platforms.
- **Anti-features:** HIGH confidence — clear pattern of enterprise/power-user features that do not serve non-technical small-team learners
