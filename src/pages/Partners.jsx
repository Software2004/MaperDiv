import Seo from "../lib/Seo";
import { AnimSection, BrandLogo } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { PARTNERS } from "../data/company";

export default function Partners() {
  return (
    <>
      <Seo
        title="Partners"
        description="Mappir Dev works with cloud, data and hardware partners to deliver geospatial platforms at enterprise scale."
        path="/about/partners"
      />
      <PageHero
        eyebrow="About"
        title="Partners & platforms"
        lead="We build on best-in-class cloud, data and hardware platforms, and work alongside a network of technology partners to deliver at scale."
        trail={[{ label: "About", to: "/about" }, { label: "Partners" }]}
      />

      <section className="section">
        <div className="container">
          <AnimSection className="logo-wall logo-wall--lg">
            {PARTNERS.map((b) => (
              <BrandLogo key={b.name} name={b.name} shape={b.shape} c={b.c} />
            ))}
          </AnimSection>
          <p className="muted-note">
            Placeholder partner marks — replace with real partner logos and programme details.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="prose">
            <h2>Become a partner</h2>
            <p>
              We&rsquo;re open to technology and delivery partnerships — data providers, sensor
              manufacturers, cloud platforms and regional delivery firms. If your product or team
              complements geospatial software and survey work, get in touch.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Partnerships"
        title="Interested in partnering with us?"
        body="Tell us about your platform or practice and where you see the fit."
        primary={{ to: "/contact", label: "Contact us" }}
        secondary={{ to: "/about", label: "About Mappir Dev" }}
      />
    </>
  );
}
