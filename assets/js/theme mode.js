
// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme")
let font = document.getElementById("font")

function myFunction_set(primary, secondary, tertiary, quatre) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
  root.style.setProperty('--quatre', quatre);
}


let themeConst = localStorage.getItem('theme');
localStorage.clear()
localStorage.setItem('theme', theme.value);


if (themeConst != null) {
  theme.value = themeConst
  
  localStorage.setItem('theme', theme.value);
  if (themeConst == 2) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#000', 'white', '#BFC6D4', '#111')
  }
  if (themeConst == 3) {  // Memory
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#2E2F5B', '#FAF0CA', '#F4D35E', '#0F1C46');
  }
  
  if (themeConst == 4) {  // Sea Wave
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#0B132B', '#DDE8F0', '#00A8E8', '#1C2541');
  }
  if (themeConst == 5) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#5E3023', '#F3E9DC', '#C08552','#895737')
  }
  if (themeConst == 7) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#37404F', '#E0E4EB' , '#FFF'  , '#37404F')
  }
}


theme.addEventListener('change' , () => {
  localStorage.clear()
  localStorage.setItem('theme', theme.value);
  

  if (theme.value == 2) {
    myFunction_set('#000', 'white', '#BFC6D4','#111')
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background =  'linear-gradient(to right , var(--primary), var(--secondary))';
  }
  if (theme.value == 3) {  // Memory Theme
    myFunction_set('#2E2F5B', '#FAF0CA', '#F4D35E', '#0F1C46');
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background = 'linear-gradient(to right, var(--primary), var(--secondary))';
  }
  
  if (theme.value == 4) {  // Sea Wave Theme
    myFunction_set('#0B132B', '#DDE8F0', '#00A8E8', '#1C2541');
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background = 'linear-gradient(to right, var(--primary), var(--secondary))';
  }
  if (theme.value == 5) {
    myFunction_set('#5E3023', '#F3E9DC', '#C08552','#895737')
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background =  'linear-gradient(to right , var(--primary), var(--secondary))';
  }

  if (theme.value == 7) {
    myFunction_set('#37404F', '#E0E4EB' , '#FFF' , '#37404F')
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background =  'linear-gradient(to right , var(--primary), var(--secondary))';
  }

})


// font

function changePolice(font) {
  root.style.setProperty('--font', font);
} 



font.addEventListener('change', function () {
  if (font.value == 1) {
    changePolice('Quicksand')
  }
  if (font.value == 2) {
    changePolice('JetBrains')
  }
  if (font.value == 3) {
    changePolice('Fira')
  }
})


let fontConst = localStorage.getItem('font');
localStorage.setItem('font', font.value);

font.addEventListener('change',  function () {
  
  localStorage.setItem('font', font.value);
  fontConst = localStorage.getItem('font');
    console.log(fontConst);

})

if (fontConst == 1) {
  font.value = 1
  changePolice('Quicksand')
}
if (fontConst == 2) {
  font.value = 2
  changePolice('JetBrains')
}
if (fontConst == 3) {
  font.value = 3
  changePolice('Fira')
}
