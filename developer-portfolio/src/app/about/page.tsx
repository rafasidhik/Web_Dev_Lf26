import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rafa | About",
  description: "Learn more about Rafa Fathima M K, a Computer Science student at GEC Palakkad.",
};

export default function About() {
  return (
    <section className="about-section">
      <p className="section-label">GET TO KNOW ME</p>

      <h1>
        A little about <span>me.</span>
      </h1>

      <div className="about-content">
        <p>
          I&apos;m Rafa Fathima M K, a Computer Science and Engineering student at
          Government Engineering College, Palakkad.
        </p>

        <p>
          Alongside my B.Tech, I&apos;m pursuing the BS Degree in
          Data Science and Applications from IIT Madras.
        </p>

        <p>
          I&apos;m interested in web development, UI/UX design, mobile development, cybersecurity,
          and exploring how technology can solve real-world problems.
        </p>
      </div>
    </section>
  );
}
