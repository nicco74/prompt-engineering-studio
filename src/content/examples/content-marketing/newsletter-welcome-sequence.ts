import type { Example } from "../../types";

/**
 * Content Marketing — Intermediate
 *
 * Scenario: A content marketer needs to draft the first email in a
 * welcome sequence for new subscribers to a cooking class platform.
 * The refinement journey teaches: define the audience persona, set
 * the voice, and structure the output you want.
 */
const example: Example = {
  id: "newsletter-welcome-sequence",
  slug: "newsletter-welcome-sequence",
  title: "Newsletter Welcome Email",
  description:
    "Draft a welcome email for new subscribers to an online cooking class platform, learning how persona details and structural guidance shape AI writing.",
  category: "content-marketing",
  difficulty: "intermediate",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — Bare-bones request ─────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a welcome email for new subscribers.",
      changes: "Initial prompt — no context about the brand, audience, or goal.",
      pros: [
        "Clearly states the format (welcome email)",
        "Quick to type and easy to iterate on",
      ],
      cons: [
        "No mention of what subscribers signed up for",
        "No brand name, voice, or personality cues",
        "Missing any clear goal for the email (engagement, purchase, etc.)",
        "The AI will produce a one-size-fits-all template",
      ],
      feedback:
        "A welcome email is one of the highest-open-rate emails a brand sends. Wasting it on generic copy is a missed opportunity. Tell the AI what makes your brand unique.",
      why:
        "Welcome emails set the tone for the entire subscriber relationship. A generic prompt produces a forgettable email, while a detailed one creates an experience that keeps readers opening future messages.",
      tips: [
        "Name the brand or product the subscriber just signed up for",
        "Describe the audience — who are these subscribers and what do they want?",
        "State the primary goal: should the reader explore content, make a purchase, or something else?",
      ],
      aiOutput:
        "Subject: Welcome!\n\nHi there,\n\nThank you for subscribing! We are so excited to have you on board.\n\nStay tuned for great content coming your way soon. If you have any questions, feel free to reach out.\n\nBest regards,\nThe Team",
    },

    // ── Step 2 — Add brand and audience context ─────────────────────
    {
      version: 2,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who want to cook better but have limited time.",
      changes:
        "Added: brand name (HomeChef Academy), what the platform does, and a specific audience persona (busy professionals, 25-45, limited time).",
      pros: [
        "Names the brand and describes its value proposition",
        "Defines a clear audience persona with age range and key constraint (limited time)",
        "Gives the AI enough context to tailor language and examples",
      ],
      cons: [
        "No tone or voice guidance — should it be casual, inspirational, professional?",
        "No structure specified — the AI decides the sections and length",
        "Missing a specific CTA (what should the reader do after reading?)",
        "Does not mention what content the subscriber will receive",
      ],
      feedback:
        "The persona details are a big improvement — the AI will now write to a specific person rather than 'everyone.' Next, tell it how the email should feel and what the reader should do.",
      why:
        "Audience personas are powerful because they constrain the AI's choices. Instead of writing for a generic 'subscriber,' it now writes for someone with a specific lifestyle and motivation. This makes every word more relevant.",
      tips: [
        "Add tone instructions: 'warm and encouraging' sounds different from 'witty and casual'",
        "Specify the structure you want: greeting, value preview, CTA, sign-off",
        "Include what the subscriber should do next (watch a class, browse recipes, reply to the email)",
      ],
      aiOutput:
        "Subject: Welcome to HomeChef Academy!\n\nHi there,\n\nWelcome to HomeChef Academy! We are thrilled that you have decided to join our community of home cooks.\n\nAt HomeChef Academy, we believe that everyone deserves to enjoy restaurant-quality meals at home. Whether you are a complete beginner or looking to sharpen your skills, our platform has something for you.\n\nHere is what you can expect:\n- Expert-led video courses\n- Step-by-step recipes\n- A supportive community of fellow home cooks\n\nWe know you are busy, so our lessons are designed to fit into your schedule. Most courses can be completed in under 30 minutes.\n\nHappy cooking!\n\nThe HomeChef Academy Team",
    },

    // ── Step 3 — Define tone, structure, and CTA ────────────────────
    {
      version: 3,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who love food but have limited weeknight cooking time.\n\nTone: warm, encouraging, and slightly playful — like a friend who happens to be a great cook.\n\nStructure the email as:\n1. A warm greeting that acknowledges they just took a great step\n2. One sentence about what HomeChef Academy is\n3. Three bullet points previewing what they will get (weekly 15-minute recipe videos, a printable meal prep guide, and access to the community forum)\n4. A clear CTA: watch the most popular beginner class — 'Knife Skills in 10 Minutes'\n5. A short, friendly sign-off from 'Chef Maria, Founder'\n\nKeep the email under 200 words.",
      changes:
        "Added: specific tone direction, a 5-part structure, concrete content previews, a named CTA (beginner class), a sender persona (Chef Maria), and a word limit.",
      pros: [
        "Detailed tone guidance ensures a consistent brand voice",
        "Explicit structure eliminates guesswork for the AI",
        "Specific content previews (15-min videos, meal prep guide, forum) set clear expectations",
        "Named CTA gives the reader an obvious next step",
        "Word limit keeps the email scannable for busy readers",
      ],
      cons: [
        "Does not address the reader's specific pain point up front",
        "No subject line guidance — a great email needs a great subject line too",
        "Could include a personal touch or story to build connection",
      ],
      feedback:
        "This is a well-structured prompt that gives the AI clear guardrails. The output will be on-brand and actionable. To make it exceptional, add a subject line instruction and open with the reader's motivation.",
      why:
        "Structure is one of the most underused prompt techniques. When you tell the AI exactly which sections to include and in what order, you get predictable, high-quality output every time. Think of it as giving the AI an outline to fill in.",
      tips: [
        "Always include subject line instructions — it is the most important line of any email",
        "Open with the reader's 'why' — the reason they signed up — to create immediate relevance",
        "Name a specific person as the sender to make the email feel personal, not corporate",
      ],
      aiOutput:
        "Subject: Welcome to HomeChef Academy!\n\nHey there!\n\nYou just made one of the best decisions for your weeknight dinners — welcome to HomeChef Academy!\n\nWe are a community of home cooks learning to make restaurant-quality meals without spending hours in the kitchen. Here is what is waiting for you:\n\n- Weekly 15-minute recipe videos that fit into even the busiest schedule\n- A printable meal prep guide to set your week up for success\n- Access to our community forum where you can ask questions and share wins\n\nReady to get started? Our most popular beginner class is 'Knife Skills in 10 Minutes' — it is the fastest way to feel like a pro in your own kitchen.\n\nWatch it here: [link]\n\nI cannot wait to see what you cook up.\n\nWarmly,\nChef Maria, Founder of HomeChef Academy",
    },

    // ── Step 4 — Add emotional hook and subject line ────────────────
    {
      version: 4,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who love food but rely on takeout most weeknights because they feel overwhelmed by cooking.\n\nTone: warm, encouraging, and slightly playful — like a friend who happens to be a great cook. Never condescending.\n\nStart with a subject line that hints at a quick transformation (avoid clickbait).\n\nStructure the email as:\n1. Open by acknowledging the reader's real situation — they love great food but ordering takeout every night feels expensive and unfulfilling\n2. Reframe: cooking does not have to be hard or time-consuming\n3. Introduce HomeChef Academy in one sentence\n4. Three bullet points previewing subscriber benefits (weekly 15-minute recipe videos, a printable weeknight meal prep guide, access to the community Q&A forum)\n5. A clear CTA: watch the free beginner class 'Knife Skills in 10 Minutes' — mention it has a 4.9 star rating from 2,000 students\n6. A friendly sign-off from 'Chef Maria, Founder' with a P.S. teasing next week's email (a 3-ingredient pasta recipe)\n\nKeep the email under 200 words. Do not use exclamation marks more than twice.",
      changes:
        "Added: emotional opening (acknowledges takeout habit and overwhelm), subject line instruction, social proof on the CTA (4.9 stars, 2,000 students), a P.S. teaser for the next email, and a stylistic constraint (limit exclamation marks).",
      pros: [
        "Opens by naming the reader's actual problem — creates instant connection",
        "Reframes cooking as easy, removing the mental barrier",
        "Social proof (4.9 stars, 2,000 students) makes the CTA more compelling",
        "P.S. teaser builds anticipation for the next email, improving future open rates",
        "Exclamation mark limit prevents the email from sounding breathless",
        "Every section has a clear purpose in the persuasion sequence",
      ],
      cons: [
        "The prompt is quite detailed — for ongoing use, save it as a template",
        "Some brands may prefer a shorter email; this structure is fairly prescriptive",
      ],
      feedback:
        "This is an excellent prompt. It balances emotional resonance, practical value, and strategic email marketing (the P.S. teaser). The AI output will feel like it was written by a skilled copywriter who understands the audience.",
      why:
        "The key insight here is that great prompts mirror great copywriting: they lead with empathy (the reader's problem), offer a reframe (cooking is easy), present proof (ratings), and create forward momentum (the P.S. teaser). When your prompt follows a persuasion framework, the AI output naturally becomes more compelling.",
      tips: [
        "Use P.S. lines in email prompts — they are among the most-read parts of any email",
        "Social proof works best when it is specific: '4.9 stars from 2,000 students' beats 'highly rated'",
        "Constraining style (e.g., limiting exclamation marks) prevents the AI from defaulting to hype",
        "Save your best prompts as templates — swap out the product details and reuse the structure",
      ],
      aiOutput:
        "Subject: What if dinner took 15 minutes instead of 45?\n\nHey there,\n\nLet's be honest — you love great food, but most weeknights end with you opening a delivery app because cooking feels like too much after a long day. You are not alone, and you are not lazy. You just need a better system.\n\nHere is the thing: a restaurant-quality meal does not require restaurant-level effort. HomeChef Academy teaches busy people like you to cook incredible meals in the time it takes to wait for takeout.\n\nHere is what you now have access to:\n\n- Weekly 15-minute recipe videos designed for real weeknight schedules\n- A printable meal prep guide so you always have ingredients ready\n- Our community Q&A forum where you can ask Chef Maria anything\n\nThe best place to start? Our free class \"Knife Skills in 10 Minutes\" — rated 4.9 stars by over 2,000 students. It will change how you feel in the kitchen.\n\nWatch it here: [link]\n\nWarmly,\nChef Maria, Founder\n\nP.S. Next week I am sending you my famous 3-ingredient pasta recipe. Trust me, you will want to open that one.",
    },
  ],
};

export default example;
