let currentSlide = 1;

const on_tuto = document.getElementById('tuto-open');
const off_tuto = document.getElementById('tuto-off');
const on_feed = document.getElementById('feedback-on');
const set = document.getElementById('Setting');
const offset = document.getElementById('applyCustomTheme');
const off_feed = document.getElementById('feedback-off');
const form = document.getElementById("feedbackForm");
const deco = document.getElementById("btn-deco");
const option = document.getElementById("option");
const tuto = document.querySelector('.tuto');
const content = document.querySelector(".content");

off_tuto.addEventListener('click', endTutorial);
off_feed.addEventListener('click', offFeedback);
offset.addEventListener('click', offSet);


on_tuto.addEventListener("click", () => {
  if (tuto.style.display === "none" || tuto.style.display === "") {
    startTutorial()
  } else {
    endTutorial();
  }
});
set.addEventListener("click", () => {
  if (option.style.display === "none" || option.style.display === "") {
    onSet()
  } else {
    offSet();
  }
});
on_feed.addEventListener("click", () => {
  if (form.style.display === "none" || form.style.display === "") {
    onFeedback()
  } else {
    offFeedback()
  }
});

deco.addEventListener('click', function () {
    window.location.href = 'index.html'
})

function onSet() {
    option.style.display = "block";
    content.style.filter = "blur(10px)";
}
function offSet() {
    option.style.display = "none";
    content.style.filter = "none";
}


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

function offFeedback() {
    form.style.display = "none";
    content.style.filter = "none";
}


//leaderboar score

window.addEventListener("DOMContentLoaded", () => {
    const leaderboardBody = document.getElementById("leaderboard-body");
    const allResults = localStorage.getItem("allResults");
    if (!allResults) return;
  
    const languageMap = {
      en: "English",
      fr: "Français",
      es: "Español",
    };
  
    const rows = allResults.split("\n");
    while (rows.length > 5) {
        rows.shift()
    }
  
    rows.forEach((entry, index) => {
      const [time,wpm, accuracy, count, langCode] = entry.split(",");
      const lang = languageMap[langCode] || langCode;
      
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${time}</td>
        <td>${wpm}</td>
        <td>${accuracy}</td>
        <td>${count}</td>
        <td>${lang}</td>
      `;
      leaderboardBody.appendChild(tr);
    });
  });
  

  const leaderboardBtn = document.getElementById("score-btn");
  const closeBtn = document.getElementById("close-btn");
  const leaderboardContent = document.getElementById("leaderboard");
  
  function onBoard() {
    leaderboardContent.style.display = "block";
    content.style.filter = "blur(10px)"; 
  }
  
  function offBoard() {
    leaderboardContent.style.display = "none";
    content.style.filter = "none";
  }
  
  closeBtn.addEventListener("click", offBoard);
  
  leaderboardBtn.addEventListener("click", () => {

    if (leaderboardContent.style.display === "none" || leaderboardContent.style.display === "") {
      onBoard();
    } else {
      offBoard();
    }
  });
  