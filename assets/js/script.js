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
    
    startTest(wordCount)
})
// change language
Langue.addEventListener('change' , () => {
    currentWords = wordLists[Langue.value];
    
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


    for (let i = 0; i < wordCount; i++) {
        wordsToType.push(getRandomWord(modeSelect.value));
    }
    
    wordsToType.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        if (index === 0) span.style.color = "red"; // Highlight first word
        wordDisplay.appendChild(span);

    });

    inputField.value = "";
    results.textContent = "";
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


// Move to the next word and update stats only on spacebar press
const updateWord = (event) => {
    if (event.key === " ") { // Check if spacebar is pressed
        const wordElements = wordDisplay.children;
        const currentWordElement = wordElements[currentWordIndex];
        const typedWord = inputField.value.trim();
        const targetWord = wordsToType[currentWordIndex]

        //compter les chars tapés
        totalTypedWord += inputField.value.length;

        if (typedWord == targetWord) {
            totalCorrectWord += targetWord.length //le mot est vraie == compter les caracteres comme vraie
        }else{
            const correctWord = typedWord.split("").filter((lettre, index) =>
                index < targetWord.length && lettre == targetWord[index]).length;
            totalCorrectWord += correctWord;

            //montrer que le mot est faux
            incorrectWords.add(currentWordIndex);
            currentWordElement.style.color = "red"
        }


        const wpm = getCurrentWpm();
        const accuracy = getCurrentAccuracy();

        Wpm.innerText = wpm
        Accuracy.innerText = `${accuracy}%`
        //initialise the progresssion
        progres.innerHTML = `${((currentWordIndex+1) * 100 / Number.value).toFixed(2)}%`
        if (progres.innerHTML == '100.00%') {
            alert("finish the code")
        }

        currentWordIndex++;
        previousEndTime = Date.now();
        highlightNextWord();

        inputField.value = ""; // Clear input field after space
        event.preventDefault(); // Prevent adding extra spaces
    }


};
let interval = 1
inputField.addEventListener("keydown", () => {
    if (interval === 1) {
        interval = 0
        // affiche le temps
        setInterval(() => {
            const sec = document.querySelector(".sec")
            const min = document.querySelector(".min")
            sec.innerText++
            if (sec.innerText.length == 1) {
                sec.innerText = '0' + sec.innerText
            }
            if (min.innerText.length == 1) {
                min.innerText = '0' + min.innerText
            }
            if (sec.innerHTML == 60) {
                min.innerText++
                sec.innerText = 0
            }
        }, 1000);
    }
});

// Highlight the current word in red
const highlightNextWord = () => {
    const wordElements = wordDisplay.children;

    if (currentWordIndex < wordElements.length) {

        let checkCheckbox = document.getElementById("check").checked;
        if (checkCheckbox == true || currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black";
            wordElements[currentWordIndex - 1].style.textShadow = "0 0 20px transparent";
        }
        if (checkCheckbox == false || currentWordIndex > 0) {
            wordElements[currentWordIndex - 1].style.color = "black";
            wordElements[currentWordIndex - 1].style.textShadow = "0 0 20px transparent";
        }
        wordElements[currentWordIndex].style.color = "red";
        wordElements[currentWordIndex].style.textShadow = "0 0 20px #ff9900";
    }
};

// Event listeners
// Attach `updateWord` to `keydown` instead of `input`
inputField.addEventListener("keydown", (event) => {
    startTimer();
    updateWord(event);
});




// Start the test
startTest();