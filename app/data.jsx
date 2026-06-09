/* Single data layer — timeline, mycelium and cortex are all renderings of this.
   Content is REAL, transcribed from Shruti's portfolio, CV & THA proposal.

   IMAGES: intentionally NOT wired. Titles/media/sizes/dates are exact from the
   portfolio; the actual artwork files (labelled) are pending from the client,
   so every work renders a greyscale placeholder Plate until then. Do NOT pair
   images to titles by guesswork.

   DATES: only those documented in the portfolio are used. Many paintings carry
   no date in the source — those are left blank (never invented). See readme. */

/* ---- Making › Art. Exact titles / media / sizes from the portfolio.
   Series split is provisional (client will regroup): Abstraction · Semi-abstract.
   `year` omitted where the portfolio gives none. ---- */
const WORKS = [
  // ---- Abstraction ----
  { id: "language-of-abstraction", title: "Language of Abstraction", series: "Abstraction",
    medium: "Charcoal & acrylics on canvas", size: "42 × 42 in",
    tags: ["abstraction", "aesthetic experience", "the sublime"],
    related: ["beyond-the-lines", "a-night", "in-language-of-abstraction"] },
  { id: "a-night", title: "A Night in the City of Dreams", series: "Abstraction",
    medium: "Acrylics on canvas",
    tags: ["abstraction", "memory", "nature"], related: ["language-of-abstraction", "reflections"] },
  { id: "reflections", title: "Reflections", series: "Abstraction",
    medium: "Acrylics on canvas",
    tags: ["memory", "aesthetic experience"], related: ["a-night"] },
  { id: "beyond-us", title: "Beyond Us", series: "Abstraction",
    medium: "Charcoal & acrylics on canvas", size: "42 × 42 in",
    tags: ["the sublime", "nature"], related: ["language-of-abstraction"] },
  { id: "erosion", title: "Erosion", series: "Abstraction",
    medium: "Acrylics on stretched canvas", size: "36 × 48 in",
    tags: ["nature", "memory"], related: ["beyond-us"] },
  { id: "splash", title: "Splash", series: "Abstraction",
    medium: "Acrylics on stretched canvas", size: "24 × 24 in",
    tags: ["abstraction", "play"], related: ["not-really", "crashing"] },
  { id: "crashing", title: "Crashing", series: "Abstraction", suffix: "series",
    medium: "Fluid acrylics on canvas board", size: "24 × 18 in",
    tags: ["chaos", "play"], related: ["splash"] },
  // ---- Semi-abstract ----
  { id: "durga", title: "Durga", series: "Semi-abstract",
    medium: "Acrylics on stretched canvas", size: "36 × 36 in",
    tags: ["rasa", "decolonising", "identity"], related: ["saraswati"] },
  { id: "saraswati", title: "Saraswati", series: "Semi-abstract",
    medium: "Acrylics on canvas", size: "32 × 32 in",
    tags: ["rasa", "decolonising"], related: ["durga"] },
  { id: "not-really", title: "Not Really", series: "Semi-abstract",
    medium: "Acrylics & threads on stretched canvas", size: "24 × 24 in",
    tags: ["thread & material", "abstraction"], related: ["upside-down", "splash"] },
  { id: "upside-down", title: "Upside Down", series: "Semi-abstract",
    medium: "Acrylics, wood & threads on stretched canvas", size: "24 × 24 in",
    tags: ["thread & material", "chaos", "identity"], related: ["not-really"] },
];
const SERIES = ["Abstraction", "Semi-abstract"];

/* ---- Making › Digital work. Procreate, Adobe Illustrator & Adobe Fresco. ---- */
const DIGITAL = [
  { id: "reciprocations", title: "Reciprocations", kind: "Vector illustration", tags: ["play"] },
  { id: "meditation", title: "Meditation", kind: "Vector illustration", tags: ["aesthetic experience"] },
  { id: "surreal-dives", title: "Surreal Dives", kind: "Digital art · Cinema re-imagined", tags: ["play", "memory"] },
  { id: "prints-patterns", title: "Prints & Patterns", kind: "Digital art", tags: ["nature"] },
];

