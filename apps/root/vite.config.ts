import { defineConfig, type Plugin } from 'vite';
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import { microfrontends } from '@vercel/microfrontends/experimental/vite';
import { vercelToolbar } from '@vercel/toolbar/plugins/vite';
import react from '@vitejs/plugin-react';

// eslint-disable-next-line import/no-default-export
export default defineConfig(() => {
  
  return {
    plugins: [
      tailwindcss(),
      vercelToolbar(),
      federation({
        name: 'root',
        manifest: true,
        remotes: {
          navigation: {
            type: 'module',
            name: 'navigation',
            entry: '/_navigation/remoteEntry.js',
          },
          content: {
            type: 'module',
            name: 'content',
            entry: '/_content/remoteEntry.js',
          },
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
      microfrontends() as Plugin,
      react(),
    ],
    build: {
      target: 'chrome89',
    },
  };
});
