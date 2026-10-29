"use client";

import { useId, useMemo, useState, type ComponentType, type ReactNode } from "react";
import type { WidgetName } from "@/lib/blog/types";

/* ---------- shared helpers ---------- */

const currencies = {
  INR: { symbol: "₹", locale: "en-IN" },
  USD: { symbol: "$", locale: "en-US" },
  EUR: { symbol: "€", locale: "de-DE" },
  GBP: { symbol: "£", locale: "en-GB" }
} as const;

type CurrencyCode = keyof typeof currencies;

function formatMoney(value: number, code: CurrencyCode) {
  const { symbol, locale } = currencies[code];

  return `${symbol}${Math.round(value).toLocaleString(locale)}`;
}

function formatNumber(value: number, digits = 0) {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: digits
  });
}

function Widget({
  title,
  note,
  children
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="bw">
      <figcaption className="bw-head">
        <span>Interactive</span>
        <strong>{title}</strong>
      </figcaption>
      <div className="bw-body">{children}</div>
      {note ? <p className="bw-note">{note}</p> : null}
    </figure>
  );
}

function CurrencySelect({
  value,
  onChange
}: {
  value: CurrencyCode;
  onChange: (value: CurrencyCode) => void;
}) {
  const id = useId();

  return (
    <div className="bw-field bw-field--inline">
      <label htmlFor={id}>Currency</label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as CurrencyCode)}
      >
        {(Object.keys(currencies) as CurrencyCode[]).map((code) => (
          <option key={code} value={code}>
            {currencies[code].symbol} {code}
          </option>
        ))}
      </select>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  const id = useId();

  return (
    <div className="bw-field">
      <label htmlFor={id}>{label}</label>
      <div className="bw-input">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(event) => {
            const next = event.target.valueAsNumber;
            onChange(Number.isFinite(next) ? Math.max(min, next) : 0);
          }}
        />
        {suffix ? <span>{suffix}</span> : null}
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  display
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  display: string;
}) {
  const id = useId();

  return (
    <div className="bw-field">
      <label htmlFor={id}>
        {label} <b>{display}</b>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
    </div>
  );
}

