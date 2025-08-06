import { useEffect, useRef } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { startFaviconSwitcher } from "./utilities/startFaviconSwitcher.js";

function App() {
  const intervalId = useRef(null);

  useEffect(() => {
    if (!intervalId.current) {
      intervalId.current = startFaviconSwitcher(1000);
    }
  }, []);

  const element = useRoutes(routes);
  return element;
}

export default App;
