"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  experience,
  featuredProjects,
  projects,
  reputation,
  skills,
  websites,
  type Website
} from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

type SkillCategory = keyof typeof skills;

function SystemCanvas({
  size = 1,
  particleCount = 52
}: {
  size?: number;
  particleCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const pointer = {
      x: 0.5,
      y: 0.5
    };

    const particles = Array.from({ length: particleCount }, (_, index) => ({
      angle: (index / particleCount) * Math.PI * 2,
      radius: 0.2 + Math.random() * 0.34,
      speed: 0.00015 + Math.random() * 0.00025,
      size: 1 + Math.random() * 2
    }));

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      const centerX = width * (0.5 + (pointer.x - 0.5) * 0.1);
      const centerY = height * (0.5 + (pointer.y - 0.5) * 0.1);
      const scale = Math.min(width, height) * size;

      context.save();
      context.translate(centerX, centerY);
      context.rotate((pointer.x - 0.5) * 0.2);

      for (let orbit = 0; orbit < 4; orbit++) {
        context.beginPath();
        context.ellipse(
          0,
          0,
          scale * (0.18 + orbit * 0.1),
          scale * (0.07 + orbit * 0.045),
          orbit * 0.45,
          0,
          Math.PI * 2
        );

        context.strokeStyle = `rgba(183, 57, 35, ${0.22 - orbit * 0.035})`;
        context.lineWidth = 1;
        context.stroke();
      }

      particles.forEach((particle, index) => {
        const angle =
          particle.angle + time * particle.speed + index * 0.00001;

        const radius = scale * particle.radius;
        const x = Math.cos(angle) * radius;
        const y =
          Math.sin(angle) *
          radius *
          (0.35 + Math.sin(time * 0.0002 + index) * 0.05);

        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fillStyle = "rgba(183, 57, 35, 0.72)";
        context.fill();

        if (index % 5 === 0) {
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x * 0.14, y * 0.14);
          context.strokeStyle = "rgba(183, 57, 35, 0.26)";
          context.stroke();
        }
      });

      context.restore();

      animationFrame = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX / window.innerWidth;
      pointer.y = event.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [size, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="system-canvas"
      aria-label="Animated system visualization"
    />
  );
}

function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const timeout = window.setTimeout(
      () => setVisible(false),
      reducedMotion ? 250 : 1200
    );

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`loader ${visible ? "" : "loader--hidden"}`}>
      <div>
        <p>HN / 2026</p>
        <p>INITIALIZING EXPERIENCE</p>
      </div>
      <span className="loader-line" />
    </div>
  );
}

function Nav() {
  return (
    <header className="site-nav">
      <Link href="/" className="brand-mark" aria-label="Home">
        HN<span>/</span>
      </Link>

      <nav aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#websites">Websites</a>
        <a href="#work">Work</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="nav-status" href="mailto:work@hrishikeshnetke.in">
        <span />
        Available for new projects
      </a>
    </header>
  );
}