/* ---- Making › Design — brief case cards (dates as documented). ---- */
const DESIGN = [
  { id: "cete-brochure", title: "Placement Brochure", client: "CETE, TISS", year: "May–Nov 2024",
    note: "Art-deco minimalism — neutral yellow & deep green over B&W vintage snapshots, a splash of mustard; text and image themselves as the only design elements across an info-heavy document.", tags: ["aesthetic experience"] },
  { id: "opulent-echoes", title: "Opulent Echoes", client: "Branding · logo · packaging", year: "Mar 2024",
    note: "Identity for handcrafted luxury jewellery (Australia · India). Minimal, symmetric art-deco geometry — a typeface and palette that let the products breathe.", tags: ["collaboration"] },
  { id: "sifar-identity", title: "SIFAR ’24 — ‘SeeFar’", client: "CETE fest identity", year: "Mar 2024",
    note: "The all-seeing owl, breaking barriers to ‘SeeFar’. B&W against colour pops, minimal surrealism & cubism across logo, posters, illustrations, merch and certificates.", tags: ["play", "identity"] },
];

/* ---- Unmaking (Research & Writing). `state`: published | research | pipeline. ---- */
const PAPERS = [
  { id: "ai-panel", title: "AI: Opportunities & Challenges for Learners", state: "published",
    meta: "Panelist · national webinar",
    note: "A panel conversation on what the rise of AI opens and closes for learners — presented as an invited panelist.",
    body: [
      "I joined a national webinar as a panelist to think aloud about what artificial intelligence opens, and closes, for learners.",
      "The conversation moved between the practical and the philosophical: where AI genuinely widens access and agency, where it quietly narrows attention and authorship, and what it asks of teachers who want learning to stay a human, relational act.",
      "My own position grows out of the same inquiry that drives The Hallucinating Archive — treating the machine not as an oracle or a threat, but as a strange mirror that can make our own ways of knowing visible.",
      "This is a short account of the position I brought to the panel; a fuller written version is in progress.",
    ],
    tags: ["AI / algorithmic", "unlearning"], related: ["archive"] },
  { id: "pedagogy-of-chaos", title: "Pedagogy of Chaos", state: "published",
    meta: "School blog · being expanded",
    note: "Unlearning as method — facilitation that lets the room go non-linear. Published on the school blog; a fuller version is in progress.",
    body: [
      "What happens when you let the room go non-linear — when control is loosened on purpose, and chaos is treated not as failure but as material?",
      "This piece reflects on facilitation as a practice of unlearning: holding a space where mistakes become stepping stones, where the plan bends to the people in the room, and where meaning is made together rather than delivered.",
      "It draws on my immersive workshops and on collaborative works like Mind Mischief, where strangers were invited onto the canvas and the questions grew alongside the marks.",
      "A shorter version is published on the school blog; I am expanding it here into a fuller essay.",
    ],
    tags: ["chaos", "unlearning", "publics & participation"], related: ["workshop-clf", "mind-mischief"] },
  { id: "beyond-the-lines", title: "Beyond the Lines: How Aesthetic Experiences Shape the Language of Abstraction", state: "research",
    meta: "Research · presented at Unconference, CLF 2025",
    note: "Abstraction as a non-representational aesthetic language that integrates emotional, intellectual and sensory engagement — anchored in Dewey’s Art as Experience and Greene’s social imagination, tracing abstraction from formalist roots to participatory practice.",
    body: [
      "Abstract art transcends representational boundaries, functioning as a unique aesthetic language that integrates emotional, intellectual, and sensory engagement.",
      "This paper explores how aesthetic experiences deepen the understanding and creation of abstraction as a non-representational language, connecting art-making with meaning-making. Anchored in theories like Dewey’s Art as Experience and Greene’s social imagination, the study traces abstraction’s evolution from formalist roots to contemporary participatory practices.",
      "Insights from the live session ‘Aesthetics of Abstraction’ reveal its transformative role in fostering empathy, bridging personal and collective narratives, and engaging with socio-cultural contexts.",
      "This study affirms abstraction’s potential to evoke profound reflection and identity exploration in art and education. It began with the Language of Abstraction artwork, created live in the classroom, and was presented in an unconventional, interactive form at Unconference, Creative Lab Festival 2025 (ARISA Foundation, Pune).",
    ],
    tags: ["abstraction", "aesthetic experience"], related: ["language-of-abstraction", "in-beyond-the-lines"] },
  { id: "ma-dissertation", title: "Exploring the Impact of Aesthetic Experiences on Learning", state: "research",
    meta: "MA dissertation · TISS, 2023–24 · PDF",
    note: "How aesthetic experiences influence learning, perception and expression in contemporary & new-media art, read against a neoliberal world order and the rise of AI. The seed of The Hallucinating Archive.",
    body: [
      "My master’s research at TISS asked how aesthetic experiences influence learning, perception, interaction and expression — especially within contemporary and new-media art.",
      "It reads these questions against the current context: a neoliberal world order that tends to commodify learning, and the rapid rise of AI that reshapes how we perceive and make.",
      "The work allowed me to understand the processes of unlearning that shape our identities and reveal our authentic selves through creative exploration — and it became the seed from which The Hallucinating Archive grew.",
      "The full dissertation is available as a PDF on request.",
    ],
    tags: ["aesthetic experience", "the sublime", "archive", "unlearning"], related: ["archive", "beyond-the-lines"] },
];
/* Writing in pipeline — titles real, posts being edited/written. */
const PIPELINE = [
  { id: "commodification-sublime", title: "The Commodification of the Sublime", note: "Master’s submission, being reworked into a post." },
  { id: "school-is-dead", title: "School is Dead — a review", note: "Reading Reimer against the present." },
  { id: "curation-pedagogy", title: "Curation as a Pedagogical Tool", note: "Semi-written; on what an arrangement of works asks a viewer to learn." },
  { id: "btl-notes", title: "Reflective notes from Beyond the Lines", note: "Analysis & journal material from the live data collection." },
];

