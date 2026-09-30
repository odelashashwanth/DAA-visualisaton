/* =========================================================
   BUBBLE SORT VISUALIZER
   ========================================================= */

let array = [];

let sorting = false;
let paused = false;
let stopped = false;

let comparisons = 0;
let swaps = 0;
let currentPass = 0;

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

let animationSpeed = 400;


/* =========================================================
   ELEMENTS
   ========================================================= */

const arrayContainer = document.getElementById("arrayContainer");
const arraySize = document.getElementById("arraySize");
const order = document.getElementById("order");
const speed = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");

const customArray = document.getElementById("customArray");
const applyArray = document.getElementById("applyArray");

const comparisonsDisplay = document.getElementById("comparisons");
const swapsDisplay = document.getElementById("swaps");
const executionTime = document.getElementById("executionTime");

const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");

const timer = document.getElementById("timer");
const passNumber = document.getElementById("passNumber");
const comparisonInfo = document.getElementById("comparisonInfo");

const statusText = document.getElementById("statusText");
const elementCount = document.getElementById("elementCount");


/* =========================================================
   GENERATE RANDOM ARRAY
   ========================================================= */

function generateArray() {

    array = [];

    const size = Number(arraySize.value);

    for (let i = 0; i < size; i++) {

        array.push(
            Math.floor(Math.random() * 90) + 10
        );

    }

    renderArray();
}


/* =========================================================
   RENDER ARRAY
   ========================================================= */

function renderArray(
    comparing = [],
    swapping = [],
    sortedFrom = -1
) {

    arrayContainer.innerHTML = "";

    if (array.length === 0) {
        return;
    }

    const maxValue = Math.max(...array);

    array.forEach((value, index) => {

        const bar = document.createElement("div");

        bar.className = "array-bar";

        const height =
            (value / maxValue) * 270;

        bar.style.height =
            `${Math.max(height, 35)}px`;


        /* Comparing */

        if (comparing.includes(index)) {

            bar.classList.add("comparing");

        }


        /* Swapping */

        if (swapping.includes(index)) {

            bar.classList.add("swapping");

        }


        /* Sorted */

        if (
            sortedFrom >= 0 &&
            index >= sortedFrom
        ) {

            bar.classList.add("sorted");

        }


        /* Value */

        const valueLabel =
            document.createElement("span");

        valueLabel.className =
            "array-value";

        valueLabel.textContent =
            value;


        /* Index */

        const indexLabel =
            document.createElement("span");

        indexLabel.className =
            "array-index";

        indexLabel.textContent =
            index;


        bar.appendChild(valueLabel);
        bar.appendChild(indexLabel);

        arrayContainer.appendChild(bar);

    });


    elementCount.textContent =
        array.length;
}


/* =========================================================
   DELAY
   ========================================================= */

function delay(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================================
   PAUSE HANDLER
   ========================================================= */

async function waitIfPaused() {

    while (paused && !stopped) {

        await delay(100);

    }

}


/* =========================================================
   START TIMER
   ========================================================= */

function startTimer() {

    startTime =
        performance.now();

    timerInterval =
        setInterval(() => {

            if (!sorting || stopped) {
                return;
            }

            elapsedTime =
                performance.now() - startTime;

            timer.textContent =
                `${elapsedTime.toFixed(3)} ms`;

        }, 10);
}


/* =========================================================
   STOP TIMER
   ========================================================= */

function stopTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

}


/* =========================================================
   UPDATE STATISTICS
   ========================================================= */

function updateStats() {

    comparisonsDisplay.textContent =
        comparisons;

    swapsDisplay.textContent =
        swaps;

    executionTime.textContent =
        `${elapsedTime.toFixed(3)} ms`;

}


/* =========================================================
   UPDATE PROGRESS
   ========================================================= */

function updateProgress(completed) {

    if (array.length === 0) {
        return;
    }

    const percentage =
        Math.round(
            (completed / array.length) * 100
        );

    progressBar.style.width =
        `${percentage}%`;

    progressText.textContent =
        `${percentage}%`;

    progressPercent.textContent =
        `${percentage}%`;

}


/* =========================================================
   SPEED CONTROL
   ========================================================= */

