// Edit this file to change the words on the site.

export const profile = {
  name: "Dev Badodiya",
  role: "Founder & Product guy",
  company: "Cosverse AI",
  companyUrl: "https://cosverse.ai",
  location: "India 🇮🇳",
  timezone: "Asia/Kolkata",
  email: "dev@devvv.online",
  status: "Building Cosverse",
  tagline: "Building Cosverse AI, an Agentic Multimodel AI",
  base: { lat: 23.26, lng: 77.41, label: "Madhya Pradesh" },
  lede: "Building Cosverse AI, an Agentic Multimodel AI. Before this seat I shipped full-stack products, ran the technical side of E-Cell at VIT Bhopal, and made machine-learning tools that had to face a real person.",
};

export type DirLink = { href: string; title: string; hint: string };

export const directory: { more: DirLink[]; elsewhere: DirLink[]; connect: DirLink[] } = {
  more: [
    { href: "/about", title: "About", hint: "Who, what, why" },
    { href: "/now", title: "Now", hint: "Short-term focus" },
    { href: "/someday", title: "Someday", hint: "Long-term goals" },
  ],
  elsewhere: [
    { href: "/studio", title: "Desk", hint: "Ask this site" },
    { href: "/skills", title: "Skills", hint: "Craft and principles" },
    { href: "/favorites", title: "Favorites", hint: "Things I keep" },
    { href: "/writing", title: "Writing", hint: "Notes" },
    { href: "/photos", title: "Photos", hint: "Frames from the work" },
    { href: "/guestbook", title: "Guestbook", hint: "Leave a note" },
    { href: "/visits", title: "Visits", hint: "Live signal" },
    { href: "/colophon", title: "Colophon", hint: "Stack, type, credits" },
  ],
  connect: [
    { href: "https://github.com/devbadodiya", title: "GitHub", hint: "@devbadodiya" },
    { href: "https://www.linkedin.com/in/devbadodiya", title: "LinkedIn", hint: "devbadodiya" },
    { href: "https://peerlist.io/devbadodiya", title: "Peerlist", hint: "Public resume" },
    { href: "https://devbadodiya.medium.com/", title: "Medium", hint: "Longer essays" },
    { href: "mailto:dev@devvv.online", title: "Email", hint: "dev@devvv.online" },
  ],
};

export const primaryNav = [
  { href: "/about", title: "About" },
  { href: "/work", title: "Work" },
  { href: "/favorites", title: "Favorites" },
  { href: "/studio", title: "Desk" },
];

export const moreNav = [
  { href: "/now", title: "Now" },
  { href: "/someday", title: "Someday" },
  { href: "/skills", title: "Skills" },
  { href: "/photos", title: "Photos" },
  { href: "/guestbook", title: "Guestbook" },
  { href: "/visits", title: "Visits" },
  { href: "/colophon", title: "Colophon" },
];

export type TimelineItem = {
  when: string;
  title: string;
  place: string;
  note: string;
};

export const timeline: TimelineItem[] = [
  {
    when: "Apr 2025 — Present",
    title: "Founding member, development",
    place: "Cosverse AI · formerly Lumio AI",
    note: "I work on the product and the engineering under an all-in-one AI chat. The public pitch is one subscription instead of a stack of model bills.",
  },
  {
    when: "Jul 2024 — Aug 2024",
    title: "Web developer",
    place: "Xenosis IT Solutions · Nagpur",
    note: "A short contract on the web, inside a software firm in Nagpur.",
  },
  {
    when: "Aug 2022 — Mar 2023",
    title: "Technical coordinator",
    place: "E-Cell, VIT Bhopal",
    note: "The technical side of a campus entrepreneurship cell. Students trying companies before anyone gave them permission.",
  },
  {
    when: "Apr 2020 — May 2022",
    title: "Full-stack developer",
    place: "devinfotech",
    note: "Two years of shipping interfaces and the APIs behind them. This is where finishing became the job.",
  },
  {
    when: "2021 —",
    title: "B.Tech, Computer Science (AI & ML)",
    place: "VIT Bhopal",
    note: "Computer science with a specialization in artificial intelligence and machine learning.",
  },
];

