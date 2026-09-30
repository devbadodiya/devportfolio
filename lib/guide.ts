import {
  about,
  craft,
  directory,
  essays,
  now,
  principles,
  profile,
  projects,
  someday,
  timeline,
} from "./content";

export type GuideLink = { href: string; label: string };

export type GuideReply = {
  paragraphs: string[];
  links: GuideLink[];
};

export const suggestions = [
  "What are you building now?",
  "Tell me about Cosverse",
  "What else have you shipped?",
  "How do I reach you?",
  "What do you want someday?",
];

function reply(paragraphs: string[], links: GuideLink[] = []): GuideReply {
  return { paragraphs: paragraphs.filter(Boolean), links };
}

export function answerQuestion(raw: string): GuideReply {
  const q = raw.toLowerCase().replace(/[?!.]/g, " ").replace(/\s+/g, " ").trim();
  if (!q) {
    return reply(["Ask about the work, the notes, or how to reach Dev."]);
  }

  if (/^(hi|hello|hey|yo|good morning|good evening)\b/.test(q)) {
    return reply(
      [
        `Hello. I am Desk, the guide on ${profile.name}'s site. I only know what is published here.`,
        "Try the work, what he is doing now, or the email if you already know what you want.",
      ],
      [
        { href: "/now", label: "Now" },
        { href: "/work", label: "Work" },
      ],
    );
  }

  if (q.includes("are you") && (q.includes("ai") || q.includes("bot") || q.includes("gpt") || q.includes("real"))) {
    return reply([
      "I am a guide that lives in this website. I do not browse the web, and I do not invent a second resume.",
      "If I do not know, I will say so. Email is the door to the actual person.",
    ], [{ href: `mailto:${profile.email}`, label: profile.email }]);
  }

  if (/(email|reach|contact|hire|freelance|call|write to|inbox)/.test(q)) {
    return reply(
      [
        `Email is the reliable door: ${profile.email}.`,
        "The main seat is Cosverse, so this is a conversation, not an open job post. LinkedIn and Peerlist are public if you want the formal trail first.",
      ],
      [
        { href: `mailto:${profile.email}`, label: "Email" },
        { href: "https://www.linkedin.com/in/devbadodiya", label: "LinkedIn" },
        { href: "https://peerlist.io/devbadodiya", label: "Peerlist" },
      ],
    );
  }

  const project = projects.find((item) =>
    [item.title, ...item.aliases].some((alias) => q.includes(alias.toLowerCase())),
  );
  if (project) {
    return reply(
      [project.lede, project.points[0]],
      [
        { href: `/work/${project.slug}`, label: project.title },
        ...project.links.slice(0, 1).map((link) => ({ href: link.href, label: link.label })),
      ],
    );
  }

  if (/(now|today|currently|focus|this week|short-term|short term)/.test(q)) {
    return reply(
      now.sections.slice(0, 3).map((section) => `${section.title}. ${section.body}`),
      [{ href: "/now", label: "Now page" }],
    );
  }

  if (/(someday|future|goal|dream|long-term|long term)/.test(q)) {
    return reply(
      [someday.sections[0].body, someday.sections[1].body],
      [{ href: "/someday", label: "Someday" }],
    );
  }

  if (/(who|about|bio|yourself|dev badodiya|where.*from|where.*live|based)/.test(q)) {
    return reply(
      [about.who, `${profile.role} · ${profile.location}. Building ${profile.company}.`],
      [
        { href: "/about", label: "About" },
        { href: profile.companyUrl, label: profile.company },
      ],
    );
  }

  if (/(work|project|ship|built|portfolio|case)/.test(q)) {
    return reply(
      [
        "The current build is Cosverse AI. The archive includes AI Varaksha, a helmet and plate study, a bank-churn model, a one-page drone site, and thirty small interfaces.",
        projects
          .filter((item) => item.featured)
          .map((item) => `${item.title}: ${item.summary}`)
          .join(" "),
      ],
      projects.filter((item) => item.featured).map((item) => ({ href: `/work/${item.slug}`, label: item.title })),
    );
  }

  if (/(skill|stack|tech|next|react|design|principle)/.test(q)) {
    const names = craft.flatMap((group) => group.items.map((item) => item.name)).slice(0, 6);
    return reply(
      [
        `The craft on the site: ${names.join(", ")}.`,
        principles[0].summary,
      ],
      [
        { href: "/skills", label: "Skills" },
        { href: "/colophon", label: "Colophon" },
      ],
    );
  }

  if (/(writ|essay|note|blog|medium)/.test(q)) {
    return reply(
      essays.map((essay) => `${essay.title}: ${essay.dek}`),
      [
        ...essays.map((essay) => ({ href: `/writing/${essay.slug}`, label: essay.title })),
        { href: "https://devbadodiya.medium.com/", label: "Medium" },
      ],
    );
  }

  if (/(photo|frame|gallery|camera)/.test(q)) {
    return reply(
      [
        "The photos page is a set of composed frames for the work, not a camera roll. Each one points at a project: the chat room, the field, the ledger, the single screen.",
      ],
      [{ href: "/photos", label: "Photos" }],
    );
  }

  if (/(visit|map|analytics|traffic)/.test(q)) {
    return reply(
      [
        "Visits are a live signal stored in SQLite (libSQL). Cities come from a coarse lookup. No IP address is stored with the public map. It is a map, not a data warehouse.",
      ],
      [{ href: "/visits", label: "Visits" }],
    );
  }

  if (/(guestbook|guest book|sign|leave a note|say hello)/.test(q)) {
    return reply(
      ["There is a guestbook. Short notes only, no account. Keep it kind."],
      [{ href: "/guestbook", label: "Guestbook" }],
    );
  }

  if (/(uses|toolkit|tools you use|stack you use|what do you use)/.test(q)) {
    return reply(
      ["Uses lives on About — the desk toolkit: editor, models, notes, and the hardware that stays."],
      [{ href: "/about", label: "About" }],
    );
  }

  if (/(colophon|font|type|built with|theme|color)/.test(q)) {
    return reply(
      [
        "This site is Next.js, React, and TypeScript. One typeface, Schibsted Grotesk. A narrow column, dark by default. Content lives in one file so the words are easy to edit.",
      ],
      [{ href: "/colophon", label: "Colophon" }],
    );
  }

  if (/(school|college|vit|bhopal|education|degree|e-cell|ecell)/.test(q)) {
    const school = timeline.find((item) => item.place.includes("VIT"));
    const cell = timeline.find((item) => item.title.includes("coordinator"));
    return reply(
      [school ? `${school.title} at ${school.place}. ${school.note}` : about.who, cell ? `${cell.title}, ${cell.when}. ${cell.note}` : ""],
      [{ href: "/about", label: "Timeline" }],
    );
  }

  if (/(resume|cv|experience|job|xenosis|devinfotech)/.test(q)) {
    return reply(
      timeline.map((item) => `${item.when}: ${item.title} at ${item.place}.`),
      [
        { href: "/about", label: "About" },
        { href: "https://peerlist.io/devbadodiya", label: "Peerlist resume" },
      ],
    );
  }

  return reply(
    [
      "I do not have that on this site, so I will not guess.",
      `I can talk about ${profile.name}'s work, what he is doing now, the notes, and how to reach him at ${profile.email}.`,
    ],
    [
      { href: "/work", label: "Work" },
      { href: "/now", label: "Now" },
      { href: `mailto:${profile.email}`, label: "Email" },
      ...directory.elsewhere.slice(0, 2).map((item) => ({ href: item.href, label: item.title })),
    ],
  );
}
