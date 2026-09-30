"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  blueprints,
  experience,
  projects,
  reputation,
  skills,
  websites,
  workflow,
  type AppNodeId,
  type BlueprintView,
  type Tool,
  type Website,
  type WebNodeId
} from "@/lib/content";
import { toolIcons } from "@/lib/tool-icons";

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

function HeroTrust() {
  return (
    <aside className="hero-trust" data-fade aria-label="Reviews and clients">
      <a
        className="trust-rating"
        href={reputation.reviewsUrl}
        target="_blank"
        rel="noreferrer"
      >
        <strong>{reputation.rating}</strong>

        <span className="trust-rating-meta">
          <span className="trust-stars" aria-label="5 out of 5 stars">
            {[0, 1, 2, 3, 4].map((index) => (
              <i
                key={index}
                style={{ "--i": index } as CSSProperties}
                aria-hidden="true"
              >
                ★
              </i>
            ))}
          </span>
          <small>
            Google reviews <span>↗</span>
          </small>
        </span>
      </a>

      <div className="trust-clients">
        <small>Clients across</small>

        <ul>
          {reputation.clientLocations.map((location, index) => (
            <li key={location} style={{ "--i": index } as CSSProperties}>
              {location}
            </li>
          ))}
        </ul>
      </div>
    </aside>
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

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia(REDUCED_MOTION);

  media.addEventListener("change", callback);

  return () => media.removeEventListener("change", callback);
}

function ToolGlyph({ tool, className }: { tool: Tool; className: string }) {
  const icon = toolIcons[tool];

  return (
    <svg
      className={className}
      viewBox={icon.viewBox}
      aria-hidden="true"
      {...(icon.stroke
        ? {
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1.75,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        : {
            fill: "currentColor",
            fillRule: icon.evenOdd ? "evenodd" : undefined
          })}
    >
      {icon.paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}

type Point = [x: number, y: number];

type BlueprintLayout<Id extends string> = {
  width: number;
  height: number;
  user: Point;
  nodes: Record<Id, Point>;
  edges: {
    from: Id | "user";
    to: Id;
    path: string;
    /** Drawn dashed: the part runs on what it connects to. */
    hosted?: boolean;
    /** Share of each loop when the signal runs along this wire. */
    signal?: [start: number, end: number];
  }[];
};

type BlueprintShape = "wide" | "tall";

const SIGNAL_LOOP = 5200;

// Each view is drawn twice: wide beside the detail panel, tall on phones.
// Both views share one canvas size so the monitor never resizes on a tab change.
const APP_LAYOUT = {
  wide: {
    width: 920,
    height: 500,
    user: [70, 110],
    nodes: {
      interface: [260, 110],
      api: [500, 110],
      ai: [790, 110],
      data: [500, 270],
      services: [790, 270],
      deploy: [500, 410]
    },
    edges: [
      {
        from: "user",
        to: "interface",
        path: "M70 110 H260",
        signal: [0.02, 0.16]
      },
      {
        from: "interface",
        to: "api",
        path: "M260 110 H500",
        signal: [0.16, 0.32]
      },
      { from: "api", to: "ai", path: "M500 110 H790", signal: [0.32, 0.54] },
      { from: "api", to: "data", path: "M500 110 V270", signal: [0.32, 0.46] },
      {
        from: "api",
        to: "services",
        path: "M500 110 V190 H790 V270",
        signal: [0.32, 0.58]
      },
      { from: "interface", to: "deploy", path: "M260 110 V410", hosted: true },
      { from: "data", to: "deploy", path: "M500 270 V410", hosted: true },
      { from: "services", to: "deploy", path: "M790 270 V410", hosted: true },
      { from: "deploy", to: "deploy", path: "M150 410 H850", hosted: true }
    ]
  },
  tall: {
    width: 400,
    height: 720,
    user: [200, 40],
    nodes: {
      interface: [200, 150],
      api: [200, 270],
      ai: [95, 400],
      services: [305, 400],
      data: [200, 530],
      deploy: [200, 650]
    },
    edges: [
      {
        from: "user",
        to: "interface",
        path: "M200 40 V150",
        signal: [0.02, 0.16]
      },
      {
        from: "interface",
        to: "api",
        path: "M200 150 V270",
        signal: [0.16, 0.32]
      },
      {
        from: "api",
        to: "ai",
        path: "M200 270 V335 H95 V400",
        signal: [0.32, 0.54]
      },
      {
        from: "api",
        to: "services",
        path: "M200 270 V335 H305 V400",
        signal: [0.32, 0.54]
      },
      { from: "api", to: "data", path: "M200 270 V530", signal: [0.32, 0.52] },
      { from: "data", to: "deploy", path: "M200 530 V650", hosted: true },
      { from: "deploy", to: "deploy", path: "M90 650 H310", hosted: true }
    ]
  }
} satisfies Record<BlueprintShape, BlueprintLayout<AppNodeId>>;

// The brief runs goal → structure → design → build, then out to SEO; the built
// site and its SEO output are what Vercel hosts.
const WEB_LAYOUT = {
  wide: {
    width: 920,
    height: 500,
    user: [70, 110],
    nodes: {
      goal: [260, 110],
      structure: [500, 110],
      design: [790, 110],
      build: [790, 270],
      seo: [500, 270],
      launch: [500, 410]
    },
    edges: [
      {
        from: "user",
        to: "goal",
        path: "M70 110 H260",
        signal: [0.02, 0.14]
      },
      {
        from: "goal",
        to: "structure",
        path: "M260 110 H500",
        signal: [0.14, 0.28]
      },
      {
        from: "structure",
        to: "design",
        path: "M500 110 H790",
        signal: [0.28, 0.44]
      },
      {
        from: "design",
        to: "build",
        path: "M790 110 V270",
        signal: [0.44, 0.56]
      },
      {
        from: "build",
        to: "seo",
        path: "M790 270 H500",
        signal: [0.56, 0.72]
      },
      { from: "seo", to: "launch", path: "M500 270 V410", hosted: true },
      { from: "build", to: "launch", path: "M790 270 V410", hosted: true },
      { from: "launch", to: "launch", path: "M150 410 H850", hosted: true }
    ]
  },
  tall: {
    width: 400,
    height: 720,
    user: [200, 40],
    nodes: {
      goal: [200, 140],
      structure: [200, 235],
      design: [200, 330],
      build: [200, 425],
      seo: [95, 545],
      launch: [200, 660]
    },
    edges: [
      {
        from: "user",
        to: "goal",
        path: "M200 40 V140",
        signal: [0.02, 0.14]
      },
      {
        from: "goal",
        to: "structure",
        path: "M200 140 V235",
        signal: [0.14, 0.28]
      },
      {
        from: "structure",
        to: "design",
        path: "M200 235 V330",
        signal: [0.28, 0.42]
      },
      {
        from: "design",
        to: "build",
        path: "M200 330 V425",
        signal: [0.42, 0.56]
      },
      {
        from: "build",
        to: "seo",
        path: "M200 425 V485 H95 V545",
        signal: [0.56, 0.72]
      },
      { from: "seo", to: "launch", path: "M95 545 V600 H200", hosted: true },
      { from: "build", to: "launch", path: "M200 425 V660", hosted: true },
      { from: "launch", to: "launch", path: "M90 660 H310", hosted: true }
    ]
  }
} satisfies Record<BlueprintShape, BlueprintLayout<WebNodeId>>;

const BLUEPRINT_LAYOUTS: Record<
  BlueprintView,
  Record<BlueprintShape, BlueprintLayout<string>>
> = { app: APP_LAYOUT, web: WEB_LAYOUT };

const BLUEPRINT_VIEWS = Object.keys(blueprints) as BlueprintView[];

function BlueprintWires({
  layout,
  shape,
  active,
  motion
}: {
  layout: BlueprintLayout<string>;
  shape: BlueprintShape;
  active: string;
  motion: boolean;
}) {
  const isLit = (edge: BlueprintLayout<string>["edges"][number]) =>
    edge.from === active || edge.to === active;

  // Lit wires draw last so a shared segment shows the accent.
  const edges = [...layout.edges].sort(
    (a, b) => Number(isLit(a)) - Number(isLit(b))
  );

  return (
    <svg
      className={`blueprint-wires blueprint-wires--${shape}`}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      aria-hidden="true"
    >
      {edges.map((edge) => (
        <path
          key={edge.path}
          d={edge.path}
          vectorEffect="non-scaling-stroke"
          className={[edge.hosted && "is-hosted", isLit(edge) && "is-lit"]
            .filter(Boolean)
            .join(" ")}
        />
      ))}

      {motion &&
        layout.edges.map(
          ({ path, signal }) =>
            signal && (
              <circle key={path} className="blueprint-signal" r={4}>
                <animateMotion
                  path={path}
                  dur={`${SIGNAL_LOOP}ms`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyPoints="0;0;1;1"
                  keyTimes={`0;${signal[0]};${signal[1]};1`}
                />
                <animate
                  attributeName="opacity"
                  dur={`${SIGNAL_LOOP}ms`}
                  repeatCount="indefinite"
                  calcMode="discrete"
                  values="0;1;0"
                  keyTimes={`0;${signal[0]};${signal[1]}`}
                />
              </circle>
            )
        )}
    </svg>
  );
}

function BlueprintTag({ tag }: { tag: string }) {
  return (
    <li>
      {Object.hasOwn(toolIcons, tag) ? (
        <ToolGlyph tool={tag as Tool} className="blueprint-tool-icon" />
      ) : (
        <i className="blueprint-tag-dot" aria-hidden="true" />
      )}
      {tag}
    </li>
  );
}

function SystemBlueprint() {
  const [view, setView] = useState<BlueprintView>("app");
  // Each view remembers the part you left it on.
  const [selected, setSelected] = useState<Record<BlueprintView, string>>({
    app: blueprints.app.start,
    web: blueprints.web.start
  });
  const motion = useSyncExternalStore(
    subscribeReducedMotion,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const { nodes, title, flow, hosted } = blueprints[view];
  const { wide, tall } = BLUEPRINT_LAYOUTS[view];
  const active = selected[view];
  const current = nodes.find((node) => node.id === active)!;

  const select = (id: string) =>
    setSelected((state) => ({ ...state, [view]: id }));

  // Arrow keys move between tabs, as in any tab list.
  const onTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const last = BLUEPRINT_VIEWS.length - 1;
    const index = BLUEPRINT_VIEWS.indexOf(view);
    const moves: Record<string, number> = {
      ArrowRight: Math.min(index + 1, last),
      ArrowLeft: Math.max(index - 1, 0),
      Home: 0,
      End: last
    };
    const next = moves[event.key];

    if (next === undefined) return;

    event.preventDefault();
    setView(BLUEPRINT_VIEWS[next]);
    document.getElementById(`blueprint-tab-${BLUEPRINT_VIEWS[next]}`)?.focus();
  };

  // One set of nodes serves both drawings; CSS picks the coordinates.
  const place = (wideAt: Point, tallAt: Point) =>
    ({
      "--x": `${(wideAt[0] / wide.width) * 100}%`,
      "--y": `${(wideAt[1] / wide.height) * 100}%`,
      "--tx": `${(tallAt[0] / tall.width) * 100}%`,
      "--ty": `${(tallAt[1] / tall.height) * 100}%`
    }) as CSSProperties;

  return (
    <div className="blueprint">
      <div className="monitor-topbar">
        <span>{title}</span>
        <span>SELECT A PART</span>
      </div>

      <div className="blueprint-tabs">
        <div className="blueprint-tablist" role="tablist" aria-label="Blueprint">
          {BLUEPRINT_VIEWS.map((id) => (
            <button
              key={id}
              id={`blueprint-tab-${id}`}
              type="button"
              role="tab"
              className="blueprint-tab"
              aria-selected={id === view}
              aria-controls="blueprint-view"
              tabIndex={id === view ? 0 : -1}
              onClick={() => setView(id)}
              onKeyDown={onTabKeyDown}
            >
              <i aria-hidden="true" />
              {blueprints[id].tab}
            </button>
          ))}
        </div>

        <span className="blueprint-note">{blueprints[view].note}</span>
      </div>

      <div
        className="blueprint-body"
        id="blueprint-view"
        role="tabpanel"
        aria-labelledby={`blueprint-tab-${view}`}
      >
        <div className="blueprint-stage">
          <div
            key={view}
            className="blueprint-map"
            role="group"
            aria-label={
              view === "app" ? "Parts of a system" : "Parts of a website"
            }
            style={
              {
                "--wide-ratio": `${wide.width} / ${wide.height}`,
                "--tall-ratio": `${tall.width} / ${tall.height}`
              } as CSSProperties
            }
          >
            <BlueprintWires
              layout={wide}
              shape="wide"
              active={active}
              motion={motion}
            />
            <BlueprintWires
              layout={tall}
              shape="tall"
              active={active}
              motion={motion}
            />

            <span
              className="blueprint-user"
              style={place(wide.user, tall.user)}
            >
              <span>{flow}</span>
            </span>

            {nodes.map((node) => (
              <button
                key={node.id}
                type="button"
                className={`blueprint-node ${node.id === active ? "is-active" : ""}`}
                style={place(wide.nodes[node.id], tall.nodes[node.id])}
                aria-pressed={node.id === active}
                onClick={() => select(node.id)}
                onFocus={() => select(node.id)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") select(node.id);
                }}
              >
                <span>{node.number}</span>
                {node.name}
              </button>
            ))}
          </div>
        </div>

        <div className="blueprint-detail" aria-live="polite">
          {/* Every panel of every view stays mounted in one grid cell so the
              monitor keeps the tallest panel's height instead of jumping
              between parts or tabs. */}
          {BLUEPRINT_VIEWS.flatMap((id) =>
            blueprints[id].nodes.map((node) => {
              const shown = id === view && node.id === active;

              return (
                <div
                  key={node.id}
                  className={`blueprint-panel ${shown ? "is-active" : ""}`}
                  aria-hidden={!shown}
                >
                  <span className="eyebrow">
                    {node.number} / {node.name}
                  </span>
                  <strong>{node.title}</strong>
                  <p>{node.description}</p>

                  <ul className="blueprint-tools">
                    {node.tags.map((tag) => (
                      <BlueprintTag key={tag} tag={tag} />
                    ))}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="monitor-bottom">
        <div className="blueprint-legend" aria-hidden="true">
          <span>
            <i />
            {flow}
          </span>
          <span>
            <i className="is-hosted" />
            {hosted}
          </span>
        </div>

        <span>
          {current.number} / {String(nodes.length).padStart(2, "0")}
        </span>
      </div>
    </div>
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

      const steps = gsap.utils.toArray<HTMLElement>(".workflow li");
      let signalLoop: gsap.core.Timeline | undefined;

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: ".workflow",
          start: "top 80%",
          once: true
        },
        onComplete: () => {
          // A signal runs along each step in turn once everything is in.
          signalLoop = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });

          steps.forEach((step) => {
            signalLoop!
              .to(step.querySelector(".workflow-dot"), {
                scale: 1.9,
                duration: 0.25,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut"
              })
              .fromTo(
                step.querySelector(".workflow-signal"),
                { scaleX: 0, opacity: 1 },
                { scaleX: 1, duration: 0.9, ease: "power1.inOut" },
                "<"
              );
          });

          signalLoop.to(".workflow-signal", { opacity: 0, duration: 0.6 });
        }
      });

      reveal.from(".workflow-heading", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      });

      // Each dot pops as the previous line finishes drawing.
      steps.forEach((step, index) => {
        reveal
          .from(
            step.querySelector(".workflow-dot"),
            { scale: 0, duration: 0.35, ease: "back.out(3)" },
            0.35 + index * 0.7
          )
          .from(
            step.querySelector(".workflow-line"),
            { scaleX: 0, duration: 0.7, ease: "power2.inOut" },
            "<"
          )
          .from(
            step.querySelectorAll(".workflow-meta, h3, p, .workflow-output"),
            {
              opacity: 0,
              y: 18,
              duration: 0.6,
              stagger: 0.07,
              ease: "power3.out"
            },
            "<0.15"
          );
      });

      ScrollTrigger.create({
        trigger: ".workflow",
        onToggle: (self) =>
          self.isActive ? signalLoop?.resume() : signalLoop?.pause()
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
              <span className="hero-line">BUILDING</span>
              <span className="hero-line">PRODUCTS</span>
              <span className="hero-line">FROM IDEA</span>
              <span className="hero-line hero-line--accent">
                TO PRODUCTION.
              </span>
            </h1>

            <div className="hero-bottom">
              <p data-fade>
                Full stack developer building AI, data, automation, and SaaS
                products end to end.
              </p>

              <HeroTrust />

              <div className="hero-actions" data-fade>
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

          <div className="workflow-heading">
            <span>HOW I WORK</span>
            <span>IDEA → PRODUCTION</span>
          </div>

          <ol className="workflow">
            {workflow.map((step) => (
              <li key={step.number}>
                <span className="workflow-line" aria-hidden="true">
                  <b className="workflow-signal" />
                </span>
                <span className="workflow-dot" aria-hidden="true" />
                <div className="workflow-meta">
                  <span>{step.number}</span>
                  <span>{step.phase}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className="workflow-output">→ {step.output}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="feature-section">
          <SectionLabel index="02">Anatomy of a system</SectionLabel>

          <div className="feature-monitor">
            <SystemBlueprint />
          </div>

          <div className="feature-caption">
            <span>SYSTEM BLUEPRINT / HOW I BUILD</span>
            <a href="#stack">FULL CAPABILITY MAP ↘</a>
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

        {/* Selected work is on hold while the case studies are rebuilt.
            Restore this section and remove the maintenance version below
            when they are ready.

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
        */}

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

          <div className="maintenance-card" data-reveal>
            <div className="maintenance-status">
              <span>
                <i aria-hidden="true" />
                Under maintenance
              </span>
              <span>Case studies / Rebuilding</span>
            </div>

            <div className="maintenance-body">
              <h3>
                Case studies are
                <br />
                <em>being rebuilt.</em>
              </h3>
              <p>
                The project write-ups are getting fresh screenshots,
                architecture notes, and results. The client websites above
                are live in the meantime, and I am happy to walk through any
                project on a call.
              </p>
            </div>

            <div className="maintenance-actions">
              <a className="button button--light" href="#websites">
                See client websites <span>↑</span>
              </a>
              <a className="text-link" href="mailto:work@hrishikeshnetke.in">
                Ask for a walkthrough <span>↗</span>
              </a>
            </div>

            <span className="maintenance-progress" aria-hidden="true">
              <b />
            </span>
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

              {/* Keyed by category so the tiles replay their entrance on
                  every tab switch. */}
              <ul className="skill-grid" key={activeSkill}>
                {skills[activeSkill].map((skill, index) => {
                  const icon = toolIcons[skill];

                  return (
                    <li
                      key={skill}
                      className="skill-tile"
                      style={
                        {
                          "--i": index,
                          "--brand": icon.color
                        } as CSSProperties
                      }
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <ToolGlyph tool={skill} className="skill-icon" />
                      <strong>{skill}</strong>
                    </li>
                  );
                })}
              </ul>
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
