/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
  //   webpack: (config) => {
  //     config.experiments = {
  //       topLevelAwait: true,
  //     };
  //     return config;
  //   },
  webpack5: false,
};

export default nextConfig;
