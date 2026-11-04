import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rafa | Skills",
  description: "Technical skills, tools, platforms, and μLearn profile of Rafa Fathima M K.",
};

const skillGroups = [
  {
    title: "Programming",
    skills: ["Python", "C", "JavaScript", "Java"],
  },
  {
    title: "Web Development",
    skills: ["HTML", "CSS", "React", "Next.js", "TypeScript"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Canva", "Figma"],
  },
  {
    title: "Areas of Interest",
    skills: ["UI/UX Design", "Cybersecurity", "AI & Data Science"," Mobile Development"],
  },
];

export default function Skills() {
  return (
    <section className="skills-section">
      <p className="section-label">WHAT I WORK WITH</p>

      <h1>
        Skills & <span>interests.</span>
      </h1>

      <p className="skills-intro">
        Technologies I&apos;ve explored and tools I use while learning,
        experimenting, and building projects.
      </p>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <h2>{group.title}</h2>

            <div className="skill-list">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mulearn-section">
        <p className="section-label">MY μLEARN PROFILE</p>

        <h2>
            Learning and <span>growing.</span>
        </h2>

        <div className="mulearn-card">
            <Image
                src="https://mulearn.org/embed/rank/rafasidhik@mulearn"
                alt="Rafa's μLearn Rank Profile"
                width={998}
                height={826}
                unoptimized
                className="mulearn-embed-img"
            />
        </div>
      </div>
    </section>
  );
}
