/*======================================================
      INSERTION SORT VISUALIZER PRO++
      Developed By Shashwanth Chary Odela
======================================================*/


//======================================================
// HTML ELEMENTS
//======================================================

const arrayContainer = document.getElementById("arrayContainer");

const generateBtn = document.getElementById("generateBtn");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");

const speedSlider = document.getElementById("speed");
const arraySizeSlider = document.getElementById("arraySize");

const comparison = document.getElementById("comparison");
const shifts = document.getElementById("shifts");
const pass = document.getElementById("pass");

const timer = document.getElementById("timer");

const currentKey = document.getElementById("currentKey");
const currentIndex = document.getElementById("currentIndex");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const robotMessage = document.getElementById("robotMessage");

const currentOperation = document.getElementById("currentOperation");
const sortStatus = document.getElementById("sortStatus");

const originalArray = document.getElementById("originalArray");
const currentArray = document.getElementById("currentArray");
const sortedArray = document.getElementById("sortedArray");



//======================================================
// VARIABLES
//======================================================

let array = [];

let original = [];

let delay = 350;

let arraySize = 15;

let sorting = false;

let paused = false;

let comparisonCount = 0;

let shiftCount = 0;

let passCount = 0;

let startTime = 0;

let timerInterval;



//======================================================
// AI TEACHER
//======================================================

function robotSpeak(message) {

    robotMessage.innerHTML = message;

}



//======================================================
// GENERATE RANDOM ARRAY
//======================================================

function generateArray() {

    if (sorting) return;

    array = [];

    comparisonCount = 0;

    shiftCount = 0;

    passCount = 0;

    comparison.innerHTML = "0";
    shifts.innerHTML = "0";
    pass.innerHTML = "0";

    currentKey.innerHTML = "-";
    currentIndex.innerHTML = "-";

    currentOperation.innerHTML = "Array Generated";
    sortStatus.innerHTML = "Ready";

    progressFill.style.width = "0%";
    progressPercent.innerHTML = "0%";

    sortedArray.innerHTML = "-";

    for (let i = 0; i < arraySize; i++) {

        array.push(

            Math.floor(Math.random() * 90) + 10

        );

    }

    original = [...array];

    originalArray.innerHTML = original.join(" , ");

    currentArray.innerHTML = array.join(" , ");

    displayArray();

    robotSpeak(

        "🎲 New array generated successfully. Click Start to begin Insertion Sort."

    );

}



//======================================================
// DISPLAY ARRAY
//======================================================

function displayArray() {

    arrayContainer.innerHTML = "";

    let maxValue = Math.max(...array);

    array.forEach((value, index) => {

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.id = "bar" + index;

        bar.style.height =

            ((value / maxValue) * 370) + "px";

        bar.innerHTML =

            `<span>${value}</span>`;

        arrayContainer.appendChild(bar);

    });

}



//======================================================
// SPEED CONTROL
//======================================================

speedSlider.addEventListener("input", () => {

    delay = Number(speedSlider.value);

});



//======================================================
// ARRAY SIZE CONTROL
//======================================================

arraySizeSlider.addEventListener("input", () => {

    if (sorting) return;

    arraySize = Number(arraySizeSlider.value);

    generateArray();

});



//======================================================
// GENERATE BUTTON
//======================================================

generateBtn.addEventListener(

    "click",

    generateArray

);



//======================================================
// UPDATE CURRENT ARRAY
//======================================================

function updateCurrentArray() {

    currentArray.innerHTML =

        array.join(" , ");

}



//======================================================
// PAGE LOAD
//======================================================

window.onload = () => {

    generateArray();

    robotSpeak(

        "🤖 Welcome! Today we will learn Insertion Sort step by step."

    );

};
/*======================================================
        START • PAUSE • RESUME • TIMER
======================================================*/


//======================================================
// DELAY FUNCTION
//======================================================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}



//======================================================
// WAIT IF PAUSED
//======================================================

async function waitIfPaused() {

    while (paused) {

        await sleep(100);

    }

}



//======================================================
// START TIMER
//======================================================

