import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection, Btn } from "../components/primitives";
import { PageHero, CtaBand, CheckList } from "../components/page-parts";
import { INDUSTRIES, getIndustry } from "../data/industries";
import { WORK } from "../data/work";

export default function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustry(slug);
  if (!industry) return <Navigate to="/industries" replace />;

  const related = WORK.filter((w) => w.sector === industry.title).slice(0, 3);
  const others = INDUSTRIES.filter((i) => i.slug !== slug);
  const trail = [{ label: "Industries", to: "/industries" }, { label: industry.title }];

  return (
    <>
      <Seo
        title={`${industry.title} — Industries`}
        description={industry.tagline}
        path={`/industries/${slug}`}
        image={industry.image}
        jsonLd={breadcrumbLd(trail)}
      />
      <PageHero
        eyebrow="Industries"
        title={industry.title}
        lead={industry.tagline}
        trail={trail}
        actions={
          <Btn to="/contact" variant="primary">
            Talk to an expert <Icon name="arrowRight" size={17} />
          </Btn>
        }
      />

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <AnimSection>
              <img className="detail__image" src={industry.image} alt={industry.title} loading="lazy" />
              {industry.body.map((p, i) => (
                <p key={i} className="detail__para">
                  {p}
                </p>
              ))}
            </AnimSection>
            <AnimSection>
              <h2 className="detail__h2">What we typically deliver here</h2>
              <CheckList items={industry.needs} columns={2} />
            </AnimSection>

            {related.length > 0 && (
              <AnimSection>
                <h2 className="detail__h2">Related work</h2>
                <div className="mini-cards">
                  {related.map((w) => (
                    <Link key={w.slug} className="mini-card" to={`/work/${w.slug}`}>
                      <span className="mini-card__num">{w.result}</span>
                      <span className="mini-card__title">{w.title}</span>
                    </Link>
                  ))}
                </div>
              </AnimSection>
            )}
          </div>

          <aside className="detail__aside">
            <div className="aside-card aside-card--accent">
              <div className="aside-card__num">{industry.proof.stat}</div>
              <div className="aside-card__num-label">{industry.proof.label}</div>
            </div>
            <div className="aside-card">
              <div className="aside-card__head">Other industries</div>
              {others.map((i) => (
                <Link key={i.slug} className="aside-link aside-link--plain" to={`/industries/${i.slug}`}>
                  <Icon name={i.icon} size={16} />
                  <span>{i.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow={industry.title}
        title={`Delivering in ${industry.title.toLowerCase()}?`}
        body="Tell us the programme, the standards you work to and the timeline. We'll bring the method."
        primary={{ to: "/request-a-quote", label: "Request a quote" }}
        secondary={{ to: "/work", label: "See our work" }}
      />
    </>
  );
}
