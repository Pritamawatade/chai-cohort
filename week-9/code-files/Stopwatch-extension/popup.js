let elapsedTime = 0;
let isRunning = false;
let timerInterval;

const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");

// Load the current timer state when the popup opens
chrome.storage.local.get(["elapsedTime", "isRunning"], (data) => {
  elapsedTime = data.elapsedTime || 0;
  isRunning = data.isRunning || false;
  updateDisplay(elapsedTime);

  if (isRunning) {
    startStopBtn.textContent = "Pause";
    startTimer();
  }
});

// Event listener for start/stop button
startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    chrome.runtime.sendMessage("start");
    startTimer();
  } else {
    chrome.runtime.sendMessage("stop");
    stopTimer();
  }
});

// Event listener for reset button
resetBtn.addEventListener("click", () => {
  chrome.runtime.sendMessage("reset", () => {
    // Update local state and UI after reset is complete
    stopTimer();
    elapsedTime = 0;
    updateDisplay(0);
  });
});

// Start the timer in the popup
function startTimer() {
  isRunning = true;
  startStopBtn.textContent = "Pause";
  timerInterval = setInterval(() => {
    chrome.storage.local.get("elapsedTime", (data) => {
      updateDisplay(data.elapsedTime || 0);
    });
  }, 10); // Update every 10 milliseconds
}

// Stop the timer in the popup
function stopTimer() {
  isRunning = false;
  startStopBtn.textContent = "Start";
  clearInterval(timerInterval);
}

// Function to format and display time with milliseconds
function updateDisplay(time) {
  const totalMilliseconds = time;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const milliseconds = String(totalMilliseconds % 1000).padStart(3, "0");
  timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
