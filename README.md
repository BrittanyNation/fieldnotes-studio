# Fieldnotes Studio — Brand & Web Design Studio, Built with React

**Live site:** https://brittanynation.github.io/fieldnotes-studio/

A fully functional website for **Fieldnotes Studio**, a fictional brand and web design studio: browse 9 portfolio projects, filter by kind of work, search, sort, open a project in detail, save a shortlist that persists between visits, build a live project estimate that prices itself as you choose, and start a project with a validated enquiry form that ends in a real confirmation. Every interactive element works — no dead buttons, no placeholder links.

This is an original portfolio concept by Brittany Nation. No affiliation with any real business is claimed. Design workflow: Sketch / Webflow for layout thinking, built with React components, HTML and CSS.

## Course-track: React, deepened

This project deepens **step 5 (React)** of the course track built alongside Dr. Angela Yu's *Full-Stack Web Development Bootcamp* (Udemy). Steps 1–4 were live APIs + async JavaScript ([Solstice Skies](https://github.com/BrittanyNation/solstice-skies)), Node.js + Express ([Willow Bend Paddle Co.](https://github.com/BrittanyNation/willow-bend-paddle)), databases + REST API design ([Tinker Commons](https://github.com/BrittanyNation/tinker-commons)), and authentication ([Haven Desk Collective](https://github.com/BrittanyNation/haven-desk-collective)); step 5 was React ([Saffron & Sage Kitchen](https://github.com/BrittanyNation/saffron-sage-kitchen)). This build takes React further, with the code commented as study material:

- **Multi-view app** — four views (Work / Services & Estimate / Studio / Start a Project) held in one `view` state in `App`; switching never reloads the page.
- **Components and props** — `Header`, `FilterBar`, `ProjectCard`, `ProjectModal`, `ShortlistDrawer`, `Estimator`, `FaqItem`, `NewsletterForm`, `ContactForm`. Data and callbacks flow down; events flow up.
- **Lifting state up** — the shortlist lives in `App`, so the header count, work cards, drawer and contact form all share the same list.
- **Derived state with `useMemo`** — the filtered/sorted project list and the live estimate breakdown are computed from state, never stored; there is deliberately no Calculate button.
- **Effects (`useEffect`)** — the shortlist persists to localStorage whenever it changes, and the contact form reacts to an estimator prefill passed down as a prop.
- **Controlled forms** — estimator, enquiry and newsletter inputs are all bound to state; the enquiry form validates name, email, a future start date, budget and message, and ends in a confirmation with a generated `FN-XXXXXX` reference.
- **Static hosting, honestly** — GitHub Pages serves static files only, so the JSX in `app.js` is compiled ahead of time to `app.compiled.js` with esbuild. In a production React project the same components would be built with Vite; the component code itself is identical.

## What works on the site

- **Work** — 9 projects rendered from data; category chips (Brand / Web / E-Commerce / Editorial), live search, three sort orders, a live result count and an honest empty state; a detail modal with deliverables and results; save-to-shortlist stars persisted in localStorage.
- **Shortlist** — a drawer listing saved projects with remove, a live count in the header, and a "Start a project like these" path that carries the shortlisted names into the enquiry.
- **Services & Estimate** — project type and size selectors, four priced add-ons, and a rush option adding 25%; the breakdown and total update live with every change, and "Start a project with this estimate" prefills the enquiry form's type and budget.
- **Studio** — working FAQ accordions and a validated Studio Notes newsletter signup that recognises repeat subscribers.
- **Start a Project** — enquiry form with inline validation (including past-date rejection), saved to localStorage, ending in a confirmation state with a generated `FN-XXXXXX` reference.

## Verified

Automated DOM checks against the real compiled React app (20 checks, all passed): 9 cards render from data, the Brand filter narrows 9 to 2 and All restores 9, search narrows to 1, saving a project updates the header shortlist count to 1 and persists it, the detail modal opens and closes, the estimator prices Website/Standard at $5,320, Brand Identity/Starter at $2,400, plus copywriting at $3,050, plus rush at $3,813, "Start a project with this estimate" prefills the enquiry budget, an invalid submit shows field errors, a valid submit shows an `FN-XXXXXX` confirmation and persists the enquiry, the FAQ accordion opens, and the newsletter signup succeeds.

## Palette

Ink `#141414`, paper `#F4F1EA`, chartreuse `#C8F04B`, warm sand `#E8E2D5`, muted `#6B675E`.

## Files

- `index.html` — page shell, Open Graph tags, React + ReactDOM (CDN)
- `app.js` — the full React app in JSX, commented as study code
- `app.compiled.js` — the same source compiled with esbuild, served live
- `src/README.md` — how the components map to a split-file React project
- `styles.css` — the Fieldnotes design system
- `images/` — real portfolio and studio photography downloaded from Pexels under the Pexels free license
- `og-image.png` — 1200×627 social preview image in the project palette

## Photography

The hero and portfolio images are real photographs sourced from Pexels and stored locally in `images/` so the live site does not depend on hotlinks.
