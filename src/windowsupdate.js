
class WindowsUpdate
{
    constructor({time = '500'}){
        this.time = parseFloat(time); 
        this.isDisplay = false;
    }

    initDom(){
        this.wrapper = document.createElement('div');
        this.style = document.createElement('style');
    }

    addPopup(){
        this.initDom();
        this.wrapper.classList.add('wrap');
        this.style.innerHTML = this.renderStyle();
        this.wrapper.innerHTML = this.renderHtml();
        document.body.append(this.style);
        document.body.append(this.wrapper);
        this.isDisplay = true;
    }

    removePopup(){
        this.wrapper.remove();
        this.style.remove();
        this.isDisplay = false;
    }

    togglePopup(){
        this.isDisplay ? this.removePopup() : this.addPopup();
    }

    renderHtml(){
        return `
            <div class="test">
                Ahaha
            </div>
        `;
    }

    renderStyle(){
        return `
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
        `;
    }
}