/* ---- In Public › Collaborative & Participatory Works (full text). ---- */
const PARTICIPATORY = [
  { id: "mind-mischief", title: "Mind Mischief", year: "Nov 2022",
    meta: "Acrylics on stretched canvas · 36 × 48 in · Hastkala Bazaar, National Crafts Museum, New Delhi",
    body: "“Mind Mischief” started with a decision to carry an incomplete painting to the exhibition at the National Crafts Museum, New Delhi — a handful of paints and brushes, and questions: Why create art? Why are we afraid to create? Who can make art? What makes one happy? Over the next three days the questions grew, and the answers grew, as visitors were invited to collaborate on the canvas and explore them through chaos and colour — opening my mind to the mischievous ways our minds work.",
    tags: ["collaboration", "chaos", "publics & participation"], related: ["pedagogy-of-chaos", "sifar-banner"] },
  { id: "sifar-banner", title: "SIFAR 2025 Banner", year: "2025",
    meta: "5-metre collaborative banner · flashmob & live jam · CETE’s SIFAR 2025",
    body: "A five-metre collaborative banner staged as a flashmob and live jam at CETE’s SIFAR 2025, inviting spontaneous audience participation — turning public space into a site of embodied play, co-creation and shared aesthetic learning.",
    tags: ["collaboration", "play", "publics & participation"], related: ["mind-mischief"] },
  { id: "in-language-of-abstraction", title: "Language of Abstraction — live", year: "2024",
    meta: "Charcoal & acrylics on canvas · 42 × 42 in · created live, then exhibited at Art Unbound (Nov 2024)",
    body: "Created live in the classroom as part of an open-expression assignment, followed by a dialogue with the viewers — art and artist creating shared meaning grounded in personal experience. It was later developed into an alternative term paper and exhibited at the “Art Unbound” show, curated by Neerajj Mittra, in November 2024.",
    tags: ["abstraction", "aesthetic experience", "publics & participation"], related: ["language-of-abstraction", "beyond-the-lines"] },
  { id: "in-beyond-the-lines", title: "Beyond the Lines — Unconference", year: "Jan 2025",
    meta: "Live interactive presentation · Unconference, Creative Lab Festival · The Box, ARISA Foundation, Pune",
    body: "A live, interactive presentation at Unconference 2025 (ARISA Foundation, The Box, Pune), building on the inquiry that began with the Language of Abstraction artwork. It included live data collection around three abstract works, surfacing patterns in how viewers make meaning — affirming abstraction’s potential to evoke reflection and identity exploration.",
    tags: ["abstraction", "aesthetic experience", "publics & participation"], related: ["beyond-the-lines", "in-language-of-abstraction"] },
];

