const template: string = require('./template.html').default;
const style: string = require('./style.css');

class WindowsUpdate
{
  /**
   * Time to go at 100%
   */
  private time: number;
  /**
   * Percentage display
   */
  private percentage: number;
  /**
   * Interval to refresh the percentage
   * By default is 1000
   */
  private refresh: number;
  /**
   * Interval function which refresh the percentage
   */
  private interval: NodeJS.Timeout | undefined;
  /**
   * Div wrapper
   */
  private wrapper: HTMLDivElement;
  /**
   * Style with loader animation.
   */
  private style: HTMLStyleElement;
  /**
   * Current time depending on the current percentage.
   */
  private currentTime: number;
  /**
   * Display state
   */
  public isDisplay: boolean;

  constructor() {
    this.time = 50000;
    this.isDisplay = false;
    this.percentage = 0;
    this.refresh = 1000;
    this.interval;
  }

  /**
   * The percentage dom
   */
  public get percentageDom(): HTMLElement {
    return this.wrapper.querySelector('#update__percentage');
  }

  public get workDom(): HTMLElement {
    return this.wrapper.querySelector('#work_on_update');
  }

  public get dontDom(): HTMLElement {
    return this.wrapper.querySelector('#dont_turn');
  }

  /**
   * Update the *time* property
   * @param time - time for the percentage
   */
  public setTime(time: string): void {
    if (time) {
      this.time = parseFloat(time) * 1000;
    }

    if (this.time <= 0) {
      this.time = 1000;
    }
  }

  /**
   * Display the windows update and start the loading percentage.
   * @param fullscreen - display the window update in fullscreen or not
   */
  public async addPopup(fullscreen?: boolean): Promise<void> {
    await this.generateWindowsUpdate(fullscreen);
    this.startLoading();
    this.isDisplay = true;
  }

  /**
   * Generate the windows update dom and append this to the body.
   * @param fullscreen - generate in fullscreen or not
   */
  public async generateWindowsUpdate(fullscreen?: boolean): Promise<void> {
    this.wrapper = document.createElement('div');
    this.style = document.createElement('style');
    this.wrapper.classList.add('wrap');
    this.style.innerHTML = this.renderStyle();
    this.wrapper.innerHTML = this.renderHtml();

    this.initI18n();

    document.body.append(this.style);
    document.body.append(this.wrapper);
    if (fullscreen) {
      await document.body.requestFullscreen({ navigationUI: 'hide' });
    }
  }

  /**
   * Remove the windows update dom.
   */
  public removePopup(): void {
    this.wrapper.remove();
    this.style.remove();
    this.percentage = 0;
    this.isDisplay = false;
    clearInterval(this.interval);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  /**
   * Reset the current percentage display
   * with the new time pass in param.
   * @param time - time for the percentage
   */
  public resetLoading(time: string): void {
    this.stopLoading();
    this.setTime(time);
    this.percentage = 0;
    this.updatePercentage();
    this.startLoading();
  }

  /**
   * Toggle the windows update.
   * @param time - time for the percentage
   */
  public async togglePopup(time: string, fullscreen?: boolean): Promise<void> {
    this.setTime(time);
    this.isDisplay ? this.removePopup() : this.addPopup(fullscreen);
  }

  /**
   * Start loading depending on the *time* property.
   */
  public startLoading(): void {
    this.currentTime = this.time;
    this.interval = setInterval(this.loading.bind(this), this.refresh);
  }

  /**
   * Stop loading, clear the *interval* property.
   */
  public stopLoading(): void {
    clearInterval(this.interval);
  }

  /**
   * Calcul and display the percentage.
   */
  public loading(): void {
    // calcul the percentage time
    this.currentTime = this.currentTime - this.refresh;
    this.percentage = ((this.time - this.currentTime) * 100) / this.time;
    this.updatePercentage();

    // is the time isn't finish reload the function
    if (this.currentTime < 0 || this.percentage >= 100) {
      clearInterval(this.interval);
    }
  }

  /**
   * Update the current percentage display.
   */
  public updatePercentage(): void {
    if (this.percentageDom) {
      chrome.i18n.getUILanguage() === 'fr' ?
        this.workDom.innerHTML = `${chrome.i18n.getMessage('working_on_update')} ${Math.round(this.percentage)}%` :
        this.percentageDom.innerHTML = `${Math.round(this.percentage)}% ${chrome.i18n.getMessage('complete')}`;
    }
  }

  public initI18n(): void {
    this.workDom.innerHTML = chrome.i18n.getMessage('working_on_update');
    this.dontDom.innerHTML = chrome.i18n.getMessage('dont_stop');

    if (chrome.i18n.getUILanguage() === 'fr') {
      this.workDom.innerHTML = `${chrome.i18n.getMessage('working_on_update')} ${Math.round(this.percentage)}%`;
      this.percentageDom.style.display = 'none';
    }
  }

  public renderHtml(): string {
    return template;
  }

  public renderStyle(): string {
    return `
      * {
        padding: 0;
        margin: 0;
      }

      body {
        overflow: hidden;
      }

      ${style}
    `;
  }
}

export default WindowsUpdate;
