import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Icon } from "../lib/icons";
import { Logo } from "./primitives";
import { useScrolled } from "../lib/hooks";
import { NAV } from "../data/site";

function MegaPanel({ item, onNavigate }) {
  const { menu } = item;
  return (
    <div className="mega" role="menu">
      <div className="mega__inner">
        <div className="mega__cols">
          {menu.columns.map((col) => (
            <div className="mega__col" key={col.head}>
              {col.to ? (
                <Link className="mega__head mega__head--link" to={col.to} onClick={onNavigate}>
                  {col.head} <Icon name="arrowRight" size={13} />
                </Link>
              ) : (
                <div className="mega__head">{col.head}</div>
              )}
              <ul className="mega__list">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link className="mega__link" to={l.to} onClick={onNavigate} role="menuitem">
                      {l.icon && (
                        <span className="mega__icon">
                          <Icon name={l.icon} size={17} />
                        </span>
                      )}
                      <span>
                        <span className="mega__link-label">{l.label}</span>
                        {l.desc && <span className="mega__link-desc">{l.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {menu.feature && (
          <Link className="mega__feature" to={menu.feature.to} onClick={onNavigate}>
            <span className="mega__feature-eyebrow">{menu.feature.eyebrow}</span>
            <span className="mega__feature-title">{menu.feature.title}</span>
            <span className="mega__feature-body">{menu.feature.body}</span>
            <span className="mega__feature-cta">
              {menu.feature.cta} <Icon name="arrowRight" size={14} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Nav() {
  const scrolled = useScrolled(24);
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [lastPath, setLastPath] = useState(location.pathname);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  const isHome = location.pathname === "/";
  const solid = scrolled || mobileOpen || openMenu || !isHome;

  // close every menu when the route changes (incl. browser back/forward)
  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  // lock scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // escape + outside click close the desktop mega-menu
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const openNow = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <nav
      ref={navRef}
      className={`nav${solid ? " nav--solid" : ""}`}
      onMouseLeave={closeSoon}
    >
      <div className="nav__inner container">
        <Link to="/" aria-label="Mappir Dev home" onClick={() => setOpenMenu(null)}>
          <Logo light={!solid} />
        </Link>

        <div className="nav__links">
          {NAV.map((item) =>
            item.menu ? (
              <div
                key={item.label}
                className={`nav__item${openMenu === item.label ? " nav__item--open" : ""}`}
                onMouseEnter={() => openNow(item.label)}
              >
                <button
                  className="nav__link nav__link--toggle"
                  aria-expanded={openMenu === item.label}
                  onClick={() =>
                    setOpenMenu((o) => (o === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <Icon name="chevronDown" size={14} />
                </button>
                {openMenu === item.label && (
                  <MegaPanel item={item} onNavigate={() => setOpenMenu(null)} />
                )}
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `nav__link${isActive ? " nav__link--active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
          <Link className="btn btn--primary btn--sm" to="/request-a-quote">
            Get a Quote
          </Link>
        </div>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          {NAV.map((item) =>
            item.menu ? (
              <div className="mobile-nav__group" key={item.label}>
                <button
                  className="mobile-nav__link mobile-nav__link--toggle"
                  aria-expanded={mobileSection === item.label}
                  onClick={() =>
                    setMobileSection((s) => (s === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <Icon
                    name="chevronDown"
                    size={16}
                    style={{
                      transform:
                        mobileSection === item.label ? "rotate(180deg)" : "none",
                      transition: "transform .2s ease",
                    }}
                  />
                </button>
                {mobileSection === item.label && (
                  <div className="mobile-nav__sub">
                    {item.to && (
                      <Link className="mobile-nav__sublink mobile-nav__sublink--all" to={item.to}>
                        All {item.label.toLowerCase()}
                      </Link>
                    )}
                    {item.menu.columns.flatMap((col) =>
                      col.links.map((l) => (
                        <Link className="mobile-nav__sublink" to={l.to} key={l.to}>
                          {l.label}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link className="mobile-nav__link" to={item.to} key={item.label}>
                {item.label}
              </Link>
            )
          )}
          <Link className="btn btn--primary btn--block" to="/request-a-quote">
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
