/* =====================================================================
   Fieldnotes Studio — a fictional brand & web design studio
   COURSE SKILL, DEEPENED (Step 5 — React, second project)

   Saffron & Sage Kitchen (step 5) used React for one menu, one box and
   one checkout. This project deepens the same skill in four ways:
     1. MULTI-VIEW APP — four views (Work / Services / Studio / Start a
        Project) held in a single `view` state in App. Switching views
        never reloads the page; it is conditional rendering at scale.
     2. DERIVED STATE WITH useMemo — the filtered project list AND the
        live project estimate are both computed from state, not stored.
        Change a filter or tick an add-on and the UI re-derives itself.
     3. LIFTING STATE UP — the shortlist lives in App (the nearest common
        parent) so the header count, the work cards, the drawer and the
        contact form all read and change the same list.
     4. CONTROLLED FORMS EVERYWHERE — estimator inputs, the enquiry form
        and the newsletter are all bound to state and validated on
        submit, ending in a real confirmation state.
   Persistence uses useEffect + localStorage, exactly as in step 5.
   ===================================================================== */
const { useState, useEffect, useMemo } = React;

/* ---- Data: the studio's portfolio, rendered by components ---------- */
const PROJECTS = [
  { id: "p1", name: "Fern Hollow Skincare", category: "Brand", year: 2026, hue: "#DCE8D0", initials: "FH", img: "images/p1.jpg", alt: "Five minimalist skincare jars with patterned labels", blurb: "A calm identity and packaging system for a small-batch skincare maker.", deliverables: ["Logo and identity", "Packaging labels", "Brand guidelines"], result: "Launch range sold out its first small batch in three weeks." },
  { id: "p2", name: "Atlas Roast Club", category: "E-Commerce", year: 2026, hue: "#EAD9C2", initials: "AR", img: "images/p2.jpg", alt: "Coffee beans being poured from a gold scoop into a cloth bag", blurb: "A subscription storefront for a coffee club that ships on roast day.", deliverables: ["Store design and build", "Subscription flow", "Email templates"], result: "Checkout shortened from five steps to two." },
  { id: "p3", name: "The Quiet Journal", category: "Editorial", year: 2025, hue: "#D8DCE8", initials: "QJ", img: "images/p3.jpg", alt: "Newspapers and a cup of coffee on a white table", blurb: "A slow-reading magazine site designed for long essays and quiet margins.", deliverables: ["Editorial templates", "Reading experience", "Archive search"], result: "Average reading time rose from two minutes to seven." },
  { id: "p4", name: "North Pier Hotels", category: "Web", year: 2026, hue: "#CDE3E6", initials: "NP", img: "images/p4.jpg", alt: "White seaside hotel buildings beside a beach and bay", blurb: "A direct-booking website for a family-run pair of seaside hotels.", deliverables: ["Website design and build", "Booking flow", "Local SEO setup"], result: "Direct bookings replaced a third of agency bookings in a season." },
  { id: "p5", name: "Bloom Box Market", category: "E-Commerce", year: 2025, hue: "#F3D9DE", initials: "BB", img: "images/p5.jpg", alt: "Florist arranging white roses and greenery in a metal vase", blurb: "A flower subscription shop with a build-your-own bouquet picker.", deliverables: ["Store design and build", "Bouquet picker", "Gift messaging"], result: "Gift orders became the shop's best-selling line." },
  { id: "p6", name: "Harbor Legal", category: "Web", year: 2025, hue: "#DDD6C8", initials: "HL", img: "images/p6.jpg", alt: "Lawyer’s desk with documents, a laptop, and a Lady Justice statue", blurb: "A plain-language website for a small law practice that hates jargon.", deliverables: ["Website design and build", "Plain-language rewrite", "Intake form"], result: "Enquiries doubled while phone interruptions fell." },
  { id: "p7", name: "Studio Marrow", category: "Brand", year: 2024, hue: "#E6D8F0", initials: "SM", img: "images/p7.jpg", alt: "Person working at a workbench in a furniture workshop", blurb: "A bold identity for a furniture workshop built from reclaimed timber.", deliverables: ["Logo and identity", "Workshop signage", "Lookbook"], result: "The workshop's waiting list grew to four months." },
  { id: "p8", name: "Field & Folk Festival", category: "Editorial", year: 2024, hue: "#F0E3B8", initials: "FF", img: "images/p8.jpg", alt: "Crowd facing a colorful outdoor festival stage", blurb: "A programme and poster system for a weekend folk festival.", deliverables: ["Poster system", "Printed programme", "Line-up site"], result: "The festival sold out for the first time in six years." },
  { id: "p9", name: "Copperline Bikes", category: "Web", year: 2024, hue: "#D8E8DC", initials: "CB", img: "images/p9.jpg", alt: "Bicycle mechanic assembling a bicycle in a workshop", blurb: "A service-booking website for a bike repair shop with honest pricing.", deliverables: ["Website design and build", "Repair booking", "Price guide"], result: "Online bookings filled the workshop diary two weeks out." },
];
const CATEGORIES = ["All", "Brand", "Web", "E-Commerce", "Editorial"];

