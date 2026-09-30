/* =========================================================
   MAKING CHANGE PROBLEM - DYNAMIC PROGRAMMING VISUALIZER
   Vanilla JavaScript
   ========================================================= */

let coins = [1, 2, 5];
let targetAmount = 11;

let dp = [];
let parent = [];

let steps = [];
let currentStep = -1;

let isPlaying = false;
let playTimer = null;

let comparisons = 0;
let startTime = 0;
let endTime = 0;

let speed = 700;

/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const coinInput = document.getElementById("coinInput");
const amountInput = document.getElementById("amountInput");

const calculateBtn = document.getElementById("calculateBtn");
const stepBtn = document.getElementById("stepBtn");
const autoPlayBtn = document.getElementById("autoPlayBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const randomBtn = document.getElementById("randomBtn");

const dpArray = document.getElementById("dpArray");
const dpTable = document.getElementById("dpTable");

const coinContainer = document.getElementById("coinContainer");

const explanation = document.getElementById("explanation");
const formula = document.getElementById("formula");

const stepCounter = document.getElementById("stepCounter");
const progressBar = document.getElementById("progressBar");

const resultCard = document.getElementById("resultCard");
const resultText = document.getElementById("resultText");

const backtracking = document.getElementById("backtracking");

const comparisonsDisplay = document.getElementById("comparisons");
const executionTime = document.getElementById("executionTime");
const dpStates = document.getElementById("dpStates");
const minimumCoins = document.getElementById("minimumCoins");

const speedSlider = document.getElementById("speedSlider");

const themeToggle = document.getElementById("themeToggle");
const soundToggle = document.getElementById("soundToggle");
const copyBtn = document.getElementById("copyBtn");

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (coinInput) {
        coinInput.value = coins.join(", ");
    }

    if (amountInput) {
        amountInput.value = targetAmount;
    }

    createCoins();
    initializeVisualization();

});

/* =========================================================
   INPUT PARSING
   ========================================================= */

function getInputValues() {

    let coinString = coinInput.value.trim();

    let enteredCoins = coinString
        .split(",")
        .map(value => Number(value.trim()))
        .filter(value => Number.isFinite(value));

    let amount = Number(amountInput.value);

    enteredCoins = [...new Set(enteredCoins)]
        .filter(coin => Number.isInteger(coin) && coin > 0)
        .sort((a, b) => a - b);

    if (enteredCoins.length === 0) {
        showMessage("Please enter valid coin denominations.");
        return null;
    }

    if (!Number.isInteger(amount) || amount < 0) {
        showMessage("Please enter a valid target amount.");
        return null;
    }

    if (amount > 100) {
        showMessage("Please keep the target amount at 100 or below for smooth visualization.");
        return null;
    }

    return {
        coins: enteredCoins,
        amount: amount
    };
}

/* =========================================================
   MAIN CALCULATION
   ========================================================= */

function calculateDP() {

    const input = getInputValues();

    if (!input) return;

    stopAnimation();

    coins = input.coins;
    targetAmount = input.amount;

    dp = new Array(targetAmount + 1).fill(Infinity);
    parent = new Array(targetAmount + 1).fill(null);

    dp[0] = 0;

    steps = [];
    comparisons = 0;

    startTime = performance.now();

    /*
        Store initialization step
    */

    steps.push({
        type: "initialize",
        amount: 0,
        message:
            "We start with dp[0] = 0 because zero coins are needed to make amount 0.",
        formula: "dp[0] = 0"
    });

    /*
        DP algorithm
    */

    for (let i = 1; i <= targetAmount; i++) {

        for (let coin of coins) {

            if (coin <= i) {

                comparisons++;

                const previous = dp[i];
                const candidate = dp[i - coin] + 1;

                steps.push({
                    type: "compare",
                    amount: i,
                    coin: coin,
                    previous: previous,
                    candidate: candidate,
                    source: i - coin,
                    message:
                        `Checking coin ${coin} for amount ${i}.`,
                    formula:
                        `dp[${i}] = min(${formatValue(previous)}, dp[${i - coin}] + 1)`
                });

                if (candidate < dp[i]) {

                    dp[i] = candidate;
                    parent[i] = coin;

                    steps.push({
                        type: "update",
                        amount: i,
                        coin: coin,
                        value: candidate,
                        source: i - coin,
                        message:
                            `Using coin ${coin} gives a better solution for amount ${i}.`,
                        formula:
                            `dp[${i}] = min(${formatValue(previous)}, ${candidate}) = ${candidate}`
                    });

                }

            }

        }

    }

    endTime = performance.now();

    steps.push({
        type: "complete",
        amount: targetAmount,
        value: dp[targetAmount],
        message:
            "The DP table is complete. We can now reconstruct the optimal solution.",
        formula:
            `Minimum coins = ${formatValue(dp[targetAmount])}`
    });

    renderDPArray();
    renderDPTable();
    createCoins();

    currentStep = -1;

    updateStepInformation();

    if (resultCard) {
        resultCard.classList.remove("show");
    }

}

