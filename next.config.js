/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Set output to 'export' for static site generation
  output: 'export',
  
  // Use empty prefix to ensure proper path resolution in static export
  assetPrefix: '',
  
  // Add trailing slashes for static exports
  trailingSlash: true,
  
  // Disable image optimization for static exports
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 