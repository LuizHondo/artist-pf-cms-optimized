import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the artist — background, approach, tools, and how to get in touch.",
};

const skills = [
  "Illustration",
  "3D Modeling",
  "Character Design",
  "Concept Art",
  "Blender",
  "Procreate",
  "Adobe Illustrator",
  "Photoshop",
  "Cinema 4D",
  "Substance Painter",
];

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
  },
  {
    href: "https://behance.net",
    label: "Behance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 11.25A2.25 2.25 0 0 0 5.25 9H2v12h3.5a2.75 2.75 0 0 0 2.75-2.75 2.75 2.75 0 0 0-1.5-2.45A2.25 2.25 0 0 0 7.5 11.25zM5.25 10.5H4.5v2h.75a.75.75 0 0 0 0-1.5zm.25 3.5H4.5v2.5h1a1.25 1.25 0 0 0 0-2.5zM15 9.75C12.65 9.75 11 11.4 11 13.75S12.65 18 15 18a3.75 3.75 0 0 0 3.5-2.25H17a2.25 2.25 0 0 1-2 1c-1.1 0-1.9-.65-2.1-1.75H18.5A3.5 3.5 0 0 0 15 9.75zm-2.1 3.25c.2-1 .9-1.5 2.1-1.5s1.9.5 2.1 1.5H12.9zM17.5 6h-5V7.5h5V6z"/></svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className={`container page-content ${styles.page}`}>
      <div className={styles.grid}>
        <div className={styles.imageCol}>
          <div className={styles.photoWrap}>
            <Image
              src="/images/artist-photo.jpg"
              alt="Portrait of the artist"
              width={480}
              height={600}
              className={styles.photo}
            />
          </div>
        </div>

        <div className={styles.textCol}>
          <h1 className={styles.heading}>About</h1>
          <div className={styles.bio}>
            <p>
              I&rsquo;m an independent artist specialising in illustration and
              3D work. My practice sits at the intersection of character design,
              concept art, and digital sculpture — pieces that feel both
              handcrafted and technically precise.
            </p>
            <p>
              I work with brands, studios, and independent clients on editorial
              projects, album artwork, packaging, and personal commissions.
              Commissions are currently open.
            </p>
          </div>

          <h2 className={styles.subheading}>Tools &amp; Skills</h2>
          <ul className={styles.tags}>
            {skills.map((skill) => (
              <li key={skill} className={styles.tag}>
                {skill}
              </li>
            ))}
          </ul>

          <h2 className={styles.subheading}>Find me</h2>
          <nav className={styles.social} aria-label="Social links">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {icon}
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
