const windowsUpdate = new WindowsUpdate({time: "500000"});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        windowsUpdate.togglePopup();
        sendResponse({
            isDisplay: windowsUpdate.isDisplay,
        });
        return true;
    }
);


