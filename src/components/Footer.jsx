import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { Logo } from "./primitives";
import { ORG, FOOTER_COLS, LEGAL_LINKS } from "../data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo light />
            <p>
              Precision geospatial technology and survey services. Mapping the world&rsquo;s data
              since {ORG.since}.
            </p>
            <div className="footer__social">
              {ORG.socials.map((s) => (
                <a key={s.icon} href={s.href} aria-label={s.label} className="social">
                  <Icon name={s.icon} size={18} fill />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.head} className="footer__col">
              <div className="footer__head">{col.head}</div>
              {col.links.map((l) => (
                <Link key={l.to} className="footer__link" to={l.to}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="footer__col">
            <div className="footer__head">Contact</div>
            <a className="footer__link" href={ORG.mapsQuery} target="_blank" rel="noopener noreferrer">
              {ORG.location}
            </a>
            <a className="footer__link" href={`mailto:${ORG.email}`}>
              {ORG.email}
            </a>
            <a className="footer__link" href={ORG.phoneHref}>
              {ORG.phone}
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {ORG.name}. All rights reserved.
          </span>
          <span className="footer__legal">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.to} to={l.to}>
                {l.label}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