/* =========================================================
   INITIAL VISUALIZATION
   ========================================================= */

function initializeVisualization() {

    dp = new Array(targetAmount + 1).fill(Infinity);

    if (targetAmount >= 0) {
        dp[0] = 0;
    }

    renderDPArray();
    renderDPTable();

    if (explanation) {
        explanation.innerHTML = `
            <strong>Ready!</strong><br>
            Enter your coins and target amount, then click
            <b>Calculate</b> to start the DP visualization.
        `;
    }

    if (formula) {
        formula.textContent = "dp[i] = min(dp[i], dp[i - coin] + 1)";
    }

}

/* =========================================================
   DP ARRAY
   ========================================================= */

function renderDPArray(activeIndex = -1) {

    if (!dpArray) return;

    dpArray.innerHTML = "";

    for (let i = 0; i <= targetAmount; i++) {

        const cell = document.createElement("div");

        cell.className = "dp-cell";

        if (i === activeIndex) {
            cell.classList.add("active");
        }

        let value = dp[i];

        cell.innerHTML = `
            <div class="dp-index">${i}</div>
            <div class="dp-value">${formatValue(value)}</div>
        `;

        dpArray.appendChild(cell);
    }

}

/* =========================================================
   DP TABLE
   ========================================================= */

function renderDPTable(activeIndex = -1, sourceIndex = -1) {

    if (!dpTable) return;

    dpTable.innerHTML = "";

    const header = document.createElement("div");
    header.className = "table-row";

    const amountTitle = document.createElement("div");
    amountTitle.className = "table-cell header-cell";
    amountTitle.textContent = "Amount";

    header.appendChild(amountTitle);

    for (let i = 0; i <= targetAmount; i++) {

        const cell = document.createElement("div");

        cell.className = "table-cell header-cell";

        if (i === activeIndex) {
            cell.classList.add("active");
        }

        cell.textContent = i;

        header.appendChild(cell);
    }

    dpTable.appendChild(header);

    const dpRow = document.createElement("div");
    dpRow.className = "table-row";

    const dpTitle = document.createElement("div");
    dpTitle.className = "table-cell header-cell";
    dpTitle.textContent = "DP";

    dpRow.appendChild(dpTitle);

    for (let i = 0; i <= targetAmount; i++) {

        const cell = document.createElement("div");

        cell.className = "table-cell";

        if (i === activeIndex) {
            cell.classList.add("current-cell");
        }

        if (i === sourceIndex) {
            cell.classList.add("source-cell");
        }

        cell.textContent = formatValue(dp[i]);

        dpRow.appendChild(cell);
    }

    dpTable.appendChild(dpRow);

}

/* =========================================================
   COIN VISUALIZATION
   ========================================================= */

function createCoins(activeCoin = null) {

    if (!coinContainer) return;

    coinContainer.innerHTML = "";

    coins.forEach(coin => {

        const coinElement = document.createElement("div");

        coinElement.className = "coin";

        if (coin === activeCoin) {
            coinElement.classList.add("selected");
        }

        coinElement.innerHTML = `
            <span>🪙</span>
            <strong>${coin}</strong>
        `;

        coinElement.addEventListener("click", () => {

            animateCoin(coin);

        });

        coinContainer.appendChild(coinElement);

    });

}

/* =========================================================
   COIN ANIMATION
   ========================================================= */

function animateCoin(coin) {

    const elements = document.querySelectorAll(".coin");

    elements.forEach(element => {

        const value = Number(
            element.querySelector("strong")?.textContent
        );

        if (value === coin) {

            element.classList.add("coin-active");

            setTimeout(() => {
                element.classList.remove("coin-active");
            }, speed);

        }

    });

}

