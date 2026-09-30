let heap = [];
let originalHeap = [];

let comparisons = 0;
let swaps = 0;
let operationCount = 0;

let isAnimating = false;
let isPaused = false;

let animationSteps = [];
let currentAnimationStep = 0;

let startTime = 0;
let sortedIndexes = new Set();

const arrayInput = document.getElementById("arrayInput");
const tree = document.getElementById("tree");
const arrayView = document.getElementById("arrayView");

const speedSlider = document.getElementById("speedSlider");
const speedValue = document.getElementById("speedValue");

speedSlider.addEventListener("input", () => {
    speedValue.textContent = speedSlider.value + "ms";
});


// =====================================================
// INITIAL LOAD
// =====================================================

window.onload = () => {
    loadArray();
    showPseudo("insert");
};


// =====================================================
// INPUT
// =====================================================

function parseInput() {

    const values = arrayInput.value
        .split(",")
        .map(x => Number(x.trim()))
        .filter(x => Number.isFinite(x));

    return values;
}


function loadArray() {

    if (isAnimating) return;

    const values = parseInput();

    if (values.length === 0) {
        alert("Please enter valid numbers.");
        return;
    }

    heap = [...values];
    originalHeap = [...values];

    resetStats();

    sortedIndexes.clear();

    render();

    updateExplanation(
        "📥",
        "Array Loaded",
        "Your array has been loaded. Click Build Heap to transform it into a valid Max Heap."
    );

    setOperation("Ready");
}


function generateRandom() {

    if (isAnimating) return;

    const size = Math.floor(Math.random() * 7) + 6;

    const values = [];

    for (let i = 0; i < size; i++) {
        values.push(Math.floor(Math.random() * 90) + 10);
    }

    arrayInput.value = values.join(", ");

    loadArray();
}


function clearHeap() {

    if (isAnimating) return;

    heap = [];
    originalHeap = [];

    resetStats();

    sortedIndexes.clear();

    render();

    updateExplanation(
        "🧹",
        "Heap Cleared",
        "The visualization has been reset."
    );

    setOperation("Ready");
}


// =====================================================
// RENDER
// =====================================================

function render(highlight = {}) {

    renderTree(highlight);
    renderArray(highlight);

    updateDashboard();
    updateHeapStatus();
}


// =====================================================
// TREE
// =====================================================

function renderTree(highlight = {}) {

    tree.innerHTML = "";

    if (heap.length === 0) {
        tree.innerHTML = `
            <div style="color:#9da8c2">
                No heap data available
            </div>
        `;
        return;
    }

    const width = Math.max(700, Math.pow(2, Math.ceil(Math.log2(heap.length + 1))) * 80);
    const height = 310;

    const structure = document.createElement("div");
    structure.className = "tree-structure";

    structure.style.width = width + "px";
    structure.style.height = height + "px";

    const svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.classList.add("tree-svg");

    svg.setAttribute("width", width);
    svg.setAttribute("height", height);

    // Draw connections first
    for (let i = 1; i < heap.length; i++) {

        const parent = Math.floor((i - 1) / 2);

        const parentPos = getNodePosition(parent, width);
        const childPos = getNodePosition(i, width);

        const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        );

        line.setAttribute("x1", parentPos.x);
        line.setAttribute("y1", parentPos.y);
        line.setAttribute("x2", childPos.x);
        line.setAttribute("y2", childPos.y);

        line.setAttribute(
            "stroke",
            "rgba(124,92,255,.4)"
        );

        line.setAttribute("stroke-width", "2");

        svg.appendChild(line);
    }

    structure.appendChild(svg);

    // Nodes
    heap.forEach((value, index) => {

        const node = document.createElement("div");

        node.className = "node tree-node";

        node.textContent = value;

        node.dataset.index = index;

        const position = getNodePosition(index, width);

        node.style.left = `${position.x - 32}px`;
        node.style.top = `${position.y - 32}px`;

        if (highlight.compare?.includes(index)) {
            node.classList.add("compare");
        }

        if (highlight.swap?.includes(index)) {
            node.classList.add("swap");
        }

        if (highlight.active?.includes(index)) {
            node.classList.add("active");
        }

        if (sortedIndexes.has(index)) {
            node.classList.add("sorted");
        }

        structure.appendChild(node);
    });

    tree.appendChild(structure);
}


function getNodePosition(index, width) {

    const level = Math.floor(Math.log2(index + 1));

    const firstIndex = Math.pow(2, level) - 1;

    const positionInLevel = index - firstIndex;

    const nodesInLevel = Math.pow(2, level);

    const x = width *
        (positionInLevel + 0.5) /
        nodesInLevel;

    const y = 55 + level * 90;

    return { x, y };
}


