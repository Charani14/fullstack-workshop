let count = 0;
let step = 1;

const countDisplay = document.getElementById("count");
const stepButtons = document.querySelectorAll(".step-btn");

const updateDisplay = () => {
    countDisplay.textContent = `${count}`;

    if (count > 0) {
        countDisplay.style.color = "green";
    } else if (count < 0) {
        countDisplay.style.color = "red";
    } else {
        countDisplay.style.color = "black";
    }
};

const increment = () => {
    count += step;
    updateDisplay();
};

const decrement = () => {
    count -= step;
    updateDisplay();
};

const reset = () => {
    count = 0;
    updateDisplay();
};

const setStep = (value) => {
    step = value;
};

// Using array method (forEach)
stepButtons.forEach(button => {
    button.addEventListener("click", () => {
        setStep(Number(button.dataset.step));
    });
});

// Initial render
updateDisplay();
