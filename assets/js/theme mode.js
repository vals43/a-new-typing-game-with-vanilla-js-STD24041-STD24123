// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme")

function myFunction_set(primary, secondary, tertiary) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
}
theme.addEventListener('change' , () => {
  if (theme.value == 1) {
    myFunction_set('white', 'black', '#37404F')
  }
  if (theme.value == 2) {
    myFunction_set('black', 'white', '#BFC6D4')
  }
  if (theme.value == 3) {
    myFunction_set('#2E2F5B', '#FAF0CA', '#F4D35E')
  }
  if (theme.value == 4) {
    myFunction_set('#004581', '#DDE8F0', '#018ABD')
  }
  if (theme.value == 5) {
    myFunction_set('#915A3C', '#E8E6E7', '#CFB79F')
  }
  if (theme.value == 6) {
    myFunction_set('#333', '#149414' , '#FF4B66')
  }
  if (theme.value == 7) {
    myFunction_set('#37404F', '#E0E4EB' , '#FFF')
  }

})

myFunction_set()