speed.addEventListener("input", () => {

    animationSpeed =
        Number(speed.value);


    if (animationSpeed < 250) {

        speedValue.textContent =
            "Fast";

    }
    else if (animationSpeed < 650) {

        speedValue.textContent =
            "Normal";

    }
    else {

        speedValue.textContent =
            "Slow";

    }

});


/* =========================================================
   BUBBLE SORT
   ========================================================= */

async function bubbleSort() {

    if (array.length < 2) {
        return;
    }

    sorting = true;
    paused = false;
    stopped = false;

    comparisons = 0;
    swaps = 0;
    currentPass = 0;
    elapsedTime = 0;

    pauseBtn.textContent =
        "⏸ PAUSE";

    updateStats();
    updateProgress(0);

    statusText.textContent =
        "Bubble Sort is starting...";

    startTimer();


    const n = array.length;


    /* =============================================
       OUTER LOOP = PASSES
       ============================================= */

    for (
        let i = 0;
        i < n - 1;
        i++
    ) {

        currentPass =
            i + 1;

        passNumber.textContent =
            currentPass;


        let swappedInPass = false;


        /* =============================================
           INNER LOOP = COMPARISONS
           ============================================= */

        for (
            let j = 0;
            j < n - i - 1;
            j++
        ) {

            if (stopped) {

                finishStop();

                return;

            }


            await waitIfPaused();


            if (stopped) {

                finishStop();

                return;

            }


            /* Count comparison */

            comparisons++;


            comparisonInfo.textContent =
                `${array[j]} ↔ ${array[j + 1]}`;


            statusText.textContent =
                `Comparing ${array[j]} and ${array[j + 1]}`;


            /* Highlight two elements */

            renderArray(
                [j, j + 1],
                [],
                n - i
            );


            updateStats();


            await delay(
                animationSpeed
            );


            if (stopped) {

                finishStop();

                return;

            }


            await waitIfPaused();


            /* =============================================
               CHECK ORDER
               ============================================= */

            const shouldSwap =
                order.value === "ascending"
                    ? array[j] > array[j + 1]
                    : array[j] < array[j + 1];


            /* =============================================
               SWAP
               ============================================= */

            if (shouldSwap) {

                swaps++;

                swappedInPass = true;


                statusText.textContent =
                    `Swapping ${array[j]} and ${array[j + 1]}`;


                /* Show swap animation */

                renderArray(
                    [],
                    [j, j + 1],
                    n - i
                );


                updateStats();


                await delay(
                    animationSpeed / 2
                );


                if (stopped) {

                    finishStop();

                    return;

                }


                /* Actual swap */

                const temp =
                    array[j];

                array[j] =
                    array[j + 1];

                array[j + 1] =
                    temp;


                renderArray(
                    [],
                    [j, j + 1],
                    n - i
                );


                updateStats();


                await delay(
                    animationSpeed / 2
                );

            }

        }


        /* =============================================
           MARK LAST ELEMENT AS SORTED
           ============================================= */

        renderArray(
            [],
            [],
            n - i - 1
        );


        updateProgress(i + 1);


        /* =============================================
           OPTIMIZATION
           ============================================= */

        if (!swappedInPass) {

            statusText.textContent =
                "No swaps required — array is already sorted.";

            break;

        }

    }


    /* =================================================
       SORTING COMPLETE
       ================================================= */

    sorting = false;

    stopped = false;

    stopTimer();


    elapsedTime =
        performance.now() - startTime;


    /* Make every element green */

    renderArray(
        [],
        [],
        0
    );


    updateProgress(
        array.length
    );


    updateStats();


    comparisonInfo.textContent =
        "COMPLETE";


    statusText.textContent =
        `✓ Sorting completed in ${elapsedTime.toFixed(3)} ms`;


    pauseBtn.textContent =
        "⏸ PAUSE";

}


/* =========================================================
   STOP SORTING
   ========================================================= */

function finishStop() {

    sorting = false;

    stopped = true;

    paused = false;

    stopTimer();


    elapsedTime =
        performance.now() - startTime;


    updateStats();


    statusText.textContent =
        "■ Sorting stopped by user";


    comparisonInfo.textContent =
        "STOPPED";


    pauseBtn.textContent =
        "⏸ PAUSE";

}


