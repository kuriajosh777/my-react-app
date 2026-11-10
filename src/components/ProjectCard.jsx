// Cover colours used when a project has no image.
const COVERS = [
  { bg: "#3047FF", fg: "#FFFFFF" },
  { bg: "#12151F", fg: "#B8F2D0" },
  { bg: "#0F8B6D", fg: "#FFFFFF" },
  { bg: "#F2B632", fg: "#12151F" },
  { bg: "#E4572E", fg: "#FFFFFF" },
  { bg: "#7A5CFA", fg: "#FFFFFF" },
];

function coverFor(title) {
  let sum = 0;
  for (const ch of title) sum += ch.charCodeAt(0);
  return COVERS[sum % COVERS.length];
}

function initials(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function ProjectCard({ project }) {
  const { title, category, year, description, tags = [], image, link } = project;
  const cover = coverFor(title);

  return (
    <article className="card">
      {image ? (
        <img className="card__cover card__cover--image" src={image} alt={`${title} cover`} />
      ) : (
        <div
          className="card__cover"
          style={{ background: cover.bg, color: cover.fg }}
          aria-hidden="true"
        >
          {initials(title)}
        </div>
      )}
      <div className="card__body">
        <p className="card__meta">
          {category}, {year}
        </p>
        <h2 className="card__title">{title}</h2>
        <p className="card__text">{description}</p>
        {tags.length > 0 && (
          <ul className="tags">
            {tags.map((tag) => (
              <li key={tag} className="tags__item">
                {tag}
              </li>
            ))}
          </ul>
        )}
        {link && (
          <a className="card__link" href={link} target="_blank" rel="noreferrer">
            View project
          </a>
        )}
      </div>
    </article>
  );
}