function startTimer() {

    startTime = Date.now();

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        let elapsed = (Date.now() - startTime) / 1000;

        timer.innerHTML =

            elapsed.toFixed(2) + " s";

    }, 100);

}



//======================================================
// STOP TIMER
//======================================================

function stopTimer() {

    clearInterval(timerInterval);

}



//======================================================
// UPDATE PROGRESS BAR
//======================================================

function updateProgress(currentPass) {

    let percent = Math.floor(

        (currentPass / (array.length - 1)) * 100

    );

    progressFill.style.width =

        percent + "%";

    progressPercent.innerHTML =

        percent + "%";

}



//======================================================
// START BUTTON
//======================================================

startBtn.addEventListener("click", async () => {

    if (sorting) return;

    sorting = true;

    paused = false;

    comparisonCount = 0;

    shiftCount = 0;

    passCount = 0;

    comparison.innerHTML = "0";

    shifts.innerHTML = "0";

    pass.innerHTML = "0";

    sortStatus.innerHTML =

        "Sorting...";

    currentOperation.innerHTML =

        "Insertion Sort Started";

    robotSpeak(

        "🚀 Insertion Sort Started. We will insert each key into its correct position."

    );

    startTimer();

    await insertionSort();

});



//======================================================
// PAUSE BUTTON
//======================================================

pauseBtn.addEventListener("click", () => {

    if (!sorting) return;

    paused = true;

    sortStatus.innerHTML = "Paused";

    currentOperation.innerHTML = "Paused";

    robotSpeak(

        "⏸ Sorting Paused."

    );

});



//======================================================
// RESUME BUTTON
//======================================================

resumeBtn.addEventListener("click", () => {

    if (!sorting) return;

    paused = false;

    sortStatus.innerHTML = "Sorting...";

    currentOperation.innerHTML = "Sorting...";

    robotSpeak(

        "▶ Sorting Resumed."

    );

});



//======================================================
// RESET BUTTON
//======================================================

resetBtn.addEventListener("click", () => {

    sorting = false;

    paused = false;

    stopTimer();

    timer.innerHTML = "0.00 s";

    progressFill.style.width = "0%";

    progressPercent.innerHTML = "0%";

    generateArray();

    robotSpeak(

        "🔄 Visualizer Reset Successfully."

    );

});



//======================================================
// KEYBOARD SHORTCUTS
//======================================================

document.addEventListener("keydown", (e) => {

    // ENTER → Start

    if (e.key === "Enter") {

        if (!sorting) {

            startBtn.click();

        }

    }



    // SPACE → Pause / Resume

    if (e.code === "Space") {

        e.preventDefault();

        if (!sorting) return;

        if (paused) {

            resumeBtn.click();

        }

        else {

            pauseBtn.click();

        }

    }



    // R → Generate New Array

    if (e.key.toLowerCase() === "r") {

        if (!sorting) {

            generateBtn.click();

        }

    }

});
/*======================================================
            INSERTION SORT ALGORITHM
======================================================*/

async function insertionSort() {

    for (let i = 1; i < array.length; i++) {

        await waitIfPaused();

        passCount++;

        pass.innerHTML = passCount;

        updateProgress(i);

        let key = array[i];

        let j = i - 1;

        currentKey.innerHTML = key;

        currentIndex.innerHTML = i;

        currentOperation.innerHTML =
            "Selecting Key = " + key;

        robotSpeak(
            "🟡 Selected Key = " +
            key +
            ". Compare it with previous elements."
        );

        // Highlight current key
        document.getElementById("bar" + i)
            .classList.add("key");

        await sleep(delay);

        // Compare & Shift
        while (j >= 0 && array[j] > key) {

            await waitIfPaused();

            comparisonCount++;

            comparison.innerHTML = comparisonCount;

            currentIndex.innerHTML = j;

            currentOperation.innerHTML =
                "Comparing " +
                array[j] +
                " > " +
                key;

            robotSpeak(
                "🔴 " +
                array[j] +
                " is greater than " +
                key +
                ". Shift it one position right."
            );

            // Highlight comparing bar
            document.getElementById("bar" + j)
                .classList.add("comparing");

            await sleep(delay);

            // Remove compare color
            document.getElementById("bar" + j)
                .classList.remove("comparing");

            // Shift element
            array[j + 1] = array[j];

            shiftCount++;

            shifts.innerHTML = shiftCount;

            displayArray();

            // Highlight shifted bar
            document.getElementById("bar" + (j + 1))
                .classList.add("shifting");

            updateCurrentArray();

            await sleep(delay);

            document.getElementById("bar" + (j + 1))
                .classList.remove("shifting");

            j--;

        }

        // Insert Key
        array[j + 1] = key;

        displayArray();

        updateCurrentArray();

        document.getElementById("bar" + (j + 1))
            .classList.add("key");

        currentOperation.innerHTML =
            "Inserted Key = " +
            key;

        robotSpeak(
            "✅ Inserted " +
            key +
            " into its correct position."
        );

        await sleep(delay);

        // Mark sorted portion
        for (let k = 0; k <= i; k++) {

            document.getElementById("bar" + k)
                .classList.add("sorted");

        }

    }

    // Finish
    finishSorting();

}
/*======================================================
            FINISH SORTING
======================================================*/

