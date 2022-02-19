import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import App from "./App";

export default async function renderContent(
  render: (appRoot: HTMLElement) => void
) {
  const contentID = "__translate_app_container__";
  // const appContainer = document.createElement("div");
  // const shadowRoot = appContainer.attachShadow({
  //   mode: import.meta.env.DEV ? "open" : "closed",
  // });
  const appRoot = document.createElement("div");
  appRoot.setAttribute("id", contentID);
  // shadowRoot.appendChild(appRoot);
  // document.body.appendChild(appContainer);
  document.body.appendChild(appRoot);
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
