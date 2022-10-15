/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,
  images: {
    domains: [
      "flowbite.com",
      "cdni.iconscout.com",
      "www.facebook.com",
      "play-lh.googleusercontent.com",
      "storage.googleapis.com",
      "encrypted-tbn0.gstatic.com",
      "img.freepik.com",
      "drake.vn",
      "theme.hstatic.net",
    ],
  },
};

module.exports = nextConfig;
