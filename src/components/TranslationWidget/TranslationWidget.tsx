import { useEffect } from "react";

const TranslationWidget = () => {
  useEffect(() => {
    const key = import.meta.env.VITE_TRANSLATION_ACCESS_KEY;
    if (!key) return;

    import("translation-widget").then(({ default: init }) => {
      init(key, {
        pageLanguage: "en",
        showUI: false,
        autoDetectLanguage: true,
      });
    });
  }, []);

  return null;
};

export default TranslationWidget;
