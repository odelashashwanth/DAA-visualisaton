/* =====================================================
   SELECTION SORT VISUALIZER
===================================================== */


/* =====================================================
   DOM ELEMENTS
===================================================== */

const arrayContainer =
    document.getElementById("arrayContainer");

const arraySizeInput =
    document.getElementById("arraySize");

const speedInput =
    document.getElementById("speed");

const speedValue =
    document.getElementById("speedValue");

const sortOrder =
    document.getElementById("sortOrder");

const customArrayInput =
    document.getElementById("customArray");

const applyArrayBtn =
    document.getElementById("applyArrayBtn");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const stopBtn =
    document.getElementById("stopBtn");

const resetBtn =
    document.getElementById("resetBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const statusText =
    document.getElementById("statusText");

const elementCount =
    document.getElementById("elementCount");

const comparisonsDisplay =
    document.getElementById("comparisons");

const swapsDisplay =
    document.getElementById("swaps");

const executionTimeDisplay =
    document.getElementById("executionTime");

const progressDisplay =
    document.getElementById("progress");

const progressPercent =
    document.getElementById("progressPercent");

const progressBar =
    document.getElementById("progressBar");


/* =====================================================
   VARIABLES
===================================================== */

let array = [];

let originalArray = [];

let isSorting = false;

let isPaused = false;

let isStopped = false;

let comparisons = 0;

let swaps = 0;

let currentI = -1;

let currentJ = -1;

let currentMin = -1;

let timer = null;

let startTime = 0;

let elapsedTime = 0;


/* =====================================================
   INITIALIZE
===================================================== */

window.addEventListener("load", () => {

    generateArray();

    updateSpeedText();

});


/* =====================================================
   GENERATE RANDOM ARRAY
===================================================== */

function generateArray() {

    if (isSorting) return;

    const size =
        parseInt(arraySizeInput.value);

    array = [];

    for (let i = 0; i < size; i++) {

        array.push(
            Math.floor(
                Math.random() * 90
            ) + 10
        );

    }

    originalArray = [...array];

    resetStatistics();

    renderArray();

    updateStatus(
        "Ready to start Selection Sort..."
    );
}


/* =====================================================
   RENDER ARRAY
===================================================== */

function renderArray() {

    arrayContainer.innerHTML = "";

    if (array.length === 0) return;

    const maxValue =
        Math.max(...array);


    array.forEach((value, index) => {

        const bar =
            document.createElement("div");

        bar.className =
            "array-bar";


        /* BAR HEIGHT */

        const height =
            50 +
            (value / maxValue) * 220;

        bar.style.height =
            `${height}px`;


        /* VALUE */

        const valueText =
            document.createElement("span");

        valueText.className =
            "array-value";

        valueText.textContent =
            value;


        /* INDEX */

        const indexText =
            document.createElement("span");

        indexText.className =
            "array-index";

        indexText.textContent =
            index;


        bar.appendChild(valueText);

        bar.appendChild(indexText);

        arrayContainer.appendChild(bar);

    });


    elementCount.textContent =
        array.length;
}


/* =====================================================
   UPDATE ARRAY STATES
===================================================== */

function updateBars(
    currentIndex = -1,
    compareIndex = -1,
    minimumIndex = -1,
    sortedUntil = -1
) {

    const bars =
        document.querySelectorAll(
            ".array-bar"
        );


    bars.forEach((bar, index) => {

        bar.classList.remove(
            "current",
            "compare",
            "minimum",
            "sorted"
        );


        if (index <= sortedUntil) {

            bar.classList.add(
                "sorted"
            );

        }


        if (index === currentIndex) {

            bar.classList.add(
                "current"
            );

        }


        if (index === compareIndex) {

            bar.classList.add(
                "compare"
            );

        }


        if (index === minimumIndex) {

            bar.classList.add(
                "minimum"
            );

        }

    });

}


/* =====================================================
   DELAY
===================================================== */

function delay(ms) {

    return new Promise(resolve => {

        timer = setTimeout(
            resolve,
            ms
        );

    });

}


/* =====================================================
   PAUSE CHECK
===================================================== */

async function waitIfPaused() {

    while (isPaused && !isStopped) {

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    100
                )
        );

    }

}


/* =====================================================
   GET SPEED
===================================================== */

function getSpeed() {

    const value =
        parseInt(speedInput.value);

    return value;

}


/* =====================================================
   SPEED TEXT
===================================================== */

function updateSpeedText() {

    const value =
        parseInt(speedInput.value);


    if (value >= 1100) {

        speedValue.textContent =
            "SLOW";

    }

    else if (value >= 700) {

        speedValue.textContent =
            "NORMAL";

    }

    else if (value >= 400) {

        speedValue.textContent =
            "FAST";

    }

    else {

        speedValue.textContent =
            "VERY FAST";

    }

}


