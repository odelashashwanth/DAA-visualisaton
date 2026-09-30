"use strict";

/* =========================================================
   ITERATION VISUALIZER
   Vanilla JavaScript
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const startInput = document.getElementById("startInput");
const endInput = document.getElementById("endInput");
const stepInput = document.getElementById("stepInput");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stepBtn = document.getElementById("stepBtn");
const resetBtn = document.getElementById("resetBtn");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

const iterationContainer =
    document.getElementById("iterationContainer");

const currentIteration =
    document.getElementById("currentIteration");

const iterationStat =
    document.getElementById("iterationStat");

const totalStat =
    document.getElementById("totalStat");

const valueStat =
    document.getElementById("valueStat");

const timeStat =
    document.getElementById("timeStat");

const status =
    document.getElementById("status");

const operation =
    document.getElementById("operation");

const description =
    document.getElementById("description");

const completion =
    document.getElementById("completion");

const closeCompletion =
    document.getElementById("closeCompletion");


/* =========================================================
   STATE
   ========================================================= */

let start = 1;
let end = 10;
let step = 1;

let values = [];

let currentIndex = -1;

let isRunning = false;
let isPaused = false;
let isFinished = false;

let timer = null;

let startTime = null;
let elapsedTime = 0;


/* =========================================================
   INITIALIZATION
   ========================================================= */

initialize();


function initialize() {

    updateSpeed();

    createIterationValues();

    renderIterations();

    updateStatistics();

    updateStatus(
        "READY",
        "Ready to begin"
    );

    updateOperation(
        "Ready to begin",
        "Enter your values and press Start."
    );

    updateButtons();
}


/* =========================================================
   CREATE ITERATION VALUES
   ========================================================= */

function createIterationValues() {

    start =
        Number(startInput.value);

    end =
        Number(endInput.value);

    step =
        Number(stepInput.value);


    values = [];


    /*
     * Prevent invalid step
     */

    if (step === 0) {

        step = 1;

        stepInput.value = 1;
    }


    /*
     * Increasing loop
     */

    if (start <= end) {

        if (step < 0) {
            step = Math.abs(step);
            stepInput.value = step;
        }

        for (
            let i = start;
            i <= end;
            i += step
        ) {

            values.push(i);
        }

    }


    /*
     * Decreasing loop
     */

    else {

        if (step > 0) {
            step = -step;
            stepInput.value = step;
        }

        for (
            let i = start;
            i >= end;
            i += step
        ) {

            values.push(i);
        }
    }


    /*
     * Prevent extremely large visualizations
     */

    if (values.length > 50) {

        values =
            values.slice(0, 50);
    }
}


/* =========================================================
   RENDER ITERATIONS
   ========================================================= */

function renderIterations() {

    iterationContainer.innerHTML = "";


    values.forEach((value, index) => {

        const box =
            document.createElement("div");

        box.className =
            "iteration-box";

        box.dataset.index =
            index;

        box.dataset.value =
            value;


        /*
         * Display value
         */

        box.textContent =
            value;


        /*
         * Index label
         */

        const label =
            document.createElement("span");

        label.className =
            "iteration-label";

        label.textContent =
            `i = ${index}`;


        box.appendChild(label);


        /*
         * Staggered entrance animation
         */

        box.style.animationDelay =
            `${index * 0.05}s`;


        iterationContainer.appendChild(box);
    });
}


/* =========================================================
   START
   ========================================================= */

function startIteration() {

    if (isRunning) {
        return;
    }


    /*
     * If already completed,
     * start again from beginning.
     */

    if (isFinished) {

        resetIteration();
    }


    /*
     * If this is a fresh start,
     * read input values again.
     */

    if (currentIndex === -1) {

        createIterationValues();

        renderIterations();
    }


    /*
     * Invalid input
     */

    if (values.length === 0) {

        updateStatus(
            "ERROR",
            "Invalid"
        );

        updateOperation(
            "Invalid Iteration",
            "Check the start, end and step values."
        );

        return;
    }


    isRunning = true;
    isPaused = false;
    isFinished = false;


    startTimer();


    updateStatus(
        "RUNNING",
        "Executing"
    );


    updateOperation(
        "Iteration Started",
        "The loop is now executing."
    );


    updateButtons();


    runNextIteration();
}


/* =========================================================
   RUN NEXT ITERATION
   ========================================================= */

function runNextIteration() {

    if (!isRunning || isPaused) {
        return;
    }


    /*
     * Check if loop is finished.
     */

    if (
        currentIndex >= values.length - 1
    ) {

        finishIteration();

        return;
    }


    /*
     * Move to next iteration.
     */

    currentIndex++;


    activateIteration(
        currentIndex
    );


    /*
     * Update statistics.
     */

    updateStatistics();


    /*
     * Update explanation.
     */

    const value =
        values[currentIndex];


    updateOperation(
        `Executing iteration ${currentIndex + 1}`,
        `The loop variable i currently has the value ${value}.`
    );


    /*
     * Animate execution.
     */

    const delay =
        getAnimationDelay();


    timer =
        setTimeout(
            runNextIteration,
            delay
        );
}


