
// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // optional but recommended
  images: {
    domains: [
      "lh3.googleusercontent.com", // allow Google profile pics
    ],
  },

};

module.exports = nextConfig;
