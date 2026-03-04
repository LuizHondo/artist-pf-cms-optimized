import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageWrap}>
        <Image
          src="/images/hero.jpg"
          alt="Featured artwork"
          fill
          priority
          className={styles.image}
          sizes="100vw"
        />
        <div className={styles.overlay} />
      </div>

      <div className={`container ${styles.content}`}>
        <h1 className={styles.title}>Artist</h1>
        <p className={styles.tagline}>
          Illustrations &amp; 3D — crafted with intention
        </p>
        <Link href="/work" className={styles.cta}>
          View Work
        </Link>
      </div>
    </section>
  );
}
