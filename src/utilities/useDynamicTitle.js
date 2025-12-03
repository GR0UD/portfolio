import React from "react";

export function useDynamicTitle(titles, interval = 2000) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [titles.length, interval]);

  React.useEffect(() => {
    document.title = titles[currentIndex];
  }, [currentIndex, titles]);

  return titles[currentIndex];
}
