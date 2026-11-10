import { render, screen } from "@testing-library/react";
import ProjectCard from "../components/ProjectCard.jsx";

const base = {
  id: "t1",
  title: "Test Project",
  category: "Print",
  year: 2025,
  description: "A short description.",
  tags: ["one", "two"],
  image: "",
  link: "",
};

test("renders title, meta, description and tags", () => {
  render(<ProjectCard project={base} />);
  expect(screen.getByRole("heading", { name: "Test Project" })).toBeInTheDocument();
  expect(screen.getByText(/print, 2025/i)).toBeInTheDocument();
  expect(screen.getByText("A short description.")).toBeInTheDocument();
  expect(screen.getByText("one")).toBeInTheDocument();
});

test("shows a link only when the project has one", () => {
  const { rerender } = render(<ProjectCard project={base} />);
  expect(screen.queryByRole("link")).not.toBeInTheDocument();

  rerender(<ProjectCard project={{ ...base, link: "https://example.com" }} />);
  expect(screen.getByRole("link", { name: /view project/i })).toHaveAttribute(
    "href",
    "https://example.com"
  );
});

test("uses an image when one is provided", () => {
  render(<ProjectCard project={{ ...base, image: "https://example.com/a.jpg" }} />);
  expect(screen.getByAltText("Test Project cover")).toBeInTheDocument();
});
