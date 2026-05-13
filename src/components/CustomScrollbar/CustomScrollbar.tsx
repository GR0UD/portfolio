import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./CustomScrollbar.module.scss";

type SectionId = "hero" | "about" | "projects" | "contact" | "footer";
const LIGHT_SECTIONS: SectionId[] = ["about", "contact"];

interface ScrollState {
  thumbHeight: number;
  thumbTop: number;
  isVisible: boolean;
  isLight: boolean;
}

function calcScrollState(trackH: number): ScrollState {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const tHeight = Math.max((clientHeight / scrollHeight) * trackH, 32);
  const maxScroll = scrollHeight - clientHeight;
  const tTop = maxScroll > 0 ? (scrollTop / maxScroll) * (trackH - tHeight) : 0;

  const thumbMid = tTop + tHeight / 2;
  const sections: SectionId[] = ["hero", "about", "projects", "contact", "footer"];
  let isLight = false;
  for (let i = sections.length - 1; i >= 0; i--) {
    const id = sections[i];
    if (!id) continue;
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (thumbMid >= rect.top && thumbMid <= rect.bottom) {
        isLight = LIGHT_SECTIONS.includes(id);
        break;
      }
    }
  }

  return { thumbHeight: tHeight, thumbTop: tTop, isVisible: scrollTop > 300, isLight };
}

export default function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [{ thumbHeight, thumbTop, isVisible, isLight }, setScrollState] =
    useState<ScrollState>(() => calcScrollState(window.innerHeight));

  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

  const getTrackH = useCallback(
    () => trackRef.current?.offsetHeight ?? window.innerHeight,
    []
  );

  useEffect(() => {
    const handleUpdate = () => setScrollState(calcScrollState(getTrackH()));
    window.addEventListener("scroll", handleUpdate, { passive: true });
    window.addEventListener("resize", handleUpdate);
    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [getTrackH]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScrollTop.current = document.documentElement.scrollTop;

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const trackH = trackRef.current?.offsetHeight ?? window.innerHeight;
      const { scrollHeight, clientHeight } = document.documentElement;
      const tHeight = Math.max((clientHeight / scrollHeight) * trackH, 32);
      const scrollRatio = (e.clientY - dragStartY.current) / (trackH - tHeight);
      document.documentElement.scrollTop =
        dragStartScrollTop.current + scrollRatio * (scrollHeight - clientHeight);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains(styles.thumb ?? "")) return;
    const trackH = trackRef.current?.offsetHeight ?? window.innerHeight;
    const { scrollHeight, clientHeight } = document.documentElement;
    const tHeight = Math.max((clientHeight / scrollHeight) * trackH, 32);
    const clickY = e.clientY - tHeight / 2;
    document.documentElement.scrollTop =
      (clickY / (trackH - tHeight)) * (scrollHeight - clientHeight);
  }, []);

  return (
    <div
      ref={trackRef}
      className={`${styles.track} ${isVisible ? styles.visible : ""} ${isLight ? styles.onLight : ""}`}
      onClick={handleTrackClick}
    >
      <div
        className={`${styles.thumb} ${isLight ? styles.onLight : ""}`}
        style={{ height: thumbHeight, top: thumbTop }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