speedInput.addEventListener(
    "input",
    updateSpeedText
);


/* =====================================================
   SELECTION SORT
===================================================== */

async function selectionSort() {

    isSorting = true;

    isPaused = false;

    isStopped = false;

    comparisons = 0;

    swaps = 0;

    startTime =
        performance.now();


    updateStatistics();


    const ascending =
        sortOrder.value === "ascending";


    for (
        let i = 0;
        i < array.length - 1;
        i++
    ) {

        if (isStopped) return;


        currentI = i;

        currentMin = i;


        updateBars(
            i,
            -1,
            i,
            i - 1
        );


        updateStatus(
            `Selecting position ${i}... Searching for ${ascending
                ? "minimum"
                : "maximum"
            } element.`
        );


        await delay(
            getSpeed()
        );


        for (
            let j = i + 1;
            j < array.length;
            j++
        ) {

            if (isStopped) return;


            await waitIfPaused();


            currentJ = j;


            updateBars(
                i,
                j,
                currentMin,
                i - 1
            );


            comparisons++;

            updateStatistics();


            const betterElement =
                ascending
                    ? array[j] < array[currentMin]
                    : array[j] > array[currentMin];


            updateStatus(
                `Comparing ${array[j]} with ${array[currentMin]
                }...`
            );


            await delay(
                getSpeed()
            );


            if (betterElement) {

                currentMin = j;


                updateBars(
                    i,
                    -1,
                    currentMin,
                    i - 1
                );


                updateStatus(
                    `${ascending
                        ? "New minimum"
                        : "New maximum"
                    } found: ${array[currentMin]
                    }`
                );


                await delay(
                    getSpeed()
                );

            }

        }


        await waitIfPaused();


        /* =============================================
           SWAP
        ============================================= */

        if (currentMin !== i) {

            updateStatus(
                `Swapping ${array[i]} with ${array[currentMin]
                }...`
            );


            updateBars(
                i,
                -1,
                currentMin,
                i - 1
            );


            await delay(
                getSpeed()
            );


            [
                array[i],
                array[currentMin]
            ] =
                [
                    array[currentMin],
                    array[i]
                ];


            swaps++;


            renderArray();


            const bars =
                document.querySelectorAll(
                    ".array-bar"
                );


            if (bars[i]) {

                bars[i].classList.add(
                    "swap"
                );

            }


            if (bars[currentMin]) {

                bars[currentMin].classList.add(
                    "swap"
                );

            }


            updateStatistics();


            await delay(
                getSpeed()
            );

        }


        updateBars(
            -1,
            -1,
            -1,
            i
        );


        updateProgress(
            i + 1
        );

    }


    if (!isStopped) {

        updateBars(
            -1,
            -1,
            -1,
            array.length - 1
        );


        updateProgress(
            array.length
        );


        const endTime =
            performance.now();


        elapsedTime =
            endTime - startTime;


        executionTimeDisplay.textContent =
            `${elapsedTime.toFixed(2)} ms`;


        updateStatus(
            "🎉 Selection Sort completed successfully!"
        );


        showCompletionAnimation();

    }


    isSorting = false;

    isPaused = false;

}


/* =====================================================
   START BUTTON
===================================================== */

startBtn.addEventListener(
    "click",
    async () => {

        if (isSorting) {

            isPaused = false;

            return;

        }


        isStopped = false;

        isPaused = false;

        await selectionSort();

    }
);


/* =====================================================
   PAUSE
===================================================== */

pauseBtn.addEventListener(
    "click",
    () => {

        if (!isSorting) {

            updateStatus(
                "Start the sorting process first."
            );

            return;

        }


        isPaused =
            !isPaused;


        if (isPaused) {

            updateStatus(
                "⏸ Sorting paused..."
            );

        }

        else {

            updateStatus(
                "▶ Sorting resumed..."
            );

        }

    }
);


/* =====================================================
   STOP
===================================================== */

stopBtn.addEventListener(
    "click",
    () => {

        if (!isSorting) {

            updateStatus(
                "Sorting is not running."
            );

            return;

        }


        isStopped = true;

        isSorting = false;

        isPaused = false;


        if (timer) {

            clearTimeout(timer);

        }


        updateStatus(
            "⏹ Sorting stopped."
        );


        updateBars();

    }
);


/* =====================================================
   RESET
===================================================== */

resetBtn.addEventListener(
    "click",
    () => {

        stopSorting();


        array = [
            ...originalArray
        ];


        resetStatistics();

        renderArray();

        updateStatus(
            "Array reset. Ready to sort!"
        );

    }
);


/* =====================================================
   STOP SORTING
===================================================== */

function stopSorting() {

    isStopped = true;

    isSorting = false;

    isPaused = false;


    if (timer) {

        clearTimeout(timer);

    }

}


