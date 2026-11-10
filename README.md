# Mwangaza Studio – Portfolio Platform

A single page application built with React and Vite. It shows a creative agency's past projects, lets visitors search them, and lets the agency add new projects through a form.

## Features

- Landing page with a hero section and a responsive grid of project cards
- Live search that filters by title, category, description and tags
- "Add project" form with validation; new projects appear first
- Projects are saved in the browser (localStorage), so they survive a refresh
- Responsive layout: 3 columns on desktop, 2 on tablet, 1 on phones
- Jest and React Testing Library tests

## Run it

```bash
npm install
npm run dev      # start the dev server
npm test         # run the tests
npm run build    # production build
```

## Folder structure

```
src/
  components/   Header, SearchBar, ProjectForm, ProjectList, ProjectCard
  hooks/        useLocalStorage
  data/         seed projects and category list
  styles/       global.css, layout.css, components.css
  tests/        App.test.jsx, ProjectCard.test.jsx
```

## Component tree

```
App                      state: projects, query, formOpen
├── Header               props: projectCount, formOpen, onToggleForm
├── main
│   ├── ProjectForm      props: onAddProject, onCancel   (local state: values, errors)
│   ├── SearchBar        props: query, onQueryChange, resultCount
│   └── ProjectList      props: projects, query, onClearSearch
│       └── ProjectCard  props: project
└── footer
```

## State and props

| State | Lives in | Why there |
| --- | --- | --- |
| `projects` | `App` | Read by the list and the header count, changed by the form |
| `query` | `App` | Typed in `SearchBar`, used by `App` to filter for `ProjectList` |
| `formOpen` | `App` | Toggled from `Header`, controls `ProjectForm` |
| `values`, `errors` | `ProjectForm` | Only the form needs its draft data |

Data flows down as props. Changes flow up through callbacks (`onQueryChange`, `onAddProject`, `onToggleForm`).

## Design notes

The mock-up link could not be opened while building this, so the layout follows the brief: a hero at the top, search under it, then a project grid. Adjust `src/styles/` to match your mock-up more closely.

## Screenshots

Add screenshots of the landing page, the search results and the form here.