/* ---- In Public › Immersive Art Workshops (with verbatim testimonials). ---- */
const WORKSHOPS = [
  { id: "workshop-sifar25", title: "Immersive Art Workshop", venue: "SIFAR 2025, TISS, Mumbai", year: "Mar 2025",
    note: "Slow, subtle nature immersion followed by visual expression; participants moved by the experience.",
    tags: ["aesthetic experience", "nature"], related: ["ma-dissertation"] },
  { id: "workshop-clf", title: "Immersive Art Workshop", venue: "Creative Lab Festival", year: "Jan 2025",
    note: "Guided mindfulness, sensory attunement and nature-based making; process over product.",
    tags: ["publics & participation", "unlearning"], related: ["pedagogy-of-chaos"] },
  { id: "workshop-sifar24", title: "Immersive Art Workshop", venue: "SIFAR 2024, TISS, Mumbai", year: "Mar 2024",
    note: "Grounded in Dewey, Greene & Eisner; democratising art through low-resource, accessible making.",
    tags: ["aesthetic experience", "play"], related: ["ma-dissertation"] },
];
const TESTIMONIALS = [
  { quote: "Shruti's workshop was free flowing, without many norms or rules. It allowed for slow and subtle nature immersion followed by expression with visual art. I found myself and participants moved by the experience.", who: "Dr Ankit Dwivedi", role: "Researcher & Storyteller" },
  { quote: "The session gave me the chance to connect with nature in a way I hadn't before — exploring textures, colours and patterns I normally overlook. Expressing what I felt on a canvas was really refreshing, and hearing how others interpreted the same environment sparked great conversations and deeper connections.", who: "Devlina Bhattacharjee", role: "Master’s Student, TISS" },
];

/* ---- In Public › Exhibitions — full chronological list (newest first). ---- */
const EXHIBITIONS = [
  { year: "Nov 2024", title: "Art Unbound", meta: "Curated by Neerajj Mittra · Gallery Art’est — An Art Abode, Gurugram" },
  { year: "Jul 2024", title: "Artist Mentorship Programme", meta: "Mentee · Vulcan Art Gallery (4 weeks, online)" },
  { year: "Oct 2023", title: "Art Confluence", meta: "Absolute Arts · Jawahar Kala Kendra, Jaipur" },
  { year: "Aug 2023", title: "Contemporary Vision", meta: "Absolute Arts · Lokayata Art Gallery, Delhi" },
  { year: "Apr 2023", title: "Inara — Group Art Show", meta: "Vulcan Art Gallery & Art’est — An Art Abode" },
  { year: "Feb 2023", title: "Adivasi — Indigenous Roots", meta: "Speaking Art Foundation · Lokayata Art Gallery, Delhi" },
  { year: "Feb 2023", title: "Astitva — Group Art Exhibition", meta: "Open Palm Gallery · India Habitat Centre, Delhi" },
  { year: "Dec 2022", title: "Zeal Art Camp", meta: "Kalanjali Art Studio · RKG Gallery" },
  { year: "Nov 2022", title: "Hastkala Bazaar", meta: "Artdecko & Kalanjali Art Studio · National Crafts Museum, Delhi" },
  { year: "Oct 2022", title: "India Art Festival", meta: "Nehru Centre, Mumbai" },
  { year: "Sep 2022", title: "Art Voyage 1.0", meta: "Vulcan Art Gallery & Art’est — An Art Abode" },
  { year: "Sep 2022", title: "Kala Parv", meta: "Kalakaar Foundation · Entertainment Society of Goa, Panaji" },
  { year: "Jul 2022", title: "Phoenix — the Rebirth of an Artist", meta: "Kalakaar Foundation · Art Etc, New Delhi" },
  { year: "Jul 2022", title: "Teleportation Art Postcard", meta: "Absolute Arts · Warsaw, Poland — international" },
  { year: "Jul 2022", title: "Delhi Art Carnival", meta: "Absolute Arts · Visual Art Gallery, India Habitat Centre, Delhi" },
  { year: "Jun 2022", title: "Unarchived", meta: "Meraki Art Gallery · Visual Art Gallery, India Habitat Centre, Delhi" },
  { year: "Apr 2022", title: "Majma — Art Camp & Exhibition", meta: "Vulcan Art Gallery & Art’est — An Art Abode" },
  { year: "Jul 2021", title: "Vulcan Art Gallery Virtual Digital Art Exhibition", meta: "Online" },
];

