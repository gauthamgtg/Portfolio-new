/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three / R3F ship ESM that benefits from transpilation in the Next build
  transpilePackages: ["three"],
};

export default nextConfig;
