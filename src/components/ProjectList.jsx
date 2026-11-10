import ProjectCard from "./ProjectCard.jsx";

export default function ProjectList({ projects, query, onClearSearch }) {
  if (projects.length === 0) {
    return (
      <div className="empty" role="status">
        <p className="empty__title">No projects match “{query}”.</p>
        <p>Check the spelling, try a category name, or clear the search.</p>
        <button type="button" className="btn" onClick={onClearSearch}>
          Clear search
        </button>
      </div>
    );
  }

  return (
    <ul className="grid">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
