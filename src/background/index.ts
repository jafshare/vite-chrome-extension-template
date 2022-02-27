console.log("background");
chrome.runtime.onInstalled.addListener(() => {
  console.log("----Plugins is installed----");
});
