
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
let animationTimeout = null;


// ============================================================
// ANIMATE QUESTION DISPLAY
// ============================================================

function animateQuestion(question, category) {

    // Cancel any pending animation
    if (animationTimeout) {
        clearTimeout(animationTimeout);
        animationTimeout = null;
    }

    // Remove existing animation classes
    questionCard.classList.remove(
        "question-reveal",
        "question-exit",
        "changing"
    );

    // Start exit animation
    questionCard.classList.add("question-exit");

    animationTimeout = setTimeout(() => {

        // Update question content
        questionText.textContent = question;
        questionCategory.textContent = category.toUpperCase();

        // Remove exit animation
        questionCard.classList.remove("question-exit");

        // Force browser reflow to restart animation
        void questionCard.offsetWidth;

        // Start reveal animation
        questionCard.classList.add("question-reveal");

        // Remove animation class after completion
        animationTimeout = setTimeout(() => {

            questionCard.classList.remove("question-reveal");
            animationTimeout = null;

        }, 850);

    }, 250);
}


// ============================================================
// DISPLAY QUESTION
// ============================================================

function displayQuestion(data, animate = true) {

    if (animate) {

        animateQuestion(
            data.question,
            data.category
        );

    } else {

        questionText.textContent = data.question;
        questionCategory.textContent =
            data.category.toUpperCase();

    }

    // Update question counter
    counter.textContent =
        `${data.remaining} / ${data.total}`;

    // Calculate progress
    const used = data.total - data.remaining;

    const percentage = data.total > 0
        ? (used / data.total) * 100
        : 0;

    progressBar.style.width = `${percentage}%`;

    updateButtons();
}


// ============================================================
// GET RANDOM QUESTION
// ============================================================

async function getQuestion() {

    if (isLoading) return;

    isLoading = true;
    updateButtons();

    try {

        const category = categorySelect.value;

        const response = await fetch(
            `/date/api/question?category=${encodeURIComponent(category)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to get question."
            );
        }

        const questionData = {
            question: data.question,
            category: data.category,
            remaining: data.remaining,
            total: data.total
        };

        // Remove forward history when generating a new question
        history = history.slice(0, historyIndex + 1);

        // Save new question
        history.push(questionData);
        historyIndex = history.length - 1;

        // Display with animation
        displayQuestion(questionData);

    } catch (error) {

        animateQuestion(
            error.message,
            "NOTICE"
        );

    } finally {

        isLoading = false;
        updateButtons();

    }
}


// ============================================================
// PREVIOUS QUESTION
// ============================================================

function previousQuestion() {

    if (historyIndex <= 0 || isLoading) return;

    historyIndex--;

    const previousData = history[historyIndex];

    // Animate previous question
    displayQuestion(previousData);

}


// ============================================================
// NEXT BUTTON
// ============================================================

nextBtn.addEventListener("click", () => {

    getQuestion();

});


// ============================================================
// PREVIOUS BUTTON
// ============================================================

previousBtn.addEventListener("click", () => {

    previousQuestion();

});


// ============================================================
// CHANGE CATEGORY
// ============================================================

categorySelect.addEventListener("change", async () => {

    if (isLoading) return;

    history = [];
    historyIndex = -1;

    const resetSuccessful = await resetPool(false);

    if (resetSuccessful) {
        await getQuestion();
    }

});


// ============================================================
// RESET QUESTION POOL
// ============================================================

async function resetPool(showMessage = true) {

    if (isLoading) return false;

    try {

        const response = await fetch("/date/api/reset", {
            method: "POST"
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to reset questions."
            );
        }

        history = [];
        historyIndex = -1;

        if (showMessage) {

            animateQuestion(
                "Your question pool has been reset. Ready for a fresh conversation?",
                "RESET"
            );

            counter.textContent = "0 / 0";
            progressBar.style.width = "0%";

            updateButtons();

        }

        return true;

    } catch (error) {

        alert(error.message);
        return false;

    }
}


// ============================================================
// RESET BUTTON
// ============================================================

resetBtn.addEventListener("click", async () => {

    await resetPool(true);

});


// ============================================================
// UPDATE BUTTON STATES
// ============================================================

function updateButtons() {

    previousBtn.disabled =
        isLoading || historyIndex <= 0;

    nextBtn.disabled = isLoading;

    resetBtn.disabled = isLoading;

}


// ============================================================
// INITIAL QUESTION
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    getQuestion();

});
