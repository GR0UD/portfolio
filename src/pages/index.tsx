import { useRef, useEffect } from "react";
import ContactForm from "../components/contact-form/contact-form";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SkillsSection from "../components/SkillsSection/SkillsSection";
import ScrollDownButton from "../components/ScrollDownButton/ScrollDownButton";
import { projectsData } from "../data/projects";
import useMousePosition from "../utilities/useMousePosition";

export default function Home() {
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

  useMousePosition((moveX, moveY) => {
    if (videoRef.current) {
      const translateX = moveX * 5.5;
      const translateY = moveY * 5.5;
      videoRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.05)`;
    }
  }, 0.05);

  return (
    <>
      <main>
        {/* HERO SECTION */}
        <section id="hero">
          <div className="hero-background">
            <div className="hero-overlay"></div>
            <video
              ref={videoRef}
              className="hero-video"
              src="/video/hero.webm"
              poster="/video/hero.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              controls={false}
              webkit-playsinline="true"
            />
          </div>
          <header className="hero-header">
            <div className="hero-content">
              <h1>
                <span>Hey, I'm</span> <strong>Mark</strong> 👋
              </h1>
              <h3>A Full-Stack Developer</h3>
              <p>
                Based in Denmark — I build clean, fast, and user-focused web
                experiences.
              </p>
              <a href="#projects" className="btn">
                Explore My Work
              </a>
            </div>
            <a href="#about" className="hero-blob">
              <img src="/images/me.png" alt="A beautiful image of me :)" />
            </a>
          </header>
          <ScrollDownButton />
          <img
            className="hero-divider"
            src="/images/divider-bot.png"
            alt="section divider"
          />
        </section>
        {/* ABOUT SECTION */}
        <section id="about">
          <div className="about-wrapper">
            <div className="about-body">
              <div className="about-body">
                <article className="about-left">
                  <h3>How I Got Here</h3>
                  <p>
                    I've always been fascinated by technology. It started with
                    drawing as a kid sketching ideas and imagining how things
                    could look and move. Around the age of ten, I discovered
                    computers, and that curiosity evolved fast.
                    <br />
                    <br />
                    I got into Photoshop, started editing videos in Adobe
                    Premiere, then moved on to game development and coding.
                    Eventually, I found myself drawn to UI design the bridge
                    between creativity and logic.
                    <br />
                    <br />
                    When I combined both worlds, everything clicked: web
                    development and software development became my way to turn
                    imagination into something real, functional, and
                    interactive.
                  </p>
                </article>

                <article className="about-right">
                  <h3>What I Do</h3>
                  <p>
                    I build responsive, accessible, and scalable web
                    applications with clean, maintainable code and a refined,
                    minimalist design philosophy. I'm drawn to minimalism I love
                    the clarity it brings, and I always make sure there's
                    structure and order in everything I create.
                    <br />
                    <br />
                    My focus is front-end development, grounded in a solid
                    understanding of full-stack workflows. I combine design
                    thinking, performance, and precision to craft seamless
                    digital experiences.
                    <br />
                    <br />
                    Whether I'm working in React, styling with Tailwind, or
                    structuring routes in Next.js, I aim for clarity,
                    efficiency, and a user-first flow.
                  </p>
                </article>
              </div>
            </div>

            <SkillsSection />
          </div>
        </section>
        {/* PROJECTS SECTION */}
        <section id="projects">
          <img
            className="hero-divider-top"
            src="/images/divider-top.png"
            alt="section divider"
          />
          <div className="projects-overlay"></div>
          <div className="projects-wrapper">
            <header className="projects-header">
              <a
                href="https://github.com/GR0UD"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="projects-github"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="40"
                  height="40"
                  color="white"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.493.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <h2 className="projects-title">Projects</h2>
              </a>
            </header>

            <div className="projects-body">
              {projectsData.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
          <img
            className="hero-divider-bot"
            src="/images/divider-bot.png"
            alt="section divider"
          />
        </section>
        {/* CONTACT SECTION */}
        <section id="contact">
          <header className="contact-header">
            <h2 className="contact-title">Contact</h2>
          </header>

          <div className="contact-wrapper">
            <ContactForm />

            <div className="contact-note">
              <hr />
              <div className="contact-note__content">
                <span>Available for freelance & full-time opportunities</span>
                <span>(CET)</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
