import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import routes from "~react-pages";
import { useDynamicTitle } from "./utilities/useDynamicTitle";
import Header from "./components/header/header";
import Intro from "./components/intro/intro";
import TranslationWidget from "./components/TranslationWidget/TranslationWidget";

// Lazy load non-critical below-the-fold components
const Footer = lazy(() => import("./components/footer/footer"));
const ScrollToTop = lazy(() => import("./components/ScrollToTop/index"));

function App() {
  // Lock scroll while intro animation plays (2.25s delay + 1s slide = 3.25s)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
    }, 3250);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic page title that rotates through different messages
  useDynamicTitle(
    [
      "Mark Galkins | Full-Stack Developer",
      "👋 Welcome!",
      "Available for work",
      "Web Developer • Denmark",
      "React • Next.js • TypeScript",
    ],
    3000,
  ); // Changes every 3 seconds

  const element = useRoutes(routes);
  return (
    <>
      <Header />
      {element}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Intro />
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
      <ToastContainer />
      <TranslationWidget />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
