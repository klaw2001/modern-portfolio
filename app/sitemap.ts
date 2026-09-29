import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Case study pages stay out while the projects section is on hold. Add
// `projects.map(...)` entries back when it returns.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