export const about = {
  who: "I'm Dev Badodiya, a full-stack developer and founding member on the development side of Cosverse AI. I live in Madhya Pradesh. Most of my hours go into a workspace where several models share one chat, one bill, and one memory of what you were doing.",
  care: "I like products that respect a person's time. Interfaces that stay calm. Teams that ship, then tell the truth about what shipped. I am drawn to tools people use to think — write, decide, look something up — not tools that only perform a demo.",
  outside:
    "Outside the product I keep a public trail: notes on Medium, a resume on Peerlist, and a GitHub that still has the college builds. There is a line I wrote down early and still mean: there is neither age nor limit for entrepreneurship and success.",
};

export const now = {
  updated: "30 Sep 2026",
  sections: [
    {
      title: "Building Cosverse",
      body: "The day job is Cosverse AI. I am a founding member on development. The work is the product itself: one room for many models, and the unglamorous pieces that make a SaaS feel finished — mail, notifications, and the second session being better than the first.",
    },
    {
      title: "Writing it down",
      body: "I publish notes about all-in-one AI tools, on this site and on Medium. The point is to say what the product is actually for, not to collect a pile of model names.",
    },
    {
      title: "Here",
      body: "I am based in Madhya Pradesh. The company is online. The life is here: VIT Bhopal is the campus chapter, Nagpur was a short working chapter, and home is still this state.",
    },
    {
      title: "On the desk",
      body: "Next.js, API design, product flows, and prototypes. I would rather show a working screen than a slide about one.",
    },
  ],
};

export const someday = {
  updated: "30 Sep 2026",
  note: "A someday page is a direction, not a promise. It follows the personal-site habit of writing where you are headed.",
  sections: [
    {
      title: "Someday, that line is still true",
      body: "There is neither age nor limit for entrepreneurship and success. I want the calendar to prove it. Not a louder bio — a product people keep open.",
    },
    {
      title: "Someday, Cosverse is the quiet default",
      body: "Not a launch week. A Tuesday. Someone opens one workspace, picks the model that fits the sentence, and does not think about vendors. I want to still be in the editor when that is ordinary.",
    },
    {
      title: "Someday, the campus chapter pays forward",
      body: "E-Cell was a room where students tried companies early. I want to be easy to reach for the person in that room now: a reply, a review, a straight answer about what building actually feels like.",
    },
    {
      title: "Someday, India is the chapter",
      body: "I am not collecting a story about leaving. I want work made here that is taken seriously everywhere, and a life in Madhya Pradesh that is not only a sprint between deploys.",
    },
    {
      title: "Someday, money is quiet",
      body: "Enough that family is covered and the next product decision is not a panic. I am not auditioning for a yacht. I want the worrying to get bored and leave.",
    },
  ],
};

export type Favorite = {
  title: string;
  note: string;
  href: string;
  domain: string;
  preview: string;
  logo?: string;
  mark?: string;
  markColor?: string;
};

