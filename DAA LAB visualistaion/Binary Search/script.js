/*==================================================
        BINARY SEARCH AI VISUALIZER
        Developed by Shashwanth Chary Odela
        JAVASCRIPT PART 1
==================================================*/


//==============================
// HTML ELEMENTS
//==============================

const arrayContainer = document.getElementById("array-container");

const generateBtn = document.getElementById("generateBtn");

const sortBtn = document.getElementById("sortBtn");

const searchBtn = document.getElementById("searchBtn");

const resetBtn = document.getElementById("resetBtn");

const targetInput = document.getElementById("target");

const sizeSlider = document.getElementById("sizeSlider");

const speedSlider = document.getElementById("speedSlider");

const message = document.getElementById("message");




//==============================
// DASHBOARD
//==============================

const lowValue = document.getElementById("lowValue");

const midValue = document.getElementById("midValue");

const highValue = document.getElementById("highValue");

const targetValue = document.getElementById("targetValue");

const comparisonCount = document.getElementById("comparisonCount");

const iterationCount = document.getElementById("iterationCount");

const searchStatus = document.getElementById("searchStatus");

const aiMessage = document.getElementById("aiMessage");




//==============================
// VARIABLES
//==============================

let numbers = [];

let speed = 500;

let comparisons = 0;

let iterations = 0;

let searching = false;

let paused = false;




//==============================
// GENERATE RANDOM ARRAY
//==============================

function generateArray() {

    numbers = [];

    let size = Number(sizeSlider.value);

    for (let i = 0; i < size; i++) {

        numbers.push(

            Math.floor(Math.random() * 90) + 10

        );

    }

    displayArray();

    resetDashboard();

}






//==============================
// DISPLAY ARRAY
//==============================

function displayArray() {

    arrayContainer.innerHTML = "";

    numbers.forEach((value, index) => {

        let box = document.createElement("div");

        box.className = "array-box";

        box.innerHTML = value;

        box.dataset.index = index;

        arrayContainer.appendChild(box);

    });

}






//==============================
// SORT ARRAY
//==============================

sortBtn.addEventListener("click", () => {

    numbers.sort((a, b) => a - b);

    displayArray();

    message.innerHTML = "✅ Array Sorted Successfully";

    aiMessage.innerHTML =

        "Binary Search requires the array to be sorted. Now you can begin searching.";

});







//==============================
// RESET DASHBOARD
//==============================

function resetDashboard() {

    comparisons = 0;

    iterations = 0;

    comparisonCount.innerHTML = 0;

    iterationCount.innerHTML = 0;

    lowValue.innerHTML = "-";

    midValue.innerHTML = "-";

    highValue.innerHTML = "-";

    targetValue.innerHTML = "-";

    searchStatus.innerHTML = "Ready";

    aiMessage.innerHTML =

        "Generate an array and click Sort Array before searching.";

}







//==============================
// SLEEP FUNCTION
//==============================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}







//==============================
// UPDATE SPEED
//==============================

speedSlider.addEventListener("input", () => {

    speed = Number(speedSlider.value);

});







//==============================
// GENERATE BUTTON
//==============================

generateBtn.addEventListener("click", () => {

    generateArray();

});







//==============================
// INITIAL LOAD
//==============================

generateArray();
/*==================================================
        BINARY SEARCH
        JAVASCRIPT PART 2
==================================================*/



//==================================
// START SEARCH BUTTON
//==================================

searchBtn.addEventListener("click", () => {

    if (searching) {

        return;

    }

    binarySearch();

});




//==================================
// MAIN BINARY SEARCH
//==================================