function finishSorting() {

    sorting = false;

    paused = false;

    stopTimer();

    // Make every bar green
    for (let i = 0; i < array.length; i++) {

        document.getElementById("bar" + i)
            .classList.remove("key", "comparing", "shifting");

        document.getElementById("bar" + i)
            .classList.add("sorted");

    }

    // Update Dashboard
    sortStatus.innerHTML =
        "Completed Successfully ✅";

    currentOperation.innerHTML =
        "Insertion Sort Finished";

    currentKey.innerHTML = "-";

    currentIndex.innerHTML = "-";

    progressFill.style.width = "100%";

    progressPercent.innerHTML = "100%";

    // Update Arrays
    sortedArray.innerHTML =
        array.join(" , ");

    document.getElementById("finalOriginalArray").innerHTML =
        original.join(" , ");

    document.getElementById("finalSortedArray").innerHTML =
        array.join(" , ");

    // Final Statistics
    document.getElementById("finalComparisons").innerHTML =
        comparisonCount;

    document.getElementById("finalShifts").innerHTML =
        shiftCount;

    document.getElementById("finalPasses").innerHTML =
        passCount;

    // AI Teacher
    robotSpeak(
        "🎉 Congratulations! Insertion Sort completed successfully."
    );

    // Voice
    speak(
        "Congratulations! Insertion Sort Completed Successfully."
    );

    // Show Completion Screen
    document.getElementById("completionScreen").style.display =
        "flex";

}



/*======================================================
            CLOSE COMPLETION SCREEN
======================================================*/

document.getElementById("closeCompletion")
    .addEventListener("click", () => {

        document.getElementById("completionScreen")
            .style.display = "none";

    });



/*======================================================
            SPEECH FUNCTION
======================================================*/

function speak(text) {

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        let speech = new SpeechSynthesisUtterance(text);

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        speech.lang = "en-US";

        speechSynthesis.speak(speech);

    }

}



/*======================================================
            RESET DASHBOARD
======================================================*/

function resetDashboard() {

    comparisonCount = 0;

    shiftCount = 0;

    passCount = 0;

    comparison.innerHTML = "0";

    shifts.innerHTML = "0";

    pass.innerHTML = "0";

    currentKey.innerHTML = "-";

    currentIndex.innerHTML = "-";

    progressFill.style.width = "0%";

    progressPercent.innerHTML = "0%";

    currentOperation.innerHTML =
        "Waiting...";

    sortStatus.innerHTML =
        "Ready";

}



/*======================================================
            START NEW VISUALIZATION
======================================================*/

function prepareForNewArray() {

    stopTimer();

    timer.innerHTML = "0.00 s";

    document.getElementById("completionScreen")
        .style.display = "none";

    resetDashboard();

}



/*======================================================
            GENERATE AGAIN
======================================================*/

generateBtn.addEventListener("click", () => {

    if (sorting) return;

    prepareForNewArray();

});
/*======================================================
        ANIMATION & VISUAL HELPER FUNCTIONS
======================================================*/


//======================================================
// REMOVE COLOR FROM ALL BARS
//======================================================

