import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { serviceLd, breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection, Btn } from "../components/primitives";
import { PageHero, CtaBand, CheckList } from "../components/page-parts";
import { SERVICES, getService } from "../data/services";
import { WORK } from "../data/work";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/services" replace />;

  const related = WORK.filter((w) => w.services.includes(service.title)).slice(0, 2);
  const others = SERVICES.filter((s) => s.slug !== slug);
  const path = `/services/${slug}`;
  const trail = [{ label: "Services", to: "/services" }, { label: service.title }];

  return (
    <>
      <Seo
        title={service.title}
        description={service.summary}
        path={path}
        image={service.image}
        jsonLd={[
          serviceLd({
            name: service.title,
            description: service.summary,
            path,
            serviceType: service.title,
          }),
          breadcrumbLd(trail),
        ]}
      />
      <PageHero
        eyebrow="Technology services"
        title={service.title}
        lead={service.summary}
        trail={trail}
        actions={
          <>
            <Btn to="/request-a-quote" variant="primary">
              Get a quote <Icon name="arrowRight" size={17} />
            </Btn>
            <Btn to="/contact" variant="ghost">
              Ask a question
            </Btn>
          </>
        }
      />

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <AnimSection>
              <img className="detail__image" src={service.image} alt={service.title} loading="lazy" />
              {service.overview.map((p, i) => (
                <p key={i} className="detail__para">
                  {p}
                </p>
              ))}
            </AnimSection>

            <AnimSection>
              <h2 className="detail__h2">What we deliver</h2>
              <CheckList items={service.capabilities} columns={2} />
            </AnimSection>

            <AnimSection>
              <h2 className="detail__h2">Typical deliverables</h2>
              <ul className="bullet-list">
                {service.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </AnimSection>

            {service.faqs?.length > 0 && (
              <AnimSection>
                <h2 className="detail__h2">Common questions</h2>
                <div className="faq">
                  {service.faqs.map((f) => (
                    <details key={f.q}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </AnimSection>
            )}
          </div>

          <aside className="detail__aside">
            <div className="aside-card">
              <div className="aside-card__head">Technology</div>
              <div className="tags">
                {service.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {related.length > 0 && (
              <div className="aside-card">
                <div className="aside-card__head">Related work</div>
                {related.map((w) => (
                  <Link key={w.slug} className="aside-link" to={`/work/${w.slug}`}>
                    <span className="aside-link__num">{w.result}</span>
                    <span>{w.title}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="aside-card">
              <div className="aside-card__head">Other services</div>
              {others.map((s) => (
                <Link key={s.slug} className="aside-link aside-link--plain" to={`/services/${s.slug}`}>
                  <Icon name={s.icon} size={16} />
                  <span>{s.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Start a project"
        title={`Ready to scope your ${service.title.toLowerCase()} project?`}
        body="Tell us about your data, timeline and goals. We respond within one business day."
        primary={{ to: "/request-a-quote", label: "Request a quote" }}
        secondary={{ to: "/services", label: "All services" }}
      />
    </>
  );
}
