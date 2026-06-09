/* essays.jsx — full Unmaking essays (proper-page content).
   Each: id, title, kind, lede (list summary), body[] (paragraphs),
   refs[], tags[], related[], full (true = complete; false = append WIP line).
   Source: Shruti's reworked term papers, dissertation notes & reflective writing. */

const ESSAYS = [
  {
    id: "pedagogy-of-chaos", title: "Pedagogy of Chaos", kind: "Essay · from a term paper",
    lede: "We handed the children chalk markers and pointed at the glass. Draw on the walls.",
    tags: ["chaos", "unlearning", "publics & participation"], related: ["mind-mischief", "workshop-clf"], full: true,
    body: [
      "We handed the children chalk markers and pointed at the glass. Draw on the walls. A group of second graders looked up, wide-eyed and disbelieving — “Wow ma’am, really?” — and in that pause, before a single line was drawn, something had already happened.",
      "The word chaos comes from the Greek khaos: not disorder, but a vast, formless void, the empty chasm from which everything is made. I keep returning to it because the question that has haunted me for a decade — what is art? — never arrives neatly. It comes as a blast of mess and introspection, excited and perplexed and a little afraid, all at once. So at Flair, I let the question take that form. The glass walls of the common area — transparent, yet still a barrier — became a canvas. What unfolded was messy, imperfect, unbridled. Dragging a marker across glass turned into an act of learning through disruption.",
      "I did not break the order of the room to define art for them. I broke it so they could imagine things being otherwise — what Maxine Greene calls a conscious break from the ordinary that releases creative agency. The aim was emergent, not fixed: to let art be felt as a way of being rather than an activity to complete, in the spirit of Dewey, for whom art is a living interaction between a person and their world, never a static object. This is the beautiful risk Gert Biesta describes — surrendering control so the learner’s own subjectivity can surface. My decade-old question found its most honest answer yet: perhaps art really is whatever we want it to be.",
    ],
    refs: [
      "Beghetto, R. A. (2018). Beautiful Risks: Having the Courage to Teach and Learn with Creativity. Bloomsbury.",
      "Biesta, G. J. J. (2013). The Beautiful Risk of Education. Paradigm Publishers.",
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination: Essays on Education, the Arts, and Social Change. Jossey-Bass.",
    ],
  },
  {
    id: "school-is-dead", title: "School is Dead", kind: "Essay · book response",
    lede: "I judged this book by its cover. The title was a provocation, and I took the bait.",
    tags: ["unlearning", "decolonising"], related: ["commodification-sublime"], full: true,
    body: [
      "I judged this book by its cover. The title was a provocation, and I took the bait — my first thought was Nietzsche’s God is dead, so I put on a nihilist’s hat and braced for the worst. How could the institution at the forefront of universal education, the one we have written into our constitutions as a fundamental right, be declared dead?",
      "Everett Reimer had done many things before he wrote it — sold maps, played professional football, printed greeting cards, worked in a tyre factory, sat on government commissions — and then met Ivan Illich in Puerto Rico, where the two of them, at CIDOC, built the case for deschooling. The early chapters make their argument plainly: the institution meant to give us the means to a full life has become an agent of authoritarian ideals. I sat with the discomfort of it. I believe in the fundamental in fundamental right — the rights inherent to being human, necessary for a life worth living. The book’s accusation is that schooling, as we have built it, betrays exactly that.",
      "Reading it, I kept thinking of my own restlessness inside classrooms, my own sense that the most alive learning I have done happened at the edges of school rather than its centre. Reimer does not leave you with comfort. He leaves you with a question about whether the building is the point.",
    ],
    refs: [
      "Reimer, E. (1971). School is Dead: An Essay on Alternatives in Education.",
      "Illich, I. (1971). Deschooling Society.",
    ],
  },
  {
    id: "commodification-sublime", title: "The Commodification of the Sublime", kind: "Essay · from a term paper",
    lede: "Somewhere along the way, learning started to look like an assembly line.",
    tags: ["decolonising", "unlearning", "the sublime"], related: ["school-is-dead"], full: true,
    body: [
      "Somewhere along the way, learning started to look like an assembly line. Success became immediate market applicability — measured in up-to-date résumés and well-kept LinkedIn profiles — and the quieter parts of education began to disappear.",
      "Human Capital Theory, as Gary Becker framed it, treats education as an investment: a person becomes a form of capital, and learning becomes the cost of raising future productivity and income. India’s National Education Policy 2020 echoes this logic, leaning toward employability and marketable skills. As an economic account, it is not wrong. As a complete account of why we learn, it erases almost everything I care about — self-discovery, intellectual wonder, the quiet joy of understanding something for its own sake. When education is reduced to measurable output, it becomes a positional good, and the structural inequities of caste, gender, and region get reproduced rather than addressed. The arts and humanities, fields with no clean line to a salary, are the first to be quietly sidelined.",
      "I write this as an artist and a student who has felt the pull of both worlds. Education is a public good and a private journey toward self-realisation. The sublime in learning — the part that cannot be priced — is precisely the part a market cannot see, and so the part it cannot help but commodify or discard.",
    ],
    refs: [
      "Becker, G. S. (1992). Human Capital.",
      "Government of India. (2020). National Education Policy 2020.",
      "Chattopadhyay, S. (2012); Yuran, N. (2014) — on commodification and the value of education.",
    ],
  },
  {
    id: "language-of-abstraction", title: "Language of Abstraction", kind: "Essay",
    lede: "Abstraction is often mistaken for a refusal of meaning. I have come to think of it as a language.",
    tags: ["abstraction", "aesthetic experience"], related: ["beyond-the-lines"], full: true,
    body: [
      "Abstraction is often mistaken for a refusal of meaning. I have come to think of it as a language — one that says what representation cannot.",
      "Its modern grammar was written by artists trying to free art from the obligation to depict. Wassily Kandinsky treated colour as something closer to music than to illustration, believing form and hue could move the soul directly, bypassing narrative altogether; for him, no method mattered unless it was internally necessary. Piet Mondrian went the other way, toward a rigorous geometry of intersecting lines and primary colours, reducing the visual field to its most fundamental elements in search of a universal equilibrium. By mid-century, Jackson Pollock had taken the canvas to the floor and turned painting into action — dripping, flinging, moving his whole body, dissolving composition into pure process.",
      "Across these very different practices runs one thread: abstraction is not the absence of a subject but the presence of a different kind of one — emotional, sensory, structural. It is a way of organising feeling into form. That is what makes it a language, and what makes learning to read it a genuinely aesthetic education.",
    ],
    refs: [
      "Podro, M. (1987) — on Kandinsky and Mondrian.",
      "Kandinsky, W. (1911). Concerning the Spiritual in Art.",
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination.",
    ],
  },
  {
    id: "beyond-the-lines", title: "Beyond the Lines", kind: "Essay · presented at Unconference 2025",
    lede: "I made this one in front of people. The canvas began in a classroom, as an open-expression exercise.",
    tags: ["abstraction", "aesthetic experience", "publics & participation"], related: ["language-of-abstraction", "in-beyond-the-lines"], full: true,
    body: [
      "I made this one in front of people. The canvas began in a classroom, as an open-expression exercise, and I worked on it live while everyone watched — then we talked. The artwork and the artist made meaning together, out loud, grounded in whatever each of us had lived.",
      "I had carried the painting unfinished from one city to another. I finished it in Mumbai, during the peak of the monsoon, when the whole skyline turned a monotonous greyish-blue and an entire city could vanish in the seconds it took for the rain to close in. That weather got into the work. So did a question I could not shake: on one hand, art is meant to be shared; on the other, its meaning comes from the artist’s own authentic engagement. So what makes it worth it — the showing, or the making? What does it mean to be authentically engaged?",
      "I have stopped trying to resolve that tension and started treating it as the point. Beyond the Lines became a way of arguing that abstraction can foster empathy — that it bridges the personal and the collective when it is created and received as shared, situated experience rather than as a finished object to be judged. The work later travelled to the Art Unbound show and to the Unconference, where I presented it in an unconventional, dialogic form. It was never really about the painting. It was about what happens between people in front of one.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination.",
      "Danto, A. C. (1981). The Transfiguration of the Commonplace.",
    ],
  },
  {
    id: "workshops-as-data", title: "Immersive Art Workshops as Living Data and Artwork", kind: "Essay · from the dissertation",
    lede: "The idea came up almost by accident, in an informal conversation while planning a college fest.",
    tags: ["aesthetic experience", "publics & participation", "unlearning"], related: ["workshop-sifar24", "workshops-mundane"], full: true,
    body: [
      "The idea came up almost by accident, in an informal conversation while we were planning a college fest. I wanted to design a workshop that would replicate the way I, as an artist, actually meet the world — through immersion, collaboration, and dialogue — so that whatever people made would be authentic and grounded in their own narratives.",
      "So we walked. Set against the green of the TISS amphitheatre — climbers, fallen blooms, the occasional monkey or cat — participants gathered flowers, wrappers, even bricks, anything they felt a connection to. We built a shared playlist; people sang along; the music carried memory into the room. I gave almost no instructions, which, more than once, was exactly what made it confusing — “Instructions were so clear, which is what made it so confusing.” I kept my role minimal on purpose, following Jane Sahi’s sense of the facilitator who sets the stage rather than dictating the outcome. The point was not to make something beautiful by anyone’s standard, but to feel confident in your own narrative.",
      "What I did not fully anticipate is that the workshop was never only a workshop. It was simultaneously a piece of art, a pedagogy, and a research site — a place where the field notes, the artefacts, and the conversations became data, and where art, learning, and everyday life collapsed into one another. The constraints helped: a small budget forced us toward found materials and the everyday as a way of knowing. Limitation turned out to be invitation.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination.",
      "Sahi, J. (2002) — on the facilitator and freethinker pedagogy.",
      "Eisner, E. W. (2002). The Arts and the Creation of Mind.",
    ],
  },
  {
    id: "workshops-mundane", title: "The Mundane and the Object", kind: "Aesthetic Experiences in Education · I",
    lede: "“Am I really doing this? You don’t really pay so much attention, day to day.”",
    tags: ["aesthetic experience", "memory"], related: ["workshops-body", "workshops-words"], full: true,
    body: [
      "“It just feels like… am I really doing this? Because you don’t really pay so much attention, day to day.” A participant said this mid-workshop, and it has stayed with me as the cleanest definition of what I am after.",
      "Dewey says that art and life merge when experience is unified and emotionally resonant — that the everyday is fertile aesthetic ground, if only we slow down enough to notice it. My workshops are designed to manufacture that noticing. An ordinary campus you cross every day becomes strange and vivid. A road covered in dried flowers becomes a texture you remember by its crunch underfoot. A monsoon sky becomes a meditation on how small one feels among millions. The mundane, deliberately attended to, turns into what Dewey calls an experience.",
      "And the objects we gather are not neutral. A found flower, a personal lip gloss pressed onto paper, a brick — these carry embodied knowledge. They are not art in themselves, but when we project our past experiences onto them, in a cycle of doing and undergoing, they become art. Greene would call this wide-awakeness: a moral and imaginative attention that turns ordinary things into portals for self-reflection. Aesthetic experience, it turns out, rarely lives in distant studio ideals. It lives in your immediate surroundings, waiting to be foregrounded.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination.",
      "Danto, A. C. (1981). The Transfiguration of the Commonplace.",
    ],
  },
  {
    id: "workshops-body", title: "The Body, the Senses, and Flow", kind: "Aesthetic Experiences in Education · II",
    lede: "“I felt like a sponge. Everything is getting into you… sensory overload, but not overwhelming.”",
    tags: ["aesthetic experience", "nature"], related: ["workshops-mundane", "workshops-words"], full: true,
    body: [
      "“I felt like a sponge. Everything is getting into you… sensory overload, but not overwhelming.” That is what immersion feels like from the inside.",
      "Aesthetic experience is not only visual; it is multisensory and emotional. The sound of a canteen, the colour you resonate with on a given day, the rhythm of a brush across wet canvas — sensory inputs trigger emotional memory, and memory bridges the past with the present. Eisner argues that embodied, multi-sensory engagement is genuine cognition; Greene calls the receptive openness it requires wide-awakeness, the coming-together of the inner and outer worlds. I lean on music for exactly this reason: it offers rhythm, pulls attention beyond the eye, and carries everyone’s private memories into a shared room.",
      "And then, sometimes, time dissolves. “Flow state is not guided — it just happens. You’re not worried about past or future, you’re just being, just doing.” This is Csikszentmihalyi’s flow and Dewey’s consummation at once — the moment when impulse and perception merge and self-consciousness recedes, when the work itself becomes the centre of awareness. People lose track of time; movement finds a rhythm; the whole body gets involved. The most profound aesthetic learning I have witnessed happens precisely here, in that timeless, easeful absorption where making and knowing become the same act.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Eisner, E. W. (2002). The Arts and the Creation of Mind.",
      "Greene, M. (1995). Releasing the Imagination.",
      "Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience.",
    ],
  },
  {
    id: "workshops-words", title: "What Words Cannot Hold", kind: "Aesthetic Experiences in Education · III",
    lede: "“I don’t have words for this, but it’s surreal.” Again and again, people arrive at the edge of language.",
    tags: ["aesthetic experience", "the sublime"], related: ["workshops-mundane", "workshops-body"], full: true,
    body: [
      "“I don’t have words for this, but it’s surreal.” “I have too many thoughts… I don’t know how to articulate it.” Again and again, in my workshops, people arrive at the edge of language and stop.",
      "I have learned to treat that edge as the centre, not the failure. So I work with found objects, simple materials, and open, sometimes unanswerable prompts rather than verbal instruction — acknowledging, with Danto, that words have semantic limits, and that meaning often emerges through gesture, material, and silence instead. I keep some moments wordless on purpose. Some dimensions of art simply elude description and must be apprehended through doing. Eisner’s forms of representation — visual, spatial, embodied — exist precisely to give voice to what language cannot, and Greene reminds me that aesthetic spaces are defined by ambiguity and openness, by using colour and gesture to name what cannot be named.",
      "This is why I privilege process over product. By revealing my own creative workflow — the doubts, the missteps, the spilling and drying — I try to show that art is not a static object but an unfolding. Making (doing) and experiencing (undergoing) are inseparable. The unfinished, the messy, the iterative: this is where the learning is. The artefact is just the residue of a process that was always the real work.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Danto, A. C. (1981). The Transfiguration of the Commonplace.",
      "Eisner, E. W. (2002). The Arts and the Creation of Mind.",
      "Greene, M. (1995). Releasing the Imagination.",
    ],
  },
  {
    id: "ma-dissertation", title: "Exploring the Impact of Aesthetic Experiences on Learning", kind: "MA dissertation · TISS, 2023–24",
    lede: "How immersive, sensory, art-making experiences reshape perception, identity, and the way we come to know.",
    tags: ["aesthetic experience", "the sublime", "archive", "unlearning"], related: ["archive", "workshops-as-data"], full: false, pdf: true,
    body: [
      "My master’s research at TISS asked how aesthetic experiences influence learning, perception, interaction and expression — especially within contemporary and new-media art.",
      "It reads these questions against the current context: a neoliberal world order that tends to commodify learning, and the rapid rise of AI that reshapes how we perceive and make. The dissertation kept pointing past itself — and became the seed from which The Hallucinating Archive grew.",
    ],
    refs: [
      "Dewey, J. (1934). Art as Experience.",
      "Greene, M. (1995). Releasing the Imagination.",
      "Eisner, E. W. (2002). The Arts and the Creation of Mind.",
    ],
  },
];

const ESSAY_INDEX = {};
ESSAYS.forEach((e) => { ESSAY_INDEX[e.id] = e; });

Object.assign(window, { ESSAYS, ESSAY_INDEX });
