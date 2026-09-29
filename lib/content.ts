export type Project = {
  slug: string;
  number: string;
  category: string;
  label: string;
  title: string;
  description: string;
  url: string;
  stack: string[];
  visual: string;
  challenge: string;
  approach: string;
  result: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-lead-qualification",
    number: "01",
    category: "AI AUTOMATION",
    label: "Portfolio Project",
    title: "AI Lead Qualification & CRM Auto-Sync",
    description:
      "Replace manual lead intake with a conversational AI that qualifies and syncs structured records to a CRM automatically.",
    url: "https://ai-lead-qualification.app",
    stack: ["OpenAI", "Node.js", "Webhooks", "CRM APIs"],
    visual: "conversation",
    challenge:
      "Lead intake was slow, inconsistent, and dependent on manual data entry.",
    approach:
      "Built a conversational qualification system that extracts structured fields, scores leads, and synchronizes CRM records through webhook pipelines.",
    result:
      "A repeatable qualification workflow that moves from conversation to structured sales data without manual re-entry.",
    featured: true
  },
  {
    slug: "ai-document-intelligence",
    number: "02",
    category: "AI / RAG",
    label: "Portfolio Project",
    title: "AI Document Intelligence Platform",
    description:
      "Ask questions directly to a PDF library and receive cited, structured answers in seconds.",
    url: "https://ai-document-intelligence.app",
    stack: ["OpenAI", "Pinecone", "RAG", "PDF Ingestion"],
    visual: "document",
    challenge:
      "Important information was distributed across large PDF collections that were difficult to search.",
    approach:
      "Created an ingestion and retrieval pipeline that parses documents, stores vector representations, and returns answers with page-level citations.",
    result:
      "A document interface that turns static files into a searchable knowledge system.",
    featured: true
  },
  {
    slug: "donkeygpt",
    number: "03",
    category: "SAAS PLATFORM",
    label: "Live Product",
    title: "DonkeyGPT.io",
    description:
      "Learn anything explained at exactly your level, from expert depth to plain English.",
    url: "https://donkeygpt.app",
    stack: ["Next.js", "OpenAI", "Streaming", "Subscriptions"],
    visual: "dial",
    challenge:
      "Most AI explanations either oversimplify complex subjects or assume too much prior knowledge.",
    approach:
      "Designed a five-level explanation system with streaming responses, usage metering, subscriptions, and multi-conversation history.",
    result:
      "A focused AI learning product where users control the complexity of every response.",
    featured: true
  },
  {
    slug: "resume-3d-portfolio",
    number: "04",
    category: "AI PIPELINE",
    label: "Portfolio Project",
    title: "Resume to 3D Portfolio Builder",
    description:
      "Upload a PDF resume and receive a fully rendered, deployed 3D interactive portfolio.",
    url: "https://resume-3d-portfolio.app",
    stack: ["Three.js", "BullMQ", "SSE", "Cloudflare R2"],
    visual: "pipeline",
    challenge:
      "Creating a polished portfolio still required design, engineering, content structuring, and deployment knowledge.",
    approach:
      "Built an automated pipeline for resume extraction, structured data generation, asynchronous processing, scene creation, and deployment.",
    result:
      "A system that transforms an unstructured resume into an interactive product experience.",
    featured: true
  },
  {
    slug: "desktop-monitoring-system",
    number: "05",
    category: "ENTERPRISE TOOLING",
    label: "Internal Tool",
    title: "Desktop Monitoring System",
    description:
      "Real-time visibility into employee desktop activity across an organization.",
    url: "https://desktop-monitoring-system.app",
    stack: ["React", "Node.js", "Socket.IO", "PostgreSQL"],
    visual: "monitor",
    challenge: "Teams needed operational visibility without introducing VPN complexity.",
    approach:
      "Built a real-time dashboard connected to desktop activity streams and operational reporting.",
    result: "A centralized monitoring interface for distributed teams."
  },
  {
    slug: "geopolitical-risk-radar",
    number: "06",
    category: "DATA PLATFORM",
    label: "Portfolio Project",
    title: "Geopolitical Risk Radar",
    description:
      "One dashboard for global risk signals with Telegram alerts and Redis-powered speed.",
    url: "https://geopolitical-risk-radar.app",
    stack: ["Next.js", "Redis", "Telegram", "Data APIs"],
    visual: "radar",
    challenge:
      "Risk signals were fragmented across multiple sources and difficult to monitor continuously.",
    approach:
      "Combined structured data, caching, filtering, dashboard views, and alert delivery into one system.",
    result: "A fast operational view for monitoring global events."
  },
  {
    slug: "ipo-ai",
    number: "07",
    category: "ML / FINANCE",
    label: "Portfolio Project",
    title: "IPO AI — Indian IPO Predictor",
    description:
      "Machine learning predictions on Indian IPO listing performance.",
    url: "https://ipo-ai.app",
    stack: ["Machine Learning", "Market Data", "Analytics"],
    visual: "chart",
    challenge:
      "IPO analysis required comparing multiple market signals before listing day.",
    approach:
      "Combined GMP, subscription, and market data into a prediction-focused interface.",
    result: "A simplified research tool for IPO analysis."
  },
  {
    slug: "password-generator",
    number: "08",
    category: "BROWSER TOOL",
    label: "Open Source",
    title: "Password Generator",
    description:
      "A fast, zero-dependency browser tool for generating strong customizable passwords.",
    url: "https://password-generator.app",
    stack: ["JavaScript", "Web Crypto", "CSS"],
    visual: "generator",
    challenge:
      "Users needed a simple security utility without signup, tracking, or unnecessary complexity.",
    approach:
      "Built a focused client-side tool with configurable password rules.",
    result: "A fast utility that works directly in the browser."
  },
  {
    slug: "postmatrix",
    number: "09",
    category: "SAAS PLATFORM",
    label: "Portfolio SaaS",
    title: "PostMatrix",
    description:
      "Generate, schedule, and auto-publish social media content across platforms.",
    url: "https://postmatrix.app",
    stack: ["Next.js", "Automation", "Scheduling", "Social APIs"],
    visual: "matrix",
    challenge:
      "Publishing content across multiple networks created repetitive manual work.",
    approach:
      "Designed a content workflow covering generation, scheduling, and multi-platform publishing.",
    result: "A single workspace for managing social publishing operations."
  },
  {
    slug: "zerokulabs-crm",
    number: "10",
    category: "INTERNAL TOOL",
    label: "Internal Tool",
    title: "ZeroKuLabs Internal CRM",
    description:
      "A pharma-specific CRM with voice intelligence, staff scheduling, and territory dashboards.",
    url: "https://zerokulabs-crm.app",
    stack: ["Vue.js", "Node.js", "CRM", "Voice APIs"],
    visual: "crm",
    challenge:
      "Pharma operations required a system adapted to territory, staff, and call workflows.",
    approach:
      "Combined CRM records, voice-call intelligence, scheduling, and territory reporting.",
    result: "An operational platform tailored to pharmaceutical workflows."
  }
];

