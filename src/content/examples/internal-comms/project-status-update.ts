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
  title_no: "Ukentlig prosjektstatusoppdatering",
  description:
    "Write a weekly status update email for stakeholders, learning how specificity and clear risk flagging make internal communications more effective.",
  description_no:
    "Skriv en ukentlig statusoppdatering pa e-post for interessenter, og laer hvordan presisjon og tydelig risikoflagging gjor intern kommunikasjon mer effektiv.",
  category: "internal-comms",
  difficulty: "beginner",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The empty update ───────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a project status update email.",
      prompt_no:
        "Skriv en statusoppdatering for prosjektet pa e-post.",
      changes: "Initial prompt — no project details, audience, or timeframe.",
      changes_no: "Forste utkast -- ingen prosjektdetaljer, malgruppe eller tidsramme.",
      pros: [
        "Correctly identifies the document type (status update email)",
        "Simple and quick to write",
      ],
      pros_no: [
        "Identifiserer dokumenttypen riktig (statusoppdaterings-e-post)",
        "Enkel og rask a skrive",
      ],
      cons: [
        "No project name or description",
        "No information about what happened this week",
        "No audience specified (manager, team, executives?)",
        "Missing any mention of blockers, risks, or next steps",
      ],
      cons_no: [
        "Ingen prosjektnavn eller beskrivelse",
        "Ingen informasjon om hva som skjedde denne uken",
        "Ingen malgruppe spesifisert (leder, team, ledelse?)",
        "Mangler enhver omtale av blokkere, risikoer eller neste steg",
      ],
      feedback:
        "Status updates exist so stakeholders do not have to ask 'how is the project going?' If your update does not answer that question with specifics, it has not done its job.",
      feedback_no:
        "Statusoppdateringer finnes sa interessenter slipper a sporrea 'hvordan gar det med prosjektet?' Hvis oppdateringen din ikke svarer pa det sporsmalet med konkrete detaljer, har den ikke gjort jobben sin.",
      why:
        "A status update without project context forces the AI to invent a fake project. The result is useless because it contains no real information. The AI needs facts to summarize — it cannot create them from nothing.",
      why_no:
        "En statusoppdatering uten prosjektkontekst tvinger AI-en til a dikte opp et falskt prosjekt. Resultatet er ubrukelig fordi det ikke inneholder reell informasjon. AI-en trenger fakta a oppsummere -- den kan ikke skape dem fra ingenting.",
      tips: [
        "Name the project and what it is about",
        "List 2-3 things that happened this week",
        "Mention who will read this email and what they care about",
      ],
      tips_no: [
        "Navngi prosjektet og hva det handler om",
        "List opp 2-3 ting som skjedde denne uken",
        "Nevn hvem som vil lese denne e-posten og hva de bryr seg om",
      ],
      aiOutput:
        "Subject: Project Status Update\n\nHi team,\n\nHere is a quick update on the project.\n\nThings are progressing well. The team has been working hard on various tasks and we are making good progress toward our goals. There are no major issues to report at this time.\n\nPlease let me know if you have any questions.\n\nBest,\n[Your Name]",
      aiOutput_no:
        "Emne: Prosjektstatusoppdatering\n\nHei alle,\n\nHer er en kort oppdatering pa prosjektet.\n\nTing gar bra fremover. Teamet har jobbet hardt med ulike oppgaver, og vi gjor god fremgang mot malene vare. Det er ingen store problemer a rapportere for oyeblikket.\n\nGi beskjed hvis dere har noen sporsmaal.\n\nMvh,\n[Ditt navn]",
    },

    // ── Step 2 — Add project context and accomplishments ────────────
    {
      version: 2,
      prompt:
        "Write a weekly status update email for the website migration project. We are moving our company website from WordPress to Next.js. This week we completed the homepage redesign and finished migrating 40 of 120 blog posts. The audience is my manager and the marketing team lead.",
      prompt_no:
        "Skriv en ukentlig statusoppdatering pa e-post for nettstedsmigreringsprosjektet. Vi flytter firmanaettsiden var fra WordPress til Next.js. Denne uken fullforte vi redesignet av forsiden og migrerte 40 av 120 blogginnlegg. Malgruppen er lederen min og lederen for markedsforingsteamet.",
      changes:
        "Added: project name and description (website migration), two specific accomplishments (homepage redesign, 40/120 blog posts migrated), and the audience (manager + marketing lead).",
      changes_no:
        "Lagt til: prosjektnavn og beskrivelse (nettstedsmigrering), to spesifikke resultater (forside-redesign, 40/120 blogginnlegg migrert) og malgruppen (leder + markedsforingsleder).",
      pros: [
        "Names the project and explains what it involves",
        "Lists specific, measurable accomplishments",
        "The 40/120 ratio gives a clear sense of overall progress",
        "Identifies who will read the email",
      ],
      pros_no: [
        "Navngir prosjektet og forklarer hva det inneberer",
        "Lister opp spesifikke, maalbare resultater",
        "Forholdet 40/120 gir en tydelig folelse av samlet fremgang",
        "Identifiserer hvem som vil lese e-posten",
      ],
      cons: [
        "No mention of blockers or risks — is everything truly smooth?",
        "Missing next week's plan — what should the reader expect?",
        "No timeline context — is the project on schedule or behind?",
        "No specific dates or deadlines referenced",
      ],
      cons_no: [
        "Ingen omtale av blokkere eller risikoer -- gar virkelig alt knirkefritt?",
        "Mangler planen for neste uke -- hva skal leseren forvente?",
        "Ingen tidslinjekontekst -- er prosjektet i rute eller forsinket?",
        "Ingen spesifikke datoer eller tidsfrister referert",
      ],
      feedback:
        "The accomplishments are concrete and measurable — that is a big improvement. But stakeholders also need to know: are we on track, what is coming next, and do you need anything from them?",
      feedback_no:
        "Resultatene er konkrete og maalbare -- det er en stor forbedring. Men interessenter ma ogsa vite: er vi i rute, hva kommer neste uke, og trenger du noe fra dem?",
      why:
        "Specific accomplishments give the reader confidence that work is actually happening. The 40/120 ratio is particularly useful because it lets the reader gauge progress without asking follow-up questions. Now we need to add the forward-looking elements.",
      why_no:
        "Spesifikke resultater gir leseren tillit til at arbeid faktisk skjer. Forholdet 40/120 er spesielt nyttig fordi det lar leseren vurdere fremgang uten a stille oppfolgingssporsmal. Na ma vi legge til de fremtidsrettede elementene.",
      tips: [
        "Add whether the project is on track, at risk, or behind schedule",
        "Include 2-3 items planned for next week",
        "Mention any blockers or decisions needed from the reader",
      ],
      tips_no: [
        "Legg til om prosjektet er i rute, i risikosonen, eller forsinket",
        "Inkluder 2-3 oppgaver planlagt for neste uke",
        "Nevn eventuelle blokkere eller beslutninger du trenger fra leseren",
      ],
      aiOutput:
        "Subject: Website Migration — Weekly Update\n\nHi Sarah and David,\n\nHere is this week's update on the website migration project (WordPress to Next.js).\n\nCompleted This Week:\n- Finished the homepage redesign in Next.js\n- Migrated 40 of 120 blog posts to the new platform\n\nThe team has made solid progress and we are continuing to work through the blog migration. I will send another update next week.\n\nLet me know if you have any questions.\n\nBest,\n[Your Name]",
      aiOutput_no:
        "Emne: Nettstedsmigrering -- Ukentlig oppdatering\n\nHei Sarah og David,\n\nHer er denne ukens oppdatering pa nettstedsmigreringsprosjektet (WordPress til Next.js).\n\nFullfort denne uken:\n- Fullfort redesignet av forsiden i Next.js\n- Migrert 40 av 120 blogginnlegg til ny plattform\n\nTeamet har gjort solid fremgang, og vi fortsetter a jobbe gjennom bloggmigreringen. Jeg sender en ny oppdatering neste uke.\n\nGi beskjed hvis dere har sporsmaal.\n\nMvh,\n[Ditt navn]",
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
      prompt_no:
        "Skriv en konsis ukentlig statusoppdatering pa e-post for nettstedsmigreringsprosjektet (WordPress til Next.js). Malgruppen er lederen min (Sarah) og markedsforingslederen (David).\n\nFormater e-posten med disse seksjonene:\n1. Overordnet status: I RUTE -- vi er 4 uker inn i en 8-ukers tidslinje\n2. Fullfort denne uken: forside-redesign fullfort og QA-godkjent; migrert 40 av 120 blogginnlegg (i rute til a fullfoere alle innen uke 6)\n3. Planlagt neste uke: migrere 30 blogginnlegg til; begynne pa kontaktskjema og sokefunksjonalitet\n4. Risikoer/blokkere: 15 blogginnlegg har innebygde videoer hostet pa en gammel CDN som ma re-hostes for migrering -- trenger Davids innspill pa om vi skal re-hoste pa ny CDN eller beholde gamle lenker\n5. Beslutning nodvendig: David, kan du bekrefte videohostingtilnaermingen innen onsdag sa det ikke forsinker bloggmigreringen?\n\nHold det under 200 ord. Tone: profesjonell, direkte, ingen fyllord.",
      changes_no:
        "Lagt til: eksplisitt status (I RUTE), tidslinjekontekst (uke 4 av 8), strukturerte seksjoner (fullfort, planlagt, risikoer, beslutning nodvendig), en spesifikk blokker med navngitt person og frist, og ordgrense.",
      pros_no: [
        "Overordnet status gir en umiddelbar avlesning -- leseren vet pa et sekund om det er grunn til bekymring",
        "Tidslinjekontekst (uke 4 av 8) viser noyaktig hvor prosjektet star",
        "Spesifikk risiko (gammel CDN-video) viser proaktiv prosjektstyring",
        "Navngitt beslutning med frist ('David, innen onsdag') gjor e-posten handlingsorientert",
        "Under 200 ord holder den skannbar for travle interessenter",
      ],
      cons_no: [
        "Kunne inkludert en kort omtale av prosjektets sluttmal eller lanseringsdato for kontekst",
        "Kunne hatt nytte av en oppsummeringslinje oeverst for folk som bare leser forste setning",
      ],
      feedback_no:
        "Dette er en sterk statusoppdateringsprompt. Den dekker fremgang, planer, risikoer og nodvendige handlinger. Den navngitte beslutningsforesporselen er det viktigste tillegget -- den forvandler en passiv oppdatering til et aktivt kommunikasjonsverktoy.",
      why_no:
        "De beste statusoppdateringene svarer pa fire sporsmaal: Hvor er vi? Hva har vi gjort? Hva er neste steg? Trenger vi noe? Denne prompten dekker alle fire. Den spesifikke beslutningsforesporselen med frist sikrer at e-posten driver handling fremfor bare a informere.",
      tips_no: [
        "Inkluder alltid en ett-ords status (I RUTE, I RISIKOSONEN, BLOKKERT) oeverst",
        "Navngi personen og spesifiser en dato nar du trenger en beslutning",
        "Hold statusoppdateringer korte -- hvis folk vil ha detaljer, spoer de",
        "Skill mellom 'risikoer' og 'blokkere': en risiko kan skje, en blokker skjer na",
      ],
      aiOutput_no:
        "Emne: Nettstedsmigrering -- Uke 4 av 8 -- I RUTE\n\nHei Sarah og David,\n\nOverordnet status: I RUTE\nVi er 4 uker inn i den 8 uker lange migreringen fra WordPress til Next.js.\n\nFullfort denne uken\n- Forside-redesign fullfort og bestatt QA\n- Migrert 40 av 120 blogginnlegg til Next.js (i rute til a fullfoere alle innen uke 6)\n\nPlanlagt neste uke\n- Migrere 30 ekstra blogginnlegg\n- Begynne a bygge kontaktskjema og sokefunksjonalitet\n\nRisikoer\n15 blogginnlegg inneholder innebygde videoer hostet pa en gammel CDN. Disse videoene ma enten re-hostes pa var nye CDN eller beholdes som gamle lenker. Denne beslutningen pavirker hvordan vi migrerer disse innleggene.\n\nBeslutning nodvendig\nDavid -- kan du bekrefte videohostingtilnaermingen innen onsdag? Uten avklaring innen da kan det forsinke resten av bloggmigreringen.\n\nTar gjerne en kort samtale om det er lettere a diskutere.\n\nMvh,\n[Ditt navn]",
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
      prompt_no:
        "Skriv en konsis ukentlig statusoppdatering pa e-post for nettstedsmigreringsprosjektet (WordPress til Next.js, lansering 28. mars). Malgruppen er lederen min (Sarah) og markedsforingslederen (David).\n\nStart med en oppsummeringslinje: 'Migreringen er i rute -- forsiden live i staging, blogginnlegg 33 % fullfort, en beslutning nodvendig fra David om videohosting.'\n\nFormater resten slik:\n1. Overordnet status: I RUTE (uke 4 av 8, mal lansering 28. mars)\n2. Fremdriftsoversikt: Forside: ferdig. Blogginnlegg: 40/120. Kontaktskjema: ikke startet. Sok: ikke startet.\n3. Fullfort denne uken: forside-redesign QA-godkjent og satt ut i staging; 40 blogginnlegg migrert og verifisert\n4. Neste uke: migrere 30 blogginnlegg til; begynne pa kontaktskjema og nettstedssok\n5. Risiko: 15 blogginnlegg har innebygde videoer pa gammel CDN -- trenger Davids beslutning om re-hosting vs. gamle lenker\n6. Handling kreves: David, vennligst bekreft videohostingtilnaerming innen onsdag 5. mars for a unnga forsinkelse av bloggmigreringen\n\nHold det under 200 ord. Tone: profesjonell, direkte, samarbeidsorientert. Bruk kulepunkter, ikke avsnitt.",
      changes_no:
        "Lagt til: oppsummeringslinje oeverst, lanseringsdato (28. mars), fremdriftsoversikt som viser alle arbeidsstrommer pa et blikk, spesifikk kalenderdato for beslutningsfristen (5. mars), og formateringspreferanse (kulepunkter fremfor avsnitt).",
      pros_no: [
        "Oppsummeringslinjen lar lesere fa hovedbudskapet uten a scrolle",
        "Lanseringsdato forankrer all fremgang mot den faktiske fristen",
        "Fremdriftsoversikt gir et komplett bilde av alle arbeidsstrommer pa sekunder",
        "Spesifikk kalenderdato (5. mars) er tydeligere enn 'onsdag' alene",
        "Kulepunktformat matcher hvordan interessenter faktisk skanner e-poster",
        "Dekker det komplette statusoppdateringsrammeverket: sammendrag, status, fremgang, gjort, neste, risiko, handling",
      ],
      cons_no: [
        "For veldig lange prosjekter vil du kanskje lenke til en prosjektsporing i stedet for a liste alle arbeidsstrommer",
        "Prompten er detaljert -- vurder a lagre den som en ukentlig mal du fyller ut hver fredag",
      ],
      feedback_no:
        "Utmerket. Denne prompten produserer en statusoppdatering som enhver interessent kan absorbere pa under 60 sekunder. Oppsummeringslinjen oeverst er det mest virkningsfulle tillegget -- mange vil bare lese den ene linjen, og den forteller hele historien.",
      why_no:
        "Oppsummeringslinjemansteret er lant fra lederkommunikasjon: led med konklusjonen, gi sa stottende detaljer. Travle interessenter leser ofte bare forste setning i en e-post. Hvis den setningen inneholder statusen, noekkelmalet og den ene handlingen som trengs, har e-posten gjort jobben sin selv om ingen leser videre.",
      tips_no: [
        "Skriv oppsummeringslinjen sist -- etter at du kjenner alle detaljene, destiller dem til en setning",
        "En fremdriftsoversikt med alle arbeidsstrommer forhindrer 'hva med X?'-oppfolgingse-poster",
        "Bruk faktiske kalenderdatoer i stedet for dagsnavn -- '5. mars' er entydig pa tvers av tidssoner",
        "Lagre denne prompten som en fredagsettermiddagsmal -- endre detaljene, behold strukturen",
      ],
      aiOutput_no:
        "Emne: Nettstedsmigrering -- Uke 4 av 8 -- I RUTE\n\nMigreringen er i rute -- forsiden live i staging, blogginnlegg 33 % fullfort, en beslutning nodvendig fra David om videohosting.\n\nOverordnet status: I RUTE (uke 4 av 8, mal lansering 28. mars)\n\nFremdriftsoversikt\n- Forside: Ferdig (i staging)\n- Blogginnlegg: 40/120 migrert\n- Kontaktskjema: Ikke startet (planlagt uke 5)\n- Sok: Ikke startet (planlagt uke 5)\n\nFullfort denne uken\n- Forside-redesign QA-godkjent og satt ut i staging-miljo\n- 40 blogginnlegg migrert til Next.js og verifisert for formatering og lenker\n\nNeste uke\n- Migrere 30 ekstra blogginnlegg\n- Begynne pa kontaktskjema og nettsstedsok-funksjonalitet\n\nRisiko\n- 15 blogginnlegg inneholder innebygde videoer hostet pa en gammel CDN. Disse ma re-hostes pa var nye CDN eller beholdes som gamle lenker for vi kan migrere dem.\n\nHandling kreves\n- David: Vennligst bekreft videohostingtilnaerming innen onsdag 5. mars. Uten en beslutning innen da er tidslinjen for bloggmigreringen i risikosonen.\n\nTar gjerne en prat i mandagens sync eller pa en kort samtale.\n\nMvh,\n[Ditt navn]",
    },
  ],
};

export default example;
