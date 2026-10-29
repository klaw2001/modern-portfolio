import { leadFunnel } from "./posts/lead-funnel";
import { whatAddAiMeans } from "./posts/what-add-ai-means";
import { timeAudit } from "./posts/time-audit";
import { buildBuyNoCode } from "./posts/build-buy-no-code";
import { websiteChatbot } from "./posts/website-chatbot";
import { askYourDocuments } from "./posts/ask-your-documents";
import { spreadsheetToTool } from "./posts/spreadsheet-to-tool";
import { briefADeveloper } from "./posts/brief-a-developer";
import { reportsThatWriteThemselves } from "./posts/reports-that-write-themselves";
import { fastWebsite } from "./posts/fast-website";
import type { Block, Post } from "./types";

export type { Block, Post, WidgetName } from "./types";

/** Newest first. */
export const posts: Post[] = [
  leadFunnel,
  whatAddAiMeans,
  timeAudit,
  buildBuyNoCode,
  websiteChatbot,
  askYourDocuments,
  spreadsheetToTool,
  briefADeveloper,
  reportsThatWriteThemselves,
  fastWebsite
].sort((a, b) => b.date.localeCompare(a.date));

export const categories = Array.from(new Set(posts.map((post) => post.category)));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined
  };
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getHeadings(blocks: Block[]) {
  return blocks
    .filter((block): block is Extract<Block, { type: "h2" }> => block.type === "h2")
    .map((block) => ({ text: block.text, id: slugify(block.text) }));
}

const WORDS_PER_MINUTE = 220;

/** Interactive widgets count as one extra minute of reading time. */
export function readingMinutes(post: Post) {
  const words = post.blocks.reduce((total, block) => {
    switch (block.type) {
      case "ul":
      case "ol":
        return total + block.items.join(" ").split(/\s+/).length;
      case "callout":
        return total + `${block.title} ${block.text}`.split(/\s+/).length;
      case "code":
      case "widget":
        return total;
      default:
        return total + block.text.split(/\s+/).length;
    }
  }, 0);

  const widgets = post.blocks.filter((block) => block.type === "widget").length;

  return Math.max(1, Math.round(words / WORDS_PER_MINUTE) + widgets);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  });
}
