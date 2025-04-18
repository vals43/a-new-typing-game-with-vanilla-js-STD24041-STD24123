// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme");
let font = document.getElementById("font");

// Fonction pour appliquer les couleurs du thème
function myFunction_set(primary, secondary, tertiary, quatre) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
  root.style.setProperty('--quatre', quatre);
}

// Thèmes prédéfinis
const themes = {
  2: ['#000', 'white', '#BFC6D4', '#111'],
  3: ['#2E2F5B', '#FAF0CA', '#F4D35E', '#0F1C46'],
  4: ['#0B132B', '#DDE8F0', '#00A8E8', '#1C2541'],
  5: ['#5E3023', '#F3E9DC', '#C08552', '#895737'],
  7: ['#37404F', '#E0E4EB', '#FFF', '#37404F']
};

// Appliquer un thème par ID
function applyTheme(themeId) {
  if (themes[themeId]) {
    myFunction_set(...themes[themeId]);
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background = 'linear-gradient(to right , var(--primary), var(--secondary))';
  }
}

// Chargement du thème sauvegardé
let themeConst = localStorage.getItem('theme');
if (themeConst != null) {
  theme.value = themeConst;
  applyTheme(parseInt(themeConst));
}

// Changement de thème
theme.addEventListener('change', () => {
  localStorage.setItem('theme', theme.value);
  applyTheme(parseInt(theme.value));
});

// Polices prédéfinies
function changePolice(fontName) {
  root.style.setProperty('--font', fontName);
  localStorage.setItem('fontName', fontName);
}

// Appliquer police au changement
font.addEventListener('change', function () {
  if (font.value == 1) changePolice('Quicksand');
  if (font.value == 2) changePolice('JetBrains');
  if (font.value == 3) changePolice('Fira');
});

// Appliquer police sauvegardée
let savedFont = localStorage.getItem('fontName');
if (savedFont) {
  if (savedFont == 'Quicksand') font.value = 1;
  if (savedFont == 'JetBrains') font.value = 2;
  if (savedFont == 'Fira') font.value = 3;
  changePolice(savedFont);
}
