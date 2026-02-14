import type { Example } from "../../types";

/**
 * Internal Communications — Beginner
 *
 * Scenario: A project lead needs to write a weekly status update email
 * to their manager and cross-functional stakeholders. The refinement
 * journey teaches: be specific about progress, flag risks early, and
 * make the reader's next action obvious.
 */
const example: Example = {
  id: "project-status-update",
  slug: "project-status-update",
  title: "Weekly Project Status Update",
  description:
    "Write a weekly status update email for stakeholders, learning how specificity and clear risk flagging make internal communications more effective.",
  category: "internal-comms",
  difficulty: "beginner",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The empty update ───────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a project status update email.",
      changes: "Initial prompt — no project details, audience, or timeframe.",
      pros: [
        "Correctly identifies the document type (status update email)",
        "Simple and quick to write",
      ],
      cons: [
        "No project name or description",
        "No information about what happened this week",
        "No audience specified (manager, team, executives?)",
        "Missing any mention of blockers, risks, or next steps",
      ],
      feedback:
        "Status updates exist so stakeholders do not have to ask 'how is the project going?' If your update does not answer that question with specifics, it has not done its job.",
      why:
        "A status update without project context forces the AI to invent a fake project. The result is useless because it contains no real information. The AI needs facts to summarize — it cannot create them from nothing.",
      tips: [
        "Name the project and what it is about",
        "List 2-3 things that happened this week",
        "Mention who will read this email and what they care about",
      ],
      aiOutput:
        "Subject: Project Status Update\n\nHi team,\n\nHere is a quick update on the project.\n\nThings are progressing well. The team has been working hard on various tasks and we are making good progress toward our goals. There are no major issues to report at this time.\n\nPlease let me know if you have any questions.\n\nBest,\n[Your Name]",
    },

    // ── Step 2 — Add project context and accomplishments ────────────
    {
      version: 2,
      prompt:
        "Write a weekly status update email for the website migration project. We are moving our company website from WordPress to Next.js. This week we completed the homepage redesign and finished migrating 40 of 120 blog posts. The audience is my manager and the marketing team lead.",
      changes:
        "Added: project name and description (website migration), two specific accomplishments (homepage redesign, 40/120 blog posts migrated), and the audience (manager + marketing lead).",
      pros: [
        "Names the project and explains what it involves",
        "Lists specific, measurable accomplishments",
        "The 40/120 ratio gives a clear sense of overall progress",
        "Identifies who will read the email",
      ],
      cons: [
        "No mention of blockers or risks — is everything truly smooth?",
        "Missing next week's plan — what should the reader expect?",
        "No timeline context — is the project on schedule or behind?",
        "No specific dates or deadlines referenced",
      ],
      feedback:
        "The accomplishments are concrete and measurable — that is a big improvement. But stakeholders also need to know: are we on track, what is coming next, and do you need anything from them?",
      why:
        "Specific accomplishments give the reader confidence that work is actually happening. The 40/120 ratio is particularly useful because it lets the reader gauge progress without asking follow-up questions. Now we need to add the forward-looking elements.",
      tips: [
        "Add whether the project is on track, at risk, or behind schedule",
        "Include 2-3 items planned for next week",
        "Mention any blockers or decisions needed from the reader",
      ],
      aiOutput:
        "Subject: Website Migration — Weekly Update\n\nHi Sarah and David,\n\nHere is this week's update on the website migration project (WordPress to Next.js).\n\nCompleted This Week:\n- Finished the homepage redesign in Next.js\n- Migrated 40 of 120 blog posts to the new platform\n\nThe team has made solid progress and we are continuing to work through the blog migration. I will send another update next week.\n\nLet me know if you have any questions.\n\nBest,\n[Your Name]",
    },

    // ── Step 3 — Add status, risks, and next steps ──────────────────
    {
      version: 3,
      prompt:
        "Write a concise weekly status update email for the website migration project (WordPress to Next.js). The audience is my manager (Sarah) and the marketing team lead (David).\n\nFormat the email with these sections:\n1. Overall status: ON TRACK — we are 4 weeks into an 8-week timeline\n2. Completed this week: homepage redesign completed and QA-approved; migrated 40 of 120 blog posts (on pace to finish all by week 6)\n3. Planned for next week: migrate 30 more blog posts; begin contact form and search functionality\n4. Risks/blockers: 15 blog posts have embedded videos hosted on a legacy CDN that may need to be re-hosted before migration — I need David's input on whether to re-host on our new CDN or keep the legacy links\n5. Decision needed: David, can you confirm the video hosting approach by Wednesday so it does not delay the blog migration?\n\nKeep it under 200 words. Tone: professional, direct, no fluff.",
      changes:
        "Added: explicit status (ON TRACK), timeline context (week 4 of 8), structured sections (completed, planned, risks, decision needed), a specific blocker with a named person and deadline, and a word limit.",
      pros: [
        "Overall status gives an instant read — the reader knows in one word whether to worry",
        "Timeline context (week 4 of 8) shows exactly where the project stands",
        "Specific risk (legacy CDN videos) shows proactive project management",
        "Named decision with a deadline ('David, by Wednesday') makes the email actionable",
        "Under-200-words keeps it scannable for busy stakeholders",
      ],
      cons: [
        "Could include a brief mention of the project's end goal or launch date for context",
        "Might benefit from a quick summary line at the top for people who only read the first sentence",
      ],
      feedback:
        "This is a strong status update prompt. It covers progress, plans, risks, and required actions. The named decision request is the most important addition — it turns a passive update into an active communication tool.",
      why:
        "The best status updates answer four questions: Where are we? What did we do? What is next? Do we need anything? This prompt covers all four. The specific decision request with a deadline ensures the email drives action rather than just informing.",
      tips: [
        "Always include a one-word status (ON TRACK, AT RISK, BLOCKED) at the top",
        "Name the person and specify a date when you need a decision",
        "Keep status updates short — if people want details, they will ask",
        "Separate 'risks' from 'blockers': a risk might happen, a blocker is happening now",
      ],
      aiOutput:
        "Subject: Website Migration — Week 4 of 8 — ON TRACK\n\nHi Sarah and David,\n\nOverall Status: ON TRACK\nWe are 4 weeks into the 8-week migration from WordPress to Next.js.\n\nCompleted This Week\n- Homepage redesign completed and passed QA\n- Migrated 40 of 120 blog posts to Next.js (on pace to finish all posts by week 6)\n\nPlanned for Next Week\n- Migrate 30 additional blog posts\n- Begin building the contact form and search functionality\n\nRisks\n15 blog posts contain embedded videos hosted on a legacy CDN. These videos need to be either re-hosted on our new CDN or kept as legacy links. This decision affects how we migrate those posts.\n\nDecision Needed\nDavid — can you confirm the video hosting approach by Wednesday? If we do not have a direction by then, it may delay the remaining blog migration.\n\nHappy to jump on a quick call if it is easier to discuss.\n\nBest,\n[Your Name]",
    },

    // ── Step 4 — Add summary line and progress visual ───────────────
    {
      version: 4,
      prompt:
        "Write a concise weekly status update email for the website migration project (WordPress to Next.js, launching March 28). The audience is my manager (Sarah) and the marketing team lead (David).\n\nStart with a one-line summary: 'Migration is on track — homepage live in staging, blog posts 33% complete, one decision needed from David on video hosting.'\n\nThen format the rest as:\n1. Overall status: ON TRACK (week 4 of 8, target launch March 28)\n2. Progress snapshot: Homepage: done. Blog posts: 40/120. Contact form: not started. Search: not started.\n3. Completed this week: homepage redesign QA-approved and deployed to staging; 40 blog posts migrated and verified\n4. Next week: migrate 30 more blog posts; begin contact form and site search\n5. Risk: 15 blog posts have embedded videos on a legacy CDN — need David's decision on re-hosting vs. legacy links\n6. Action required: David, please confirm video hosting approach by Wednesday March 5 to avoid delaying the blog migration\n\nKeep it under 200 words. Tone: professional, direct, collaborative. Use bullet points, not paragraphs.",
      changes:
        "Added: one-line summary at the top, launch date (March 28), progress snapshot showing all workstreams at a glance, specific date for the decision deadline (March 5), and formatting preference (bullets over paragraphs).",
      pros: [
        "One-line summary lets readers get the key message without scrolling",
        "Launch date anchors all progress against the actual deadline",
        "Progress snapshot gives a full picture of every workstream in seconds",
        "Specific calendar date (March 5) is clearer than 'Wednesday' alone",
        "Bullet format matches how stakeholders actually scan emails",
        "Covers the complete status update framework: summary, status, progress, done, next, risk, action",
      ],
      cons: [
        "For very long projects, you may want to link to a project tracker rather than listing all workstreams",
        "Prompt is detailed — consider saving it as a weekly template you fill in each Friday",
      ],
      feedback:
        "Excellent. This prompt produces a status update that any stakeholder can absorb in under 60 seconds. The one-line summary at the top is the most impactful addition — many people will read only that line, and it tells the whole story.",
      why:
        "The one-line summary pattern is borrowed from executive communication: lead with the conclusion, then provide supporting detail. Busy stakeholders often read only the first sentence of an email. If that sentence contains the status, the key metric, and the one action needed, the email has done its job even if no one reads further.",
      tips: [
        "Write the one-line summary last — after you know all the details, distill them into one sentence",
        "A progress snapshot with all workstreams prevents the 'what about X?' follow-up emails",
        "Use actual calendar dates instead of day names — 'March 5' is unambiguous across time zones",
        "Save this prompt as a Friday afternoon template — change the details, keep the structure",
      ],
      aiOutput:
        "Subject: Website Migration — Week 4 of 8 — ON TRACK\n\nMigration is on track — homepage live in staging, blog posts 33% complete, one decision needed from David on video hosting.\n\nOverall Status: ON TRACK (week 4 of 8, target launch March 28)\n\nProgress Snapshot\n- Homepage: Done (in staging)\n- Blog posts: 40/120 migrated\n- Contact form: Not started (planned week 5)\n- Search: Not started (planned week 5)\n\nCompleted This Week\n- Homepage redesign QA-approved and deployed to staging environment\n- 40 blog posts migrated to Next.js and verified for formatting and links\n\nNext Week\n- Migrate 30 additional blog posts\n- Begin contact form and site search functionality\n\nRisk\n- 15 blog posts contain embedded videos hosted on a legacy CDN. These need to be re-hosted on our new CDN or kept as legacy links before we can migrate them.\n\nAction Required\n- David: Please confirm the video hosting approach by Wednesday, March 5. Without a decision by then, the blog migration timeline is at risk.\n\nHappy to discuss in our Monday sync or on a quick call.\n\nBest,\n[Your Name]",
    },
  ],
};

export default example;
