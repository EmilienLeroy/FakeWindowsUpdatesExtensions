const btn = <HTMLButtonElement>document.querySelector('#active');
let time = <HTMLInputElement>document.querySelector('#time');

chrome.storage.sync.get(['time'], function(store) {
    if(!time.value) {
        time.value = store.time || '60';
    }

    time.addEventListener('change', () => {
        chrome.storage.sync.set({ time: time.value });
    })
    
    btn.addEventListener('click',()=>{
        if(parseFloat(time.value) <= 0) {
            time.value = '1'
        }
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { time: time.value }, function (result) {
                result.isDisplay ?
                    btn.innerHTML = 'stop' :
                    btn.innerHTML = 'start';
            });
        });
    })
});

