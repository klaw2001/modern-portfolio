import type { Post } from "../types";

export const briefADeveloper: Post = {
  slug: "how-to-brief-a-developer",
  title: "How to brief a developer so you don't waste weeks or money",
  description:
    "Most software projects go wrong before a line of code is written. A one-page brief, a builder you can fill in, and the questions a good developer should ask you.",
  date: "2026-05-07",
  category: "WORKING WITH DEVELOPERS",
  blocks: [
    {
      type: "p",
      text: "Here's something I wish every founder knew before hiring a developer: **most projects that go wrong were already going wrong before anyone wrote code.** The cause is rarely bad programming. It's a brief that said \"build me an app like Uber but for X\" and left the rest to guesswork."
    },
    {
      type: "p",
      text: "You don't need technical language to write a good brief. You need to be clear about the problem, the people, and what \"done\" looks like."
    },
    { type: "h2", text: "Why briefs fail" },
    {
      type: "ul",
      items: [
        "**They start with the solution.** \"I need an app\" skips the question of whether an app is the right answer. Describe the problem, and let the developer propose the fix.",
        "**They have no success measure.** If you can't say how you'll know it worked, neither of you can tell when it's finished.",
        "**Everything is a priority.** When every feature is \"must have\", the schedule and the budget have no room to move.",
        "**They hide the constraints.** Budget, deadline and the tools you already use change the best answer. Surprises later are expensive."
      ]
    },
    { type: "h2", text: "The one-page brief" },
    {
      type: "p",
      text: "A good brief fits on a page. These are the parts that matter:"
    },
    {
      type: "ol",
      items: [
        "**The problem.** What's going wrong today, in one or two sentences?",
        "**Who uses it.** You, your team, your customers? How many, and how technical are they?",
        "**What success looks like.** A number if possible: \"cut lead reply time from a day to five minutes\".",
        "**Must-have, nice-to-have, not now.** Three short lists. The \"not now\" list is the most useful one.",
        "**What you already use.** Tools, spreadsheets, accounts, data. Any of these might connect to what's being built.",
        "**Budget and deadline.** An honest range. A developer can't design the right size of solution without it."
      ]
    },
    { type: "h2", text: "Build yours here" },
    {
      type: "p",
      text: "Fill in what you know. Leave anything you're unsure about blank. The completeness meter shows what's still missing, and a gap in your brief is a good question to ask your developer. When you're ready, copy the result and send it."
    },
    { type: "widget", name: "brief-builder" },
    { type: "h2", text: "Questions a good developer will ask you" },
    {
      type: "p",
      text: "A brief is half the conversation. Here's how to tell you're talking to someone good: they ask questions before they quote a price."
    },
    {
      type: "ul",
      items: [
        "\"What happens today when this goes wrong?\"",
        "\"Who will use this daily, and what will they hate about it?\"",
        "\"What's the smallest version that would already be useful?\"",
        "\"What do you already have that we could reuse?\"",
        "\"What would make you call this a failure in three months?\""
      ]
    },
    { type: "h2", text: "Red flags on the developer's side" },
    {
      type: "ul",
      items: [
        "A fixed price and date within minutes of your first message, with no questions asked.",
        "No mention of what happens after launch: hosting, fixes, who owns the code.",
        "Never saying \"no\" or \"that's not worth building\".",
        "Vague timelines like \"a few weeks\" with no milestones you can check.",
        "Reluctance to show you work in progress before the end."
      ]
    },
    { type: "h2", text: "Work in small steps" },
    {
      type: "p",
      text: "Whatever you agree, ask for **short delivery cycles**. Something you can click on every week or two beats a big reveal at the end. It's the cheapest insurance in software: if you're heading the wrong way, you find out after a week, not after three months."
    },
    {
      type: "callout",
      title: "One more thing",
      text: "Ask who owns the code and the accounts at the end. You should. Your domain, your hosting and your data should be under your name from day one."
    },
    {
      type: "p",
      text: "If you have a brief, or just a rough idea you'd like to turn into one, send it to me. Even if we don't end up working together, I'll tell you what I'd tighten."
    }
  ]
};
