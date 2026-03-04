import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2025-03-04",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const contentDir = path.join(process.cwd(), "content");
const categories = ["illustrations", "3d-work"] as const;

async function seed() {
  for (const category of categories) {
    const dir = path.join(contentDir, category);
    if (!fs.existsSync(dir)) {
      console.log(`Skipping ${category} (directory not found)`);
      continue;
    }
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.(mdx|md)$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(dir, file), "utf-8")
      );
      await client.createOrReplace({
        _type: "project",
        _id: `project-${slug}`,
        title: data.title ?? slug,
        slug: { _type: "slug", current: slug },
        category,
        year: data.year ?? new Date().getFullYear(),
        tags: data.tags ?? [],
        featured: data.featured ?? false,
        description: data.description ?? null,
      });
      console.log(`✓ Seeded: ${category}/${slug}`);
    }
  }
  console.log("Done. Upload images manually in Sanity Studio.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
