import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { IMG } from "../data/images";
import { AnimSection, Eyebrow, Btn } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { SURVEYS } from "../data/surveys";

export default function Surveys() {
  return (
    <>
      <Seo
        title="Survey & Data Acquisition"
        description="Drone, topographic, land, hydrographic and building surveys plus remote sensing — delivered to national standards with verified accuracy."
        path="/surveys"
      />
      <PageHero
        eyebrow="Field services"
        title="Survey & data acquisition"
        lead="From aerial drone photogrammetry to sub-centimetre GNSS ground control — every survey delivered with precision, speed and full compliance, and verified against independent control."
        trail={[{ label: "Surveys" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {SURVEYS.map((s, i) => (
              <AnimSection key={s.slug} delay={(i % 3) * 80}>
                <Link className="survey-card" to={`/surveys/${s.slug}`}>
                  <img src={s.image} alt={s.title} loading="lazy" decoding="async" />
                  <div className="survey-card__overlay">
                    <h3>{s.title}</h3>
                    <p>{s.summary}</p>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>

          <AnimSection delay={120}>
            <div className="feature-banner" style={{ backgroundImage: `url(${IMG.drone})` }}>
              <div className="feature-banner__inner">
                <div>
                  <Eyebrow light>Featured capability</Eyebrow>
                  <h3>Sub-centimetre drone mapping with RTK/PPK technology</h3>
                </div>
                <Btn to="/surveys/drone" variant="primary">
                  Request a survey <Icon name="arrowRight" size={17} />
                </Btn>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      <CtaBand
        eyebrow="Book a survey"
        title="Have a site that needs surveying?"
        body="Send us the location, the accuracy you need and the deliverables. We'll come back with a method and a price."
        primary={{ to: "/request-a-quote", label: "Request a survey" }}
        secondary={{ to: "/work", label: "See survey work" }}
      />
    </>
  );
}
