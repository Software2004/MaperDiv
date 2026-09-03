import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../lib/icons";
import { BRAND_SHAPES } from "../lib/icon-data";
import { useInView, useCountUp } from "../lib/hooks";

/* Reveal-on-scroll wrapper. Resting state is visible; it only animates
   in from a slight offset when it first enters the viewport. */
export function AnimSection({ children, className = "", delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Stat({ value, label, size = "md" }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.4);
  const m = String(value).match(/^([\d.]+)(.*)$/);
  const num = m ? parseFloat(m[1]) : 0;
  const suffix = m ? m[2] : "";
  const isInt = Number.isInteger(num);
  const count = useCountUp(num, inView);
  const shown = inView ? (isInt ? Math.round(count) : count.toFixed(1)) : isInt ? 0 : "0.0";
  return (
    <div ref={ref} className={`stat stat--${size}`}>
      <div className="stat__num">
        {m ? shown : value}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export function Eyebrow({ children, center = false, light = false }) {
  return (
    <span className={`eyebrow${center ? " eyebrow--center" : ""}${light ? " eyebrow--light" : ""}`}>
      {children}
    </span>
  );
}

/* Link styled as an arrow "learn more". `to` → router Link, `href` → anchor,
   otherwise a button with onClick. */
export function LinkMore({ children = "Learn more", to, href, onClick, light = false }) {
  const cls = `link-more${light ? " link-more--light" : ""}`;
  const inner = (
    <>
      {children} <Icon name="arrowRight" size={16} />
    </>
  );
  if (to) return <Link className={cls} to={to}>{inner}</Link>;
  if (href) return <a className={cls} href={href}>{inner}</a>;
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

export function Logo({ light = false }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`} aria-label="Mappir Dev">
      <span className="logo__mark">
        <Icon name="layers" size={22} stroke={2} />
      </span>
      <span className="logo__text">
        MAPPIR<span className="logo__accent">DEV</span>
      </span>
    </span>
  );
}

export function BrandLogo({ name, shape, c }) {
  return (
    <span className="brand" style={c ? { "--brand-c": c } : undefined}>
      <svg className="brand__mark" viewBox="0 0 26 26" width="26" height="26" aria-hidden="true">
        {BRAND_SHAPES[shape]}
      </svg>
      <span className="brand__name">{name}</span>
    </span>
  );
}

/* Small pill button used across pages. */
export function Btn({ to, href, onClick, variant = "primary", size, block, children, type }) {
  const cls = `btn btn--${variant}${size ? ` btn--${size}` : ""}${block ? " btn--block" : ""}`;
  if (to) return <Link className={cls} to={to}>{children}</Link>;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return (
    <button className={cls} onClick={onClick} type={type || "button"}>
      {children}
    </button>
  );
}
