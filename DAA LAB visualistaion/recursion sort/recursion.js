/* =========================================================
   RECURSION FACTORIAL VISUALIZER
   COMPLETE JAVASCRIPT
========================================================= */

const numberInput = document.getElementById("numberInput");
const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const stopBtn = document.querySelector(".btn-stop");
const resetBtn = document.querySelector(".btn-reset");

const recursionTree = document.querySelector(".recursion-tree");
const callStack = document.querySelector(".call-stack");
const executionLog = document.querySelector(".execution-log");

const resultSection = document.querySelector(".result-section");
const bigResult = document.querySelector(".big-result");

const phaseIndicator = document.querySelector(".phase-indicator");
const stackStatus = document.querySelector(".stack-status");

const currentStep = document.getElementById("currentStep");
const currentDepth = document.getElementById("currentDepth");
const operations = document.getElementById("operations");
const executionTime = document.getElementById("executionTime");

const codeLines = document.querySelectorAll(".code-line");


/* =========================================================
   VARIABLES
========================================================= */

let number = 5;

let steps = 0;
let depth = 0;
let maxDepth = 0;
let operationCount = 0;

let isRunning = false;
let isPaused = false;
let isStopped = false;

let timer = null;

let startTime = 0;
let executionStart = 0;

let callNodes = [];
let stackNodes = [];


/* =========================================================
   SPEED
========================================================= */

function getSpeed() {

    const value = Number(speedSlider.value);

    /*
        Higher slider value = faster animation
    */

    return Math.max(
        100,
        1300 - value * 100
    );
}


function updateSpeed() {

    const value = Number(speedSlider.value);

    if (value <= 2) {
        speedValue.textContent = "Slow";
    }
    else if (value <= 4) {
        speedValue.textContent = "Normal";
    }
    else if (value <= 7) {
        speedValue.textContent = "Fast";
    }
    else {
        speedValue.textContent = "Very Fast";
    }
}


if (speedSlider) {
    speedSlider.addEventListener(
        "input",
        updateSpeed
    );

    updateSpeed();
}


/* =========================================================
   SAFE FACTORIAL
========================================================= */

function factorialValue(n) {

    if (n <= 1) {
        return 1;
    }

    return n * factorialValue(n - 1);
}


/* =========================================================
   CLEAR VISUALIZATION
========================================================= */

function clearVisualization() {

    recursionTree.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">ƒ</div>

            <h4>Waiting for execution...</h4>

            <p>
                Enter a number and click
                <strong>Start Visualization</strong>
            </p>
        </div>
    `;

    callStack.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">↕</div>

            <h4>Call Stack Empty</h4>

            <p>
                Recursive calls will appear here
            </p>
        </div>
    `;

    executionLog.innerHTML = `
        <div class="empty-log">
            Execution log will appear here...
        </div>
    `;

    resultSection.classList.remove("show");

    bigResult.textContent = "0";

    codeLines.forEach(line => {
        line.classList.remove("active");
    });

    steps = 0;
    depth = 0;
    maxDepth = 0;
    operationCount = 0;

    updateStats();

    phaseIndicator.textContent = "READY";
    stackStatus.textContent = "EMPTY";
}


/* =========================================================
   UPDATE STATISTICS
========================================================= */

function updateStats() {

    if (currentStep) {
        currentStep.textContent = steps;
    }

    if (currentDepth) {
        currentDepth.textContent = maxDepth;
    }

    if (operations) {
        operations.textContent = operationCount;
    }
}


/* =========================================================
   EXECUTION TIME
========================================================= */

function updateExecutionTime() {

    if (!executionStart) {
        executionTime.textContent = "0 ms";
        return;
    }

    const elapsed =
        performance.now() - executionStart;

    executionTime.textContent =
        Math.round(elapsed) + " ms";
}


/* =========================================================
   LOG SYSTEM
========================================================= */

