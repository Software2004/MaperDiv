import { Link } from "react-router-dom";
import { AnimSection, Eyebrow } from "./primitives";
import { REVIEWS } from "../data/reviews";

const Star = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M10 1.6l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 15.08l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85z"
    />
  </svg>
);

/* Star rating, supports halves (e.g. 4.5). */
export function Stars({ rating, label }) {
  const pct = (Math.max(0, Math.min(5, rating)) / 5) * 100;
  return (
    <span
      className="stars"
      role="img"
      aria-label={label || `${rating} out of 5 stars`}
    >
      <span className="stars__track" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} />
        ))}
      </span>
      <span className="stars__fill" style={{ width: `${pct}%` }} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} />
        ))}
      </span>
    </span>
  );
}

export default function Reviews() {
  return (
    <section className="section section--alt">
      <div className="container">
        <AnimSection className="section__head section__head--row">
          <div>
            <Eyebrow>Client reviews</Eyebrow>
            <h2 className="h2">Rated across every service we run</h2>
          </div>
          <div className="reviews__score">
            <Stars rating={4.9} label="Average rating 4.9 out of 5" />
            <span>
              <strong>4.9</strong> / 5 average · {REVIEWS.length} verified project reviews
            </span>
          </div>
        </AnimSection>

        <div className="grid-3">
          {REVIEWS.map((r, i) => (
            <AnimSection key={r.name} delay={(i % 3) * 90}>
              <figure className="review-card">
                <div className="review-card__top">
                  <Stars rating={r.rating} />
                  <span className="review-card__rating">{r.rating.toFixed(1)}</span>
                </div>
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <img
                    className="review-card__avatar"
                    src={r.image}
                    alt={r.name}
                    width="46"
                    height="46"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="review-card__who">
                    <strong>{r.name}</strong>
                    <em>{r.role}</em>
                  </span>
                </figcaption>
                {r.to ? (
                  <Link className="review-card__service" to={r.to}>
                    {r.service}
                  </Link>
                ) : (
                  <span className="review-card__service review-card__service--static">
                    {r.service}
                  </span>
                )}
              </figure>
            </AnimSection>
          ))}
        </div>
      </div>
    </section>
  );
}