export const favorites: Favorite[] = [
  {
    title: "Cosverse AI",
    note: "The room I am building. Many models, one chat.",
    href: "https://chat.cosverse.ai",
    domain: "chat.cosverse.ai",
    preview: "/previews/cosverse.png",
    logo: "/logos/cosverse.png",
  },
  {
    title: "CRED",
    note: "The Indian fintech product I keep coming back to.",
    href: "https://cred.club",
    domain: "cred.club",
    preview: "/previews/cred.png",
    logo: "/logos/cred.png",
  },
  {
    title: "Apple",
    note: "Hardware and software that still feel inevitable.",
    href: "https://www.apple.com",
    domain: "apple.com",
    preview: "/previews/apple.png",
    logo: "/logos/apple.png",
  },
  {
    title: "Stranger Things",
    note: "The Netflix series I never get tired of rewatching.",
    href: "https://www.netflix.com/title/80057281",
    domain: "netflix.com",
    preview: "/previews/stranger-things.png",
    logo: "/logos/netflix.png",
  },
  {
    title: "Rocket Singh",
    note: "Sales, hustle, and a soft heart. Still hits.",
    href: "https://www.imdb.com/title/tt1434447/",
    domain: "imdb.com",
    preview: "/previews/rocket-singh.png",
    logo: "/logos/imdb.png",
  },
  {
    title: "Rockstar",
    note: "The film I put on when I want to feel too much.",
    href: "https://www.imdb.com/title/tt1839596/",
    domain: "imdb.com",
    preview: "/previews/rockstar.png",
    logo: "/logos/imdb.png",
  },
  {
    title: "Cursor",
    note: "The editor that made coding feel like a conversation.",
    href: "https://cursor.com",
    domain: "cursor.com",
    preview: "/previews/cursor.png",
    logo: "/logos/cursor.png",
  },
  {
    title: "Notion",
    note: "Where notes, docs, and half-finished plans live.",
    href: "https://www.notion.so",
    domain: "notion.so",
    preview: "/previews/notion.png",
    logo: "/logos/notion.png",
  },
  {
    title: "Anthropic",
    note: "Claude, and a company that takes care seriously.",
    href: "https://www.anthropic.com",
    domain: "anthropic.com",
    preview: "/previews/anthropic.png",
    logo: "/logos/anthropic.png",
  },
  {
    title: "Nothing",
    note: "Phones and earbuds that still feel designed.",
    href: "https://us.nothing.tech",
    domain: "nothing.tech",
    preview: "/previews/nothing.png",
    logo: "/logos/nothing.png",
  },
];

export type ProjectKind = "Product" | "Learning" | "Web";

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: ProjectKind;
  featured: boolean;
  role: string;
  summary: string;
  lede: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  accent: string;
  aliases: string[];
};