export const featuredProjects = projects.filter((project) => project.featured);

export type Website = {
  slug: string;
  name: string;
  domain: string;
  url: string;
  sector: string;
  year: string;
  summary: string;
  scope: string[];
  stack: string[];
  /** Brand color used to draw the preview page and tab icon. */
  accent: string;
  /** Page structure for the generated preview when no screenshot is set. */
  layout: "storefront" | "landing" | "editorial" | "portfolio";
  /** Optional screenshot in /public, e.g. "/websites/kiln-and-clay.jpg". */
  image?: string;
};

// Sample entries — replace with the real websites you have built.
export const websites: Website[] = [
  {
    slug: "kiln-and-clay",
    name: "Kiln & Clay",
    domain: "kilnandclay.in",
    url: "https://kilnandclay.in",
    sector: "Ceramics studio",
    year: "2025",
    summary:
      "Storefront for a handmade ceramics studio, with product drops, inventory sync, and a checkout that holds up on slow mobile networks.",
    scope: ["Design", "Development", "Shopify setup"],
    stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS"],
    accent: "#9c5b3b",
    layout: "storefront"
  },
  {
    slug: "northfield-dental",
    name: "Northfield Dental",
    domain: "northfielddental.in",
    url: "https://northfielddental.in",
    sector: "Dental clinic",
    year: "2025",
    summary:
      "Clinic website with treatment pages, online appointment requests, and WhatsApp reminders routed to the front desk.",
    scope: ["Design", "Development", "SEO"],
    stack: ["Next.js", "Node.js", "WhatsApp API"],
    accent: "#2f6f73",
    layout: "landing"
  },
  {
    slug: "monsoon-review",
    name: "The Monsoon Review",
    domain: "monsoonreview.in",
    url: "https://monsoonreview.in",
    sector: "Literary magazine",
    year: "2024",
    summary:
      "Long-form publication with an editor-friendly CMS, newsletter sign-ups, and article pages that load fast on any connection.",
    scope: ["Development", "CMS setup"],
    stack: ["Next.js", "Sanity", "Resend"],
    accent: "#33407a",
    layout: "editorial"
  },
  {
    slug: "atelier-mehra",
    name: "Atelier Mehra",
    domain: "ateliermehra.com",
    url: "https://ateliermehra.com",
    sector: "Architecture practice",
    year: "2024",
    summary:
      "Portfolio for an architecture practice, built around full-bleed project photography and a filterable project archive.",
    scope: ["Design", "Development"],
    stack: ["Nuxt", "Vue.js", "Cloudinary"],
    accent: "#5d6b4b",
    layout: "portfolio"
  },
  {
    slug: "tandoor-street",
    name: "Tandoor Street",
    domain: "tandoorstreet.in",
    url: "https://tandoorstreet.in",
    sector: "Restaurant",
    year: "2023",
    summary:
      "Restaurant site with a menu the owners update themselves, table reservations, and directions straight into Google Maps.",
    scope: ["Design", "Development", "Hosting"],
    stack: ["React", "Node.js", "MongoDB"],
    accent: "#b8862b",
    layout: "landing"
  }
];