// =====================================================
// ARRAY
// =====================================================

function renderArray(highlight = {}) {

    arrayView.innerHTML = "";

    heap.forEach((value, index) => {

        const cell = document.createElement("div");

        cell.className = "array-cell";

        if (highlight.compare?.includes(index)) {
            cell.classList.add("compare");
        }

        if (highlight.swap?.includes(index)) {
            cell.classList.add("swap");
        }

        if (sortedIndexes.has(index)) {
            cell.classList.add("sorted");
        }

        cell.innerHTML = `
            <span class="index">INDEX ${index}</span>
            <span class="value">${value}</span>
        `;

        arrayView.appendChild(cell);
    });
}


// =====================================================
// DASHBOARD
// =====================================================

function updateDashboard() {

    document.getElementById("heapSize").textContent =
        heap.length;

    document.getElementById("maxValue").textContent =
        heap.length ? Math.max(...heap) : "—";

    document.getElementById("minValue").textContent =
        heap.length ? Math.min(...heap) : "—";

    document.getElementById("comparisons").textContent =
        comparisons;

    document.getElementById("swaps").textContent =
        swaps;

    document.getElementById("operations").textContent =
        operationCount;
}


function updateExecutionTime() {

    if (!startTime) return;

    const elapsed = performance.now() - startTime;

    document.getElementById("executionTime").textContent =
        elapsed.toFixed(2) + " ms";
}


function resetStats() {

    comparisons = 0;
    swaps = 0;
    operationCount = 0;

    startTime = 0;

    document.getElementById("comparisons").textContent = "0";
    document.getElementById("swaps").textContent = "0";
    document.getElementById("operations").textContent = "0";
    document.getElementById("executionTime").textContent = "0.00 ms";
    document.getElementById("currentStep").textContent = "Ready";
}


// =====================================================
// HEAP VALIDATION
// =====================================================

function isValidMaxHeap() {

    for (let i = 0; i < heap.length; i++) {

        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (
            left < heap.length &&
            heap[i] < heap[left]
        ) {
            return false;
        }

        if (
            right < heap.length &&
            heap[i] < heap[right]
        ) {
            return false;
        }
    }

    return true;
}


function updateHeapStatus() {

    const status = document.getElementById("heapStatus");

    if (heap.length === 0) {

        status.className = "status valid";
        status.textContent = "⚪ Empty Heap";

        return;
    }

    if (isValidMaxHeap()) {

        status.className = "status valid";
        status.textContent = "🟢 Valid Max Heap";

    } else {

        status.className = "status invalid";
        status.textContent = "🔴 Max Heap Property Violated";
    }
}


// =====================================================
// INSERT
// =====================================================

async function insertValue() {

    if (isAnimating) return;

    const value = prompt("Enter value to insert:");

    if (value === null) return;

    const number = Number(value);

    if (!Number.isFinite(number)) {
        alert("Please enter a valid number.");
        return;
    }

    beginOperation("Insert");

    heap.push(number);

    operationCount++;

    render({
        active: [heap.length - 1]
    });

    updateExplanation(
        "➕",
        "Insertion",
        `Inserted ${number} at the end of the heap. Now Heapify Up will restore the Max Heap property.`
    );

    await delay();

    await heapifyUp(heap.length - 1);

    finishOperation();
}


// =====================================================
// HEAPIFY UP
// =====================================================

async function heapifyUp(index) {

    while (index > 0) {

        const parent = Math.floor((index - 1) / 2);

        comparisons++;

        render({
            compare: [index, parent],
            active: [index]
        });

        updateExplanation(
            "🔍",
            "Comparing",
            `Compare child ${heap[index]} with parent ${heap[parent]}.`
        );

        await delay();

        if (heap[index] <= heap[parent]) {

            updateExplanation(
                "✅",
                "Heap Property Satisfied",
                `${heap[index]} is not greater than ${heap[parent]}, so no swap is required.`
            );

            await delay();

            break;
        }

        swaps++;

        [heap[index], heap[parent]] =
            [heap[parent], heap[index]];

        render({
            swap: [index, parent]
        });

        updateExplanation(
            "🔄",
            "Swapping",
            `Child was larger than its parent. Swap ${heap[index]} and ${heap[parent]}.`
        );

        await delay();

        index = parent;
    }
}


// =====================================================
// DELETE MAX
// =====================================================

async function deleteMax() {

    if (isAnimating || heap.length === 0) return;

    beginOperation("Delete Max");

    if (heap.length === 1) {

        heap.pop();

        render();

        finishOperation();

        return;
    }

    heap[0] = heap[heap.length - 1];

    heap.pop();

    swaps++;

    render({
        active: [0]
    });

    updateExplanation(
        "🗑️",
        "Delete Maximum",
        "The maximum root was removed. The last element moved to the root."
    );

    await delay();

    await heapifyDown(0);

    finishOperation();
}


