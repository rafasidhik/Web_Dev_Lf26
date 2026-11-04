import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rafa | Contact",
  description: "Get in touch with Rafa Fathima M K via email, GitHub, or LinkedIn.",
};

export default function Contact() {
  return (
    <section className="contact-section">
      <p className="section-label">GET IN TOUCH</p>

      <h1>
        Let&apos;s start a <span>conversation.</span>
      </h1>

      <p className="contact-intro">
        Have a project idea, collaboration opportunity, or just want to connect?
        Feel free to reach out.
      </p>

      <div className="contact-links">
        <a href="mailto:rafasidhik@gmail.com">
          Email Me ↗
        </a>

        <a
          href="https://github.com/rafasidhik"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>

        <a
          href="https://www.linkedin.com/in/rafasidhik/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
