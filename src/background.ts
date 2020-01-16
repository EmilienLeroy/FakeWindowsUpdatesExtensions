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
      chrome.commands.onCommand.addListener((command) => {
        if (command === 'toggle-windows') {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { toggle: true });
          });
        }
      });
    });
  });
});
