import type { Post } from "../types";

export const websiteChatbot: Post = {
  slug: "website-chatbot-that-qualifies-leads",
  title: "A website chatbot that qualifies leads without annoying visitors",
  description:
    "Most chatbots irritate people. Here are the rules that make a lead-qualifying chat useful, with a live demo of how a conversation becomes a scored CRM record.",
  date: "2026-07-14",
  category: "AI BASICS",
  blocks: [
    {
      type: "p",
      text: "Be honest: when a chat bubble pops up on a website and says \"Hi! How can I help?\", do you click it? Most people don't. The ones who do often regret it, because the bot answers a different question than the one they asked."
    },
    {
      type: "p",
      text: "And yet a well-built chat can be one of the best things on a service website. Not because it is clever, but because it does a job a form does badly: **it asks a few questions, one at a time, and hands you a lead that is already sorted**."
    },
    { type: "h2", text: "Why most chatbots fail" },
    {
      type: "ul",
      items: [
        "**They interrupt.** A pop-up the moment the page loads is a stranger shouting at you in a shop.",
        "**They pretend to be human.** People feel tricked when they find out, and trust drops.",
        "**They ask too much.** Eight questions before any value is a form with extra steps.",
        "**They trap you.** No way to reach a real person is the fastest route to a lost customer.",
        "**They answer everything.** Bots that guess at pricing or promise things the business can't deliver create legal and trust problems."
      ]
    },
    { type: "h2", text: "Six rules for a chat that works" },
    {
      type: "ol",
      items: [
        "**Be clear it's an assistant.** A friendly one, not a fake person.",
        "**Ask one question at a time**, and make the common answers one-tap buttons. Typing on a phone is work.",
        "**Keep it to three or four questions**: what do you need, roughly what scale, when do you want to start, and where should we reach you.",
        "**Always offer a human.** \"Prefer to talk to a person?\" should be one tap away.",
        "**Let AI handle the messy part.** If someone types a paragraph, AI can read it and fill in the structured fields behind the scenes.",
        "**Set boundaries.** The bot qualifies and routes. It does not quote prices, promise dates, or give advice it isn't qualified to give."
      ]
    },
    { type: "h2", text: "See it work" },
    {
      type: "p",
      text: "Below is a simplified demo of the flow. It's scripted rather than live AI, so you can see the idea without any waiting. Answer the questions on the left and watch the lead record build on the right."
    },
    { type: "widget", name: "chatbot-demo" },
    { type: "h2", text: "What happens after the chat" },
    {
      type: "p",
      text: "The conversation is only half the value. The other half is what happens to it afterwards:"
    },
    {
      type: "ul",
      items: [
        "The answers are saved as **structured fields** (need, budget, timeline, email), not a wall of chat text nobody wants to read.",
        "A **score** decides the route. Hot leads trigger an instant alert to you and a link to book a call. Warm leads get a personal follow-up within a day. Everyone else drops into a gentle email sequence.",
        "The record syncs to your **CRM automatically**, so nobody types it in again."
      ]
    },
    {
      type: "p",
      text: "This is the pattern I use when I build lead-qualification systems: conversation in, scored and synced record out, with no manual data entry in between."
    },
    { type: "h2", text: "When you should skip the chatbot" },
    {
      type: "p",
      text: "Not every business needs one. If you get a handful of enquiries a month, a good form and a fast personal reply will beat any bot. A chatbot earns its place when you get **enough volume that sorting leads is itself a time sink**, or when you get enquiries outside your working hours and want them captured, not lost."
    },
    {
      type: "callout",
      title: "Test before you launch",
      text: "Have three people who don't know your business try to break it. Ask odd questions, give odd answers, and try to leave. Fix what confuses them."
    },
    {
      type: "p",
      text: "If you'd like a chat like this on your own site, tell me what kind of leads you get and what makes a good one. That's all I need to sketch the questions."
    }
  ]
};
