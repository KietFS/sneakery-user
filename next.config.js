/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
