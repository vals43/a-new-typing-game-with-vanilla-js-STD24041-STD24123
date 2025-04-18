
// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme")

function myFunction_set(primary, secondary, tertiary, quatre) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
  root.style.setProperty('--quatre', quatre);
}
function changePolice(font) {
  root.style.setProperty('--font', font);
}

let themeConst = localStorage.getItem('theme');
localStorage.clear()
localStorage.setItem('theme', theme.value);


if (themeConst != null) {
  theme.value = themeConst
  
  localStorage.setItem('theme', theme.value);
  if (themeConst == 1) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#FFFFF0', 'black', '#37404F', '#D9D9D9')
  }
  if (themeConst == 2) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#292D38', 'white', '#BFC6D4', 'black')
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
  if (themeConst == 6) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#000', '#149414' , 'red' , 'black')
  }
  if (themeConst == 7) {
    root.style.setProperty('--cinq', '--secondary');
    myFunction_set('#37404F', '#E0E4EB' , '#FFF'  , '#37404F')
  }
}


theme.addEventListener('change' , () => {
  localStorage.clear()
  localStorage.setItem('theme', theme.value);
  
  if (theme.value == 1) {
    myFunction_set('#D9D9D9', 'black', '#37404F', '#FFFFF0')
    root.style.setProperty('--cinq', 'black');
    theme.style.background =  'linear-gradient(to right , var(--primary), var(--secondary))';
  }
  if (theme.value == 2) {
    myFunction_set('#292D38', 'white', '#BFC6D4','black')
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
  if (theme.value == 6) {
    myFunction_set('#000', '#149414' , 'red' , 'black')
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background =  'linear-gradient(to right , var(--secondary), var(--primary))';
  }
  if (theme.value == 7) {
    myFunction_set('#37404F', '#E0E4EB' , '#FFF' , '#37404F')
    root.style.setProperty('--cinq', '--secondary');
    theme.style.background =  'linear-gradient(to right , var(--primary), var(--secondary))';
  }

})

