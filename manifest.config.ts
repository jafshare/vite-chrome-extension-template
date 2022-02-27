export default {
  manifest_version: 3,
  author: "HunterJiang",
  description: "A translate tools",
  name: "Translate",
  version: "1.0.0",
  icons: {
    "16": "icons/16.png",
    "32": "icons/32.png",
    "48": "icons/48.png",
    "64": "icons/64.png",
    "96": "icons/96.png",
    "128": "icons/128.png",
    "256": "icons/256.png",
  },
  permissions: ["storage", "activeTab"],
  host_permissions: ["*://*/*"],
  action: {
    default_title: "click",
    default_popup: "src/popup/index.html",
    default_icon: {
      "16": "icons/16.png",
      "32": "icons/32.png",
      "48": "icons/48.png",
      "128": "icons/128.png",
    },
  },
  options_page: "src/options/index.html",
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["*://*/*"],
    },
  ],
  background: {
    service_worker: "src/background/index.ts",
  },
  web_accessible_resources: [
    {
      matches: ["*://*/*"],
      resources: [
        // 打包后的content样式访问路径
        "assets/content.main.css",
      ],
      use_dynamic_url: true,
    },
  ],
};