/* ---- Field Notes (public essays expanded from the formal work) ---- */
const FIELD_NOTES = [
  { id: "colour-outside-the-paper", date: "Oct 2024", title: "Colour outside the paper", tag: "Learning", read: "5 min",
    source: "pedagogy-of-chaos", themes: ["unlearning", "chaos"],
    note: "On unlearning, and the courage to make the mark you were told not to make.",
    body: [
      "Somewhere early, most of us learn to stay inside the lines. The page has an edge, and the edge means don’t. We get so good at obeying it that the rule outlives the paper — it keeps running, quietly, under everything we later try to make.",
      "I think about this every time I hand someone a marker and point at a wall instead of a sheet. There is always a pause — wait, really? — and in that pause something loosens. The mark you were told not to make turns out to be the one with all the feeling in it. Unlearning isn’t forgetting; it’s giving yourself permission again.",
      "Colour outside the paper. Let it flow. Feel it. The instruction sounds like play, but underneath it is courage: the small, repeated bravery of trusting your own hand over a rule you inherited and never agreed to.",
    ] },
  { id: "brain-beholds", date: "2024", title: "What the brain does when it beholds", tag: "Aesthetics", read: "8 min",
    source: "ma-dissertation", themes: ["aesthetic experience", "neuroaesthetics"],
    note: "Neuroaesthetics, and why a painting is an event in the nervous system.",
    body: [
      "Stand in front of a painting that moves you and something measurable happens. Before you can say why, your body has already answered — attention sharpens, breath changes, the eye is pulled across the canvas as though the surface were choreography.",
      "Neuroaesthetics is the unglamorous name for a beautiful idea: that beholding is not passive. A painting is an event in the nervous system — the brain doesn’t receive an image so much as build one, predicting, completing, feeling its way toward meaning. Perception, it turns out, is already a kind of thinking.",
      "This is why I keep insisting that aesthetic experience belongs at the centre of learning, not at its decorative edge. When we behold, we are doing cognition with the whole body. The art isn’t only the thing on the wall; it’s what happens in the charged space between it and us.",
    ] },
  { id: "sublime-in-abstraction", date: "2024", title: "The sublime, in abstraction", tag: "Art", read: "7 min",
    source: "language-of-abstraction", themes: ["the sublime", "abstraction"],
    note: "Where awe lives when the figure leaves the frame.",
    body: [
      "The sublime used to need mountains — vast, slightly terrifying scenery that made you feel small in a way that felt, strangely, like being enlarged. Then abstraction took the figure out of the frame, and the question became: where does the awe go when there is nothing left to recognise?",
      "It doesn’t leave. It relocates — into colour, scale, rhythm, the charged emptiness between marks. Kandinsky heard it as music; Rothko built rooms you could stand inside and be held by. Stripped of the picture, the feeling has nowhere to hide, so it arrives more directly, almost physically.",
      "Abstraction, then, is not the absence of meaning but a different route to it. The sublime survives the loss of the figure because it was never really about the mountain. It was about us — standing before something larger than language, and staying.",
    ] },
];

/* ---- Loose Threads — notes, process, WIP, reflective-journal scraps.
   `kind`: poem · note · fragment · question. ---- */