async function binarySearch() {

    let target = Number(targetInput.value);

    if (isNaN(target)) {

        alert("Please enter a number.");

        return;

    }

    searching = true;

    targetValue.innerHTML = target;

    searchStatus.innerHTML = "Searching...";

    message.innerHTML = "Binary Search Started";

    let low = 0;

    let high = numbers.length - 1;

    let boxes = document.querySelectorAll(".array-box");

    while (low <= high) {

        comparisons++;

        iterations++;

        comparisonCount.innerHTML = comparisons;

        iterationCount.innerHTML = iterations;

        boxes.forEach(box => {

            box.classList.remove("low");

            box.classList.remove("mid");

            box.classList.remove("high");

        });

        let mid = Math.floor((low + high) / 2);

        lowValue.innerHTML = low;

        midValue.innerHTML = mid;

        highValue.innerHTML = high;

        boxes[low].classList.add("low");

        boxes[mid].classList.add("mid");

        boxes[high].classList.add("high");

        aiMessage.innerHTML =

            "Checking middle element " +

            numbers[mid] +

            " at index " +

            mid;

        await sleep(speed);




        //==================================
        // ELEMENT FOUND
        //==================================

        if (numbers[mid] === target) {

            boxes[mid].classList.remove("mid");

            boxes[mid].classList.add("found");

            message.innerHTML =

                "🎉 Element Found at Index " + mid;

            searchStatus.innerHTML = "Found";

            aiMessage.innerHTML =

                "Target matched with the middle element. Search completed successfully.";

            searching = false;

            return;

        }




        //==================================
        // SEARCH RIGHT HALF
        //==================================

        if (target > numbers[mid]) {

            aiMessage.innerHTML =

                "Target is greater than the middle element. Eliminating the left half.";

            for (let i = low; i <= mid; i++) {

                boxes[i].classList.add("removed");

            }

            low = mid + 1;

        }




        //==================================
        // SEARCH LEFT HALF
        //==================================

        else {

            aiMessage.innerHTML =

                "Target is smaller than the middle element. Eliminating the right half.";

            for (let i = mid; i <= high; i++) {

                boxes[i].classList.add("removed");

            }

            high = mid - 1;

        }

        await sleep(speed);

    }




    //==================================
    // NOT FOUND
    //==================================

    message.innerHTML =

        "❌ Element Not Found";

    searchStatus.innerHTML = "Not Found";

    aiMessage.innerHTML =

        "The target value does not exist in the sorted array.";

    searching = false;

}
/*==================================================
        ADVANCED FEATURES
        JAVASCRIPT PART 3
==================================================*/


//==================================
// TIMER VARIABLES
//==================================

let startTime = 0;

let endTime = 0;

let elapsed = 0;



//==================================
// VOICE FUNCTION
//==================================

function speak(text) {

    if ("speechSynthesis" in window) {

        speechSynthesis.cancel();

        let speech = new SpeechSynthesisUtterance(text);

        speech.rate = 0.95;

        speech.pitch = 1;

        speech.volume = 1;

        speechSynthesis.speak(speech);

    }

}



//==================================
// FINISH SEARCH
//==================================

function finishSearch(found) {

    endTime = performance.now();

    elapsed = (endTime - startTime).toFixed(2);

    document.getElementById("timeTaken").innerHTML =
        elapsed + " ms";

    searching = false;

    paused = false;

    if (found) {

        speak("Congratulations. Element Found.");

        setTimeout(() => {

            alert("🎉 Element Found Successfully!");

        }, 300);

    }

    else {

        speak("Element Not Found.");

        setTimeout(() => {

            alert("❌ Element Not Found");

        }, 300);

    }

}



//==================================
// PAUSE BUTTON
//==================================

const stepBtn = document.getElementById("stepBtn");

stepBtn.addEventListener("click", () => {

    paused = !paused;

    if (paused) {

        searchStatus.innerHTML = "Paused";

        message.innerHTML = "⏸ Search Paused";

        aiMessage.innerHTML =
            "Binary Search is paused. Click Step Mode again to continue.";

    }

    else {

        searchStatus.innerHTML = "Searching";

        message.innerHTML = "▶ Search Resumed";

        aiMessage.innerHTML =
            "Binary Search resumed.";

    }

});




//==================================
// WAIT WHILE PAUSED
//==================================

async function waitIfPaused() {

    while (paused) {

        await sleep(120);

    }

}




//==================================
// RESET BUTTON
//==================================

resetBtn.addEventListener("click", () => {

    searching = false;

    paused = false;

    speechSynthesis.cancel();

    generateArray();

    targetInput.value = "";

    document.getElementById("timeTaken").innerHTML =
        "0 ms";

    message.innerHTML =
        "Visualization Reset Successfully";

});




//==================================
// START TIMER
//==================================

searchBtn.addEventListener("click", () => {

    startTime = performance.now();

});




