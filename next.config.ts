import type { NextConfig } from "next";

// Для GitHub Pages задаётся в CI (NEXT_PUBLIC_BASE_PATH=/fortuna_ph).
// Локально и на Netlify — пусто, сайт работает от корня.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
