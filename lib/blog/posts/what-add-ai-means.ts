import type { Post } from "../types";

export const whatAddAiMeans: Post = {
  slug: "what-add-ai-actually-means",
  title: "\"Add AI\" explained: where it saves real hours and where it's a gimmick",
  description:
    "A developer's plain-English guide for founders: what AI is genuinely good at, where simple rules beat it, and a quick test for whether your task is a fit.",
  date: "2026-09-18",
  category: "AI BASICS",
  blocks: [
    {
      type: "p",
      text: "Every founder I talk to has been told to \"add AI\" to their business. Investors say it, competitors announce it, and your LinkedIn feed is full of it. Almost nobody explains what it means in practice."
    },
    {
      type: "p",
      text: "Here is my plain-English version, from someone who builds this stuff. AI is a **very fast, very well-read assistant that is sometimes wrong**. If you use it for what it is good at, it saves you hours every week. If you use it for the wrong job, it creates more work than it removes."
    },
    { type: "h2", text: "What AI is genuinely good at" },
    {
      type: "p",
      text: "Modern language models are strongest when the work involves **words**. That covers a lot of a typical business day:"
    },
    {
      type: "ul",
      items: [
        "**Reading and sorting.** Triage support emails, tag leads, route enquiries to the right person.",
        "**Pulling out facts.** Take an invoice, contract or enquiry and extract the dates, amounts and names into a clean table.",
        "**Summarizing.** Turn a 40-minute call transcript or a long document into five bullet points.",
        "**First drafts.** Reply drafts, product descriptions, proposals, which a person then edits.",
        "**Answering from your own material.** A search box over your handbook, your policies, or your past projects."
      ]
    },
    {
      type: "p",
      text: "Notice what these have in common: the input is messy text, there are many repetitions, and a person can glance at the result and fix it in seconds."
    },
    { type: "h2", text: "Where it's a gimmick" },
    {
      type: "p",
      text: "AI gets in the way when you need something to be **exactly right every time**, or when a plain rule would do the job."
    },
    {
      type: "ul",
      items: [
        "**Exact calculations.** Tax, payroll, inventory counts. Use a normal program, or a spreadsheet formula. They don't make things up.",
        "**Simple if-this-then-that logic.** \"If the order is over 5,000, ask for approval\" is a rule. Writing a rule is cheaper, faster and more reliable than asking a model.",
        "**High-stakes decisions with nobody checking.** Loan approvals, medical advice, legal commitments. A wrong answer here is expensive.",
        "**A chatbot nobody asked for.** If your customers email you five questions a month, you don't need a bot. You need a good FAQ page."
      ]
    },
    {
      type: "callout",
      title: "The rule of thumb I use",
      text: "Use rules first. Use AI when the input is too messy for rules. Keep a person in the loop when a mistake would cost real money."
    },
    { type: "h2", text: "Is your task a good fit?" },
    {
      type: "p",
      text: "Here's a quick test I run with clients before building anything. Think of one specific task you want to hand to AI, and answer honestly."
    },
    { type: "widget", name: "ai-fit-checker" },
    { type: "h2", text: "How the best setups actually work" },
    {
      type: "p",
      text: "The best AI systems I've built aren't magic. They are boring and layered:"
    },
    {
      type: "ol",
      items: [
        "A **rule** handles the clear cases (spam gets deleted, VIP customers get flagged).",
        "**AI** handles the messy middle (what is this email actually about? how urgent is it?).",
        "A **person** reviews anything uncertain, or anything that can't be undone."
      ]
    },
    {
      type: "p",
      text: "Each layer is cheaper and more reliable than the one above it, so you only pay for AI where it earns its keep. The AI also shows its work, for example the exact sentence it based its answer on, so that checking takes seconds."
    },
    { type: "h2", text: "What to ask before you spend money" },
    {
      type: "ul",
      items: [
        "**What exact task does this replace, and how many hours does it take today?** If nobody can answer, it isn't ready to automate.",
        "**What happens when it's wrong?** Good answers involve a review step, not \"it won't be\".",
        "**What does each run cost?** AI is billed per use. Cheap for a hundred tasks a day, worth watching at a hundred thousand.",
        "**Where does my data go?** Customer details should not casually leave your control. Ask which provider is used and what they keep."
      ]
    },
    {
      type: "p",
      text: "Start with one small, boring task. Get it working, measure the hours saved, and only then move to the next. The founders who benefit most from AI are rarely the ones with the grandest plan. They're the ones who picked a Tuesday-morning chore and quietly deleted it."
    }
  ]
};
