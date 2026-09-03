import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Surveys from "./pages/Surveys";
import SurveyDetail from "./pages/SurveyDetail";
import Cadastral from "./pages/Cadastral";
import CadastralDetail from "./pages/CadastralDetail";
import Industries from "./pages/Industries";
import IndustryDetail from "./pages/IndustryDetail";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import Insights from "./pages/Insights";
import InsightDetail from "./pages/InsightDetail";
import About from "./pages/About";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Careers from "./pages/Careers";
import CareerDetail from "./pages/CareerDetail";
import Contact from "./pages/Contact";
import RequestQuote from "./pages/RequestQuote";
import { Privacy, Terms } from "./pages/Legal";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="site">
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />

          <Route path="/surveys" element={<Surveys />} />
          <Route path="/surveys/:slug" element={<SurveyDetail />} />

          <Route path="/cadastral" element={<Cadastral />} />
          <Route path="/cadastral/:slug" element={<CadastralDetail />} />

          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />

          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />

          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/guides" element={<Insights kind="guide" />} />
          <Route path="/insights/news" element={<Insights kind="news" />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />

          <Route path="/about" element={<About />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/partners" element={<Partners />} />

          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:slug" element={<CareerDetail />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestQuote />} />

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
