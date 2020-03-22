const rules = [{
  conditions: [new chrome.declarativeContent.PageStateMatcher(
    {
      pageUrl: { schemes: ['https', 'http'] },
    },
  )],
  actions: [new chrome.declarativeContent.ShowPageAction()],
}];

chrome.runtime.onInstalled.addListener((): void => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, (): void => {
    chrome.declarativeContent.onPageChanged.addRules(rules, () => {
      chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
        tabs.forEach((tab: chrome.tabs.Tab) => addShortCutListener(tab));
      });
    });
  });
});

chrome.tabs.onCreated.addListener((tab: chrome.tabs.Tab) => {
  addShortCutListener(tab);
});

function addShortCutListener(tab: chrome.tabs.Tab) {
  chrome.commands.onCommand.addListener((command) => {
    if (command === 'toggle-windows') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs): void => {
        if (tabs[0].id === tab.id) {
          chrome.tabs.sendMessage(tab.id, { toggle: true });
        }
      });
    }
  });
}
