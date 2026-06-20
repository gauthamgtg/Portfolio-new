/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships ESM that benefits from transpilation in the Next pipeline.
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