export const projects: Project[] = [
  {
    slug: "cosverse",
    title: "Cosverse AI",
    year: "2025 —",
    kind: "Product",
    featured: true,
    role: "Founding member, development",
    summary: "All-in-one AI chat. Many models, one workspace.",
    lede: "Cosverse is the room I am building for people who already use more than one model. It grew out of Lumio AI. The public pitch is a single subscription — about $7 a month — instead of a pile of separate AI bills.",
    points: [
      "Joined as a founding member on the development side in April 2025.",
      "The product puts several frontier models in one chat so the work stays in one place.",
      "I care about the second week, not the demo: notifications, product email, and a workspace that stays understandable.",
      "Product email moved onto a usage-based sender, because the mail a SaaS sends is part of the product.",
    ],
    stack: ["Next.js", "Product design", "APIs", "Multi-model AI", "SaaS"],
    links: [
      { label: "chat.cosverse.ai", href: "https://chat.cosverse.ai" },
      { label: "cosverse.ai", href: "https://cosverse.ai" },
      { label: "Docs repo", href: "https://github.com/devbadodiya/Cosverse-AI-Docs-Gitbook" },
    ],
    accent: "#14352d",
    aliases: ["cosverse", "lumio", "lumio ai", "chat.cosverse"],
  },
  {
    slug: "varaksha",
    title: "AI Varaksha",
    year: "Archive",
    kind: "Learning",
    featured: false,
    role: "Group project",
    summary: "Plant disease, identified from a single photo.",
    lede: "A group project for a person standing in a field, not for a leaderboard. You give it a photo of a plant. It helps tell healthy from diseased.",
    points: [
      "Built with teammates at the intersection of the AI/ML coursework and a real user: farmers.",
      "The interface is deliberately small. An image goes in. A reading of the plant comes out.",
      "I keep it in the archive because the lesson stuck: a model is unfinished until someone who did not train it can use it.",
    ],
    stack: ["Computer vision", "Machine learning", "Web"],
    links: [{ label: "GitHub", href: "https://github.com/devbadodiya/AI-Varaksha" }],
    accent: "#2a3b12",
    aliases: ["varaksha", "plant", "disease"],
  },
  {
    slug: "helmet",
    title: "Helmet & plate detection",
    year: "Archive",
    kind: "Learning",
    featured: false,
    role: "Computer vision study",
    summary: "See a helmet. Notice a number plate.",
    lede: "A computer-vision study: detect whether a rider is wearing a helmet, and whether a number plate is present in the frame. It lives in the archive as a finished problem from the learning years.",
    points: [
      "Two detectors in one problem, because a single label would have been a tutorial.",
      "The value was the pipeline from image to a decision a person can check.",
      "I do not treat this as a surveillance product. It was a study in seeing clearly.",
    ],
    stack: ["Computer vision", "Machine learning"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/devbadodiya/-Helmet-and-number-plate-detection-",
      },
    ],
    accent: "#1b2836",
    aliases: ["helmet", "number plate", "plate", "anpr"],
  },
  {
    slug: "churn",
    title: "Bank customer churn",
    year: "Archive",
    kind: "Learning",
    featured: false,
    role: "Classical machine learning",
    summary: "Who is about to leave, and why the question matters.",
    lede: "A classical model for a blunt question: which bank customers are likely to leave. I care more about the question than about a trophy accuracy number, so this page does not invent one.",
    points: [
      "A structured-data problem: history in, a risk of leaving out.",
      "Useful as practice in the unfashionable half of machine learning, the half businesses actually run.",
      "No fabricated score on this site. The repo is the record.",
    ],
    stack: ["Machine learning", "Tabular data"],
    links: [{ label: "GitHub", href: "https://github.com/devbadodiya/Bank-Customer-Churn-Model" }],
    accent: "#3a2422",
    aliases: ["churn", "bank"],
  },
  {
    slug: "drone",
    title: "Drone company landing",
    year: "Archive",
    kind: "Web",
    featured: false,
    role: "Page design and build",
    summary: "One screen that has to explain a company.",
    lede: "A single-page introduction for a drone company. HTML, CSS, and the discipline of a screen that cannot hide behind a second route.",
    points: [
      "One page. The company, the offer, and a way to take the next step.",
      "Built as a straightforward marketing surface, not a framework demonstration.",
      "A reminder I still use: if the first screen is confused, the rest of the site cannot save it.",
    ],
    stack: ["HTML", "CSS"],
    links: [{ label: "Peerlist", href: "https://peerlist.io/devbadodiya" }],
    accent: "#1a3148",
    aliases: ["drone", "landing"],
  },
  {
    slug: "thirty",
    title: "30 days, 30 interfaces",
    year: "Archive",
    kind: "Web",
    featured: false,
    role: "Public practice",
    summary: "A streak of small JavaScript pages, finished in public.",
    lede: "Thirty small interfaces in HTML, CSS, and JavaScript. The point was the streak: finish something a person can click, then do it again tomorrow.",
    points: [
      "Beginner-scale on purpose. Reps, not architecture.",
      "The habit outlasted the individual demos.",
      "It is still the clearest picture of how I learned the web: in public, a little at a time.",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "GitHub", href: "https://github.com/devbadodiya/30-days-30-mini-project" }],
    accent: "#342818",
    aliases: ["30 days", "mini project", "javascript"],
  },
];

export type Essay = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  paragraphs: string[];
};

