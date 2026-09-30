//====================================================
// MERGE SORT VISUALIZER
// script.js
// Part 1A-1
//====================================================

//=========================
// HTML ELEMENTS
//=========================

const arrayContainer = document.getElementById("array-container");

const generateBtn = document.getElementById("generateBtn");

const loadBtn = document.getElementById("loadBtn");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resumeBtn = document.getElementById("resumeBtn");

const stopBtn = document.getElementById("stopBtn");

const resetBtn = document.getElementById("resetBtn");

const shuffleBtn = document.getElementById("shuffleBtn");

const arrayInput = document.getElementById("arrayInput");

const sizeSlider = document.getElementById("sizeSlider");

const speedSlider = document.getElementById("speedSlider");

const sizeValue = document.getElementById("sizeValue");

const speedValue = document.getElementById("speedValue");

const comparisonCount = document.getElementById("comparisonCount");

const mergeCount = document.getElementById("mergeCount");

const timer = document.getElementById("timer");

const level = document.getElementById("level");

const status = document.getElementById("status");

const step = document.getElementById("step");

//=========================
// GLOBAL VARIABLES
//=========================

let array = [];

let originalArray = [];

let comparisons = 0;

let merges = 0;

let recursionLevel = 0;

let animationSpeed = 50;

let isPaused = false;

let isStopped = false;

let sorting = false;

let timerInterval = null;

let startTime = 0;

//=========================
// SPEED VALUES
//=========================

function getSpeedDelay() {

    return 101 - animationSpeed;

}

//=========================
// UPDATE STATUS
//=========================

function updateStatus(message) {

    status.innerHTML = message;

}

//=========================
// UPDATE STEP
//=========================

function updateStep(message) {

    step.innerHTML = message;

}

//=========================
// UPDATE COUNTERS
//=========================

function updateStatistics() {

    comparisonCount.innerHTML = comparisons;

    mergeCount.innerHTML = merges;

    level.innerHTML = recursionLevel;

}

//=========================
// RESET COUNTERS
//=========================

function resetStatistics() {

    comparisons = 0;

    merges = 0;

    recursionLevel = 0;

    updateStatistics();

}

//=========================
// TIMER
//=========================

function startTimer() {

    clearInterval(timerInterval);

    startTime = Date.now();

    timerInterval = setInterval(() => {

        let seconds = ((Date.now() - startTime) / 1000).toFixed(2);

        timer.innerHTML = seconds + " s";

    }, 100);

}

function stopTimer() {

    clearInterval(timerInterval);

}

//=========================
// SLEEP FUNCTION
//=========================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

//=========================
// PAUSE FUNCTION
//=========================

async function checkPause() {

    while (isPaused) {

        await sleep(100);

    }

    if (isStopped) {

        throw "Stopped";

    }

}

//=========================
// INITIAL STATUS
//=========================

updateStatus("Generate an array to begin.");

updateStep("Merge Sort uses Divide and Conquer.");

updateStatistics();
//====================================================
// Part 1A-2
// Random Array + Draw Bars
//====================================================

//=========================
// GENERATE RANDOM ARRAY
//=========================

function generateRandomArray(size = 20) {

    array = [];

    for (let i = 0; i < size; i++) {

        let value = Math.floor(Math.random() * 350) + 20;

        array.push(value);

    }

    originalArray = [...array];

    drawArray();

    updateStatus("Random array generated.");

    updateStep("Click START to begin Merge Sort.");

}

//=========================
// DRAW ARRAY
//=========================

function drawArray() {

    arrayContainer.innerHTML = "";

    let containerHeight = arrayContainer.clientHeight;

    let maxValue = Math.max(...array);

    for (let i = 0; i < array.length; i++) {

        const bar = document.createElement("div");

        bar.classList.add("bar");

        bar.classList.add("default");

        let height = (array[i] / maxValue) * (containerHeight - 40);

        bar.style.height = height + "px";

        bar.dataset.index = i;

        const value = document.createElement("span");

        value.innerText = array[i];

        bar.appendChild(value);

        arrayContainer.appendChild(bar);

    }

}

//=========================
// GET ALL BARS
//=========================

function getBars() {

    return document.querySelectorAll(".bar");

}

//=========================
// UPDATE SINGLE BAR
//=========================

function updateBar(index, value) {

    const bars = getBars();

    let maxValue = Math.max(...array);

    let height = (value / maxValue) * (arrayContainer.clientHeight - 40);

    bars[index].style.height = height + "px";

    bars[index].querySelector("span").innerText = value;

}

//=========================
// RESET BAR COLORS
//=========================

function resetBarColors() {

    const bars = getBars();

    bars.forEach(bar => {

        bar.className = "bar default";

    });

}

//=========================
// CHANGE BAR COLOR
//=========================

function colorBar(index, colorClass) {

    const bars = getBars();

    if (!bars[index]) return;

    bars[index].className = "bar";

    bars[index].classList.add(colorClass);

}

//=========================
// COLOR MULTIPLE BARS
//=========================

