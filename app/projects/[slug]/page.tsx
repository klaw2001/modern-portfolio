import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({
  params
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  return {
    title: `${project.title} | Hrishikesh Netke`,
    description: project.description
  };
}

export default async function ProjectPage({
  params
}: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="case-study-page">
      <header className="case-study-nav">
        <Link href="/" className="brand-mark">
          HN<span>/</span>
        </Link>

        <Link href="/">← Back to systems</Link>
      </header>

      <section className="case-study-hero">
        <span className="eyebrow">
          {project.number} / {project.category}
        </span>

        <h1>{project.title}</h1>

        <p>{project.description}</p>

        <a
          className="button button--dark"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          Open product <span>↗</span>
        </a>
      </section>

      <section className="case-study-visual">
        <div className="case-study-visual-inner">
          <span>SYSTEM IN MOTION</span>
          <strong>{project.visual.toUpperCase()}</strong>
        </div>
      </section>

      <section className="case-study-content">
        <div>
          <span className="eyebrow">01 / THE CHALLENGE</span>
          <h2>Starting with the problem.</h2>
          <p>{project.challenge}</p>
        </div>

        <div>
          <span className="eyebrow">02 / THE APPROACH</span>
          <h2>Turning complexity into flow.</h2>
          <p>{project.approach}</p>
        </div>

        <div>
          <span className="eyebrow">03 / THE RESULT</span>
          <h2>Useful systems, shipped.</h2>
          <p>{project.result}</p>
        </div>
      </section>

      <section className="case-study-stack">
        <span className="eyebrow">TECHNOLOGY</span>

        <div>
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <footer className="case-study-footer">
        <Link href="/#work">View more projects →</Link>
        <Link href="/#contact">Start a conversation →</Link>
      </footer>
    </main>
  );
}