function addLog(message, type = "call") {

    const empty = executionLog.querySelector(".empty-log");

    if (empty) {
        empty.remove();
    }

    const item =
        document.createElement("div");

    item.className =
        `log-item ${type}`;

    const time =
        document.createElement("span");

    time.className = "log-time";

    time.textContent =
        new Date().toLocaleTimeString();

    item.appendChild(time);

    item.appendChild(
        document.createTextNode(message)
    );

    executionLog.appendChild(item);

    executionLog.scrollTop =
        executionLog.scrollHeight;
}


/* =========================================================
   CREATE RECURSION NODE
========================================================= */

function createNode(n, currentDepth) {

    const node =
        document.createElement("div");

    node.className =
        "recursion-node";

    node.dataset.number = n;
    node.dataset.depth = currentDepth;

    const isBase = n <= 1;

    if (isBase) {
        node.classList.add("base");
    }

    node.innerHTML = `
        <div class="node-top">

            <span class="node-title">
                factorial(${n})
            </span>

            <span class="node-depth">
                Depth ${currentDepth}
            </span>

        </div>

        <div class="node-operation">

            ${isBase
            ? `Base case → return 1`
            : `factorial(${n}) = ${n} × factorial(${n - 1})`
        }

        </div>

        ${isBase
            ? `<div class="node-result">Return → 1</div>`
            : ""
        }

        <div class="node-status">
            ${isBase ? "BASE CASE" : "CALL"}
        </div>
    `;

    return node;
}


/* =========================================================
   ADD NODE TO TREE
========================================================= */

function addNodeToTree(n, currentDepth) {

    /*
        Remove empty state
    */

    const empty =
        recursionTree.querySelector(".empty-state");

    if (empty) {
        empty.remove();
    }

    /*
        Arrow between recursive calls
    */

    if (recursionTree.children.length > 0) {

        const arrow =
            document.createElement("div");

        arrow.className =
            "recursion-arrow";

        arrow.textContent = "↓";

        recursionTree.appendChild(arrow);
    }

    const node =
        createNode(
            n,
            currentDepth
        );

    recursionTree.appendChild(node);

    callNodes.push(node);

    /*
        Keep newest node visible
    */

    node.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    return node;
}


/* =========================================================
   CALL STACK
========================================================= */

function addStackItem(n, currentDepth) {

    const empty =
        callStack.querySelector(".empty-state");

    if (empty) {
        empty.remove();
    }

    const item =
        document.createElement("div");

    item.className =
        "stack-item active";

    item.innerHTML = `
        <strong>
            factorial(${n})
        </strong>

        <span>
            depth ${currentDepth}
        </span>
    `;

    callStack.appendChild(item);

    stackNodes.push(item);

    stackStatus.textContent =
        `CALL ${n}`;

    callStack.scrollTop =
        callStack.scrollHeight;

    return item;
}


/* =========================================================
   REMOVE STACK ITEM
========================================================= */

function removeStackItem() {

    const item =
        stackNodes.pop();

    if (!item) {
        return;
    }

    item.classList.remove("active");

    item.style.opacity = "0.45";

    stackStatus.textContent =
        stackNodes.length > 0
            ? `CALL ${stackNodes.length}`
            : "EMPTY";
}


/* =========================================================
   CODE HIGHLIGHT
========================================================= */

