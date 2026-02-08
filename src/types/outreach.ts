export interface GenerateRequest {
  profile_text: string;
  tone: string;
  channels: string[];
  language: string;
}

export interface PersonaData {
  name: string;
  role: string;
  company: string;
  industry: string;
  tone: string;
  interests: string[];
  location: string;
  seniority: string;
  lastActivity: string;
  emojiUsage: string;
  responseLikelihood: number;
}

export interface GenerateResponse {
  persona: PersonaData;
  messages: {
    email: string[];
    linkedin: string[];
    whatsapp: string[];
  };
  subjects: string[];
  scores: number[];
  similar_profiles: string[];
}

export interface HistoryEntry {
  id: string;
  persona: PersonaData;
  messages: {
    email: string[];
    linkedin: string[];
    whatsapp: string[];
  };
  subjects: string[];
  scores: number[];
  similar_profiles: string[];
  date: string;
  channel: string;
  status: "sent" | "replied" | "pending" | "bounced";
}

export const MOCK_RESPONSE: GenerateResponse = {
  persona: {
    name: "Arjun Mehta",
    role: "Co-Founder & CEO",
    company: "NeuralForge AI",
    industry: "AI SaaS",
    tone: "Casual",
    interests: ["Growth Hacking", "LLMs", "Product-Led Growth", "Developer Tools"],
    location: "San Francisco, CA",
    seniority: "C-Level Executive",
    lastActivity: "Posted on LinkedIn 2 days ago",
    emojiUsage: "Moderate",
    responseLikelihood: 78,
  },
  messages: {
    email: [
      "Hey Arjun,\n\nI came across your work building AI-powered dev tools — super impressive trajectory. I've been working on something in the local LLM space that I think could complement what you're building at scale.\n\nWould love to share a quick demo — no pitch deck, just a working product. Worth 15 minutes?\n\nCheers",
      "Hi Arjun,\n\nNoticed your recent post about scaling AI infrastructure without burning through API costs. We've built an offline LLM engine that does exactly that — hyper-personalized outreach without a single cloud call.\n\nThought this might resonate given your focus on cost-efficient AI. Happy to walk you through it.\n\nBest",
      "Arjun — quick note.\n\nYour talk at the last SaaS meetup about developer experience really stuck with me. We're taking a similar philosophy but applying it to sales outreach with local AI models.\n\nWould love your take on it. Coffee sometime this week?\n\nCheers",
    ],
    linkedin: [
      "Hey Arjun 👋 Loved your recent post on PLG for dev tools. I'm building something in the local LLM space — hyper-personalized outreach that runs completely offline. Would love to connect and share notes!",
      "Hi Arjun — your work on AI SaaS infrastructure is really inspiring. We've built an offline outreach engine powered by local LLMs. No API costs, full privacy. Thought you'd find this interesting given your background. Happy to chat!",
      "Arjun, saw your talk on scaling AI without the cloud bill. That's exactly what we're doing for cold outreach — fully local, fully personalized. Would love 5 min of your time to get your thoughts 🚀",
    ],
    whatsapp: [
      "Hey Arjun! 👋 Saw your work on AI dev tools — really cool stuff. Built something similar for outreach using local LLMs. No cloud, no API costs. Would love to show you a quick demo if you're curious!",
      "Hi Arjun — quick one. Working on an offline LLM outreach tool and your background in AI SaaS caught my eye. Think you'd find the approach interesting. Free for a quick call?",
      "Arjun! Your PLG insights are 🔥. We're applying similar thinking to AI-powered cold outreach — but running entirely offline. Would love your take. Ping me if interested!",
    ],
  },
  subjects: [
    "Local LLMs × Your AI SaaS Vision — Quick Thought",
    "Offline AI for Outreach — Right Up Your Alley?",
    "From One AI Builder to Another 🚀",
  ],
  scores: [87, 74, 91],
  similar_profiles: [
    "2 SaaS founders contacted",
    "1 recruiter in fintech",
    "3 AI startup CTOs reached",
  ],
};

