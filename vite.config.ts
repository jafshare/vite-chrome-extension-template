import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import manifest from "./src/manifest.json";
import viteContentStylePlugin from "./plugins/contentStyle/viteContentStylePlugin";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log("command:", command, command === "build" ? "src" : ".");
  return {
    root: command === "build" ? "src" : ".",
    // 开启browserPolyfill
    plugins: [
      react(),
      chromeExtension({
        manifest,
        browserPolyfill: true,
      }),
      viteContentStylePlugin(),
    ],
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/styles/variables.less";',
        },
      },
    },
    resolve: {
      alias: {
        "~": resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: resolve(__dirname, "./dist"),
    },
  };
});