function SectionLabel({
  index,
  children
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function ClientProof() {
  return (
    <div className="client-proof" data-reveal>
      <a
        className="proof-item"
        href={reputation.reviewsUrl}
        target="_blank"
        rel="noreferrer"
      >
        <strong>
          {reputation.rating}
          <span className="proof-stars" aria-hidden="true">
            ★★★★★
          </span>
        </strong>
        <small>
          Rated on Google <span>↗</span>
        </small>
      </a>

      <div className="proof-item">
        <strong>{reputation.clientLocations.join(" · ")}</strong>
        <small>Where my clients are</small>
      </div>

      <div className="proof-item">
        <strong>{String(websites.length).padStart(2, "0")}</strong>
        <small>Sites built and live</small>
      </div>
    </div>
  );
}

function ProjectVisual({ type }: { type: string }) {
  return (
    <div className={`project-visual project-visual--${type}`}>
      <div className="visual-grid" />

      {type === "conversation" && (
        <div className="visual-conversation">
          <span>What is your current growth challenge?</span>
          <strong>Lead quality and response time.</strong>
          <small>QUALIFYING / 04 OF 07</small>
        </div>
      )}

      {type === "document" && (
        <div className="visual-document">
          <div className="document-page">
            <span />
            <span />
            <span />
            <b>42.7%</b>
            <span />
            <span />
          </div>
          <div className="citation">PAGE 14 / SOURCE MATCH</div>
        </div>
      )}

      {type === "dial" && (
        <div className="visual-dial">
          <div>
            <small>EXPLANATION LEVEL</small>
            <strong>03</strong>
            <span>Clear and useful</span>
          </div>
        </div>
      )}

      {type === "pipeline" && (
        <div className="visual-pipeline">
          {["UPLOAD", "PARSE", "GENERATE", "DEPLOY"].map((item, index) => (
            <div key={item} className="pipeline-node">
              <i>{String(index + 1).padStart(2, "0")}</i>
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {!["conversation", "document", "dial", "pipeline"].includes(type) && (
        <div className="visual-generic">
          <span>{type.toUpperCase()}</span>
          <strong>ACTIVE SYSTEM</strong>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  featured = false
}: {
  project: (typeof projects)[number];
  featured?: boolean;
}) {
  return (
    <article className={`project-card ${featured ? "project-card--featured" : ""}`}>
      <ProjectVisual type={project.visual} />

      <div className="project-meta">
        <div>
          <span className="eyebrow">
            {project.number} / {project.category}
          </span>
          <span className="project-label">{project.label}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-actions">
          <Link href={`/projects/${project.slug}`}>View case study ↗</Link>
          <a href={project.url} target="_blank" rel="noreferrer">
            Open product ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function SiteMock({ website }: { website: Website }) {
  const { layout, name, sector } = website;

  return (
    <div className={`site-mock site-mock--${layout}`} aria-hidden="true">
      <div className="mock-nav">
        <span className="mock-logo">{name}</span>
        <span className="mock-links">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="mock-button" />
      </div>

      {layout === "storefront" && (
        <>
          <div className="mock-split">
            <div className="mock-stack">
              <span className="mock-kicker">{sector}</span>
              <strong className="mock-title">{name}</strong>
              <span className="mock-line mock-line--mid" />
              <span className="mock-line mock-line--short" />
              <span className="mock-button" />
            </div>
            <div className="mock-art">
              <span />
            </div>
          </div>

          <div className="mock-row mock-row--4">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="mock-stack">
                <span className="mock-tile" />
                <span className="mock-line mock-line--mid" />
                <span className="mock-line mock-line--short" />
              </div>
            ))}
          </div>
        </>
      )}

      {layout === "landing" && (
        <>
          <div className="mock-center">
            <span className="mock-kicker">{sector}</span>
            <strong className="mock-title">{name}</strong>
            <span className="mock-line mock-line--mid" />
            <span className="mock-buttons">
              <span className="mock-button" />
              <span className="mock-button mock-button--ghost" />
            </span>
          </div>

          <div className="mock-row mock-row--3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="mock-card">
                <span className="mock-icon" />
                <span className="mock-line mock-line--mid" />
                <span className="mock-line" />
                <span className="mock-line mock-line--short" />
              </div>
            ))}
          </div>
        </>
      )}

      {layout === "editorial" && (
        <>
          <div className="mock-masthead">
            <span className="mock-kicker">{sector}</span>
            <strong className="mock-title">{name}</strong>
          </div>

          <div className="mock-columns">
            <div className="mock-stack">
              <span className="mock-tile mock-tile--wide" />
              <span className="mock-line" />
              <span className="mock-line mock-line--mid" />
            </div>
            <div className="mock-stack">
              {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                <span
                  key={item}
                  className={`mock-line ${item % 3 === 2 ? "mock-line--short" : ""}`}
                />
              ))}
            </div>
            <div className="mock-stack">
              <span className="mock-tile" />
              <span className="mock-line" />
              <span className="mock-line mock-line--short" />
            </div>
          </div>
        </>
      )}

      {layout === "portfolio" && (
        <>
          <div className="mock-gallery-head">
            <strong className="mock-title">{name}</strong>
            <span className="mock-kicker">{sector}</span>
          </div>

          <div className="mock-gallery">
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className="mock-tile" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function WebsitesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(websites[0].domain.length);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const active = websites[activeIndex];

  // Keep the active tab visible when the tab strip scrolls on small screens.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelectorAll<HTMLElement>(".browser-tab")[activeIndex];

    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;

    strip.scrollTo({
      left: tab.offsetLeft - (strip.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth"
    });
  }, [activeIndex]);

  // Type the domain into the address bar one character at a time.
  useEffect(() => {
    if (typedLength >= websites[activeIndex].domain.length) return;

    const timeout = window.setTimeout(
      () => setTypedLength((length) => length + 1),
      32
    );

    return () => window.clearTimeout(timeout);
  }, [activeIndex, typedLength]);

  const select = (index: number) => {
    if (index === activeIndex) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setActiveIndex(index);
    setTypedLength(reducedMotion ? websites[index].domain.length : 0);
  };

  const handleRowClick = (index: number) => {
    select(index);

    // On small screens the browser sits above the list, so bring it into view.
    if (window.matchMedia("(max-width: 800px)").matches) {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      stageRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  };

  const handleRowPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
    index: number
  ) => {
    // In the stacked layout a click scrolls the list under the cursor, so
    // hovering would reselect whichever row passes by. Only click there.
    if (
      event.pointerType === "mouse" &&
      !window.matchMedia("(max-width: 800px)").matches
    ) {
      select(index);
    }
  };

  return (
    <div className="websites-layout" data-reveal>
      <ol className="site-index">
        {websites.map((website, index) => (
          <li key={website.slug}>
            <button
              type="button"
              className={`site-row ${index === activeIndex ? "is-active" : ""}`}
              aria-pressed={index === activeIndex}
              aria-controls="site-browser"
              onClick={() => handleRowClick(index)}
              onFocus={() => select(index)}
              onPointerEnter={(event) => handleRowPointer(event, index)}
            >
              <span className="site-row-place">{website.location}</span>
              <span className="site-row-name">
                {website.name}
                <small>
                  <span>{website.domain}</span>
                  <span>{website.sector}</span>
                </small>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="site-stage" ref={stageRef}>
        <div className="site-browser" id="site-browser">
          <div className="browser-tabs" ref={tabsRef}>
            <span className="browser-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>

            {websites.map((website, index) => (
              <button
                key={website.slug}
                type="button"
                className={`browser-tab ${index === activeIndex ? "is-active" : ""}`}
                aria-pressed={index === activeIndex}
                onClick={() => select(index)}
              >
                <i style={{ background: website.accent }} />
                <span>{website.name}</span>
              </button>
            ))}
          </div>

          <div className="browser-bar">
            <span className="browser-arrows" aria-hidden="true">
              ‹ ›
            </span>
            <span className="browser-url">
              <b>https://</b>
              {active.domain.slice(0, typedLength)}
              <i className="browser-caret" />
            </span>
            <span className="browser-progress" key={active.slug} />
          </div>

          <a
            className="browser-viewport"
            href={active.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${active.domain}`}
          >
            <div
              className="browser-page"
              key={active.slug}
              style={{ "--site-accent": active.accent } as CSSProperties}
            >
              {active.image ? (
                <Image
                  src={active.image}
                  alt=""
                  fill
                  sizes="(max-width: 800px) 100vw, 55vw"
                />
              ) : (
                <SiteMock website={active} />
              )}
            </div>
            <span className="browser-visit">Open {active.domain} ↗</span>
          </a>
        </div>

        <div className="site-details" aria-live="polite">
          <p>{active.summary}</p>

          <a
            className="site-visit"
            href={active.url}
            target="_blank"
            rel="noreferrer"
          >
            Visit {active.domain} <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Site() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeSkill, setActiveSkill] =
    useState<SkillCategory>("FRONTEND");

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 1.05
      });

      gsap.from("[data-fade]", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        delay: 1.4
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true
          }
        });
      });

      gsap.to(".feature-monitor", {
        scale: 1,
        borderRadius: "0px",
        scrollTrigger: {
          trigger: ".feature-section",
          start: "top 70%",
          end: "bottom 70%",
          scrub: true
        }
      });

      gsap.to(".hero-copy", {
        yPercent: -12,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, root);

    return () => context.revert();
  }, []);

  const handleSkillPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
    category: SkillCategory
  ) => {
    if (event.pointerType === "mouse") {
      setActiveSkill(category);
    }
  };

  const featureVideoUrl = process.env.NEXT_PUBLIC_FEATURE_VIDEO_URL;

  return (
    <>
      <Loader />

      <main ref={rootRef}>
        <Nav />

        <section className="hero" id="top">
          <SystemCanvas size={1.5} particleCount={120} />

          <div className="hero-copy">
            <p className="eyebrow" data-fade>
              Software Developer / Mumbai, India
            </p>

            <h1>
              <span className="hero-line">BUILDING PRODUCTS</span>
              <span className="hero-line">FROM IDEA</span>
              <span className="hero-line hero-line--accent">
                TO PRODUCTION.
              </span>
            </h1>

            <div className="hero-bottom" data-fade>
              <div className="hero-intro">
                <p>
                  Full stack developer building AI, data, automation, and SaaS
                  products end to end.
                </p>

                <a
                  className="hero-proof"
                  href={reputation.reviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span aria-hidden="true">★★★★★</span>
                  {reputation.rating} on Google · Clients in{" "}
                  {reputation.clientLocations.slice(0, -1).join(", ")} and{" "}
                  {reputation.clientLocations.at(-1)}
                </a>
              </div>

              <div className="hero-actions">
                <a className="button button--dark" href="#work">
                  Explore selected work <span>↘</span>
                </a>
                <a className="text-link" href="mailto:work@hrishikeshnetke.in">
                  Start a conversation <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-cue" data-fade>
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </section>

        <section className="statement-section">
          <SectionLabel index="01">The idea</SectionLabel>

          <h2 data-reveal>
            A PRODUCT IS
            <br />
            <em>A SYSTEM IN MOTION.</em>
          </h2>

          <p className="statement-description" data-reveal>
            I build the layer between complex systems and useful products,
            connecting interfaces, APIs, data, automation, and production
            infrastructure into experiences people can actually use.
          </p>
        </section>

        <section className="feature-section">
          <SectionLabel index="02">Featured system</SectionLabel>

          <div className="feature-monitor">
            {featureVideoUrl ? (
              <video
                src={featureVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              />
            ) : (
              <div className="monitor-fallback">
                <div className="monitor-topbar">
                  <span>PRODUCTION MONITOR</span>
                  <span>LIVE / 00:42:18</span>
                </div>

                <div className="monitor-body">
                  <div className="monitor-copy">
                    <span className="eyebrow">SYSTEM 04 / ACTIVE</span>
                    <strong>
                      Moving complex
                      <br />
                      ideas into
                      <br />
                      production.
                    </strong>
                  </div>

                  <SystemCanvas />
                </div>

                <div className="monitor-bottom">
                  <span>AI / DATA / AUTOMATION</span>
                  <span>01 / 04</span>
                </div>
              </div>
            )}
          </div>

          <div className="feature-caption">
            <span>PRODUCTION MONITOR / 2026</span>
            <span>VIEW SELECTED WORK ↘</span>
          </div>
        </section>

        <section className="about-section section-shell" id="about">
          <SectionLabel index="03">About the developer</SectionLabel>

          <div className="about-grid">
            <h2 data-reveal>
              I build the layer between
              <br />
              <em>complex systems</em> and useful products.
            </h2>

            <div className="about-copy" data-reveal>
              <p>
                Software Developer based in Mumbai, India, building full stack
                products end to end.
              </p>
              <p>
                My work spans AI platforms, data products, automation tools,
                dashboards, internal systems, and SaaS applications.
              </p>
              <p>
                From database design and API architecture to interface
                development, deployment, and production workflows, I like
                owning the entire system.
              </p>
            </div>
          </div>
        </section>

        <section className="experience-section section-shell">
          <SectionLabel index="04">Experience</SectionLabel>

          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-item" key={item.company}>
                <div className="timeline-index">
                  0{index + 1}
                  <span />
                </div>

                <div className="timeline-date">{item.dates}</div>

                <div className="timeline-main">
                  <h3>{item.company}</h3>
                  <span>{item.role}</span>
                  <p>{item.description}</p>

                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="websites-section section-shell" id="websites">
          <SectionLabel index="05">Client websites</SectionLabel>

          <div className="section-heading">
            <h2 data-reveal>
              Live on
              <br />
              <em>the open web.</em>
            </h2>
            <p data-reveal>
              Jewellery brands, a cybersecurity firm, an interior design
              studio, a study abroad platform and more, designed and built for
              clients around the world. Pick a site to preview it.
            </p>
          </div>

          <ClientProof />

          <WebsitesShowcase />
        </section>

        <section className="work-section section-shell" id="work">
          <SectionLabel index="06">Selected work</SectionLabel>

          <div className="section-heading">
            <h2 data-reveal>
              Products built
              <br />
              <em>end to end.</em>
            </h2>
            <p data-reveal>
              A selection of systems across AI, automation, data, internal
              tooling, and SaaS.
            </p>
          </div>

          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
          </div>

          <div className="archive-heading">
            <span>PROJECT ARCHIVE</span>
            <span>DRAG TO EXPLORE →</span>
          </div>

          <div className="archive-row">
            {projects
              .filter((project) => !project.featured)
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
          </div>
        </section>

        <section className="skills-section section-shell" id="stack">
          <SectionLabel index="07">Capability map</SectionLabel>

          <div className="skills-layout">
            <div className="skills-intro">
              <h2 data-reveal>
                The tools
                <br />
                behind the <em>system.</em>
              </h2>

              <p data-reveal>
                Carefully selected technologies for speed, scale, and useful
                production outcomes.
              </p>
            </div>

            <div className="skills-map" data-reveal>
              <div className="skill-tabs">
                {(Object.keys(skills) as SkillCategory[]).map((category) => (
                  <button
                    key={category}
                    className={activeSkill === category ? "is-active" : ""}
                    onClick={() => setActiveSkill(category)}
                    onPointerEnter={(event) =>
                      handleSkillPointer(event, category)
                    }
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="skill-list">
                {skills[activeSkill].map((skill, index) => (
                  <div key={skill} className="skill-item">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{skill}</strong>
                    <i>↗</i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <SystemCanvas />

          <div className="contact-inner section-shell">
            <SectionLabel index="08">Start something</SectionLabel>

            <h2 data-reveal>
              LET&apos;S BUILD
              <br />
              <em>SOMETHING USEFUL.</em>
            </h2>

            <p data-reveal>
              Available for new projects, consulting, or full time roles.
            </p>

            <div className="contact-actions" data-reveal>
              <a
                className="button button--light"
                href="mailto:work@hrishikeshnetke.in"
              >
                work@hrishikeshnetke.in <span>↗</span>
              </a>

              <div className="social-links">
                <a
                  href="https://github.com/hrishikeshnetke"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/hrishikesh-netke-b62b09231/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://x.com/netke2611"
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
                <a
                  href="https://www.instagram.com/ig_klaw/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <span>HN / 2026</span>
          <span>BUILDING FULL STACK PRODUCTS END TO END</span>
          <span>MUMBAI, INDIA</span>
        </footer>
      </main>
    </>
  );
}
