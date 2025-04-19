const texts = [
  "Améliore ta vitesse de frappe ",
  "Défie tes amis ! ",
  "Tapes vite, tapes juste !  ",
  "Es-tu prêt pour le challenge ?"
];

let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

let mail = document.querySelector("#email");
let pass = document.querySelector("#password");
let form = document.querySelector(".cta-button");

form.addEventListener("click", sub);

function sub(event) {
  event.preventDefault();  // Empêche la soumission du formulaire par défaut
  if (mail.value !== "" && pass.value !== "") {
    form.innerText = ". . . .";
    setTimeout(() => {
      form.innerText = "Hello";
      window.location = 'index.html'; // Redirection après 2 secondes
    }, 2000);
  } else {
    alert('Name or password missing');
  }
}

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
    setTimeout(typeEffect, 1500);  // Pause avant de supprimer le texte
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index++;
    setTimeout(typeEffect, 500);   // Pause avant de commencer un nouveau texte
  } else {
    setTimeout(typeEffect, isDeleting ? 50 : 100);  // Vitesse de frappe/déletion
  }
}

function createParticles() {
  const count = 100;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 5 + 3}s`;  // Durée aléatoire de l'animation
    particle.style.animationDelay = `${Math.random() * 5}s`;  // Retardation aléatoire
    document.body.appendChild(particle);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);
