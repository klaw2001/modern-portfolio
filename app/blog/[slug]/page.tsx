import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog-body";
import { ReadingProgress, TableOfContents } from "@/components/blog-chrome";
import {
  formatPostDate,
  getAdjacentPosts,
  getHeadings,
  getPost,
  posts,
  readingMinutes
} from "@/lib/blog";
import { site } from "@/lib/content";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      siteName: site.name,
      locale: "en_IN",
      title: post.title,
      description: post.description,
      publishedTime: `${post.date}T00:00:00+05:30`,
      authors: [site.name]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: site.twitter
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const headings = getHeadings(post.blocks);
  const { newer, older } = getAdjacentPosts(post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: `${post.date}T00:00:00+05:30`,
    dateModified: `${post.date}T00:00:00+05:30`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url }
  };

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
        }}
      />

      <ReadingProgress />

      <header className="case-study-nav">
        <Link href="/" className="brand-mark" aria-label="Home">
          HN<span>/</span>
        </Link>

        <Link href="/blog">← All posts</Link>
      </header>

      <article>
        <header className="blog-article-hero">
          <span className="eyebrow">
            {post.category} / {formatPostDate(post.date)} /{" "}
            {readingMinutes(post)} min read
          </span>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <span className="blog-byline">By {site.name}</span>
        </header>

        <div className="blog-layout">
          {headings.length > 1 ? <TableOfContents headings={headings} /> : <div />}
          <BlogBody blocks={post.blocks} />
        </div>
      </article>

      <section className="blog-cta">
        <span className="eyebrow">WORK WITH ME</span>
        <h2>Want this working in your business?</h2>
        <p>
          Tell me what&apos;s eating your time. I&apos;ll reply with an honest view of
          what&apos;s worth building.
        </p>
        <a
          className="button button--dark"
          href={`mailto:${site.email}?subject=${encodeURIComponent(post.title)}`}
        >
          Email me <span>↗</span>
        </a>
      </section>

      <nav className="blog-pager" aria-label="More posts">
        {older ? (
          <Link href={`/blog/${older.slug}`}>
            <span>← Older</span>
            <strong>{older.title}</strong>
          </Link>
        ) : (
          <div />
        )}
        {newer ? (
          <Link href={`/blog/${newer.slug}`} className="blog-pager-next">
            <span>Newer →</span>
            <strong>{newer.title}</strong>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      <footer className="case-study-footer">
        <Link href="/blog">All posts →</Link>
        <Link href="/#contact">Start a conversation →</Link>
      </footer>
    </main>
  );
}
