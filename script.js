let timer1Interval;
let timer2Interval;
let remainingTime1 = 0;
let remainingTime2 = 0;
let isRunning1 = false;
let isRunning2 = false;
let sets = 0;
let currentSet = 0;

const timerDisplay1 = document.getElementById("timer1");
const timerDisplay2 = document.getElementById("timer2");
const setTimeInput1 = document.getElementById("setTime1");
const setTimeInput2 = document.getElementById("setTime2");
const numSetsInput = document.getElementById("numSets");
const startButton1 = document.getElementById("startButton1");
const pauseButton1 = document.getElementById("pauseButton1");
const resetButton1 = document.getElementById("resetButton1");
const setCounter = document.getElementById("setCounter");

const beepAudio = new Audio('beep.mp3'); // Load the beep sound

function startTimer1() {
    if (!isRunning1) {
        const timeInSeconds1 = parseInt(setTimeInput1.value);
        const timeInSeconds2 = parseInt(setTimeInput2.value);
        const totalSets = parseInt(numSetsInput.value);

        if (!isNaN(timeInSeconds1) && !isNaN(timeInSeconds2) && !isNaN(totalSets) && timeInSeconds1 > 0 && timeInSeconds2 > 0 && totalSets > 0) {
            remainingTime1 = timeInSeconds1;
            remainingTime2 = timeInSeconds2;
            sets = totalSets;
            isRunning1 = true;
            startButton1.disabled = true;
            pauseButton1.disabled = false;

            timer1Interval = setInterval(updateTimer1, 1000);
            updateTimer1();
        } else {
            alert("Please enter valid time and set numbers.");
        }
    }
}

function updateTimer1() {
    const minutes1 = Math.floor(remainingTime1 / 60);
    const seconds1 = remainingTime1 % 60;
    timerDisplay1.textContent = `${minutes1.toString().padStart(2, '0')}:${seconds1.toString().padStart(2, '0')}`;

    if (remainingTime1 <= 3) {
        beepAudio.play(); // Play the beep sound when 3 seconds or less are remaining
    }

    if (remainingTime1 <= 0) {
        clearInterval(timer1Interval);
        isRunning1 = false;
        pauseButton1.disabled = true;
        remainingTime1 = parseInt(setTimeInput1.value);
        currentSet++;

        if (currentSet <= sets) {
            startTimer2();
        } else {
            resetButton1.disabled = false;
        }
    } else {
        remainingTime1--;
    }
}

function startTimer2() {
    if (!isRunning2) {
        isRunning2 = true;

        timer2Interval = setInterval(updateTimer2, 1000);
        updateTimer2();
    }
}

function updateTimer2() {
    const minutes2 = Math.floor(remainingTime2 / 60);
    const seconds2 = remainingTime2 % 60;
    timerDisplay2.textContent = `${minutes2.toString().padStart(2, '0')}:${seconds2.toString().padStart(2, '0')}`;

    if (remainingTime2 <= 3) {
        beepAudio.play(); // Play the beep sound when 3 seconds or less are remaining
    }

    if (remainingTime2 <= 0) {
        clearInterval(timer2Interval);
        isRunning2 = false;
        remainingTime2 = parseInt(setTimeInput2.value);

        if (currentSet < sets) {
            startTimer1();
        }
    } else {
        remainingTime2--;
    }
}

function pauseTimer1() {
    if (isRunning1) {
        clearInterval(timer1Interval);
        isRunning1 = false;
        startButton1.disabled = false;
        pauseButton1.disabled = true;
    }
}

function resetTimer1() {
    clearInterval(timer1Interval);
    clearInterval(timer2Interval);
    isRunning1 = false;
    isRunning2 = false;
    startButton1.disabled = false;
    pauseButton1.disabled = true;
    resetButton1.disabled = false;
    timerDisplay1.textContent = "00:00";
    timerDisplay2.textContent = "00:00";
    setTimeInput1.value = "";
    setTimeInput2.value = "";
    numSetsInput.value = "";
    currentSet = 0;
    //setCounter.textContent = "Set 1";
}

startButton1.addEventListener("click", startTimer1);
pauseButton1.addEventListener("click", pauseTimer1);
resetButton1.addEventListener("click", resetTimer1);
