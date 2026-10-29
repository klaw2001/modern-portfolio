import type { Post } from "../types";

export const timeAudit: Post = {
  slug: "founder-time-audit",
  title: "Your time audit: find the 5 tasks you should stop doing by hand",
  description:
    "A one-week exercise to find the repetitive work eating your hours, and a calculator that turns it into a monthly number worth automating.",
  date: "2026-08-27",
  category: "AUTOMATION",
  blocks: [
    {
      type: "p",
      text: "Founders are usually the most expensive employee in their own company, and also the one doing the cheapest tasks. Copying a number from one place to another. Chasing a payment. Sending the same reply for the fortieth time."
    },
    {
      type: "p",
      text: "You don't need to learn to code to fix this. You need to know **which tasks to hand over**. This is the exercise I run with clients before I write a single line of code."
    },
    { type: "h2", text: "Step 1: Track for one week" },
    {
      type: "p",
      text: "Keep a plain note open all week. Every time you finish a task, write down what it was and roughly how long it took. Don't judge it, and don't organize it. Just capture it."
    },
    {
      type: "p",
      text: "At the end of the week you will find two things. Something you do every day that you didn't realize took an hour. And a task you dread that takes ten minutes, but which you keep putting off."
    },
    { type: "h2", text: "Step 2: Ask three questions about each task" },
    {
      type: "ol",
      items: [
        "**Do I do this over and over?** Repetition is where automation pays off. A one-off job isn't worth building for.",
        "**Could I write down the steps?** If you can explain it to a new hire in a short list, a program can do it. If it needs your judgment every time, it probably can't, yet.",
        "**Does it need me specifically?** A relationship-building call does. Moving data between two apps does not."
      ]
    },
    {
      type: "p",
      text: "Tasks that get three yeses go on the shortlist. Be strict. A task with one yes is just a task."
    },
    { type: "h2", text: "The usual suspects" },
    {
      type: "p",
      text: "When I run this with small businesses, the same tasks keep appearing:"
    },
    {
      type: "ul",
      items: [
        "Following up on new enquiries and leads",
        "Chasing unpaid invoices",
        "Copying data between tools (form to spreadsheet to CRM)",
        "Building the same weekly report",
        "Answering the same customer questions",
        "Scheduling and rescheduling meetings",
        "Entering data from emails and PDFs",
        "Onboarding new clients with the same checklist"
      ]
    },
    { type: "h2", text: "Step 3: Put a number on it" },
    {
      type: "p",
      text: "Vague annoyance doesn't get fixed. A number does. Tick the tasks that sound like yours, adjust the hours to match your reality, and see what they cost you each month."
    },
    { type: "widget", name: "time-audit" },
    {
      type: "p",
      text: "The \"time saved\" setting matters. Automation rarely removes 100% of a task. There's still a review, an exception, an occasional fix. I use 50 to 70% as a realistic range, and I'd rather you under-promise to yourself."
    },
    { type: "h2", text: "Step 4: Simplify before you automate" },
    {
      type: "p",
      text: "This is the step people skip, and it is the most important one. **Automating a messy process just makes the mess run faster.**"
    },
    {
      type: "p",
      text: "Before you build anything, ask whether the task needs to exist at all. Can you remove a step? Can two forms become one? Can you stop producing a report nobody reads? About a third of the time, the answer saves you the hours and the build cost."
    },
    { type: "h2", text: "Step 5: Start with the top one" },
    {
      type: "p",
      text: "Pick the single task with the highest monthly cost and the clearest steps. Automate that one first, measure the hours you get back, and then decide on the next."
    },
    {
      type: "callout",
      title: "What good looks like",
      text: "A task that took you two hours a week now takes five minutes of checking. That is eight hours a month back, every month, for the price of building it once."
    },
    {
      type: "p",
      text: "If you want a second pair of eyes on your list, send it over. I'll tell you which items are worth building, which to simplify first, and which to leave exactly as they are."
    }
  ]
};
