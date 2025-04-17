/**
 * Point culture (en Français car je suis un peu obligé):
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces.
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 *
 * Sur ce... Amusez-vous bien !
 */



//Les mots utilisés
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

// les const du DOM
const modeSelect = document.getElementById("mode");
const wordDisplay = document.getElementById("word-display");
const inputField = document.getElementById("input-field");
const results = document.getElementById("results");
const Wpm = document.getElementById("wpm");
const Accuracy = document.getElementById("accuracy");
const progres = document.getElementById("progres");
const Langue = document.getElementById("Langue");
const Number = document.getElementById("Number")
let currentWords = wordLists[Langue.value];
let ending = document.getElementsByClassName("ending_game")
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
let wordCount = Number.value





// Generate a random word from the selected mode
const getRandomWord = (mode) => {
    const wordList = currentWords[mode];
    return wordList[Math.floor(Math.random() * wordList.length)];
};

// change number of word
Number.addEventListener('change' , () => {
    wordCount = Number.value;
    timeModeSelect.value = "off"
    isTimedMode = false;
    startTest(wordCount)
})
// change language
Langue.addEventListener('change' , () => {
    currentWords = wordLists[Langue.value];
    timeModeSelect.value = "off"
    isTimedMode = false;
    startTest(wordCount)
    
})
//change level
modeSelect.addEventListener("change", () => startTest(wordCount));


// Initialize the typing test
const startTest = (wordCount = 30) => {
    
    wordsToType.length = 0; // Clear previous words
    wordDisplay.innerHTML = ""; // Clear display
    currentWordIndex = 0;
    startTime = null;
    previousEndTime = null;
    correctWordsHistory = []
    incorrectWords = new Set();
    totalTypedWord = 0
    totalCorrectWord = 0
    const sec = document.querySelector(".sec")
    const min = document.querySelector(".min")
    sec.innerText = '00'
    min.innerText = '00'


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

// Start the timer when user begins typing
const startTimer = () => {
    if (!startTime) {
        startTime = Date.now();
        previousEndTime = startTime;
    }
};
// Calculate and return WPM & accuracy
const getCurrentWpm = () => {
    const elapsedTime = (Date.now() - previousEndTime) / 1000; // Seconds
    const wpm = (wordsToType[currentWordIndex].length / 5) / (elapsedTime / 60); // 5 chars = 1 word

    return wpm.toFixed(2);
};
const getCurrentAccuracy = () => {
    const accuracy = totalTypedWord > 0 ? (totalCorrectWord / totalTypedWord) * 100 : 0;

    return accuracy.toFixed(2);
};

let array_result = [
    ['Word per minutes', 'WPM', 'accuracy (%)']
  ]
  // start timer 
  let interval = 1
  inputField.addEventListener("input", () => {
      if (interval === 1) {
          interval = 0
          timer()
      }
      
  });
// Move to the next word and update stats only on spacebar press

let wpm_acc = []

function update() {
    
    const wordElements = getWordSpans();
    let currentWordElement = wordElements[currentWordIndex];
    
    const typedWord = inputField.value.trim();
    const targetWord = wordsToType[currentWordIndex]

    //compter les chars tapés
    totalTypedWord += inputField.value.length;

    if (typedWord == targetWord) {
        
        currentWordElement.style.color = "green"
        currentWordElement.style.textShadow = "none";
        totalCorrectWord += targetWord.length //le mot est vraie == compter les caracteres comme vraie
    }else{

        const correctWord = typedWord.split("").filter((lettre, index) =>
            index < targetWord.length && lettre == targetWord[index]).length;
        totalCorrectWord += correctWord;

        //montrer que le mot est faux
        incorrectWords.add(currentWordIndex);
        
        currentWordElement.style.textShadow = "none";
        currentWordElement.style.color = "red"
    }
    
    for (let i = 0; i < targetWord.length+1; i++) {
        if (targetWord[i] != typedWord[i]) {
            //continue raha vita

        }

    }


    const wpm = getCurrentWpm();
    const accuracy = getCurrentAccuracy();

    //the wpm debbug
    wpm_acc.push(wpm)
    let acc = 0
    for (let i = 0; i < wpm_acc.length; i++) {
        acc += Math.floor(wpm_acc[i])
    }  
    acc = acc / wpm_acc.length
    Wpm.innerText = acc.toFixed(0)
    Accuracy.innerText = `${accuracy}%`
    array_result.push([`${currentWordIndex+1}`, acc.toFixed(0), getCurrentAccuracy()])
    
    //initialise the progresssion
    progres.innerHTML = `${((currentWordIndex+1) * 100 / Number.value).toFixed(2)}%`

    currentWordIndex++;

    //get the value into result
    if (!isTimedMode && currentWordIndex == Number.value) {
        clearInterval(countdownInterval);
        saveResults();          
        endGame();
    }
    
    previousEndTime = Date.now();
    highlightNextWord()
    inputField.value = ""; // Clear input field after space
    event.preventDefault(); // Prevent adding extra spaces
}
const updateWord = (event) => {
    if (inputField.value[0] == " ") {
        inputField.value = ""
    }
    if (event.key === " " && inputField.value.length != 0) { // Check if spacebar is pressed
        update()
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

        // Si chrono fini
        if (isTimedMode && elapsed >= countdownDuration) {
            clearInterval(countdownInterval);
            endGame();
        }

    }, 1000);
}



// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = getWordSpans();


    if (currentWordIndex < wordElements.length) {
        wordElements[currentWordIndex].style.color = "blue";
        wordElements[currentWordIndex].style.textShadow = "0 0 20px #ff9900";
    }
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});
//keyboard


const keyboardLayout = [
    'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
    'W', 'X', 'C', 'V', 'B', 'N', '←', 'SPACE'
  ];
  
  let Index = 0
  const keyboard = document.getElementById('keyboard');
  const textInput = document.getElementById('input-field');
  let lastIndex = ''
  
  
  
  
  keyboardLayout.forEach(key => {
    const keyButton = document.createElement('button');
    keyButton.textContent = key;
    keyButton.classList.add('key');
    keyButton.classList.add(key);
  
  
  
  
    textInput.addEventListener("input", () => {
      lastIndex = textInput.value[textInput.value.length - 1].toUpperCase()
      if (keyButton.textContent == lastIndex) {
  
        keyButton.style.background = '#888787'
        setInterval(() => {
          keyButton.style.background = '#eee'
        }, 300);
      }
    });
  
    // keyButton.style.background = 'grey'
    if (key === '←' || key === 'SPACE') {
      keyButton.classList.add('special');
    }
  
  
  
    keyButton.addEventListener('click', () => {
        if (interval === 1) {
            interval = 0
            timer()
        }
      if (key === '←') {
        textInput.value = textInput.value.slice(0, -1);
      } else if (key === 'SPACE') {
        if (key === "SPACE" && inputField.value.length != 0) { // Check if spacebar is pressed
            update()
        }
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

    // Tableau des valeurs de nombre de mots disponibles dans les options
    const numberOptions = [10, 15, 20, 25, 30, 40, 50, 60];

    // Choisir un nombre aléatoire parmi les options disponibles
    const randomCount = numberOptions[Math.floor(Math.random() * numberOptions.length)];

    // Mettre à jour les sélections dans le DOM
    Langue.value = randomLanguage;
    modeSelect.value = randomLevel;
    Number.value = randomCount; // Sélectionner un nombre de mots aléatoire

    // Mettre à jour currentWords et lancer le test
    currentWords = wordLists[randomLanguage];
    wordCount = randomCount;
    startTest(wordCount);
}

document.getElementById("random").addEventListener("click", () => {
    randomGame();
});
// last 5 gemes stats
function saveResults() {
    const currentResult = `${Wpm.innerText},${Accuracy.innerText},${wordCount}`;

    let allResults = localStorage.getItem('allResults');
    let resultsArray = allResults || []; 
    // Ajouter le nouveau résultat
    resultsArray.push(currentResult);

    // Limiter la liste des résultats aux 5 derniers
    if (resultsArray.length > 5) {
        resultsArray.shift(); // Supprimer le plus ancien résultat
    }

    // Sauvegarder la nouvelle liste dans le localStorage
    localStorage.setItem('allResults', resultsArray.join("\n"));
}

//timer countdown
const timeModeSelect = document.getElementById("timed-mode");

timeModeSelect.addEventListener("change", () => {
    if (timeModeSelect.value === "off") {
        isTimedMode = false;
        wordCount = Number.value;
    } else {
        isTimedMode = true;
        countdownDuration = parseInt(timeModeSelect.value);
        wordCount = 200;
        Number.value = 200
    }
    startTest(wordCount);
});


//endgame
function endGame() {
    localStorage.setItem('resultat', array_result);
    localStorage.setItem('timer', document.getElementById("time").innerHTML);
    window.location.href='finish_game.html';
}

const tuto = document.getElementsByClassName('carrousel')
const content = document.getElementsByClassName('content')
const end = document.getElementById('finish-btn')



// Start the test
startTest();



/*
// Fonction pour afficher les 5 derniers résultats
function displayPreviousResults() {
    const resultsContainer = document.getElementById('results-container'); // Exemple de conteneur pour afficher les résultats

    // Récupérer les résultats précédents depuis le localStorage
    const allResults = localStorage.getItem('allResults');

    if (allResults) {
        const resultsArray = allResults.split("\n"); // Divise par ligne (chaque ligne correspond à un jeu)

        // Afficher les résultats
        resultsArray.forEach(result => {
            const [wpm, accuracy, wordsCount] = result.split(","); // Sépare les valeurs par virgule

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
*/