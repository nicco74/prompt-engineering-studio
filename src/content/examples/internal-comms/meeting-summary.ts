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
  title_no: "Tverrfunksjonelt motereferat",
  description:
    "Summarize a cross-functional planning meeting for attendees and absent stakeholders, learning how to capture decisions, assign owners, and create a useful reference document.",
  description_no:
    "Oppsummer et tverrfunksjonelt planleggingsmote for deltakere og fraverende interessenter, og laer hvordan du fanger beslutninger, tilordner ansvarlige og lager et nyttig referansedokument.",
  category: "internal-comms",
  difficulty: "advanced",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The generic request ────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a summary of our team meeting.",
      prompt_no:
        "Skriv et sammendrag av teammotet vart.",
      changes: "Initial prompt — no meeting details, agenda, or outcomes.",
      changes_no: "Forste utkast -- ingen motedetaljer, agenda eller utfall.",
      pros: [
        "Clear about the document type (meeting summary)",
        "Quick to type",
      ],
      pros_no: [
        "Tydelig pa dokumenttypen (motereferat)",
        "Rask a skrive",
      ],
      cons: [
        "No information about what the meeting was about",
        "No attendees, decisions, or action items",
        "No distinction between discussion and decisions",
        "The AI will fabricate an entire meeting from scratch",
      ],
      cons_no: [
        "Ingen informasjon om hva motet handlet om",
        "Ingen deltakere, beslutninger eller oppgaver",
        "Ingen distinksjon mellom diskusjon og beslutninger",
        "AI-en vil dikte opp et helt mote fra bunnen av",
      ],
      feedback:
        "A meeting summary without meeting content is pure fiction. The AI has no choice but to make everything up. Give it the actual discussion points, decisions, and action items.",
      feedback_no:
        "Et motereferat uten moteinnhold er ren fiksjon. AI-en har ikke noe annet valg enn a finne pa alt. Gi den de faktiske diskusjonspunktene, beslutningene og oppgavene.",
      why:
        "Meeting summaries are reference documents — people check them weeks later to confirm what was decided. If the AI invents the content, the summary is worse than useless because it documents decisions that were never made.",
      why_no:
        "Motereferater er referansedokumenter -- folk sjekker dem uker senere for a bekrefte hva som ble bestemt. Hvis AI-en dikter opp innholdet, er referatet verre enn ubrukelig fordi det dokumenterer beslutninger som aldri ble tatt.",
      tips: [
        "List the key topics that were discussed",
        "Note any decisions that were made",
        "Include action items with owners if you have them",
      ],
      tips_no: [
        "List opp hovedtemaene som ble diskutert",
        "Noter eventuelle beslutninger som ble tatt",
        "Inkluder oppgaver med ansvarlige hvis du har dem",
      ],
      aiOutput:
        "Meeting Summary\n\nDate: [Date]\nAttendees: Team members\n\nThe team met to discuss ongoing projects and priorities. Several topics were covered, including project updates, upcoming deadlines, and resource allocation.\n\nKey points discussed:\n- Project progress is going well\n- The team is on track to meet deadlines\n- Resources are being allocated effectively\n\nAction Items:\n- Continue working on current projects\n- Follow up on outstanding items\n\nNext meeting: TBD",
      aiOutput_no:
        "Motereferat\n\nDato: [Dato]\nDeltakere: Teammedlemmer\n\nTeamet motte for a diskutere pagaende prosjekter og prioriteringer. Flere emner ble dekket, inkludert prosjektoppdateringer, kommende frister og ressursfordeling.\n\nHovedpunkter diskutert:\n- Prosjektfremgangen gar bra\n- Teamet er i rute for a overholde frister\n- Ressurser fordeles effektivt\n\nOppgaver:\n- Fortsette a jobbe med navaerende prosjekter\n- Folge opp utstaende punkter\n\nNeste mote: Ikke bestemt",
    },

    // ── Step 2 — Add actual meeting content ─────────────────────────
    {
      version: 2,
      prompt:
        "Write a summary of our Q1 product planning meeting held on February 10, 2026. Attendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing).\n\nTopics discussed:\n- Whether to prioritize the mobile app or the API redesign for Q1\n- The new onboarding flow design that Priya presented\n- Marketing launch timeline for the mobile app\n- Engineering capacity concerns — James mentioned the team is at 90% allocation",
      prompt_no:
        "Skriv et sammendrag av vart Q1 produktplanleggingsmote avholdt 10. februar 2026. Deltakere: Sarah (PM), James (teknisk leder), Priya (designleder), Marcus (markedsforing).\n\nEmner diskutert:\n- Om vi skal prioritere mobilappen eller API-redesignet for Q1\n- Det nye onboarding-flyten som Priya presenterte\n- Markedsforingstidslinje for mobilappen\n- Bekymringer om teknisk kapasitet -- James nevnte at teamet er pa 90 % allokering",
      changes:
        "Added: meeting name and date, named attendees with roles, four specific discussion topics, and a capacity concern.",
      changes_no:
        "Lagt til: motenavn og dato, navngitte deltakere med roller, fire spesifikke diskusjonsemner og en kapasitetsbekymring.",
      pros: [
        "Names and roles help the reader know who was responsible for what",
        "Specific topics give the AI real content to summarize",
        "The capacity concern adds realistic nuance",
        "Dated meeting helps with record-keeping",
      ],
      pros_no: [
        "Navn og roller hjelper leseren a vite hvem som var ansvarlig for hva",
        "Spesifikke emner gir AI-en ekte innhold a oppsummere",
        "Kapasitetsbekymringen tilforer realistisk nyanse",
        "Datert mote hjelper med journalforing",
      ],
      cons: [
        "Lists topics discussed but not what was actually decided",
        "No action items with owners and deadlines",
        "Does not indicate which topics were resolved and which are still open",
        "No mention of who should receive this summary beyond attendees",
      ],
      cons_no: [
        "Lister emner som ble diskutert, men ikke hva som faktisk ble besluttet",
        "Ingen oppgaver med ansvarlige og frister",
        "Indikerer ikke hvilke emner som ble lost og hvilke som fortsatt er apne",
        "Ingen omtale av hvem som skal motta dette referatet utover deltakerne",
      ],
      feedback:
        "The meeting details are a major improvement — we can now see what happened. But the biggest gap is: what was decided? Meeting summaries should focus on outcomes, not just topics. 'We discussed X' is less useful than 'We decided Y.'",
      feedback_no:
        "Motedetaljene er en stor forbedring -- vi kan na se hva som skjedde. Men det storste gapet er: hva ble besluttet? Motereferater bor fokusere pa utfall, ikke bare emner. 'Vi diskuterte X' er mindre nyttig enn 'Vi besluttet Y.'",
      why:
        "Discussion topics tell you what was talked about. Decisions tell you what was agreed. When people revisit a meeting summary three weeks later, they are looking for decisions and commitments, not a replay of the conversation.",
      why_no:
        "Diskusjonsemner forteller deg hva det ble snakket om. Beslutninger forteller deg hva som ble avtalt. Nar folk gjenbesoeker et motereferat tre uker senere, leter de etter beslutninger og forpliktelser, ikke en gjengivelse av samtalen.",
      tips: [
        "For each topic, note the decision or outcome, not just the discussion",
        "Add action items with a named owner and a due date",
        "Mark any unresolved items as 'open' with a plan for resolution",
      ],
      tips_no: [
        "For hvert emne, noter beslutningen eller utfallet, ikke bare diskusjonen",
        "Legg til oppgaver med en navngitt ansvarlig og en frist",
        "Merk eventuelle uloste punkter som 'apent' med en plan for avklaring",
      ],
      aiOutput:
        "Meeting Summary: Q1 Product Planning\n\nDate: February 10, 2026\nAttendees: Sarah (PM), James (Engineering Lead), Priya (Design Lead), Marcus (Marketing)\n\nDiscussion Topics:\n\n1. Mobile App vs. API Redesign Priority\nThe team discussed whether to prioritize the mobile app or the API redesign for Q1. Both were considered important. There were different perspectives on the urgency of each.\n\n2. New Onboarding Flow\nPriya presented the new onboarding flow design. The team provided feedback and discussed potential improvements.\n\n3. Marketing Launch Timeline\nMarcus shared thoughts on the marketing launch timeline for the mobile app. The timeline is still being finalized.\n\n4. Engineering Capacity\nJames noted that the engineering team is at 90% allocation. This may impact the ability to take on additional work.\n\nNext Steps:\n- Continue planning for Q1 priorities\n- Follow up on onboarding design feedback\n- Finalize marketing timeline",
      aiOutput_no:
        "Motereferat: Q1 Produktplanlegging\n\nDato: 10. februar 2026\nDeltakere: Sarah (PM), James (teknisk leder), Priya (designleder), Marcus (markedsforing)\n\nDiskusjonsemner:\n\n1. Mobilapp vs. API-redesign prioritering\nTeamet diskuterte om de skulle prioritere mobilappen eller API-redesignet for Q1. Begge ble ansett som viktige. Det var ulike perspektiver pa hvor haster hvert prosjekt.\n\n2. Ny onboarding-flyt\nPriya presenterte det nye designet for onboarding-flyten. Teamet ga tilbakemeldinger og diskuterte mulige forbedringer.\n\n3. Markedsforingstidslinje\nMarcus delte tanker om markedsforingstidslinjen for mobilappen. Tidslinjen er fortsatt under utarbeiding.\n\n4. Teknisk kapasitet\nJames papekte at teknisk team er pa 90 % allokering. Dette kan pavirke evnen til a ta pa seg ytterligere arbeid.\n\nNeste steg:\n- Fortsette planlegging av Q1-prioriteringer\n- Folge opp tilbakemeldinger pa onboarding-design\n- Ferdigstille markedsforingstidslinje",
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
      prompt_no:
        "Skriv et motereferat for vart Q1 produktplanleggingsmote avholdt 10. februar 2026. Send til deltakere og kopi til var VP for produkt (Lisa) som ikke kunne delta.\n\nDeltakere: Sarah (PM), James (teknisk leder), Priya (designleder), Marcus (markedsforing).\n\nStruktur referatet slik:\n1. Formalet med motet i en setning\n2. Hovedbeslutninger (hva som ble avtalt):\n   - Beslutning: Prioritere mobilapp over API-redesign for Q1. Begrunnelse: mobil har 3x flere brukerforesporsler og API kan vente til Q2 uten omsetningspavirkning.\n   - Beslutning: Godkjenne Priyas onboarding-flyt v2 med en endring -- legg til en hopp-over-knapp pa veiledningsskjermen.\n3. Oppgaver (tabellformat: oppgave, ansvarlig, frist):\n   - James: gi estimat for mobilapputvikling innen 14. feb\n   - Priya: oppdatere onboarding-mockups med hopp-over-knapp innen 12. feb\n   - Marcus: lage utkast til mobilapplanseringsplan innen 17. feb\n   - Sarah: oppdatere Q1-veikart og dele med Lisa innen 13. feb\n4. Apne punkter (uloste):\n   - Teknisk kapasitet: James sitt team er pa 90 % allokering. Han vurderer om en innleid konsulent trengs og rapporterer innen 14. feb.\n5. Neste mote: 17. februar 2026 kl. 10:00 -- gjennomga mobilappestimater\n\nTone: noytral og faktabasert. Hold det under 300 ord.",
      changes_no:
        "Lagt til: referatdistribusjon (kopi til fraverende VP), tydelig beslutningsseksjon med begrunnelse, oppgaver med ansvarlige og frister, seksjon for apne punkter for uloste emner, neste motedato og ordgrense.",
      pros_no: [
        "Beslutningsseksjonen skiller tydelig hva som ble avtalt fra hva som ble diskutert",
        "Begrunnelse for hver beslutning hjelper fraverende interessenter a forsta 'hvorfor'",
        "Oppgaver har navngitte ansvarlige og spesifikke datoer -- full ansvarlighet",
        "Apne punkter forhindrer uloste emner fra a falle mellom stolene",
        "Neste motedato skaper kontinuitet",
        "Kopi til VP sikrer at ledelsen holdes informert uten a delta pa hvert mote",
      ],
      cons_no: [
        "Kunne lagt til en kontekstlinje for VP-en som ikke var til stede",
        "Fremhever ikke risikoer eller avhengigheter mellom oppgavene",
      ],
      feedback_no:
        "Dette er et motereferat folk faktisk vil referere til. Beslutnings-og-oppgaver-strukturen betyr at hvem som helst kan skanne det pa 30 sekunder og vite noyaktig hva som skjedde og hva de ma gjore. En iterasjon til: legg til en kort kontekstapning for folk som ikke var til stede.",
      why_no:
        "Skiftet fra 'emner diskutert' til 'beslutninger tatt' forvandler et motereferat fra en dagbok til et referansedokument. Oppgaver med ansvarlige og datoer skaper ansvarlighet. Apne punkter sikrer at ingenting stille glemmes.",
      tips_no: [
        "Led med beslutninger, ikke diskusjoner -- folk sjekker referater for a bekrefte hva som ble avtalt",
        "Hver oppgave trenger tre ting: hva, hvem og nar",
        "Ta alltid med en 'Apne punkter'-seksjon -- det viser intellektuell aerlighet om hva som er ulost",
        "Kopi interessenter som ikke kunne delta for a holde dem informert uten a planlegge flere moter",
      ],
      aiOutput_no:
        "Emne: Motereferat -- Q1 Produktplanlegging (10. feb)\n\nHei alle (kopi: Lisa),\n\nFormal: Ferdigstille Q1 produktprioriteringer og godkjenne nytt design for onboarding-flyt.\n\nHovedbeslutninger\n\n1. Mobilapp prioritert over API-redesign for Q1. Mobil har 3x flere brukerforesporsler, og API-redesignet kan utsettes til Q2 uten omsetningspavirkning.\n2. Onboarding-flyt v2 godkjent med en endring: legg til en hopp-over-knapp pa veiledningsskjermen for a redusere friksjon for tilbakevendende brukere.\n\nOppgaver\n\n| Oppgave | Ansvarlig | Frist |\n|---------|-----------|-------|\n| Gi estimat for mobilapputvikling | James | 14. feb |\n| Oppdatere onboarding-mockups med hopp-over | Priya | 12. feb |\n| Lage utkast til mobilapplanseringsplan | Marcus | 17. feb |\n| Oppdatere Q1-veikart og dele med Lisa | Sarah | 13. feb |\n\nApne punkter\n\n- Teknisk kapasitet: Teamet er pa 90 % allokering. James vurderer om en innleid konsulent trengs og rapporterer tilbake innen 14. feb.\n\nNeste mote\n17. februar 2026 kl. 10:00 -- Gjennomga mobilappestimater og oppdatert veikart.\n\nGi beskjed hvis jeg har utelatt noe.\n\nMvh,\n[Ditt navn]",
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
      prompt_no:
        "Skriv et motereferat for vart Q1 produktplanleggingsmote avholdt 10. februar 2026. Send til deltakere og kopi til var VP for produkt (Lisa) som ikke kunne delta.\n\nDeltakere: Sarah (PM), James (teknisk leder), Priya (designleder), Marcus (markedsforing).\n\nStruktur referatet slik:\n1. Kontekst for fraverende interessenter (1-2 setninger): Dette var vart kvartalsvise planleggingsmote for a beslutte Q1 produktprioriteringer. Vi hadde fire agendapunkter: Q1-prioritering, gjennomgang av onboarding-flyt, markedsforingstidslinje og teknisk kapasitet.\n2. Hovedbeslutninger (med kort begrunnelse for hver):\n   - Prioritere mobilapp over API-redesign for Q1. Begrunnelse: mobil har 3x flere brukerforesporsler; API kan flyttes til Q2 uten omsetningspavirkning.\n   - Godkjenne Priyas onboarding-flyt v2 med en endring: legg til hopp-over-knapp pa veiledningsskjermen for tilbakevendende brukere.\n3. Oppgaver (tabell: oppgave, ansvarlig, frist, avhengighet):\n   - James: gi estimat for mobilapputvikling -- frist 14. feb -- ingen avhengigheter\n   - Priya: oppdatere onboarding-mockups med hopp-over -- frist 12. feb -- ingen avhengigheter\n   - Marcus: lage utkast til mobilapplanseringsplan -- frist 17. feb -- avhenger av James sitt estimat\n   - Sarah: oppdatere Q1-veikart og dele med Lisa -- frist 13. feb -- avhenger av James sitt estimat\n4. Apne punkter:\n   - Teknisk kapasitet pa 90 %. James vurderer behov for innleid konsulent -- oppdatering innen 14. feb. MERK: hvis konsulent trengs, kreves budsjettgodkjenning fra Lisa, som kan legge til 1-2 uker.\n5. Risiko: Marcus sin lanseringsplan og Sarahs veikart avhenger begge av James sitt estimat. Hvis det estimatet forsinkes, forskyves begge nedstroms leveranser.\n6. Neste mote: 17. februar kl. 10:00 -- gjennomga estimater og veikart\n\nTone: noytral, faktabasert, konsis. Under 300 ord. Bruk tabell for oppgaver. Uthev beslutningene.",
      changes_no:
        "Lagt til: kontekstseksjon for fraverende interessenter, avhengighetssporing i oppgaver, en eksplisitt risikopapeker for avhengighetskjeden, eskaleringssti for det apne punktet (Lisas budsjettgodkjenning), og formateringsinstruksjoner (uthev, tabell).",
      pros_no: [
        "Kontekstseksjonen sikrer at fraverende interessenter (som Lisa) forstar motet uten a trenge en oppsummeringssamtale",
        "Avhengighetssporing avslorer hvilke oppgaver som er koblet sammen -- forhindrer stille kaskadeforsinkelser",
        "Risikopapeker loefter proaktivt frem den mest sannsynlige feilmodus (James sitt estimat blokkerer to oppgaver)",
        "Eskaleringssti (budsjettgodkjenning fra Lisa) avslorer en potensiell prosessflaskehals tidlig",
        "Formateringsinstruksjoner (uthev, tabell) gjor resultatet skannbart og profesjonelt",
        "Komplett ansvarlighetskjede: hver oppgave har hvem, nar og hva-avhenger-av",
      ],
      cons_no: [
        "For tilbakevendende moter kan dette detaljnivaet males for a spare tid pa a skrive prompten",
        "Sveart detaljerte prompter krever noyaktig informasjon -- dobbeltsjekk datoer og avhengigheter",
      ],
      feedback_no:
        "Dette er en forbilledlig prompt for motereferater. Den produserer et dokument som fungerer bade som dokumentasjon og prosjektstyringsverktoy. Avhengighetssporingen og risikopapekeren er den typen proaktiv tenkning som forhindrer problemer to uker fra na.",
      why_no:
        "Motereferater som sporer avhengigheter forvandler seg fra passive dokumenter til aktive prosjektstyringsverktoy. Ved a gjore avhengighetskjeden eksplisitt (James sitt estimat blokkerer Marcus og Sarah) avslorer du risikoer for de blir overraskelser. Kontekstseksjonen for fraverende interessenter forhindrer 'vent, hva skjedde pa det motet?'-meldingen fra VP-en pa mandag morgen.",
      tips_no: [
        "Legg til en avhengighetskolonne i oppgavene -- det tar 10 sekunder og forhindrer kaskadeforsinkelser",
        "Skriv alltid 1-2 kontekstsetninger for folk som ikke var til stede",
        "Pek ut den storste enkeltrisikoen eksplisitt -- ikke begrav den i oppgavelisten",
        "Bruk motereferatet som et levende dokument: kryss av oppgaver etter hvert som de fullfoeres",
        "Lagre denne strukturen som en mal -- etter det forste referatet tar hvert sammendrag 5 minutter a prompte",
      ],
      aiOutput_no:
        "Emne: Motereferat -- Q1 Produktplanlegging (10. feb)\n\nHei alle (kopi: Lisa),\n\nKontekst: Dette var vart kvartalsvise planleggingsmote for a ferdigstille Q1 produktprioriteringer. Vi dekket fire punkter: Q1-prioritering mellom mobilapp og API-redesign, Priyas onboarding-flytforslag, markedsforingstidslinje og teknisk kapasitet.\n\n**Hovedbeslutninger**\n\n1. **Prioritere mobilapp over API-redesign for Q1.** Mobil har 3x flere brukerforesporsler i var backlog. API-redesignet flyttes til Q2 uten forventet omsetningspavirkning.\n2. **Godkjenne onboarding-flyt v2 med en endring: legg til hopp-over-knapp pa veiledningsskjermen** for tilbakevendende brukere som ikke trenger gjennomgangen.\n\nOppgaver\n\n| Oppgave | Ansvarlig | Frist | Avhenger av |\n|---------|-----------|-------|-------------|\n| Gi estimat for mobilapputvikling | James | 14. feb | Ingen |\n| Oppdatere onboarding-mockups (legg til hopp-over) | Priya | 12. feb | Ingen |\n| Lage utkast til mobilapplanseringsplan | Marcus | 17. feb | James sitt estimat |\n| Oppdatere Q1-veikart, dele med Lisa | Sarah | 13. feb | James sitt estimat |\n\nApne punkter\n\n- Teknisk kapasitet er pa 90 %. James vurderer om en innleid konsulent trengs og rapporterer tilbake innen 14. feb. Merk: hvis konsulent kreves, legger budsjettgodkjenning fra Lisa til anslagsvis 1-2 uker.\n\nRisiko\nMarcus sin lanseringsplan og Sarahs veikartoppdatering avhenger begge av James sitt estimat (frist 14. feb). Hvis det estimatet forsinkes, forskyves begge nedstroms leveranser.\n\nNeste mote\n17. februar 2026 kl. 10:00 -- Gjennomga mobilappestimater og oppdatert Q1-veikart.\n\nSvar gjerne hvis jeg har utelatt eller feilframstilt noe.\n\nMvh,\n[Ditt navn]",
    },
  ],
};

export default example;
