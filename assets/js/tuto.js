let currentSlide = 1;

const on_tuto = document.getElementById('tuto-open');
const off_tuto = document.getElementById('tuto-off');
const on_feed = document.getElementById('feedback-on');
const off_feed = document.getElementById('feedback-off');
const form = document.getElementById("feedbackForm");
const tuto = document.querySelector('.tuto');
const content = document.querySelector(".content");

on_tuto.addEventListener('click', startTutorial);
off_tuto.addEventListener('click', endTutorial);
on_feed.addEventListener('click', onFeedback);
off_feed.addEventListener('click', offFeedback);




function showSlide(slideNumber) {
    let slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    document.getElementById('slide-' + slideNumber).classList.add('active');
}

function nextSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
}

function startTutorial() {
    tuto.style.display = "flex";
    content.style.filter = "blur(10px)";
}

function endTutorial() {
        tuto.style.display = "none";
        content.style.filter = "none";
}

// Feedback
function onFeedback() {
    form.style.display = "inline";
    content.style.filter = "blur(10px)";
}

function offFeedback(event) {
    event.preventDefault();
    form.style.display = "none";
    content.style.filter = "none";
}

function displayPreviousResults() {
    const resultsContainer = document.getElementById('results-container');

    // Récupérer les résultats précédents depuis le localStorage
    const allResults = localStorage.getItem('allResults');

    if (allResults) {
        const resultsArray = allResults.split("\n");

        // Afficher les résultats
        resultsArray.forEach(result => {
            const [wpm, accuracy, wordsCount] = result.split(",");

            const resultElement = document.createElement('div');
            resultElement.innerHTML = `
                <p>WPM: ${wpm}</p>
                <p>Accuracy: ${accuracy}%</p>
                <p>Number of words: ${wordsCount}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    } else {
        resultsContainer.innerHTML = "<p>No results saved.</p>";
    }
}