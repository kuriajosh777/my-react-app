export default function Header({ projectCount, formOpen, onToggleForm }) {
  return (
    <header className="hero">
      <div className="container hero__inner">
        <p className="hero__brand">Mwangaza Studio</p>
        <h1 className="hero__title">Work we've made, and work we're making.</h1>
        <p className="hero__lead">
          {projectCount} projects across branding, web, photography, motion and print.
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={onToggleForm}
          aria-expanded={formOpen}
        >
          {formOpen ? "Close form" : "Add project"}
        </button>
      </div>
    </header>
  );
}