export const experience = [
  {
    company: "AI Tiger",
    dates: "DEC 2025 — PRESENT",
    role: "SOFTWARE DEVELOPER",
    description:
      "Building a video-generation platform handling complex multi-model workflows.",
    bullets: [
      "Kling, Veo, and Runway video-generation workflows",
      "ElevenLabs text-to-speech integration",
      "Credit billing and usage tracking",
      "Per-project asset management",
      "n8n workflow orchestration"
    ]
  },
  {
    company: "Alif Overseas",
    dates: "2023 — 2025",
    role: "FULL STACK DEVELOPER",
    description:
      "Developed full-stack applications with React, Vue, and Node.js across multiple client projects.",
    bullets: [
      "React and Vue.js applications",
      "Node.js and Express API design",
      "PostgreSQL and MongoDB databases",
      "Third-party service integrations",
      "Production feature delivery"
    ]
  },
  {
    company: "Simple Digital",
    dates: "2022 — 2023",
    role: "FRONTEND DEVELOPER",
    description:
      "Started by building responsive web applications in a fast-moving agency environment.",
    bullets: [
      "React component development",
      "Responsive CSS and Tailwind CSS",
      "Client project delivery",
      "Git version-control workflows"
    ]
  }
];

export const skills = {
  FRONTEND: [
    "React",
    "Vue.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion"
  ],
  BACKEND: [
    "Node.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Socket.IO"
  ],
  "AI / INTEGRATIONS": [
    "OpenAI API",
    "GPT-4o",
    "LangChain",
    "Pinecone",
    "RAG Pipelines",
    "n8n"
  ],
  DEVOPS: [
    "Docker",
    "Docker Compose",
    "Vercel",
    "Nginx",
    "GitHub Actions",
    "VPS Deployment"
  ],
  SPECIALIZED: [
    "Jitsi",
    "Tiptap",
    "ElevenLabs",
    "Kling",
    "Veo",
    "Runway ML",
    "kie.ai"
  ]
} as const;
