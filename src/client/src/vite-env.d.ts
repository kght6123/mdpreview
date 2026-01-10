/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STATIC_MODE?: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
