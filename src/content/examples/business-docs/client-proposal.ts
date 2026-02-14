import type { Example } from "../../types";

/**
 * Business Documents — Advanced
 *
 * Scenario: A freelance consultant needs to draft a project proposal
 * for a potential client who wants to redesign their e-commerce website.
 * The refinement journey teaches: frame the client's problem, show your
 * process, and make the next step obvious.
 */
const example: Example = {
  id: "client-proposal",
  slug: "client-proposal",
  title: "Client Project Proposal",
  description:
    "Draft a project proposal for an e-commerce website redesign, learning how framing the client's problem and structuring deliverables creates persuasive business documents.",
  category: "business-docs",
  difficulty: "advanced",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — Generic request ────────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a project proposal for a website redesign.",
      changes: "Initial prompt — no client context, scope, or deliverables.",
      pros: [
        "Identifies the document type (project proposal)",
        "Names the general project (website redesign)",
      ],
      cons: [
        "No client name or industry",
        "No description of the current problem the redesign should solve",
        "No scope, timeline, budget, or deliverables",
        "The AI will produce a generic template that does not sell anything",
      ],
      feedback:
        "A proposal that does not mention the client's specific problem looks like a template — because it is. Clients hire consultants who demonstrate they understand the situation.",
      why:
        "Proposals win work by proving you understand the client's world. A generic prompt strips away everything that makes a proposal persuasive: the client's pain, the opportunity cost of inaction, and your unique approach.",
      tips: [
        "Name the client and their industry",
        "Describe the specific problem the project will solve",
        "Outline the deliverables and rough timeline",
      ],
      aiOutput:
        "Project Proposal: Website Redesign\n\nIntroduction\nWe are pleased to present this proposal for your website redesign project. Our team has extensive experience in web design and development.\n\nScope of Work\n- Redesign the website with a modern look and feel\n- Improve user experience\n- Optimize for mobile devices\n- Implement SEO best practices\n\nTimeline\nThe project is estimated to take 8-12 weeks.\n\nInvestment\nPlease contact us for a detailed quote based on your specific requirements.\n\nConclusion\nWe look forward to working with you on this exciting project.",
    },

    // ── Step 2 — Add client context and scope ───────────────────────
    {
      version: 2,
      prompt:
        "Write a project proposal for redesigning the e-commerce website of GreenLeaf Organics, a mid-size organic grocery delivery company. Their current site has a 68% mobile bounce rate and their checkout flow takes 5 steps. I am a freelance UX consultant proposing a 10-week redesign focused on mobile experience and checkout simplification.",
      changes:
        "Added: client name and business, specific problems (68% mobile bounce rate, 5-step checkout), consultant positioning, and project scope (10 weeks, mobile + checkout focus).",
      pros: [
        "Names the client and their business model",
        "Cites specific, measurable problems (bounce rate, checkout steps)",
        "Positions you as a specialist (UX consultant, not a generic agency)",
        "Scopes the project clearly (10 weeks, two focus areas)",
      ],
      cons: [
        "No deliverables list — what exactly will the client receive?",
        "Missing the business impact — how much revenue is the current site losing?",
        "No phases or milestones for the 10-week timeline",
        "Tone and format unspecified — should it be formal, persuasive, concise?",
      ],
      feedback:
        "The client-specific data makes this proposal immediately more credible. Now make it actionable: break the 10 weeks into phases, list specific deliverables, and quantify the potential business impact.",
      why:
        "Citing the client's actual metrics (68% bounce rate, 5-step checkout) does two things: it shows you have done your homework, and it creates urgency by making the problem concrete. Numbers turn a vague 'problem' into a business case.",
      tips: [
        "Break the project into 2-3 phases with milestones",
        "List specific deliverables (wireframes, prototype, dev handoff specs)",
        "Estimate the business impact: if bounce rate drops to X%, revenue increases by Y%",
      ],
      aiOutput:
        "Project Proposal: E-Commerce Redesign for GreenLeaf Organics\n\nPrepared by: [Your Name], UX Consultant\n\nOverview\nGreenLeaf Organics has built a loyal customer base for organic grocery delivery. However, your current website is underperforming on mobile, with a 68% bounce rate, and your checkout flow requires five separate steps. These issues are likely impacting conversion rates and revenue.\n\nI propose a 10-week redesign focused on two areas:\n1. Mobile experience optimization\n2. Checkout flow simplification\n\nApproach\nI will conduct a UX audit, create new wireframes, and work with your development team to implement the changes. The goal is to reduce mobile bounce rate and simplify the checkout to three steps or fewer.\n\nTimeline: 10 weeks\n\nNext Steps\nIf this proposal interests you, I would be happy to schedule a call to discuss the details.\n\nThank you for considering this proposal.",
    },

    // ── Step 3 — Add phases, deliverables, and impact ───────────────
    {
      version: 3,
      prompt:
        "Write a professional project proposal (500-600 words) for redesigning the e-commerce website of GreenLeaf Organics, a mid-size organic grocery delivery company with $8M annual online revenue. Their current site has a 68% mobile bounce rate (industry average is 42%) and a 5-step checkout flow with a 73% cart abandonment rate.\n\nI am Alex Chen, a freelance UX consultant with 8 years of experience in e-commerce optimization.\n\nStructure the proposal as:\n1. Executive summary: 2-3 sentences framing the opportunity (not the problem)\n2. Current situation: cite the metrics above and estimate revenue impact\n3. Proposed approach in 3 phases:\n   - Phase 1 (Weeks 1-3): UX audit + user research (5 customer interviews)\n   - Phase 2 (Weeks 4-7): Mobile-first redesign + checkout simplification to 2 steps, with interactive Figma prototype\n   - Phase 3 (Weeks 8-10): Developer handoff documentation + launch support\n4. Expected outcomes: reduce mobile bounce to under 45%, reduce cart abandonment by 20%, estimated $400K annual revenue recovery\n5. Investment: $28,000 fixed fee, billed in 3 milestones\n6. Next step: 30-minute discovery call\n\nTone: confident and professional but not stuffy. Write as a trusted advisor, not a vendor.",
      changes:
        "Added: annual revenue context ($8M), industry benchmark (42% bounce rate), cart abandonment rate (73%), consultant credentials (name, 8 years experience), 3-phase breakdown with specific deliverables per phase, expected outcomes with dollar impact, fixed fee with billing structure, and tone/positioning guidance (trusted advisor).",
      pros: [
        "Industry benchmarks contextualize the problem — the client sees how far behind they are",
        "Revenue impact ($400K recovery) makes the $28K fee look like a clear ROI",
        "Three-phase structure shows a professional methodology",
        "Fixed fee with milestones reduces perceived risk for the client",
        "Trusted advisor tone builds partnership rather than a transactional feel",
      ],
      cons: [
        "Does not include any case study or proof of past results",
        "Could add a brief 'Why me?' section that differentiates from other consultants",
      ],
      feedback:
        "This is a well-crafted proposal prompt. The ROI framing ($28K investment for $400K return) is particularly strong. Adding a brief proof point from a past project would seal the deal.",
      why:
        "The best proposals frame the cost as an investment with a clear return. By positioning the $28K fee against $400K in recovered revenue, you make the decision easy. The phased approach also reduces risk — the client knows exactly what they get at each milestone.",
      tips: [
        "Always frame your fee against the expected business impact — 'invest $28K to recover $400K'",
        "Include industry benchmarks to contextualize the client's underperformance",
        "A phased approach with milestone billing de-risks the project for the client",
        "Reference one past project to prove you have done this before",
      ],
      aiOutput:
        "Project Proposal: E-Commerce Redesign for GreenLeaf Organics\n\nPrepared by: Alex Chen, UX Consultant\n\nExecutive Summary\nGreenLeaf Organics has an opportunity to significantly increase online revenue by optimizing its mobile shopping experience and checkout flow. Based on current traffic and industry benchmarks, I estimate this redesign could recover approximately $400K in annual revenue that is currently lost to friction.\n\nCurrent Situation\nWith $8M in annual online revenue, GreenLeaf's digital channel is a core growth driver. However, two metrics indicate significant untapped potential:\n\n- Mobile bounce rate sits at 68%, well above the industry average of 42%. This suggests mobile visitors are not finding what they need quickly enough.\n- Cart abandonment is 73%, driven largely by a 5-step checkout flow that introduces unnecessary friction between intent and purchase.\n\nConservatively, reducing mobile bounce to the industry average and cutting cart abandonment by 20% would recover roughly $400K in annual revenue.\n\nProposed Approach\n\nPhase 1: Discovery and Audit (Weeks 1-3)\nI will conduct a comprehensive UX audit of the current site and interview 5 existing customers to understand pain points, motivations, and drop-off triggers. Deliverable: UX audit report with prioritized recommendations.\n\nPhase 2: Redesign and Prototype (Weeks 4-7)\nUsing audit findings, I will create a mobile-first redesign with a streamlined 2-step checkout flow. You will receive an interactive Figma prototype for stakeholder review and user testing. Deliverable: Tested Figma prototype with design specifications.\n\nPhase 3: Handoff and Launch (Weeks 8-10)\nI will prepare detailed developer handoff documentation and provide launch support to ensure the design is implemented accurately. Deliverable: Annotated design specs, component library, and two weeks of post-launch support.\n\nExpected Outcomes\n- Mobile bounce rate reduced to under 45%\n- Cart abandonment reduced by at least 20%\n- Estimated annual revenue recovery: $400K\n\nInvestment\nFixed project fee: $28,000, billed across three milestones:\n- $9,300 at Phase 1 completion\n- $9,300 at Phase 2 completion\n- $9,400 at project close\n\nNext Step\nI would welcome a 30-minute discovery call to discuss your priorities and answer any questions. Please reply to this email or book directly at alexchen.co/schedule.",
    },

    // ── Step 4 — Add proof and urgency ──────────────────────────────
    {
      version: 4,
      prompt:
        "Write a professional project proposal (500-600 words) for redesigning the e-commerce website of GreenLeaf Organics, a mid-size organic grocery delivery company with $8M annual online revenue. Their current site has a 68% mobile bounce rate (industry average is 42%) and a 5-step checkout flow with a 73% cart abandonment rate.\n\nI am Alex Chen, a freelance UX consultant with 8 years of experience in e-commerce optimization. My most relevant past project: I redesigned FreshBox Delivery's checkout flow, reducing their abandonment rate from 71% to 48% and increasing monthly revenue by $52K within 60 days.\n\nStructure the proposal as:\n1. Executive summary: 2-3 sentences framing the revenue opportunity, not the problem\n2. Current situation: cite the metrics and estimate the revenue gap vs. industry averages\n3. Proof point: one paragraph about the FreshBox Delivery results\n4. Proposed approach in 3 phases:\n   - Phase 1 (Weeks 1-3): UX audit + 5 customer interviews\n   - Phase 2 (Weeks 4-7): Mobile-first redesign + 2-step checkout, interactive Figma prototype\n   - Phase 3 (Weeks 8-10): Developer handoff docs + 2 weeks launch support\n5. Expected outcomes: mobile bounce under 45%, cart abandonment reduced 20%, estimated $400K annual revenue recovery\n6. Investment: $28,000 fixed fee, billed at 3 milestones\n7. Timing note: mention that Q2 is the peak ordering season for grocery delivery, so starting in March ensures the new design is live before the May-June surge\n8. Next step: 30-minute discovery call this week\n\nTone: confident, direct, and warm — like a trusted advisor who has solved this exact problem before. Active voice. No jargon.",
      changes:
        "Added: a specific case study (FreshBox Delivery results), a timing/urgency element (Q2 peak season), and refined tone guidance (someone who has solved this before).",
      pros: [
        "Case study provides third-party proof that your approach works",
        "Timing urgency (Q2 peak season) creates a reason to act now rather than next quarter",
        "The prompt tells a complete story: problem, proof, plan, payoff, and next step",
        "Active voice instruction keeps the writing direct and energetic",
        "Every section serves a persuasion purpose — nothing is filler",
      ],
      cons: [
        "Prompt is detailed enough to be a brief in itself — save it as a template for future proposals",
        "The case study numbers must be accurate — do not overstate past results",
      ],
      feedback:
        "This prompt will produce a proposal that reads like it was written by a senior consultant with a copywriting background. The combination of the client's data, your proof point, a clear plan, ROI framing, and timing urgency covers every element a decision-maker needs.",
      why:
        "This final version applies a complete persuasion framework: it names the problem (current metrics), proves you can solve it (case study), shows exactly how (phased approach), quantifies the return ($400K vs. $28K), and creates urgency (peak season deadline). Each element removes one more reason for the client to say 'maybe later.'",
      tips: [
        "A relevant case study is the most persuasive element in any proposal — always include one",
        "Timing urgency works best when it is real (peak season, contract renewal, competitor launch)",
        "Save detailed prompts like this as templates — swap client details and reuse the structure",
        "After the first proposal, iterate based on which sections the client responded to most",
      ],
      aiOutput:
        "Project Proposal: E-Commerce Redesign for GreenLeaf Organics\n\nPrepared by: Alex Chen, UX Consultant | alexchen.co\n\nExecutive Summary\nGreenLeaf Organics has a clear opportunity to recover significant online revenue by optimizing the mobile shopping experience and simplifying the checkout flow. Based on your current traffic volume and industry benchmarks, I estimate this redesign will recover approximately $400K in annual revenue — a 14x return on a $28K investment.\n\nCurrent Situation\nGreenLeaf's digital channel generates $8M annually, making it the company's primary growth engine. Two metrics stand out:\n\n- Mobile bounce rate: 68% vs. a 42% industry average. For every 1,000 mobile visitors, GreenLeaf loses roughly 260 more than a typical competitor.\n- Cart abandonment: 73%, driven by a 5-step checkout flow. Reducing this to industry norms would convert hundreds of additional orders per month.\n\nThe gap between current performance and industry benchmarks represents substantial recoverable revenue.\n\nProven Approach\nI recently completed a similar engagement with FreshBox Delivery, another grocery e-commerce company. By redesigning their checkout flow, I reduced cart abandonment from 71% to 48% and increased monthly revenue by $52K — results that appeared within 60 days of launch. GreenLeaf's situation shares many of the same friction points, and I am confident a similar approach will deliver strong results here.\n\nProposed Approach\n\nPhase 1: Discovery and Audit (Weeks 1-3)\nI will audit the current site across all devices and conduct interviews with 5 existing customers to map pain points and purchase motivations. Deliverable: UX audit report with prioritized recommendations.\n\nPhase 2: Redesign and Prototype (Weeks 4-7)\nI will design a mobile-first experience with a streamlined 2-step checkout. You will receive an interactive Figma prototype for stakeholder review and usability testing. Deliverable: Tested, annotated Figma prototype.\n\nPhase 3: Handoff and Launch Support (Weeks 8-10)\nI will prepare comprehensive developer handoff documentation and provide two weeks of post-launch support to ensure design fidelity. Deliverable: Annotated specs, component library, and launch QA.\n\nExpected Outcomes\n- Mobile bounce rate reduced to under 45%\n- Cart abandonment reduced by at least 20%\n- Estimated annual revenue recovery: $400K\n\nInvestment\nFixed project fee: $28,000\n- Milestone 1 (Phase 1 complete): $9,300\n- Milestone 2 (Phase 2 complete): $9,300\n- Milestone 3 (Project close): $9,400\n\nTiming\nQ2 is the peak ordering season for grocery delivery. Starting this engagement in March ensures the redesigned site is live before the May-June surge, maximizing the revenue impact during your highest-traffic period.\n\nNext Step\nI have availability for a 30-minute discovery call this week. Reply to this email or book directly at alexchen.co/schedule. I look forward to helping GreenLeaf turn mobile visitors into loyal customers.",
    },
  ],
};

export default example;