export const essays: Essay[] = [
  {
    slug: "one-chat",
    title: "One chat, many models",
    date: "18.Sep.2026",
    dek: "The market keeps adding models. The user keeps adding tabs. That is a product problem.",
    paragraphs: [
      "The market keeps adding models, and the person using them keeps adding tabs. Cosverse exists because that is a product problem, not a theology of vendors. Someone who writes, codes, and looks things up does not want three bills and three memories of the same task.",
      "I work on that room. The interesting problems show up in the second week. Does the workspace remember what you were doing? Does the mail tell the truth? Is the price something you can say out loud without a spreadsheet? Does the interface stay calm when the model does not?",
      "Aggregation is easy to announce and hard to trust. A switcher on top of five APIs is a demo. A place you leave open while you think is a product. Trust is the part worth building.",
      "I would rather be precise about this. Cosverse grew out of Lumio AI. I am a founding member on development, not a spokesperson for every model we can reach. The bet is simple: many models, one calm place to use them.",
    ],
  },
  {
    slug: "not-the-demo",
    title: "The user is not the demo",
    date: "09.Sep.2026",
    dek: "A metric in a notebook is a rehearsal. A person who did not build the model is the show.",
    paragraphs: [
      "AI Varaksha started as a group project. A photo of a plant. A guess about disease. A farmer who does not have time for our architecture. That last person is the whole assignment.",
      "The helmet study and the bank-churn model were the same lesson in different clothes. A number in a notebook is a rehearsal. Someone who has to trust the output, or ignore it, is the show. I do not put accuracy trophies on this site. If I did not publish a figure with the work, I will not invent one here.",
      "I still like models. I like them more when they survive a person who did not train them. That preference is why a chat product has to be judged on a Tuesday afternoon, not on a launch screenshot.",
      "The archive stays up because I do not want the founding-member line to erase the years that taught me this. The farmers, the riders, the customers about to leave — they were the first editors.",
    ],
  },
  {
    slug: "founding-seat",
    title: "A founding seat is a calendar",
    date: "28.Aug.2026",
    dek: "The title sounds like a summit. Most days it is a queue.",
    paragraphs: [
      "Founding member sounds like a summit. Most days it is a queue: a flow that is confusing, a mail that should have gone out, a decision that does not deserve a meeting. I took the development seat at Cosverse, formerly Lumio, in 2025. The job is to make the product more real than the title.",
      "Before that I shipped as a full-stack developer at devinfotech, coordinated the technical side of E-Cell at VIT Bhopal, and took a short swing as a web developer at Xenosis in Nagpur. The through-line is not a personal brand. It is finishing.",
      "There is a line I keep, and it is mine: there is neither age nor limit for entrepreneurship and success. I would rather the calendar prove it than the bio. A seat at a young company is a chance to do that in public, with the bugs included.",
      "If you write, write about the work. I read those notes. The reliable door is email.",
    ],
  },
];

export type CraftGroup = {
  group: string;
  items: { name: string; detail: string; where: string }[];
};

export const craft: CraftGroup[] = [
  {
    group: "Product",
    items: [
      {
        name: "Product design",
        detail: "Flows, prototypes, and the sentence a feature has to earn before it ships.",
        where: "Cosverse AI",
      },
      {
        name: "Design thinking",
        detail: "Start from the job a person is trying to finish, not from the component library.",
        where: "Cosverse, case studies",
      },
      {
        name: "Wireframing",
        detail: "A rough screen early, so the argument happens before the code hardens.",
        where: "Product work",
      },
    ],
  },
  {
    group: "Engineering",
    items: [
      {
        name: "Next.js",
        detail: "The interface layer I reach for when a product needs routing, server code, and a fast front.",
        where: "Cosverse, this site",
      },
      {
        name: "APIs",
        detail: "The contract between the screen and the system. If it is muddy, the UI cannot save it.",
        where: "Full-stack work since 2020",
      },
      {
        name: "HTML, CSS, JavaScript",
        detail: "Still the floor. The 30-day streak was how I learned to finish a screen.",
        where: "Archive",
      },
    ],
  },
  {
    group: "Applied AI",
    items: [
      {
        name: "Multi-model products",
        detail: "Several models in one place, with a bill and a memory that make sense to a person.",
        where: "Cosverse AI",
      },
      {
        name: "Computer vision",
        detail: "Images in, a decision a person can check. Plants, helmets, plates.",
        where: "Varaksha, helmet study",
      },
      {
        name: "Classical ML",
        detail: "Tabular problems. Who leaves, and what the data can actually support.",
        where: "Churn model",
      },
    ],
  },
  {
    group: "Rooms",
    items: [
      {
        name: "Technical coordination",
        detail: "Making a student entrepreneurship cell function on the technical side.",
        where: "E-Cell, VIT Bhopal",
      },
      {
        name: "Writing in public",
        detail: "Notes on the tools, so the thinking is inspectable.",
        where: "This site, Medium",
      },
    ],
  },
];

