import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rafa | Home",
  description: "Explore the portfolio of Rafa, a Computer Science student.",
};

export default function Home() {
  return (
    <section className="hero">
      <p className="hero-label">HELLO, I&apos;M RAFA FATHIMA M K 👋</p>

      <h1>
        Building digital
        <br />
        experiences with <span>code.</span>
      </h1>

      <p className="hero-description">
        A Computer Science student exploring the intersection of technology,
        design, and problem-solving.
      </p>

      <div className="hero-buttons">
        <Link href="/projects" className="primary-button">
          Explore My Work ↗
        </Link>

        <Link href="/contact" className="secondary-button">
          Get in Touch
        </Link>
      </div>
    </section>
  );
}