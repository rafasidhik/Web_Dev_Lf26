type ProjectCardProps = {
  title: string;
  category: string;
  description: string;
  tech: string;
  url: string;
  linkText: string;
  index: number;
};

export default function ProjectCard({
  title,
  category,
  description,
  tech,
  url,
  linkText,
  index,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      <p className="project-number">
        0{index + 1} / {category}
      </p>

      <h2>{title}</h2>

      <p className="project-description">{description}</p>

      <p className="project-tech">{tech}</p>

      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
          aria-label={`${linkText} for ${title} (opens in a new tab)`}
        >
          {linkText} ↗
        </a>
      )}
    </article>
  );
}
