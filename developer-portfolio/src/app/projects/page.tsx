import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";

export const metadata: Metadata = {
  title: "Rafa | Projects",
  description: "Explore selected projects and software developed by Rafa Fathima M K.",
};

const projects = [
  {
    title: "ResQHub",
    category: "Full-Stack Development",
    description:
      "An integrated disaster response coordination system built to support communication and emergency management.",
    tech: "Java · Spring Boot · MySQL · HTML · CSS · JavaScript",
    url: "https://github.com/rafasidhik/ResQHub",
    linkText: "View Project",
  },
  {
    title: "VEYLIX",
    category: "Cybersecurity",
    description:
      "A phishing URL risk analyzer that identifies suspicious links through multiple security checks.",
    tech: "Python · Streamlit",
    url: "https://github.com/rafasidhik/veylix",
    linkText: "View Project",
  },
  {
    title: "PixelVault",
    category: "Web Development",
    description:
      "A local photo browser built for smooth image browsing, featuring virtualized rendering for efficient performance.",
    tech: "React · TypeScript · TanStack Virtual",
    url: "https://pixelvau1t.vercel.app/",
    linkText: "Live Demo",
  },
  {
    title: "CyberBuddy",
    category: "Web Development",
    description:
      "A browser-based cybersecurity awareness chatbot with interactive learning modules.",
    tech: "HTML · CSS · JavaScript",
    url: "https://rafasidhik.github.io/cyberbuddy/",
    linkText: "Live Demo",
  },
  {
    title: "AstroPulse",
    category: "Frontend Development",
    description:
      "A browser-based astronaut health monitoring simulation dashboard featuring live telemetry, threshold-based alerts, health status evaluation, and historical trends.",
    tech: "HTML · CSS · JavaScript · Chart.js",
    url: "https://rafasidhik.github.io/AstroPulse/",
    linkText: "Live Demo",
  },
  {
    title: "ReadmeGenie",
    category: "Developer Tools",
    description:
      "An interactive Markdown documentation generator with drag-and-drop section management, live preview, reusable templates, and Markdown export.",
    tech: "React · TypeScript · Vite · Tailwind CSS",
    url: "https://readme--genie.vercel.app/",
    linkText: "Live Demo",
  },
];

export default function Projects() {
  return (
    <section className="projects-section">
      <p className="section-label">SELECTED WORK</p>

      <h1>
        Things I&apos;ve <span>built.</span>
      </h1>

      <p className="projects-intro">
        A collection of projects where I explore ideas, learn new technologies,
        and build useful things.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            category={project.category}
            description={project.description}
            tech={project.tech}
            url={project.url}
            linkText={project.linkText}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
