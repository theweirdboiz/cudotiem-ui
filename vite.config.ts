import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   "@": path.resolve(__dirname, "/src"),
    //   "@config": path.resolve(__dirname, "/src/config"),
    //   "@components": path.resolve(__dirname, "/src/components"),
    //   "@pages": path.resolve(__dirname, "/src/pages"),
    //   "@routes": path.resolve(__dirname, "/src/routes"),
    //   "@layouts": path.resolve(__dirname, "/src/layouts"),
    //   "@hooks": path.resolve(__dirname, "/src/hooks"),
    //   "@services": path.resolve(__dirname, "/src/services"),
    //   "@ultis": path.resolve(__dirname, "/src/ultis"),
    //   "@assets": path.resolve(__dirname, "/src/assets"),
    // },
  },
  plugins: [react()],
});