/* Estimator data: base price by project type, size multiplier, add-ons */
const TYPES = {
  "Brand Identity": { base: 2400, note: "Logo, identity system and guidelines" },
  "Website": { base: 3800, note: "Design and build, up to five pages included" },
  "E-Commerce": { base: 5200, note: "Store design, build and checkout flow" },
  "Editorial": { base: 1800, note: "Templates and a reading-first layout system" },
};
const SIZES = { "Starter": 1, "Standard": 1.4, "Large": 1.9 };
const ADDONS = [
  { id: "copy", label: "Copywriting for every page", price: 650 },
  { id: "seo", label: "Search setup (titles, descriptions, sitemap)", price: 450 },
  { id: "photo", label: "Photography direction for one shoot day", price: 800 },
  { id: "care", label: "First three months of care and updates", price: 540 },
];

const money = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ---- Header: props carry view, shortlist count and callbacks ------- */
function Header({ view, setView, shortCount, openShortlist }) {
  return (
    <React.Fragment>
      <div className="topbar">Now booking projects starting next month · Estimates are honest starting points, never invoices</div>
      <header className="site">
        <nav className="nav">
          <button className="logo" style={{ background: "none", border: "none" }} onClick={() => setView("work")}>Fieldnotes <span>Studio</span></button>
          <div className="navlinks">
            <button className={view === "work" ? "active" : ""} onClick={() => setView("work")}>Work</button>
            <button className={view === "services" ? "active" : ""} onClick={() => setView("services")}>Services &amp; Estimate</button>
            <button className={view === "studio" ? "active" : ""} onClick={() => setView("studio")}>Studio</button>
            <button className={view === "start" ? "active" : ""} onClick={() => setView("start")}>Start a Project</button>
            <button className="shortlistbtn" onClick={openShortlist}>Shortlist ({shortCount})</button>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

/* ---- FilterBar: controlled search / category / sort ---------------- */
function FilterBar({ cat, setCat, query, setQuery, sort, setSort, count }) {
  return (
    <div>
      <div className="filters" role="search">
        <input aria-label="Search projects" placeholder="Search projects…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Sort projects" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name">Name A to Z</option>
        </select>
      </div>
      <div className="filters">
        {CATEGORIES.map((c) => (
          <button key={c} className={"chip" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>{c}</button>
        ))}
        <span aria-live="polite">{count} project{count === 1 ? "" : "s"}</span>
      </div>
    </div>
  );
}

/* ---- ProjectCard: one project; save + details flow up via props ---- */
function ProjectCard({ p, saved, onSave, onView }) {
  return (
    <article className="card">
      <div className="art" style={{ background: p.hue }}><img src={p.img} alt={p.alt} loading="lazy" /></div>
      <div className="body">
        <button className="fav" aria-label={"Save " + p.name + " to shortlist"} onClick={() => onSave(p.id)}>{saved ? "★" : "☆"}</button>
        <h3>{p.name}</h3>
        <div className="meta">{p.category} · {p.year}</div>
        <p>{p.blurb}</p>
        <div className="row">
          <button className="addbtn" onClick={() => onView(p)}>View project</button>
          <button className="ghost" onClick={() => onSave(p.id)}>{saved ? "Saved" : "Save to shortlist"}</button>
        </div>
      </div>
    </article>
  );
}

/* ---- ProjectModal: detail dialog for one project ------------------- */
function ProjectModal({ p, saved, onSave, onClose }) {
  if (!p) return null;
  return (
    <div className="modalback" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <img className="modalimg" src={p.img} alt={p.alt} />
        <h2>{p.name}</h2>
        <p className="meta">{p.category} · {p.year}</p>
        <p>{p.blurb}</p>
        <h3>What the studio made</h3>
        <ul>{p.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
        <h3>What changed</h3>
        <p>{p.result}</p>
        <div className="row">
          <button className="addbtn" onClick={() => onSave(p.id)}>{saved ? "Saved to shortlist" : "Save to shortlist"}</button>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ---- ShortlistDrawer: saved projects, persisted by App ------------- */
function ShortlistDrawer({ open, items, removeItem, onClose, onStart }) {
  if (!open) return null;
  return (
    <aside className="drawer" aria-label="Your shortlist">
      <h2>Your shortlist</h2>
      {items.length === 0 ? (
        <p>Nothing saved yet. Star a project in the work list and it will wait for you here, even if you close the tab.</p>
      ) : items.map((p) => (
        <div key={p.id} style={{ borderBottom: "1px solid #c9c2b2", padding: ".6rem 0" }}>
          <strong>{p.name}</strong>
          <div className="meta">{p.category} · {p.year}</div>
          <button className="ghost" style={{ marginTop: ".4rem" }} onClick={() => removeItem(p.id)}>Remove</button>
        </div>
      ))}
      <div className="row" style={{ marginTop: "1rem" }}>
        <button className="addbtn" disabled={items.length === 0} onClick={onStart}>Start a project like these</button>
        <button className="ghost" onClick={onClose}>Keep browsing</button>
      </div>
    </aside>
  );
}

/* ---- Estimator: the estimate is DERIVED state (useMemo in App-less
        local state here): every input is controlled, and the breakdown
        recomputes on each change — there is no "calculate" button
        because React re-renders from state automatically. ------------- */
function Estimator({ onUseEstimate }) {
  const [type, setType] = useState("Website");
  const [size, setSize] = useState("Standard");
  const [addons, setAddons] = useState([]);
  const [rush, setRush] = useState(false);

  const toggleAddon = (id) => setAddons((a) => a.includes(id) ? a.filter((x) => x !== id) : [...a, id]);

  /* useMemo: the breakdown only recomputes when an input changes */
  const est = useMemo(() => {
    const base = Math.round(TYPES[type].base * SIZES[size]);
    const addTotal = ADDONS.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0);
    const rushFee = rush ? Math.round((base + addTotal) * 0.25) : 0;
    return { base, addTotal, rushFee, total: base + addTotal + rushFee };
  }, [type, size, addons, rush]);

  return (
    <div className="two">
      <div>
        <fieldset>
          <legend>1 · What are we making?</legend>
          <label>Project type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.keys(TYPES).map((t) => <option key={t} value={t}>{t} — from {money(TYPES[t].base)}</option>)}
          </select>
          <p className="meta">{TYPES[type].note}</p>
          <label>Project size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            {Object.keys(SIZES).map((s) => <option key={s} value={s}>{s} (×{SIZES[s]})</option>)}
          </select>
        </fieldset>
        <fieldset>
          <legend>2 · Add-ons</legend>
          {ADDONS.map((a) => (
            <label className="addon" key={a.id}>
              <input type="checkbox" checked={addons.includes(a.id)} onChange={() => toggleAddon(a.id)} />
              <span>{a.label} — <strong>{money(a.price)}</strong></span>
            </label>
          ))}
          <label className="addon">
            <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
            <span>Rush timeline, finished in three weeks — <strong>adds 25%</strong></span>
          </label>
        </fieldset>
      </div>
      <div className="estbox" aria-live="polite">
        <h2 style={{ marginTop: 0 }}>Your estimate</h2>
        <div className="summary">
          <div><span>{type} ({size})</span><span>{money(est.base)}</span></div>
          <div><span>Add-ons</span><span>{est.addTotal ? money(est.addTotal) : "None yet"}</span></div>
          {rush && <div><span>Rush (25%)</span><span>{money(est.rushFee)}</span></div>}
          <div><span>Estimated total</span><strong className="big">{money(est.total)}</strong></div>
        </div>
        <p style={{ lineHeight: 1.6 }}>A starting point for a conversation, not an invoice. The studio confirms a fixed price in writing before any work begins, and half is never asked for up front.</p>
        <button className="addbtn" onClick={() => onUseEstimate(type, est.total)}>Start a project with this estimate</button>
      </div>
    </div>
  );
}

/* ---- FaqItem + NewsletterForm: small stateful widgets -------------- */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq">
      <button aria-expanded={open} onClick={() => setOpen(!open)}>{q} {open ? "−" : "+"}</button>
      {open && <p>{a}</p>}
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMsg("Please enter a valid email address."); return; }
    const saved = JSON.parse(localStorage.getItem("fn_newsletter") || "[]");
    if (saved.includes(email)) { setMsg("You are already on the Studio Notes list — welcome back."); return; }
    localStorage.setItem("fn_newsletter", JSON.stringify([...saved, email]));
    setMsg("You are in. Studio Notes arrives on the first Friday of the month.");
    setEmail("");
  };
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="nl">Studio Notes, monthly</label>
      <input id="nl" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      {msg && <p className={msg.startsWith("Please") ? "err" : ""}>{msg}</p>}
      <button className="addbtn" type="submit" style={{ marginTop: ".6rem" }}>Join Studio Notes</button>
    </form>
  );
}

