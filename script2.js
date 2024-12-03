// Function to generate a delay for visualization
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let isPaused = false;

// Pause and resume functionality
function togglePause() {
    const pauseButton = document.getElementById("pauseButton");
    isPaused = !isPaused;

    if (isPaused) {
        pauseButton.textContent = "Resume";
    } else {
        pauseButton.textContent = "Pause";
    }
}

// Enhanced sleep function to handle pause
async function sleep(ms) {
    while (isPaused) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Check every 100ms
    }
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to enable/disable sorting buttons (excluding Pause and Reset)
function setSortingButtonsState(isDisabled) {
    const buttons = document.querySelectorAll('#bubbleSort, #insertionSort, #selectionSort, #generateArray');
    buttons.forEach(button => {
        button.disabled = isDisabled;
    });
}

// Array container and input handling
const arrayContainer = document.getElementById('arrayContainer');
const submitValuesBtn = document.getElementById('submitValues');
let array = [];

// Generate array based on user input
function generateArrayFromInput() {
    const userInput = document.getElementById('userValues').value;
    if (!userInput.trim()) {
        alert("Please enter valid values separated by commas.");
        return;
    }

    const values = userInput.split(',').map(val => parseInt(val.trim(), 10));
    if (values.some(isNaN)) {
        alert("Invalid input! Please enter only numbers separated by commas.");
        return;
    }

    array = values;
    arrayContainer.innerHTML = ''; // Clear previous array

    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.width = `${100 / array.length}%`;
        bar.style.height = `${value * 3}px`; // Set the height based on the value

        // Create a span to hold the number corresponding to the bar's height
        const barText = document.createElement('span');
        barText.classList.add('bar-text');
        barText.textContent = value;

        // Append the text inside the bar
        bar.appendChild(barText);
        arrayContainer.appendChild(bar);
    });
}

// Bubble Sort
async function bubbleSort() {
    setSortingButtonsState(true); // Disable sorting buttons
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';

            await sleep(50); // Delay for visualization

            if (array[j] > array[j + 1]) {
                // Swap values in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap bar heights visually
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;

                // Update the numbers inside the bars
                bars[j].querySelector('.bar-text').textContent = array[j];
                bars[j + 1].querySelector('.bar-text').textContent = array[j + 1];
            }

            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }

        bars[array.length - i - 1].style.backgroundColor = 'green'; // Mark sorted
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green'; // Mark all as sorted
    }

    alert("Bubble Sort is Completed");
    setSortingButtonsState(false); // Enable sorting buttons
}

// Insertion Sort
async function insertionSort() {
    setSortingButtonsState(true); // Disable sorting buttons
    const bars = document.getElementsByClassName('bar');

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';

        await sleep(50);

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];

            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].querySelector('.bar-text').textContent = array[j + 1];

            bars[j].style.backgroundColor = 'yellow';
            j--;

            await sleep(50);
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].querySelector('.bar-text').textContent = key;

        bars[i].style.backgroundColor = 'steelblue';

        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'green';
        }
    }

    alert("Insertion Sort is Completed");
    setSortingButtonsState(false); // Enable sorting buttons
}

// Selection Sort
async function selectionSort() {
    setSortingButtonsState(true); // Disable sorting buttons
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = 'red';

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';

            await sleep(50);

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = 'steelblue';
                }
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'steelblue';
            }
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;

            bars[i].querySelector('.bar-text').textContent = array[i];
            bars[minIndex].querySelector('.bar-text').textContent = array[minIndex];
        }

        bars[minIndex].style.backgroundColor = 'steelblue';
        bars[i].style.backgroundColor = 'green';
    }

    alert("Selection Sort is Completed");
    setSortingButtonsState(false); // Enable sorting buttons
}

// Reset Array Function
function resetArray() {
    window.location.reload();
}

// Event listeners
submitValuesBtn.addEventListener('click', generateArrayFromInput);
document.getElementById('bubbleSort').addEventListener('click', bubbleSort);
document.getElementById('insertionSort').addEventListener('click', insertionSort);
document.getElementById('selectionSort').addEventListener('click', selectionSort);
