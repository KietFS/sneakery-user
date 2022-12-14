/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  swcMinify: true,
  images: {
    domains: [
      "cdni.iconscout.com",
      "www.facebook.com",
      "play-lh.googleusercontent.com",
      "storage.googleapis.com",
      "encrypted-tbn0.gstatic.com",
      "sneakerdaily.vn",
      "images.stockx.com",
      "cdn-images.buyma.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