/* =========================================================
   STEP EXECUTION
   ========================================================= */

function executeStep(index) {

    if (!steps.length) {
        calculateDP();
    }

    if (index < 0 || index >= steps.length) {
        return;
    }

    currentStep = index;

    const step = steps[index];

    switch (step.type) {

        case "initialize":

            handleInitializeStep(step);
            break;

        case "compare":

            handleCompareStep(step);
            break;

        case "update":

            handleUpdateStep(step);
            break;

        case "complete":

            handleCompleteStep(step);
            break;
    }

    updateStepInformation();

}

/* =========================================================
   INITIALIZATION STEP
   ========================================================= */

function handleInitializeStep(step) {

    renderDPArray(0);
    renderDPTable(0);

    createCoins();

    if (explanation) {
        explanation.innerHTML = `
            <div class="step-title">Step ${currentStep + 1}</div>
            <p>${step.message}</p>
        `;
    }

    if (formula) {
        formula.textContent = step.formula;
    }

}

/* =========================================================
   COMPARE STEP
   ========================================================= */

function handleCompareStep(step) {

    renderDPArray(step.amount);

    renderDPTable(
        step.amount,
        step.source
    );

    createCoins(step.coin);

    animateCoin(step.coin);

    if (explanation) {

        explanation.innerHTML = `
            <div class="step-title">Checking a Coin</div>

            <p>
                Current amount:
                <strong>${step.amount}</strong>
            </p>

            <p>
                Trying coin:
                <strong>${step.coin}</strong>
            </p>

            <p>
                We look at:
                <strong>dp[${step.source}]</strong>
            </p>
        `;
    }

    if (formula) {
        formula.textContent = step.formula;
    }

}

/* =========================================================
   UPDATE STEP
   ========================================================= */

function handleUpdateStep(step) {

    renderDPArray(step.amount);

    renderDPTable(
        step.amount,
        step.source
    );

    createCoins(step.coin);

    animateCoin(step.coin);

    if (explanation) {

        explanation.innerHTML = `
            <div class="step-title">DP Updated ✓</div>

            <p>${step.message}</p>

            <p>
                <strong>
                    dp[${step.amount}] = ${step.value}
                </strong>
            </p>
        `;
    }

    if (formula) {
        formula.textContent = step.formula;
    }

}

/* =========================================================
   COMPLETE STEP
   ========================================================= */

function handleCompleteStep(step) {

    renderDPArray(targetAmount);
    renderDPTable(targetAmount);

    createCoins();

    if (explanation) {

        explanation.innerHTML = `
            <div class="step-title">🎉 DP Completed!</div>

            <p>
                ${step.message}
            </p>

            <p>
                Minimum number of coins:
                <strong>${formatValue(step.value)}</strong>
            </p>
        `;
    }

    if (formula) {
        formula.textContent = step.formula;
    }

    showFinalResult();

}

/* =========================================================
   STEP INFORMATION
   ========================================================= */

function updateStepInformation() {

    if (stepCounter) {

        if (!steps.length) {
            stepCounter.textContent = "Step 0 / 0";
        } else {
            stepCounter.textContent =
                `Step ${currentStep + 1} / ${steps.length}`;
        }

    }

    if (progressBar) {

        let progress = 0;

        if (steps.length > 0) {
            progress =
                ((currentStep + 1) / steps.length) * 100;
        }

        progressBar.style.width = `${progress}%`;
    }

}

/* =========================================================
   NEXT STEP
   ========================================================= */

function nextStep() {

    if (!steps.length) {
        calculateDP();
        return;
    }

    if (currentStep < steps.length - 1) {

        executeStep(currentStep + 1);

    } else {

        stopAnimation();

    }

}

/* =========================================================
   PREVIOUS STEP
   ========================================================= */

function previousStep() {

    if (!steps.length) return;

    if (currentStep > 0) {

        currentStep--;

        rebuildState(currentStep);

    }

}

/* =========================================================
   REBUILD STATE
   ========================================================= */

