# React source (study guide)

The live site serves `../app.compiled.js`, which is `../app.js` (JSX)
compiled ahead of time with esbuild, so GitHub Pages can host the React
app as plain static files with no build server and no in-browser
transpiler.

`app.js` is one file for study, but it is organized the way a Vite or
Create React App project would split it:

- `Header` — header + navigation (props: view, shortlist count)
- `FilterBar` — controlled search / category / sort inputs
- `ProjectCard` — one portfolio project; save and view callbacks flow up
- `ProjectModal` — detail dialog for one project
- `ShortlistDrawer` — saved projects, owned by App and passed down
- `Estimator` — project estimator; the price is derived state (useMemo)
- `FaqItem`, `NewsletterForm` — small stateful widgets
- `ContactForm` — validated enquiry form with an estimator prefill effect
- `App` — root component; owns view, shortlist, filters and modal state

Key React ideas deepened in this project, beyond the first React build
(Saffron & Sage Kitchen): multi-view conditional rendering from one
`view` state, lifting the shortlist up so four components share it,
useMemo for both a filtered list and a live price estimate, useEffect
for localStorage persistence and for reacting to a prop change
(the estimator prefill), keys on lists, and controlled forms throughout.