/* =====================================================
   SHUFFLE
===================================================== */

shuffleBtn.addEventListener(
    "click",
    () => {

        if (isSorting) {

            updateStatus(
                "Please stop the sorting before shuffling."
            );

            return;

        }


        for (
            let i = array.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );


            [
                array[i],
                array[j]
            ] =
                [
                    array[j],
                    array[i]
                ];

        }


        originalArray =
            [...array];


        resetStatistics();

        renderArray();


        updateStatus(
            "🔀 Array shuffled successfully!"
        );

    }
);


/* =====================================================
   ARRAY SIZE CHANGE
===================================================== */

arraySizeInput.addEventListener(
    "change",
    () => {

        if (isSorting) {

            updateStatus(
                "Stop sorting before changing the array size."
            );

            return;

        }


        let size =
            parseInt(
                arraySizeInput.value
            );


        if (size < 5) {

            size = 5;

        }


        if (size > 30) {

            size = 30;

        }


        arraySizeInput.value =
            size;


        generateArray();

    }
);


/* =====================================================
   CUSTOM ARRAY
===================================================== */

applyArrayBtn.addEventListener(
    "click",
    applyCustomArray
);


customArrayInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            applyCustomArray();

        }

    }
);


function applyCustomArray() {

    if (isSorting) {

        updateStatus(
            "Stop sorting before applying a new array."
        );

        return;

    }


    const input =
        customArrayInput.value.trim();


    if (!input) {

        updateStatus(
            "Please enter some numbers."
        );

        return;

    }


    const values =
        input
            .split(",")
            .map(
                value =>
                    Number(
                        value.trim()
                    )
            );


    if (
        values.some(
            value =>
                !Number.isFinite(value)
        )
    ) {

        updateStatus(
            "❌ Invalid input. Use numbers separated by commas."
        );

        return;

    }


    if (
        values.length < 5 ||
        values.length > 30
    ) {

        updateStatus(
            "Array must contain between 5 and 30 numbers."
        );

        return;

    }


    array =
        [...values];


    originalArray =
        [...values];


    arraySizeInput.value =
        values.length;


    resetStatistics();

    renderArray();


    updateStatus(
        "✅ Custom array applied successfully!"
    );

}


/* =====================================================
   STATISTICS
===================================================== */

function updateStatistics() {

    comparisonsDisplay.textContent =
        comparisons;


    swapsDisplay.textContent =
        swaps;


    const progress =
        array.length > 0
            ? Math.round(
                (currentI /
                    Math.max(
                        array.length - 1,
                        1
                    )) * 100
            )
            : 0;


    progressDisplay.textContent =
        `${Math.min(
            Math.max(progress, 0),
            100
        )}%`;
}


/* =====================================================
   RESET STATISTICS
===================================================== */

function resetStatistics() {

    comparisons = 0;

    swaps = 0;

    currentI = -1;

    currentJ = -1;

    currentMin = -1;

    elapsedTime = 0;


    comparisonsDisplay.textContent =
        "0";


    swapsDisplay.textContent =
        "0";


    executionTimeDisplay.textContent =
        "0 ms";


    progressDisplay.textContent =
        "0%";


    progressPercent.textContent =
        "0%";


    progressBar.style.width =
        "0%";

}


/* =====================================================
   PROGRESS
===================================================== */

function updateProgress(completed) {

    const percentage =
        Math.round(
            (completed /
                array.length) *
            100
        );


    const safePercentage =
        Math.min(
            Math.max(
                percentage,
                0
            ),
            100
        );


    progressBar.style.width =
        `${safePercentage}%`;


    progressDisplay.textContent =
        `${safePercentage}%`;


    progressPercent.textContent =
        `${safePercentage}%`;

}


/* =====================================================
   STATUS
===================================================== */

function updateStatus(message) {

    statusText.textContent =
        message;

}


/* =====================================================
   COMPLETION ANIMATION
===================================================== */

function showCompletionAnimation() {

    const bars =
        document.querySelectorAll(
            ".array-bar"
        );


    bars.forEach(
        (bar, index) => {

            setTimeout(
                () => {

                    bar.classList.add(
                        "sorted"
                    );

                },
                index * 60
            );

        }
    );

}


/* =====================================================
   KEYBOARD SHORTCUTS
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /* SPACE = START / PAUSE */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            if (!isSorting) {

                startBtn.click();

            }

            else {

                pauseBtn.click();

            }

        }


        /* R = RESET */

        if (
            event.key.toLowerCase() === "r"
        ) {

            resetBtn.click();

        }


        /* S = SHUFFLE */

        if (
            event.key.toLowerCase() === "s"
        ) {

            shuffleBtn.click();

        }

    }
);