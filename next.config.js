/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // or "20mb" if your PDFs are bigger
    },
  },
};

module.exports = nextConfig;
