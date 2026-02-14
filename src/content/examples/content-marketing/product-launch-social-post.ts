import type { Example } from "../../types";

/**
 * Content Marketing — Beginner
 *
 * Scenario: A marketing coordinator needs to write a LinkedIn post
 * announcing a new project management tool. The refinement journey
 * teaches: be specific, add context, and tell the audience why they
 * should care.
 */
const example: Example = {
  id: "product-launch-social-post",
  slug: "product-launch-social-post",
  title: "Product Launch Social Media Post",
  description:
    "Write a LinkedIn announcement for a new project management tool, learning how specificity and audience focus dramatically improve AI output.",
  category: "content-marketing",
  difficulty: "beginner",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The vague starting point ───────────────────────────
    {
      version: 1,
      prompt:
        "Write a social media post about our new product.",
      changes: "Initial prompt — no details provided.",
      pros: [
        "Gets the task started quickly",
        "Clear about the format (social media post)",
      ],
      cons: [
        "Does not name the product or what it does",
        "No indication of which platform (LinkedIn, X, Instagram …)",
        "No audience or tone guidance — AI will guess",
        "Missing any reason the reader should care",
      ],
      feedback:
        "The AI has almost nothing to work with here. It will fill in the blanks with generic marketing language that could describe anything from sneakers to software.",
      why:
        "Without specifics, AI models default to the most common patterns they have seen, producing bland, forgettable copy. Providing concrete details is the single biggest improvement you can make.",
      tips: [
        "Name the product and describe what it does in one sentence",
        "Specify which social platform — each has a different style and character limit",
        "Think about who will read this post and what they care about",
      ],
      aiOutput:
        "Exciting news! We just launched our amazing new product. It is designed to help you work smarter and achieve more. Check it out today and see the difference for yourself!\n\n#NewProduct #Innovation #ComingSoon",
    },

    // ── Step 2 — Add the basics ─────────────────────────────────────
    {
      version: 2,
      prompt:
        "Write a LinkedIn post announcing FlowBoard, our new project management tool for remote teams. Mention that it helps teams stay organized and meet deadlines.",
      changes:
        "Added: product name, platform (LinkedIn), target audience (remote teams), and two key benefits.",
      pros: [
        "Names the product and platform",
        "Identifies the target audience (remote teams)",
        "Mentions concrete benefits (stay organized, meet deadlines)",
      ],
      cons: [
        "Benefits are still generic — many tools claim the same things",
        "No differentiator explaining what makes FlowBoard unique",
        "Tone and length are unspecified",
        "No call to action telling the reader what to do next",
      ],
      feedback:
        "Much better — the AI now knows what to talk about. But 'stay organized and meet deadlines' could describe any project management tool. What makes FlowBoard special?",
      why:
        "Naming the product and audience gives the AI essential context. The output is no longer generic, but it still reads like every other PM tool announcement because we have not told the AI what makes this one different.",
      tips: [
        "Add one unique feature or data point that competitors cannot claim",
        "Include a specific call to action (sign up, visit a link, comment)",
        "Give tone guidance — professional, conversational, excited?",
      ],
      aiOutput:
        "I am thrilled to announce the launch of FlowBoard — a brand-new project management tool built for remote teams.\n\nIf you have ever struggled to keep your distributed team on the same page, FlowBoard is for you. It helps teams stay organized and meet deadlines, no matter where they are working from.\n\nStay tuned for more details!\n\n#FlowBoard #RemoteWork #ProjectManagement",
    },

    // ── Step 3 — Differentiate and add a CTA ────────────────────────
    {
      version: 3,
      prompt:
        "Write a professional but conversational LinkedIn post (150-200 words) announcing FlowBoard, our new project management tool for remote teams. Highlight that it is the first PM tool with built-in async video check-ins, replacing daily stand-up meetings. Include a call to action to sign up for the free beta at flowboard.io/beta.",
      changes:
        "Added: unique feature (async video check-ins), word count range, tone guidance, and a specific call to action with URL.",
      pros: [
        "Highlights a genuinely unique feature (async video check-ins)",
        "Specifies tone (professional but conversational) and length (150-200 words)",
        "Includes a clear, actionable CTA with a real URL",
        "Gives the AI enough to write a complete, self-contained post",
      ],
      cons: [
        "Does not mention the problem from the reader's perspective",
        "Could benefit from a hook that grabs attention in the first line",
        "No social proof or credibility signal (beta testers, company backing)",
      ],
      feedback:
        "This is a solid prompt that will produce usable copy. To go from good to great, try opening with a question or pain point that makes the reader stop scrolling.",
      why:
        "Adding a unique differentiator forces the AI to write about something specific rather than retreating to generic claims. The word count and tone ensure the output matches LinkedIn norms, and the CTA gives the post a clear purpose.",
      tips: [
        "Start with a hook — a question, surprising stat, or bold statement",
        "Add a line of social proof ('500 beta testers already love it')",
        "Mention a relatable pain point the reader has experienced",
      ],
      aiOutput:
        "Remote teams, say goodbye to awkward 8 a.m. stand-ups.\n\nI am excited to introduce FlowBoard — the first project management tool with built-in async video check-ins. Instead of forcing everyone onto the same call, FlowBoard lets each team member record a 60-second update when it suits them. Your teammates watch on their own schedule.\n\nThe result? Fewer meetings, better context, and happier humans across every time zone.\n\nFlowBoard also includes the boards, timelines, and task tracking you expect, all wrapped in a clean interface that actually makes remote collaboration feel effortless.\n\nWe are opening our free beta today and would love your feedback.\n\nSign up at flowboard.io/beta and let me know what you think in the comments.\n\n#FlowBoard #RemoteWork #AsyncFirst #ProjectManagement",
    },

    // ── Step 4 — Lead with empathy and proof ────────────────────────
    {
      version: 4,
      prompt:
        'Write a professional but conversational LinkedIn post (150-200 words) announcing FlowBoard, our new project management tool for remote teams. Open with a relatable pain point about daily stand-up meetings in distributed teams. Highlight that FlowBoard is the first PM tool with built-in async video check-ins that replace live stand-ups, saving teams an average of 4 hours per week (based on our beta). Mention that 500 beta testers across 38 countries are already using it. End with a call to action to sign up for the free beta at flowboard.io/beta. Tone: confident and friendly, avoid corporate jargon.',
      changes:
        "Added: opening hook direction (pain point), a concrete metric (4 hours/week saved), social proof (500 testers, 38 countries), and explicit tone guidance (avoid jargon).",
      pros: [
        "Opens with empathy — the reader feels understood immediately",
        "Concrete metric (4 hours/week) makes the benefit tangible and believable",
        "Social proof (500 testers, 38 countries) builds credibility",
        "Explicit anti-jargon instruction keeps the tone human",
        "Every element has a clear purpose: hook, value, proof, CTA",
      ],
      cons: [
        "The prompt is getting long — in a real workflow you might save it as a reusable template",
        "Could specify hashtags or emoji preferences for platform optimization",
      ],
      feedback:
        "Excellent prompt. It tells the AI exactly what story to tell, in what order, with real evidence. The output will be ready to post with minimal editing.",
      why:
        "This version applies four refinement principles at once: lead with the reader's problem, quantify the benefit, prove it with data, and close with a clear next step. Each addition makes the AI's job easier and the output more persuasive.",
      tips: [
        "Save polished prompts like this as templates you can reuse for future launches",
        "Test different opening hooks (question vs. stat vs. bold claim) to see which performs best",
        "When you have real metrics, always include them — numbers outperform vague claims",
      ],
      aiOutput:
        'If your remote team\'s morning stand-up feels more like a hostage negotiation across time zones, you are not alone.\n\nThat frustration is exactly why we built FlowBoard — the first project management tool with built-in async video check-ins. Each team member records a quick update when it works for them. No calendar Tetris. No "Can you hear me now?"\n\nOur beta testers — 500 people across 38 countries — report saving an average of 4 hours per week by replacing live stand-ups with async check-ins. That is half a workday back, every single week.\n\nFlowBoard gives you everything else you need too: boards, timelines, task tracking, and smart notifications that actually respect your focus time.\n\nWe are opening our free beta to everyone starting today.\n\nGrab your spot at flowboard.io/beta and tell me in the comments — how much time does your team spend in stand-ups each week?\n\n#FlowBoard #RemoteWork #AsyncFirst #ProductivityTip',
    },
  ],
};

export default example;
