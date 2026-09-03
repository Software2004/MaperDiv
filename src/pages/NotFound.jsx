import Seo from "../lib/Seo";
import { Icon } from "../lib/icons";
import { Btn } from "../components/primitives";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for doesn't exist." />
      <section className="section notfound">
        <div className="container">
          <span className="notfound__code">404</span>
          <h1 className="h2">This location isn&rsquo;t on the map</h1>
          <p className="lead">
            The page you were looking for may have moved or never existed. Try one of these instead.
          </p>
          <div className="notfound__actions">
            <Btn to="/" variant="primary">
              <Icon name="compass" size={17} /> Back to home
            </Btn>
            <Btn to="/services" variant="ghost">
              Services
            </Btn>
            <Btn to="/work" variant="ghost">
              Work
            </Btn>
            <Btn to="/contact" variant="ghost">
              Contact
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
