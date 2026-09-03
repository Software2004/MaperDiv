import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection, Stat, Btn } from "../components/primitives";
import { PageHero, CtaBand, SectionHead } from "../components/page-parts";
import { STATS, VALUES } from "../data/company";
import { INDUSTRIES } from "../data/industries";

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Mappir Dev is a full-spectrum geospatial technology company — GIS engineers, surveyors and software architects, trusted across 28 countries."
        path="/about"
      />
      <PageHero
        eyebrow="Our story"
        title="Built by geospatial engineers, for the world"
        lead="Mappir Dev was founded by GIS engineers, surveyors and software architects who saw the gap between traditional survey firms and modern technology teams — and built a company to close it."
        trail={[{ label: "About" }]}
      />

      <section className="section">
        <div className="container about">
          <AnimSection className="about__copy">
            <p className="lead">
              Over 12 years we&rsquo;ve grown into a full-spectrum geospatial technology company —
              trusted by governments, infrastructure firms and enterprises across 28 countries.
            </p>
            <p className="lead">
              We believe spatial data is the backbone of smart infrastructure, effective governance
              and intelligent business. Our mission is to make it accessible, actionable and
              beautiful — from the field crew with a GNSS rover to the minister looking at a
              dashboard.
            </p>
            <div className="about__cta-row">
              <Btn to="/about/team" variant="ghost">
                Meet the team
              </Btn>
              <Btn to="/careers" variant="ghost">
                Careers
              </Btn>
            </div>
          </AnimSection>

          <div className="about__stats">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} size="md" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt dotted">
        <div className="container">
          <SectionHead eyebrow="What we stand for" title="How we work, in four commitments" />
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

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Who we serve"
            title="The sectors we know deeply"
            lead="Each with its own standards, scale and stakes."
          />
          <div className="about__grid">
            {INDUSTRIES.map((item, i) => (
              <AnimSection key={item.slug} delay={i * 80}>
                <Link className="sector" to={`/industries/${item.slug}`}>
                  <span className="chip chip--plain">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.tagline}</p>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
