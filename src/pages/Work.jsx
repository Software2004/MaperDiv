import { useState } from "react";
import Seo from "../lib/Seo";
import { AnimSection, LinkMore } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { WORK, WORK_SECTORS } from "../data/work";

export default function Work() {
  const [sector, setSector] = useState("All");
  const filtered = sector === "All" ? WORK : WORK.filter((w) => w.sector === sector);

  return (
    <>
      <Seo
        title="Selected Work"
        description="Cadastral programmes, drone survey corridors, IoT platforms and GIS systems delivered for governments, infrastructure consortia and enterprises."
        path="/work"
      />
      <PageHero
        eyebrow="Selected work"
        title="Projects that scaled"
        lead="A snapshot of programmes we've delivered for governments, infrastructure consortia and enterprises — with the numbers that came out of them."
        trail={[{ label: "Work" }]}
      />

      <section className="section">
        <div className="container">
          <div className="filter-bar" role="tablist" aria-label="Filter work by sector">
            {["All", ...WORK_SECTORS].map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={sector === s}
                className={`chip-btn${sector === s ? " chip-btn--on" : ""}`}
                onClick={() => setSector(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((c, i) => (
              <AnimSection key={c.slug} delay={(i % 3) * 80}>
                <article className="case-card">
                  <div className="case-card__media">
                    <img src={c.image} alt={c.title} loading="lazy" decoding="async" />
                    <span className="case-card__tag">{c.tag}</span>
                  </div>
                  <div className="case-card__body">
                    <h3>{c.title}</h3>
                    <div className="case-card__result">
                      <span className="case-card__result-num">{c.result}</span>
                      <span className="case-card__result-label">{c.resultLabel}</span>
                    </div>
                    <p>{c.summary}</p>
                    <LinkMore to={`/work/${c.slug}`}>Read the case study</LinkMore>
                  </div>
                </article>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your project"
        title="Could your programme be the next one here?"
        body="We take on work that has to be accurate, compliant and delivered on a real timeline."
        primary={{ to: "/request-a-quote", label: "Start a project" }}
        secondary={{ to: "/services", label: "Browse services" }}
      />
    </>
  );
}