function Stat({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone?: "alert" | "good";
}) {
  return (
    <div className={`bw-stat${tone ? ` bw-stat--${tone}` : ""}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ---------- 1. lead leak calculator ---------- */

function LeadLeakCalculator() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [visitors, setVisitors] = useState(2000);
  const [conversion, setConversion] = useState(2);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(50000);
  const [coldRate, setColdRate] = useState(30);
  const [recovery, setRecovery] = useState(40);

  const result = useMemo(() => {
    const leads = visitors * (conversion / 100);
    const lostLeads = leads * (coldRate / 100);
    const lostRevenue = lostLeads * (closeRate / 100) * dealValue;
    const recovered = lostRevenue * (recovery / 100);

    return { leads, lostLeads, lostRevenue, recovered };
  }, [visitors, conversion, closeRate, dealValue, coldRate, recovery]);

  return (
    <Widget
      title="Lead-leak calculator"
      note="Illustrative maths with assumptions you control. These are not measured results."
    >
      <div className="bw-grid">
        <CurrencySelect value={currency} onChange={setCurrency} />
        <NumberField
          label="Website visitors / month"
          value={visitors}
          onChange={setVisitors}
          step={100}
        />
        <NumberField
          label="Visitors who send an enquiry"
          value={conversion}
          onChange={setConversion}
          max={100}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Enquiries that become clients"
          value={closeRate}
          onChange={setCloseRate}
          max={100}
          suffix="%"
        />
        <NumberField
          label="Average deal value"
          value={dealValue}
          onChange={setDealValue}
          step={1000}
        />
      </div>

      <div className="bw-grid bw-grid--sliders">
        <SliderField
          label="Leads that go cold before you reply"
          value={coldRate}
          onChange={setColdRate}
          min={0}
          max={90}
          display={`${coldRate}%`}
        />
        <SliderField
          label="Of those, recovered by instant confirmation + nurture"
          value={recovery}
          onChange={setRecovery}
          min={0}
          max={100}
          display={`${recovery}%`}
        />
      </div>

      <div className="bw-stats">
        <Stat label="Enquiries / month" value={formatNumber(result.leads, 1)} />
        <Stat
          label="Leads going cold / month"
          value={formatNumber(result.lostLeads, 1)}
        />
        <Stat
          label="Revenue leaking / month"
          value={formatMoney(result.lostRevenue, currency)}
          tone="alert"
        />
        <Stat
          label="Recoverable / year"
          value={formatMoney(result.recovered * 12, currency)}
          tone="good"
        />
      </div>
    </Widget>
  );
}

/* ---------- 2. nurture timeline ---------- */

const nurtureSteps = [
  {
    when: "Day 0",
    wait: "Instantly",
    name: "Confirmation",
    subject: "Got your message, here's what happens next",
    purpose: "Ends the silence. Proves the form worked and sets expectations.",
    contents: [
      "Thank them by name",
      "Say when a human will reply (and mean it)",
      "One button: confirm your email so we can send you useful tips"
    ],
    stop: "Always sent, once."
  },
  {
    when: "Day 1",
    wait: "1 day later",
    name: "Useful tip",
    subject: "One thing to check before we talk",
    purpose: "Gives value before asking for anything. Shows you know the problem.",
    contents: [
      "A short, practical tip related to what they asked about",
      "No sales pitch",
      "An invitation to reply with questions"
    ],
    stop: "Skip if they have already replied or booked."
  },
  {
    when: "Day 7",
    wait: "1 week later",
    name: "Proof",
    subject: "How a similar project went",
    purpose: "Builds trust. Answers the 'can they actually do it?' worry.",
    contents: [
      "A short example of similar work",
      "What changed for that client",
      "A clear link to book a call"
    ],
    stop: "Skip if they have booked or become a client."
  },
  {
    when: "Day 30",
    wait: "1 month later",
    name: "Check-in",
    subject: "Still thinking about it?",
    purpose: "Catches leads whose timing wasn't right. Short and human.",
    contents: [
      "Two sentences, written like a person",
      "Ask what's changed",
      "Make it easy to say 'not now' (that's a useful answer too)"
    ],
    stop: "Then move them to a low-frequency list, or end the sequence."
  }
] as const;

function NurtureTimeline() {
  const [active, setActive] = useState(0);
  const step = nurtureSteps[active];

  return (
    <Widget title="The nurture sequence, step by step">
      <div className="bw-tabs" role="tablist" aria-label="Nurture emails">
        {nurtureSteps.map((item, index) => (
          <button
            key={item.when}
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "is-active" : undefined}
            onClick={() => setActive(index)}
          >
            <span>{item.when}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="bw-split" role="tabpanel">
        <div className="bw-mail" aria-label="Example email">
          <div className="bw-mail-bar">
            <i />
            <i />
            <i />
          </div>
          <p className="bw-mail-meta">
            <b>Subject:</b> {step.subject}
          </p>
          <ul>
            {step.contents.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <dl className="bw-facts">
          <div>
            <dt>Sent</dt>
            <dd>{step.wait}</dd>
          </div>
          <div>
            <dt>Purpose</dt>
            <dd>{step.purpose}</dd>
          </div>
          <div>
            <dt>Exit rule</dt>
            <dd>{step.stop}</dd>
          </div>
        </dl>
      </div>
    </Widget>
  );
}

/* ---------- 3. AI fit checker ---------- */

const aiFitQuestions = [
  { text: "I do this task many times a week.", points: 2 },
  { text: "The input is messy text: emails, documents, chats or notes.", points: 2 },
  { text: "A decent answer is still useful, even if not perfect.", points: 2 },
  { text: "A person can check the result in a few seconds.", points: 1 },
  { text: "A mistake is cheap to fix (not a legal, medical or money commitment).", points: 2 },
  { text: "I can't describe it as simple if-this-then-that rules.", points: 2 }
];

function AiFitChecker() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    aiFitQuestions.map(() => false)
  );

  const maxScore = aiFitQuestions.reduce((sum, item) => sum + item.points, 0);
  const score = aiFitQuestions.reduce(
    (sum, item, index) => sum + (checked[index] ? item.points : 0),
    0
  );
  const missing = aiFitQuestions.filter((_, index) => !checked[index]);

  const verdict =
    score >= 9
      ? {
          tone: "good",
          title: "Strong fit for AI",
          text: "Start with a small pilot, keep a person reviewing the output for the first few weeks, and measure the hours saved."
        }
      : score >= 6
        ? {
            tone: "mid",
            title: "Maybe: pilot it carefully",
            text: "AI could help, but there are risks. Keep the scope small, make sure a person reviews everything, and compare against a simple rule-based version."
          }
        : {
            tone: "low",
            title: "Probably not an AI job",
            text: "A plain rule, a better form, or a person with a checklist will likely be cheaper and more reliable here."
          };

  return (
    <Widget title="Is this task a good fit for AI?">
      <ul className="bw-checks">
        {aiFitQuestions.map((question, index) => (
          <li key={question.text}>
            <label>
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() =>
                  setChecked((current) =>
                    current.map((value, position) =>
                      position === index ? !value : value
                    )
                  )
                }
              />
              <span>{question.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className={`bw-verdict bw-verdict--${verdict.tone}`} aria-live="polite">
        <div className="bw-meter" aria-hidden="true">
          <i style={{ width: `${(score / maxScore) * 100}%` }} />
        </div>
        <strong>{verdict.title}</strong>
        <p>{verdict.text}</p>
        {score < maxScore && score > 0 ? (
          <p className="bw-muted">
            Weak spots: {missing.map((item) => item.text.replace(/\.$/, "")).join(" · ")}
          </p>
        ) : null}
      </div>
    </Widget>
  );
}

/* ---------- 4. time audit ---------- */

const auditTasks = [
  { name: "Following up on enquiries and leads", hours: 2 },
  { name: "Chasing unpaid invoices", hours: 1.5 },
  { name: "Copying data between tools", hours: 2 },
  { name: "Building the same weekly report", hours: 2 },
  { name: "Answering the same customer questions", hours: 3 },
  { name: "Scheduling and rescheduling meetings", hours: 1.5 },
  { name: "Entering data from emails and PDFs", hours: 2 },
  { name: "Onboarding new clients with the same checklist", hours: 1.5 },
  { name: "Sorting and replying to the inbox", hours: 2.5 }
];

function TimeAudit() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [hourlyValue, setHourlyValue] = useState(1500);
  const [saved, setSaved] = useState(60);
  const [picked, setPicked] = useState<boolean[]>(() => auditTasks.map(() => false));
  const [hours, setHours] = useState<number[]>(() => auditTasks.map((task) => task.hours));

  const selected = auditTasks
    .map((task, index) => ({ ...task, hours: hours[index], on: picked[index] }))
    .filter((task) => task.on);

  const weeklyHours = selected.reduce((sum, task) => sum + task.hours, 0);
  const monthlyHours = (weeklyHours * 52) / 12;
  const monthlyBack = monthlyHours * (saved / 100);
  const top = [...selected].sort((a, b) => b.hours - a.hours)[0];

  return (
    <Widget
      title="What your repetitive tasks cost"
      note="Hours are rough defaults. Change them to match your week."
    >
      <div className="bw-grid">
        <CurrencySelect value={currency} onChange={setCurrency} />
        <NumberField
          label="What an hour of your time is worth"
          value={hourlyValue}
          onChange={setHourlyValue}
          step={100}
        />
      </div>

      <ul className="bw-tasks">
        {auditTasks.map((task, index) => (
          <li key={task.name} className={picked[index] ? "is-on" : undefined}>
            <label>
              <input
                type="checkbox"
                checked={picked[index]}
                onChange={() =>
                  setPicked((current) =>
                    current.map((value, position) =>
                      position === index ? !value : value
                    )
                  )
                }
              />
              <span>{task.name}</span>
            </label>
            <div className="bw-input bw-input--small">
              <input
                aria-label={`Hours per week: ${task.name}`}
                type="number"
                min={0}
                step={0.5}
                value={hours[index]}
                onChange={(event) => {
                  const next = event.target.valueAsNumber;
                  setHours((current) =>
                    current.map((value, position) =>
                      position === index
                        ? Number.isFinite(next)
                          ? Math.max(0, next)
                          : 0
                        : value
                    )
                  );
                }}
              />
              <span>h/wk</span>
            </div>
          </li>
        ))}
      </ul>

      <SliderField
        label="Time automation realistically saves"
        value={saved}
        onChange={setSaved}
        min={20}
        max={90}
        step={5}
        display={`${saved}%`}
      />

      <div className="bw-stats">
        <Stat label="Hours / month on these" value={formatNumber(monthlyHours, 1)} />
        <Stat
          label="Hours you get back / month"
          value={formatNumber(monthlyBack, 1)}
          tone="good"
        />
        <Stat
          label="Value of that time / month"
          value={formatMoney(monthlyBack * hourlyValue, currency)}
          tone="good"
        />
      </div>

      {top ? (
        <p className="bw-hint" aria-live="polite">
          Start with: <b>{top.name}</b>, your biggest line.
        </p>
      ) : (
        <p className="bw-hint">Tick the tasks that sound like your week.</p>
      )}
    </Widget>
  );
}

/* ---------- 5. build / buy / no-code ---------- */

type Option = "buy" | "nocode" | "custom";

const optionLabels: Record<Option, string> = {
  buy: "Buy an off-the-shelf tool",
  nocode: "Use no-code to connect tools",
  custom: "Build custom"
};

const optionAdvice: Record<Option, string> = {
  buy: "Your problem is common enough that someone has already solved it well. Buying is faster and cheaper, and you get years of other people's testing for free.",
  nocode:
    "Your process has quirks, but the volume and risk are modest. Connecting existing tools gets you running this week. Revisit it if the logic gets tangled or the bill climbs.",
  custom:
    "Your process is specific or central to your edge, or the tools would fight you. Custom code costs more to start, but fits exactly and you own it."
};

const buildQuestions: {
  text: string;
  answers: { label: string; points: Partial<Record<Option, number>> }[];
}[] = [
  {
    text: "How common is this problem?",
    answers: [
      { label: "Every business like mine has it", points: { buy: 3 } },
      { label: "Common, but our process has quirks", points: { nocode: 2, buy: 1, custom: 1 } },
      { label: "Specific to how we work", points: { custom: 3, nocode: 1 } }
    ]
  },
  {
    text: "How central is it to what makes you different?",
    answers: [
      { label: "Not at all, it's back-office", points: { buy: 3 } },
      { label: "Somewhat", points: { nocode: 2, custom: 1 } },
      { label: "It's our competitive edge", points: { custom: 3 } }
    ]
  },
  {
    text: "How many tools must work together?",
    answers: [
      { label: "One or none", points: { buy: 2, nocode: 1 } },
      { label: "Two or three", points: { nocode: 3, custom: 1 } },
      { label: "Four or more, or unusual systems", points: { custom: 3 } }
    ]
  },
  {
    text: "How much volume do you expect?",
    answers: [
      { label: "Low: tens of items a week", points: { nocode: 3, buy: 2 } },
      { label: "Growing", points: { buy: 1, nocode: 1, custom: 2 } },
      { label: "High: thousands a month", points: { custom: 3, buy: 1 } }
    ]
  },
  {
    text: "How soon do you need it?",
    answers: [
      { label: "This week", points: { buy: 3, nocode: 2 } },
      { label: "Within a month", points: { nocode: 2, buy: 1, custom: 1 } },
      { label: "It can take a couple of months", points: { custom: 2, nocode: 1 } }
    ]
  },
  {
    text: "What's your budget like?",
    answers: [
      { label: "Tight", points: { buy: 3, nocode: 2 } },
      { label: "Moderate", points: { nocode: 2, custom: 1, buy: 1 } },
      { label: "Flexible", points: { custom: 2, nocode: 1 } }
    ]
  }
];

function BuildBuyPicker() {
  const [choices, setChoices] = useState<(number | null)[]>(() =>
    buildQuestions.map(() => null)
  );

  const answered = choices.filter((choice) => choice !== null).length;

  const totals = useMemo(() => {
    const sums: Record<Option, number> = { buy: 0, nocode: 0, custom: 0 };

    choices.forEach((choice, questionIndex) => {
      if (choice === null) return;

      const points = buildQuestions[questionIndex].answers[choice].points;
      (Object.keys(points) as Option[]).forEach((option) => {
        sums[option] += points[option] ?? 0;
      });
    });

    return sums;
  }, [choices]);

  const ranked = (Object.keys(totals) as Option[]).sort(
    (a, b) => totals[b] - totals[a]
  );
  const top = totals[ranked[0]];
  const tie = totals[ranked[1]] === top;

  return (
    <Widget title="Build, buy or no-code?">
      <ol className="bw-questions">
        {buildQuestions.map((question, questionIndex) => (
          <li key={question.text}>
            <p>{question.text}</p>
            <div className="bw-choices">
              {question.answers.map((answer, answerIndex) => (
                <button
                  key={answer.label}
                  type="button"
                  aria-pressed={choices[questionIndex] === answerIndex}
                  className={
                    choices[questionIndex] === answerIndex ? "is-active" : undefined
                  }
                  onClick={() =>
                    setChoices((current) =>
                      current.map((value, position) =>
                        position === questionIndex ? answerIndex : value
                      )
                    )
                  }
                >
                  {answer.label}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      {answered === 0 ? (
        <p className="bw-hint">Answer the questions to see a recommendation.</p>
      ) : (
        <div className="bw-verdict bw-verdict--good" aria-live="polite">
          <strong>
            {answered < buildQuestions.length
              ? `Leaning: ${optionLabels[ranked[0]]}`
              : `Best fit: ${optionLabels[ranked[0]]}`}
          </strong>
          <p>
            {tie
              ? `It's close between "${optionLabels[ranked[0]]}" and "${optionLabels[ranked[1]]}". Start with the cheaper one and reassess.`
              : optionAdvice[ranked[0]]}
          </p>
          <div className="bw-bars">
            {ranked.map((option) => (
              <div key={option}>
                <span>{optionLabels[option]}</span>
                <i>
                  <b
                    style={{
                      width: `${top === 0 ? 0 : (totals[option] / top) * 100}%`
                    }}
                  />
                </i>
              </div>
            ))}
          </div>
          {answered < buildQuestions.length ? (
            <p className="bw-muted">
              {buildQuestions.length - answered} question
              {buildQuestions.length - answered === 1 ? "" : "s"} left.
            </p>
          ) : null}
        </div>
      )}
    </Widget>
  );
}

