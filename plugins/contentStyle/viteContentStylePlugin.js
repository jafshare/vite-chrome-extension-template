/**
 * 提供谷歌插件的content脚本样式自动加载的功能
 */
import contentScriptStyleHandler from './contentStyleHandler'

export default function viteContentStylePlugin() {
  return {
    name: "viteContentStylePlugin",
    enforce: "post", // required to revert vite asset self.location transform to import.meta.url
    configureServer(server) {
      server.middlewares.use(contentScriptStyleHandler);
    },
  };
}
