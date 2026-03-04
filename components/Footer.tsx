import styles from "./Footer.module.css";

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://behance.net", label: "Behance" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>© {year} Artist. All rights reserved.</p>
        <nav aria-label="Social links" className={styles.social}>
          {socialLinks.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
