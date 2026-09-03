import { useState } from "react";
import { Icon } from "../lib/icons";
import { SERVICE_OPTIONS } from "../data/company";
import { CONTACT_ENDPOINT } from "../siteConfig";
import { ORG } from "../data/site";

/*
 * Contact / quote form.
 *
 * Set VITE_CONTACT_ENDPOINT (see .env.example) to a form backend that accepts
 * a JSON POST and returns 2xx — Formspree, Basin, Web3Forms, or your own
 * serverless function / CRM endpoint. With no endpoint configured the form
 * falls back to a mailto: link so nothing is silently lost.
 *
 * Spam handling: a hidden honeypot field ("company_url"). Real users never
 * fill it; bots usually do — those submissions are dropped client-side.
 */
const EMPTY = { name: "", email: "", company: "", service: "", message: "", company_url: "" };

export default function ContactForm({ defaultService = "", compact = false }) {
  const [formData, setFormData] = useState({ ...EMPTY, service: defaultService });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setFormData((p) => ({ ...p, [k]: e.target.value }));

  const mailtoFallback = () => {
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Organisation: ${formData.company || "—"}`,
      `Service: ${formData.service || "—"}`,
      "",
      formData.message,
    ].join("\n");
    window.location.href = `mailto:${ORG.email}?subject=${encodeURIComponent(
      `Website enquiry — ${formData.service || "General"}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot tripped — pretend success, send nothing.
    if (formData.company_url) {
      setStatus("sent");
      return;
    }

    if (!CONTACT_ENDPOINT) {
      mailtoFallback();
      return;
    }

    setStatus("sending");
    try {
      const payload = { ...formData };
      delete payload.company_url; // drop honeypot
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          _subject: `Website enquiry — ${payload.service || "General"}`,
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      setFormData({ ...EMPTY, service: defaultService });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={`form-card${compact ? " form-card--compact" : ""}`} onSubmit={handleSubmit}>
      {/* honeypot — visually hidden, off the tab order, not announced */}
      <div className="hp" aria-hidden="true">
        <label>
          Company URL
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.company_url}
            onChange={set("company_url")}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Full name</span>
          <input
            className="input"
            placeholder="Jane Smith"
            required
            autoComplete="name"
            value={formData.name}
            onChange={set("name")}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            className="input"
            type="email"
            placeholder="you@company.com"
            required
            autoComplete="email"
            value={formData.email}
            onChange={set("email")}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Organisation</span>
          <input
            className="input"
            placeholder="Company or agency"
            autoComplete="organization"
            value={formData.company}
            onChange={set("company")}
          />
        </label>
        <label>
          <span>Service needed</span>
          <select className="input" value={formData.service} onChange={set("service")}>
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
      <label>
        <span>Project details</span>
        <textarea
          className="input"
          rows={5}
          required
          placeholder="Tell us about your project scope, timeline and goals…"
          value={formData.message}
          onChange={set("message")}
        />
      </label>

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        {status === "sent" ? (
          <>
            <Icon name="check" size={17} /> Message sent
          </>
        ) : status === "sending" ? (
          "Sending…"
        ) : (
          <>
            Send message <Icon name="arrowRight" size={17} />
          </>
        )}
      </button>

      {status === "error" && (
        <p className="form-note form-note--error">
          Something went wrong sending that.{" "}
          <button type="button" className="link-inline" onClick={mailtoFallback}>
            Email us directly
          </button>{" "}
          instead.
        </p>
      )}
      {status === "sent" && (
        <p className="form-note">Thanks — we typically respond within one business day.</p>
      )}
      {!CONTACT_ENDPOINT && status === "idle" && (
        <p className="form-note">This opens your email client. A form backend can be wired in later.</p>
      )}
    </form>
  );
}
