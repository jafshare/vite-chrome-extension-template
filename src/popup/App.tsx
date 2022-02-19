// 导入全局样式
import "~/assets/styles/index.less";
import "./App.css";
import { useState, useMemo } from "react";
import SearchPanel from "./components/SearchPanel";
function App() {
  const tabs = [
    {
      title: "查词",
      key: "search",
      content: (
        <>
          <SearchPanel />
        </>
      ),
    },
    { title: "词库", key: "store", content: <>词库</> },
    { title: "配置", key: "setting", content: <>配置</> },
  ];
  const [active, setActive] = useState("search");
  const content = useMemo(
    () => tabs.find((tab) => tab.key === active)?.content || <></>,
    [active]
  );

  return (
    <div className="w-96 card card-compact">
      <div className="card-body">
        <div className="tabs tabs-boxed">
          {tabs.map((tab) => {
            return (
              <a
                className={"tab " + (active === tab.key ? "tab-active" : "")}
                onClick={() => setActive(tab.key)}
              >
                {tab.title}
              </a>
            );
          })}
        </div>
        <div className="content">{content}</div>
      </div>
    </div>
  );
}

export default App;
