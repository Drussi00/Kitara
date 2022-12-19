/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["cdn.sanity.io","commondatastorage.googleapis.com"] },
};

module.exports = nextConfig;
