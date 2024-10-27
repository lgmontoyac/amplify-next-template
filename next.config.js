/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/stage\.d3bds4wb3334u\.amplifyapp\.com\/.*$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24, // Cache por 1 día
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|html|png|jpg|jpeg|svg|gif|ico)$/,
      handler: "CacheFirst",
      options: {
        cacheName: "static-resources",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache por 30 días
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA({
  ...nextConfig,
});