/* =========================================================
   ACTIVATE CURRENT ITERATION
   ========================================================= */

function activateIteration(index) {

    const boxes =
        document.querySelectorAll(
            ".iteration-box"
        );


    boxes.forEach(
        (box, boxIndex) => {

            box.classList.remove(
                "active"
            );


            /*
             * Mark previous iterations
             * as completed.
             */

            if (boxIndex < index) {

                box.classList.add(
                    "completed"
                );
            }

            else {

                box.classList.remove(
                    "completed"
                );
            }
        }
    );


    /*
     * Activate current box
     */

    const currentBox =
        boxes[index];


    if (currentBox) {

        currentBox.classList.add(
            "active"
        );


        /*
         * Smoothly bring current
         * iteration into view.
         */

        currentBox.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });


        /*
         * Add temporary pulse.
         */

        currentBox.animate(
            [
                {
                    transform:
                        "translateY(-10px) scale(1)"
                },

                {
                    transform:
                        "translateY(-40px) scale(1.15)"
                },

                {
                    transform:
                        "translateY(-35px) scale(1.1)"
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        );
    }
}


/* =========================================================
   STEP FORWARD
   ========================================================= */

function stepForward() {

    /*
     * Stop automatic execution.
     */

    clearTimeout(timer);

    timer = null;

    isRunning = false;
    isPaused = true;


    /*
     * Validate.
     */

    if (values.length === 0) {

        createIterationValues();

        renderIterations();
    }


    /*
     * Finish if no iterations remain.
     */

    if (
        currentIndex >= values.length - 1
    ) {

        finishIteration();

        return;
    }


    /*
     * Execute one iteration.
     */

    currentIndex++;


    activateIteration(
        currentIndex
    );


    updateStatistics();


    const value =
        values[currentIndex];


    updateOperation(
        `Step ${currentIndex + 1}`,
        `Executed: i = ${value}. Press Step again for the next iteration.`
    );


    updateStatus(
        "PAUSED",
        "Step Mode"
    );


    updateButtons();
}


/* =========================================================
   PAUSE
   ========================================================= */

function pauseIteration() {

    if (!isRunning) {
        return;
    }


    isPaused = true;

    isRunning = false;


    clearTimeout(timer);

    timer = null;


    stopTimer();


    updateStatus(
        "PAUSED",
        "Paused"
    );


    updateOperation(
        "Iteration Paused",
        `Paused at iteration ${currentIndex + 1}. Press Start to continue.`
    );


    updateButtons();
}


/* =========================================================
   RESET
   ========================================================= */

function resetIteration() {

    clearTimeout(timer);

    timer = null;


    stopTimer();


    isRunning = false;
    isPaused = false;
    isFinished = false;


    currentIndex = -1;


    elapsedTime = 0;

    startTime = null;


    createIterationValues();

    renderIterations();

    updateStatistics();


    timeStat.textContent =
        "0.00s";


    updateStatus(
        "READY",
        "Ready"
    );


    updateOperation(
        "Ready to begin",
        "Press Start to execute the loop."
    );


    hideCompletion();


    updateButtons();
}


/* =========================================================
   FINISH
   ========================================================= */

function finishIteration() {

    clearTimeout(timer);

    timer = null;


    isRunning = false;
    isPaused = false;
    isFinished = true;


    stopTimer();


    /*
     * Mark all boxes completed.
     */

    const boxes =
        document.querySelectorAll(
            ".iteration-box"
        );


    boxes.forEach(box => {

        box.classList.remove(
            "active"
        );

        box.classList.add(
            "completed"
        );
    });


    currentIteration.textContent =
        "Complete";


    iterationStat.textContent =
        values.length;


    valueStat.textContent =
        values.length > 0
            ? values[values.length - 1]
            : "—";


    updateStatus(
        "COMPLETED",
        "Finished"
    );


    updateOperation(
        "Iteration Complete 🎉",
        `All ${values.length} iterations have been executed successfully.`
    );


    showCompletion();

    createCelebration();


    updateButtons();
}


/* =========================================================
   STATISTICS
   ========================================================= */

function updateStatistics() {

    const completedIterations =
        Math.max(
            currentIndex + 1,
            0
        );


    iterationStat.textContent =
        completedIterations;


    totalStat.textContent =
        values.length;


    if (
        currentIndex >= 0 &&
        currentIndex < values.length
    ) {

        currentIteration.textContent =
            `i = ${values[currentIndex]}`;

        valueStat.textContent =
            values[currentIndex];

    }
    else {

        currentIteration.textContent =
            "—";

        valueStat.textContent =
            "—";
    }


    updateElapsedTime();
}


/* =========================================================
   STATUS
   ========================================================= */

function updateStatus(title, text) {

    status.textContent =
        title;
}


/* =========================================================
   OPERATION
   ========================================================= */

function updateOperation(title, text) {

    operation.textContent =
        title;

    description.textContent =
        text;
}


/* =========================================================
   SPEED
   ========================================================= */

function updateSpeed() {

    speedValue.textContent =
        `${speedSlider.value}x`;
}


