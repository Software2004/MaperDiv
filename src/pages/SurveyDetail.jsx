import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { serviceLd, breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection, Btn } from "../components/primitives";
import { PageHero, CtaBand, CheckList } from "../components/page-parts";
import { SURVEYS, getSurvey } from "../data/surveys";

export default function SurveyDetail() {
  const { slug } = useParams();
  const survey = getSurvey(slug);
  if (!survey) return <Navigate to="/surveys" replace />;

  const others = SURVEYS.filter((s) => s.slug !== slug);
  const path = `/surveys/${slug}`;
  const trail = [{ label: "Surveys", to: "/surveys" }, { label: survey.title }];

  return (
    <>
      <Seo
        title={survey.title}
        description={survey.summary}
        path={path}
        image={survey.image}
        jsonLd={[
          serviceLd({
            name: survey.title,
            description: survey.summary,
            path,
            serviceType: "Land surveying",
          }),
          breadcrumbLd(trail),
        ]}
      />
      <PageHero
        eyebrow="Survey & data acquisition"
        title={survey.title}
        lead={survey.summary}
        trail={trail}
        actions={
          <>
            <Btn to="/request-a-quote" variant="primary">
              Request this survey <Icon name="arrowRight" size={17} />
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
              <img className="detail__image" src={survey.image} alt={survey.title} loading="lazy" />
              {survey.overview.map((p, i) => (
                <p key={i} className="detail__para">
                  {p}
                </p>
              ))}
            </AnimSection>

            <AnimSection>
              <h2 className="detail__h2">Deliverables</h2>
              <ul className="bullet-list">
                {survey.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </AnimSection>

            <AnimSection>
              <h2 className="detail__h2">Where it's used</h2>
              <CheckList items={survey.useCases} columns={2} />
            </AnimSection>
          </div>

          <aside className="detail__aside">
            <div className="aside-card aside-card--accent">
              <div className="aside-card__num">{survey.accuracy}</div>
              <div className="aside-card__num-label">{survey.accuracyLabel}</div>
            </div>

            <div className="aside-card">
              <div className="aside-card__head">Methods</div>
              <div className="tags">
                {survey.methods.map((m) => (
                  <span key={m} className="tag">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="aside-card">
              <div className="aside-card__head">Other surveys</div>
              {others.map((s) => (
                <Link key={s.slug} className="aside-link aside-link--plain" to={`/surveys/${s.slug}`}>
                  <Icon name="mapPin" size={16} />
                  <span>{s.title}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Book a survey"
        title={`Request a ${survey.title.toLowerCase().replace(/ surveys?$/, "")} survey`}
        body="Send the location, target accuracy and deliverables — we'll respond with a method and a price."
        primary={{ to: "/request-a-quote", label: "Request a survey" }}
        secondary={{ to: "/surveys", label: "All surveys" }}
      />
    </>
  );
}