function highlightCode(lineNumber) {

    codeLines.forEach(line => {

        line.classList.remove("active");

        const number =
            Number(
                line.dataset.line
            );

        if (number === lineNumber) {
            line.classList.add("active");

            line.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });
}


/* =========================================================
   DELAY
========================================================= */

function delay(ms) {

    return new Promise(resolve => {

        timer = setTimeout(
            resolve,
            ms
        );

    });

}


/* =========================================================
   PAUSE HANDLER
========================================================= */

async function waitIfPaused() {

    while (isPaused && !isStopped) {

        await new Promise(resolve => {

            setTimeout(
                resolve,
                100
            );

        });

    }

}


/* =========================================================
   RECURSIVE VISUALIZATION
========================================================= */

async function visualizeFactorial(
    n,
    currentDepth
) {

    if (isStopped) {
        return null;
    }

    await waitIfPaused();

    if (isStopped) {
        return null;
    }

    /*
        Update depth
    */

    depth = currentDepth;

    maxDepth =
        Math.max(
            maxDepth,
            currentDepth
        );

    steps++;

    updateStats();

    /*
        Highlight function declaration
    */

    highlightCode(1);

    /*
        Create recursion node
    */

    const node =
        addNodeToTree(
            n,
            currentDepth
        );

    /*
        Add stack
    */

    const stackItem =
        addStackItem(
            n,
            currentDepth
        );

    /*
        Log call
    */

    addLog(
        `Calling factorial(${n})`,
        "call"
    );

    phaseIndicator.textContent =
        `CALL factorial(${n})`;

    /*
        Highlight if statement
    */

    await delay(
        getSpeed()
    );

    await waitIfPaused();

    if (isStopped) {
        return null;
    }

    highlightCode(2);

    /*
        BASE CASE
    */

    if (n <= 1) {

        phaseIndicator.textContent =
            "BASE CASE";

        addLog(
            `factorial(${n}) reached base case → return 1`,
            "base"
        );

        node.classList.add("active");

        await delay(
            getSpeed()
        );

        await waitIfPaused();

        if (isStopped) {
            return null;
        }

        node.classList.remove("active");

        removeStackItem();

        addLog(
            `factorial(${n}) returns 1`,
            "return"
        );

        highlightCode(3);

        return 1;
    }

    /*
        RECURSIVE CALL
    */

    highlightCode(4);

    operationCount++;

    updateStats();

    phaseIndicator.textContent =
        `RECURSIVE CALL ${n - 1}`;

    addLog(
        `factorial(${n}) waits for factorial(${n - 1})`,
        "call"
    );

    node.classList.add("active");

    await delay(
        getSpeed()
    );

    await waitIfPaused();

    if (isStopped) {
        return null;
    }

    /*
        Recursive call
    */

    const smallerResult =
        await visualizeFactorial(
            n - 1,
            currentDepth + 1
        );

    if (isStopped) {
        return null;
    }

    await waitIfPaused();

    /*
        Multiplication
    */

    highlightCode(4);

    operationCount++;

    updateStats();

    phaseIndicator.textContent =
        `CALCULATING ${n} × ${smallerResult}`;

    addLog(
        `factorial(${n}) = ${n} × ${smallerResult}`,
        "return"
    );

    await delay(
        getSpeed()
    );

    await waitIfPaused();

    if (isStopped) {
        return null;
    }

    const result =
        n * smallerResult;

    /*
        Show result inside node
    */

    node.classList.remove("active");

    node.classList.add("returning");

    const resultElement =
        document.createElement("div");

    resultElement.className =
        "node-result";

    resultElement.textContent =
        `Return → ${result}`;

    node.appendChild(
        resultElement
    );

    /*
        Remove from stack
    */

    removeStackItem();

    /*
        Log return
    */

    addLog(
        `factorial(${n}) returns ${result}`,
        "return"
    );

    await delay(
        getSpeed()
    );

    return result;
}


/* =========================================================
   START VISUALIZATION
========================================================= */

async function startVisualization() {

    if (isRunning) {
        return;
    }

    number =
        parseInt(
            numberInput.value
        );

    /*
        Validation
    */

    if (
        Number.isNaN(number) ||
        number < 0
    ) {

        alert(
            "Please enter a non-negative number."
        );

        numberInput.focus();

        return;
    }

    /*
        Keep animation reasonable
    */

    if (number > 12) {

        alert(
            "For smooth visualization, please enter a number between 0 and 12."
        );

        numberInput.focus();

        return;
    }

    /*
        Reset state
    */

    clearVisualization();

    isRunning = true;
    isPaused = false;
    isStopped = false;

    startBtn.disabled = true;

    pauseBtn.disabled = false;

    stopBtn.disabled = false;

    numberInput.disabled = true;

    speedSlider.disabled = false;

    executionStart =
        performance.now();

    phaseIndicator.textContent =
        "STARTING";

    stackStatus.textContent =
        "STARTING";

    addLog(
        `Starting factorial visualization for n = ${number}`,
        "call"
    );

    /*
        Start recursion
    */

    const result =
        await visualizeFactorial(
            number,
            0
        );

    /*
        Stop condition
    */

    if (isStopped) {
        return;
    }

    /*
        Final result
    */

    phaseIndicator.textContent =
        "COMPLETED";

    stackStatus.textContent =
        "EMPTY";

    updateExecutionTime();

    if (result !== null) {

        bigResult.textContent =
            `${number}! = ${result}`;

        resultSection.classList.add(
            "show"
        );

        addLog(
            `Execution completed → ${number}! = ${result}`,
            "return"
        );

        highlightCode(4);
    }

    /*
        Reset buttons
    */

    isRunning = false;

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    stopBtn.disabled = true;

    numberInput.disabled = false;

    pauseBtn.textContent =
        "▶ Pause";
}


/* =========================================================
   PAUSE / RESUME
========================================================= */

function togglePause() {

    if (!isRunning) {
        return;
    }

    isPaused =
        !isPaused;

    if (isPaused) {

        pauseBtn.innerHTML =
            "▶ Resume";

        phaseIndicator.textContent =
            "PAUSED";

        addLog(
            "Visualization paused",
            "call"
        );

    }
    else {

        pauseBtn.innerHTML =
            "⏸ Pause";

        phaseIndicator.textContent =
            "RUNNING";

        addLog(
            "Visualization resumed",
            "call"
        );

    }

}


/* =========================================================
   STOP
========================================================= */

function stopVisualization() {

    isStopped = true;

    isRunning = false;

    isPaused = false;

    if (timer) {
        clearTimeout(timer);
    }

    phaseIndicator.textContent =
        "STOPPED";

    stackStatus.textContent =
        "STOPPED";

    addLog(
        "Visualization stopped by user",
        "base"
    );

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    stopBtn.disabled = true;

    numberInput.disabled = false;

    pauseBtn.innerHTML =
        "⏸ Pause";
}


/* =========================================================
   RESET
========================================================= */

function resetVisualization() {

    isStopped = true;

    isRunning = false;

    isPaused = false;

    if (timer) {
        clearTimeout(timer);
    }

    numberInput.disabled = false;

    startBtn.disabled = false;

    pauseBtn.disabled = true;

    stopBtn.disabled = true;

    pauseBtn.innerHTML =
        "⏸ Pause";

    clearVisualization();

    phaseIndicator.textContent =
        "READY";

    stackStatus.textContent =
        "EMPTY";
}


/* =========================================================
   BUTTON EVENTS
========================================================= */

if (startBtn) {

    startBtn.addEventListener(
        "click",
        startVisualization
    );

}

if (pauseBtn) {

    pauseBtn.addEventListener(
        "click",
        togglePause
    );

}

if (stopBtn) {

    stopBtn.addEventListener(
        "click",
        stopVisualization
    );

}

if (resetBtn) {

    resetBtn.addEventListener(
        "click",
        resetVisualization
    );

}


/* =========================================================
   ENTER KEY
========================================================= */

numberInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            if (!isRunning) {
                startVisualization();
            }

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        pauseBtn.disabled = true;

        stopBtn.disabled = true;

        updateSpeed();

        updateStats();

    }
);


/* =========================================================
   LIVE EXECUTION TIMER
========================================================= */

setInterval(
    function () {

        if (isRunning) {
            updateExecutionTime();
        }

    },
    50
);