function colorRange(start, end, colorClass) {

    const bars = getBars();

    for (let i = start; i <= end; i++) {

        if (bars[i]) {

            bars[i].className = "bar";

            bars[i].classList.add(colorClass);

        }

    }

}

//=========================
// CLEAR COLORS
//=========================

function clearColors() {

    const bars = getBars();

    bars.forEach(bar => {

        bar.className = "bar default";

    });

}

//=========================
// MARK SORTED
//=========================

function markSorted() {

    const bars = getBars();

    bars.forEach(bar => {

        bar.className = "bar sorted";

    });

}

//=========================
// INITIAL ARRAY
//=========================

generateRandomArray(20);
//====================================================
// Part 1B-1
// Manual Array Input & Generate Button
//====================================================

//=========================
// LOAD MANUAL ARRAY
//=========================

function loadManualArray() {

    let input = arrayInput.value.trim();

    if (input === "") {

        alert("Please enter array elements.");

        return;

    }

    let values = input.split(",");

    let tempArray = [];

    for (let i = 0; i < values.length; i++) {

        let number = Number(values[i].trim());

        if (isNaN(number)) {

            alert("Invalid input.\nUse only numbers separated by commas.");

            return;

        }

        if (number <= 0) {

            alert("Only positive numbers are allowed.");

            return;

        }

        tempArray.push(number);

    }

    if (tempArray.length < 2) {

        alert("Enter at least 2 numbers.");

        return;

    }

    if (tempArray.length > 50) {

        alert("Maximum array size is 50.");

        return;

    }

    array = [...tempArray];

    originalArray = [...tempArray];

    sizeSlider.value = array.length;

    sizeValue.innerHTML = array.length;

    resetStatistics();

    drawArray();

    updateStatus("Manual array loaded successfully.");

    updateStep("Click START to visualize Merge Sort.");

}

//=========================
// GENERATE RANDOM BUTTON
//=========================

generateBtn.addEventListener("click", () => {

    if (sorting) {

        alert("Sorting is already running.");

        return;

    }

    resetStatistics();

    generateRandomArray(Number(sizeSlider.value));

});

//=========================
// LOAD BUTTON
//=========================

loadBtn.addEventListener("click", () => {

    if (sorting) {

        alert("Sorting is already running.");

        return;

    }

    loadManualArray();

});

//=========================
// ENTER KEY SUPPORT
//=========================

arrayInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        loadManualArray();

    }

});

//=========================
// PLACEHOLDER EXAMPLES
//=========================

const examples = [

    "5,8,2,7,1,9",

    "30,10,80,60,40",

    "15,9,22,7,35,18",

    "99,12,54,33,75",

    "45,12,67,89,23"

];

setInterval(() => {

    if (arrayInput.value === "") {

        let randomExample = Math.floor(Math.random() * examples.length);

        arrayInput.placeholder = examples[randomExample];

    }

}, 3000);
//====================================================
// Part 1B-2
// Sliders + Shuffle + Reset
//====================================================

//=========================
// ARRAY SIZE SLIDER
//=========================

sizeSlider.addEventListener("input", function () {

    if (sorting) return;

    sizeValue.innerHTML = this.value;

    generateRandomArray(Number(this.value));

});

//=========================
// SPEED SLIDER
//=========================

speedSlider.addEventListener("input", function () {

    animationSpeed = Number(this.value);

    if (animationSpeed <= 20) {

        speedValue.innerHTML = "Very Slow";

    }

    else if (animationSpeed <= 40) {

        speedValue.innerHTML = "Slow";

    }

    else if (animationSpeed <= 60) {

        speedValue.innerHTML = "Medium";

    }

    else if (animationSpeed <= 80) {

        speedValue.innerHTML = "Fast";

    }

    else {

        speedValue.innerHTML = "Very Fast";

    }

});

//=========================
// SHUFFLE ARRAY
//=========================

function shuffleArray() {

    if (sorting) {

        alert("Cannot shuffle while sorting.");

        return;

    }

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    originalArray = [...array];

    drawArray();

    resetStatistics();

    updateStatus("Array shuffled successfully.");

    updateStep("Press START to visualize Merge Sort.");

}

shuffleBtn.addEventListener("click", shuffleArray);

//=========================
// RESET ARRAY
//=========================

function resetArray() {

    if (sorting) {

        isStopped = true;

        sorting = false;

    }

    stopTimer();

    array = [...originalArray];

    drawArray();

    clearColors();

    resetStatistics();

    timer.innerHTML = "0.00 s";

    updateStatus("Array has been reset.");

    updateStep("Press START to begin sorting.");

}

resetBtn.addEventListener("click", resetArray);

//=========================
// STOP BUTTON
//=========================

stopBtn.addEventListener("click", function () {

    if (!sorting) return;

    isStopped = true;

    isPaused = false;

    sorting = false;

    stopTimer();

    updateStatus("Sorting stopped.");

    updateStep("You can generate or load another array.");

});

//=========================
// INITIAL SPEED LABEL
//=========================

animationSpeed = Number(speedSlider.value);

