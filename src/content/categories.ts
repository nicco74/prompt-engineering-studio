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
    name_no: "Innhold og markedsforing",
    description:
      "Social media posts, blog content, newsletters, and promotional copy — learn to craft prompts that produce compelling marketing material.",
    description_no:
      "Innlegg i sosiale medier, blogginnhold, nyhetsbrev og reklamekopi -- laer a lage prompter som produserer overbevisende markedsforingsmateriell.",
    order: 0,
  },
  {
    id: "business-docs",
    name: "Business Documents",
    name_no: "Forretningsdokumenter",
    description:
      "Proposals, reports, executive summaries, and professional correspondence — write prompts that generate polished business writing.",
    description_no:
      "Forslag, rapporter, ledersammendrag og profesjonell korrespondanse -- skriv prompter som genererer gjennomarbeidet forretningsskriving.",
    order: 1,
  },
  {
    id: "internal-comms",
    name: "Internal Communications",
    name_no: "Intern kommunikasjon",
    description:
      "Team updates, meeting summaries, project status reports, and company announcements — create prompts for clear workplace communication.",
    description_no:
      "Teamoppdateringer, motereferater, prosjektstatusrapporter og selskapskunngoringer -- lag prompter for tydelig kommunikasjon pa arbeidsplassen.",
    order: 2,
  },
];
