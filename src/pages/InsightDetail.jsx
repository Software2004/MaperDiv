import { useParams, Navigate, Link } from "react-router-dom";
import Seo from "../lib/Seo";
import { articleLd, breadcrumbLd } from "../lib/jsonld";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { CtaBand, Breadcrumbs } from "../components/page-parts";
import { INSIGHTS, getInsight } from "../data/insights";

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function InsightDetail() {
  const { slug } = useParams();
  const post = getInsight(slug);
  if (!post) return <Navigate to="/insights" replace />;

  const more = INSIGHTS.filter((p) => p.slug !== slug).slice(0, 3);
  const path = `/insights/${slug}`;
  const trail = [{ label: "Insights", to: "/insights" }, { label: post.title }];

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={path}
        image={post.image}
        jsonLd={[
          articleLd({
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            path,
            datePublished: post.date,
          }),
          breadcrumbLd(trail),
        ]}
      />

      <article className="article">
        <div className="container article__head">
          <Breadcrumbs trail={trail} />
          <span className="tag tag--solid">{post.tag}</span>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__meta">
            {fmtDate(post.date)} · {post.read}
          </p>
        </div>

        <div className="container article__figure">
          <img src={post.image} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="container article__body">
          <AnimSection>
            <p className="article__lead">{post.excerpt}</p>
            {post.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </AnimSection>

          <div className="article__back">
            <Link className="link-more" to="/insights">
              <Icon name="arrowLeft" size={15} /> All insights
            </Link>
          </div>
        </div>
      </article>

      <section className="section section--alt">
        <div className="container">
          <h2 className="h2" style={{ marginBottom: "28px" }}>
            More from the field notes
          </h2>
          <div className="grid-3">
            {more.map((p) => (
              <Link className="insight-card" to={`/insights/${p.slug}`} key={p.slug}>
                <div className="insight-card__media">
                  <img src={p.image} alt="" loading="lazy" decoding="async" />
                </div>
                <div className="insight-card__body">
                  <div className="insight-card__meta">
                    <span className="tag tag--solid">{p.tag}</span>
                    <span>{p.read}</span>
                  </div>
                  <h3>{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