/* ---- ContactForm: controlled, validated, ends in confirmation ------ */
function ContactForm({ prefill, shortlistNames }) {
  const empty = { name: "", email: "", company: "", type: "Website", budget: "", date: "", message: "" };
  const [f, setF] = useState(empty);
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(null);

  /* When the estimator hands over a type + total, prefill the form —
     an effect reacting to a prop change from a sibling component. */
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
    else if (new Date(f.date + "T12:00:00") < new Date(new Date().toDateString())) er.date = "That date has already passed — please pick a future start date.";
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
    return (
      <div className="ok">
        <h2>Thank you, {done.name.split(" ")[0]} — your project enquiry is in.</h2>
        <p>Your reference is <strong>{done.ref}</strong>. The studio replies to {done.email} within two working days with next steps and a fixed-price proposal — no obligation and no sales call unless you ask for one.</p>
        {done.shortlist && done.shortlist.length > 0 && <p>You mentioned these shortlisted projects: {done.shortlist.join(", ")}.</p>}
        <button className="addbtn" onClick={() => { setDone(null); setF(empty); }}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="two">
        <div>
          <label>Your name</label>
          <input value={f.name} onChange={(e) => set("name", e.target.value)} />
          {errs.name && <p className="err">{errs.name}</p>}
          <label>Email</label>
          <input value={f.email} onChange={(e) => set("email", e.target.value)} />
          {errs.email && <p className="err">{errs.email}</p>}
          <label>Company or project name (optional)</label>
          <input value={f.company} onChange={(e) => set("company", e.target.value)} />
          <label>Hoped-for start date</label>
          <input type="date" value={f.date} onChange={(e) => set("date", e.target.value)} />
          {errs.date && <p className="err">{errs.date}</p>}
        </div>
        <div>
          <label>Project type</label>
          <select value={f.type} onChange={(e) => set("type", e.target.value)}>
            {Object.keys(TYPES).map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <label>Budget in dollars (optional, prefilled from the estimator)</label>
          <input inputMode="numeric" value={f.budget} onChange={(e) => set("budget", e.target.value)} placeholder="3800" />
          {errs.budget && <p className="err">{errs.budget}</p>}
          <label>About the project</label>
          <textarea value={f.message} onChange={(e) => set("message", e.target.value)} placeholder="What are you making, who is it for, and what does done look like?" />
          {errs.message && <p className="err">{errs.message}</p>}
        </div>
      </div>
      {shortlistNames.length > 0 && <p className="meta">Your shortlist ({shortlistNames.join(", ")}) will be mentioned with this enquiry.</p>}
      <button className="addbtn" type="submit" style={{ marginTop: "1rem" }}>Send project enquiry</button>
    </form>
  );
}

/* ---- App: owns view, shortlist and modal state (lifted up) --------- */
function App() {
  const [view, setView] = useState("work");
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [prefill, setPrefill] = useState(null);
  const [shortlist, setShortlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fn_shortlist") || "[]"); } catch { return []; }
  });

  /* useEffect: persist the shortlist whenever it changes */
  useEffect(() => { localStorage.setItem("fn_shortlist", JSON.stringify(shortlist)); }, [shortlist]);

  const toggleSave = (id) => setShortlist((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const savedItems = PROJECTS.filter((p) => shortlist.includes(p.id));

  /* useMemo: filtering and sorting are derived from state, not stored */
  const visible = useMemo(() => {
    let list = PROJECTS.filter((p) => (cat === "All" || p.category === cat) &&
      (p.name + " " + p.blurb + " " + p.category).toLowerCase().includes(query.toLowerCase()));
    if (sort === "newest") list = [...list].sort((a, b) => b.year - a.year);
    if (sort === "oldest") list = [...list].sort((a, b) => a.year - b.year);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [cat, query, sort]);

  const useEstimate = (type, total) => { setPrefill({ type, total }); setView("start"); };

  return (
    <React.Fragment>
      <Header view={view} setView={setView} shortCount={shortlist.length} openShortlist={() => setDrawer(true)} />

      {view === "work" && (
        <React.Fragment>
          <section className="hero">
            <h1>Brands and websites, <em>noted in the field</em> and built to last.</h1>
            <p>Fieldnotes is a small design studio that starts every project by watching how real people actually use a thing — then designs the brand and the website around that, in plain language and honest prices.</p>
            <button className="cta" onClick={() => setView("services")}>Build a live estimate</button>
            <div className="stats">
              <div><strong>9</strong> featured projects</div>
              <div><strong>4</strong> kinds of project</div>
              <div><strong>2 days</strong> reply promise</div>
            </div>
            <img className="heroimg" src="images/hero.jpg" alt="Design team collaborating around a laptop and sketches in a studio office" />
          </section>
          <main className="wrap">
            <div className="banner">Demo note: this is a React component app running entirely in your browser. Your shortlist and enquiries save in this browser only — no account, no real payment, and the studio is fictional.</div>
            <h2>Selected work</h2>
            <FilterBar cat={cat} setCat={setCat} query={query} setQuery={setQuery} sort={sort} setSort={setSort} count={visible.length} />
            {visible.length === 0 ? (
              <p>No projects match that search. Try a different word, or clear the category filter.</p>
            ) : (
              <div className="grid">
                {visible.map((p) => <ProjectCard key={p.id} p={p} saved={shortlist.includes(p.id)} onSave={toggleSave} onView={setSelected} />)}
              </div>
            )}
          </main>
        </React.Fragment>
      )}

      {view === "services" && (
        <main className="wrap">
          <h2>Services &amp; a live estimate</h2>
          <p style={{ maxWidth: 640, lineHeight: 1.6 }}>Every project type below is real studio work: brand identity, websites, e-commerce and editorial design. Change anything in the estimator and the price rebuilds itself — that is React derived state doing the maths in the open.</p>
          <Estimator onUseEstimate={useEstimate} />
        </main>
      )}

      {view === "studio" && (
        <main className="wrap">
          <h2>How the studio works</h2>
          <ol className="process" style={{ lineHeight: 1.6, maxWidth: 680 }}>
            <li><strong>Fieldnotes first.</strong> The studio watches and listens before it draws — customers, readers and staff, in their own words.</li>
            <li><strong>Design in the open.</strong> You see real pages early, in Sketch and Webflow first, then built with real code.</li>
            <li><strong>Fixed price in writing.</strong> The estimate becomes a fixed proposal before work starts. It does not quietly grow.</li>
            <li><strong>Handed over properly.</strong> Guidelines, files and a plain-language walkthrough, so the work survives the studio.</li>
          </ol>
          <h2>Common questions</h2>
          <FaqItem q="How long does a website take?" a="A standard website takes four to six weeks from the fieldnotes visit. The rush option in the estimator brings that to three weeks for a smaller scope." />
          <FaqItem q="Do you write the words as well?" a="Copywriting is an add-on in the estimator. Many clients add it, because the studio already knows the project from its fieldnotes." />
          <FaqItem q="What do you need from us to start?" a="One conversation, access to anything that already exists (logos, photos, an old site), and one person who can say yes. The enquiry form is the whole first step." />
          <div style={{ maxWidth: 440 }}><NewsletterForm /></div>
        </main>
      )}

      {view === "start" && (
        <main className="wrap">
          <h2>Start a project</h2>
          <p style={{ maxWidth: 640, lineHeight: 1.6 }}>Tell the studio what you are making. The form checks itself as honestly as the estimator prices — and if you built an estimate, it is already filled in below.</p>
          <ContactForm prefill={prefill} shortlistNames={savedItems.map((p) => p.name)} />
        </main>
      )}

      <ProjectModal p={selected} saved={selected ? shortlist.includes(selected.id) : false} onSave={toggleSave} onClose={() => setSelected(null)} />
      <ShortlistDrawer open={drawer} items={savedItems} removeItem={toggleSave} onClose={() => setDrawer(false)} onStart={() => { setDrawer(false); setView("start"); }} />
      <footer>
        <p>Fieldnotes Studio — a fictional brand &amp; web design studio. Original portfolio concept by Brittany Nation · Built with React components, HTML and CSS · Sketch / Webflow design workflow</p>
      </footer>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
