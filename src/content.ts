import WindowsUpdate from './WindowsUpdate';
const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    windowsUpdate.togglePopup(request.time);
    sendResponse({
      isDisplay: windowsUpdate.isDisplay,
    });
    return true;
  },
);
