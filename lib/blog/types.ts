export type WidgetName =
  | "lead-leak-calculator"
  | "nurture-timeline"
  | "ai-fit-checker"
  | "time-audit"
  | "build-buy-picker"
  | "chatbot-demo"
  | "doc-qa-demo"
  | "spreadsheet-checker"
  | "brief-builder"
  | "automation-payback"
  | "speed-cost";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; title: string; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "widget"; name: WidgetName };

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  category: string;
  blocks: Block[];
};
