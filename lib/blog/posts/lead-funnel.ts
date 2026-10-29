import type { Post } from "../types";

export const leadFunnel: Post = {
  slug: "stop-losing-leads-after-the-form",
  title: "Your website is leaking leads. Here's the 4-step system that stops it.",
  description:
    "Someone fills in your form and hears nothing, so the lead goes cold. A simple funnel with an instant confirmation email and a Brevo nurture sequence fixes it.",
  date: "2026-10-29",
  category: "LEAD FUNNELS",
  blocks: [
    {
      type: "p",
      text: "Think about what it took to get one person to fill in your contact form. You paid for the website, for the ads or the content, and for the months it took to rank. Then a real human typed their name and email into a box and pressed send."
    },
    {
      type: "p",
      text: "That is the most expensive moment in your whole business. So what happens in the next ten minutes?"
    },
    {
      type: "p",
      text: "On most websites, the honest answer is: nothing the visitor can see. The form says \"Thank you!\", an email lands in someone's inbox, and it waits there between invoices and newsletters. The visitor, meanwhile, has already opened three other tabs and sent the same enquiry to your competitors."
    },
    {
      type: "p",
      text: "I build websites and automation for a living, and this is the leak I see most often. It isn't a traffic problem or a design problem. It's a **follow-up** problem, and it is cheap to fix."
    },
    { type: "h2", text: "Where the lead actually leaks" },
    {
      type: "p",
      text: "There are three separate leaks, and most businesses have all three."
    },
    {
      type: "ol",
      items: [
        "**Silence.** The visitor submits the form and gets no confirmation at all. They don't know whether it worked, so they assume it didn't.",
        "**Delay.** You reply, but a day later. Interest fades quickly. In one widely cited Harvard Business Review study of online leads, companies that responded within an hour were far more likely to qualify the lead than those that waited longer. The exact numbers vary by industry, but the direction never does: **fast beats slow**.",
        "**Forgetting.** The lead isn't ready to buy yet, so you say \"let's talk next month\", and then nobody does. Most deals aren't lost to a competitor. They're lost to nobody following up."
      ]
    },
    {
      type: "p",
      text: "Try the numbers on your own business. These are rough assumptions you can change, not measured data. The point is to see the size of the gap."
    },
    { type: "widget", name: "lead-leak-calculator" },
    { type: "h2", text: "The 4-step system" },
    {
      type: "p",
      text: "Here's the whole funnel. None of it is complicated, and a developer can wire it up in a few days."
    },
    { type: "h3", text: "Step 1: Capture the lead properly" },
    {
      type: "p",
      text: "The form should ask for as little as possible: name, email, and one line about what they need. Every extra field costs you leads. Behind the form sits a small piece of code that sends the details to your email tool (I use Brevo) and to you, at the same moment."
    },
    { type: "h3", text: "Step 2: Confirm instantly" },
    {
      type: "p",
      text: "Within seconds, the visitor gets an email that says: we got it, here's what happens next, and here's when you'll hear from a human. This one email fixes the \"silence\" leak completely. It also builds trust, because it shows you run a tidy business."
    },
    {
      type: "p",
      text: "It can do a second job too. Ask them to click a button to confirm their email address. That click is **proof they want to hear from you**, and it is what makes the next step legitimate."
    },
    { type: "h3", text: "Step 3: Nurture on a schedule" },
    {
      type: "p",
      text: "This is the part that fixes \"forgetting\". Instead of relying on your memory, the system sends a short series of useful emails: tomorrow, next week, next month. Nobody on your side has to remember anything. Click through the timeline below to see what each email does."
    },
    { type: "widget", name: "nurture-timeline" },
    { type: "h3", text: "Step 4: Know when to stop and when to step in" },
    {
      type: "p",
      text: "A nurture sequence should end the moment it has done its job. If the lead replies, books a call, or becomes a customer, they should leave the sequence immediately. Nothing is more awkward than a sales email arriving the day after someone signed with you."
    },
    {
      type: "p",
      text: "You should also get alerted when something important happens, like a new lead arriving or someone clicking the pricing link. The system works for you, but a human still closes the deal."
    },
    { type: "h2", text: "A note on consent" },
    {
      type: "p",
      text: "Sending someone a one-time reply to their enquiry is one thing. Putting them on a recurring email list is another. Laws like the EU's GDPR and India's Digital Personal Data Protection Act expect you to have the person's **clear consent** before you do that, and an easy way to opt out in every email."
    },
    {
      type: "p",
      text: "The simplest approach is a checkbox on the form (\"Send me occasional tips by email\") or the confirm-your-email button from step 2. I'm a developer, not a lawyer, so check the exact rules for your market. But build consent into the funnel from day one. It's much harder to add later."
    },
    { type: "h2", text: "What it looks like under the hood" },
    {
      type: "p",
      text: "If you're technical, or you want to know what you're paying for, here's the shape of it. The website sends the form to a small server-side function. That function adds the person to a list in Brevo. Brevo then takes over: it sends the confirmation and starts the automation."
    },
    {
      type: "code",
      language: "ts",
      code: `// app/api/lead/route.ts  (Next.js route handler)
export async function POST(request: Request) {
  const { name, email, message, consent } = await request.json();

  if (!email || !consent) {
    return Response.json({ error: "Email and consent required" }, { status: 400 });
  }

  // The API key stays on the server, never in the browser.
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email,
      attributes: { FIRSTNAME: name, MESSAGE: message },
      listIds: [Number(process.env.BREVO_LEADS_LIST_ID)],
      updateEnabled: true // don't fail if they've enquired before
    })
  });

  if (!response.ok) {
    return Response.json({ error: "Could not save lead" }, { status: 502 });
  }

  return Response.json({ ok: true });
}`
    },
    {
      type: "p",
      text: "Inside Brevo, an automation watches that list. When a new contact appears, it sends the confirmation straight away, waits a day, sends the next email, waits a week, and so on. Check Brevo's current documentation for the exact fields, because tools change their APIs from time to time."
    },
    { type: "h2", text: "Mistakes that kill a funnel" },
    {
      type: "ul",
      items: [
        "**Emailing too often.** Once a day for a month feels like spam. Day 1, day 7 and day 30 is plenty for most services.",
        "**Generic emails.** \"Check out our services!\" gets deleted. A useful tip, a short story, or an answer to a common objection gets read.",
        "**Never testing it.** Submit your own form, on your phone, with a spam-heavy email address. See what the visitor sees. Check the confirmation doesn't land in the spam folder.",
        "**No unsubscribe link.** It's required, and it also makes people trust you more.",
        "**Forgetting the human.** Automation handles the first week. A real, personal reply from you is what wins the work."
      ]
    },
    { type: "h2", text: "Is it worth building?" },
    {
      type: "p",
      text: "Go back to the calculator and put in your own deal size. If one extra client a year pays for the whole thing, and for most service businesses it does, the answer is yes. The tools are cheap, and the build is a few days of work."
    },
    {
      type: "callout",
      title: "The short version",
      text: "Capture the lead, confirm it instantly, follow up on a schedule, and stop the moment they reply. Four steps, and no lead goes quiet because of your silence."
    },
    {
      type: "p",
      text: "If you'd like this built into your own website, get in touch. I'll map your current form-to-reply journey, find where leads are leaking, and tell you honestly whether the fix is worth it for your business."
    }
  ]
};
