const btn = document.querySelector('#active');

btn.addEventListener('click',()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {time: "500"});
    });
})
