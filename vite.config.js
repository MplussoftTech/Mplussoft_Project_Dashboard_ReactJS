import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   base: './', // ← add this
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0", // Listen on all network interfaces
//     port: 4000, // Or any port you prefer
//   },
// });


export default defineConfig({
  base: "/", // ✅ ABSOLUTE PATH! Works with BrowserRouter
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 4000,
  },
  optimizeDeps: {
    exclude: ["@reduxjs/toolkit"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist", // output folder for build
  },
});
