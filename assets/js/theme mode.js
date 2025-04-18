// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme");
let font = document.getElementById("font");


function myFunction_set(primary, secondary, tertiary, quatre) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
  root.style.setProperty('--quatre', quatre); 
}

const themes = {
  2: ['#000', 'white', '#BFC6D4', '#111'],
  3: ['#2E2F5B', '#FAF0CA', '#F4D35E', '#0F1C46'],
  4: ['#0B132B', '#DDE8F0', '#00A8E8', '#1C2541'],
  5: ['#5E3023', '#F3E9DC', '#C08552', '#895737'],
  7: ['#37404F', '#E0E4EB', '#FFF', '#37404F']
};

function applyTheme(themeId) {
  if (themes[themeId]) {
    myFunction_set(...themes[themeId]);
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background = 'linear-gradient(to right , var(--primary), var(--secondary))';
  }
}

let themeConst = localStorage.getItem('theme');
if (themeConst != null) {
  theme.value = themeConst;
  applyTheme(parseInt(themeConst));
}

theme.addEventListener('change', () => {
  localStorage.setItem('theme', theme.value);
  applyTheme(parseInt(theme.value));
});

function changePolice(fontName) {
  root.style.setProperty('--font', fontName);
  localStorage.setItem('fontName', fontName);
}

font.addEventListener('change', function () {
  if (font.value == 1) changePolice('Quicksand');
  if (font.value == 2) changePolice('JetBrains');
  if (font.value == 3) changePolice('Fira');
});

let savedFont = localStorage.getItem('fontName');
if (savedFont) {
  if (savedFont == 'Quicksand') font.value = 1;
  if (savedFont == 'JetBrains') font.value = 2;
  if (savedFont == 'Fira') font.value = 3;
  changePolice(savedFont);
}

// Color Pickers
const bgColorPicker = document.getElementById('bgColor');  
const textColorPicker = document.getElementById('textColor');  
const btnColorPicker = document.getElementById('btnColor');
const borderColorPicker = document.getElementById('borderColor'); 

// Appliquer les couleurs personnalisées
function applyCustomColors(primary, secondary, tertiary, quatre) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
  root.style.setProperty('--quatre', quatre); 
}

let savedPrimary = localStorage.getItem('customPrimary');
let savedSecondary = localStorage.getItem('customSecondary');
let savedTertiary = localStorage.getItem('customTertiary');
let savedQuatre = localStorage.getItem('customQuatre'); 

if (savedPrimary && savedSecondary && savedTertiary && savedQuatre) {
  bgColorPicker.value = savedPrimary;
  textColorPicker.value = savedSecondary;
  btnColorPicker.value = savedTertiary;
  borderColorPicker.value = savedQuatre;
  applyCustomColors(savedPrimary, savedSecondary, savedTertiary, savedQuatre);
}

[bgColorPicker, textColorPicker, btnColorPicker, borderColorPicker].forEach(picker => {
  picker.addEventListener('input', () => {
    const primary = bgColorPicker.value;
    const secondary = textColorPicker.value;
    const tertiary = btnColorPicker.value;
    const quatre = borderColorPicker.value;

    applyCustomColors(primary, secondary, tertiary, quatre);

    localStorage.setItem('customPrimary', primary);
    localStorage.setItem('customSecondary', secondary);
    localStorage.setItem('customTertiary', tertiary);
    localStorage.setItem('customQuatre', quatre);
  });
});