function getAnimationDelay() {

    const speed =
        Number(speedSlider.value);

    /*
     * Higher speed = smaller delay.
     */

    return 1200 / speed;
}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

    if (startTime === null) {

        startTime =
            performance.now() - elapsedTime;
    }


    updateElapsedTime();
}


function stopTimer() {

    if (startTime !== null) {

        elapsedTime =
            performance.now() - startTime;
    }
}


function updateElapsedTime() {

    if (startTime === null) {
        return;
    }


    const now =
        performance.now();


    const elapsed =
        now - startTime;


    timeStat.textContent =
        `${(elapsed / 1000).toFixed(2)}s`;
}


/* =========================================================
   BUTTON STATE
   ========================================================= */

function updateButtons() {

    /*
     * Start
     */

    startBtn.disabled =
        isRunning;


    /*
     * Pause
     */

    pauseBtn.disabled =
        !isRunning;


    /*
     * Step
     */

    stepBtn.disabled =
        isFinished;


    /*
     * Reset
     */

    resetBtn.disabled =
        false;
}


/* =========================================================
   SPEED SLIDER EVENT
   ========================================================= */

speedSlider.addEventListener(
    "input",
    updateSpeed
);


/* =========================================================
   START BUTTON
   ========================================================= */

startBtn.addEventListener(
    "click",
    startIteration
);


/* =========================================================
   PAUSE BUTTON
   ========================================================= */

pauseBtn.addEventListener(
    "click",
    pauseIteration
);


/* =========================================================
   STEP BUTTON
   ========================================================= */

stepBtn.addEventListener(
    "click",
    stepForward
);


/* =========================================================
   RESET BUTTON
   ========================================================= */

resetBtn.addEventListener(
    "click",
    resetIteration
);


/* =========================================================
   INPUT CHANGE
   ========================================================= */

[
    startInput,
    endInput,
    stepInput
].forEach(input => {

    input.addEventListener(
        "change",
        () => {

            if (
                isRunning
            ) {
                return;
            }


            resetIteration();
        }
    );
});


/* =========================================================
   CLOSE COMPLETION
   ========================================================= */

closeCompletion.addEventListener(
    "click",
    hideCompletion
);


/* =========================================================
   COMPLETION MODAL
   ========================================================= */

function showCompletion() {

    completion.classList.remove(
        "hidden"
    );
}


function hideCompletion() {

    completion.classList.add(
        "hidden"
    );
}


/* =========================================================
   CELEBRATION EFFECT
   ========================================================= */

function createCelebration() {

    const container =
        document.createElement("div");

    container.className =
        "celebration-container";


    Object.assign(
        container.style,
        {
            position: "fixed",
            inset: "0",
            pointerEvents: "none",
            zIndex: "9999",
            overflow: "hidden"
        }
    );


    document.body.appendChild(
        container
    );


    const colors = [
        "#22d3ee",
        "#3b82f6",
        "#a855f7",
        "#ec4899",
        "#22c55e",
        "#facc15"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        const size =
            Math.random() * 8 + 4;


        Object.assign(
            particle.style,
            {
                position: "absolute",

                width:
                    `${size}px`,

                height:
                    `${size * 1.5}px`,

                left:
                    `${Math.random() * 100}%`,

                top:
                    "-20px",

                background:
                    colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                    ],

                borderRadius:
                    "3px",

                transform:
                    `rotate(${Math.random() * 360}deg)`,

                animation:
                    `fall ${2 +
                    Math.random() * 2
                    }s linear forwards`
            }
        );


        container.appendChild(
            particle
        );
    }


    setTimeout(
        () => {
            container.remove();
        },
        4500
    );
}


/* =========================================================
   CONFETTI ANIMATION
   ========================================================= */

const celebrationStyle =
    document.createElement(
        "style"
    );


celebrationStyle.textContent = `

@keyframes fall {

    0% {

        transform:
            translateY(0)
            rotate(0deg);

        opacity: 1;
    }

    100% {

        transform:
            translateY(110vh)
            translateX(
                ${Math.random() * 200 - 100}px
            )
            rotate(720deg);

        opacity: 0;
    }
}

`;


document.head.appendChild(
    celebrationStyle
);


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
         * SPACE
         */

        if (
            event.code === "Space"
        ) {

            event.preventDefault();


            if (!isRunning) {

                startIteration();

            } else {

                pauseIteration();
            }
        }


        /*
         * RIGHT ARROW
         */

        if (
            event.code === "ArrowRight"
        ) {

            event.preventDefault();

            stepForward();
        }


        /*
         * R = RESET
         */

        if (
            event.key.toLowerCase() === "r"
        ) {

            resetIteration();
        }
    }
);


/* =========================================================
   LIVE INPUT PREVIEW
   ========================================================= */

[
    startInput,
    endInput,
    stepInput
].forEach(input => {

    input.addEventListener(
        "input",
        () => {

            if (
                !isRunning
            ) {

                createIterationValues();

                renderIterations();

                updateStatistics();
            }
        }
    );
});


/* =========================================================
   INITIAL RENDER
   ========================================================= */

createIterationValues();

renderIterations();

updateStatistics();

updateSpeed();

updateButtons();