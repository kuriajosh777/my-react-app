import { useState } from "react";
import { CATEGORIES } from "../data/projects.js";

const emptyForm = {
  title: "",
  category: CATEGORIES[0],
  year: new Date().getFullYear(),
  description: "",
  tags: "",
  image: "",
  link: "",
};

function isWebUrl(value) {
  return /^https?:\/\/\S+$/i.test(value);
}

function validate(values) {
  const errors = {};
  if (!values.title.trim()) errors.title = "Enter a project title.";
  if (values.description.trim().length < 10)
    errors.description = "Describe the project in at least 10 characters.";
  const year = Number(values.year);
  if (!Number.isInteger(year) || year < 1990 || year > new Date().getFullYear() + 1)
    errors.year = "Enter a valid year.";
  if (values.image.trim() && !isWebUrl(values.image.trim()))
    errors.image = "Image address must start with http:// or https://";
  if (values.link.trim() && !isWebUrl(values.link.trim()))
    errors.link = "Project link must start with http:// or https://";
  return errors;
}

// The form keeps its own draft values (local state). Only a valid,
// finished project is sent up to App through onAddProject.
export default function ProjectForm({ onAddProject, onCancel }) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onAddProject({
      title: values.title.trim(),
      category: values.category,
      year: Number(values.year),
      description: values.description.trim(),
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      image: values.image.trim(),
      link: values.link.trim(),
    });
    setValues(emptyForm);
  }

  const field = (name) => ({
    id: `field-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `error-${name}` : undefined,
  });

  const error = (name) =>
    errors[name] ? (
      <p className="field__error" id={`error-${name}`} role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate aria-label="Add a project">
      <h2 className="form__title">Add a project</h2>

      <div className="field">
        <label htmlFor="field-title">Title</label>
        <input className="input" type="text" {...field("title")} />
        {error("title")}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="field-category">Category</label>
          <select className="input" {...field("category")}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="field-year">Year</label>
          <input className="input" type="number" {...field("year")} />
          {error("year")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="field-description">Description</label>
        <textarea className="input" rows="4" {...field("description")} />
        {error("description")}
      </div>

      <div className="field">
        <label htmlFor="field-tags">Tags (separated by commas)</label>
        <input className="input" type="text" {...field("tags")} />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="field-image">Image address (optional)</label>
          <input className="input" type="url" {...field("image")} />
          {error("image")}
        </div>
        <div className="field">
          <label htmlFor="field-link">Project link (optional)</label>
          <input className="input" type="url" {...field("link")} />
          {error("link")}
        </div>
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          Save project
        </button>
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
