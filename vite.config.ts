import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/scss/_reset.scss";
        @import "./src/scss/_variables.scss";
        @import "./src/scss/_main.scss";
        `,
      },
    },
  },
});
