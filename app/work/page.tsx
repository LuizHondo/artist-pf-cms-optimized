import type { Metadata } from "next";
import { getAllProjects } from "@/lib/content";
import GalleryGrid from "@/components/GalleryGrid";
import styles from "./page.module.css";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Work",
  description: "Full portfolio of illustrations and 3D work.",
};

export default async function WorkPage() {
  const projects = await getAllProjects();
  return (
    <div className={`container page-content ${styles.page}`}>
      <h1 className={styles.heading}>Work</h1>
      <GalleryGrid projects={projects} />
    </div>
  );
}
