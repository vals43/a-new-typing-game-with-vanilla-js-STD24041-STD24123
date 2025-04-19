const wordLists = {
  en: {
    easy: ["apple", "banana", "grape", "orange", "cherry", "blue", "green", "red", "yellow", "pink", "cat", "dog", "bird", "fish", "rabbit", "one", "two", "three", "four", "five", "table", "chair", "book", "lamp", "door", "see", "read", "eat", "sleep", "play"],
    medium: ["keyboard", "monitor", "printer", "charger", "battery", "mouse", "screen", "keyboard", "file", "folder", "big", "small", "fast", "slow", "new", "watch", "listen", "work", "understand", "try", "france", "china", "japan", "brazil", "canada", "paris", "rome", "tokyo", "london", "berlin"],
    hard: ["synchronize", "complicated", "development", "extravagant", "misconception", "attention", "difficult", "important", "different", "collection", "absolutely", "probably", "unfortunately", "finally", "organization", "madagascar", "antananarivo", "montgolfier", "constantinople", "renaissance"]
  },
  fr: {
    easy: ["pomme", "banane", "raisin", "orange", "cerise", "bleu", "vert", "rouge", "jaune", "rose", "chat", "chien", "oiseau", "poisson", "lapin", "un", "deux", "trois", "quatre", "cinq", "table", "chaise", "livre", "lampe", "porte", "voir", "lire", "manger", "dormir", "jouer"],
    medium: ["clavier", "écran", "imprimante", "chargeur", "batterie", "souris", "écran", "clavier", "fichier", "dossier", "grand", "petit", "rapide", "lent", "nouveau", "regarder", "écouter", "travailler", "comprendre", "essayer", "france", "chine", "japon", "brésil", "canada", "paris", "rome", "tokyo", "londres", "berlin"],
    hard: ["synchroniser", "compliqué", "développement", "extravagant", "malentendu", "attention", "difficile", "important", "différent", "collection", "absolument", "probablement", "malheureusement", "finalement", "organisation", "madagascar", "antananarivo", "montgolfier", "constantinople", "renaissance"]
  },
  es: {
    easy: ["manzana", "plátano", "uva", "naranja", "cereza", "azul", "verde", "rojo", "amarillo", "rosa", "gato", "perro", "pájaro", "pez", "conejo", "uno", "dos", "tres", "cuatro", "cinco", "mesa", "silla", "libro", "lámpara", "puerta", "ver", "leer", "comer", "dormir", "jugar"],
    medium: ["teclado", "monitor", "impresora", "cargador", "batería", "ratón", "pantalla", "teclado", "archivo", "carpeta", "grande", "pequeño", "rápido", "lento", "nuevo", "mirar", "escuchar", "trabajar", "comprender", "intentar", "francia", "china", "japón", "brasil", "canadá", "parís", "roma", "tokio", "londres", "berlín"],
    hard: ["sincronizar", "complicado", "desarrollo", "extravagante", "malentendido", "atención", "difícil", "importante", "diferente", "colección", "absolutamente", "probablemente", "desafortunadamente", "finalmente", "organización", "madagascar", "antananarivo", "montgolfier", "constantinopla", "renacimiento"]
  }
};

const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const Wpm = document.getElementById("wpm");
const Accuracy = document.getElementById("accuracy");
const progres = document.getElementById("progres");
const Langue = document.getElementById("Langue");
const Number = document.getElementById("Number");
let currentWords = wordLists[Langue.value];
let ending = document.getElementsByClassName("ending_game");
let isTimedMode = false;
let countdownDuration = 60;
let countdownInterval = null;

let startTime = null, previousEndTime = null;
let currentWordIndex = 0;
const wordsToType = [];
let correctWordsHistory = [];
let incorrectWords = new Set();
let totalTypedWord = 0;
let totalCorrectWord = 0;
let wordCount = Number.value;

const getRandomWord = (mode) => {
  const wordList = currentWords[mode];
  return wordList[Math.floor(Math.random() * wordList.length)];
};

Number.addEventListener('change', () => {
  wordCount = Number.value;
  timeModeSelect.value = "off";
  isTimedMode = false;
  startTest(wordCount);
  forceFocusInput()
});

Langue.addEventListener('change', () => {
  currentWords = wordLists[Langue.value];
  timeModeSelect.value = "off";
  isTimedMode = false;
  startTest(wordCount);
  forceFocusInput()
});

modeSelect.addEventListener("change", () => {
  startTest(wordCount) ;
  forceFocusInput()
});