/* ---------- 6. chatbot demo ---------- */

type ChatStep = {
  field: "need" | "budget" | "timeline";
  question: string;
  options: string[];
};

const chatSteps: ChatStep[] = [
  {
    field: "need",
    question: "Hi, I'm the studio's assistant (not a person). What would you like to get done?",
    options: ["A new website", "Automate a process", "Add AI to my product", "Just exploring"]
  },
  {
    field: "budget",
    question: "Got it. What scale of project are you thinking about?",
    options: ["Small starter project", "Medium project", "Large, multi-month build", "Not sure yet"]
  },
  {
    field: "timeline",
    question: "And when would you like to start?",
    options: ["This month", "In 1 to 3 months", "Later this year", "Not sure yet"]
  }
];

function scoreLead(record: Record<string, string>) {
  let score = 0;

  if (record.need && record.need !== "Just exploring") score += 1;
  if (record.budget === "Medium project") score += 2;
  if (record.budget === "Large, multi-month build") score += 3;
  if (record.budget === "Small starter project") score += 1;
  if (record.timeline === "This month") score += 3;
  if (record.timeline === "In 1 to 3 months") score += 2;
  if (record.timeline === "Later this year") score += 1;
  if (record.email) score += 1;

  return score;
}

function ChatbotDemo() {
  const [record, setRecord] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [done, setDone] = useState(false);

  const transcript = chatSteps.slice(0, Math.min(step + 1, chatSteps.length));
  const asksEmail = step >= chatSteps.length && !done;

  const score = scoreLead(record);
  const route =
    score >= 7
      ? { label: "Hot", action: "Instant alert to you + link to book a call" }
      : score >= 4
        ? { label: "Warm", action: "Personal follow-up within a day" }
        : { label: "Nurture", action: "Gentle monthly email sequence" };

  const reset = () => {
    setRecord({});
    setStep(0);
    setEmail("");
    setEmailError("");
    setDone(false);
  };

  const submitEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Enter a valid email, or skip to talk to a person.");
      return;
    }

    setRecord((current) => ({ ...current, email: email.trim() }));
    setEmailError("");
    setDone(true);
  };

  return (
    <Widget
      title="Chat → scored lead record"
      note="A scripted demo for illustration. A real build lets visitors type freely and uses AI to fill the same fields."
    >
      <div className="bw-split bw-split--chat">
        <div className="bw-chat">
          <div className="bw-chat-log" aria-live="polite">
            {transcript.map((item, index) => (
              <div key={item.field}>
                <p className="bw-bubble bw-bubble--bot">{item.question}</p>
                {record[item.field] ? (
                  <p className="bw-bubble bw-bubble--user">{record[item.field]}</p>
                ) : null}
                {index === step && !record[item.field] ? (
                  <div className="bw-choices">
                    {item.options.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setRecord((current) => ({
                            ...current,
                            [item.field]: option
                          }));
                          setStep(index + 1);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            {step >= chatSteps.length ? (
              <div>
                <p className="bw-bubble bw-bubble--bot">
                  {done
                    ? "Thanks. You'll get a confirmation email now, and a person will reply soon."
                    : "Last thing: where should we send the details?"}
                </p>
                {asksEmail ? (
                  <div className="bw-chat-email">
                    <input
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Your email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") submitEmail();
                      }}
                    />
                    <button type="button" onClick={submitEmail}>
                      Send
                    </button>
                    <button
                      type="button"
                      className="bw-ghost"
                      onClick={() => setDone(true)}
                    >
                      Skip: talk to a person
                    </button>
                    {emailError ? <small role="alert">{emailError}</small> : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="bw-record">
          <span className="bw-record-title">Lead record (synced to CRM)</span>
          <dl>
            {(["need", "budget", "timeline", "email"] as const).map((field) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>{record[field] ?? "—"}</dd>
              </div>
            ))}
          </dl>
          {done ? (
            <div className="bw-verdict bw-verdict--good">
              <strong>
                {route.label} lead · score {score}
              </strong>
              <p>{route.action}</p>
            </div>
          ) : (
            <p className="bw-muted">Answer the chat to see how it&apos;s scored and routed.</p>
          )}
          {step > 0 ? (
            <button type="button" className="bw-ghost" onClick={reset}>
              Start over
            </button>
          ) : null}
        </div>
      </div>
    </Widget>
  );
}

/* ---------- 7. document Q&A demo ---------- */

const handbook = [
  {
    page: 1,
    heading: "Annual leave",
    text: "Full-time employees receive 24 days of paid leave per year. Up to 5 unused days carry over into the next year."
  },
  {
    page: 2,
    heading: "Expenses",
    text: "Purchases under 5,000 can be approved by your manager. Anything above 5,000 needs finance approval before you buy. Submit receipts within 30 days."
  },
  {
    page: 3,
    heading: "Remote work",
    text: "Team members may work remotely up to 3 days a week. Core hours are 11:00 to 16:00 in your local time."
  },
  {
    page: 4,
    heading: "Device security",
    text: "Use the company password manager. Report a lost laptop or phone within 24 hours to the IT help desk."
  }
];

const docQuestions: {
  q: string;
  matches: { page: number; score: number }[];
  answer: string | null;
  cite: number | null;
}[] = [
  {
    q: "How many days of leave do I get?",
    matches: [
      { page: 1, score: 0.92 },
      { page: 3, score: 0.31 },
      { page: 2, score: 0.12 }
    ],
    answer: "You get 24 days of paid leave per year, and up to 5 unused days can carry over.",
    cite: 1
  },
  {
    q: "Do I need approval to buy an 8,000 monitor?",
    matches: [
      { page: 2, score: 0.88 },
      { page: 4, score: 0.27 },
      { page: 1, score: 0.1 }
    ],
    answer: "Yes. Purchases above 5,000 need finance approval before you buy.",
    cite: 2
  },
  {
    q: "How many days can I work from home?",
    matches: [
      { page: 3, score: 0.9 },
      { page: 1, score: 0.22 },
      { page: 4, score: 0.14 }
    ],
    answer: "Up to 3 days a week, with core hours from 11:00 to 16:00 in your local time.",
    cite: 3
  },
  {
    q: "What is the notice period if I resign?",
    matches: [
      { page: 1, score: 0.18 },
      { page: 3, score: 0.15 },
      { page: 2, score: 0.11 }
    ],
    answer: null,
    cite: null
  }
];

function DocQaDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : docQuestions[selected];

  return (
    <Widget
      title="Ask the handbook"
      note="Made-up handbook and scripted answers, to illustrate the three steps of retrieval-based AI search."
    >
      <div className="bw-choices">
        {docQuestions.map((item, index) => (
          <button
            key={item.q}
            type="button"
            aria-pressed={selected === index}
            className={selected === index ? "is-active" : undefined}
            onClick={() => setSelected(index)}
          >
            {item.q}
          </button>
        ))}
      </div>

      <div className="bw-split bw-split--docs">
        <div className="bw-pages">
          {handbook.map((page) => {
            const match = current?.matches.find((item) => item.page === page.page);
            const cited = current?.cite === page.page;

            return (
              <article
                key={page.page}
                className={`bw-page${cited ? " is-cited" : ""}${match ? " is-matched" : ""}`}
              >
                <header>
                  <span>Page {page.page}</span>
                  {match ? <em>match {Math.round(match.score * 100)}%</em> : null}
                </header>
                <h4>{page.heading}</h4>
                <p>{page.text}</p>
              </article>
            );
          })}
        </div>

        <ol className="bw-steps" aria-live="polite">
          <li className={current ? "is-done" : undefined}>
            <b>1. Search</b>
            <span>
              {current
                ? "Finds the pages closest in meaning to the question (highlighted)."
                : "Pick a question above."}
            </span>
          </li>
          <li className={current ? "is-done" : undefined}>
            <b>2. Read</b>
            <span>
              {current
                ? current.answer
                  ? "Reads only the best-matching pages."
                  : "No page is a strong match."
                : "…"}
            </span>
          </li>
          <li className={current ? "is-done" : undefined}>
            <b>3. Answer</b>
            {current ? (
              current.answer ? (
                <span>
                  {current.answer} <mark>[page {current.cite}]</mark>
                </span>
              ) : (
                <span>
                  I couldn&apos;t find that in the documents. Please ask HR. <mark>[no source]</mark>
                </span>
              )
            ) : (
              <span>…</span>
            )}
          </li>
        </ol>
      </div>
    </Widget>
  );
}

/* ---------- 8. spreadsheet checker ---------- */

const spreadsheetSigns = [
  { text: "More than one person edits it at the same time.", weight: 1 },
  { text: "We have files called 'final', 'final_v2' or 'final_USE_THIS'.", weight: 1 },
  { text: "People copy and paste between several sheets every week.", weight: 1 },
  { text: "Some formulas are so fragile nobody dares touch them.", weight: 1 },
  { text: "Different people should see different parts, but can't.", weight: 1 },
  { text: "The process relies on one person remembering to do something.", weight: 1 },
  { text: "A mistake in it has cost us real money or a client.", weight: 2 },
  { text: "It's slow, or crashes, or takes a minute to open.", weight: 1 }
];

function SpreadsheetChecker() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    spreadsheetSigns.map(() => false)
  );

  const score = spreadsheetSigns.reduce(
    (sum, sign, index) => sum + (checked[index] ? sign.weight : 0),
    0
  );

  const verdict =
    score <= 2
      ? {
          tone: "low",
          title: "Keep the spreadsheet",
          text: "It's working. Tidy it up (one row per item, dropdowns for fixed values) and spend your money elsewhere."
        }
      : score <= 4
        ? {
            tone: "mid",
            title: "Add structure and a little automation",
            text: "Put a form in front of it and automate the copy-paste. That removes most of the pain for a fraction of the cost of a new system."
          }
        : {
            tone: "good",
            title: "Time for a proper tool",
            text: "The sheet has become your system. A database with a simple interface, permissions and history will pay for itself. Start from the columns you already use."
          };

  return (
    <Widget title="Has your spreadsheet outgrown itself?">
      <ul className="bw-checks">
        {spreadsheetSigns.map((sign, index) => (
          <li key={sign.text}>
            <label>
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() =>
                  setChecked((current) =>
                    current.map((value, position) =>
                      position === index ? !value : value
                    )
                  )
                }
              />
              <span>{sign.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <div className={`bw-verdict bw-verdict--${verdict.tone}`} aria-live="polite">
        <strong>{verdict.title}</strong>
        <p>{verdict.text}</p>
        <p className="bw-muted">Warning-sign score: {score}</p>
      </div>
    </Widget>
  );
}

/* ---------- 9. brief builder ---------- */

const briefFields = [
  { key: "name", label: "Project name", placeholder: "e.g. Faster lead follow-up", long: false },
  { key: "problem", label: "The problem today", placeholder: "What's going wrong, in one or two sentences?", long: true },
  { key: "users", label: "Who will use it", placeholder: "You, your team, customers? How many?", long: false },
  { key: "success", label: "What success looks like", placeholder: "A number if you can: 'reply to every enquiry in under 5 minutes'", long: true },
  { key: "must", label: "Must-have", placeholder: "Up to three things, one per line", long: true },
  { key: "nice", label: "Nice-to-have", placeholder: "One per line", long: true },
  { key: "later", label: "Not now", placeholder: "Things to leave out of the first version", long: true },
  { key: "tools", label: "Tools and data you already use", placeholder: "e.g. Google Sheets, Zoho CRM, WordPress", long: false },
  { key: "budget", label: "Budget range", placeholder: "An honest range helps", long: false },
  { key: "deadline", label: "Deadline", placeholder: "A date, or 'flexible'", long: false }
] as const;

type BriefKey = (typeof briefFields)[number]["key"];

function BriefBuilder() {
  const [values, setValues] = useState<Record<BriefKey, string>>({
    name: "",
    problem: "",
    users: "",
    success: "",
    must: "",
    nice: "",
    later: "",
    tools: "",
    budget: "",
    deadline: ""
  });
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const filled = briefFields.filter((field) => values[field.key].trim()).length;
  const missing = briefFields.filter((field) => !values[field.key].trim());

  const text = [
    `PROJECT BRIEF: ${values.name.trim() || "(untitled)"}`,
    "",
    ...briefFields
      .filter((field) => field.key !== "name")
      .map(
        (field) =>
          `${field.label.toUpperCase()}\n${values[field.key].trim() || "(to discuss)"}\n`
      )
  ].join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied("done");
    } catch {
      setCopied("failed");
    }

    window.setTimeout(() => setCopied("idle"), 2500);
  };

  return (
    <Widget title="One-page brief builder" note="Nothing you type leaves your browser.">
      <div className="bw-form">
        {briefFields.map((field) => (
          <div className="bw-field" key={field.key}>
            <label htmlFor={`brief-${field.key}`}>{field.label}</label>
            {field.long ? (
              <textarea
                id={`brief-${field.key}`}
                rows={3}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value
                  }))
                }
              />
            ) : (
              <input
                id={`brief-${field.key}`}
                type="text"
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value
                  }))
                }
              />
            )}
          </div>
        ))}
      </div>

      <div className="bw-meter" aria-hidden="true">
        <i style={{ width: `${(filled / briefFields.length) * 100}%` }} />
      </div>
      <p className="bw-hint" aria-live="polite">
        {filled} of {briefFields.length} sections filled
        {missing.length > 0 && filled > 0
          ? `. Still open: ${missing
              .slice(0, 3)
              .map((field) => field.label.toLowerCase())
              .join(", ")}${missing.length > 3 ? "…" : ""}`
          : ""}
      </p>

      <pre className="bw-preview">{text}</pre>

      <button type="button" className="bw-button" onClick={copy}>
        {copied === "done"
          ? "Copied ✓"
          : copied === "failed"
            ? "Couldn't copy: select the text above"
            : "Copy brief"}
      </button>
    </Widget>
  );
}

