import { Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { IMG } from "../data/images";
import { useMediaQuery } from "../lib/hooks";
import HeroMap from "../components/HeroMap";
import { AnimSection, Eyebrow, Stat, LinkMore, Btn } from "../components/primitives";
import { TrustStrip, CtaBand, SectionHead } from "../components/page-parts";
import { SERVICES } from "../data/services";
import { SURVEYS } from "../data/surveys";
import { INDUSTRIES } from "../data/industries";
import { WORK } from "../data/work";
import { INSIGHTS } from "../data/insights";
import { STATS, STEPS, TESTIMONIALS } from "../data/company";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 960px)");
  const cases = WORK.slice(0, 3);
  const posts = INSIGHTS.filter((p) => p.kind !== "news").slice(0, 3);

  return (
    <>
      <Seo path="/" />

      {/* ── HERO ── */}
      <header id="home" className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${IMG.heroBg})` }} aria-hidden="true" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <Eyebrow light>Geospatial Intelligence &amp; Technology</Eyebrow>
            <h1 className="hero__title">
              Mapping the world&rsquo;s data with <span>precision</span>.
            </h1>
            <p className="hero__lead">
              From satellite imagery to custom IoT devices — Mappir Dev delivers end-to-end GIS
              development, precision surveys, cadastral mapping and intelligent software for a
              connected world.
            </p>
            <div className="hero__actions">
              <Btn to="/services" variant="primary">
                Explore services <Icon name="arrowRight" size={17} />
              </Btn>
              <Btn to="/contact" variant="light">
                Talk to an expert
              </Btn>
            </div>
            <div className="hero__stats">
              {STATS.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} size="sm" />
              ))}
            </div>
          </div>

          {isDesktop && (
            <div className="hero__visual">
              <HeroMap />
              <div className="hero__float">
                <div className="hero__float-num">±1&nbsp;cm</div>
                <div className="hero__float-label">RTK / PPK survey accuracy</div>
              </div>
              <div className="hero__chip">
                <Icon name="check" size={15} /> Live satellite basemap
              </div>
            </div>
          )}
        </div>
      </header>

      <TrustStrip />

      {/* ── SERVICES ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we build"
            title="Technology services"
            lead="Comprehensive GIS, software and IoT solutions engineered for precision, scale and real-world impact."
          />
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <AnimSection key={s.slug} delay={(i % 3) * 90}>
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

      {/* ── HOW WE WORK ── */}
      <section className="section section--alt dotted">
        <div className="container">
          <SectionHead
            eyebrow="How we work"
            title="From brief to basemap, we own the outcome"
            lead="A repeatable delivery model that keeps accuracy, compliance and timelines in view at every stage."
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

      {/* ── SURVEYS ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Field services"
            title="Survey & data acquisition"
            lead="From aerial drone photogrammetry to sub-centimetre GNSS ground control — every survey delivered with precision, speed and full compliance."
          />
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

      {/* ── CADASTRAL ── */}
      <section className="section section--alt">
        <div className="container cadastral">
          <AnimSection className="cadastral__intro">
            <Eyebrow>Land administration</Eyebrow>
            <h2 className="h2">
              Cadastral mapping &amp; <span className="accent">land records</span>
            </h2>
            <p className="lead">
              We handle the full lifecycle of land data — from digitising legacy revenue records to
              building modern, GIS-integrated land registries with accuracy and legal compliance.
            </p>
            <Btn to="/cadastral" variant="primary">
              Explore cadastral <Icon name="arrowRight" size={17} />
            </Btn>
            <blockquote className="pull-quote">
              <Icon name="quote" size={26} />
              <p>
                &ldquo;Mappir Dev digitised over 2.4 million land parcels for our provincial land
                authority, delivering a complete GIS-integrated registry system on time and with
                exceptional precision.&rdquo;
              </p>
              <cite>— Director, Regional Land Authority</cite>
            </blockquote>
          </AnimSection>

          <div className="cadastral__side">
            <AnimSection className="cadastral__figure">
              <img
                src={IMG.neighborhood}
                alt="Aerial view of surveyed land parcels"
                loading="lazy"
                decoding="async"
              />
              <div className="cadastral__badge">
                <div className="cadastral__badge-num">2.4M+</div>
                <div className="cadastral__badge-label">Parcels mapped</div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className="section">
        <div className="container">
          <AnimSection className="section__head section__head--row">
            <div>
              <Eyebrow>Selected work</Eyebrow>
              <h2 className="h2">Projects that scaled</h2>
            </div>
            <LinkMore to="/work">View all work</LinkMore>
          </AnimSection>
          <div className="grid-3">
            {cases.map((c, i) => (
              <AnimSection key={c.slug} delay={(i % 3) * 90}>
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

      {/* ── STATS BAND ── */}
      <section className="section section--navy dots">
        <div className="container">
          <SectionHead center light eyebrow="By the numbers" title="A track record built on delivery" />
          <div className="stats-band">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} size="lg" />
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Who we serve"
            title="Built for the sectors that run on spatial data"
            lead="Government, infrastructure, environmental and enterprise teams — each with its own standards, scale and stakes."
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

      {/* ── TESTIMONIALS ── */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Client voices" title="Trusted on complex mandates" />
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <AnimSection key={t.name} delay={(i % 3) * 90}>
                <figure className="quote-card">
                  <Icon name="quote" size={24} />
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <span className="avatar">
                      {t.name
                        .replace(/[^A-Za-z .]/g, "")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <em>{t.role}</em>
                    </span>
                  </figcaption>
                </figure>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section className="section">
        <div className="container">
          <AnimSection className="section__head section__head--row">
            <div>
              <Eyebrow>Insights</Eyebrow>
              <h2 className="h2">From the field notes</h2>
            </div>
            <LinkMore to="/insights">View all</LinkMore>
          </AnimSection>
          <div className="grid-3">
            {posts.map((p, i) => (
              <AnimSection key={p.slug} delay={(i % 3) * 90}>
                <Link className="insight-card" to={`/insights/${p.slug}`}>
                  <div className="insight-card__media">
                    <img src={p.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="insight-card__body">
                    <div className="insight-card__meta">
                      <span className="tag tag--solid">{p.tag}</span>
                      <span>{p.read}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <span className="link-more">
                      Read <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
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
