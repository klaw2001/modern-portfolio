"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type BlogListItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  dateLabel: string;
  minutes: number;
};

export function BlogList({
  items,
  categories
}: {
  items: BlogListItem[];
  categories: string[];
}) {
  const [category, setCategory] = useState<string>("ALL");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return items.filter((item) => {
      if (category !== "ALL" && item.category !== category) return false;
      if (!needle) return true;

      return `${item.title} ${item.description}`.toLowerCase().includes(needle);
    });
  }, [items, category, query]);

  return (
    <div className="blog-list">
      <div className="blog-filters">
        <div className="blog-chips" role="group" aria-label="Filter by topic">
          {["ALL", ...categories].map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? "is-active" : undefined}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Search posts"
          aria-label="Search posts"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <ul className="blog-rows" aria-live="polite">
        {visible.map((item, index) => (
          <li key={item.slug}>
            <Link href={`/blog/${item.slug}`} className="blog-row">
              <span className="blog-row-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="blog-row-main">
                <span className="blog-row-meta">
                  {item.category} · {item.dateLabel} · {item.minutes} min read
                </span>
                <strong>{item.title}</strong>
                <span className="blog-row-desc">{item.description}</span>
              </span>
              <span className="blog-row-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 ? (
        <p className="blog-empty">No posts match that. Try another topic.</p>
      ) : null}
    </div>
  );
}
