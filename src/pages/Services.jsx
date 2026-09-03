import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand, SectionHead } from "../components/page-parts";
import { SERVICES } from "../data/services";
import { STEPS } from "../data/company";

export default function Services() {
  return (
    <>
      <Seo
        title="Technology Services"
        description="GIS web development, mobile GIS, custom software, analytics dashboards and IoT — engineered for precision and scale."
        path="/services"
      />
      <PageHero
        eyebrow="What we build"
        title="Technology services"
        lead="Comprehensive GIS, software and IoT solutions engineered for precision, scale and real-world impact. Explore each capability, or tell us what you need built."
        trail={[{ label: "Services" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.slug} delay={(i % 3) * 80}>
                <Link className="svc-card" to={`/services/${s.slug}`}>
                  <span className="chip chip--lg">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.summary}</p>
                  <div className="tags">
                    {s.tags.slice(0, 4).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="svc-card__more">
                    Explore <Icon name="arrowRight" size={15} />
                  </span>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt dotted">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="A repeatable delivery model"
            lead="Accuracy, compliance and timelines stay in view at every stage — from first workshop to long-term support."
          />
          <div className="steps">
            {STEPS.map((s, i) => (
              <AnimSection key={s.title} delay={i * 90} className="step">
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="chip chip--plain">
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service you need?"
        body="Describe the problem and the outcome you're after. We'll scope the right mix of GIS, software, survey and IoT work."
        primary={{ to: "/contact", label: "Talk to an expert" }}
        secondary={{ to: "/work", label: "See our work" }}
      />
    </>
  );
}
