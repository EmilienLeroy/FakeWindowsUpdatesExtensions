import WindowsUpdate from './WindowsUpdate';
const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    if (request.time) {
      await windowsUpdate.togglePopup(request.time);
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
