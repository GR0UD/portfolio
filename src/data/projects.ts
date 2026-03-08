import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "MyMoviez",
    url: "https://github.com/GR0UD/mymovies",
    image: "/images/project1.avif",
    description:
      "A mobile-first movie app built in React. It features dynamic content, modular components, and data from a local JSON database.",
    tags: ["React", "Vite", "JavaScript", "HTML", "SASS", "REST API", "JSON"],
  },
  {
    id: 2,
    title: "Din Mægler",
    url: "https://github.com/GR0UD/dinmaegler",
    image: "/images/project2.avif",
    description:
      "A real estate website built in React with mock data from a local JSON API. The project showcases dynamic content and responsive design with modern frontend technologies.",
    tags: ["React", "Vite", "JavaScript", "HTML", "SASS", "REST API", "JSON"],
  },
  {
    id: 3,
    title: "Tickets App",
    url: "https://movie-ticket-app-burgerking.onrender.com/",
    image: "/images/project3.avif",
    description:
      "Book your movie tickets with ease! A sleek, responsive app built with React + Vite featuring seat selection and smooth payment flow.",
    tags: ["React", "Vite", "JavaScript", "HTML", "SCSS", "REST API", "JSON"],
  },
  {
    id: 4,
    title: "SwapHub",
    url: "https://github.com/GR0UD/swaphub",
    image: "/images/project4.avif",
    description:
      "A modern marketplace platform for trading and swapping items. Built with Next.js frontend and Node.js/Express backend, featuring user authentication, item listings, swap proposals, and a responsive design with SCSS styling.",
    tags: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "JavaScript",
      "SCSS",
      "REST API",
      "SQLite",
      "Zod",
    ],
  },
  {
    id: 5,
    title: "Portfolio",
    url: "https://github.com/GR0UD/portfolio",
    image: "/images/project5.avif",
    description:
      "My personal portfolio showcasing projects and skills. Built with React and modern web technologies, featuring a clean design, component-based architecture, and functional contact form.",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "SCSS",
      "HTML",
      "Responsive Design",
      "Portfolio",
      "Zod",
    ],
  },
];
