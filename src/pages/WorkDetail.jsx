import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { articleLd, breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { WORK, getWork } from "../data/work";
import { SERVICES } from "../data/services";

export default function WorkDetail() {
  const { slug } = useParams();
  const item = getWork(slug);
  if (!item) return <Navigate to="/work" replace />;

  const more = WORK.filter((w) => w.slug !== slug).slice(0, 2);
  const path = `/work/${slug}`;
  const trail = [{ label: "Work", to: "/work" }, { label: item.title }];

  return (
    <>
      <Seo
        title={item.title}
        description={item.summary}
        path={path}
        image={item.image}
        jsonLd={[
          articleLd({
            headline: item.title,
            description: item.summary,
            image: item.image,
            path,
          }),
          breadcrumbLd(trail),
        ]}
      />
      <PageHero eyebrow={item.tag} title={item.title} lead={item.summary} trail={trail} />

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <AnimSection>
              <img className="detail__image" src={item.image} alt={item.title} loading="lazy" />
            </AnimSection>

            <AnimSection>
              <h2 className="detail__h2">The challenge</h2>
              <p className="detail__para">{item.challenge}</p>
              <h2 className="detail__h2">What we did</h2>
              <p className="detail__para">{item.solution}</p>
              <h2 className="detail__h2">Results</h2>
              <ul className="bullet-list">
                {item.results.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </AnimSection>

            {item.quote && (
              <AnimSection>
                <blockquote className="pull-quote pull-quote--wide">
                  <Icon name="quote" size={26} />
                  <p>&ldquo;{item.quote.text}&rdquo;</p>
                  <cite>
                    — {item.quote.name}, {item.quote.role}
                  </cite>
                </blockquote>
              </AnimSection>
            )}
          </div>

          <aside className="detail__aside">
            <div className="aside-card aside-card--accent">
              <div className="aside-card__num">{item.result}</div>
              <div className="aside-card__num-label">{item.resultLabel}</div>
            </div>

            <div className="aside-card">
              <div className="aside-card__head">Sector</div>
              <Link className="aside-link aside-link--plain" to={`/industries/${item.sector.toLowerCase().replace(/ /g, "-")}`}>
                <Icon name="building" size={16} />
                <span>{item.sector}</span>
              </Link>
            </div>

            <div className="aside-card">
              <div className="aside-card__head">Services used</div>
              {item.services.map((name) => {
                const svc = SERVICES.find((s) => s.title === name);
                return svc ? (
                  <Link key={name} className="aside-link aside-link--plain" to={`/services/${svc.slug}`}>
                    <Icon name={svc.icon} size={16} />
                    <span>{name}</span>
                  </Link>
                ) : (
                  <span key={name} className="aside-link aside-link--plain">
                    <Icon name="check" size={16} />
                    <span>{name}</span>
                  </span>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: "28px" }}>
            More work
          </h2>
          <div className="grid-3">
            {more.map((c) => (
              <article className="case-card" key={c.slug}>
                <div className="case-card__media">
                  <img src={c.image} alt={c.title} loading="lazy" decoding="async" />
                  <span className="case-card__tag">{c.tag}</span>
                </div>
                <div className="case-card__body">
                  <h3>{c.title}</h3>
                  <p>{c.summary}</p>
                  <Link className="link-more" to={`/work/${c.slug}`}>
                    Read the case study <Icon name="arrowRight" size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
