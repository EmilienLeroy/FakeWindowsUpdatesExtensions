import WindowsUpdate from './WindowsUpdate';
const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.time) {
      windowsUpdate.togglePopup(request.time);
    }

    if (request.reset) {
      windowsUpdate.resetLoading(request.reset);
    }

    sendResponse({
      isDisplay: windowsUpdate.isDisplay,
    });

    return true;
  },
);
