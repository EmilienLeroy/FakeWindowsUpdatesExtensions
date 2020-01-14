import WindowsUpdate from './WindowsUpdate';
const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    if (request.time && !windowsUpdate.isDisplay) {
      windowsUpdate.setTime(request.time);
      await windowsUpdate.addPopup();
    }

    if (request.stop && windowsUpdate.isDisplay) {
      windowsUpdate.removePopup();
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
