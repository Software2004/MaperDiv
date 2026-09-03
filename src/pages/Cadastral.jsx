import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection, Eyebrow, Btn } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { CADASTRAL, CADASTRAL_INTRO } from "../data/cadastral";

export default function Cadastral() {
  return (
    <>
      <Seo
        title="Cadastral Mapping & Land Records"
        description={CADASTRAL_INTRO.lead}
        path="/cadastral"
        image={CADASTRAL_INTRO.image}
      />
      <PageHero
        eyebrow={CADASTRAL_INTRO.eyebrow}
        title={CADASTRAL_INTRO.title}
        lead={CADASTRAL_INTRO.lead}
        trail={[{ label: "Cadastral" }]}
        actions={
          <Btn to="/request-a-quote" variant="primary">
            Discuss your programme <Icon name="arrowRight" size={17} />
          </Btn>
        }
      />

      <section className="section">
        <div className="container cadastral">
          <AnimSection className="cadastral__intro">
            <h2 className="h2">The full land-data lifecycle</h2>
            <p className="lead">
              Cadastral programmes fail at the seams — between the map and the register, between
              legacy systems, between the field and the office. We engineer those seams so the
              parcel fabric stays authoritative through every future mutation.
            </p>
            <blockquote className="pull-quote">
              <Icon name="quote" size={26} />
              <p>&ldquo;{CADASTRAL_INTRO.quote.text}&rdquo;</p>
              <cite>— {CADASTRAL_INTRO.quote.cite}</cite>
            </blockquote>
          </AnimSection>

          <div className="cadastral__side">
            <AnimSection className="cadastral__figure">
              <img
                src={CADASTRAL_INTRO.image}
                alt="Aerial view of surveyed land parcels"
                loading="lazy"
                decoding="async"
              />
              <div className="cadastral__badge">
                <div className="cadastral__badge-num">{CADASTRAL_INTRO.badge.num}</div>
                <div className="cadastral__badge-label">{CADASTRAL_INTRO.badge.label}</div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <AnimSection className="section__head">
            <Eyebrow>Capabilities</Eyebrow>
            <h2 className="h2">Cadastral & land-record services</h2>
            <p className="lead">
              Twelve capabilities across capture, digitisation, systems and migration. Those with a
              dedicated page go deeper.
            </p>
          </AnimSection>
          <div className="pill-grid pill-grid--lg">
            {CADASTRAL.map((c) =>
              c.detail ? (
                <Link key={c.slug} className="pill pill--link" to={`/cadastral/${c.slug}`}>
                  <Icon name={c.icon} size={18} />
                  <span>{c.label}</span>
                  <Icon name="arrowRight" size={14} className="pill__arrow" />
                </Link>
              ) : (
                <div key={c.slug} className="pill">
                  <Icon name={c.icon} size={18} />
                  <span>{c.label}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Land administration"
        title="Planning a cadastral or land-records programme?"
        body="From a single district pilot to a national registry rollout — we scope, plan and deliver with legal traceability throughout."
        primary={{ to: "/request-a-quote", label: "Discuss your project" }}
        secondary={{ to: "/work", label: "See cadastral work" }}
      />
    </>
  );
}