export type Principle = {
  slug: string;
  title: string;
  summary: string;
  brief: string;
};

export const principles: Principle[] = [
  {
    slug: "one-room",
    title: "One room for many models",
    summary: "If a person needs several models, the product should not make them keep three tabs and three bills in their head.",
    brief:
      "Decide as if the user already pays for more than one model. Put the work in one room: one thread, one memory, one price they can say out loud. A model switcher with no memory is a demo. Ship the second session.",
  },
  {
    slug: "name-the-user",
    title: "Name the person who was not in the repo",
    summary: "A farmer, a rider, a customer about to leave. If you cannot name them, you are still rehearsing.",
    brief:
      "Before adding a feature, name the person who did not build it and the moment they will use it. If the only user is the demo, stop. Prefer a smaller promise that person can finish over a larger one they have to interpret.",
  },
  {
    slug: "true-sentence",
    title: "The sentence has to be true",
    summary: "Do not invent a metric, a user count, or a trophy score to make a page feel finished.",
    brief:
      "If a number was not published with the work, do not invent one. Write the true sentence: what it is, who it is for, what you actually did. A short true page beats a long decorative one.",
  },
  {
    slug: "interface-twice",
    title: "Draw the flow before the framework",
    summary: "Argue about the path on a rough screen. Code is the wrong place to discover the product is confused.",
    brief:
      "Sketch the path a person takes, including the empty state and the failure, before choosing the framework. If the first screen cannot explain itself, another route will not rescue it.",
  },
  {
    slug: "finish-the-queue",
    title: "A title is a calendar",
    summary: "Founding member is a queue of concrete decisions. Ship the next true thing, then say what shipped.",
    brief:
      "Treat the role as a calendar, not a summit. Pick the next confusing flow, the next mail, the next decision that does not need a meeting. Ship it. Then describe it in a sentence that would still be true next month.",
  },
];

export type Frame = {
  id: string;
  title: string;
  caption: string;
  motif: "chat" | "leaf" | "road" | "ledger" | "sky" | "type";
  from: string;
  to: string;
  tall: boolean;
};

export const frames: Frame[] = [
  {
    id: "switcher",
    title: "One room",
    caption: "Cosverse, reduced to a conversation and a model you can change without leaving.",
    motif: "chat",
    from: "#14352d",
    to: "#0d1f1a",
    tall: true,
  },
  {
    id: "second",
    title: "The second session",
    caption: "The product begins when someone comes back. The first visit is just an introduction.",
    motif: "type",
    from: "#3a241c",
    to: "#1a100e",
    tall: false,
  },
  {
    id: "leaf",
    title: "Field reading",
    caption: "AI Varaksha. A leaf, a photo, a farmer who will not read the paper.",
    motif: "leaf",
    from: "#314214",
    to: "#17200c",
    tall: true,
  },
  {
    id: "road",
    title: "See the rider",
    caption: "A study in attention: helmet, plate, and nothing invented about a real road.",
    motif: "road",
    from: "#1b2836",
    to: "#0e141c",
    tall: false,
  },
  {
    id: "ledger",
    title: "Who leaves",
    caption: "Churn, drawn as a ledger. The question is older than the model.",
    motif: "ledger",
    from: "#3a2422",
    to: "#1c100f",
    tall: false,
  },
  {
    id: "sky",
    title: "One screen",
    caption: "The drone landing page. If the first view fails, there is no second view to hide in.",
    motif: "sky",
    from: "#1a3148",
    to: "#0c1824",
    tall: true,
  },
];

