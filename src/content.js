const windowsUpdate = new WindowsUpdate({time: "500"});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        windowsUpdate.togglePopup();
        sendResponse(true)
    }
);


