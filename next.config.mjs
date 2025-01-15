// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'veterinaire-tour-hassan.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'contratistas-mercadeo.s3.us-east-1.amazonaws.com', // Agregado el dominio de S3
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
