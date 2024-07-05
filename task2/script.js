// script.js

let startTime;
let elapsedTime = 0;
let timerInterval;

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
    }, 1000);
    toggleButtons(true);
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    toggleButtons(false);
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(elapsedTime);
    document.getElementById('laps').innerHTML = '';
    toggleButtons(false);
}

function recordLap() {
    const currentTime = formatTime(elapsedTime);
    const lapList = document.getElementById('laps');
    const lapItem = document.createElement('li');
    lapItem.innerText = currentTime;
    lapList.prepend(lapItem);
}

function displayTime(time) {
    const formattedTime = formatTime(time);
    document.getElementById('display').innerText = formattedTime;
}

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const millisecondsFormatted = Math.floor(date.getMilliseconds() / 100).toString();
    return `${minutes}:${seconds}:${millisecondsFormatted}`;
}

function toggleButtons(running) {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const lapButton = document.getElementById('lapButton');
    const resetButton = document.getElementById('resetButton');

    startButton.disabled = running;
    pauseButton.disabled = !running;
    lapButton.disabled = !running;
    resetButton.disabled = running;
}
