import browser from "webextension-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App";

export default async function renderContent(
  render: (appRoot: HTMLElement) => void
) {
  const contentID = "__app_container__";
  const appContainer = document.createElement("div");
  const shadowRoot =
    appContainer?.attachShadow({
      mode: __isDev__ ? "open" : "closed",
    }) || appContainer;
  const appRoot = document.createElement("div");
  // 如果开发模式则动态导入样式，否则直接在content_scripts配置content的样式
  const styleEl = document.createElement("link");
  //添加样式
  styleEl.setAttribute("rel", "stylesheet");
  styleEl.setAttribute(
    "href",
    // content样式的路径
    browser.runtime.getURL("assets/content.main.css")
  );
  // 为根元素增加标识
  appRoot.setAttribute("id", contentID);
  shadowRoot.appendChild(styleEl);
  shadowRoot.appendChild(appRoot);
  document.body.appendChild(appContainer);
  render(appRoot);
}

renderContent((appRoot) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appRoot
  );
});
console.log("content");
