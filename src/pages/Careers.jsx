import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand, SectionHead } from "../components/page-parts";
import { OPEN_ROLES, VALUES } from "../data/company";

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Open roles at Mappir Dev — GIS developers, mobile engineers and survey data specialists. Rawalpindi-based, remote-friendly."
        path="/careers"
      />
      <PageHero
        eyebrow="Careers"
        title="Build the systems that map the world"
        lead="We work on land registries, survey pipelines and field devices that go into production and stay there. If that sounds like your kind of problem, we'd like to talk."
        trail={[{ label: "Careers" }]}
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Open roles" title="Currently hiring" />
          <div className="roles">
            {OPEN_ROLES.map((r, i) => (
              <AnimSection key={r.slug} delay={i * 70}>
                <Link className="role-row" to={`/careers/${r.slug}`}>
                  <div className="role-row__main">
                    <h3>{r.title}</h3>
                    <p>{r.summary}</p>
                  </div>
                  <div className="role-row__meta">
                    <span className="tag">{r.type}</span>
                    <span className="tag">{r.location}</span>
                  </div>
                  <Icon name="arrowRight" size={18} className="role-row__arrow" />
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt dotted">
        <div className="container">
          <SectionHead eyebrow="How we work" title="What you can expect" />
          <div className="about__grid">
            {VALUES.map((v, i) => (
              <AnimSection key={v.title} delay={i * 80} className="sector">
                <span className="chip chip--plain">
                  <Icon name={v.icon} size={20} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Don't see your role?"
        title="We're always glad to meet good people"
        body="Send us your CV and a note about what you'd want to work on. If there's a fit, we'll make one."
        primary={{ to: "/contact", label: "Get in touch" }}
        secondary={{ to: "/about/team", label: "Meet the team" }}
      />
    </>
  );
}