/* ---------- 10. automation payback ---------- */

function AutomationPayback() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [hours, setHours] = useState(2);
  const [hourly, setHourly] = useState(1500);
  const [saved, setSaved] = useState(80);
  const [build, setBuild] = useState(40000);
  const [running, setRunning] = useState(500);

  const monthlyHoursSaved = ((hours * 52) / 12) * (saved / 100);
  const monthlySaving = monthlyHoursSaved * hourly - running;
  const paybackMonths = monthlySaving > 0 ? build / monthlySaving : null;
  const yearNet = monthlySaving * 12 - build;

  return (
    <Widget
      title="Automation payback calculator"
      note="Simple maths on your own inputs. Real builds also need occasional maintenance."
    >
      <div className="bw-grid">
        <CurrencySelect value={currency} onChange={setCurrency} />
        <NumberField
          label="Hours / week the report takes"
          value={hours}
          onChange={setHours}
          step={0.5}
        />
        <NumberField label="Value of an hour" value={hourly} onChange={setHourly} step={100} />
        <NumberField label="One-time build cost" value={build} onChange={setBuild} step={5000} />
        <NumberField
          label="Running cost / month (tools)"
          value={running}
          onChange={setRunning}
          step={100}
        />
      </div>

      <SliderField
        label="Share of the work automated"
        value={saved}
        onChange={setSaved}
        min={20}
        max={100}
        step={5}
        display={`${saved}%`}
      />

      <div className="bw-stats">
        <Stat label="Hours back / month" value={formatNumber(monthlyHoursSaved, 1)} />
        <Stat
          label="Net saving / month"
          value={formatMoney(monthlySaving, currency)}
          tone={monthlySaving > 0 ? "good" : "alert"}
        />
        <Stat
          label="Pays back in"
          value={
            paybackMonths === null
              ? "Never at these numbers"
              : paybackMonths < 1
                ? "Under a month"
                : `${formatNumber(paybackMonths, 1)} months`
          }
          tone={paybackMonths === null ? "alert" : "good"}
        />
        <Stat
          label="First-year net"
          value={formatMoney(yearNet, currency)}
          tone={yearNet >= 0 ? "good" : "alert"}
        />
      </div>
    </Widget>
  );
}

