/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "ichef.bbci.co.uk",
      "another-image-source.com",
      "resources.premierleague.com",
    ], // Add allowed image hosts here
  },
};

export default nextConfig;
