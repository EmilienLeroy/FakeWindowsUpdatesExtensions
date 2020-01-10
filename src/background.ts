chrome.runtime.onInstalled.addListener((): void => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, (): void => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher(
        {
          pageUrl: { schemes: ['https', 'http'] },
        },
      )],
      actions: [new chrome.declarativeContent.ShowPageAction()],
    }]);
  });
});
