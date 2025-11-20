import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="hero-video-container">
        <video
          className="hero-video"
          src="/video/background.mp4"
          autoPlay
          loop
          muted
          playsInline
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
