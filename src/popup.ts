const btn = <HTMLButtonElement>document.querySelector('#active');
const btnStop = <HTMLButtonElement>document.querySelector('#stop');
const btnReset = <HTMLButtonElement>document.querySelector('#reset');
let time = <HTMLInputElement>document.querySelector('#time');

chrome.storage.sync.get(['time', 'isDisplay'], (store) => {
  // get stored time or set a default value
  if (!time.value) {
    time.value = store.time || '60';
  }

  // update stored time
  time.addEventListener('change', () => {
    chrome.storage.sync.set({ time: time.value });
  });

  // send a message to the content script
  // check if time is positive and no null.
  btn.addEventListener('click', () => {
    time.value = isPositive(time.value);
    chrome.storage.sync.set({ isDisplay: true }, () => {
      window.close();
      sendMessage({ time: time.value });
    });
  });

  // stop the windows update
  btnStop.addEventListener('click', () => {
    sendMessage({ stop: true }, (result) => {
      chrome.storage.sync.set({ isDisplay: result.isDisplay });
    });
  });

  // send a message to reset the percentage.
  btnReset.addEventListener('click', () => {
    time.value = isPositive(time.value);
    sendMessage({ reset: time.value });
  });
});

/**
 * Send a message to the content script for the current tabs.
 * @param value - value to send
 * @param callback - callback when a response is send.
 */
function sendMessage(value: any, callback?: (result) => void) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs): void => {
    chrome.tabs.sendMessage(tabs[0].id, value, callback);
  });
}

/**
 * Verify is a value is sup at 0.
 * Else return 1.
 * @param value - value to check
 */
function isPositive(value: string): string {
  if (parseFloat(value) <= 0) {
    return '1';
  }

  return value;
}