function rebuildState(index) {

    let tempDP =
        new Array(targetAmount + 1).fill(Infinity);

    tempDP[0] = 0;

    let activeAmount = -1;
    let sourceAmount = -1;
    let activeCoin = null;

    for (let i = 0; i <= index; i++) {

        const step = steps[i];

        if (step.type === "initialize") {

            tempDP[0] = 0;

        }

        if (step.type === "compare") {

            activeAmount = step.amount;
            sourceAmount = step.source;
            activeCoin = step.coin;

        }

        if (step.type === "update") {

            tempDP[step.amount] = step.value;

            activeAmount = step.amount;
            sourceAmount = step.source;
            activeCoin = step.coin;

        }

    }

    dp = tempDP;

    renderDPArray(activeAmount);

    renderDPTable(
        activeAmount,
        sourceAmount
    );

    createCoins(activeCoin);

    updateStepInformation();

}

/* =========================================================
   AUTO PLAY
   ========================================================= */

function startAutoPlay() {

    if (!steps.length) {
        calculateDP();
    }

    if (isPlaying) return;

    isPlaying = true;

    playNextStep();

}

function playNextStep() {

    if (!isPlaying) return;

    if (currentStep >= steps.length - 1) {

        isPlaying = false;

        return;
    }

    nextStep();

    playTimer = setTimeout(
        playNextStep,
        speed
    );

}

/* =========================================================
   PAUSE
   ========================================================= */

function pauseAnimation() {

    isPlaying = false;

    if (playTimer) {

        clearTimeout(playTimer);

        playTimer = null;

    }

}

/* =========================================================
   STOP
   ========================================================= */

function stopAnimation() {

    pauseAnimation();

}

/* =========================================================
   RESET
   ========================================================= */

function resetVisualization() {

    stopAnimation();

    currentStep = -1;

    comparisons = 0;

    dp = new Array(targetAmount + 1).fill(Infinity);

    dp[0] = 0;

    renderDPArray();
    renderDPTable();

    createCoins();

    if (resultCard) {
        resultCard.classList.remove("show");
    }

    if (backtracking) {
        backtracking.innerHTML = "";
    }

    if (explanation) {

        explanation.innerHTML = `
            <strong>Visualization Reset</strong>
            <p>Enter your values and start the algorithm again.</p>
        `;

    }

    if (formula) {
        formula.textContent =
            "dp[i] = min(dp[i], dp[i - coin] + 1)";
    }

    updateStepInformation();

}

/* =========================================================
   FINAL RESULT
   ========================================================= */

function showFinalResult() {

    const result = dp[targetAmount];

    if (!resultCard) return;

    resultCard.classList.add("show");

    if (result === Infinity) {

        if (resultText) {
            resultText.innerHTML = `
                No combination of coins can make
                <strong>${targetAmount}</strong>.
            `;
        }

        return;
    }

    const solution = reconstructSolution();

    if (resultText) {

        resultText.innerHTML = `
            <div class="success-title">
                🎉 OPTIMAL SOLUTION
            </div>

            <div class="final-answer">
                ${targetAmount}! → ${targetAmount}
            </div>

            <div>
                Target Amount:
                <strong>${targetAmount}</strong>
            </div>

            <div>
                Minimum Coins:
                <strong>${result}</strong>
            </div>

            <div class="solution">
                Coins Used:
                <strong>${solution.join(" + ")}</strong>
            </div>
        `;

    }

    animateNumberCounters();

    createBacktrackingVisualization(solution);

}

/* =========================================================
   BACKTRACKING
   ========================================================= */

function reconstructSolution() {

    const solution = [];

    let current = targetAmount;

    while (current > 0 && parent[current] !== null) {

        const coin = parent[current];

        solution.push(coin);

        current -= coin;

    }

    return solution;

}

/* =========================================================
   BACKTRACKING VISUALIZATION
   ========================================================= */

function createBacktrackingVisualization(solution) {

    if (!backtracking) return;

    backtracking.innerHTML = "";

    let current = targetAmount;

    const title = document.createElement("h3");

    title.textContent =
        "🔙 Backtracking the Optimal Solution";

    backtracking.appendChild(title);

    solution.forEach((coin, index) => {

        const next = current - coin;

        const stepElement =
            document.createElement("div");

        stepElement.className =
            "backtrack-step";

        stepElement.innerHTML = `
            <span class="amount">${current}</span>

            <span class="arrow">− ${coin} →</span>

            <span class="amount">${next}</span>

            <small>
                Using coin ${coin}
            </small>
        `;

        backtracking.appendChild(stepElement);

        current = next;

    });

    const finish = document.createElement("div");

    finish.className = "backtrack-finish";

    finish.textContent =
        "✓ Reached amount 0";

    backtracking.appendChild(finish);

}

