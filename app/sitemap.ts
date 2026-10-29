import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { site } from "@/lib/content";

// Case study pages stay out while the projects section is on hold. Add
// `projects.map(...)` entries back when it returns.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${site.url}/blog`,
      lastModified: posts[0]?.date,
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6
    }))
  ];
}
