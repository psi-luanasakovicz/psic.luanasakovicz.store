import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Evita referências a chunks antigos (ex.: ./611.js) após HMR no Windows.
      config.cache = { type: 'memory' };
    }

    return config;
  },
};

export default nextConfig;
