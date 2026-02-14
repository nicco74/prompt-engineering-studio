import type { Example } from "../../types";

/**
 * Internal Communications — Advanced
 *
 * Scenario: A team lead needs to write a summary of a cross-functional
 * planning meeting and distribute it to attendees and key stakeholders
 * who could not attend. The refinement journey teaches: capture decisions
 * (not discussions), assign owners, and make the summary a reference
 * document people actually use.
 */
const example: Example = {
  id: "meeting-summary",
  slug: "meeting-summary",
  title: "Cross-Functional Meeting Summary",
  description:
    "Summarize a cross-functional planning meeting for attendees and absent stakeholders, learning how to capture decisions, assign owners, and create a useful reference document.",
  category: "internal-comms",
  difficulty: "advanced",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The generic request ────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a summary of our team meeting.",
      changes: "Initial prompt — no meeting details, agenda, or outcomes.",
      pros: [
        "Clear about the document type (meeting summary)",
        "Quick to type",
      ],
      cons: [
        "No information about what the meeting was about",
        "No attendees, decisions, or action items",
        "No distinction between discussion and decisions",
        "The AI will fabricate an entire meeting from scratch",
      ],
      feedback:
        "A meeting summary without meeting content is pure fiction. The AI has no choice but to make everything up. Give it the actual discussion points, decisions, and action items.",
      why:
        "Meeting summaries are reference documents — people check them weeks later to confirm what was decided. If the AI invents the content, the summary is worse than useless because it documents decisions that were never made.",
      tips: [
        "List the key topics that were discussed",
        "Note any decisions that were made",
        "Include action items with owners if you have them",
      ],
      aiOutput:
        "Meeting Summary\n\nDate: [Date]\nAttendees: Team members\n\nThe team met to discuss ongoing projects and priorities. Several topics were covered, including project updates, upcoming deadlines, and resource allocation.\n\nKey points discussed:\n- Project progress is going well\n- The team is on track to meet deadlines\n- Resources are being allocated effectively\n\nAction Items:\n- Continue working on current projects\n- Follow up on outstanding items\n\nNext meeting: TBD",
    },

    // ── Step 2 — Add actual meeting content ─────────────────────────
    {
      version: 2,
      prompt:
        "Write a summary of our Q1 product planning meeting held on February 10, 2026. Attendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing).\n\nTopics discussed:\n- Whether to prioritize the mobile app or the API redesign for Q1\n- The new onboarding flow design that Priya presented\n- Marketing launch timeline for the mobile app\n- Engineering capacity concerns — James mentioned the team is at 90% allocation",
      changes:
        "Added: meeting name and date, named attendees with roles, four specific discussion topics, and a capacity concern.",
      pros: [
        "Names and roles help the reader know who was responsible for what",
        "Specific topics give the AI real content to summarize",
        "The capacity concern adds realistic nuance",
        "Dated meeting helps with record-keeping",
      ],
      cons: [
        "Lists topics discussed but not what was actually decided",
        "No action items with owners and deadlines",
        "Does not indicate which topics were resolved and which are still open",
        "No mention of who should receive this summary beyond attendees",
      ],
      feedback:
        "The meeting details are a major improvement — we can now see what happened. But the biggest gap is: what was decided? Meeting summaries should focus on outcomes, not just topics. 'We discussed X' is less useful than 'We decided Y.'",
      why:
        "Discussion topics tell you what was talked about. Decisions tell you what was agreed. When people revisit a meeting summary three weeks later, they are looking for decisions and commitments, not a replay of the conversation.",
      tips: [
        "For each topic, note the decision or outcome, not just the discussion",
        "Add action items with a named owner and a due date",
        "Mark any unresolved items as 'open' with a plan for resolution",
      ],
      aiOutput:
        "Meeting Summary: Q1 Product Planning\n\nDate: February 10, 2026\nAttendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing)\n\nDiscussion Topics:\n\n1. Mobile App vs. API Redesign Priority\nThe team discussed whether to prioritize the mobile app or the API redesign for Q1. Both were considered important. There were different perspectives on the urgency of each.\n\n2. New Onboarding Flow\nPriya presented the new onboarding flow design. The team provided feedback and discussed potential improvements.\n\n3. Marketing Launch Timeline\nMarcus shared thoughts on the marketing launch timeline for the mobile app. The timeline is still being finalized.\n\n4. Engineering Capacity\nJames noted that the engineering team is at 90% allocation. This may impact the ability to take on additional work.\n\nNext Steps:\n- Continue planning for Q1 priorities\n- Follow up on onboarding design feedback\n- Finalize marketing timeline",
    },

    // ── Step 3 — Focus on decisions and action items ─────────────────
    {
      version: 3,
      prompt:
        "Write a meeting summary for our Q1 product planning meeting held February 10, 2026. Send to attendees and CC our VP of Product (Lisa) who could not attend.\n\nAttendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing).\n\nStructure the summary as:\n1. One-sentence meeting purpose\n2. Key Decisions (what was agreed):\n   - Decision: Prioritize mobile app over API redesign for Q1. Rationale: mobile has 3x more user requests and API can wait until Q2 without revenue impact.\n   - Decision: Approve Priya's onboarding flow v2 with one change — add a skip option on the tutorial screen.\n3. Action Items (table format: action, owner, due date):\n   - James to provide mobile app dev estimate by Feb 14\n   - Priya to update onboarding mockups with skip option by Feb 12\n   - Marcus to draft mobile app launch plan by Feb 17\n   - Sarah to update the Q1 roadmap and share with Lisa by Feb 13\n4. Open Items (unresolved):\n   - Engineering capacity: James's team is at 90% allocation. He will assess whether a contractor is needed and report back Feb 14.\n5. Next meeting: February 17, 2026, 10am — review mobile app estimates\n\nTone: neutral and factual. Keep it under 300 words.",
      changes:
        "Added: summary distribution (CC the absent VP), clear Decisions section with rationale, Action Items with owners and due dates, Open Items section for unresolved topics, next meeting date, and a word limit.",
      pros: [
        "Decisions section clearly separates what was agreed from what was discussed",
        "Rationale for each decision helps absent stakeholders understand the 'why'",
        "Action items have named owners and specific dates — full accountability",
        "Open items prevent unresolved topics from falling through the cracks",
        "Next meeting date creates continuity",
        "CCing the VP ensures leadership stays informed without attending every meeting",
      ],
      cons: [
        "Could add a context line for the VP who was not present",
        "Does not highlight any risks or dependencies between action items",
      ],
      feedback:
        "This is a meeting summary that people will actually reference. The decisions-and-actions structure means anyone can scan it in 30 seconds and know exactly what happened and what they need to do. One more refinement: add a brief context opener for people who were not in the room.",
      why:
        "The shift from 'topics discussed' to 'decisions made' transforms a meeting summary from a diary entry into a reference document. Action items with owners and dates create accountability. Open items ensure nothing gets quietly forgotten.",
      tips: [
        "Lead with decisions, not discussions — people check summaries to confirm what was agreed",
        "Every action item needs three things: what, who, and when",
        "Always include an 'Open Items' section — it shows intellectual honesty about what is unresolved",
        "CC stakeholders who could not attend to keep them informed without scheduling more meetings",
      ],
      aiOutput:
        "Subject: Meeting Summary — Q1 Product Planning (Feb 10)\n\nHi all (CC: Lisa),\n\nPurpose: Finalize Q1 product priorities and approve the new onboarding flow design.\n\nKey Decisions\n\n1. Mobile app prioritized over API redesign for Q1. Mobile has 3x more user requests, and the API redesign can be deferred to Q2 without revenue impact.\n2. Onboarding flow v2 approved with one modification: add a skip option on the tutorial screen to reduce friction for returning users.\n\nAction Items\n\n| Action | Owner | Due |\n|--------|-------|-----|\n| Provide mobile app dev estimate | James | Feb 14 |\n| Update onboarding mockups with skip option | Priya | Feb 12 |\n| Draft mobile app launch plan | Marcus | Feb 17 |\n| Update Q1 roadmap and share with Lisa | Sarah | Feb 13 |\n\nOpen Items\n\n- Engineering capacity: Team is at 90% allocation. James will assess whether a contractor is needed and report back by Feb 14.\n\nNext Meeting\nFebruary 17, 2026, 10:00 AM — Review mobile app estimates and updated roadmap.\n\nLet me know if I missed anything.\n\nBest,\n[Your Name]",
    },

    // ── Step 4 — Add context for absent readers and dependencies ────
    {
      version: 4,
      prompt:
        "Write a meeting summary for our Q1 product planning meeting held February 10, 2026. Send to attendees and CC our VP of Product (Lisa) who could not attend.\n\nAttendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing).\n\nStructure the summary as:\n1. Context for absent stakeholders (1-2 sentences): This was our quarterly planning meeting to decide Q1 product priorities. We had four agenda items: Q1 priority call, onboarding flow review, marketing timeline, and engineering capacity.\n2. Key Decisions (with brief rationale for each):\n   - Prioritize mobile app over API redesign for Q1. Rationale: mobile has 3x more user requests; API can shift to Q2 without revenue impact.\n   - Approve Priya's onboarding flow v2 with one change: add a skip option on the tutorial screen for returning users.\n3. Action Items (table: action, owner, due date, dependency):\n   - James: provide mobile app dev estimate — due Feb 14 — no dependencies\n   - Priya: update onboarding mockups with skip option — due Feb 12 — no dependencies\n   - Marcus: draft mobile app launch plan — due Feb 17 — depends on James's estimate\n   - Sarah: update Q1 roadmap and share with Lisa — due Feb 13 — depends on James's estimate\n4. Open Items:\n   - Engineering capacity at 90%. James assessing contractor need — update by Feb 14. NOTE: if a contractor is needed, budget approval from Lisa is required, which may add 1-2 weeks.\n5. Risk: Marcus's launch plan and Sarah's roadmap both depend on James's estimate. If that estimate is delayed, both downstream items slip.\n6. Next meeting: February 17, 10am — review estimates and roadmap\n\nTone: neutral, factual, concise. Under 300 words. Use a table for action items. Bold the decisions.",
      changes:
        "Added: context section for absent stakeholders, dependency tracking in action items, an explicit risk callout for the dependency chain, escalation path for the open item (Lisa's budget approval), and formatting instructions (bold decisions, table).",
      pros: [
        "Context section ensures absent stakeholders (like Lisa) understand the meeting without needing a recap call",
        "Dependency tracking reveals which items are connected — preventing silent cascading delays",
        "Risk callout proactively surfaces the most likely failure mode (James's estimate blocking two tasks)",
        "Escalation path (budget approval from Lisa) surfaces a potential process bottleneck early",
        "Formatting instructions (bold, table) make the output scannable and professional",
        "Complete accountability chain: every item has a who, when, and what-depends-on-it",
      ],
      cons: [
        "For recurring meetings, this level of detail can be templated to save prompt-writing time",
        "Very detailed prompts require accurate information — double-check dates and dependencies",
      ],
      feedback:
        "This is an exemplary meeting summary prompt. It produces a document that serves as both a record of what happened and a project management tool. The dependency tracking and risk callout are the kind of proactive thinking that prevents problems two weeks from now.",
      why:
        "Meeting summaries that track dependencies transform from passive records into active project management tools. By making the dependency chain explicit (James's estimate blocks Marcus and Sarah), you surface risks before they become surprises. The context section for absent stakeholders prevents the 'wait, what happened in that meeting?' Slack message from your VP on Monday morning.",
      tips: [
        "Add a dependency column to action items — it takes 10 seconds and prevents cascading delays",
        "Always write 1-2 context sentences for people who were not present",
        "Call out the single biggest risk explicitly — do not bury it in the action items",
        "Use the meeting summary as a living document: check off items as they are completed",
        "Save this structure as a template — after the first one, each summary takes 5 minutes to prompt",
      ],
      aiOutput:
        "Subject: Meeting Summary — Q1 Product Planning (Feb 10)\n\nHi all (CC: Lisa),\n\nContext: This was our quarterly planning meeting to finalize Q1 product priorities. We covered four items: the Q1 priority call between mobile app and API redesign, Priya's onboarding flow proposal, marketing launch timing, and engineering capacity.\n\n**Key Decisions**\n\n1. **Prioritize mobile app over API redesign for Q1.** Mobile has 3x more user requests in our backlog. The API redesign shifts to Q2 with no expected revenue impact.\n2. **Approve onboarding flow v2 with one change: add a skip option on the tutorial screen** for returning users who do not need the walkthrough.\n\nAction Items\n\n| Action | Owner | Due | Depends On |\n|--------|-------|-----|------------|\n| Provide mobile app dev estimate | James | Feb 14 | None |\n| Update onboarding mockups (add skip) | Priya | Feb 12 | None |\n| Draft mobile app launch plan | Marcus | Feb 17 | James's estimate |\n| Update Q1 roadmap, share with Lisa | Sarah | Feb 13 | James's estimate |\n\nOpen Items\n\n- Engineering capacity is at 90%. James will assess whether a contract engineer is needed and report back by Feb 14. Note: if a contractor is required, budget approval from Lisa adds an estimated 1-2 weeks to the process.\n\nRisk\nMarcus's launch plan and Sarah's roadmap update both depend on James's dev estimate (due Feb 14). If that estimate is delayed, both downstream deliverables will slip.\n\nNext Meeting\nFebruary 17, 2026, 10:00 AM — Review mobile app estimates and updated Q1 roadmap.\n\nPlease reply if I have missed or misrepresented anything.\n\nBest,\n[Your Name]",
    },
  ],
};

export default example;