const LOOSE_THREADS = [
  { kind: "poem", title: "Unlearning", tag: "Oct ’24", attribution: "“Untitled” · Ball pen on paper, 2024",
    body: [
      "Growing up, afraid to make mistakes.",
      "The shadows of the mistakes itched in her skin.",
      "One day she read",
      "Colour outside the paper",
      "Let it flow",
      "Feel it",
      "Breathe in it",
      "They told her not to",
      "They tore it down",
      "Colour those marks on your skin",
      "Make them your own",
      "Unlearn. Relearn.",
    ] },
  { kind: "fragment", title: "On expression — an opening question", tag: "reflection",
    body: ["What do you do when there are no words? Why this need to express? To release? What does it mean to be me? Questions come and linger. Who am I? Am I me, or everything I am supposed to be? Colour brings a synergy, a moment of amalgamation, of intermingling and release — a moment of unison with me and the world. Where does the world stop and I begin?"] },
  { kind: "note", title: "From the field notes — Mumbai, monsoon", tag: "field note",
    body: ["Due to personal reasons, I worked on the canvas a few weeks later, in a different city — Mumbai, at the peak of the monsoon. The monotony of greyish-blue was all over the city. The mere seconds it takes for an entire city to disappear made me question my significance — a mere spectator among the millions who think of themselves invisible."] },
  { kind: "fragment", title: "From a workshop, in someone else’s words", tag: "overheard",
    body: ["“I felt like a sponge. Everything is getting into you. You are trying to absorb everything — sensory overload, but not overwhelming.”"] },
  { kind: "question", title: "Does curation teach?", tag: "in pipeline",
    body: ["A half-written thought on curation as a pedagogical act — what an arrangement of works asks a viewer to learn. Refining."] },
];

/* ---- The Hallucinating Archive — full chapter content. No dates in the arc.
   `kind`: inquiry (anchored deep-dive) | track (the narrative arc). `body` = paragraphs. ---- */
