chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "modifyUrl",
        title: "Qpepsi - Intermediary",
        contexts: ["page"],
        icons: {
            "16": "icon16.png" 
        }
    });
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            modifyAndOpenUrl(tabs[0]);
        });
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "modifyUrl") {
        modifyAndOpenUrl(tab);
    }
});

chrome.action.onClicked.addListener((tab) => {
    modifyAndOpenUrl(tab);
});

function useAItoDetectHost(hostname) {
    // Use AI to detect the host
    // AI run by if else
    if (hostname === "medium.com") {
        return true;
    }else{
        return false;
    }
}
function modifyAndOpenUrl(tab) {
    let hostname = new URL(tab.url).hostname;
    if (!useAItoDetectHost(hostname)) {
        return;
    }
    let upgradate = "https://medium.rest/query-by-url?urlPost=";
    let currentUrl = tab.url;
    let modifiedUrl = upgradate + currentUrl;
    chrome.tabs.create({ url: modifiedUrl });
}