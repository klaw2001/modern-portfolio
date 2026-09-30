/** Used for page metadata and structured data. */
export const site = {
  name: "Hrishikesh Netke",
  title: "Hrishikesh Netke | Full Stack Developer in Mumbai",
  description:
    "Hrishikesh Netke is a full stack developer in Mumbai, India, building AI, data, automation and SaaS products end to end, from idea to production.",
  url: "https://hrishikeshnetke.in",
  email: "work@hrishikeshnetke.in",
  twitter: "@netke2611",
  socials: [
    "https://github.com/hrishikeshnetke",
    "https://www.linkedin.com/in/hrishikesh-netke-b62b09231/",
    "https://x.com/netke2611",
    "https://www.instagram.com/ig_klaw/"
  ]
};

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
    title: "AI Lead Qualification & CRM Auto Sync",
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
      "A repeatable qualification workflow that moves from conversation to structured sales data without entering anything twice.",
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
      "Created an ingestion and retrieval pipeline that parses documents, stores vector representations, and returns answers that cite the exact page.",
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
      "Designed an explanation system with five levels, streaming responses, usage metering, subscriptions, and history across conversations.",
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
      "Live visibility into employee desktop activity across an organization.",
    url: "https://desktop-monitoring-system.app",
    stack: ["React", "Node.js", "Socket.IO", "PostgreSQL"],
    visual: "monitor",
    challenge: "Teams needed operational visibility without introducing VPN complexity.",
    approach:
      "Built a live dashboard connected to desktop activity streams and operational reporting.",
    result: "A centralized monitoring interface for distributed teams."
  },
  {
    slug: "geopolitical-risk-radar",
    number: "06",
    category: "DATA PLATFORM",
    label: "Portfolio Project",
    title: "Geopolitical Risk Radar",
    description:
      "One dashboard for global risk signals, with Telegram alerts and Redis caching for speed.",
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
    title: "IPO AI: Indian IPO Predictor",
    description:
      "Machine learning predictions on Indian IPO listing performance.",
    url: "https://ipo-ai.app",
    stack: ["Machine Learning", "Market Data", "Analytics"],
    visual: "chart",
    challenge:
      "IPO analysis required comparing multiple market signals before listing day.",
    approach:
      "Combined GMP, subscription, and market data into an interface built around predictions.",
    result: "A simplified research tool for IPO analysis."
  },
  {
    slug: "password-generator",
    number: "08",
    category: "BROWSER TOOL",
    label: "Open Source",
    title: "Password Generator",
    description:
      "A fast browser tool with zero dependencies for generating strong, customizable passwords.",
    url: "https://password-generator.app",
    stack: ["JavaScript", "Web Crypto", "CSS"],
    visual: "generator",
    challenge:
      "Users needed a simple security utility without signup, tracking, or unnecessary complexity.",
    approach:
      "Built a focused tool that runs entirely in the browser, with configurable password rules.",
    result: "A fast utility that works directly in the browser."
  },
  {
    slug: "postmatrix",
    number: "09",
    category: "SAAS PLATFORM",
    label: "Portfolio SaaS",
    title: "PostMatrix",
    description:
      "Generate, schedule, and automatically publish social media content across platforms.",
    url: "https://postmatrix.app",
    stack: ["Next.js", "Automation", "Scheduling", "Social APIs"],
    visual: "matrix",
    challenge:
      "Publishing content across multiple networks created repetitive manual work.",
    approach:
      "Designed a content workflow covering generation, scheduling, and publishing across platforms.",
    result: "A single workspace for managing social publishing operations."
  },
  {
    slug: "zerokulabs-crm",
    number: "10",
    category: "INTERNAL TOOL",
    label: "Internal Tool",
    title: "ZeroKuLabs Internal CRM",
    description:
      "A CRM built for pharma teams, with voice intelligence, staff scheduling, and territory dashboards.",
    url: "https://zerokulabs-crm.app",
    stack: ["Vue.js", "Node.js", "CRM", "Voice APIs"],
    visual: "crm",
    challenge:
      "Pharma operations required a system adapted to territory, staff, and call workflows.",
    approach:
      "Combined CRM records, voice call intelligence, scheduling, and territory reporting.",
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
  /** Where the client is based, shown next to the site in the index. */
  location: string;
  summary: string;
  /** Brand color used to draw the preview page and tab icon. */
  accent: string;
  /** Page structure for the generated preview when no screenshot is set. */
  layout: "storefront" | "landing" | "editorial" | "portfolio";
  /** Hero screenshot in /public from `npm run capture:websites`, e.g. "/websites/kings.jpg". */
  image?: string;
};

