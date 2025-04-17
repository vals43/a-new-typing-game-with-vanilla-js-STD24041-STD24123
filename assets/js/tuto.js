let currentSlide = 1;

function showSlide(slideNumber) {
    let slides = document.querySelectorAll('.slide');
    slides.forEach(slide => slide.classList.remove('active'));
    document.getElementById('slide-' + slideNumber).classList.add('active');
}

function nextSlide(slideNumber) {
    currentSlide = slideNumber;
    showSlide(currentSlide);
}

function endTutorial() {
    alert("Félicitations, tu as terminé le tutoriel !");
    window.location.href = "index.html"; 
}