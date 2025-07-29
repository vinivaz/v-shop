import type { NextConfig } from "next";

const isVercel = !!process.env.VERCEL_URL;
console.log(process.env.VERCEL_URL)

const nextConfig: NextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
    env: {
    NEXTAUTH_URL: isVercel
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",

    NEXT_ROOT_URL: isVercel
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",

    NEXT_PUBLIC_URL: isVercel
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  },

};

export default nextConfig;
