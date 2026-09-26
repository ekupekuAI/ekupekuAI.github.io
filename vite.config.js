import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps asset paths relative so the build works on GitHub Pages
// whether it's served from the domain root or a /repo-name/ sub-path.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