//==================================
// KEYBOARD SHORTCUTS
//==================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        if (!searching) {

            searchBtn.click();

        }

    }

    if (event.key === "Escape") {

        resetBtn.click();

    }

});




//==================================
// WELCOME MESSAGE
//==================================

window.onload = () => {

    aiMessage.innerHTML =

        "🤖 Welcome! Generate an array, sort it, then search using Binary Search.";

};
/*==================================================
        PREMIUM FEATURES
        JAVASCRIPT PART 4
==================================================*/


//==================================
// RANDOM FACTS
//==================================

const binaryFacts = [

    "Binary Search works only on sorted arrays.",

    "Each comparison cuts the search space into half.",

    "Binary Search follows Divide and Conquer.",

    "Time Complexity is O(log n).",

    "Linear Search is better only for very small arrays.",

    "Binary Search is widely used in databases."

];



function showRandomFact() {

    const fact = document.getElementById("factText");

    if (fact) {

        let random = Math.floor(Math.random() * binaryFacts.length);

        fact.innerHTML = binaryFacts[random];

    }

}

setInterval(showRandomFact, 5000);




//==================================
// SEARCH SOUND
//==================================

function playSuccessSound() {

    try {

        const audio = new Audio(

            "https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"

        );

        audio.volume = 0.4;

        audio.play();

    }

    catch (error) {

        console.log(error);

    }

}




//==================================
// CELEBRATION EFFECT
//==================================

function celebrate() {

    for (let i = 0; i < 25; i++) {

        const star = document.createElement("div");

        star.innerHTML = "✨";

        star.style.position = "fixed";

        star.style.left = Math.random() * 100 + "vw";

        star.style.top = "-20px";

        star.style.fontSize = "30px";

        star.style.zIndex = "9999";

        star.style.transition = "3s";

        document.body.appendChild(star);

        setTimeout(() => {

            star.style.top = "100vh";

            star.style.transform = "rotate(720deg)";

        }, 100);

        setTimeout(() => {

            star.remove();

        }, 3200);

    }

}




//==================================
// IMPROVE FINISH SEARCH
//==================================

const originalFinishSearch = finishSearch;

finishSearch = function (found) {

    originalFinishSearch(found);

    if (found) {

        celebrate();

        playSuccessSound();

    }

};




//==================================
// DOWNLOAD REPORT
//==================================

function downloadReport() {

    const report =

        `Binary Search Report

Developer : Shashwanth Chary Odela

Comparisons : ${comparisons}

Iterations : ${iterations}

Target : ${targetInput.value}

Status : ${searchStatus.innerHTML}

Time : ${document.getElementById("timeTaken").innerHTML}

Generated Successfully`;



    const blob = new Blob(

        [report],

        { type: "text/plain" }

    );



    const link = document.createElement("a");



    link.href = URL.createObjectURL(blob);



    link.download = "BinarySearchReport.txt";



    link.click();

}




const reportButton = document.createElement("button");

reportButton.innerHTML = "📥 Download Report";

reportButton.style.marginTop = "20px";

reportButton.onclick = downloadReport;

document.querySelector(".developer-card").appendChild(reportButton);




//==================================
// DARK MODE BUTTON
//==================================

const themeButton = document.createElement("button");

themeButton.innerHTML = "🌙 Dark / Light";

themeButton.style.marginLeft = "15px";

document.querySelector(".developer-card").appendChild(themeButton);



let dark = true;



themeButton.onclick = function () {

    if (dark) {

        document.body.style.background = "#f4f7fb";

        document.body.style.color = "#111";

        dark = false;

    }

    else {

        document.body.style.background = "#071126";

        document.body.style.color = "white";

        dark = true;

    }

};




//==================================
// DEVELOPER MESSAGE
//==================================

console.log(

    "🚀 Binary Search AI Visualizer"

);

console.log(

    "👨‍💻 Developed by Shashwanth Chary Odela"

);

console.log(

    "⭐ Premium Edition"

);




//==================================
// WELCOME POPUP
//==================================

setTimeout(() => {

    alert(

        "🤖 Welcome to the Advanced Binary Search AI Visualizer\n\nDeveloped by Shashwanth Chary Odela"

    );

}, 1200);