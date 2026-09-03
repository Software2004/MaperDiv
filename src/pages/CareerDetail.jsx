import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection, Btn } from "../components/primitives";
import { PageHero } from "../components/page-parts";
import { ORG } from "../data/site";
import { OPEN_ROLES, getRole } from "../data/company";

export default function CareerDetail() {
  const { slug } = useParams();
  const role = getRole(slug);
  if (!role) return <Navigate to="/careers" replace />;

  const others = OPEN_ROLES.filter((r) => r.slug !== slug);
  const mailto = `mailto:${ORG.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`;

  return (
    <>
      <Seo title={`${role.title} — Careers`} description={role.summary} path={`/careers/${slug}`} />
      <PageHero
        eyebrow="Careers"
        title={role.title}
        lead={role.summary}
        trail={[{ label: "Careers", to: "/careers" }, { label: role.title }]}
        actions={
          <Btn href={mailto} variant="primary">
            Apply for this role <Icon name="arrowRight" size={17} />
          </Btn>
        }
      />

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <AnimSection>
              <h2 className="detail__h2">What you'll do</h2>
              <ul className="bullet-list">
                {role.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <h2 className="detail__h2">What we're looking for</h2>
              <ul className="bullet-list">
                {role.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <h2 className="detail__h2">How to apply</h2>
              <p className="detail__para">
                Email your CV and a short note about what you&rsquo;d want to work on to{" "}
                <a className="inline-link" href={mailto}>
                  {ORG.email}
                </a>
                . We read every application and reply within a week.
              </p>
            </AnimSection>
          </div>

          <aside className="detail__aside">
            <div className="aside-card">
              <div className="aside-card__head">Details</div>
              <dl className="spec-list spec-list--tight">
                <div>
                  <dt>Type</dt>
                  <dd>{role.type}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{role.location}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{role.team}</dd>
                </div>
              </dl>
            </div>

            {others.length > 0 && (
              <div className="aside-card">
                <div className="aside-card__head">Other roles</div>
                {others.map((r) => (
                  <Link key={r.slug} className="aside-link aside-link--plain" to={`/careers/${r.slug}`}>
                    <Icon name="briefcase" size={16} />
                    <span>{r.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
