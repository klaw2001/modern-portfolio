import type { Post } from "../types";

export const reportsThatWriteThemselves: Post = {
  slug: "reports-that-write-themselves",
  title: "Reports that write themselves: automating your weekly numbers",
  description:
    "Every Monday someone copies numbers into a report. Here is how the work breaks down, which parts to automate, where AI helps, and how fast it pays back.",
  date: "2026-04-16",
  category: "AUTOMATION",
  blocks: [
    {
      type: "p",
      text: "Every Monday, someone in your business opens four tabs, copies numbers from each into a spreadsheet, fixes the formatting, writes two sentences about what happened, and emails it to the team."
    },
    {
      type: "p",
      text: "It takes an hour or two. It is boring, it is easy to get wrong, and it is almost always the first thing to be skipped when things get busy. It's also one of the easiest tasks to automate."
    },
    { type: "h2", text: "Anatomy of a weekly report" },
    {
      type: "p",
      text: "Every report, however fancy, is five small jobs in a row:"
    },
    {
      type: "ol",
      items: [
        "**Collect.** Pull the numbers from where they live: your website analytics, your payments tool, your CRM, your ad accounts.",
        "**Combine.** Put them in one place, matched up by date or customer.",
        "**Calculate.** Totals, percentages, changes from last week.",
        "**Explain.** Write down what happened and what stands out.",
        "**Send.** Email it, post it in a chat channel, or update a dashboard."
      ]
    },
    {
      type: "p",
      text: "Steps one, two, three and five are mechanical. A program does them perfectly, every time, at 7 a.m. while you sleep. Step four, the explaining, is where AI is useful."
    },
    { type: "h2", text: "Where AI fits in" },
    {
      type: "p",
      text: "Given the final numbers, a language model can write a short plain-English summary: \"Sales were up 12% on last week, driven by two large orders. Website visits dipped on Thursday.\" It saves the writing, and often points to things people would have skipped over."
    },
    {
      type: "p",
      text: "But a few guardrails make the difference between a helpful summary and an embarrassing one:"
    },
    {
      type: "ul",
      items: [
        "**Always show the raw numbers next to the AI's words.** The summary is a convenience, not the source of truth.",
        "**Let the program do the maths.** Calculate percentages in code, then give the results to the AI to describe. Language models are unreliable at arithmetic.",
        "**Flag the unusual.** If a figure moved a lot, highlight it, so a person looks.",
        "**Keep a person in the loop at first.** Have the report go to one reviewer for the first month. When it has been right every week, send it straight to the team."
      ]
    },
    { type: "h2", text: "How fast does it pay back?" },
    {
      type: "p",
      text: "Put in your own numbers. Include a running cost for the tools, because honest maths includes it."
    },
    { type: "widget", name: "automation-payback" },
    { type: "h2", text: "How to start without overbuilding" },
    {
      type: "ol",
      items: [
        "**Pick one report.** The weekly one that annoys you most.",
        "**List its numbers and where each one comes from.** If a number lives in someone's head, that's a different problem to solve first.",
        "**Automate collection and calculation first.** Even before the AI summary, you'll have saved most of the time.",
        "**Add the summary.** Then add alerts, such as \"tell me if sales drop more than 20%\".",
        "**Compare against the manual version for two weeks.** Build trust before you drop the old way."
      ]
    },
    { type: "h2", text: "Common pitfalls" },
    {
      type: "ul",
      items: [
        "**Automating a report nobody reads.** Ask first whether anyone would miss it.",
        "**Fragile connections.** Tools change their data formats. Build in an alert that tells you when a report fails to generate, so it doesn't fail silently.",
        "**Too many numbers.** A report with forty metrics is a data dump. Five that drive decisions are better."
      ]
    },
    {
      type: "callout",
      title: "The real benefit",
      text: "The hours saved matter. But the bigger win is that reports arrive on time, every time, and the decisions they inform stop depending on whoever had time that week."
    },
    {
      type: "p",
      text: "If there's a report you'd happily never build by hand again, tell me what's in it and where the numbers come from. That's usually enough for me to estimate the build."
    }
  ]
};
