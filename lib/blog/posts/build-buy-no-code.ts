import type { Post } from "../types";

export const buildBuyNoCode: Post = {
  slug: "build-buy-or-no-code",
  title: "Build, buy or no-code? How to decide before you spend a rupee",
  description:
    "A developer's honest decision guide for founders: when an off-the-shelf tool wins, when no-code is enough, and when custom code is worth paying for.",
  date: "2026-08-06",
  category: "DECISIONS",
  blocks: [
    {
      type: "p",
      text: "You're a developer, so you'd expect me to say \"build it custom\". I won't. For most problems, custom code is the wrong answer, and a good developer will tell you so before taking your money."
    },
    {
      type: "p",
      text: "You have three real options whenever you need software to solve a problem. Each is right in some situations and expensive in others."
    },
    { type: "h2", text: "The three options, honestly" },
    { type: "h3", text: "Buy: an off-the-shelf tool" },
    {
      type: "p",
      text: "A product that already exists: an invoicing app, a booking system, a CRM. **Fastest to start, cheapest to start, and tested by thousands of other users.** The cost is that it works the way its makers decided, and pricing often grows with your team size."
    },
    { type: "h3", text: "No-code: connect existing tools" },
    {
      type: "p",
      text: "Tools like Zapier, Make or Airtable let you link apps and build simple workflows without programming. **Great for low-volume, low-risk automation that you want running this week.** The cost is limits: complicated logic gets messy, and the per-task pricing can climb as you scale."
    },
    { type: "h3", text: "Build: custom code" },
    {
      type: "p",
      text: "Software written for exactly your process. **Highest upfront cost and slowest to start, but it fits perfectly and you own it.** It's the right choice when the thing is central to your business, or when off-the-shelf tools fight your process."
    },
    { type: "h2", text: "Find your answer" },
    {
      type: "p",
      text: "Answer these six questions about the specific problem you're solving. There are no trick answers. The tool weighs your answers and shows which option fits and why."
    },
    { type: "widget", name: "build-buy-picker" },
    { type: "h2", text: "The hidden costs people forget" },
    {
      type: "ul",
      items: [
        "**Per-seat pricing.** A tool that costs a little for two people costs a lot for twenty.",
        "**Glue work.** Buying five tools means someone has to keep them talking to each other. That someone is usually you.",
        "**Switching costs.** The longer your data lives in a tool, the harder it is to leave.",
        "**Maintenance of custom code.** Software needs updates, security fixes and a person who understands it. Budget for it, or pick a developer who offers it.",
        "**The cost of waiting.** If a problem costs you ten hours a week, a fast imperfect fix often beats a perfect one in three months."
      ]
    },
    { type: "h2", text: "A pattern that works" },
    {
      type: "p",
      text: "My default advice, for almost every small business, is to **start with a bought tool or no-code and graduate to custom only when you hit a real wall.**"
    },
    {
      type: "p",
      text: "That wall looks like one of these: the monthly tool bill has grown past what a custom build would cost over a year, the workaround has become a full-time job, or the process is now a real competitive advantage that no tool supports."
    },
    {
      type: "p",
      text: "When you reach it, you'll have a bonus. You will already know exactly what the system should do, because you've been running it in a rough form. That makes custom builds cheaper, faster and far less likely to miss."
    },
    {
      type: "callout",
      title: "A question for any developer you talk to",
      text: "\"What would you do if it were your money?\" A good developer will sometimes answer \"Don't build this. Use X.\" Hire the one who does."
    },
    {
      type: "p",
      text: "Not sure which way your problem leans? Describe it to me in a couple of sentences and I'll give you a straight answer, even if the answer is that you don't need me."
    }
  ]
};