function clearHighlights() {

    for (let i = 0; i < array.length; i++) {

        const bar = document.getElementById("bar" + i);

        if (bar) {

            bar.classList.remove(
                "key",
                "comparing",
                "shifting"
            );

        }

    }

}



//======================================================
// HIGHLIGHT CURRENT KEY
//======================================================

function highlightKey(index) {

    clearHighlights();

    const bar = document.getElementById("bar" + index);

    if (bar) {

        bar.classList.add("key");

    }

}



//======================================================
// HIGHLIGHT COMPARISON
//======================================================

function highlightCompare(index) {

    const bar = document.getElementById("bar" + index);

    if (bar) {

        bar.classList.add("comparing");

    }

}



//======================================================
// REMOVE COMPARISON COLOR
//======================================================

function removeCompare(index) {

    const bar = document.getElementById("bar" + index);

    if (bar) {

        bar.classList.remove("comparing");

    }

}



//======================================================
// HIGHLIGHT SHIFT
//======================================================

function highlightShift(index) {

    const bar = document.getElementById("bar" + index);

    if (bar) {

        bar.classList.add("shifting");

    }

}



//======================================================
// REMOVE SHIFT
//======================================================

function removeShift(index) {

    const bar = document.getElementById("bar" + index);

    if (bar) {

        bar.classList.remove("shifting");

    }

}



//======================================================
// UPDATE DASHBOARD
//======================================================

function updateDashboard() {

    comparison.innerHTML = comparisonCount;

    shifts.innerHTML = shiftCount;

    pass.innerHTML = passCount;

    currentArray.innerHTML = array.join(" , ");

}



//======================================================
// UPDATE ROBOT MESSAGE
//======================================================

function updateRobot(step, value) {

    switch (step) {

        case "key":

            robotSpeak(

                "🟡 Key Selected : " +

                value +

                ". Now compare it with previous elements."

            );

            break;



        case "compare":

            robotSpeak(

                "🔍 Comparing with " +

                value

            );

            break;



        case "shift":

            robotSpeak(

                "➡ Shifting " +

                value +

                " one position to the right."

            );

            break;



        case "insert":

            robotSpeak(

                "✅ Key inserted into the correct position."

            );

            break;



        case "finish":

            robotSpeak(

                "🎉 Great Job! Insertion Sort completed successfully."

            );

            break;

    }

}



//======================================================
// UPDATE STATUS PANEL
//======================================================

function setStatus(operation, status) {

    currentOperation.innerHTML = operation;

    sortStatus.innerHTML = status;

}



//======================================================
// SMALL ANIMATION DELAY
//======================================================

async function animationPause() {

    await sleep(delay / 2);

}
/*======================================================
        LIVE STATISTICS & SOUND EFFECTS
======================================================*/


//======================================================
// HTML ELEMENTS
//======================================================

const iteration = document.getElementById("iteration");

const complexityLive = document.getElementById("complexityLive");

const badge = document.getElementById("badge");



let iterationCount = 0;



//======================================================
// SIMPLE BEEP SOUND
//======================================================

function playBeep(frequency, duration) {

    try {

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        const oscillator = audioContext.createOscillator();

        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);

        gainNode.connect(audioContext.destination);

        oscillator.type = "sine";

        oscillator.frequency.value = frequency;

        gainNode.gain.value = 0.08;

        oscillator.start();

        oscillator.stop(audioContext.currentTime + duration);

    }

    catch (error) {

        console.log("Sound not supported.");

    }

}



//======================================================
// SOUND HELPERS
//======================================================

function compareSound() {

    playBeep(500, 0.05);

}



function shiftSound() {

    playBeep(700, 0.05);

}



function completeSound() {

    playBeep(900, 0.20);

}



//======================================================
// ITERATION COUNTER
//======================================================

function updateIteration() {

    iterationCount++;

    if (iteration) {

        iteration.innerHTML = iterationCount;

    }

}



//======================================================
// LIVE COMPLEXITY
//======================================================

