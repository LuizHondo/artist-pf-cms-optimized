import groq from "groq";
import { sanityClient } from "./sanity";

export interface Project {
  slug: string;
  category: "illustrations" | "3d-work";
  title: string;
  year: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  featured: boolean;
  description?: string;
}

const PROJECT_FIELDS = groq`
  "slug": slug.current,
  category,
  title,
  year,
  tags,
  "thumbnail": thumbnail.asset->url,
  "images": images[].asset->url,
  featured,
  description
`;

export async function getAllProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    groq`*[_type == "project"] | order(year desc) { ${PROJECT_FIELDS} }`
  );
}

export async function getFeaturedProjects(max = 6): Promise<Project[]> {
  return sanityClient.fetch(
    groq`*[_type == "project" && featured == true] | order(year desc)[0...$max] { ${PROJECT_FIELDS} }`,
    { max }
  );
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] { ${PROJECT_FIELDS} }`,
    { slug }
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const results: { slug: string }[] = await sanityClient.fetch(
    groq`*[_type == "project"] { "slug": slug.current }`
  );
  return results.map((r) => r.slug);
}
