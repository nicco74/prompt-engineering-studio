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
  title_no: "Kvartalsvis ledersammendrag",
  description:
    "Write a one-page executive summary for a quarterly business review, learning how audience awareness and data inclusion produce sharper business documents.",
  description_no:
    "Skriv et ledersammendrag pa en side for en kvartalsvis forretningsgjennomgang, og laer hvordan malgruppebevissthet og inkludering av data gir skarpere forretningsdokumenter.",
  category: "business-docs",
  difficulty: "intermediate",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The vague request ──────────────────────────────────
    {
      version: 1,
      prompt:
        "Write an executive summary for our quarterly review.",
      prompt_no:
        "Skriv et ledersammendrag for var kvartalsgjennomgang.",
      changes: "Initial prompt — no data, no context, no audience details.",
      changes_no: "Forste utkast -- ingen data, ingen kontekst, ingen malgruppedetaljer.",
      pros: [
        "States the document type (executive summary)",
        "Mentions the occasion (quarterly review)",
      ],
      pros_no: [
        "Angir dokumenttypen (ledersammendrag)",
        "Nevner anledningen (kvartalsgjennomgang)",
      ],
      cons: [
        "No company or product context",
        "No actual data or metrics to summarize",
        "Does not specify who will read it (board, VP, team leads?)",
        "No indication of what the quarter's story was — growth, challenges, pivots?",
      ],
      cons_no: [
        "Ingen selskaps- eller produktkontekst",
        "Ingen faktiske data eller maletall a oppsummere",
        "Spesifiserer ikke hvem som skal lese det (styret, VP, teamledere?)",
        "Ingen indikasjon pa hva kvartalets historie var -- vekst, utfordringer, endringer?",
      ],
      feedback:
        "An executive summary without data is just an opinion piece. Executives read summaries to make decisions quickly, so every sentence needs to carry weight. Give the AI something concrete to work with.",
      feedback_no:
        "Et ledersammendrag uten data er bare et meningsinnlegg. Ledere leser sammendrag for a ta beslutninger raskt, sa hver setning ma ha tyngde. Gi AI-en noe konkret a jobbe med.",
      why:
        "Executive audiences are time-poor and detail-hungry. A prompt that lacks specifics forces the AI to invent plausible-sounding but ultimately hollow content. Real data transforms the output from filler into fuel for decisions.",
      why_no:
        "Lederpublikum har lite tid og trenger detaljer. En prompt uten konkrete opplysninger tvinger AI-en til a dikte opp innhold som hores plausibelt ut, men som er innholdsloost. Ekte data forvandler resultatet fra fyllstoff til beslutningsgrunnlag.",
      tips: [
        "Include 3-5 key metrics from the quarter (revenue, growth, churn, NPS, etc.)",
        "Name the audience — a summary for the board reads differently than one for team leads",
        "Mention the one or two biggest themes of the quarter (growth, cost reduction, new market entry …)",
      ],
      tips_no: [
        "Inkluder 3-5 nokkelmaletall fra kvartalet (omsetning, vekst, kundefrafall, NPS osv.)",
        "Navngi malgruppen -- et sammendrag for styret leser annerledes enn et for teamledere",
        "Nevn de en eller to storste temaene for kvartalet (vekst, kostnadsreduksjon, nytt marked ...)",
      ],
      aiOutput:
        "Executive Summary — Q4 Review\n\nThis quarter has been a period of significant progress for our organization. We have achieved several key milestones and continue to build momentum across all departments.\n\nKey highlights include strong performance in sales, continued product development, and improvements in customer satisfaction. Our team has worked diligently to meet our goals and position the company for future growth.\n\nLooking ahead, we remain focused on executing our strategic priorities and delivering value to our stakeholders.\n\nWe recommend continued investment in our core initiatives to maintain this positive trajectory.",
      aiOutput_no:
        "Ledersammendrag -- Q4-gjennomgang\n\nDette kvartalet har vaert en periode med betydelig fremgang for organisasjonen var. Vi har oppnadd flere viktige milepaler og fortsetter a bygge momentum pa tvers av alle avdelinger.\n\nHoydepunkter inkluderer sterk salgsutvikling, fortsatt produktutvikling og forbedringer i kundetilfredshet. Teamet vart har jobbet iherdig for a na malene vare og posisjonere selskapet for fremtidig vekst.\n\nFremover forblir vi fokusert pa a gjennomfore vare strategiske prioriteringer og levere verdi til vare interessenter.\n\nVi anbefaler fortsatt investering i vare kjerneinitiativer for a opprettholde denne positive utviklingen.",
    },

    // ── Step 2 — Add real data and audience ─────────────────────────
    {
      version: 2,
      prompt:
        "Write a one-page executive summary for our Q4 2025 quarterly business review. The audience is our board of directors.\n\nKey metrics:\n- Revenue: $4.2M (up 18% QoQ)\n- New customers: 340 (up 25% QoQ)\n- Churn rate: 5.1% (down from 6.8% in Q3)\n- NPS score: 72\n\nThe main theme this quarter was expanding into the mid-market segment.",
      prompt_no:
        "Skriv et ledersammendrag pa en side for var kvartalsgjennomgang for Q4 2025. Malgruppen er styret vart.\n\nNokkelmaletall:\n- Omsetning: 42 MNOK (opp 18 % QoQ)\n- Nye kunder: 340 (opp 25 % QoQ)\n- Frafallsrate: 5,1 % (ned fra 6,8 % i Q3)\n- NPS-score: 72\n\nHovedtemaet dette kvartalet var ekspansjon inn i mellommarkedssegmentet.",
      changes:
        "Added: specific quarter, audience (board of directors), four real metrics with comparisons, and the quarter's main theme.",
      changes_no:
        "Lagt til: spesifikt kvartal, malgruppe (styret), fire reelle maletall med sammenligninger og kvartalets hovedtema.",
      pros: [
        "Real metrics give the AI concrete material to work with",
        "Quarter-over-quarter comparisons provide narrative direction (growth story)",
        "Board audience signals the need for a strategic, high-level tone",
        "The main theme (mid-market expansion) gives the summary a through-line",
      ],
      pros_no: [
        "Reelle maletall gir AI-en konkret materiale a jobbe med",
        "Kvartal-over-kvartal-sammenligninger gir narrativ retning (veksthistorie)",
        "Styret som malgruppe signaliserer behov for en strategisk, overordnet tone",
        "Hovedtemaet (mellommarkedsekspansjon) gir sammendraget en rod trad",
      ],
      cons: [
        "Does not explain what drove the improvements (actions taken)",
        "Missing forward-looking elements (next quarter priorities, risks)",
        "No structure guidance — the AI decides the layout",
        "Does not mention any challenges or risks (boards want transparency)",
      ],
      cons_no: [
        "Forklarer ikke hva som drev forbedringene (tiltak som ble gjort)",
        "Mangler fremtidsrettede elementer (prioriteringer for neste kvartal, risikoer)",
        "Ingen strukturveiledning -- AI-en bestemmer oppsettet",
        "Nevner ingen utfordringer eller risikoer (styret onsker apenhet)",
      ],
      feedback:
        "Now we are getting somewhere. The AI can write about real numbers. But board members also want to know: what did you do to achieve these results, what kept you up at night, and what is the plan for next quarter?",
      feedback_no:
        "Na begynner det a bli noe. AI-en kan skrive om ekte tall. Men styremedlemmer vil ogsa vite: hva gjorde dere for a oppna disse resultatene, hva holdt dere vakne om natten, og hva er planen for neste kvartal?",
      why:
        "Data is essential but not sufficient. Executives want the story behind the numbers. Adding cause-and-effect context ('we grew because we did X') and forward-looking plans transforms a data dump into a strategic narrative.",
      why_no:
        "Data er nodvendig, men ikke tilstrekkelig. Ledere onsker historien bak tallene. A legge til arsak-og-virkning-kontekst ('vi vokste fordi vi gjorde X') og fremtidsrettede planer forvandler en datadump til en strategisk fortelling.",
      tips: [
        "Add 1-2 sentences about what actions drove the results",
        "Include at least one challenge or risk — it builds credibility",
        "Specify the structure: opening summary, key wins, challenges, outlook",
      ],
      tips_no: [
        "Legg til 1-2 setninger om hvilke tiltak som drev resultatene",
        "Inkluder minst en utfordring eller risiko -- det bygger troverdighet",
        "Spesifiser strukturen: apningssammendrag, hovedseire, utfordringer, utsikter",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 2025 marked a strong quarter driven by our expansion into the mid-market segment. Below are the key highlights.\n\nFinancial Performance\nRevenue reached $4.2M, an 18% increase quarter-over-quarter. This growth was supported by the addition of 340 new customers, representing a 25% increase from Q3.\n\nCustomer Health\nOur churn rate declined from 6.8% in Q3 to 5.1% in Q4, reflecting improvements in customer retention. Our Net Promoter Score of 72 indicates strong customer satisfaction.\n\nMid-Market Expansion\nOur strategic focus on the mid-market segment has begun to yield results, contributing to both revenue growth and customer acquisition targets.\n\nRecommendation\nWe recommend continuing to invest in mid-market acquisition and retention strategies to maintain this growth trajectory.",
      aiOutput_no:
        "Ledersammendrag -- Q4 2025\n\nQ4 2025 var et sterkt kvartal drevet av var ekspansjon inn i mellommarkedssegmentet. Nedenfor er de viktigste hoydepunktene.\n\nOkonomisk utvikling\nOmsetningen nadde 42 MNOK, en okning pa 18 % kvartal-over-kvartal. Denne veksten ble stottet av 340 nye kunder, en okning pa 25 % fra Q3.\n\nKundehelse\nFrafallsraten sank fra 6,8 % i Q3 til 5,1 % i Q4, noe som gjenspeiler forbedringer i kundelojalitet. NPS-scoren pa 72 indikerer sterk kundetilfredshet.\n\nMellommarkedsekspansjon\nVart strategiske fokus pa mellommarkedssegmentet har begynt a gi resultater, og bidrar til bade omsetningsvekst og kundeakkvisisjonsmaal.\n\nAnbefaling\nVi anbefaler a fortsette a investere i mellommarkedsakkvisisjon og lojalitetsstrategier for a opprettholde denne vekstbanen.",
    },

    // ── Step 3 — Add story, structure, and outlook ──────────────────
    {
      version: 3,
      prompt:
        "Write a one-page executive summary (300-400 words) for our Q4 2025 quarterly business review. The audience is our board of directors, who care most about growth trajectory, capital efficiency, and market positioning.\n\nStructure:\n1. Opening paragraph: one-sentence thesis on how the quarter went, followed by the top-line revenue and customer growth numbers\n2. Key wins (3 bullet points): mid-market expansion landed 12 enterprise deals averaging $35K ACV; churn dropped from 6.8% to 5.1% after we launched a dedicated customer success team; NPS hit 72, up from 64\n3. Challenges (2 bullet points): sales cycle for mid-market is 45 days longer than SMB; engineering velocity slowed due to technical debt in the billing system\n4. Outlook for Q1 2026: plan to hire 3 mid-market AEs, begin billing system rewrite, targeting $5M revenue\n\nTone: confident and transparent — do not hide challenges. Use precise language, avoid buzzwords like 'synergy' or 'leverage.'",
      prompt_no:
        "Skriv et ledersammendrag pa en side (300-400 ord) for var kvartalsgjennomgang for Q4 2025. Malgruppen er styret vart, som bryr seg mest om vekstbane, kapitaleffektivitet og markedsposisjonering.\n\nStruktur:\n1. Apningsavsnitt: en setnings tese om hvordan kvartalet gikk, etterfulgt av topplinjetall for omsetning og kundevekst\n2. Hovedseire (3 kulepunkter): mellommarkedsekspansjon ga 12 bedriftsavtaler med gjennomsnittlig 350 000 kr ACV; frafall sank fra 6,8 % til 5,1 % etter at vi lanserte et dedikert kundesuksessteam; NPS traff 72, opp fra 64\n3. Utfordringer (2 kulepunkter): salgssyklusen for mellommarkedet er 45 dager lengre enn SMB; teknisk utviklingstempo sank pa grunn av teknisk gjeld i faktureringssystemet\n4. Utsikter for Q1 2026: planlegger a ansette 3 mellommarkeds-AEer, starte omskriving av faktureringssystem, mal om 50 MNOK omsetning\n\nTone: selvsikker og gjennomsiktig -- ikke skjul utfordringer. Bruk presist sprak, unnga moteord som 'synergi' eller 'utnytte.'",
      changes:
        "Added: board priorities (growth, capital efficiency, positioning), explicit 4-section structure with specific data per section, challenges with root causes, a forward-looking plan with targets, and tone constraints (no buzzwords).",
      changes_no:
        "Lagt til: styrets prioriteringer (vekst, kapitaleffektivitet, posisjonering), eksplisitt 4-delt struktur med spesifikke data per seksjon, utfordringer med rotarsaker, en fremtidsrettet plan med maal, og tonebegrensninger (ingen moteord).",
      pros: [
        "Structure matches what board members expect to see",
        "Challenges section builds credibility and shows self-awareness",
        "Forward-looking plan gives the board something to evaluate and approve",
        "Anti-buzzword instruction ensures crisp, professional language",
        "Word count keeps it to one page as intended",
      ],
      pros_no: [
        "Strukturen matcher det styremedlemmer forventer a se",
        "Utfordringsseksjonen bygger troverdighet og viser selvinnsikt",
        "Fremtidsrettet plan gir styret noe a evaluere og godkjenne",
        "Anti-moteord-instruksjon sikrer skarpt, profesjonelt sprak",
        "Ordgrensen holder det pa en side som tiltenkt",
      ],
      cons: [
        "Could include a one-line 'ask' — does the team need board approval for anything?",
        "Missing competitive context — how does this position us vs. competitors?",
      ],
      cons_no: [
        "Kunne inkludert en kort 'forsporsler' -- trenger teamet styregodkjenning for noe?",
        "Mangler konkurransekontekst -- hvordan posisjonerer dette oss mot konkurrentene?",
      ],
      feedback:
        "This is a strong prompt that will produce a board-ready summary. The challenges section is particularly important — boards lose trust when summaries are all good news. One more iteration could add a specific 'ask' to make the document actionable.",
      feedback_no:
        "Dette er en sterk prompt som vil gi et styreklart sammendrag. Utfordringsseksjonen er spesielt viktig -- styrer mister tillit nar sammendrag bare inneholder gode nyheter. En iterasjon til kunne lagt til en spesifikk 'forsporsler' for a gjore dokumentet handlingsorientert.",
      why:
        "Board members read dozens of documents before each meeting. A clearly structured summary with data, honest challenges, and a forward plan respects their time and earns their trust. The explicit structure ensures the AI does not bury the lead or ramble.",
      why_no:
        "Styremedlemmer leser dusinvis av dokumenter for hvert mote. Et tydelig strukturert sammendrag med data, aerlige utfordringer og en fremtidsplan respekterer tiden deres og gir tillit. Den eksplisitte strukturen sikrer at AI-en ikke begraver hovedpoenget eller snakker seg bort.",
      tips: [
        "If you need board approval for something (budget, headcount), add it as a final section",
        "Link challenges to solutions — 'we identified X, and our plan is Y' shows leadership",
        "Keep each bullet to 1-2 sentences; boards scan, they do not read long paragraphs",
      ],
      tips_no: [
        "Hvis du trenger styregodkjenning for noe (budsjett, bemanning), legg det til som en avsluttende seksjon",
        "Knytt utfordringer til losninger -- 'vi identifiserte X, og planen var er Y' viser lederskap",
        "Hold hvert kulepunkt pa 1-2 setninger; styrer skanner, de leser ikke lange avsnitt",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 2025 was our strongest quarter to date, with revenue reaching $4.2M (up 18% QoQ) and 340 new customers added (up 25% QoQ), driven primarily by our strategic push into the mid-market segment.\n\nKey Wins\n\n- Mid-market expansion delivered 12 enterprise deals at an average ACV of $35K, validating our hypothesis that the product is ready for larger organizations.\n- Customer churn dropped from 6.8% to 5.1% following the launch of a dedicated customer success team in October. Early indicators suggest this trend will continue.\n- Net Promoter Score climbed to 72 (up from 64 in Q3), with mid-market customers rating us particularly well on onboarding experience.\n\nChallenges\n\n- Mid-market sales cycles average 45 days longer than our SMB motion. This creates pipeline forecasting challenges and increases customer acquisition cost.\n- Engineering velocity declined by approximately 15% as the team navigated technical debt in our billing system, which was originally designed for a single pricing tier.\n\nQ1 2026 Outlook\n\nWe are targeting $5M in revenue for Q1 2026. To support this, we plan to hire three mid-market account executives and begin a billing system rewrite that will take approximately two quarters to complete. We expect short-term engineering allocation to shift toward infrastructure, with product velocity recovering by mid-Q2.",
      aiOutput_no:
        "Ledersammendrag -- Q4 2025\n\nQ4 2025 var vart sterkeste kvartal hittil, med en omsetning pa 42 MNOK (opp 18 % QoQ) og 340 nye kunder (opp 25 % QoQ), primaert drevet av vart strategiske fremstot inn i mellommarkedssegmentet.\n\nHovedseire\n\n- Mellommarkedsekspansjon leverte 12 bedriftsavtaler med en gjennomsnittlig ACV pa 350 000 kr, noe som bekrefter var hypotese om at produktet er klart for storre organisasjoner.\n- Kundefrafall sank fra 6,8 % til 5,1 % etter lanseringen av et dedikert kundesuksessteam i oktober. Tidlige indikatorer tyder pa at denne trenden vil fortsette.\n- NPS steg til 72 (opp fra 64 i Q3), der mellommarkedskunder vurderer oss spesielt godt pa onboarding-opplevelsen.\n\nUtfordringer\n\n- Mellommarkedets salgssykluser er i gjennomsnitt 45 dager lengre enn vart SMB-salg. Dette skaper utfordringer med pipeline-prognoser og oker kundeakvisisjonskostnadene.\n- Teknisk utviklingstempo sank med omtrent 15 % da teamet navigerte teknisk gjeld i faktureringssystemet, som opprinnelig ble bygget for en enkelt prismodell.\n\nUtsikter Q1 2026\n\nVi sikter mot 50 MNOK i omsetning for Q1 2026. For a stotte dette planlegger vi a ansette tre mellommarkeds-AEer og starte en omskriving av faktureringssystemet som vil ta omtrent to kvartaler. Vi forventer at teknisk allokering pa kort sikt skifter mot infrastruktur, med produkttempo som gjenopprettes innen midten av Q2.",
    },

    // ── Step 4 — Add the ask and competitive context ────────────────
    {
      version: 4,
      prompt:
        "Write a one-page executive summary (300-400 words) for our Q4 2025 quarterly business review. The audience is our board of directors, who care most about growth trajectory, capital efficiency, and competitive positioning.\n\nStructure:\n1. Opening paragraph: one-sentence thesis ('Q4 was our strongest quarter, with revenue and customer growth accelerating as our mid-market strategy gains traction'), followed by $4.2M revenue (up 18% QoQ) and 340 new customers (up 25% QoQ)\n2. Key wins (3 bullet points): mid-market expansion landed 12 enterprise deals averaging $35K ACV; churn dropped from 6.8% to 5.1% after launching a dedicated CS team; NPS hit 72 (up from 64), and we were named a 'Top Challenger' in the Gartner peer review\n3. Challenges (2 bullet points): mid-market sales cycle is 45 days longer than SMB, increasing CAC; engineering velocity slowed 15% due to billing system tech debt\n4. Outlook for Q1 2026: targeting $5M revenue, hiring 3 mid-market AEs, beginning billing rewrite (2-quarter project)\n5. Board ask: requesting approval to increase Q1 engineering headcount by 2 FTEs to accelerate the billing rewrite without sacrificing product roadmap\n\nTone: confident, transparent, and concise. No buzzwords. Use active voice. Each bullet should be 1-2 sentences maximum.",
      prompt_no:
        "Skriv et ledersammendrag pa en side (300-400 ord) for var kvartalsgjennomgang for Q4 2025. Malgruppen er styret vart, som bryr seg mest om vekstbane, kapitaleffektivitet og konkurranseposisjonering.\n\nStruktur:\n1. Apningsavsnitt: en setnings tese ('Q4 var vart sterkeste kvartal, med akselererende omsetnings- og kundevekst ettersom mellommarkedsstrategien far fotfeste'), etterfulgt av 42 MNOK omsetning (opp 18 % QoQ) og 340 nye kunder (opp 25 % QoQ)\n2. Hovedseire (3 kulepunkter): mellommarkedsekspansjon ga 12 bedriftsavtaler med gjennomsnittlig 350 000 kr ACV; frafall sank fra 6,8 % til 5,1 % etter lansering av dedikert CS-team; NPS traff 72 (opp fra 64), og vi ble kart som 'Top Challenger' i Gartner-evalueringen\n3. Utfordringer (2 kulepunkter): mellommarkedets salgssyklus er 45 dager lengre enn SMB, oker CAC; teknisk utviklingstempo sank 15 % pa grunn av teknisk gjeld i faktureringssystemet\n4. Utsikter Q1 2026: mal om 50 MNOK omsetning, ansette 3 mellommarkeds-AEer, starte omskriving av faktureringssystem (2-kvartalers prosjekt)\n5. Styreforsporsler: ber om godkjenning til a oke Q1 teknisk bemanning med 2 FTEer for a akselerere faktureringsomskrivingen uten a ofre produktveikartet\n\nTone: selvsikker, gjennomsiktig og konsis. Ingen moteord. Bruk aktiv stemme. Hvert kulepunkt bor vaere maks 1-2 setninger.",
      changes:
        "Added: a board 'ask' section (headcount approval), competitive signal (Gartner recognition), a sample thesis sentence, active voice instruction, and sentence length constraint per bullet.",
      changes_no:
        "Lagt til: en styreforsporsler-seksjon (bemanningsgodkjenning), konkurransesignal (Gartner-anerkjennelse), en eksempeltese, aktiv stemme-instruksjon og setningslengdebegrensning per kulepunkt.",
      pros: [
        "The 'ask' section makes the document actionable — board members know what to decide",
        "Gartner mention provides third-party validation for the competitive position",
        "Sample thesis sentence gives the AI the exact opening direction",
        "Active voice and sentence constraints ensure crisp, scannable writing",
        "Complete prompt that covers past performance, challenges, future plan, and decision needed",
      ],
      pros_no: [
        "'Forsporsler'-seksjonen gjor dokumentet handlingsorientert -- styremedlemmer vet hva de skal beslutte",
        "Gartner-omtalen gir tredjeparts validering av konkurranseposisjonen",
        "Eksempeltesen gir AI-en den noyaktige retningen for apningen",
        "Aktiv stemme og setningsbegrensninger sikrer skarpt, skannbart sprak",
        "Komplett prompt som dekker tidligere resultater, utfordringer, fremtidsplan og nodvendig beslutning",
      ],
      cons: [
        "Prompt is quite long — consider saving it as a reusable quarterly template",
        "For real use, you would swap in fresh metrics each quarter",
      ],
      cons_no: [
        "Prompten er ganske lang -- vurder a lagre den som en gjenbrukbar kvartalsmal",
        "For reell bruk ville du byttet inn ferske maletall hvert kvartal",
      ],
      feedback:
        "This is a board-ready prompt. It covers what happened, why it matters, what is next, and what the board needs to decide. The output requires minimal editing and can be used as a working document for the actual QBR.",
      feedback_no:
        "Dette er en styreklaar prompt. Den dekker hva som skjedde, hvorfor det betyr noe, hva som kommer, og hva styret ma beslutte. Resultatet krever minimalt med redigering og kan brukes som arbeidsdokument for den faktiske kvartalsgjennomgangen.",
      why:
        "The best executive summaries are not just informative — they are decision documents. By adding a specific 'ask,' you transform the summary from a status report into a tool that moves the business forward. The competitive signal (Gartner) gives the board external validation that the strategy is working.",
      why_no:
        "De beste ledersammendragene er ikke bare informative -- de er beslutningsdokumenter. Ved a legge til en spesifikk 'forsporsler' forvandler du sammendraget fra en statusrapport til et verktoy som driver forretningen fremover. Konkurransesignalet (Gartner) gir styret ekstern validering pa at strategien fungerer.",
      tips: [
        "Every board document should end with a clear ask or recommendation",
        "Third-party recognition (analyst reports, awards) carries more weight than internal claims",
        "Reuse this prompt structure each quarter — just swap the numbers and themes",
        "If the board needs to vote on something, state it explicitly: 'We request approval for X'",
      ],
      tips_no: [
        "Hvert styre-dokument bor avsluttes med en tydelig forsporsler eller anbefaling",
        "Tredjepartsanerkjennelse (analytiker-rapporter, priser) veier tyngre enn interne pastander",
        "Gjenbruk denne promptstrukturen hvert kvartal -- bare bytt ut tallene og temaene",
        "Hvis styret ma stemme over noe, si det eksplisitt: 'Vi ber om godkjenning for X'",
      ],
      aiOutput:
        "Executive Summary — Q4 2025\n\nQ4 was our strongest quarter, with revenue and customer growth accelerating as our mid-market strategy gains traction. Revenue reached $4.2M, up 18% quarter-over-quarter, and we added 340 new customers, a 25% increase from Q3.\n\nKey Wins\n\n- Our mid-market push delivered 12 enterprise deals at an average annual contract value of $35K, demonstrating strong product-market fit above our original SMB segment.\n- Customer churn fell from 6.8% to 5.1% after we launched a dedicated customer success team in October. We attribute this to proactive onboarding and quarterly health checks.\n- NPS rose to 72 from 64 in Q3. Externally, we were named a 'Top Challenger' in the latest Gartner peer review, our first recognition in this category.\n\nChallenges\n\n- Mid-market sales cycles run 45 days longer than SMB, increasing customer acquisition cost. We are evaluating whether a dedicated pre-sales engineer role could shorten this.\n- Engineering velocity dropped approximately 15% as the team addressed technical debt in our billing system, originally built for a single pricing tier.\n\nQ1 2026 Outlook\n\nWe are targeting $5M in Q1 revenue. We plan to hire three mid-market account executives and begin a two-quarter billing system rewrite that will support usage-based pricing for enterprise accounts.\n\nBoard Ask\n\nWe request approval to add two engineering FTEs in Q1 to accelerate the billing rewrite. Without these hires, the rewrite will extend into Q4 and delay our enterprise pricing launch by two quarters. Estimated annual cost: $340K fully loaded.",
      aiOutput_no:
        "Ledersammendrag -- Q4 2025\n\nQ4 var vart sterkeste kvartal, med akselererende omsetnings- og kundevekst ettersom mellommarkedsstrategien far fotfeste. Omsetningen nadde 42 MNOK, opp 18 % kvartal-over-kvartal, og vi la til 340 nye kunder, en okning pa 25 % fra Q3.\n\nHovedseire\n\n- Vart mellommarkedsfremstot leverte 12 bedriftsavtaler med en gjennomsnittlig arlig kontraktsverdi pa 350 000 kr, noe som demonstrerer sterk produkt-marked-tilpasning utover vart opprinnelige SMB-segment.\n- Kundefrafall sank fra 6,8 % til 5,1 % etter at vi lanserte et dedikert kundesuksessteam i oktober. Vi tilskriver dette proaktiv onboarding og kvartalsvise helsekontroller.\n- NPS steg til 72 fra 64 i Q3. Eksternt ble vi kart som en 'Top Challenger' i den siste Gartner-evalueringen, var forste anerkjennelse i denne kategorien.\n\nUtfordringer\n\n- Mellommarkedets salgssykluser er 45 dager lengre enn SMB, noe som oker kundeakvisisjonskostnadene. Vi vurderer om en dedikert forsalgs-ingenior-rolle kan forkorte dette.\n- Teknisk utviklingstempo falt med omtrent 15 % da teamet tok tak i teknisk gjeld i faktureringssystemet, opprinnelig bygget for en enkelt prismodell.\n\nUtsikter Q1 2026\n\nVi sikter mot 50 MNOK i Q1-omsetning. Vi planlegger a ansette tre mellommarkeds-AEer og starte en to-kvartalers omskriving av faktureringssystemet som vil stotte bruksbasert prising for bedriftskunder.\n\nStyreforsporsler\n\nVi ber om godkjenning til a legge til to tekniske FTEer i Q1 for a akselerere faktureringsomskrivingen. Uten disse ansettelsene vil omskrivingen strekke seg inn i Q4 og forsinke lanseringen av bedriftsprisingen med to kvartaler. Estimert arlig kostnad: 3,4 MNOK fullt belastet.",
    },
  ],
};

export default example;
