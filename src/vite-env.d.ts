/// <reference types="vite/client" />

declare module "~react-pages" {
  import type { RouteObject } from "react-router-dom";
  const routes: RouteObject[];
  export default routes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY: string;
  // Add other env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

