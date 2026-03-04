"use client";

import { useState } from "react";
import type { Project } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import styles from "./GalleryGrid.module.css";

type Filter = "all" | "illustrations" | "3d-work";

interface Props {
  projects: Project[];
  featured?: boolean;
}

const FILTER_LABELS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "illustrations", label: "Illustrations" },
  { value: "3d-work", label: "3D" },
];

export default function GalleryGrid({ projects, featured = false }: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    featured || filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      {!featured && (
        <div className={styles.filters} role="group" aria-label="Filter work by category">
          {FILTER_LABELS.map(({ value, label }) => (
            <button
              key={value}
              className={`${styles.filterBtn} ${filter === value ? styles.active : ""}`}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </div>
      )}
      <div className={styles.grid}>
        {visible.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
