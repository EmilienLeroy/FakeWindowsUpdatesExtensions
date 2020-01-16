import WindowsUpdate from './WindowsUpdate';
const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
  async (request, sender, sendResponse) => {
    if (request.time && !windowsUpdate.isDisplay) {
      windowsUpdate.setTime(request.time);
      await windowsUpdate.addPopup(request.fullscreen);
    }

    if (request.stop && windowsUpdate.isDisplay) {
      windowsUpdate.removePopup();
    }

    if (request.reset) {
      windowsUpdate.resetLoading(request.reset);
    }

    if (request.toggle) {
      chrome.storage.sync.get(['time', 'fullscreen'], (store) => {
        windowsUpdate.togglePopup(store.time || '60', store.fullscreen);
      });
    }

    sendResponse({
      isDisplay: windowsUpdate.isDisplay,
    });

    return true;
  },
);
