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
      "Mark Galkins | Full-Stack Developer",
      "👋 Welcome!",
      "Available for work",
      "Web Developer • Denmark",
      "React • Next.js • TypeScript",
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
