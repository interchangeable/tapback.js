// vite.config.ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/api/index.ts"),
      name: "Tapback",
      fileName: (format) => `tapback.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: [],
      output: {
        // Provide global variables for UMD build
        globals: {},
      },
    },
    sourcemap: true,
    minify: "terser",
  },
  plugins: [
    dts(), // Generate TypeScript declaration files
  ],
  server: {
    proxy: {
      // Proxy API requests to backend during development
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