// =====================================================
// EXTRACT MAX
// =====================================================

async function extractMax() {

    if (isAnimating || heap.length === 0) return;

    beginOperation("Extract Max");

    const maximum = heap[0];

    updateExplanation(
        "👑",
        "Maximum Found",
        `The maximum value is ${maximum}. It will now be extracted.`
    );

    await delay();

    if (heap.length === 1) {

        heap.pop();

        render();

        finishOperation();

        alert(`Extracted Maximum: ${maximum}`);

        return;
    }

    heap[0] = heap.pop();

    swaps++;

    render({
        active: [0]
    });

    updateExplanation(
        "⬇️",
        "Heapify Down",
        "The last element moved to the root. Heapify Down will restore the heap."
    );

    await delay();

    await heapifyDown(0);

    finishOperation();

    alert(`Extracted Maximum: ${maximum}`);
}


// =====================================================
// HEAPIFY DOWN
// =====================================================

async function heapifyDown(index, heapSize = heap.length) {

    while (true) {

        const left = 2 * index + 1;
        const right = 2 * index + 2;

        let largest = index;

        if (left < heapSize) {

            comparisons++;

            render({
                compare: [index, left]
            });

            updateExplanation(
                "🔍",
                "Compare Left Child",
                `Compare parent ${heap[index]} with left child ${heap[left]}.`
            );

            await delay();

            if (heap[left] > heap[largest]) {
                largest = left;
            }
        }

        if (right < heapSize) {

            comparisons++;

            render({
                compare: [index, right]
            });

            updateExplanation(
                "🔍",
                "Compare Right Child",
                `Compare current largest ${heap[largest]} with right child ${heap[right]}.`
            );

            await delay();

            if (heap[right] > heap[largest]) {
                largest = right;
            }
        }

        if (largest === index) {

            updateExplanation(
                "✅",
                "Heap Property Restored",
                "The current node is larger than both children."
            );

            await delay();

            break;
        }

        swaps++;

        [heap[index], heap[largest]] =
            [heap[largest], heap[index]];

        render({
            swap: [index, largest]
        });

        updateExplanation(
            "🔄",
            "Swapping",
            `Swap ${heap[index]} and ${heap[largest]} because the child is larger.`
        );

        await delay();

        index = largest;
    }
}


// =====================================================
// BUILD MAX HEAP
// =====================================================

async function buildHeap() {

    if (isAnimating || heap.length < 2) return;

    beginOperation("Build Max Heap");

    sortedIndexes.clear();

    updateExplanation(
        "🏗️",
        "Building Max Heap",
        "Starting from the last non-leaf node and applying Heapify Down."
    );

    await delay();

    for (
        let i = Math.floor(heap.length / 2) - 1;
        i >= 0;
        i--
    ) {

        updateExplanation(
            "⬇️",
            "Heapify Down",
            `Applying Heapify Down from index ${i}.`
        );

        await heapifyDown(i);

        await delay(0.5);
    }

    render();

    updateExplanation(
        "🎉",
        "Max Heap Built",
        "Every parent is now greater than or equal to its children."
    );

    finishOperation();
}


// =====================================================
// HEAP SORT
// =====================================================

async function heapSort() {

    if (isAnimating || heap.length < 2) return;

    beginOperation("Heap Sort");

    sortedIndexes.clear();

    updateExplanation(
        "⚡",
        "Heap Sort Started",
        "First, we will build a Max Heap."
    );

    await delay();

    // Build heap
    for (
        let i = Math.floor(heap.length / 2) - 1;
        i >= 0;
        i--
    ) {

        await heapifyDown(i);

        await delay(0.4);
    }

    let size = heap.length;

    while (size > 1) {

        updateExplanation(
            "👑",
            "Move Maximum",
            `Move the maximum value ${heap[0]} to position ${size - 1}.`
        );

        await delay();

        swaps++;

        [heap[0], heap[size - 1]] =
            [heap[size - 1], heap[0]];

        sortedIndexes.add(size - 1);

        render({
            swap: [0, size - 1]
        });

        await delay();

        size--;

        if (size > 1) {

            updateExplanation(
                "⬇️",
                "Heapify Down",
                "Restore the Max Heap property in the remaining unsorted section."
            );

            await heapifyDown(0, size);
        }
    }

    sortedIndexes.add(0);

    render();

    updateExplanation(
        "🎉",
        "Heap Sort Complete",
        "All elements are now sorted in ascending order."
    );

    finishOperation();
}


