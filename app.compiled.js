const { useState, useEffect, useMemo } = React;
const PROJECTS = [
  { id: "p1", name: "Fern Hollow Skincare", category: "Brand", year: 2026, hue: "#DCE8D0", initials: "FH", img: "images/p1.jpg", alt: "Five minimalist skincare jars with patterned labels", blurb: "A calm identity and packaging system for a small-batch skincare maker.", deliverables: ["Logo and identity", "Packaging labels", "Brand guidelines"], result: "Launch range sold out its first small batch in three weeks." },
  { id: "p2", name: "Atlas Roast Club", category: "E-Commerce", year: 2026, hue: "#EAD9C2", initials: "AR", img: "images/p2.jpg", alt: "Coffee beans being poured from a gold scoop into a cloth bag", blurb: "A subscription storefront for a coffee club that ships on roast day.", deliverables: ["Store design and build", "Subscription flow", "Email templates"], result: "Checkout shortened from five steps to two." },
  { id: "p3", name: "The Quiet Journal", category: "Editorial", year: 2025, hue: "#D8DCE8", initials: "QJ", img: "images/p3.jpg", alt: "Newspapers and a cup of coffee on a white table", blurb: "A slow-reading magazine site designed for long essays and quiet margins.", deliverables: ["Editorial templates", "Reading experience", "Archive search"], result: "Average reading time rose from two minutes to seven." },
  { id: "p4", name: "North Pier Hotels", category: "Web", year: 2026, hue: "#CDE3E6", initials: "NP", img: "images/p4.jpg", alt: "White seaside hotel buildings beside a beach and bay", blurb: "A direct-booking website for a family-run pair of seaside hotels.", deliverables: ["Website design and build", "Booking flow", "Local SEO setup"], result: "Direct bookings replaced a third of agency bookings in a season." },
  { id: "p5", name: "Bloom Box Market", category: "E-Commerce", year: 2025, hue: "#F3D9DE", initials: "BB", img: "images/p5.jpg", alt: "Florist arranging white roses and greenery in a metal vase", blurb: "A flower subscription shop with a build-your-own bouquet picker.", deliverables: ["Store design and build", "Bouquet picker", "Gift messaging"], result: "Gift orders became the shop's best-selling line." },
  { id: "p6", name: "Harbor Legal", category: "Web", year: 2025, hue: "#DDD6C8", initials: "HL", img: "images/p6.jpg", alt: "Lawyer\u2019s desk with documents, a laptop, and a Lady Justice statue", blurb: "A plain-language website for a small law practice that hates jargon.", deliverables: ["Website design and build", "Plain-language rewrite", "Intake form"], result: "Enquiries doubled while phone interruptions fell." },
  { id: "p7", name: "Studio Marrow", category: "Brand", year: 2024, hue: "#E6D8F0", initials: "SM", img: "images/p7.jpg", alt: "Person working at a workbench in a furniture workshop", blurb: "A bold identity for a furniture workshop built from reclaimed timber.", deliverables: ["Logo and identity", "Workshop signage", "Lookbook"], result: "The workshop's waiting list grew to four months." },
  { id: "p8", name: "Field & Folk Festival", category: "Editorial", year: 2024, hue: "#F0E3B8", initials: "FF", img: "images/p8.jpg", alt: "Crowd facing a colorful outdoor festival stage", blurb: "A programme and poster system for a weekend folk festival.", deliverables: ["Poster system", "Printed programme", "Line-up site"], result: "The festival sold out for the first time in six years." },
  { id: "p9", name: "Copperline Bikes", category: "Web", year: 2024, hue: "#D8E8DC", initials: "CB", img: "images/p9.jpg", alt: "Bicycle mechanic assembling a bicycle in a workshop", blurb: "A service-booking website for a bike repair shop with honest pricing.", deliverables: ["Website design and build", "Repair booking", "Price guide"], result: "Online bookings filled the workshop diary two weeks out." }
];
const CATEGORIES = ["All", "Brand", "Web", "E-Commerce", "Editorial"];
const TYPES = {
  "Brand Identity": { base: 2400, note: "Logo, identity system and guidelines" },
  "Website": { base: 3800, note: "Design and build, up to five pages included" },
  "E-Commerce": { base: 5200, note: "Store design, build and checkout flow" },
  "Editorial": { base: 1800, note: "Templates and a reading-first layout system" }
};
const SIZES = { "Starter": 1, "Standard": 1.4, "Large": 1.9 };
const ADDONS = [
  { id: "copy", label: "Copywriting for every page", price: 650 },
  { id: "seo", label: "Search setup (titles, descriptions, sitemap)", price: 450 },
  { id: "photo", label: "Photography direction for one shoot day", price: 800 },
  { id: "care", label: "First three months of care and updates", price: 540 }
];
const money = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
function Header({ view, setView, shortCount, openShortlist }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "topbar" }, "Now booking projects starting next month \xB7 Estimates are honest starting points, never invoices"), /* @__PURE__ */ React.createElement("header", { className: "site" }, /* @__PURE__ */ React.createElement("nav", { className: "nav" }, /* @__PURE__ */ React.createElement("button", { className: "logo", style: { background: "none", border: "none" }, onClick: () => setView("work") }, "Fieldnotes ", /* @__PURE__ */ React.createElement("span", null, "Studio")), /* @__PURE__ */ React.createElement("div", { className: "navlinks" }, /* @__PURE__ */ React.createElement("button", { className: view === "work" ? "active" : "", onClick: () => setView("work") }, "Work"), /* @__PURE__ */ React.createElement("button", { className: view === "services" ? "active" : "", onClick: () => setView("services") }, "Services & Estimate"), /* @__PURE__ */ React.createElement("button", { className: view === "studio" ? "active" : "", onClick: () => setView("studio") }, "Studio"), /* @__PURE__ */ React.createElement("button", { className: view === "start" ? "active" : "", onClick: () => setView("start") }, "Start a Project"), /* @__PURE__ */ React.createElement("button", { className: "shortlistbtn", onClick: openShortlist }, "Shortlist (", shortCount, ")")))));
}
function FilterBar({ cat, setCat, query, setQuery, sort, setSort, count }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "filters", role: "search" }, /* @__PURE__ */ React.createElement("input", { "aria-label": "Search projects", placeholder: "Search projects\u2026", value: query, onChange: (e) => setQuery(e.target.value) }), /* @__PURE__ */ React.createElement("select", { "aria-label": "Sort projects", value: sort, onChange: (e) => setSort(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "newest" }, "Newest first"), /* @__PURE__ */ React.createElement("option", { value: "oldest" }, "Oldest first"), /* @__PURE__ */ React.createElement("option", { value: "name" }, "Name A to Z"))), /* @__PURE__ */ React.createElement("div", { className: "filters" }, CATEGORIES.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: "chip" + (cat === c ? " active" : ""), onClick: () => setCat(c) }, c)), /* @__PURE__ */ React.createElement("span", { "aria-live": "polite" }, count, " project", count === 1 ? "" : "s")));
}
function ProjectCard({ p, saved, onSave, onView }) {
  return /* @__PURE__ */ React.createElement("article", { className: "card" }, /* @__PURE__ */ React.createElement("div", { className: "art", style: { background: p.hue } }, /* @__PURE__ */ React.createElement("img", { src: p.img, alt: p.alt, loading: "lazy" })), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("button", { className: "fav", "aria-label": "Save " + p.name + " to shortlist", onClick: () => onSave(p.id) }, saved ? "\u2605" : "\u2606"), /* @__PURE__ */ React.createElement("h3", null, p.name), /* @__PURE__ */ React.createElement("div", { className: "meta" }, p.category, " \xB7 ", p.year), /* @__PURE__ */ React.createElement("p", null, p.blurb), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => onView(p) }, "View project"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: () => onSave(p.id) }, saved ? "Saved" : "Save to shortlist"))));
}
function ProjectModal({ p, saved, onSave, onClose }) {
  if (!p) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "modalback", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "modal", role: "dialog", "aria-modal": "true", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("img", { className: "modalimg", src: p.img, alt: p.alt }), /* @__PURE__ */ React.createElement("h2", null, p.name), /* @__PURE__ */ React.createElement("p", { className: "meta" }, p.category, " \xB7 ", p.year), /* @__PURE__ */ React.createElement("p", null, p.blurb), /* @__PURE__ */ React.createElement("h3", null, "What the studio made"), /* @__PURE__ */ React.createElement("ul", null, p.deliverables.map((d) => /* @__PURE__ */ React.createElement("li", { key: d }, d))), /* @__PURE__ */ React.createElement("h3", null, "What changed"), /* @__PURE__ */ React.createElement("p", null, p.result), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => onSave(p.id) }, saved ? "Saved to shortlist" : "Save to shortlist"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: onClose }, "Close"))));
}
function ShortlistDrawer({ open, items, removeItem, onClose, onStart }) {
  if (!open) return null;
  return /* @__PURE__ */ React.createElement("aside", { className: "drawer", "aria-label": "Your shortlist" }, /* @__PURE__ */ React.createElement("h2", null, "Your shortlist"), items.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "Nothing saved yet. Star a project in the work list and it will wait for you here, even if you close the tab.") : items.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, style: { borderBottom: "1px solid #c9c2b2", padding: ".6rem 0" } }, /* @__PURE__ */ React.createElement("strong", null, p.name), /* @__PURE__ */ React.createElement("div", { className: "meta" }, p.category, " \xB7 ", p.year), /* @__PURE__ */ React.createElement("button", { className: "ghost", style: { marginTop: ".4rem" }, onClick: () => removeItem(p.id) }, "Remove"))), /* @__PURE__ */ React.createElement("div", { className: "row", style: { marginTop: "1rem" } }, /* @__PURE__ */ React.createElement("button", { className: "addbtn", disabled: items.length === 0, onClick: onStart }, "Start a project like these"), /* @__PURE__ */ React.createElement("button", { className: "ghost", onClick: onClose }, "Keep browsing")));
}
function Estimator({ onUseEstimate }) {
  const [type, setType] = useState("Website");
  const [size, setSize] = useState("Standard");
  const [addons, setAddons] = useState([]);
  const [rush, setRush] = useState(false);
  const toggleAddon = (id) => setAddons((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);
  const est = useMemo(() => {
    const base = Math.round(TYPES[type].base * SIZES[size]);
    const addTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
    const rushFee = rush ? Math.round((base + addTotal) * 0.25) : 0;
    return { base, addTotal, rushFee, total: base + addTotal + rushFee };
  }, [type, size, addons, rush]);
  return /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("fieldset", null, /* @__PURE__ */ React.createElement("legend", null, "1 \xB7 What are we making?"), /* @__PURE__ */ React.createElement("label", null, "Project type"), /* @__PURE__ */ React.createElement("select", { value: type, onChange: (e) => setType(e.target.value) }, Object.keys(TYPES).map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t, " \u2014 from ", money(TYPES[t].base)))), /* @__PURE__ */ React.createElement("p", { className: "meta" }, TYPES[type].note), /* @__PURE__ */ React.createElement("label", null, "Project size"), /* @__PURE__ */ React.createElement("select", { value: size, onChange: (e) => setSize(e.target.value) }, Object.keys(SIZES).map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s, " (\xD7", SIZES[s], ")")))), /* @__PURE__ */ React.createElement("fieldset", null, /* @__PURE__ */ React.createElement("legend", null, "2 \xB7 Add-ons"), ADDONS.map((a) => /* @__PURE__ */ React.createElement("label", { className: "addon", key: a.id }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: addons.includes(a.id), onChange: () => toggleAddon(a.id) }), /* @__PURE__ */ React.createElement("span", null, a.label, " \u2014 ", /* @__PURE__ */ React.createElement("strong", null, money(a.price))))), /* @__PURE__ */ React.createElement("label", { className: "addon" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: rush, onChange: (e) => setRush(e.target.checked) }), /* @__PURE__ */ React.createElement("span", null, "Rush timeline, finished in three weeks \u2014 ", /* @__PURE__ */ React.createElement("strong", null, "adds 25%"))))), /* @__PURE__ */ React.createElement("div", { className: "estbox", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("h2", { style: { marginTop: 0 } }, "Your estimate"), /* @__PURE__ */ React.createElement("div", { className: "summary" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, type, " (", size, ")"), /* @__PURE__ */ React.createElement("span", null, money(est.base))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Add-ons"), /* @__PURE__ */ React.createElement("span", null, est.addTotal ? money(est.addTotal) : "None yet")), rush && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Rush (25%)"), /* @__PURE__ */ React.createElement("span", null, money(est.rushFee))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "Estimated total"), /* @__PURE__ */ React.createElement("strong", { className: "big" }, money(est.total)))), /* @__PURE__ */ React.createElement("p", { style: { lineHeight: 1.6 } }, "A starting point for a conversation, not an invoice. The studio confirms a fixed price in writing before any work begins, and half is never asked for up front."), /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => onUseEstimate(type, est.total) }, "Start a project with this estimate")));
}
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ React.createElement("div", { className: "faq" }, /* @__PURE__ */ React.createElement("button", { "aria-expanded": open, onClick: () => setOpen(!open) }, q, " ", open ? "\u2212" : "+"), open && /* @__PURE__ */ React.createElement("p", null, a));
}
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg("Please enter a valid email address.");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("fn_newsletter") || "[]");
    if (saved.includes(email)) {
      setMsg("You are already on the Studio Notes list \u2014 welcome back.");
      return;
    }
    localStorage.setItem("fn_newsletter", JSON.stringify([...saved, email]));
    setMsg("You are in. Studio Notes arrives on the first Friday of the month.");
    setEmail("");
  };
  return /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true }, /* @__PURE__ */ React.createElement("label", { htmlFor: "nl" }, "Studio Notes, monthly"), /* @__PURE__ */ React.createElement("input", { id: "nl", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" }), msg && /* @__PURE__ */ React.createElement("p", { className: msg.startsWith("Please") ? "err" : "" }, msg), /* @__PURE__ */ React.createElement("button", { className: "addbtn", type: "submit", style: { marginTop: ".6rem" } }, "Join Studio Notes"));
}
function ContactForm({ prefill, shortlistNames }) {
  const empty = { name: "", email: "", company: "", type: "Website", budget: "", date: "", message: "" };
  const [f, setF] = useState(empty);
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(null);
  useEffect(() => {
    if (prefill && prefill.type) {
      setF((prev) => ({ ...prev, type: prefill.type, budget: String(prefill.total) }));
    }
  }, [prefill]);
  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email address.";
    if (!f.date) er.date = "Please pick a hoped-for start date.";
    else if (/* @__PURE__ */ new Date(f.date + "T12:00:00") < new Date((/* @__PURE__ */ new Date()).toDateString())) er.date = "That date has already passed \u2014 please pick a future start date.";
    if (f.budget && (isNaN(Number(f.budget)) || Number(f.budget) < 500)) er.budget = "Budgets start at $500 for a small starter project.";
    if (f.message.trim().length < 10) er.message = "Please tell us a little about the project (at least 10 characters).";
    setErrs(er);
    if (Object.keys(er).length) return;
    const ref = "FN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const enquiry = { ref, ...f, shortlist: shortlistNames, total: f.budget ? Number(f.budget) : null };
    const saved = JSON.parse(localStorage.getItem("fn_enquiries") || "[]");
    localStorage.setItem("fn_enquiries", JSON.stringify([...saved, enquiry]));
    setDone(enquiry);
  };
  if (done) {
    return /* @__PURE__ */ React.createElement("div", { className: "ok" }, /* @__PURE__ */ React.createElement("h2", null, "Thank you, ", done.name.split(" ")[0], " \u2014 your project enquiry is in."), /* @__PURE__ */ React.createElement("p", null, "Your reference is ", /* @__PURE__ */ React.createElement("strong", null, done.ref), ". The studio replies to ", done.email, " within two working days with next steps and a fixed-price proposal \u2014 no obligation and no sales call unless you ask for one."), done.shortlist && done.shortlist.length > 0 && /* @__PURE__ */ React.createElement("p", null, "You mentioned these shortlisted projects: ", done.shortlist.join(", "), "."), /* @__PURE__ */ React.createElement("button", { className: "addbtn", onClick: () => {
      setDone(null);
      setF(empty);
    } }, "Send another enquiry"));
  }
  return /* @__PURE__ */ React.createElement("form", { onSubmit: submit, noValidate: true }, /* @__PURE__ */ React.createElement("div", { className: "two" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Your name"), /* @__PURE__ */ React.createElement("input", { value: f.name, onChange: (e) => set("name", e.target.value) }), errs.name && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.name), /* @__PURE__ */ React.createElement("label", null, "Email"), /* @__PURE__ */ React.createElement("input", { value: f.email, onChange: (e) => set("email", e.target.value) }), errs.email && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.email), /* @__PURE__ */ React.createElement("label", null, "Company or project name (optional)"), /* @__PURE__ */ React.createElement("input", { value: f.company, onChange: (e) => set("company", e.target.value) }), /* @__PURE__ */ React.createElement("label", null, "Hoped-for start date"), /* @__PURE__ */ React.createElement("input", { type: "date", value: f.date, onChange: (e) => set("date", e.target.value) }), errs.date && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.date)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Project type"), /* @__PURE__ */ React.createElement("select", { value: f.type, onChange: (e) => set("type", e.target.value) }, Object.keys(TYPES).map((t) => /* @__PURE__ */ React.createElement("option", { key: t, value: t }, t))), /* @__PURE__ */ React.createElement("label", null, "Budget in dollars (optional, prefilled from the estimator)"), /* @__PURE__ */ React.createElement("input", { inputMode: "numeric", value: f.budget, onChange: (e) => set("budget", e.target.value), placeholder: "3800" }), errs.budget && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.budget), /* @__PURE__ */ React.createElement("label", null, "About the project"), /* @__PURE__ */ React.createElement("textarea", { value: f.message, onChange: (e) => set("message", e.target.value), placeholder: "What are you making, who is it for, and what does done look like?" }), errs.message && /* @__PURE__ */ React.createElement("p", { className: "err" }, errs.message))), shortlistNames.length > 0 && /* @__PURE__ */ React.createElement("p", { className: "meta" }, "Your shortlist (", shortlistNames.join(", "), ") will be mentioned with this enquiry."), /* @__PURE__ */ React.createElement("button", { className: "addbtn", type: "submit", style: { marginTop: "1rem" } }, "Send project enquiry"));
}
function App() {
  const [view, setView] = useState("work");
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [shortlist, setShortlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fn_shortlist") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("fn_shortlist", JSON.stringify(shortlist));
  }, [shortlist]);
  const toggleSave = (id) => setShortlist((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const savedItems = PROJECTS.filter((p) => shortlist.includes(p.id));
  const visible = useMemo(() => {
    let list = PROJECTS.filter((p) => (cat === "All" || p.category === cat) && (p.name + " " + p.blurb + " " + p.category).toLowerCase().includes(query.toLowerCase()));
    if (sort === "newest") list = [...list].sort((a, b) => b.year - a.year);
    if (sort === "oldest") list = [...list].sort((a, b) => a.year - b.year);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, query, sort]);
  const useEstimate = (type, total) => {
    setPrefill({ type, total });
    setView("start");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Header, { view, setView, shortCount: shortlist.length, openShortlist: () => setDrawer(true) }), view === "work" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { className: "hero" }, /* @__PURE__ */ React.createElement("h1", null, "Brands and websites, ", /* @__PURE__ */ React.createElement("em", null, "noted in the field"), " and built to last."), /* @__PURE__ */ React.createElement("p", null, "Fieldnotes is a small design studio that starts every project by watching how real people actually use a thing \u2014 then designs the brand and the website around that, in plain language and honest prices."), /* @__PURE__ */ React.createElement("button", { className: "cta", onClick: () => setView("services") }, "Build a live estimate"), /* @__PURE__ */ React.createElement("div", { className: "stats" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "9"), " featured projects"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "4"), " kinds of project"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "2 days"), " reply promise")), /* @__PURE__ */ React.createElement("img", { className: "heroimg", src: "images/hero.jpg", alt: "Design team collaborating around a laptop and sketches in a studio office" })), /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("div", { className: "banner" }, "Demo note: this is a React component app running entirely in your browser. Your shortlist and enquiries save in this browser only \u2014 no account, no real payment, and the studio is fictional."), /* @__PURE__ */ React.createElement("h2", null, "Selected work"), /* @__PURE__ */ React.createElement(FilterBar, { cat, setCat, query, setQuery, sort, setSort, count: visible.length }), visible.length === 0 ? /* @__PURE__ */ React.createElement("p", null, "No projects match that search. Try a different word, or clear the category filter.") : /* @__PURE__ */ React.createElement("div", { className: "grid" }, visible.map((p) => /* @__PURE__ */ React.createElement(ProjectCard, { key: p.id, p, saved: shortlist.includes(p.id), onSave: toggleSave, onView: setSelected }))))), view === "services" && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("h2", null, "Services & a live estimate"), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 640, lineHeight: 1.6 } }, "Every project type below is real studio work: brand identity, websites, e-commerce and editorial design. Change anything in the estimator and the price rebuilds itself \u2014 that is React derived state doing the maths in the open."), /* @__PURE__ */ React.createElement(Estimator, { onUseEstimate: useEstimate })), view === "studio" && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("h2", null, "How the studio works"), /* @__PURE__ */ React.createElement("ol", { className: "process", style: { lineHeight: 1.6, maxWidth: 680 } }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Fieldnotes first."), " The studio watches and listens before it draws \u2014 customers, readers and staff, in their own words."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Design in the open."), " You see real pages early, in Sketch and Webflow first, then built with real code."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Fixed price in writing."), " The estimate becomes a fixed proposal before work starts. It does not quietly grow."), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("strong", null, "Handed over properly."), " Guidelines, files and a plain-language walkthrough, so the work survives the studio.")), /* @__PURE__ */ React.createElement("h2", null, "Common questions"), /* @__PURE__ */ React.createElement(FaqItem, { q: "How long does a website take?", a: "A standard website takes four to six weeks from the fieldnotes visit. The rush option in the estimator brings that to three weeks for a smaller scope." }), /* @__PURE__ */ React.createElement(FaqItem, { q: "Do you write the words as well?", a: "Copywriting is an add-on in the estimator. Many clients add it, because the studio already knows the project from its fieldnotes." }), /* @__PURE__ */ React.createElement(FaqItem, { q: "What do you need from us to start?", a: "One conversation, access to anything that already exists (logos, photos, an old site), and one person who can say yes. The enquiry form is the whole first step." }), /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 440 } }, /* @__PURE__ */ React.createElement(NewsletterForm, null))), view === "start" && /* @__PURE__ */ React.createElement("main", { className: "wrap" }, /* @__PURE__ */ React.createElement("h2", null, "Start a project"), /* @__PURE__ */ React.createElement("p", { style: { maxWidth: 640, lineHeight: 1.6 } }, "Tell the studio what you are making. The form checks itself as honestly as the estimator prices \u2014 and if you built an estimate, it is already filled in below."), /* @__PURE__ */ React.createElement(ContactForm, { prefill, shortlistNames: savedItems.map((p) => p.name) })), /* @__PURE__ */ React.createElement(ProjectModal, { p: selected, saved: selected ? shortlist.includes(selected.id) : false, onSave: toggleSave, onClose: () => setSelected(null) }), /* @__PURE__ */ React.createElement(ShortlistDrawer, { open: drawer, items: savedItems, removeItem: toggleSave, onClose: () => setDrawer(false), onStart: () => {
    setDrawer(false);
    setView("start");
  } }), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("p", null, "Fieldnotes Studio \u2014 a fictional brand & web design studio. Original portfolio concept by Brittany Nation \xB7 Built with React components, HTML and CSS \xB7 Sketch / Webflow design workflow")));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
