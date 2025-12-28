import { useState, useEffect } from "react";

export function useDynamicTitle(
  titles: string[],
  interval: number = 2000
): string {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, interval);

    return () => clearInterval(timer);
  }, [titles.length, interval]);

  useEffect(() => {
    const title = titles[currentIndex];
    if (title) {
      document.title = title;
    }
  }, [currentIndex, titles]);

  return titles[currentIndex] || "";
}

