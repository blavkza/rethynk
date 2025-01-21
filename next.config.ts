/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { hostname: "images.pexels.com" },
      { hostname: "utfs.io" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