export const stack = [
  {
    name: "Next.js",
    note: "App Router, server pages, and a SQLite/libSQL store for visits and the guestbook.",
    href: "https://nextjs.org",
  },
  {
    name: "React",
    note: "The desk, the command palette, the map, and the lightbox.",
    href: "https://react.dev",
  },
  {
    name: "TypeScript",
    note: "Content, guide, and visit records share types. No mystery objects.",
    href: "https://www.typescriptlang.org",
  },
  {
    name: "CSS",
    note: "A custom stylesheet. Color, type, and motion live as variables, not a utility layer.",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
];

export const likes = [
  {
    name: "Cosverse AI",
    note: "The product in front of me.",
    href: "https://cosverse.ai",
  },
  {
    name: "Peerlist",
    note: "The public resume I try to keep honest.",
    href: "https://peerlist.io/devbadodiya",
  },
  {
    name: "GitHub",
    note: "The archive, including the clumsy early repos.",
    href: "https://github.com/devbadodiya",
  },
  {
    name: "Medium",
    note: "Longer notes on AI platforms.",
    href: "https://devbadodiya.medium.com/",
  },
];

export type UseItem = {
  name: string;
  note: string;
  href: string;
};

export type UseGroup = {
  group: string;
  items: UseItem[];
};

export const uses: UseGroup[] = [
  {
    group: "Build",
    items: [
      {
        name: "Cursor",
        note: "Where most of the code gets written now.",
        href: "https://cursor.com",
      },
      {
        name: "Next.js",
        note: "The default for product surfaces and this site.",
        href: "https://nextjs.org",
      },
      {
        name: "TypeScript",
        note: "Types before the surprise.",
        href: "https://www.typescriptlang.org",
      },
      {
        name: "GitHub",
        note: "History, issues, and the public trail.",
        href: "https://github.com",
      },
    ],
  },
  {
    group: "Think",
    items: [
      {
        name: "Claude",
        note: "The model I reach for when the problem needs care.",
        href: "https://claude.ai",
      },
      {
        name: "Cosverse AI",
        note: "Many models, one room. The thing I am building.",
        href: "https://chat.cosverse.ai",
      },
      {
        name: "Notion",
        note: "Notes, specs, and half-finished plans.",
        href: "https://www.notion.so",
      },
    ],
  },
  {
    group: "Carry",
    items: [
      {
        name: "Nothing",
        note: "Phone and earbuds that still feel designed.",
        href: "https://us.nothing.tech",
      },
      {
        name: "Apple",
        note: "Mac and the quiet hardware that stays out of the way.",
        href: "https://www.apple.com",
      },
    ],
  },
  {
    group: "Watch & listen",
    items: [
      {
        name: "Apple Music",
        note: "Background for deep work and late edits.",
        href: "https://music.apple.com",
      },
      {
        name: "YouTube",
        note: "Talks, demos, and the occasional deep dive.",
        href: "https://www.youtube.com",
      },
    ],
  },
];

export const listening = {
  updated: "30 Sep 2026",
  title: "Daayre",
  artist: "Pritam & Arijit Singh",
  album: "Dilwale",
  note: "On when the week needs air.",
  href: "https://music.apple.com/in/song/daayre/1057567679",
  embed: "https://embed.music.apple.com/in/song/daayre/1057567679",
};

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getEssay(slug: string) {
  return essays.find((essay) => essay.slug === slug);
}

export function readingTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