/* =========================================================
   RANDOM EXAMPLE
   ========================================================= */

function randomExample() {

    const examples = [

        {
            coins: [1, 2, 5],
            amount: 11
        },

        {
            coins: [1, 3, 4],
            amount: 6
        },

        {
            coins: [1, 5, 10, 25],
            amount: 30
        },

        {
            coins: [1, 2, 5, 10],
            amount: 18
        },

        {
            coins: [1, 3, 5],
            amount: 9
        }

    ];

    const example =
        examples[Math.floor(Math.random() * examples.length)];

    coinInput.value =
        example.coins.join(", ");

    amountInput.value =
        example.amount;

    resetVisualization();

}

/* =========================================================
   PRESET EXAMPLES
   ========================================================= */

function loadExample(exampleCoins, amount) {

    coinInput.value =
        exampleCoins.join(", ");

    amountInput.value =
        amount;

    resetVisualization();

}

/* =========================================================
   FORMAT INFINITY
   ========================================================= */

function formatValue(value) {

    if (value === Infinity) {
        return "∞";
    }

    return value;

}

/* =========================================================
   ERROR / MESSAGE
   ========================================================= */

function showMessage(message) {

    if (explanation) {

        explanation.innerHTML = `
            <div class="error-message">
                ⚠️ ${message}
            </div>
        `;

    }

}

/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

function animateNumberCounters() {

    if (comparisonsDisplay) {

        animateCounter(
            comparisonsDisplay,
            0,
            comparisons,
            700
        );

    }

    if (dpStates) {

        animateCounter(
            dpStates,
            0,
            targetAmount + 1,
            700
        );

    }

    if (minimumCoins) {

        animateCounter(
            minimumCoins,
            0,
            dp[targetAmount] === Infinity
                ? 0
                : dp[targetAmount],
            700
        );

    }

    if (executionTime) {

        const time =
            Math.max(0.1, endTime - startTime);

        executionTime.textContent =
            `${time.toFixed(2)} ms`;

    }

}

/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

function animateCounter(
    element,
    start,
    end,
    duration
) {

    const startTimeCounter =
        performance.now();

    function updateCounter(now) {

        const progress =
            Math.min(
                (now - startTimeCounter) /
                duration,
                1
            );

        const value =
            Math.floor(
                start +
                (end - start) *
                progress
            );

        element.textContent = value;

        if (progress < 1) {

            requestAnimationFrame(updateCounter);

        }

    }

    requestAnimationFrame(updateCounter);

}

/* =========================================================
   SPEED CONTROL
   ========================================================= */

if (speedSlider) {

    speedSlider.addEventListener(
        "input",
        () => {

            const sliderValue =
                Number(speedSlider.value);

            /*
                Smaller delay = faster animation
            */

            speed =
                Math.max(
                    100,
                    1200 - sliderValue * 100
                );

        }
    );

}

/* =========================================================
   BUTTON EVENTS
   ========================================================= */

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        () => {

            calculateDP();

        }
    );

}

if (stepBtn) {

    stepBtn.addEventListener(
        "click",
        () => {

            if (!steps.length) {
                calculateDP();
            }

            nextStep();

        }
    );

}

if (autoPlayBtn) {

    autoPlayBtn.addEventListener(
        "click",
        () => {

            startAutoPlay();

        }
    );

}

if (pauseBtn) {

    pauseBtn.addEventListener(
        "click",
        () => {

            pauseAnimation();

        }
    );

}

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        () => {

            resetVisualization();

        }
    );

}

if (randomBtn) {

    randomBtn.addEventListener(
        "click",
        () => {

            randomExample();

        }
    );

}

/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
            Space = Play/Pause
        */

        if (event.code === "Space") {

            event.preventDefault();

            if (isPlaying) {
                pauseAnimation();
            } else {
                startAutoPlay();
            }

        }

        /*
            ArrowRight = Next
        */

        if (event.key === "ArrowRight") {

            nextStep();

        }

        /*
            ArrowLeft = Previous
        */

        if (event.key === "ArrowLeft") {

            previousStep();

        }

        /*
            R = Reset
        */

        if (
            event.key.toLowerCase() === "r"
        ) {

            resetVisualization();

        }

    }
);

