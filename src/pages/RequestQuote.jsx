import { useSearchParams } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero } from "../components/page-parts";
import ContactForm from "../components/ContactForm";

const WHAT_HAPPENS = [
  { icon: "mail", t: "We read it", d: "A real person reviews your request within one business day." },
  { icon: "search", t: "We scope it", d: "A short call to confirm data sources, accuracy targets and constraints." },
  { icon: "fileText", t: "You get a proposal", d: "A costed approach with method, deliverables and a timeline." },
];

export default function RequestQuote() {
  const [params] = useSearchParams();
  const defaultService = params.get("service") || "";

  return (
    <>
      <Seo
        title="Request a Quote"
        description="Request a quote for GIS development, a survey, a cadastral programme or an IoT build. Costed proposal with method, deliverables and timeline."
        path="/request-a-quote"
      />
      <PageHero
        eyebrow="Start a project"
        title="Request a quote"
        lead="The more you can tell us about scope, timeline and the accuracy you need, the sharper the proposal we can send back."
        trail={[{ label: "Request a quote" }]}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <AnimSection className="contact-info">
              <h2 className="quote-side__title">What happens next</h2>
              <ol className="quote-steps">
                {WHAT_HAPPENS.map((s, i) => (
                  <li key={s.t}>
                    <span className="quote-steps__num">{i + 1}</span>
                    <span className="chip chip--plain">
                      <Icon name={s.icon} size={18} />
                    </span>
                    <div>
                      <strong>{s.t}</strong>
                      <p>{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </AnimSection>

            <AnimSection delay={100}>
              <ContactForm defaultService={defaultService} />
            </AnimSection>
          </div>
        </div>
      </section>
    </>
  );
}
