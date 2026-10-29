import type { Post } from "../types";

export const spreadsheetToTool: Post = {
  slug: "when-your-spreadsheet-needs-to-become-a-tool",
  title: "Your spreadsheet is a system in disguise: when to replace it with a custom tool",
  description:
    "Spreadsheets run more businesses than anyone admits. Here are the warning signs that yours has outgrown itself, and what to do next.",
  date: "2026-05-29",
  category: "DECISIONS",
  blocks: [
    {
      type: "p",
      text: "Most businesses start in a spreadsheet, and that's the right call. It's free, flexible, and everyone knows how to use it. I'm a developer, and I still open one every day."
    },
    {
      type: "p",
      text: "But there's a quiet moment when a spreadsheet stops being a spreadsheet and becomes **the system your business runs on**: leads, orders, client work, payments, all in one file with a name like \"MASTER_final_v3\". That's the moment to look at it differently."
    },
    { type: "h2", text: "Don't replace it too early" },
    {
      type: "p",
      text: "Let me say this first, because developers don't say it often enough. **A working spreadsheet is a good tool.** If it's one person, a few hundred rows and it does the job, leave it alone. Replacing it costs money and time you could spend on customers."
    },
    {
      type: "p",
      text: "The question is not \"is this a spreadsheet?\". It's \"is this spreadsheet now costing me more than a proper tool would?\""
    },
    { type: "h2", text: "The warning signs" },
    {
      type: "p",
      text: "Tick the ones that are true for you. Be honest. Nobody sees your answers."
    },
    { type: "widget", name: "spreadsheet-checker" },
    { type: "h2", text: "What to do about it, in order" },
    {
      type: "p",
      text: "You don't have to jump from a spreadsheet to a custom system. There's a ladder, and most businesses should climb it one rung at a time."
    },
    { type: "h3", text: "Rung 1: Clean up what you have" },
    {
      type: "p",
      text: "One row per thing, one column per fact. No merged cells, no colors carrying meaning, no notes hidden in comments. Add dropdowns for fields that should only have certain values. This alone fixes a surprising number of problems and costs nothing."
    },
    { type: "h3", text: "Rung 2: Put a form in front of it" },
    {
      type: "p",
      text: "If people type directly into the sheet, they'll break it. A form that writes into the sheet means data arrives in the same format every time."
    },
    { type: "h3", text: "Rung 3: Automate the repetitive parts" },
    {
      type: "p",
      text: "Send an email when a row changes. Create an invoice when a status becomes \"Done\". Copy new rows into your accounting tool. A small amount of automation removes most of the copy-paste work."
    },
    { type: "h3", text: "Rung 4: Move to a proper tool" },
    {
      type: "p",
      text: "When multiple people need different access, when you need reliable history, or when the process is complex, move the data into a real database with a simple interface on top. This might be a bought product. Sometimes it is custom."
    },
    { type: "h2", text: "What a custom tool gives you that a sheet can't" },
    {
      type: "ul",
      items: [
        "**Permissions.** Sales sees leads, finance sees payments, nobody sees everything by accident.",
        "**Rules that can't be broken.** A required field really is required. A status can only move forward in the right order.",
        "**A history.** Who changed what, and when.",
        "**Speed at scale.** Ten thousand rows is slow in a sheet and trivial for a database.",
        "**Fit.** The screens match how your team actually works."
      ]
    },
    {
      type: "p",
      text: "I build internal tools for exactly this situation, including a CRM for a pharma team. The approach I trust is to start from the sheet the team already uses. You keep what works, and the tool adds the guardrails."
    },
    {
      type: "callout",
      title: "Before you commit",
      text: "Export your sheet and look at the columns. Whatever you actually track is the blueprint for the new tool. A developer who asks to see your spreadsheet first is doing it right."
    },
    {
      type: "p",
      text: "If your result above says \"time for a proper tool\", send me a copy with the sensitive data removed. I'll tell you which rung you're on and whether a custom build is worth it."
    }
  ]
};
