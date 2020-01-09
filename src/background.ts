chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
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
