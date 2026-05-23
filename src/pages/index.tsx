import { useRef, useEffect, lazy, Suspense } from "react";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import { Icons } from "../utilities/useIcons";
const ContactForm = lazy(
  () => import("../components/contact-form/contact-form"),
);
import ProjectCard from "../components/ProjectCard/ProjectCard";
import SkillsSection from "../components/SkillsSection/SkillsSection";
import ScrollDownButton from "../components/ScrollDownButton/ScrollDownButton";
import { projectsData } from "../data/projects";
import { useTranslation } from "../i18n/TranslationContext";
import type { TranslationKey } from "../i18n/translations";
import { getCETimezone } from "../utilities/getCETimezone";

const ceTimezone = getCETimezone();

export default function Home() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const emojiRef = useRef<HTMLElement>(null);

  // Force video play on mount (iOS fix)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
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

  // Trigger emoji wave animation when intro animation finishes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (emojiRef.current) {
        emojiRef.current.classList.add("wave");
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

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
              poster="/video/hero.avif"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              controls={false}
            />
          </div>
          <header className="hero-header">
            <div className="hero-content">
              <h1>
                <span>{t("heroGreeting")}</span> <strong>Mark</strong>{" "}
                <span className="emoji" ref={emojiRef}>
                  👋
                </span>
              </h1>
              <h2>{t("heroSubtitle")}</h2>
              <p>{t("heroDescription")}</p>
              <div className="hero-buttons">
                <a href="#projects" className="btn">
                  {t("heroCta")}
                </a>
                <a href="#contact" className="btn">
                  {t("heroContact")}
                </a>
              </div>
            </div>
          </header>
          <ScrollDownButton />
          <img
            className="hero-divider"
            src="/images/divider-bot.png"
            alt="section divider"
            loading="lazy"
          />
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <div className="about-wrapper">
            <div className="about-body">
              <article className="about-left">
                <h3>{t("aboutTitle1")}</h3>
                <p>
                  {t("aboutP1a")}
                  <br />
                  <br />
                  {t("aboutP1b")}
                  <br />
                  <br />
                  {t("aboutP1c")}
                </p>
              </article>

              <article className="about-right">
                <h3>{t("aboutTitle2")}</h3>
                <p>
                  {t("aboutP2a")}
                  <br />
                  <br />
                  {t("aboutP2b")}
                  <br />
                  <br />
                  {t("aboutP2c")}
                </p>
              </article>
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
            loading="lazy"
          />
          <div className="projects-overlay"></div>
          <div className="projects-wrapper">
            <header className="projects-header">
              <h2 className="projects-title">{t("projectsTitle")}</h2>
            </header>

            <div className="projects-body">
              {projectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  {...project}
                  description={t(`project${project.id}Desc` as TranslationKey)}
                />
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
          <div className="contact-wrapper">
            <div className="contact-body">
              <div className="contact-info">
                <h3 className="contact-info__title">{t("contactInfoTitle")}</h3>
                <p className="contact-info__description">
                  {t("contactInfoDescription")}
                </p>
                <div className="contact-info__items">
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <Icons.email />
                    </div>
                    <div className="contact-info__text">
                      <span className="contact-info__label">
                        {t("contactInfoEmailLabel")}
                      </span>
                      <a
                        href="mailto:marksgalkins@gmail.com"
                        className="contact-info__value contact-info__value--link"
                      >
                        {t("contactInfoEmailValue")}
                      </a>
                    </div>
                  </div>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <FaClock />
                    </div>
                    <div className="contact-info__text">
                      <span className="contact-info__label">
                        {t("contactInfoResponseLabel")}
                      </span>
                      <span className="contact-info__value">
                        {t("contactInfoResponseValue")}
                      </span>
                    </div>
                  </div>
                  <div className="contact-info__item">
                    <div className="contact-info__icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="contact-info__text">
                      <span className="contact-info__label">
                        {t("contactInfoCallLabel")}
                      </span>
                      <span className="contact-info__value">
                        {t("contactInfoCallValue")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Suspense fallback={<div style={{ minHeight: "400px" }} />}>
                <ContactForm />
              </Suspense>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
