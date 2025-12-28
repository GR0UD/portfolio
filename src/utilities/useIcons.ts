// React Icons
import { IoLogoSass } from "react-icons/io5";
import { TbBrandMysql, TbApi } from "react-icons/tb";
import {
  SiCsswizardry,
  SiPhp,
  SiWebpack,
  SiMamp,
  SiTypescript,
  SiMongodb,
} from "react-icons/si";
import {
  FaJs,
  FaHtml5,
  FaRegWindowMaximize,
  FaGithub,
  FaCodepen,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { GiJesterHat } from "react-icons/gi";
import { RiReactjsLine, RiNpmjsLine } from "react-icons/ri";
import { VscJson, VscVscodeInsiders } from "react-icons/vsc";
import { GrWordpress } from "react-icons/gr";
import { CgFigma } from "react-icons/cg";
import { FaGitlab, FaLocationDot, FaLinkedinIn } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaDev } from "react-icons/fa";

export const Icons = {
  // 💻 Skills
  html: FaHtml5,
  css: SiCsswizardry,
  js: FaJs,
  php: SiPhp,
  react: RiReactjsLine,
  sass: IoLogoSass,
  mysql: TbBrandMysql,
  json: VscJson,
  fetch: TbApi,
  webpack: SiWebpack,
  npm: RiNpmjsLine,
  jest: GiJesterHat,
  wordpress: GrWordpress,
  mamp: SiMamp,
  localwp: FaRegWindowMaximize,
  vscode: VscVscodeInsiders,
  figma: CgFigma,
  git: FaGitlab,
  next: RiNextjsFill,
  tailwind: RiTailwindCssFill,
  typescript: SiTypescript,
  mongodb: SiMongodb,

  // 📬 Contact & Social
  github: FaGithub,
  codepen: FaCodepen,
  instagram: FaInstagram,
  email: IoMdMail,
  phone: FaPhoneAlt,
  location: FaLocationDot,
  linkedin: FaLinkedinIn,
  devto: FaDev,
} as const;

