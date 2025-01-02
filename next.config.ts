import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   async redirects() {
      return [
         {
            source: "/",
            destination: "/auth",
            permanent: false,
         },
      ];
   },
   images: {
      domains: ["fonts.gstatic.com", "upload.wikimedia.org"],
   },
};

export default nextConfig;
