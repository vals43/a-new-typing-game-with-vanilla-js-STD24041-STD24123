const texts = [
  "Améliore ta vitesse de frappe !",
  "Défie tes amis !",
  "Tapes vite, tapes juste !",
  "Es-tu prêt pour le challenge ?"
];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;


createParticles();

function typeEffect() {
  const typingElement = document.getElementById("typing");
  if (index >= texts.length) index = 0;
  currentText = texts[index];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }
}

function startGame() {
  const music = document.getElementById("bg-music");
  music.play();

  window.location.href = "index.html";
}

function createParticles() {
  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(particle);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