export const websites: Website[] = [
  {
    slug: "vacier",
    name: "Vacier",
    domain: "vacier.com",
    url: "https://vacier.com",
    sector: "Jewellery brand",
    location: "Sweden",
    summary:
      "Online store for a Swedish jewellery brand known for minimal, adjustable rings, bracelets and chains, shipping to customers across Europe, the US and Australia.",
    accent: "#8b7e6a",
    layout: "storefront",
    image: "/websites/vacier.jpg"
  },
  {
    slug: "kings",
    name: "Kings",
    domain: "kings.net",
    url: "https://kings.net",
    sector: "Fine jeweller",
    location: "UAE",
    summary:
      "Online boutique for a fine jeweller crafting since 1907, with gold and silver collections, a bespoke jewellery service and free insured shipping.",
    accent: "#b08d57",
    layout: "storefront",
    image: "/websites/kings.jpg"
  },
  {
    slug: "wattlecorp",
    name: "Wattlecorp",
    domain: "wattlecorp.com",
    url: "https://www.wattlecorp.com",
    sector: "Cybersecurity",
    location: "UAE",
    summary:
      "Website for a cybersecurity firm with teams in the UAE, USA and India, presenting the consulting and security services it offers businesses that need to protect customer data.",
    accent: "#e0452b",
    layout: "landing",
    image: "/websites/wattlecorp.jpg"
  },
  {
    slug: "leadesign",
    name: "Lea Design",
    domain: "leadesigninc.com",
    url: "https://leadesigninc.com",
    sector: "Interior design",
    location: "Canada",
    summary:
      "Website for a Canadian interior design studio, presenting its design and renovation services, a process shaped by client input, and a blog on interior design trends.",
    accent: "#c9a45c",
    layout: "portfolio",
    image: "/websites/leadesign.jpg"
  },
  {
    slug: "aliff",
    name: "Aliff",
    domain: "aliff.in",
    url: "https://www.aliff.in",
    sector: "Study abroad platform",
    location: "India",
    summary:
      "Study abroad platform where students explore more than 500 universities across 19 countries, compare courses, track applications in real time and get counsellor help with SOPs and visas.",
    accent: "#4f6ef7",
    layout: "landing",
    image: "/websites/aliff.jpg"
  },
  {
    slug: "crawlmagic",
    name: "CrawlMagic",
    domain: "crawlmagic.com",
    url: "https://www.crawlmagic.com",
    sector: "Web data services",
    location: "India",
    summary:
      "Website for a web data company with over 1.5 billion records extracted, presenting its scraping, crawling and data API services for ecommerce, travel and real estate businesses.",
    accent: "#5b4fe0",
    layout: "landing",
    image: "/websites/crawlmagic.jpg"
  },
  {
    slug: "aikya",
    name: "Aikya Jewellery",
    domain: "aikyajewellery.com",
    url: "https://aikyajewellery.com",
    sector: "Jewellery store",
    location: "India",
    summary:
      "Online jewellery store for diamond rings, earrings and necklaces, built around elegant pieces at affordable prices, with free shipping and returns within 7 days.",
    accent: "#c0836a",
    layout: "storefront",
    image: "/websites/aikya.jpg"
  },
  {
    slug: "supermax",
    name: "Supermax",
    domain: "supermaxshipsupply.com",
    url: "https://supermaxshipsupply.com",
    sector: "Ship supply",
    location: "India",
    summary:
      "Website for a ship chandler supplying ship stores, provisions and repair services to vessels at every major Indian port.",
    accent: "#f2b53a",
    layout: "landing",
    image: "/websites/supermax.jpg"
  }
];

