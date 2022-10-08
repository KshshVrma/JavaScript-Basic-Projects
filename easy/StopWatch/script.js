function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);
  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);
  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);
  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");
  return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

let startTime;
let elapsedTime = 0;
let timeInterval;

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timeInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton("PAUSE");
}

function pause() {
  clearInterval(timeInterval);
  showButton("PLAY");
}

function reset() {
  clearInterval(timeInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : PauseButton;
  const buttonToHide = buttonKey === "PLAY" ? PauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
let playButton = document.getElementById("playButton");
let PauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

playButton.addEventListener("click", start);
PauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
