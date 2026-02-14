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
  title_no: "Produktlanseringsinnlegg for sosiale medier",
  description:
    "Write a LinkedIn announcement for a new project management tool, learning how specificity and audience focus dramatically improve AI output.",
  description_no:
    "Skriv et LinkedIn-innlegg for et nytt prosjektstyringsverktoy, og laer hvordan presisjon og malgruppefokus gir dramatisk bedre AI-resultater.",
  category: "content-marketing",
  difficulty: "beginner",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — The vague starting point ───────────────────────────
    {
      version: 1,
      prompt:
        "Write a social media post about our new product.",
      prompt_no:
        "Skriv et innlegg i sosiale medier om det nye produktet vart.",
      changes: "Initial prompt — no details provided.",
      changes_no: "Forste utkast -- ingen detaljer oppgitt.",
      pros: [
        "Gets the task started quickly",
        "Clear about the format (social media post)",
      ],
      pros_no: [
        "Kommer raskt i gang med oppgaven",
        "Tydelig pa formatet (innlegg i sosiale medier)",
      ],
      cons: [
        "Does not name the product or what it does",
        "No indication of which platform (LinkedIn, X, Instagram …)",
        "No audience or tone guidance — AI will guess",
        "Missing any reason the reader should care",
      ],
      cons_no: [
        "Nevner ikke produktnavnet eller hva det gjor",
        "Ingen angivelse av plattform (LinkedIn, X, Instagram ...)",
        "Ingen veiledning om malgruppe eller tone -- AI-en gjetter",
        "Mangler enhver grunn til at leseren skal bry seg",
      ],
      feedback:
        "The AI has almost nothing to work with here. It will fill in the blanks with generic marketing language that could describe anything from sneakers to software.",
      feedback_no:
        "AI-en har nesten ingenting a jobbe med her. Den fyller tomrommene med generisk markedsforingssprak som kan beskrive alt fra joggesko til programvare.",
      why:
        "Without specifics, AI models default to the most common patterns they have seen, producing bland, forgettable copy. Providing concrete details is the single biggest improvement you can make.",
      why_no:
        "Uten konkrete detaljer faller AI-modeller tilbake pa de vanligste monstrene de har sett, og produserer kjedelig, forglemmelig tekst. A gi konkrete detaljer er den storste enkeltforbedringen du kan gjore.",
      tips: [
        "Name the product and describe what it does in one sentence",
        "Specify which social platform — each has a different style and character limit",
        "Think about who will read this post and what they care about",
      ],
      tips_no: [
        "Gi produktet navn og beskriv hva det gjor i en setning",
        "Spesifiser hvilken plattform -- hver har sin egen stil og tegnbegrensning",
        "Tenk over hvem som leser innlegget og hva de er opptatt av",
      ],
      aiOutput:
        "Exciting news! We just launched our amazing new product. It is designed to help you work smarter and achieve more. Check it out today and see the difference for yourself!\n\n#NewProduct #Innovation #ComingSoon",
      aiOutput_no:
        "Spennende nyheter! Vi har akkurat lansert vart fantastiske nye produkt. Det er designet for a hjelpe deg med a jobbe smartere og oppna mer. Sjekk det ut i dag og se forskjellen selv!\n\n#NyttProdukt #Innovasjon #KommerSnart",
    },

    // ── Step 2 — Add the basics ─────────────────────────────────────
    {
      version: 2,
      prompt:
        "Write a LinkedIn post announcing FlowBoard, our new project management tool for remote teams. Mention that it helps teams stay organized and meet deadlines.",
      prompt_no:
        "Skriv et LinkedIn-innlegg som annonserer FlowBoard, vart nye prosjektstyringsverktoy for fjernarbeidende team. Nevn at det hjelper team med a holde orden og overholde frister.",
      changes:
        "Added: product name, platform (LinkedIn), target audience (remote teams), and two key benefits.",
      changes_no:
        "Lagt til: produktnavn, plattform (LinkedIn), malgruppe (fjernarbeidende team) og to hovedfordeler.",
      pros: [
        "Names the product and platform",
        "Identifies the target audience (remote teams)",
        "Mentions concrete benefits (stay organized, meet deadlines)",
      ],
      pros_no: [
        "Navngir produktet og plattformen",
        "Identifiserer malgruppen (fjernarbeidende team)",
        "Nevner konkrete fordeler (holde orden, overholde frister)",
      ],
      cons: [
        "Benefits are still generic — many tools claim the same things",
        "No differentiator explaining what makes FlowBoard unique",
        "Tone and length are unspecified",
        "No call to action telling the reader what to do next",
      ],
      cons_no: [
        "Fordelene er fortsatt generiske -- mange verktoy hevder det samme",
        "Ingen differensiering som forklarer hva som gjor FlowBoard unikt",
        "Tone og lengde er ikke spesifisert",
        "Ingen handlingsoppfordring som forteller leseren hva de skal gjore videre",
      ],
      feedback:
        "Much better — the AI now knows what to talk about. But 'stay organized and meet deadlines' could describe any project management tool. What makes FlowBoard special?",
      feedback_no:
        "Mye bedre -- na vet AI-en hva den skal skrive om. Men 'holde orden og overholde frister' kan beskrive et hvilket som helst prosjektstyringsverktoy. Hva gjor FlowBoard spesielt?",
      why:
        "Naming the product and audience gives the AI essential context. The output is no longer generic, but it still reads like every other PM tool announcement because we have not told the AI what makes this one different.",
      why_no:
        "A navngi produktet og malgruppen gir AI-en nodvendig kontekst. Resultatet er ikke lenger generisk, men det leser seg fortsatt som enhver annen PM-verktoy-kunngjoring fordi vi ikke har fortalt AI-en hva som gjor dette annerledes.",
      tips: [
        "Add one unique feature or data point that competitors cannot claim",
        "Include a specific call to action (sign up, visit a link, comment)",
        "Give tone guidance — professional, conversational, excited?",
      ],
      tips_no: [
        "Legg til en unik funksjon eller et datapunkt som konkurrentene ikke kan hevde",
        "Inkluder en konkret handlingsoppfordring (registrer deg, besok en lenke, kommenter)",
        "Gi veiledning om tone -- profesjonell, uformell, entusiastisk?",
      ],
      aiOutput:
        "I am thrilled to announce the launch of FlowBoard — a brand-new project management tool built for remote teams.\n\nIf you have ever struggled to keep your distributed team on the same page, FlowBoard is for you. It helps teams stay organized and meet deadlines, no matter where they are working from.\n\nStay tuned for more details!\n\n#FlowBoard #RemoteWork #ProjectManagement",
      aiOutput_no:
        "Jeg er glad for a kunngjore lanseringen av FlowBoard -- et helt nytt prosjektstyringsverktoy bygget for fjernarbeidende team.\n\nHar du noen gang slitt med a holde det distribuerte teamet ditt pa samme side? Da er FlowBoard noe for deg. Det hjelper team med a holde orden og overholde frister, uansett hvor de jobber fra.\n\nFolg med for flere detaljer!\n\n#FlowBoard #Fjernarbeid #Prosjektstyring",
    },

    // ── Step 3 — Differentiate and add a CTA ────────────────────────
    {
      version: 3,
      prompt:
        "Write a professional but conversational LinkedIn post (150-200 words) announcing FlowBoard, our new project management tool for remote teams. Highlight that it is the first PM tool with built-in async video check-ins, replacing daily stand-up meetings. Include a call to action to sign up for the free beta at flowboard.io/beta.",
      prompt_no:
        "Skriv et profesjonelt, men uformelt LinkedIn-innlegg (150-200 ord) som annonserer FlowBoard, vart nye prosjektstyringsverktoy for fjernarbeidende team. Fremhev at det er det forste PM-verktoyet med innebygde asynkrone videooppdateringer som erstatter daglige stand-up-moter. Inkluder en handlingsoppfordring om a registrere seg for gratis beta pa flowboard.io/beta.",
      changes:
        "Added: unique feature (async video check-ins), word count range, tone guidance, and a specific call to action with URL.",
      changes_no:
        "Lagt til: unik funksjon (asynkrone videooppdateringer), ordgrense, toneveiledning og en konkret handlingsoppfordring med URL.",
      pros: [
        "Highlights a genuinely unique feature (async video check-ins)",
        "Specifies tone (professional but conversational) and length (150-200 words)",
        "Includes a clear, actionable CTA with a real URL",
        "Gives the AI enough to write a complete, self-contained post",
      ],
      pros_no: [
        "Fremhever en genuint unik funksjon (asynkrone videooppdateringer)",
        "Spesifiserer tone (profesjonell, men uformell) og lengde (150-200 ord)",
        "Inkluderer en tydelig handlingsoppfordring med ekte URL",
        "Gir AI-en nok til a skrive et komplett, selvstandig innlegg",
      ],
      cons: [
        "Does not mention the problem from the reader's perspective",
        "Could benefit from a hook that grabs attention in the first line",
        "No social proof or credibility signal (beta testers, company backing)",
      ],
      cons_no: [
        "Nevner ikke problemet fra leserens perspektiv",
        "Kunne hatt nytte av en krok som fanger oppmerksomheten i forste linje",
        "Ingen sosiale bevis eller troverdighetsmarkorer (betatestere, selskapsryggdekning)",
      ],
      feedback:
        "This is a solid prompt that will produce usable copy. To go from good to great, try opening with a question or pain point that makes the reader stop scrolling.",
      feedback_no:
        "Dette er en solid prompt som vil gi brukbar tekst. For a ga fra bra til utmerket, prov a apne med et sporsmal eller et smertepunkt som far leseren til a stoppe scrollingen.",
      why:
        "Adding a unique differentiator forces the AI to write about something specific rather than retreating to generic claims. The word count and tone ensure the output matches LinkedIn norms, and the CTA gives the post a clear purpose.",
      why_no:
        "A legge til en unik differensiator tvinger AI-en til a skrive om noe spesifikt i stedet for a falle tilbake pa generiske pastander. Ordgrensen og tonen sorger for at resultatet passer LinkedIn-normer, og handlingsoppfordringen gir innlegget et klart formal.",
      tips: [
        "Start with a hook — a question, surprising stat, or bold statement",
        "Add a line of social proof ('500 beta testers already love it')",
        "Mention a relatable pain point the reader has experienced",
      ],
      tips_no: [
        "Start med en krok -- et sporsmal, overraskende statistikk eller en dristig pastand",
        "Legg til sosiale bevis ('500 betatestere elsker det allerede')",
        "Nevn et gjenkjennelig smertepunkt leseren har opplevd",
      ],
      aiOutput:
        "Remote teams, say goodbye to awkward 8 a.m. stand-ups.\n\nI am excited to introduce FlowBoard — the first project management tool with built-in async video check-ins. Instead of forcing everyone onto the same call, FlowBoard lets each team member record a 60-second update when it suits them. Your teammates watch on their own schedule.\n\nThe result? Fewer meetings, better context, and happier humans across every time zone.\n\nFlowBoard also includes the boards, timelines, and task tracking you expect, all wrapped in a clean interface that actually makes remote collaboration feel effortless.\n\nWe are opening our free beta today and would love your feedback.\n\nSign up at flowboard.io/beta and let me know what you think in the comments.\n\n#FlowBoard #RemoteWork #AsyncFirst #ProjectManagement",
      aiOutput_no:
        "Fjernarbeidende team, si farvel til klumsete morgenmoter klokka 8.\n\nJeg er glad for a introdusere FlowBoard -- det forste prosjektstyringsverktoyet med innebygde asynkrone videooppdateringer. I stedet for a tvinge alle inn pa samme samtale, lar FlowBoard hvert teammedlem spille inn en 60-sekunders oppdatering nar det passer dem. Kollegaene ser den nar det passer for dem.\n\nResultatet? Faerre moter, bedre kontekst og lykkeligere mennesker pa tvers av alle tidssoner.\n\nFlowBoard har ogsa tavlene, tidslinjene og oppgavestyringen du forventer, alt pakket inn i et rent grensesnitt som faktisk gjor fjernsamarbeid uanstrengt.\n\nVi apner var gratis beta i dag og onsker gjerne din tilbakemelding.\n\nRegistrer deg pa flowboard.io/beta og fortell meg hva du synes i kommentarfeltet.\n\n#FlowBoard #Fjernarbeid #AsynkronForst #Prosjektstyring",
    },

    // ── Step 4 — Lead with empathy and proof ────────────────────────
    {
      version: 4,
      prompt:
        'Write a professional but conversational LinkedIn post (150-200 words) announcing FlowBoard, our new project management tool for remote teams. Open with a relatable pain point about daily stand-up meetings in distributed teams. Highlight that FlowBoard is the first PM tool with built-in async video check-ins that replace live stand-ups, saving teams an average of 4 hours per week (based on our beta). Mention that 500 beta testers across 38 countries are already using it. End with a call to action to sign up for the free beta at flowboard.io/beta. Tone: confident and friendly, avoid corporate jargon.',
      prompt_no:
        'Skriv et profesjonelt, men uformelt LinkedIn-innlegg (150-200 ord) som annonserer FlowBoard, vart nye prosjektstyringsverktoy for fjernarbeidende team. Apne med et gjenkjennelig smertepunkt om daglige stand-up-moter i distribuerte team. Fremhev at FlowBoard er det forste PM-verktoyet med innebygde asynkrone videooppdateringer som erstatter live stand-ups, og sparer team i gjennomsnitt 4 timer per uke (basert pa var beta). Nevn at 500 betatestere i 38 land allerede bruker det. Avslutt med en handlingsoppfordring om a registrere seg for gratis beta pa flowboard.io/beta. Tone: selvsikker og vennlig, unnga bedriftsjargong.',
      changes:
        "Added: opening hook direction (pain point), a concrete metric (4 hours/week saved), social proof (500 testers, 38 countries), and explicit tone guidance (avoid jargon).",
      changes_no:
        "Lagt til: retning for apningskrok (smertepunkt), en konkret maling (4 timer/uke spart), sosiale bevis (500 testere, 38 land) og eksplisitt toneveiledning (unnga jargong).",
      pros: [
        "Opens with empathy — the reader feels understood immediately",
        "Concrete metric (4 hours/week) makes the benefit tangible and believable",
        "Social proof (500 testers, 38 countries) builds credibility",
        "Explicit anti-jargon instruction keeps the tone human",
        "Every element has a clear purpose: hook, value, proof, CTA",
      ],
      pros_no: [
        "Apner med empati -- leseren foler seg forstatt med en gang",
        "Konkret maling (4 timer/uke) gjor fordelen handgripelig og troverdig",
        "Sosiale bevis (500 testere, 38 land) bygger troverdighet",
        "Eksplisitt anti-jargong-instruksjon holder tonen menneskelig",
        "Hvert element har et klart formal: krok, verdi, bevis, handlingsoppfordring",
      ],
      cons: [
        "The prompt is getting long — in a real workflow you might save it as a reusable template",
        "Could specify hashtags or emoji preferences for platform optimization",
      ],
      cons_no: [
        "Prompten begynner a bli lang -- i en reell arbeidsflyt ville du kanskje lagret den som en gjenbrukbar mal",
        "Kunne spesifisert emneknagger eller emojipreferanser for plattformoptimalisering",
      ],
      feedback:
        "Excellent prompt. It tells the AI exactly what story to tell, in what order, with real evidence. The output will be ready to post with minimal editing.",
      feedback_no:
        "Utmerket prompt. Den forteller AI-en noyaktig hvilken historie den skal fortelle, i hvilken rekkefolge, med ekte bevis. Resultatet er klart til publisering med minimalt redigeringsarbeid.",
      why:
        "This version applies four refinement principles at once: lead with the reader's problem, quantify the benefit, prove it with data, and close with a clear next step. Each addition makes the AI's job easier and the output more persuasive.",
      why_no:
        "Denne versjonen anvender fire forbedringsprinsipper pa en gang: led med leserens problem, kvantifiser fordelen, bevis den med data, og avslutt med et tydelig neste steg. Hvert tillegg gjor AI-ens jobb enklere og resultatet mer overbevisende.",
      tips: [
        "Save polished prompts like this as templates you can reuse for future launches",
        "Test different opening hooks (question vs. stat vs. bold claim) to see which performs best",
        "When you have real metrics, always include them — numbers outperform vague claims",
      ],
      tips_no: [
        "Lagre polerte prompter som dette som maler du kan gjenbruke til fremtidige lanseringer",
        "Test ulike apningskroker (sporsmal vs. statistikk vs. dristig pastand) for a se hva som fungerer best",
        "Nar du har reelle tall, ta dem alltid med -- tall slar vage pastander",
      ],
      aiOutput:
        'If your remote team\'s morning stand-up feels more like a hostage negotiation across time zones, you are not alone.\n\nThat frustration is exactly why we built FlowBoard — the first project management tool with built-in async video check-ins. Each team member records a quick update when it works for them. No calendar Tetris. No "Can you hear me now?"\n\nOur beta testers — 500 people across 38 countries — report saving an average of 4 hours per week by replacing live stand-ups with async check-ins. That is half a workday back, every single week.\n\nFlowBoard gives you everything else you need too: boards, timelines, task tracking, and smart notifications that actually respect your focus time.\n\nWe are opening our free beta to everyone starting today.\n\nGrab your spot at flowboard.io/beta and tell me in the comments — how much time does your team spend in stand-ups each week?\n\n#FlowBoard #RemoteWork #AsyncFirst #ProductivityTip',
      aiOutput_no:
        'Hvis morgenens stand-up foler seg mer som en gisselforhandling pa tvers av tidssoner, er du ikke alene.\n\nDet er nettopp derfor vi bygde FlowBoard -- det forste prosjektstyringsverktoyet med innebygde asynkrone videooppdateringer. Hvert teammedlem spiller inn en kort oppdatering nar det passer dem. Ingen kalendertetris. Ingen \"Horer du meg na?\"\n\nVare betatestere -- 500 personer i 38 land -- rapporterer at de sparer i gjennomsnitt 4 timer per uke ved a erstatte live stand-ups med asynkrone oppdateringer. Det er en halv arbeidsdag tilbake, hver eneste uke.\n\nFlowBoard gir deg ogsa alt annet du trenger: tavler, tidslinjer, oppgavestyring og smarte varsler som faktisk respekterer fokustiden din.\n\nVi apner var gratis beta for alle fra og med i dag.\n\nSikre deg plassen din pa flowboard.io/beta og fortell meg i kommentarfeltet -- hvor mye tid bruker teamet ditt pa stand-ups hver uke?\n\n#FlowBoard #Fjernarbeid #AsynkronForst #Produktivitetstips',
    },
  ],
};

export default example;
