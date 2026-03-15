import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import routes from "~react-pages";
import { useDynamicTitle } from "./utilities/useDynamicTitle";
import Header from "./components/header/header";
import Intro from "./components/intro/intro";

// Lazy load non-critical below-the-fold components
const Footer = lazy(() => import("./components/footer/footer"));
const BackupScroll = lazy(() => import("./components/ScrollToTop/index"));

function App() {
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
    </>
  );
}

export default App;
