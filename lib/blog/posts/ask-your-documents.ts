import type { Post } from "../types";

export const askYourDocuments: Post = {
  slug: "ask-your-documents-ai-search",
  title: "Ask your own documents questions: AI search over your PDFs in plain English",
  description:
    "How AI can answer questions from your handbooks, contracts and manuals with page-level citations, explained without jargon, with an interactive demo.",
  date: "2026-06-23",
  category: "AI BASICS",
  blocks: [
    {
      type: "p",
      text: "Somewhere in your business there's a folder of PDFs nobody reads: policies, manuals, contracts, past proposals. And somewhere there's a person who gets asked the same questions about them every week, because finding the answer is slower than asking."
    },
    {
      type: "p",
      text: "AI can fix this, and the technique has a name you'll hear a lot: **RAG** (retrieval-augmented generation). It sounds technical. The idea is not."
    },
    { type: "h2", text: "The library analogy" },
    {
      type: "p",
      text: "Imagine a very fast librarian. You ask a question. Instead of answering from memory, the librarian:"
    },
    {
      type: "ol",
      items: [
        "**Searches** your library for the few pages most relevant to the question.",
        "**Reads** only those pages.",
        "**Writes** an answer based on them, and tells you which pages it used."
      ]
    },
    {
      type: "p",
      text: "That's all RAG is. The \"search\" step is smarter than keyword matching, because it understands meaning. Searching for \"time off\" will find a page that says \"annual leave\". And because the AI answers only from the pages it fetched, it gets far less room to make things up."
    },
    { type: "h2", text: "Try it" },
    {
      type: "p",
      text: "Here is a tiny made-up company handbook with four pages. Pick a question and watch the three steps happen. This is an illustration with scripted answers, not a live AI, but it follows the same steps a real system does."
    },
    { type: "widget", name: "doc-qa-demo" },
    {
      type: "p",
      text: "Notice the last question. When the answer isn't in the documents, a well-built system says so instead of guessing. That behavior is something you design on purpose, and it's the difference between a tool people trust and one they stop using."
    },
    { type: "h2", text: "Why not just paste it into ChatGPT?" },
    {
      type: "p",
      text: "For one document, you can, and sometimes you should. It breaks down when:"
    },
    {
      type: "ul",
      items: [
        "You have **hundreds of documents**, far more than fit in a single chat.",
        "You need the **same answers for your whole team**, not a private experiment.",
        "You need **citations**, so people can check the source page instead of trusting blindly.",
        "You care where **sensitive data** goes, and want control over who can see which documents."
      ]
    },
    { type: "h2", text: "Where it goes wrong" },
    {
      type: "p",
      text: "I'd be selling you something if I said it always works. These are the real problems:"
    },
    {
      type: "ul",
      items: [
        "**Bad scans.** If a PDF is a photo of a page, the text has to be read out of the image first, and errors creep in.",
        "**Out-of-date documents.** The AI will happily quote the old policy. Someone has to own keeping the library current.",
        "**Vague questions.** \"What's the policy?\" has no answer. Good systems ask a follow-up.",
        "**Tables and diagrams.** These are harder for AI to read than plain paragraphs."
      ]
    },
    { type: "h2", text: "How to know it's good enough" },
    {
      type: "p",
      text: "Before you roll it out, write down 20 real questions your team asks, along with the correct answers. Run them through the system and score it. If it gets 18 right and says \"I don't know\" on the other two, ship it. If it confidently gets five wrong, fix it first."
    },
    {
      type: "callout",
      title: "Who benefits most",
      text: "Support teams, onboarding, sales teams answering questions about products, and anyone whose job includes saying \"let me check the document and get back to you\"."
    },
    {
      type: "p",
      text: "If you have a document pile like this, tell me roughly how many documents and who'd ask the questions. I can tell you quickly whether an AI search is worth it for you."
    }
  ]
};