const startTest = (wordCount = 30) => {

  clearInterval(countdownInterval);
  countdownInterval = null;
  interval = 1;
  wordsToType.length = 0;
  wordDisplay.innerHTML = "";
  currentWordIndex = 0;
  startTime = null;
  previousEndTime = null;
  correctWordsHistory = [];
  incorrectWords = new Set();
  totalTypedWord = 0;
  totalCorrectWord = 0;
  const sec = document.querySelector(".sec");
  const min = document.querySelector(".min");
  if (sec && min) {
    sec.innerText = '00';
    min.innerText = '00';
  }
  
  for (let i = 0; i < wordCount; i++) {
    wordsToType.push(getRandomWord(modeSelect.value));
  }

  wordsToType.forEach((word, index) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    if (index === 0) span.style.color = "blue";
    wordDisplay.appendChild(span);
  });
  inputField.focus()
  inputField.value = "";
  results.innerText = "";
};
const getWordSpans = () => {
  return Array.from(wordDisplay.children).filter(el => el.tagName === "SPAN");
};

const startTimer = () => {
  if (!startTime) {
    startTime = Date.now();
    previousEndTime = startTime;
  }
};

const getCurrentWpm = () => {
  const elapsedTime = (Date.now() - previousEndTime) / 1000;
  const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60);
  return wpm.toFixed(2);
};

const getCurrentAccuracy = () => {
  const accuracy = totalTypedWord > 0 ? (totalCorrectWord / totalTypedWord) * 100 : 0;
  return accuracy.toFixed(2);
};

let array_result = [['Word per minutes', 'WPM', 'accuracy (%)']];
let interval = 1;
let wpm_acc = [];

inputField.addEventListener("input", () => {
  if (interval === 1) {
    interval = 0;
    timer();
  }
});

function update(event) {
  if (currentWordIndex >= wordsToType.length) return;
  rmLigne(currentWordIndex);
  const wordElements = getWordSpans();
  let currentWordElement = wordElements[currentWordIndex];
  const typedWord = inputField.value.trim();
  const targetWord = wordsToType[currentWordIndex];
  totalTypedWord += inputField.value.length;
  currentWordElement.innerHTML = '';
  let correctCharsCount = 0;

  for (let i = 0; i < targetWord.length; i++) {
    const span = document.createElement('span');
    const typedChar = typedWord[i];
    const targetChar = targetWord[i];
    span.textContent = targetChar;
    span.style.color = typedChar === targetChar ? "green" : "red";
    if (typedChar === targetChar) totalCorrectWord++;
    currentWordElement.appendChild(span);
  }

  currentWordElement.innerHTML += ' ';
  const wpm = getCurrentWpm();
  const accuracy = getCurrentAccuracy();
  
  wpm_acc.push(wpm);
  let avgWpm = wpm_acc.reduce((a, b) => a + Math.floor(b), 0) / wpm_acc.length;
  Wpm.innerText = avgWpm.toFixed(0);
  Accuracy.innerText = `${accuracy}%`;
  array_result.push([`${currentWordIndex + 1}`, avgWpm.toFixed(0), accuracy]);
  progres.innerHTML = `${((currentWordIndex + 1) * 100 / wordsToType.length).toFixed(2)}%`;
  currentWordIndex++;
  if (!isTimedMode && currentWordIndex === wordsToType.length) {
    clearInterval(countdownInterval);
    saveResults();
    endGame();
  }
  previousEndTime = Date.now();
  highlightNextWord();
  inputField.value = "";
  if (event) event.preventDefault();
}

document.addEventListener("keydown", function(e) {
  if (e.altKey && e.key === "Enter") {
    e.preventDefault(); 
    resetTest();
  }
});


function resetTest() {
  timeModeSelect.value = isTimedMode ? countdownDuration : "off";
  Wpm.innerText = '';
  Accuracy.innerText = '';
  progres.innerText= '';
  startTest(wordCount);
  forceFocusInput();
}
const updateWord = (event) => {
  if (inputField.value.startsWith(" ")) inputField.value = "";
  if (event.key === " " && inputField.value.length !== 0) update(event);
};

