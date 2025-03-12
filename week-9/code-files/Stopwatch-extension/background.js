let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Function to start the timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      chrome.storage.local.set({ startTime, elapsedTime, isRunning });
    }, 10); // Update every 10 milliseconds for smooth display
  }
}

// Function to stop/pause the timer
function stopTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  chrome.storage.local.set({ startTime, elapsedTime, isRunning });
}

// Function to reset the timer
function resetTimer() {
    isRunning = false;
    elapsedTime = 0;
    startTime = null;
    clearInterval(timerInterval);
  
    // Save reset state to storage
    chrome.storage.local.set({
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
    });
  }
  

// Listen for messages from popup to control the timer
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "start") startTimer();
  else if (message === "stop") stopTimer();
  else if (message === "reset") resetTimer();
  sendResponse({ elapsedTime });
});
