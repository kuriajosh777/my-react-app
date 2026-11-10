export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="search" role="search">
      <label htmlFor="project-search" className="search__label">
        Search projects
      </label>
      <input
        id="project-search"
        className="input search__input"
        type="search"
        placeholder="Try “branding” or “coffee”"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <p className="search__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}
