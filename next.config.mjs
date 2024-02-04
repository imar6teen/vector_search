/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose", "api", "fs"],
  },
  //   webpack: (config) => {
  //     config.experiments = {
  //       topLevelAwait: true,
  //     };
  //     return config;
  //   },
};

export default nextConfig;