const toggleTimerVisibility = (show) => {
  const progressContainer = document.getElementById("progress-timer-container");
  if (show) {
    progressContainer.style.display = "block"; 
  } else {
    progressContainer.style.display = "none";
  }
};
function timer() {
  const sec = document.querySelector(".sec");
  const min = document.querySelector(".min");
  let elapsed = 0;
  countdownInterval = setInterval(() => {
    elapsed++;
    const total = isTimedMode ? countdownDuration : elapsed;
    const remaining = isTimedMode ? countdownDuration - elapsed : elapsed;
    const minutes = Math.floor((isTimedMode ? remaining : elapsed) / 60);
    const seconds = (isTimedMode ? remaining : elapsed) % 60;
    min.innerText = minutes < 10 ? "0" + minutes : minutes;
    sec.innerText = seconds < 10 ? "0" + seconds : seconds;
    if (isTimedMode) {
      const percentLeft = ((countdownDuration - elapsed-1) / countdownDuration) * 100;
      document.getElementById("progress-timer-bar").style.width = percentLeft + "%";
    }    
    if (isTimedMode && elapsed >= countdownDuration) {
      clearInterval(countdownInterval);
      localStorage.setItem('elapsed', total);
      endGame();
    }
  }, 1000);
}

const highlightNextWord = () => {
  const wordElements = getWordSpans();
  if (currentWordIndex < wordElements.length) wordElements[currentWordIndex].style.color = "blue";
};

inputField.addEventListener("keydown", (event) => {
  startTimer();
  updateWord(event);
});

const keyboardLayout = [
  'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
  'W', 'X', 'C', 'V', 'B', 'N', '←', 'SPACE'
];

let Index = 0;
const keyboard = document.getElementById('keyboard');
const textInput = document.getElementById('input-field');
let lastIndex = '';

keyboardLayout.forEach(key => {
  const keyButton = document.createElement('button');
  keyButton.textContent = key;
  keyButton.classList.add('key', key);
  textInput.addEventListener("input", () => {
    lastIndex = textInput.value[textInput.value.length - 1]?.toUpperCase();
    if (keyButton.textContent === lastIndex) {
      keyButton.style.background = '#888787';
      setTimeout(() => keyButton.style.background = '#eee', 300);

    }
  });
  if (key === '←' || key === 'SPACE') keyButton.classList.add('special');
  keyButton.addEventListener('click', () => {
    if (interval === 1) {
      interval = 0;
      timer();
    }
    if (key === '←') {
      textInput.value = textInput.value.slice(0, -1);
    } else if (key === 'SPACE') {
      if (inputField.value.length !== 0) update();
    } else {
      textInput.value += key.toLowerCase();
    }
  });
  keyboard.appendChild(keyButton);
});

function randomGame() {
  const languages = ['en', 'fr', 'es'];
  const levels = ['easy', 'medium', 'hard'];
  const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
  const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  const numberOptions = [10, 15, 20, 25, 30, 40, 50, 60];
  const randomCount = numberOptions[Math.floor(Math.random() * numberOptions.length)];
  Langue.value = randomLanguage;
  modeSelect.value = randomLevel;
  Number.value = randomCount;
  currentWords = wordLists[randomLanguage];
  wordCount = randomCount;
  startTest(wordCount);
  inputField.focus()
}

document.getElementById("random").addEventListener("click", () => {
  randomGame();
});

function saveResults() {
  const sec = document.querySelector(".sec");
  const min = document.querySelector(".min");
  const currentResult = `${min.innerText}:${sec.innerText},${Wpm.innerText},${Accuracy.innerText},${wordCount},${Langue.value}`;
  let allResults = localStorage.getItem('allResults');
  let resultsArray = allResults ? allResults.split("\n") : [];
  resultsArray.push(currentResult);
  if (resultsArray.length > 5) resultsArray.shift();
  localStorage.setItem('allResults', resultsArray.join("\n"));
}

function forceFocusInput() {
  setTimeout(() => {
    requestAnimationFrame(() => {
      const input = document.getElementById("input-field");
      if (input) {
        input.focus();
        input.select(); // Facultatif, sélectionne le texte si besoin
        console.log("Focus forcé sur input-field");
      } else {
        console.warn("input-field non trouvé !");
      }
    });
  }, 100);
}

const timeModeSelect = document.getElementById("timed-mode");
timeModeSelect.addEventListener("change", () => {
  if (timeModeSelect.value === "off") {
    isTimedMode = false;
    toggleTimerVisibility(false);
  } else {
    isTimedMode = true;
    countdownDuration = parseInt(timeModeSelect.value);
    wordCount = 200;
    Number.value = 200;
    toggleTimerVisibility(true);
  }
  startTest(wordCount);
    forceFocusInput()
});

function endGame() {
  localStorage.setItem('resultat', array_result);
  localStorage.setItem('timer', document.getElementById("time").innerHTML);
  window.location.href = 'finish_game.html';
}

function rmLigne(index) {
  const wordElements = getWordSpans();
  if (index === 0) return;
  const current = wordElements[index];
  const previous = wordElements[index - 1];
  if (current.offsetTop > previous.offsetTop) wordDisplay.scrollTop += 30;
}

startTest();



