import type { Post } from "../types";

export const fastWebsite: Post = {
  slug: "a-fast-website-is-a-sales-tool",
  title: "A fast website is a sales tool: speed, SEO and what founders can ignore",
  description:
    "Slow pages quietly lose visitors and rankings. What to check yourself, what to ask your developer, and what you can safely ignore, with a calculator for your own site.",
  date: "2026-03-24",
  category: "WEBSITES",
  blocks: [
    {
      type: "p",
      text: "You've probably clicked a link on your phone, watched a blank screen for a few seconds, and pressed back. Your own visitors do exactly the same thing to your website, and you never hear about it. There's no complaint, no email, just a quiet drop in the number of enquiries."
    },
    {
      type: "p",
      text: "Website speed is one of the few things that affects **both** your sales and your search ranking. And it is mostly a matter of a handful of fixable causes, not mysterious technical magic."
    },
    { type: "h2", text: "Why speed matters for sales" },
    {
      type: "p",
      text: "People decide in seconds whether a site feels trustworthy and worth their time. A fast page feels professional. A slow one feels neglected. Studies from large retailers and the browser makers have repeatedly linked slower pages to fewer purchases and sign-ups, though how much depends heavily on your industry and audience."
    },
    {
      type: "p",
      text: "Since I can't know your numbers, use your own. Move the sliders below. The \"loss per extra second\" figure is an assumption you set yourself, not a fact, so try a cautious value and a pessimistic one."
    },
    { type: "widget", name: "speed-cost" },
    { type: "h2", text: "Why speed matters for SEO" },
    {
      type: "p",
      text: "Google has said openly that page experience is one of the signals it uses to rank pages, through a set of measurements called **Core Web Vitals**: how quickly the main content appears, how quickly the page responds when you tap, and whether the layout jumps around while loading."
    },
    {
      type: "p",
      text: "To be honest about the size of the effect: content that answers the question matters far more. Speed rarely lifts a weak page to number one. But between two similar pages, the faster one has the edge, and a very slow site can hold you back."
    },
    { type: "h2", text: "Check your own site in five minutes" },
    {
      type: "ol",
      items: [
        "Open **PageSpeed Insights** (it's free, from Google) and paste your web address. Look at the mobile result first. Most of your visitors are on phones.",
        "Then do the human test: open your site on your own phone, on mobile data and not Wi-Fi, and count how long until you can read something useful.",
        "Try your most important page, not just the home page. If it's a service page or a contact form, test that."
      ]
    },
    { type: "h2", text: "The usual causes of a slow site" },
    {
      type: "ul",
      items: [
        "**Huge images.** The number one culprit. A photo straight off a camera can be twenty times bigger than it needs to be.",
        "**Too many add-ons.** Chat widgets, trackers, pop-ups, social feeds. Each one is another thing to download. Ask what each is earning you.",
        "**Heavy page builders and plugins**, especially on cheaper templates.",
        "**Slow hosting**, or a server on the other side of the world from your customers.",
        "**Fonts and videos** loading before the text and the content the visitor came for."
      ]
    },
    { type: "h2", text: "What to ask your developer for" },
    {
      type: "ul",
      items: [
        "Images that are resized and compressed automatically, and only loaded when they come into view.",
        "Pages built ahead of time and served from a network close to the visitor, instead of rebuilt on every visit.",
        "A short list of every third-party script on the site and why it is there.",
        "A speed check on a real phone as part of \"done\", not only on a fast office computer."
      ]
    },
    { type: "h2", text: "What you can safely ignore" },
    {
      type: "ul",
      items: [
        "**A perfect score of 100.** It isn't the goal. Getting from poor to good matters. Getting from 94 to 100 almost never earns anything.",
        "**Tiny technical warnings** with no visible effect on how the page feels.",
        "**Speed tests run once.** Results vary between runs. Look at the pattern, not one number."
      ]
    },
    {
      type: "callout",
      title: "Quick win",
      text: "If your images are not already compressed and sized correctly, fixing that alone often makes the biggest difference for the least effort."
    },
    {
      type: "p",
      text: "If you want to know where your own site stands, send me the address. I'll run it, tell you the two or three changes that would matter, and what each would cost."
    }
  ]
};
