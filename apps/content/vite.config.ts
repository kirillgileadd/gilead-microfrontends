import { defineConfig, type Plugin } from 'vite';
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import { microfrontends } from '@vercel/microfrontends/experimental/vite';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    tailwindcss(),
    federation({
      name: 'content',
      manifest: true,
      filename: 'remoteEntry.js',
      library: { type: 'module' },
      exposes: {
        './landing': './src/landing.tsx',
      },
      shared: {
        react: {
          singleton: true,
        },
        'react/': {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        'react-dom/': {
          singleton: true,
        },
      },
    }) as Plugin[],
    microfrontends({
      basePath: '/_content',
    }) as Plugin,
    react(),
  ],
  build: {
    target: 'chrome89',
  },
});