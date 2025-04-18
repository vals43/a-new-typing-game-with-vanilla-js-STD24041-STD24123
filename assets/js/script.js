/**
 * Point culture (en Français car je suis un peu obligé):
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces.
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 *
 * Sur ce... Amusez-vous bien !
 */

// Les mots utilisés
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
  
  // Les const du DOM
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
  let countdownDuration = 60; // par défaut 60s
  let countdownInterval = null;
  
  let startTime = null, previousEndTime = null;
  let currentWordIndex = 0;
  const wordsToType = [];
  let correctWordsHistory = [];
  let incorrectWords = new Set();
  let totalTypedWord = 0;
  let totalCorrectWord = 0;
  let wordCount = Number.value;
  
  //
  // Génère un mot aléatoire selon le mode choisi
  //
  const getRandomWord = (mode) => {
    const wordList = currentWords[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
  };
  
  // Changer le nombre de mots
  Number.addEventListener('change', () => {
    wordCount = Number.value;
    timeModeSelect.value = "off";
    isTimedMode = false;
    startTest(wordCount);
  });
  // Changer la langue
  Langue.addEventListener('change', () => {
    currentWords = wordLists[Langue.value];
    timeModeSelect.value = "off";
    isTimedMode = false;
    startTest(wordCount);
  });
  // Changer le niveau
  modeSelect.addEventListener("change", () => startTest(wordCount));
  
  //
  // Initialise le test de dactylographie
  //
  const startTest = (wordCount = 30) => {
    wordsToType.length = 0; // Effacer les anciens mots
    wordDisplay.innerHTML = ""; // Effacer l'affichage
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    correctWordsHistory = [];
    incorrectWords = new Set();
    totalTypedWord = 0;
    totalCorrectWord = 0;
    const sec = document.querySelector(".sec");
    const min = document.querySelector(".min");
    sec.innerText = '00';
    min.innerText = '00';
  
    for (let i = 0; i < wordCount; i++) {
      wordsToType.push(getRandomWord(modeSelect.value));
    }
    
    wordsToType.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      if (index === 0) span.style.color = "blue";
      wordDisplay.appendChild(span);
  
      if ((index + 1) % 10 === 0) {
        wordDisplay.appendChild(document.createElement("br"));
      }
    });
  
    inputField.value = "";
    results.innerText = "";
  };
  
  const getWordSpans = () => {
    return Array.from(wordDisplay.children).filter(el => el.tagName === "SPAN");
  };
  
  //
  // Démarrer le timer lors de la première saisie
  //
  const startTimer = () => {
    if (!startTime) {
      startTime = Date.now();
      previousEndTime = startTime;
    }
  };
  
  //
  // Calcule et retourne le WPM et la précision actuelle
  //
  const getCurrentWpm = () => {
    const elapsedTime = (Date.now() - previousEndTime) / 1000; // Secondes
    const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60); // 5 caractères = 1 mot
    return wpm.toFixed(2);
  };
  const getCurrentAccuracy = () => {
    const accuracy = totalTypedWord > 0 ? (totalCorrectWord / totalTypedWord) * 100 : 0;
    return accuracy.toFixed(2);
  };
  
  let array_result = [
    ['Word per minutes', 'WPM', 'accuracy (%)']
  ];
  let interval = 1;
  inputField.addEventListener("input", () => {
    if (interval === 1) {
      interval = 0;
      timer();
    }
  });
  
  let wpm_acc = [];
  
  //
  // La fonction update() est appelée à chaque fois qu’un mot est terminé (en appuyant sur espace)
  //
  function update(event) {
    // Bug fix : vérifier que currentWordIndex n'est pas hors limites
    if (currentWordIndex >= wordsToType.length) return;
    
    rmLigne(currentWordIndex);
    const wordElements = getWordSpans();
    let currentWordElement = wordElements[currentWordIndex];
    const typedWord = inputField.value.trim();
    const targetWord = wordsToType[currentWordIndex];
  
    // Compter les caractères tapés
    totalTypedWord += inputField.value.length;
  
    if (typedWord === targetWord) {
      currentWordElement.style.color = "green";
      currentWordElement.style.textShadow = "none";
      totalCorrectWord += targetWord.length; // Le mot est correct donc tous les caractères sont comptés
    } else {
      const correctChars = typedWord.split("").filter((lettre, index) =>
        index < targetWord.length && lettre === targetWord[index]
      ).length;
      totalCorrectWord += correctChars;
      incorrectWords.add(currentWordIndex);
      currentWordElement.style.textShadow = "none";
      currentWordElement.style.color = "red";
    }
  
    const wpm = getCurrentWpm();
    const accuracy = getCurrentAccuracy();
  
    wpm_acc.push(wpm);
    let avgWpm = 0;
    for (let i = 0; i < wpm_acc.length; i++) {
      avgWpm += Math.floor(wpm_acc[i]);
    }
    avgWpm = avgWpm / wpm_acc.length;
    Wpm.innerText = avgWpm.toFixed(0);
    Accuracy.innerText = `${accuracy}%`;
    array_result.push([`${currentWordIndex + 1}`, avgWpm.toFixed(0), accuracy]);
    
    progres.innerHTML = `${((currentWordIndex + 1) * 100 / Number.value).toFixed(2)}%`;
  
    currentWordIndex++;
    
    // Fin du test en mode non chronométré
    if (!isTimedMode && currentWordIndex === parseInt(Number.value)) {
      clearInterval(countdownInterval);
      saveResults();
      endGame();
  }
  
    
    previousEndTime = Date.now();
    highlightNextWord();
    inputField.value = ""; // Effacer l'input après espace
    
    // Pour empêcher l'ajout d'espaces supplémentaires
    if (event) event.preventDefault();
  }
  
  //
  // Modification de updateWord() pour gérer correctement l'espace initial
  //
  const updateWord = (event) => {
    // Bug fix : utiliser startsWith pour éviter les espaces en début de saisie
    if (inputField.value.startsWith(" ")) {
      inputField.value = "";
    }
    if (event.key === " " && inputField.value.length !== 0) { // Vérifie si la barre espace est pressée
      update(event);
    }
  };
  
  //
  // Timer
  //
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
      console.log(total);
      
      // Si le chronomètre est terminé en mode chronométré
      if (isTimedMode && elapsed >= countdownDuration) {
        clearInterval(countdownInterval);
        localStorage.setItem('elapsed', total);
        endGame();
      }
    }, 1000);
  }
  
  //
  // Met en surbrillance le mot suivant
  //
  const highlightNextWord = () => {
    const wordElements = getWordSpans();
    if (currentWordIndex < wordElements.length) {
      wordElements[currentWordIndex].style.color = "blue";
      wordElements[currentWordIndex].style.textShadow = "0 0 20px #ff9900";
    }
  };
  
  //
  // Écouteur d'événement sur keydown pour lancer updateWord()
  //
  inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
  });
  
  // Clavier visuel
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
    keyButton.classList.add('key');
    keyButton.classList.add(key);
  
    textInput.addEventListener("input", () => {
      lastIndex = textInput.value[textInput.value.length - 1]?.toUpperCase();
      if (keyButton.textContent === lastIndex) {
        keyButton.style.background = '#888787';
        setInterval(() => {
          keyButton.style.background = '#eee';
        }, 300);
      }
    });
  
    if (key === '←' || key === 'SPACE') {
      keyButton.classList.add('special');
    }
  
    keyButton.addEventListener('click', () => {
      if (interval === 1) {
        interval = 0;
        timer();
      }
      if (key === '←') {
        textInput.value = textInput.value.slice(0, -1);
      } else if (key === 'SPACE') {
        if (inputField.value.length !== 0) { // Vérifie que l'input n'est pas vide
          update();
        }
      } else {
        textInput.value += key.toLowerCase();
      }
    });
  
    keyboard.appendChild(keyButton);
  });
  
  //
  // Fonction pour un jeu aléatoire
  //
  function randomGame() {
    const languages = ['en', 'fr', 'es'];
    const levels = ['easy', 'medium', 'hard'];
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  
    // Nombre de mots disponibles dans les options
    const numberOptions = [10, 15, 20, 25, 30, 40, 50, 60];
  
    // Choisir un nombre aléatoire parmi les options
    const randomCount = numberOptions[Math.floor(Math.random() * numberOptions.length)];
  
    // Mettre à jour la sélection dans le DOM
    Langue.value = randomLanguage;
    modeSelect.value = randomLevel;
    Number.value = randomCount; // Sélectionner un nombre de mots aléatoire
  
    // Mettre à jour currentWords et démarrer le test
    currentWords = wordLists[randomLanguage];
    wordCount = randomCount;
    startTest(wordCount);
  }
  
  document.getElementById("random").addEventListener("click", () => {
    randomGame();
  });
  
  //
  // Fonction saveResults() modifiée pour éviter d’utiliser un tableau non initialisé
  // Bug fix : On sépare la chaîne sauvegardée si elle existe, sinon on initialise un tableau vide
  //
  function saveResults() {
    const currentResult = `${Wpm.innerText},${Accuracy.innerText},${wordCount}`;
    let allResults = localStorage.getItem('allResults');
    let resultsArray = allResults ? allResults.split("\n") : [];
    resultsArray.push(currentResult);
  
    if (resultsArray.length > 5) {
      resultsArray.shift(); // Supprime le plus ancien résultat
    }
  
    localStorage.setItem('allResults', resultsArray.join("\n"));
  }
  
  //
  // Timer en mode chronométré
  //
  const timeModeSelect = document.getElementById("timed-mode");
  timeModeSelect.addEventListener("change", () => {
    if (timeModeSelect.value === "off") {
      isTimedMode = false;
      wordCount = Number.value;
    } else {
      isTimedMode = true;
      countdownDuration = parseInt(timeModeSelect.value);
      wordCount = 200;
      Number.value = 200;
    }
    startTest(wordCount);
  });
  
  //
  // Fin de partie
  //
  function endGame() {
    localStorage.setItem('resultat', array_result);
    localStorage.setItem('timer', document.getElementById("time").innerHTML);
    window.location.href = 'finish_game.html';
  }
  
  // Fonction rmLigne() (actuellement vide)
  // Si tu souhaites ajouter un effet lors d’un saut de ligne (chaque 10 mots), tu peux l’implémenter ici
  function rmLigne(index) {
    if ((index + 1) % 10 === 0) {
    wordDisplay.scrollTop += 30;
    }
  }
  
  // Démarrage du test
  startTest();
  