export const reputation = {
  rating: "5.0",
  /** Where "Rated on Google" links to. Swap in the Google Maps review link when available. */
  reviewsUrl: "https://www.google.com/search?q=Hrishikesh+Netke",
  clientLocations: ["Canada", "Israel", "Dubai", "Sweden", "India"]
};

export const experience = [
  {
    company: "AI Tiger",
    dates: "DEC 2025 TO PRESENT",
    role: "SOFTWARE DEVELOPER",
    description:
      "Building a video generation platform that runs complex workflows across multiple AI models.",
    bullets: [
      "Kling, Veo, and Runway video generation workflows",
      "ElevenLabs text to speech integration",
      "Credit billing and usage tracking",
      "Asset management for every project",
      "n8n workflow orchestration"
    ]
  },
  {
    company: "Aliff Overseas",
    dates: "2023 TO 2025",
    role: "FULL STACK DEVELOPER",
    description:
      "Developed full stack applications with React, Vue, and Node.js across multiple client projects.",
    bullets: [
      "React and Vue.js applications",
      "Node.js and Express API design",
      "PostgreSQL and MongoDB databases",
      "Third party service integrations",
      "Production feature delivery"
    ]
  },
  {
    company: "Simple Digital",
    dates: "2022 TO 2023",
    role: "FRONTEND DEVELOPER",
    description:
      "Started by building responsive web applications in a busy agency environment.",
    bullets: [
      "React component development",
      "Responsive CSS and Tailwind CSS",
      "Client project delivery",
      "Git version control workflows"
    ]
  }
];