export const MOCK_HISTORY: HistoryEntry[] = [
  {
    id: "1",
    ...MOCK_RESPONSE,
    date: "2026-02-07",
    channel: "Email",
    status: "replied",
  },
  {
    id: "2",
    persona: {
      name: "Priya Sharma",
      role: "VP of Engineering",
      company: "DataMesh Labs",
      industry: "Data Infrastructure",
      tone: "Formal",
      interests: ["Data Pipelines", "MLOps", "Team Scaling"],
      location: "Bangalore, India",
      seniority: "VP-Level",
      lastActivity: "Published blog post 5 days ago",
      emojiUsage: "Rare",
      responseLikelihood: 65,
    },
    messages: {
      email: [
        "Dear Priya,\n\nYour recent article on building resilient data pipelines was insightful. We're developing an offline intelligence engine that could streamline your team's outreach workflows.\n\nWould you be open to a brief technical discussion?\n\nBest regards",
      ],
      linkedin: [
        "Hi Priya — your work at DataMesh Labs on data infrastructure is impressive. I'd love to share how our local LLM engine approaches personalized outreach without cloud dependencies.",
      ],
      whatsapp: [],
    },
    subjects: ["Data Infrastructure × Offline AI — A Synergy?"],
    scores: [72],
    similar_profiles: ["1 VP Engineering contacted"],
    date: "2026-02-05",
    channel: "LinkedIn",
    status: "sent",
  },
  {
    id: "3",
    persona: {
      name: "Marcus Chen",
      role: "Head of Growth",
      company: "ScaleUp Ventures",
      industry: "Venture Capital",
      tone: "Casual",
      interests: ["Growth Marketing", "AI Tools", "Startup Ecosystems"],
      location: "New York, NY",
      seniority: "Director-Level",
      lastActivity: "Tweeted 12 hours ago",
      emojiUsage: "Frequent",
      responseLikelihood: 82,
    },
    messages: {
      email: [
        "Hey Marcus,\n\nLove what ScaleUp is doing in the AI tools space. We built an offline outreach engine that's been getting crazy traction with early-stage founders.\n\nThink your portfolio companies would dig this. Quick demo?\n\nCheers",
      ],
      linkedin: [
        "Marcus! 🚀 Your thread on AI growth tools was fire. We're building exactly that — personalized outreach powered by local LLMs. Zero cloud costs. Would love to connect!",
      ],
      whatsapp: [
        "Hey Marcus! Saw your tweet about AI growth tools — we're building something you'd love. Quick chat? 🔥",
      ],
    },
    subjects: ["AI Growth Tools × Your Portfolio 🚀"],
    scores: [89],
    similar_profiles: ["4 Growth leaders contacted"],
    date: "2026-02-06",
    channel: "Email",
    status: "pending",
  },
  {
    id: "4",
    persona: {
      name: "Sarah Kim",
      role: "CTO",
      company: "FinFlow AI",
      industry: "Fintech",
      tone: "Balanced",
      interests: ["AI in Finance", "Compliance", "API Architecture"],
      location: "London, UK",
      seniority: "C-Level Executive",
      lastActivity: "Spoke at conference 1 week ago",
      emojiUsage: "Moderate",
      responseLikelihood: 58,
    },
    messages: {
      email: [
        "Hi Sarah,\n\nYour talk on AI-driven compliance was thought-provoking. We've built an offline LLM engine for outreach that could align with FinFlow's privacy-first approach.\n\nWorth a quick conversation?\n\nBest",
      ],
      linkedin: [],
      whatsapp: [],
    },
    subjects: ["Privacy-First AI Outreach for Fintech"],
    scores: [66],
    similar_profiles: ["2 Fintech CTOs contacted"],
    date: "2026-02-03",
    channel: "Email",
    status: "bounced",
  },
  {
    id: "5",
    persona: {
      name: "Raj Patel",
      role: "Founder",
      company: "DevStack.io",
      industry: "Developer Tools",
      tone: "Casual",
      interests: ["Open Source", "DevEx", "Local-First Software"],
      location: "Austin, TX",
      seniority: "Founder",
      lastActivity: "GitHub commit 3 hours ago",
      emojiUsage: "Moderate",
      responseLikelihood: 91,
    },
    messages: {
      email: [
        "Raj! Your open-source work on DevStack is 🔥. Fellow builder here — we made an offline LLM that writes cold outreach as good as a human SDR.\n\nWould love to get a local-first advocate's take on it. 15 mins?\n\nCheers",
      ],
      linkedin: [
        "Hey Raj 👋 Love the local-first philosophy at DevStack. We're building the same thing but for sales outreach — fully offline, fully personalized. Would love to swap notes!",
      ],
      whatsapp: [
        "Raj! Fellow local-first builder here. Made an offline LLM for outreach. Think you'd geek out over it. Quick demo? 🛠️",
      ],
    },
    subjects: ["Local-First × AI Outreach — Let's Geek Out"],
    scores: [94],
    similar_profiles: ["3 DevTool founders contacted"],
    date: "2026-02-07",
    channel: "WhatsApp",
    status: "replied",
  },
];
