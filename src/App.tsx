import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import routes from "~react-pages";
import { useDynamicTitle } from "./utilities/useDynamicTitle";
import Header from "./components/header/header";
import Intro from "./components/intro/intro";

// Lazy load non-critical below-the-fold components
const Footer = lazy(() => import("./components/footer/footer"));
const BackupScroll = lazy(() => import("./components/ScrollToTop/index"));

function App() {
  // Load toastify CSS asynchronously to not block render
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "react-toastify/dist/ReactToastify.css";
    link.type = "text/css";
    // Add with a small delay to ensure it loads after critical rendering
    const timeout = setTimeout(() => {
      document.head.appendChild(link);
    }, 100);
    return () => clearTimeout(timeout);
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
        <BackupScroll />
      </Suspense>
      <ToastContainer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
