import { useEffect, useState } from "react";

export function useDynamicTitle(titles, interval = 2000) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [titles.length, interval]);

  useEffect(() => {
    document.title = titles[currentIndex];
  }, [currentIndex, titles]);

  return titles[currentIndex];
}
