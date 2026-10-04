import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/estadisticas",
        destination: "/reportes",
        permanent: false,
      },
      {
        source: "/analiticas",
        destination: "/reportes",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
