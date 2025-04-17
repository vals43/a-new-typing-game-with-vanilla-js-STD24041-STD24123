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
