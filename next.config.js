/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Server-side rendering configuration (removing static export)
  
  // Disable image optimization if needed
  images: {
    unoptimized: false, // Set to false for server-side rendering
  },
};

module.exports = nextConfig; 