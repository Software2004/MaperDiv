import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { AnimSection } from "../components/primitives";
import { PageHero, CtaBand } from "../components/page-parts";
import { TEAM } from "../data/company";

export default function Team() {
  return (
    <>
      <Seo
        title="Team"
        description="The GIS engineers, surveyors, software architects and hardware engineers behind Mappir Dev."
        path="/about/team"
      />
      <PageHero
        eyebrow="About"
        title="The team"
        lead="Around 40 engineers, surveyors and specialists across four disciplines — organised so a single project can move from field capture to a deployed platform without a handoff gap."
        trail={[{ label: "About", to: "/about" }, { label: "Team" }]}
      />

      <section className="section">
        <div className="container">
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <AnimSection key={t.name} delay={(i % 2) * 90} className="team-card">
                <span className="chip chip--lg">
                  <Icon name="users" size={22} />
                </span>
                <h3>{t.name}</h3>
                <p className="team-card__role">{t.role}</p>
                <p>{t.bio}</p>
              </AnimSection>
            ))}
          </div>
          <p className="muted-note">
            Individual team member profiles will be added here — names, photos and bios — before
            launch.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Join us"
        title="We're hiring across engineering and survey"
        body="If you want to work on land registries, survey pipelines and field devices that ship, take a look at our open roles."
        primary={{ to: "/careers", label: "See open roles" }}
        secondary={{ to: "/about", label: "About Mappir Dev" }}
      />
    </>
  );
}
