import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import GalleryGrid from "@/components/GalleryGrid";
import { getFeaturedProjects } from "@/lib/content";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Artist Portfolio",
  description:
    "Illustrations and 3D work by an independent artist. Commissions open.",
};

export default async function HomePage() {
  const featured = await getFeaturedProjects(6);
  return (
    <>
      <Hero />
      {featured.length > 0 && (
        <section className={`container ${styles.featured}`}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <GalleryGrid projects={featured} featured />
          <div className={styles.seeAll}>
            <Link href="/work" className={styles.seeAllLink}>
              See all work →
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
