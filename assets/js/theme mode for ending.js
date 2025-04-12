let root = document.querySelector(':root');
let themeConst = localStorage.getItem('theme');

function myFunction_set(primary, secondary, tertiary) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--tertiary', tertiary);
}
console.log(themeConst);


  if (themeConst == 1) {
    myFunction_set('white', 'black', '#37404F')
  }
  if (themeConst == 2) {
    myFunction_set('black', 'white', '#BFC6D4')
  }
  if (themeConst == 3) {
    myFunction_set('#2E2F5B', '#FAF0CA', '#F4D35E')
  }
  if (themeConst == 4) {
    myFunction_set('#1D2955', '#DDE8F0', '#018ABD')
  }
  if (themeConst == 5) {
    myFunction_set('#915A3C', '#E8E6E7', '#CFB79F')
  }
  if (themeConst == 6) {
    myFunction_set('#000', '#149414' , '#FF4B66')
  }
  if (themeConst == 7) {
    myFunction_set('#37404F', '#E0E4EB' , '#FFF')
  }