speedValue.innerHTML = "Medium";

//=========================
// INITIAL SIZE LABEL
//=========================

sizeValue.innerHTML = sizeSlider.value;
//====================================================
// Part 2A-1
// Recursive Merge Sort
//====================================================

//=========================
// MERGE SORT FUNCTION
//=========================

async function mergeSort(start, end, levelCount = 1) {

    // Stop button pressed

    if (isStopped) {

        return;

    }

    // Pause button pressed

    await checkPause();

    // Base Condition

    if (start >= end) {

        return;

    }

    // Display Current Recursion Level

    recursionLevel = levelCount;

    updateStatistics();

    // Calculate Middle

    let mid = Math.floor((start + end) / 2);

    // Highlight Left Half

    clearColors();

    colorRange(start, mid, "left");

    colorRange(mid + 1, end, "right");

    updateStatus(
        "Dividing Array : Index " +
        start +
        " to " +
        end
    );

    updateStep(
        "Finding Middle Index = " +
        mid
    );

    await sleep(getSpeedDelay() * 5);

    //=========================
    // Divide Left Half
    //=========================

    await mergeSort(
        start,
        mid,
        levelCount + 1
    );

    //=========================
    // Divide Right Half
    //=========================

    await mergeSort(
        mid + 1,
        end,
        levelCount + 1
    );

    //=========================
    // Merge Both Halves
    //=========================

    await merge(
        start,
        mid,
        end
    );

}
//====================================================
// Part 2A-2
// Merge Function
//====================================================

async function merge(start, mid, end) {

    // Stop Button

    if (isStopped) {

        return;

    }

    await checkPause();

    updateStatus(
        "Merging : " + start + " to " + end
    );

    updateStep(
        "Combining two sorted halves."
    );

    // Temporary Arrays

    let left = [];

    let right = [];

    // Copy Left Half

    for (let i = start; i <= mid; i++) {

        left.push(array[i]);

    }

    // Copy Right Half

    for (let i = mid + 1; i <= end; i++) {

        right.push(array[i]);

    }

    let i = 0;

    let j = 0;

    let k = start;

    while (i < left.length && j < right.length) {

        await checkPause();

        comparisons++;

        updateStatistics();

        clearColors();

        colorRange(start, mid, "left");

        colorRange(mid + 1, end, "right");

        colorBar(k, "compare");

        await sleep(getSpeedDelay());

        if (left[i] <= right[j]) {

            array[k] = left[i];

            updateBar(k, left[i]);

            i++;

        }

        else {

            array[k] = right[j];

            updateBar(k, right[j]);

            j++;

        }

        colorBar(k, "merge");

        await sleep(getSpeedDelay());

        k++;

    }

    // Remaining Left Elements

    while (i < left.length) {

        await checkPause();

        array[k] = left[i];

        updateBar(k, left[i]);

        colorBar(k, "merge");

        i++;

        k++;

        await sleep(getSpeedDelay());

    }

    // Remaining Right Elements

    while (j < right.length) {

        await checkPause();

        array[k] = right[j];

        updateBar(k, right[j]);

        colorBar(k, "merge");

        j++;

        k++;

        await sleep(getSpeedDelay());

    }

    merges++;

    updateStatistics();

}
//====================================================
// Part 3A
// Start Merge Sort
//====================================================

//=========================
// ENABLE ALL CONTROLS
//=========================

function enableControls() {

    generateBtn.disabled = false;

    loadBtn.disabled = false;

    shuffleBtn.disabled = false;

    resetBtn.disabled = false;

    sizeSlider.disabled = false;

    arrayInput.disabled = false;

}

//=========================
// DISABLE CONTROLS
//=========================

function disableControls() {

    generateBtn.disabled = true;

    loadBtn.disabled = true;

    shuffleBtn.disabled = true;

    resetBtn.disabled = true;

    sizeSlider.disabled = true;

    arrayInput.disabled = true;

}

//=========================
// START BUTTON
//=========================

startBtn.addEventListener("click", async function () {

    // Already Running

    if (sorting) {

        return;

    }

    sorting = true;

    isStopped = false;

    isPaused = false;

    resetStatistics();

    startTimer();

    disableControls();

    updateStatus("Merge Sort Started...");

    updateStep("Dividing the array into smaller parts.");

    try {

        await mergeSort(
            0,
            array.length - 1,
            1
        );

        if (!isStopped) {

            markSorted();

            updateStatus("Sorting Completed Successfully.");

            updateStep("Array is now completely sorted.");

        }

    }

    catch (error) {

        console.log(error);

    }

    stopTimer();

    sorting = false;

    enableControls();

});
function disableControls() {

    generateBtn.disabled = true;

    loadBtn.disabled = true;

    shuffleBtn.disabled = true;

    resetBtn.disabled = true;

    sizeSlider.disabled = true;

    arrayInput.disabled = true;

    startBtn.disabled = true;

    pauseBtn.disabled = false;

    resumeBtn.disabled = false;

    stopBtn.disabled = false;

}
