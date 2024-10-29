// @ts-check
import withSerwistInit from "@serwist/next";
import fs from "fs";
import path from "path";

const precacheFilePath = path.join(process.cwd(), "precacheRoutes.json");

const additionalPrecacheEntries = fs.existsSync(precacheFilePath)
  ? JSON.parse(fs.readFileSync(precacheFilePath, "utf-8"))
  : [];

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV !== "production",
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

export default withSerwist(nextConfig);
