import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/content";
import styles from "./ProjectCard.module.css";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.meta}>
        <span className={styles.title}>{project.title}</span>
        <span className={styles.year}>{project.year}</span>
      </div>
    </Link>
  );
}
