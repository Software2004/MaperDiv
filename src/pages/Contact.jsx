import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero } from "../components/page-parts";
import ContactForm from "../components/ContactForm";
import { ORG } from "../data/site";

const CONTACT_ITEMS = [
  {
    icon: "mapPin",
    label: "Location",
    val: ORG.location,
    href: ORG.mapsQuery,
    external: true,
  },
  { icon: "mail", label: "Email", val: ORG.email, href: `mailto:${ORG.email}` },
  { icon: "phone", label: "Phone", val: ORG.phone, href: ORG.phoneHref },
  { icon: "clock", label: "Response time", val: "Within one business day" },
];

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Mappir Dev about GIS development, surveys, cadastral mapping or IoT. We respond within one business day."
        path="/contact"
      />
      <PageHero
        eyebrow="Get in touch"
        title="Start a conversation"
        lead="Tell us about your scope, timeline and goals. We typically respond within one business day."
        trail={[{ label: "Contact" }]}
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <AnimSection className="contact-info">
              {CONTACT_ITEMS.map((c) => {
                const Tag = c.href ? "a" : "div";
                const linkProps = c.href
                  ? { href: c.href, ...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
                  : {};
                return (
                  <Tag
                    key={c.label}
                    className={`contact-item${c.href ? " contact-item--link" : ""}`}
                    {...linkProps}
                  >
                    <span className="chip">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <div>
                      <div className="contact-item__label">{c.label}</div>
                      <div className="contact-item__val">{c.val}</div>
                    </div>
                  </Tag>
                );
              })}

              <div className="contact-note">
                <p>
                  For survey bookings and formal proposals, the{" "}
                  <Link className="inline-link" to="/request-a-quote">
                    request a quote
                  </Link>{" "}
                  form captures a bit more detail.
                </p>
              </div>
            </AnimSection>

            <AnimSection delay={100}>
              <ContactForm />
            </AnimSection>
          </div>
        </div>
      </section>
    </>
  );
}
