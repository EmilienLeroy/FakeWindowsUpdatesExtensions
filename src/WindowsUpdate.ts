class WindowsUpdate
{
    time: number;
    isDisplay: boolean;
    percentage: number;
    refresh: number;
    interval: any;
    wrapper: HTMLDivElement;
    style: HTMLStyleElement;
    currentTime: number;

    constructor(){
        this.time = 50000; 
        this.isDisplay = false;
        this.percentage = 0;
        this.refresh = 1000;
        this.interval;
    }

    get percentageDom(){
        return document.querySelector('#update__percentage');
    }

    initDom(){
        this.wrapper = document.createElement('div');
        this.style = document.createElement('style');
    }

    addPopup(){
        this.initDom();
        this.generateWindowsUpdate();
        this.currentTime = this.time;
        this.interval = setInterval(() => {
                this.loading();
        }, this.refresh);
        this.isDisplay = true;
    }

    generateWindowsUpdate(){
        this.wrapper.classList.add('wrap');
        this.style.innerHTML = this.renderStyle();
        this.wrapper.innerHTML = this.renderHtml();
        document.body.append(this.style);
        document.body.append(this.wrapper); 
    }

    removePopup(){
        this.wrapper.remove();
        this.style.remove();
        this.percentage = 0;
        this.isDisplay = false;
        clearInterval(this.interval);    
    }

    togglePopup(time){
        if(time) {
            this.time = parseFloat(time) * 1000;
        }

        if(this.time <= 0){
            this.time = 1000;
        }
        
        this.isDisplay ? this.removePopup() : this.addPopup();
    }

    loading(){
        //calcul the percentage time
        this.currentTime = this.currentTime - this.refresh;
        this.percentage = ((this.time - this.currentTime) * 100) / this.time;
        
        if(this.percentageDom) {
            this.percentageDom.innerHTML = Math.round(this.percentage)+'% complete';
        }
        
        //is the time isn't finish reload the function
        if(this.currentTime < 0 || this.percentage >= 100){
            clearInterval(this.interval);
        }
    }
    

    renderHtml(){
        return `
            <div class="update">
                <div class="update__content">

                    <div class="update__loader">
                        <div class="update__spinner">
                            <div class="spinner__point"></div>
                        </div>
                        <div class="update__spinner update__spinner--second">
                            <div class="spinner__point"></div>
                        </div>
                        <div class="update__spinner update__spinner--third">
                                <div class="spinner__point"></div>
                        </div>
                        <div class="update__spinner update__spinner--four">
                                <div class="spinner__point"></div>
                        </div>
                        <div class="update__spinner update__spinner--five">
                                <div class="spinner__point"></div>
                        </div>
                    </div>
                    
                    <div class="update__text">
                        <p>Working on updates</p>
                        <p id="update__percentage">0% complete</p>
                        <p>Don't turn of your computer</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderStyle(){
        return `
            *{
                padding: 0;
                margin: 0;
            }

            body{
                overflow: hidden;
            }
            
            .update{
                background-color: #005aa0;
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 10000;
            }
            
            .update__content{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            
            .update__spinner{
                text-align: center;
                margin: 20px;
            }
            
            .update__text{
                text-align: center;
                color: #fbfdfd;
                font-family: sans-serif;
                font-size: 20px;
                line-height: 30px;
            }
            
            .update__loader{
                height: 50px;
                width: 50px;
                margin: 20px;
            }

            .update__text p{
                margin: 0;
            }
            
            .update__spinner{
                width: 50px;
                height: 50px;
                border-radius: 50px;
                position: absolute;
                opacity: 0;
                margin: 0;
                animation-name: rotate, fade;
                animation-duration: 1.4s, 0.2s;
                animation-timing-function: cubic-bezier(0.05, 0.57, 0.63, 0.38);
                animation-delay: 0s;
                animation-iteration-count: infinite, 1;
                animation-fill-mode: forwards;
            }
            
            .update__spinner--second{
                animation-delay: 0.2s;
            }
            
            .update__spinner--third{
                animation-delay: 0.4s;
            }
            
            .update__spinner--four{
                animation-delay: 0.6s;
            }
            
            .update__spinner--five{
                animation-delay: 0.8s;
            }
            
            .update__spinner--six{
                animation-delay: 1s;
            }
            
            .spinner__point{
                width: 7px;
                height: 7px;
                border-radius: 10px;
                background-color: white
            }
            
            @keyframes rotate{
                0% {
                    transform: rotate(0.7turn)
                }       
                100%{
                    transform: rotate(1.7turn)
                }
            }

            @keyframes fade{
                0% {
                    opacity: 0;
                }       
                100%{
                    opacity: 1;
                }
            }
        `;
    }
}

export default WindowsUpdate;