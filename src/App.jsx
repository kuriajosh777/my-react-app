import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProjectForm from "./components/ProjectForm.jsx";
import ProjectList from "./components/ProjectList.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import seedProjects from "./data/projects.js";

// App owns all shared state: the project list, the search text and
// whether the form is open. Children receive data and callbacks as props.
export default function App() {
  const [projects, setProjects] = useLocalStorage("portfolio.projects", seedProjects);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) =>
      [p.title, p.category, p.description, ...(p.tags || [])]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [projects, query]);

  function addProject(newProject) {
    setProjects((prev) => [{ ...newProject, id: `p${Date.now()}` }, ...prev]);
    setQuery("");
    setFormOpen(false);
  }

  return (
    <div className="app">
      <Header
        projectCount={projects.length}
        formOpen={formOpen}
        onToggleForm={() => setFormOpen((open) => !open)}
      />
      <main className="container">
        {formOpen && (
          <ProjectForm onAddProject={addProject} onCancel={() => setFormOpen(false)} />
        )}
        <SearchBar query={query} onQueryChange={setQuery} resultCount={visibleProjects.length} />
        <ProjectList projects={visibleProjects} query={query} onClearSearch={() => setQuery("")} />
      </main>
      <footer className="footer container">
        <p>Mwangaza Studio · Nairobi</p>
      </footer>
    </div>
  );
}
