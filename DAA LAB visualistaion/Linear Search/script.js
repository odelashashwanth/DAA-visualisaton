// =======================================
// LINEAR SEARCH VISUALIZER
// Developed by Shashwanth Chary Odela
// JAVASCRIPT PART 1
// =======================================


// Getting HTML Elements

const arrayContainer =
    document.getElementById("array-container");


const generateBtn =
    document.getElementById("generateBtn");


const startBtn =
    document.getElementById("startBtn");


const pauseBtn =
    document.getElementById("pauseBtn");


const resetBtn =
    document.getElementById("resetBtn");


const searchInput =
    document.getElementById("searchInput");


const sizeSlider =
    document.getElementById("sizeSlider");


const speedSlider =
    document.getElementById("speedSlider");


const message =
    document.getElementById("message");



// Statistics Elements

const comparisonDisplay =
    document.getElementById("comparison");


const currentIndexDisplay =
    document.getElementById("currentIndex");


const statusDisplay =
    document.getElementById("status");


const checkedDisplay =
    document.getElementById("checked");




// Array Variables

let array = [];

let size = 10;

let speed = 500;

let comparisons = 0;

let checked = 0;

let paused = false;

let searching = false;





// =======================================
// Generate Random Array
// =======================================


function generateArray() {


    array = [];


    size = sizeSlider.value;



    for (let i = 0; i < size; i++) {


        let number =
            Math.floor(Math.random() * 90) + 10;


        array.push(number);


    }



    displayArray();


    resetStatistics();



    message.innerHTML =
        "New array generated 🔄";


}







// =======================================
// Display Array
// =======================================


function displayArray() {


    arrayContainer.innerHTML = "";



    array.forEach((value, index) => {


        let box =
            document.createElement("div");



        box.classList.add("array-box");



        box.innerHTML = value;



        box.setAttribute(
            "data-index",
            index
        );



        arrayContainer.appendChild(box);



    });


}






// =======================================
// Reset Statistics
// =======================================


function resetStatistics() {


    comparisons = 0;

    checked = 0;



    comparisonDisplay.innerHTML = 0;


    checkedDisplay.innerHTML = 0;


    currentIndexDisplay.innerHTML = "-";


    statusDisplay.innerHTML = "Ready";


}







// =======================================
// Slider Controls
// =======================================


sizeSlider.addEventListener(
    "input",
    () => {


        generateArray();


    });




speedSlider.addEventListener(
    "input",
    () => {


        speed =
            speedSlider.value;


    });







// =======================================
// Generate Button
// =======================================


generateBtn.addEventListener(
    "click",
    () => {


        generateArray();


    });






// Initial Load

generateArray();
// =======================================
// LINEAR SEARCH ALGORITHM
// JAVASCRIPT PART 2
// =======================================



// Delay Function

function sleep(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );

}







// Get Array Boxes

function getBoxes() {

    return document.querySelectorAll(".array-box");

}








// Update Message

function updateMessage(text) {

    message.innerHTML = text;

}









// =======================================
// LINEAR SEARCH FUNCTION
// =======================================


async function linearSearch() {



    if (searching) {

        return;

    }



    let target =
        Number(searchInput.value);



    if (isNaN(target)) {


        updateMessage(
            "⚠️ Please enter a search value"
        );


        return;

    }




    searching = true;



    resetStatistics();



    let boxes = getBoxes();



    statusDisplay.innerHTML =
        "Searching...";




    updateMessage(

        `🔍 Searching for ${target}`

    );






    for (let i = 0; i < array.length; i++) {



        while (paused) {

            await sleep(100);

        }




        // Highlight Current Element


        boxes[i].classList.add(
            "searching"
        );



        currentIndexDisplay.innerHTML =
            i;



        checked++;

        comparisons++;



        checkedDisplay.innerHTML =
            checked;


        comparisonDisplay.innerHTML =
            comparisons;



        updateMessage(

            `Checking index ${i}: ${array[i]} compared with ${target}`

        );





        await sleep(speed);






        // Check Match


        if (array[i] === target) {



            boxes[i].classList.remove(
                "searching"
            );



            boxes[i].classList.add(
                "found"
            );



            statusDisplay.innerHTML =
                "Found ✅";



            updateMessage(

                `🎉 Element ${target} found at index ${i}`

            );



            searching = false;


            return;


        }







        boxes[i].classList.remove(
            "searching"
        );



    }







    // If Element Not Found


    statusDisplay.innerHTML =
        "Not Found ❌";



    updateMessage(

        `❌ ${target} is not present in the array`

    );



    searching = false;



}










