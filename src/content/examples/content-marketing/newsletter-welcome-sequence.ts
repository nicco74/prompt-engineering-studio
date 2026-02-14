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
  title_no: "Velkomst-e-post for nyhetsbrev",
  description:
    "Draft a welcome email for new subscribers to an online cooking class platform, learning how persona details and structural guidance shape AI writing.",
  description_no:
    "Skriv en velkomst-e-post for nye abonnenter pa en nettbasert matlagingsplattform, og laer hvordan persondetaljer og strukturell veiledning former AI-teksten.",
  category: "content-marketing",
  difficulty: "intermediate",
  lastReviewed: "2026-02-10",
  steps: [
    // ── Step 1 — Bare-bones request ─────────────────────────────────
    {
      version: 1,
      prompt:
        "Write a welcome email for new subscribers.",
      prompt_no:
        "Skriv en velkomst-e-post til nye abonnenter.",
      changes: "Initial prompt — no context about the brand, audience, or goal.",
      changes_no: "Forste utkast -- ingen kontekst om merkevaren, malgruppen eller malet.",
      pros: [
        "Clearly states the format (welcome email)",
        "Quick to type and easy to iterate on",
      ],
      pros_no: [
        "Sier tydelig fra om formatet (velkomst-e-post)",
        "Rask a skrive og lett a iterere pa",
      ],
      cons: [
        "No mention of what subscribers signed up for",
        "No brand name, voice, or personality cues",
        "Missing any clear goal for the email (engagement, purchase, etc.)",
        "The AI will produce a one-size-fits-all template",
      ],
      cons_no: [
        "Ingen omtale av hva abonnentene meldte seg pa for",
        "Ingen merkevare, stemme eller personlighetssignaler",
        "Mangler et tydelig mal for e-posten (engasjement, kjop osv.)",
        "AI-en vil produsere en generisk mal som passer alt og ingenting",
      ],
      feedback:
        "A welcome email is one of the highest-open-rate emails a brand sends. Wasting it on generic copy is a missed opportunity. Tell the AI what makes your brand unique.",
      feedback_no:
        "En velkomst-e-post er blant e-postene med hoyest apningsrate en merkevare sender. A kaste bort den pa generisk tekst er en tapt mulighet. Fortell AI-en hva som gjor merkevaren din unik.",
      why:
        "Welcome emails set the tone for the entire subscriber relationship. A generic prompt produces a forgettable email, while a detailed one creates an experience that keeps readers opening future messages.",
      why_no:
        "Velkomst-e-poster setter tonen for hele abonnentforholdet. En generisk prompt gir en forglemmelig e-post, mens en detaljert en skaper en opplevelse som far leserne til a fortsette a apne fremtidige meldinger.",
      tips: [
        "Name the brand or product the subscriber just signed up for",
        "Describe the audience — who are these subscribers and what do they want?",
        "State the primary goal: should the reader explore content, make a purchase, or something else?",
      ],
      tips_no: [
        "Navngi merkevaren eller produktet abonnenten nettopp meldte seg pa for",
        "Beskriv malgruppen -- hvem er disse abonnentene og hva onsker de?",
        "Angi hovedmalet: skal leseren utforske innhold, gjore et kjop, eller noe annet?",
      ],
      aiOutput:
        "Subject: Welcome!\n\nHi there,\n\nThank you for subscribing! We are so excited to have you on board.\n\nStay tuned for great content coming your way soon. If you have any questions, feel free to reach out.\n\nBest regards,\nThe Team",
      aiOutput_no:
        "Emne: Velkommen!\n\nHei,\n\nTakk for at du abonnerer! Vi er veldig glade for a ha deg med.\n\nFolg med for flott innhold som kommer snart. Hvis du har sporsmaal, er det bare a ta kontakt.\n\nMed vennlig hilsen,\nTeamet",
    },

    // ── Step 2 — Add brand and audience context ─────────────────────
    {
      version: 2,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who want to cook better but have limited time.",
      prompt_no:
        "Skriv en velkomst-e-post til nye abonnenter hos HomeChef Academy, en nettbasert plattform som laerer hobbykokker a lage restaurantkvalitetsmat. Malgruppen er travle yrkesaktive mellom 25-45 ar som onsker a lage bedre mat, men har begrenset tid.",
      changes:
        "Added: brand name (HomeChef Academy), what the platform does, and a specific audience persona (busy professionals, 25-45, limited time).",
      changes_no:
        "Lagt til: merkevarenavn (HomeChef Academy), hva plattformen gjor, og en spesifikk malgruppepersona (travle yrkesaktive, 25-45, begrenset tid).",
      pros: [
        "Names the brand and describes its value proposition",
        "Defines a clear audience persona with age range and key constraint (limited time)",
        "Gives the AI enough context to tailor language and examples",
      ],
      pros_no: [
        "Navngir merkevaren og beskriver verdilofte",
        "Definerer en tydelig malgruppepersona med aldersgruppe og hovedbegrensning (begrenset tid)",
        "Gir AI-en nok kontekst til a tilpasse sprak og eksempler",
      ],
      cons: [
        "No tone or voice guidance — should it be casual, inspirational, professional?",
        "No structure specified — the AI decides the sections and length",
        "Missing a specific CTA (what should the reader do after reading?)",
        "Does not mention what content the subscriber will receive",
      ],
      cons_no: [
        "Ingen veiledning om tone eller stemme -- skal det vaere avslappet, inspirerende, profesjonelt?",
        "Ingen struktur spesifisert -- AI-en bestemmer seksjonene og lengden",
        "Mangler en spesifikk handlingsoppfordring (hva skal leseren gjore etter a ha lest?)",
        "Nevner ikke hva slags innhold abonnenten vil motta",
      ],
      feedback:
        "The persona details are a big improvement — the AI will now write to a specific person rather than 'everyone.' Next, tell it how the email should feel and what the reader should do.",
      feedback_no:
        "Personadetaljene er en stor forbedring -- AI-en vil na skrive til en bestemt person i stedet for 'alle.' Neste steg er a fortelle den hvordan e-posten skal foles og hva leseren skal gjore.",
      why:
        "Audience personas are powerful because they constrain the AI's choices. Instead of writing for a generic 'subscriber,' it now writes for someone with a specific lifestyle and motivation. This makes every word more relevant.",
      why_no:
        "Malgruppepersonaer er kraftfulle fordi de begrenser AI-ens valg. I stedet for a skrive for en generisk 'abonnent' skriver den na for noen med en spesifikk livsstil og motivasjon. Dette gjor hvert ord mer relevant.",
      tips: [
        "Add tone instructions: 'warm and encouraging' sounds different from 'witty and casual'",
        "Specify the structure you want: greeting, value preview, CTA, sign-off",
        "Include what the subscriber should do next (watch a class, browse recipes, reply to the email)",
      ],
      tips_no: [
        "Legg til toneinstruksjoner: 'varm og oppmuntrende' hores annerledes ut enn 'vittig og avslappet'",
        "Spesifiser strukturen du onsker: hilsen, verdiforhandsvisning, handlingsoppfordring, avslutning",
        "Inkluder hva abonnenten bor gjore videre (se en klasse, bla i oppskrifter, svare pa e-posten)",
      ],
      aiOutput:
        "Subject: Welcome to HomeChef Academy!\n\nHi there,\n\nWelcome to HomeChef Academy! We are thrilled that you have decided to join our community of home cooks.\n\nAt HomeChef Academy, we believe that everyone deserves to enjoy restaurant-quality meals at home. Whether you are a complete beginner or looking to sharpen your skills, our platform has something for you.\n\nHere is what you can expect:\n- Expert-led video courses\n- Step-by-step recipes\n- A supportive community of fellow home cooks\n\nWe know you are busy, so our lessons are designed to fit into your schedule. Most courses can be completed in under 30 minutes.\n\nHappy cooking!\n\nThe HomeChef Academy Team",
      aiOutput_no:
        "Emne: Velkommen til HomeChef Academy!\n\nHei,\n\nVelkommen til HomeChef Academy! Vi er veldig glade for at du har valgt a bli med i vart fellesskap av hobbykokker.\n\nHos HomeChef Academy mener vi at alle fortjener a nyte restaurantkvalitetsmat hjemme. Enten du er helt nybegynner eller onsker a skjerpe ferdighetene dine, har plattformen var noe for deg.\n\nHer er hva du kan forvente:\n- Ekspertledede videokurs\n- Steg-for-steg-oppskrifter\n- Et stottende fellesskap av andre hobbykokker\n\nVi vet at du har det travelt, sa leksjonene vare er designet for a passe inn i timeplanen din. De fleste kurs kan fullfoeres pa under 30 minutter.\n\nGod matlaging!\n\nHomeChef Academy-teamet",
    },

    // ── Step 3 — Define tone, structure, and CTA ────────────────────
    {
      version: 3,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who love food but have limited weeknight cooking time.\n\nTone: warm, encouraging, and slightly playful — like a friend who happens to be a great cook.\n\nStructure the email as:\n1. A warm greeting that acknowledges they just took a great step\n2. One sentence about what HomeChef Academy is\n3. Three bullet points previewing what they will get (weekly 15-minute recipe videos, a printable meal prep guide, and access to the community forum)\n4. A clear CTA: watch the most popular beginner class — 'Knife Skills in 10 Minutes'\n5. A short, friendly sign-off from 'Chef Maria, Founder'\n\nKeep the email under 200 words.",
      prompt_no:
        "Skriv en velkomst-e-post til nye abonnenter hos HomeChef Academy, en nettbasert plattform som laerer hobbykokker a lage restaurantkvalitetsmat. Malgruppen er travle yrkesaktive mellom 25-45 ar som elsker mat, men har begrenset tid til matlaging pa hverdagskveldene.\n\nTone: varm, oppmuntrende og litt leken -- som en venn som tilfeldigvis er en dyktig kokk.\n\nStruktur e-posten slik:\n1. En varm hilsen som anerkjenner at de nettopp tok et godt valg\n2. En setning om hva HomeChef Academy er\n3. Tre kulepunkter som forhandsiser hva de far (ukentlige 15-minutters oppskriftsvideoer, en utskrivbar malprepguide og tilgang til fellesskapsforumet)\n4. En tydelig handlingsoppfordring: se den mest populaere nybegynnertimen -- 'Knivteknikk pa 10 minutter'\n5. En kort, vennlig avslutning fra 'Kokk Maria, grunnlegger'\n\nHold e-posten under 200 ord.",
      changes:
        "Added: specific tone direction, a 5-part structure, concrete content previews, a named CTA (beginner class), a sender persona (Chef Maria), and a word limit.",
      changes_no:
        "Lagt til: spesifikk toneveiledning, en 5-delt struktur, konkrete innholdsforhandsvisninger, en navngitt handlingsoppfordring (nybegynnerklasse), en avsenderpersona (Kokk Maria) og en ordgrense.",
      pros: [
        "Detailed tone guidance ensures a consistent brand voice",
        "Explicit structure eliminates guesswork for the AI",
        "Specific content previews (15-min videos, meal prep guide, forum) set clear expectations",
        "Named CTA gives the reader an obvious next step",
        "Word limit keeps the email scannable for busy readers",
      ],
      pros_no: [
        "Detaljert toneveiledning sikrer en konsistent merkevareestemme",
        "Eksplisitt struktur fjerner gjetting for AI-en",
        "Spesifikke innholdsforhandsvisninger (15-min videoer, malprepguide, forum) setter klare forventninger",
        "Navngitt handlingsoppfordring gir leseren et opplagt neste steg",
        "Ordgrense holder e-posten skannbar for travle lesere",
      ],
      cons: [
        "Does not address the reader's specific pain point up front",
        "No subject line guidance — a great email needs a great subject line too",
        "Could include a personal touch or story to build connection",
      ],
      cons_no: [
        "Tar ikke tak i leserens spesifikke smertepunkt innledningsvis",
        "Ingen veiledning for emnelinje -- en god e-post trenger ogsa en god emnelinje",
        "Kunne inkludert et personlig preg eller en historie for a bygge tilknytning",
      ],
      feedback:
        "This is a well-structured prompt that gives the AI clear guardrails. The output will be on-brand and actionable. To make it exceptional, add a subject line instruction and open with the reader's motivation.",
      feedback_no:
        "Dette er en godt strukturert prompt som gir AI-en tydelige rammer. Resultatet vil vaere i trad med merkevaren og handlingsorientert. For a gjore den enesta ende, legg til instruksjoner for emnelinje og apne med leserens motivasjon.",
      why:
        "Structure is one of the most underused prompt techniques. When you tell the AI exactly which sections to include and in what order, you get predictable, high-quality output every time. Think of it as giving the AI an outline to fill in.",
      why_no:
        "Struktur er en av de mest underbrukte prompt-teknikkene. Nar du forteller AI-en noyaktig hvilke seksjoner som skal inkluderes og i hvilken rekkefolge, far du forutsigbart resultat av hoy kvalitet hver gang. Tenk pa det som a gi AI-en en disposisjon a fylle ut.",
      tips: [
        "Always include subject line instructions — it is the most important line of any email",
        "Open with the reader's 'why' — the reason they signed up — to create immediate relevance",
        "Name a specific person as the sender to make the email feel personal, not corporate",
      ],
      tips_no: [
        "Ta alltid med instruksjoner for emnelinjen -- det er den viktigste linjen i enhver e-post",
        "Apne med leserens 'hvorfor' -- grunnen til at de meldte seg pa -- for a skape umiddelbar relevans",
        "Navngi en bestemt person som avsender for a gjore e-posten personlig, ikke bedriftsaktig",
      ],
      aiOutput:
        "Subject: Welcome to HomeChef Academy!\n\nHey there!\n\nYou just made one of the best decisions for your weeknight dinners — welcome to HomeChef Academy!\n\nWe are a community of home cooks learning to make restaurant-quality meals without spending hours in the kitchen. Here is what is waiting for you:\n\n- Weekly 15-minute recipe videos that fit into even the busiest schedule\n- A printable meal prep guide to set your week up for success\n- Access to our community forum where you can ask questions and share wins\n\nReady to get started? Our most popular beginner class is 'Knife Skills in 10 Minutes' — it is the fastest way to feel like a pro in your own kitchen.\n\nWatch it here: [link]\n\nI cannot wait to see what you cook up.\n\nWarmly,\nChef Maria, Founder of HomeChef Academy",
      aiOutput_no:
        "Emne: Velkommen til HomeChef Academy!\n\nHei!\n\nDu tok nettopp en av de beste avgjorelsene for hverdagsmiddagene dine -- velkommen til HomeChef Academy!\n\nVi er et fellesskap av hobbykokker som laerer a lage restaurantkvalitetsmat uten a bruke timevis pa kjokkenet. Her er hva som venter deg:\n\n- Ukentlige 15-minutters oppskriftsvideoer som passer inn i selv den travleste timeplanen\n- En utskrivbar malprepguide for a sette opp uka til suksess\n- Tilgang til fellesskapsforumet vart der du kan stille sporsmaal og dele seire\n\nKlar til a komme i gang? Var mest populaere nybegynnerklasse er 'Knivteknikk pa 10 minutter' -- det er den raskeste veien til a fole seg som en proff pa eget kjokken.\n\nSe den her: [lenke]\n\nJeg gleder meg til a se hva du lager.\n\nVarme hilsener,\nKokk Maria, grunnlegger av HomeChef Academy",
    },

    // ── Step 4 — Add emotional hook and subject line ────────────────
    {
      version: 4,
      prompt:
        "Write a welcome email for new subscribers to HomeChef Academy, an online platform that teaches home cooks how to make restaurant-quality meals. The audience is busy professionals aged 25-45 who love food but rely on takeout most weeknights because they feel overwhelmed by cooking.\n\nTone: warm, encouraging, and slightly playful — like a friend who happens to be a great cook. Never condescending.\n\nStart with a subject line that hints at a quick transformation (avoid clickbait).\n\nStructure the email as:\n1. Open by acknowledging the reader's real situation — they love great food but ordering takeout every night feels expensive and unfulfilling\n2. Reframe: cooking does not have to be hard or time-consuming\n3. Introduce HomeChef Academy in one sentence\n4. Three bullet points previewing subscriber benefits (weekly 15-minute recipe videos, a printable weeknight meal prep guide, access to the community Q&A forum)\n5. A clear CTA: watch the free beginner class 'Knife Skills in 10 Minutes' — mention it has a 4.9 star rating from 2,000 students\n6. A friendly sign-off from 'Chef Maria, Founder' with a P.S. teasing next week's email (a 3-ingredient pasta recipe)\n\nKeep the email under 200 words. Do not use exclamation marks more than twice.",
      prompt_no:
        "Skriv en velkomst-e-post til nye abonnenter hos HomeChef Academy, en nettbasert plattform som laerer hobbykokker a lage restaurantkvalitetsmat. Malgruppen er travle yrkesaktive mellom 25-45 ar som elsker mat, men bestiller takeaway de fleste hverdagskvelder fordi matlaging foler seg overveldende.\n\nTone: varm, oppmuntrende og litt leken -- som en venn som tilfeldigvis er en dyktig kokk. Aldri nedlatende.\n\nStart med en emnelinje som antyder en rask forvandling (unnga clickbait).\n\nStruktur e-posten slik:\n1. Apne med a anerkjenne leserens reelle situasjon -- de elsker god mat, men a bestille takeaway hver kveld foler seg dyrt og utilfredsstillende\n2. Omramme: matlaging trenger ikke vaere vanskelig eller tidkrevende\n3. Introduser HomeChef Academy i en setning\n4. Tre kulepunkter som forhandsviser abonnentfordeler (ukentlige 15-minutters oppskriftsvideoer, en utskrivbar malprepguide for hverdager, tilgang til fellesskapets sporsmaal-og-svar-forum)\n5. En tydelig handlingsoppfordring: se den gratis nybegynnertimen 'Knivteknikk pa 10 minutter' -- nevn at den har 4,9 stjerner fra 2000 elever\n6. En vennlig avslutning fra 'Kokk Maria, grunnlegger' med en P.S. som teaser neste ukes e-post (en pastaoppskrift med 3 ingredienser)\n\nHold e-posten under 200 ord. Ikke bruk utropstegn mer enn to ganger.",
      changes:
        "Added: emotional opening (acknowledges takeout habit and overwhelm), subject line instruction, social proof on the CTA (4.9 stars, 2,000 students), a P.S. teaser for the next email, and a stylistic constraint (limit exclamation marks).",
      changes_no:
        "Lagt til: emosjonell apning (anerkjenner takeaway-vane og folelse av a vaere overveldet), instruksjon for emnelinje, sosiale bevis pa handlingsoppfordringen (4,9 stjerner, 2000 elever), en P.S.-teaser for neste e-post, og en stilistisk begrensning (begrens utropstegn).",
      pros: [
        "Opens by naming the reader's actual problem — creates instant connection",
        "Reframes cooking as easy, removing the mental barrier",
        "Social proof (4.9 stars, 2,000 students) makes the CTA more compelling",
        "P.S. teaser builds anticipation for the next email, improving future open rates",
        "Exclamation mark limit prevents the email from sounding breathless",
        "Every section has a clear purpose in the persuasion sequence",
      ],
      pros_no: [
        "Apner med a navngi leserens faktiske problem -- skaper umiddelbar tilknytning",
        "Omrammer matlaging som enkelt, fjerner den mentale barrieren",
        "Sosiale bevis (4,9 stjerner, 2000 elever) gjor handlingsoppfordringen mer overbevisende",
        "P.S.-teaseren bygger forventning til neste e-post og forbedrer fremtidige apningsrater",
        "Begrensning pa utropstegn hindrer e-posten i a hores anpusten ut",
        "Hver seksjon har et klart formal i overtalelsessekvensen",
      ],
      cons: [
        "The prompt is quite detailed — for ongoing use, save it as a template",
        "Some brands may prefer a shorter email; this structure is fairly prescriptive",
      ],
      cons_no: [
        "Prompten er ganske detaljert -- for lopende bruk, lagre den som en mal",
        "Noen merkevarer foretrekker kanskje en kortere e-post; denne strukturen er ganske foreskrivende",
      ],
      feedback:
        "This is an excellent prompt. It balances emotional resonance, practical value, and strategic email marketing (the P.S. teaser). The AI output will feel like it was written by a skilled copywriter who understands the audience.",
      feedback_no:
        "Dette er en utmerket prompt. Den balanserer emosjonell resonans, praktisk verdi og strategisk e-postmarkedsforing (P.S.-teaseren). AI-resultatet vil foles som det er skrevet av en dyktig tekstforfatter som forstar malgruppen.",
      why:
        "The key insight here is that great prompts mirror great copywriting: they lead with empathy (the reader's problem), offer a reframe (cooking is easy), present proof (ratings), and create forward momentum (the P.S. teaser). When your prompt follows a persuasion framework, the AI output naturally becomes more compelling.",
      why_no:
        "Nokkelinnsikten her er at gode prompter speiler godt tekstforfatterarbeid: de leder med empati (leserens problem), tilbyr en omramming (matlaging er enkelt), presenterer bevis (vurderinger), og skaper fremdrift (P.S.-teaseren). Nar prompten din folger et overtalelsesrammeverk, blir AI-resultatet naturlig mer overbevisende.",
      tips: [
        "Use P.S. lines in email prompts — they are among the most-read parts of any email",
        "Social proof works best when it is specific: '4.9 stars from 2,000 students' beats 'highly rated'",
        "Constraining style (e.g., limiting exclamation marks) prevents the AI from defaulting to hype",
        "Save your best prompts as templates — swap out the product details and reuse the structure",
      ],
      tips_no: [
        "Bruk P.S.-linjer i e-postprompter -- de er blant de mest leste delene av enhver e-post",
        "Sosiale bevis fungerer best nar de er spesifikke: '4,9 stjerner fra 2000 elever' slar 'hoytvurdert'",
        "A begrense stilen (f.eks. begrense utropstegn) hindrer AI-en i a falle tilbake pa overdriven entusiasme",
        "Lagre de beste promptene dine som maler -- bytt ut produktdetaljene og gjenbruk strukturen",
      ],
      aiOutput:
        "Subject: What if dinner took 15 minutes instead of 45?\n\nHey there,\n\nLet's be honest — you love great food, but most weeknights end with you opening a delivery app because cooking feels like too much after a long day. You are not alone, and you are not lazy. You just need a better system.\n\nHere is the thing: a restaurant-quality meal does not require restaurant-level effort. HomeChef Academy teaches busy people like you to cook incredible meals in the time it takes to wait for takeout.\n\nHere is what you now have access to:\n\n- Weekly 15-minute recipe videos designed for real weeknight schedules\n- A printable meal prep guide so you always have ingredients ready\n- Our community Q&A forum where you can ask Chef Maria anything\n\nThe best place to start? Our free class \"Knife Skills in 10 Minutes\" — rated 4.9 stars by over 2,000 students. It will change how you feel in the kitchen.\n\nWatch it here: [link]\n\nWarmly,\nChef Maria, Founder\n\nP.S. Next week I am sending you my famous 3-ingredient pasta recipe. Trust me, you will want to open that one.",
      aiOutput_no:
        "Emne: Hva om middagen tok 15 minutter i stedet for 45?\n\nHei,\n\nLa oss vaere aerlige -- du elsker god mat, men de fleste hverdagskvelder ender med at du apner en leveringsapp fordi matlaging foler seg som for mye etter en lang dag. Du er ikke alene, og du er ikke lat. Du trenger bare et bedre system.\n\nSaken er den: et maltid av restaurantkvalitet krever ikke restaurantinnsats. HomeChef Academy laerer travle folk som deg a lage fantastiske maltider pa den tiden det tar a vente pa takeaway.\n\nHer er hva du na har tilgang til:\n\n- Ukentlige 15-minutters oppskriftsvideoer designet for ekte hverdagstimeplaner\n- En utskrivbar malprepguide sa du alltid har ingrediensene klare\n- Fellesskapets sporsmaal-og-svar-forum der du kan sporrea Kokk Maria om hva som helst\n\nDet beste stedet a starte? Var gratis klasse \"Knivteknikk pa 10 minutter\" -- vurdert til 4,9 stjerner av over 2000 elever. Den vil forandre hvordan du foler deg pa kjokkenet.\n\nSe den her: [lenke]\n\nVarme hilsener,\nKokk Maria, grunnlegger\n\nP.S. Neste uke sender jeg deg min beroemte pastaoppskrift med 3 ingredienser. Stol pa meg, den e-posten vil du apne.",
    },
  ],
};

export default example;
