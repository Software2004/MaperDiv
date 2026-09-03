import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { AnimSection, Eyebrow, BrandLogo, Btn } from "./primitives";
import { CLIENTS } from "../data/company";

/* Breadcrumb trail. `trail` = [{ label, to }] (last item has no `to`). */
export function Breadcrumbs({ trail }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {trail.map((c, i) => (
        <span key={i}>
          <Icon name="chevronRight" size={13} />
          {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}

/* Interior page header — eyebrow, title, lead, optional breadcrumb + actions. */
export function PageHero({ eyebrow, title, lead, trail, actions, children }) {
  return (
    <header className="page-hero">
      <div className="container">
        {trail && <Breadcrumbs trail={trail} />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="page-hero__lead">{lead}</p>}
        {actions && <div className="page-hero__actions">{actions}</div>}
        {children}
      </div>
    </header>
  );
}

/* Reusable navy call-to-action band. */
export function CtaBand({
  eyebrow = "Start a project",
  title = "Let’s map your next big idea",
  body = "Whether it’s a national cadastral programme or a custom IoT sensor network — our team is ready to scope, plan and deliver.",
  primary = { to: "/request-a-quote", label: "Get a quote" },
  secondary = { to: "/work", label: "See our work" },
}) {
  return (
    <section className="section section--navy dots cta">
      <div className="container">
        <AnimSection className="section__head section__head--center">
          <Eyebrow center light>
            {eyebrow}
          </Eyebrow>
          <h2 className="h2 h2--light">{title}</h2>
          {body && <p className="lead lead--light">{body}</p>}
          <div className="cta__actions">
            <Btn to={primary.to} variant="primary">
              {primary.label} <Icon name="arrowRight" size={17} />
            </Btn>
            {secondary && (
              <Btn to={secondary.to} variant="light">
                {secondary.label}
              </Btn>
            )}
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

/* Trust marquee (client logos). */
export function TrustStrip({
  lead = "Trusted by national land authorities, infrastructure programmes and enterprises across 28 countries",
}) {
  return (
    <section className="trust">
      <div className="container">
        <p className="trust__lead">{lead}</p>
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((g) => (
              <div className="marquee__group" key={g}>
                {CLIENTS.map((b) => (
                  <BrandLogo key={b.name} name={b.name} shape={b.shape} c={b.c} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <ul className="sr-only">
          {CLIENTS.map((b) => (
            <li key={b.name}>{b.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Section heading block. */
export function SectionHead({ eyebrow, title, lead, center, light, className = "" }) {
  return (
    <AnimSection
      className={`section__head${center ? " section__head--center" : ""} ${className}`}
    >
      {eyebrow && (
        <Eyebrow center={center} light={light}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={`h2${light ? " h2--light" : ""}`}>{title}</h2>
      {lead && <p className={`lead${light ? " lead--light" : ""}`}>{lead}</p>}
    </AnimSection>
  );
}

/* Generic "spec list" — label/value rows used on detail pages. */
export function SpecList({ items }) {
  return (
    <dl className="spec-list">
      {items.map((it) => (
        <div key={it.label}>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Checklist of strings. */
export function CheckList({ items, columns = 1 }) {
  return (
    <ul className={`check-list${columns === 2 ? " check-list--2" : ""}`}>
      {items.map((t) => (
        <li key={t}>
          <Icon name="check" size={16} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