// =====================================================
// ANIMATION SYSTEM
// =====================================================

function beginOperation(name) {

    isAnimating = true;
    isPaused = false;

    startTime = performance.now();

    operationCount++;

    setOperation(name);
}


function finishOperation() {

    isAnimating = false;
    isPaused = false;

    updateExecutionTime();

    render();

    document.getElementById("currentStep").textContent =
        "Complete";

    setOperation("Complete");
}


function delay(multiplier = 1) {

    return new Promise(resolve => {

        const time =
            Number(speedSlider.value) * multiplier;

        setTimeout(() => {

            updateExecutionTime();

            if (isPaused) {

                waitUntilResume(resolve);

            } else {

                resolve();
            }

        }, time);
    });
}


function waitUntilResume(resolve) {

    const interval = setInterval(() => {

        if (!isPaused) {

            clearInterval(interval);
            resolve();
        }

    }, 100);
}


// =====================================================
// PLAY / PAUSE / STEP / RESET
// =====================================================

function playAnimation() {

    isPaused = false;

    if (isAnimating) {
        updateExplanation(
            "▶️",
            "Animation Resumed",
            "The algorithm animation is running again."
        );
    }
}


function pauseAnimation() {

    if (!isAnimating) return;

    isPaused = true;

    updateExplanation(
        "⏸️",
        "Animation Paused",
        "Press Play to continue the algorithm."
    );
}


function stepAnimation() {

    if (isAnimating) {

        isPaused = false;

        updateExplanation(
            "⏭️",
            "Step Forward",
            "The current algorithm step is being executed."
        );

    } else {

        alert(
            "Start an operation first, then use Step Forward."
        );
    }
}


function resetVisualization() {

    if (isAnimating) return;

    heap = [...originalHeap];

    sortedIndexes.clear();

    resetStats();

    render();

    updateExplanation(
        "↻",
        "Visualization Reset",
        "The heap has been restored to its original input array."
    );

    setOperation("Ready");
}


// =====================================================
// UI HELPERS
// =====================================================

function setOperation(text) {

    document.getElementById("currentOperation").textContent =
        text;
}


function updateExplanation(icon, title, message) {

    document.getElementById("explanationText").innerHTML = `
        <div class="explanation-icon">${icon}</div>

        <div>
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;

    document.getElementById("currentStep").textContent =
        title;
}


// =====================================================
// PSEUDOCODE
// =====================================================

const pseudocode = {

    insert: `
INSERT(value)

1. Add value to the end of heap.
2. Set index = last index.
3. While index > 0:
4.     parent = floor((index - 1) / 2)
5.     If heap[index] <= heap[parent]:
6.         Stop
7.     Swap child and parent.
8.     index = parent
`,

    up: `
HEAPIFY-UP(index)

1. While index > 0:
2.     parent = floor((index - 1) / 2)
3.     Compare heap[index] with heap[parent]
4.     If child > parent:
5.         Swap child and parent
6.         index = parent
7.     Else:
8.         Stop
`,

    down: `
HEAPIFY-DOWN(index)

1. left = 2 * index + 1
2. right = 2 * index + 2
3. largest = index
4. If left exists and heap[left] > heap[largest]:
5.     largest = left
6. If right exists and heap[right] > heap[largest]:
7.     largest = right
8. If largest != index:
9.     Swap index and largest
10.    Heapify Down(largest)
`,

    extract: `
EXTRACT-MAX()

1. maximum = heap[0]
2. Move last element to root.
3. Remove last element.
4. Heapify Down from root.
5. Return maximum.
`,

    build: `
BUILD-MAX-HEAP()

1. Start from last non-leaf node.
2. For each node moving upward:
3.     Apply Heapify Down.
4. Continue until root is processed.
5. Result is a valid Max Heap.

Time Complexity: O(n)
`,

    sort: `
HEAP-SORT()

1. Build a Max Heap.
2. Set heapSize = n.
3. While heapSize > 1:
4.     Swap root with last element.
5.     Mark last element as sorted.
6.     Reduce heapSize.
7.     Heapify Down from root.
8. Repeat until array is sorted.

Time Complexity: O(n log n)
Space Complexity: O(1)
`
};


function showPseudo(type) {

    document.getElementById("pseudoCode").textContent =
        pseudocode[type];
}


// =====================================================
// KEYBOARD SHORTCUTS
// =====================================================

document.addEventListener("keydown", event => {

    if (event.code === "Space") {

        event.preventDefault();

        if (isAnimating) {

            if (isPaused) {
                playAnimation();
            } else {
                pauseAnimation();
            }

        }
    }
});