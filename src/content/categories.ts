import type { Category } from "./types";

/**
 * The three content categories that organize examples in the app.
 *
 * Each category groups related real-world scenarios so learners can
 * focus on the domain most relevant to their daily work.
 */
export const categories: Category[] = [
  {
    id: "content-marketing",
    name: "Content & Marketing",
    description:
      "Social media posts, blog content, newsletters, and promotional copy — learn to craft prompts that produce compelling marketing material.",
    order: 0,
  },
  {
    id: "business-docs",
    name: "Business Documents",
    description:
      "Proposals, reports, executive summaries, and professional correspondence — write prompts that generate polished business writing.",
    order: 1,
  },
  {
    id: "internal-comms",
    name: "Internal Communications",
    description:
      "Team updates, meeting summaries, project status reports, and company announcements — create prompts for clear workplace communication.",
    order: 2,
  },
];
