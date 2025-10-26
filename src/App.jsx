import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import routes from "~react-pages";
import BackupScroll from "./components/backup/backup.jsx";

function App() {
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