export const workflow = [
  {
    number: "01",
    phase: "DISCOVER",
    title: "Understand the problem",
    description:
      "Talk to the people who will use it. Map the constraints, the data, and what success actually looks like.",
    output: "Scope + success metric"
  },
  {
    number: "02",
    phase: "ARCHITECT",
    title: "Design the system",
    description:
      "Data model, API contracts, and integrations planned before a single screen gets built.",
    output: "Schema + API map"
  },
  {
    number: "03",
    phase: "BUILD",
    title: "Ship in short loops",
    description:
      "Interface, backend, and automation built together, with something working to review at every step.",
    output: "Working product"
  },
  {
    number: "04",
    phase: "LAUNCH",
    title: "Run it in production",
    description:
      "Deploy, monitor, and refine on real usage until the system runs on its own.",
    output: "Live system"
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
    "GPT 4o",
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

export type Tool = (typeof skills)[keyof typeof skills][number];

export type AppNodeId =
  | "interface"
  | "api"
  | "data"
  | "ai"
  | "services"
  | "deploy";

export type WebNodeId =
  | "goal"
  | "structure"
  | "design"
  | "build"
  | "seo"
  | "launch";

export type BlueprintView = "app" | "web";

export type BlueprintNode<Id extends string> = {
  id: Id;
  number: string;
  name: string;
  title: string;
  description: string;
  /** A tool shows its logo; any other tag is a plain label. */
  tags: string[];
};

type Blueprint<Id extends string> = {
  tab: string;
  /** One line under the tabs saying what this view is for. */
  note: string;
  title: string;
  /** What travels along the solid wires. */
  flow: string;
  /** What the dashed wires mean. */
  hosted: string;
  /** Part selected when the view opens. */
  start: Id;
  nodes: BlueprintNode<Id>[];
};

/** Parts of a typical product and of a typical website, shown as blueprints. */
export const blueprints: {
  app: Blueprint<AppNodeId>;
  web: Blueprint<WebNodeId>;
} = {
  app: {
    tab: "App",
    note: "Products, dashboards and automation",
    title: "System blueprint",
    flow: "Request",
    hosted: "Runs on",
    start: "api",
    nodes: [
      {
        id: "interface",
        number: "01",
        name: "Interface",
        title: "Where people meet the product.",
        description:
          "Fast, accessible front ends that turn complex systems into screens people understand on the first visit.",
        tags: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion"
        ]
      },
      {
        id: "api",
        number: "02",
        name: "API",
        title: "The contract everything talks through.",
        description:
          "Typed endpoints, auth, background jobs, and realtime channels that keep every part of the product in sync.",
        tags: ["Node.js", "Express", "Prisma", "Socket.IO"]
      },
      {
        id: "data",
        number: "03",
        name: "Data",
        title: "Models shaped around real usage.",
        description:
          "Relational and document schemas, indexes, and caching designed for the queries the product actually runs.",
        tags: ["PostgreSQL", "MongoDB", "Redis"]
      },
      {
        id: "ai",
        number: "04",
        name: "AI layer",
        title: "Models that answer from your data.",
        description:
          "LLM features grounded in your own documents with retrieval and structured output, plus workflows that act on the result.",
        tags: [
          "OpenAI API",
          "GPT 4o",
          "LangChain",
          "Pinecone",
          "RAG Pipelines",
          "n8n"
        ]
      },
      {
        id: "services",
        number: "05",
        name: "Services",
        title: "Specialist engines, wired in.",
        description:
          "Video calls, rich text editing, voice, and generative media plugged in behind the API instead of rebuilt from scratch.",
        tags: [
          "Jitsi",
          "Tiptap",
          "ElevenLabs",
          "Kling",
          "Veo",
          "Runway ML",
          "kie.ai"
        ]
      },
      {
        id: "deploy",
        number: "06",
        name: "Deploy",
        title: "Shipped and kept running.",
        description:
          "Containerised builds, CI pipelines, and edge or VPS hosting so every change reaches production safely.",
        tags: [
          "Docker",
          "Docker Compose",
          "Vercel",
          "Nginx",
          "GitHub Actions",
          "VPS Deployment"
        ]
      }
    ]
  },
  web: {
    tab: "Web design",
    note: "Websites built to be found and to convert",
    title: "Website blueprint",
    flow: "Brief",
    hosted: "Hosted on",
    start: "build",
    nodes: [
      {
        id: "goal",
        number: "01",
        name: "Goal",
        title: "Start from what it must achieve.",
        description:
          "Before any design, we pin down who the site is for, the one action a visitor should take, and the number that proves it worked.",
        tags: ["Audience", "Offer", "Primary action", "Success metric"]
      },
      {
        id: "structure",
        number: "02",
        name: "Structure",
        title: "Every page has one job.",
        description:
          "Sitemap, page hierarchy, and copy laid out around the visitor's path, so each page leads to the next step instead of a dead end.",
        tags: ["Sitemap", "Wireframes", "Messaging", "Calls to action"]
      },
      {
        id: "design",
        number: "03",
        name: "Design",
        title: "Trust earned in the first seconds.",
        description:
          "Responsive layouts, type, and motion tuned to your brand, checked for contrast and touch targets on real phones.",
        tags: [
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion",
          "Responsive",
          "Accessible"
        ]
      },
      {
        id: "build",
        number: "04",
        name: "Build",
        title: "Rendered on the server, ready on arrival.",
        description:
          "Next.js pre-renders every page to HTML, so search engines read the full content and visitors see it before any JavaScript loads.",
        tags: ["Next.js", "React", "TypeScript", "Pre-rendered pages"]
      },
      {
        id: "seo",
        number: "05",
        name: "SEO & Speed",
        title: "Found on Google, fast on mobile.",
        description:
          "Metadata, sitemap, structured data, and optimised images and fonts, tuned against Core Web Vitals so pages rank and load quickly.",
        tags: [
          "Metadata",
          "Sitemap",
          "Structured data",
          "Core Web Vitals",
          "Image optimisation"
        ]
      },
      {
        id: "launch",
        number: "06",
        name: "Launch",
        title: "Live worldwide, updated with a push.",
        description:
          "Vercel serves the site from a global edge network with HTTPS on your own domain, and every change gets a preview link before it goes live.",
        tags: ["Vercel", "Edge network", "Preview deploys", "Custom domain"]
      }
    ]
  }
};
