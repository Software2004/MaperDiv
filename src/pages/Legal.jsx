import Seo from "../lib/Seo";
import { PageHero } from "../components/page-parts";
import { ORG } from "../data/site";

/* Shared shell for Privacy / Terms. Content is placeholder — replace with
   copy reviewed by the client's legal advisor before launch. */
export function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy" description="How Mappir Dev collects, uses and protects personal data." path="/privacy" />
      <PageHero eyebrow="Legal" title="Privacy Policy" trail={[{ label: "Privacy Policy" }]} />
      <section className="section">
        <div className="container prose">
          <p className="muted-note">
            Placeholder policy — replace with copy reviewed by a legal advisor before launch.
          </p>
          <h2>Who we are</h2>
          <p>
            {ORG.name} ({ORG.location}) provides geospatial technology and survey services. This
            policy explains what personal data we collect through this website and how we use it.
          </p>
          <h2>What we collect</h2>
          <p>
            Information you submit through our contact and quote forms (name, email, organisation and
            the details of your enquiry), and standard technical data such as your IP address and
            browser type collected through server logs and analytics.
          </p>
          <h2>How we use it</h2>
          <p>
            To respond to your enquiry, prepare proposals, and improve the website. We do not sell
            personal data. We retain enquiry data only as long as needed to follow up and meet our
            records obligations.
          </p>
          <h2>Cookies &amp; analytics</h2>
          <p>
            The site uses privacy-respecting analytics to understand aggregate usage. Where required,
            non-essential cookies are set only with your consent.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask us to access, correct or delete the personal data we hold about you by
            emailing{" "}
            <a className="inline-link" href={`mailto:${ORG.email}`}>
              {ORG.email}
            </a>
            .
          </p>
          <h2>Contact</h2>
          <p>
            Questions about this policy: {ORG.email} · {ORG.phone}.
          </p>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <Seo title="Terms" description="Terms governing use of the Mappir Dev website." path="/terms" />
      <PageHero eyebrow="Legal" title="Terms of Use" trail={[{ label: "Terms" }]} />
      <section className="section">
        <div className="container prose">
          <p className="muted-note">
            Placeholder terms — replace with copy reviewed by a legal advisor before launch.
          </p>
          <h2>Use of this website</h2>
          <p>
            This website is provided for general information about {ORG.name} and its services.
            Content may change without notice and does not constitute a contractual offer.
          </p>
          <h2>Intellectual property</h2>
          <p>
            All content, branding and imagery on this site are the property of {ORG.name} or its
            licensors and may not be reproduced without permission.
          </p>
          <h2>No warranty</h2>
          <p>
            The site is provided &ldquo;as is&rdquo;. We make no warranties as to its availability or
            the accuracy of its content, and accept no liability for loss arising from its use.
          </p>
          <h2>Governing law</h2>
          <p>These terms are governed by the laws of the Islamic Republic of Pakistan.</p>
          <h2>Contact</h2>
          <p>
            {ORG.email} · {ORG.phone}
          </p>
        </div>
      </section>
    </>
  );
}
