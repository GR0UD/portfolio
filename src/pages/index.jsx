import { useRef } from "react";
import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";
import Intro from "../components/intro/intro.jsx";
import ContactForm from "../components/contact-form/contact-form.jsx";
import { Icons } from "../utilities/icons.js";
import useMousePosition from "../utilities/useMousePosition.js";

// Skill data with website links and brand colors
const skillsData = {
  development: [
    {
      icon: Icons.html,
      name: "HTML",
      url: "https://html.spec.whatwg.org/",
      color: "#E34C26",
    },
    {
      icon: Icons.css,
      name: "CSS",
      url: "https://www.w3.org/Style/CSS/",
      color: "#1572B6",
    },
    {
      icon: Icons.js,
      name: "JavaScript",
      url: "https://www.javascript.com/",
      color: "#F7DF1E",
    },
    {
      icon: Icons.jsx,
      name: "JSX",
      url: "https://react.dev/",
      color: "#61DAFB",
    },
    {
      icon: Icons.php,
      name: "PHP",
      url: "https://www.php.net/",
      color: "#777BB4",
    },
  ],
  frontend: [
    {
      icon: Icons.react,
      name: "React (Vite)",
      url: "https://react.dev/",
      color: "#61DAFB",
    },
    {
      icon: Icons.next,
      name: "Next.js",
      url: "https://nextjs.org/",
      color: "#000000",
    },
    {
      icon: Icons.tailwind,
      name: "Tailwind CSS",
      url: "https://tailwindcss.com/",
      color: "#06B6D4",
    },
    {
      icon: Icons.sass,
      name: "SASS / SCSS",
      url: "https://sass-lang.com/",
      color: "#CC6699",
    },
  ],
  backend: [
    {
      icon: Icons.mysql,
      name: "MySQL",
      url: "https://www.mysql.com/",
      color: "#00758F",
    },
    {
      icon: Icons.json,
      name: "JSON",
      url: "https://www.json.org/",
      color: "#000000",
    },
    {
      icon: Icons.fetch,
      name: "Fetch API",
      url: "https://fetch.spec.whatwg.org/",
      color: "#F7DF1E",
    },
    {
      icon: Icons.webpack,
      name: "Webpack",
      url: "https://webpack.js.org/",
      color: "#8DD6F9",
    },
    {
      icon: Icons.npm,
      name: "npm",
      url: "https://www.npmjs.com/",
      color: "#CB3837",
    },
    {
      icon: Icons.jest,
      name: "Jest",
      url: "https://jestjs.io/",
      color: "#C21325",
    },
  ],
  tools: [
    {
      icon: Icons.wordpress,
      name: "WordPress",
      url: "https://wordpress.org/",
      color: "#0073AA",
    },
    {
      icon: Icons.mamp,
      name: "MAMP",
      url: "https://www.mamp.info/",
      color: "#9B4D96",
    },
    {
      icon: Icons.localwp,
      name: "LocalWP",
      url: "https://localwp.com/",
      color: "#11A5A7",
    },
    {
      icon: Icons.vscode,
      name: "VS Code",
      url: "https://code.visualstudio.com/",
      color: "#007ACC",
    },
    {
      icon: Icons.figma,
      name: "Figma",
      url: "https://www.figma.com/",
      color: "#F24E1E",
    },
    {
      icon: Icons.git,
      name: "Git",
      url: "https://git-scm.com/",
      color: "#F1502F",
    },
    {
      icon: Icons.github,
      name: "GitHub",
      url: "https://github.com/",
      color: "#181717",
    },
  ],
};

const SkillLink = ({ icon: Icon, name, url, color }) => (
  <li>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="skill-link"
      style={{ "--skill-color": color }}
    >
      <Icon className="tech-icon" /> {name}
    </a>
  </li>
);

