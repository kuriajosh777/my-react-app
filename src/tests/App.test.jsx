import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App.jsx";
import seedProjects from "../data/projects.js";

beforeEach(() => {
  window.localStorage.clear();
});

test("landing page lists all seeded projects", () => {
  render(<App />);
  expect(screen.getAllByRole("article")).toHaveLength(seedProjects.length);
  expect(screen.getByRole("heading", { name: /kijani coffee roasters/i })).toBeInTheDocument();
});

test("search filters projects by title, category and tag", async () => {
  const user = userEvent.setup();
  render(<App />);
  const search = screen.getByLabelText(/search projects/i);

  await user.type(search, "coffee");
  expect(screen.getAllByRole("article")).toHaveLength(1);

  await user.clear(search);
  await user.type(search, "photography");
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.getByRole("heading", { name: /mama mboga portraits/i })).toBeInTheDocument();

  await user.clear(search);
  await user.type(search, "risograph");
  expect(screen.getByRole("heading", { name: /jua kali annual report/i })).toBeInTheDocument();
});

test("shows an empty state and lets the user clear the search", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.type(screen.getByLabelText(/search projects/i), "zzzz");
  expect(screen.getByRole("status")).toHaveTextContent(/no projects match/i);

  await user.click(screen.getByRole("button", { name: /clear search/i }));
  expect(screen.getAllByRole("article")).toHaveLength(seedProjects.length);
});

test("form shows validation errors and does not add an invalid project", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /add project/i }));
  await user.click(screen.getByRole("button", { name: /save project/i }));

  expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
  expect(screen.getAllByRole("article")).toHaveLength(seedProjects.length);
});

test("adds a new project through the form and shows it first", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /add project/i }));

  const form = screen.getByRole("form", { name: /add a project/i });
  await user.type(within(form).getByLabelText(/^title$/i), "Soko Digital Wallet");
  await user.selectOptions(within(form).getByLabelText(/category/i), "Web design");
  await user.type(
    within(form).getByLabelText(/description/i),
    "A mobile-first wallet interface for market traders."
  );
  await user.type(within(form).getByLabelText(/tags/i), "fintech, mobile");
  await user.click(within(form).getByRole("button", { name: /save project/i }));

  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(seedProjects.length + 1);
  expect(within(cards[0]).getByRole("heading", { name: /soko digital wallet/i })).toBeInTheDocument();
  expect(screen.queryByRole("form", { name: /add a project/i })).not.toBeInTheDocument();
});

test("new projects are saved to localStorage", async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole("button", { name: /add project/i }));
  const form = screen.getByRole("form", { name: /add a project/i });
  await user.type(within(form).getByLabelText(/^title$/i), "Saved Project");
  await user.type(within(form).getByLabelText(/description/i), "This one should persist.");
  await user.click(within(form).getByRole("button", { name: /save project/i }));

  const saved = JSON.parse(window.localStorage.getItem("portfolio.projects"));
  expect(saved[0].title).toBe("Saved Project");
});
