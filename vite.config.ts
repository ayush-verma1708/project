import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      port: 5013, // Dev server port
      host: 'localhost', // Bind to localhost in dev
      strictPort: true, // Fail if port is taken
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5013,
        timeout: 20000, // Stabilize HMR
      },
      watch: {
        usePolling: false, // Default; set to true if needed
      },
    },
    optimizeDeps: {
      // Only exclude in dev if necessary; remove for prod
      exclude: mode === 'development' ? ['lucide-react'] : [],
    },
    build: {
      outDir: 'dist', // Default output directory
      sourcemap: mode === 'development', // Enable sourcemaps in dev only
      rollupOptions: {
        // Ensure external dependencies are handled correctly
        external: [],
      },
    },
    base: mode === 'production' ? '/' : '/', // Adjust if deploying to a subdirectory
  };
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });
