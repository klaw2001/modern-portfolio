import type { Metadata } from "next";
import Link from "next/link";
import { BlogList } from "@/components/blog-list";
import { categories, formatPostDate, posts, readingMinutes } from "@/lib/blog";
import { site } from "@/lib/content";

const description =
  "Plain-English writing from a developer to founders: how to use AI and code to save time, win back leads and stop doing work a computer should do.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog"
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: site.name,
    locale: "en_IN",
    title: `Blog | ${site.name}`,
    description
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.url}/blog#blog`,
  name: `${site.name}: Blog`,
  url: `${site.url}/blog`,
  description,
  author: { "@type": "Person", name: site.name, url: site.url },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${site.url}/blog/${post.slug}`,
    datePublished: post.date
  }))
};

export default function BlogIndexPage() {
  const items = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    dateLabel: formatPostDate(post.date),
    minutes: readingMinutes(post)
  }));

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c")
        }}
      />

      <header className="case-study-nav">
        <Link href="/" className="brand-mark" aria-label="Home">
          HN<span>/</span>
        </Link>

        <Link href="/">← Back to home</Link>
      </header>

      <section className="blog-hero">
        <span className="eyebrow">WRITING / {posts.length} POSTS</span>
        <h1>
          Use AI and code to get your <em>time</em> back.
        </h1>
        <p>{description}</p>
      </section>

      <section className="blog-index">
        <BlogList items={items} categories={categories} />
      </section>

      <footer className="case-study-footer">
        <Link href="/#work">View my work →</Link>
        <Link href="/#contact">Start a conversation →</Link>
      </footer>
    </main>
  );
}
