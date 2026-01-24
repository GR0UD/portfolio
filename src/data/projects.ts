import type { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: 1,
    title: "MyMoviez",
    url: "https://projekt-moviez-gr0ud.onrender.com",
    image: "/images/project1.avif",
    description:
      "A mobile-first movie app built in React. It features dynamic content, modular components, and data from a local JSON database.",
    tags: ["React", "Vite", "JavaScript", "HTML", "SASS", "REST API", "JSON"],
  },
  {
    id: 2,
    title: "Din Mægler",
    url: "https://din-maegler.vercel.app/",
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
    tags: ["React", "Vite", "JavaScript", "HTML", "SCSS", "CUSTOM API", "JSON"],
  },
];
