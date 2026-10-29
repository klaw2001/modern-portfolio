import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { slugify, type Block } from "@/lib/blog";
import { BlogWidget } from "./blog-widgets";

const inlinePattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

/** Supports **bold**, `code` and [text](link) inside a paragraph. */
function renderInline(text: string): ReactNode[] {
  return text.split(inlinePattern).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (link) {
      const [, label, href] = link;

      return href.startsWith("/") ? (
        <Link key={index} href={href}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function BlogBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="blog-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{renderInline(block.text)}</p>;
          case "h2":
            return (
              <h2 key={index} id={slugify(block.text)}>
                {block.text}
              </h2>
            );
          case "h3":
            return <h3 key={index}>{block.text}</h3>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case "quote":
            return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
          case "callout":
            return (
              <aside key={index} className="blog-callout">
                <strong>{block.title}</strong>
                <p>{renderInline(block.text)}</p>
              </aside>
            );
          case "code":
            return (
              <pre key={index} className="blog-code" data-language={block.language}>
                <code>{block.code}</code>
              </pre>
            );
          case "widget":
            return <BlogWidget key={index} name={block.name} />;
        }
      })}
    </div>
  );
}
