import { NavLink, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { INSIGHTS } from "../data/insights";

const TABS = [
  { label: "All articles", to: "/insights", kind: null },
  { label: "Guides & explainers", to: "/insights/guides", kind: "guide" },
  { label: "News", to: "/insights/news", kind: "news" },
];

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function Insights({ kind = null }) {
  const posts = kind
    ? INSIGHTS.filter((p) => p.kind === kind)
    : INSIGHTS.filter((p) => p.kind !== "news");
  const active = TABS.find((t) => t.kind === kind) || TABS[0];

  return (
    <>
      <Seo
        title={kind ? `${active.label} — Insights` : "Insights"}
        description="Field notes, guides and news on GIS, surveying, cadastral mapping and geospatial technology from the Mappir Dev team."
        path={active.to}
      />
      <PageHero
        eyebrow="Insights"
        title="From the field notes"
        lead="Practical writing on accuracy, land administration, field workflows and the technology we build — plus company news."
        trail={[{ label: "Insights" }]}
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end
                className={({ isActive }) => `chip-btn${isActive ? " chip-btn--on" : ""}`}
              >
                {t.label}
              </NavLink>
            ))}
          </div>

          <div className="grid-3">
            {posts.map((p, i) => (
              <AnimSection key={p.slug} delay={(i % 3) * 80}>
                <Link className="insight-card" to={`/insights/${p.slug}`}>
                  <div className="insight-card__media">
                    <img src={p.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="insight-card__body">
                    <div className="insight-card__meta">
                      <span className="tag tag--solid">{p.tag}</span>
                      <span>
                        {fmtDate(p.date)} · {p.read}
                      </span>
                    </div>
                    <h3>{p.title}</h3>
                    <p className="insight-card__excerpt">{p.excerpt}</p>
                    <span className="link-more">
                      Read <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Stay in touch"
        title="Working on something spatial?"
        body="If a project on this list sounds like yours, we'd like to hear about it."
        primary={{ to: "/contact", label: "Get in touch" }}
        secondary={{ to: "/work", label: "See our work" }}
      />
    </>
  );
}
