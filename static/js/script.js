
const categorySelect = document.getElementById("category");
const questionText = document.getElementById("questionText");
const questionCategory = document.getElementById("questionCategory");

const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const resetBtn = document.getElementById("resetBtn");

const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");
const questionCard = document.getElementById("questionCard");

let history = [];
let historyIndex = -1;
let isLoading = false;


// GET RANDOM QUESTION
async function getQuestion() {

    if (isLoading) return;

    isLoading = true;
    nextBtn.disabled = true;

    questionCard.classList.add("changing");

    try {

        const category = categorySelect.value;

        const response = await fetch(
            `/api/question?category=${category}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to get question.");
        }

        const questionData = {
            question: data.question,
            category: data.category,
            remaining: data.remaining,
            total: data.total
        };

        // Remove forward history when generating a new question
        history = history.slice(0, historyIndex + 1);

        history.push(questionData);
        historyIndex = history.length - 1;

        displayQuestion(questionData);

    } catch (error) {

        questionText.textContent = error.message;
        questionCategory.textContent = "NOTICE";

    } finally {

        questionCard.classList.remove("changing");
        nextBtn.disabled = false;
        isLoading = false;

        updateButtons();
    }
}


// DISPLAY QUESTION
function displayQuestion(data) {

    questionText.textContent = data.question;
    questionCategory.textContent = data.category;

    counter.textContent =
        `${data.remaining} / ${data.total}`;

    const used = data.total - data.remaining;

    const percentage = data.total > 0
        ? (used / data.total) * 100
        : 0;

    progressBar.style.width = `${percentage}%`;

    updateButtons();
}


// PREVIOUS QUESTION
function previousQuestion() {

    if (historyIndex <= 0) return;

    historyIndex--;

    displayQuestion(history[historyIndex]);
}


// NEXT QUESTION
nextBtn.addEventListener("click", getQuestion);


// PREVIOUS BUTTON
previousBtn.addEventListener("click", previousQuestion);


// CHANGE CATEGORY
categorySelect.addEventListener("change", async () => {

    history = [];
    historyIndex = -1;

    await resetPool(false);

    getQuestion();
});


// RESET QUESTION POOL
async function resetPool(showMessage = true) {

    try {

        const response = await fetch("/api/reset", {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Unable to reset questions.");
        }

        history = [];
        historyIndex = -1;

        if (showMessage) {
            questionText.textContent =
                "Your question pool has been reset. Ready for a fresh conversation?";

            questionCategory.textContent = "RESET";

            counter.textContent = "0 / 0";
            progressBar.style.width = "0%";

            updateButtons();
        }

    } catch (error) {

        alert(error.message);

    }
}


// RESET BUTTON
resetBtn.addEventListener("click", () => {
    resetPool(true);
});


// UPDATE BUTTON STATES
function updateButtons() {

    previousBtn.disabled = historyIndex <= 0;

    nextBtn.disabled = isLoading;
}


// INITIAL QUESTION
document.addEventListener("DOMContentLoaded", () => {
    getQuestion();
});
