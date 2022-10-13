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
    ],
  },
  async rewrites() {
    return [
      {
        source: "/auth/login",
        destination: "http://teachers-values.at.ply.gg:46996/api/auth/signup",
      },
    ];
  },
};

module.exports = nextConfig;
