export interface GenerateRequest {
  profile_text: string;
  tone: string;
  channels: string[];
  language: string;
}

export interface PersonaData {
  name: string;
  role: string;
  industry: string;
  tone: string;
  interests: string[];
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

export const MOCK_RESPONSE: GenerateResponse = {
  persona: {
    name: "Arjun Mehta",
    role: "Co-Founder & CEO",
    industry: "AI SaaS",
    tone: "Casual",
    interests: ["Growth Hacking", "LLMs", "Product-Led Growth", "Developer Tools"],
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