function updateComplexity() {

    if (!complexityLive) return;

    if (passCount <= 1) {

        complexityLive.innerHTML = "O(n)";

    }

    else if (passCount < array.length / 2) {

        complexityLive.innerHTML = "O(n log n)";

    }

    else {

        complexityLive.innerHTML = "O(n²)";

    }

}



//======================================================
// BADGE
//======================================================

function updateBadge(text, color) {

    if (!badge) return;

    badge.innerHTML = text;

    badge.style.background = color;

    badge.style.color = "white";

    badge.style.padding = "8px 18px";

    badge.style.borderRadius = "25px";

}



//======================================================
// START BADGE
//======================================================

function sortingStarted() {

    updateBadge(

        "Sorting...",

        "#2563eb"

    );

}



//======================================================
// FINISH BADGE
//======================================================

function sortingFinished() {

    updateBadge(

        "Completed ✅",

        "#16a34a"

    );

    completeSound();

}



//======================================================
// RESET BADGE
//======================================================

function resetBadge() {

    iterationCount = 0;

    if (iteration) {

        iteration.innerHTML = "0";

    }

    updateBadge(

        "Ready",

        "#6b7280"

    );

}
/*======================================================
        PREMIUM ANIMATIONS & STEP EXPLANATIONS
======================================================*/


//======================================================
// BAR GLOW EFFECT
//======================================================

function glowBar(index, color = "#00d4ff") {

    const bar = document.getElementById("bar" + index);

    if (!bar) return;

    bar.style.boxShadow =
        "0 0 25px " + color;

}



//======================================================
// REMOVE GLOW
//======================================================

function removeGlow(index) {

    const bar = document.getElementById("bar" + index);

    if (!bar) return;

    bar.style.boxShadow = "";

}



//======================================================
// SCALE BAR
//======================================================

function scaleBar(index) {

    const bar = document.getElementById("bar" + index);

    if (!bar) return;

    bar.style.transform = "scale(1.12)";

}



//======================================================
// RESET SCALE
//======================================================

function resetScale(index) {

    const bar = document.getElementById("bar" + index);

    if (!bar) return;

    bar.style.transform = "scale(1)";

}



//======================================================
// FLASH BAR
//======================================================

async function flashBar(index, color) {

    const bar = document.getElementById("bar" + index);

    if (!bar) return;

    glowBar(index, color);

    scaleBar(index);

    await sleep(180);

    removeGlow(index);

    resetScale(index);

}



//======================================================
// STEP EXPLANATION
//======================================================

function explainStep(message) {

    robotSpeak(message);

    currentOperation.innerHTML = message;

}



//======================================================
// PASS MESSAGE
//======================================================

function passMessage(passNo) {

    explainStep(

        "📌 Pass " +

        passNo +

        " is running..."

    );

}



//======================================================
// KEY MESSAGE
//======================================================

function keyMessage(value) {

    explainStep(

        "🟡 Key = " +

        value +

        " selected."

    );

}



//======================================================
// COMPARE MESSAGE
//======================================================

function compareMessage(a, b) {

    explainStep(

        "🔴 Comparing " +

        a +

        " and " +

        b

    );

}



//======================================================
// SHIFT MESSAGE
//======================================================

function shiftMessage(value) {

    explainStep(

        "➡ Shifting " +

        value +

        " to the right."

    );

}



//======================================================
// INSERT MESSAGE
//======================================================

function insertMessage(value) {

    explainStep(

        "✅ Inserted " +

        value +

        " in the correct position."

    );

}



//======================================================
// SUCCESS EFFECT
//======================================================

async function successAnimation() {

    for (let i = 0; i < array.length; i++) {

        const bar = document.getElementById("bar" + i);

        if (!bar) continue;

        bar.classList.add("sorted");

        glowBar(i, "#00ff66");

        await sleep(60);

        removeGlow(i);

    }

}



//======================================================
// RESET BAR EFFECTS
//======================================================

function clearBarEffects() {

    for (let i = 0; i < array.length; i++) {

        removeGlow(i);

        resetScale(i);

    }

}
/*======================================================
        EXTRA FEATURES & AI LEARNING PANEL
======================================================*/


//======================================================
// HTML ELEMENTS
//======================================================

const stepCounter = document.getElementById("stepCounter");

