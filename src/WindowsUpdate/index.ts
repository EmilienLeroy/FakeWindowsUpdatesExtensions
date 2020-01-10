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
    return document.querySelector('#update__percentage');
  }

  /**
   * init the wrapper and style dom.
   */
  public initDom(): void {
    this.wrapper = document.createElement('div');
    this.style = document.createElement('style');
  }

  /**
   * Display the windows update.
   */
  public addPopup(): void {
    this.initDom();
    this.generateWindowsUpdate();
    this.currentTime = this.time;
    this.interval = setInterval(this.loading.bind(this), this.refresh);
    this.isDisplay = true;
  }

  /**
   * Generate the windows update dom.
   */
  public generateWindowsUpdate(): void {
    this.wrapper.classList.add('wrap');
    this.style.innerHTML = this.renderStyle();
    this.wrapper.innerHTML = this.renderHtml();
    document.body.append(this.style);
    document.body.append(this.wrapper);
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
  }

  /**
   * Toggle the windows update.
   * @param time - time for the percentage
   */
  public togglePopup(time: string): void {
    if (time) {
      this.time = parseFloat(time) * 1000;
    }

    if (this.time <= 0) {
      this.time = 1000;
    }

    this.isDisplay ? this.removePopup() : this.addPopup();
  }

  /**
   * Calcul and display the percentage.
   */
  public loading(): void {
    // calcul the percentage time
    this.currentTime = this.currentTime - this.refresh;
    this.percentage = ((this.time - this.currentTime) * 100) / this.time;

    if (this.percentageDom) {
      this.percentageDom.innerHTML = `${Math.round(this.percentage)}% complete`;
    }

    // is the time isn't finish reload the function
    if (this.currentTime < 0 || this.percentage >= 100) {
      clearInterval(this.interval);
    }
  }

  public renderHtml(): string {
    return template;
  }

  public renderStyle(): string {
    return `
      *{
        padding: 0;
        margin: 0;
      }

      body{
        overflow: hidden;
      }
      ${style}
    `;
  }
}

export default WindowsUpdate;
