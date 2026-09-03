import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { INDUSTRIES } from "../data/industries";

export default function Industries() {
  return (
    <>
      <Seo
        title="Industries"
        description="Government, infrastructure, environmental and enterprise GIS — how Mappir Dev serves the sectors that run on spatial data."
        path="/industries"
      />
      <PageHero
        eyebrow="Who we serve"
        title="Built for the sectors that run on spatial data"
        lead="Each sector brings its own standards, scale and stakes. These are the ones we know deeply."
        trail={[{ label: "Industries" }]}
      />

      <section className="section">
        <div className="container">
          <div className="feature-list">
            {INDUSTRIES.map((item, i) => (
              <AnimSection key={item.slug} delay={(i % 2) * 90}>
                <Link className="feature-row" to={`/industries/${item.slug}`}>
                  <div className="feature-row__media">
                    <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                  </div>
                  <div className="feature-row__body">
                    <span className="chip chip--plain">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <h2>{item.title}</h2>
                    <p>{item.body[0]}</p>
                    <span className="link-more">
                      Explore {item.title.toLowerCase()} <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your sector"
        title="Working in a sector that isn't listed?"
        body="If it runs on maps, parcels, assets or sensors, we can probably help. Tell us the problem."
        primary={{ to: "/contact", label: "Talk to an expert" }}
        secondary={{ to: "/services", label: "Browse services" }}
      />
    </>
  );
}