const estimatedTime = document.getElementById("estimatedTime");

const aiTip = document.getElementById("aiTip");

const stopBtn = document.getElementById("stopBtn");



//======================================================
// VARIABLES
//======================================================

let totalSteps = 0;

let stopped = false;



//======================================================
// UPDATE STEP COUNTER
//======================================================

function updateStepCounter() {

    totalSteps++;

    if (stepCounter) {

        stepCounter.innerHTML = totalSteps;

    }

}



//======================================================
// ESTIMATED TIME
//======================================================

function updateEstimatedTime() {

    if (!estimatedTime) return;

    let remain =

        (array.length - passCount) * delay / 1000;

    estimatedTime.innerHTML =

        remain.toFixed(1) + " sec";

}



//======================================================
// AI TIPS
//======================================================

const tips = [

    "💡 Insertion Sort is excellent for small arrays.",

    "💡 It is a Stable Sorting Algorithm.",

    "💡 Best Case is O(n).",

    "💡 Worst Case is O(n²).",

    "💡 It shifts elements instead of swapping many times.",

    "💡 It works efficiently for nearly sorted arrays."

];



function randomTip() {

    if (!aiTip) return;

    let index = Math.floor(

        Math.random() * tips.length

    );

    aiTip.innerHTML = tips[index];

}



//======================================================
// STOP BUTTON
//======================================================

stopBtn.addEventListener("click", () => {

    if (!sorting) return;

    stopped = true;

    sorting = false;

    paused = false;

    stopTimer();

    sortStatus.innerHTML = "Stopped";

    currentOperation.innerHTML = "Visualization Stopped";

    robotSpeak(

        "⛔ Visualization stopped."

    );

});



//======================================================
// RESET EXTRA DATA
//======================================================

function resetExtraData() {

    totalSteps = 0;

    stopped = false;

    if (stepCounter) {

        stepCounter.innerHTML = "0";

    }

    if (estimatedTime) {

        estimatedTime.innerHTML = "-";

    }

    randomTip();

}



//======================================================
// AUTO UPDATE
//======================================================

setInterval(() => {

    if (sorting) {

        updateEstimatedTime();

    }

}, 500);
/*======================================================
        PREMIUM FEATURES
======================================================*/


//======================================================
// HTML ELEMENTS
//======================================================

const soundBtn = document.getElementById("soundBtn");
const themeBtn = document.getElementById("themeBtn");
const downloadBtn = document.getElementById("downloadBtn");

const achievement = document.getElementById("achievement");
const performance = document.getElementById("performance");



//======================================================
// SETTINGS
//======================================================

let soundEnabled = true;

let darkTheme = true;



//======================================================
// SOUND TOGGLE
//======================================================

soundBtn.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    if (soundEnabled) {

        soundBtn.innerHTML = "🔊 Sound ON";

    }

    else {

        soundBtn.innerHTML = "🔇 Sound OFF";

    }

});



//======================================================
// MODIFY SPEAK FUNCTION
//======================================================

const oldSpeak = speak;

speak = function (text) {

    if (soundEnabled) {

        oldSpeak(text);

    }

};



//======================================================
// THEME
//======================================================

themeBtn.addEventListener("click", () => {

    darkTheme = !darkTheme;

    if (darkTheme) {

        document.body.style.background =
            "linear-gradient(135deg,#020617,#0f172a,#1e293b)";

        document.body.style.color = "white";

        themeBtn.innerHTML = "🌙 Dark";

    }

    else {

        document.body.style.background =
            "#f3f4f6";

        document.body.style.color = "black";

        themeBtn.innerHTML = "☀ Light";

    }

});



//======================================================
// DOWNLOAD SORTED ARRAY
//======================================================

