import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

const NotFound = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video play on mount (iOS fix)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented, try again on user interaction
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener("touchstart", playOnInteraction);
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("touchstart", playOnInteraction, {
          once: true,
        });
        document.addEventListener("click", playOnInteraction, { once: true });
      });
    }
  }, []);

  return (
    <div className="not-found">
      <div className="hero-video-container">
        <video
          ref={videoRef}
          className="hero-video"
          src="/video/hero.webm"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error webkit-playsinline is for older iOS
          webkit-playsinline="true"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-description">This page was not found</p>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
