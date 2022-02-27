import { resolve, isAbsolute } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chromeExtension } from "rollup-plugin-chrome-extension";
import manifest from "./manifest.config";
const PORT = 12345;
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const IS_DEV = mode === "development";
  return {
    define: {
      __isDev__: IS_DEV,
    },
    server: {
      port: PORT,
    },
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
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // 修改content.main.css的输出文件
            if (assetInfo.name === "main.tsx.css") {
              return "assets/content.main.css";
            }
            return "assets/[name].[hash].[ext]";
          },
        },
      },
    },
    plugins: [
      react(),
      // 开启browserPolyfill
      chromeExtension({
        manifest,
        browserPolyfill: true,
      }),
      {
        name: "pathTransform",
        apply: "build",
        enforce: "pre",
        resolveId(id) {
          // 解决vite内置插件 vite:build-html，打包调用了path.posix.relative，使得window的路径比较出现了问题,需要修改html返回的id符合 F:/src/index.js的格式
          if (id.endsWith(".html")) {
            if (!isAbsolute(id)) {
              id = resolve(__dirname, id).replace(/\\/g, "/");
            }
            return id;
          }
          return null;
        }
      },
    ],
  };
});
