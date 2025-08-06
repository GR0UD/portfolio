import Header from "../components/header/header.jsx";
import Footer from "../components/footer/footer.jsx";
import Intro from "../components/intro/intro.jsx";
import { Icons } from "../utilities/icons.js";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />

      <main>
        {/* HERO SECTION */}
        <section id='hero'>
          <div className='hero-background'>
            <div className='hero-overlay'></div>
            <video
              className='hero-video'
              src='/video/hero.mp4'
              autoPlay
              muted
              loop
              playsInline
              aria-hidden='true'
            />
          </div>
          <header className='hero-header'>
            <div className='hero-content'>
              <h1>
                <span>Hey, I'm</span> Mark 👋
              </h1>
              <h2>A Front-End Developer</h2>
              <p>
                Based in Denmark — I build clean, fast, and user-focused web
                experiences.
              </p>
              <a href='#projects' className='btn'>
                Explore My Work
              </a>
            </div>
            <a href='#about' className='hero-blob'>
              <img src='/images/me.png' alt='A beautiful image of me :)' />
            </a>
          </header>
          <img
            className='hero-divider'
            src='/images/divider-bot.png'
            alt='section divider'
          />
        </section>

        {/* ABOUT SECTION */}
        <section id='about'>
          <div className='about-wrapper'>
            <header className='about-header'>
              <h2 className='about-title'>About</h2>
            </header>

            <div className='about-body'>
              <article className='about-left'>
                <h3>How I Got Here</h3>
                <p>
                  Ever since I was a kid, I’ve been endlessly curious—always
                  taking things apart, exploring new ideas, and diving headfirst
                  into challenges just to figure out how they work. That mindset
                  eventually led me to the world of web development. After
                  experimenting with basic HTML and styling as a teen, I started
                  building real projects—from small static pages to full
                  CMS-powered sites. Over time, I sharpened my coding skills,
                  got hands-on with frameworks, and grew passionate about
                  creating digital experiences that feel as smooth as they look.
                </p>
              </article>

              <article className='about-right'>
                <h3>What I Do</h3>
                <p>
                  I build responsive, accessible, and scalable web applications
                  with clean, maintainable code and a minimalist design
                  approach. I focus on front-end development with a solid
                  understanding of full-stack workflows. My work combines
                  structure, performance, and design thinking. Whether I’m
                  building in React, styling with Tailwind, or setting up
                  Next.js routing, I aim for clarity, efficiency, and user-first
                  functionality.
                </p>
              </article>
            </div>

            <div className='about-bottom'>
              <div className='skills-section'>
                <div className='skills-columns'>
                  <div>
                    <h4>Development</h4>
                    <ul>
                      <li>
                        <Icons.html className='tech-icon' /> HTML
                      </li>
                      <li>
                        <Icons.css className='tech-icon' /> CSS
                      </li>
                      <li>
                        <Icons.js className='tech-icon' /> JavaScript
                      </li>
                      <li>
                        <Icons.jsx className='tech-icon' /> JSX
                      </li>
                      <li>
                        <Icons.php className='tech-icon' /> PHP
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4>Front-End / Styling</h4>
                    <ul>
                      <li>
                        <Icons.react className='tech-icon' /> React (Vite)
                      </li>
                      <li>
                        <Icons.next className='tech-icon' /> Next.js
                      </li>
                      <li>
                        <Icons.tailwind className='tech-icon' /> Tailwind CSS
                      </li>
                      <li>
                        <Icons.sass className='tech-icon' /> SASS / SCSS
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4>Backend / Tooling</h4>
                    <ul>
                      <li>
                        <Icons.mysql className='tech-icon' /> MySQL
                      </li>
                      <li>
                        <Icons.json className='tech-icon' /> JSON
                      </li>
                      <li>
                        <Icons.fetch className='tech-icon' /> Fetch API
                      </li>
                      <li>
                        <Icons.webpack className='tech-icon' /> Webpack
                      </li>
                      <li>
                        <Icons.npm className='tech-icon' /> npm
                      </li>
                      <li>
                        <Icons.jest className='tech-icon' /> Jest
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4>CMS / Dev Tools</h4>
                    <ul>
                      <li>
                        <Icons.wordpress className='tech-icon' /> WordPress
                      </li>
                      <li>
                        <Icons.mamp className='tech-icon' /> MAMP
                      </li>
                      <li>
                        <Icons.localwp className='tech-icon' /> LocalWP
                      </li>
                      <li>
                        <Icons.vscode className='tech-icon' /> VS Code
                      </li>
                      <li>
                        <Icons.figma className='tech-icon' /> Figma
                      </li>
                      <li>
                        <Icons.git className='tech-icon' /> Git
                      </li>
                      <li>
                        <Icons.github className='tech-icon' /> GitHub
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id='projects'>
          <img
            className='hero-divider-top'
            src='/images/divider-top.png'
            alt='section divider'
          />
          <div className='projects-overlay'></div>
          <div className='projects-wrapper'>
            <header className='projects-header'>
              <h2 className='projects-title'>Projects</h2>
            </header>

            <div className='projects-body'>
              <article className='project-card'>
                <a
                  href='https://projekt-moviez-gr0ud.onrender.com'
                  className='project-link'
                >
                  <img
                    src='/images/project1.png'
                    alt='MyMoviez'
                    className='project-image'
                  />

                  <h3>MyMoviez</h3>

                  <p>
                    Vores første mobilfokuserede filmapp lavet i React. Den
                    viser dynamisk indhold, modulære komponenter og bruger data
                    fra en lokal JSON-database.
                  </p>

                  <div className='project-tech-tags'>
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

              <article className='project-card'>
                <a
                  href='https://praktik-din-m-gler-team-2.onrender.com'
                  className='project-link'
                >
                  <img
                    src='/images/project2.png'
                    alt='Din maegler'
                    className='project-image'
                  />
                  <h3>Din maegler</h3>
                  <p>
                    Et ejendomsmægler-site lavet i React med mock-data fra en
                    lokal JSON-API. Projektet viser dynamisk indhold og
                    responsivt design med fokus på moderne frontend-teknologier.
                  </p>{" "}
                  <div className='project-tech-tags'>
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

              <article className='project-card'>
                <a
                  href='https://movie-ticket-app-burgerking.onrender.com/'
                  className='project-link'
                >
                  <img
                    src='/images/project3.png'
                    alt='Project 3'
                    className='project-image'
                  />
                  <h3>Tickets App</h3>
                  <p>
                    Book your movie tickets with ease! A sleek, responsive app
                    built with React + Vite featuring seat selection and smooth
                    payment flow.
                  </p>
                  <div className='project-tech-tags'>
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
            className='hero-divider-bot'
            src='/images/divider-bot.png'
            alt='section divider'
          />
        </section>

        {/* CONTACT SECTION */}
        <section id='contact'>
          <header className='contact-header'>
            <h2 className='contact-title'>Contact</h2>
          </header>

          <div className='contact-wrapper'>
            <form id='contact-form' className='form-horizontal' role='form'>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Name'
                  name='name'
                  required
                />
              </div>

              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  placeholder='Email'
                  name='email'
                  required
                />
              </div>

              <textarea
                className='form-control'
                rows='10'
                placeholder='Drop your message here'
                name='message'
                required
              ></textarea>

              <button
                className='btn btn-primary send-button'
                id='submit'
                type='submit'
              >
                <div className='alt-send-button'>
                  <i className='fa fa-paper-plane'></i>
                  <span className='send-text'>SEND</span>
                </div>
              </button>
            </form>

            <div className='direct-contact-container'>
              <ul className='contact-list'>
                <li className='list-item'>
                  <Icons.location className='tech-icon' />
                  <span className='contact-text location'>
                    <a
                      href='https://www.google.dk/maps/place/4000+Roskilde/@55.6700326,11.9161574,32811m/data=!3m2!1e3!4b1!4m6!3m5!1s0x46525fc995012f29:0xa00afcc1d507710!8m2!3d55.64191!4d12.087845!16zL20vMGtzcHc?hl=da&entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D'
                      title='Find me here in roskilde'
                    >
                      Roskilde, Denmark
                    </a>
                  </span>
                </li>
                <li className='list-item'>
                  <Icons.phone className='tech-icon' />
                  <span className='contact-text phone'>
                    <a href='tel:+4591953139' title='Call me'>
                      (+45) 91 95 31 39
                    </a>
                  </span>
                </li>
                <li className='list-item'>
                  <Icons.email className='tech-icon' />
                  <span className='contact-text gmail'>
                    <a href='mailto:marksgalkins@gmail.com'>
                      marksgalkins@gmail.com
                    </a>
                  </span>
                </li>
              </ul>

              <hr />

              <ul className='social-media-list'>
                <li className='github'>
                  <a
                    href='https://github.com/GR0UD'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='GitHub'
                  >
                    <Icons.github className='tech-icon' />
                  </a>
                </li>
                <li className='codepen'>
                  <a
                    href='https://codepen.io/GROUD-the-solid'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='CodePen'
                  >
                    <Icons.codepen className='tech-icon' />
                  </a>
                </li>
                <li className='linkedin'>
                  <a
                    href='https://www.linkedin.com/in/mark-galkins-7252092b0/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='LinkedIn'
                  >
                    <Icons.linkedin className='tech-icon' />
                  </a>
                </li>
                <li className='instagram'>
                  <a
                    href='https://www.instagram.com/gr0ud/'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Instagram'
                  >
                    <Icons.instagram className='tech-icon' />
                  </a>
                </li>
              </ul>

              <hr />
              <div className='copyright'>
                &copy; {new Date().getFullYear()} Mark Galkins. All rights
                reserved.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