// =======================================
// START BUTTON
// =======================================


startBtn.addEventListener(
    "click",
    () => {


        linearSearch();


    });
// =======================================
// SEARCH CONTROL FUNCTIONS
// JAVASCRIPT PART 3
// =======================================



// =======================================
// PAUSE BUTTON
// =======================================


pauseBtn.addEventListener(
    "click",
    () => {


        if (searching) {


            paused = true;


            statusDisplay.innerHTML =
                "Paused ⏸";


            updateMessage(
                "⏸ Searching paused"
            );


        }


    });









// =======================================
// RESUME SEARCHING
// =======================================


document.getElementById("pauseBtn")
    .addEventListener(
        "dblclick",
        () => {


            if (searching) {


                paused = false;


                statusDisplay.innerHTML =
                    "Searching 🔍";


                updateMessage(
                    "▶ Searching resumed"
                );


            }


        });









// =======================================
// RESET BUTTON
// =======================================


resetBtn.addEventListener(
    "click",
    () => {


        searching = false;


        paused = false;



        let boxes = getBoxes();



        boxes.forEach(box => {


            box.classList.remove(
                "searching"
            );


            box.classList.remove(
                "found"
            );


            box.classList.remove(
                "not-found"
            );


        });





        resetStatistics();



        statusDisplay.innerHTML =
            "Ready";



        updateMessage(

            "🔄 Visualization Reset"

        );



    });









// =======================================
// STOP SEARCH FUNCTION
// =======================================


function stopSearch() {


    searching = false;


    paused = false;



    let boxes = getBoxes();



    boxes.forEach(box => {


        box.classList.remove(
            "searching"
        );


    });



    statusDisplay.innerHTML =
        "Stopped ⛔";



    updateMessage(
        "⛔ Search stopped"
    );


}








// =======================================
// ESC KEY STOP CONTROL
// =======================================


document.addEventListener(
    "keydown",
    (event) => {


        if (event.key === "Escape") {


            stopSearch();


        }


    });
// =======================================
// FINAL FEATURES
// JAVASCRIPT PART 4
// Developed by Shashwanth Chary Odela
// =======================================





// =======================================
// VOICE EXPLANATION
// =======================================


const voiceText =
    document.createElement("button");


voiceText.innerHTML =
    "🔊 Explain Linear Search";



voiceText.style.marginTop =
    "20px";



voiceText.style.padding =
    "12px 25px";



voiceText.style.borderRadius =
    "30px";



voiceText.style.cursor =
    "pointer";



document.querySelector(".visual-section")
    .appendChild(voiceText);






voiceText.addEventListener(
    "click",
    () => {


        let speech =
            new SpeechSynthesisUtterance();



        speech.text =
            "Linear search checks each element one by one until the required element is found. It works on both sorted and unsorted arrays. The best case time complexity is O of 1 and worst case time complexity is O of n.";



        speech.rate = 0.9;



        speech.pitch = 1;



        window.speechSynthesis.speak(
            speech
        );


    });









// =======================================
// COMPLETION EFFECT
// =======================================



function showSuccess() {



    let resultBox =
        document.getElementById("resultBox");



    resultBox.innerHTML =
        "🎉 Search Completed Successfully!";



    resultBox.style.color =
        "#00ff88";



    resultBox.style.transform =
        "scale(1.1)";



    setTimeout(() => {


        resultBox.style.transform =
            "scale(1)";


    }, 500);



}








// =======================================
// MODIFY LINEAR SEARCH COMPLETION
// =======================================



const oldLinearSearch =
    linearSearch;



// Developer Message


console.log(

    "🚀 Linear Search Visualizer | Developed by Shashwanth Chary Odela"

);