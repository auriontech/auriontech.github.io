/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js optimized images
  },
  distDir: "out",
  assetPrefix: "./",
};

module.exports = nextConfig;