/* ---------- 11. speed cost ---------- */

function SpeedCost() {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [loadTime, setLoadTime] = useState(5);
  const [visitors, setVisitors] = useState(3000);
  const [conversion, setConversion] = useState(1.5);
  const [value, setValue] = useState(20000);
  const [loss, setLoss] = useState(5);

  const target = 2;
  const extra = Math.max(0, loadTime - target);
  const factor = Math.pow(1 - loss / 100, extra);
  const conversionAtTarget = factor > 0 ? conversion / factor : conversion;
  const extraLeads = visitors * ((conversionAtTarget - conversion) / 100);
  const extraValue = extraLeads * value;

  return (
    <Widget
      title="What a slow page might cost you"
      note="'Loss per extra second' is an assumption you set, not a measured fact. Real effects vary by industry and audience."
    >
      <div className="bw-grid">
        <CurrencySelect value={currency} onChange={setCurrency} />
        <NumberField
          label="Monthly visitors"
          value={visitors}
          onChange={setVisitors}
          step={100}
        />
        <NumberField
          label="Visitors who enquire or buy"
          value={conversion}
          onChange={setConversion}
          max={100}
          step={0.1}
          suffix="%"
        />
        <NumberField
          label="Value of one enquiry or sale"
          value={value}
          onChange={setValue}
          step={1000}
        />
      </div>

      <div className="bw-grid bw-grid--sliders">
        <SliderField
          label="Your page load time (mobile)"
          value={loadTime}
          onChange={setLoadTime}
          min={1}
          max={10}
          step={0.5}
          display={`${loadTime}s`}
        />
        <SliderField
          label="Assumed loss per extra second beyond 2s"
          value={loss}
          onChange={setLoss}
          min={0}
          max={15}
          display={`${loss}%`}
        />
      </div>

      <div className="bw-stats">
        <Stat
          label="Conversion at 2s"
          value={`${formatNumber(conversionAtTarget, 2)}%`}
        />
        <Stat label="Extra leads / month" value={formatNumber(extraLeads, 1)} tone="good" />
        <Stat
          label="Potential value / month"
          value={formatMoney(extraValue, currency)}
          tone={extraValue > 0 ? "alert" : undefined}
        />
      </div>

      {extra === 0 ? (
        <p className="bw-hint">At 2 seconds or under, there&apos;s nothing to gain here.</p>
      ) : null}
    </Widget>
  );
}

/* ---------- registry ---------- */

const blogWidgets: Record<WidgetName, ComponentType> = {
  "lead-leak-calculator": LeadLeakCalculator,
  "nurture-timeline": NurtureTimeline,
  "ai-fit-checker": AiFitChecker,
  "time-audit": TimeAudit,
  "build-buy-picker": BuildBuyPicker,
  "chatbot-demo": ChatbotDemo,
  "doc-qa-demo": DocQaDemo,
  "spreadsheet-checker": SpreadsheetChecker,
  "brief-builder": BriefBuilder,
  "automation-payback": AutomationPayback,
  "speed-cost": SpeedCost
};

export function BlogWidget({ name }: { name: WidgetName }) {
  const Component = blogWidgets[name];

  return <Component />;
}
