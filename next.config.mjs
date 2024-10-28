// @ts-check
import withSerwistInit from "@serwist/next";
import fs from "fs";
import path from "path";

// Leer el archivo JSON con las rutas
const precacheFilePath = path.join(process.cwd(), "precacheRoutes.json");
let additionalPrecacheEntries = [];

if (fs.existsSync(precacheFilePath)) {
  additionalPrecacheEntries = JSON.parse(
    fs.readFileSync(precacheFilePath, "utf-8")
  );
}

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  additionalPrecacheEntries,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withSerwist(nextConfig);