const ARCHIVE_CHAPTERS = [
  { n: "01", title: "What it is", kind: "inquiry", body: [
    "The Hallucinating Archive is a participatory installation and a live research environment. It stages an encounter between everyday urban life, a drifting AI “learner,” and a changing constellation of people who walk in and start typing.",
    "The mechanism is simple and precise. For every message someone sends, two responses are generated at once. The first is an instrumental, user-facing reply that appears privately on the participant’s phone, through Telegram or a web chat, and reads like an ordinary conversation. The second is an aesthetic, hallucinatory inner monologue that appears only in the shared space, projected as text over slow, subtly distorted footage and soundscapes drawn from Delhi and Bombay.",
    "By splitting these two tracks across the private screen in your hand and the public surface on the wall, the work lets you inhabit a divided site of meaning-making. The aim is not to fix the machine’s hallucinations, but to work with them as material — to watch how an algorithmic system composes mood, metaphor, and “truth” from the same inputs we use to compose our own narratives.",
  ] },
  { n: "02", title: "How it started", kind: "track", body: [
    "This project did not begin as a project. It began as a question I have carried for the better part of a decade: what does it mean to make meaning? That question became my master’s dissertation at TISS, Exploring the Impact of Aesthetic Experiences on Learning, where I studied how immersive, sensory, art-making experiences reshape perception, identity, and the way we come to know things.",
    "The dissertation kept pointing past itself. I was studying how aesthetic experience shapes learning and identity — and I realised that the most urgent version of that question now lives in the algorithmic realm, where most of us already think, search, scroll, and make meaning. The Archive is what happens when I take the inquiry out of the classroom and into the public, digital everyday.",
  ] },
  { n: "03", title: "How it developed", kind: "track", body: [
    "The inquiry grew through practice rather than theory alone. It moved through my immersive art workshops, through facilitation and dialogue, through teaching inside IB and Big Picture Learning environments, and through systems and policy work where I was asked to read images and narratives for their sensory and relational logic rather than only their content.",
    "Across all of it, one pattern held: meaning does not arrive linearly. It emerges relationally, through atmosphere, affect, fragmentation, and surprise. The Archive is an attempt to build an environment where that process becomes visible — where a room full of strangers, a machine, and two cities can think together and watch themselves doing it.",
  ] },
  { n: "04", title: "Prototype", kind: "track", body: [
    "The current prototype keeps participation anonymous and low-friction. You text into the system from your own phone; the room becomes a reflective space where the machine answers you privately while projecting a poetic, hallucinatory monologue, assembled from everyone’s inputs, over urban visuals.",
    "Two tracks, side by side: an instrumental layer that behaves like a normal chat, and an aesthetic layer that surfaces mood, intuition, and the non-rational patterns living inside the same words. Run together, they let us compare — in real time — how a human and an algorithm each construct sense from an identical message. I launched this prototype publicly at the Unconference, 2026.",
  ] },
  { n: "05", title: "Theoretical grounding", kind: "inquiry", body: [
    "The work sits on a long lineage that treats aesthetics as central to thought, not decorative to it. John Dewey’s art as experience, Maxine Greene’s wide-awakeness and releasing the imagination, and Elliot Eisner’s argument that artistic media are genuine forms of cognition all anchor the claim that perception is a way of knowing.",
    "From there it reaches into phenomenology and embodiment — Merleau-Ponty’s perception as embodied participation, 4E cognition (embodied, embedded, enactive, extended), affect theory after Sara Ahmed, relational aesthetics, and neuroaesthetics. Arthur Danto’s idea that meaning emerges through interpretive frames gives me a way to treat AI hallucination as an epistemic event rather than a malfunction: the machine, like us, narrates the world into being.",
  ] },
  { n: "06", title: "Current work", kind: "track", body: [
    "Right now I am refining the prototype and writing the project into its research frame. I have articulated the Archive under the theme “the site-specific in flux” — understanding site not as a fixed location but as a shifting assemblage of physical place, digital infrastructure, and transient publics.",
    "A version of this thinking went into my submission to Curatorial Matters (Helsinki, 2025), Curating the Self: Self-Narrative Inquiry as Meta-Reflective Curatorial Pedagogy, where I treat curation itself as a pedagogical and research method.",
  ] },
  { n: "07", title: "Next phase", kind: "track", body: [
    "The next phase scales the Archive into a full immersive installation that doubles as a phenomenological, arts-based research site. The methodology is practitioner-led: I work simultaneously as artist, facilitator, and observer, generating data through participant reflections, conversations, visual and spatial responses, facilitation journals, embodied field notes, and affective-atmosphere mapping.",
    "The questions sharpen here — how do immersive aesthetic environments shape perception, regulation, and relational openness, and what happens to identity and meaning-making under conditions of digital fragmentation?",
  ] },
];

/* ---- Cortex: the whole site as a node graph (macro) ---- */
const SITE_MAP = {
  Home: [],
  "The Hallucinating Archive": [],
  Unmaking: ["Essays", "More coming"],
  "In Public": ["Participatory Works", "Workshops", "Exhibitions"],
  About: [],
  Making: ["Making A Mess", "Digital Art & Illustrations", "Design", "Explorations"],
};

/* lookup helper: every connectable node by id, for the mycelium */
const NODE_INDEX = {};
[...WORKS, ...DIGITAL, ...PARTICIPATORY, ...WORKSHOPS].forEach((n) => { NODE_INDEX[n.id] = n; });
NODE_INDEX["archive"] = { id: "archive", title: "The Hallucinating Archive", tags: ["archive", "AI / algorithmic"] };

/* lookup: field-note posts by id, for the Field Notes reader */
const FIELD_NOTE_INDEX = {};
FIELD_NOTES.forEach((p) => { FIELD_NOTE_INDEX[p.id] = p; });

Object.assign(window, {
  WORKS, SERIES, DIGITAL, DESIGN, PARTICIPATORY, WORKSHOPS, TESTIMONIALS,
  EXHIBITIONS, FIELD_NOTES, FIELD_NOTE_INDEX, LOOSE_THREADS, ARCHIVE_CHAPTERS, SITE_MAP, NODE_INDEX,
});
