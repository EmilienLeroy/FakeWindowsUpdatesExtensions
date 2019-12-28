const windowsUpdate = new WindowsUpdate();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        windowsUpdate.togglePopup(request.time);
        sendResponse({
            isDisplay: windowsUpdate.isDisplay,
        });
        return true;
    }
);


