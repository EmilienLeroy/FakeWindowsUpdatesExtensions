const btn = document.querySelector('#active');
let time = document.querySelector('#time');

if(!time.value) {
    time.value = '5';
}

btn.addEventListener('click',()=>{
    if(parseFloat(time.value) <= 0) {
        time.value = '1'
    }
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {time: time.value}, function(value){
            
        });
    });
})