/* =========================================================
   THEME TOGGLE
   ========================================================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );

        }
    );

}

/* =========================================================
   SOUND
   ========================================================= */

let soundEnabled = true;

if (soundToggle) {

    soundToggle.addEventListener(
        "click",
        () => {

            soundEnabled =
                !soundEnabled;

            soundToggle.textContent =
                soundEnabled
                    ? "🔊 Sound"
                    : "🔇 Sound";

        }
    );

}

/* =========================================================
   SIMPLE CLICK SOUND
   ========================================================= */

function playClickSound() {

    if (!soundEnabled) return;

    try {

        const audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.frequency.value = 500;

        gain.gain.value = 0.04;

        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.06
        );

    } catch (error) {

        // Ignore unsupported audio

    }

}

/* =========================================================
   ADD SOUND TO BUTTONS
   ========================================================= */

document.querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            playClickSound
        );

    });

/* =========================================================
   COPY RESULT
   ========================================================= */

if (copyBtn) {

    copyBtn.addEventListener(
        "click",
        async () => {

            const result =
                dp[targetAmount];

            if (
                result === undefined ||
                result === Infinity
            ) {

                showMessage(
                    "Calculate a valid solution first."
                );

                return;

            }

            const solution =
                reconstructSolution();

            const text = `
Making Change Problem - Dynamic Programming

Coins: ${coins.join(", ")}
Target Amount: ${targetAmount}

Minimum Coins: ${result}

Coins Used:
${solution.join(" + ")}

Time Complexity: O(n × amount)
Space Complexity: O(amount)
            `.trim();

            try {

                await navigator.clipboard.writeText(
                    text
                );

                copyBtn.textContent =
                    "✓ Copied!";

                setTimeout(() => {

                    copyBtn.textContent =
                        "📋 Copy Result";

                }, 1500);

            } catch (error) {

                showMessage(
                    "Unable to copy result."
                );

            }

        }
    );

}

/* =========================================================
   RIPPLE EFFECT
   ========================================================= */

document.querySelectorAll("button")
    .forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.className = "ripple";

                const rect =
                    this.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                ripple.style.left =
                    `${x}px`;

                ripple.style.top =
                    `${y}px`;

                this.appendChild(ripple);

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

/* =========================================================
   PRESET BUTTON SUPPORT
   ========================================================= */

document.querySelectorAll(
    "[data-example]"
).forEach(button => {

    button.addEventListener(
        "click",
        () => {

            try {

                const data =
                    JSON.parse(
                        button.dataset.example
                    );

                loadExample(
                    data.coins,
                    data.amount
                );

            } catch (error) {

                console.error(
                    "Invalid example data"
                );

            }

        }
    );

});

/* =========================================================
   RESPONSIVE VISUALIZATION
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (dp.length) {

            renderDPArray(
                currentStep >= 0
                    ? steps[currentStep]?.amount
                    : -1
            );

        }

    }
);

/* =========================================================
   EXPORT RESULT AS TEXT
   ========================================================= */

function downloadResult() {

    if (
        !dp.length ||
        dp[targetAmount] === Infinity
    ) {

        showMessage(
            "Calculate the problem first."
        );

        return;

    }

    const solution =
        reconstructSolution();

    const text = `
MAKING CHANGE PROBLEM
=====================

Coins:
${coins.join(", ")}

Target Amount:
${targetAmount}

Minimum Coins:
${dp[targetAmount]}

Coins Used:
${solution.join(" + ")}

Statistics
----------
DP States: ${targetAmount + 1}
Comparisons: ${comparisons}
Execution Time: ${(endTime - startTime).toFixed(2)} ms

Complexity
----------
Time: O(n × amount)
Space: O(amount)
    `.trim();

    const blob =
        new Blob(
            [text],
            { type: "text/plain" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "making-change-dp-result.txt";

    link.click();

    URL.revokeObjectURL(url);

}

/* =========================================================
   OPTIONAL DOWNLOAD BUTTON
   ========================================================= */

const downloadBtn =
    document.getElementById("downloadBtn");

if (downloadBtn) {

    downloadBtn.addEventListener(
        "click",
        downloadResult
    );

}

/* =========================================================
   INITIAL READY MESSAGE
   ========================================================= */

console.log(
    "Making Change DP Visualizer Loaded ✓"
);