downloadBtn.addEventListener("click", () => {

    if (array.length === 0) return;

    let text = "Insertion Sort Result\n\n";

    text += "Original Array:\n";

    text += original.join(", ");

    text += "\n\nSorted Array:\n";

    text += array.join(", ");

    text += "\n\n";

    text += "Comparisons : " + comparisonCount + "\n";

    text += "Shifts : " + shiftCount + "\n";

    text += "Passes : " + passCount + "\n";

    text += "Time Complexity : O(n²)\n";

    text += "Space Complexity : O(1)\n";

    const blob = new Blob([text], {

        type: "text/plain"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "InsertionSortResult.txt";

    link.click();

});



//======================================================
// ACHIEVEMENT SYSTEM
//======================================================

function calculateAchievement() {

    if (passCount <= 5) {

        achievement.innerHTML =

            "🏆 Sorting Master";

    }

    else if (passCount <= 10) {

        achievement.innerHTML =

            "🥇 Fast Learner";

    }

    else {

        achievement.innerHTML =

            "🎯 Insertion Sort Explorer";

    }

}



//======================================================
// PERFORMANCE
//======================================================

function calculatePerformance() {

    let score = 100;

    score -= Math.floor(comparisonCount / 3);

    score -= Math.floor(shiftCount / 4);

    if (score < 60) {

        performance.innerHTML =

            "⭐⭐ Good";

    }

    else if (score < 85) {

        performance.innerHTML =

            "⭐⭐⭐ Excellent";

    }

    else {

        performance.innerHTML =

            "⭐⭐⭐⭐⭐ Outstanding";

    }

}



//======================================================
// SHOW RESULT
//======================================================

function showFinalAwards() {

    calculateAchievement();

    calculatePerformance();

}
/*======================================================
        INSERTION SORT VISUALIZER PRO++
        FINAL OPTIMIZATION
        Developed By Shashwanth Chary Odela
======================================================*/


//======================================================
// SAFE ELEMENT FINDER
//======================================================

function $(id) {

    return document.getElementById(id);

}



//======================================================
// RESET BAR COLORS
//======================================================

function resetBars() {

    const bars = document.querySelectorAll(".bar");

    bars.forEach(bar => {

        bar.className = "bar";

    });

}



//======================================================
// RESET VISUALIZER
//======================================================

function resetVisualizer() {

    sorting = false;

    paused = false;

    stopped = false;

    stopTimer();

    resetDashboard();

    resetExtraData();

    clearBarEffects();

    resetBars();

    generateArray();

}



//======================================================
// WINDOW RESIZE
//======================================================

window.addEventListener("resize", () => {

    displayArray();

});



//======================================================
// ERROR HANDLER
//======================================================

window.onerror = function (msg, url, line) {

    console.log(

        "Project Error : ",

        msg,

        " Line : ",

        line

    );

};



//======================================================
// PREVENT MULTIPLE START
//======================================================

startBtn.addEventListener("click", () => {

    startBtn.disabled = true;

});



//======================================================
// ENABLE START AGAIN
//======================================================

function enableStart() {

    startBtn.disabled = false;

}



//======================================================
// MODIFY FINISH SORTING
//======================================================

const oldFinish = finishSorting;

finishSorting = async function () {

    await oldFinish();

    enableStart();

};



//======================================================
// MODIFY RESET BUTTON
//======================================================

resetBtn.addEventListener("click", () => {

    enableStart();

});



//======================================================
// MODIFY STOP BUTTON
//======================================================

stopBtn.addEventListener("click", () => {

    enableStart();

});



//======================================================
// VERSION
//======================================================

const PROJECT = {

    name: "Insertion Sort Visualizer Pro++",

    version: "1.0",

    developer: "Shashwanth Chary Odela",

    algorithm: "Insertion Sort"

};



console.log(PROJECT);



//======================================================
// WELCOME
//======================================================

console.log(

    "======================================"

);

console.log(

    "INSERTION SORT VISUALIZER PRO++"

);

console.log(

    "Developed By Shashwanth Chary Odela"

);

console.log(

    "======================================"

);



//======================================================
// INITIALIZE PROJECT
//======================================================

window.addEventListener("load", () => {

    generateArray();

    resetDashboard();

    resetExtraData();

    enableStart();

    robotSpeak(

        "🤖 Welcome! Let's master Insertion Sort together."

    );

});



//======================================================
// THANK YOU MESSAGE
//======================================================

console.log(

    "Thanks for using this project ❤️"

);

console.log(

    "Best of Luck for your Presentation 🚀"

);



//======================================================
// END OF PROJECT
//======================================================