/* =========================================================
   START BUTTON
   ========================================================= */

startBtn.addEventListener("click", () => {

    if (sorting) {
        return;
    }

    bubbleSort();

});


/* =========================================================
   PAUSE / RESUME
   ========================================================= */

pauseBtn.addEventListener("click", () => {

    if (!sorting) {
        return;
    }


    paused = !paused;


    if (paused) {

        pauseBtn.textContent =
            "▶ RESUME";

        statusText.textContent =
            "⏸ Sorting paused";

    }
    else {

        pauseBtn.textContent =
            "⏸ PAUSE";

        statusText.textContent =
            "▶ Sorting resumed";

    }

});


/* =========================================================
   STOP BUTTON
   ========================================================= */

stopBtn.addEventListener("click", () => {

    if (!sorting) {
        return;
    }

    stopped = true;
    paused = false;

});


/* =========================================================
   SHUFFLE BUTTON
   ========================================================= */

shuffleBtn.addEventListener("click", () => {

    if (sorting) {
        return;
    }

    generateArray();

    resetStats();

    statusText.textContent =
        "🔀 Array shuffled — ready to sort";

});


/* =========================================================
   RESET BUTTON
   ========================================================= */

resetBtn.addEventListener("click", () => {

    sorting = false;

    stopped = true;

    paused = false;

    stopTimer();

    generateArray();

    resetStats();

    statusText.textContent =
        "Ready to start Bubble Sort";

    pauseBtn.textContent =
        "⏸ PAUSE";

});


/* =========================================================
   CUSTOM ARRAY
   ========================================================= */

applyArray.addEventListener("click", () => {

    if (sorting) {
        return;
    }


    const values =
        customArray.value
            .split(",")
            .map(value =>
                Number(value.trim())
            )
            .filter(value =>
                !Number.isNaN(value)
            );


    if (values.length < 2) {

        alert(
            "Please enter at least 2 valid numbers."
        );

        return;

    }


    if (values.length > 30) {

        alert(
            "Maximum 30 numbers are allowed."
        );

        return;

    }


    array = values;

    arraySize.value =
        values.length;


    renderArray();

    resetStats();


    statusText.textContent =
        "✓ Custom array applied successfully";

});


/* =========================================================
   ARRAY SIZE
   ========================================================= */

arraySize.addEventListener("change", () => {

    if (sorting) {
        return;
    }


    let size =
        Number(arraySize.value);


    if (size < 5) {

        size = 5;

        arraySize.value = 5;

    }


    if (size > 30) {

        size = 30;

        arraySize.value = 30;

    }


    generateArray();

    resetStats();


    statusText.textContent =
        "New array generated";

});


/* =========================================================
   RESET STATISTICS
   ========================================================= */

function resetStats() {

    comparisons = 0;
    swaps = 0;
    elapsedTime = 0;
    currentPass = 0;


    comparisonsDisplay.textContent =
        "0";

    swapsDisplay.textContent =
        "0";

    executionTime.textContent =
        "0.000 ms";

    timer.textContent =
        "0.000 ms";

    passNumber.textContent =
        "0";

    comparisonInfo.textContent =
        "—";

    progressText.textContent =
        "0%";

    progressPercent.textContent =
        "0%";

    progressBar.style.width =
        "0%";

}


/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

/*
   SPACE → Start / Pause
   R     → Reset
   S     → Shuffle
*/

document.addEventListener("keydown", event => {

    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "SELECT"
    ) {
        return;
    }


    /* SPACE */

    if (event.code === "Space") {

        event.preventDefault();


        if (!sorting) {

            bubbleSort();

        }
        else {

            pauseBtn.click();

        }

    }


    /* R */

    if (
        event.key.toLowerCase() === "r"
    ) {

        resetBtn.click();

    }


    /* S */

    if (
        event.key.toLowerCase() === "s"
    ) {

        shuffleBtn.click();

    }

});


/* =========================================================
   INITIALIZE PROJECT
   ========================================================= */

generateArray();

resetStats();