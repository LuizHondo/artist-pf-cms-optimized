import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/content";
import styles from "./page.module.css";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description ?? `${project.title} — ${project.year}`,
    openGraph: {
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className={`container page-content ${styles.article}`}>
      <Link href="/work" className={styles.back}>
        ← Back to Work
      </Link>

      <div className={styles.heroWrap}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority
          className={styles.heroImage}
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      <div className={styles.meta}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.year}>{project.year}</p>
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
        {project.tags.length > 0 && (
          <ul className={styles.tags}>
            {project.tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {project.images.length > 0 && (
        <div className={styles.gallery}>
          {project.images.map((src, i) => (
            <div key={i} className={styles.galleryImage}>
              <Image
                src={src}
                alt={`${project.title} — image ${i + 1}`}
                fill
                className={styles.img}
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
