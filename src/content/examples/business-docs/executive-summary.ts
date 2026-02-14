import type { Example } from "../../types";

/**
 * Business Documents — Intermediate
 *
 * Scenario: A product manager needs to write a one-page executive
 * summary for a quarterly business review. The refinement journey
 * teaches: provide data, specify the audience's priorities, and
 * structure output for busy decision-makers.
 */
const example: Example = {
  id: "executive-summary",
  slug: "executive-summary",
  title: "Quarterly Executive Summary",
  description:
    "Write a one-page executive summary for a quarterly business review, learning how audience awareness and data inclusion produce sharper business documents.",
  category: "business-docs",
  difficulty: "intermediate",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The vague request ──────────────────────────────────
    {
      version: 1,
      prompt:
        "Write an executive summary for our quarterly review.",
      changes: "Initial prompt — no data, no context, no audience details.",
      pros: [
        "States the document type (executive summary)",
        "Mentions the occasion (quarterly review)",
      ],
      cons: [
        "No company or product context",
        "No actual data or metrics to summarize",
        "Does not specify who will read it (board, VP, team leads?)",
        "No indication of what the quarter's story was — growth, challenges, pivots?",
      ],
      feedback:
        "An executive summary without data is just an opinion piece. Executives read summaries to make decisions quickly, so every sentence needs to carry weight. Give the AI something concrete to work with.",
      why:
        "Executive audiences are time-poor and detail-hungry. A prompt that lacks specifics forces the AI to invent plausible-sounding but ultimately hollow content. Real data transforms the output from filler into fuel for decisions.",
      tips: [
        "Include 3-5 key metrics from the quarter (revenue, growth, churn, NPS, etc.)",
        "Name the audience — a summary for the board reads differently than one for team leads",
        "Mention the one or two biggest themes of the quarter (growth, cost reduction, new market entry …)",
      ],
      aiOutput:
        "Executive Summary — Q4 Review\n\nThis quarter has been a period of significant progress for our organization. We have achieved several key milestones and continue to build momentum across all departments.\n\nKey highlights include strong performance in sales, continued product development, and improvements in customer satisfaction. Our team has worked diligently to meet our goals and position the company for future growth.\n\nLooking ahead, we remain focused on executing our strategic priorities and delivering value to our stakeholders.\n\nWe recommend continued investment in our core initiatives to maintain this positive trajectory.",
    },

    // ── Step 2 — Add real data and audience ─────────────────────────
    {
      version: 2,
      prompt:
        "Write a one-page executive summary for our Q4 2025 quarterly business review. The audience is our board of directors.\n\nKey metrics:\n- Revenue: $4.2M (up 18% QoQ)\n- New customers: 340 (up 25% QoQ)\n- Churn rate: 5.1% (down from 6.8% in Q3)\n- NPS score: 72\n\nThe main theme this quarter was expanding into the mid-market segment.",
      changes:
        "Added: specific quarter, audience (board of directors), four real metrics with comparisons, and the quarter's main theme.",
      pros: [
        "Real metrics give the AI concrete material to work with",
        "Quarter-over-quarter comparisons provide narrative direction (growth story)",
        "Board audience signals the need for a strategic, high-level tone",
        "The main theme (mid-market expansion) gives the summary a through-line",
      ],
      cons: [
        "Does not explain what drove the improvements (actions taken)",
        "Missing forward-looking elements (next quarter priorities, risks)",
        "No structure guidance — the AI decides the layout",
        "Does not mention any challenges or risks (boards want transparency)",
      ],
      feedback:
        "Now we are getting somewhere. The AI can write about real numbers. But board members also want to know: what did you do to achieve these results, what kept you up at night, and what is the plan for next quarter?",
      why:
        "Data is essential but not sufficient. Executives want the story behind the numbers. Adding cause-and-effect context ('we grew because we did X') and forward-looking plans transforms a data dump into a strategic narrative.",
      tips: [
        "Add 1-2 sentences about what actions drove the results",
        "Include at least one challenge or risk — it builds credibility",
        "Specify the structure: opening summary, key wins, challenges, outlook",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 2025 marked a strong quarter driven by our expansion into the mid-market segment. Below are the key highlights.\n\nFinancial Performance\nRevenue reached $4.2M, an 18% increase quarter-over-quarter. This growth was supported by the addition of 340 new customers, representing a 25% increase from Q3.\n\nCustomer Health\nOur churn rate declined from 6.8% in Q3 to 5.1% in Q4, reflecting improvements in customer retention. Our Net Promoter Score of 72 indicates strong customer satisfaction.\n\nMid-Market Expansion\nOur strategic focus on the mid-market segment has begun to yield results, contributing to both revenue growth and customer acquisition targets.\n\nRecommendation\nWe recommend continuing to invest in mid-market acquisition and retention strategies to maintain this growth trajectory.",
    },

    // ── Step 3 — Add story, structure, and outlook ──────────────────
    {
      version: 3,
      prompt:
        "Write a one-page executive summary (300-400 words) for our Q4 2025 quarterly business review. The audience is our board of directors, who care most about growth trajectory, capital efficiency, and market positioning.\n\nStructure:\n1. Opening paragraph: one-sentence thesis on how the quarter went, followed by the top-line revenue and customer growth numbers\n2. Key wins (3 bullet points): mid-market expansion landed 12 enterprise deals averaging $35K ACV; churn dropped from 6.8% to 5.1% after we launched a dedicated customer success team; NPS hit 72, up from 64\n3. Challenges (2 bullet points): sales cycle for mid-market is 45 days longer than SMB; engineering velocity slowed due to technical debt in the billing system\n4. Outlook for Q1 2026: plan to hire 3 mid-market AEs, begin billing system rewrite, targeting $5M revenue\n\nTone: confident and transparent — do not hide challenges. Use precise language, avoid buzzwords like 'synergy' or 'leverage.'",
      changes:
        "Added: board priorities (growth, capital efficiency, positioning), explicit 4-section structure with specific data per section, challenges with root causes, a forward-looking plan with targets, and tone constraints (no buzzwords).",
      pros: [
        "Structure matches what board members expect to see",
        "Challenges section builds credibility and shows self-awareness",
        "Forward-looking plan gives the board something to evaluate and approve",
        "Anti-buzzword instruction ensures crisp, professional language",
        "Word count keeps it to one page as intended",
      ],
      cons: [
        "Could include a one-line 'ask' — does the team need board approval for anything?",
        "Missing competitive context — how does this position us vs. competitors?",
      ],
      feedback:
        "This is a strong prompt that will produce a board-ready summary. The challenges section is particularly important — boards lose trust when summaries are all good news. One more iteration could add a specific 'ask' to make the document actionable.",
      why:
        "Board members read dozens of documents before each meeting. A clearly structured summary with data, honest challenges, and a forward plan respects their time and earns their trust. The explicit structure ensures the AI does not bury the lead or ramble.",
      tips: [
        "If you need board approval for something (budget, headcount), add it as a final section",
        "Link challenges to solutions — 'we identified X, and our plan is Y' shows leadership",
        "Keep each bullet to 1-2 sentences; boards scan, they do not read long paragraphs",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 2025 was our strongest quarter to date, with revenue reaching $4.2M (up 18% QoQ) and 340 new customers added (up 25% QoQ), driven primarily by our strategic push into the mid-market segment.\n\nKey Wins\n\n- Mid-market expansion delivered 12 enterprise deals at an average ACV of $35K, validating our hypothesis that the product is ready for larger organizations.\n- Customer churn dropped from 6.8% to 5.1% following the launch of a dedicated customer success team in October. Early indicators suggest this trend will continue.\n- Net Promoter Score climbed to 72 (up from 64 in Q3), with mid-market customers rating us particularly well on onboarding experience.\n\nChallenges\n\n- Mid-market sales cycles average 45 days longer than our SMB motion. This creates pipeline forecasting challenges and increases customer acquisition cost.\n- Engineering velocity declined by approximately 15% as the team navigated technical debt in our billing system, which was originally designed for a single pricing tier.\n\nQ1 2026 Outlook\n\nWe are targeting $5M in revenue for Q1 2026. To support this, we plan to hire three mid-market account executives and begin a billing system rewrite that will take approximately two quarters to complete. We expect short-term engineering allocation to shift toward infrastructure, with product velocity recovering by mid-Q2.",
    },

    // ── Step 4 — Add the ask and competitive context ────────────────
    {
      version: 4,
      prompt:
        "Write a one-page executive summary (300-400 words) for our Q4 2025 quarterly business review. The audience is our board of directors, who care most about growth trajectory, capital efficiency, and competitive positioning.\n\nStructure:\n1. Opening paragraph: one-sentence thesis ('Q4 was our strongest quarter, with revenue and customer growth accelerating as our mid-market strategy gains traction'), followed by $4.2M revenue (up 18% QoQ) and 340 new customers (up 25% QoQ)\n2. Key wins (3 bullet points): mid-market expansion landed 12 enterprise deals averaging $35K ACV; churn dropped from 6.8% to 5.1% after launching a dedicated CS team; NPS hit 72 (up from 64), and we were named a 'Top Challenger' in the Gartner peer review\n3. Challenges (2 bullet points): mid-market sales cycle is 45 days longer than SMB, increasing CAC; engineering velocity slowed 15% due to billing system tech debt\n4. Outlook for Q1 2026: targeting $5M revenue, hiring 3 mid-market AEs, beginning billing rewrite (2-quarter project)\n5. Board ask: requesting approval to increase Q1 engineering headcount by 2 FTEs to accelerate the billing rewrite without sacrificing product roadmap\n\nTone: confident, transparent, and concise. No buzzwords. Use active voice. Each bullet should be 1-2 sentences maximum.",
      changes:
        "Added: a board 'ask' section (headcount approval), competitive signal (Gartner recognition), a sample thesis sentence, active voice instruction, and sentence length constraint per bullet.",
      pros: [
        "The 'ask' section makes the document actionable — board members know what to decide",
        "Gartner mention provides third-party validation for the competitive position",
        "Sample thesis sentence gives the AI the exact opening direction",
        "Active voice and sentence constraints ensure crisp, scannable writing",
        "Complete prompt that covers past performance, challenges, future plan, and decision needed",
      ],
      cons: [
        "Prompt is quite long — consider saving it as a reusable quarterly template",
        "For real use, you would swap in fresh metrics each quarter",
      ],
      feedback:
        "This is a board-ready prompt. It covers what happened, why it matters, what is next, and what the board needs to decide. The output requires minimal editing and can be used as a working document for the actual QBR.",
      why:
        "The best executive summaries are not just informative — they are decision documents. By adding a specific 'ask,' you transform the summary from a status report into a tool that moves the business forward. The competitive signal (Gartner) gives the board external validation that the strategy is working.",
      tips: [
        "Every board document should end with a clear ask or recommendation",
        "Third-party recognition (analyst reports, awards) carries more weight than internal claims",
        "Reuse this prompt structure each quarter — just swap the numbers and themes",
        "If the board needs to vote on something, state it explicitly: 'We request approval for X'",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 was our strongest quarter, with revenue and customer growth accelerating as our mid-market strategy gains traction. Revenue reached $4.2M, up 18% quarter-over-quarter, and we added 340 new customers, a 25% increase from Q3.\n\nKey Wins\n\n- Our mid-market push delivered 12 enterprise deals at an average annual contract value of $35K, demonstrating strong product-market fit above our original SMB segment.\n- Customer churn fell from 6.8% to 5.1% after we launched a dedicated customer success team in October. We attribute this to proactive onboarding and quarterly health checks.\n- NPS rose to 72 from 64 in Q3. Externally, we were named a 'Top Challenger' in the latest Gartner peer review, our first recognition in this category.\n\nChallenges\n\n- Mid-market sales cycles run 45 days longer than SMB, increasing customer acquisition cost. We are evaluating whether a dedicated pre-sales engineer role could shorten this.\n- Engineering velocity dropped approximately 15% as the team addressed technical debt in our billing system, originally built for a single pricing tier.\n\nQ1 2026 Outlook\n\nWe are targeting $5M in Q1 revenue. We plan to hire three mid-market account executives and begin a two-quarter billing system rewrite that will support usage-based pricing for enterprise accounts.\n\nBoard Ask\n\nWe request approval to add two engineering FTEs in Q1 to accelerate the billing rewrite. Without these hires, the rewrite will extend into Q4 and delay our enterprise pricing launch by two quarters. Estimated annual cost: $340K fully loaded.",
    },
  ],
};

export default example;
