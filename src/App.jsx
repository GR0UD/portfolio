import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import routes from "~react-pages";
import BackupScroll from "./components/backup/backup.jsx";
import { useDynamicTitle } from "./utilities/useDynamicTitle.js";

function App() {
  // Dynamic page title that rotates through different messages
  useDynamicTitle(
    [
      "Mark Galkin | Full-Stack Developer",
      "👋 Welcome!",
      "Building Fast Web Experiences",
      "React • Next.js • Tailwind",
      "Based in Denmark 🇩🇰",
      "Let's Build Something Cool",
    ],
    3000
  ); // Changes every 3 seconds

  const element = useRoutes(routes);
  return (
    <>
      {element}
      <BackupScroll />
      <ToastContainer />
      <Analytics />
    </>
  );
}

export default App;
