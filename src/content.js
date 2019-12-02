let wrapper = document.createElement('div');
let style = document.createElement('style');
let display = false;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender)
        console.log(request)
        
        display ? removePopup() : addPopup();

        sendResponse(true)
});


function addPopup(){
    wrapper = document.createElement('div');
    style = document.createElement('style');
    style.innerHTML = `
        body{
            overflow: hidden;
        }

        .wrap{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: black;
            z-index: 10000;
        }
    `
    wrapper.classList.add('wrap')
    wrapper.innerHTML = `
        <div class="test">
            Ahaha
        </div>
    `;

    document.body.append(style);
    document.body.append(wrapper);
    display = true;
}

function removePopup(){
    wrapper.remove();
    style.remove();
    display = false;
}