export default function Home() {
  const videoRef = useRef(null);

  useMousePosition((moveX, moveY) => {
    if (videoRef.current) {
      const translateX = moveX * 5.5;
      const translateY = moveY * 5.5;
      videoRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(1.05)`;
    }
  }, 0.05);

  return (
    <>
      <Intro />
      <Header />

      <main>
        <h1 style={{ position: "absolute", left: "-9999px" }}>
          Mark Galkins - Full Stack Developer Portfolio
        </h1>
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
              aria-hidden="true"
              controls={false}
            />
          </div>
          <header className="hero-header">
            <div className="hero-content">
              <h2>
                <span>Hey, I'm</span> <strong>Mark</strong> 👋
              </h2>
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
          <img
            className="hero-divider"
            src="/images/divider-bot.png"
            alt="section divider"
          />
        </section>
        {/* ABOUT SECTION */}
        <section id="about">
          <div className="about-wrapper">
            <header className="about-header">
              <h2 className="about-title">About</h2>
            </header>

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

            <div className="about-bottom">
              <div className="skills-section">
                <div className="skills-columns">
                  <div>
                    <h4>Development</h4>
                    <ul>
                      {skillsData.development.map((skill) => (
                        <SkillLink key={skill.name} {...skill} />
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Front-End / Styling</h4>
                    <ul>
                      {skillsData.frontend.map((skill) => (
                        <SkillLink key={skill.name} {...skill} />
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>Backend / Tooling</h4>
                    <ul>
                      {skillsData.backend.map((skill) => (
                        <SkillLink key={skill.name} {...skill} />
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4>CMS / Dev Tools</h4>
                    <ul>
                      {skillsData.tools.map((skill) => (
                        <SkillLink key={skill.name} {...skill} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
              <h2 className="projects-title">Projects</h2>
            </header>

            <div className="projects-body">
              <article className="project-card">
                <a
                  href="https://projekt-moviez-gr0ud.onrender.com"
                  className="project-link"
                >
                  <img
                    src="/images/project1.avif"
                    alt="MyMoviez"
                    className="project-image"
                  />

                  <h3>MyMoviez</h3>

                  <p>
                    Vores første mobilfokuserede filmapp lavet i React . Den
                    viser dynamisk indhold, modulære komponenter og bruger data
                    fra en lokal JSON-database.
                  </p>

                  <div className="project-tech-tags">
                    <span>React</span>
                    <span>Vite</span>
                    <span>JavaScript</span>
                    <span>HTML</span>
                    <span>SASS</span>
                    <span>REST API</span>
                    <span>JSON</span>
                  </div>
                </a>
              </article>

              <article className="project-card">
                <a
                  href="https://din-maegler-v91p.vercel.app/"
                  className="project-link"
                >
                  <img
                    src="/images/project2.avif"
                    alt="Din maegler"
                    className="project-image"
                  />
                  <h3>Din maegler</h3>
                  <p>
                    Et ejendomsmægler-site lavet i React med mock-data fra en
                    lokal JSON-API . Projektet viser dynamisk indhold og
                    responsivt design med fokus på moderne frontend-teknologier.
                  </p>{" "}
                  <div className="project-tech-tags">
                    <span>React</span>
                    <span>Vite</span>
                    <span>JavaScript</span>
                    <span>HTML</span>
                    <span>SASS</span>
                    <span>REST API</span>
                    <span>JSON</span>
                  </div>
                </a>
              </article>

              <article className="project-card">
                <a
                  href="https://movie-ticket-app-burgerking.onrender.com/"
                  className="project-link"
                >
                  <img
                    src="/images/project3.avif"
                    alt="Project 3"
                    className="project-image"
                  />
                  <h3>Tickets App</h3>
                  <p>
                    Book your movie tickets with ease! A sleek, responsive app
                    built with React + Vite featuring seat selection and smooth
                    payment flow.
                  </p>
                  <div className="project-tech-tags">
                    <span>React</span>
                    <span>Vite</span>
                    <span>JavaScript</span>
                    <span>HTML</span>
                    <span>SCSS</span>
                    <span>CUSTOM API</span>
                    <span>JSON</span>
                  </div>
                </a>
              </article>
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

      <Footer />
    </>
  );
}
