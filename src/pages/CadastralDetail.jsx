import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { serviceLd, breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection, Btn } from "../components/primitives";
import { PageHero, CtaBand, CheckList } from "../components/page-parts";
import { CADASTRAL, getCadastral } from "../data/cadastral";

export default function CadastralDetail() {
  const { slug } = useParams();
  const item = getCadastral(slug);
  if (!item) return <Navigate to="/cadastral" replace />;

  const { detail } = item;
  const others = CADASTRAL.filter((c) => c.detail && c.slug !== slug);
  const path = `/cadastral/${slug}`;
  const trail = [{ label: "Cadastral", to: "/cadastral" }, { label: item.label }];

  return (
    <>
      <Seo
        title={item.label}
        description={detail.tagline}
        path={path}
        jsonLd={[
          serviceLd({
            name: item.label,
            description: detail.tagline,
            path,
            serviceType: "Cadastral mapping",
          }),
          breadcrumbLd(trail),
        ]}
      />
      <PageHero
        eyebrow="Cadastral mapping & land records"
        title={item.label}
        lead={detail.tagline}
        trail={trail}
        actions={
          <Btn to="/request-a-quote" variant="primary">
            Discuss your programme <Icon name="arrowRight" size={17} />
          </Btn>
        }
      />

      <section className="section">
        <div className="container detail">
          <div className="detail__main">
            <AnimSection>
              {detail.body.map((p, i) => (
                <p key={i} className="detail__para">
                  {p}
                </p>
              ))}
            </AnimSection>
            <AnimSection>
              <h2 className="detail__h2">What the work involves</h2>
              <CheckList items={detail.points} />
            </AnimSection>
          </div>

          <aside className="detail__aside">
            <div className="aside-card">
              <div className="aside-card__head">Related capabilities</div>
              {others.map((c) => (
                <Link key={c.slug} className="aside-link aside-link--plain" to={`/cadastral/${c.slug}`}>
                  <Icon name={c.icon} size={16} />
                  <span>{c.label}</span>
                </Link>
              ))}
              <Link className="aside-link aside-link--plain" to="/cadastral">
                <Icon name="layers" size={16} />
                <span>All cadastral services</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand
        eyebrow="Land administration"
        title="Bring this into your programme"
        body="Tell us the jurisdiction, the record types and the target system. We'll propose an approach."
        primary={{ to: "/request-a-quote", label: "Request a quote" }}
        secondary={{ to: "/cadastral", label: "All cadastral services" }}
      />
    </>
  );
}
